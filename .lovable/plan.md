## Fix four security findings

### 1. Realtime: scope reviewer access to assigned reviews only
The `review_topics_select_admin_reviewer` and `..._insert_admin_reviewer` policies on `realtime.messages` allow any reviewer to subscribe to any `review_%` topic. No client code currently uses these channels, so I'll standardize the topic format as `review_<product_id>` and tighten the policies:

- Admins: unchanged (full access to `review_%`).
- Reviewers: only allowed if `split_part(realtime.topic(), '_', 2)` (the product_id portion) matches a `product_reviews.assigned_to = auth.uid()` row.

Implementation: drop and recreate the two policies with an `EXISTS` check against `public.product_reviews`. Document the topic format (`review_<productId>`) in a comment.

### 2. `mfa_activity_log`: add INSERT policy
Currently RLS allows SELECT only, so any future client/trigger insert silently fails. Add:
- INSERT policy: `auth.uid() = user_id` (users can only log their own MFA events).
Service role continues to bypass RLS for system-level writes.

### 3. `role_requests`: prevent self-requesting `admin`
Add a CHECK-style RLS guard on the user INSERT policy to reject `requested_role = 'admin'`. Replace the existing `Users can create own role requests` policy with one whose `WITH CHECK` is:
`auth.uid() = user_id AND requested_role IN ('reviewer','company')`.

Also add a defense-in-depth trigger `BEFORE INSERT ON role_requests` that raises if a non-admin attempts to insert with `requested_role = 'admin'`. Admins can still create any role request via the admin policy.

Confirmed: no trigger/function auto-grants roles from `role_requests` — only `approve_role_request` (admin-gated) writes to `user_roles`.

### 4. SECURITY DEFINER functions executable by `anon`
Postgres grants EXECUTE on functions to PUBLIC by default. Most of the project's `SECURITY DEFINER` functions internally call `auth.uid()` and check `is_admin_secure()` / `has_role()`, so an unauthenticated caller gets nothing useful — but the linter still flags them and they consume DB resources.

I'll revoke EXECUTE from `anon` for all `SECURITY DEFINER` functions in `public` that are NOT needed pre-auth. Functions that legitimately must be callable by `anon` (e.g. `handle_new_user`, `is_institutional_email`, trigger functions) are invoked internally by triggers/the auth flow, not via PostgREST, so revoking PUBLIC/anon EXECUTE is safe — triggers run as the table owner.

Approach: a single `DO` block iterating `pg_proc` for `nspname='public' AND prosecdef=true`, executing `REVOKE EXECUTE ... FROM anon, public`, then re-granting EXECUTE to `authenticated` and `service_role`. This keeps the app working (all RPC callers are authenticated) and silences both linter findings (`SUPA_anon_security_definer_function_executable` and the matching authenticated one is unrelated — only anon is requested here).

### Technical: single migration

```sql
-- 1. Realtime policies
DROP POLICY "review_topics_select_admin_reviewer" ON realtime.messages;
CREATE POLICY "review_topics_select_admin_reviewer" ON realtime.messages
FOR SELECT TO authenticated
USING (
  realtime.topic() LIKE 'review_%' AND (
    has_role(auth.uid(),'admin') OR (
      has_role(auth.uid(),'reviewer') AND EXISTS (
        SELECT 1 FROM public.product_reviews
        WHERE assigned_to = auth.uid()
          AND product_id = substring(realtime.topic() FROM 8)
      )
    )
  )
);
-- analogous for INSERT (WITH CHECK)

-- 2. mfa_activity_log INSERT
CREATE POLICY "Users can insert own MFA activity" ON public.mfa_activity_log
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 3. role_requests
DROP POLICY "Users can create own role requests" ON public.role_requests;
CREATE POLICY "Users can create own role requests" ON public.role_requests
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND requested_role IN ('reviewer','company'));

CREATE OR REPLACE FUNCTION public.guard_role_request_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NEW.requested_role = 'admin' AND NOT is_admin_secure() THEN
    RAISE EXCEPTION 'Cannot request admin role';
  END IF;
  RETURN NEW;
END$$;
CREATE TRIGGER guard_role_request_admin BEFORE INSERT ON public.role_requests
FOR EACH ROW EXECUTE FUNCTION public.guard_role_request_admin();

-- 4. Revoke anon EXECUTE on SECURITY DEFINER functions
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT p.oid::regprocedure AS sig
           FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
           WHERE n.nspname='public' AND p.prosecdef=true LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', r.sig);
  END LOOP;
END$$;
```

After the migration I'll mark all four findings as fixed.

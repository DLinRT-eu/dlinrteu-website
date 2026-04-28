-- 1. Realtime: scope reviewer access to assigned reviews only
-- Topic format convention: review_<productId>
DROP POLICY IF EXISTS "review_topics_select_admin_reviewer" ON realtime.messages;
CREATE POLICY "review_topics_select_admin_reviewer"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() LIKE 'review_%' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR (
      public.has_role(auth.uid(), 'reviewer'::public.app_role)
      AND EXISTS (
        SELECT 1 FROM public.product_reviews pr
        WHERE pr.assigned_to = auth.uid()
          AND pr.product_id = substring(realtime.topic() FROM 8)
      )
    )
  )
);

DROP POLICY IF EXISTS "review_topics_insert_admin_reviewer" ON realtime.messages;
CREATE POLICY "review_topics_insert_admin_reviewer"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  realtime.topic() LIKE 'review_%' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR (
      public.has_role(auth.uid(), 'reviewer'::public.app_role)
      AND EXISTS (
        SELECT 1 FROM public.product_reviews pr
        WHERE pr.assigned_to = auth.uid()
          AND pr.product_id = substring(realtime.topic() FROM 8)
      )
    )
  )
);

-- 2. mfa_activity_log: add INSERT policy for self-writes
DROP POLICY IF EXISTS "Users can insert own MFA activity" ON public.mfa_activity_log;
CREATE POLICY "Users can insert own MFA activity"
ON public.mfa_activity_log
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. role_requests: forbid self-requesting admin role
DROP POLICY IF EXISTS "Users can create own role requests" ON public.role_requests;
CREATE POLICY "Users can create own role requests"
ON public.role_requests
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND requested_role IN ('reviewer'::public.app_role, 'company'::public.app_role)
);

-- Defense-in-depth trigger
CREATE OR REPLACE FUNCTION public.guard_role_request_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.requested_role = 'admin'::public.app_role
     AND NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Cannot request admin role';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_role_request_admin ON public.role_requests;
CREATE TRIGGER guard_role_request_admin
BEFORE INSERT ON public.role_requests
FOR EACH ROW
EXECUTE FUNCTION public.guard_role_request_admin();

-- 4. Revoke EXECUTE from anon/PUBLIC on all SECURITY DEFINER functions in public
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prosecdef = true
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC', r.sig);
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', r.sig);
  END LOOP;
END;
$$;
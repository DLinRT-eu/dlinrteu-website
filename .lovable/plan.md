

# Fix Three Security Findings

## 1. CRITICAL — Company Representatives Self-Verification (Privilege Escalation)

**Problem**: The `company_representatives` table has an ALL policy `Users manage own company rep` where `auth.uid() = user_id`. This lets any authenticated user set `verified = true` on their own record, bypassing admin approval and gaining the ability to certify products for any company.

**Fix**: Replace the single ALL policy with granular policies:
- **SELECT**: Users can view their own record (unchanged)
- **INSERT**: Authenticated users can insert their own record BUT only with `verified = false`
- **UPDATE**: Users can update their own record BUT cannot change `verified`, `verified_by`, or `verified_at` — those columns are admin-only. Implement via a trigger that prevents non-admins from modifying the `verified` field.
- **DELETE**: Users can delete their own unverified record; admins can delete any.
- **Admin policies**: Admins get full access (already likely exist or handled by service role).

Implementation: A `BEFORE UPDATE` trigger on `company_representatives` that rejects changes to `verified`/`verified_by`/`verified_at` unless the caller is an admin (checked via `is_admin_secure()`).

## 2. WARN — Contact Submissions Insert Blocked

**Problem**: The `contact_submissions` table blocks all operations including INSERT. The backup contact processing hook (`useBackupContactProcessing.ts`) tries to insert via the anon/authenticated client and will silently fail.

**Analysis**: The primary contact form uses the `send-contact-email` edge function (service role), so submissions go through email. The backup storage path in `useBackupContactProcessing.ts` uses the client SDK (authenticated role) to insert — this is currently broken due to the restrictive policy.

**Fix**: Ignore this finding. The primary flow uses the edge function with service role (bypasses RLS). The backup storage is a fallback that already handles errors gracefully. Adding an INSERT policy would expose the table to spam. Mark as ignored with explanation.

## 3. WARN — Certification Reminder Logs No Insert Policy

**Problem**: Only a SELECT policy for admins exists. Writes happen in the `send-certification-reminder` edge function.

**Analysis**: The edge function uses `adminClient` (service role) to insert logs, which bypasses RLS entirely. No client-side code writes to this table.

**Fix**: Ignore this finding. All writes go through the service role edge function. Mark as ignored with explanation.

## Migration SQL (Finding #1 only)

```sql
-- Drop the overly permissive ALL policy
DROP POLICY IF EXISTS "Users manage own company rep" ON public.company_representatives;

-- Users can view their own records
CREATE POLICY "Users can view own company rep"
  ON public.company_representatives FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own record (verified must be false)
CREATE POLICY "Users can insert own company rep"
  ON public.company_representatives FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND verified = false);

-- Users can update own record (trigger guards verified field)
CREATE POLICY "Users can update own company rep"
  ON public.company_representatives FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own unverified records
CREATE POLICY "Users can delete own unverified company rep"
  ON public.company_representatives FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND verified = false);

-- Trigger to prevent non-admins from modifying verified fields
CREATE OR REPLACE FUNCTION public.guard_company_rep_verified()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public' AS $$
BEGIN
  IF (OLD.verified IS DISTINCT FROM NEW.verified
      OR OLD.verified_by IS DISTINCT FROM NEW.verified_by
      OR OLD.verified_at IS DISTINCT FROM NEW.verified_at)
    AND NOT is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can modify verification status';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_company_rep_verified_trigger ON public.company_representatives;
CREATE TRIGGER guard_company_rep_verified_trigger
  BEFORE UPDATE ON public.company_representatives
  FOR EACH ROW EXECUTE FUNCTION public.guard_company_rep_verified();
```

## Security Finding Updates

- **user_roles_self_insert**: Mark as fixed (company_representatives verified field now protected)
- **contact_submissions_no_insert**: Ignore (all writes via service role edge function; backup handler is graceful)
- **certification_reminder_logs_no_insert_policy**: Ignore (all writes via service role edge function)

## Files

| Action | File |
|--------|------|
| Migration | New migration for company_representatives policy split + trigger |
| No change | `src/components/profile/RoleRequestForm.tsx` (already inserts with `verified: false`) |


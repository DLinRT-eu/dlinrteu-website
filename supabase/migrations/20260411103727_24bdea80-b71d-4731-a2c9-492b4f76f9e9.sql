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
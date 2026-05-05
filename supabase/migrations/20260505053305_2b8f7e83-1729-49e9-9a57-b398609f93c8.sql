-- Cleanup function: delete previous unused codes and enforce max 16 unused per user
CREATE OR REPLACE FUNCTION public.cleanup_unused_backup_codes(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.mfa_backup_codes
  WHERE user_id = p_user_id AND used = false;
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_unused_backup_codes(uuid) FROM PUBLIC, anon, authenticated;

-- Trigger to enforce max 16 unused codes per user at insert time
CREATE OR REPLACE FUNCTION public.enforce_backup_code_quota()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  IF NEW.used = false THEN
    SELECT COUNT(*) INTO v_count
    FROM public.mfa_backup_codes
    WHERE user_id = NEW.user_id AND used = false;
    IF v_count >= 16 THEN
      RAISE EXCEPTION 'Backup code quota exceeded (max 16 unused codes)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_backup_code_quota ON public.mfa_backup_codes;
CREATE TRIGGER trg_enforce_backup_code_quota
BEFORE INSERT ON public.mfa_backup_codes
FOR EACH ROW EXECUTE FUNCTION public.enforce_backup_code_quota();
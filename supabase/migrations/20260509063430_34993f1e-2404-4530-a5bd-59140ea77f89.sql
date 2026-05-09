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
    IF v_count >= 10 THEN
      RAISE EXCEPTION 'Backup code quota exceeded (max 10 unused codes)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
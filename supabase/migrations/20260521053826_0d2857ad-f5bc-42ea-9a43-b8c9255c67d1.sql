-- Prevent privilege escalation via profiles self-update.
-- Users may still update their own profile, but cannot modify admin-only columns.

CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin_user boolean := false;
BEGIN
  -- Allow service_role / superuser contexts (no auth.uid()) to bypass.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Admins may change anything.
  BEGIN
    is_admin_user := public.has_role(auth.uid(), 'admin'::app_role);
  EXCEPTION WHEN OTHERS THEN
    is_admin_user := false;
  END;

  IF is_admin_user THEN
    RETURN NEW;
  END IF;

  -- Non-admins cannot change sensitive approval / role fields.
  IF NEW.approval_status IS DISTINCT FROM OLD.approval_status
     OR NEW.is_core_team   IS DISTINCT FROM OLD.is_core_team
     OR NEW.approved_by    IS DISTINCT FROM OLD.approved_by
     OR NEW.approved_at    IS DISTINCT FROM OLD.approved_at
  THEN
    RAISE EXCEPTION 'Not allowed to modify approval or core-team fields'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_privilege_escalation ON public.profiles;

CREATE TRIGGER trg_prevent_profile_privilege_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_privilege_escalation();
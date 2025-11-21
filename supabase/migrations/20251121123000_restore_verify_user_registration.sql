-- Restore full verification workflow and ensure reviewer role assignment
DROP FUNCTION IF EXISTS public.verify_user_registration(uuid, boolean);

CREATE OR REPLACE FUNCTION public.verify_user_registration(
  p_user_id UUID,
  p_verified BOOLEAN DEFAULT TRUE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id UUID := auth.uid();
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can verify user registrations';
  END IF;

  UPDATE public.user_registration_notifications
  SET verified = p_verified,
      verified_at = NOW(),
      verified_by = v_admin_id,
      notification_status = CASE
        WHEN p_verified THEN 'approved'
        ELSE 'rejected'
      END
  WHERE user_id = p_user_id;

  UPDATE public.profiles
  SET approval_status = CASE
        WHEN p_verified THEN 'approved'
        ELSE 'rejected'
      END,
      approved_by = v_admin_id,
      approved_at = NOW()
  WHERE id = p_user_id;

  IF p_verified THEN
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (p_user_id, 'reviewer'::public.app_role, v_admin_id)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    DELETE FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'reviewer';
  END IF;

  PERFORM public.log_admin_action(
    'verify_user_registration',
    p_user_id,
    jsonb_build_object('verified', p_verified)
  );

  RETURN TRUE;
END;
$$;

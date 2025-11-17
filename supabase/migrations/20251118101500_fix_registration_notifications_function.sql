-- Fix get_registration_notifications_admin to include profile data and match schema
DROP FUNCTION IF EXISTS public.get_registration_notifications_admin();

CREATE OR REPLACE FUNCTION public.get_registration_notifications_admin()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  notification_status text,
  verified boolean,
  created_at timestamptz,
  verified_at timestamptz,
  verified_by uuid,
  failure_reason text,
  first_name text,
  last_name text,
  institution text,
  approval_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    urn.id,
    urn.user_id,
    urn.email,
    urn.notification_status,
    urn.verified,
    urn.created_at,
    urn.verified_at,
    urn.verified_by,
    urn.failure_reason,
    COALESCE(p.first_name, ''),
    COALESCE(p.last_name, ''),
    p.institution,
    p.approval_status
  FROM public.user_registration_notifications urn
  LEFT JOIN public.profiles p ON p.id = urn.user_id
  ORDER BY urn.created_at DESC;
END;
$$;

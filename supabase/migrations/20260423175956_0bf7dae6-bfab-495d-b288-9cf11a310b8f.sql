CREATE OR REPLACE FUNCTION public.count_pending_role_requests_for_user(_user_id uuid)
RETURNS int
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count int;
BEGIN
  -- Only allow callers to query their own pending count
  IF _user_id IS NULL OR _user_id <> auth.uid() THEN
    RETURN 0;
  END IF;

  SELECT count(*)::int INTO v_count
  FROM public.role_requests
  WHERE user_id = _user_id
    AND status = 'pending';

  RETURN COALESCE(v_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.count_pending_role_requests_for_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.count_pending_role_requests_for_user(uuid) TO authenticated;
-- Create secure admin RPC function to grant roles
-- This bypasses RLS issues while maintaining security through SECURITY DEFINER
-- and explicit auth.uid() checks

CREATE OR REPLACE FUNCTION public.grant_role_admin(
  p_target_user_id uuid,
  p_role app_role,
  p_granted_by uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_caller_uid uuid;
  v_target_email text;
BEGIN
  -- Get the caller's user ID from the JWT token
  v_caller_uid := auth.uid();
  
  -- Debug: Check if auth.uid() is NULL (session issue)
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated - auth.uid() returned NULL',
      'hint', 'Session may be expired, invalid, or not sent with request'
    );
  END IF;
  
  -- Verify caller is admin using the existing is_admin_secure function
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - caller is not admin',
      'caller_uid', v_caller_uid,
      'hint', 'User does not have admin role'
    );
  END IF;
  
  -- Get target user's email for logging
  SELECT email INTO v_target_email
  FROM profiles
  WHERE id = p_target_user_id;
  
  IF v_target_email IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Target user not found',
      'target_user_id', p_target_user_id
    );
  END IF;
  
  -- Perform the insert with elevated privileges
  INSERT INTO public.user_roles (user_id, role, granted_by)
  VALUES (p_target_user_id, p_role, COALESCE(p_granted_by, v_caller_uid));
  
  -- Log the action
  PERFORM log_admin_action(
    'role_granted_via_rpc',
    p_target_user_id,
    v_target_email,
    jsonb_build_object(
      'role', p_role,
      'granted_by', COALESCE(p_granted_by, v_caller_uid),
      'method', 'grant_role_admin_rpc'
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Role granted successfully',
    'target_user', p_target_user_id,
    'target_email', v_target_email,
    'role', p_role,
    'granted_by', COALESCE(p_granted_by, v_caller_uid)
  );
  
EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User already has this role',
      'target_user_id', p_target_user_id,
      'role', p_role
    );
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'sqlstate', SQLSTATE,
      'hint', 'Unexpected database error occurred'
    );
END;
$$;

-- Grant execute permission to authenticated users (RLS in function handles authorization)
GRANT EXECUTE ON FUNCTION public.grant_role_admin TO authenticated;
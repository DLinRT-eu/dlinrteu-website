-- Force schema cache refresh for revoke_role_admin function
-- This ensures PostgREST picks up the correct function signature

CREATE OR REPLACE FUNCTION public.revoke_role_admin(p_target_user_id uuid, p_role app_role)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_caller_uid uuid;
  v_target_email text;
  v_deleted_count integer;
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
  
  -- Verify caller is admin
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - caller is not admin',
      'caller_uid', v_caller_uid
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
  
  -- Perform the delete with elevated privileges
  DELETE FROM public.user_roles
  WHERE user_id = p_target_user_id AND role = p_role;
  
  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
  
  IF v_deleted_count = 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User does not have this role',
      'target_user_id', p_target_user_id,
      'role', p_role
    );
  END IF;
  
  -- Log the action
  PERFORM log_admin_action(
    'role_revoked_via_rpc',
    p_target_user_id,
    v_target_email,
    jsonb_build_object(
      'role', p_role,
      'revoked_by', v_caller_uid,
      'method', 'revoke_role_admin_rpc'
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Role revoked successfully',
    'target_user', p_target_user_id,
    'target_email', v_target_email,
    'role', p_role,
    'revoked_by', v_caller_uid
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'sqlstate', SQLSTATE
    );
END;
$function$;

-- Add comment documenting the function parameters
COMMENT ON FUNCTION public.revoke_role_admin(uuid, app_role) IS 
'Admin function to revoke a role from a user. Requires: p_target_user_id (uuid), p_role (app_role enum: admin, reviewer, company)';

-- Force PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
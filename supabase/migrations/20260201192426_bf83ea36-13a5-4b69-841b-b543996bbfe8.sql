-- Fix 1: Restrict analytics functions to authenticated users only
-- Revoke public access to get_analytics_daily
REVOKE EXECUTE ON FUNCTION public.get_analytics_daily(date, date) FROM public;
GRANT EXECUTE ON FUNCTION public.get_analytics_daily(date, date) TO authenticated;

-- Revoke public access to get_analytics_page_visits
REVOKE EXECUTE ON FUNCTION public.get_analytics_page_visits(date, date) FROM public;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_visits(date, date) TO authenticated;

-- Fix 2: Update admin RPC functions to return generic error messages
-- Update grant_role_admin to not expose SQLSTATE and detailed errors
CREATE OR REPLACE FUNCTION public.grant_role_admin(p_target_user_id uuid, p_role app_role, p_granted_by uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller_uid uuid;
  v_target_email text;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied'
    );
  END IF;
  
  SELECT email INTO v_target_email
  FROM profiles
  WHERE id = p_target_user_id;
  
  IF v_target_email IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, granted_by)
  VALUES (p_target_user_id, p_role, COALESCE(p_granted_by, v_caller_uid));
  
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
    'message', 'Role granted successfully'
  );
  
EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User already has this role'
    );
  WHEN OTHERS THEN
    -- Log detailed error server-side only
    RAISE LOG 'grant_role_admin error: % %', SQLERRM, SQLSTATE;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Operation failed. Please try again or contact support.'
    );
END;
$function$;

-- Update revoke_role_admin to not expose SQLSTATE and detailed errors
CREATE OR REPLACE FUNCTION public.revoke_role_admin(p_target_user_id uuid, p_role app_role)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller_uid uuid;
  v_target_email text;
  v_deleted_count integer;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied'
    );
  END IF;
  
  SELECT email INTO v_target_email
  FROM profiles
  WHERE id = p_target_user_id;
  
  IF v_target_email IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  DELETE FROM public.user_roles
  WHERE user_id = p_target_user_id AND role = p_role;
  
  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
  
  IF v_deleted_count = 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User does not have this role'
    );
  END IF;
  
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
    'message', 'Role revoked successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'revoke_role_admin error: % %', SQLERRM, SQLSTATE;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Operation failed. Please try again or contact support.'
    );
END;
$function$;

-- Update update_product_review_admin to use generic errors
CREATE OR REPLACE FUNCTION public.update_product_review_admin(p_review_id uuid, p_status text DEFAULT NULL::text, p_priority text DEFAULT NULL::text, p_deadline date DEFAULT NULL::date, p_notes text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller_uid UUID;
  v_old_status TEXT;
  v_product_id TEXT;
  v_assigned_to UUID;
  v_round_id UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied'
    );
  END IF;
  
  SELECT status, product_id, assigned_to, review_round_id
  INTO v_old_status, v_product_id, v_assigned_to, v_round_id
  FROM product_reviews
  WHERE id = p_review_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;
  
  UPDATE product_reviews
  SET 
    status = COALESCE(p_status, status),
    priority = COALESCE(p_priority, priority),
    deadline = COALESCE(p_deadline, deadline),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE id = p_review_id;
  
  IF p_status IS NOT NULL AND p_status != v_old_status THEN
    INSERT INTO assignment_history (
      review_round_id,
      product_id,
      assigned_to,
      change_type,
      changed_by,
      reason
    ) VALUES (
      v_round_id,
      v_product_id,
      v_assigned_to,
      'status_change',
      v_caller_uid,
      format('Status changed from %s to %s by admin', v_old_status, p_status)
    );
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review updated successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'update_product_review_admin error: % %', SQLERRM, SQLSTATE;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Operation failed. Please try again or contact support.'
    );
END;
$function$;

-- Update reassign_product_review_admin to use generic errors
CREATE OR REPLACE FUNCTION public.reassign_product_review_admin(p_review_id uuid, p_new_reviewer_id uuid, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller_uid UUID;
  v_old_reviewer_id UUID;
  v_product_id TEXT;
  v_round_id UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied'
    );
  END IF;
  
  IF NOT has_role(p_new_reviewer_id, 'reviewer'::app_role) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Target user does not have reviewer role'
    );
  END IF;
  
  SELECT assigned_to, product_id, review_round_id
  INTO v_old_reviewer_id, v_product_id, v_round_id
  FROM product_reviews
  WHERE id = p_review_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;
  
  UPDATE product_reviews
  SET 
    assigned_to = p_new_reviewer_id,
    status = 'pending',
    started_at = NULL,
    completed_at = NULL,
    updated_at = NOW()
  WHERE id = p_review_id;
  
  INSERT INTO assignment_history (
    review_round_id,
    product_id,
    assigned_to,
    previous_assignee,
    change_type,
    changed_by,
    reason
  ) VALUES (
    v_round_id,
    v_product_id,
    p_new_reviewer_id,
    v_old_reviewer_id,
    'reassign',
    v_caller_uid,
    COALESCE(p_reason, 'Reassigned by admin')
  );
  
  INSERT INTO notifications (
    user_id,
    title,
    message,
    type,
    link
  ) VALUES (
    p_new_reviewer_id,
    'New Review Assignment',
    format('You have been assigned to review product: %s', v_product_id),
    'info',
    '/review/' || p_review_id
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review reassigned successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'reassign_product_review_admin error: % %', SQLERRM, SQLSTATE;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Operation failed. Please try again or contact support.'
    );
END;
$function$;

-- Update resolve_security_event_admin to use generic errors
CREATE OR REPLACE FUNCTION public.resolve_security_event_admin(p_event_id uuid, p_notes text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller_uid UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied'
    );
  END IF;
  
  UPDATE public.security_events
  SET 
    resolved_at = NOW(),
    notes = COALESCE(p_notes, notes)
  WHERE id = p_event_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Security event not found'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Security event resolved successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'resolve_security_event_admin error: % %', SQLERRM, SQLSTATE;
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Operation failed. Please try again or contact support.'
    );
END;
$function$;
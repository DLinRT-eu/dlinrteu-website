-- Fix get_review_round_details_admin function by moving ORDER BY inside jsonb_agg
CREATE OR REPLACE FUNCTION public.get_review_round_details_admin(p_round_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
  v_round jsonb;
  v_assignments jsonb;
  v_history jsonb;
BEGIN
  v_caller_uid := auth.uid();
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Access denied: admin role required');
  END IF;
  
  -- Fetch round details
  SELECT to_jsonb(rr.*) INTO v_round
  FROM review_rounds rr 
  WHERE rr.id = p_round_id;
  
  IF v_round IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Round not found');
  END IF;
  
  -- Fetch assignments with profiles (ORDER BY inside jsonb_agg)
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', pr.id,
      'product_id', pr.product_id,
      'assigned_to', pr.assigned_to,
      'status', pr.status,
      'priority', pr.priority,
      'deadline', pr.deadline,
      'assigned_at', pr.assigned_at,
      'completed_at', pr.completed_at,
      'notes', pr.notes,
      'reviewer_profile', CASE 
        WHEN p.id IS NOT NULL THEN jsonb_build_object(
          'first_name', p.first_name,
          'last_name', p.last_name,
          'email', p.email
        )
        ELSE NULL
      END
    ) ORDER BY pr.assigned_at DESC
  ) INTO v_assignments
  FROM product_reviews pr
  LEFT JOIN profiles p ON pr.assigned_to = p.id
  WHERE pr.review_round_id = p_round_id;
  
  -- Fetch history with profiles (ORDER BY inside jsonb_agg)
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ah.id,
      'product_id', ah.product_id,
      'assigned_to', ah.assigned_to,
      'previous_assignee', ah.previous_assignee,
      'changed_by', ah.changed_by,
      'change_type', ah.change_type,
      'reason', ah.reason,
      'created_at', ah.created_at,
      'assigned_to_profile', CASE 
        WHEN p1.id IS NOT NULL THEN jsonb_build_object(
          'first_name', p1.first_name,
          'last_name', p1.last_name,
          'email', p1.email
        )
        ELSE NULL
      END,
      'previous_assignee_profile', CASE 
        WHEN p2.id IS NOT NULL THEN jsonb_build_object(
          'first_name', p2.first_name,
          'last_name', p2.last_name,
          'email', p2.email
        )
        ELSE NULL
      END,
      'changed_by_profile', CASE 
        WHEN p3.id IS NOT NULL THEN jsonb_build_object(
          'first_name', p3.first_name,
          'last_name', p3.last_name,
          'email', p3.email
        )
        ELSE NULL
      END
    ) ORDER BY ah.created_at DESC
  ) INTO v_history
  FROM assignment_history ah
  LEFT JOIN profiles p1 ON ah.assigned_to = p1.id
  LEFT JOIN profiles p2 ON ah.previous_assignee = p2.id
  LEFT JOIN profiles p3 ON ah.changed_by = p3.id
  WHERE ah.review_round_id = p_round_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'round', v_round,
    'assignments', COALESCE(v_assignments, '[]'::jsonb),
    'history', COALESCE(v_history, '[]'::jsonb)
  );
END;
$$;
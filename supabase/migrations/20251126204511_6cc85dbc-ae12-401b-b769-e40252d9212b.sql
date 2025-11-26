-- Function to update product review as admin (fixes RLS issues)
CREATE OR REPLACE FUNCTION public.update_product_review_admin(
  p_review_id UUID,
  p_status TEXT DEFAULT NULL,
  p_priority TEXT DEFAULT NULL,
  p_deadline DATE DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Get current review details
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
  
  -- Update the review
  UPDATE product_reviews
  SET 
    status = COALESCE(p_status, status),
    priority = COALESCE(p_priority, priority),
    deadline = COALESCE(p_deadline, deadline),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE id = p_review_id;
  
  -- Log status change if status changed
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
    'message', 'Review updated successfully',
    'review_id', p_review_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Function to reassign product review to different reviewer
CREATE OR REPLACE FUNCTION public.reassign_product_review_admin(
  p_review_id UUID,
  p_new_reviewer_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Verify new reviewer has reviewer role
  IF NOT has_role(p_new_reviewer_id, 'reviewer'::app_role) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Target user does not have reviewer role'
    );
  END IF;
  
  -- Get current assignment details
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
  
  -- Update assignment
  UPDATE product_reviews
  SET 
    assigned_to = p_new_reviewer_id,
    status = 'pending',
    started_at = NULL,
    completed_at = NULL,
    updated_at = NOW()
  WHERE id = p_review_id;
  
  -- Log reassignment
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
  
  -- Notify new reviewer
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
    'message', 'Review reassigned successfully',
    'review_id', p_review_id,
    'new_reviewer', p_new_reviewer_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Function to remove product review assignment
CREATE OR REPLACE FUNCTION public.remove_product_review_admin(
  p_review_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_caller_uid UUID;
  v_product_id TEXT;
  v_assigned_to UUID;
  v_round_id UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Get assignment details before deletion
  SELECT product_id, assigned_to, review_round_id
  INTO v_product_id, v_assigned_to, v_round_id
  FROM product_reviews
  WHERE id = p_review_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;
  
  -- Log removal before deleting
  INSERT INTO assignment_history (
    review_round_id,
    product_id,
    previous_assignee,
    change_type,
    changed_by,
    reason
  ) VALUES (
    v_round_id,
    v_product_id,
    v_assigned_to,
    'removed',
    v_caller_uid,
    COALESCE(p_reason, 'Assignment removed by admin')
  );
  
  -- Delete the review
  DELETE FROM product_reviews
  WHERE id = p_review_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review assignment removed successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Function to update review round status (complete, archive, reopen)
CREATE OR REPLACE FUNCTION public.update_round_status_admin(
  p_round_id UUID,
  p_status TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_caller_uid UUID;
  v_old_status TEXT;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Validate status
  IF p_status NOT IN ('draft', 'active', 'completed', 'archived') THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid status. Must be: draft, active, completed, or archived'
    );
  END IF;
  
  -- Get current status
  SELECT status INTO v_old_status
  FROM review_rounds
  WHERE id = p_round_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review round not found'
    );
  END IF;
  
  -- Update round status
  UPDATE review_rounds
  SET 
    status = p_status,
    end_date = CASE 
      WHEN p_status = 'completed' AND end_date IS NULL THEN CURRENT_DATE
      ELSE end_date
    END,
    updated_at = NOW()
  WHERE id = p_round_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', format('Round status changed from %s to %s', v_old_status, p_status),
    'round_id', p_round_id,
    'old_status', v_old_status,
    'new_status', p_status
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Function to clone review round
CREATE OR REPLACE FUNCTION public.clone_review_round_admin(
  p_source_round_id UUID,
  p_new_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_start_date DATE DEFAULT NULL,
  p_default_deadline DATE DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_caller_uid UUID;
  v_new_round_id UUID;
  v_round_number INTEGER;
  v_assignments_count INTEGER := 0;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Verify source round exists
  IF NOT EXISTS (SELECT 1 FROM review_rounds WHERE id = p_source_round_id) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Source review round not found'
    );
  END IF;
  
  -- Get next round number
  SELECT COALESCE(MAX(round_number), 0) + 1 INTO v_round_number
  FROM review_rounds;
  
  -- Create new round
  INSERT INTO review_rounds (
    name,
    round_number,
    description,
    status,
    start_date,
    default_deadline,
    created_by
  ) VALUES (
    p_new_name,
    v_round_number,
    COALESCE(p_description, 'Cloned from round ' || p_source_round_id),
    'draft',
    COALESCE(p_start_date, CURRENT_DATE),
    COALESCE(p_default_deadline, CURRENT_DATE + INTERVAL '14 days'),
    v_caller_uid
  )
  RETURNING id INTO v_new_round_id;
  
  -- Copy assignments from source round
  INSERT INTO product_reviews (
    product_id,
    review_round_id,
    assigned_to,
    status,
    priority,
    deadline
  )
  SELECT 
    product_id,
    v_new_round_id,
    assigned_to,
    'pending',
    priority,
    COALESCE(p_default_deadline, CURRENT_DATE + INTERVAL '14 days')
  FROM product_reviews
  WHERE review_round_id = p_source_round_id;
  
  GET DIAGNOSTICS v_assignments_count = ROW_COUNT;
  
  -- Update round totals
  UPDATE review_rounds
  SET 
    total_products = v_assignments_count,
    total_assignments = v_assignments_count
  WHERE id = v_new_round_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review round cloned successfully',
    'new_round_id', v_new_round_id,
    'assignments_copied', v_assignments_count
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;
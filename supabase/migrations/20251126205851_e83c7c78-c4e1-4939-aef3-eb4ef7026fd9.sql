-- Fix assignment_history constraint to allow proper values
ALTER TABLE assignment_history 
DROP CONSTRAINT IF EXISTS assignment_history_change_type_check;

ALTER TABLE assignment_history 
ADD CONSTRAINT assignment_history_change_type_check 
CHECK (change_type IN ('initial', 'reassign', 'remove', 'status_change'));

-- Update the remove function to use 'remove' instead of 'removed'
CREATE OR REPLACE FUNCTION remove_product_review_admin(
  p_review_id uuid,
  p_reason text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_review product_reviews%ROWTYPE;
  v_session_user_id uuid;
  v_is_admin boolean;
  v_result jsonb;
BEGIN
  -- Get session user
  v_session_user_id := auth.uid();
  
  IF v_session_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;

  -- Check admin permission
  v_is_admin := is_admin_secure();
  
  IF NOT v_is_admin THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Permission denied - admin role required'
    );
  END IF;

  -- Get review details
  SELECT * INTO v_review
  FROM product_reviews
  WHERE id = p_review_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;

  -- Log the removal in assignment history
  IF v_review.review_round_id IS NOT NULL THEN
    INSERT INTO assignment_history (
      review_round_id,
      product_id,
      previous_assignee,
      assigned_to,
      change_type,
      changed_by,
      reason
    ) VALUES (
      v_review.review_round_id,
      v_review.product_id,
      v_review.assigned_to,
      NULL,
      'remove',  -- Fixed from 'removed'
      v_session_user_id,
      COALESCE(p_reason, 'Assignment removed by admin')
    );
  END IF;

  -- Delete the review
  DELETE FROM product_reviews
  WHERE id = p_review_id;

  v_result := jsonb_build_object(
    'success', true,
    'message', 'Review assignment removed successfully'
  );

  RETURN v_result;

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;
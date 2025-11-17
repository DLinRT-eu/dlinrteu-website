-- Fix reviewer dashboard start review functionality
-- Add RPC function for starting reviews with proper security and error handling

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.start_review_secure(uuid);

-- Create secure function for reviewers to start their assigned reviews
CREATE OR REPLACE FUNCTION public.start_review_secure(review_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_review_exists boolean;
  v_is_assigned boolean;
  v_current_status text;
BEGIN
  -- Check if review exists
  SELECT EXISTS (
    SELECT 1 FROM product_reviews WHERE id = review_id
  ) INTO v_review_exists;

  IF NOT v_review_exists THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;

  -- Check if user is assigned to this review
  SELECT 
    assigned_to = auth.uid(),
    status
  INTO v_is_assigned, v_current_status
  FROM product_reviews
  WHERE id = review_id;

  IF NOT v_is_assigned THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'You are not assigned to this review'
    );
  END IF;

  -- Check if already started
  IF v_current_status != 'pending' THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review already started or completed',
      'current_status', v_current_status
    );
  END IF;

  -- Update review status
  UPDATE product_reviews
  SET 
    status = 'in_progress',
    started_at = NOW()
  WHERE id = review_id
    AND assigned_to = auth.uid()
    AND status = 'pending';

  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review started successfully',
    'review_id', review_id
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.start_review_secure(uuid) TO authenticated;

COMMENT ON FUNCTION public.start_review_secure(uuid) IS 'Allows reviewers to start their assigned reviews with proper validation';

-- Create secure function for reviewers to complete their reviews
DROP FUNCTION IF EXISTS public.complete_review_secure(uuid, text);

CREATE OR REPLACE FUNCTION public.complete_review_secure(
  review_id uuid,
  completion_notes text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_review_exists boolean;
  v_is_assigned boolean;
  v_current_status text;
  v_product_id text;
BEGIN
  -- Check if review exists
  SELECT EXISTS (
    SELECT 1 FROM product_reviews WHERE id = review_id
  ) INTO v_review_exists;

  IF NOT v_review_exists THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;

  -- Check if user is assigned to this review
  SELECT 
    assigned_to = auth.uid(),
    status,
    product_id
  INTO v_is_assigned, v_current_status, v_product_id
  FROM product_reviews
  WHERE id = review_id;

  IF NOT v_is_assigned THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'You are not assigned to this review'
    );
  END IF;

  -- Check if already completed
  IF v_current_status = 'completed' OR v_current_status = 'company_reviewed' THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review already completed',
      'current_status', v_current_status
    );
  END IF;

  -- Update review status
  UPDATE product_reviews
  SET 
    status = 'completed',
    completed_at = NOW(),
    notes = CASE 
      WHEN completion_notes IS NOT NULL THEN 
        COALESCE(notes || E'\n\n', '') || 'Completion notes: ' || completion_notes
      ELSE notes
    END
  WHERE id = review_id
    AND assigned_to = auth.uid();

  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review completed successfully',
    'review_id', review_id,
    'product_id', v_product_id
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.complete_review_secure(uuid, text) TO authenticated;

COMMENT ON FUNCTION public.complete_review_secure(uuid, text) IS 'Allows reviewers to complete their assigned reviews with optional notes';

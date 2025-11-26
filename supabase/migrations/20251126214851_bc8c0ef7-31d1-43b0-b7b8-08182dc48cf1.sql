-- Create admin function to delete review rounds and all related data
CREATE OR REPLACE FUNCTION public.delete_review_round_admin(round_id_param uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
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
  
  -- Verify round exists
  IF NOT EXISTS (SELECT 1 FROM review_rounds WHERE id = round_id_param) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review round not found'
    );
  END IF;
  
  -- Delete in order to avoid FK constraint issues
  -- Delete review_round_stats
  DELETE FROM review_round_stats WHERE round_id = round_id_param;
  
  -- Delete assignment_history
  DELETE FROM assignment_history WHERE review_round_id = round_id_param;
  
  -- Delete product_reviews (this will cascade to checklist_items, comments, github_file_checks)
  DELETE FROM product_reviews WHERE review_round_id = round_id_param;
  
  -- Finally delete the review round itself
  DELETE FROM review_rounds WHERE id = round_id_param;
  
  -- Log the deletion
  PERFORM log_admin_action(
    'review_round_deleted',
    NULL,
    NULL,
    jsonb_build_object(
      'round_id', round_id_param,
      'deleted_by', v_caller_uid
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review round deleted successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Add service role policy for review_round_stats as backup
CREATE POLICY "Service role full access review_round_stats"
ON public.review_round_stats
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
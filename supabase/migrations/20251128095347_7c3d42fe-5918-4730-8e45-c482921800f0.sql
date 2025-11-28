-- Add task column to review_rounds table
ALTER TABLE review_rounds ADD COLUMN IF NOT EXISTS task text DEFAULT 'General Review';

-- Add index for efficient sorting
CREATE INDEX IF NOT EXISTS idx_review_rounds_task ON review_rounds(task);

-- Create RPC function to fetch all round assignments for export (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_all_round_assignments_admin()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
  v_data jsonb;
BEGIN
  v_caller_uid := auth.uid();
  
  -- Check admin role
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Access denied: admin role required');
  END IF;
  
  -- Fetch all assignments with round and reviewer details
  SELECT jsonb_agg(
    jsonb_build_object(
      'round_id', rr.id,
      'round_name', rr.name,
      'round_number', rr.round_number,
      'product_id', pr.product_id,
      'status', pr.status,
      'priority', pr.priority,
      'deadline', pr.deadline,
      'assigned_at', pr.assigned_at,
      'reviewer_id', pr.assigned_to,
      'reviewer_first_name', p.first_name,
      'reviewer_last_name', p.last_name,
      'reviewer_email', p.email
    )
  ) INTO v_data
  FROM product_reviews pr
  JOIN review_rounds rr ON pr.review_round_id = rr.id
  LEFT JOIN profiles p ON pr.assigned_to = p.id
  ORDER BY rr.round_number DESC, pr.assigned_at DESC;
  
  RETURN jsonb_build_object('success', true, 'data', COALESCE(v_data, '[]'::jsonb));
END;
$$;
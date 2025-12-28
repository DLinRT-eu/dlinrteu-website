-- Create RPC function to get count of pending revisions for a reviewer's assigned products
CREATE OR REPLACE FUNCTION public.get_pending_revisions_count_for_reviewer()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  -- Get count of pending revisions for products assigned to the current reviewer
  SELECT COUNT(DISTINCT cr.id)::integer INTO v_count
  FROM company_revisions cr
  WHERE cr.verification_status = 'pending'
  AND (
    -- Currently assigned
    EXISTS (
      SELECT 1 FROM product_reviews pr
      WHERE pr.product_id = cr.product_id
      AND pr.assigned_to = auth.uid()
    )
    OR
    -- Historically assigned
    EXISTS (
      SELECT 1 FROM assignment_history ah
      WHERE ah.product_id = cr.product_id
      AND (ah.assigned_to = auth.uid() OR ah.previous_assignee = auth.uid())
    )
    -- Admins see all pending
    OR has_role(auth.uid(), 'admin'::app_role)
  );
  
  RETURN COALESCE(v_count, 0);
END;
$$;
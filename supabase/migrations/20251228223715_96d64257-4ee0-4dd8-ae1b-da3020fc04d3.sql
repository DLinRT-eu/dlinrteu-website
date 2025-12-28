-- Create RPC function for reviewers to access revisions for their assigned products
CREATE OR REPLACE FUNCTION public.get_product_revisions_for_reviewer(p_product_id text)
RETURNS TABLE (
  id uuid,
  product_id text,
  company_id text,
  revision_date date,
  changes_summary text,
  verification_status text,
  verified_by uuid,
  verified_at timestamptz,
  reviewer_feedback text,
  priority text,
  created_at timestamptz,
  revised_by uuid,
  revised_by_name text,
  revised_by_email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Admins can access all revisions
  IF has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN QUERY
    SELECT cr.id, cr.product_id, cr.company_id, cr.revision_date,
           cr.changes_summary, cr.verification_status, cr.verified_by,
           cr.verified_at, cr.reviewer_feedback, cr.priority, cr.created_at,
           cr.revised_by,
           COALESCE(p.first_name || ' ' || p.last_name, 'Unknown') as revised_by_name,
           p.email as revised_by_email
    FROM company_revisions cr
    LEFT JOIN profiles p ON p.id = cr.revised_by
    WHERE cr.product_id = p_product_id
    ORDER BY cr.created_at DESC;
    RETURN;
  END IF;

  -- Check if user is currently assigned to this product
  IF EXISTS (
    SELECT 1 FROM product_reviews pr
    WHERE pr.product_id = p_product_id
    AND pr.assigned_to = auth.uid()
  ) THEN
    RETURN QUERY
    SELECT cr.id, cr.product_id, cr.company_id, cr.revision_date,
           cr.changes_summary, cr.verification_status, cr.verified_by,
           cr.verified_at, cr.reviewer_feedback, cr.priority, cr.created_at,
           cr.revised_by,
           COALESCE(p.first_name || ' ' || p.last_name, 'Unknown') as revised_by_name,
           p.email as revised_by_email
    FROM company_revisions cr
    LEFT JOIN profiles p ON p.id = cr.revised_by
    WHERE cr.product_id = p_product_id
    ORDER BY cr.created_at DESC;
    RETURN;
  END IF;

  -- Check if user was historically assigned to this product
  IF EXISTS (
    SELECT 1 FROM assignment_history ah
    WHERE ah.product_id = p_product_id
    AND (ah.assigned_to = auth.uid() OR ah.previous_assignee = auth.uid())
  ) THEN
    RETURN QUERY
    SELECT cr.id, cr.product_id, cr.company_id, cr.revision_date,
           cr.changes_summary, cr.verification_status, cr.verified_by,
           cr.verified_at, cr.reviewer_feedback, cr.priority, cr.created_at,
           cr.revised_by,
           COALESCE(p.first_name || ' ' || p.last_name, 'Unknown') as revised_by_name,
           p.email as revised_by_email
    FROM company_revisions cr
    LEFT JOIN profiles p ON p.id = cr.revised_by
    WHERE cr.product_id = p_product_id
    ORDER BY cr.created_at DESC;
    RETURN;
  END IF;

  -- No access - return empty result set (don't raise exception to allow graceful handling)
  RETURN;
END;
$$;

-- Drop the existing overly permissive policy for reviewers
DROP POLICY IF EXISTS "View company revisions" ON public.company_revisions;

-- Create a more restrictive policy: reviewers can only see revisions for products they're assigned to
CREATE POLICY "View company revisions" ON public.company_revisions
  FOR SELECT USING (
    -- Company reps can see their own revisions
    revised_by = auth.uid()
    -- Admins can see all
    OR has_role(auth.uid(), 'admin'::app_role)
    -- Reviewers can only see revisions for products they're assigned to (current or historical)
    OR (
      has_role(auth.uid(), 'reviewer'::app_role) AND (
        -- Current assignment
        EXISTS (
          SELECT 1 FROM product_reviews pr
          WHERE pr.product_id = company_revisions.product_id
          AND pr.assigned_to = auth.uid()
        )
        OR
        -- Historical assignment (for continuity)
        EXISTS (
          SELECT 1 FROM assignment_history ah
          WHERE ah.product_id = company_revisions.product_id
          AND (ah.assigned_to = auth.uid() OR ah.previous_assignee = auth.uid())
        )
      )
    )
  );

-- Add index to improve performance of the RLS policy queries
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_assigned 
ON public.product_reviews(product_id, assigned_to);

CREATE INDEX IF NOT EXISTS idx_assignment_history_product_assignees 
ON public.assignment_history(product_id, assigned_to, previous_assignee);
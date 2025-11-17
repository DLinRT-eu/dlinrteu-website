-- Add GitHub file tracking for automatic review conclusion
-- Track GitHub file modification dates and automatically mark reviews for revision when files change

-- Add columns to product_reviews for GitHub tracking
ALTER TABLE public.product_reviews 
  ADD COLUMN IF NOT EXISTS github_file_url text,
  ADD COLUMN IF NOT EXISTS github_last_modified timestamptz,
  ADD COLUMN IF NOT EXISTS auto_revision_triggered boolean DEFAULT false;

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_product_reviews_github_tracking 
  ON public.product_reviews(github_file_url, github_last_modified) 
  WHERE github_file_url IS NOT NULL;

-- Create table to track GitHub file check history
CREATE TABLE IF NOT EXISTS public.github_file_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES public.product_reviews(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  checked_at timestamptz DEFAULT NOW(),
  last_modified timestamptz,
  file_changed boolean DEFAULT false,
  triggered_revision boolean DEFAULT false,
  check_result jsonb,
  created_at timestamptz DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.github_file_checks ENABLE ROW LEVEL SECURITY;

-- RLS policies for github_file_checks
CREATE POLICY "Admins can manage all file checks"
  ON public.github_file_checks FOR ALL
  TO authenticated
  USING (is_admin_secure())
  WITH CHECK (is_admin_secure());

CREATE POLICY "Reviewers can view their file checks"
  ON public.github_file_checks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM product_reviews pr
      WHERE pr.id = github_file_checks.review_id
        AND pr.assigned_to = auth.uid()
    )
  );

-- Create function to check if GitHub file was modified after assignment
CREATE OR REPLACE FUNCTION public.check_github_file_modified(
  review_id uuid,
  github_file_url text,
  current_file_modified timestamptz
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_assigned_at timestamptz;
  v_current_status text;
  v_previous_modified timestamptz;
  v_file_changed boolean := false;
  v_should_trigger boolean := false;
BEGIN
  -- Get review details
  SELECT assigned_at, status, github_last_modified
  INTO v_assigned_at, v_current_status, v_previous_modified
  FROM product_reviews
  WHERE id = review_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review not found'
    );
  END IF;

  -- Check if file was modified after assignment date
  IF current_file_modified > v_assigned_at THEN
    v_file_changed := true;
    
    -- Only trigger revision if review is completed
    IF v_current_status = 'completed' THEN
      v_should_trigger := true;
    END IF;
  END IF;

  -- Update review with GitHub info
  UPDATE product_reviews
  SET 
    github_file_url = github_file_url,
    github_last_modified = current_file_modified,
    auto_revision_triggered = CASE 
      WHEN v_should_trigger THEN true 
      ELSE auto_revision_triggered 
    END,
    status = CASE 
      WHEN v_should_trigger THEN 'pending'::text 
      ELSE status 
    END,
    notes = CASE 
      WHEN v_should_trigger THEN 
        COALESCE(notes || E'\n\n', '') || 
        format('AUTO-REVISION: GitHub file modified on %s (after assignment on %s). Review requires update.',
          current_file_modified::date, v_assigned_at::date)
      ELSE notes 
    END
  WHERE id = review_id;

  -- Log the check
  INSERT INTO github_file_checks (
    review_id,
    file_url,
    last_modified,
    file_changed,
    triggered_revision,
    check_result
  ) VALUES (
    review_id,
    github_file_url,
    current_file_modified,
    v_file_changed,
    v_should_trigger,
    jsonb_build_object(
      'assigned_at', v_assigned_at,
      'file_modified', current_file_modified,
      'status_before', v_current_status,
      'triggered_at', NOW()
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'file_changed', v_file_changed,
    'revision_triggered', v_should_trigger,
    'assigned_at', v_assigned_at,
    'file_modified', current_file_modified,
    'previous_status', v_current_status
  );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.check_github_file_modified(uuid, text, timestamptz) TO authenticated;

COMMENT ON FUNCTION public.check_github_file_modified(uuid, text, timestamptz) IS 
  'Checks if a GitHub file was modified after review assignment and triggers automatic revision if needed';

-- Create function to batch check multiple reviews for GitHub changes
CREATE OR REPLACE FUNCTION public.batch_check_github_files()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_check_count integer := 0;
  v_triggered_count integer := 0;
  v_review record;
BEGIN
  -- Only admins can run batch checks
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Only admins can run batch GitHub checks'
    );
  END IF;

  -- Note: This function is a placeholder for webhook integration
  -- In production, you would call GitHub API here to check file modification dates
  -- For now, it just returns a structure for the frontend to use
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Batch check initiated - webhook integration required',
    'checks_performed', v_check_count,
    'revisions_triggered', v_triggered_count,
    'note', 'This requires GitHub webhook or API integration to be fully functional'
  );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.batch_check_github_files() TO authenticated;

COMMENT ON FUNCTION public.batch_check_github_files() IS 
  'Admin function to batch check all reviews with GitHub URLs for file modifications';

-- Create view for reviews needing GitHub checks
CREATE OR REPLACE VIEW public.reviews_with_github_tracking AS
SELECT 
  pr.id,
  pr.product_id,
  pr.assigned_to,
  pr.status,
  pr.assigned_at,
  pr.github_file_url,
  pr.github_last_modified,
  pr.auto_revision_triggered,
  p.first_name || ' ' || p.last_name as reviewer_name,
  p.email as reviewer_email,
  (SELECT COUNT(*) FROM github_file_checks WHERE review_id = pr.id) as check_count,
  (SELECT MAX(checked_at) FROM github_file_checks WHERE review_id = pr.id) as last_check_at
FROM product_reviews pr
LEFT JOIN profiles p ON pr.assigned_to = p.id
WHERE pr.github_file_url IS NOT NULL;

-- Grant access to view
GRANT SELECT ON public.reviews_with_github_tracking TO authenticated;

COMMENT ON VIEW public.reviews_with_github_tracking IS 
  'View of all reviews with GitHub file tracking enabled';

-- Add helpful comments
COMMENT ON COLUMN public.product_reviews.github_file_url IS 
  'GitHub repository file URL to track for changes';
COMMENT ON COLUMN public.product_reviews.github_last_modified IS 
  'Last known modification timestamp of the GitHub file';
COMMENT ON COLUMN public.product_reviews.auto_revision_triggered IS 
  'Whether an automatic revision was triggered due to GitHub file changes';

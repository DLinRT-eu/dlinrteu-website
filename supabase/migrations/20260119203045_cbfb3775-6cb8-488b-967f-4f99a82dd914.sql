-- Add reminder tracking column to product_reviews
ALTER TABLE public.product_reviews
ADD COLUMN IF NOT EXISTS last_reminder_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Add index for efficient querying of reviews needing reminders
CREATE INDEX IF NOT EXISTS idx_product_reviews_deadline_reminder 
ON public.product_reviews (deadline, status, last_reminder_sent_at) 
WHERE status IN ('pending', 'in_progress') AND deadline IS NOT NULL;

-- Create function to get reviews needing deadline reminders
CREATE OR REPLACE FUNCTION public.get_reviews_needing_reminders()
RETURNS TABLE (
  review_id UUID,
  product_id TEXT,
  reviewer_id UUID,
  reviewer_email TEXT,
  reviewer_first_name TEXT,
  reviewer_last_name TEXT,
  deadline DATE,
  status TEXT,
  days_until_deadline INTEGER,
  round_name TEXT,
  last_reminder_sent_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pr.id AS review_id,
    pr.product_id,
    pr.assigned_to AS reviewer_id,
    p.email AS reviewer_email,
    p.first_name AS reviewer_first_name,
    p.last_name AS reviewer_last_name,
    pr.deadline,
    pr.status,
    (pr.deadline - CURRENT_DATE)::INTEGER AS days_until_deadline,
    rr.name AS round_name,
    pr.last_reminder_sent_at
  FROM product_reviews pr
  JOIN profiles p ON pr.assigned_to = p.id
  LEFT JOIN review_rounds rr ON pr.review_round_id = rr.id
  WHERE 
    pr.status IN ('pending', 'in_progress')
    AND pr.deadline IS NOT NULL
    AND pr.assigned_to IS NOT NULL
    -- Reviews due within 3 days or overdue
    AND (pr.deadline - CURRENT_DATE) <= 3
    -- Haven't sent a reminder in the last 24 hours
    AND (
      pr.last_reminder_sent_at IS NULL 
      OR pr.last_reminder_sent_at < NOW() - INTERVAL '24 hours'
    )
  ORDER BY pr.deadline ASC;
END;
$$;

-- Create function to update reminder timestamp
CREATE OR REPLACE FUNCTION public.mark_reminder_sent(p_review_ids UUID[])
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE product_reviews
  SET last_reminder_sent_at = NOW()
  WHERE id = ANY(p_review_ids);
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$;
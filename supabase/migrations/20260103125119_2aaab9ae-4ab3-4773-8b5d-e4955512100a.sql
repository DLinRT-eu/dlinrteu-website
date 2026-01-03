-- Create product_revision_dates table to store revision dates from completed reviews
CREATE TABLE public.product_revision_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL UNIQUE,
  last_revised_at timestamp with time zone NOT NULL DEFAULT now(),
  last_revised_by uuid,
  revision_source text NOT NULL DEFAULT 'review_completion',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_revision_dates ENABLE ROW LEVEL SECURITY;

-- RLS policies - public read, authenticated write
CREATE POLICY "Anyone can read product revision dates" 
  ON public.product_revision_dates FOR SELECT USING (true);

CREATE POLICY "Reviewers and admins can insert revision dates" 
  ON public.product_revision_dates FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'reviewer')
    )
  );

CREATE POLICY "Reviewers and admins can update revision dates" 
  ON public.product_revision_dates FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'reviewer')
    )
  );

-- Update complete_review_secure function to auto-update revision dates
CREATE OR REPLACE FUNCTION public.complete_review_secure(review_id uuid, completion_notes text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id UUID;
  v_product_id TEXT;
  v_current_status TEXT;
BEGIN
  v_user_id := auth.uid();
  
  -- Verify user has reviewer role
  IF NOT EXISTS(SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role IN ('reviewer', 'admin')) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Access denied: reviewer or admin role required');
  END IF;
  
  -- Get review details
  SELECT product_id, status INTO v_product_id, v_current_status
  FROM product_reviews
  WHERE id = review_id AND (assigned_to = v_user_id OR EXISTS(SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role = 'admin'));
  
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Review not found or not assigned to you');
  END IF;
  
  IF v_current_status = 'completed' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Review already completed');
  END IF;
  
  -- Update review status
  UPDATE product_reviews
  SET 
    status = 'completed',
    completed_at = NOW(),
    notes = COALESCE(completion_notes, notes),
    last_activity_at = NOW(),
    updated_at = NOW()
  WHERE id = review_id;
  
  -- Auto-update product revision date
  INSERT INTO product_revision_dates (product_id, last_revised_at, last_revised_by, revision_source, notes)
  VALUES (v_product_id, NOW(), v_user_id, 'review_completion', 'Auto-updated on review completion')
  ON CONFLICT (product_id) 
  DO UPDATE SET 
    last_revised_at = NOW(),
    last_revised_by = v_user_id,
    revision_source = 'review_completion',
    notes = 'Auto-updated on review completion',
    updated_at = NOW();
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'Review completed successfully',
    'product_id', v_product_id,
    'revision_date_updated', true
  );
END;
$function$;

-- Backfill existing completed reviews
INSERT INTO product_revision_dates (product_id, last_revised_at, last_revised_by, revision_source, notes)
SELECT 
  pr.product_id,
  pr.completed_at,
  pr.assigned_to,
  'review_completion_backfill',
  'Backfilled from completed review'
FROM product_reviews pr
WHERE pr.status = 'completed' 
  AND pr.completed_at IS NOT NULL
ON CONFLICT (product_id) 
DO UPDATE SET 
  last_revised_at = EXCLUDED.last_revised_at,
  last_revised_by = EXCLUDED.last_revised_by,
  revision_source = 'review_completion_backfill',
  notes = 'Backfilled from completed review',
  updated_at = NOW();
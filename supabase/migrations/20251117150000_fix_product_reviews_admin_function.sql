-- Fix get_product_reviews_admin_secure function to remove reference to non-existent products table
-- Products are stored in code, not in database

-- Drop the existing function first since we're changing the return type
DROP FUNCTION IF EXISTS public.get_product_reviews_admin_secure();

CREATE OR REPLACE FUNCTION public.get_product_reviews_admin_secure()
RETURNS TABLE(
  id UUID,
  product_id TEXT,
  review_round_id UUID,
  assigned_to UUID,
  reviewer_first_name TEXT,
  reviewer_last_name TEXT,
  reviewer_email TEXT,
  status TEXT,
  priority TEXT,
  deadline TIMESTAMPTZ,
  notes TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    pr.id,
    pr.product_id,
    pr.review_round_id,
    pr.assigned_to,
    p.first_name as reviewer_first_name,
    p.last_name as reviewer_last_name,
    p.email as reviewer_email,
    pr.status,
    pr.priority,
    pr.deadline,
    pr.notes,
    pr.started_at,
    pr.completed_at,
    pr.last_activity_at,
    pr.created_at
  FROM public.product_reviews pr
  LEFT JOIN public.profiles p ON p.id = pr.assigned_to
  ORDER BY pr.created_at DESC;
END;
$$;

-- Fix review rounds loading: Add service role policy and admin RPC function

-- 1. Add service role policy for review_rounds
CREATE POLICY "Service role full access review_rounds"
ON public.review_rounds
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 2. Drop existing function and recreate with correct signature
DROP FUNCTION IF EXISTS public.get_review_rounds_admin();

CREATE OR REPLACE FUNCTION public.get_review_rounds_admin()
RETURNS TABLE(
  id uuid,
  name text,
  round_number integer,
  description text,
  status text,
  start_date date,
  end_date date,
  default_deadline date,
  total_products integer,
  total_assignments integer,
  created_at timestamptz,
  created_by uuid,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    rr.id,
    rr.name,
    rr.round_number,
    rr.description,
    rr.status,
    rr.start_date,
    rr.end_date,
    rr.default_deadline,
    rr.total_products,
    rr.total_assignments,
    rr.created_at,
    rr.created_by,
    rr.updated_at
  FROM public.review_rounds rr
  ORDER BY rr.created_at DESC;
END;
$$;
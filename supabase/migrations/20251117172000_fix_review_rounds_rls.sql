-- Fix review_rounds RLS policies to use is_admin_secure() instead of has_role()
-- This ensures consistent admin checking across the application

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage all rounds" ON public.review_rounds;
DROP POLICY IF EXISTS "Admins full access to review_rounds" ON public.review_rounds;

-- Create unified admin policy using is_admin_secure()
CREATE POLICY "Admins full access to review_rounds"
ON public.review_rounds
FOR ALL
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());

COMMENT ON POLICY "Admins full access to review_rounds" ON public.review_rounds IS 
  'Allows admins to create, read, update, and delete review rounds using is_admin_secure()';

-- Comprehensive fix for all RLS permission issues
-- This fixes user registration, role assignment, and review rounds

-- Fix 1: Replace user_roles policies with SECURITY DEFINER function
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Ensure product_reviews has explicit INSERT policy
DROP POLICY IF EXISTS "Admins can insert reviews" ON public.product_reviews;

CREATE POLICY "Admins can insert reviews"
ON public.product_reviews
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Ensure review_rounds has explicit INSERT policy
DROP POLICY IF EXISTS "Admins can insert review rounds" ON public.review_rounds;

CREATE POLICY "Admins can insert review rounds"
ON public.review_rounds
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_secure());

-- Fix 4: Fix assignment_history policies - change from 'public' to 'authenticated'
DROP POLICY IF EXISTS "Admins can insert assignment history" ON public.assignment_history;
DROP POLICY IF EXISTS "Admins can view all assignment history" ON public.assignment_history;
DROP POLICY IF EXISTS "Reviewers can view own assignment history" ON public.assignment_history;

CREATE POLICY "Admins can insert assignment history"
ON public.assignment_history
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all assignment history"
ON public.assignment_history
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Reviewers can view own assignment history"
ON public.assignment_history
FOR SELECT
TO authenticated
USING (
  (assigned_to = auth.uid()) OR 
  (previous_assignee = auth.uid()) OR 
  public.has_role(auth.uid(), 'reviewer'::app_role)
);

-- Add helpful comments
COMMENT ON POLICY "Admins can insert roles" ON public.user_roles IS 
  'Allows admins to grant roles using SECURITY DEFINER has_role() function to avoid RLS recursion.';

COMMENT ON POLICY "Admins can delete roles" ON public.user_roles IS 
  'Allows admins to revoke roles using SECURITY DEFINER has_role() function.';

COMMENT ON POLICY "Admins can insert assignment history" ON public.assignment_history IS 
  'Fixed: Changed from public to authenticated role, uses has_role() SECURITY DEFINER function.';
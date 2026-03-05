-- Fix: Restrict reviewer SELECT policy on product_reviews to only assigned reviews
-- Drop the overly broad policy that lets any reviewer see ALL reviews
DROP POLICY IF EXISTS "Reviewers can view assigned reviews" ON public.product_reviews;

-- Recreate with tighter scope: reviewers can only see their own assigned reviews
CREATE POLICY "Reviewers can view assigned reviews" ON public.product_reviews
  FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());
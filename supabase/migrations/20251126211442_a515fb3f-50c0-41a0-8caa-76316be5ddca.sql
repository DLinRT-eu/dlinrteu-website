-- Add service role policy for product_reviews to support SECURITY DEFINER functions
CREATE POLICY "Service role full access product_reviews"
ON public.product_reviews
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
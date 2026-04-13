
-- Fix contact_submissions: change permissive deny to restrictive
DROP POLICY IF EXISTS "Deny all public access to contact submissions" ON public.contact_submissions;
CREATE POLICY "Deny all public access to contact submissions"
  ON public.contact_submissions
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Fix newsletter_subscribers: change permissive deny to restrictive
DROP POLICY IF EXISTS "Deny all public access to newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Deny all public access to newsletter subscribers"
  ON public.newsletter_subscribers
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Fix product_edit_drafts: change permissive deny to restrictive
DROP POLICY IF EXISTS "Deny anonymous access to product_edit_drafts" ON public.product_edit_drafts;
CREATE POLICY "Deny anonymous access to product_edit_drafts"
  ON public.product_edit_drafts
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Fix product_feedback: change permissive deny to restrictive
DROP POLICY IF EXISTS "Deny anon access to product_feedback" ON public.product_feedback;
CREATE POLICY "Deny anon access to product_feedback"
  ON public.product_feedback
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

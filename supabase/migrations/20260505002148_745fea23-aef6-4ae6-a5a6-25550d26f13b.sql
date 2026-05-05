
-- Defense-in-depth: explicit anon denial on product_edit_drafts (already present) and certification_reminder_logs
CREATE POLICY "Deny anonymous access to certification_reminder_logs"
  ON public.certification_reminder_logs
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Restrict write operations on certification_reminder_logs to admins (logs are inserted by edge functions via service role which bypasses RLS)
CREATE POLICY "Admins can insert certification_reminder_logs"
  ON public.certification_reminder_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update certification_reminder_logs"
  ON public.certification_reminder_logs
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete certification_reminder_logs"
  ON public.certification_reminder_logs
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Revoke EXECUTE on SECURITY DEFINER RPCs from anon (require authenticated session)
REVOKE EXECUTE ON FUNCTION public.create_company_revision(text, text, text, date, jsonb, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_my_company_revisions() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_my_reviews_secure() FROM anon;

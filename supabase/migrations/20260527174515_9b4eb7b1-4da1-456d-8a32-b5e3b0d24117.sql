
-- 1. contact_submissions: add permissive admin SELECT/UPDATE/DELETE policies (RESTRICTIVE deny remains for anon)
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role inserts from edge functions
CREATE POLICY "Service role can insert contact submissions"
ON public.contact_submissions FOR INSERT TO public
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- 2. email_send_log: make service-role writes explicit
CREATE POLICY "Service role can insert email send log"
ON public.email_send_log FOR INSERT TO public
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

CREATE POLICY "Service role can update email send log"
ON public.email_send_log FOR UPDATE TO public
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- 3. profile_document_access_log: allow service role + owners to log access
CREATE POLICY "Service role can insert document access log"
ON public.profile_document_access_log FOR INSERT TO public
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

CREATE POLICY "Authenticated users can log own document access"
ON public.profile_document_access_log FOR INSERT TO authenticated
WITH CHECK (
  accessed_by = auth.uid()
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR document_id IN (SELECT id FROM public.profile_documents WHERE user_id = auth.uid())
  )
);

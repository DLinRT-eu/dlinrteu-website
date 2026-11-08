DROP POLICY "Company can update own pending revisions" ON public.company_revisions;
CREATE POLICY "Company can update own pending revisions" ON public.company_revisions FOR UPDATE TO authenticated
USING (revised_by = auth.uid() AND verification_status = 'pending' AND has_role(auth.uid(), 'company'::app_role)
  AND EXISTS (SELECT 1 FROM public.company_representatives cr WHERE cr.user_id = auth.uid() AND cr.company_id = company_revisions.company_id AND cr.verified = true))
WITH CHECK (revised_by = auth.uid() AND verification_status IN ('pending','withdrawn') AND has_role(auth.uid(), 'company'::app_role)
  AND EXISTS (SELECT 1 FROM public.company_representatives cr WHERE cr.user_id = auth.uid() AND cr.company_id = company_revisions.company_id AND cr.verified = true));
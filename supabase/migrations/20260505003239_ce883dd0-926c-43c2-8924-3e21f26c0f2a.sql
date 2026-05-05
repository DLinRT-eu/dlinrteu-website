-- Allow company users to withdraw their pending revisions by updating status to 'withdrawn'
DROP POLICY IF EXISTS "Company can update own pending revisions" ON public.company_revisions;

CREATE POLICY "Company can update own pending revisions"
ON public.company_revisions
FOR UPDATE
TO authenticated
USING (
  (revised_by = auth.uid())
  AND (verification_status = 'pending'::text)
  AND has_role(auth.uid(), 'company'::app_role)
)
WITH CHECK (
  (revised_by = auth.uid())
  AND (verification_status = ANY (ARRAY['pending'::text, 'withdrawn'::text]))
  AND has_role(auth.uid(), 'company'::app_role)
);
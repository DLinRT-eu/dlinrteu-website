-- Allow companies to UPDATE their own PENDING revisions
CREATE POLICY "Company can update own pending revisions"
ON public.company_revisions
FOR UPDATE
TO authenticated
USING (
  revised_by = auth.uid() 
  AND verification_status = 'pending'
  AND has_role(auth.uid(), 'company'::app_role)
)
WITH CHECK (
  revised_by = auth.uid() 
  AND verification_status = 'pending'
  AND has_role(auth.uid(), 'company'::app_role)
);

-- Allow companies to DELETE their own PENDING revisions  
CREATE POLICY "Company can delete own pending revisions"
ON public.company_revisions
FOR DELETE
TO authenticated
USING (
  revised_by = auth.uid() 
  AND verification_status = 'pending'
  AND has_role(auth.uid(), 'company'::app_role)
);

COMMENT ON POLICY "Company can update own pending revisions" ON public.company_revisions IS 
  'Companies can edit their pending revisions before admin review. Approved/rejected revisions are immutable.';

COMMENT ON POLICY "Company can delete own pending revisions" ON public.company_revisions IS 
  'Companies can delete their pending revisions. Approved/rejected revisions cannot be deleted to preserve audit trail.';
DROP POLICY IF EXISTS "Authenticated users can read product revision dates" ON public.product_revision_dates;
CREATE POLICY "Reviewers and admins can read product revision dates"
ON public.product_revision_dates
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'reviewer'::public.app_role)
);

DROP POLICY IF EXISTS "Public can view verifications" ON public.company_product_verifications;
CREATE POLICY "Public can view completed verifications"
ON public.company_product_verifications
FOR SELECT
TO anon, authenticated
USING (verified_at IS NOT NULL);

CREATE POLICY "Company reps can view own company verifications"
ON public.company_product_verifications
FOR SELECT
TO authenticated
USING (public.can_represent_company(auth.uid(), company_id));

DROP POLICY IF EXISTS "Public can view financial_income" ON public.financial_income;
CREATE POLICY "Admins can view financial_income"
ON public.financial_income
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public can view financial_expenses" ON public.financial_expenses;
CREATE POLICY "Admins can view financial_expenses"
ON public.financial_expenses
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
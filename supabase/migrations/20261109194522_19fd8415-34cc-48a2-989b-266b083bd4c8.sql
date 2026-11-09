REVOKE ALL ON public.company_product_ownership FROM authenticated, anon;
DROP POLICY IF EXISTS "Authenticated users can read product ownership" ON public.company_product_ownership;
DROP POLICY IF EXISTS "Admins manage product ownership" ON public.company_product_ownership;
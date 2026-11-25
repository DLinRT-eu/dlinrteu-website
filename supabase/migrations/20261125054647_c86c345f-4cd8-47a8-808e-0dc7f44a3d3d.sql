CREATE OR REPLACE FUNCTION public.get_public_product_verifications()
RETURNS TABLE(product_id text, verified_at timestamptz, content_hash text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT product_id, verified_at, content_hash
  FROM public.company_product_verifications
  WHERE verified_at IS NOT NULL
$$;
REVOKE ALL ON FUNCTION public.get_public_product_verifications() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_product_verifications() TO anon, authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.create_company_revision(text, text, text, date, jsonb, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_my_company_revisions() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_my_reviews_secure() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.create_company_revision(text, text, text, date, jsonb, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_company_revisions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_reviews_secure() TO authenticated;

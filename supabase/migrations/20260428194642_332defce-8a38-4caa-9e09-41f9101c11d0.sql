-- Revoke unnecessary GraphQL/PostgREST exposure for anon and authenticated roles
-- on objects not actively queried by clients.

REVOKE SELECT ON public.analytics_summary FROM anon, authenticated;
REVOKE SELECT ON public.analytics_public FROM anon, authenticated;
REVOKE SELECT ON public.company_products FROM anon, authenticated;
REVOKE SELECT ON public.reviews_with_github_tracking FROM anon, authenticated;
REVOKE SELECT ON public.github_file_checks FROM anon, authenticated;
REVOKE SELECT ON public.product_feedback FROM anon, authenticated;
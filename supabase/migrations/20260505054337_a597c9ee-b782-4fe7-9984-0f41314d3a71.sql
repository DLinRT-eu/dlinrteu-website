-- Revoke GraphQL/PostgREST exposure of internal views from anon and authenticated
REVOKE SELECT ON public.analytics_summary FROM anon, authenticated;
REVOKE SELECT ON public.company_products FROM anon, authenticated;
REVOKE SELECT ON public.public_team_members FROM anon;
REVOKE SELECT ON public.reviews_with_github_tracking FROM anon, authenticated;
REVOKE SELECT ON public.user_product_experiences FROM anon;
-- authenticated still needs user_product_experiences (queried client-side, RLS applies via security_invoker)

-- Revoke EXECUTE on trigger-only SECURITY DEFINER function from public roles
REVOKE EXECUTE ON FUNCTION public.enforce_backup_code_quota() FROM PUBLIC, anon, authenticated;
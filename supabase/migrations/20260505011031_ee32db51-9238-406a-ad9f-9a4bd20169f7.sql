-- Trigger-only functions
REVOKE EXECUTE ON FUNCTION public.auto_grant_dlinrt_reviewer_role() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.trigger_auto_grant_dlinrt_reviewer() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_company_rep_limit() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_company_role_before_product_adoption() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_products_before_company_role() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_role_compatibility() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.guard_company_rep_verified() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.guard_role_request_admin() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_role_change() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.grant_admin_company_oversight() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;

-- Periodic / service-role-only maintenance
REVOKE EXECUTE ON FUNCTION public.cleanup_old_contact_submissions() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_security_events() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_analytics_data() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.send_pending_registration_notifications() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.expire_old_invitations() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.batch_check_github_files() FROM anon, authenticated, public;

-- Debug helper — admin SQL editor only
REVOKE EXECUTE ON FUNCTION public.debug_reviewer_access(uuid) FROM anon, authenticated, public;
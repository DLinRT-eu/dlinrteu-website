# Fix: Authenticated Users Can Execute SECURITY DEFINER Functions

## Finding
Supabase lint 0029 flags every `SECURITY DEFINER` function in `public` whose `EXECUTE` privilege is held by `authenticated`. The default `GRANT EXECUTE ... TO public` from migrations exposes all of them via PostgREST RPC (`/rest/v1/rpc/<fn>`).

## Triage
Two categories of `SECURITY DEFINER` functions exist:

1. **App-facing RPCs** — already self-check the caller's role (admin/reviewer/company) and either succeed or return an error. These must remain callable by `authenticated` (the app uses them via `supabase.rpc(...)`). Examples: `certify_product`, `create_company_revision`, `get_my_reviews_secure`, `complete_review_secure`, `approve_role_request`, `get_review_rounds_admin`, `is_admin_secure`, `has_role`, `can_represent_company`, etc. → leave as-is.

2. **Internal helpers** that should never be called via the API:
   - **Trigger-only**: fired from triggers, no role needs `EXECUTE`.
   - **Maintenance**: cron / service-role utilities.
   - **Debug**: admin-only via SQL editor.

## Migration

```sql
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
```

Service role retains EXECUTE on everything (default), so triggers, cron, and edge functions continue to work.

## After
- Mark `SUPA_authenticated_security_definer_function_executable` ignored for the remaining flagged RPCs (#1 above) with rationale: each function performs its own `is_admin_secure()` / `has_role()` / `can_represent_company()` check before any privileged action.
- Update security memory with the rule: new SECURITY DEFINER functions must either (a) self-check the caller's role and be granted to `authenticated`, or (b) revoke EXECUTE from `public, anon, authenticated` if used only by triggers/cron.

No frontend code changes required.

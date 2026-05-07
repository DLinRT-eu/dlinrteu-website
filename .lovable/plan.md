## Goal

Resolve the 100 Supabase linter findings by (a) tightening table/view exposure to `anon`/`authenticated` where the object is only ever touched server-side, and (b) revoking `EXECUTE` from `authenticated` on SECURITY DEFINER functions that are only used by triggers, cron, or service-role admin paths. Keep every legitimate client query and RPC working.

## Constraints

- Most flagged tables (`profiles`, `notifications`, `user_roles`, `product_reviews`, `product_edit_drafts`, `company_revisions`, `reviewer_expertise`, `user_products`, `consent_audit_log`, `role_requests`, `assignment_history`, `changelog_entries`, `changelog_links`, `product_revision_dates`, `company_representatives`, `company_product_verifications`, `user_product_experiences` view) are read directly from the client through PostgREST. RLS already restricts rows. Revoking SELECT from `authenticated` would break the app.
- Many flagged DEFINER functions are RPCs the client calls by name. Revoking EXECUTE from `authenticated` would break them.
- Leaked-password protection is a Supabase Auth toggle, not code — out of scope for migration.

## Approach

Three buckets:

### Bucket A — Safe to lock down (revoke from anon/authenticated)

Server-only objects with no client-side `from('…').select()` or `.rpc('…')` callers:

Tables/views to revoke `SELECT FROM authenticated, anon` on:
- `analytics_summary` (view) — only consumed by service role; admin reads go through `get_analytics_*` RPCs.
- Any object currently still granting `anon` SELECT that is not a public landing-page resource.

DEFINER functions to revoke `EXECUTE FROM authenticated, anon` (trigger-only / cron / service-role only):
- `auto_grant_dlinrt_reviewer_role`, `check_company_rep_limit`, `check_company_role_before_product_adoption`, `check_products_before_company_role`, `check_role_compatibility`, `enforce_backup_code_quota`, `cleanup_old_analytics_data`, `cleanup_old_contact_submissions`, `cleanup_old_security_events`, `cleanup_unused_backup_codes`, `expire_old_invitations`, `batch_check_github_files`, `check_github_file_modified`, `get_reviews_needing_reminders` (both overloads), `admin_health_check`.

These either fire from triggers (which run as table owner regardless of EXECUTE grants) or from edge functions using the service role key (which bypasses grants).

### Bucket B — Keep accessible, mark linter findings as ignored with rationale

These DEFINER functions and tables MUST remain callable/queryable by `authenticated` because the React app invokes them directly. They are safe because:
- Tables: RLS policies are already in place and were verified earlier.
- Functions: each one performs its own `auth.uid()` + `has_role()` checks before acting.

We will use `manage_security_finding` to ignore each remaining lint with a one-line rationale ("RLS-protected; client reads via PostgREST" or "DEFINER RPC, performs in-body role check"), and update `mem://security/database-security-posture` so future scans don't re-raise them.

Examples kept as-is: `has_role`, `is_admin_secure`, `can_represent_company`, `can_access_company`, `get_my_reviews_secure`, `get_my_company_revisions`, `create_company_revision`, `complete_review_secure`, `certify_product`, `create_notification`, `approve_role_request`, all `get_*_admin*` RPCs (admin pages), `get_analytics_*` (admin pages), etc.

### Bucket C — Out of scope

- Lint #100 (Leaked Password Protection): toggle in Supabase Auth dashboard — document in plan output, can't fix via migration.

## Migration

One migration file revoking the Bucket A grants:

```sql
-- Bucket A: server-only views
revoke select on public.analytics_summary from anon, authenticated;

-- Bucket A: trigger / cron / service-role-only DEFINER functions
revoke execute on function public.auto_grant_dlinrt_reviewer_role()                from anon, authenticated;
revoke execute on function public.check_company_rep_limit()                        from anon, authenticated;
revoke execute on function public.check_company_role_before_product_adoption()     from anon, authenticated;
revoke execute on function public.check_products_before_company_role()             from anon, authenticated;
revoke execute on function public.check_role_compatibility()                       from anon, authenticated;
revoke execute on function public.enforce_backup_code_quota()                      from anon, authenticated;
revoke execute on function public.cleanup_old_analytics_data()                     from anon, authenticated;
revoke execute on function public.cleanup_old_contact_submissions()                from anon, authenticated;
revoke execute on function public.cleanup_old_security_events()                    from anon, authenticated;
revoke execute on function public.cleanup_unused_backup_codes(uuid)                from anon, authenticated;
revoke execute on function public.expire_old_invitations()                         from anon, authenticated;
revoke execute on function public.batch_check_github_files()                       from anon, authenticated;
revoke execute on function public.check_github_file_modified(uuid, text, timestamptz) from anon, authenticated;
revoke execute on function public.get_reviews_needing_reminders()                  from anon, authenticated;
revoke execute on function public.get_reviews_needing_reminders(integer, integer)  from anon, authenticated;
revoke execute on function public.admin_health_check()                             from anon, authenticated;
```

## Post-migration steps

1. Re-run `supabase--linter` — expect ~16 fewer findings.
2. For the remaining ~83 findings (Buckets B + C), call `security--manage_security_finding` with `operation: "ignore"` and a per-finding rationale.
3. Update `mem://security/database-security-posture` with: "Bucket A revocations applied; remaining DEFINER/PostgREST exposures intentional with RLS + in-function role checks."
4. Tell the user to enable **Leaked Password Protection** at: `https://supabase.com/dashboard/project/msyfxyxzjyowwasgturs/auth/providers`.

## Risk

Low. Bucket A revocations target only triggers/cron/service-role paths. If any admin page silently depends on one (e.g., a manual "run cleanup" button), the corresponding RPC will return permission denied — easy to spot and reversed by a one-line GRANT.

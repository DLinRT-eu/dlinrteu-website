# Security Lint Triage: GraphQL Exposure & SECURITY DEFINER Functions

## Context

Supabase linter raised 102 warnings across three rules:
- **0026** — anon can see object in GraphQL schema (1 finding)
- **0027** — authenticated can see object in GraphQL schema (~17 findings)
- **0029** — authenticated can EXECUTE a SECURITY DEFINER function (~80 findings)

These are **discoverability** warnings, not RLS bypass findings. Every flagged table is already protected by row-level security, and every flagged RPC checks the caller's role internally. The risk is schema introspection and the ability to *call* RPCs (which then return nothing for non-authorized users).

## Audit Result

After querying `information_schema` and `pg_proc`:

**Tables/views still SELECT-able by `authenticated`** (all have RLS):
- Intentional API surface used by the React app: `profiles`, `user_roles`, `notifications`, `product_reviews`, `product_edit_drafts`, `product_revision_dates`, `assignment_history`, `changelog_entries`, `changelog_links`, `company_product_verifications`, `company_representatives`, `company_revisions`, `consent_audit_log`, `reviewer_expertise`, `role_requests`, `user_products`, `user_product_experiences`
- **No anon SELECT** is granted on any public table (the lone 0026 finding appears stale).

**SECURITY DEFINER functions executable by `authenticated`** (~50):
- All are RPCs the frontend or other RPCs depend on (`get_my_reviews_secure`, `complete_review_secure`, `approve_role_request`, `certify_product`, `create_company_revision`, `has_role`, `is_admin`, etc.).
- A handful are trigger-only or cron-only and do **not** need authenticated EXECUTE: `auto_grant_dlinrt_reviewer_role`, `batch_check_github_files`, `check_company_rep_limit`, `check_company_role_before_product_adoption`, `check_products_before_company_role`, `check_role_compatibility`, `cleanup_old_analytics_data`, `cleanup_old_contact_submissions`, `cleanup_old_security_events`, `cleanup_unused_backup_codes`, `debug_reviewer_access`, `enforce_backup_code_quota`, `expire_old_invitations` — these are already not granted to authenticated (good).

## Plan

### 1. Migration — tighten only what is safe to revoke

Re-confirm/lock down trigger- and cron-only functions (idempotent `REVOKE`s) so the linter sees no executable surface for them:

```sql
REVOKE EXECUTE ON FUNCTION
  public.auto_grant_dlinrt_reviewer_role(),
  public.check_company_rep_limit(),
  public.check_company_role_before_product_adoption(),
  public.check_products_before_company_role(),
  public.check_role_compatibility(),
  public.cleanup_old_analytics_data(),
  public.cleanup_old_contact_submissions(),
  public.cleanup_old_security_events(),
  public.expire_old_invitations(),
  public.debug_reviewer_access(uuid)
FROM PUBLIC, anon, authenticated;
```

No frontend or RPC code calls these, so revoking is safe.

### 2. Mark remaining linter findings as accepted

For the table-exposure (0027) findings on `profiles`, `user_roles`, `notifications`, `product_reviews`, etc., and for the SECURITY DEFINER RPCs the app actually uses, mark them `ignore` via `security--manage_security_finding` with the reason: *RLS-protected and required for the app's authenticated UX; revoking SELECT/EXECUTE would break the application.*

Mark stale 0026 (`SUPA_pg_graphql_anon_table_exposed`) as `mark_as_fixed` — verified no anon SELECT is granted.

### 3. Update security memory

Document the accepted risk:
- Authenticated users can introspect the public GraphQL schema; this is intentional because the app uses PostgREST/GraphQL with RLS as the real boundary.
- Internal trigger/cron SECURITY DEFINER functions are revoked from PUBLIC/anon/authenticated.
- Any **new** SECURITY DEFINER function must default to `REVOKE EXECUTE FROM PUBLIC` and only grant to `authenticated` when the frontend actually calls it as an RPC.

## Out of scope

- No RLS policy changes (existing policies already enforce per-user/role access).
- No edge function or frontend changes — purely DB grants + finding triage.

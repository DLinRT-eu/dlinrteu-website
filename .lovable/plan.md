## Plan: Fix Supabase Data API Grants

### Problem
Supabase is changing default behavior: after Oct 30, tables in the `public` schema will no longer implicitly expose Data API access. The `authenticated` role must hold explicit base table privileges (`SELECT`, `INSERT`, etc.) before PostgREST will even evaluate RLS policies. 

I audited the project's ACLs. **~15 tables** are missing required `authenticated` grants while their RLS policies would otherwise allow access. This will cause `42501` errors when the change takes effect.

### Solution
A single migration that:

1. **Adds explicit `GRANT` statements** for every table that the frontend accesses via `supabase-js`, matching what the existing RLS policies already allow:
   - `review_checklist_items` — missing `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - `review_comments` — missing `SELECT`, `INSERT`
   - `review_rounds` — missing `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - `review_round_stats` — missing `SELECT`
   - `profile_documents` — missing `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - `profile_document_access_log` — missing `SELECT`
   - `assignment_history` — missing `UPDATE`, `DELETE`
   - `product_feedback` — missing `SELECT`
   - `reminder_settings` — missing `SELECT`
   - `github_file_checks` — missing `SELECT`
   - `certification_reminder_logs` — missing `SELECT`
   - `reviewer_invitations` — missing `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - `role_change_log` — missing `SELECT`

2. **Adds `GRANT SELECT` to `anon`** on tables with public-read RLS policies (e.g. `changelog_entries`, `changelog_links`) so unauthenticated visitors can read them.

3. **Ensures `service_role` retains full access** on every table (already mostly true, but we will make it explicit and future-proof).

4. **Verifies default privileges** are configured for any *future* tables created by `postgres` or `supabase_admin` in the `public` schema, so this issue does not recur.

### What will NOT change
- Edge-function-only tables (`analytics_*`, `contact_submissions`, `mfa_*`, `newsletter_subscribers`, `security_events`) remain service_role-only.
- No RLS policies are modified.
- No table data is changed.
- The migration is additive only (GRANTs), zero risk of data loss.

### After the migration
I will run a verification query to confirm every actively-used table has the correct `authenticated` and `anon` base privileges.
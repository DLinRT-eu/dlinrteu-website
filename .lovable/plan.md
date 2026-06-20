## GDPR Remediation Plan

Based on the audit findings (`/mnt/documents/gdpr-audit-2026-06-20.md`), execute remediation in 4 waves. Each wave is independently shippable.

### Wave A — Legal & Transparency (High)
Fix Art. 13/14 disclosure gaps. Pure content/UI, no DB.

1. **Rewrite `src/pages/PrivacyPolicy.tsx`** with complete disclosures:
   - All data categories actually collected: profile data, roles, MFA factors + activity log, security_events (hashed IP), analytics (consented), contact_submissions, newsletter_subscribers, product_feedback, user_products, consent_audit_log, email_send_log, donations metadata.
   - Lawful basis per category (consent / contract / legitimate interest / legal obligation).
   - Concrete retention periods (see Wave B values).
   - Named sub-processors with role, location, transfer safeguard.
   - Data subject rights with the exact UX path (`/profile` → Data Export, delete-account, unsubscribe link, info@dlinrt.eu).
   - Update "Last updated" to 2026-06-20.
2. **New page `src/pages/Subprocessors.tsx`** at `/subprocessors`, linked from PrivacyPolicy and Footer. Table: Supabase (EU, hosting+DB+auth), Resend (US, transactional email, SCCs), Mailchimp (US, newsletter broadcast, SCCs), Paddle (EU/US, donations MoR), GitHub (US, PR automation), Lovable (EU, build/preview), Cloudflare (if applicable, CDN).
3. **Footer link** to `/subprocessors` next to Privacy Policy.
4. Add route in `src/App.tsx`.

### Wave B — Retention Automation (High)
Auto-purge data with promised limits + scrub email on delete.

5. **Edge function `gdpr-retention-purge`** (scheduled daily via pg_cron):
   - `analytics_page_visits`, `analytics_visitors`, `analytics_daily`: delete > 365 days.
   - `security_events`: delete > 180 days (keep aggregated counts if needed).
   - `mfa_activity_log`: delete > 365 days.
   - `email_send_log`: delete > 90 days.
   - `contact_submissions` (status=resolved): delete > 730 days.
   - `admin_audit_log`: delete > 730 days.
   - `consent_audit_log`: keep (proof of consent — Art. 7(1)).
   - Log purge counts to `admin_audit_log`.
6. **Migration**: enable pg_cron + pg_net, schedule `gdpr-retention-purge` nightly at 03:00 UTC.
7. **Patch `supabase/functions/delete-account/index.ts`**: after deleting auth.users, scrub email-keyed rows in `contact_submissions`, `newsletter_subscribers`, `product_feedback`, `email_send_log`, `suppressed_emails` (replace email with `deleted-<hash>@redacted.local`, null free-text fields). Wrap in transaction.

### Wave C — Technical Hardening (High/Medium)
8. **CORS hardening** in `send-contact-email` + `submit-product-feedback`:
   - Move origin check to top of handler; return `403` before parsing body for non-allowlisted origins.
   - Use shared `getCorsHeaders(origin)` from `_shared`.
9. **Rate limiting (Postgres-backed)**:
   - Migration: new table `public.rate_limit_buckets(key text, window_start timestamptz, count int, primary key(key, window_start))`; SECURITY DEFINER RPC `check_rate_limit(_key text, _max int, _window_seconds int) returns boolean`.
   - Apply in: `subscribe-newsletter` (5/hour/IP-hash), `send-contact-email` (3/hour/IP-hash), `submit-product-feedback` (5/hour/IP-hash), `track-analytics` (60/min/IP-hash), `track-security-event` (30/min/IP-hash).
10. **CSP & security headers** in `public/_headers`: tighten CSP (script-src self + Paddle/Mailchimp only), add `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin`, `Referrer-Policy: strict-origin-when-cross-origin` (verify), `X-Content-Type-Options: nosniff`.

### Wave D — Subject Rights Completeness (Medium)
11. **Verify `DataExport` covers all PII tables** — extend to include: `contact_submissions` (by email match), `newsletter_subscribers` (by email), `product_feedback` (by email), `user_products`, `notifications`, `consent_audit_log`, `security_events` (own user_id only), `role_requests`, `company_representatives`. Already partially done — add the missing ones.
12. **Rectification UX**: confirm `/profile` allows editing all editable fields; document non-editable ones.
13. **Add "Withdraw consent"** toggle on `/profile` for analytics + newsletter, writing to `consent_audit_log`.
14. **Portability**: current JSON export satisfies; add CSV-per-table option in the same dialog.

### Wave E — Verification (read-only)
15. Re-run the audit Playwright probes against preview, regenerate `/mnt/documents/gdpr-audit-2026-06-20-followup.md` showing each finding closed with evidence (HTTP responses, before/after).

### Technical notes
- All edge function changes follow project standards: `resend@4.0.0`, `getCorsHeaders`, generic outer catch, notification-preference check where applicable.
- All new tables include `GRANT` + RLS in the same migration.
- IP hashing rule preserved (SHA-256, never raw).
- No changes to product data or product UI.

### Order & dependencies
- A, B, C, D can ship in parallel; E runs last.
- Recommend shipping A first (lowest risk, highest visible compliance gain), then B (closes retention finding), then C (hardening), then D (rights), then E (verify).

### Deliverables
- Updated PrivacyPolicy + new Subprocessors page
- 1 new edge function + 1 patched edge function + 1 cron schedule
- 2 patched edge functions for CORS + 5 patched for rate limiting
- 1 migration (rate_limit_buckets + RPC) + 1 migration (cron)
- Patched `public/_headers`
- Extended `DataExport.tsx` + consent withdrawal UI
- Follow-up audit report

Confirm to proceed, or tell me which waves to skip/reorder.

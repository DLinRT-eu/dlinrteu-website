
# GDPR Penetration Audit Plan

A read-only audit (no code changes) covering the legal, technical, and operational GDPR posture of DLinRT.eu. Output will be a single report at `/mnt/documents/gdpr-audit-<date>.md` plus a CSV of findings, each tagged with severity (critical/high/medium/low/info) and the GDPR article(s) implicated.

## Scope

In-scope: every place personal data is collected, stored, processed, transmitted, or exposed.

- Public site & forms (contact, newsletter, feedback, donations)
- Auth surface (signup, login, password reset, MFA, account delete)
- Profiles, roles, reviewer/company representative flows
- Supabase tables holding personal data (profiles, contact_submissions, newsletter_subscribers, user_products, product_feedback, security_events, analytics_*, mfa_*, role_*, consent_audit_log, email_send_log, etc.)
- Edge functions handling PII / email dispatch
- Cookies, analytics, third-party calls (Resend, Mailchimp, Paddle, GitHub, Supabase)
- Headers / CSP / transport security
- Legal pages (Privacy Policy, Terms, Cookie banner, Unsubscribe)

Out-of-scope: product catalog data (non-personal), changes to fix findings (separate confirmed pass).

## Methodology

Eight parallel review tracks, each producing findings into one merged report.

### 1. Data inventory & lawful basis (Art. 5, 6, 13, 30)
- Enumerate every table/column storing PII via `supabase--read_query` against `information_schema`.
- Map each PII field → purpose → lawful basis → retention. Flag fields with no documented basis.
- Cross-check against PrivacyPolicy.tsx wording.

### 2. RLS & access-control pen test (Art. 5(1)(f), 32)
- Pull all policies via `security--get_table_schema` + `supabase--read_query` on `pg_policies`.
- For every PII table, verify: no `USING(true)` on SELECT for anon; reviewer/admin reads gated by `has_role()`; service_role-only tables not granted to authenticated/anon.
- Drive Playwright as an unauthenticated user + a low-priv authenticated user against the live preview, attempting `supabase-js` reads/writes on sensitive tables (profiles of other users, contact_submissions, newsletter_subscribers, security_events, mfa_*, user_products of others, product_edit_drafts of others, role_change_log). Record HTTP status + row count returned.
- Test PostgREST horizontal access: `?user_id=eq.<other>` enumeration.

### 3. Edge function abuse testing (Art. 25, 32)
- Enumerate all functions in `supabase/functions/`.
- For each public function (subscribe-newsletter, send-contact-email, submit-product-feedback, unsubscribe-newsletter, track-analytics, track-security-event, log-document-access, rss-feed): call via `curl` with (a) no auth, (b) malformed payloads, (c) injection payloads, (d) rate-burst (50 requests) to detect missing rate limiting, (e) cross-origin from a non-allowlisted Origin to verify CORS.
- For admin/reviewer functions: confirm they reject anon and non-privileged JWTs.
- Check enumeration risk: does subscribe-newsletter / password-reset reveal account existence?

### 4. Authentication & account lifecycle (Art. 32)
- Test signup → approval → login → password reset → MFA enroll → MFA backup codes → delete-account end-to-end via Playwright.
- Verify generic auth errors (no user enumeration on sign-in, reset, signup).
- Confirm delete-account actually purges PII from all tables (not just auth.users) — query post-deletion.
- Inspect MFA backup code storage (hashed?), session token storage (localStorage exposure), password reset token reuse / expiry.

### 5. Subject-rights coverage (Art. 15–22)
- Verify mechanisms exist for: access (export), rectification (profile edit), erasure (delete-account), restriction, portability (machine-readable export), objection, withdraw consent.
- Note any missing right and the UX path a user would have to take.

### 6. Transport, headers, cookies (Art. 32)
- Fetch site, inspect `public/_headers`: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/COEP/CORP.
- Audit cookies set by the app: names, Secure, SameSite, HttpOnly limitations (documented), expiry, consent-gated.
- Verify CookieConsent blocks analytics cookies before consent; test by clearing storage and inspecting network.
- Check for third-party scripts loaded before consent (Mailchimp, Paddle, GitHub avatars, Google Fonts → IP leak).

### 7. PII leakage surface
- Grep client bundle / source for accidental PII in logs, error toasts, JSON-LD, sitemap.
- Inspect open-graph + RSS feed for email leakage.
- Inspect `security_events`, `admin_audit_log`, `email_send_log`, `mfa_activity_log` for unhashed IPs / emails contrary to memory rule (SHA-256 IP hashing).
- Check newsletter unsubscribe link tokens for guessability and one-shot vs persistent.
- Review `consent_audit_log` table contents for proof-of-consent completeness (Art. 7(1)).

### 8. Third-party processors & international transfers (Art. 28, 44)
- List sub-processors actually called from code (Resend US, Supabase EU/US?, Paddle, Mailchimp US, GitHub, Lovable).
- Cross-check against PrivacyPolicy.tsx subprocessor list. Flag undisclosed transfers and missing SCC / adequacy mention.

## Deliverables (read-only artefacts)

1. `/mnt/documents/gdpr-audit-<YYYY-MM-DD>.md` — executive summary, posture rating, findings grouped by track, with reproduction steps, evidence (HTTP responses, screenshots under `/tmp/browser/gdpr/`), GDPR article, severity, recommended remediation.
2. `/mnt/documents/gdpr-audit-<YYYY-MM-DD>.csv` — one row per finding (id, track, severity, article, table/function/page, title, evidence-ref, recommendation).
3. Inline `<presentation-artifact>` links at the end of the chat reply.

No product files, RLS policies, edge functions, or legal copy will be modified in this pass — remediation is a separate, user-confirmed task (likely one PR per track).

## Constraints honored

- Minimal Intervention (read-only).
- IP hashing rule respected (we only verify, never log raw IPs).
- Secrets handling: no env values echoed; auth flows tested with the pre-minted preview session only.
- Playwright tests scoped to `/tmp/browser/gdpr/`.

## Estimated effort

~6–10 tool turns: 1 inventory, 2 RLS/Playwright, 2 edge-function fuzz, 1 auth lifecycle, 1 headers/cookies, 1 compile.

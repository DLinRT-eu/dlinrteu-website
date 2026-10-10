# Newsletter coverage for all registered users

## Goal
Every registered user should also be on the newsletter list. Per your choices:
- **New registrations:** send a one-time re-consent email after signup; the user confirms via a link and is then added.
- **Existing users:** back-fill everyone into the newsletter list directly.

> Note: the back-fill of existing users contradicts the documented GDPR posture in `docs/audits/gdpr/2026-06-27-newsletter-signup.md` (account consent is not marketing consent). You explicitly chose this option; the plan records the decision and updates the audit doc accordingly.

## Changes

### 1. New users — re-consent email after signup
- New edge function `send-newsletter-consent-invite`:
  - Called from `src/pages/Auth.tsx` right after successful signup (best-effort, non-blocking — account creation never fails because of it).
  - Creates/updates a `newsletter_subscribers` row in a pending state (not yet active) and sends an email with a signed confirmation link.
  - Reuses the existing signed-token helpers in `supabase/functions/_shared/resubscribe-token.ts` and the existing `confirm-newsletter-resubscribe` endpoint, which already activates the subscriber when the link is opened.
- The existing optional "Subscribe to the DLinRT newsletter" checkbox on the signup form stays: users who tick it are subscribed immediately (current behavior); users who don't tick it get the one-time consent-invite email instead.

### 2. Existing users — one-off back-fill
- One-time data operation (via `run_sql`): insert every registered user (from `profiles`) into `newsletter_subscribers` with `consent_given = true`, skipping emails already present.
- Sync the new rows to the Resend audience (reuse the existing `sync-newsletter-audience` function).

### 3. Documentation
- Update `docs/audits/gdpr/2026-06-27-newsletter-signup.md` to record the new flow and the explicit decision to back-fill existing users.

## Technical details
- New file: `supabase/functions/send-newsletter-consent-invite/index.ts` (CORS via `npm:@supabase/supabase-js@2/cors`, zod-validated input, generic outer catch, Resend via `npm:resend@4.0.0`, sender `noreply@dlinrt.eu`).
- Edit: `src/pages/Auth.tsx` — invoke the new function after signup when the newsletter checkbox is not ticked.
- Data change: `INSERT INTO newsletter_subscribers ... SELECT FROM profiles` with `ON CONFLICT (email) DO NOTHING`.
- No schema changes; no RLS changes (`newsletter_subscribers` is written by edge functions with the service role only).
- Verification: typecheck, build, deploy the new function, and confirm the back-filled row count matches the registered-user count.

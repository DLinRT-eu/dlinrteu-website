## Problem

Sending an invite to a company representative fails with the generic Supabase client error `Edge Function returned a non-2xx status code`. That message means the function replied with a 500, but the actual server-side reason is being swallowed by both sides:

- The edge function catches errors and returns a hardcoded `{ error: 'Internal server error' }` / `'Failed to send invitation email'` etc., without the underlying message.
- The client (`InviteCompanyRepDialog.tsx`) only surfaces `error.message` from `functions.invoke`, which is the generic supabase-js wrapper, not the JSON body the function returned.

So we can't see what actually broke. Recent activity likely to have regressed this: `@supabase/supabase-js` bump to 2.108.2 across all edge functions and RLS/grants tightening on `profiles` / `company_representatives` / `company_invitations` / `user_roles` from the recent security passes.

## Fix

### 1. Surface real errors on the client

In `src/components/admin/InviteCompanyRepDialog.tsx`, when `functions.invoke` throws a `FunctionsHttpError`, read `error.context.response` and extract the JSON `error` field before toasting. Fall back to `error.message` otherwise. This gives us (and the admin) the real reason immediately.

### 2. Return the real error from the edge function

In `supabase/functions/invite-company-representative/index.ts`:
- In the outer `catch`, include `err?.message` and `err?.stack` in the JSON response (safe — admin-only endpoint).
- In each intermediate failure branch (`createUser`, `generateLink`, `resend.emails.send`, `profiles.upsert`, `user_roles.upsert`, `company_invitations.insert`), include the underlying error's `message` / `code` / `details` in both the log line and the JSON response.
- Add a top-of-function log with `payload` (minus `message` body) so we can correlate.

### 3. Probe the deployed function

After redeploy, call the function via `supabase--curl_edge_functions` with a throwaway test email under both `forceRegister: false` and `forceRegister: true` to capture the concrete failure (Resend domain, RLS on `company_invitations`, `auth.admin.createUser` scope, etc.), then apply the targeted fix.

### 4. Apply the concrete fix

Most likely candidates once the real error is visible:
- Missing `service_role` GRANT on `company_invitations` / `company_representatives` after the recent security migrations → add via migration.
- `Resend` domain / API key rejection → surface a clear "check RESEND_API_KEY / verified domain `dlinrt.eu`" toast.
- `auth.admin.generateLink` returning no `action_link` because the auth redirect allowlist doesn't include `${SITE_URL}/update-password` → note in the toast.

Only the diagnosis+error-plumbing changes in steps 1–2 are guaranteed; step 4 is decided from the response of step 3.

## Files touched

- `src/components/admin/InviteCompanyRepDialog.tsx` — richer error extraction.
- `supabase/functions/invite-company-representative/index.ts` — propagate underlying error text and add logs.
- Possibly a new migration under `supabase/migrations/` if grants/policies are the root cause (added only after step 3 confirms).

## Out of scope

- Unrelated `EvidenceImpactScatterChart` React.Fragment warning visible in console (Recharts v3 dev warning; not causing this failure).
- No UI redesign of the invite dialog.

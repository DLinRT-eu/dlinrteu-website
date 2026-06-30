## Goal

Give admins a self-serve way to trigger a password reset for any user (with search), and unblock Theju at Accuray.

## 1. New edge function: `admin-reset-user-password`

Path: `supabase/functions/admin-reset-user-password/index.ts`

- Standard CORS + JWT verification (mirrors `admin-delete-user`).
- Verify caller has `admin` role via `user_roles`.
- Input: `{ userId?: string, email?: string, mode: 'email' | 'link' }`.
- Resolve target user via `auth.admin.listUsers` / profile lookup.
- Use `supabaseAdmin.auth.admin.generateLink({ type: 'recovery', email, options: { redirectTo: 'https://dlinrt.eu/update-password' } })` — this produces a fresh, valid PKCE recovery link bypassing any stale-link issues.
- `mode: 'email'` → send via Resend (matches existing email convention, `noreply@dlinrt.eu`) with a short branded template containing the link (valid 1 hour).
- `mode: 'link'` → return the action link in the response so the admin can deliver it manually (useful if email delivery is the actual problem).
- Audit-log the action to `security_events` (admin id, target id, mode).

## 2. New admin page: `/admin/password-reset`

Path: `src/pages/admin/PasswordReset.tsx` (wrapped in `<ProtectedRoute allowedRoles={['admin']}>`).

UI:
- Search input (debounced) querying `profiles` by email / first_name / last_name / institution (reuse the pattern from `UserManagement.tsx`).
- Results table: name, email, institution, last sign-in.
- Per-row actions:
  - **Send reset email** → calls function with `mode:'email'`, toast on success.
  - **Generate link & copy** → calls function with `mode:'link'`, shows the URL in a dialog with a copy button and an expiry note.
- Confirmation dialog before either action (shows target email).

Routing: add route in `src/App.tsx`. Add entry in `AdminOverview.tsx` / admin sidebar with a `KeyRound` icon and short description.

## 3. Immediate fix for Theju (Accuray)

After the function is deployed:
- I'll call `admin-reset-user-password` from the new UI in `mode:'link'` for the Accuray representative's email, then share the link directly with you to forward to Theju (and also trigger `mode:'email'` as backup). The generated link uses PKCE → `/update-password`, which the existing `UpdatePassword.tsx` already handles.
- If you prefer, I can instead set a temporary password via `auth.admin.updateUserById` — say the word and I'll add a third mode.

I need Theju's email address on record (or I can search by "Accuray" once the page is live). Please confirm the email so I can run it as soon as the feature is merged.

## Security notes

- No client-side admin checks; all enforcement in the edge function via `user_roles`.
- Generated links are time-limited by Supabase (default 1h).
- Action is audit-logged.
- Function uses service role only inside the function; never exposed to browser.

## Out of scope

- Changing the existing user-initiated `/reset-password` flow.
- Email template overhaul (reuse current Resend pattern).

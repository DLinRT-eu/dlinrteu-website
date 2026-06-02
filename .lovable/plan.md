# Admin-Initiated Company Representative Invitations

Mirror the existing reviewer-invitation pattern so an admin can invite someone directly from the company management page. The invitee gets an email, sets a password, and lands already linked to the right company with the `company` role assigned — no manual approval step afterward.

## User flow

1. Admin opens `/admin/companies`, picks a company, clicks **Invite Representative**.
2. Dialog collects: email (required), first name, last name, position, optional personal message.
3. Backend creates a pending invitation row with a signed token and emails the invitee.
4. Invitee clicks the link → `/accept-company-invite?token=...` → sets password → account is created.
5. On signup completion, the backend:
   - Creates the `auth.users` + `profiles` row (auto-approved, since admin vouched).
   - Inserts `user_roles` row with role `company`.
   - Inserts verified `company_representatives` row linked to the target company.
   - Marks invitation `accepted`.
6. User is logged in and lands on `/company/dashboard`.

## Database changes

New table `company_invitations` (migration), modeled on `reviewer_invitations`:

- `id`, `email`, `token` (unique), `company_id`, `company_name`
- `first_name`, `last_name`, `position`, `message`
- `invited_by` (uuid → admin), `status` (`pending|accepted|expired|revoked`)
- `expires_at` (default `now() + 14 days`), `accepted_at`, `created_at`
- GRANTs + RLS: admins full access; anon `SELECT` only via security-definer RPC `get_company_invitation_by_token(token)` so the accept page can fetch without exposing the table.

## Edge functions

1. **`invite-company-representative`** (admin-only)
   - Validates admin via JWT + `user_roles`.
   - Rejects if email is already a verified rep for that company.
   - Upserts pending invitation, sends Resend email using existing CORS allowlist + `resend@4.0.0`.
   - Email links to `${SITE_URL}/accept-company-invite?token=...`.

2. **`accept-company-invitation`** (public, token-gated)
   - Input: `token`, `password`, optional name overrides.
   - Looks up invitation via service role; ensures pending + not expired.
   - Creates user via `auth.admin.createUser({ email_confirm: true })`.
   - Inserts `profiles` (approval_status = `approved`, approved_by = admin who invited).
   - Inserts `user_roles` (`company`) + verified `company_representatives` row.
   - Marks invitation `accepted`, returns a session (sign-in via password) for auto-login.

## Frontend changes

- `src/pages/admin/CompanyManagement.tsx`: add per-company **Invite Representative** action opening a new `InviteCompanyRepDialog` component.
- New `src/components/admin/InviteCompanyRepDialog.tsx`: form + `supabase.functions.invoke('invite-company-representative')`.
- New `src/pages/AcceptCompanyInvite.tsx`: token validation, password form, calls `accept-company-invitation`, then `supabase.auth.signInWithPassword`, then routes to `/company/dashboard`.
- Add route in `src/App.tsx` (public, no `ProtectedRoute`).
- Optional admin list panel showing pending invitations per company with resend / revoke.

## Notifications & emails

- Reuse Resend pattern from `invite-reviewer`.
- Subject: "You've been invited to manage {company} on DLinRT.eu".
- Body: who invited, company name, optional message, CTA button, 14-day expiry note.
- Respect `profiles.notification_preferences` is N/A (recipient has no profile yet).

## Security

- Token is a `crypto.randomUUID()` stored server-side; never reused after acceptance.
- Accept endpoint enforces: pending status, not expired, password ≥ 8 chars.
- Admin endpoint enforces admin role via service-role JWT check.
- RLS denies anon direct table access; only the RPC by-token exposes minimal fields (company name, inviter name, expiry) for the accept page UI.

## Out of scope

- Bulk CSV invites (can follow later).
- Multi-company representatives (current model supports one company per rep row; admin can still send multiple invites).

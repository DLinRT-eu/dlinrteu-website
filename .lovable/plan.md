## 1. Extend `AutoLinkText` to more free-text fields

Wrap the existing `<AutoLinkText>` helper around every rendered free-text field that today shows raw URLs, so long links collapse to `host/short-path…` with the full URL on hover (native `title` tooltip).

Targets:

- `src/components/product/EvidenceLimitationsDetails.tsx`
  - `evidenceRigorNotes` (`<p>{evidenceRigorNotes}</p>` block)
  - `clinicalImpactNotes`
  - `adoptionReadinessNotes`
- `src/components/product/RegulatoryInformationDetails.tsx`
  - `regulatory.ln` (Intended Use Statement) — currently rendered as plain text fallback `"N/A"`. Wrap the value in `AutoLinkText` when present.

Behavior change in edit mode — `EditableField` keeps using the raw textarea, except when a long url has been masked with short one, then it should be possible to revise both the shown and the underlying long link. Only the read-only `<p>` views get wrapped.

## 2. "Force register" option in the Invite Representative dialog

### UI — `src/components/admin/InviteCompanyRepDialog.tsx`

- Add a `forceRegister` checkbox (shadcn `Checkbox` + `Label`) below the message field, labelled **"Register the representative now and send a password-setup email"** with a short helper line: *"Creates the account immediately and links it to {company}. The recipient gets a Set-Password email instead of an invitation link."*
- When `forceRegister` is true, swap the default message template to a force-register variant (subject of message changes wording to "Your DLinRT.eu representative account has been created" + instructions about setting a password).
- Pass `forceRegister: boolean` in the edge-function invoke body.

### Edge function — `supabase/functions/invite-company-representative/index.ts`

Add a `forceRegister` branch (still admin-gated, same CORS/auth):

1. Look up an existing auth user by email; if not present, call `supabaseAdmin.auth.admin.createUser({ email, email_confirm: true, user_metadata: { first_name, last_name, invited_company_id, invited_company_name, force_invited: true } })`.
2. Insert a `company_representatives` row (or reuse existing) linking that `user_id` to `companyId` with `company_name`, `position`, `verified: false` (or matching your existing schema defaults). Use upsert to be idempotent.
3. Mark the `company_invitations` row `status = 'accepted'` (force-registration replaces the accept step) and store the new `user_id` if your column exists; otherwise just keep `status = 'pending'` and rely on rep row.
4. Generate a password-setup link via `supabaseAdmin.auth.admin.generateLink({ type: 'recovery', email, options: { redirectTo:` ${SITE_URL}/auth/set-password `} })` and use the returned `action_link` as the email CTA.
5. Render a different HTML body for the force-register email: header "Welcome to DLinRT.eu", body explains the account was created on their behalf for {company}, CTA button **"Set your password"** pointing to the recovery link, fallback paste-link, expiry note ("This password setup link expires in 24 hours per Supabase defaults"), and contact line.
6. Subject becomes `Set your password for DLinRT.eu (${companyName} representative)`.
7. Preserve current behavior when `forceRegister` is false — unchanged invite-token flow.

Error handling:

- If `createUser` returns "already registered", continue with link generation against the existing user (still attach rep row + send Set-Password email). Surface a non-blocking note in the response.
- If `generateLink` fails, return 500 with the message and do not send the email.

### Schema check

No migration needed — `company_representatives` and `company_invitations` already exist (per `supabase-tables`). If `company_invitations` has a `force_registered` boolean column we'll set it; otherwise leave status logic as described. Will confirm with a quick read in build mode and add a tiny migration only if needed for an audit flag.

### Auth integration

Set-Password link uses Supabase's built-in recovery flow. The existing `/auth/set-password` (or equivalent) page is already protected by Supabase session from the recovery token — will verify the route exists during build; if not, we route to `/auth?mode=recovery` which the project already handles.

## 3. Out of scope

- No changes to `accept-company-invitation` flow (regular invites unchanged).
- No bulk-invite or CSV import.
- No reformatting of unrelated UI; AutoLinkText is additive only.

## Technical details

- `AutoLinkText` already lives at `src/components/ui/AutoLinkText.tsx` — reuse, no API change.
- Edge function continues using `resend@4.0.0` + the existing `getCorsHeaders` allowlist (per project edge-function memory).
- Notification-preference check is not required here: admin-initiated representative onboarding is operational, not a category notification.
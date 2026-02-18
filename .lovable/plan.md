
# Certification Reminder Email Feature

## Overview

Add a new Supabase Edge Function `send-certification-reminder` that sends a professional outreach email to all verified company representatives (excluding admins), inviting them to certify their product information and report any missing or incorrect data. The email is sent from `noreply@dlinrt.eu` with `info@dlinrt.eu` in CC.

A trigger button will be added to the **Certification Management** page (`/admin/certifications`) so an admin can send the outreach with one click.

---

## Data Model (confirmed from DB)

Company reps to contact are those where:
- `company_representatives.company_id != 'admin_all_companies'` (excludes admin oversight entries)
- `verified = true` (only active reps)
- User does **not** have `admin` role in `user_roles` (excludes admins who may also be reps)

This is confirmed by querying the live DB — the result is 6 real company reps across 5 companies (Accuray, MVision AI, Philips, PTW, Synaptiq).

---

## Changes

### 1. New Edge Function: `supabase/functions/send-certification-reminder/index.ts`

**Authentication**: Accepts a Bearer token, verifies the caller is an authenticated admin via `user_roles` (same pattern as all other edge functions).

**Logic**:
1. Query `company_representatives` joined with `profiles` (service role), filtering out admin oversight entries and admin users
2. Group reps by company (one company may have multiple reps)
3. For each verified rep, send a personalised email via Resend
4. Also CC `info@dlinrt.eu` on each email sent
5. Return a summary: `{ success, emailsSent, emailsFailed, companiesContacted }`

**Email content** (green certification theme):
- Header: "🏆 Product Certification Program – We Need Your Input"
- Personalised greeting with the rep's name and company
- Explanation that the certification program is open
- Bullet points: verify product info, flag anything missing/incorrect, certify current data
- CTA button linking to `/company/overview` (their certification dashboard)
- Footer: questions → `info@dlinrt.eu`
- CC: `info@dlinrt.eu` on every outgoing email

### 2. Updated UI: `src/pages/admin/CertificationManagement.tsx`

Add a "Send Certification Reminders" button in the page header (next to the existing "Manage Companies" button):

```
[Send Certification Reminders]   [Manage Companies]
```

**Button behaviour**:
- Disabled while sending (shows spinner + "Sending…")
- On click: calls `supabase.functions.invoke('send-certification-reminder')`
- Shows toast: `"Sent X emails to Y company representatives"` on success
- Shows error toast on failure

State additions:
- `sendingReminders: boolean`
- `reminderResult: { emailsSent, companiesContacted } | null`

**Result summary** shown below the header after sending (dismissible):
```
✓ Sent 6 emails to 5 companies
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/send-certification-reminder/index.ts` | **Create** — new edge function |
| `src/pages/admin/CertificationManagement.tsx` | **Modify** — add button + invoke logic |

---

## Email Example

**To**: `tjacob@accuray.com`  
**CC**: `info@dlinrt.eu`  
**From**: `DLinRT.eu <noreply@dlinrt.eu>`  
**Subject**: `Action Required: Certify Your Product Information on DLinRT.eu`

```
Dear Theju Jacob,

We are reaching out regarding the DLinRT.eu Company Certification Program for Accuray.

The certification portal is now open and we kindly invite you to:

  ✓ Review your company's product listings for accuracy
  ✓ Report anything that may be missing or incorrect
  ✓ Certify your current product information

Your participation helps maintain the quality and reliability of our platform.

[Go to Company Overview →]

Questions? Reply to this email or contact us at info@dlinrt.eu.

— The DLinRT.eu Team
```

---

## Security

- Edge function validates admin JWT before proceeding (same pattern as `send-deadline-reminders`)
- Uses `SUPABASE_SERVICE_ROLE_KEY` server-side to query representative data
- No sensitive data exposed client-side
- Compliant with European regulations: emails only sent to users who have actively registered and been verified on the platform

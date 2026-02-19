
# Certification Reminder Composer & Delivery Log

## Overview

Three improvements are needed:

1. **Editable subject & message** — an admin should be able to customise the email before sending
2. **Recipient preview** — show exactly who will receive the email before and after sending
3. **Send history** — persist a log of each outreach batch so it is possible to see when the last reminder was sent and to whom

The DB query confirms there are currently **6 recipients across 5 companies** (Accuray, MVision AI ×2, Philips, PTW, Synaptiq). No admin was incorrectly included; the earlier delivery uncertainty was caused by the absence of any logging.

---

## Root Cause of "Not All Companies Reached"

There is no persistent log of what was sent. The only feedback was an in-memory banner that disappears on page reload. PTW's rep also holds a `reviewer` role, which is fine (not excluded), but it confirms that role overlap is present — making auditing essential.

---

## Database Change

A new table `certification_reminder_logs` is required to persist each send batch:

```sql
CREATE TABLE certification_reminder_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_at       timestamptz NOT NULL DEFAULT now(),
  sent_by       uuid NOT NULL,               -- admin user id
  subject       text NOT NULL,
  message_body  text NOT NULL,               -- plain-text version for audit
  recipients    jsonb NOT NULL,              -- array of { email, name, company }
  emails_sent   int NOT NULL DEFAULT 0,
  emails_failed int NOT NULL DEFAULT 0,
  companies     text[] NOT NULL DEFAULT '{}'
);
```

RLS policies:
- `SELECT`: admins only (`has_role(auth.uid(), 'admin')`)
- `INSERT`: service role only (the edge function uses service role)
- No UPDATE / DELETE

---

## Changes

### 1. Migration

Create the `certification_reminder_logs` table with the schema above and appropriate RLS policies.

### 2. Edge Function: `send-certification-reminder/index.ts`

**New request body** (JSON):
```json
{
  "customSubject": "...",    // optional override
  "customBody": "..."        // optional plain-text body to inject into template
}
```

**New behaviour**:
- Accept `customSubject` and `customBody` from the POST body
- If `customSubject` is provided, use it instead of the default subject
- If `customBody` is provided, inject it as the main paragraph block in the HTML template (replacing the fixed paragraphs), while keeping the green header, CTA button, and footer
- After sending all emails, insert **one row** into `certification_reminder_logs` with the full recipient list, subject used, plain-text body used, counts, and `sent_by` (from the verified admin user id)
- Also return the enriched `recipients` list in the response body

### 3. New Component: `src/components/admin/CertificationReminderDialog.tsx`

A modal dialog triggered by the "Send Certification Reminders" button, with three sections:

**Section A — Recipients Preview**
A read-only list fetched from `company_representatives` (via `supabase.functions.invoke` with a `previewOnly: true` flag, or a direct client-side query since admins have access). Shows:
- Name, email, company name
- Small badge for role (company / reviewer)

**Section B — Compose**
- `Subject` — pre-filled with the default, fully editable `Input`
- `Message` — a `Textarea` pre-filled with the default body text, editable (plain text; the HTML wrapper is applied server-side)

**Section C — Send History** (collapsible/tab)
- Queries `certification_reminder_logs` ordered by `sent_at DESC`
- Shows last 5 batches: date, sent by, subject, emails sent/failed, list of companies

**Actions**: "Cancel" and "Send to X recipients →" (disabled while sending)

### 4. Updated Page: `src/pages/admin/CertificationManagement.tsx`

- The "Send Certification Reminders" button now **opens the dialog** instead of calling the function directly
- The in-memory result banner is replaced by the persistent history shown inside the dialog
- A small "Last sent: [date]" label appears next to the button when a log entry exists, fetched on page load

---

## Files to Create / Modify

| File | Action |
|------|--------|
| DB migration | **Create** — `certification_reminder_logs` table + RLS |
| `supabase/functions/send-certification-reminder/index.ts` | **Modify** — accept custom subject/body, log to DB, return recipients |
| `src/components/admin/CertificationReminderDialog.tsx` | **Create** — compose + recipients + history dialog |
| `src/pages/admin/CertificationManagement.tsx` | **Modify** — wire button to dialog, show "last sent" label |

---

## Default Subject & Body (pre-filled in the dialog)

**Subject**
```
Action Required: Certify Your Product Information on DLinRT.eu – {CompanyName}
```

**Body** (editable block — `{FirstName}`, `{CompanyName}` are substituted server-side per recipient)
```
We are reaching out regarding the DLinRT.eu Company Certification Program for {CompanyName}.

The certification portal is now open and we kindly invite you to review your company's product information and certify that everything is accurate and up to date.

Your participation helps maintain the quality and reliability of our platform for the entire radiotherapy community.
```

The action checklist bullets and CTA button remain fixed in the HTML template.

---

## Security

- The edge function still validates admin JWT before processing
- `certification_reminder_logs` is only writable by the service role (via the edge function) and only readable by admins
- Custom body content is plain text; HTML injection is not possible because the template wraps it in escaped `<p>` tags server-side

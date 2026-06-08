# Bulk Email to Company Representatives

Add an admin-only tool to compose and send an email to many (or all) verified company representatives in one action, with personalization tokens, a live HTML preview, and an automatic link to each representative's company catalogue page.

## Where it lives

New admin page **`/admin/representatives-bulk-email`** linked from:
- `src/pages/admin/Dashboard.tsx` (new card "Bulk email representatives")
- `src/pages/admin/CompanyManagement.tsx` (header button "Email all representatives")

Existing per-rep invite flow (`invite-company-representative`) is untouched.

## UI (single page, two columns)

Left — Composer
- **Recipient selector**
  - Mode: All verified reps / Filter by company (multi-select) / Filter by certification status / Pick individually from a searchable table
  - Live recipient count + dedupe by email
  - Excludes unsubscribed / suppressed emails (checks `suppressed_emails`)
- **Subject** input (supports tokens)
- **Message body** — rich textarea (markdown-style: paragraphs, bold, links, bullet lists) with a "Insert token" dropdown
- **Personalization tokens** (substituted server-side per recipient):
  - `{{first_name}}`, `{{last_name}}`, `{{full_name}}`
  - `{{company_name}}`
  - `{{company_url}}` → `https://dlinrt.eu/company/{companyId}` (rendered as a styled button "View {{company_name}} on DLinRT.eu" appended automatically + available as inline token)
  - `{{rep_position}}`, `{{sender_name}}`, `{{today}}`
- **Template management**
  - Save / load / delete named templates (new table `admin_email_templates`)
  - Ships with 2 starter templates: "Certification reminder", "Quarterly update"
- **Send controls**: "Send test to me", "Send to N recipients" (confirm dialog showing count)

Right — Live preview
- Renders the branded DLinRT email layout (same header/footer style as `invite-company-representative`) with tokens substituted using the **first recipient** as sample (or admin-selected sample)
- Tabs: Desktop / Mobile width preview
- Shows resolved subject, From line, and the auto-appended company CTA button + link

## Backend

### New table `admin_email_templates`
Columns: `id uuid pk`, `name text unique`, `subject text`, `body_markdown text`, `created_by uuid`, `created_at`, `updated_at`.
RLS: admin-only (read/write/delete) via `has_role(auth.uid(),'admin')`. Grants to `authenticated` + `service_role`.

### New table `admin_bulk_email_log`
Columns: `id`, `sent_by uuid`, `subject`, `body_markdown`, `recipient_count int`, `success_count int`, `failure_count int`, `created_at`. RLS: admin-only read.

### New edge function `send-bulk-representative-email`
- Verifies caller has `admin` role (same pattern as `invite-company-representative`)
- Input: `{ subject, bodyMarkdown, recipientFilter | recipientIds[], testEmail? }`
- Resolves recipients from `company_representatives` joined with profile (first/last name, position) and `COMPANIES` data on the client-supplied companyId → companyName
- Skips addresses in `suppressed_emails`
- For each recipient: substitutes tokens, renders the branded HTML (shared template matching the existing invite email styling), appends the "View {company} on DLinRT.eu" CTA button linking to `https://dlinrt.eu/company/{companyId}`
- Sends via Resend (`npm:resend@4.0.0`) with rate limiting (batch of 10, small delay) to stay within Resend's throughput
- Writes one row to `admin_bulk_email_log` summarizing the run
- Standard CORS allowlist + generic outer catch (per project edge function standards)

### Unsubscribe / compliance
- Each email includes a plain-text footer "You receive this as a verified DLinRT.eu company representative." — no marketing content (transactional/admin operational use only). No new unsubscribe flow; reps can manage notifications from their profile.

## Files

New:
- `src/pages/admin/BulkRepresentativeEmail.tsx`
- `src/components/admin/bulk-email/RecipientPicker.tsx`
- `src/components/admin/bulk-email/EmailComposer.tsx`
- `src/components/admin/bulk-email/EmailPreview.tsx`
- `src/components/admin/bulk-email/TemplateManager.tsx`
- `src/utils/email/tokenSubstitution.ts` (shared: also used client-side for preview)
- `src/utils/email/brandedEmailTemplate.ts` (mirrors HTML shell used by edge function for accurate preview)
- `supabase/functions/send-bulk-representative-email/index.ts`
- Migration: create `admin_email_templates`, `admin_bulk_email_log`, RLS, grants, seed two starter templates

Edited:
- `src/App.tsx` — add route `/admin/representatives-bulk-email` inside admin guard
- `src/pages/admin/Dashboard.tsx` — add navigation card
- `src/pages/admin/CompanyManagement.tsx` — add header button

## Out of scope

- No changes to per-company invite limits or existing invite flow
- No marketing / newsletter functionality (newsletter system stays separate)
- No scheduling (immediate send only in v1)
- No attachments

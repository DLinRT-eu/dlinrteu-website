## Goal

Send the DLinRT.eu newsletter through Resend from an admin page on the site, with the subscriber list two-way synced between `newsletter_subscribers` and a Resend Audience. Preview renders on-site in the same Steel Blue (#5090D0) / Dark Slate (#1a1a2e) styling as the existing newsletter blocks.

## What gets built

### 1. Resend Audience (one-time setup)

- Use a single Resend Audience for DLinRT subscribers. Store its ID in a new secret `RESEND_AUDIENCE_ID` (added via the secrets tool — user supplies the audience ID after creating it in Resend, or we create it on first sync via API).

### 2. Two-way audience sync

New edge function `sync-newsletter-audience` (admin-only):
- **Push**: for every active row in `newsletter_subscribers` (unsubscribed_at IS NULL), upsert into Resend Audience via `POST /audiences/{id}/contacts` (idempotent on email).
- **Pull**: list Resend contacts; any with `unsubscribed: true` that are still active in Supabase get `unsubscribed_at = now()`. Any contact missing from Supabase is ignored (Supabase remains source of truth for adds).
- Returns counts: added, updated, unsubscribed_back, skipped.

Hook unsubscribe propagation:
- Extend existing `unsubscribe-newsletter` to also mark the contact `unsubscribed: true` in Resend (best-effort).
- Extend existing `subscribe-newsletter` to upsert the contact in Resend on signup.
- Extend `resend-webhook` to handle `contact.unsubscribed` / `email.bounced` / `email.complained` events → set `unsubscribed_at` in Supabase.

### 3. Newsletter compose/preview/send admin page

New route `/admin/newsletter-broadcast` (admin-only, in admin nav).

UI sections:
- **Draft picker** — dropdown listing files in `src/data/newsletters/*.md` (bundled at build time via `import.meta.glob`). Selecting one loads subject, preheader, and blocks.
- **Editable fields** — Subject, Preheader, Markdown body (already-parsed blocks shown as a single textarea so last-minute tweaks are possible).
- **Live preview** — right pane renders the markdown using the same Steel Blue header / Dark Slate text styling already used in `bulkRepEmailTemplate.ts` (`buildPreviewHtml`-style wrapper, color-coded block emoji preserved, links in #5090D0). Reuses `markdownToHtml` from `src/utils/email/bulkRepEmailTemplate.ts`.
- **Audience panel** — shows current active subscriber count + Resend audience count, "Sync now" button calling `sync-newsletter-audience`.
- **Send controls**:
  - "Send test to me" — sends to the logged-in admin's email only.
  - "Send to all subscribers" — requires typing "SEND" to confirm, then calls `send-newsletter-broadcast`.

### 4. Broadcast send edge function

New edge function `send-newsletter-broadcast` (admin-only via JWT + `has_role` check):
- Input: `{ subject, preheader, bodyMarkdown, testRecipient? }`.
- Renders the same on-site HTML wrapper server-side (shared helper in `supabase/functions/_shared/newsletter-template.ts`, mirroring `bulkRepEmailTemplate.ts`).
- If `testRecipient`: sends a single email via Resend `POST /emails` to that address.
- Else: calls Resend Broadcasts API — `POST /broadcasts` with `audience_id = RESEND_AUDIENCE_ID`, then `POST /broadcasts/{id}/send`. Returns the broadcast ID.
- Logs to `admin_audit_log` (`action_type: 'newsletter_broadcast_sent'`, details include broadcast_id, subject, recipient_count).

### 5. Styling — match website

Shared template constants:
- Header band: `#5090D0`, white logo text "DLinRT.eu".
- Body text: `#1a1a2e` on `#ffffff`.
- Links: `#5090D0`.
- Block headings keep the existing 🟢 🟣 🔵 🟡 color-coded prefixes from the newsletter strategy memory.
- Footer with unsubscribe link (`{{RESEND_UNSUBSCRIBE_URL}}` token for broadcasts; explicit `/unsubscribe?token=…` link for one-off sends).

### 6. No DB schema changes

`newsletter_subscribers` already has `unsubscribed_at`. No migrations needed. RLS unchanged — all writes happen through service-role inside the new edge functions, gated by admin check.

## Files

New:
- `supabase/functions/_shared/newsletter-template.ts` — shared HTML renderer.
- `supabase/functions/sync-newsletter-audience/index.ts`
- `supabase/functions/send-newsletter-broadcast/index.ts`
- `src/pages/admin/NewsletterBroadcast.tsx`
- `src/components/admin/newsletter/NewsletterPreview.tsx`
- `src/components/admin/newsletter/AudienceSyncPanel.tsx`

Edited:
- `supabase/functions/subscribe-newsletter/index.ts` — upsert Resend contact.
- `supabase/functions/unsubscribe-newsletter/index.ts` — mark Resend contact unsubscribed.
- `supabase/functions/resend-webhook/index.ts` — handle contact/bounce/complaint events.
- `src/App.tsx` — register `/admin/newsletter-broadcast` route.
- Admin navigation component — add link.

## Secrets needed

- `RESEND_API_KEY` ✅ already set.
- `RESEND_AUDIENCE_ID` — to be added. You'll either (a) create an Audience named "DLinRT.eu Subscribers" in Resend and paste its ID, or (b) let the first sync create it automatically and we then store the returned ID.

## Open question before I build

Resend Audience creation: do you want to **create the audience yourself** in the Resend dashboard and give me the ID, or have the **first sync auto-create** it and store the ID server-side?
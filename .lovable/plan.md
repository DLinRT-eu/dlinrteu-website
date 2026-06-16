## Goal

Make the newsletter workflow split cleanly between the website (authoring + audience sync + test) and Resend (final broadcast send), with a continuously-synced audience.

## New flow

```text
markdown draft (src/data/newsletters/*.md)
   │
   ├─ admin edits in /admin/newsletter-broadcast
   │     ├─ Live preview (light/dark)            ← website
   │     ├─ Send test  (single /emails call)     ← website
   │     └─ "Push to Resend as draft" broadcast  ← website → Resend
   │
   └─ Resend dashboard › Broadcasts › "DLinRT newsletter <slug>"
         ├─ Send test                            ← Resend
         └─ Send to audience                     ← Resend (final send)

Audience sync (continuous):
  subscribe-newsletter   → upsert contact to Resend         (already wired)
  unsubscribe-newsletter → mark unsubscribed in Resend      (already wired)
  sync-newsletter-audience → manual full reconcile (button) (already wired)
  + scheduled daily cron full reconcile (new)
```

## Changes

### 1. `supabase/functions/send-newsletter-broadcast/index.ts`
- Keep the **test send** branch as-is (single `/emails` call to one recipient).
- Remove the "actually send broadcast" path. The function now only:
  - Creates / overwrites the broadcast in Resend (`createBroadcast`) and returns its `id` + a deep link `https://resend.com/broadcasts/<id>`.
  - Never calls `sendBroadcast`. Final send happens inside Resend.
- Audit log action becomes `newsletter_broadcast_drafted` only.
- Ignore the old `send` flag if a client still sends it.

### 2. `src/pages/admin/NewsletterBroadcast.tsx`
- Replace the destructive "Send to all subscribers" button + confirm dialog with **"Push draft to Resend"** (no `SEND` typing required).
- On success show: broadcast id, active subscriber count, and a "Open in Resend" link (`https://resend.com/broadcasts/<id>`) plus a one-line note: *"Send the final newsletter from the Resend dashboard."*
- Keep the test-send card unchanged.
- Add a small "Audience sync" note clarifying that subscribes/unsubscribes sync automatically and the manual button is a full reconcile.

### 3. Continuous audience sync (verify + harden)
- `subscribe-newsletter` already upserts to Resend; `unsubscribe-newsletter` already marks unsubscribed. Confirm both swallow Resend errors so they never block the user-facing op, and log failures to `admin_audit_log` for visibility.
- Add a **daily scheduled reconcile**:
  - New `supabase/functions/scheduled-newsletter-audience-sync/index.ts` — same logic as `sync-newsletter-audience` but auth-by-CRON-secret instead of admin JWT.
  - Register in `supabase/config.toml` with `verify_jwt = false`.
  - Trigger via `pg_cron` daily (SQL migration calling `net.http_post` with the function URL + `x-cron-secret` header read from Vault).
  - Adds a `NEWSLETTER_CRON_SECRET` runtime secret (request via secrets tool during build).

### 4. Docs
- Update `src/data/newsletters/README.md` "How to use" section to describe the new flow:
  1. Edit markdown.
  2. Preview & send test on /admin/newsletter-broadcast.
  3. Click "Push draft to Resend".
  4. Open Resend, send test (optional) and final broadcast from there.

## What stays the same

- Markdown format, renderer (`newsletter-render.ts`), light/dark template, audience name "DLinRT.eu Subscribers", `resend-webhook` (still records sends/bounces/unsubscribes), all role gating.

## Files touched

- `supabase/functions/send-newsletter-broadcast/index.ts` — drop send-now path, return Resend deep link.
- `src/pages/admin/NewsletterBroadcast.tsx` — relabel button, remove confirm dialog, show Resend link.
- `supabase/functions/scheduled-newsletter-audience-sync/index.ts` — new, CRON-secret auth.
- `supabase/config.toml` — register new function with `verify_jwt = false`.
- `supabase/functions/subscribe-newsletter/index.ts`, `unsubscribe-newsletter/index.ts` — log Resend failures to `admin_audit_log` (no behavior change for the user).
- New SQL migration — schedule daily `pg_cron` job calling the new function.
- `src/data/newsletters/README.md` — updated steps.
- One new secret: `NEWSLETTER_CRON_SECRET`.

## Verification

- Edit a draft, click "Send test" → arrives via Resend `/emails`.
- Click "Push draft to Resend" → broadcast appears in Resend dashboard; website shows the broadcast id and "Open in Resend" link; nothing is sent yet.
- In Resend dashboard, send test + final broadcast to the synced audience.
- Subscribe a fresh email on dlinrt.eu → appears in Resend audience within seconds.
- Unsubscribe via the email footer → next page load on the admin page shows the contact moved to unsubscribed and Supabase row updated.
- Manual "Sync audience with Resend" still reconciles full lists.
- Daily cron entry visible in `cron.job`; next run produces a `newsletter_audience_sync` row in `admin_audit_log`.

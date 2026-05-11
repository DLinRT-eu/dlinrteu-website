# Investigate & fix Resend bounces to academic recipients

## What we know
- Bounces are for two **valid, registered reviewers** at strict academic mailservers (UCLouvain, UMC Utrecht).
- All edge functions send from `noreply@dlinrt.eu` via Resend (`npm:resend@4.0.0`).
- The bounces returned to `noreply@dlinrt.eu` (the From address), which means Resend handed the mail off but the destination MTA rejected it asynchronously.
- No `email_send_log` table exists, so we cannot correlate sends to bounces from inside the app today.

## Most likely root cause
Strict academic MTAs (uclouvain.be, umcutrecht.nl) enforce **DMARC alignment**. The most common reasons for an async bounce in this exact pattern are:

1. **SPF / DKIM / DMARC misalignment for `dlinrt.eu` on Resend** — if DKIM isn't fully verified or DMARC isn't aligned, these institutions reject silently or with a 5xx after data.
2. **Recipient-side content/spam filtering** (HTML-only, gradient header, "invitation" subject, etc. trip Proofpoint / Microsoft Defender).
3. **Greylisting / temp 4xx** that Resend retries until it gives up — converted to a hard bounce.
4. **Recipient on a Resend suppression list** from a prior bounce/complaint — every retry now blocked locally by Resend.

## Plan

### Step 1 — Look up the actual bounce reason (no code change)
Check the Resend dashboard:
- **Logs** → filter on each address → open the failed delivery → read the SMTP diagnostic (`smtp; 550 5.7.1 ...`).
- **Suppressions** → confirm whether either address is now on Resend's suppression list.

This single step usually identifies the cause definitively (DMARC fail vs spam vs mailbox full vs suppressed).

### Step 2 — Verify domain authentication on Resend
In Resend → **Domains → dlinrt.eu**, confirm:
- SPF record published & verified
- DKIM (both selectors) verified
- A DMARC record exists at `_dmarc.dlinrt.eu` with at least `p=none; rua=mailto:...` so we get aggregate reports
- Optional: configure a **custom Return-Path / MAIL FROM** subdomain (e.g. `bounce.dlinrt.eu`) so bounces don't pollute the human `noreply` inbox

### Step 3 — Add bounce/complaint visibility inside the app
Today we have zero in-app visibility. Add a minimal logging table + Resend webhook so future bounces are searchable:

- New table `email_send_log` (id, recipient, subject, function_name, resend_id, status, error, created_at) with RLS (admin-only read).
- New edge function `resend-webhook` that receives `email.delivered`, `email.bounced`, `email.complained`, `email.delivery_delayed` and updates the log + auto-suppresses the address.
- Wrap each `resend.emails.send(...)` call so the returned `id` is recorded as `sent`, then enriched by the webhook.
- Surface the log in `SecurityDashboard` or a new admin "Email Delivery" tab.

### Step 4 — Reduce bounce risk for institutional recipients
Small, low-risk template hygiene improvements that materially help with Proofpoint/M365:
- Always include a plain-text alternative alongside HTML in `resend.emails.send`.
- Add a stable `List-Unsubscribe` header (mailto + URL) — already partially present for newsletters, extend to reviewer/notification mails.
- Set a clear `Reply-To: info@dlinrt.eu` so bounces/replies are routable.
- Avoid the gradient `<h1>` background style on first contact emails — use a simple branded header for transactional mail to reviewers.

### Step 5 — Re-send to the two reviewers
After Step 1/2 confirms the cause is fixed (or that they were suppression-listed), remove them from Resend suppressions and trigger a single test send (e.g. resend the reviewer assignment for the active round) to confirm delivery before continuing automated sends to that domain.

## Out of scope
- No changes to the registered reviewer accounts.
- No change to the From identity (`noreply@dlinrt.eu`).
- No mass re-send to other reviewers.

## Deliverable order
1. Manual check in Resend dashboard (no code).
2. DNS verification (no code).
3. `email_send_log` + `resend-webhook` (code).
4. Template hygiene pass (code).
5. Targeted re-send to the two recipients.

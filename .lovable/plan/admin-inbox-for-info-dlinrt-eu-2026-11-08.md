# Admin Inbox for info@dlinrt.eu

## Goal
After signing in, admins can open an Inbox page in the admin area. There they can read the mail that arrives at info@dlinrt.eu and reply from the website, without signing in to Resend or IONOS.

## Key decision: where the mail is read from
Incoming mail for dlinrt.eu goes to IONOS. If we switched it to Resend, the existing IONOS mailboxes would stop getting mail. So the Inbox will:
- **Read** mail directly from the IONOS info@dlinrt.eu mailbox. Nothing about how mail is delivered changes.
- **Send replies** through Resend from info@dlinrt.eu, as the site already does. Each reply is also saved to the IONOS "Sent" folder, so the history matches what you see in IONOS webmail.

This needs one new secret: the IONOS mailbox password for info@dlinrt.eu. It is stored server-side only and never shown in the browser. Using an IONOS app-specific password is recommended if one is available.

## What admins will see
- An **Inbox** entry in the admin navigation, showing an unread count.
- A message list with sender, subject, date, unread marker and search. Folders: Inbox and Sent.
- A message view showing safely cleaned text and HTML, plus attachments you can download.
- **Reply / Reply all**, with the original message quoted. The reply keeps the conversation thread, so the recipient's mail program groups it correctly.
- Mark as read or unread, and archive.
- A small "new mail" badge on the admin dashboard.

## Security and privacy (GDPR)
- Admin-only. Every request checks the admin role on the server.
- Email contents are not copied into the database. Each view fetches them live from IONOS.
- A small log records who replied, when and to which message ID. The message body is not logged.
- Message HTML is cleaned before it is shown. Images from outside sources are blocked until you click to load them.
- Replies are limited in size and number. Sends respect the existing suppression list.

## Technical details
- New edge function `admin-mailbox` (admin JWT check + `has_role`, dynamic CORS, generic outer catch). It connects to `imap.ionos.de:993` over TLS with an IMAP client (imapflow via npm, or `Deno.connectTls` as a fallback). Actions: `list`, `get`, `flag`, `move`, `attachment`.
- New edge function `admin-mailbox-reply`: zod-validated input; sends via `npm:resend@4.0.0` from info@dlinrt.eu with `In-Reply-To`/`References` headers; uses the existing send-logging/suppression helper; adds the sent copy to the IONOS Sent folder via IMAP APPEND.
- Secrets: `IONOS_IMAP_USER` (info@dlinrt.eu), `IONOS_IMAP_PASSWORD`.
- Migration: `admin_mail_replies` audit table (admin_id, message_id, to-address hash, sent_at), with GRANTs and has_role-based RLS.
- UI: `src/pages/admin/AdminInbox.tsx` plus components (MessageList, MessageView, ReplyComposer using react-hook-form + zod), route under ProtectedRoute/ApprovalGate admin, nav link, and sanitize-html for rendering.
- Tests: input validation and reply-header construction.

## Not included
- Writing new emails from scratch. Replies only for now; this can be added later.
- Other mailboxes besides info@dlinrt.eu.
- Changes to how mail is delivered to dlinrt.eu.

# Email system audit and fixes

## What I found

**1. Newsletter signup sends an extra internal email.** Every new newsletter subscriber triggers two emails: the welcome message to the subscriber and a "New Newsletter Subscription" alert to the team. That second one is the noise you want gone.

**2. Delivery tracking is switched off.** The site has a delivery-event receiver (bounces, complaints, delayed mail) but the shared secret Resend needs for it was never set, so the receiver rejects every event. The delivery log table is completely empty — zero records — which means bad addresses are never recorded and never stopped from being mailed again. That is the most likely source of the repeated "not delivered" errors: the same broken addresses keep being retried, and the failure notices land in a human inbox instead of being logged.

**3. Internal alerts no longer depend on forwarding, but the recipient list is not configured.** Team alerts (contact form, registrations, feedback, certification) already go direct to team members instead of relying on info@dlinrt.eu forwarding — good. However the list of team addresses falls back to two hard-coded addresses because the configuration entry for it was never filled in. If either of those two mailboxes is stale or rejects mail from our sender, every team alert produces a failure notice. info@dlinrt.eu stays as the visible reply-to address on all mail, so it is only used for replies, not delivery.

## What I will change

1. **Stop the per-signup team alert.** Newsletter subscriptions will no longer email the team. Subscribers still get their welcome message, and the subscriber record is still stored, so the admin newsletter screen remains the place to see who signed up.
2. **Turn delivery tracking on.** Add the missing shared secret so bounce/complaint/delay events from Resend are accepted and recorded, and confirm the receiver address is registered on Resend's side. (I need the secret value from the Resend dashboard — I will ask for it during the work.)
3. **Stop re-mailing dead addresses.** Before sending, check the delivery log: an address with a hard bounce or a spam complaint is skipped and the skip is recorded. Newsletter subscribers hitting a hard bounce or complaint are marked as unsubscribed automatically (this part already exists but never fired because tracking was off).
4. **Make the team recipient list explicit.** Set the team-alert address list in configuration instead of relying on the hard-coded fallback, and confirm each address accepts mail from our sender.
5. **Add an email health view for admins.** A small screen listing recent sends with their outcome (delivered, bounced, complained, skipped) so failures are visible in the app instead of arriving as bounce notices in a personal inbox.
6. **Check the forwarding path.** Verify that info@dlinrt.eu still receives and forwards correctly, and report the result. If forwarding is unreliable, item 4 already removes any dependency on it.

## Technical notes

- `subscribe-newsletter`: drop the second `resend.emails.send` call (the admin notification block) and its logging.
- `resend-webhook`: requires the `RESEND_WEBHOOK_SECRET` secret; without it the function returns 500 and events are lost. Webhook URL to register: `https://msyfxyxzjyowwasgturs.functions.supabase.co/resend-webhook` with events `email.sent`, `email.delivered`, `email.bounced`, `email.complained`, `email.delivery_delayed`, `contact.unsubscribed`.
- New shared helper in `supabase/functions/_shared/` — `isSuppressed(email)` — querying `email_send_log` for `status in ('bounced','complained')` with hard bounce types; called by the sending functions (`send-newsletter-broadcast`, digests, reminders, invitations, notify-*) before each send, logging a `suppressed` row on skip.
- Sending functions currently do not write to `email_send_log` at all; only the webhook does. Add a lightweight post-send insert with `function_name` and `resend_id` so sends can be correlated with delivery events.
- `ADMIN_NOTIFICATION_EMAILS` secret to be set, replacing the `FALLBACK_ADMIN_EMAILS` path in `_shared/admin-recipients.ts`.
- Admin health view: new page under `src/pages/admin/` reading `email_send_log` (admin-only RLS via `has_role`), with status filter and recipient search; no new table.

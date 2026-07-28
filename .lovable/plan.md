
## What's actually happening

`noreply@dlinrt.eu` is the **From** address on every outbound email (24 references across ~20 edge functions). Only 3 functions currently set a `reply_to` header (`send-newsletter-broadcast`, `send-contact-email`, `submit-product-feedback`) — all other emails have no `reply_to`, so when a recipient hits **Reply**, the message is sent to `noreply@dlinrt.eu`.

The "reply hits the whole mailing list" behavior can only originate at the **mailbox / DNS / Resend side**, not in the app code:
- `noreply@dlinrt.eu` is likely configured as an **alias, forwarder, or group** that fans out to newsletter subscribers or to a shared inbox that itself is on the list, OR
- an **inbound route / webhook** in Resend picks up mail to `noreply@` and re-injects it into a broadcast, OR
- the mailbox provider treats `noreply@` as a distribution list.

We can't fix DNS/Resend routing from code, but we can make sure the app never *invites* reply-to-noreply again and give you the exact checklist to close the mailbox side. Root cause verification is step 1.

## Plan

### 1. Immediate code fix — stop directing replies to noreply

Add `reply_to: "info@dlinrt.eu"` to every outbound Resend call whose `from` uses `noreply@dlinrt.eu` and that does not already override reply-to. Files to edit (20 send sites):

- `supabase/functions/unsubscribe-newsletter/index.ts`
- `supabase/functions/notify-reviewer-assignment/index.ts`
- `supabase/functions/notify-edit-submitted/index.ts` (2 sends)
- `supabase/functions/notify-certification-complete/index.ts` (2 sends)
- `supabase/functions/invite-reviewer/index.ts`
- `supabase/functions/invite-company-representative/index.ts` (2 sends)
- `supabase/functions/subscribe-newsletter/index.ts` (2 sends — confirmation + welcome)
- `supabase/functions/send-role-request-digest/index.ts`
- `supabase/functions/admin-reset-user-password/index.ts`
- `supabase/functions/send-notification-digest/index.ts`
- `supabase/functions/send-deadline-reminders/index.ts`
- `supabase/functions/send-certification-reminder/index.ts`
- `supabase/functions/send-bulk-representative-email/index.ts`
- `supabase/functions/notify-user-registration/index.ts`
- `supabase/functions/notify-user-approval/index.ts`
- `supabase/functions/notify-role-request-outcome/index.ts`

Leave `send-contact-email` (`reply_to: email`) and `submit-product-feedback` (`reply_to: submitter_email`) unchanged — those correctly reply to the original sender. Leave `send-newsletter-broadcast` as-is (already `info@dlinrt.eu`).

Optional: extract a single constant `REPLY_TO = "info@dlinrt.eu"` in `supabase/functions/_shared/cors.ts` (or a new `_shared/mail.ts`) and import it, so this can never drift again.

### 2. Root-cause the fan-out (mailbox / Resend / DNS — user action)

Provide a short checklist for the user to close the actual leak. All items are dashboard actions, not code:

1. **Resend → Domains → dlinrt.eu → Inbound / Webhooks:** confirm there is **no inbound route** for `noreply@dlinrt.eu` (or a catch-all) forwarding to a webhook that triggers `send-newsletter-broadcast` or writes to the audience.
2. **Resend → Audiences:** search for `noreply@dlinrt.eu` as a **contact**. If it exists, remove it — that would explain why anything sent to it is later included in the audience send.
3. **Mailbox provider (Google Workspace / Zoho / whichever hosts `dlinrt.eu` MX):**
   - Confirm `noreply@dlinrt.eu` is either **not a mailbox at all** or is a mailbox with **no group membership** and **no forwarding rules**.
   - If it is currently a Group / Distribution list, either delete the group or restrict posting to the domain owner and disable external posting.
   - Preferred posture: publish an MX / mailbox rule that **rejects** inbound mail to `noreply@` with SMTP 550 (many providers offer a "reject and don't forward" setting for no-reply aliases).
4. **DMARC / SPF / DKIM:** unrelated to fan-out but worth confirming DMARC is at `p=reject` so spoofed replies can't reach the audience.

### 3. Verification

- After the code edits, redeploy the affected edge functions (automatic in Lovable).
- Send a test through one of the changed flows (e.g. `admin-reset-user-password` on a test account); confirm the received email's headers show `Reply-To: info@dlinrt.eu`.
- Ask the user to reply to that test message — the reply must land in `info@dlinrt.eu` only, not in any subscriber inbox.
- User completes checklist §2 and confirms via Resend inbound logs that no route to `noreply@` remains.

### Out of scope

- No changes to the newsletter template, audience membership, GDPR opt-in flow, or `_shared/newsletter-render.ts`.
- No DNS changes from Lovable (cannot be made from here — user does this at their DNS/mailbox provider).
- No new email service or connector.

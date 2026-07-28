## Context

The reply-fan-out you are seeing on `noreply@dlinrt.eu` is caused by an IONOS-side **distribution list / group alias** on that address. Anything sent (or replied) to `noreply@dlinrt.eu` is expanded by IONOS to every member of that list. Resend is only the *outbound* sender — it is not what fans replies out. The app code already sets `reply_to: info@dlinrt.eu` on every transactional email, so once the IONOS list is gone, replies will land in `info@` and nowhere else.

The fix is entirely in the **IONOS control panel** (and optionally DNS). Lovable cannot make these changes for you — no code change is needed or possible here. Below is the exact sequence to run.

## Plan (IONOS + DNS actions, in order)

### 1. Export the current IONOS list members (safety net)
- IONOS Control Panel → **Email** → **Mailing Lists** (or **Group Addresses** / **Distribution Lists**, depending on your IONOS plan) → open `noreply@dlinrt.eu`.
- Export or copy the member list to a local file. This is your rollback reference — do not skip it.
- Confirm the members are in fact your newsletter subscribers (that will confirm the IONOS list is the fan-out source).

### 2. Delete the IONOS distribution list for `noreply@`
- In the same IONOS screen, **delete** the `noreply@dlinrt.eu` mailing list / group alias.
- Do **not** recreate it as a mailbox or forwarder. `noreply@` should not accept inbound mail at all.

### 3. Reject inbound mail to `noreply@dlinrt.eu`
Pick one of these, in order of preference:
- **Preferred:** in IONOS, create `noreply@dlinrt.eu` as a **catch-and-reject alias** (some IONOS plans call this "Bounce" or "Reject"). Inbound mail gets SMTP 550, nothing is stored, nothing is forwarded.
- **Fallback:** create it as a mailbox with **no forwarding, no group membership, no auto-reply**, and never check it. Replies silently die there. Less clean than reject, but acceptable.
- Do **not** forward `noreply@` to `info@` — that would dump every bounce and every stray reply into `info@`.

### 4. Confirm `info@dlinrt.eu` still works
- Send a manual test to `info@dlinrt.eu` from an external address and confirm it lands in the intended IONOS mailbox (this is where all app replies now go, per the `reply_to` header we set earlier).

### 5. Confirm Resend is not re-introducing the fan-out
- Resend Dashboard → **Domains → dlinrt.eu → Inbound / Webhooks**: no route for `noreply@` (or catch-all) should forward to a webhook that writes to the audience or triggers `send-newsletter-broadcast`.
- Resend Dashboard → **Audiences**: search for `noreply@dlinrt.eu` as a contact. If present, remove it.
- No changes to Resend sending config are needed — `noreply@dlinrt.eu` stays as the verified **From** identity for outbound only.

### 6. DNS sanity (optional but recommended)
- Confirm SPF includes only Resend (`v=spf1 include:_spf.resend.com -all` or your current equivalent) and IONOS if you still send from IONOS mailboxes.
- Confirm DKIM for Resend is green in the Resend dashboard.
- Confirm DMARC is at least `p=quarantine` (ideally `p=reject`) with `rua=` reporting to a monitored address.
- No MX changes are required — IONOS remains the MX host for `dlinrt.eu` because `info@` and other real mailboxes still live there.

### 7. Verify the fix end-to-end
- From a personal external address (Gmail, etc.), send a plain email **to** `noreply@dlinrt.eu`. Expected: SMTP 550 bounce (or silent drop if you used the fallback). **Not** expected: any subscriber receiving a copy.
- Trigger one transactional email from the app (e.g. `admin-reset-user-password` on a test user). Inspect headers: `From: noreply@dlinrt.eu`, `Reply-To: info@dlinrt.eu`. Hit Reply → confirm the draft goes to `info@` and only `info@`.
- Ask one trusted subscriber to confirm they did **not** receive a copy of your test-to-`noreply@` from step 7.

## Out of scope

- No code changes. The `reply_to: info@dlinrt.eu` patch across the 20 Edge Functions is already deployed and is what makes the IONOS deletion safe.
- No changes to newsletter templates, audience membership, Supabase tables, or GDPR opt-in flow.
- No migration of newsletter sending away from Resend — Resend stays as the sole sender.
- Lovable cannot access IONOS or your DNS provider; steps 1–6 are actions you perform in those dashboards.

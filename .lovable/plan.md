# Verify new Resend sending domain, switch sender to info@dlinrt.eu, enable receiving

## Goal
1. Check that the new Resend sending setup (send.forge.rmta.net, dlinrt.eu's newer Resend record) is verified and working.
2. Keep sending from a dlinrt.eu address, preferably `info@dlinrt.eu` instead of `noreply@dlinrt.eu`.
3. Turn on receiving in Resend so mail sent to `info@dlinrt.eu` is forwarded to an inbox.

## Steps
1. **Verify the domain (read-only)**
   - Ask Resend, using the project's existing key, for its domain list and the status of each DNS record (SPF/MX on the send subdomain, DKIM, DMARC, and the new record).
   - Look up the public DNS for dlinrt.eu and send.forge.rmta.net to confirm the records match.
   - Send one test email from `info@dlinrt.eu` to Matteo and confirm Resend reports it delivered.
2. **Switch the sender**
   - If verification passes, change the "from" address in every email function from `noreply@dlinrt.eu` to `info@dlinrt.eu`, keeping the display names (e.g. "DLinRT.eu Review System"). Reply-to is already `info@dlinrt.eu`.
   - If verification fails, keep `noreply@dlinrt.eu` and report which DNS record still needs fixing at IONOS.
3. **Enable receiving**
   - Resend inbound needs an MX record that points dlinrt.eu (or a subdomain) at Resend. **Risk:** if `info@dlinrt.eu` is already a real mailbox at IONOS, moving the root MX to Resend would break that mailbox. Check the current MX first:
     - If dlinrt.eu already has a working IONOS mailbox: leave MX unchanged and use IONOS forwarding for info@; no Resend receiving on the root domain.
     - If not: give the exact MX record to add at IONOS, enable receiving in Resend, and add a small inbound webhook function that forwards each received email to the chosen inbox (signed with the existing webhook secret).
   - I need the address that forwarded mail should go to. By default I'll use Matteo's own address.
4. **Check it works**: run a send test and an inbound test (email to info@dlinrt.eu arrives in the forward inbox), check the function logs, then update the email-provider memory to the new sender.

## Technical notes
- Files: all `supabase/functions/*/index.ts` that set `from:`; possibly `_shared/email-delivery.ts` to hold one shared sender constant.
- New function (only if Resend receiving is used): `resend-inbound`, verifying the Svix signature and forwarding through the Resend API, with CORS and a generic catch.
- No database changes.

## Findings — Newsletter "lost subscribers" investigation

I searched every table in the database for email addresses that could plausibly be merged back into `newsletter_subscribers`. No counts shared in chat — only aggregates.

### Current state
- `newsletter_subscribers`: 101 rows, all active, all with `consent_given = true`. No "soft-deleted" or unsubscribed rows hiding extra people.
- `contact_submissions`: empty.
- `email_send_log`: empty (so no historical recipients to recover from there).
- `reviewer_invitations`: empty.
- `user_product_experiences`: 1 email, no newsletter consent flag.
- `user_registration_notifications`: 22 system-generated admin notifications — these are operational, not opt-ins.
- `profiles`: 22 users. Only 5 have `data_processing_consent_given = true`, and 4 of those are not already in `newsletter_subscribers`.

### GDPR assessment (important)
None of the other tables carry **newsletter/marketing consent**. `profiles.data_processing_consent_given` is account-processing consent (Art. 6(1)(b)), which is **not** the same as Art. 6(1)(a) consent for marketing emails. Auto-merging any of these into `newsletter_subscribers` would be an unlawful re-purposing of personal data and would violate the consent text shown on the signup form ("I agree to join the DLinRT mailing list…").

**Conclusion: there is no in-database source from which subscribers can be lawfully recovered.** The data was not silently dropped to another table — it simply is not present in the Supabase project anymore.

### Recommended path forward
The only compliant way to restore the lost subscribers is to re-import them from an out-of-band backup (CSV/XLSX export taken before the migration, Mailchimp/Resend audience export, etc.). The admin tool already supports this:

- `src/components/admin/NewsletterImportDialog.tsx` → `admin-newsletter-management` edge function (`bulk-import` action), gated by an explicit "I confirm consent" checkbox.

### Plan

1. **Add a one-shot reconciliation utility on the admin Newsletter page** (no PII in code, no new tables):
   - A button "Check for recoverable contacts" that calls a new admin-only RPC `count_potential_newsletter_recoveries()` returning **only counts** (e.g. `{ profiles_with_consent_not_subscribed: 4 }`) — no names, no emails ever returned to the client or hard-coded.
   - A short on-screen GDPR notice making clear that those profiles have *account* consent only and **cannot be auto-imported**; they must be re-invited to opt in.

2. **Add an "Invite to subscribe" admin action** that triggers `subscribe-newsletter`-style double opt-in emails to a chosen group (admin selects from a server-side list, never exposed in source). The recipient must click the confirmation to be added — preserving lawful consent. Emails are read server-side via the edge function; the frontend only sees aggregate success counts.

3. **Document in `docs/ADMIN_GUIDE.md`** the recovery procedure: restore from external backup via the existing CSV import dialog, with the consent checkbox.

4. **No code, comments, commits or migration files will contain any first name, last name, or email address.** All PII stays inside the database and is handled exclusively by the existing edge functions using the service role key.

### Out of scope
- Bulk copying emails from `profiles` / `user_product_experiences` / `user_registration_notifications` into `newsletter_subscribers`. Rejected on GDPR grounds (no marketing consent on those records).
- Restoring subscribers from server logs or analytics tables (no PII stored there).

If you have an external backup file (CSV/XLSX) of the lost subscribers, the cleanest path is to drop it into the existing **Admin → Newsletter → Import** dialog — no code changes needed at all.

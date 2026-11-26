# GDPR strengthening

## What changes for users
- **Contact form and product feedback form:** a short privacy notice under the submit button that says what we store, why, how long we keep it, and links to the privacy policy.
- **Account deletion (admin):** deleting a user also removes or anonymises their rows in tables keyed by email (contact messages, product feedback, newsletter, invitations, email logs, registration notifications).
- **"Download my data":** the export also covers the newer tables (product edit drafts, reviewer expertise, profile documents and their access log, assignment history, review comments, company representative records, invitations).
- **Withdrawing cookie consent:** analytics cookies and stored visitor IDs are actually removed, including on the parent domain, and tracking stops right away.

## Technical details
- `src/components/ContactForm.tsx`, `src/components/ProductFeedbackForm.tsx`: add a shared `PrivacyNotice` component (legal basis, retention period copied from `gdpr-retention-purge`, link to `/privacy`).
- `supabase/functions/admin-delete-user/index.ts`: before deleting the auth user, delete from `contact_submissions`, `product_feedback`, `newsletter_subscribers`, `company_invitations`, `reviewer_invitations` by email; anonymise `email_send_log.recipient` and `user_registration_notifications.email`; keep audit-log entries but store a hashed email. Record counts in the admin audit log.
- `supabase/functions/gdpr-data-export/index.ts`: add the tables listed above, filtered by user id or email; drop the `security_events.user_id` filter, since that table has no such column (it currently returns an error/empty).
- `src/utils/cookieUtils.ts` + `src/components/profile/ConsentManagement.tsx`: on withdrawal, expire each analytics cookie for the current host and the `.dlinrt.eu` domain on path `/`, clear the visitor ID from localStorage/sessionStorage, and set an "opted out" flag that the tracker checks before sending.
- Tests: add a unit test that withdrawal clears the analytics cookies and the visitor ID, and that the tracker sends nothing afterwards.
- Update the SECURITY.md GDPR section.

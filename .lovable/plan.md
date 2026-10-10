# Move DLinRT from your own Supabase to Lovable Cloud

## Important limitation
Lovable has no supported way to switch a project that already uses your own Supabase over to Lovable Cloud. This project can't have Cloud turned on in place. Lovable's docs say to contact support before removing or replacing anything. The only workable route is to **rebuild the backend in a new Lovable Cloud project** and then move the live site over to it.

## What would happen (step by step)
1. **Contact Lovable support first.** Ask whether they can move this project to Cloud for you. If they can, most of the steps below are not needed.
2. **New Cloud copy:** remix this project into a new project with Lovable Cloud turned on. The current site stays live and unchanged.
3. **Rebuild the database:** recreate all ~45 tables, roles, access rules, built-in functions and automatic actions in Cloud.
4. **Copy the data:** export each table from your Supabase as CSV, remove passwords and codes, and import the files in the right order (profiles and roles first).
5. **Accounts:** copy every user's email, name, profile, roles, approval status and company links. **Passwords, sessions and two-factor setups can't be copied.** On their first visit, each user confirms their email and sets a new password. They then get their existing roles and data back.
6. **Files:** copy uploaded profile documents and certificates into Cloud storage.
7. **Email:** keep Resend (noreply@dlinrt.eu) with the same sending domain. The send log, suppression list and bounce webhook move with it, and the webhook address changes to the new backend.
8. **Server functions:** redeploy all ~25 functions (newsletter, contact, notifications, reminders, GitHub PRs, analytics) and add their keys again (Resend, GitHub, webhook secret).
9. **Agent integrations (MCP):** once on Cloud, add a read-only connection so AI tools can search the public catalogue.
10. **Switch over:** connect dlinrt.eu to the new project, check sign-in, reviews, company certification, newsletter and admin pages, then keep the old Supabase read-only for 30 days as a backup.

## Risks
- Every user has to set a new password, and two-factor users have to set it up again. Their email setup remains, but users should be told in advance (GDPR notice).
- Newsletter consent records and audit logs must move unchanged.
- Short freeze on edits during the switch-over.
- Large effort; GitHub sync, scheduled reminders and the bounce webhook all need to be re-checked.

## What I need from you
- Agreement to contact support first, or to go straight to the remix route.
- Later: table exports from the Supabase dashboard, and the Resend, GitHub and webhook keys entered through the secure form.

## Technical details
- Keep a server-only mapping table from each old user ID to the new auth ID, and rewrite all `user_id` / `*_by` foreign keys during import.
- Link a returning user only after a verified email that matches exactly one record; never trust IDs sent by the browser.
- Check row counts per table after the import, plus one test write. Remove test records afterwards.
- Record the backend decision in AGENTS.md; keep the educational/safety disclaimer.

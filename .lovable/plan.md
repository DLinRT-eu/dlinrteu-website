# Moving DLinRT onto Lovable's built-in backend: what it would involve

## Short answer
Lovable has no switch or supported path to move an app from your own Supabase account onto its built-in backend (Lovable Cloud). Lovable's docs say to keep using the connected Supabase account, which stays supported. The only way to move would be to rebuild the backend by hand in a new copy of the project.

## What would have to move (current state)
- **Users:** 65 accounts. Passwords and sign-in sessions can't be copied. Every user, including reviewers and company representatives, would have to confirm their email and choose a new password. Two-step sign-in (MFA) setups and backup codes would also have to be redone.
- **Data:** 50 tables: reviews, review rounds, drafts, newsletter subscribers, analytics, audit and consent logs, certification records and more. Each table would be copied over with its access rules, and every link to a user would be re-pointed to that user's new account.
- **Behind-the-scenes functions:** 44 server functions (emails, newsletter, inbox, reminders, GitHub sync, changelog) and 5 scheduled jobs (such as deadline reminders and clean-ups). Each would be redeployed and its saved keys re-entered: Resend, GitHub and others.
- **Files:** 1 storage area, currently empty, so nothing to copy there.
- **Outside services pointing at the current backend:** the Resend webhook for bounces and inbound mail, GitHub automation, and email links already sent. All of them would need new addresses.
- **Privacy:** consent records and audit logs must move intact. The legal basis for keeping them stays the same, and the move would need to be noted in the privacy documentation.

## Risks
- Downtime or a period where some users can't sign in.
- An active review round (deadline 10 Nov) would be disrupted if the move happens during it.
- Work in progress could be lost if old and new backends both receive changes during the switch.
- A large effort, likely several sessions, with careful checks at each step.

## What you'd gain
- Agent integrations (the AI-tool connection you asked about) become possible.
- Lovable can manage and fix the backend directly, including server function deployment, logs and sign-in testing from here.

## Options
1. **Stay as is (recommended for now).** Everything keeps working; agent integrations remain unavailable.
2. **Plan a move after the current review round closes.** Make a separate copy of the project on Lovable's built-in backend. Rebuild tables, functions and jobs there, copy the data, and test with a few accounts. Then switch the dlinrt.eu domain and ask all users to reset their password. Nothing changes on the live site until the final switch.

No changes are made by approving this; choosing option 2 would start a separate, detailed migration plan.

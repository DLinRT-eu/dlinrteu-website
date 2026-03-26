

# Clean Up Sensitive Personal Information from Codebase

## Problem

The file `docs/REVIEWER_SETUP.sql` contains **8 real personal email addresses** of reviewers (Gmail, NHS, MD Anderson, Outlook, InPictura accounts) along with their full names. This is a GDPR violation — personal contact information of individuals should not be in a public repository.

All other email addresses found are either:
- **Organizational/role emails** (`info@dlinrt.eu`, `noreply@dlinrt.eu`) — fine to keep
- **Team member @dlinrt.eu emails** on the About page — intentionally public, fine
- **Company support emails** (`RPA_Info@mdanderson.org`) — public business contacts, fine
- **Placeholder examples** (`user@example.com`) — fine
- **Auth/password handling code** — functional code, not stored credentials

## Plan

### 1. Delete `docs/REVIEWER_SETUP.sql`

This file contains:
- 8 personal emails: `bryanthebeemang@gmail.com`, `usman.lula@uhb.nhs.uk`, `amithjkamath@outlook.com`, `mark.gooding@inpictura.com`, `adam.miovecz@gmail.com`, `mjaponc@gmail.com`, `kawahid@mdanderson.org`, `matthew.jones@uhcw.nhs.uk`
- Full names linked to those emails
- SQL queries referencing `auth.users` table patterns

**Action**: Delete the entire file. It was a one-time setup script that has already been executed. The data is in the database; the script serves no ongoing purpose and poses a privacy risk.

### 2. No other files need changes

- `src/pages/About.tsx` — team member emails are all `@dlinrt.eu` organizational addresses, intentionally displayed on the public About page
- `SECURITY.md` / `CODE_OF_CONDUCT.md` — contain `m.maspero@umcutrecht.nl` and `info@dlinrt.eu` as designated security/conduct contacts (intentional, required)
- Edge functions — contain only functional auth code, no hardcoded credentials
- `.env` / `client.ts` — Supabase anon key is a publishable key (not a secret)

### Reminder

After this cleanup, the git history reset (orphan branch rebase) you plan to do outside Lovable will ensure these emails are also purged from commit history.


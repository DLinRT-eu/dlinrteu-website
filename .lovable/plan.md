# Make role guides public and link them from About

## Goal
Let visitors read the role guides (company, reviewer, admin) without an account, and link to them from the About page where the roles are described — so people considering joining can see what each role involves.

## Current state (verified)
- `/company/guide`, `/reviewer/guide`, `/admin/guide` are all wrapped in `ProtectedRoute` in `src/App.tsx` (lines 378, 425, 452), so they redirect to login.
- `src/pages/Roles.tsx` already has "View Complete Guide" buttons pointing at these URLs — they currently dead-end at the login page for logged-out visitors.
- `src/pages/About.tsx` "What Happens After You Log In?" section describes the four roles (Regular User, Reviewer, Company Representative, Administrator) but has no guide links.

## Changes

1. **Make the three guide routes public** (`src/App.tsx`)
   - Remove the `ProtectedRoute` wrapper from `/company/guide`, `/reviewer/guide`, and `/admin/guide` so they render for everyone.
   - Before doing so, scan the three guide pages (`CompanyGuide.tsx`, `ReviewerGuide.tsx`, `AdminGuide.tsx`) for any sensitive operational content (internal URLs, admin-only procedures that shouldn't be public). If the admin guide contains sensitive operational detail, keep `/admin/guide` protected and only open the company and reviewer guides — flagged here as a decision point.

2. **Add guide links to the About page** (`src/pages/About.tsx`)
   - In the "What Happens After You Log In?" section, add a "View complete guide →" link to the Reviewer card (`/reviewer/guide`) and the Company Representative card (`/company/guide`), and to the Administrator card (`/admin/guide`) if that guide is made public.
   - Style consistent with the existing "Learn more about roles and permissions →" link.

3. **Verify**
   - Logged-out browser check: open `/company/guide` and `/reviewer/guide` directly — pages render without redirect to login.
   - About page shows the new links and they navigate correctly.
   - Typecheck and build pass.

## Notes
- No changes to the guide page content itself, the roles data model, or any auth logic beyond removing the route guard on the guides.
- The existing "View Complete Guide" buttons on `/roles` will start working for logged-out visitors automatically once the guards are removed.

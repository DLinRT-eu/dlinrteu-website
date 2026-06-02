Update all public and internal documentation that describes how company representatives are onboarded so both the new invitation-based flow and the legacy self-service flow are correctly documented.

## What changed
- A new admin-initiated invitation workflow was built: admins can invite a company representative directly from `/admin/companies` via email. The invitee clicks the link, sets a password, and is automatically registered as a verified company representative for that company.
- The legacy workflow remains available: any user can sign up, then request the Company Representative role from their profile and wait for admin approval.

## Files to update

### 1. `src/pages/company/CompanyGuide.tsx`
- Rewrite the "Registration & Authentication Workflow" section (currently lines 131-295) to present two distinct paths.
- **Path A — Invitation (Recommended)**: Admin sends invite → email arrives → click link → set password → auto-verified and logged into `/company/dashboard`.
- **Path B — Self-Service**: Create account → go to Profile → request Company Representative role → provide verification details → wait for admin review (1-3 business days).
- Update the workflow diagram to show both paths branching to "Access Granted".
- Keep all existing detail about verification fields, limits (max 5 reps), and waiting times.

### 2. `docs/ADMIN_GUIDE.md`
- In section 4 "Company Management", add a new subsection "Inviting Company Representatives" that documents:
  - Where the invite button lives (All Companies tab, per-company row).
  - What data is collected (email, first name, last name, position, optional message).
  - The invite lifecycle: pending → accepted / expired / revoked.
  - The 14-day expiry on invitation links.
  - What happens on acceptance: auth user created, profile auto-approved, `company` role assigned, verified rep record created.
- Update the "Verifying Company Representatives" subsection to clarify that it now covers the self-service path, while invitations bypass the Pending Verifications queue.

### 3. `README.md`
- In the "Multi-Role System" / "Company Certifications" bullet, add a brief note that company reps can be onboarded either by admin invitation or by self-service role request.

## Not in scope
- No code changes to invitation logic, edge functions, or UI.
- No database migrations.
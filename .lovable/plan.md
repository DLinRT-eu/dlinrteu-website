## Goal
Reduce confusion right after registration for **company representatives** and **reviewers**, and make the key links (guide, preferences, dashboard tabs) findable in one glance.

## Current gaps
- **ApprovalGate "approved"** silently renders the page — once approved, a user with no prior session is dropped wherever the redirect sent them, with no "here's what to do next" cue.
- **Reviewer dashboard** has `OnboardingChecklist` (good), but Preferences / Guide / Due Reviews links are split between the checklist and the header — easy to miss after dismiss.
- **Company dashboard (`/company/dashboard`)** has *no* onboarding equivalent. New company reps land on a stats/revisions screen with no guidance on: (1) read the Company Guide, (2) verify your company assignment, (3) certify your first product, (4) check the Overview page.
- "Company Guide" and "Reviewer Guide" routes exist but are not surfaced on the dashboards beyond a single small button.

## Changes (scoped, presentation-only)

### 1. New: `src/components/company/CompanyOnboardingChecklist.tsx`
Mirror of `OnboardingChecklist.tsx`, 3 steps, dismissible via `localStorage` key `company_onboarding_dismissed`:
1. **Read the Company Guide** — link `/company/guide`, completion tracked via `localStorage` flag `company_guide_read` (set on guide page mount, same pattern as reviewer).
2. **Review your company assignment & products** — link `/company/overview`. Completed when `companyProducts.length > 0` and overview visited (localStorage `company_overview_visited`).
3. **Certify your first product or submit an update** — completed when `revisions.length > 0` OR any certified product exists for this rep (use existing `revisions` array).

Render at top of `src/pages/company/Dashboard.tsx` only when not all steps complete and not dismissed (same pattern as reviewer). Pass `companyProducts` and `revisions` as props so it doesn't re-query.

### 2. `src/pages/company/CompanyGuide.tsx` and `src/pages/reviewer/ReviewerGuide.tsx`
Add `useEffect(() => localStorage.setItem('company_guide_read'|'reviewer_guide_read','true'), [])` on mount so the checklist step auto-completes. (Reviewer guide already has this for the reviewer checklist — verify and add if missing.)

### 3. `src/pages/company/Dashboard.tsx` — Quick Links bar
Below the header (above the stats grid), add a compact `QuickLinks` row of `Button variant="outline" size="sm"` links with icons:
- Company Guide (`/company/guide`)
- Overview & Certification Progress (`/company/overview`)
- My Products (`/company/products`)
- Notification Settings (`/settings/notifications`)

### 4. `src/pages/reviewer/Dashboard.tsx` — Quick Links bar
Same pattern, below header:
- Reviewer Guide (`/reviewer/guide`)
- Preferences (`/reviewer/preferences`)
- Due Reviews (`/reviewer/due-reviews`)
- Notification Settings (`/settings/notifications`)

(The existing header buttons stay; the bar is the persistent "useful links" surface that survives onboarding dismissal.)

### 5. `src/components/auth/ApprovalGate.tsx` — post-approval hand-off
For the "pending" alert, add a short bullet list of what happens next ("You'll receive an email when approved; then visit your role dashboard"). No behavior change for `approved` state (it just renders children) — guidance for approved users is handled by the new checklists/quick-links above.

## Out of scope
- No backend, RPC, RLS, or schema changes.
- No changes to certification logic (separate fix already shipped).
- No redesign of existing dashboards beyond the additions above.

## Verification
- New company rep flow: register → approved → `/company/dashboard` shows checklist + quick links; visiting `/company/guide` marks step 1 done; certifying marks step 3 done; dismissible.
- Reviewer flow: quick-links bar visible whether or not checklist is dismissed.
- Build + lint clean, no console errors on either dashboard.

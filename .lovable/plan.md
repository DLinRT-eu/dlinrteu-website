

# Authenticated Area Usability & Completeness Audit

## Summary

After reviewing all 40+ authenticated pages, routes, navigation components, and data flows, I identified **13 issues** across 4 categories: broken links, missing UI for new data fields, navigation inconsistencies, and missing functionality that the site's promise implies.

---

## Critical Issues

### 1. Broken Route: `/company/revisions` (404)
The Dashboard_Authenticated.tsx "Submit Revision" quick action, PendingStatsWidget, and RoleQuickActions all link to `/company/revisions`, but **no route exists** in App.tsx for this path. The actual revision submission functionality lives inside `/company/dashboard` (the Dashboard.tsx page). This is a dead link for every company representative.

**Fix**: Either create a `/company/revisions` route pointing to a dedicated page, or redirect it to `/company/dashboard` with a `?tab=revisions` query parameter, and update all 3 linking components.

### 2. No UI for `trainingData`, `evaluationData`, `safetyCorrectiveActions`
These fields were added to the type system and all export pipelines (CSV, FHIR, Model Card, Schema.org) but have **zero display components** on the product detail page (`ProductDetails.tsx`). Users cannot see this data anywhere in the UI, and reviewers/companies cannot enter it.

**Fix**: Create 3 new product detail section components:
- `TrainingDataDetails.tsx` — dataset provenance, demographics, disclosure level
- `EvaluationDataDetails.tsx` — clinical evaluation summary with endpoints/results
- `SafetyCorrectiveActionsDetails.tsx` — FSCA/recall timeline with authority links

Add them to `src/components/ProductDetails.tsx` layout.

### 3. `CompanyCertification` page not protected
Route `/company/certification` (line 338 in App.tsx) has **no `ProtectedRoute` wrapper** — it renders `<CompanyCertification />` directly. Any unauthenticated user can access it. While the page is informational, it contains company-specific action buttons that would fail without auth.

**Fix**: Wrap with `<ProtectedRoute allowedRoles={['company', 'admin']}>`.

---

## Navigation & UX Inconsistencies

### 4. MobileNav is not role-aware
Desktop Header.tsx shows different nav links per role (admin sees Admin/Companies/Reviews, reviewer sees Reviews/Products, etc.), but MobileNav.tsx shows the **same generic links** for all users regardless of role. Authenticated mobile users with admin/reviewer/company roles have no access to their role-specific pages from the mobile menu.

**Fix**: Mirror the Header.tsx role-based logic in MobileNav.tsx, adding conditional sections for admin, reviewer, and company links.

### 5. Desktop nav hides general links for privileged users
When a user has an active role (admin/reviewer/company), Header.tsx hides the "regular user" links: Companies, Dashboard (analytics), News, Resources & Compliance, Research & Initiatives, About, Support. These are still useful pages but become unreachable from the nav bar.

**Fix**: Add a "More" dropdown or keep a subset of general links visible for all roles.

### 6. `dashboard-home` not wrapped with ApprovalGate
The authenticated dashboard route uses `ProtectedRoute` but **not** `ApprovalGate`, unlike `/profile`, `/my-products`, and `/notifications`. A user with "pending" approval status can access the authenticated dashboard.

**Fix**: Add `<ApprovalGate>` wrapper to the `dashboard-home` route.

---

## Missing Functionality

### 7. No product edit UI for new fields
The ProductEditContext supports `updateField` for any path, but the visual editor has no form controls for the 3 new field groups (training data, evaluation data, safety actions). Reviewers and company representatives cannot populate these fields through the UI.

**Fix**: Add editable form sections in the product editor for these fields when in edit mode.

### 8. Admin Edit Approvals not in dashboard quick actions
The `EditApprovals` page exists at `/admin/edit-approvals` and is linked from the admin Dashboard, but it is **not listed** in the Dashboard_Authenticated quick actions grid, which is the primary admin entry point. Product edit drafts submitted for review may go unnoticed.

**Fix**: Add "Edit Approvals" to the admin quick actions in Dashboard_Authenticated.tsx.

### 9. ReviewAssignmentEnhanced.tsx is orphaned
The file `admin/ReviewAssignmentEnhanced.tsx` (1241 lines) exists but has no route and is never imported. It appears to be an upgraded version of ReviewAssignment.

**Fix**: Either wire it to a route or remove it to reduce dead code.

### 10. ProductExperiences uses legacy auth checks
`ProductExperiences.tsx` checks `useAuth().isAdmin` and `useAuth().isReviewer` directly instead of using `useRoles()`. The route in App.tsx correctly uses `allowedRoles={['admin', 'reviewer', 'company']}`, but the page-level check excludes company users (line 51: `!isAdmin && !isReviewer`). Company representatives cannot see product experiences even though the route allows them.

**Fix**: Replace `useAuth().isAdmin/isReviewer` with `useRoles()` checks that include company role.

---

## Missing Features (Goal Alignment)

### 11. No search in authenticated dashboard
Dashboard_Authenticated has quick actions and role widgets but no way to search products or users. The public-facing Products page has search, but the admin/reviewer dashboard does not surface it.

### 12. No activity log / audit trail for users
Users can see notifications but cannot see a log of their own actions (reviews submitted, drafts saved, revisions filed). This is expected for an authoritative platform tracking product information provenance.

### 13. Notification preferences missing
NotificationHistory supports viewing/deleting notifications, but there is no settings page to configure notification preferences (what to be notified about, email vs. in-app). The Profile page has consent management but not notification channel preferences.

---

## Proposed Fix Plan (Priority Order)

| # | Task | Files | Severity |
|---|------|-------|----------|
| 1 | Fix `/company/revisions` broken link | App.tsx, Dashboard_Authenticated.tsx, PendingStatsWidget.tsx, RoleQuickActions.tsx | Critical |
| 2 | Create TrainingData, EvaluationData, SafetyActions display components | 3 new + ProductDetails.tsx | Critical |
| 3 | Protect `/company/certification` route | App.tsx | High |
| 4 | Add ApprovalGate to `dashboard-home` | App.tsx | High |
| 5 | Fix ProductExperiences role check | ProductExperiences.tsx | High |
| 6 | Make MobileNav role-aware | MobileNav.tsx | Medium |
| 7 | Add general links for privileged users | Header.tsx | Medium |
| 8 | Add Edit Approvals to admin quick actions | Dashboard_Authenticated.tsx | Medium |
| 9 | Remove or wire ReviewAssignmentEnhanced | App.tsx or delete file | Low |
| 10 | Add product editor forms for new fields | product-editor components | Medium |

Items 11-13 (search, audit log, notification preferences) are feature-level work that would be separate implementation efforts.


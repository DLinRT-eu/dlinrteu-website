
# Authenticated UX Audit — Findings & Proposed Improvements

Scope: post-login experience for the four user types (regular, company, reviewer, admin). Public pages stay out of scope unless they directly affect sign-in/find-info friction.

## What works today
- Role-aware top nav + collapsible sidebar (`Header.tsx`, `AppSidebar.tsx`).
- Unified `/dashboard-home` per role with Priority Actions + collapsible "All tools" (admin).
- `ApprovalGate`, `ProtectedRoute`, MFA enforcement, role switcher in header.
- Newsletter opt-in added to signup; Quick Links on company dashboard.

## Pain points found
1. **Duplicate navigation surfaces.** Top nav, sidebar, and dashboard cards all expose the same admin/reviewer/company links — three sources of truth → cognitive load and inconsistent labels (e.g. "Reviews" vs "Review Dashboard" vs "Assigned Reviews").
2. **No persistent status strip.** A logged-in user can't tell at a glance: approval state, active role, pending tasks count, MFA status. `PendingStatsWidget` only shows on `/dashboard-home`.
3. **Search is hidden after login.** ⌘K palette exists but is unlabeled on mobile; dashboard search only searches products. No global jump-to (people, companies, reviews, settings).
4. **Onboarding for new accounts is thin.** After sign-up the user lands on an empty profile; no "next 3 steps" card for regular users (reviewers/companies have a checklist, regular users don't). Role-request flow is buried in Profile.
5. **Company/Reviewer dashboards split overlapping concepts.** "Submit Revision" lives under `/company/dashboard`, "My Products" under `/company/products`, "Certify Product" under `/company/certification` — three near-identical entry points without contextual cross-links.
6. **Admin dashboard density.** 4 primary + 8 secondary cards + general row → 17 tiles. No counts on most tiles → user clicks to discover work.
7. **Notifications discoverability.** Bell shows count, but there's no inline filter (mentions vs digests vs system) and the unread badge resets behavior is not obvious.
8. **Mobile.** Sidebar is hidden behind `SidebarTrigger`; on small viewports the role-switcher dropdown and search button collapse into icons with no labels.
9. **"Where do I find X?" friction.** Items like "My Submissions", "Notification settings", "Role request" are only in the avatar dropdown, never surfaced in sidebar or dashboard.
10. **Status flags missing on cards.** Dashboard action cards show counts inconsistently (PRs yes, pending reviews no, expiring certifications no).

## Proposed changes (frontend only, minimal-intervention)

### A. Unified status bar (new, small)
- Add `AuthenticatedStatusBar` above the workspace sub-header (in `AuthenticatedLayout.tsx`).
- Shows: avatar + name, active role chip with switcher, approval state pill (Approved / Pending), MFA pill (Enabled / Add MFA), and 2-3 contextual count chips (e.g. "3 reviews due", "1 certification expiring", "2 edits pending").
- Chips are links to the relevant page → 1-click access to work that needs attention.

### B. Consolidate counts on dashboard cards
- Extend `useReviewData`, `useCompanyData`, registrations query so each `PrimaryActionCard` can display a badge (matches the existing `badge` prop on `QuickAction`).
- Admin: registrations pending, edits pending, certifications expiring, PRs (already there).
- Reviewer: assigned, due-this-week, overdue.
- Company: products without certification, drafts in review, expiring certificates.

### C. Sidebar polish
- Group items by frequency, not by role section count. Within each role group, show a "Pinned" subgroup (top 3 actions) and an "All …" collapsed group.
- Add badges on sidebar items mirroring (B). Surface "My Submissions" and "Notification settings" in Personal group.
- On mobile, auto-collapse sidebar but expose a fixed "Tasks" FAB linking to `/dashboard-home#tasks`.

### D. Global command palette upgrades
- Make ⌘K button visible on mobile (icon already there; add label inside sheet header).
- Add result groups: Pages, People (admins/reviewers/companies), Products, Settings, Quick actions ("Switch role to…", "Request reviewer role", "Open notification settings").
- Keep existing keyboard shortcut; add an inline hint on `/dashboard-home` search bar ("Press ⌘K to search everything").

### E. First-run / regular-user onboarding card
- Reuse `CompanyOnboardingChecklist` pattern; create `RegularUserChecklist` shown on `/dashboard-home` until dismissed:
  1. Complete profile (name, affiliation)
  2. Enable MFA
  3. Subscribe to newsletter (if not opted in)
  4. (Optional) Request reviewer/company role
- Persist dismissal in `profile.preferences` (already JSONB).

### F. Reduce duplication between top nav and sidebar
- For authenticated users with a sidebar visible (lg+), collapse the role-specific nav links in `Header.tsx` into a single "Workspace" link → keeps public links (Products, News, Resources, About) front-and-center, removes the three-way duplication.
- Avatar dropdown stays the same (account-scoped items only).

### G. Notifications
- On `NotificationBell` popover, add tabs (All / Mentions / System) and "Mark all read" already present; surface "Open settings" link in popover footer.
- Add a "snooze" affordance on long-running alerts (frontend only — persist via existing preferences).

### H. Page-level "Where to next" footer
- Small contextual block at the bottom of each authenticated page suggesting the 2 most relevant next steps based on the current page (e.g. on `/company/certification` → "Submit a revision" + "View my products"). Pure presentational, derived from a small per-page map.

### I. Accessibility / clarity tweaks
- Active state on sidebar items needs higher contrast (currently relies on shadcn default).
- Add `aria-current="page"` on active NavLinks (some are missing).
- Ensure all icon-only buttons in `Header.tsx` have `aria-label` (search button OK, role switcher OK, font/theme need check).

## What we will NOT do in this pass
- No backend/RLS changes, no schema migrations.
- No copy rewrites of long-form guides.
- No new pages beyond the small checklist component.
- No redesign of public marketing pages.

## Suggested rollout order
1. (B) Counts on dashboard cards + (A) status bar — biggest visible win.
2. (C) Sidebar grouping + badges.
3. (F) De-duplicate top nav for authed users on lg+.
4. (D) Command palette upgrade.
5. (E) Regular-user checklist.
6. (G), (H), (I) polish.

## Technical notes
- All changes live under `src/components/layout/*`, `src/components/dashboard/*`, `src/components/notifications/*`, `src/components/CommandPalette.tsx`, `src/pages/Dashboard_Authenticated.tsx`, `src/components/Header.tsx`.
- New data hooks: `usePendingCounts(role)` aggregating reviewer/company/admin pending work, memoized; reuse existing `PendingStatsWidget` queries.
- No new dependencies.
- Respect Minimal Intervention: no behavior changes to existing flows, only additive UI + nav reordering.

## Open questions before I build
- OK to collapse the role-specific links from the top nav into "Workspace" when the sidebar is present? (item F — most opinionated change)
- Status bar: keep it always visible, or only on `/dashboard-home` and pages with pending work?
- Should the regular-user checklist auto-dismiss after all items are done, or stay collapsible?

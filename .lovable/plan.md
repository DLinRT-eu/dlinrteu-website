# Usability Improvements — Public & Role Dashboards

Goal: reduce clicks, surface what matters first, and make the authenticated areas feel like focused workspaces instead of long scrolling pages. Changes are additive and respect Minimal Intervention — no destructive redesign.

---

## 1. Public site (no login)

**Problems today**
- `Header.tsx` + `MobileNav.tsx` carry a lot of links; new visitors don't know where to start.
- Product discovery requires reading filters; no "I want to..." entry point.
- Transparency, Roadmap, Changelog, Resources are buried.

**Changes**
- **Global command palette (⌘K / Ctrl-K)** using existing shadcn `Command` component. Indexes products, companies, categories, news, resources, transparency. Single shortcut works on every page (also a button in header on mobile).
- **Header refinement**: collapse secondary links ("Initiatives", "Resources", "Changelog", "Transparency", "About") into a single "More" dropdown using existing `DropdownNavItem`. Keep Products / Companies / Compare / Dashboard prominent.
- **Mobile nav**: group links into sections (Explore / Insights / About) with collapsible accordions; add a sticky Search at top of the sheet.
- **Homepage `Index.tsx` quick-actions strip** under the hero: 4 cards — "Browse products", "Compare structures", "Open datasets & challenges", "Read the changelog". One-click to the most-used flows.
- **Sticky filter summary** on `Products.tsx`: when filters are active, show a compact chip bar with "Clear all" so users see and undo their narrowing without scrolling back up.
- **Persistent feedback FAB** (small floating button) on product detail pages linking to the existing feedback form — currently buried.

---

## 2. Authenticated shell (all roles)

**Problems today**
- `Dashboard_Authenticated.tsx` is a 500-line scroll. `RoleQuickActions` shows 8–11 buttons in a flat grid.
- Switching role requires going to Profile.
- No persistent in-app navigation for role tools — every jump goes through the dashboard.

**Changes**
- **Add a collapsible left sidebar (shadcn `Sidebar`, `collapsible="icon"`)** that appears only on authenticated routes (`/admin/*`, `/reviewer/*`, `/company/*`, `/dashboard-home`, `/profile`). Groups items by role using `useRoles()`; highlights active route via `NavLink`. Keeps the public `Header` for brand + global search, adds a `SidebarTrigger` in the header.
- **Role switcher in header** (when user has >1 role): small badge dropdown reusing `RoleSelector` logic, so switching no longer requires Profile.
- **Unified `/dashboard-home`** becomes a "Today" view:
  - Top: 3–4 KPI tiles relevant to the active role (e.g. admin: pending registrations, pending edits, due reviews this week, security alerts).
  - Middle: "Needs your attention" list — actionable items with deep links.
  - Bottom: recent activity feed (already partially exists).
- **Breadcrumbs** on every authenticated page using shadcn `Breadcrumb` (Home › Admin › Review Rounds › Round #12). Drives orientation in deep flows.
- **Keyboard shortcuts**: `g a` → Admin overview, `g r` → Reviews, `g c` → Companies, `?` opens shortcut help dialog. Lightweight, optional.

---

## 3. Admin-specific

- **AdminOverview**: convert the long page into tabs (Overview / Approvals / Content / Security) so 800 lines aren't all loaded visually at once. Each tab keeps current widgets.
- **Bulk inboxes**: a single "Approvals inbox" page that merges Registrations, Edit Approvals, Role requests, Company revisions with tabs + counts in the sidebar. Reduces the "where do I approve X?" confusion.
- **Saved filters** on Review Rounds and Edit Approvals (extends the recently-added archive filter): persist `showArchived`, search, status filter to `localStorage` per-user.
- **Quick-create menu** in header (admin only): "New round", "Invite reviewer", "New changelog entry".

---

## 4. Reviewer-specific

- **Reviewer Dashboard**: replace the long stack with two tabs — "My queue" (assigned + due) and "Browse" (preferences, history, guide).
- **Inline review actions** on the queue: status dropdown + "Open product" without navigating away — uses existing secure RPCs.
- **Due-soon banner** when items are within 7 days, with one-click snooze (already partial in DueReviews — promote it to dashboard top).
- **"Continue where I left off"** card showing the last product opened in review mode.

---

## 5. Company delegate-specific

- **CompanyDashboardOverview**: fold the 900-line page into tabs (Overview / Products / Certification / Tasks). Keeps `CertificationProgressWidget` on Overview.
- **Task-first landing**: when a company user logs in, default tab = whichever has an open task; otherwise Overview.
- **Product card actions** ("Edit", "Submit revision", "Certify") collapsed into a single dropdown per card to reduce visual clutter on small viewports (mobile preview is 411px today).
- **Certification deadline reminder** banner using existing reminder edge function data.

---

## 6. Cross-cutting polish

- **Empty states** with a single primary action button across all admin tables (currently mostly text-only).
- **Loading skeletons** on dashboards (replace spinners) for perceived speed.
- **Toast → undo** for archive/delete/status actions where reversible.
- **Mobile-first review of authenticated pages** at 375–414px: many tables overflow today; wrap in `ScrollArea` and add a card-mode fallback for narrowest breakpoint.

---

## Technical notes

- New files: `src/components/layout/AuthenticatedLayout.tsx`, `src/components/layout/AppSidebar.tsx`, `src/components/CommandPalette.tsx`, `src/hooks/useKeyboardShortcuts.ts`, `src/components/layout/RoleSwitcherButton.tsx`.
- `App.tsx`: wrap authenticated route group in `AuthenticatedLayout` (which mounts `SidebarProvider` + `AppSidebar` + `Header` with `SidebarTrigger`). Public routes unchanged.
- Reuse: `RoleQuickActions` content map → drives the sidebar items (single source of truth).
- No DB or edge-function changes required for this round.
- Respects existing branding (Steel Blue `#5090D0`, Dark Slate text) and Minimal Intervention rule — no removed features, only reorganization + additions.

---

## Suggested rollout order

1. Authenticated layout shell + sidebar + role switcher in header (biggest UX win).
2. Tabs refactor for AdminOverview, ReviewerDashboard, CompanyDashboardOverview.
3. Command palette + keyboard shortcuts.
4. Public homepage quick-actions + mobile nav grouping.
5. Polish pass: breadcrumbs, empty states, skeletons, mobile tables.

Pick any subset to implement first — phase 1 alone delivers most of the perceived improvement.

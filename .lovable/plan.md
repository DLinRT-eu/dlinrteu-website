## Goal
Finish the three open items from the prior UX audit:

1. Slim the desktop (lg+) top nav for signed-in role holders.
2. Make `AuthenticatedStatusBar` visible on every page when the user is signed in.
3. Show a regular-user onboarding checklist on `/dashboard-home` for signed-in users with no role.

Mobile nav (`MobileNav.tsx`) is out of scope for #1.

---

## 1. Top nav cleanup (lg+) — `src/components/Header.tsx`

For signed-in users **with at least one role** (admin / reviewer / company), the blue top nav on `lg+` will show only:

```
Products · News · Resources & Compliance · Research & Initiatives · About · Support  |  Workspace
```

- Delete the three role-specific link blocks (`isAdmin && (...)`, `isReviewer && !isAdmin && (...)`, `isCompany && !isAdmin && !isReviewer && (...)`).
- Delete the `<DropdownNavItem label="More" ... />` block — its items become first-class links.
- Add a single **`Workspace`** link (icon: `LayoutDashboard`) that routes to `getRoleDashboardRoute(activeRole)` (falls back to `/dashboard-home`). It's the only role-aware element left in the top nav; everything else lives in the sidebar.
- Regular users (no role) keep today's link set unchanged.
- Mobile (`MobileNav`) is untouched.

## 2. Always-visible status bar

- Move the `<AuthenticatedStatusBar />` render out of `AuthenticatedLayout.tsx`.
- Mount it once in `src/App.tsx` immediately below `<Header />`, wrapped in a small `SignedInOnly` guard that reads `useAuth()` and returns `null` when `!user`. This guarantees it appears on every route — public marketing pages included — when signed in, and disappears on sign-out.
- Remove the duplicate render inside `AuthenticatedLayout` so it doesn't double up inside the workspace shell.
- Keep the existing component API (`AuthenticatedStatusBar` already handles "no role" gracefully via `usePendingCounts` — verify in a follow-up read; if it requires roles, add an early `return null` when `roles.length === 0 && !pendingApproval` so it stays quiet for brand-new users).
- Make the bar `sticky top-14 z-30` so it sits under the header on every page; the workspace shell's existing `sticky top-14` SidebarTrigger strip moves to `top-[calc(3.5rem+var(--status-bar-h))]` only if visual overlap appears — otherwise leave both `sticky` and stacked naturally.

## 3. Regular-user onboarding checklist

New component `src/components/onboarding/RegularUserOnboardingChecklist.tsx`:

- Rendered only inside `src/pages/Dashboard_Authenticated.tsx`, at the top, when **`user && roles.length === 0`**.
- Dismissible: persistence via `localStorage` key `dlinrt.onboarding.regular.dismissed.v1`; also auto-hides once every item is done.
- Steps (each a row with check icon + CTA button):
  1. **Complete your profile** — link to `/profile`. Done when `profile.first_name && profile.last_name`.
  2. **Request a role** (Reviewer or Company representative) — link to `/role-selection` (or `/profile` if that route doesn't exist; verified during build).
  3. **Set notification preferences** — link to `/notification-settings`. Done when the user has visited / saved once (track via a `profile.notification_preferences != null` check; otherwise just mark visited via localStorage).
  4. **Opt in to the newsletter** (GDPR-compliant explicit consent) — link to `/profile` newsletter section, or a one-click subscribe button that calls the existing `subscribe-newsletter` edge function with the user's email.
  5. **Explore the catalogue** — link to `/products`.
- Visual: shadcn `Card` + checklist rows with `CheckCircle2` (done) / `Circle` (todo) icons, brand accent `#5090D0` for the active step, "Dismiss" ghost button in the header.
- No backend schema changes. All "done" detection is read-only against existing `profile` fields + localStorage.

---

## Files touched

- `src/components/Header.tsx` — slim lg+ nav, add `Workspace` link.
- `src/App.tsx` — mount `AuthenticatedStatusBar` globally under `<Header />`.
- `src/components/layout/AuthenticatedLayout.tsx` — remove duplicate status bar render.
- `src/components/layout/AuthenticatedStatusBar.tsx` — add `return null` when there is nothing useful to show for a brand-new user (no role, no approval pending, no tasks).
- `src/components/onboarding/RegularUserOnboardingChecklist.tsx` — new.
- `src/pages/Dashboard_Authenticated.tsx` — render the checklist for `roles.length === 0`.

## Verification

- Build/typecheck passes.
- Visit `/` signed-out → no status bar, no checklist, full top nav.
- Sign in as a regular user (no role) → status bar visible on `/`, `/products`, `/dashboard-home`; checklist visible on `/dashboard-home` only; top nav unchanged for regular users.
- Sign in as admin/reviewer/company → status bar visible everywhere; top nav on lg+ shows only public links + `Workspace`; sidebar still carries role-specific items inside the workspace shell.
- Dismiss checklist → it stays dismissed across reloads.

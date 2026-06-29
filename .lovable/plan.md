## Problem

The shadcn `Sidebar` renders as `fixed inset-y-0` (full viewport height), so on workspace routes (`/dashboard-home`, `/admin/*`, `/reviewer/*`, `/company/*`, etc.) it overlaps the globally-mounted `AuthenticatedStatusBar`, which sits full-width directly below the header. The bar's left portion is hidden behind the sidebar panel, and its sticky stacking competes with the `SidebarTrigger` strip (also `sticky top-14`).

## Fix

Stop rendering the status bar full-width across the sidebar. Render it inside the right column of `AuthenticatedLayout` for workspace routes, and keep the global mount for non-workspace routes only.

### 1. `src/App.tsx` — make the global mount conditional

Replace the unconditional `<AuthenticatedStatusBar />` in `ConditionalHeader` with a guard that skips workspace paths (the same `isAuthenticatedPath` rule already used by `AuthenticatedLayout`):

- Extract or duplicate the `AUTH_PREFIXES` check into a small helper (e.g. `isWorkspacePath(pathname)`).
- In `ConditionalHeader`, render `<AuthenticatedStatusBar />` only when `!isWorkspacePath(pathname)`. Public pages (e.g. `/`, `/products`, `/about`) keep the bar below the header exactly as today.

### 2. `src/components/layout/AuthenticatedLayout.tsx` — render the bar inside the right column

In the workspace shell, mount the status bar inside the right column, immediately under the `SidebarTrigger` strip, so it sits in the flex column to the right of the fixed sidebar and never gets covered:

```tsx
<div className="flex-1 flex flex-col min-w-0">
  <div className="flex items-center border-b ... sticky top-14 z-30 min-h-10">
    <SidebarTrigger />
    <span className="ml-2 text-xs text-muted-foreground">Workspace</span>
  </div>
  <AuthenticatedStatusBar />   {/* new */}
  <div className="flex-1 min-w-0">{children}</div>
</div>
```

Re-import `AuthenticatedStatusBar` (the existing comment-only line becomes a real import).

### 3. `src/components/layout/AuthenticatedStatusBar.tsx` — no API change

The component already early-returns when there's no signal, so it stays quiet on workspace routes for brand-new users. No edits required beyond confirming it renders correctly inside a narrower flex column (it already uses `flex-wrap`).

## Out of scope

- Mobile nav, header layout, sidebar internals.
- The status bar's content, chips, or signal logic.
- Public-page rendering of the bar (unchanged).

## Verification

- Sign in as admin on `/admin/registrations`: status bar appears inside the workspace column, fully visible to the right of the sidebar; no overlap when sidebar is expanded or collapsed.
- Same user on `/products` (public route): status bar still appears full-width below the header.
- Signed-out on any route: no status bar.
- Toggle the sidebar collapse/expand: status bar reflows with the column, SidebarTrigger strip and status bar stack cleanly (both already `border-b`).

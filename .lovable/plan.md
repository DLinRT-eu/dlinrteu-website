# Phases 2–4 Rollout

Findings from exploration changed the scope slightly — applying the Minimal Intervention rule:

- **Reviewer Dashboard** already uses Tabs (All / Pending / In Progress / Completed) — no refactor needed.
- **Company Dashboard Overview** already uses Tabs (Overview / Products / Recent Updates / Team) — no refactor needed.
- **Homepage** already has `QuickAccessSection` and `Products` already has `ActiveFilterChips` — no rebuild needed.
- **AdminOverview** (817 lines) is sectioned but flat; restructuring into tabs is risky and largely cosmetic. Skipping to honor Minimal Intervention.

So the meaningful remaining work is **Phase 3 (Command Palette + ⌘K)**, which delivers cross-cutting value for both public and authenticated users.

---

## Phase 3 — Global Command Palette (⌘K / Ctrl-K)

**New file**: `src/components/CommandPalette.tsx`
- `CommandDialog` (shadcn) with `CommandInput`, grouped results.
- Static groups: Navigate (Products, Companies, Compare, Initiatives, News, Changelog, Resources, Transparency, Analytics, About, Support).
- Conditional groups based on `useAuth` + `useRoles`:
  - My account (when signed in): Dashboard, Profile, Notifications, My products.
  - Admin (when `hasAdminRole`): Overview, Registrations, Review rounds, Edit approvals, Certifications, Security.
  - Reviewer (when `hasReviewerRole`): Assigned reviews, Due reviews, Preferences.
  - Company (when `hasCompanyRole`): Overview, Products, Certify.
- Live results when query non-empty:
  - Top 8 products from `dataService.getAllProducts()` matched by name/company/category → `/product/:id`.
  - Top 6 companies → `/companies?selected=…`.
- Exports `useCommandPalette()` hook that owns `open` state and binds ⌘K / Ctrl-K globally.

**Wiring in `src/components/Header.tsx`**:
- Call `useCommandPalette()`, render `<CommandPalette open={open} onOpenChange={setOpen} />`.
- Add a small "Search ⌘K" button visible on `md+` next to the role switcher chip; on mobile, append a Search item to the existing `MobileNav` sheet that opens the palette.

No changes to routes, data, or other pages. Pure additive.

---

## Phase 2 / Phase 4 — Skipped with rationale

| Item | Reason |
|------|--------|
| AdminOverview tabs refactor | Would touch ~800 lines of stable code for cosmetic gain; violates Minimal Intervention. |
| Reviewer/Company tabs refactor | Already implemented. |
| Homepage quick-actions | `QuickAccessSection` already provides this. |
| Sticky filter chips on Products | `ActiveFilterChips` already present. |

If you still want the AdminOverview tab grouping, say so explicitly and I'll do it as an isolated follow-up.

---

## Files touched

- create `src/components/CommandPalette.tsx`
- edit `src/components/Header.tsx` (add palette mount + trigger button)
- edit `src/components/MobileNav.tsx` (add "Search" item that opens palette)

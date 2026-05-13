## Goal
1. Bring the same 2D ↔ 3D toggle to the **Dashboard** Evidence chart so the dashboard's filtered product set can be visualised in the three-axis E/I/Z view.
2. Fix the **Resources page** 3D view, which currently renders far too small after toggling.

## Investigation
- Dashboard uses `src/components/dashboard/EvidenceImpactScatterChart.tsx` (a custom dotted grid) — *not* the resources `EvidenceImpactMatrix`. So the toggle has to be added there too.
- The dashboard already passes `filteredProducts` down. The 3D component (`EvidenceImpactMatrix3D`) currently reads products via `dataService.getAllProducts()`, ignoring filters.
- The Resources 3D SVG is constrained by `style={{ minHeight: 420, maxHeight: 560 }}` and a small `TILE` constant (44), which leaves the figure visually cramped relative to the card width on desktop.

## Changes

### 1. `src/components/resources/EvidenceImpactMatrix3D.tsx`
- Add an optional prop `products?: ProductDetails[]`. When provided, aggregate from it; otherwise fall back to `dataService.getAllProducts()` (preserves existing Resources behaviour).
- Increase visual scale:
  - `TILE` 44 → 70.
  - `UNIT_HEIGHT` 14 → 22 (taller bars, easier to read counts).
  - Container `style={{ minHeight: 520, maxHeight: 760 }}`.
  - Wrap the SVG in a `max-w-[920px] mx-auto` block so it expands to the available card width on the Resources page instead of getting squashed.
- Slightly larger axis labels (12 → 13) for legibility at the new scale.

### 2. `src/components/dashboard/EvidenceImpactScatterChart.tsx`
- Add `view` state (`"2d" | "3d"`, default `"2d"`).
- Add a small `ToggleGroup` (2D / 3D) in the `CardHeader` next to the existing export button.
- When `view === "3d"`, render `<EvidenceImpactMatrix3D products={filteredProducts} />` instead of the dotted grid. Keep the title and legend; replace the export button placement only if needed (export stays available for 2D).
- 2D path is left untouched.

### 3. No other files
- Resources page already uses the matrix wrapper and only needs the size fix above.
- No data-model, routing, or attribution changes.

## Out of scope
- No new dependencies.
- No changes to the 2D dashboard view.
- No re-architecting the dashboard chart.

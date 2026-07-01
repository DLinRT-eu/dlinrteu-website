## Goal

Re-adopt **Recharts v3** (currently pinned to `^2.15.0`) and migrate all 11 chart-consuming files to the v3 API so we get the latest maintenance/perf while keeping every dashboard, timeline, revision, and transparency chart rendering correctly.

## Why the previous v3 bump broke rendering

The prior automated upgrade only bumped the version — no source changes. In v3 several behaviors change and silently produce empty glyphs:

1. `Bar`/`Pie` no longer auto-infer a numeric `dataKey` when children (`<Cell>`) are present in some configs; the fill inheritance path also changed.
2. `PieLabelRenderProps` type was removed/renamed; `percent` and `name` are typed differently, and the default `label` renderer no longer receives the same shape. Custom label callbacks silently render nothing when props mismatch.
3. `ResponsiveContainer` now requires an explicit `width`/`height` (or a sized parent) — a bare `<ResponsiveContainer>` inside a flex container with `aspect-video` (shadcn `ChartContainer`) collapses to 0×0 and hides all glyphs.
4. Tooltip content components: `payload[].payload` shape is preserved but `formatter` signature changed (adds an index arg); typed callers break.
5. shadcn `chart.tsx` wrapper (v0.x) targets internal Recharts class names (`.recharts-cartesian-axis-tick_text`, `.recharts-sector[stroke='#fff']`, etc.). In v3 several of these classes/attributes are renamed, so themed strokes/fills leak through as invisible.
6. React 18 `Fragment` warning we saw in console ("Invalid prop supplied to React.Fragment") comes from v3's internal `<Cell>` fragment wrapping colliding with the Lovable tagger's `data-lov-id` injection — needs an explicit key/no-tagger wrapper.

## Files to modify

**Config**
- `package.json` — bump `recharts` back to `^3.x` (latest 3.x); reinstall.

**Shadcn wrapper (foundation — fix once, benefits all charts)**
- `src/components/ui/chart.tsx`
  - Update the className selectors that changed in v3 (tick text, sector, dot, tooltip cursor).
  - Give `ResponsiveContainer` an explicit `width="100%" height="100%"` and ensure the wrapper `div` has `h-full` (drop `aspect-video` default that collapses inside flex parents).
  - Update `ChartTooltipContent`/`ChartLegendContent` to the v3 `payload` typing (`Payload<ValueType, NameType>` from `recharts/types/component/DefaultTooltipContent`).

**Chart components — v3 API adjustments**
- `src/components/dashboard/TaskDistributionChart.tsx`
- `src/components/dashboard/ModalityDistributionChart.tsx`
- `src/components/dashboard/CompanyDistributionChart.tsx`
- `src/components/dashboard/StructuresChart.tsx`
- `src/components/dashboard/StructureTypeDistributionChart.tsx`
- `src/components/dashboard/LocationDistributionChart.tsx`
- `src/components/dashboard/CertificationDistributionChart.tsx`
- `src/components/revision/chart/RevisionBarChart.tsx`
- `src/components/timeline/TimelineChart.tsx`
- `src/pages/Transparency.tsx`

Per-file edits (kept minimal, no visual/UX changes):

1. Replace the removed `PieLabelRenderProps` import with a local type:
   ```ts
   type PieLabel = { name?: string | number; percent?: number };
   ```
   Used in `LocationDistributionChart` and `CertificationDistributionChart` `renderCustomizedLabel`.
2. Add explicit `isAnimationActive={false}` to `<Pie>` in v3 to avoid the fragment/tagger warning that caused zero-width sectors during first paint.
3. Add explicit `type="monotone"` (already present) and ensure `<Line>`/`<Area>` have `isAnimationActive` set consistently in `TimelineChart` and `Transparency`.
4. Where `<Bar>` has `<Cell>` children (`TaskDistributionChart`, `ModalityDistributionChart`, `RevisionBarChart`), keep the explicit `fill` on each `Cell` (already in place) and add `fill="currentColor"` on the parent `Bar` so v3's new "children required color" check passes.
5. Update `Tooltip formatter` signatures in `Transparency.tsx` and `StructureTypeDistributionChart.tsx` to `(value, name, item, index) => ...`.
6. Ensure every `ResponsiveContainer` used directly (not via shadcn wrapper) has both `width="100%"` and `height="100%"` — currently `LocationDistributionChart` and `CertificationDistributionChart` omit them.

## Verification

After edits:
1. `bun add recharts@^3` and reload.
2. Drive Playwright against `/dashboard` and `/timeline`, screenshot each chart, confirm bars/pies/lines render with correct colors and the legend/tooltip still work.
3. Check `/transparency`, `/dashboard-home`, revision chart on any product page, and `CompareStructures` (StructureType chart).
4. Watch the browser console for the Fragment warning and any Recharts deprecation errors — must be clean.

## Rollback

If v3 introduces a regression we cannot resolve in one pass (e.g. tooltip content typing across the shadcn wrapper), revert `package.json` to `^2.15.0` and restore the wrapper — no data or business logic changes are involved.

## Out of scope

- No design or UX changes to any chart.
- No new charts or data-source changes.
- No changes to `chartColors.ts` / `chartDataValidation.ts` (already v3-safe).

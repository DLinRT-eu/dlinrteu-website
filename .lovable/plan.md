## Findings

**1. "Failed to fetch dynamically imported module: Dashboard.tsx"** — Vite HMR transient triggered by the previous edits. The dev server now returns Dashboard.tsx with HTTP 200, and `npx tsc --noEmit` is clean. A hard browser reload (Cmd/Ctrl-Shift-R) clears the cached chunk. No code change required.

**2. "Make sure all structures are considered in the auto-contouring plots"** — Already wired correctly. The dashboard pipes products through `matchesTask(p, "Auto-Contouring")` (`src/utils/commonFilters.ts:6-11`), which matches when the task appears in either `category` **or** `secondaryCategories`. Effects:

- AdaptBox (primary "Image Synthesis", secondary "Auto-Contouring") → its 9 Pelvis-male CBCT structures are now included in both `transformStructureData` and `transformStructureTypeData`.
- MR-Box (primary "Image Synthesis", secondary "Auto-Contouring") → its 40 MR structures (Brain T1 + Pelvis Male T2 Elekta + Pelvis/Abdomen TrueFISP) are now included.
- Annotate's 7 CT models continue to contribute as before.

Note: the top-structures chart still applies `.slice(0, 12)` (`chartDataTransformation.ts:155`) for slide-readability — that's an intentional display cap, not a filter on which products are counted.

## Plan

Just one tiny verification touch — no code changes needed:

1. Drive Playwright headless to `/dashboard` → switch the task filter to "Auto-Contouring", screenshot the structure-by-product and top-structures charts; confirm `MR-Box`, `AdaptBox`, and `Annotate` rows are all present in the per-product chart.
2. Report back the screenshot evidence. If MR-Box/AdaptBox are NOT visible in the per-product chart, only then investigate further (would point to a separate `useFilters` issue, not to `matchesTask`).

## Out of scope

- No edits to dashboard, chart, or filter code.
- No changes to the `.slice(0, 12)` cap unless the user asks to lift it.

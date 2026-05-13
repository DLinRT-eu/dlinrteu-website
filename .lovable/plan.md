## Goal

Extend the existing Evidence-Impact Matrix with a 2D ↔ 3D toggle. The 3D view adds the **Z axis = Implementation & Assurance Burden (Z0–Z5)** that already exists in `src/data/evidence-impact-levels.ts` (`IMPLEMENTATION_BURDEN_LEVELS`). 2D remains the default.

Also remove the "Lula & Kamath (2026)" attribution everywhere it appears and reframe the third axis as an internal DLinRT proposal.

---

## Visualization choice (investigation result)

Three options were considered:

| Option | Pros | Cons |
|---|---|---|
| **SVG isometric 3D bars** (chosen) | Zero new deps, sharp on any DPI, easy tooltip integration, matches the existing minimal aesthetic, predictable layout | Limited to one fixed camera angle |
| react-three-fiber WebGL | Full rotation, lighting | Adds three + r3f bundle (~500KB), overkill for a 6×4×6 grid |
| Plotly Surface/Bar3D | Scientific feel, built-in axes | ~1MB dep, theming clashes with shadcn/Tailwind tokens |

**Decision: SVG isometric grid of 3D bars.** Each (E, I) cell becomes a column of up to 6 stacked translucent cubes — one per Z level — colored by burden tier (green→rose). Bar height = product count at that (E, I, Z) bucket; empty Z slots are omitted. A small camera-angle slider can rotate the projection (cosmetic only, recomputed mathematically — no canvas).

This keeps the look consistent with the rest of the site, is fully responsive, and keeps tooltips/hover working through normal SVG events.

---

## Changes

### 1. `src/components/resources/EvidenceImpactMatrix.tsx`
- Add a `view` state: `"2d" | "3d"`, default `"2d"`.
- Add a small `Tabs` (or `ToggleGroup`) header control: **2D | 3D**.
- Keep current 2D grid exactly as it is when `view === "2d"`.
- When `view === "3d"`, render a new sub-component `<EvidenceImpactMatrix3D />`.

### 2. New file `src/components/resources/EvidenceImpactMatrix3D.tsx`
- Pure SVG isometric projection (`viewBox` based, responsive).
- Axes: X = Impact (I0…I5), Y = Rigor (E0…E3), Z = Burden (Z0…Z5).
- For each (E, I) cell, draw a stack of cubes — one face per Z level present, colored using burden palette from `IMPLEMENTATION_BURDEN_LEVELS`.
- Aggregate product counts from `getAllProducts()` (DataService) by `(evidenceRigor, clinicalImpact, implementationBurden)` to size bars; cells with 0 products render as a flat translucent floor tile.
- Tooltips on each cube via `TooltipProvider` showing E/I/Z labels, count, and readiness consequence.
- Legend: burden color ramp Z0→Z5 + "bar height = product count".

### 3. `src/pages/ResourcesCompliance.tsx` (and/or `EvidenceImpactGuide.tsx`)
- Add a paragraph in the Evidence-Impact section noting that the framework is a **three-axis E/I/Z model** (Rigor × Impact × Implementation Burden), with a one-line description of Z and a pointer to the new 3D view.
- Remove all references to "Lula & Kamath (2026)" and "Bellini et al. (2023)" attributions; rephrase as "an internally proposed DLinRT extension".

### 4. Attribution cleanup (search + replace)
Files touched:
- `src/pages/EvidenceImpactGuide.tsx` (lines 187, 228–229)
- `src/data/evidence-impact-levels.ts` (lines 168–170, comment only)
- `src/types/productDetails.d.ts` (line 93, comment only)
- `src/utils/htaExport/htaExporter.ts` (line 240)
- `docs/FIELD_REFERENCE.md` (line 386)

Wording becomes e.g. *"Third axis of the DLinRT-proposed E/I/Z evidence-assurance model."*

---

## Out of scope
- No changes to product data fields or RLS.
- No new dependencies.
- 2D matrix behavior, layout, and styling stay identical (default view).

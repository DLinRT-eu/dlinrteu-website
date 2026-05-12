## Goal

Two changes:

1. Simplify the dashboard Evidence/Impact scatter: remove the colored Z ring and the Z-color legend. Keep Z information only inside the hover tooltip.
2. Backfill the three evidence axes (E rigor, I impact, Z burden) across every active product where information is publicly findable.

---

## Part 1 — Dashboard scatter chart simplification

File: `src/components/dashboard/EvidenceImpactScatterChart.tsx`

- Remove the `Z_RING_COLOR` map and the per-dot `boxShadow` ring tied to `prod.burden`. Restore a single neutral subtle ring (`0 0 0 1px rgba(0,0,0,0.1)`) for every dot.
- Remove the entire "Ring = Z burden" legend block (lines ~220–228).
- Update the bottom caption to: "Each dot is a product, fill = task. Hover for evidence, impact and implementation burden."
- Keep the burden inside the tooltip: show `Burden: Zx – <label>` and, if present, the burden notes (1–2 line clamp). Pull the human label from `IMPLEMENTATION_BURDEN_LEVELS` in `src/data/evidence-impact-levels.ts` instead of the placeholder "Implementation burden" string, and also surface `implementationBurdenNotes` if available.
- No other dashboard files change. Task color legend stays.

No data-model changes. Exports, product editor, Evidence/Impact Guide page and the Z badge on the product detail page are untouched.

---

## Part 2 — Backfill E / I / Z for all active products

### Scope

- Active product files only: everything under `src/data/products/` except `archived/`, `examples/`, `pipeline/` and `*-structures.ts` / `index.ts` files.
- Roughly 86 product files containing ~150 product entries. Many already have `evidenceRigor` and `clinicalImpact`; very few have `implementationBurden`.

### Method (per product)

For each product entry, fill the following fields when missing or clearly outdated:

- `evidenceRigor` (E0–E3) + `evidenceRigorNotes` (with PubMed/DOI references and a "PubMed verified YYYY-MM-DD" stamp)
- `clinicalImpact` (I0–I5) + `clinicalImpactNotes`
- Study quality sub-attributes when supported by the cited evidence: `vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`
- `implementationBurden` (Z0–Z5) + `implementationBurdenNotes` and the `burdenFactors` sub-flags (commissioning, validation, integration, humanFactors, economicCase, subgroupGaps, monitoring, safetySignals)

Rubric: as documented in `docs/review/GUIDE.md` and `src/data/evidence-impact-levels.ts`. Default to the conservative level when sources are thin.

### Sources

- PubMed / Europe PMC / Google Scholar for peer-reviewed evidence
- FDA 510(k), CE / MDR notes already present in the product files
- Vendor whitepapers and product manuals only as supporting context, never as the sole basis for E≥2

### Process

Because this is a large, evidence-sensitive content task, it will run in batches by category to keep diffs reviewable:

1. Auto-Contouring (largest set)
2. Treatment Planning
3. Performance Monitor + Tracking
4. Reconstruction + Image Enhancement + Image Synthesis
5. Registration + Platform + Clinical Prediction

For each batch:
- Read every product file in the category
- Run a literature lookup per product (vendor + product name + radiotherapy)
- Update the TS object with the new/updated fields, adding/refreshing the citation sentence in the notes
- No structural refactor of the product objects; only the evidence fields are touched

### Out of scope

- Archived products (kept as-is)
- Pipeline products (pre-market — Z/E/I would mostly be N/A)
- Structure-only files (`*-structures.ts`)
- Any UI changes beyond Part 1

---

## Deliverables

- One commit/edit set for Part 1 (single file change).
- Five batched edit sets for Part 2, one per category group, each with a short summary listing which products were updated and the headline source for each non-trivial bump (E≥2 or Z≤1).

## Risks / notes

- Backfilling Z is judgement-heavy: the proposal defines Z by commissioning effort, integration, monitoring needs, etc. Where evidence is thin, default to Z2 (moderate) and flag in notes — consistent with the seed strategy already in the codebase.
- Z0 ("adoption-grade") will be reserved for products with mature multi-center deployment evidence and routine clinical use documented in literature.
- Citations will use existing style: author + journal + year + DOI/PMID when available, ending with "PubMed verified YYYY-MM-DD".

# Per-publication scoring: render verification + Batch C

## 1. Render verification on real URLs

The product route is `/product/:id`, where `:id` is the product's `id` field (confirmed in `src/App.tsx:203`). The earlier check used guessed slugs, so it hit the not-found state rather than a real product page.

Verify with Playwright against IDs read directly from the product data files, covering one full-coverage product per imaging category:

- `claripi-clarict-ai` (image-enhancement)
- `subtle-medical-subtlepet` (image-enhancement)
- `ge-truefidelity` (reconstruction)
- one image-synthesis product with scored papers

For each: assert the page is not the not-found state, assert the "Per-publication scoring" block is present, and capture one screenshot as evidence. Exact IDs are re-read from the data files before running, never guessed.

## 2. Batch C coverage sweep

Categories: treatment-planning, registration, performance-monitor, platform, tracking, pipeline.

Current audit state (from `scripts/evidence-coverage.ts`): 91 products — 39 none, 2 partial, 50 full. Batch C entries needing work:

Partials (both carry unscored publications already in the record):
- `plan-ai` (treatment-planning) — 5 publications, 1 scored
- `synaptiq-mediq-rt` (auto-contouring, carried over from Batch A) — 6 publications, 2 scored

None, with only non-publication evidence (regulatory/vendor/press) recorded:
- treatment-planning: `manteia-mozi`, `mvision-dose-plus`, `therapanacea-smartplan`
- registration: `pymedix-registration`
- performance-monitor: `raysearch-rayintelligence`, `mvision-verify`, `ptw-aqualis`
- platform: `lumonus-ai`, `ge-healthcare-irt`, `mvision-ai-workspace-plus`, `manteia-acculearning`
- pipeline: `ge-irt-theranostics-pipeline`, `medlever-assistant-pipeline`, `medlever-copilot-pipeline`, `neuralrad-brain-pipeline`, `synaptiq-mediq-rt-4dct-pipeline`, `united-uct610-sim-dl-recon-pipeline`

## 3. Method per product

1. Score existing publications first: move each peer-reviewed item in `evidence[]` into `keyPapers[]` with `evidenceRigor`, `clinicalImpact`, one-line `rationale`, and the study-quality flags (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`).
2. For products with no publications, run a targeted literature search using trade-name aliases (product name, vendor name, module name). Only add papers that are Crossref/DOI-verifiable and that name the product or its engine in the abstract or methods. No inferred or generic-technology attributions.
3. Where a paper does not concern the marketed product, record it as no-publication rather than stretching the match — pipeline and platform products are expected to legitimately end at zero.
4. Synchronise product-level `evidenceRigor` / `clinicalImpact` to the max across scored papers; use `evidenceScoreOverride` with a written reason where the max is misleading (off-label, wrong version).
5. Bump `lastUpdated` / `lastRevised` on every edited product.

## 4. Validation

- `npx tsx scripts/evidence-coverage.ts` — confirm Batch C partials clear and the remaining "none" list contains only products confirmed to have no product-naming literature.
- `npm run validate:evidence` — must report zero stored-vs-computed mismatches.
- `tsgo` typecheck.
- Playwright render check on two newly-scored Batch C products using their real IDs.

## Technical notes

- No schema change is required; `keyPapers[]`, per-paper scoring fields, and `evidenceScoreOverride` already exist in `src/types/productDetails.d.ts`.
- `scripts/evidence-coverage.ts` already excludes regulatory clearances, vendor material, press items, reviews, and preprints from coverage denominators, so "none with evidence>0" rows are not automatically defects.
- No database or edge-function changes.

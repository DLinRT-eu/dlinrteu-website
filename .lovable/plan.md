## Goal
Verify SyMRI's underlying technology and, if non-AI, exclude it from the live catalogue per the AI/DL inclusion gate.

## Verification (already completed)
- SyMRI is a post-processing pipeline that fits T1/T2/PD relaxometry maps from a multi-dynamic multi-echo (MDME) acquisition and synthesizes contrasts from those maps — model-based parameter fitting, not deep learning.
- FDA 510(k) summaries (K162943, K191036, K233733, K242745) and the SyMRI 11 User Manual describe it as quantitative post-processing; none reference AI/ML.
- Liu et al. 2022 (Phys. Med. Biol., DOI 10.1088/1361-6560/ac46dd) proposes *adding* a DL network on top of synthetic MRI, implicitly confirming the native SyMRI engine is non-DL.
- The product description currently calls it "Deep learning-powered" — this is incorrect and unsupported by the vendor IFU or 510(k).

Conclusion: SyMRI Neuro fails the catalogue inclusion gate (AI/DL technology threshold). Archive it.

## Changes

1. **Move** `src/data/products/image-synthesis/syntheticmr.ts` → `src/data/products/archived/syntheticmr-symri.ts`
   - Rename exports: `SyMRINeuro` and `SYNTHETICMR_PRODUCTS` → `SYNTHETICMR_SYMRI_ARCHIVED`.
   - Strip the inaccurate "Deep learning-powered" wording from `description`/`keyFeatures` and replace with a neutral note that the engine is MDME-based quantitative relaxometry, archived as non-AI.

2. **Update** `src/data/products/image-synthesis/index.ts` — remove the `syntheticmr` import and its spread from the exported array.

3. **Update** `src/data/products/archived/index.ts` — import `SYNTHETICMR_SYMRI_ARCHIVED` and add to `ARCHIVED_PRODUCTS`.

4. **Update** `src/data/products/archived/README.md`:
   - Add a row: `SyMRI Neuro | SyntheticMR | MDME quantitative relaxometry / model-based fitting; no AI/ML in vendor IFU or FDA 510(k) (K162943, K191036, K233733, K242745)`.
   - Bump "Last updated" date.

5. **Check** `src/data/companies/specialized-solutions.ts` for any SyntheticMR product-count references that need adjusting (read-only confirmation; only edit if a hardcoded list exists).

## Out of scope
- No UI, schema, or type changes (Minimal Intervention).
- No edits to other image-synthesis products.
- No regeneration of the newsletter deck in this turn.

## Deliverable
SyMRI Neuro no longer appears in the live catalogue; entry preserved under `archived/` with documented reason and verification sources.

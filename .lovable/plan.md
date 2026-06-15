## Goal

Merge Federico's open PR #111 (Philips SmartSpeed AI) into the catalogue under the **Reconstruction** category instead of Image Enhancement, and clean up duplicate product entries — most importantly the double TumorBox listing.

## 1. Merge PR #111 and recategorize SmartSpeed AI to Reconstruction

PR #111 adds one new product (Philips SmartSpeed AI) at `src/data/products/image-enhancement/philips.ts`. SmartSpeed AI is an MR k-space reconstruction product, so it belongs in `reconstruction/`, not `image-enhancement/`.

- Take the full SmartSpeed product object from the PR.
- Change its `category` from `"Image Enhancement"` to `"Reconstruction"`.
- Update its `githubUrl` to point at `src/data/products/reconstruction/philips.ts`.
- Append it to the existing `PHILIPS_PRODUCTS` array in `src/data/products/reconstruction/philips.ts` (which currently contains only "Precise Image"). No new index wiring needed — `reconstruction/index.ts` already imports `PHILIPS_PRODUCTS`.
- Do **not** create `src/data/products/image-enhancement/philips.ts`. The image-enhancement index is not touched.
- After applying the change, close PR #111 with a note that it was merged manually under Reconstruction.

## 2. Fix the active TumorBox duplicate

The TumorBox entry exists in two imported files with the same `id` (`therapanacea-tumorbox-pipeline`):
- `src/data/products/auto-contouring/therapanacea.ts` — current canonical version (FDA K253091, lastRevised 2026-06-13, `developmentStage: "pipeline"`).
- `src/data/products/pipeline/therapanacea.ts` — older stub TumorBox entry.

Action: remove the TumorBox object from `src/data/products/pipeline/therapanacea.ts`, keeping only SmartPlan and BrachyBox in `THERAPANACEA_PIPELINE_PRODUCTS`. The auto-contouring copy stays as the single source of truth.

## 3. Remove orphan duplicate files

A scan for duplicate product IDs surfaced nine additional pairs. In each case, only one file is actually imported by the category `index.ts`; the other is an orphan left over from a prior rename. The orphans are not rendered today, but they collide on `id` and confuse search/grep. Delete the orphans:

| Delete (orphan)                                          | Kept (imported)                              |
| -------------------------------------------------------- | -------------------------------------------- |
| `src/data/products/auto-contouring/carina-ai.ts`         | `auto-contouring/carina.ts`                  |
| `src/data/products/auto-contouring/ever-fortune-ai.ts`   | `auto-contouring/everfortune.ts`             |
| `src/data/products/auto-contouring/medmind-technology-co-ltd.ts` | `auto-contouring/medmind.ts`         |
| `src/data/products/auto-contouring/raysearch-laboratories.ts` | `auto-contouring/raysearch.ts`          |
| `src/data/products/auto-contouring/varian-siemens-healthineers.ts` | `auto-contouring/varian-ethos.ts`     |
| `src/data/products/auto-contouring/vysioneer.ts` (typo dup) | `auto-contouring/vysioner.ts`             |
| `src/data/products/image-synthesis/philips.ts`           | `image-synthesis/philips-mrcat-pelvis.ts` (and sibling MRCAT files) |
| `src/data/products/platform/manteia.ts`                  | `auto-contouring/manteia-acculearning.ts`    |
| `src/data/products/reconstruction/canon-medical-systems.ts` | `reconstruction/canon.ts`                 |

No index files need editing — the orphans are not imported anywhere.

## Out of scope

- No changes to evidence, regulatory, or limitations content of any product beyond the category/githubUrl tweak on SmartSpeed AI.
- No restructuring of the pipeline page or auto-contouring page UI.
- Archived products under `src/data/products/archived/` are left alone (they're intentionally excluded from `ALL_PRODUCTS`).

## Files touched

- edit `src/data/products/reconstruction/philips.ts` (append SmartSpeed AI entry)
- edit `src/data/products/pipeline/therapanacea.ts` (remove TumorBox entry)
- delete the nine orphan files listed above
- close PR #111 on GitHub with a merge-note comment

# Contour ProtégéAI+ structure list 2.0.0 with version history

## Goal
Replace the catalog structure list for MIM Contour ProtégéAI+ with the vendor 2.0.0 model/contour list, archive the existing list as the 1.4.0 snapshot, and let users look back at older versions. Dashboards and comparison counts keep using the latest version only.

## What changes for users
- The product page shows the 2.0.0 structure list (including the new Brain MR and Prostate MR models, updated Male Pelvis CT and Thorax models).
- Below the structure card, a collapsible "Previous versions" section lets you open the 1.4.0 list, with its own version label and source date.
- Statistics, charts, and the structure comparison tool count only the current (2.0.0) list — unchanged behaviour, since they read the main list.

## Data changes

`src/data/products/auto-contouring/mim-software.ts`
- Replace `supportedStructures` with the 2.0.0 list transcribed from the vendor KB article (last edited 6-Aug-2026), keeping the existing `Region: Structure Name` convention and one region label per model:
  - Head and Neck (4.1.1), Thorax (4.2.0), Abdomen (4.2.0), Male Pelvis CT (5.0.0), Female Pelvis CT (4.2.0), Brain MR (4.3.0), SurePlan MRT CT (4.2.0), Whole Body - Physiological Uptake Organs (4.1.0), Prostate MR (1.0.1).
  - Obvious KB typos are normalised to the vendor's own DICOM-style naming (`Gland_Lacrinal_L` → `Glnd_Lacrimal_L`, `Gland_Submindibular_R` → `Glnd_Submand_R`), noted in `source`.
- Add `structureHistory` with one entry: version `1.4.0`, the current list moved verbatim, plus `retrievedOn` and a note that it is the previously catalogued list.
- Add `structuresProvenance` pointing at the vendor KB article (vendor-provided, retrieved 2026-08-28).
- Bump `lastUpdated` / `lastRevised` to `2026-08-28` and extend `source` with the 2.0.0 model/contour reference.

Note: the uploaded PDF is used as the source document only; it is not added to the repository.

## Technical changes

1. `src/types/productDetails.d.ts`
   - Add optional `structureHistory?: Array<{ version: string; releaseDate?: string; retrievedOn?: string; source?: string; sourceUrl?: string; notes?: string; structures: ProductDetails['supportedStructures'] }>`.
   - Document that `supportedStructures` is always the current version and the single source for counts.

2. `src/components/product/SupportedStructures.tsx`
   - Accept `history` and optional `currentVersion` props.
   - Render an accordion under the current card: one item per historical version showing the archived list with the existing `StructuresDisplay` renderer, plus a muted line with version, retrieval date and source link, and a "historical — not counted in statistics" caption.
   - No change to the current-version rendering or edit mode.

3. `src/components/ProductDetails.tsx`
   - Pass `product.structureHistory` and `product.version` to `SupportedStructures`.

4. Counting stays untouched
   - `src/utils/chartDataTransformation.ts`, `src/utils/comparison/structureComparison.ts`, `src/pages/CompareStructures.tsx` and the export utilities keep reading `supportedStructures` only, so historical versions never enter counts or exports.

## Validation
- `tsgo` typecheck, `npm run validate:evidence`.
- Render the product page and confirm the 2.0.0 groups appear, the badge counts reflect 2.0.0 only, and the 1.4.0 history expands correctly.

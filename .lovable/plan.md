## Goal
Resolve the duplicate "Precise Image" (Philips, CT) by merging the richer content from `image-enhancement/philips-smartdose.ts` into the existing `reconstruction/philips.ts` entry, keeping id `philips-precise-image` and the Reconstruction primary category, while preserving the Image Enhancement classification as a secondary category.

## Changes

### 1. `src/data/products/reconstruction/philips.ts`
Replace the body of the existing `PreciseImage` export (id `philips-precise-image`) with the richer content currently in `philips-smartdose.ts`, while:
- Keeping `id: "philips-precise-image"`
- Keeping `category: "Reconstruction"` (do NOT change to Image Enhancement)
- Adding `secondaryCategories: ["Image Enhancement"]`
- Updating `githubUrl` to point to `reconstruction/philips.ts`
- Keeping the export name `PreciseImage` and its position in the file (other exports `SmartSpeed`, `SmartSpeedPrecise` untouched)
- Carrying over the full evidence list (7 peer-reviewed publications + 2 regulatory clearances + white paper), trainingData, evaluationData, evidenceRigor (E1), clinicalImpact (I2), adoptionReadiness (R3), the four evidence flags, limitations, technology block, regulatory block (including the K232491 note), and the 2026-06-17 timestamps.

### 2. `src/data/products/image-enhancement/philips-smartdose.ts`
Delete the file (no longer needed; content merged into reconstruction).

### 3. `src/data/products/image-enhancement/index.ts`
Remove the `PHILIPS_SMARTDOSE_PRODUCTS` import and its spread from `IMAGE_ENHANCEMENT_PRODUCTS`. The product will still surface in Image Enhancement listings via its `secondaryCategories` field (handled by `DataService`).

### 4. `src/data/companies/medical-imaging.ts`
Remove the orphaned `"philips-smartdose-ct-enhancement"` id from Philips's product list (line 38). The retained `"philips-precise-image"` entry already covers it.

### 5. `public/sitemap.xml`
Remove the `<url>` block for `https://dlinrt.eu/product/philips-smartdose-ct-enhancement` (lines around 349). The existing `philips-precise-image` URL stays.

### 6. `scripts/company-product-mapping.ps1`
Remove `"philips-smartdose-ct-enhancement"` from the Philips array (line 22). Helper script only; safe cleanup.

## Verification
- Build succeeds (no dangling import of `PHILIPS_SMARTDOSE_PRODUCTS`).
- `/product/philips-precise-image` renders with the merged richer content.
- The product appears under both Reconstruction (primary) and Image Enhancement (via secondaryCategory filter) on /products.
- `/product/philips-smartdose-ct-enhancement` returns the "Product not found" route — acceptable since the id never existed in production sitemap traffic and the canonical entry now covers it.

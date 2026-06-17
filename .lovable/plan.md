## Problem

`ge-precision-dl` does not show on the GE Healthcare company page (`/company/ge-healthcare`).

Root cause: the company record's `productIds` array in `src/data/companies/medical-imaging.ts` (lines 10–18) does not include `"ge-precision-dl"`. `getProductsByCompany` in `src/services/DataService.ts` filters products via `company.productIds.includes(product.id)`, so the entry is silently excluded even though the product itself is valid, FDA-cleared, and renders fine at `/product/ge-precision-dl` and under the Image Enhancement filter.

## Fix

Add `"ge-precision-dl"` to the `GE Healthcare` `productIds` array in `src/data/companies/medical-imaging.ts`.

Updated array (in alphabetical-ish grouping with existing entries preserved):

```ts
"productIds": [
  "ge-auto-segmentation",
  "ge-truefidelity-pro",
  "ge-air-recon-dl",
  "ge-air-recon-dl-enhancement",
  "ge-dlip-ct",
  "ge-healthcare-irt",
  "ge-mr-contour-dl",
  "ge-precision-dl"
],
```

No other files need changes. The product file (`src/data/products/image-enhancement/ge-healthcare.ts`) is already correct.

## Verification

1. Reload `/company/ge-healthcare` — Precision DL should appear in the product list.
2. `/product/ge-precision-dl` should keep working unchanged.
3. Image Enhancement category and global `/products` view are unaffected.

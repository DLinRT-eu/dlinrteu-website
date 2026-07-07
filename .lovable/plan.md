## Issue
The Varian company entry in `src/data/companies/radiotherapy-equipment.ts` lists only `varian-ethos-ai-segmentation` in `productIds`. The newly added `varian-eclipse-ai-contouring` product exists in `src/data/products/auto-contouring/varian-eclipse.ts` and is wired into `AUTO_CONTOURING_PRODUCTS`, but is not linked to the company — so it doesn't appear on `/products/company/varian` or in company-scoped dashboard counts.

## Fix
Add `"varian-eclipse-ai-contouring"` to the `productIds` array of the `varian` entry in `src/data/companies/radiotherapy-equipment.ts` (lines 72–74).

Result:
```ts
"productIds": [
  "varian-ethos-ai-segmentation",
  "varian-eclipse-ai-contouring"
],
```

## Audit checks (post-edit)
- Confirm no duplicate id in `AUTO_CONTOURING_PRODUCTS`.
- Confirm `/products/company/varian` renders both products.
- No other file references need updating: `ALL_PRODUCTS` picks up the product via the auto-contouring index; company-scoped views use `dataService.getProductsByCompany('varian')` which reads `productIds`.

## Out of scope
No changes to the product data itself, Ethos entry, or company description. Minimal-intervention fix.
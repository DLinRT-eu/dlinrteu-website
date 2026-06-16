## Fixes

### 1. AdaptBox — revert to a single Pelvis (male) CBCT model

I hallucinated H&N and Breast/Thorax CBCT structure lists in the previous turn. Roll them back.

- `src/data/products/auto-contouring/therapanacea-structures.ts`:
  - Remove `ADAPTBOX_HEAD_NECK_CBCT`, `ADAPTBOX_BREAST_THORAX_CBCT`, and `ADAPTBOX_ALL_STRUCTURES`.
  - Keep only `ADAPTBOX_PELVIS_MALE_CBCT` (the 9 structures from the AdaptBox product page).
- `src/data/products/image-synthesis/therapanacea-adaptbox.ts`:
  - Import `ADAPTBOX_PELVIS_MALE_CBCT` again; set `supportedStructures: ADAPTBOX_PELVIS_MALE_CBCT`.
  - Restore the provenance note: only Pelvis (male) is publicly itemised; H&N and Breast/Thorax CBCT models are FDA-cleared at platform level but not per-structure itemised.
  - Bump `lastRevised`/`lastUpdated`.

### 2. Render `SupportedStructures` whenever the product has any

Currently `src/components/ProductDetails.tsx` gates the block on `product.category === "Auto-Contouring"`, so MR-Box (Image Synthesis primary, Auto-Contouring secondary) hides its structure list even though it has one.

- Change the gate to: render when `product.supportedStructures?.length > 0` OR `product.category === "Auto-Contouring"` OR `product.secondaryCategories?.includes("Auto-Contouring")`. This keeps the existing empty-state placeholder for auto-contouring products that haven't filled it in, and starts showing the block for any other product (e.g. MR-Box) that ships a structure list.

### Out of scope

- No further evidence edits, no other UI changes, no schema changes.

### Verification

- `npx tsc --noEmit`
- Visual check of `/product/therapanacea-adaptbox` (only 9 Pelvis Male structures visible) and `/product/mr-box-synthetic` (structures block now visible).

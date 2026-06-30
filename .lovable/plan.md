## Problem
`tjacob@accuray.com` (verified Accuray rep, `company_id = "accuray"`, `company_name = "Accuray"`) sees no products to certify.

The Accuray catalog entry (`src/data/products/tracking/accuray.ts`) uses `company: "Accuray®"` (with copyright symbol). The company dashboard resolves products via:

```ts
getCompanyProducts(repData.company_name, ALL_PRODUCTS)
// -> products.filter(p => p.company === companyName)
```

`"Accuray®" !== "Accuray"` → 0 products → nothing to certify. Same fragility exists for any future vendor whose display name carries punctuation/symbols that drift between the rep record and the product `company` string.

## Fix

Make company → product matching canonical-id based (it already works elsewhere via `getCompanyIdByName`, which maps both `"Accuray"` and `"Accuray®"` → `"accuray"`).

### Changes

1. **`src/utils/companyUtils.ts` — `getCompanyProducts`**
   Switch from exact name match to canonical-id match:
   ```ts
   export const getCompanyProducts = (companyNameOrId, allProducts) => {
     const targetId = getCompanyIdByName(companyNameOrId);
     return allProducts.filter(p => getCompanyIdByName(p.company) === targetId);
   };
   ```
   This stays backwards-compatible (existing callers pass a name) and removes the ® / punctuation fragility.

2. **Data normalization (one-shot SQL via insert tool)**
   Align the rep row with the catalog display name so downstream UI labels (e.g. "Accuray Dashboard") render with the ®:
   ```sql
   UPDATE company_representatives
   SET company_name = 'Accuray®'
   WHERE company_id = 'accuray' AND company_name = 'Accuray';
   ```
   `company_id` already correct → no auth changes.

3. **Verification**
   - Re-read `company_representatives` for Accuray to confirm name update.
   - Confirm typecheck passes.
   - Ask user to refresh `/company/overview` while logged in as Theju — Synchrony should now appear as a pending certification.

### Out of scope
- No schema migration, no RLS change, no edge function change.
- Not adding new Accuray products (catalog currently lists only Synchrony for Accuray; that is correct).
- Not touching the `companyMappingValidator` flow.

## Risk
Very low. `getCompanyProducts` is only used to derive a company's product list from the static catalog; switching to canonical-id matching is strictly more permissive in the intended direction and is consistent with how `extractCompaniesFromProducts` already groups.

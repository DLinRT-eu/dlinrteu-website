
# Plan: Update Subtle Medical Company Product IDs

## Issue Identified

The Subtle Medical company definition in `src/data/companies/specialized-solutions.ts` has outdated `productIds` that don't match the current FDA-cleared products in the database.

| Status | Product ID | Product Name | FDA Clearance |
|--------|-----------|--------------|---------------|
| Listed (exists) | `subtle-mr` | SubtleMR | K223623 |
| Listed (exists) | `subtle-pet` | SubtlePET | K211964 |
| Listed (deleted) | `subtle-gad` | SubtleGAD | None (removed) |
| Missing | `aimify` | AiMIFY | K240290 |
| Missing | `subtle-hd` | SubtleHD | K243250 |

## How It Works

The DataService uses the company's `productIds` array to look up products:

```typescript
getProductsByCompany(companyId: string): ProductDetails[] {
  const company = this.getCompanyById(companyId);
  return productList.filter(product => 
    company.productIds.includes(product.id || '') && hasRegulatoryApproval(product)
  );
}
```

Since `aimify` and `subtle-hd` are not in the array, they never appear in the company page.

## Fix Required

Update `src/data/companies/specialized-solutions.ts` lines 57-61:

**From:**
```typescript
"productIds": [
  "subtle-mr", 
  "subtle-pet",
  "subtle-gad"
]
```

**To:**
```typescript
"productIds": [
  "subtle-mr", 
  "subtle-pet",
  "aimify",
  "subtle-hd"
]
```

## Result After Fix

Subtle Medical company page will display **4 products**:
1. SubtleMR - MRI noise reduction and scan acceleration
2. SubtlePET - PET image enhancement and dose reduction
3. AiMIFY - MRI contrast enhancement for brain imaging
4. SubtleHD - General-purpose MRI enhancement

## File to Modify

| File | Change |
|------|--------|
| `src/data/companies/specialized-solutions.ts` | Update Subtle Medical `productIds` array (lines 57-61) |

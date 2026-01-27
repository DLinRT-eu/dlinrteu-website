

# Plan: Unify Company Count Logic Across Homepage and Companies Page

## Problem Identified

The homepage and companies page use different logic to count companies:

| Page | Current Logic | Result |
|------|---------------|--------|
| Homepage (`Index.tsx`) | `dataService.getAllCompanies().length` | Counts ALL companies (including those with 0 products) |
| Companies page (`Companies.tsx`) | Filters companies where `productCount > 0` | Only counts companies with active products |

This causes a discrepancy where archived companies (RefleXion Medical, Leo Cancer Care) are still counted on the homepage but not displayed on the companies page.

## Solution

Create a single source of truth in DataService for counting companies with active products, then use it consistently across both pages.

## Implementation Steps

### Step 1: Add New Method to DataService

Add a method `getActiveCompanies()` that returns only companies with at least one regulatory-approved product:

```typescript
// In src/services/DataService.ts

/**
 * Get only companies that have at least one active (regulatory-approved) product
 * This is the single source of truth for company counts across the platform
 */
getActiveCompanies(): CompanyDetails[] {
  return COMPANIES.filter(company => {
    const activeProducts = ALL_PRODUCTS.filter(product => 
      company.productIds.includes(product.id || '') && 
      hasRegulatoryApproval(product)
    );
    return activeProducts.length > 0;
  });
}
```

### Step 2: Update Homepage to Use New Method

Modify `src/pages/Index.tsx` to use the new method:

```typescript
// Before (line 48):
const companies = dataService.getAllCompanies();

// After:
const companies = dataService.getActiveCompanies();
```

This ensures the homepage count matches the companies page count.

### Step 3: Refactor Companies Page (Optional Cleanup)

Update `src/pages/Companies.tsx` to also use the new method for consistency:

```typescript
// Before (lines 27-38):
const companies = useMemo(() => {
  return dataService.getAllCompanies()
    .map(company => {...})
    .filter(company => company.productCount > 0);
}, []);

// After:
const companies = useMemo(() => {
  return dataService.getActiveCompanies()
    .map(company => {
      const companyProducts = dataService.getProductsByCompany(company.id);
      return {
        ...company,
        products: companyProducts,
        productCount: companyProducts.length
      };
    });
  // No need to filter - getActiveCompanies() already excludes empty companies
}, []);
```

## Files to Modify

| File | Change |
|------|--------|
| `src/services/DataService.ts` | Add `getActiveCompanies()` method |
| `src/pages/Index.tsx` | Change `getAllCompanies()` to `getActiveCompanies()` |
| `src/pages/Companies.tsx` | Use `getActiveCompanies()` and remove redundant filter |

## Expected Result

After implementation:
- Homepage will show **39 companies** (matching the companies page)
- Both pages use the same `getActiveCompanies()` method
- Future company archiving will automatically update counts everywhere
- Single source of truth for "active companies" definition

## Technical Details

The new `getActiveCompanies()` method:
1. Filters the `COMPANIES` array
2. For each company, checks if any of its `productIds` have products that pass `hasRegulatoryApproval()`
3. Returns only companies where at least one product passes this check

This ensures consistency with how products are filtered elsewhere in the codebase.


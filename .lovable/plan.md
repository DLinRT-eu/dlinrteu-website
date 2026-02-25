

# Fix Missing Company Logos and Product Accounting in PPTX Export

## Problem

When the PPTX is generated, the per-task company logo slides are built from manually maintained `primaryTask`/`secondaryTasks` fields on each company entry. Meanwhile, the product tables are built from `matchesTask()` which checks product `category` and `secondaryCategories`. These two data sources are out of sync, causing company logos to be missing from slides where their products appear.

### Specific Missing Logos

| Slide | Missing Company | Reason |
|-------|----------------|--------|
| Image Synthesis Companies | MVision AI | Workspace+ has `secondaryCategories: ["Image Synthesis", ...]` but MVision AI company entry lacks "Image Synthesis" in `secondaryTasks` |
| Registration Companies | MVision AI | Same issue -- Workspace+ lists "Registration" as secondary category |
| Treatment Planning Companies | MVision AI | Same issue -- Workspace+ lists "Treatment Planning" as secondary category |

## Solution: Two-Part Fix

### Part 1: Update MVision AI Company Data (immediate fix)

**File: `src/data/companies/auto-contouring.ts`**

Update MVision AI's `secondaryTasks` from:
```
"secondaryTasks": ["Performance Monitor", "Platform"]
```
to:
```
"secondaryTasks": ["Performance Monitor", "Platform", "Image Synthesis", "Registration", "Treatment Planning"]
```

This aligns the company entry with the Workspace+ product's `secondaryCategories`.

### Part 2: Auto-derive company tasks from products (systemic fix)

**File: `src/services/DataService.ts`**

In `getPresentationData()`, after building `taskCompanyMap` from company `primaryTask`/`secondaryTasks`, add a second pass that scans all products and ensures any company whose product matches a task (via `matchesTask`) is also included in that task's company set. This prevents future drift.

The logic would be:
```text
For each product:
  For each task in taskCompanyMap keys:
    If matchesTask(product, task):
      Add product.company to taskCompanyMap[task]
  Also check product.category and product.secondaryCategories:
    For each category:
      Ensure taskCompanyMap has that category
      Add product.company to it
```

This ensures the logo slides always match the product tables.

## File Summary

| File | Change |
|------|--------|
| `src/data/companies/auto-contouring.ts` | Add "Image Synthesis", "Registration", "Treatment Planning" to MVision AI's `secondaryTasks` |
| `src/services/DataService.ts` | In `getPresentationData()`, auto-enrich `taskCompanyMap` from product categories so company logos always appear alongside their products |

## Technical Details

The auto-enrichment in `DataService.ts` will be added between the existing `taskCompanyMap` construction (lines 383-392) and the `companyLogosByTask` mapping (line 394). It will iterate all products, check their `category` and `secondaryCategories`, and add the product's company name to each matching task set. This ensures that even if a company's `secondaryTasks` is incomplete, the product data itself drives correct logo placement.


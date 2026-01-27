

# Plan: Archive Non-AI Products to Separate Folder

## Overview

Move three non-AI product entries to an archived folder so they are not displayed on the website, but preserved for potential future use. These products don't use AI and are not used to monitor or implement AI-based solutions.

## Products to Archive

| Product | File | Reason |
|---------|------|--------|
| Leo Cancer Care Marie | `leo-cancer-care.ts` | Hardware patient positioner, not AI software |
| RefleXion SCINTIX | `reflexion.ts` | Real-time PET signal processing, not deep learning |
| RefleXion X2 | `reflexion.ts` | Hardware platform with signal processing |

## Implementation Steps

### Step 1: Create Archive Folder Structure

Create a new folder: `src/data/products/archived/`

This folder will contain:
- `leo-cancer-care.ts` (moved from tracking/)
- `reflexion.ts` (moved from tracking/)
- `index.ts` (for organized exports, not imported into main products)
- `README.md` (documentation explaining purpose)

### Step 2: Move Product Files

| Source | Destination |
|--------|-------------|
| `src/data/products/tracking/leo-cancer-care.ts` | `src/data/products/archived/leo-cancer-care.ts` |
| `src/data/products/tracking/reflexion.ts` | `src/data/products/archived/reflexion.ts` |

### Step 3: Update Tracking Index

Modify `src/data/products/tracking/index.ts`:

```text
Before:
import { ACCURAY_PRODUCTS } from "./accuray";
import { REFLEXION_PRODUCTS } from "./reflexion";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";

export const TRACKING_PRODUCTS: ProductDetails[] = [
  ...ACCURAY_PRODUCTS,
  ...REFLEXION_PRODUCTS,
  ...LEO_CANCER_CARE_PRODUCTS
];

After:
import { ACCURAY_PRODUCTS } from "./accuray";

export const TRACKING_PRODUCTS: ProductDetails[] = [
  ...ACCURAY_PRODUCTS
];
```

### Step 4: Create Archive Index and README

**`src/data/products/archived/index.ts`**:
```typescript
// Archived products - not displayed on website
// These products are preserved for potential future use

import { ProductDetails } from "@/types/productDetails";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";
import { REFLEXION_PRODUCTS } from "./reflexion";

// NOT exported to main products - kept for reference only
export const ARCHIVED_PRODUCTS: ProductDetails[] = [
  ...LEO_CANCER_CARE_PRODUCTS,
  ...REFLEXION_PRODUCTS
];
```

**`src/data/products/archived/README.md`**:
```markdown
# Archived Products

This folder contains product entries that have been removed from the 
main website but are preserved for potential future use.

## Why Archived?

These products do not meet the platform's criteria:
- They do not use AI or deep learning
- They are not used to monitor or implement AI-based solutions

## Products in Archive

| Product | Company | Reason |
|---------|---------|--------|
| Marie Upright Patient Positioner | Leo Cancer Care | Hardware patient positioner |
| SCINTIX Biology-Guided Radiotherapy | RefleXion Medical | Signal processing, not DL |
| RefleXion X2 Platform | RefleXion Medical | Hardware platform |

## Restoration

To restore these products to the website:
1. Move the relevant `.ts` file back to the appropriate category folder
2. Update the category's `index.ts` to import and include the products
3. Update `src/data/products/archived/index.ts` to remove the import

Last updated: 2026-01-27
```

## Files to Create

| File | Purpose |
|------|---------|
| `src/data/products/archived/leo-cancer-care.ts` | Moved from tracking/ |
| `src/data/products/archived/reflexion.ts` | Moved from tracking/ |
| `src/data/products/archived/index.ts` | Organized exports (not imported into main) |
| `src/data/products/archived/README.md` | Documentation |

## Files to Modify

| File | Change |
|------|--------|
| `src/data/products/tracking/index.ts` | Remove imports for RefleXion and Leo Cancer Care |

## Files to Delete

| File | Reason |
|------|--------|
| `src/data/products/tracking/leo-cancer-care.ts` | Moved to archived/ |
| `src/data/products/tracking/reflexion.ts` | Moved to archived/ |

## Result

After implementation:
- These 3 products will no longer appear on the website
- Product data is preserved in `src/data/products/archived/`
- Clear documentation explains why they were archived and how to restore them
- The tracking category will only contain Accuray Synchrony (the AI-powered product)


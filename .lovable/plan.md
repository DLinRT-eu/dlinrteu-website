
# Remove Contact Email and Contact Phone Fields

## Overview

Remove the "Contact Email" and "Contact Phone" fields from product displays across the website. These fields are not relevant for this platform and currently show "N/A" for most products.

## Changes Required

### 1. Update ContactInformation.tsx

**File:** `src/components/product/ContactInformation.tsx`

**Changes:**
- Remove the entire `<div>` block for "Contact Email" (lines 46-62)
- Remove the entire `<div>` block for "Contact Phone" (lines 64-74)
- Keep the Website and Source Code (GitHub) sections

**Result:** The Contact Information card will only show:
- Website
- Source Code (GitHub link)

### 2. Update Export Functions

These files generate model cards for PDF, Excel, and CSV exports. The contact email/phone fields should be removed from exports as well.

**Files to modify:**

| File | Lines to Remove |
|------|-----------------|
| `src/utils/modelCard/exporters/pdfExporter.ts` | Lines 197-201 (Contact Email, Contact Phone) |
| `src/utils/modelCard/exporters/excelExporter.ts` | Line 90 (Contact Email row) |
| `src/utils/modelCard/exporters/csvExporter.ts` | Line 67 (Contact Email row) |

### 3. Update Data Generator

**File:** `src/utils/modelCard/dataGenerator.ts`

**Change:** Remove line 158 that sets `contactEmail: product.contactEmail || "N/A"`

### 4. Update Model Card Types

**File:** `src/utils/modelCard/types.ts`

**Change:** Remove `contactEmail` from the `contact` interface (line 53)

### 5. Update ProductSearch

**File:** `src/components/grid/ProductSearch.tsx`

**Change:** Remove `contactEmail` and `contactPhone` from the searchable fields array (lines 74-75)

## Fields to Keep (No Changes)

The following related fields will be preserved as they serve different purposes:
- `supportEmail` - For support contact (different from general contact)
- `website` - Product website URL
- `productUrl` - Specific product page URL
- `companyUrl` - Company website URL

## Type Definition (Optional Cleanup)

The `contactEmail` and `contactPhone` fields in `src/types/productDetails.d.ts` (lines 87-88) can be kept for backward compatibility with existing data files, or removed in a future cleanup. Removing them now would require updating example product files.

## Files Summary

| File | Change Type |
|------|-------------|
| `src/components/product/ContactInformation.tsx` | Remove Contact Email and Phone sections |
| `src/utils/modelCard/exporters/pdfExporter.ts` | Remove contact email/phone from PDF export |
| `src/utils/modelCard/exporters/excelExporter.ts` | Remove contact email from Excel export |
| `src/utils/modelCard/exporters/csvExporter.ts` | Remove contact email from CSV export |
| `src/utils/modelCard/dataGenerator.ts` | Remove contactEmail generation |
| `src/utils/modelCard/types.ts` | Remove contactEmail from interface |
| `src/components/grid/ProductSearch.tsx` | Remove from search fields |

## Result

After this change:
- Product pages will no longer display "Contact Email: N/A" or "Contact Phone: N/A"
- Exported model cards (PDF, Excel, CSV) will not include these empty fields
- Search will no longer index these fields
- The Contact Information card will be cleaner, showing only Website and GitHub links

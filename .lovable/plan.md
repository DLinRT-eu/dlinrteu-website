

# Plan: Archive Unverified GE CT Product and Add Verified Precision DL

## Overview

Archive the unverified "Deep Learning Image Processing for CT" entry (lacks specific FDA clearance number) and add the verified "Precision DL" product (FDA K230082) for PET/CT image processing.

## Problem Identified

| Entry | Issue |
|-------|-------|
| Deep Learning Image Processing for CT | No specific FDA 510(k) number, generic product URL, functionality already covered by TrueFidelity Pro (K183202) in Reconstruction category |

## Implementation Steps

### Step 1: Create Archived GE Healthcare File

Create `src/data/products/archived/ge-healthcare.ts` containing the unverified product:

```typescript
import { ProductDetails } from "@/types/productDetails";

export const GE_ARCHIVED_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-dlip-ct",
    name: "Deep Learning Image Processing for CT",
    company: "GE Healthcare",
    category: "Image Enhancement",
    // ... existing product data preserved for reference
  }
];
```

### Step 2: Update Image Enhancement GE File

Modify `src/data/products/image-enhancement/ge-healthcare.ts`:

1. Remove the "Deep Learning Image Processing for CT" entry (lines 5-65)
2. Add new verified "Precision DL" product with proper FDA documentation:

```typescript
{
  id: "ge-precision-dl",
  name: "Precision DL",
  company: "GE Healthcare",
  category: "Image Enhancement",
  description: "Deep learning-based PET image enhancement that improves image quality and enables potential dose reduction while maintaining diagnostic confidence.",
  certification: "FDA Cleared",
  logoUrl: "/logos/ge_healthcare.png",
  companyUrl: "https://www.gehealthcare.com",
  productUrl: "https://www.gehealthcare.com/products/molecular-imaging/pet-ct",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/ge-healthcare.ts",
  anatomicalLocation: ["Whole body"],
  modality: ["PET", "PET/CT"],
  diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiac conditions"],
  releaseDate: "2023-05-22",
  keyFeatures: [
    "Deep learning-based PET image enhancement",
    "Improved signal-to-noise ratio",
    "Potential for reduced tracer dose",
    "Compatible with various PET/CT systems"
  ],
  technicalSpecifications: {
    population: "Adult",
    input: ["PET images"],
    inputFormat: ["DICOM"],
    output: ["Enhanced PET images"],
    outputFormat: ["DICOM"]
  },
  technology: {
    integration: ["GE PET/CT systems", "PACS"],
    deployment: ["On-scanner", "Workstation"]
  },
  regulatory: {
    ce: {
      status: "Approved",
      class: "IIa",
      type: "Medical Device",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      status: "510(k) Cleared",
      class: "Class II",
      clearanceNumber: "K230082",
      regulationNumber: "21 CFR 892.2050",
      productCode: "MYN",
      type: "510(k)",
      decisionDate: "2023-05-22"
    },
    intendedUseStatement: "Precision DL is intended for use in PET image enhancement to improve image quality through noise reduction."
  },
  market: {
    onMarketSince: "2023",
    distributionChannels: ["Integrated in PET/CT systems", "Software upgrade"]
  },
  evidence: [
    {
      type: "FDA 510(k) Summary",
      description: "FDA 510(k) clearance K230082 for Precision DL - Class II device",
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf"
    }
  ],
  lastUpdated: "2026-01-27",
  lastRevised: "2026-01-27",
  source: "FDA 510(k) database"
}
```

### Step 3: Update Archived Products Index

Modify `src/data/products/archived/index.ts` to include GE archived products:

```typescript
import { ProductDetails } from "@/types/productDetails";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";
import { REFLEXION_PRODUCTS } from "./reflexion";
import { GE_ARCHIVED_PRODUCTS } from "./ge-healthcare";

export const ARCHIVED_PRODUCTS: ProductDetails[] = [
  ...LEO_CANCER_CARE_PRODUCTS,
  ...REFLEXION_PRODUCTS,
  ...GE_ARCHIVED_PRODUCTS
];
```

### Step 4: Update Archived README

Update `src/data/products/archived/README.md` to document the new archived entry:

| Product | Company | Reason |
|---------|---------|--------|
| Marie Upright Patient Positioner | Leo Cancer Care | Hardware patient positioner |
| SCINTIX Biology-Guided Radiotherapy | RefleXion Medical | Signal processing, not DL |
| RefleXion X2 Platform | RefleXion Medical | Hardware platform |
| Deep Learning Image Processing for CT | GE Healthcare | Unverified - no specific FDA clearance number, functionality covered by TrueFidelity Pro |

## Files to Create

| File | Purpose |
|------|---------|
| `src/data/products/archived/ge-healthcare.ts` | Archived GE product with unverified CT enhancement entry |

## Files to Modify

| File | Change |
|------|--------|
| `src/data/products/image-enhancement/ge-healthcare.ts` | Remove unverified CT product, add verified Precision DL (K230082) |
| `src/data/products/archived/index.ts` | Import and include GE archived products |
| `src/data/products/archived/README.md` | Document new archived entry |

## Expected Result

After implementation:
- Unverified "Deep Learning Image Processing for CT" is archived
- New verified "Precision DL" (FDA K230082) is added to Image Enhancement category
- Product count remains the same (one removed, one added)
- All GE products now have proper FDA clearance documentation

## Technical Details: Precision DL (K230082)

| Field | Value |
|-------|-------|
| FDA 510(k) Number | K230082 |
| Decision Date | May 22, 2023 |
| Product Code | MYN |
| Regulation Number | 21 CFR 892.2050 |
| Device Class | Class II |
| Modality | PET/CT |
| Category | Image Enhancement |


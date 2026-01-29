
# Adding Therapanacea SmartFuse Product + Build Error Fix

## Summary

Based on my research of the Therapanacea website, I found that **SmartFuse** is an active, certified product that should be added to the database. The website confirms it's part of the ART-Plan+ platform with CE/FDA/TGA certification.

### Current Therapanacea Products (already in database):
- **Annotate** - Auto-contouring (CE, FDA, TGA cleared)
- **MR-Box** - MRI synthetic CT generation (CE, FDA, TGA cleared)
- **AdaptBox** - CBCT augmentation (CE, FDA, TGA cleared)

### Product to Add:
- **SmartFuse** - AI-powered rigid and deformable image registration/fusion (CE, FDA, TGA cleared)

### Coming Soon (NOT adding - no clearance yet):
- SmartPlan - Treatment planning
- TumorBox - Tumor segmentation
- BrachyBox - Brachytherapy delineation

---

## Task 1: Fix Build Error

The build is failing due to incorrect property name in the Resend API call.

**File:** `supabase/functions/send-contact-email/index.ts`
**Line:** 139

**Current (broken):**
```typescript
replyTo: email,
```

**Fixed:**
```typescript
reply_to: email,
```

The Resend API uses snake_case for the `reply_to` property, not camelCase.

---

## Task 2: Add SmartFuse Product

### New File: `src/data/products/registration/therapanacea.ts`

SmartFuse belongs in the **Registration** category as it's an image fusion/registration tool.

```typescript
import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_SMARTFUSE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartfuse",
    name: "SmartFuse",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/smartfuse/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/therapanacea.ts",
    description: "AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. Part of the ART-Plan+ platform.",
    category: "Registration",
    certification: "CE, FDA & TGA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/smartfuse/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "CBCT", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered registration algorithm",
      "Rigid and deformable fusion",
      "Real-time contour deformation",
      "Sub-voxel registration accuracy",
      "4D-CT management",
      "Multi-modality support (CT, MRI, CBCT, PET-CT)",
      "Checker-board visualization"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT", "PET-CT", "4D-CT"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Deformed contours", "Deformation field"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242822",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-02-25",
        notes: "Module within ART-Plan+ platform (v3.0.0 cleared). Current version is v3.1.2."
      },
      tga: {
        status: "TGA Cleared",
        notes: "Cleared for Australian market as part of ART-Plan+ platform"
      },
      intendedUseStatement: "For multi-modal visualization and rigid- and deformable registration of anatomical and functional images."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Therapanacea official website (therapanacea.eu/technical-information-2/), FDA 510(k) database (K242822)"
  }
];
```

---

## Task 3: Update Registration Products Index

**File:** `src/data/products/registration/index.ts`

Add the new SmartFuse product to the registration products array:

```typescript
import { ProductDetails } from "@/types/productDetails";
import { PYMEDIX_PRODUCTS } from "./pymedix";
import { THERAPANACEA_SMARTFUSE_PRODUCTS } from "./therapanacea";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  ...PYMEDIX_PRODUCTS,
  ...THERAPANACEA_SMARTFUSE_PRODUCTS
];
```

---

## Task 4: Update Company Product IDs

**File:** `src/data/companies/auto-contouring.ts`

Update Therapanacea's `productIds` array to include SmartFuse:

**Current:**
```typescript
"productIds": ["therapanacea-annotate", "therapanacea-adaptbox", "mr-box-synthetic"],
```

**Updated:**
```typescript
"productIds": ["therapanacea-annotate", "therapanacea-adaptbox", "mr-box-synthetic", "therapanacea-smartfuse"],
```

---

## Files to Modify

| File | Action |
|------|--------|
| `supabase/functions/send-contact-email/index.ts` | Fix `replyTo` → `reply_to` |
| `src/data/products/registration/therapanacea.ts` | Create new file with SmartFuse product |
| `src/data/products/registration/index.ts` | Add import and include SmartFuse products |
| `src/data/companies/auto-contouring.ts` | Add `therapanacea-smartfuse` to productIds |

---

## Why Not Add Other Products

| Product | Status | Reason |
|---------|--------|--------|
| SmartPlan | Coming Soon | Listed under "Coming Soon" on website |
| TumorBox | Coming Soon | Listed under "Coming Soon" on website |
| BrachyBox | Coming Soon | Listed under "Coming Soon" - described as "future AI-powered module" |

These products will be added once they receive regulatory clearance.


# Plan: Remove Incorrect Product and Add ClariCT.AI by ClariPi

## Problem Summary
The product "CT Clarity" (ID: `airs-ct-clarity`) listed under AIRS Medical does not exist. AIRS Medical's actual products are SwiftMR and SwiftSight only. This appears to be a confusion with **ClariCT.AI** by **ClariPi Inc.**, a separate Korean AI company also based in Seoul with roots at Seoul National University.

---

## Changes Required

### 1. Remove CT Clarity from AIRS Medical

**File: `src/data/products/image-enhancement/airs-medical.ts`**
- Delete the entire `airs-ct-clarity` product entry (lines 68-127)
- Keep only the valid `airs-swiftmr` product

### 2. Update AIRS Medical Company Entry

**File: `src/data/companies/specialized-solutions.ts`**
- Remove `"airs-ct-clarity"` from the `productIds` array (line 39)
- Keep only `"airs-swiftmr"`

### 3. Create New Claripi Product File

**New File: `src/data/products/image-enhancement/claripi.ts`**

```typescript
import { ProductDetails } from "@/types/productDetails";

export const CLARIPI_PRODUCTS: ProductDetails[] = [
  {
    id: "claripi-clarict-ai",
    name: "ClariCT.AI",
    company: "ClariPi",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/claripi.ts",
    description: "AI-powered CT image denoising solution using deep learning to enhance low-dose CT scans while preserving anatomical details and natural textures.",
    certification: "CE Mark, FDA 510(k)",
    logoUrl: "/logos/claripi.png",
    companyUrl: "https://claripi.com/",
    productUrl: "https://claripi.com/clarict-ai/",
    anatomicalLocation: ["Head", "Chest", "Heart", "Abdomen", "Pelvis", "Spine"],
    modality: "CT",
    diseaseTargeted: ["Cancer screening", "Cardiac imaging", "Pulmonary disorders", "Pediatric imaging"],
    keyFeatures: [
      "Patented Clarity Engine with deep CNN",
      "Vendor-agnostic - works with all CT manufacturers",
      "Selective noise removal preserving anatomical structures",
      "Enables radiation dose reduction",
      "Fully automated processing",
      "User-definable clarity settings"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced/denoised CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "RIS/CIS", "AI Marketplaces (Siemens Syngo.Via, Blackford, Nuance, deepcOS)"],
      deployment: ["Standalone desktop", "Local virtualization (Docker)", "Cloud-based"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "10-60 seconds per case"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDD"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K183460",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2019-03-29",
        notes: "Additional clearance K212074 (2021) for AI Marketplace integration"
      },
      intendedUseStatement: "ClariCT.AI is intended to be used for denoise processing and enhancement of DICOM images acquired from any CT scanner to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "AI Marketplaces", "Distribution partners"]
    },
    evidence: [
      {
        type: "Peer-reviewed publication",
        description: "Validation studies in pediatric abdominal CT, coronary CTA, and liver imaging",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=ClariCT"
      }
    ],
    clinicalEvidence: "Multiple peer-reviewed publications in European Radiology, Radiology, and SPIE demonstrating efficacy in various clinical applications",
    lastUpdated: "2026-01-26",
    lastRevised: "2026-01-26",
    source: "FDA 510(k) database (K183460, K212074) and company website"
  }
];
```

### 4. Add Claripi Company Entry

**File: `src/data/companies/specialized-solutions.ts`**

Add new company entry:
```typescript
{
  "id": "claripi",
  "name": "ClariPi",
  "description": "Korean AI medical imaging company specializing in CT image denoising and dose reduction solutions, founded in 2015 with roots at Seoul National University.",
  "website": "https://claripi.com/",
  "productIds": ["claripi-clarict-ai"],
  "category": "Specialized Solutions",
  "logoUrl": "/logos/claripi.png"
}
```

### 5. Update Image Enhancement Index

**File: `src/data/products/image-enhancement/index.ts`**

Add import and include in exports:
```typescript
import { CLARIPI_PRODUCTS } from "./claripi";

export const IMAGE_ENHANCEMENT_PRODUCTS: ProductDetails[] = [
  // ... existing products ...
  ...CLARIPI_PRODUCTS,
];
```

---

## Logo Requirement

A logo file will need to be added:
- **Path**: `/public/logos/claripi.png`
- **Source**: Can be obtained from ClariPi's website or press kit

---

## Summary of File Changes

| File | Action |
|------|--------|
| `src/data/products/image-enhancement/airs-medical.ts` | Remove `airs-ct-clarity` product (lines 68-127) |
| `src/data/companies/specialized-solutions.ts` | Remove `airs-ct-clarity` from AIRS Medical productIds; Add ClariPi company entry |
| `src/data/products/image-enhancement/claripi.ts` | Create new file with ClariCT.AI product |
| `src/data/products/image-enhancement/index.ts` | Import and export CLARIPI_PRODUCTS |

---

## Verified Data Sources

| Field | Source |
|-------|--------|
| FDA 510(k) clearance K183460 | FDA database |
| FDA 510(k) clearance K212074 | FDA database |
| CE Mark Class IIa | Company website, Health AI Register |
| Technical specifications | Company website |
| Clinical evidence | PubMed publications |



# MVision AI Product Data Update

## Audit Summary

After reviewing the MVision AI website, I found that the current database structure is mostly correct but needs updates to reflect the latest product information.

## Current Architecture (Correct)

The database correctly shows:
- **Contour+** as a standalone product (has its own FDA clearance K241490)
- **Workspace+** as the unified platform with all modules integrated
- Empty placeholder files for Image+, Adapt+, Dose+ pointing to Workspace+

This is correct because MVision sells Contour+ both standalone AND as part of Workspace+, while Image+, Adapt+, and Dose+ are only available through Workspace+.

## Updates Required

### 1. Update Image+ Module Details in Workspace+

**File:** `src/data/products/platform/mvision.ts`

Current Image+ description is accurate but can be enhanced with specific models:

```text
Current:
- "Synthetic CT from MRI (T1 brain, T2 pelvis)"
- "CBCT to synthetic CT conversion"
- "Virtual non-contrast (VNC) imaging"

Enhanced (from website):
- Brain MR T1 model
- Pelvis MR T2 model  
- CBCT model
- VNC (virtual non-contrast) model
- MR-only planning support
- Adaptive workflow support (CBCT to synthetic CT)
- Contrast removal capabilities
```

### 2. Update Adapt+ Module Details

Current description mentions deformable registration but website clarifies multiple methods:

```text
Add to keyFeatures:
- "Rigid registration"
- "Conventional deformable registration"
- "Deep learning deformable registration"
- "Offline adaptive workflow support"
```

### 3. Update Dose+ Module Details

Add dose prediction models to Workspace+ product:

```text
Add dosePredictionModels field:
- Prostate Model: localized prostate, VMAT, supports SBRT to conventional fractionation
- Pelvic LN Model: prostate with lymph nodes, VMAT, conventional/moderate hypofractionation
```

### 4. Update URLs

```text
Current: https://www.mvision.ai/, https://www.mvision.ai/ai-contouring/
Updated: https://mvision.ai/, https://mvision.ai/contour/
```

### 5. Add Market Approvals

Update regulatory section with latest approvals:
- Contour+ Singapore approval (May 2025)
- Contour+ UAE approval (April 2025)  
- Contour+ Morocco approval (June 2025)
- Contour+ MR Models TGA Australia (Feb 2025)
- Dose+ TGA Australia (Aug 2025)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/products/platform/mvision.ts` | Update Image+, Adapt+, Dose+ module details; add dosePredictionModels |
| `src/data/products/auto-contouring/mvision.ts` | Update URLs, add international market approvals |

---

## Detailed Changes

### Workspace+ Platform Update

**Image+ Module Enhancement:**
```typescript
{
  name: "Image+",
  description: "Generate synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
  category: "Image Synthesis",
  productUrl: "https://mvision.ai/image/",
  keyFeatures: [
    "Brain MR T1 synthetic CT model",
    "Pelvis MR T2 synthetic CT model",
    "CBCT to synthetic CT conversion",
    "Virtual non-contrast (VNC) imaging from contrast-enhanced CT",
    "MR-only planning support",
    "Offline adaptive workflow integration"
  ]
}
```

**Adapt+ Module Enhancement:**
```typescript
{
  name: "Adapt+",
  description: "AI-powered contour propagation for adaptive radiotherapy. Transfers and aligns existing contours between image sets using multiple registration methods including rigid, conventional deformable, and deep learning deformable approaches.",
  category: "Registration",
  productUrl: "https://mvision.ai/adapt/",
  keyFeatures: [
    "Automated contour propagation",
    "Rigid registration",
    "Conventional deformable image registration",
    "Deep learning deformable registration",
    "CT-to-CT, CBCT, and synthetic CT alignment",
    "Offline adaptive workflow support"
  ]
}
```

**Add Dose Prediction Models:**
```typescript
dosePredictionModels: [
  {
    name: "Prostate Model",
    anatomicalSite: "Prostate",
    technique: "VMAT",
    intent: "Curative",
    description: "AI model for localized prostate cancer without nodal involvement. Supports all fractionation approaches from conventional to SBRT with SIB capability.",
    status: "approved"
  },
  {
    name: "Pelvic LN Model",
    anatomicalSite: "Pelvis",
    technique: "VMAT",
    intent: "Curative",
    description: "AI model for prostate cancer with lymph node involvement. Supports conventional and moderate hypofractionation with SIB capability.",
    status: "approved"
  }
]
```

### Contour+ Standalone Update

**URL Updates:**
```typescript
companyUrl: "https://mvision.ai/",
productUrl: "https://mvision.ai/contour/",
website: "https://mvision.ai/contour/",
```

**Add International Approvals:**
```typescript
regulatory: {
  ce: {
    status: "CE Marked",
    class: "Class IIa",
    type: "MDR",
    regulation: "MDR 2017/745"
  },
  fda: {
    status: "510(k) Cleared",
    class: "Class II",
    type: "510(k)",
    clearanceNumber: "K241490",
    productCode: "QKB",
    regulationNumber: "21 CFR 892.2050",
    decisionDate: "2024-10-18",
    notes: "Latest version. Previous clearances: K193053 (2020)"
  },
  tga: {
    status: "Approved",
    notes: "MR Models approved February 2025"
  },
  intendedUseStatement: "For automatic segmentation of organs at risk and lymph node regions in radiation therapy planning."
},
market: {
  onMarketSince: "2019",
  distributionChannels: ["Direct sales", "Partnerships"],
  availability: "Global - CE, FDA, TGA, Singapore, UAE, Morocco"
}
```

**Update Structure Count:**
```typescript
// In description or keyFeatures
"300+ structures including 90 lymph node areas"
"Follows 25+ international contouring guidelines"
```

---

## Summary of Key Changes

| Product | Update Type | Details |
|---------|-------------|---------|
| Workspace+ | Image+ module | Add specific AI models (Brain T1, Pelvis T2, CBCT, VNC) |
| Workspace+ | Adapt+ module | Clarify registration methods (rigid, conventional DIR, DL-DIR) |
| Workspace+ | Dose+ module | Add dosePredictionModels array |
| Contour+ | URLs | Update to current website structure |
| Contour+ | Regulatory | Add TGA, Singapore, UAE, Morocco approvals |
| Contour+ | Features | Update to 300+ structures, 25+ guidelines |

---

## Validation

After these updates, the MVision AI products will accurately reflect:
- Current product architecture (Workspace+ platform with modules)
- Specific AI models available in each module
- Complete regulatory status across markets
- Current website URLs


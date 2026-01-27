

# Plan: Revise SyntheticMR Product Data

## Summary of Changes

### 1. Update SyMRI Neuro with Complete Regulatory Details

The existing entry needs the following updates:

| Field | Current | Updated |
|-------|---------|---------|
| FDA clearanceNumber | Not specified | K242745, K233733 |
| FDA productCode | Not specified | LNH |
| FDA regulationNumber | Not specified | 21 CFR 892.1000 |
| CE certificateNumber | Not specified | Add if available |
| market object | Has syntax issue (empty line) | Fix formatting |

### 2. Add SySpine Product (CE-Only)

**Regulatory Status:**
- **CE-marked**: Yes, under MDR (EU 2017/745)
- **FDA**: NOT cleared (510(k) submitted 2020, still pending)

Per the platform's tiered inclusion criteria, SySpine qualifies for inclusion as a **CE-only** product. This is relevant for the European focus of the DLinRT-EU platform.

---

## Files to Modify

| File | Action |
|------|--------|
| `src/data/products/image-synthesis/syntheticmr.ts` | Update SyMRI Neuro regulatory data; add SySpine entry |
| `src/data/companies/specialized-solutions.ts` | Add `syntheticmr-spine` to productIds |

---

## Updated SyMRI Neuro Data

```text
regulatory: {
  ce: {
    status: "Approved",
    class: "IIa",
    type: "Medical Device",
    regulation: "MDR (EU 2017/745)",
    notes: "CE-marked June 2024"
  },
  fda: {
    status: "510(k) Cleared",
    class: "Class II",
    clearanceNumber: "K242745, K233733",
    productCode: "LNH",
    regulationNumber: "21 CFR 892.1000",
    type: "510(k)",
    decisionDate: "2024-12-06",
    notes: "K242745 (Dec 2024) for SyMRI 15; K233733 (Mar 2024) for previous version"
  },
  intendedUseStatement: "SyMRI is intended as a post-processing software for MR images. It provides synthetic MR images and quantitative tissue maps (T1, T2, PD) from a single MR acquisition to support clinical diagnosis."
}
```

---

## New SySpine Product Entry

```text
ID: syntheticmr-spine
Name: SyMRI Spine
Company: SyntheticMR
Category: Image Synthesis
Modality: MRI
Anatomical Location: Spine
Certification: CE (FDA pending)

Key Features:
- Synthetic MR contrasts for spine imaging
- Quantitative tissue mapping (T1, T2, PD)
- Single scan workflow
- Compatible with SyMRI platform

Regulatory:
- CE: Approved, Class IIa, MDR (EU 2017/745)
- FDA: Pending (510(k) submitted November 2020, not yet cleared)

Intended Use: For post-processing of spine MR images to generate synthetic contrasts and quantitative tissue maps.
```

---

## Technical Details

### FDA Clearance History for SyMRI Neuro

| Clearance # | Decision Date | Version | Notes |
|-------------|---------------|---------|-------|
| K242745 | Dec 6, 2024 | SyMRI 15 | Latest version with diagnostic replacement |
| K233733 | Mar 26, 2024 | SyMRI 14 | Previous clearance |

### SySpine FDA Status

SyntheticMR announced their 510(k) submission for SyMRI MSK (including SySpine and SyKnee) in November 2020. As of January 2026, this has not been cleared. The product is marketed as CE-only for clinical use outside the United States.

### Syntax Fix

The current `market` object has a formatting issue (empty line at line 65) that will also be corrected.

---

## Company Registry Update

Update `src/data/companies/specialized-solutions.ts` to include the new product:

```text
"productIds": ["syntheticmr-neuro", "syntheticmr-spine"]
```

---

## Result After Changes

SyntheticMR company page will display **2 products**:
1. **SyMRI Neuro** - Brain MRI synthesis (CE & FDA cleared)
2. **SyMRI Spine** - Spine MRI synthesis (CE-only, FDA pending)


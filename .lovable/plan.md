
# DICOM Format Standardization and Intended Use Statement Audit

## Overview

This plan corrects DICOM format naming inconsistencies across the product database and ensures output formats accurately reflect what products produce. Additionally, it updates intended use statements to match official regulatory documentation.

## Issue 1: DICOM Format Naming Standardization

### Problem
The codebase uses inconsistent DICOM format naming:
- `DICOM RT-STRUCT` (with space) vs `DICOM-RTSTRUCT` (hyphenated)
- `DICOM RT-PLAN` (with space) vs `DICOM-RTPLAN` (hyphenated)
- `DICOM RT-DOSE` (with space) vs `DICOM-RTDOSE` (hyphenated)

### Standard Format (to be used consistently)
| Format | Standard Name |
|--------|---------------|
| Structure sets | `DICOM-RTSTRUCT` |
| Treatment plans | `DICOM-RTPLAN` |
| Dose distributions | `DICOM-RTDOSE` |

### Files to Update

| File | Current | Should Be |
|------|---------|-----------|
| `manteia-mozi.ts` | `DICOM RT-PLAN`, `DICOM RT-DOSE` | `DICOM-RTPLAN`, `DICOM-RTDOSE` |
| `auto-contouring-example.ts` | `DICOM RT-STRUCT`, `DICOM RT-PLAN` | `DICOM-RTSTRUCT`, `DICOM-RTPLAN` |
| `treatment-planning-example.ts` | `DICOM RT-STRUCT`, `DICOM RT-PLAN` | `DICOM-RTSTRUCT`, `DICOM-RTPLAN` |
| `registration-example.ts` | `DICOM RT-STRUCT` | `DICOM-RTSTRUCT` |

---

## Issue 2: Incorrect Output Formats for Treatment Planning Products

### Problem
Several treatment planning products list `DICOM-RTSTRUCT` as their output when they actually produce treatment plans and dose distributions.

### Files to Update

#### 1. `raysearch-planning.ts`
**Current output:** `["Predicted dose distribution", "RT plan", "RT dose"]`
**Current outputFormat:** `["DICOM-RTSTRUCT"]`
**Should be:** `["DICOM-RTPLAN", "DICOM-RTDOSE"]`

#### 2. `md-anderson.ts`
**Current output:** `["Contoured structures", "Treatment plans"]`
**Current outputFormat:** `["DICOM-RTSTRUCT"]`
**Should be:** `["DICOM-RTSTRUCT", "DICOM-RTPLAN"]`

#### 3. `mvision.ts` (platform)
**Current output:** `["Synthetic CT images", "Propagated contours", "Treatment plans", "Dose distributions"]`
**Current outputFormat:** `["DICOM", "DICOM-RTSTRUCT"]`
**Should be:** `["DICOM", "DICOM-RTSTRUCT", "DICOM-RTDOSE"]`

---

## Issue 3: Incorrect Input Formats for Performance Monitor Products

### Problem
Performance monitor products accept RT Plans and RT Dose but only list `DICOM-RTSTRUCT` as input format.

### Files to Update

#### 1. `radformation.ts` (ClearCheck)
**Current input:** `["RT Plans", "RT Structure Sets", "CT Images"]`
**Current inputFormat:** `["DICOM-RTSTRUCT"]`
**Should be:** `["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN"]`

#### 2. `sun-nuclear.ts` (SunCHECK Patient)
**Current input:** `["RT Plans", "RT Structure Sets", "RT Dose", "CT Images"]`
**Current inputFormat:** `["DICOM-RTSTRUCT"]`
**Should be:** `["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN", "DICOM-RTDOSE"]`

#### 3. `varian.ts` (Mobius3D)
**Current input:** `["RT Plans", "RT Structure Sets", "RT Dose", "EPID Images", "CT Images"]`
**Current inputFormat:** `["DICOM-RTSTRUCT"]`
**Should be:** `["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN", "DICOM-RTDOSE"]`

---

## Issue 4: lastRevised Date Updates

All modified files will have their `lastRevised` field updated to `2026-01-28` to reflect this revision.

---

## Summary of Changes

| File | Changes |
|------|---------|
| `treatment-planning/raysearch-planning.ts` | Fix outputFormat: `DICOM-RTPLAN`, `DICOM-RTDOSE`; update `lastRevised` |
| `treatment-planning/md-anderson.ts` | Fix outputFormat: add `DICOM-RTPLAN`; update `lastRevised` |
| `treatment-planning/manteia-mozi.ts` | Standardize format names (remove spaces); update `lastRevised` |
| `platform/mvision.ts` | Fix outputFormat: add `DICOM-RTDOSE`; update `lastRevised` |
| `performance-monitor/radformation.ts` | Fix inputFormat: add `DICOM`, `DICOM-RTPLAN`; update `lastRevised` |
| `performance-monitor/sun-nuclear.ts` | Fix inputFormat: add `DICOM`, `DICOM-RTPLAN`, `DICOM-RTDOSE`; update `lastRevised` |
| `performance-monitor/varian.ts` | Fix inputFormat: add `DICOM`, `DICOM-RTPLAN`, `DICOM-RTDOSE`; update `lastRevised` |
| `examples/auto-contouring-example.ts` | Standardize format names (hyphenated) |
| `examples/treatment-planning-example.ts` | Standardize format names (hyphenated) |
| `examples/registration-example.ts` | Standardize format names (hyphenated) |

---

## Technical Implementation

### Example: raysearch-planning.ts (lines 67-69)

```typescript
// From:
inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
output: ["Predicted dose distribution", "RT plan", "RT dose"],
outputFormat: ["DICOM-RTSTRUCT"]

// To:
inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
output: ["Predicted dose distribution", "RT plan", "RT dose"],
outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE"]
```

### Example: sun-nuclear.ts (lines 38-41)

```typescript
// From:
input: ["RT Plans", "RT Structure Sets", "RT Dose", "CT Images"],
inputFormat: ["DICOM-RTSTRUCT"],
output: ["QA reports", "Quality metrics", "Trend analysis"],

// To:
input: ["RT Plans", "RT Structure Sets", "RT Dose", "CT Images"],
inputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN", "DICOM-RTDOSE"],
output: ["QA reports", "Quality metrics", "Trend analysis"],
```

---

## Intended Use Statement Review

The current intended use statements were reviewed against FDA 510(k) documentation. The following products have statements that could be enhanced with official FDA wording, but this requires fetching the actual 510(k) summary PDFs for verification. The current statements are reasonable paraphrases and can be kept unless official documentation is specifically requested.

Products with FDA-based intended use statements already verified:
- Limbus Contour (K230575)
- MOZI TPS (K223724)
- RayStation (K240398)
- MD Anderson RPA (K222728)

---

## Files Modified Summary

**Total: 10 files**

1. `src/data/products/treatment-planning/raysearch-planning.ts`
2. `src/data/products/treatment-planning/md-anderson.ts`
3. `src/data/products/treatment-planning/manteia-mozi.ts`
4. `src/data/products/platform/mvision.ts`
5. `src/data/products/performance-monitor/radformation.ts`
6. `src/data/products/performance-monitor/sun-nuclear.ts`
7. `src/data/products/performance-monitor/varian.ts`
8. `src/data/products/examples/auto-contouring-example.ts`
9. `src/data/products/examples/treatment-planning-example.ts`
10. `src/data/products/examples/registration-example.ts`

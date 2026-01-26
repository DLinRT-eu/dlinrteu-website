

# Plan: Update AI Medical Jazz with FDA References and Limitations

## Overview

Update the AI Medical Jazz product data with verified FDA 510(k) clearance details (now cleared, not "under review") and add appropriate clinical limitations based on the product's intended use.

---

## Verified Regulatory Information

| Field | Value | Source |
|-------|-------|--------|
| FDA 510(k) Number | K231572 | FDA 510(k) Database |
| Decision Date | 2023-10-23 | FDA 510(k) Database |
| Product Code | LLZ | FDA 510(k) Database |
| Regulation Number | 21 CFR 892.2050 | FDA 510(k) Database |
| Classification | Class II | FDA 510(k) Database |
| CE Class | IIa (MDR) | Already correct |

---

## File to Modify

**File:** `src/data/products/auto-contouring/ai-medical.ts`

---

## Changes

### 1. Update FDA Section (lines 50-53)

**Current:**
```typescript
fda: {
  status: "Under review",
  type: "510(k)"
}
```

**Updated:**
```typescript
fda: {
  status: "510(k) Cleared",
  class: "Class II",
  type: "510(k)",
  clearanceNumber: "K231572",
  productCode: "LLZ",
  regulationNumber: "21 CFR 892.2050",
  decisionDate: "2023-10-23",
  notes: "First FDA-cleared product from AI Medical AG (Swiss medtech startup)"
}
```

### 2. Update Certification Field (line 14)

**Current:**
```typescript
certification: "CE",
```

**Updated:**
```typescript
certification: "CE & FDA",
```

### 3. Add Limitations Array (new field after `clinicalEvidence`)

**Add new field:**
```typescript
limitations: [
  "Indicated for MRI follow-up scans only; not validated for initial diagnostic imaging",
  "Designed as a diagnostic aid for lesion annotation and tracking; does not replace clinical assessment by radiologists or radio-oncologists",
  "Requires PACS integration for volumetric quantification and lesion evolution tracking",
  "Brain lesion tracking only; other anatomical sites not currently supported",
  "Performance may vary with non-standard MRI sequences or protocols"
]
```

### 4. Update Metadata

| Field | Current | Updated |
|-------|---------|---------|
| `lastRevised` | "2025-12-01" | "2026-01-26" |
| `source` | "Automatically retrieved" | "FDA 510(k) database (K231572), company official sources" |

---

## Updated Intended Use Statement

Update to align with FDA clearance language:

**Current:**
```typescript
intendedUseStatement: "For assistance in the delineation of organs at risk and target volumes in radiation therapy planning."
```

**Updated:**
```typescript
intendedUseStatement: "AI-driven radiological software for long-term lesion tracking, quantification, and reporting in MR follow-up scan assessments. Intended to augment clinical assessment by radiologists and radio-oncologists."
```

---

## Summary of Changes

| Section | Change Type |
|---------|-------------|
| `certification` | Update from "CE" to "CE & FDA" |
| `regulatory.fda` | Add clearance number K231572, product code, decision date |
| `regulatory.intendedUseStatement` | Update to match FDA-cleared indication |
| `limitations` | Add new array with 5 clinical/technical limitations |
| `lastRevised` | Update to current date |
| `source` | Update to include FDA database reference |


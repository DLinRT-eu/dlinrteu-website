

# Ever Fortune Seg Pro V3 - FDA 510(k) Clearance with PCCP

## Verification Summary

I verified the FDA 510(k) database entry for K251306:

| Field | Value |
|-------|-------|
| Device Name | Seg Pro V3 (RT-300) |
| Device Classification | Radiological Image Processing Software For **Radiation Therapy** |
| Product Code | QKB (Radiotherapy software) |
| Decision Date | January 28, 2026 |
| PCCP Authorized | Yes |
| Regulation | 892.2050 |

**Conclusion**: This product IS intended for radiotherapy and is appropriate for the database.

---

## Changes Scope (Adapted)

**Removed from original plan**:
- No news item creation
- No special PCCP badge component (fairness to other products)

**Retained**:
- Add Seg Pro V3 as a new product entry
- Add TFDA regulatory field to type system
- Update RegulatoryEditor to support TFDA
- Update RegulatoryInformationDetails to display TFDA
- Document PCCP in the FDA notes field (standard approach, not special treatment)

---

## Implementation Details

### 1. Add TFDA Regulatory Field to Types

**Files**: `src/types/productDetails.d.ts`, `src/types/product.d.ts`

Add Taiwan FDA field to the regulatory object, following the same pattern as TGA:

```typescript
regulatory?: {
  // ... existing ce, fda, tga fields ...
  tfda?: {
    status: string;
    class?: string;
    approvalNumber?: string;
    decisionDate?: string;
    notes?: string;
  };
  // ...
};
```

### 2. Add Seg Pro V3 Product Entry

**File**: `src/data/products/auto-contouring/everfortune.ts`

Add as a second product in the EVERFORTUNE_PRODUCTS array:

| Field | Value |
|-------|-------|
| id | `everfortune-seg-pro-v3` |
| name | Seg Pro V3 (RT-300) |
| company | Ever Fortune AI |
| category | Auto-Contouring |
| certification | CE & FDA |
| anatomicalLocation | Head & Neck, Thorax, Abdomen, Pelvis |
| modality | CT, MRI |

**Key Features**:
- Supports 182 organs across 4 anatomical regions
- Full CT and MRI imaging compatibility
- Reduces contouring time significantly
- First radiotherapy software with FDA PCCP authorization

**Regulatory Information**:
```typescript
regulatory: {
  ce: {
    status: "Certified",
    class: "IIa",
    type: "MDR"
  },
  fda: {
    status: "510(k) Cleared",
    class: "Class II",
    type: "510(k) with PCCP",
    clearanceNumber: "K251306",
    productCode: "QKB",
    decisionDate: "2026-01-28",
    notes: "First radiotherapy software (QKB) with Predetermined Change Control Plan (PCCP). PCCP allows model updates under predetermined protocols without re-submission."
  },
  tfda: {
    status: "Approved",
    notes: "Taiwan FDA clearance"
  },
  intendedUseStatement: "Seg Pro V3 is intended for automatic segmentation of anatomical structures from radiological images for radiation therapy planning."
}
```

**Supported Structures**:
Include structures organized by region (Head & Neck, Thorax, Abdomen, Pelvis) using the standard naming convention already used in the codebase.

**Evidence Links**:
- FDA 510(k) database entry (K251306)
- Company product page

### 3. Update RegulatoryEditor Component

**File**: `src/components/product-editor/FieldEditors/RegulatoryEditor.tsx`

Add a new collapsible section for TFDA, following the exact same pattern as the TGA section:
- Status dropdown
- Notes textarea
- Approval number field
- Decision date field

### 4. Update RegulatoryInformationDetails Component

**File**: `src/components/product/RegulatoryInformationDetails.tsx`

Add TFDA display section in the regulatory information card, following the same pattern as the TGA section if one exists, otherwise adding a new section.

---

## Files to Modify

| File | Change Type |
|------|-------------|
| `src/types/productDetails.d.ts` | Add TFDA field |
| `src/types/product.d.ts` | Add TFDA field |
| `src/data/products/auto-contouring/everfortune.ts` | Add Seg Pro V3 product |
| `src/components/product-editor/FieldEditors/RegulatoryEditor.tsx` | Add TFDA editing section |
| `src/components/product/RegulatoryInformationDetails.tsx` | Add TFDA display section |

---

## Data Quality Notes

**Verified from official FDA database**:
- Clearance number: K251306
- Decision date: January 28, 2026
- PCCP authorization: Yes
- Product code: QKB (Radiotherapy)

**Unverified (from announcement)**:
- 182 organs count (will note as "company-stated")
- CE class and TFDA status (will document as from company announcement)
- Specific intended use statement (PDF not yet published)

---

## PCCP Explanation (in FDA notes field)

The PCCP information will be documented in the standard `regulatory.fda.notes` field:

> "First radiotherapy software (QKB) with Predetermined Change Control Plan (PCCP). PCCP allows model updates under predetermined protocols without re-submission."

This provides the educational value without creating a special visual distinction that would be unfair to other products.


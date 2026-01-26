
# Plan: Remove Invalid "Advanced Visualization with AI" Entry

## Audit Findings

The product **"Advanced Visualization with AI"** (id: `canon-advanced-vis-ai`) has been audited and found to be **not a verified standalone product**.

### Evidence

| Issue | Finding |
|-------|---------|
| FDA Clearance | No specific 510(k) exists for "Advanced Visualization with AI" as a distinct product |
| Product Identity | This describes capabilities of the Vitrea platform (PACS/visualization software), not a standalone AI enhancement algorithm |
| Vitrea Platform | Vitrea is cleared under Product Code LMD (Digital Image Communications System) - it's a visualization platform, not an AI enhancement engine |
| Overlap | AI capabilities mentioned (noise reduction, deep learning) are already properly covered by verified Canon products: AiCE CT (K181862), AiCE MR (K192574), PIQE (K243335) |
| Category Error | Listed as "Image Enhancement" but Vitrea is a multi-dimensional image visualization/PACS platform |
| Source | Entry lists "Company website" but no official Canon product page exists for "Advanced Visualization with AI" as a standalone offering |

### Verified Canon AI Products (Already in Database)

| Product | Category | FDA Clearance | Modality | Status |
|---------|----------|---------------|----------|--------|
| AiCE CT | Reconstruction | K181862 (2019-01-15) | CT | Properly tracked |
| AiCE MR | Reconstruction | K192574 (2019-12-20) | MRI | Properly tracked |
| PIQE | Reconstruction | K243335 | MRI | Properly tracked |

---

## Recommended Action: Remove Invalid Entry

### Files to Modify

#### 1. Delete Product File
**File:** `src/data/products/image-enhancement/canon.ts`

Action: **Delete entire file**

#### 2. Update Index File
**File:** `src/data/products/image-enhancement/index.ts`

Remove import and spread:
```typescript
// Remove line 7:
import { CANON_PRODUCTS } from "./canon";

// Remove from array (line 21):
...CANON_PRODUCTS,
```

#### 3. Update Company Product List
**File:** `src/data/companies/medical-imaging.ts`

Remove from Canon Medical productIds array (line 62):
```typescript
// Remove:
"canon-advanced-vis-ai"
```

**Updated Canon productIds:**
```typescript
"productIds": [
  "canon-aice-ct", 
  "canon-aice-mr",
  "canon-piqe"
]
```

---

## Summary of All Changes

| File | Action |
|------|--------|
| `src/data/products/image-enhancement/canon.ts` | Delete file |
| `src/data/products/image-enhancement/index.ts` | Remove import and array spread |
| `src/data/companies/medical-imaging.ts` | Remove product ID from Canon list |

---

## Impact

- Total product count decreases by 1
- Canon product count decreases from 4 to 3
- Data quality improves by removing unverified/platform-level entry
- No loss of legitimate AI functionality (all verified Canon AI products remain: AiCE CT, AiCE MR, PIQE)
- Image Enhancement category remains populated with other verified products (Philips SmartDose, GE, Siemens, etc.)

---

## Technical Notes

The Vitrea Advanced Visualization platform (K032748, K223261, K222662) is a legitimate FDA-cleared product, but it is:
1. A PACS/visualization platform (Product Code LMD), not an AI enhancement algorithm
2. Not appropriate for the "Image Enhancement" category in this database
3. Already represented indirectly through the AiCE/PIQE products which integrate with Vitrea

If future tracking of visualization platforms is desired, a separate "Platform" category entry for Vitrea could be considered with proper clearance documentation.

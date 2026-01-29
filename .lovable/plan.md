
# MRIdian A3i Product Audit: Major Issues Found

## Critical Finding: NOT an AI Product

After extensive research of FDA 510(k) documents, peer-reviewed technical papers, and the official ViewRay website, I've determined that **MRIdian A3i should NOT be listed as an AI/Deep Learning product**.
ARCHIVE the PRODUCT! So option A

### Evidence Summary

| Claim | Reality | Source |
|-------|---------|--------|
| "AI-powered auto-contouring" | Uses **deformable image registration** (classical algorithm) | PMC6630153 technical paper |
| Deep learning technology | **No AI/DL mentioned** in any FDA clearance | FDA K162393, K181989 |
| "37+ structures" AI segmentation | Contour **propagation** via deformable registration | ViewRay technical documentation |

The "auto-contouring" functionality works by:
1. Taking initial contours from the planning image
2. Applying rigid or **deformable registration** to the daily MR scan
3. Propagating contours to the new anatomy

This is classic image processing, not artificial intelligence or deep learning.

---

## Recommended Actions

### Option A: Archive Product (Recommended)

Since this database specifically tracks **AI/Deep Learning products in radiotherapy**, and MRIdian A3i does not use AI/DL technology:

1. Move the product to the archived folder (`src/data/products/archived/`)
2. Update the ViewRay company entry to reflect zero active AI products
3. Document the reason: "Product uses deformable registration, not AI/DL technology"

### Option B: Reclassify as Non-AI (Alternative)

If we want to keep it visible for reference:

1. Add `usesAI: false` to the product
2. Change category to "Tracking" (its real function) instead of "Auto-Contouring"
3. Update description to remove AI claims
4. Add notes explaining the deformable registration technology

---

## Data Corrections Required

Regardless of archiving decision, these corrections are needed:

### 1. FDA Clearance Number (CRITICAL ERROR)

**Current (WRONG):** K212274
**Reason:** This is actually for Carina Medical's INT Contour product!

**Correct clearances for ViewRay MRIdian:**
- K162393 (February 2017) - MRIdian Linac System
- K181989 (February 2019) - MRIdian Linac System update
- A3i features - needs verification of specific clearance number

### 2. Website URLs (Outdated)

**Current:**
- companyUrl: "https://www.viewray.com/"
- productUrl: "https://www.viewray.com/mridian/"

**Correct:**
- companyUrl: "https://viewraysystems.com/"
- productUrl: "https://viewraysystems.com/mridian-a3i/"

### 3. Intended Use Statement

**Current:** "For MRI-guided radiation therapy with real-time adaptive capabilities."

**Correct (from FDA K162393):**
"The ViewRay (MRIdian) Linac system, with magnetic resonance imaging capabilities, is intended to provide stereotactic radiosurgery and precision radiotherapy for lesions, tumors, and conditions anywhere in the body where radiation treatment is indicated."

### 4. Description Corrections

**Current:** Claims "AI-powered auto-contouring"

**Corrected (if keeping):**
"MRI-guided radiotherapy system with deformable registration-based contour propagation, on-table adaptive replanning (Auto-Adapt), and real-time tissue tracking with automatic beam gating (Auto-Gating)."

### 5. Key Features Corrections

Remove AI-related claims:
- ~~"AI-powered auto-contouring (37+ structures)"~~
- Replace with: "Deformable registration-based contour propagation"

### 6. Company File Updates

**File:** `src/data/companies/radiotherapy-equipment.ts`

Update ViewRay description and website:
- Remove "AI-powered" from description
- Update website to "https://viewraysystems.com/"

---

## Technical Implementation

### If Archiving (Option A):

1. Create `src/data/products/archived/viewray.ts` with archived product
2. Remove ViewRay from `src/data/products/auto-contouring/viewray.ts`
3. Update company file to remove productIds or archive company

### If Keeping as Non-AI (Option B):

**File changes:**

```text
src/data/products/auto-contouring/viewray.ts
```

- Add `usesAI: false`
- Change `category` to "Tracking"
- Fix all URLs, FDA info, and descriptions

```text
src/data/companies/radiotherapy-equipment.ts
```

- Update ViewRay website URL
- Update description to remove AI claims

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/products/auto-contouring/viewray.ts` | Archive or update with corrections |
| `src/data/companies/radiotherapy-equipment.ts` | Update website URL and description |
| `src/data/products/archived/viewray.ts` | Create if archiving |

---

## Decision Needed

Before proceeding, please confirm:

1. **Archive** the product (removes from public display, preserves data) - Recommended for database integrity
2. **Reclassify** as non-AI tracking product (keeps visible with corrections)

The database memory notes indicate non-AI products have been archived previously to maintain the focus on AI/Deep Learning products in radiotherapy.

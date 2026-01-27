
# Plan: Revise Subtle Medical Products

## Summary of FDA-Cleared Subtle Medical Products

Based on FDA database research, Subtle Medical has **4 FDA-cleared products** (not 2 as currently in the database):

| Product | Clearance # | Decision Date | Status in Database |
|---------|-------------|---------------|-------------------|
| **SubtlePET** | K182336, K211964 | Nov 2018, Sep 2021 | Exists (needs update) |
| **SubtleMR** | K191688, K223623 | Aug 2019, May 2023 | Exists (needs update) |
| **AiMIFY** | K240290 | Aug 21, 2024 | **MISSING** |
| **SubtleHD** | K243250 | Feb 12, 2025 | **MISSING** |
| SubtleGAD | None | N/A | Should be removed (Research Only) |

---

## Recommended Changes

### 1. Remove SubtleGAD (Research Use Only)

Per the platform's tiered inclusion strategy, research-only products without regulatory clearance should not be in the main database. SubtleGAD has no FDA 510(k) clearance and is explicitly labeled "Research Use Only."

**Action:** Delete `src/data/products/image-enhancement/subtle-medical-gad.ts` and remove its import from the index.

---

### 2. Update SubtleMR with Latest FDA Clearance

**Current:** K191688 (2019)
**Latest:** K223623 (May 11, 2023) - Version 2.3.x

Updates needed:
- Add latest clearance number K223623
- Update decision date to 2023-05-11
- Fix `market` object formatting (remove empty line)
- Update intended use statement with FDA-verified text

---

### 3. Update SubtlePET with Latest FDA Clearance

**Current:** K182336 (2018)
**Latest:** K211964 (September 28, 2021) - Version 2.0

Updates needed:
- Add latest clearance number K211964
- Update product codes to "KPS, LLZ"
- Expand supported radiotracers (FDG, amyloid, 18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, Ga-68 PSMA)
- Fix `market` object formatting

---

### 4. Add AiMIFY (NEW PRODUCT)

**FDA Clearance:** K240290 (August 21, 2024)

AiMIFY is a distinct product from SubtleMR focused on **contrast enhancement** rather than noise reduction:
- Enhances gadolinium-based contrast agent (GBCA) images
- Improves CNR, contrast enhancement, and lesion-to-brain ratio
- Uses pre- and post-contrast T1 MRI as input
- Specifically for brain MRI with contrast

---

### 5. Add SubtleHD (NEW PRODUCT)

**FDA Clearance:** K243250 (February 12, 2025)

SubtleHD is a general-purpose MRI enhancement tool:
- Works on all body parts MRI images
- Noise reduction and sharpness enhancement
- Product code QIH (different from SubtleMR's LLZ)

---

## Files to Modify

| File | Action |
|------|--------|
| `src/data/products/image-enhancement/subtle-medical.ts` | Update SubtleMR and SubtlePET with latest FDA data; add AiMIFY and SubtleHD entries |
| `src/data/products/image-enhancement/subtle-medical-gad.ts` | Delete file |
| `src/data/products/image-enhancement/index.ts` | Remove SubtleGAD import |

---

## Detailed Product Data

### AiMIFY (NEW)

```text
ID: aimify
Name: AiMIFY
Category: Image Enhancement
Modality: MRI
Anatomical Location: Brain
FDA: K240290 (Class II, LLZ, 21 CFR 892.2050, August 21, 2024)
Key Features:
- Deep learning contrast enhancement
- Improves CNR, contrast enhancement, and lesion-to-brain ratio
- Uses standard-dose GBCA acquisitions
- Works with gradient echo, 3D BRAVO, 3D MPRAGE, 2D T1 spin echo, T1 FLAIR
Intended Use: "AiMIFY is an image processing software that can be used for image enhancement in MRI images. It can be used to increase contrast-to-noise ratio (CNR), contrast enhancement (CEP), and lesion-to-brain ratio (LBR) of enhancing tissue in brain MRI images acquired with a gadolinium-based contrast agent."
```

### SubtleHD (NEW)

```text
ID: subtle-hd
Name: SubtleHD
Category: Image Enhancement
Modality: MRI
Anatomical Location: All body parts
FDA: K243250 (Class II, QIH, 21 CFR 892.2050, February 12, 2025)
Key Features:
- Noise reduction for all body MRI
- Image sharpness enhancement
- Vendor-neutral compatibility
- General-purpose MRI enhancement
Intended Use: "SubtleHD is an image processing software that can be used for image enhancement of all body parts MRI images. It can be used for noise reduction and increasing image sharpness."
```

### SubtleMR (UPDATED)

```text
Updates:
- clearanceNumber: "K191688, K223623"
- decisionDate: "2023-05-11" (latest clearance)
- version: "2.3.x"
- intendedUseStatement: FDA-verified text from K223623
```

### SubtlePET (UPDATED)

```text
Updates:
- clearanceNumber: "K182336, K211964"
- decisionDate: "2021-09-28" (latest clearance)
- version: "2.0"
- Add expanded radiotracer support in key features
- intendedUseStatement: FDA-verified text including all radiotracers
```

---

## Technical Notes

### Product Differentiation

| Product | Purpose | Input | Body Region |
|---------|---------|-------|-------------|
| SubtleMR | Noise reduction, faster scans | Standard MRI | All body parts |
| SubtleHD | Noise reduction, sharpness | Standard MRI | All body parts |
| SubtlePET | Noise reduction, dose reduction | PET images | Whole body |
| AiMIFY | Contrast enhancement | Pre+Post contrast MRI | Brain only |

SubtleMR and SubtleHD appear similar but have different product codes (LLZ vs QIH), suggesting different regulatory classifications or intended uses. SubtleHD (cleared Feb 2025) may be a newer generation or rebranded version.

### SubtleGAD vs AiMIFY

The current SubtleGAD entry describes "synthetic contrast from zero-dose" which is NOT what AiMIFY does. AiMIFY enhances **standard-dose** contrast images - it does not synthesize contrast from non-contrast scans. These are fundamentally different products:
- SubtleGAD: Research-only synthetic contrast generation
- AiMIFY: FDA-cleared contrast enhancement of existing GBCA images

---

## Summary

After this revision, Subtle Medical will have **4 FDA-cleared products** in the database:
1. SubtlePET (PET enhancement)
2. SubtleMR (MRI noise reduction)
3. AiMIFY (MRI contrast enhancement)
4. SubtleHD (MRI general enhancement)

SubtleGAD will be removed as it lacks FDA clearance and is research-only.



# Product Database Audit: FDA Clearance Updates and Missing Products

## Summary

Cross-referencing the database against the complete FDA QKB (Radiological Image Processing Software for Radiation Therapy) product code registry reveals **3 outdated clearance numbers** and **4 missing products**. The user selected "Update FDA clearances" as the priority, with minimal entries for low-info products.

---

## Part 1: Update Existing FDA Clearance Numbers

### 1a. Radformation AutoContour -- V3 to V4

**File:** `src/data/products/auto-contouring/radformation.ts`

| Field | Current | Updated |
|-------|---------|---------|
| clearanceNumber | K230685 | K242729 |
| decisionDate | 2023-04-14 | ~2024 (V4) |
| notes | (reference to Limbus) | Add "Previous clearances: K230685 (V3, 2023), K220598 (V2), K200323 (V1)" |
| version | 2.6 | 4.0 |

### 1b. Limbus Contour -- New clearance under Radformation

**File:** `src/data/products/auto-contouring/limbus.ts`

| Field | Current | Updated |
|-------|---------|---------|
| clearanceNumber | K230575 | K241837 |
| decisionDate | 2023-04-07 | ~2024 |
| notes | (none) | "Previous clearance: K230575 (2023). Now distributed by Radformation." |

### 1c. GE iRT Platform -- Correct MR Contour DL reference

**File:** `src/data/products/platform/ge-healthcare.ts`

The iRT platform references `K213717` for MR Contour DL, but the correct/latest clearance is `K242925` (April 2025). Update the `fda.notes` field.

---

## Part 2: Add Missing Products (Minimal Entries)

### 2a. GE Healthcare MR Contour DL (standalone entry)

**New file:** `src/data/products/auto-contouring/ge-mr-contour-dl.ts`

Currently MR Contour DL is only mentioned in notes inside `ge-healthcare.ts` and the iRT platform. It deserves its own product entry as a standalone FDA-cleared auto-contouring device:

- **Company:** GE Healthcare
- **Category:** Auto-Contouring
- **FDA:** K242925 (April 1, 2025), QKB, Class II
- **Modality:** MRI
- **Anatomy:** Head and Neck, Pelvis
- **Structures:** 37+ organs (from FDA clearance documentation)
- **Certification:** CE and FDA

Update `src/data/products/auto-contouring/index.ts` to import and include it.
Update `src/data/companies/medical-imaging.ts` to add the product ID to GE Healthcare's `productIds`.

### 2b. QOCA Smart RT Contouring System

**New file:** `src/data/products/auto-contouring/qoca.ts`

- **Company:** Quanta Computer, Inc. (Taiwan)
- **Product:** QOCA image Smart RT Contouring System
- **FDA:** K231855 (Feb 12, 2024), QKB, Class II
- **Category:** Auto-Contouring
- **Certification:** FDA (minimal -- mark as needing further research)

Add new company entry to `src/data/companies/medical-imaging.ts` for Quanta Computer.
Update `src/data/products/auto-contouring/index.ts`.

### 2c. RT-Mind-AI (MedMind Technology)

**New file:** `src/data/products/auto-contouring/medmind.ts`

- **Company:** MedMind Technology Co., Ltd. (China)
- **Product:** RT-Mind-AI
- **FDA:** K213155 (cleared ~2022), QKB, Class II
- **Category:** Auto-Contouring
- **Certification:** FDA (minimal entry)

Add new company entry to `src/data/companies/specialized-solutions.ts`.
Update `src/data/products/auto-contouring/index.ts`.

### 2d. AATMA (Advanced Algorithms for Treatment Management Applications)

**New file:** `src/data/products/auto-contouring/aatma.ts`

- **FDA:** K212218, QKB, Class II
- **Category:** Auto-Contouring
- **Certification:** FDA (minimal entry -- limited public documentation)

Add company entry and update index.

---

## Part 3: File Changes Summary

| File | Action |
|------|--------|
| `src/data/products/auto-contouring/radformation.ts` | Update FDA clearance to K242729 (V4) |
| `src/data/products/auto-contouring/limbus.ts` | Update FDA clearance to K241837 |
| `src/data/products/platform/ge-healthcare.ts` | Fix MR Contour DL reference K213717 to K242925 |
| `src/data/products/auto-contouring/ge-mr-contour-dl.ts` | **New** -- GE MR Contour DL standalone entry |
| `src/data/products/auto-contouring/qoca.ts` | **New** -- QOCA Smart RT |
| `src/data/products/auto-contouring/medmind.ts` | **New** -- RT-Mind-AI |
| `src/data/products/auto-contouring/aatma.ts` | **New** -- AATMA |
| `src/data/products/auto-contouring/index.ts` | Import and include 4 new product arrays |
| `src/data/companies/medical-imaging.ts` | Add GE MR Contour DL product ID; add Quanta Computer entry |
| `src/data/companies/specialized-solutions.ts` | Add MedMind Technology and AATMA company entries |

## Notes

- All new minimal entries will include `lastRevised: "2026-02-26"`, `source` field citing the FDA 510(k) database, and a limitation note indicating the entry needs further research/verification.
- The ARTAssistant (K250780) is very recent and may not have enough public data yet -- it can be added in a follow-up audit.
- Existing products that were already up to date (MVision Contour+, Ever Fortune Seg Pro V3, Therapanacea Annotate, etc.) require no changes.


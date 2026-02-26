

# Verify and Update Evidence for E2/E3 Products via PubMed Search

## Overview

Search PubMed and Google Scholar for recent publications citing each of the ~30 products rated E2 or higher, verify existing evidence claims, and add any new publications found. The expandable evidence UI (show top 3, collapse rest) is already implemented from the previous task.

## Products to Search (E2 and E3)

### E3 Products (highest priority -- verify strong claims)

| # | Product | Company | File | Notes |
|---|---------|---------|------|-------|
| 1 | AIR Recon DL (MR) | GE Healthcare | reconstruction/ge-healthcare.ts | Claims 30+ publications, E3 |
| 2 | Deep Resolve (MR) | Siemens | reconstruction/siemens.ts | E3 |
| 3 | AI-Rad Companion ORT | Siemens | auto-contouring/siemens.ts | E3, independent eval |
| 4 | OncoStudio | Oncosoft/Anzai | auto-contouring/oncosoft.ts | E3, single study link is LinkedIn |
| 5 | RapidPlan | MD Anderson/Varian | treatment-planning/md-anderson.ts | E3/I4 |

### E2 Auto-Contouring Products

| # | Product | Company | File |
|---|---------|---------|------|
| 6 | RT-Mind-AI | MedMind | auto-contouring/medmind.ts |
| 7 | Annotate | Therapanacea | auto-contouring/therapanacea.ts |
| 8 | AccuContour | Manteia | auto-contouring/manteia.ts |
| 9 | MVision AI Contour+ | MVision AI | auto-contouring/mvision.ts |
| 10 | AutoContour | Radformation | auto-contouring/radformation.ts |
| 11 | RayStation ML Segmentation | RaySearch | auto-contouring/raysearch.ts |
| 12 | Limbus Contour | Limbus AI | auto-contouring/limbus.ts |
| 13 | ProtegeAI | MIM Software | auto-contouring/mim-software.ts |
| 14 | AVIEW RT ACS | Coreline | auto-contouring/coreline.ts |
| 15 | Carina AI | Carina Medical | auto-contouring/carina.ts |
| 16 | AI-Medical | AI Medical | auto-contouring/ai-medical.ts |
| 17 | DirectORGANS | Siemens | auto-contouring/directorgans.ts |
| 18 | DLCExpert | Mirada | auto-contouring/mirada.ts |

### E2 Reconstruction Products

| # | Product | Company | File |
|---|---------|---------|------|
| 19 | TrueFidelity | GE Healthcare | reconstruction/ge-healthcare.ts |
| 20 | AiCE CT | Canon | reconstruction/canon.ts |
| 21 | Precise Image | Philips | reconstruction/philips.ts |
| 22 | SmartSpeed (MR) | Philips | reconstruction/philips.ts |

### E2 Image Enhancement Products

| # | Product | Company | File |
|---|---------|---------|------|
| 23 | SubtleMR | Subtle Medical | image-enhancement/subtle-medical.ts |
| 24 | SubtlePET | Subtle Medical | image-enhancement/subtle-medical.ts |
| 25 | SwiftMR | AIRS Medical | image-enhancement/airs-medical.ts |
| 26 | PixelShine | Algomedica | image-enhancement/algomedica.ts |
| 27 | ClariCT.AI | ClariPI | image-enhancement/claripi.ts |
| 28 | AIR Recon DL (Image Enh.) | GE Healthcare | image-enhancement/ge-healthcare.ts |

### E2 Treatment Planning / Tracking / Performance

| # | Product | Company | File |
|---|---------|---------|------|
| 29 | RayStation ML Dose Prediction | RaySearch | treatment-planning/raysearch-planning.ts |
| 30 | Oncospace | Sun Nuclear | treatment-planning/sun-nuclear.ts |
| 31 | Synchrony | Accuray | tracking/accuray.ts |
| 32 | PerFRACTION / SunCHECK | Sun Nuclear/Varian | performance-monitor/varian.ts |

## Search Strategy

For each product:
1. Search PubMed: `"[product name]" OR "[company name]" AND radiotherapy/radiology`
2. Search Google Scholar for recent (2024-2026) citing papers
3. Check company websites for newly published studies
4. Cross-reference existing evidence entries with actual DOI links

## Update Rules

- **Add new publications**: Append to `evidence` array, ordered by relevance (independent multi-center first)
- **Upgrade E2 to E3**: If multiple independent multi-center/multi-national studies with prospective design found
- **Fix broken/weak links**: Replace LinkedIn or non-DOI links with actual publication DOIs where possible (e.g., OncoStudio)
- **Update study quality flags**: `evidenceMultiCenter`, `evidenceVendorIndependent`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation`
- **Update notes**: Refresh `evidenceRigorNotes` and `clinicalImpactNotes` with new findings
- **No downgrade**: If existing evidence can't be verified via PubMed, note "unable to verify" but don't downgrade without clear reason

## Implementation Approach

Process products in batches by category:
1. **Batch 1**: E3 products (5 products) -- highest priority verification
2. **Batch 2**: E2 auto-contouring (13 products)
3. **Batch 3**: E2 reconstruction + image enhancement (10 products)
4. **Batch 4**: E2 treatment planning, tracking, performance (4 products)

Each batch updates evidence arrays, rigor levels/notes, and quality flags in the corresponding product data files.

## Files Modified

~20-30 product data files in `src/data/products/` across all categories. No UI changes needed (expandable evidence UI already implemented).


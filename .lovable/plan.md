

# Audit and Fill Study Quality Sub-Attributes for All Products

## Overview

After reviewing all product data files across all categories, this plan adds the 5 optional study quality boolean fields (`evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation`) to every product that has sufficient evidence data to make a determination.

Products with E0 (no evidence) are excluded -- the fields remain undefined (meaning "not assessed"). Products with E1+ have been audited against their cited studies and evidence notes.

## Audit Results Summary

| Attribute | Products with TRUE | Notes |
|-----------|-------------------|-------|
| vendorIndependent | 22 products | At least one study conducted by non-vendor authors |
| multiCenter | 14 products | Evidence from 3+ clinical sites |
| multiNational | 10 products | Data from multiple countries |
| prospective | 3 products | At least one prospective study design |
| externalValidation | 16 products | Validated on external (non-training) dataset |

## Files to Modify (37 files)

### Auto-Contouring (14 files)

**1. `src/data/products/auto-contouring/ge-healthcare.ts`** (GE Auto Segmentation)
- `evidenceVendorIndependent: false` (vendor FDA validation)
- `evidenceMultiCenter: true` (9 global sites)
- `evidenceMultiNational: true` (global sites)
- `evidenceProspective: false` (retrospective)
- `evidenceExternalValidation: true` (multi-site data)

**2. `src/data/products/auto-contouring/limbus.ts`** (Limbus Contour)
- `evidenceVendorIndependent: true` (Starke et al. BJR 2024)
- `evidenceMultiCenter: true` (Canada and UK institutions)
- `evidenceMultiNational: true` (Canada and UK)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**3. `src/data/products/auto-contouring/manteia.ts`** (AccuContour)
- `evidenceVendorIndependent: true` (Front Oncol 2024 multi-center comparison)
- `evidenceMultiCenter: true` (multi-center H&N validation)
- `evidenceMultiNational: false` (not confirmed)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**4. `src/data/products/auto-contouring/mim-software.ts`** (Contour ProtegeAI+)
- `evidenceVendorIndependent: true` (Front Oncol 2024)
- `evidenceMultiCenter: true` (multi-center comparison)
- `evidenceMultiNational: false` (not confirmed)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**5. `src/data/products/auto-contouring/mirada.ts`** (DLC Expert)
- `evidenceVendorIndependent: true` (Doolan et al. 2023)
- `evidenceMultiCenter: true` (multi-center 5-system comparison)
- `evidenceMultiNational: false` (not confirmed)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**6. `src/data/products/auto-contouring/mvision.ts`** (Contour+)
- `evidenceVendorIndependent: true` (Doolan et al. 2023, Langmack 2024)
- `evidenceMultiCenter: true` (17 clinics)
- `evidenceMultiNational: true` (12 countries)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**7. `src/data/products/auto-contouring/oncosoft.ts`** (OncoStudio)
- `evidenceVendorIndependent: true` (Tokyo Medical University)
- `evidenceMultiCenter: false` (single-center)
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**8. `src/data/products/auto-contouring/radformation.ts`** (AutoContour)
- `evidenceVendorIndependent: true` (Doolan et al. 2023)
- `evidenceMultiCenter: true` (multi-center 5-system comparison)
- `evidenceMultiNational: false` (not confirmed)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**9. `src/data/products/auto-contouring/raysearch.ts`** (DLS)
- `evidenceVendorIndependent: true` (Doolan et al. 2023)
- `evidenceMultiCenter: true` (multi-center comparison)
- `evidenceMultiNational: false` (not confirmed)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**10. `src/data/products/auto-contouring/siemens.ts`** (AI-Rad Companion)
- `evidenceVendorIndependent: true` (Tchistiakova et al. 2023 SUNY)
- `evidenceMultiCenter: true` (579 cases, 5 continents)
- `evidenceMultiNational: true` (5 continents)
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**11. `src/data/products/auto-contouring/therapanacea.ts`** (Annotate)
- `evidenceVendorIndependent: true` (Doolan et al. 2023, Young et al. 2024)
- `evidenceMultiCenter: true` (multi-center comparison)
- `evidenceMultiNational: true` (multiple countries)
- `evidenceProspective: true` (Gregoire et al. 2020 blinded prospective)
- `evidenceExternalValidation: true`

**12. `src/data/products/auto-contouring/vysioner.ts`** (VBrain)
- `evidenceVendorIndependent: true` (Wang et al. 2023)
- `evidenceMultiCenter: false` (single-center)
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**13. `src/data/products/auto-contouring/carina.ts`** (INTContour)
- `evidenceVendorIndependent: true` (Kibudde et al. 2024)
- `evidenceMultiCenter: false` (not confirmed 3+ sites)
- `evidenceMultiNational: true` (LMICs, multiple countries)
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**14. `src/data/products/auto-contouring/ai-medical.ts`** (Jazz)
- `evidenceVendorIndependent: false` (not confirmed independent)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

### Products with E1 and all-false sub-attributes (11 files)

These all get all 5 fields set to `false`:

- `src/data/products/auto-contouring/brainlab.ts` (both products)
- `src/data/products/auto-contouring/coreline.ts`
- `src/data/products/auto-contouring/directorgans.ts`
- `src/data/products/auto-contouring/everfortune.ts` (Seg Pro V3 only; RT Suite v1 is E0)
- `src/data/products/auto-contouring/taiwan-medical-imaging.ts`
- `src/data/products/image-enhancement/algomedica.ts`
- `src/data/products/image-enhancement/ge-healthcare.ts` (Precision DL only)
- `src/data/products/image-enhancement/philips-smartdose.ts`
- `src/data/products/image-enhancement/siemens.ts`
- `src/data/products/reconstruction/canon.ts` (AiCE MR only)
- `src/data/products/reconstruction/elekta.ts`
- `src/data/products/reconstruction/philips.ts` (Precise Image only)
- `src/data/products/registration/pymedix.ts`
- `src/data/products/registration/therapanacea.ts`
- `src/data/products/treatment-planning/manteia-mozi.ts`
- `src/data/products/performance-monitor/radformation.ts`
- `src/data/products/performance-monitor/sun-nuclear.ts`
- `src/data/products/platform/mvision.ts`

### Image Enhancement (4 files with TRUE values)

**15. `src/data/products/image-enhancement/claripi.ts`** (ClariCT.AI)
- `evidenceVendorIndependent: true` (Kim et al. Eur Radiol 2020)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**16. `src/data/products/image-enhancement/airs-medical.ts`** (SwiftMR)
- `evidenceVendorIndependent: false` (unclear independence)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**17. `src/data/products/image-enhancement/subtle-medical.ts`** (SubtleMR, SubtlePET)
- SubtleMR: all false (unclear independence)
- SubtlePET: `evidenceVendorIndependent: true` (Katsari et al. 2021), rest false

### Reconstruction (5 files with TRUE values)

**18. `src/data/products/reconstruction/canon.ts`** (AiCE CT)
- `evidenceVendorIndependent: true` (Higaki et al. university study)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**19. `src/data/products/reconstruction/ge-healthcare.ts`** (TrueFidelity Pro, AIR Recon DL)
- TrueFidelity Pro: `evidenceVendorIndependent: true` (Greffier et al.), rest false
- AIR Recon DL: `evidenceVendorIndependent: true`, `evidenceMultiCenter: true`, `evidenceMultiNational: true`, `evidenceProspective: true` (prospective reader studies), `evidenceExternalValidation: true`

**20. `src/data/products/reconstruction/siemens.ts`** (Deep Resolve)
- `evidenceVendorIndependent: true` (Bash et al. 2025)
- `evidenceMultiCenter: true`
- `evidenceMultiNational: true`
- `evidenceProspective: false`
- `evidenceExternalValidation: true`

**21. `src/data/products/reconstruction/philips.ts`** (SmartSpeed)
- `evidenceVendorIndependent: true` (Bonn University)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

### Tracking (1 file)

**22. `src/data/products/tracking/accuray.ts`** (Synchrony)
- `evidenceVendorIndependent: false` (Pepin et al. unclear independence)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

### Treatment Planning (2 files with TRUE values)

**23. `src/data/products/treatment-planning/md-anderson.ts`** (RPA)
- `evidenceVendorIndependent: true` (academic center product)
- `evidenceMultiCenter: true` (LMIC deployment)
- `evidenceMultiNational: true` (global LMICs)
- `evidenceProspective: true` (clinical deployment study)
- `evidenceExternalValidation: true`

**24. `src/data/products/treatment-planning/sun-nuclear.ts`** (Plan AI)
- `evidenceVendorIndependent: false` (Hopkins collaboration)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

**25. `src/data/products/treatment-planning/raysearch-planning.ts`** (DL Dose Prediction)
- `evidenceVendorIndependent: false` (unclear independence)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

### Performance Monitor (1 file with TRUE values)

**26. `src/data/products/performance-monitor/varian.ts`** (Mobius3D)
- `evidenceVendorIndependent: true` (Czarnecki et al. 2018)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

### Image Enhancement GE (AIR Recon DL Enhancement Mode)

**27. `src/data/products/image-enhancement/ge-healthcare.ts`** (AIR Recon DL Enhancement)
- `evidenceVendorIndependent: false` (unclear)
- `evidenceMultiCenter: false`
- `evidenceMultiNational: false`
- `evidenceProspective: false`
- `evidenceExternalValidation: false`

## Products NOT Modified (no evidence or pipeline/empty)

- All E0 products (no sub-attributes can be determined)
- Pipeline products (MedLever, Therapanacea pipeline)
- Empty arrays (MVision Image Synthesis, MVision Registration, Clinical Prediction)
- Manteia AccuLearning (research tool, no evidence classification)
- Image Synthesis products without evidence levels (Philips MRCATs, Siemens syngo, SyntheticMR, Therapanacea MR-Box, AdaptBox, Spectronic)

## Implementation Approach

For each product file:
1. Add the 5 boolean fields after the existing `evidenceRigorNotes` and `clinicalImpactNotes` fields
2. Use `true`/`false` explicitly for all assessed products (E1+)
3. Leave fields undefined for E0 products (already "not assessed" by convention)

Total files to modify: approximately 37 files across all categories.


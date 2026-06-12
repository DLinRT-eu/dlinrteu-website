## Objective
Add the newly FDA-cleared **SubtleHD(CT)** product to the Subtle Medical product catalogue and update the company product list.

## Source Details
- **Press release**: https://subtlemedical.com/subtle-medical-receives-fda-clearance-for-subtlehdct-expanding-ai-powered-image-enhancement-into-ct-imaging/
- **FDA 510(k)**: K254120 (decision May 2026; announced 2026-06-10)
- Product is Subtle Medical’s first CT offering and 11th FDA-cleared product overall.

## Changes Required

### 1. New product entry in `src/data/products/image-enhancement/subtle-medical.ts`
Append a new `ProductDetails` object with:
- `id`: `"subtle-hd-ct"`
- `name`: `"SubtleHD(CT)"`
- `category`: `"Image Enhancement"`
- `modality`: `"CT"`
- `description`: AI-powered CT image enhancement — reduces noise and improves low-contrast detectability across CT scanner generations.
- `features`: `["Deep learning enhancement", "CT specific", "Noise reduction", "Low contrast detectability"]`
- `regulatory.fda`: `status: "510k_cleared"`, `clearanceNumber: "K254120"`, `decisionDate: "2026-05"` (pending exact day confirmation), `class: "Class II"`
- `regulatory.intendedUseStatement`: Manufacturer statement for CT image enhancement.
- `releaseDate`: `"2026-06-10"`
- `version`: `"1.0"`
- `evidenceRigor`: `"E0"`, `clinicalImpact`: `"I0"`, `adoptionReadiness`: `"R2"` — consistent with other newly cleared products, noting no independent publications yet.
- `source`: Press release and FDA 510(k) database reference.
- `lastUpdated` / `lastRevised`: `"2026-06-12"`

### 2. Update company product list in `src/data/companies/specialized-solutions.ts`
Add `"subtle-hd-ct"` to the `productIds` array for Subtle Medical.

## Questions
- Do you have the exact FDA decision date (day in May 2026)? The search result shows only "May 2026". I can use `"2026-05"` or leave it pending if the exact date is unavailable.
- Should `anatomicalLocation` be `["Whole body"]` (since CT is used broadly) or something more specific?
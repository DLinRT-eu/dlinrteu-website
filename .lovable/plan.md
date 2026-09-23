# MVision Image+: add two peer-reviewed JACMP papers

## Papers (confirmed on PubMed / DOI)
1. **10.1002/acm2.70571** — "Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac", J Appl Clin Med Phys, 2026. 31 patients, two Image+ sCT models (T1/T2), pelvis + abdomen; geometry, HU and dose (gamma, dose within 2% in 98.8% pelvic / 93.3% abdominal cases).
2. **10.1002/acm2.70765** — "Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning", J Appl Clin Med Phys, 2026 (PMID 42638512). 19 patients from the public Gold Atlas dataset; MVision sCT (median MAE 34.0 HU, SSIM 0.93) and MVision AI segmentation versus multi-observer contours.

## Checks before writing
- Open both full-text pages to confirm authors, affiliations, single- vs multi-centre, retrospective design, and any MVision co-authors or funding. That decides the vendor-independent flag.
- Only facts stated in the papers get recorded. Nothing inferred.

## Changes to Image+
- Add both papers to `evidence` as peer-reviewed publications, with DOI links.
- Add both to `keyPapers` with per-paper E/I scores and study-quality flags. Expected: E1 (peer-reviewed, retrospective, single-institution) and I1 (technical/dosimetric performance). Final values depend on the full-text check.
- Product-level score: E0 → E1 (I stays I0/I1, set to match the papers). Update `evidenceRigorNotes` to say these are the first peer-reviewed Image+ studies (the VCU thesis stays as unscored grey literature).
- `limitations`: remove "No independent peer-reviewed publication identified". Replace it with the real scope: retrospective, small cohorts, pelvis/abdomen/prostate only.
- `anatomicalLocation`: add "Abdomen" only if paper 1 confirms that an abdominal model is in use.
- Update `lastRevised`, `lastUpdated` and `source` to 2026-09-23.

## Also proposed
- Paper 2 also evaluates MVision's MR prostate segmentation. It will be added to Contour+ as evidence and a keyPaper, scored the same way.

## Technical notes
- Image+ is defined in two files: `src/data/products/image-synthesis/mvision.ts` and `mvision-ai.ts`, which comes from the editor sync. I'll check which one is loaded through the index and update the live one. If both are loaded, I'll make them identical, so any pending MVision drafts in the new By-product review don't clash.
- Then I'll run the typecheck and `validate:evidence`, and check /product/mvision-image-plus in the browser.

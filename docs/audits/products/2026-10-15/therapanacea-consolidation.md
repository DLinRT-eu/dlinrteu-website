# TheraPanacea catalogue regrouping — 15 October 2026

## Current catalogue

The vendor's current public offering is represented as three applications: ART-Plan Segmentation, ART-Plan Planning and ART-Plan Adaptive. ART-Plan+ v3.2.1 remains the legal device name shown on the current technical-information page. This is catalogue regrouping, not an independently confirmed algorithm merger or new FDA clearance; FDA K253091 concerns v3.1.0.

Sources checked on 2026-10-15:
- https://therapanacea.com/products
- https://therapanacea.com/technical-information-2
- https://d2oi0h5pbjc5wm.cloudfront.net/product/products-structures-brochure.pdf (previously verified v3.2.0 structure library retained; not relabelled as a v3.2.1 library)

## Historical audit worklist mapping

The full audit reports in this directory remain immutable snapshots of the pre-consolidation catalogue. Apply this mapping when following their worklists; do not count these former IDs as additional active products.

| Former product ID | Current application ID | Evidence function |
|---|---|---|
| therapanacea-annotate | therapanacea-art-plan-segmentation | CT OAR/lymph-node contours |
| therapanacea-tumorbox | therapanacea-art-plan-segmentation | MR tumour contours |
| therapanacea-tumorbox-pipeline | therapanacea-art-plan-segmentation | Historical MR tumour record |
| therapanacea-brachybox | therapanacea-art-plan-segmentation | MR brachytherapy contours |
| therapanacea-brachybox-pipeline | therapanacea-art-plan-segmentation | Historical MR brachytherapy record |
| mr-box-synthetic | therapanacea-art-plan-segmentation | MR synthetic CT and associated OAR contours |
| therapanacea-smartfuse | therapanacea-art-plan-segmentation | Registration/propagation |
| therapanacea-art-plan | therapanacea-art-plan-segmentation | Former umbrella page; all three applications retain parent branding |
| therapanacea-smartplan | therapanacea-art-plan-planning | Prostate planning |
| therapanacea-smartplan-pipeline | therapanacea-art-plan-planning | Historical planning record |
| therapanacea-adaptbox | therapanacea-art-plan-adaptive | CBCT synthesis/offline adaptive assessment |

## Evidence and structures

Each former function retains its original E/L/R assessment, paper attribution, structures and limitations. Application scores are independent maxima across papers and are not validation of every function. MR synthesis and CBCT synthesis remain separate; MESCAL is kept with MR synthesis, not CBCT synthesis. CT, MR and brachytherapy models are modality-specific. SmartFuse's lack of an identified function-specific FDA clearance is disclosed.

## Stored record preservation

Read-only inspection found 17 review records, two drafts, five revision-date records and 41 assignment-history records linked to former IDs. No matching user-product, company-verification, company-revision or reviewer-expertise rows were returned in the scoped inspection. Database review uniqueness is `(product_id, review_round_id)`, so directly mapping five Segmentation module assignments into one ID would collide and destroy separate histories.

No database rows were changed or deleted. Historical review and draft screens/export lookups retain original IDs and original module scope through `getProductForStoredRecord`; public URLs redirect to the new application. Historical timestamps and review outcomes remain unchanged. New catalogue selections use the three current application IDs. Authenticated end-to-end verification is unavailable with this externally managed Supabase connection; public pages and function tabs are browser-checked separately.

Educational catalogue information is not a claim that these functions are clinically validated or suitable for a particular patient.
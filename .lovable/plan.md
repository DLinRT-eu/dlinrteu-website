# MOZI TPS: add synthetic CT and adaptive workflow

## What the uploaded Manteia material shows

- **The CBCT to synthetic CT step is AI.** Two journal papers in the vendor publication list use RegGAN, a deep-learning image-generation network. Both are marked "Released" and list AccuContour and MOZI as the systems involved:
  - BMC Cancer 2023, doi 10.1186/s12885-023-11274-7
  - Strahlentherapie und Onkologie 2023, esophageal adaptive RT
  - An independent Taiwanese user study (CART 2023) also describes synthetic CT made from CBCT, but it credits AccuContour, not MOZI.
- **MR to synthetic CT is weaker.** The only source is one ASTRO 2023 abstract describing a generalised deep-learning model for multi-modal images (listed as "Released"). There is no journal paper.
- **Offline adaptive use of MOZI.** The ESTRO 2026 slides (D'Andrea, IRCCS Regina Elena) show this workflow: daily CBCT, then "CBCT transformation", then synthetic CT, then a MOZI adaptive plan, with AI contouring along the way. Dose was compared against a re-planning CT on 2 head-and-neck and 2 lung cases: gamma 3%/3mm pass rates of 94.4–97.4%. The slides do not themselves say the conversion is AI; that link comes from the RegGAN papers.
- **Online adaptive.** The only online example is the MR-Linac daily auto-segmentation paper. That study used Elekta Monaco for re-planning, not MOZI, so it does not show online re-planning in MOZI.
- **Regulatory coverage is not confirmed.** The FDA K223724 intended use covers photon treatment planning only, and none of the material says the synthetic CT feature is included in the CE or FDA clearance.

## Changes to MOZI TPS

1. Add Image Synthesis as a second category, with a CBCT-to-synthetic-CT feature (deep learning, RegGAN).
2. Mention MR-to-synthetic-CT only as a vendor-reported research capability backed by one abstract. It will not be listed as a product feature.
3. Describe offline CBCT-based adaptive re-planning, using the ESTRO 2026 slides as the example. Online adaptive will not be claimed.
4. Add evidence:
   - The two RegGAN papers as scored key papers, after checking that each DOI resolves and the text names MOZI or the Manteia pipeline. Both are Manteia co-authored, so they will not count as vendor-independent.
   - The ESTRO 2026 slides and the ASTRO 2023 abstract as unscored supporting items.
5. Add limitations:
   - The synthetic CT feature has not been confirmed as part of the CE/FDA clearance.
   - The ESTRO data covers only 4 patients from a single centre.
   - Online adaptive re-planning in MOZI is not documented.
6. Evidence scores for the Image Synthesis part will be set only from the confirmed papers (per-category evidence). The current planning scores stay unchanged.

## Draft reply to the distributor (Italian, for you to send)

A short note confirming that offline CBCT-based adaptive planning with synthetic CT is now described, sourced to the Manteia papers and the ESTRO 2026 slides. It will also ask Manteia for documentation showing that the synthetic CT feature (CBCT and MR) is within the CE-cleared scope, and for any online adaptive workflow in MOZI.

## Technical notes

- File: `src/data/products/treatment-planning/manteia-mozi.ts`. Changes: add `secondaryCategories: ["Image Synthesis"]` and a `categoryEvidence` block for Image Synthesis; update `keyFeatures`, `modality` (add CBCT), `evidence`, `keyPapers` and `limitations`; bump `lastRevised`.
- Vendor sources are recorded with `sourceAccess: 'vendor-provided'` and `sourceRetrievedOn: '2026-09-23'`.
- Checks: typecheck, `validate:evidence`, and a load of the MOZI product page and the Image Synthesis category page.

# TheraPanacea: verify segmentation models and add ART-Plan+ as a platform

## What was checked

The vendor structure library (products page, v3.2.0 brochure ART-BRO-AN-07EU, March 2026) was compared against the catalogue entries. The published model set and counts match what the site already stores:

| Vendor model | Vendor count | Catalogue list | Stored |
|---|---|---|---|
| CT Head & Neck | 46 OAR + 19 LN | ANNOTATE_HEAD_NECK_CT | 65 |
| CT Thorax/Breast/Abdo | 73 OAR + 12 LN | ANNOTATE_THORAX_BREAST_ABDO_CT | 85 |
| CT Pelvis Male | 19 OAR + 15 LN + 3 ROI | ANNOTATE_PELVIS_MALE_CT | 37 |
| CT Pelvis Female | 18 OAR + 20 LN + 2 ROI | ANNOTATE_PELVIS_FEMALE_CT | 41 (vendor header says 18 OAR, brochure itemises 19; documented) |
| MR Brain T1 | 27 OAR | MRBOX_BRAIN_T1 | 27 |
| MR Pelvis Male T2 (Elekta) | 11 OAR + 2 ROI | MRBOX_PELVIS_MALE_T2_ELEKTA | 13 |
| MR Pelvis & Abdo TrueFISP | 7 + 9 OAR + 2 ROI | MRBOX_PELVIS_ABDO_TRUEFISP | 18 |
| MRI Brachy Pelvis | 4 OAR | BRACHYBOX_PELVIS_MR | 4 |
| syn-CT Pelvis Male / Thorax-Breast / H&N (brochure only) | 9 / 12 / 26 | ADAPTBOX_* | 9 / 12 / 26 |

No structure-list corrections are needed. The remaining gap is presentation: ART-Plan+ is not represented as a platform anywhere, and each module says so only in passing.

## What will change

1. **New platform record: ART-Plan+** (`src/data/products/platform/therapanacea-artplan.ts`, registered in the platform index)
   - Described as TheraPanacea's modular radiotherapy AI platform ("the AI companion to your TPS"), cloud-based and GDPR-compliant, class IIb (EU) / class II (US), FDA K253091 (v3.1.0, decision 2025-12-23), current release v3.2.0.
   - Intended-use summary reproduced from the brochure (multi-modal visualisation and rigid/deformable registration; automatic OAR, LN and tumour contouring; manual/semi-automatic editing; synthetic-CT from MR and from CBCT; dose computation; CBCT-based offline adaptation decision support; automatic plan generation for supported prescriptions).
   - Lists the modules with links to their own records: Annotate, TumorBox, MR-Box, AdaptBox, BrachyBox, SmartPlan, and the fusion/registration module.
   - Regulatory, evidence (E/I/R), transparency and source fields filled in the same style as the module records, all sourced to the products page, the v3.2.0 brochure and FDA K253091 with retrieval dates.
   - `usesAI: true`; no structure list of its own (structures stay on the modules) so dashboard structure counts are unaffected.

2. **Module wording** — the six existing TheraPanacea records keep their separate pages, with the first sentence of each description stating it is a module of the ART-Plan+ platform, and `partOf` pointing consistently at the platform record. Structure lists, scores and regulatory fields stay untouched.

3. **Provenance refresh** — the `structuresProvenance` notes and `source` strings on the segmentation records get today's verification date against the products page and brochure v3.2.0, recording that the published model set and counts were re-checked and unchanged.

## Technical notes

- Category counts: the platform record adds 1 product to the Platform category; module counts and the auto-contouring modality-based model counting are unchanged.
- Sitemap/product-id registries that enumerate products get the new id (`therapanacea-art-plan`).
- Validation after the edits: `npm run validate:evidence`, `tsgo` typecheck, and a preview check of the new platform page and one module page.

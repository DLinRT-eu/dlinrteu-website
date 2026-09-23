# Manteia record update from vendor material

Update the three Manteia entries (AccuContour, MOZI TPS, AccuLearning) with the material Manteia supplied: the full organ list, the dose-prediction model details, the contouring-guideline sheet, the optimisation white paper, and the publication list. Every fact gets a named source; vendor documents are marked as vendor-provided with today's date.

## AccuContour (Auto-Contouring)

- Replace the current structure list with the complete vendor list: 397 distinct CT organ names, each written in the site format the catalogue uses, derived from the model-unit column of the vendor file.
- Add the MRI organ list (88 entries) and add MRI to the imaging types, noting that MRI models are listed by the vendor and the cleared indication covers CT — MRI use needs local validation.
- Record where the list came from: Manteia "AccuContour ROI full list", vendor-provided, retrieved 2026-09-23.
- Replace the vague ">300 OARs" limitation with the exact counts now held.
- Add the guideline references from the contouring-guideline sheet (RTOG, ASTRO/ESTRO, DAHANCA/EORTC/GORTEC/HKNPCSG/NCIC/NCRI/NRG/TROG head-and-neck consensus, RTOG 1106, Radiopaedia/anatomy atlases) as guideline entries with the sheet as source.
- Add the MRI-guided adaptive segmentation paper (Li et al., Radiother Oncol 2022, doi 10.1016/j.radonc.2022.11.004 — confirmed before entry) as a scored key paper: contouring time 73 s vs 12–22 min manual, session time 1650 s vs 3252 s, six abdominal/pelvic patients, Manteia co-authored, so not vendor-independent.
- Add the ESTRO 2026 presentation (D'Andrea, IRCCS Regina Elena) as an unscored supporting item.

## MOZI TPS (Treatment Planning)

- Add the seven dose-prediction models from the vendor sheet: cervix 4500 cGy, oesophagus 5600 cGy, rectum 5200 cGy, and nasopharynx stages I–IV (7100/7000/7100/7000 cGy), each with its target and organ set.
- Describe the Smart Optimization Engine if this is proven to be working with AI, otherwise do not consider (re-chevk our inclusion criteria): experience-guided supervisory loop over the native optimiser, automatic overlap-split and ring support structures, Monte Carlo recalculation, tested for IMRT and VMAT on eleven sites under conventional fractionation. Record the white paper's caution that hypofractionated and stereotactic plans need stricter review and case-specific adjustment, and add it as a limitation.
- Record the evaluated planning setting (3 mm dose grid, Monte Carlo at 2% uncertainty, 20 iterations, ~13–28 min per case) as vendor-provided technical evaluation, explicitly not a clinical validation.
- Keep the current evidence scores; add papers from the list that name MOZI as scored key papers only where a DOI resolves, abstracts as unscored items.

## AccuLearning (Platform)

- Add the publications that name AccuLearning (five in the list) as evidence, scored only for full journal papers.
- Note that custom-trained models deploy into AccuContour and MOZI, using the patient-specific daily-updating approach as the published example.

## Publication list handling

- 36 journal publications: entered as evidence; those with a resolving DOI that names the product get per-paper E/I scores and a one-line rationale. Manteia-authored papers are flagged as not vendor-independent.
- 45 conference abstracts and posters: listed as supporting evidence without scores, so they never raise a product's evidence level.
- Items in the list marked "in development" are not entered as product capabilities.

## Technical notes

- Files touched: `src/data/products/auto-contouring/manteia.ts`, `src/data/products/treatment-planning/manteia-mozi.ts`, `src/data/products/platform/manteia-acculearning.ts`.
- Structure names normalised to the `Region: Structure_Name` convention; bilateral pairs stay two entries; distinct-name counting utilities already handle the model-prefix stripping, so vendor counts stay consistent across dashboards and the comparison page.
- `structuresProvenance` records source, `sourceAccess: 'vendor-provided'`, `sourceRetrievedOn: '2026-09-23'`; `trainingData`/`evaluationData` blocks get the same treatment where vendor documents are the source.
- Dose-prediction models go into `dosePredictionModels`; guideline references into `guidelines`; per-paper scores into `keyPapers`.
- Each DOI is resolved before it is written; anything that does not resolve or does not name the product is left out.
- After the edits: typecheck, `validate:evidence`, and a page-load check of the three product pages plus the structure comparison page.

Nothing here is presented as clinical validation, and no number is entered that is not in the supplied documents.
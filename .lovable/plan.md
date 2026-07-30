## Goal

Bring every Therapanacea entry in line with what the vendor actually publishes today (platform, Technical Information 3.2, resource library, structures brochure v3.2.0) and with the primary regulatory records, and resolve the remaining pipeline entry.

## What I verified during this review

- **Technical Information 3.2** (therapanacea.com/technical-information-2): ART-Plan+ v3.2.0, UDI `(01)03770019940020(8012) v3.2.0(11)260525`, manufacturer 8-10 Avenue Ledru-Rollin, Paris. Full intended-use text, contraindications and a long warnings list (pediatric images, prostatectomy, patient age ranges for H&N and pelvic models, scanner dependence for H&N nodes/lacrimal glands, only Monaco-Mosaiq / Eclipse-ARIA / RayStation validated for plan generation, 1–2 beams only, CBCT FOV augmentation unreliable).
- **FDA K253091** (decision 2025-12-23) names the cleared modules explicitly: *"Annotate including TumorBox"*, *SmartPlan*, *AdaptBox*. It also lists the "extension of existing anatomy to the use of brachytherapy" (the basis for BrachyBox). It does **not** name SmartFuse or MR-Box.
- **Resource library**: ~110 publications, newest dated **2024** — several are module-relevant (ART-Plan H&N blinded evaluation, guidelines-based segmentation, breast across genders, prostate end-to-end planning, CBCT synthetic-CT series, GBM GTV evaluation). Nearly all are vendor-affiliated conference abstracts, not independent full papers.
- **Current data issue**: `TumorBox` is still stored as `therapanacea-tumorbox-pipeline` with `developmentStage: "pipeline"`, an intended-use string saying *"Coming Soon … no regulatory clearance disclosed"*, and a non-standard `certification: "510(k) K253091"` — while simultaneously carrying an FDA cleared block. The vendor now advertises Tumor Segmentation (MR glioblastoma and multi-mets) as a shipping v3.2 feature.

## Plan

### 1. Resolve the pipeline entry (TumorBox)
- Promote it to a released product: new id `therapanacea-tumorbox`, drop `developmentStage: "pipeline"`, replace the "Coming Soon" intended-use text with the K253091 wording, set `certification: "CE & FDA"`, add proper `ce` (Class IIb, MDR, GMED 0459) and `fda` (510(k) K253091) blocks, scope it to MR GBM / multi-mets per the vendor feature list, and mark `partOf: ART-Plan+ 3.2.0`.
- Add a redirect `product/therapanacea-tumorbox-pipeline → product/therapanacea-tumorbox` in `App.tsx`, update `public/sitemap.xml` and the Therapanacea `productIds` in `src/data/companies/auto-contouring.ts`.
- Therapanacea then has no pipeline products left: delete `src/data/products/pipeline/therapanacea.ts` and its import/export in `src/data/products/pipeline/index.ts`.
- *Alternative if you prefer:* fold TumorBox into Annotate as a feature rather than keeping a separate card. Say the word and I'll do that instead.

### 2. Regulatory validation pass (all 7 modules)
For Annotate, TumorBox, SmartPlan, AdaptBox, MR-Box, BrachyBox, SmartFuse:
- Cross-check every clearance number against the FDA record (K253091, K242822, K234068) and keep a claim only where the module is actually named or explicitly covered; otherwise state that plainly in `notes` (as already done for SmartFuse).
- Confirm the CE Class IIb / MDR 2017/745 / GMED 0459 claim against a public source; where the notified body is not publicly stated, soften the field and record `sourceAccess`.
- Add the UDI, manufacturer name/address and the Technical Information 3.2 URL as a disclosed source on each module.
- Harmonise `version` to 3.2.0 and `partOf.version` to "3.2.0 (current) / 3.1.0 (FDA cleared)" consistently.

### 3. Limitations and intended use from Technical Information 3.2
Add the vendor's own published constraints to each module's `limitations` (currently only AdaptBox carries them): pediatric/atypical anatomy, patient positioning and DICOM tag dependencies, age-range and scanner caveats for H&N and pelvic models, post-surgical organs, L/R inversion risk, MR sequence compatibility (Brain T1, Abdo TF, Pelvis T2, Pelvis TF), SmartPlan's validated TPS/R&V list and 1–2 beam limit, dose-engine validation duty.

### 4. Evidence and keyPapers refresh
- Add `keyPapers` (with DOIs) to the modules that lack them, drawn from the verified resource library, each tagged as vendor-affiliated where applicable: Annotate (blinded H&N evaluation, guideline-based improvements, breast cohorts), SmartPlan (prostate end-to-end planning and evaluation), AdaptBox (CBCT synthetic-CT series, replanning decision support), MR-Box (existing Frontiers 2023 plus MR-only CyberKnife PoC), TumorBox (GBM GTV evaluation).
- Re-check E/I/R against the rubric. Expected outcome: conference abstracts by vendor-affiliated authors do **not** justify rigor upgrades, so SmartPlan/BrachyBox/SmartFuse stay E0 and TumorBox starts at E0; Annotate (E2/I2) and AdaptBox (E2/I1) are re-confirmed rather than raised. Any change will be justified in `evidenceRigorNotes`.
- Set `evidenceVendorIndependent` and related flags honestly, and refresh `lastRevised`/`lastUpdated` to the review date.

### 5. Verification
- Type-check the project.
- Re-run the product audit checks for the Therapanacea entries (enum validity, required fields, source disclosure, structure naming).
- Load each Therapanacea product page and the old pipeline URL in the browser to confirm rendering and redirects.

## Technical notes

- Files touched: `src/data/products/auto-contouring/therapanacea.ts` (+ new `therapanacea-tumorbox.ts`), `.../therapanacea-brachybox.ts`, `src/data/products/treatment-planning/therapanacea.ts`, `src/data/products/image-synthesis/therapanacea.ts` and `-adaptbox.ts`, `src/data/products/registration/therapanacea.ts`, `src/data/products/pipeline/{therapanacea.ts,index.ts}`, `src/data/companies/auto-contouring.ts`, `src/App.tsx`, `public/sitemap.xml`.
- One brochure inconsistency stays documented rather than "fixed": the CT Pelvis Female header says 18 OARs while 19 OAR entries are itemised; the itemised names are used.

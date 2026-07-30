## Context (verified this turn)

- `therapanacea.eu` now 302 → `therapanacea.com`, and **every** old per-module page (`/our-products/annotate/`, `/mr-box/`, `/adaptbox/`, `/smartfuse/`) redirects to a single page: `https://therapanacea.com/products`. All our stored URLs are stale.
- The new page publishes an updated **Structures Library (v3.2)** with per-model counts:
  - CT Head & Neck: 46 OAR | 19 LN — now includes vessels not in our list (common/external/internal carotid arteries, internal/external jugular veins), Cauda Equina, Pituitary, external contours.
  - CT Thorax / Breast / Abdo: 73 OAR | 12 LN — heart substructures now folded into one model (Coronary Sinus, LAD, circumflex branches, ventricle segments, Ribs 1–12, pericardium, etc.).
  - CT Pelvis Male: 19 OAR | 15 LN | 3 ROI (Valentini 2016 LN set, CTVN_Prostate per Hall 2021).
  - CT Pelvis Female: 18 OAR | 20 LN | 2 ROI.
  - MR Brain T1: 27 OAR (EPTN Eekers 2021); MR Pelvis Male T2 (Elekta): 11 OAR | 2 ROI; MR Pelvis Male & Abdo TrueFISP: 7 + 9 OAR | 2 ROI; **MRI Brachy Pelvis: 4 OAR** (new).
  - AdaptBox "Adaptive Models": Syn-CT Pelvis Male (7 OAR | 2 ROI) plus CT Thorax/Breast/Abdo and a further CT model list.
  - New headline claims: "270+ OARs and LNs", Tumor Segmentation (MR GBM and Multi-Mets), Brachytherapy segmentation, Fusion incl. ITV from 4DCT.
- Our current data: `Annotate` (200+ OARs, 7 CT models), `MR-Box`, `AdaptBox`, `SmartFuse`, plus pipeline entries `SmartPlan` and `BrachyBox` marked "Coming Soon".

## Plan

### 1. Source refresh (all Therapanacea files)
Replace `therapanacea.eu/our-products/...` with `https://therapanacea.com/products` in `productUrl`, `website`, `sourceUrl`, `companyUrl` (→ `https://therapanacea.com/`), provenance blocks, and intended-use citations across:
`auto-contouring/therapanacea.ts`, `auto-contouring/therapanacea-structures.ts`, `image-synthesis/therapanacea.ts`, `image-synthesis/therapanacea-adaptbox.ts`, `registration/therapanacea.ts`, `pipeline/therapanacea.ts`, and `companies/auto-contouring.ts`. Set `sourceRetrievedOn: "2026-07-30"`.

### 2. Structure library update (`therapanacea-structures.ts`)
Download the vendor **Structures Brochure PDF** (linked on the page) as the authoritative source; fall back to the page listing where the PDF disagrees. Then:
- Add the newly listed CT H&N vessel OARs, Cauda Equina and other missing entries; reconcile our H&N block to the stated 46 OAR | 19 LN.
- Rebuild Thorax/Breast/Abdo as the single 73 OAR | 12 LN model the vendor now publishes (keeping heart substructures inside it), retaining our `Region: Structure Name` convention and DICOM nomenclature mapping.
- Update Pelvis Male/Female to the Valentini-2016 `_Val` nodal sets and ROI entries.
- Add the new **MRI Brachy Pelvis (4 OAR)** model to MR-Box.
- Expand AdaptBox structures to the published Adaptive Models (Syn-CT Pelvis Male + thorax/abdo model). No invented structures — anything not itemised stays out, with a comment noting why.
- Update per-model comments with the guideline citations now printed on the page (DAHANCA 2020, Eekers 2021, Mir 2020, Grégoire 2014, Offersen 2015, Gay 2012, Valentini 2016, Kong 2011, Jabbour 2014, UK SABR 2019, Duane 2017, Pötter 2018/EMBRACE).

### 3. Product record revisions
- **Annotate**: description/keyFeatures updated to "270+ OARs and LNs", add Valentini 2016 + DAHANCA 2020 + Mir 2020 to `guidelines`, refresh `structuresProvenance`, bump `version`/`lastUpdated`/`lastRevised`.
- **MR-Box**: add brachytherapy MR OAR model and MR tumour (GBM / multi-mets) coverage if the page attributes it to MR-Box; otherwise note it under Annotate/TumorBox.
- **AdaptBox**: add "Deep Learning sCT and augmented CBCT", automated DIR, dose comparison, protocol-based alerts, dashboards to key features; update structures.
- **SmartFuse**: add ITV generation from 4DCT and the multi-modality list (CT/MR/PET/CBCT) now published; keep the existing E0/I1 and the K253091 non-attribution note intact.
- **Pipeline review**: the new site presents **Planning (SmartPlan)** as a shipping module with clinical-validation claims, and FDA K253091 names SmartPlan; brachytherapy segmentation is now inside the shipping Segmentation library. Proposal: promote `therapanacea-smartplan-pipeline` to a full Treatment Planning product (new `src/data/products/treatment-planning/therapanacea.ts`, keeping a redirect from the old id) and retire/merge `therapanacea-brachybox-pipeline` into the MR-Box brachy model. This happens **only if** step 2's brochure/regulatory check confirms clearance coverage; otherwise both stay in pipeline with refreshed text, and I'll report the reason.

### 4. Propagation and verification
- Update `companies/auto-contouring.ts` productIds and website; add `App.tsx` redirects + `sitemap.xml` entries for any changed product id.
- Re-run structure counting/classification sanity checks and the product audit for the Therapanacea entries; confirm the product pages render the new structure groups correctly in the preview.

## Notes
- Every changed factual field keeps a disclosed source (`https://therapanacea.com/products` or the brochure PDF URL) with `sourceAccess: "public"` and `sourceRetrievedOn: "2026-07-30"`.
- No evidence-level (E/I/R) changes are proposed here — the new site adds no new peer-reviewed citations, only marketing whitepapers/PDFs. If the "Physician Acceptance" publication PDF turns out to be a peer-reviewed paper, I'll flag it for a separate re-scoring pass rather than silently upgrading scores.

## Add DeepPlan (Wisdom Tech) to the catalogue

DeepPlan is Wisdom Tech's AI-assisted Treatment Planning System. It qualifies for inclusion: AI-based auto-delineation, DeepOPT inverse optimization, Monte Carlo dose engine, GPU acceleration. Source: http://www.wisdom-tech.online/view-15.html.

### Files

1. **Create** `src/data/products/treatment-planning/wisdom-tech.ts`
   - Export `WISDOM_TECH_PLANNING_PRODUCTS: ProductDetails[]`
   - Single entry `wisdom-deep-plan`:
     - name: "DeepPlan", company: "Wisdom Tech"
     - companyUrl, productUrl, githubUrl pointing to this new file
     - category: "Treatment Planning"
     - secondaryCategories: ["Auto-Contouring"] (vendor highlights AI auto-delineation inside DeepPlan)
     - modality: ["CT", "MR", "PET/CT"]
     - anatomicalLocation: Whole Body (generic — TPS, no body-site restriction documented)
     - subspeciality: "Radiation Oncology"
     - diseaseTargeted: ["Multiple Cancer Types"]
     - keyFeatures: AI auto-delineation, image registration/fusion (CT/MR/PET-CT), Monte Carlo dose calc (photons, electrons, protons, heavy ions, neutrons), DeepOPT inverse + multi-objective optimization, GPU-accelerated (<10 s / 50 iterations), DICOM plan import, scripting/templates, multi-plan comparison, client + cloud deployment
     - technicalSpecifications: input CT/MR/PET-CT (DICOM), output RTPlan/RTDose (DICOM-RTPLAN, DICOM-RTDOSE)
     - technology: TPS deployment (on-premises + cloud client), manual trigger, processing time seconds–minutes
     - regulatory.ce: not_applicable; regulatory.fda: not_applicable (no FDA 510(k) found for DeepPlan — only DeepContour K232928 is on file); certification: "NMPA (China)" with note that FDA status is unverified
     - intendedUseStatement: paraphrased from vendor page with source attribution
     - market.onMarketSince: "2024" (best estimate from vendor); distributionChannels: ["Direct sales (China)"]
     - evidenceRigor: "E0", clinicalImpact: "I0", adoptionReadiness: "R3" with notes ("No peer-reviewed publications found. PubMed searched 2026-05-31. NMPA-cleared vendor TPS; structured pilot and external validation needed before clinical adoption.")
     - version: "1.0", releaseDate undefined, lastUpdated/lastRevised: "2026-05-31"
     - source: vendor product page URL
     - limitations: vendor advertises broad multi-particle support (protons, heavy ions, neutrons); independent validation per particle modality not published. Regulatory status outside China not confirmed.

2. **Edit** `src/data/products/treatment-planning/index.ts`
   - Import `WISDOM_TECH_PLANNING_PRODUCTS` and spread into `TREATMENT_PLANNING_PRODUCTS`.

3. **Edit** `src/data/companies/auto-contouring.ts`
   - Append `"wisdom-deep-plan"` to the Wisdom Tech `productIds` array.
   - (Wisdom Tech is currently classified under auto-contouring company file. Leaving the file location unchanged to honor Minimal Intervention; it will appear in Treatment Planning via product category routing.)

### Open question

DeepPlan has no public FDA/CE clearance. Two options:
- **A (default in this plan):** list as NMPA-only, `pipeline=false` (NMPA counts as regulatory approval, matching how DeepContour is treated).
- **B:** mark as pipeline product (Tier 2) until FDA/CE evidence appears.

Confirm A or B before I build.

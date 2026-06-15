import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_PROSTATE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-prostate-auto-contouring",
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    usesAI: true,
    // Per-category evidence: MRCAT (synthetic CT) is a model-based bulk-density
    // method (atlas/Bayesian) — not deep learning. The bundled auto-contouring
    // module is the AI/ML component. Evidence is tracked separately per module.
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: false,
        notes:
          "MRCAT generates synthetic CT from MR using a model-based (atlas/Bayesian) bulk-density assignment approach. It is not a deep-learning method, so DLinRT's E/I/R rubric formally does not apply; however, multiple independent peer-reviewed studies have validated its dosimetric accuracy in prostate radiotherapy and are summarised below for transparency.",
        trainingData: {
          disclosureLevel: "minimal",
          description:
            "Model-based MR-to-CT bulk-density assignment for the male pelvis. Algorithm parameters were tuned on a Philips internal cohort; not a learned (DL) model.",
          source: "FDA 510(k) summary K150965; Köhler et al., Philips white paper (2015)",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
          demographics: "Adult male prostate cancer patients",
        },
        evaluationData: {
          studyDesign:
            "Software V&V (FDA 510(k)) plus multiple independent multi-center clinical dosimetric validation studies and vendor V&V disclosed in the Philips IFU appendix (2 hospitals)",
          primaryEndpoint:
            "Synthetic-CT dosimetric accuracy vs planning CT (mean dose differences to PTV/OARs; gamma analysis 3%/3 mm)",
          results:
            "Independent studies report mean PTV dose differences typically < 0.5–1.0% vs CT-based plans for prostate VMAT/IMRT, with gamma pass rates > 99% at 2%/2mm. Tyagi et al. (Phys Med Biol 2017, correct DOI 10.1088/1361-6560/aa5452): mean target dose difference 0.0 ± 0.3% across 15 patients using Philips mDIXON. Christiansen et al. (Acta Oncol 2017): MRCAT dosimetrically equivalent to CT for prostate. Vendor V&V (Philips Ingenia MR-RT IFU RTgo 5.12 appendix, Tables 15–17, pp. 136–138, RTgo 3.0): 2 hospitals × 62 patients; mean (D_MRCAT−D_CT)/D_CT to PTV = −0.23 ± 0.22% (min/max −0.87/+0.92%); 3%/3 mm gamma pass 100.0 ± 0.01% (median gamma 0.10 ± 0.03). Positioning study: 1 hospital × 9 patients (DRR multi-observer). NOTE: Persson et al. 2017 (MR-OPERA, IJROBP 99:692-700) was removed on 2026-06-15 — MR-OPERA validates Spectronic MRiPlanner, not Philips MRCAT. Limitations: validated only for adult prostate anatomy with standard pelvic geometry; large hip prostheses, atypical bone marrow composition and very high BMI are out-of-distribution; bulk-density assignment can mis-classify gas/bone interfaces in the rectum.",
          description:
            "Validation of the MRCAT synthetic-CT generator for prostate radiotherapy combining the original FDA V&V, several independent peer-reviewed clinical dosimetric studies, and the vendor V&V disclosed in the Philips IFU appendix (2 hospitals × 62 patients).",
          source:
            "Tyagi N et al., Phys Med Biol 2017 (doi:10.1088/1361-6560/aa5452, corrected 2026-06-15 from prior invalid DOI aa7c54); Christiansen RL et al., Acta Oncol 2017 (doi:10.1080/0284186X.2017.1349928); Kemppainen R et al., Acta Oncol 2017 (doi:10.1080/0284186X.2017.1342863); FDA 510(k) K150965; Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), Performance overview of MRCAT, Tables 15–17, pp. 136–138 (publicly accessible, retrieved 2026-06-15)",
          sourceUrl: "https://doi.org/10.1088/1361-6560/aa5452",
        },
        evidenceRigor: "E2",
        evidenceRigorNotes:
          "Multiple independent, peer-reviewed clinical dosimetric validation studies (Tyagi 2017 [DOI corrected to aa5452 on 2026-06-15], Christiansen 2017, Kemppainen 2017). Persson 2017 MR-OPERA removed because it evaluates Spectronic MRiPlanner, not Philips MRCAT. Vendor-independent and multi-centre, though all retrospective and limited to adult prostate cohorts. Not a DL component, so rubric applied by analogy.",
        clinicalImpact: "I1",
        clinicalImpactNotes:
          "Enables MR-only prostate workflows in routine clinical use at several centres, eliminating the planning CT for selected patients. Dosimetric equivalence to CT-based planning demonstrated, but no randomised or large-scale outcome data.",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes:
          "The auto-contouring module is the AI/ML component of MRCAT Prostate + Auto-Contouring; evidence below relates to this module only.",
        trainingData: {
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
          demographics: "Adult male prostate cancer patients",
          description:
            "Model-based adaptive auto-contouring trained for adult prostate anatomy. Training details for this legacy clinical application are not publicly disclosed.",
          disclosureLevel: "minimal",
          source: "FDA 510(k) summary K150965",
        },
        evaluationData: {
          primaryEndpoint: "Average distance (geometric accuracy)",
          source: "FDA 510(k) summary (Philips Ingenia MR-RT system)",
          results: "Average distance < 1.5 mm vs reference contours",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
          description:
            "Software V&V of the auto-contouring module of MRCAT Prostate + Auto-Contouring. Provides automated MR-based contours of prostate and organs at risk with average distance < 1.5 mm vs reference.",
          studyDesign: "Software V&V (FDA 510(k))",
        },
        evidenceRigor: "E0",
        evidenceRigorNotes:
          "Legacy product. No auto-contouring-specific peer-reviewed publications found. PubMed searched 2026-02-26.",
        clinicalImpact: "I0",
        clinicalImpactNotes:
          "No published clinical impact data for the auto-contouring functionality specifically.",
      },
    },
    name: "MRCAT Prostate + Auto-Contouring",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/philips-mrcat-prostate.ts",
    description: "MR-only radiotherapy solution for prostate that combines synthetic CT generation (MRCAT, model-based bulk-density) with model-based adaptive auto-contouring, enabling complete treatment planning workflow without CT imaging.",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    anatomicalLocation: ["Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "Synthetic CT (MRCAT) generation for MR-only workflow",
      "Model-based adaptive auto-contouring",
      "MR-only workflow (eliminates CT)",
      "One-click automated workflow",
      "Bulk motion correction via bone registration",
      "< 5 minute processing time"
    ],
    technicalSpecifications: {
      population: "Adult patients (accuracy: average distance < 1.5mm)",
      input: ["MRI (T1W mDIXON XD, T2W TSE)"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT (MRCAT)", "Structure sets"],
      outputFormat: ["DICOM CT", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Ingenia MR-RT console", "DICOM export to any TPS"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automated during MR acquisition",
      processingTime: "< 5 minutes (parallel with scanning)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        productCode: "LNH",
        regulationNumber: "21 CFR 892.1000",
        decisionDate: "2015",
        notes: "Cleared as part of Philips Ingenia MR-RT system. MRCAT Prostate + Auto-Contouring is a clinical application running on the cleared MR-RT platform. First MR-only radiotherapy solution."
      },
      intendedUseStatement: "MRCAT Prostate is indicated for radiotherapy treatment planning for prostate cancer patients; radiotherapy target volumes for patients with prostate cancer, including anatomies in the pelvic region and lymph nodes with margins, up to the L3 vertebra, are suitable for MR-only simulation with MRCAT Prostate. (Source: Philips Ingenia MR-RT Instructions for Use, Release RTgo 5.12, 3000 113 93922/781, 2024-06, pp. 10–11. IFU URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed, retrieved 2026-06-15, publicly accessible.)"
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"]
    },
    limitations: [
      "Patient selection (IFU): not suitable for patients with large metal objects (e.g. hip prosthesis) in the imaging volume, cancers other than prostate cancer, bone anomalies/diseases in the pelvic area, or body diameter in the pelvic area exceeding 50 cm (L-R) or 30 cm (A-P) within the planning FOV.",
      "General Ingenia MR-RT exclusions: MRI contraindications, MR contrast-agent contraindications, claustrophobia, inability to tolerate position/scan time, treatment position unsuitable for MRI, patient weight > 250 kg.",
      "Operational: MRCAT Prostate assigns discrete (bulk) HU values to tissue classes — images may not be suitable for soft-tissue dose evaluation in the very low-dose region.",
      "Operational: signal-void volumes inside the body outline other than compact bone are interpreted as water-rich or fatty tissue, which can mis-categorize rectal gas, foreign material, or implants and locally affect dose calculation accuracy.",
      "Operational: generate MRCAT Prostate images before any contrast agent is administered to the patient — otherwise the MRCAT post-processing step may fail.",
      "Operational: MRCAT must not be used with restricted dB/dt or with a gradient slew rate restricted below the MR system limit; MRCAT images must not be post-processed.",
      "Source: Philips Ingenia MR-RT IFU, RTgo 5.12 (2024-06), pp. 10–11 and 63–68. URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed. Retrieved 2026-06-15."
    ],
    supportedStructures: [
      "Pelvis: Prostate (anatomical)",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Bladder (inner wall)",
      "Pelvis: Bladder (outer wall)",
      "Pelvis: Rectum",
      "Pelvis: Penile Bulb",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Body Outline"
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Aggregate across modules. Image Synthesis (MRCAT): E2 — independent peer-reviewed dosimetric validation studies (Tyagi 2017 [DOI corrected to aa5452 on 2026-06-15], Christiansen 2017, Kemppainen 2017). Persson 2017 MR-OPERA removed 2026-06-15 — it validates Spectronic MRiPlanner, not Philips MRCAT. Auto-Contouring: E0 — no module-specific peer-reviewed publications. See categoryEvidence for per-module detail.",
    clinicalImpactNotes: "Aggregate. MRCAT enables MR-only prostate workflows in clinical use at several centres (I1). Auto-Contouring component has no published clinical impact data (I0).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "MRCAT MR-only prostate workflow is in routine clinical use at multiple centres with peer-reviewed dosimetric validation; auto-contouring module less well characterised.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    releaseDate: "2016-03-31",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Philips product documentation (2019); releaseDate from Philips press release (31 Mar 2016); per-category evidence updated with independent peer-reviewed MRCAT prostate dosimetric validation studies (2026-06-13); top-level limitations and intended-use refreshed from Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), pp. 10–11, 63–68, retrieved 2026-06-15"
  }
];

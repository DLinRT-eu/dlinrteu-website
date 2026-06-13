
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-prostate-auto-contouring",
    secondaryCategories: ["Image Synthesis"],
    usesAI: true,
    // Per-category evidence: MRCAT (synthetic CT) uses a model-based bulk-density
    // method (atlas/Bayesian) — not deep learning. The auto-contouring module is
    // the AI/ML component bundled in the same product.
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: false,
        notes:
          "MRCAT generates synthetic CT from MR using a model-based (atlas/Bayesian) bulk-density assignment approach. It is not a deep-learning method, so DLinRT's E/I/R rubric does not apply to this component.",
        trainingData: {
          disclosureLevel: "minimal",
          description:
            "Model-based MR-to-CT bulk-density assignment for the male pelvis. Algorithm parameters were tuned on a Philips internal cohort; not a learned (DL) model.",
          source: "FDA 510(k) summary K150965; Köhler et al., Philips white paper (2015)",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
          demographics: "Adult male prostate cancer patients",
        },
        evaluationData: {
          studyDesign: "Software V&V (FDA 510(k))",
          primaryEndpoint: "Synthetic-CT dosimetric accuracy vs planning CT",
          results:
            "Dose differences within clinically acceptable tolerances reported in FDA submission; no peer-reviewed DL-component validation (n/a — not a DL model).",
          description:
            "Validation of the MRCAT synthetic-CT generator as part of the Ingenia MR-RT 510(k) submission.",
          source: "FDA 510(k) summary K150965",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
        },
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
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/philips.ts",
    description: "MR-only radiotherapy solution for prostate that combines synthetic CT generation (MRCAT) with model-based adaptive auto-contouring, enabling complete treatment planning workflow without CT imaging.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    anatomicalLocation: ["Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "Model-based adaptive auto-contouring",
      "MR-only workflow (eliminates CT)",
      "Synthetic CT (MRCAT) generation",
      "One-click automated workflow",
      "Bulk motion correction via bone registration",
      "< 5 minute processing time"
    ],
    technicalSpecifications: {
      population: "Adult patients (accuracy: average distance < 1.5mm)",
      input: ["MRI (T1W mDIXON XD, T2W TSE)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Synthetic CT (MRCAT)"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM CT"]
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
      intendedUseStatement: "As a plug-in clinical application to Ingenia MR-RT, MRCAT Prostate + Auto-Contouring provides attenuation maps and automated, MR-based contours of prostate and organs at risk in as little as 20 minutes – all in a repeatable 'one-click' workflow. (Source: Philips MRCAT Prostate + Auto-Contouring product page, https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application, accessed 2026-05-30. No verbatim FDA IFU publicly available — cleared as part of the Philips Ingenia MR-RT system platform.)"
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"]
    },
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
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Legacy product. No auto-contouring-specific peer-reviewed publications found. MRCAT synthetic CT studies exist but not for auto-contouring component. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "No published clinical impact data for auto-contouring functionality specifically. PubMed searched 2026-02-26.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    releaseDate: "2016-03-31",
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "Philips product documentation (2019); releaseDate from Philips press release (31 Mar 2016) announcing first commercial MR-only solution for prostate treatment planning with FDA clearance (2026-06-01)"
  }
];

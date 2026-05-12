
import { ProductDetails } from "@/types/productDetails";

export const VARIAN_ETHOS_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-ethos-ai-segmentation",
    name: "Ethos AI Segmentation",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://www.varian.com/ethos",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-ethos.ts",
    description: "AI-driven auto-segmentation integrated into the Ethos adaptive radiotherapy system. Uses deep learning algorithms for contouring organs at risk and target volumes, enabling online adaptive radiotherapy workflows with AI-generated contours available in minutes at the treatment console.",
    features: [
      "Deep learning-based auto-segmentation",
      "Online adaptive radiotherapy workflow",
      "CBCT-based daily re-contouring",
      "Multiple anatomical site support (head & neck, pelvis, thorax, abdomen, breast)",
      "Integrated into Ethos treatment management and planning"
    ],
    category: "Auto-Contouring",
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/varian.jpg",
    website: "https://www.varian.com/ethos",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Thorax", "Abdomen", "Breast"],
    modality: ["CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI segmentation deep learning algorithms for OAR and target contouring",
      "Online adaptive radiotherapy with daily AI-driven re-contouring",
      "Support for multiple anatomical sites",
      "Integrated treatment planning with AI-generated contours",
      "Direct CBCT dose calculation support",
      "Guided adaptive workflow with AI-assisted decision making"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CBCT", "CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Adapted treatment plans"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM-RTPLAN"]
    },
    technology: {
      integration: ["Ethos Treatment Management", "Ethos Treatment Planning"],
      deployment: ["Integrated with Ethos linac"],
      triggerForAnalysis: "Automatic (at treatment console during adaptive workflow)",
      processingTime: "Minutes per fraction (within 15-minute adaptive workflow)"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K232923",
        productCode: "IYE",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2024-04-30",
        notes: "K232923 (Ethos Treatment Management 3.0 / Ethos Treatment Planning 2.0, Apr 2024). Prior AI Segmentation standalone clearances: K211881 (Sep 2021), K203469 (Dec 2020). HyperSight imaging clearance: K233466 (Feb 2024). Ethos 2.0 Therapy System received additional FDA 510(k) clearance announced Feb 18, 2026 (specific K-number not yet public in FDA database at time of audit)."
      },
      intendedUseStatement: "Ethos Treatment Management is indicated for use in managing and monitoring radiation therapy treatment plans and sessions; Ethos Treatment Planning is indicated for use in generating and modifying radiation therapy treatment plans. Includes AI segmentation deep learning algorithms for contouring with additional anatomical site support."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E2",
    clinicalImpact: "I3",
    evidenceRigorNotes: "FDA validation: AI segmentation models validated using DICE metrics, contours required minor or no adjustments in 80% of cases. Multiple vendor-independent publications on Ethos adaptive workflow. Huynh et al. Adv Radiat Oncol 2023. Byrne et al. Front Oncol 2023 (head and neck feasibility). Moazzezi et al. J Appl Clin Med Phys 2021. Prospective clinical trial NCT06116019 ongoing.",
    clinicalImpactNotes: "AI segmentation enables online adaptive radiotherapy, allowing daily re-contouring and plan adaptation at the treatment console. Demonstrated dosimetric benefits in prostate, head & neck, and other sites.",
    implementationBurden: "Z2",
    implementationBurdenNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Byrne et al. Feasibility of Ethos generated treatment plans for head and neck cancer patients. Tech Innov Patient Support Radiat Oncol 2023",
        link: "https://doi.org/10.1016/j.tipsro.2023.100216"
      },
      {
        type: "Peer-reviewed Publication",
        description: "AI-driven online adaptive radiotherapy in prostate cancer treatment. Radiat Oncol 2025",
        link: "https://doi.org/10.1186/s13014-025-02697-6"
      },
      {
        type: "Clinical Trial",
        description: "NCT06116019 — Online Adaptive Radiotherapy Using Ethos (prospective, ongoing)",
        link: "https://clinicaltrials.gov/study/NCT06116019"
      }
    ],
    trainingData: {
      datasetSize: "Not publicly disclosed",
      datasetSources: ["Proprietary clinical datasets"],
      demographics: "Not publicly disclosed",
      scannerModels: ["Not publicly disclosed"],
      disclosureLevel: "minimal"
    },
    evaluationData: {
      description: "FDA 510(k) validation demonstrated AI segmentation contours required minor or no adjustments in 80% of cases using DICE metrics. Multiple independent publications confirmed clinical feasibility across head & neck, pelvis, and thorax.",
      studyDesign: "Software verification and validation; no clinical trials for FDA submission; multiple independent clinical evaluations published",
      primaryEndpoint: "DICE similarity coefficient, clinical acceptability of AI contours",
      results: "80% of AI-generated contours required minor or no adjustments per FDA validation",
      source: "FDA 510(k) summary (K232923) and published literature",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232923.pdf"
    },
    lastUpdated: "2026-04-17",
    lastRevised: "2026-04-17",
    source: "FDA 510(k) K232923 summary, Varian official website, published literature, Ethos 2.0 Feb 2026 announcement"
  }
];

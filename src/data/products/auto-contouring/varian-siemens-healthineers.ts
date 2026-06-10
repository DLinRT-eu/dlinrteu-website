import { ProductDetails } from "@/types/productDetails";

export const EthosAISegmentation: ProductDetails = {
  id: "varian-ethos-ai-segmentation",
  name: "Ethos AI Segmentation",
  market: {
    onMarketSince: "2020",
    distributionChannels: ["Direct sales"]
  },
  partOf: {
    name: "Ethos radiotherapy system",
    productUrl: "https://www.varian.com/ethos",
    relationship: "Module"
  },
  source: "FDA 510(k) K232923 summary, Varian official website, published literature, Ethos 2.0 Feb 2026 announcement; releaseDate proxied from FDA decision date (2026-06-01)",
  company: "Varian (Siemens Healthineers)",
  logoUrl: "/logos/varian.jpg",
  version: "v2.0",
  website: "https://cancercare.siemens-healthineers.com/en-gb/products/adaptive-therapy/ethos",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://doi.org/10.1016/j.tipsro.2023.100216",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "El-qmache and McLellan 2023. Investigating the feasibility of using Ethos generated treatment plans for head and neck cancer patients. Technical Innovations and Patient Support in Radiation Oncology 2023;27:100216"
    },
    {
      link: "https://doi.org/10.1186/s13014-025-02697-6",
      type: "Peer-Reviewed Publication",
      level: "1c",
      description: "Preziosi et al. 2025 AI-driven online adaptive radiotherapy in prostate cancer treatment. Radiation Oncology; 2025:20(116)"
    },
    {
      link: "https://clinicaltrials.gov/study/NCT06116019",
      type: "Clinical Study",
      level: "0",
      description: "NCT06116019 — Online Adaptive Radiotherapy Using a Novel Linear Accelerator (prospective, ongoing)"
    },
    {
      link: "https://varian.widen.net/s/rvsrgl8pbc/ethos_casestudy_icon_rad10950_october2021",
      type: "Case Study",
      level: "1c",
      description: "\"Australia’s largest dedicated provider of cancer care pioneers daily adaptive therapy for prostate patients - Icon Group\""
    }
  ],
  features: [
    "Deep learning-based auto-segmentation",
    "Online adaptive radiotherapy workflow",
    "CBCT-based daily re-contouring",
    "Multiple anatomical site support (head & neck, pelvis, thorax, abdomen, breast)",
    "Integrated into Ethos treatment management and planning"
  ],
  modality: ["CBCT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-ethos.ts",
  companyUrl: "https://www.varian.com",
  productUrl: "https://www.varian.com/ethos",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIb",
      status: "cleared"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "K232923 (Ethos Treatment Management 3.0 / Ethos Treatment Planning 2.0, Apr 2024). Prior AI Segmentation standalone clearances: K211881 (Sep 2021), K203469 (Dec 2020). HyperSight imaging clearance: K233466 (Feb 2024). Ethos 2.0 Therapy System received additional FDA 510(k) clearance announced Feb 18, 2026 (specific K-number not yet public in FDA database at time of audit).",
      status: "510k_cleared",
      productCode: "IYE",
      decisionDate: "2024-04-30",
      clearanceNumber: "K232923",
      regulationNumber: "21 CFR 892.5050"
    },
    intendedUseStatement: "Ethos Treatment Management is indicated for use in managing and monitoring radiation therapy treatment plans and sessions; Ethos Treatment Planning is indicated for use in generating and modifying radiation therapy treatment plans. Includes AI segmentation deep learning algorithms for contouring with additional anatomical site support."
  },
  technology: {
    deployment: ["Integrated with Ethos linac"],
    integration: ["Ethos Treatment Management", "Ethos Treatment Planning"],
    processingTime: "Minutes per fraction (within 15-minute adaptive workflow)",
    triggerForAnalysis: "Automatic (at treatment console during adaptive workflow)"
  },
  description: "AI-driven auto-segmentation integrated into the Ethos adaptive radiotherapy system. Uses deep learning algorithms for contouring organs at risk and target volumes, enabling online adaptive radiotherapy workflows with AI-generated contours available in minutes at the treatment console.",
  keyFeatures: [
    "AI segmentation deep learning algorithms for OAR and target contouring",
    "Online adaptive radiotherapy with daily AI-driven re-contouring",
    "Support for multiple anatomical sites",
    "Integrated treatment planning with AI-generated contours",
    "Direct CBCT dose calculation support",
    "Guided adaptive workflow with AI-assisted decision making"
  ],
  lastRevised: "2026-06-01",
  lastUpdated: "2026-06-01",
  releaseDate: "2024-04-30",
  trainingData: {
    datasetSize: "Not publicly disclosed",
    demographics: "Not publicly disclosed",
    scannerModels: ["Not publicly disclosed"],
    datasetSources: ["Proprietary clinical datasets"],
    disclosureLevel: "minimal"
  },
  certification: "CE & FDA",
  evidenceRigor: "E2",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I3",
  evaluationData: {
    source: "FDA 510(k) summary (K232923) and published literature",
    results: "80% of AI-generated contours required minor or no adjustments per FDA validation",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232923.pdf",
    description: "FDA 510(k) validation demonstrated AI segmentation contours required minor or no adjustments in 80% of cases using DICE metrics. Multiple independent publications confirmed clinical feasibility across head & neck, pelvis, and thorax.",
    studyDesign: "Software verification and validation; no clinical trials for FDA submission; multiple independent clinical evaluations published",
    primaryEndpoint: "DICE similarity coefficient, clinical acceptability of AI contours"
  },
  diseaseTargeted: ["Multiple Cancer Types"],
  adoptionReadiness: "R3",
  anatomicalLocation: [
    "Head & Neck",
    "Pelvis",
    "Thorax",
    "Abdomen",
    "Breast"
  ],
  evidenceRigorNotes: "FDA validation: AI segmentation models validated using DICE metrics, contours required minor or no adjustments in 80% of cases. Multiple vendor-independent publications on Ethos adaptive workflow. Huynh et al. Adv Radiat Oncol 2023. Byrne et al. Front Oncol 2023 (head and neck feasibility). Moazzezi et al. J Appl Clin Med Phys 2021. Prospective clinical trial NCT06116019 ongoing.",
  clinicalImpactNotes: "AI segmentation enables online adaptive radiotherapy, allowing daily re-contouring and plan adaptation at the treatment console. Demonstrated dosimetric benefits in prostate, head & neck, and other sites.",
  evidenceMultiCenter: true,
  evidenceProspective: true,
  secondaryCategories: ["Treatment Planning"],
  evidenceMultiNational: false,
  structuresUnavailable: true,
  adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["CBCT", "CT"],
    output: ["Structure sets", "Adapted treatment plans"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT", "DICOM-RTPLAN"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

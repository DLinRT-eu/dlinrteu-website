import { ProductDetails } from "@/types/productDetails";

export const Vbrain: ProductDetails = {
  id: "vysioner-vbrain",
  name: "Vbrain",
  market: {
    onMarketSince: "2020",
    distributionChannels: ["Direct sales", "Partnerships"]
  },
  source: "FDA 510(k) database (K212116), company official sources, Vysioneer VBrain product page, Radiat Oncol 2023 validation study (10.1186/s13014-023-02246-z)",
  company: "Vysioneer",
  logoUrl: "/logos/vysioner.png",
  version: "2.5",
  website: "https://www.vysioneer.com/solutions/vbrain",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://doi.org/10.1186/s13014-023-02246-z",
      type: "Peer-reviewed Publication",
      description: "Stratified SRS assessment of VBrain for brain metastases"
    },
    {
      link: "https://doi.org/10.1016/j.ijrobp.2021.03.060",
      type: "Peer-reviewed Publication",
      description: "Deep learning brain metastases auto-segmentation evaluation"
    }
  ],
  modality: ["MRI"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/vysioner.ts",
  companyUrl: "https://www.vysioneer.com/",
  productUrl: "https://www.vysioneer.com/solutions/vbrain",
  regulatory: {
    ce: {
      type: "MDR",
      class: "IIa",
      status: "cleared",
      regulation: "MDR 2017/745"
    },
    fda: {
      type: "510(k)",
      class: "II",
      notes: "VBrain tumor auto-contouring (GTV) for brain metastases, meningioma, and acoustic neuroma on axial T1 post-contrast MRI.",
      status: "510k_cleared",
      productCode: "QKB",
      decisionDate: "2021-10-12",
      clearanceNumber: "K203235",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "VBrain is intended to generate Gross Tumor Volume (GTV) contours of brain metastases, meningiomas, and acoustic neuromas on axial T1 contrast-enhanced brain MRI in adult patients. The user must know the tumor type. Outputs require clinician review/editing in a DICOM-RT capable system. (Source: FDA 510(k) K203235 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["Cloud-based", "On-premises"],
    integration: ["TPS integration", "PACS integration"],
    processingTime: "Minutes per case",
    triggerForAnalysis: "Manual or automated"
  },
  description: "AI-powered brain tumor auto-contouring solution for radiation therapy planning, including brain metastases, meningioma, and acoustic neuroma.",
  keyFeatures: [
    "AI-powered brain tumor segmentation",
    "Fast processing",
    "Multiple tumor support"
  ],
  lastRevised: "2026-05-30",
  lastUpdated: "2024-03-10",
  limitations: [
    "Limited to brain tumor segmentation only",
    "Performance varies with MRI sequence quality",
    "Requires T1 post-contrast for optimal performance",
    "Reduced accuracy for tumors smaller than 0.5cm"
  ],
  releaseDate: "2023-10-05",
  certification: "CE & FDA",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
  diseaseTargeted: ["Brain Tumors", "Metastases", "Acoustic Neuroma"],
  adoptionReadiness: "R3",
  anatomicalLocation: ["Brain"],
  evidenceRigorNotes: "Wang et al., Radiat Oncol 2023 - stratified SRS assessment. Liang et al.",
  clinicalImpactNotes: "Demonstrates improved contouring accuracy and efficiency for brain metastases in single-center settings.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  supportedStructures: [
    "Brain: Acoustic Neuroma",
    "Brain: Brain Metastases",
    "Brain: Meningioma",
    "Brain: Acoustic Neuroma"
  ],
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["CT", "MRI"],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: false
};

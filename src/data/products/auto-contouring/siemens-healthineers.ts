import { ProductDetails } from "@/types/productDetails";

export const DirectORGANS: ProductDetails = {
  id: "directorgans",
  name: "DirectORGANS",
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Direct sales", "Partnerships"]
  },
  source: "Siemens Healthineers official documentation, Çatlı Dinç et al. BMC Urol 2025 (doi:10.1186/s12894-025-01875-8), FDA 510(k) K233650, K250822",
  company: "Siemens Healthineers",
  logoUrl: "/logos/siemens.png",
  version: "VA30+",
  website: "https://www.siemens-healthineers.com/en-us/radiotherapy/software-solutions/autocontouring",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://doi.org/10.1186/s12894-025-01875-8",
      type: "Independent Peer-reviewed Publication",
      description: "Çatlı Dinç et al. 2025: Dosimetric impacts of DirectORGANS deep learning autocontouring for prostate cancer RT planning. Gazi University, vendor-independent."
    }
  ],
  modality: ["CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/directorgans.ts",
  companyUrl: "https://www.siemens-healthineers.com/",
  productUrl: "https://www.siemens-healthineers.com/en-us/radiotherapy/software-solutions/autocontouring",
  regulatory: {
    ce: {
      type: "Medical Device (CT Simulator Feature)",
      class: "IIb",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      class: "II",
      notes: "DirectORGANS is cleared as an integrated software feature within the SOMATOM go. Platform (go.Sim and go.Open Pro CT simulators). K233650 cleared VB10 software (2024-03-26). K250822 cleared VB20 software (2025-07-03). Not a standalone software product.",
      status: "510k_cleared",
      productCode: "JAK",
      decisionDate: "2024-03-26",
      clearanceNumber: "K233650, K250822",
      regulationNumber: "21 CFR 892.1750"
    },
    intendedUseStatement: "DirectORGANS is intended for automatic segmentation of organs at risk during CT simulation for radiation therapy planning. It operates as an integrated feature of compatible SOMATOM CT simulators."
  },
  technology: {
    deployment: [
      "CT Simulator Integrated (SOMATOM go.Sim, go.Open Pro)"
    ],
    integration: [
      "Native CT simulator integration",
      "TPS integration via DICOM-RTSTRUCT"
    ],
    processingTime: "Part of CT reconstruction workflow",
    triggerForAnalysis: "Automatic during CT acquisition"
  },
  description: "World's first CT simulator-integrated auto-contouring solution. DirectORGANS uses optimized reconstruction and deep learning to generate organ-at-risk contours directly during CT image acquisition, eliminating the need for separate contouring workstations. Available on SOMATOM go.Sim and SOMATOM go.Open Pro.",
  keyFeatures: [
    "World's first CT simulator-integrated auto-contouring",
    "Deep learning with optimized image reconstruction",
    "Contours generated during CT acquisition workflow",
    "No separate contouring workstation required",
    "Standardized input optimization for consistent results",
    "Available for brain, head & neck, breast, lung, abdomen, and prostate",
    "Advanced packages for cardiac substructures and lung substructures"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  limitations: [
    "Auto-contoured prostate target volumes may require clinician review and MRI-guided editing before treatment planning."
  ],
  releaseDate: "2023-05-25",
  trainingData: {
    source: "FDA 510(k) summary K233650",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233650.pdf",
    description: "DirectORGANS is a deep learning auto-contouring solution integrated into Siemens SOMATOM CT simulators, using optimized reconstruction and deep learning.",
    demographics: "Adult patients",
    scannerModels: ["SOMATOM go.Sim", "SOMATOM go.Open Pro"],
    disclosureLevel: "minimal"
  },
  certification: "CE",
  evidenceRigor: "E2",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
  evaluationData: {
    source: "Çatlı Dinç et al. BMC Urol 2025 (DOI: 10.1186/s12894-025-01875-8)",
    results: "Independent dosimetric validation confirms clinical usability for prostate RT planning.",
    sourceUrl: "https://doi.org/10.1186/s12894-025-01875-8",
    description: "Independent dosimetric validation of DirectORGANS deep learning autocontouring for prostate cancer RT planning at Gazi University. The study assessed the clinical usability and dosimetric impacts of the generated contours.",
    studyDesign: "Independent Peer-reviewed Publication",
    primaryEndpoint: "Not specified"
  },
  diseaseTargeted: ["Multiple Cancer Types"],
  adoptionReadiness: "R3",
  anatomicalLocation: [
    "Brain",
    "Head & Neck",
    "Breast",
    "Thorax",
    "Abdomen",
    "Pelvis"
  ],
  evidenceRigorNotes: "Çatlı Dinç et al. BMC Urol 2025 (doi:10.1186/s12894-025-01875-8) - independent dosimetric validation of DirectORGANS for prostate RT planning at Gazi University. FDA validation (K233650, K250822).",
  clinicalImpactNotes: "Innovative CT simulator-integrated approach eliminates separate contouring step. Independent dosimetric validation confirms clinical usability.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  supportedStructures: [
    "Brain: Brain",
    "Brain: Brainstem",
    "Brain: Eye L",
    "Brain: Eye R",
    "Brain: Lens L",
    "Brain: Lens R",
    "Brain: Optic Chiasm",
    "Brain: Optic Nerve L",
    "Brain: Optic Nerve R",
    "Brain: Pituitary",
    "Head & Neck: Brainstem",
    "Head & Neck: Parotid L",
    "Head & Neck: Parotid R",
    "Head & Neck: Spinal Cord",
    "Head & Neck: Mandible",
    "Head & Neck: Eye L",
    "Head & Neck: Eye R",
    "Head & Neck: Optic Chiasm",
    "Head & Neck: Optic Nerve L",
    "Head & Neck: Optic Nerve R",
    "Head & Neck: Submandibular Gland L",
    "Head & Neck: Submandibular Gland R",
    "Head & Neck: Cochlea L",
    "Head & Neck: Cochlea R",
    "Head & Neck: Larynx",
    "Breast: Breast L",
    "Breast: Breast R",
    "Breast: Heart",
    "Breast: Lung L",
    "Breast: Lung R",
    "Thorax: Heart",
    "Thorax: Lung L",
    "Thorax: Lung R",
    "Thorax: Esophagus",
    "Thorax: Spinal Cord",
    "Thorax: Left Ventricle",
    "Thorax: Right Ventricle",
    "Thorax: Left Atrium",
    "Thorax: Right Atrium",
    "Thorax: LAD Coronary Artery",
    "Thorax: Trachea",
    "Thorax: Bronchus L",
    "Thorax: Bronchus R",
    "Abdomen: Liver",
    "Abdomen: Kidney L",
    "Abdomen: Kidney R",
    "Abdomen: Spleen",
    "Abdomen: Stomach",
    "Abdomen: Bowel",
    "Pelvis: Bladder",
    "Pelvis: Rectum",
    "Pelvis: Femoral Head L",
    "Pelvis: Femoral Head R",
    "Pelvis: Prostate",
    "Thorax: Aorta"
  ],
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: [
      "CT (SOMATOM go.Sim, SOMATOM go.Open Pro)"
    ],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

import { ProductDetails } from "@/types/productDetails";

export const AiCECT: ProductDetails = {
  id: "canon-aice-ct",
  trainingData: {
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf",
      description: "The Advanced intelligent Clear-IQ Engine (AiCE) is a Deep Convolutional Neural Network reconstruction method trained to produce cross-sectional images with lower noise and improved detectability from raw CT projection data.",
      source: "FDA 510(k) summary K181862",
      disclosureLevel: "minimal"
  },
  evaluationData: {
      primaryEndpoint: "Not specified",
      source: "Scientific Reports 2023 (DOI: 10.1038/s41598-023-42775-x)",
      results: "Up to 82% dose reduction potential with enhanced low-contrast detectability.",
      description: "Validation of deep learning-based CT image reconstruction (AiCE) for treatment planning, assessing dose calculation and image quality across head, chest, and pelvic regions.",
      sourceUrl: "https://doi.org/10.1038/s41598-023-42775-x",
      studyDesign: "Retrospective validation / Multi-phantom evaluation"
  },
  name: "AiCE CT",
  market: {
    onMarketSince: "2019",
    distributionChannels: [
      "Integrated in new CT systems",
      "Upgrade for compatible systems"
    ]
  },
  source: "FDA 510(k) database and company website",
  company: "Canon Medical Systems",
  logoUrl: "/logos/canon.jpg",
  version: "8.9",
  category: "Reconstruction",
  evidence: [
    {
      link: "https://doi.org/10.1007/s00330-019-06523-0",
      type: "Peer-reviewed Publication",
      description: "Higaki et al. Multi-phantom evaluation of deep learning CT reconstruction in European Radiology 2020"
    },
    {
      link: "https://doi.org/10.1038/s41598-023-42775-x",
      type: "Peer-reviewed Publication",
      description: "Validation of deep learning-based CT image reconstruction for treatment planning. Scientific Reports 2023"
    },
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf",
      type: "FDA 510(k) Summary",
      description: "FDA 510(k) clearance documentation for AiCE CT"
    },
    {
      link: "https://global.medical.canon/products/computed-tomography/aice_dlr",
      type: "Product Information",
      description: "Official Canon AiCE Deep Learning Reconstruction product page"
    }
  ],
  features: ["Deep learning reconstruction", "Low-dose imaging", "CT modality"],
  modality: "CT",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts",
  companyUrl: "https://global.medical.canon/",
  productUrl: "https://global.medical.canon/products/computed-tomography/aice",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "K181862 is the 510(k) clearance for the Aquilion ONE / GENESIS Edition CT system. AiCE is the deep learning reconstruction option within this system.",
      status: "510k_cleared",
      productCode: "JAK",
      decisionDate: "2019-01-15",
      clearanceNumber: "K181862",
      regulationNumber: "21 CFR 892.1750"
    },
    intendedUseStatement: "The Advanced intelligent Clear-IQ Engine (AiCE) is a deep-learning-based reconstruction method intended to produce cross-sectional images of the head and body by computer reconstruction of x-ray transmission data taken at different angles and planes, including axial, helical, and dynamic scanning. AiCE is designed to generate CT images with lower image noise and improved low-contrast detectability. (Source: FDA 510(k) K181862 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["On-scanner solution"],
    integration: ["Aquilion CT scanners", "Vitrea advanced visualization"],
    processingTime: "<40 seconds for standard dataset",
    triggerForAnalysis: "Automatic during reconstruction"
  },
  description: "Advanced intelligent Clear-IQ Engine for CT using deep learning reconstruction to reduce dose and improve image quality.",
  keyFeatures: [
    "Deep Convolutional Neural Network reconstruction",
    "Up to 82% dose reduction potential",
    "Ultra-high resolution capabilities",
    "Enhanced low-contrast detectability",
    "Reduced image noise while preserving natural texture"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2019-01-15",
  certification: "FDA Cleared",
  evidenceRigor: "E2",
  clinicalImpact: "I2",
  diseaseTargeted: ["Cancer", "Cardiovascular disease", "Trauma"],
  clinicalEvidence: "Multiple clinical studies demonstrating excellent image quality at ultra-low-dose settings across various clinical applications",
  adoptionReadiness: "R3",
  anatomicalLocation: ["Whole body"],
  evidenceRigorNotes: "Higaki et al. Eur Radiol 2020 multi-phantom study. Tatsugami et al. Radiology 2019 coronary CTA. Sci Reports 2023 RT dose calc. Fransen et al. Eur Radiol 2025 systematic review of commercial AI for MRI/CT. PubMed verified 2026-02-27.",
  clinicalImpactNotes: "Workflow improvement through dose reduction (up to 82%) with maintained image quality, enabling more efficient CT protocols.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["Raw CT projection data"],
    output: ["Reconstructed CT images"],
    population: "Adult and pediatric",
    inputFormat: ["Canon proprietary format"],
    outputFormat: ["DICOM"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

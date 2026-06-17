import { ProductDetails } from "@/types/productDetails";

export const MOZITPS: ProductDetails = {
  id: "manteia-mozi",
  name: "MOZI TPS",
  market: {
    onMarketSince: "2023",
    distributionChannels: ["Direct sales", "Cloud platform", "Distributors"]
  },
  source: "FDA 510(k) database (K223724), manufacturer official website",
  company: "Manteia",
  logoUrl: "/logos/manteia.png",
  version: "3.0",
  website: "https://www.manteiamedical.com/mozi",
  category: "Treatment Planning",
  evidence: [
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
      type: "Regulatory Clearance",
      description: "FDA 510(k) clearance K223724 received January 3, 2023 - Class II device under 21 CFR 892.5050"
    }
  ],
  features: [
    "Monte Carlo dose engine",
    "GPU-powered computation",
    "AI-driven optimization",
    "Vendor independence"
  ],
  modality: ["RT Plan", "CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/manteia-mozi.ts",
  companyUrl: "https://www.manteiamedical.com/",
  productUrl: "https://www.manteiamedical.com/mozi",
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
      status: "510k_cleared",
      productCode: "MUJ",
      decisionDate: "2023-07-10",
      clearanceNumber: "K223724",
      regulationNumber: "21 CFR 892.5050"
    },
    intendedUseStatement: "\"The MOZI Treatment Planning System (MOZI TPS) is used to plan radiotherapy treatments with malignant or benign diseases. MOZI TPS is used to plan external beam irradiation with photon beams.\" (Source: FDA 510(k) K223724 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["Cloud-based", "On-premises"],
    integration: ["TPS integration", "Cloud API", "Linac integration"],
    processingTime: "Minutes per plan",
    triggerForAnalysis: "Plan submission"
  },
  description: "Next-generation treatment planning system combining precision, speed, and adaptability. Features Monte Carlo dose engine, GPU-powered computation, and AI-driven planning optimization for radiation therapy.",
  keyFeatures: [
    "Monte Carlo dose engine for high-precision dosing in complex cases",
    "GPU-powered lightning-fast processing for efficient planning",
    "Deep learning-driven plan optimization",
    "Full workflow automation from dose prediction to final plan",
    "Auto-planning models validated on standard protocols",
    "Customizable to clinical goals",
    "Vendor-independent, fully interoperable system"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  limitations: [
    "Treatment planning limited to external beam photon planning and optimization; no mention or evidence of proton or other treatment planning modalities"
  ],
  releaseDate: "2023-07-10",
  trainingData: {
    source: "FDA 510(k) summary K223724",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
    description: "The MOZI TPS uses deep learning-driven plan optimization and auto-planning models validated on standard protocols.",
    disclosureLevel: "minimal"
  },
  certification: "CE & FDA",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
  evaluationData: {
    source: "FDA 510(k) summary K223724",
    results: "Not publicly disclosed",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
    datasetSize: "205 patients (187 for auto-contouring, 18 for end-to-end testing)",
    description: "Validation included end-to-end testing (simulation CT, registration, contouring, and dose calculation) for 18 patients and auto-contouring validation for 187 patients across several anatomies.",
    studyDesign: "Software V&V (FDA 510(k))",
    primaryEndpoint: "Not specified"
  },
  diseaseTargeted: ["Multiple Cancer Types"],
  clinicalEvidence: "FDA 510(k) validation studies with 18 patients for end-to-end testing (simulation CT, registration, contouring, and dose calculation), and 187 patients for auto-contouring across several anatomies.",
  adoptionReadiness: "R3",
  anatomicalLocation: ["All sites"],
  evidenceRigorNotes: "FDA K223724 validation (18 patients end-to-end, 187 patients auto-contouring). Limited independent publications. PubMed searched 2026-02-26.",
  clinicalImpactNotes: "Workflow improvement through AI-driven planning optimization and Monte Carlo dose calculation. PubMed searched 2026-02-26.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["CT", "Structure sets", "Treatment plans"],
    output: ["Treatment plans", "RT Dose", "Plan quality metrics"],
    population: "Adult patients",
    inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
    outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE", "PDF"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

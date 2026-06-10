import { ProductDetails } from "@/types/productDetails";

export const AIQUALIS: ProductDetails = {
  id: "ptw-aqualis",
  name: "AIQUALIS",
  market: {
    onMarketSince: "2024",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  source: "Automatically retrieved and revised",
  usesAI: false,
  company: "PTW",
  logoUrl: "/logos/ptw.jpg",
  version: "1.2",
  website: "https://www.ptwdosimetry.com/en/products/aiqualis",
  category: "Performance Monitor",
  features: [
    "AI contour monitoring",
    "3D spatial analysis",
    "Statistical quality assessment",
    "Clinical integration",
    "Performance tracking"
  ],
  modality: ["RT Struct"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/ptw.ts",
  companyUrl: "https://www.ptwdosimetry.com",
  productUrl: "https://www.ptwdosimetry.com/en/products/aiqualis",
  regulatory: {
    ce: {
      type: "Software Tool",
      class: "N/A",
      status: "not_applicable"
    },
    fda: {
      class: "N/A",
      status: "not_applicable"
    },
    intendedUseStatement: "AIQUALIS is intended for the monitoring of the amount and locations of editing of automatically generated contours taking place in clinical practice within the radiotherapy workflow. It is intended for the user to be able to audit the contouring process in the clinic, enabling them to feedback to the manufacturer of any automatic contouring product areas for improvement and to ensure that clinical teams are adhering to institutional contouring practices. This device is intended to allow the review of practice at a departmental or institutional level. It is not intended to be used to determine the correctness of contouring, or to assess, review or influence the treatment of any individual patient. The device is not intended for long-term data storage or archival purposes. This device is not an automatic contouring product. It does not generate any contours."
  },
  technology: {
    deployment: ["On-premises"],
    integration: ["Dicom node"],
    processingTime: "Minutes per analysis",
    triggerForAnalysis: "Automatic or manual"
  },
  description: "Quality monitoring solution for AI-generated contours in clinical practice. Note: This is a QA tool that monitors AI contours—it does not use AI/deep learning itself.",
  developedBy: {
    company: "Inpictura",
    companyUrl: "https://www.inpictura.com/",
    relationship: "Technology Partner"
  },
  keyFeatures: [
    "AI contour quality monitoring",
    "Clinical practice integration",
    "Performance analytics",
    "Quality metrics tracking"
  ],
  lastRevised: "2026-05-20",
  lastUpdated: "2026-02-23",
  limitations: [
    "Not intended to determine correctness of contouring or to assess/review/influence treatment of an individual patient",
    "Outputs depend on the quality/consistency of the compared contours and local workflow practices",
    "Designed for monitoring and feedback; does not generate contours or replace clinical review processes"
  ],
  releaseDate: "2025-11-06",
  certification: "MDR exempt",
  evidenceRigor: "E0",
  subspeciality: "Medical Physics",
  clinicalImpact: "I1",
  diseaseTargeted: ["Cancer"],
  adoptionReadiness: "R1",
  anatomicalLocation: ["Multiple"],
  evidenceRigorNotes: "QA monitoring tool. MDR exempt. No peer-reviewed publications yet. New product (2024). Poster from RCR Global AI conference: https://www.ptwdosimetry.com/fileadmin/user_upload/Downloads/Papers/DETECTING_AUTOMATION_BIAS_Doolan.pdf. ",
  monitorsAIProducts: ["Auto-Contouring outputs"],
  clinicalImpactNotes: "QA/monitoring tool for auditing AI contour quality in clinical practice.",
  adoptionReadinessNotes: "Derived from E0 + no public regulatory clearance: major assurance burden — sparse peer-reviewed evidence and/or no public clearance; not adoption-ready, generate evidence first.",
  technicalSpecifications: {
    input: ["AI contours", "Manual contours", "Treatment data"],
    output: ["Quality reports", "Performance metrics"],
    population: "Radiotherapy patients with AI-generated contours",
    inputFormat: ["DICOM-RTSTRUCT", "RT Structure Sets"],
    outputFormat: ["CSV", "Dashboard"]
  }
};

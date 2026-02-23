
import { ProductDetails } from "@/types/productDetails";

export const PTW_PRODUCTS: ProductDetails[] = [
  {
    id: "ptw-aqualis",
    name: "AIQUALIS",
    company: "PTW",
    companyUrl: "https://www.ptwdosimetry.com",
    productUrl: "https://www.ptwdosimetry.com/en/products/aiqualis",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/ptw.ts",
    developedBy: {
      company: "Inpictura",
      companyUrl: "https://www.inpictura.com/",
      relationship: "Technology Partner"
    },
    description: "Quality monitoring solution for AI-generated contours in clinical practice. Note: This is a QA tool that monitors AI contours—it does not use AI/deep learning itself.",
    features: [
      "AI contour monitoring", 
      "3D spatial analysis",
      "Statistical quality assessment", 
      "Clinical integration", 
      "Performance tracking"
    ],
    category: "Performance Monitor",
    usesAI: false,
    certification: "MDR exempt",
    logoUrl: "/logos/ptw.jpg",
    website: "https://www.ptwdosimetry.com/en/products/aiqualis",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Struct"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "AI contour quality monitoring",
      "Clinical practice integration",
      "Performance analytics",
      "Quality metrics tracking"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients with AI-generated contours",
      input: ["AI contours", "Manual contours", "Treatment data"],
      inputFormat: ["DICOM-RTSTRUCT", "RT Structure Sets"],
      output: ["Quality reports", "Performance metrics"],
      outputFormat: ["CSV", "Dashboard"]
    },
    technology: {
      integration: ["Dicom node"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per analysis"
    },
    regulatory: {
      ce: {
        status: "MDR exempt",
        class: "N/A",
        type: "Software Tool"
      },
      fda: {
        status: "Not applicable",
        class: "N/A"
      },
      intendedUseStatement: "AIQUALIS is intended for the monitoring of the amount and locations of editing of automatically generated contours taking place in clinical practice within the radiotherapy workflow. It is intended for the trained user to be able to audit the contouring process in the clinic, enabling them to feedback to the manufacturer of any automatic contouring product areas for improvement and to ensure that clinical teams are adhering to institutional contouring practices. This device is intended to allow the review of practice at a departmental or institutional level. It is not intended to be used to determine the correctness of contouring, or to assess, review or influence the treatment of any individual patient. The device is not intended for long-term data storage or archival purposes. This device is not an automatic contouring product. It does not generate any contours."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "1.1.2",
    releaseDate: "2025-11-06",
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "QA monitoring tool. MDR exempt. No peer-reviewed publications yet. New product (2024).",
    clinicalImpactNotes: "QA/monitoring tool for auditing AI contour quality in clinical practice.",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "Automatically retrieved and revised"
  }
];

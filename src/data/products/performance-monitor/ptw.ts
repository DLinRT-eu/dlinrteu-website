
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
      company: "InPictura",
      companyUrl: "https://www.inpictura.com/",
      relationship: "Technology Partner"
    },
    description: "AI contouring quality monitoring solution for clinical practice",
    features: [
      "AI contour monitoring", 
      "Quality assessment", 
      "Clinical integration", 
      "Performance tracking"
    ],
    category: "Performance Monitor",
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
      inputFormat: ["DICOM-RT", "RT Structure Sets"],
      output: ["Quality reports", "Performance metrics"],
      outputFormat: ["PDF", "CSV", "Dashboard"]
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
      intendedUseStatement: "For monitoring and quality assessment of AI-generated contours in clinical radiotherapy practice. Not intended for clinical decision making."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "1.1",
    releaseDate: "2025-09-23",
    lastUpdated: "2025-11-29",
    lastRevised: "2025-11-29",
    source: "Automatically retrieved and revised"
  }
];

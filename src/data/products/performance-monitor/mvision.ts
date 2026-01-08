
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PERFORMANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-verify",
    name: "Verify",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://mvision.ai/verify/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/mvision.ts",
    description: "Contour comparison tool for visualizing and comparing user-generated and AI-generated contours. Note: This is a QA/visualization tool for monitoring AI contour quality—it may or may not use AI itself.",
    features: [
      "Contour comparison", 
      "Visualization tools", 
      "AI contour analysis", 
      "Clinical workflow integration"
    ],
    category: "Performance Monitor",
    certification: "MDR Exempt",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/verify/",
    anatomicalLocation: ["Multiple"],
    modality: "RT Struct",
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Contour visualization",
      "AI vs manual comparison",
      "Interactive analysis tools",
      "Clinical decision support",
      "Workflow integration"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients with contoured structures",
      input: ["AI contours", "Manual contours", "Structure sets"],
      inputFormat: ["DICOM-RT", "RT Structure Sets"],
      output: ["Comparison reports", "Visualization data"],
      outputFormat: ["PDF", "Interactive dashboard"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "LINAC connectivity"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic after treatment delivery",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "MDR Exempt",
        class: "N/A",
        type: "Software Tool",
        notes: "Visualization and comparison tool - not a diagnostic device"
      },
      fda: {
        status: "Not applicable",
        class: "N/A",
        notes: "Non-diagnostic visualization tool for comparing contours. Does not make clinical decisions."
      },
      intendedUseStatement: "For comparison and visualization of user-generated and AI-generated contours in radiotherapy planning. Not intended for diagnostic use."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2024-03-01",
    lastRevised: "2026-01-08",
    source: "MVision AI official website, regulatory classification based on product function"
  }
];

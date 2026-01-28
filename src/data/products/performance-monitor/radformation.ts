import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-clearcheck",
    name: "ClearCheck",
    company: "Radformation",
    companyUrl: "https://radformation.com",
    productUrl: "https://radformation.com/clearcheck/clearcheck",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/radformation.ts",
    description: "Automated plan check and documentation software with structure validation, ensuring high-quality treatment plans through in-depth contour checks, plan comparison, and TG-275 compliance. Note: This QA tool can validate AI-generated contours and plans—it may or may not use AI itself.",
    features: [
      "Structure validation",
      "TG-275 compliance",
      "Plan comparison",
      "Automated checks",
      "Contour QA"
    ],
    category: "Performance Monitor",
    usesAI: false,
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://radformation.com/clearcheck/clearcheck",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Plan", "RT Struct"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Structure validation and naming checks",
      "TG-275 compliance automation",
      "Plan comparison and documentation",
      "Automated quality checks",
      "Contour QA and verification"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients",
      input: ["RT Plans", "RT Structure Sets", "CT Images"],
      inputFormat: ["DICOM-RTSTRUCT"],
      output: ["Quality reports", "Compliance documentation"],
      outputFormat: ["PDF", "Dashboard"]
    },
    technology: {
      integration: ["Eclipse TPS"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Seconds per plan check"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "II"
      },
      intendedUseStatement: "ClearCheck is intended for automated treatment plan checking, structure validation, and documentation to support quality assurance in radiotherapy workflows."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    lastUpdated: "2025-01-01",
    lastRevised: "2026-01-08",
    source: "Radformation official website"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const SUN_NUCLEAR_PRODUCTS: ProductDetails[] = [
  {
    id: "sun-nuclear-suncheck-patient",
    name: "SunCHECK Patient",
    company: "Sun Nuclear (Mirion Medical)",
    companyUrl: "https://www.sunnuclear.com",
    productUrl: "https://www.sunnuclear.com/products/suncheck-patient",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/sun-nuclear.ts",
    description: "Quality management platform with automated structure validation, contour QA, and pre-treatment quality assurance for comprehensive patient-specific treatment verification. Note: This QA platform can validate AI-generated structures and plans—it may or may not use AI itself.",
    features: [
      "Structure check",
      "Plan verification",
      "Contour validation",
      "Quality trending",
      "Reporting"
    ],
    category: "Performance Monitor",
    usesAI: false,
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/sun-nuclear.png",
    website: "https://www.sunnuclear.com/products/suncheck-patient",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Plan", "RT Struct", "RT Dose"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Automated structure checking",
      "Pre-treatment plan verification",
      "Contour validation and QA",
      "Quality trending and analytics",
      "Comprehensive reporting dashboard"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients",
      input: ["RT Plans", "RT Structure Sets", "RT Dose", "CT Images"],
      inputFormat: ["DICOM-RTSTRUCT"],
      output: ["QA reports", "Quality metrics", "Trend analysis"],
      outputFormat: ["PDF", "Dashboard", "CSV"]
    },
    technology: {
      integration: ["TPS integration", "Linac integration"],
      deployment: ["Server-based", "Cloud options"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient QA"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "II"
      },
      intendedUseStatement: "SunCHECK Patient is intended for patient-specific quality assurance including structure validation, plan verification, and pre-treatment quality checks in radiotherapy."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    lastUpdated: "2025-01-01",
    lastRevised: "2026-01-08",
    source: "Sun Nuclear official website"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const VARIAN_MONITOR_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-mobius3d",
    name: "Mobius3D",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://www.varian.com/products/software/quality-assurance/mobius3d",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/varian.ts",
    description: "Comprehensive patient quality assurance platform with structure verification, independent dose calculation, and automated plan checking for radiotherapy treatment verification. Note: This QA platform can verify AI-generated plans and structures—it may or may not use AI itself.",
    features: [
      "Structure verification",
      "Independent dose calculation",
      "Automated QA",
      "Multi-linac support",
      "EPID-based verification"
    ],
    category: "Performance Monitor",
    usesAI: false,
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/varian.jpg",
    website: "https://www.varian.com/products/software/quality-assurance/mobius3d",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Plan", "RT Struct", "RT Dose", "EPID"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Structure verification and validation",
      "Independent 3D dose calculation",
      "Automated plan QA workflows",
      "Multi-linac and multi-vendor support",
      "EPID-based delivery verification"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients",
      input: ["RT Plans", "RT Structure Sets", "RT Dose", "EPID Images", "CT Images"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN", "DICOM-RTDOSE"],
      output: ["Dose verification", "QA reports", "Structure analysis"],
      outputFormat: ["PDF", "Dashboard"]
    },
    technology: {
      integration: ["Multi-vendor TPS", "Linac integration"],
      deployment: ["Server-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient QA"
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
      intendedUseStatement: "Mobius3D is intended for patient-specific quality assurance including independent dose verification, structure validation, and treatment delivery verification in radiotherapy."
    },
    market: {
      onMarketSince: "2012",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    lastUpdated: "2026-01-28",
    lastRevised: "2026-01-28",
    source: "Varian official website"
  }
];

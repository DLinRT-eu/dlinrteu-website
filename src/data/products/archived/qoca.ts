
import { ProductDetails } from "@/types/productDetails";

export const QOCA_PRODUCTS: ProductDetails[] = [
  {
    id: "qoca-smart-rt",
    name: "QOCA image Smart RT Contouring System",
    company: "Quanta Computer, Inc.",
    companyUrl: "https://www.quantatw.com/",
    productUrl: "https://www.quantatw.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/qoca.ts",
    description: "AI-powered auto-contouring system for radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "FDA",
    website: "https://www.quantatw.com/",
    anatomicalLocation: [],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-based auto-contouring",
      "Radiation therapy planning support"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Standalone"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual",
      processingTime: "Minutes per case"
    },
    regulatory: {
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K231855",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-02-12"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Minimal entry based on FDA clearance. No independent publications identified.",
    clinicalImpactNotes: "Limited public documentation available.",
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K231855). Minimal entry — needs further research and verification."
  }
];


import { ProductDetails } from "@/types/productDetails";

export const AATMA_PRODUCTS: ProductDetails[] = [
  {
    id: "aatma-autocontour",
    name: "AATMA",
    company: "Elekta",
    companyUrl: "",
    productUrl: "",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/archived/aatma.ts",
    description: "AI-powered auto-contouring solution for radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "FDA",
    website: "",
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
        clearanceNumber: "K212218",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050"
      },
      intendedUseStatement: "For automatic segmentation of anatomical structures in radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Minimal entry based on FDA clearance. No independent publications identified. Limited public documentation.",
    clinicalImpactNotes: "Limited public documentation available.",
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K212218). Minimal entry — needs further research and verification."
  }
];

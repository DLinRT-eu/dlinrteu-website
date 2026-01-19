
import { ProductDetails } from "@/types/productDetails";

export const MIRADA_PRODUCTS: ProductDetails[] = [
  {
    id: "mirada-dlc",
    name: "DLC Expert",
    company: "Mirada Medical",
    companyUrl: "https://mirada-medical.com/radiation-oncology/",
    productUrl: "https://www.mirada-medical.com/radiation-oncology",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/mirada.ts",
    description: "Deep learning-based auto-contouring software for radiation oncology providing consistent and rapid contouring of normal tissues.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mirada-medical.png",
    website: "https://mirada-medical.com/product/mirada-dlcexpert-ai-autocontouring/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Batch processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "Workflow manager"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "CE Marked (Historical - Product Discontinued)",
        class: "Class IIa",
        type: "MDD",
        regulation: "MDD 93/42/EEC"
      },
      fda: {
        status: "510(k) Cleared (Historical - Product Discontinued)",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Discontinued - no longer actively marketed"]
    },
    version: "2.2",
    releaseDate: "2023-05-20",
    lastUpdated: "2024-01-15",
    lastRevised: "2026-01-02",
    source: "Historical records - product discontinued"
  }
];

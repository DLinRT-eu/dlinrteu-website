
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-dual-energy-optimizer",
    name: "Dual Energy Optimizer AI",
    company: "Siemens Healthineers",
    category: "Image Enhancement",
    description: "AI-powered solution for optimizing dual-energy CT images, enhancing material differentiation and tissue characterization.",
    features: ["Deep learning enhancement", "Dual-energy CT", "Material decomposition"],
    certification: "CE Mark",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/computed-tomography/technologies/dual-energy",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/siemens.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Vascular disease", "Renal calculi"],
    releaseDate: "2022-02-01",
    version: "2.0",
    keyFeatures: [
      "AI-based dual-energy image optimization",
      "Enhanced virtual non-contrast images",
      "Improved iodine maps",
      "Reduced beam hardening artifacts",
      "Advanced material decomposition"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Dual-energy CT datasets"],
      inputFormat: ["DICOM"],
      output: ["Enhanced dual-energy images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["syngo.via", "Siemens CT scanners"],
      deployment: ["On-premise workstation", "Server-based"],
      triggerForAnalysis: "Automatic post-processing",
      processingTime: "<20 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K191468",
        productCode: "JAK",
        regulationNumber: "21 CFR 892.1750",
        decisionDate: "2019-07-03",
        notes: "Cleared as syngo.CT Dual Energy. Part of Siemens syngo.via platform."
      },
      intendedUseStatement: "Intended for enhancing dual-energy CT image quality and material discrimination to support clinical interpretation."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated in dual-energy CT workflow", "Software upgrade"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Part of syngo.via platform clearance (FDA K191468). Limited independent RT-specific publications.",
    clinicalImpactNotes: "Workflow improvement through enhanced material differentiation in dual-energy CT imaging.",
    clinicalEvidence: "Clinical studies demonstrating improved lesion detection and characterization compared to conventional dual-energy processing",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "Company website"
  }
];

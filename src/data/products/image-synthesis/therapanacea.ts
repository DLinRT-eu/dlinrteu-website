import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_MRBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "mr-box-synthetic",
    name: "MR-Box",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu",
    productUrl: "https://www.therapanacea.eu/our-products/",
    description: "Generate an AI-based pseudo-CT from MR images in just one click to avoid registration errors and accelerate planning workflow and adaptation. Part of the ART-Plan+ platform.",
    features: ["MR-only simulation", "Synthetic CT generation", "Clinical workflow integration", "One-click processing"],
    category: "Image Synthesis",
    certification: "CE, FDA & TGA",
    logoUrl: "/logos/therapanacea.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea.ts",
    website: "https://www.therapanacea.eu/our-products/",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: [
      "AI-based pseudo-CT generation",
      "One-click processing",
      "Eliminates registration errors",
      "Accelerates planning workflow",
      "MR-only radiotherapy support"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT (pseudo-CT)"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic within workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242822",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-02-25",
        notes: "Module within ART-Plan+ platform (v3.0.0 cleared). Current version is v3.1.2."
      },
      tga: {
        status: "TGA Cleared",
        notes: "Cleared for Australian market as part of ART-Plan+ platform"
      },
      intendedUseStatement: "For generating synthetic CT datasets from MR images for radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales"],
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.1.2",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-01-02",
    lastRevised: "2026-01-02",
    source: "Therapanacea official website (therapanacea.eu/technical-information-2/), FDA 510(k) database (K242822)"
  }
];

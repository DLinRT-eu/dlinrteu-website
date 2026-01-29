import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_SMARTFUSE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartfuse",
    name: "SmartFuse",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/smartfuse/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/therapanacea.ts",
    description: "AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. Part of the ART-Plan+ platform.",
    category: "Registration",
    certification: "CE, FDA & TGA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/smartfuse/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "CBCT", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered registration algorithm",
      "Rigid and deformable fusion",
      "Real-time contour deformation",
      "Sub-voxel registration accuracy",
      "4D-CT management",
      "Multi-modality support (CT, MRI, CBCT, PET-CT)",
      "Checker-board visualization"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT", "PET-CT", "4D-CT"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Deformed contours", "Deformation field"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per registration"
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
      intendedUseStatement: "For multi-modal visualization and rigid- and deformable registration of anatomical and functional images."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Therapanacea official website (therapanacea.eu/technical-information-2/), FDA 510(k) database (K242822)"
  }
];

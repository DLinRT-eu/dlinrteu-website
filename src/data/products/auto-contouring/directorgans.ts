
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29, updated 2026-01-02 with accurate regulatory info
export const DIRECTORGANS_PRODUCTS: ProductDetails[] = [
  {
    id: "directorgans",
    name: "DirectORGANS",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/en-us/radiotherapy/software-solutions/autocontouring",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/directorgans.ts",
    description: "World's first CT simulator-integrated auto-contouring solution. DirectORGANS uses optimized reconstruction and deep learning to generate organ-at-risk contours directly during CT image acquisition, eliminating the need for separate contouring workstations. Available on SOMATOM go.Sim and SOMATOM go.Open Pro.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/en-us/radiotherapy/software-solutions/autocontouring",
    anatomicalLocation: ["Brain", "Head & Neck", "Breast", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "World's first CT simulator-integrated auto-contouring",
      "Deep learning with optimized image reconstruction",
      "Contours generated during CT acquisition workflow",
      "No separate contouring workstation required",
      "Standardized input optimization for consistent results",
      "Available for brain, head & neck, breast, lung, abdomen, and prostate",
      "Advanced packages for cardiac substructures and lung substructures"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT (SOMATOM go.Sim, SOMATOM go.Open Pro)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Native CT simulator integration", "TPS integration via DICOM-RT"],
      deployment: ["CT Simulator Integrated (SOMATOM go.Sim, go.Open Pro)"],
      triggerForAnalysis: "Automatic during CT acquisition",
      processingTime: "Part of CT reconstruction workflow"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device (CT Simulator Feature)",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "II",
        clearanceNumber: "K233650, K250822",
        productCode: "JAK",
        regulationNumber: "21 CFR 892.1750",
        notes: "Cleared as integrated feature of SOMATOM go.Sim and SOMATOM go.Open Pro CT simulators. Not a standalone software product."
      },
      intendedUseStatement: "DirectORGANS is intended for automatic segmentation of organs at risk during CT simulation for radiation therapy planning. It operates as an integrated feature of compatible SOMATOM CT simulators."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "VA30+",
    releaseDate: "2023-05-25",
    lastUpdated: "2026-01-26",
    supportedStructures: [
      "Brain structures",
      "Head & Neck: Brainstem, Parotid (L/R), Spinal Cord, Mandible, Eyes, Optic structures",
      "Thorax: Heart, Lungs (L/R), Esophagus, Cardiac substructures (advanced)",
      "Abdomen: Liver, Kidneys (L/R), Spleen, Stomach, Bowel",
      "Pelvis: Bladder, Rectum, Femoral Heads, Prostate"
    ],
    lastRevised: "2026-01-26",
    source: "Siemens Healthineers official documentation, white paper (https://marketing.webassets.siemens-healthineers.com/ac60475b2fc7ceaa/ca46075332b4/siemens-healthineers_DA_AI-Rad-Companion_DirectOrgans_whitepaper.pdf), FDA 510(k) K233650/K250822"
  }
];

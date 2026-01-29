import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartplan-pipeline",
    name: "SmartPlan",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
    description: "AI-powered automatic treatment planning module for the ART-Plan+ platform. Generates optimized treatment plans using deep learning, reducing planning time while maintaining clinical quality standards.",
    features: [
      "AI-driven dose optimization",
      "Automatic treatment plan generation",
      "Multi-criteria optimization",
      "Clinical protocol compliance"
    ],
    category: "Treatment Planning",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automatic treatment plan generation using deep learning",
      "Multi-criteria dose optimization",
      "Clinical protocol-guided planning",
      "Seamless integration with ART-Plan+ workflow"
    ],
    partOf: {
      name: "ART-Plan+",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    usesAI: true,
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Company website - listed as 'Coming Soon'"
  },
  {
    id: "therapanacea-tumorbox-pipeline",
    name: "TumorBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
    description: "AI-powered tumor segmentation module for the ART-Plan+ platform. Provides automated delineation of tumor volumes (GTV, CTV, PTV) using advanced deep learning algorithms.",
    features: [
      "Automatic tumor segmentation",
      "GTV/CTV/PTV delineation",
      "Multi-modality support",
      "Adaptive contouring"
    ],
    category: "Auto-Contouring",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automatic GTV delineation using deep learning",
      "CTV and PTV expansion algorithms",
      "Multi-modality image fusion support",
      "Adaptive re-contouring for ART workflows"
    ],
    partOf: {
      name: "ART-Plan+",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    usesAI: true,
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Company website - listed as 'Coming Soon'"
  },
  {
    id: "therapanacea-brachybox-pipeline",
    name: "BrachyBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
    description: "AI-powered brachytherapy delineation module for the ART-Plan+ platform. Provides automated contouring of organs at risk and applicator reconstruction for brachytherapy procedures.",
    features: [
      "Brachytherapy OAR contouring",
      "Applicator reconstruction",
      "Dose optimization support",
      "Multi-site support"
    ],
    category: "Auto-Contouring",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/",
    anatomicalLocation: ["Pelvis", "Female Pelvis", "Head & Neck"],
    modality: ["CT", "MRI"],
    subspeciality: "Brachytherapy",
    diseaseTargeted: ["Cervical Cancer", "Prostate Cancer", "Head & Neck Cancer"],
    keyFeatures: [
      "Automated OAR delineation for brachytherapy",
      "Applicator reconstruction and verification",
      "Integration with treatment planning systems",
      "Support for gynecological and prostate brachytherapy"
    ],
    partOf: {
      name: "ART-Plan+",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    usesAI: true,
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Company website - listed as 'Coming Soon'"
  }
];

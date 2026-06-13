import { ProductDetails } from "@/types/productDetails";

export const TumorBox: ProductDetails = {
  id: "therapanacea-tumorbox-pipeline",
  trainingData: {
      disclosureLevel: "minimal",
      source: "FDA 510(k) summary K253091",
      description: "Not publicly disclosed. Product is a deep learning module for tumor segmentation (GTV/CTV/PTV).",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf"
  },
  evaluationData: {
      primaryEndpoint: "Not specified",
      source: "FDA 510(k) summary K253091",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      description: "Software validation and verification for FDA 510(k) clearance as an AI tumor-segmentation module for ART-Plan+.",
      results: "Not publicly disclosed",
      studyDesign: "Software V&V (FDA 510(k))"
  },
  name: "TumorBox",
  partOf: {
    name: "ART-Plan+",
    productUrl: "https://www.therapanacea.eu/our-products/",
    relationship: "Module"
  },
  source: "Company website - listed as 'Coming Soon'",
  usesAI: true,
  company: "Therapanacea",
  logoUrl: "/logos/therapanacea.png",
  version: "Art-Plan+ (v3.1.0)",
  website: "https://www.therapanacea.eu/our-products/",
  category: "Auto-Contouring",
  features: [
    "Automatic tumor segmentation",
    "GTV/CTV/PTV delineation",
    "Multi-modality support",
    "Adaptive contouring"
  ],
  modality: ["CT", "MRI", "PET"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
  companyUrl: "https://www.therapanacea.eu/",
  productUrl: "https://www.therapanacea.eu/our-products/",
  regulatory: {
    fda: {
      class: "II",
      status: "Approved",
      productCode: "MUJ, QKB, LLZ ",
      decisionDate: "2025-12-23",
      clearanceNumber: "K253091"
    },
    intendedUseStatement: "\"Coming Soon.\" Pre-market AI tumor-segmentation module for ART-Plan+; no Indications for Use published and no regulatory clearance disclosed. (Source: Therapanacea product page, https://www.therapanacea.eu/our-products/, retrieved 23 May 2026.)"
  },
  description: "AI-powered tumor segmentation module for the ART-Plan+ platform. Provides automated delineation of tumor volumes (GTV, CTV, PTV) using advanced deep learning algorithms.",
  keyFeatures: [
    "Automatic GTV delineation using deep learning",
    "CTV and PTV expansion algorithms",
    "Multi-modality image fusion support",
    "Adaptive re-contouring for ART workflows"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2025-12-23",
  certification: "510(k) K253091",
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  developmentStage: "pipeline",
  anatomicalLocation: ["Multi-site"]
};

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [TumorBox];

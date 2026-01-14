
import { ProductDetails } from "@/types/productDetails";
import { RAYSTATION_SUPPORTED_STRUCTURES } from "./raysearch-structures";

export const RAYSEARCH_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation",
    name: "Deep Learning Segmentation",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-segmentation-model-catalogue/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/raysearch.ts",
    description: "Advanced treatment planning system with machine learning-based auto-segmentation for rapid and consistent contouring.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/machine-learning-in-raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Machine learning algorithms", "Multi-atlas fallback", "TPS integration"],
    supportedStructures: RAYSTATION_SUPPORTED_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds to minutes per structure"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        decisionDate: "2025-04-04",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A"
      },
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],

},
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2025-12-11",
    lastRevised: "2026-01-14",
    source: "FDA 510(k) database (K240398), RaySearch official documentation, DLS Model Catalogue 2024",
    clinicalEvidence: "Clinical studies demonstrating improved contouring accuracy and efficiency.",
    evidence: ["10.1016/j.radonc.2016.10.009"]
  }
];

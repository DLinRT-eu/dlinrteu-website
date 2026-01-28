import { ProductDetails } from "@/types/productDetails";

// Archived: Unverified product - no specific FDA 510(k) clearance number
// Functionality covered by TrueFidelity Pro (K183202) in Reconstruction category
export const GE_ARCHIVED_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-dlip-ct",
    name: "Deep Learning Image Processing for CT",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "AI-powered CT image enhancement technology that improves image quality and reduces noise in standard and low-dose examinations.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/computed-tomography",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/archived/ge-healthcare.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2021-09-15",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based image enhancement",
      "Works with images from any CT scanner",
      "Reduces image noise while preserving natural texture",
      "Enhances lesion conspicuity",
      "Improves low-contrast detectability"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Edison Platform", "AW Workstations"],
      deployment: ["On-premise server", "Edge device"],
      triggerForAnalysis: "Automatic or manual trigger",
      processingTime: "<8 seconds per series"
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
        notes: "Part of GE Edison Platform AI application clearances"
      },
      intendedUseStatement: "Intended for use in enhancing CT images to improve image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Edison Marketplace"],
    },
    clinicalEvidence: "Multiple clinical evaluations demonstrating improved diagnostic confidence and reduced interpretation time",
    lastUpdated: "2025-01-20",
    lastRevised: "2026-01-27",
    source: "Company website - ARCHIVED: No specific FDA clearance number found"
  }
];


import { ProductDetails } from "@/types/productDetails";

export const CLARIPI_PRODUCTS: ProductDetails[] = [
  {
    id: "claripi-clarict-ai",
    name: "ClariCT.AI",
    company: "ClariPi",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/claripi.ts",
    description: "AI-powered CT image denoising solution using deep learning to enhance low-dose CT scans while preserving anatomical details and natural textures.",
    certification: "CE Mark, FDA 510(k)",
    logoUrl: "/logos/claripi.png",
    companyUrl: "https://claripi.com/",
    productUrl: "https://claripi.com/clarict-ai/",
    anatomicalLocation: ["Head", "Chest", "Heart", "Abdomen", "Pelvis", "Spine"],
    modality: "CT",
    diseaseTargeted: ["Cancer screening", "Cardiac imaging", "Pulmonary disorders", "Pediatric imaging"],
    keyFeatures: [
      "Patented Clarity Engine with deep CNN",
      "Vendor-agnostic - works with all CT manufacturers",
      "Selective noise removal preserving anatomical structures",
      "Enables radiation dose reduction",
      "Fully automated processing",
      "User-definable clarity settings"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced/denoised CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "RIS/CIS", "AI Marketplaces (Siemens Syngo.Via, Blackford, Nuance, deepcOS)"],
      deployment: ["Standalone desktop", "Local virtualization (Docker)", "Cloud-based"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "10-60 seconds per case"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDD"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K183460",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2019-03-29",
        notes: "Additional clearance K212074 (2021) for AI Marketplace integration"
      },
      intendedUseStatement: "ClariCT.AI is intended to be used for denoise processing and enhancement of DICOM images acquired from any CT scanner to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "AI Marketplaces", "Distribution partners"]
    },
    evidence: [
      {
        type: "Peer-reviewed publication",
        description: "Validation studies in pediatric abdominal CT, coronary CTA, and liver imaging",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=ClariCT"
      }
    ],
    clinicalEvidence: "Multiple peer-reviewed publications in European Radiology, Radiology, and SPIE demonstrating efficacy in various clinical applications",
    lastUpdated: "2026-01-26",
    lastRevised: "2026-01-26",
    source: "FDA 510(k) database (K183460, K212074) and company website"
  }
];

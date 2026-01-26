
import { ProductDetails } from "@/types/productDetails";

export const AIRS_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "airs-swiftmr",
    name: "Medical SwiftMR",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-powered MRI enhancement solution that improves image quality and resolution of accelerated or low-quality MR scans.",
    certification: "CE Mark",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://airsmed.com/",
    productUrl: "https://airsmed.com/swiftmr/",
    anatomicalLocation: ["Brain", "Spine"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Spine pathologies"],
    releaseDate: "2021-05-15",
    version: "2.1",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Super-resolution technology",
      "Noise reduction while preserving detail",
      "Compatible with various pulse sequences",
      "Improves suboptimal acquisitions"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Vendor-neutral"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow or manual selection",
      processingTime: "<10 seconds per series"
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
        clearanceNumber: "K230854",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2023-10-27"
      },
      intendedUseStatement: "Intended for enhancing magnetic resonance images to improve image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    clinicalEvidence: "Clinical studies showing improved diagnostic confidence and efficiency when interpreting enhanced images",
    lastUpdated: "2025-02-10",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company website"
  }
];

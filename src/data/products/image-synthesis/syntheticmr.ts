
import { ProductDetails } from "@/types/productDetails";

export const SYNTHETICMR_PRODUCTS: ProductDetails[] = [
  {
    id: "syntheticmr-neuro",
    name: "SyMRI Neuro",
    company: "SyntheticMR",
    companyUrl: "https://syntheticmr.com/",
    productUrl: "https://syntheticmr.com/products/symri-neuro/",
    description: "Deep learning-powered MR image synthesis solution that generates multiple contrasts from a single MRI scan.",
    features: [
      "MR image synthesis",
      "Multiple contrasts from single scan",
      "Synthetic CT generation",
      "Quantitative tissue mapping"
    ],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/syntheticMRI.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/syntheticmr.ts",
    website: "https://syntheticmr.com/products/symri-neuro/",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Neuroradiology",
    diseaseTargeted: ["Brain Tumors", "Multiple Sclerosis", "Neurodegenerative Disorders"],
    keyFeatures: [
      "Deep learning-based synthetic contrast generation",
      "Quantitative tissue mapping",
      "Reduced scan time",
      "Streamlined workflow"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["Single MRI sequence"],
      inputFormat: ["DICOM"],
      output: ["Multiple synthetic contrasts"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS integration", "Vendor-neutral platforms"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic after acquisition",
      processingTime: "Minutes per dataset"
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
        decisionDate: "2024-12-06",
        notes: "Latest version 15 cleared December 2024"
      },
      intendedUseStatement: "For use in generating synthetic MR contrasts and quantitative tissue maps from a single MRI acquisition to support clinical diagnosis."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "15",
    releaseDate: "2024-12-06",
    lastUpdated: "2025-12-01",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company website"
  }
];

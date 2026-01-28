
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
      "Quantitative tissue mapping (T1, T2, PD)",
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
        regulation: "MDR (EU 2017/745)",
        notes: "CE-marked June 2024"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K242745, K233733",
        productCode: "LNH",
        regulationNumber: "21 CFR 892.1000",
        type: "510(k)",
        decisionDate: "2024-12-06",
        notes: "K242745 (Dec 2024) for SyMRI 15; K233733 (Mar 2024) for previous version"
      },
      intendedUseStatement: "SyMRI is intended as a post-processing software for MR images. It provides synthetic MR images and quantitative tissue maps (T1, T2, PD) from a single MR acquisition to support clinical diagnosis."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    version: "15",
    releaseDate: "2024-12-06",
    lastUpdated: "2025-12-01",
    lastRevised: "2026-01-27",
    source: "FDA 510(k) database (K242745, K233733) and company website"
  },
  {
    id: "syntheticmr-spine",
    name: "SyMRI Spine",
    company: "SyntheticMR",
    companyUrl: "https://syntheticmr.com/",
    productUrl: "https://syntheticmr.com/products/symri-spine/",
    description: "MR image synthesis solution for spine imaging that generates multiple contrasts and quantitative tissue maps from a single MRI scan.",
    features: [
      "Synthetic MR contrasts for spine",
      "Quantitative tissue mapping",
      "Single scan workflow",
      "Compatible with SyMRI platform"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/syntheticMRI.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/syntheticmr.ts",
    website: "https://syntheticmr.com/products/symri-spine/",
    anatomicalLocation: ["Spine"],
    modality: "MRI",
    subspeciality: "Musculoskeletal Radiology",
    diseaseTargeted: ["Degenerative Disc Disease", "Spinal Stenosis", "Spinal Tumors"],
    keyFeatures: [
      "Synthetic MR contrasts for spine imaging",
      "Quantitative tissue mapping (T1, T2, PD)",
      "Single scan workflow",
      "Compatible with SyMRI platform"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Single MRI sequence"],
      inputFormat: ["DICOM"],
      output: ["Multiple synthetic contrasts", "Quantitative maps"],
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
        status: "Pending Approval",
        notes: "510(k) submitted November 2020, not yet cleared"
      },
      intendedUseStatement: "SyMRI Spine is intended for post-processing of spine MR images to generate synthetic contrasts and quantitative tissue maps to support clinical diagnosis."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      availability: "CE markets only"
    },
    lastUpdated: "2026-01-27",
    lastRevised: "2026-01-27",
    source: "Company website and regulatory filings"
  }
];

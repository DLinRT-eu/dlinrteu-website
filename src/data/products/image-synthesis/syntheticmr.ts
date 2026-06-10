import { ProductDetails } from "@/types/productDetails";

export const SyMRINeuro: ProductDetails = {
  id: "syntheticmr-neuro",
  name: "SyMRI Neuro",
  market: {
    onMarketSince: "2023",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  source: "FDA 510(k) database (K242745, K233733) and company website",
  company: "SyntheticMR",
  logoUrl: "/logos/syntheticMRI.png",
  version: "15",
  website: "https://syntheticmr.com/products/symri-neuro/",
  category: "Image Synthesis",
  evidence: [
    {
      link: "https://doi.org/10.3174/ajnr.A8631",
      type: "Peer-Reviewed Publication",
      level: "3",
      description: "Prospective multicenter multireader study comparing 3D synthetic vs conventional brain MRI using SyMRI 15 (AJNR 2025)."
    }
  ],
  features: [
    "MR image synthesis",
    "Multiple contrasts from single scan",
    "Synthetic CT generation",
    "Quantitative tissue mapping"
  ],
  modality: "MRI",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/syntheticmr.ts",
  companyUrl: "https://syntheticmr.com/",
  productUrl: "https://syntheticmr.com/products/symri-neuro/",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      notes: "CE-marked June 2024",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "K242745 (Dec 2024) for SyMRI 15; K233733 (Mar 2024) for previous version",
      status: "510k_cleared",
      productCode: "LNH",
      decisionDate: "2024-12-06",
      clearanceNumber: "K242745, K233733",
      regulationNumber: "21 CFR 892.1000"
    },
    intendedUseStatement: "SyMRI is intended as a post-processing software for MR images. It provides synthetic MR images and quantitative tissue maps (T1, T2, PD) from a single MR acquisition to support clinical diagnosis."
  },
  technology: {
    deployment: ["Cloud-based", "On-premises"],
    integration: ["PACS integration", "Vendor-neutral platforms"],
    processingTime: "Minutes per dataset",
    triggerForAnalysis: "Automatic after acquisition"
  },
  description: "Deep learning-powered MR image synthesis solution that generates multiple contrasts from a single MRI scan.",
  keyFeatures: [
    "Deep learning-based synthetic contrast generation",
    "Quantitative tissue mapping (T1, T2, PD)",
    "Reduced scan time",
    "Streamlined workflow"
  ],
  lastRevised: "2026-05-20",
  lastUpdated: "2025-12-01",
  releaseDate: "2024-12-06",
  certification: "CE & FDA",
  evidenceRigor: "E2",
  subspeciality: "Neuroradiology",
  clinicalImpact: "I2",
  diseaseTargeted: ["Brain Tumors", "Multiple Sclerosis", "Neurodegenerative Disorders"],
  adoptionReadiness: "R3",
  anatomicalLocation: ["Brain"],
  evidenceRigorNotes: "Multiple peer-reviewed publications on SyMRI quantitative mapping, though primarily focused on diagnostic neuroradiology rather than radiotherapy applications.",
  clinicalImpactNotes: "No RT-specific clinical outcome data. Primary use case is diagnostic neuroradiology.",
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["Single MRI sequence"],
    output: ["Multiple synthetic contrasts"],
    population: "Adult and pediatric patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM"]
  }
};

export const SYNTHETICMR_PRODUCTS: ProductDetails[] = [SyMRINeuro];

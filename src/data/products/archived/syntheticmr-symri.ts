// Archived 2026-06-16: SyMRI is a post-processing pipeline based on
// multi-dynamic multi-echo (MDME) quantitative relaxometry and model-based
// T1/T2/PD parameter fitting — not deep learning. Verified against FDA
// 510(k) summaries K162943, K191036, K233733, K242745 and the SyMRI 11
// User Manual; none reference AI/ML. Fails the AI/DL inclusion gate.
import { ProductDetails } from "@/types/productDetails";

const SyMRINeuro: ProductDetails = {
  id: "syntheticmr-neuro",
  trainingData: {
      disclosureLevel: "minimal",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242745.pdf",
      source: "FDA 510(k) summary K242745"
  },
  evaluationData: {
      primaryEndpoint: "Comparison of synthetic vs conventional brain MRI",
      source: "AJNR 2025 (DOI: 10.3174/ajnr.A8631)",
      studyDesign: "Prospective multicenter multireader study",
      results: "Not publicly disclosed",
      sourceUrl: "https://doi.org/10.3174/ajnr.A8631",
      description: "Prospective multicenter multireader study comparing 3D synthetic vs conventional brain MRI using SyMRI 15."
  },
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
    },
    {
      link: "https://doi.org/10.1016/j.radonc.2026.111530",
      type: "Indirect-Comparative",
      description: "Cusumano D, Maspero M et al. Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative. Radiother Oncol 2026. Community benchmark for MR-only RT commissioning; relevant to SyMRI synthetic-CT use in RT contexts but not a direct SyMRI evaluation."
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
  description: "MDME-based quantitative MR post-processing (T1/T2/PD relaxometry + synthetic contrast generation). Archived from the live catalogue: no deep-learning component in the vendor IFU or FDA 510(k); does not meet the AI/DL inclusion gate.",
  keyFeatures: [
    "Quantitative tissue mapping (T1, T2, PD) from MDME acquisition",
    "Synthetic contrast generation via model-based fitting (non-AI)",
    "Reduced scan time",
    "Streamlined workflow"
  ],
  lastRevised: "2026-06-16",
  lastUpdated: "2026-06-16",
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
  adoptionReadinessNotes: "Archived: non-AI technology, excluded from live catalogue per inclusion gate.",
  usesAI: false,
  technicalSpecifications: {
    input: ["Single MRI sequence"],
    output: ["Multiple synthetic contrasts"],
    population: "Adult and pediatric patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM"]
  }
};

export const SYNTHETICMR_SYMRI_ARCHIVED: ProductDetails[] = [SyMRINeuro];


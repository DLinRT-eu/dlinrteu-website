
import { ProductDetails } from "@/types/productDetails";

export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite (HCAP-Segmentation)",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/everfortune.ts",
    description: "AI-powered head and neck auto-segmentation solution for radiation therapy planning, specialized in comprehensive organ-at-risk delineation for the head and neck region.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ever-fortune.png",
    website: "https://www.everfortuneai.com.tw/en/",
    anatomicalLocation: ["Head & Neck"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer"],
    keyFeatures: ["Deep learning segmentation", "Head & Neck specialization", "Workflow integration", "Fast processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K252105",
        productCode: "QKB",
        decisionDate: "2025-09-26",
        notes: "HCAP-Segmentation System for head-and-neck CT auto-segmentation"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in the head and neck region for radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "2.5",
    releaseDate: "2025-09-01",
    lastUpdated: "2026-01-15",
    supportedStructures: [
      // Head & Neck Structures - OARs (17 confirmed per FDA clearance)
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Optic Nerve (L/R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Esophagus",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Eye (L/R)",
      "Head & Neck: Lens (L/R)",
      "Head & Neck: Cochlea (L/R)",
      "Head & Neck: Larynx",
      "Head & Neck: Pharyngeal Constrictor"
    ],
    lastRevised: "2026-01-15",
    source: "FDA 510(k) database (K252105), company official sources"
  }
];

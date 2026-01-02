
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-ai-rad-companion",
    name: "AI-Rad Companion Organs RT",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/en-us/digital-health-solutions/ai-rad-companion",
    description: "AI-powered post-processing software for automatic organ-at-risk (OAR) contouring in radiation therapy planning. Uses deep-learning algorithms to segment pre-defined anatomical structures from CT and MR images. Part of the AI-Rad Companion family of intelligent software assistants.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/en-us/digital-health-solutions/ai-rad-companion",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered automatic organ-at-risk contouring",
      "Deep learning algorithms for CT and MR segmentation",
      "203+ predefined CT structures including lymph nodes",
      "Multi-guideline support (RTOG and clinical guidelines)",
      "DICOM-RT Structure Set output",
      "Cloud and edge deployment options",
      "Vendor-agnostic CT input support",
      "Integration with Treatment Planning Systems"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT (vendor agnostic)", "MR (Siemens Healthineers scanners)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Clinical findings"],
      outputFormat: ["DICOM-RT", "Structured reports"]
    },
    technology: {
      integration: ["Native integration with Siemens systems", "PACS integration", "TPS integration"],
      deployment: ["Cloud-based", "On-premises", "Edge deployment"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "II",
        clearanceNumber: "K242745",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-03-27"
      },
      intendedUseStatement: "AI-Rad Companion Organs RT is a post-processing software intended to automatically contour DICOM CT and MR pre-defined structures using deep-learning-based algorithms. Contours may be used as input for clinical workflows including external beam radiation therapy treatment planning. Must be used in conjunction with Treatment Planning Systems to review, edit, and accept contours. Not intended to automatically detect or contour lesions."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
    },
    clinicalEvidence: "Performance validated on 579 CT cases across North America, South America, Asia, Australia, and Europe. Ground truth annotations established following RTOG and clinical guidelines. Mean Dice coefficients: Head & Neck 76.1%, Thorax 76.9%, Abdomen 87.3%, Pelvis 85.7%.",
    version: "VA60A",
    releaseDate: "2025-03-27",
    lastUpdated: "2025-03-27",
    supportedStructures: [
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Parotid Glands (L/R)",
      "Head & Neck: Submandibular Glands (L/R)",
      "Head & Neck: Mandible",
      "Head & Neck: Cochlea (L/R)",
      "Head & Neck: Eyes (L/R)",
      "Head & Neck: Optic Nerves (L/R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Lens (L/R)",
      "Head & Neck: Larynx",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Lymph Node Levels I-VII",
      "Thorax: Heart",
      "Thorax: Lungs (L/R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Great Vessels",
      "Thorax: Brachial Plexus (L/R)",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L/R)",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Heads (L/R)",
      "Pelvis: Prostate (male)",
      "Pelvis: Seminal Vesicles (male)",
      "Pelvis: Penile Bulb (male)"
    ],
    lastRevised: "2026-01-02",
    source: "FDA 510(k) K242745, Siemens Healthineers official documentation",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/siemens.ts"
  }
];

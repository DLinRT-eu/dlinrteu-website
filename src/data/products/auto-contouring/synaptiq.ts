
import { ProductDetails } from "@/types/productDetails";

export const SYNAPTIQ_PRODUCTS: ProductDetails[] = [
  {
    id: "synaptiq-mediq-rt",
    name: "Mediq RT",
    company: "Synaptiq",
    companyUrl: "https://synaptiq.io/",
    productUrl: "https://synaptiq.io/product/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/synaptiq.ts",
    description: "AI-powered solution for radiation therapy planning with advanced auto-contouring capabilities. Currently in clinical testing phase (Investigation use only - not yet CE/FDA certified). Features unique Active Contouring technology and adaptive learning for personalized contouring.",
    category: "Auto-Contouring",
    certification: "Pending",
    logoUrl: "/logos/synaptiq.png",
    website: "https://synaptiq.io/product/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Brachytherapy"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "92.5% average time saving in contouring workflow",
      "Adaptive learning according to user's individual technique",
      "Active Contouring - GTV delineation from single slice input",
      "AI-based interactive contour revisions",
      "Multi-vendor and multi-modality integration",
      "Cloud-based data storage and visualization"
    ],
    supportedStructures: [
      // Head & Neck
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Optic Nerve (L)",
      "Head & Neck: Optic Nerve (R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Eye (L)",
      "Head & Neck: Eye (R)",
      "Head & Neck: Lens (L)",
      "Head & Neck: Lens (R)",
      "Head & Neck: Parotid Gland (L)",
      "Head & Neck: Parotid Gland (R)",
      "Head & Neck: Submandibular Gland (L)",
      "Head & Neck: Submandibular Gland (R)",
      "Head & Neck: Mandible",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Pharynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Cochlea (L)",
      "Head & Neck: Cochlea (R)",
      "Head & Neck: Lymph Nodes",
      
      // Thorax
      "Thorax: Heart",
      "Thorax: Lung (L)",
      "Thorax: Lung (R)",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Thorax: Brachial Plexus (L)",
      "Thorax: Brachial Plexus (R)",
      "Thorax: Great Vessels",
      "Thorax: Trachea",
      "Thorax: Aorta",
      "Thorax: Pulmonary Vessels",
      "Thorax: Lymph Nodes",
      
      // Abdomen
      "Abdomen: Liver",
      "Abdomen: Kidney (L)",
      "Abdomen: Kidney (R)",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Pancreas",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Abdomen: Spinal Cord",
      "Abdomen: Adrenal Gland (L)",
      "Abdomen: Adrenal Gland (R)",
      
      // Pelvis
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Bowel Bag",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Uterus",
      "Pelvis: Ovary (L)",
      "Pelvis: Ovary (R)",
      "Pelvis: Cervix",
      "Pelvis: Vagina",
      "Pelvis: Lymph Nodes"
    ],
    limitations: [
      "Investigation use only - not approved for clinical use",
      "Requires verification by qualified radiation oncologist",
      "Performance may vary based on image quality"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Multi-vendor TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "Desktop (Windows 7+, MacOS 10.14+)"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Seconds to minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not yet certified - Investigation use only",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "Not yet cleared - Investigation use only"
      },
      intendedUseStatement: "For investigation use only. Automatic segmentation of organs at risk in radiation therapy planning. Not approved for clinical use."
    },
    market: {
      onMarketSince: "2021 (testing in 12+ Romanian clinics, EBRD-backed)",
      distributionChannels: ["Direct sales", "Hospital partnerships"]
    },
    version: "2.0",
    releaseDate: "2023-08-20",
    lastUpdated: "2024-03-05",
    lastRevised: "2025-12-02",
    source: "Company website and public sources"
  }
];

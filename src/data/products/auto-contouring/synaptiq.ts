
import { ProductDetails } from "@/types/productDetails";

export const SYNAPTIQ_PRODUCTS: ProductDetails[] = [
  {
    id: "synaptiq-mediq-rt",
    name: "Mediq RT",
    company: "Synaptiq",
    companyUrl: "https://synaptiq.io/",
    productUrl: "https://synaptiq.io/product/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/synaptiq.ts",
    description: "AI-powered solution for radiation therapy planning with advanced auto-contouring capabilities. Supports auto-segmentation on CT and MRI, and multi-modality image registration for CT, MRI, and PET/CT. Currently in clinical testing phase (Investigation use only - not yet CE/FDA certified). Features unique Active Contouring technology and adaptive learning for personalized contouring.",
    category: "Auto-Contouring",
    secondaryCategories: ["Registration"],
    certification: "Pending",
    logoUrl: "/logos/synaptiq.png",
    website: "https://synaptiq.io/product/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Brachytherapy"],
    modality: ["CT", "MRI", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "92.5% average time saving in contouring workflow",
      "Adaptive learning according to user's individual technique",
      "Active Contouring - GTV delineation from single slice input",
      "AI-based interactive contour revisions",
      "Auto-segmentation on CT and MRI modalities",
      "Image registration for MRI, PET/CT, and CT modalities",
      "Multi-vendor and multi-modality integration",
      "Cloud-based data storage and visualization"
    ],
    supportedStructures: [
      // Breast (Doolan 2024 internal study)
      "Breast: Heart",
      "Breast: Lung_L",
      "Breast: Lung_R",
      "Breast: Liver",
      "Breast: Humerus_L",
      "Breast: Humerus_R",
      "Breast: Breast_L",
      "Breast: Breast_R",
      "Breast: Esophagus",
      "Thorax: SpinalCanal",
      
      // Head & Neck (Doolan 2024 internal study)
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Eye_L",
      "Head & Neck: Eye_R",
      "Head & Neck: Lens_L",
      "Head & Neck: Lens_R",
      "Head & Neck: OpticNrv_L",
      "Head & Neck: OpticNrv_R",
      "Head & Neck: OpticChiasm",
      "Head & Neck: Pituitary",
      "Head & Neck: Glnd_Lacrimal_L",
      "Head & Neck: Glnd_Lacrimal_R",
      "Head & Neck: Ear_Internal_L",
      "Head & Neck: Ear_Internal_R",
      "Head & Neck: Bone_Mandible",
      "Head & Neck: Parotid_L",
      "Head & Neck: Parotid_R",
      "Head & Neck: Glnd_Submand_L",
      "Head & Neck: Glnd_Submand_R",
      "Head & Neck: Larynx",
      "Head & Neck: Trachea",
      "Head & Neck: SpinalCord",
      
      // Thorax (Doolan 2024 internal study)
      "Thorax: Lung_L",
      "Thorax: Lung_R",
      "Thorax: Heart",
      "Thorax: Liver",
      "Thorax: Esophagus",
      "Thorax: SpinalCanal",
      
      // Abdomen - SOURCE UNVERIFIED: Original source unknown
      "Abdomen: Liver (unverified)",
      "Abdomen: Kidney (L) (unverified)",
      "Abdomen: Kidney (R) (unverified)",
      "Abdomen: Spleen (unverified)",
      "Abdomen: Stomach (unverified)",
      "Abdomen: Pancreas (unverified)",
      "Abdomen: Duodenum (unverified)",
      "Abdomen: Small Bowel (unverified)",
      "Abdomen: Large Bowel (unverified)",
      "Abdomen: Spinal Cord (unverified)",
      "Abdomen: Adrenal Gland (L) (unverified)",
      "Abdomen: Adrenal Gland (R) (unverified)",
      
      // Pelvis (Doolan 2024 internal study)
      "Pelvis: Bag_Bowel",
      "Pelvis: Bowels",
      "Pelvis: Colon_Sigmoid",
      "Pelvis: Femur_Head_L",
      "Pelvis: Femur_Head_R",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Prostate",
      "Pelvis: Penile Bulb",
      "Pelvis: Seminal Vesicles",
      ],
    limitations: [
      "Investigation use only - not approved for clinical use",
      "Requires verification by qualified radiation oncologist",
      "Performance may vary based on image quality"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET/CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
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
    evidence: [
      {
        type: "journal",
        description: "Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy. Physics and Imaging in Radiation Oncology (2026).",
        link: "https://doi.org/10.1016/j.phro.2026.100935"
      },
      {
        type: "conference",
        description: "The impact of AI-driven templates in brachytherapy practice. ESTRO 2025 Abstract Book p. 283.",
        link: ""
      },
      {
        type: "conference",
        description: "Enhanced Efficiency in GTV Delineation: Evaluating AI 'Active Contouring' Tool. ESTRO 2025 Abstract Book p. 2558.",
        link: ""
      },
      {
        type: "conference",
        description: "Future liver remnant meets the future of medicine: AI integration in liver metastases assessment and treatment selection. ESTRO 2025 Abstract Book p. 2569.",
        link: ""
      },
      {
        type: "conference",
        description: "Explainable AI for deep learning-based markerless lung tumor tracking. ESTRO 2025 Abstract Book p. 3246.",
        link: ""
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Peer-reviewed journal publication in PHIRO (doi:10.1016/j.phro.2026.100935) plus four ESTRO 2025 conference abstracts. Single-center/vendor-associated studies; not independently validated across multiple sites.",
    clinicalImpactNotes: "No published clinical impact data. Product in investigation phase only. Published evidence is comparative technical analysis.",
    version: "2.0",
    releaseDate: "2023-08-20",
    lastUpdated: "2024-03-05",
    lastRevised: "2026-03-27",
    source: "Company website, internal clinical study (Jan 2024), PHIRO journal paper (2026), ESTRO 2025 abstracts. Note: Abdomen structures require source verification."
  }
];

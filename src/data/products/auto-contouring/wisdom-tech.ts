
import { ProductDetails } from "@/types/productDetails";

export const WISDOM_TECH_PRODUCTS: ProductDetails[] = [
  {
    id: "wisdom-deep-contour",
    name: "DeepContour",
    company: "Wisdom Tech",
    companyUrl: "http://www.wisdom-tech.online/",
    productUrl: "http://www.wisdom-tech.online/view-16.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/wisdom-tech.ts",
    description: "AI solution for automatic contour segmentation in radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "NMPA (China), FDA 510(k)",
    logoUrl: "/logos/wisdom-tech.png",
    website: "http://www.wisdom-tech.online/view-16.html",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    supportedStructures: supportedStructures: [

    // Head & Neck
    "Head & Neck: Brain",
    "Head & Neck: BrainStem",
    "Head & Neck: SpinalCord",
    "Head & Neck: Cochlea_L",
    "Head & Neck: Cochlea_R",
    "Head & Neck: Eye_L",
    "Head & Neck: Eye_R",
    "Head & Neck: Lens_L",
    "Head & Neck: Lens_R",
    "Head & Neck: Larynx",
    "Head & Neck: Larynx_extend",
    "Head & Neck: Mandible",
    "Head & Neck: Optic_Chiasm",
    "Head & Neck: OpticalNerve_L",
    "Head & Neck: OpticalNerve_R",
    "Head & Neck: OralCavity",
    "Head & Neck: OralCavity_WithGum",
    "Head & Neck: Parotid_L",
    "Head & Neck: Parotid_R",
    "Head & Neck: Pituitary",
    "Head & Neck: Temporal_Lobe_L",
    "Head & Neck: Temporal_Lobe_R",
    "Head & Neck: TemporalLobe_withHippo_L",
    "Head & Neck: TemporalLobe_withHippo_R",
    "Head & Neck: TMJ_L",
    "Head & Neck: TMJ_R",
    "Head & Neck: InternalAcousticCanal_L",
    "Head & Neck: InternalAcousticCanal_R",
    "Head & Neck: MiddleEar_L",
    "Head & Neck: MiddleEar_R",
    "Head & Neck: EustachianTubeBone_L",
    "Head & Neck: EustachianTubeBone_R",
    "Head & Neck: TympanicCavity_L",
    "Head & Neck: TympanicCavity_R",
    "Head & Neck: Vestibule_L",
    "Head & Neck: Vestibule_R",
    "Head & Neck: InnerEar_L",
    "Head & Neck: InnerEar_R",
    "Head & Neck: Submandibular_L",
    "Head & Neck: Submandibular_R",
    "Head & Neck: PharyngealConstrictors_U",
    "Head & Neck: PharyngealConstrictors_M",
    "Head & Neck: PharyngealConstrictors_L",
    "Head & Neck: Hippocampus_L",
    "Head & Neck: Hippocampus_R",
  
    // Thorax
    "Thorax: Lung_L",
    "Thorax: Lung_R",
    "Thorax: Lung_All",
    "Thorax: Heart",
    "Thorax: Trachea",
    "Thorax: Esophagus",
    "Thorax: Breast_L",
    "Thorax: Breast_R",
    "Thorax: Aorta",
    "Thorax: BrachialPlexus_L",
    "Thorax: BrachialPlexus_R",
  
    // Abdomen
    "Abdomen: Liver",
    "Abdomen: Kidney_L",
    "Abdomen: Kidney_R",
    "Abdomen: Duodenum",
    "Abdomen: Pancreas",
    "Abdomen: Smallintestine",
    "Abdomen: Stomach",
    "Abdomen: Sigmoid",
    "Abdomen: Spleen",
  
    // Pelvis
    "Pelvis: Bowelbag",
    "Pelvis: Bladder",
    "Pelvis: Rectum",
    "Pelvis: Femur_Head_L",
    "Pelvis: Femur_Head_R",
    "Pelvis: Pelvis",
    "Pelvis: Marrow",
    "Pelvis: SeminalVesicle",
    "Pelvis: Testis",
    "Pelvis: Prostate",
    "Pelvis: Ovid_L",
    "Pelvis: Ovid_R",
  
    // Whole Body
    "Whole Body: Body"
    ],
    
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not certified"
      },
      fda: {
        status: "510k_cleared",
        decisionDate: "2024-05-08",
        notes: "ID=K232928, URL: https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232928.pdf"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales (China)"]
    },
    version: "2.0",
    releaseDate: "2024-04-17",
    lastUpdated: "2026-01-26",
    lastRevised: "2026-01-26",
    source: "Company official sources - NMPA (China) certified"
  }
];

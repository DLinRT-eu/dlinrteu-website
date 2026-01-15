import { ProductDetails } from "@/types/productDetails";
import { standardizeProduct } from "@/utils/productDataUtils";

// Define the standardized product data first
const rawProduct: ProductDetails = {
  id: "coreline-aview-rt-acs",
  name: "Aview RT ACS",
  company: "Coreline Soft Co",
  companyUrl: "https://www.corelinesoft.com/en/",
  productUrl: "https://www.corelinesoft.com/en/solutions/rt-acs",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/coreline.ts",
  description: "AI-powered automatic contouring server for radiation therapy planning, providing rapid and accurate organ segmentation using deep learning algorithms across brain, head & neck, thorax, breast, abdomen, and pelvis regions.",
  category: "Auto-Contouring",
  certification: "CE & FDA",
  logoUrl: "/logos/coreline.jpg",
  website: "https://www.corelinesoft.com/en/solutions/rt-acs",
  anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis"],
  modality: ["CT"],
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  keyFeatures: [
    "Deep learning segmentation", 
    "Fast processing", 
    "Clinical workflow integration", 
    "Multi-organ support", 
    "Quality assurance tools",
    "Breast contouring support"
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RT"]
  },
  technology: {
    integration: ["TPS integration", "PACS integration"],
    deployment: ["On-premises"],
    triggerForAnalysis: "Manual or automated",
    processingTime: "Minutes per patient"
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
      notes: "FDA clearance confirmed. Clearance number pending verification."
    },
    intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
  },
  market: {
    onMarketSince: "2019",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  version: "4.0",
  releaseDate: "2025-08-20",
  lastUpdated: "2026-01-15",
  lastRevised: "2026-01-15",
  supportedStructures: [
    // Brain Structures - OARs
    "Brain: Brain",
    "Brain: Brainstem",
    "Brain: Pituitary",
    "Brain: Eye (L/R)",
    "Brain: Lens (L/R)",
    "Brain: Optic Chiasm",
    "Brain: Optic Nerve (L/R)",
    "Brain: Submandibular Gland (L/R)",
    "Brain: Cochlea (L/R)",
    
    // Head & Neck Structures - OARs
    "Head & Neck: Spinal Cord",
    "Head & Neck: Inner Ear (L/R)",
    "Head & Neck: Thyroid",
    "Head & Neck: Larynx",
    "Head & Neck: Mandible",
    "Head & Neck: Oral Cavity",
    "Head & Neck: Parotid Gland (L/R)",
    "Head & Neck: Lymph Node Level IA",
    "Head & Neck: Lymph Node Level IB",
    "Head & Neck: Lymph Node Level II",
    "Head & Neck: Lymph Node Level III",
    "Head & Neck: Lymph Node Level IVA",
    "Head & Neck: Lymph Node Level IVB",
    "Head & Neck: Lymph Node Level V",
    "Head & Neck: Esophagus",
    "Head & Neck: Pharyngeal Constrictor",
    
    // Thorax Structures - OARs
    "Thorax: Esophagus",
    "Thorax: Spinal Cord",
    "Thorax: Lung (L/R)",
    "Thorax: Heart",
    "Thorax: Lymph Node Level II",
    "Thorax: Axillary Lymph Nodes Level III",
    "Thorax: Supraclavicular Lymph Node",
    "Thorax: Trachea",
    "Thorax: Aorta",
    "Thorax: Great Vessels",
    
    // Breast Structures - OARs
    "Breast: Heart",
    "Breast: Breast (L/R)",
    "Breast: Lung (L/R)",
    "Breast: Thyroid",
    "Breast: Esophagus",
    "Breast: Spinal Cord",
    "Breast: Internal Mammary Lymph Nodes (L/R)",
    "Breast: Axillary Lymph Nodes Level I (L/R)",
    "Breast: Axillary Lymph Nodes Level II (L/R)",
    "Breast: Axillary Lymph Nodes Level III (L/R)",
    "Breast: Supraclavicular Lymph Node ESTRO",
    "Breast: Supraclavicular Lymph Node RTOG",
    
    // Abdomen Structures - OARs
    "Abdomen: Liver",
    "Abdomen: Kidney (L/R)",
    "Abdomen: Stomach",
    "Abdomen: Spleen",
    "Abdomen: Duodenum",
    "Abdomen: Pancreas",
    "Abdomen: Small Bowel",
    "Abdomen: Gallbladder",
    
    // Pelvis Structures - OARs
    "Pelvis: Anorectum",
    "Pelvis: Rectum",
    "Pelvis: Cauda Equina",
    "Pelvis: Bowel Bag",
    "Pelvis: Femur (L/R)",
    "Pelvis: Bladder",
    "Pelvis: Seminal Vesicle",
    "Pelvis: Cervix",
    "Pelvis: Penile Bulb",
    "Pelvis: Spinal Cord",
    "Pelvis: Prostate",
    "Pelvis: Sigmoid Colon",
    "Pelvis: Uterus",
    "Pelvis: Ovary (L/R)"
  ],
  source: "Company official sources",
};

// Apply all the standardization functions
export const CORELINE_PRODUCTS: ProductDetails[] = [
  standardizeProduct(rawProduct)
];

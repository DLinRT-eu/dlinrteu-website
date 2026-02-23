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
    outputFormat: ["DICOM-RTSTRUCT"]
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
      clearanceNumber: "K200714",
      productCode: "QKB",
      regulationNumber: "21 CFR 892.2050",
      decisionDate: "2020-09-17",
      notes: "Cleared as AVIEW platform. RT ACS is the radiation therapy auto-contouring module. URL: https://www.accessdata.fda.gov/cdrh_docs/pdf20/K200714.pdf"
    },
    intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
  },
  market: {
    onMarketSince: "2019",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  version: "4.0",
  releaseDate: "2025-08-20",
  lastUpdated: "2026-02-23",
  lastRevised: "2026-02-23",
  supportedStructures: [
    // Head & Neck
    "Head & Neck: Brain",
    "Head & Neck: Pituitary",
    "Head & Neck: Brainstem",
    "Head & Neck: Glnd_Submand_L",
    "Head & Neck: Glnd_Submand_R",
    "Head & Neck: Eye_L",
    "Head & Neck: Eye_R",
    "Head & Neck: SpinalCord",
    "Head & Neck: Ear_Internal_L",
    "Head & Neck: Ear_Internal_R",
    "Head & Neck: Thyroid",
    "Head & Neck: Larynx",
    "Head & Neck: Lens_L",
    "Head & Neck: Lens_R",
    "Head & Neck: Bone_Mandible",
    "Head & Neck: OralCavity",
    "Head & Neck: Parotid_L",
    "Head & Neck: Parotid_R",
    "Head & Neck: OpticChiasm",
    "Head & Neck: OpticNrv_L",
    "Head & Neck: OpticNrv_R",
    
    // Head & Neck lymph nodes
    "Head & Neck: LN_Neck_IA_L",
    "Head & Neck: LN_Neck_IA_R",
    "Head & Neck: LN_Neck_IB_L",
    "Head & Neck: LN_Neck_IB_R",
    "Head & Neck: LN_Neck_II_L",
    "Head & Neck: LN_Neck_II_R",
    "Head & Neck: LN_Neck_III_L",
    "Head & Neck: LN_Neck_III_R",
    "Head & Neck: LN_Neck_IVa_L",
    "Head & Neck: LN_Neck_IVb_L",
    "Head & Neck: LN_Neck_V_L",
    
    // Thorax / Breast
    "Thorax: Heart",
    "Thorax: Breast_L",
    "Thorax: Breast_R",
    "Thorax: Lung_L",
    "Thorax: Lung_R",
    "Thorax: Esophagus",
    "Thorax: SpinalCord",
    "Thorax: LN_Axillary_1_L",
    "Thorax: LN_Axillary_1_R",
    "Thorax: LN_Axillary_2_L",
    "Thorax: LN_Axillary_2_R",
    "Thorax: LN_Axillary_3_L",
    "Thorax: LN_Axillary_3_R",
    "Thorax: LN_InternalMammary_L",
    "Thorax: LN_InternalMammary_R",
    "Thorax: LN_Supraclavicular_ESTRO_L",
    "Thorax: LN_Supraclavicular_ESTRO_R",
    "Thorax: LN_Supraclavicular_RTOG_L",
    "Thorax: LN_Supraclavicular_RTOG_R",
    "Thorax: Thyroid",
    
    // Abdomen
    "Abdomen: Liver",
    "Abdomen: Kidney_L",
    "Abdomen: Kidney_R",
    "Abdomen: Stomach",
    "Abdomen: Spleen",
    "Abdomen: Duodenum",
    
    // Pelvis
    "Pelvis: Anorectum",
    "Pelvis: CaudaEquina",
    "Pelvis: BowelBag",
    "Pelvis: Femur_L",
    "Pelvis: Femur_R",
    "Pelvis: Bladder",
    "Pelvis: SeminalVesicle",
    "Pelvis: Cervix",
    "Pelvis: PenileBulb",
    "Pelvis: SpinalCord",
    "Pelvis: Prostate"
  ],
  evidenceRigor: "E1",
  clinicalImpact: "I2",
  evidenceRigorNotes: "Limited independent peer-reviewed evidence. FDA validation data (K200714). Single-center evaluations available.",
  clinicalImpactNotes: "FDA validation data demonstrates geometric accuracy. Limited independent clinical impact publications.",
  source: "Company official sources",
};

// Apply all the standardization functions
export const CORELINE_PRODUCTS: ProductDetails[] = [
  standardizeProduct(rawProduct)
];

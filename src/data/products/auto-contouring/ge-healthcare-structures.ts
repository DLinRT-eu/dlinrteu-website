
/**
 * Supported structures for GE Healthcare Auto Segmentation
 * Based on FDA 510(k) K230082 (CT Auto Segmentation) and K242925 (MR Contour DL)
 * Source: FDA 510(k) database, GE Healthcare official documentation
 */

// Brain CT structures
export const GE_BRAIN_CT_STRUCTURES = [
  "Brain-CT: Brain",
  "Brain-CT: Brainstem",
  "Brain-CT: Eye_L",
  "Brain-CT: Eye_R",
  "Brain-CT: Lens_L",
  "Brain-CT: Lens_R",
  "Brain-CT: OpticChiasm",
  "Brain-CT: OpticNrv_L",
  "Brain-CT: OpticNrv_R",
  "Brain-CT: Pituitary",
  "Brain-CT: Cochlea_L",
  "Brain-CT: Cochlea_R",
  "Brain-CT: SpinalCord",
  "Brain-CT: SpinalCanal",
  "Brain-CT: Parotid_L",
  "Brain-CT: Parotid_R",
  "Brain-CT: Glnd_Lacrimal_L",
  "Brain-CT: Glnd_Lacrimal_R"
];

// Head & Neck CT structures
export const GE_HEAD_NECK_CT_STRUCTURES = [
  "Head & Neck-CT: Brain",
  "Head & Neck-CT: Brainstem",
  "Head & Neck-CT: SpinalCord",
  "Head & Neck-CT: SpinalCanal",
  "Head & Neck-CT: Eye_L",
  "Head & Neck-CT: Eye_R",
  "Head & Neck-CT: Lens_L",
  "Head & Neck-CT: Lens_R",
  "Head & Neck-CT: OpticChiasm",
  "Head & Neck-CT: OpticNrv_L",
  "Head & Neck-CT: OpticNrv_R",
  "Head & Neck-CT: Cochlea_L",
  "Head & Neck-CT: Cochlea_R",
  "Head & Neck-CT: Parotid_L",
  "Head & Neck-CT: Parotid_R",
  "Head & Neck-CT: Glnd_Submand_L",
  "Head & Neck-CT: Glnd_Submand_R",
  "Head & Neck-CT: Glnd_Thyroid",
  "Head & Neck-CT: Bone_Mandible",
  "Head & Neck-CT: Cavity_Oral",
  "Head & Neck-CT: Larynx",
  "Head & Neck-CT: Pharynx",
  "Head & Neck-CT: Esophagus",
  "Head & Neck-CT: Trachea",
  "Head & Neck-CT: Lips",
  "Head & Neck-CT: Musc_Constrict"
];

// Thorax CT structures
export const GE_THORAX_CT_STRUCTURES = [
  "Thorax-CT: Lung_L",
  "Thorax-CT: Lung_R",
  "Thorax-CT: Heart",
  "Thorax-CT: Esophagus",
  "Thorax-CT: SpinalCord",
  "Thorax-CT: SpinalCanal",
  "Thorax-CT: Trachea",
  "Thorax-CT: BrachialPlex_L",
  "Thorax-CT: BrachialPlex_R",
  "Thorax-CT: A_Aorta",
  "Thorax-CT: V_Venacava_S",
  "Thorax-CT: V_Venacava_I",
  "Thorax-CT: Liver",
  "Thorax-CT: Stomach",
  "Thorax-CT: Kidney_L",
  "Thorax-CT: Kidney_R",
  "Thorax-CT: Spleen",
  "Thorax-CT: Carina",
  "Thorax-CT: Bronchus",
  "Thorax-CT: Atrium_L",
  "Thorax-CT: Atrium_R",
  "Thorax-CT: Ventricle_L",
  "Thorax-CT: Ventricle_R",
  "Thorax-CT: A_LAD",
  "Thorax-CT: Pericardium"
];

// Abdomen CT structures
export const GE_ABDOMEN_CT_STRUCTURES = [
  "Abdomen-CT: Liver",
  "Abdomen-CT: Kidney_L",
  "Abdomen-CT: Kidney_R",
  "Abdomen-CT: Spleen",
  "Abdomen-CT: Stomach",
  "Abdomen-CT: Pancreas",
  "Abdomen-CT: Duodenum",
  "Abdomen-CT: Bowel_Small",
  "Abdomen-CT: Bowel_Large",
  "Abdomen-CT: Bowel_Bag",
  "Abdomen-CT: SpinalCord",
  "Abdomen-CT: SpinalCanal",
  "Abdomen-CT: A_Aorta",
  "Abdomen-CT: V_Venacava_I",
  "Abdomen-CT: Gallbladder"
];

// Pelvis CT structures
export const GE_PELVIS_CT_STRUCTURES = [
  "Pelvis-CT: Bladder",
  "Pelvis-CT: Rectum",
  "Pelvis-CT: Femur_Head_L",
  "Pelvis-CT: Femur_Head_R",
  "Pelvis-CT: Prostate",
  "Pelvis-CT: SeminalVes",
  "Pelvis-CT: PenileBulb",
  "Pelvis-CT: Bowel_Bag",
  "Pelvis-CT: Bowel_Small",
  "Pelvis-CT: Bowel_Large",
  "Pelvis-CT: SpinalCord",
  "Pelvis-CT: SpinalCanal",
  "Pelvis-CT: Sacrum",
  "Pelvis-CT: Bone_Pelvic",
  "Pelvis-CT: Uterus",
  "Pelvis-CT: Vagina",
  "Pelvis-CT: Ovary_L",
  "Pelvis-CT: Ovary_R"
];

// MR Contour DL structures (K242925 - April 2025)
export const GE_MR_STRUCTURES = [
  "Brain-MR: Brain",
  "Brain-MR: Brainstem",
  "Brain-MR: Hippocampus_L",
  "Brain-MR: Hippocampus_R",
  "Brain-MR: OpticChiasm",
  "Brain-MR: OpticNrv_L",
  "Brain-MR: OpticNrv_R",
  "Brain-MR: Eye_L",
  "Brain-MR: Eye_R",
  "Brain-MR: Pituitary",
  "Pelvis Male-MR: Prostate",
  "Pelvis Male-MR: SeminalVes",
  "Pelvis Male-MR: Rectum",
  "Pelvis Male-MR: Bladder",
  "Pelvis Male-MR: PenileBulb",
  "Pelvis Male-MR: Femur_Head_L",
  "Pelvis Male-MR: Femur_Head_R"
];

// Export all structures combined
export const GE_HEALTHCARE_ALL_STRUCTURES = [
  ...GE_BRAIN_CT_STRUCTURES,
  ...GE_HEAD_NECK_CT_STRUCTURES,
  ...GE_THORAX_CT_STRUCTURES,
  ...GE_ABDOMEN_CT_STRUCTURES,
  ...GE_PELVIS_CT_STRUCTURES,
  ...GE_MR_STRUCTURES
];

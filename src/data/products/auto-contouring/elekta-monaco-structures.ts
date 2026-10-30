/**
 * Supported structures for the Elekta Monaco Segmentation Component (Unity, Monaco 6.3).
 * Naming: "Region: Structure Name", with each vendor model identified by its region label.
 * Structure names as output by the models.
 * Source: Elekta Monaco Segmentation Component Technical Reference Manual E076326/01 (2025),
 * Tables 4, 5, 11 and 17 (vendor-provided, retrieved 2026-10-30); models confirmed in FDA 510(k) K252002.
 */

// ekt_mr_femalepelvis 1.0 — 15 OARs
export const MONACO_FEMALE_PELVIS_INTACT = [
  "Female Pelvis Intact (MR): Anus",
  "Female Pelvis Intact (MR): Bladder",
  "Female Pelvis Intact (MR): Bone_Pelvic_L",
  "Female Pelvis Intact (MR): Bone_Pelvic_R",
  "Female Pelvis Intact (MR): Bag_Bowel",
  "Female Pelvis Intact (MR): Colon_Sigmoid",
  "Female Pelvis Intact (MR): Skin",
  "Female Pelvis Intact (MR): Femur_L",
  "Female Pelvis Intact (MR): Femur_R",
  "Female Pelvis Intact (MR): Rectum",
  "Female Pelvis Intact (MR): Sacrum+Coccyx",
  "Female Pelvis Intact (MR): Urethra",
  "Female Pelvis Intact (MR): Uterocervix",
  "Female Pelvis Intact (MR): Vagina",
  "Female Pelvis Intact (MR): VB_L",
];

// ekt_mr_femalepelvishyst 1.0 — 14 OARs
export const MONACO_FEMALE_PELVIS_HYST = [
  "Female Pelvis Hysterectomy (MR): Anus",
  "Female Pelvis Hysterectomy (MR): Bladder",
  "Female Pelvis Hysterectomy (MR): Bone_Pelvic_L",
  "Female Pelvis Hysterectomy (MR): Bone_Pelvic_R",
  "Female Pelvis Hysterectomy (MR): Bag_Bowel",
  "Female Pelvis Hysterectomy (MR): Colon_Sigmoid",
  "Female Pelvis Hysterectomy (MR): Skin",
  "Female Pelvis Hysterectomy (MR): Femur_L",
  "Female Pelvis Hysterectomy (MR): Femur_R",
  "Female Pelvis Hysterectomy (MR): Rectum",
  "Female Pelvis Hysterectomy (MR): Sacrum+Coccyx",
  "Female Pelvis Hysterectomy (MR): Urethra",
  "Female Pelvis Hysterectomy (MR): Vagina",
  "Female Pelvis Hysterectomy (MR): VB_L",
];

// ekt_mr_malepelvis 1.0 — 13 OARs
export const MONACO_MALE_PELVIS = [
  "Male Pelvis (MR): Anus",
  "Male Pelvis (MR): Anorectum",
  "Male Pelvis (MR): Bladder",
  "Male Pelvis (MR): Bone_Pelvic_L",
  "Male Pelvis (MR): Bone_Pelvic_R",
  "Male Pelvis (MR): Skin",
  "Male Pelvis (MR): Femur_L",
  "Male Pelvis (MR): Femur_R",
  "Male Pelvis (MR): PenileBulb",
  "Male Pelvis (MR): Prostate",
  "Male Pelvis (MR): Rectum",
  "Male Pelvis (MR): Sacrum+Coccyx",
  "Male Pelvis (MR): SeminalVes",
];

// ekt_mr_headneck 1.0 — 38 OARs
export const MONACO_HEAD_NECK = [
  "Head & Neck (MR): A_Carotid_L",
  "Head & Neck (MR): A_Carotid_R",
  "Head & Neck (MR): BrachialPlex_L",
  "Head & Neck (MR): BrachialPlex_R",
  "Head & Neck (MR): Brainstem",
  "Head & Neck (MR): Cavity_Oral",
  "Head & Neck (MR): Cochlea_L",
  "Head & Neck (MR): Cochlea_R",
  "Head & Neck (MR): Esophagus",
  "Head & Neck (MR): Skin",
  "Head & Neck (MR): Eye_L",
  "Head & Neck (MR): Eye_R",
  "Head & Neck (MR): Glnd_Lacrimal_L",
  "Head & Neck (MR): Glnd_Lacrimal_R",
  "Head & Neck (MR): Glnd_Submand_L",
  "Head & Neck (MR): Glnd_Submand_R",
  "Head & Neck (MR): Glnd_Thyroid",
  "Head & Neck (MR): Hippocampus_L",
  "Head & Neck (MR): Hippocampus_R",
  "Head & Neck (MR): Joint_TM_L",
  "Head & Neck (MR): Joint_TM_R",
  "Head & Neck (MR): Larynx_Glottic",
  "Head & Neck (MR): Larynx_Supraglottic",
  "Head & Neck (MR): Lens_L",
  "Head & Neck (MR): Lens_R",
  "Head & Neck (MR): Lips",
  "Head & Neck (MR): Bone_Mandible",
  "Head & Neck (MR): Musc_Constrict",
  "Head & Neck (MR): OpticChiasm",
  "Head & Neck (MR): OpticNrv_L",
  "Head & Neck (MR): OpticNrv_R",
  "Head & Neck (MR): Parotid_L",
  "Head & Neck (MR): Parotid_R",
  "Head & Neck (MR): Pituitary",
  "Head & Neck (MR): Retina_L",
  "Head & Neck (MR): Retina_R",
  "Head & Neck (MR): SpinalCord",
  "Head & Neck (MR): Trachea",
];

export const ELEKTA_MONACO_STRUCTURES = [
  ...MONACO_FEMALE_PELVIS_INTACT,
  ...MONACO_FEMALE_PELVIS_HYST,
  ...MONACO_MALE_PELVIS,
  ...MONACO_HEAD_NECK,
].map((name) => ({ name, type: "OAR" as const }));

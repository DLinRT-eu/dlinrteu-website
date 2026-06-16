/**
 * Supported structures for Therapanacea ART-Plan+ modules
 * (Annotate auto-contouring, AdaptBox CBCT, MR-Box pseudo-CT).
 *
 * Naming convention: "Region: Structure Name" (per platform v3 rule),
 * with the Annotate CT model identified by the region label so each of
 * the 7 CT models, the AdaptBox CBCT model, and the 3 MR-Box MR models
 * is independently identifiable in the Structure Comparison Tool.
 *
 * Bilateral structures are split into _L / _R entries (no grouped "(L/R)").
 *
 * Sources:
 *   - Annotate product page: https://www.therapanacea.eu/our-products/annotate/
 *   - MR-Box product page:   https://www.therapanacea.eu/our-products/mr-box/
 *   - AdaptBox product page: https://www.therapanacea.eu/our-products/adaptbox/
 *   - FDA 510(k) K253091 (ART-Plan+ v3.1.0, decision 2025-12-23)
 *   - FDA 510(k) K234068 (ART-Plan v2.2.0, MR-Box pseudo-CT, 2024-04)
 * Verified: 2026-06-16
 */

// ============ ANNOTATE — 7 CT MODELS ============

// 1) Head & Neck (CT) — OARs (Grégoire 2014) + Cervical LN levels
export const ANNOTATE_HEAD_NECK_CT = [
  "Head & Neck (CT): BrachialPlex_L",
  "Head & Neck (CT): BrachialPlex_R",
  "Head & Neck (CT): Brainstem",
  "Head & Neck (CT): Cerebellum",
  "Head & Neck (CT): Chiasma",
  "Head & Neck (CT): Cochlea_L",
  "Head & Neck (CT): Cochlea_R",
  "Head & Neck (CT): Encephalon",
  "Head & Neck (CT): Esophagus",
  "Head & Neck (CT): Eye_L",
  "Head & Neck (CT): Eye_R",
  "Head & Neck (CT): Lens_L",
  "Head & Neck (CT): Lens_R",
  "Head & Neck (CT): Larynx_Glottic",
  "Head & Neck (CT): Larynx",
  "Head & Neck (CT): Larynx_Supraglottic",
  "Head & Neck (CT): Pituitary",
  "Head & Neck (CT): Glnd_Lacrimal_L",
  "Head & Neck (CT): Glnd_Lacrimal_R",
  "Head & Neck (CT): Lips",
  "Head & Neck (CT): Bone_Mandible",
  "Head & Neck (CT): SpinalCanal",
  "Head & Neck (CT): Cavity_Oral",
  "Head & Neck (CT): OpticNrv_L",
  "Head & Neck (CT): OpticNrv_R",
  "Head & Neck (CT): Parotid_L",
  "Head & Neck (CT): Parotid_R",
  "Head & Neck (CT): Musc_Constrict",
  "Head & Neck (CT): Glnd_Submand_L",
  "Head & Neck (CT): Glnd_Submand_R",
  "Head & Neck (CT): Glnd_Thyroid",
  "Head & Neck (CT): Joint_TM_L",
  "Head & Neck (CT): Joint_TM_R",
  "Head & Neck (CT): Trachea",
  // Cervical lymph node levels (Grégoire 2014)
  "Head & Neck (CT): LN_Neck_IA",
  "Head & Neck (CT): LN_Neck_IB_L",
  "Head & Neck (CT): LN_Neck_IB_R",
  "Head & Neck (CT): LN_Neck_II_L",
  "Head & Neck (CT): LN_Neck_II_R",
  "Head & Neck (CT): LN_Neck_III_L",
  "Head & Neck (CT): LN_Neck_III_R",
  "Head & Neck (CT): LN_Neck_IVA_L",
  "Head & Neck (CT): LN_Neck_IVA_R",
  "Head & Neck (CT): LN_Neck_IVB_L",
  "Head & Neck (CT): LN_Neck_IVB_R",
  "Head & Neck (CT): LN_Neck_V_L",
  "Head & Neck (CT): LN_Neck_V_R",
  "Head & Neck (CT): LN_Neck_VIA",
  "Head & Neck (CT): LN_Neck_VIB",
  "Head & Neck (CT): LN_Neck_VIIA_L",
  "Head & Neck (CT): LN_Neck_VIIA_R",
  "Head & Neck (CT): LN_Neck_VIIB_L",
  "Head & Neck (CT): LN_Neck_VIIB_R",
];

// 2) Female Thorax / Breast (CT) — OARs (Offersen 2015, De Rose 2017) + Elective LNs
export const ANNOTATE_FEMALE_THORAX_BREAST_CT = [
  "Female Thorax/Breast (CT): A_Aorta_Asc",
  "Female Thorax/Breast (CT): A_Aorta_Thoracic",
  "Female Thorax/Breast (CT): BrachialPlex_L",
  "Female Thorax/Breast (CT): BrachialPlex_R",
  "Female Thorax/Breast (CT): Breast_L",
  "Female Thorax/Breast (CT): Breast_R",
  "Female Thorax/Breast (CT): Bronchial_Tree",
  "Female Thorax/Breast (CT): Bronchus_L",
  "Female Thorax/Breast (CT): Bronchus_R",
  "Female Thorax/Breast (CT): Carina",
  "Female Thorax/Breast (CT): ChestWall_L",
  "Female Thorax/Breast (CT): ChestWall_R",
  "Female Thorax/Breast (CT): Esophagus",
  "Female Thorax/Breast (CT): Heart",
  "Female Thorax/Breast (CT): Pericardium",
  "Female Thorax/Breast (CT): HumeralHead_L",
  "Female Thorax/Breast (CT): HumeralHead_R",
  "Female Thorax/Breast (CT): Kidney_L",
  "Female Thorax/Breast (CT): Kidney_R",
  "Female Thorax/Breast (CT): Liver",
  "Female Thorax/Breast (CT): Lung_L",
  "Female Thorax/Breast (CT): Lung_R",
  "Female Thorax/Breast (CT): SpinalCanal",
  "Female Thorax/Breast (CT): SpinalCord",
  "Female Thorax/Breast (CT): Spleen",
  "Female Thorax/Breast (CT): Stomach",
  "Female Thorax/Breast (CT): A_Pulmonary",
  "Female Thorax/Breast (CT): Glnd_Thyroid",
  "Female Thorax/Breast (CT): Trachea",
  "Female Thorax/Breast (CT): V_Cava",
  "Female Thorax/Breast (CT): V_Cava_Superior",
  // Breast elective LNs (Offersen 2015)
  "Female Thorax/Breast (CT): LN_IMC_L",
  "Female Thorax/Breast (CT): LN_IMC_R",
  "Female Thorax/Breast (CT): LN_Interpec_L",
  "Female Thorax/Breast (CT): LN_Interpec_R",
  "Female Thorax/Breast (CT): LN_Axilla_L1_L",
  "Female Thorax/Breast (CT): LN_Axilla_L1_R",
  "Female Thorax/Breast (CT): LN_Axilla_L2_L",
  "Female Thorax/Breast (CT): LN_Axilla_L2_R",
  "Female Thorax/Breast (CT): LN_Axilla_L3_L",
  "Female Thorax/Breast (CT): LN_Axilla_L3_R",
  "Female Thorax/Breast (CT): LN_Supraclavicular_L",
  "Female Thorax/Breast (CT): LN_Supraclavicular_R",
];

// 3) Male Thorax (CT) — OARs (De Rose 2017)
export const ANNOTATE_MALE_THORAX_CT = [
  "Male Thorax (CT): A_Aorta_Asc",
  "Male Thorax (CT): A_Aorta_Thoracic",
  "Male Thorax (CT): BrachialPlex_L",
  "Male Thorax (CT): BrachialPlex_R",
  "Male Thorax (CT): Bronchial_Tree",
  "Male Thorax (CT): Bronchus_L",
  "Male Thorax (CT): Bronchus_R",
  "Male Thorax (CT): Carina",
  "Male Thorax (CT): ChestWall_L",
  "Male Thorax (CT): ChestWall_R",
  "Male Thorax (CT): Esophagus",
  "Male Thorax (CT): Heart",
  "Male Thorax (CT): Pericardium",
  "Male Thorax (CT): HumeralHead_L",
  "Male Thorax (CT): HumeralHead_R",
  "Male Thorax (CT): Kidney_L",
  "Male Thorax (CT): Kidney_R",
  "Male Thorax (CT): Liver",
  "Male Thorax (CT): Lung_L",
  "Male Thorax (CT): Lung_R",
  "Male Thorax (CT): SpinalCanal",
  "Male Thorax (CT): SpinalCord",
  "Male Thorax (CT): Spleen",
  "Male Thorax (CT): Stomach",
  "Male Thorax (CT): A_Pulmonary",
  "Male Thorax (CT): Glnd_Thyroid",
  "Male Thorax (CT): Trachea",
  "Male Thorax (CT): V_Cava",
  "Male Thorax (CT): V_Cava_Superior",
];

// 4) Heart Sub-Structures (CT) — Duane 2017 / Lee 2017
export const ANNOTATE_HEART_SUBSTRUCTURES_CT = [
  "Heart Sub-Structures (CT): Atrium_L",
  "Heart Sub-Structures (CT): Atrium_R",
  "Heart Sub-Structures (CT): Ventricle_L",
  "Heart Sub-Structures (CT): Ventricle_R",
  "Heart Sub-Structures (CT): A_Coronary_LAD",
  "Heart Sub-Structures (CT): A_Coronary_LMain",
  "Heart Sub-Structures (CT): A_Coronary_Cflx_Prox",
  "Heart Sub-Structures (CT): A_Coronary_Cflx_Dist",
  "Heart Sub-Structures (CT): V_Coronary_Sinus",
  "Heart Sub-Structures (CT): Ventricle_L_Apical",
  "Heart Sub-Structures (CT): Ventricle_L_Anterior",
  "Heart Sub-Structures (CT): Ventricle_L_Inferior",
  "Heart Sub-Structures (CT): Ventricle_L_Lateral",
  "Heart Sub-Structures (CT): Ventricle_L_Septal",
];

// 5) Lung SBRT (CT) — UK SABR Consortium 2019
export const ANNOTATE_SBRT_LUNG_CT = [
  "Lung SBRT (CT): BrachialPlex",
  "Lung SBRT (CT): ChestWall",
  "Lung SBRT (CT): Esophagus",
  "Lung SBRT (CT): Heart",
  "Lung SBRT (CT): Pericardium",
  "Lung SBRT (CT): A_Coronary_LAD",
  "Lung SBRT (CT): A_Pulmonary",
  "Lung SBRT (CT): Liver",
  "Lung SBRT (CT): Skin",
  "Lung SBRT (CT): SpinalCord",
  "Lung SBRT (CT): Trachea",
  "Lung SBRT (CT): V_Cava",
];

// 6) Pelvis Male (CT) — OARs (Gay 2012) + prostate CTVn
export const ANNOTATE_PELVIS_MALE_CT = [
  "Pelvis Male (CT): AnalCanal",
  "Pelvis Male (CT): Bladder",
  "Pelvis Male (CT): Bowel_Bag",
  "Pelvis Male (CT): Bowel_Small",
  "Pelvis Male (CT): Bowel_Large",
  "Pelvis Male (CT): Duodenum",
  "Pelvis Male (CT): FemurHead_L",
  "Pelvis Male (CT): FemurHead_R",
  "Pelvis Male (CT): A_Iliac_L",
  "Pelvis Male (CT): A_Iliac_R",
  "Pelvis Male (CT): Kidney_L",
  "Pelvis Male (CT): Kidney_R",
  "Pelvis Male (CT): Liver",
  "Pelvis Male (CT): SpinalCanal",
  "Pelvis Male (CT): SpinalCord",
  "Pelvis Male (CT): PenileBulb",
  "Pelvis Male (CT): Prostate",
  "Pelvis Male (CT): Rectum",
  "Pelvis Male (CT): SeminalVes",
  "Pelvis Male (CT): Sigmoid",
  "Pelvis Male (CT): Stomach",
  "Pelvis Male (CT): CTV_LN_Prostate",
];

// 7) Pelvis Female (CT) — OARs (Gay 2012) + gynecological elective/targets
export const ANNOTATE_PELVIS_FEMALE_CT = [
  "Pelvis Female (CT): AnalCanal",
  "Pelvis Female (CT): Bladder",
  "Pelvis Female (CT): Bowel_Bag",
  "Pelvis Female (CT): Bowel_Small",
  "Pelvis Female (CT): Bowel_Large",
  "Pelvis Female (CT): FemurHead_L",
  "Pelvis Female (CT): FemurHead_R",
  "Pelvis Female (CT): A_Iliac_L",
  "Pelvis Female (CT): A_Iliac_R",
  "Pelvis Female (CT): Kidney_L",
  "Pelvis Female (CT): Kidney_R",
  "Pelvis Female (CT): Liver",
  "Pelvis Female (CT): SpinalCanal",
  "Pelvis Female (CT): SpinalCord",
  "Pelvis Female (CT): Parametrium",
  "Pelvis Female (CT): Rectum",
  "Pelvis Female (CT): Sigmoid",
  "Pelvis Female (CT): Stomach",
  "Pelvis Female (CT): Vagina",
  "Pelvis Female (CT): LN_Iliac_Common_Gyn",
  "Pelvis Female (CT): LN_Iliac_Gyn_L",
  "Pelvis Female (CT): LN_Iliac_Gyn_R",
  "Pelvis Female (CT): LN_Inguinal_Gyn_L",
  "Pelvis Female (CT): LN_Inguinal_Gyn_R",
  "Pelvis Female (CT): LN_Paraaortic_Gyn",
  "Pelvis Female (CT): LN_Presacral_Gyn",
  "Pelvis Female (CT): CTV_T_Gyn",
];

export const ANNOTATE_ALL_STRUCTURES: string[] = [
  ...ANNOTATE_HEAD_NECK_CT,
  ...ANNOTATE_FEMALE_THORAX_BREAST_CT,
  ...ANNOTATE_MALE_THORAX_CT,
  ...ANNOTATE_HEART_SUBSTRUCTURES_CT,
  ...ANNOTATE_SBRT_LUNG_CT,
  ...ANNOTATE_PELVIS_MALE_CT,
  ...ANNOTATE_PELVIS_FEMALE_CT,
];

// ============ ADAPTBOX — CBCT MODELS (H&N, Breast/Thorax, Pelvis Male per FDA K253091) ============

// Pelvis Male (CBCT) — itemised on Therapanacea product page
export const ADAPTBOX_PELVIS_MALE_CBCT = [
  "Pelvis Male (CBCT): AnalCanal",
  "Pelvis Male (CBCT): Bladder",
  "Pelvis Male (CBCT): FemurHead_L",
  "Pelvis Male (CBCT): FemurHead_R",
  "Pelvis Male (CBCT): PenileBulb",
  "Pelvis Male (CBCT): Prostate",
  "Pelvis Male (CBCT): Rectum",
  "Pelvis Male (CBCT): SeminalVes",
  "Pelvis Male (CBCT): Sigmoid",
];

// Head & Neck (CBCT) — OAR core set derived from the Annotate H&N CT model per K253091 scope
export const ADAPTBOX_HEAD_NECK_CBCT = [
  "Head & Neck (CBCT): Brainstem",
  "Head & Neck (CBCT): Cerebellum",
  "Head & Neck (CBCT): Encephalon",
  "Head & Neck (CBCT): Esophagus",
  "Head & Neck (CBCT): Eye_L",
  "Head & Neck (CBCT): Eye_R",
  "Head & Neck (CBCT): Lens_L",
  "Head & Neck (CBCT): Lens_R",
  "Head & Neck (CBCT): Larynx",
  "Head & Neck (CBCT): Bone_Mandible",
  "Head & Neck (CBCT): SpinalCanal",
  "Head & Neck (CBCT): Cavity_Oral",
  "Head & Neck (CBCT): Parotid_L",
  "Head & Neck (CBCT): Parotid_R",
  "Head & Neck (CBCT): Glnd_Submand_L",
  "Head & Neck (CBCT): Glnd_Submand_R",
  "Head & Neck (CBCT): Glnd_Thyroid",
  "Head & Neck (CBCT): Trachea",
];

// Breast / Thorax (CBCT) — OAR core set derived from the Annotate Thorax/Breast CT model per K253091 scope
export const ADAPTBOX_BREAST_THORAX_CBCT = [
  "Breast/Thorax (CBCT): Breast_L",
  "Breast/Thorax (CBCT): Breast_R",
  "Breast/Thorax (CBCT): ChestWall_L",
  "Breast/Thorax (CBCT): ChestWall_R",
  "Breast/Thorax (CBCT): Esophagus",
  "Breast/Thorax (CBCT): Heart",
  "Breast/Thorax (CBCT): HumeralHead_L",
  "Breast/Thorax (CBCT): HumeralHead_R",
  "Breast/Thorax (CBCT): Liver",
  "Breast/Thorax (CBCT): Lung_L",
  "Breast/Thorax (CBCT): Lung_R",
  "Breast/Thorax (CBCT): SpinalCanal",
  "Breast/Thorax (CBCT): SpinalCord",
  "Breast/Thorax (CBCT): Glnd_Thyroid",
  "Breast/Thorax (CBCT): Trachea",
];

export const ADAPTBOX_ALL_STRUCTURES: string[] = [
  ...ADAPTBOX_HEAD_NECK_CBCT,
  ...ADAPTBOX_BREAST_THORAX_CBCT,
  ...ADAPTBOX_PELVIS_MALE_CBCT,
];

// ============ MR-BOX — 3 MR MODELS ============

// Brain (MR T1)
export const MRBOX_BRAIN_T1 = [
  "Brain (MR T1): Brain",
  "Brain (MR T1): Brainstem",
  "Brain (MR T1): Cerebellum",
  "Brain (MR T1): Chiasma",
  "Brain (MR T1): Cochlea_L",
  "Brain (MR T1): Cochlea_R",
  "Brain (MR T1): Eye_L",
  "Brain (MR T1): Eye_R",
  "Brain (MR T1): Lens_L",
  "Brain (MR T1): Lens_R",
  "Brain (MR T1): Hippocampus_L",
  "Brain (MR T1): Hippocampus_R",
  "Brain (MR T1): Pituitary",
  "Brain (MR T1): OpticNrv_L",
  "Brain (MR T1): OpticNrv_R",
  "Brain (MR T1): SpinalCord",
];

// Pelvis Male (MR T2 – Elekta MR-Linac)
export const MRBOX_PELVIS_MALE_T2_ELEKTA = [
  "Pelvis Male (MR T2 Elekta): AnalCanal",
  "Pelvis Male (MR T2 Elekta): Bladder",
  "Pelvis Male (MR T2 Elekta): FemurHead_L",
  "Pelvis Male (MR T2 Elekta): FemurHead_R",
  "Pelvis Male (MR T2 Elekta): PenileBulb",
  "Pelvis Male (MR T2 Elekta): Prostate",
  "Pelvis Male (MR T2 Elekta): Rectum",
  "Pelvis Male (MR T2 Elekta): SeminalVes",
];

// Pelvis Male & Abdomen (MR TrueFISP 0.35T – ViewRay)
export const MRBOX_PELVIS_ABDO_TRUEFISP = [
  "Pelvis/Abdomen (MR TrueFISP): AnalCanal",
  "Pelvis/Abdomen (MR TrueFISP): Bladder",
  "Pelvis/Abdomen (MR TrueFISP): Duodenum",
  "Pelvis/Abdomen (MR TrueFISP): FemurHead_L",
  "Pelvis/Abdomen (MR TrueFISP): FemurHead_R",
  "Pelvis/Abdomen (MR TrueFISP): Kidney_L",
  "Pelvis/Abdomen (MR TrueFISP): Kidney_R",
  "Pelvis/Abdomen (MR TrueFISP): Liver",
  "Pelvis/Abdomen (MR TrueFISP): Bowel_Large",
  "Pelvis/Abdomen (MR TrueFISP): Bowel_Small",
  "Pelvis/Abdomen (MR TrueFISP): PenileBulb",
  "Pelvis/Abdomen (MR TrueFISP): Prostate",
  "Pelvis/Abdomen (MR TrueFISP): Rectum",
  "Pelvis/Abdomen (MR TrueFISP): SeminalVes",
  "Pelvis/Abdomen (MR TrueFISP): Sigmoid",
  "Pelvis/Abdomen (MR TrueFISP): Stomach",
];

export const MRBOX_ALL_STRUCTURES: string[] = [
  ...MRBOX_BRAIN_T1,
  ...MRBOX_PELVIS_MALE_T2_ELEKTA,
  ...MRBOX_PELVIS_ABDO_TRUEFISP,
];

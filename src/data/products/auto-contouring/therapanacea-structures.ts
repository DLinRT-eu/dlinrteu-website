/**
 * Supported structures for Therapanacea ART-Plan+ modules
 * (Annotate auto-contouring, AdaptBox synthetic-CT / adaptive, MR-Box MR models,
 *  BrachyBox MR brachytherapy model).
 *
 * Naming convention: "Region: Structure Name" (per platform v3 rule),
 * with each vendor model identified by its region label so every model is
 * independently identifiable in the Structure Comparison Tool.
 *
 * Bilateral structures are split into _L / _R entries (no grouped "(L/R)"),
 * so the totals below match the vendor's published per-model counts.
 *
 * Sources:
 *   - ART-Plan™ "Structures Delineated" brochure, version 3.2.0, ref ART-BRO-AN-07EU,
 *     March 2026: https://d2oi0h5pbjc5wm.cloudfront.net/product/products-structures-brochure.pdf
 *   - Therapanacea products page: https://therapanacea.com/products
 *   - FDA 510(k) K253091 (ART-Plan+ v3.1.0, decision 2025-12-23)
 *   - FDA 510(k) K234068 (ART-Plan v2.2.0, MR-Box pseudo-CT, 2024-04)
 * Verified: 2026-07-30
 *
 * Note: the vendor consolidated its previous per-model lists in v3.2.0. Thorax,
 * Breast, SBRT lung and heart sub-structures are now published as a single
 * "CT Thorax/Breast/Abdo" model (73 OARs & 12 LNs); the former separate
 * "Female Thorax/Breast", "Male Thorax", "Heart Sub-Structures" and "Lung SBRT"
 * lists no longer exist as such. Nothing is listed here that the brochure does
 * not itemise.
 */

// ============ ANNOTATE — 4 CT MODELS (brochure v3.2.0) ============

// 1) CT Head & Neck — 46 OARs & 19 LNs
// Guidelines: LN per Grégoire et al 2014; OARs per DAHANCA 2020,
// Eekers et al 2021 (EPTN) and Mir et al 2020 (international consensus).
export const ANNOTATE_HEAD_NECK_CT = [
  "Head & Neck (CT): BrachialPlex_L",
  "Head & Neck (CT): BrachialPlex_R",
  "Head & Neck (CT): Brain",
  "Head & Neck (CT): Brainstem",
  "Head & Neck (CT): Cerebellum",
  "Head & Neck (CT): Cochlea_L",
  "Head & Neck (CT): Cochlea_R",
  "Head & Neck (CT): A_Carotid_Common_L",
  "Head & Neck (CT): A_Carotid_Common_R",
  "Head & Neck (CT): Esophagus",
  "Head & Neck (CT): A_Carotid_Ext_L",
  "Head & Neck (CT): A_Carotid_Ext_R",
  "Head & Neck (CT): External",
  "Head & Neck (CT): V_Jugular_Ext_L",
  "Head & Neck (CT): V_Jugular_Ext_R",
  "Head & Neck (CT): Eye_L",
  "Head & Neck (CT): Eye_R",
  "Head & Neck (CT): Lens_L",
  "Head & Neck (CT): Lens_R",
  "Head & Neck (CT): Larynx_Glottic",
  "Head & Neck (CT): A_Carotid_Int_L",
  "Head & Neck (CT): A_Carotid_Int_R",
  "Head & Neck (CT): V_Jugular_Int_L",
  "Head & Neck (CT): V_Jugular_Int_R",
  "Head & Neck (CT): Glnd_Lacrimal_L",
  "Head & Neck (CT): Glnd_Lacrimal_R",
  "Head & Neck (CT): Larynx",
  "Head & Neck (CT): Lips",
  "Head & Neck (CT): Bone_Mandible",
  "Head & Neck (CT): Cavity_Oral",
  "Head & Neck (CT): Chiasma",
  "Head & Neck (CT): OpticNrv_L",
  "Head & Neck (CT): OpticNrv_R",
  "Head & Neck (CT): Parotid_L",
  "Head & Neck (CT): Parotid_R",
  "Head & Neck (CT): Musc_Constrict",
  "Head & Neck (CT): Pituitary",
  "Head & Neck (CT): SpinalCanal",
  "Head & Neck (CT): SpinalCord",
  "Head & Neck (CT): Glnd_Submand_L",
  "Head & Neck (CT): Glnd_Submand_R",
  "Head & Neck (CT): Larynx_Supraglottic",
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

// 2) CT Thorax / Breast / Abdo — 73 OARs & 12 LNs
// Includes SBRT lung and heart sub-structures.
// Guidelines: LN per Offersen et al 2015 (ESTRO); OARs per Kong 2011 (RTOG),
// Jabbour et al 2014 (RTOG), UK SABR Consortium 2019, De Rose et al 2017,
// Duane et al 2017, Milo et al 2020, Mir et al 2020.
export const ANNOTATE_THORAX_BREAST_ABDO_CT = [
  "Thorax/Breast/Abdo (CT): A_Aorta",
  "Thorax/Breast/Abdo (CT): Atrium_L",
  "Thorax/Breast/Abdo (CT): Atrium_R",
  "Thorax/Breast/Abdo (CT): BrachialPlex_L",
  "Thorax/Breast/Abdo (CT): BrachialPlex_R",
  "Thorax/Breast/Abdo (CT): Breast_L",
  "Thorax/Breast/Abdo (CT): Breast_R",
  "Thorax/Breast/Abdo (CT): Bronchia_L",
  "Thorax/Breast/Abdo (CT): Bronchia_R",
  "Thorax/Breast/Abdo (CT): Bronchial_Tree",
  "Thorax/Breast/Abdo (CT): Bronchus_L",
  "Thorax/Breast/Abdo (CT): Bronchus_R",
  "Thorax/Breast/Abdo (CT): A_Aorta_Cardiac",
  "Thorax/Breast/Abdo (CT): Carina",
  "Thorax/Breast/Abdo (CT): CaudaEquina",
  "Thorax/Breast/Abdo (CT): ChestWall_L",
  "Thorax/Breast/Abdo (CT): ChestWall_R",
  "Thorax/Breast/Abdo (CT): V_Coronary_Sinus",
  "Thorax/Breast/Abdo (CT): A_Coronary_Cflx_Dist",
  "Thorax/Breast/Abdo (CT): Esophagus",
  "Thorax/Breast/Abdo (CT): Heart",
  "Thorax/Breast/Abdo (CT): HumeralHead_L",
  "Thorax/Breast/Abdo (CT): HumeralHead_R",
  "Thorax/Breast/Abdo (CT): Kidney_L",
  "Thorax/Breast/Abdo (CT): Kidney_R",
  "Thorax/Breast/Abdo (CT): A_Coronary_LAD",
  "Thorax/Breast/Abdo (CT): A_Coronary_LMain",
  "Thorax/Breast/Abdo (CT): Liver",
  "Thorax/Breast/Abdo (CT): Lung_L",
  "Thorax/Breast/Abdo (CT): Lung_R",
  "Thorax/Breast/Abdo (CT): Pericardium",
  "Thorax/Breast/Abdo (CT): A_Coronary_Cflx_Prox",
  "Thorax/Breast/Abdo (CT): A_Pulmonary",
  "Thorax/Breast/Abdo (CT): Rib_1_L",
  "Thorax/Breast/Abdo (CT): Rib_1_R",
  "Thorax/Breast/Abdo (CT): Rib_2_L",
  "Thorax/Breast/Abdo (CT): Rib_2_R",
  "Thorax/Breast/Abdo (CT): Rib_3_L",
  "Thorax/Breast/Abdo (CT): Rib_3_R",
  "Thorax/Breast/Abdo (CT): Rib_4_L",
  "Thorax/Breast/Abdo (CT): Rib_4_R",
  "Thorax/Breast/Abdo (CT): Rib_5_L",
  "Thorax/Breast/Abdo (CT): Rib_5_R",
  "Thorax/Breast/Abdo (CT): Rib_6_L",
  "Thorax/Breast/Abdo (CT): Rib_6_R",
  "Thorax/Breast/Abdo (CT): Rib_7_L",
  "Thorax/Breast/Abdo (CT): Rib_7_R",
  "Thorax/Breast/Abdo (CT): Rib_8_L",
  "Thorax/Breast/Abdo (CT): Rib_8_R",
  "Thorax/Breast/Abdo (CT): Rib_9_L",
  "Thorax/Breast/Abdo (CT): Rib_9_R",
  "Thorax/Breast/Abdo (CT): Rib_10_L",
  "Thorax/Breast/Abdo (CT): Rib_10_R",
  "Thorax/Breast/Abdo (CT): Rib_11_L",
  "Thorax/Breast/Abdo (CT): Rib_11_R",
  "Thorax/Breast/Abdo (CT): Rib_12_L",
  "Thorax/Breast/Abdo (CT): Rib_12_R",
  "Thorax/Breast/Abdo (CT): SpinalCanal",
  "Thorax/Breast/Abdo (CT): SpinalCord",
  "Thorax/Breast/Abdo (CT): Spleen",
  "Thorax/Breast/Abdo (CT): Stomach",
  "Thorax/Breast/Abdo (CT): Larynx_Supraglottic",
  "Thorax/Breast/Abdo (CT): Glnd_Thyroid",
  "Thorax/Breast/Abdo (CT): Trachea",
  "Thorax/Breast/Abdo (CT): V_Cava_Inf",
  "Thorax/Breast/Abdo (CT): V_Cava_Sup",
  "Thorax/Breast/Abdo (CT): Ventricle_L",
  "Thorax/Breast/Abdo (CT): Ventricle_R",
  "Thorax/Breast/Abdo (CT): Ventricle_L_Anterior",
  "Thorax/Breast/Abdo (CT): Ventricle_L_Apical",
  "Thorax/Breast/Abdo (CT): Ventricle_L_Inferior",
  "Thorax/Breast/Abdo (CT): Ventricle_L_Lateral",
  "Thorax/Breast/Abdo (CT): Ventricle_L_Septal",
  // Breast elective LNs (Offersen 2015)
  "Thorax/Breast/Abdo (CT): LN_IMN_L",
  "Thorax/Breast/Abdo (CT): LN_IMN_R",
  "Thorax/Breast/Abdo (CT): LN_Interpec_L",
  "Thorax/Breast/Abdo (CT): LN_Interpec_R",
  "Thorax/Breast/Abdo (CT): LN_Ax_L1_L",
  "Thorax/Breast/Abdo (CT): LN_Ax_L1_R",
  "Thorax/Breast/Abdo (CT): LN_Ax_L2_L",
  "Thorax/Breast/Abdo (CT): LN_Ax_L2_R",
  "Thorax/Breast/Abdo (CT): LN_Ax_L3_L",
  "Thorax/Breast/Abdo (CT): LN_Ax_L3_R",
  "Thorax/Breast/Abdo (CT): LN_Ax_L4_L",
  "Thorax/Breast/Abdo (CT): LN_Ax_L4_R",
];

// 3) CT Pelvis Male — 19 OARs, 15 LNs & 3 ROIs
// Guidelines: OARs per Gay et al 2012 (RTOG) and Mir et al 2020;
// CTVN_Prostate per Hall et al 2021; LN per Valentini et al 2016.
export const ANNOTATE_PELVIS_MALE_CT = [
  "Pelvis Male (CT): AnalCanal",
  "Pelvis Male (CT): Bladder",
  "Pelvis Male (CT): Bowel_Bag",
  "Pelvis Male (CT): CaudaEquina",
  "Pelvis Male (CT): Duodenum",
  "Pelvis Male (CT): External",
  "Pelvis Male (CT): FemurHead_L",
  "Pelvis Male (CT): FemurHead_R",
  "Pelvis Male (CT): Bone_Ilium_L",
  "Pelvis Male (CT): Bone_Ilium_R",
  "Pelvis Male (CT): Bowel_Large",
  "Pelvis Male (CT): PenileBulb",
  "Pelvis Male (CT): Rectum",
  "Pelvis Male (CT): Bone_Sacrum",
  "Pelvis Male (CT): Sigmoid",
  "Pelvis Male (CT): Bowel_Small",
  "Pelvis Male (CT): SpinalCord",
  "Pelvis Male (CT): VB_L4",
  "Pelvis Male (CT): VB_L5",
  // Lymph nodes (Valentini 2016)
  "Pelvis Male (CT): Ischio_Rectal_Fossae_Val",
  "Pelvis Male (CT): LN_Iliac_Ext_L_Val",
  "Pelvis Male (CT): LN_Iliac_Ext_R_Val",
  "Pelvis Male (CT): LN_Inguinofem_L_Val",
  "Pelvis Male (CT): LN_Inguinofem_R_Val",
  "Pelvis Male (CT): LN_Iliac_Int_L_Val",
  "Pelvis Male (CT): LN_Iliac_Int_R_Val",
  "Pelvis Male (CT): LN_Obturator_L_Val",
  "Pelvis Male (CT): LN_Obturator_R_Val",
  "Pelvis Male (CT): Mesorectum_Val",
  "Pelvis Male (CT): Presacral_Abdo_LN_Val",
  "Pelvis Male (CT): Presacral_Pelvis_LN_Val",
  "Pelvis Male (CT): Sphincter_Complex_Val",
  "Pelvis Male (CT): LN_Iliac_Common",
  "Pelvis Male (CT): LN_Lomboaortic",
  // Regions of interest
  "Pelvis Male (CT): CTVn_Prostate",
  "Pelvis Male (CT): Prostate",
  "Pelvis Male (CT): SeminalVes",
];

// 4) CT Pelvis Female — vendor header states 18 OARs, 20 LNs & 2 ROIs.
// The brochure itemises 19 OAR entries once bilateral structures are split
// (the vendor header appears to under-count by one); the itemised names are used here.
// Guidelines: OARs per Gay et al 2012 and Mir et al 2020; LN per Valentini et al 2016.
export const ANNOTATE_PELVIS_FEMALE_CT = [
  "Pelvis Female (CT): AnalCanal",
  "Pelvis Female (CT): Bladder",
  "Pelvis Female (CT): Bowel_Bag",
  "Pelvis Female (CT): CaudaEquina",
  "Pelvis Female (CT): Duodenum",
  "Pelvis Female (CT): External",
  "Pelvis Female (CT): FemurHead_L",
  "Pelvis Female (CT): FemurHead_R",
  "Pelvis Female (CT): Bone_Ilium_L",
  "Pelvis Female (CT): Bone_Ilium_R",
  "Pelvis Female (CT): Bowel_Large",
  "Pelvis Female (CT): Rectum",
  "Pelvis Female (CT): Bone_Sacrum",
  "Pelvis Female (CT): Sigmoid",
  "Pelvis Female (CT): Bowel_Small",
  "Pelvis Female (CT): SpinalCord",
  "Pelvis Female (CT): Vagina",
  "Pelvis Female (CT): VB_L4",
  "Pelvis Female (CT): VB_L5",
  // Lymph nodes (Valentini 2016)
  "Pelvis Female (CT): LN_Iliac_Common",
  "Pelvis Female (CT): LN_Iliac_L",
  "Pelvis Female (CT): LN_Iliac_R",
  "Pelvis Female (CT): LN_Ingui_Gyn_L",
  "Pelvis Female (CT): LN_Ingui_Gyn_R",
  "Pelvis Female (CT): LN_Lomboaortic",
  "Pelvis Female (CT): LN_Presacral",
  "Pelvis Female (CT): Ischio_Rectal_Fossae_Val",
  "Pelvis Female (CT): LN_Iliac_Ext_L_Val",
  "Pelvis Female (CT): LN_Iliac_Ext_R_Val",
  "Pelvis Female (CT): LN_Inguinofem_L_Val",
  "Pelvis Female (CT): LN_Inguinofem_R_Val",
  "Pelvis Female (CT): LN_Iliac_Int_L_Val",
  "Pelvis Female (CT): LN_Iliac_Int_R_Val",
  "Pelvis Female (CT): LN_Obturator_L_Val",
  "Pelvis Female (CT): LN_Obturator_R_Val",
  "Pelvis Female (CT): Mesorectum_Val",
  "Pelvis Female (CT): Presacral_Abdo_LN_Val",
  "Pelvis Female (CT): Presacral_Pelvis_LN_Val",
  "Pelvis Female (CT): Sphincter_Complex_Val",
  // Regions of interest
  "Pelvis Female (CT): Parametrium",
  "Pelvis Female (CT): Utero_Cervix",
];

export const ANNOTATE_ALL_STRUCTURES: string[] = [
  ...ANNOTATE_HEAD_NECK_CT,
  ...ANNOTATE_THORAX_BREAST_ABDO_CT,
  ...ANNOTATE_PELVIS_MALE_CT,
  ...ANNOTATE_PELVIS_FEMALE_CT,
];

// ============ ADAPTBOX — SYNTHETIC-CT MODELS (brochure v3.2.0) ============
// The v3.2.0 brochure itemises three Syn-CT models. CBCT-only per-structure
// lists are not published separately — do not invent them.

// Syn-CT Pelvis Male — 7 OARs & 2 ROIs (Gay et al 2012, Mir et al 2020)
export const ADAPTBOX_PELVIS_MALE_SYNCT = [
  "Pelvis Male (Syn-CT): AnalCanal",
  "Pelvis Male (Syn-CT): Bladder",
  "Pelvis Male (Syn-CT): FemurHead_L",
  "Pelvis Male (Syn-CT): FemurHead_R",
  "Pelvis Male (Syn-CT): PenileBulb",
  "Pelvis Male (Syn-CT): Rectum",
  "Pelvis Male (Syn-CT): Sigmoid",
  "Pelvis Male (Syn-CT): Prostate",
  "Pelvis Male (Syn-CT): SeminalVes",
];

// Syn-CT Thorax / Breast — 12 OARs (Kong 2011, Jabbour et al 2014, Mir et al 2020)
export const ADAPTBOX_THORAX_BREAST_SYNCT = [
  "Thorax/Breast (Syn-CT): Breast_L",
  "Thorax/Breast (Syn-CT): Breast_R",
  "Thorax/Breast (Syn-CT): Bronchial_Tree",
  "Thorax/Breast (Syn-CT): ChestWall_L",
  "Thorax/Breast (Syn-CT): ChestWall_R",
  "Thorax/Breast (Syn-CT): Esophagus",
  "Thorax/Breast (Syn-CT): Heart",
  "Thorax/Breast (Syn-CT): Lung_L",
  "Thorax/Breast (Syn-CT): Lung_R",
  "Thorax/Breast (Syn-CT): SpinalCanal",
  "Thorax/Breast (Syn-CT): SpinalCord",
  "Thorax/Breast (Syn-CT): Trachea",
];

// Syn-CT Head & Neck — 26 OARs (DAHANCA 2020, Eekers et al 2021, Mir et al 2020)
export const ADAPTBOX_HEAD_NECK_SYNCT = [
  "Head & Neck (Syn-CT): BrachialPlex_L",
  "Head & Neck (Syn-CT): BrachialPlex_R",
  "Head & Neck (Syn-CT): Brainstem",
  "Head & Neck (Syn-CT): Esophagus",
  "Head & Neck (Syn-CT): Eye_L",
  "Head & Neck (Syn-CT): Eye_R",
  "Head & Neck (Syn-CT): Larynx_Glottic",
  "Head & Neck (Syn-CT): Larynx",
  "Head & Neck (Syn-CT): Lens_L",
  "Head & Neck (Syn-CT): Lens_R",
  "Head & Neck (Syn-CT): Lips",
  "Head & Neck (Syn-CT): Lung_L",
  "Head & Neck (Syn-CT): Lung_R",
  "Head & Neck (Syn-CT): Bone_Mandible",
  "Head & Neck (Syn-CT): OpticNrv_L",
  "Head & Neck (Syn-CT): OpticNrv_R",
  "Head & Neck (Syn-CT): Chiasma",
  "Head & Neck (Syn-CT): Cavity_Oral",
  "Head & Neck (Syn-CT): Parotid_L",
  "Head & Neck (Syn-CT): Parotid_R",
  "Head & Neck (Syn-CT): Musc_Constrict",
  "Head & Neck (Syn-CT): SpinalCanal",
  "Head & Neck (Syn-CT): SpinalCord",
  "Head & Neck (Syn-CT): Larynx_Supraglottic",
  "Head & Neck (Syn-CT): Joint_TM_L",
  "Head & Neck (Syn-CT): Joint_TM_R",
];

export const ADAPTBOX_ALL_STRUCTURES: string[] = [
  ...ADAPTBOX_PELVIS_MALE_SYNCT,
  ...ADAPTBOX_THORAX_BREAST_SYNCT,
  ...ADAPTBOX_HEAD_NECK_SYNCT,
];

// ============ MR-BOX — 3 MR MODELS (brochure v3.2.0) ============

// MRI Brain T1 — 27 OARs (Eekers et al 2021, EPTN)
export const MRBOX_BRAIN_T1 = [
  "Brain (MR T1): Brain",
  "Brain (MR T1): Cerebellum_Ant",
  "Brain (MR T1): Cerebellum_Post",
  "Brain (MR T1): Cochlea_L",
  "Brain (MR T1): Cochlea_R",
  "Brain (MR T1): Cornea_L",
  "Brain (MR T1): Cornea_R",
  "Brain (MR T1): Hippocampus_L",
  "Brain (MR T1): Hippocampus_R",
  "Brain (MR T1): Hypothalamus_L",
  "Brain (MR T1): Hypothalamus_R",
  "Brain (MR T1): Glnd_Lacrimal_L",
  "Brain (MR T1): Glnd_Lacrimal_R",
  "Brain (MR T1): Lens_L",
  "Brain (MR T1): Lens_R",
  "Brain (MR T1): Medulla_Oblongata",
  "Brain (MR T1): Midbrain",
  "Brain (MR T1): Chiasma",
  "Brain (MR T1): OpticNrv_L",
  "Brain (MR T1): OpticNrv_R",
  "Brain (MR T1): Pituitary",
  "Brain (MR T1): Pons",
  "Brain (MR T1): Retina_L",
  "Brain (MR T1): Retina_R",
  "Brain (MR T1): SpinalCord",
  "Brain (MR T1): VSCC_L",
  "Brain (MR T1): VSCC_R",
];

// MRI Pelvis Male T2 (Elekta MR-Linac) — 11 OARs & 2 ROIs (Mir et al 2020)
export const MRBOX_PELVIS_MALE_T2_ELEKTA = [
  "Pelvis Male (MR T2 Elekta): AnalCanal",
  "Pelvis Male (MR T2 Elekta): Bladder",
  "Pelvis Male (MR T2 Elekta): Bone_Pelvis_L",
  "Pelvis Male (MR T2 Elekta): Bone_Pelvis_R",
  "Pelvis Male (MR T2 Elekta): FemurHead_L",
  "Pelvis Male (MR T2 Elekta): FemurHead_R",
  "Pelvis Male (MR T2 Elekta): PenileBulb",
  "Pelvis Male (MR T2 Elekta): Rectum",
  "Pelvis Male (MR T2 Elekta): Bone_Sacrum",
  "Pelvis Male (MR T2 Elekta): Sigmoid",
  "Pelvis Male (MR T2 Elekta): Bowel_Small",
  "Pelvis Male (MR T2 Elekta): Prostate",
  "Pelvis Male (MR T2 Elekta): SeminalVes",
];

// MRI Pelvis Male & Abdomen TrueFISP — 7 pelvis OARs, 9 abdomen OARs & 2 ROIs (Mir et al 2020)
export const MRBOX_PELVIS_ABDO_TRUEFISP = [
  "Pelvis/Abdomen (MR TrueFISP): AnalCanal",
  "Pelvis/Abdomen (MR TrueFISP): Bladder",
  "Pelvis/Abdomen (MR TrueFISP): FemurHead_L",
  "Pelvis/Abdomen (MR TrueFISP): FemurHead_R",
  "Pelvis/Abdomen (MR TrueFISP): PenileBulb",
  "Pelvis/Abdomen (MR TrueFISP): Rectum",
  "Pelvis/Abdomen (MR TrueFISP): Sigmoid",
  "Pelvis/Abdomen (MR TrueFISP): A_Aorta_Abdomen",
  "Pelvis/Abdomen (MR TrueFISP): Duodenum",
  "Pelvis/Abdomen (MR TrueFISP): Kidney_L",
  "Pelvis/Abdomen (MR TrueFISP): Kidney_R",
  "Pelvis/Abdomen (MR TrueFISP): Bowel_Large",
  "Pelvis/Abdomen (MR TrueFISP): Liver",
  "Pelvis/Abdomen (MR TrueFISP): Pancreas",
  "Pelvis/Abdomen (MR TrueFISP): Stomach",
  "Pelvis/Abdomen (MR TrueFISP): V_Cava_Inf",
  "Pelvis/Abdomen (MR TrueFISP): Prostate",
  "Pelvis/Abdomen (MR TrueFISP): SeminalVes",
];

export const MRBOX_ALL_STRUCTURES: string[] = [
  ...MRBOX_BRAIN_T1,
  ...MRBOX_PELVIS_MALE_T2_ELEKTA,
  ...MRBOX_PELVIS_ABDO_TRUEFISP,
];

// ============ BRACHYBOX — MRI PELVIS (brochure v3.2.0) ============
// 4 OARs — EMBRACE studies, Pötter et al 2018 (ESTRO)
export const BRACHYBOX_PELVIS_MR = [
  "Pelvis (MR Brachytherapy): Bladder",
  "Pelvis (MR Brachytherapy): Rectum",
  "Pelvis (MR Brachytherapy): Sigmoid",
  "Pelvis (MR Brachytherapy): Bowel_Small",
];

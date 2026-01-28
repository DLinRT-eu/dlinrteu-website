
/**
 * Supported structures for Limbus Contour product
 * Separated from main product data for better maintainability
 * 
 * Last verified: 2026-01-23
 * Note: Gyne HDR, Cardiac, CBCT Adaptive, and SRS Optic Pathway structures
 * marked as (unverified) - not found on official Limbus website
 */

// Head & Neck structures
export const LIMBUS_HEAD_NECK_STRUCTURES = [
  "Head & Neck-CT: Body",
  "Head & Neck-CT: Bone_Hyoid",
  "Head & Neck-CT: Bone_Mandible",
  "Head & Neck-CT: BrachialPlex_L",
  "Head & Neck-CT: BrachialPlex_R",
  "Head & Neck-CT: BrachialPlexs",
  "Head & Neck-CT: Brain",
  "Head & Neck-CT: Brainstem",
  "Head & Neck-CT: Cavity_Oral",
  "Head & Neck-CT: Cerebellum",
  "Head & Neck-CT: Clavicle_L",
  "Head & Neck-CT: Clavicle_R",
  "Head & Neck-CT: Cochlea_L",
  "Head & Neck-CT: Cochlea_R",
  "Head & Neck-CT: Cornea_L",
  "Head & Neck-CT: Cornea_R",
  "Head & Neck-CT: Esophagus",
  "Head & Neck-CT: Eye_L",
  "Head & Neck-CT: Eyes",
  "Head & Neck-CT: Glnd_Lacrimal_L",
  "Head & Neck-CT: Glnd_Lacrimal_R",
  "Head & Neck-CT: Glnd_Submand_L",
  "Head & Neck-CT: Glnd_Submand_R",
  "Head & Neck-CT: Glnd_Thyroid",
  "Head & Neck-CT: Hippocampus_L",
  "Head & Neck-CT: Hippocampus_R",
  "Head & Neck-CT: InternalAuditoryCanal_L",
  "Head & Neck-CT: InternalAuditoryCanal_R",
  "Head & Neck-CT: Larynx",
  "Head & Neck-CT: Lens_L",
  "Head & Neck-CT: Lens_R",
  "Head & Neck-CT: Lips",
  "Head & Neck-CT: Lobe_Temporal_L",
  "Head & Neck-CT: Lobe_Temporal_R",
  "Head & Neck-CT: Musc_Constrict",
  "Head & Neck-CT: Musc_Sclmast_L",
  "Head & Neck-CT: Musc_Sclmast_R",
  "Head & Neck-CT: OpticChiasm",
  "Head & Neck-CT: OpticNrv_L",
  "Head & Neck-CT: OpticNrv_R",
  "Head & Neck-CT: Optics",
  "Head & Neck-CT: Parotid_L",
  "Head & Neck-CT: Parotid_R",
  "Head & Neck-CT: Pituitary",
  "Head & Neck-CT: Retina_L",
  "Head & Neck-CT: Retina_R",
  "Head & Neck-CT: Skin",
  "Head & Neck-CT: SpinalCanal",
  "Head & Neck-CT: SpinalCord"
];

// Head & Neck Lymph Node structures
export const LIMBUS_HEAD_NECK_LN_STRUCTURES = [
  "Head & Neck-CT: LN_Neck_L",
  "Head & Neck-CT: LN_Neck_R",
  "Head & Neck-CT: LN_Neck_IA",
  "Head & Neck-CT: LN_Neck_IA6",
  "Head & Neck-CT: LN_Neck_IB_L",
  "Head & Neck-CT: LN_Neck_IB_R",
  "Head & Neck-CT: LN_Neck_II_L",
  "Head & Neck-CT: LN_Neck_II_R",
  "Head & Neck-CT: LN_Neck_III_L",
  "Head & Neck-CT: LN_Neck_III_R",
  "Head & Neck-CT: LN_Neck_IV_L",
  "Head & Neck-CT: LN_Neck_IV_R",
  "Head & Neck-CT: LN_Neck_V_L",
  "Head & Neck-CT: LN_Neck_V_R",
  "Head & Neck-CT: LN_Neck_VI",
  "Head & Neck-CT: LN_Neck_VIIA_L",
  "Head & Neck-CT: LN_Neck_VIIA_R",
  "Head & Neck-CT: LN_Neck_VIIB_L",
  "Head & Neck-CT: LN_Neck_VIIB_R",
  "Head & Neck-CT: LN_Neck_VIIAB_L",
  "Head & Neck-CT: LN_Neck_VIIAB_R",
  "Head & Neck-CT: LN_Neck_234_L",
  "Head & Neck-CT: LN_Neck_234_R",
  "Head & Neck-CT: LN_Neck_2347AB_L",
  "Head & Neck-CT: LN_Neck_2347AB_R"
];

// Thorax structures
export const LIMBUS_THORAX_STRUCTURES = [
  "Thorax-CT: A_Aorta",
  "Thorax-CT: A_Aorta_Base",
  "Thorax-CT: A_Aorta_I",
  "Thorax-CT: A_Celiac",
  "Thorax-CT: A_LAD",
  "Thorax-CT: A_Mesenteric_S",
  "Thorax-CT: A_Pulmonary",
  "Thorax-CT: Atrium_L",
  "Thorax-CT: Atrium_R",
  "Thorax-CT: Body",
  "Thorax-CT: Bowel_Bag",
  "Thorax-CT: Bowel_Bag_Superior",
  "Thorax-CT: Bowel",
  "Thorax-CT: Bowel_Superior",
  "Thorax-CT: BrachialPlex_R",
  "Thorax-CT: BrachialPlexs",
  "Thorax-CT: Breasts",
  "Thorax-CT: Breast_L",
  "Thorax-CT: Breast_R",
  "Thorax-CT: Breast_Implant_L",
  "Thorax-CT: Breast_Implant_R",
  "Thorax-CT: Bronchus",
  "Thorax-CT: Carina",
  "Thorax-CT: Chestwall",
  "Thorax-CT: Chestwall_L",
  "Thorax-CT: Chestwall_R",
  "Thorax-CT: CW2cm_L",
  "Thorax-CT: CW2cm_R",
  "Thorax-CT: Clavicle_L",
  "Thorax-CT: Clavicle_R",
  "Thorax-CT: Duodenum",
  "Thorax-CT: Esophagus",
  "Thorax-CT: Gallbladder",
  "Thorax-CT: Glnd_Thyroid",
  "Thorax-CT: GreatVes",
  "Thorax-CT: Heart",
  "Thorax-CT: Heart+A_Pulm",
  "Thorax-CT: Humerus_L",
  "Thorax-CT: Humerus_R",
  "Thorax-CT: Kidney_L",
  "Thorax-CT: Kidney_R",
  "Thorax-CT: Kidneys",
  "Thorax-CT: Liver",
  "Thorax-CT: Lung_L",
  "Thorax-CT: Lung_R",
  "Thorax-CT: Lungs",
  "Thorax-CT: Musc_PecMinor_L",
  "Thorax-CT: Musc_PecMinor_R",
  "Thorax-CT: Pancreas",
  "Thorax-CT: Pericardium",
  "Thorax-CT: Pericardium+A_Pulm",
  "Thorax-CT: Ribs",
  "Thorax-CT: Ribs_L",
  "Thorax-CT: Ribs_R",
  "Thorax-CT: Skin",
  "Thorax-CT: SpinalCanal",
  "Thorax-CT: SpinalCord",
  "Thorax-CT: Spleen",
  "Thorax-CT: Sternum",
  "Thorax-CT: Stomach",
  "Thorax-CT: Trachea",
  "Thorax-CT: V_Venacava_I",
  "Thorax-CT: V_Venacava_S",
  "Thorax-CT: VBs",
  "Thorax-CT: VB_C1",
  "Thorax-CT: VB_C2",
  "Thorax-CT: VB_C3",
  "Thorax-CT: VB_C4",
  "Thorax-CT: VB_C5",
  "Thorax-CT: VB_C6",
  "Thorax-CT: VB_C7",
  "Thorax-CT: VB_L1",
  "Thorax-CT: VB_L2",
  "Thorax-CT: VB_L3",
  "Thorax-CT: VB_L4",
  "Thorax-CT: VB_L5",
  "Thorax-CT: VB_T01",
  "Thorax-CT: VB_T02",
  "Thorax-CT: VB_T03",
  "Thorax-CT: VB_T04",
  "Thorax-CT: VB_T05",
  "Thorax-CT: VB_T06",
  "Thorax-CT: VB_T07",
  "Thorax-CT: VB_T08",
  "Thorax-CT: VB_T09",
  "Thorax-CT: VB_T10",
  "Thorax-CT: VB_T11",
  "Thorax-CT: VB_T12",
  "Thorax-CT: Ventricle_L",
  "Thorax-CT: Ventricle_R"
];

// Thorax Lymph Node structures
export const LIMBUS_THORAX_LN_STRUCTURES = [
  "Thorax-CT: LN_Ax_L1_L",
  "Thorax-CT: LN_Ax_L1_R",
  "Thorax-CT: LN_Ax_L2_L",
  "Thorax-CT: LN_Ax_L2_R",
  "Thorax-CT: LN_Ax_L3_L",
  "Thorax-CT: LN_Ax_L3_R",
  "Thorax-CT: LN_Ax_Sclav_L",
  "Thorax-CT: LN_Ax_Sclav_R",
  "Thorax-CT: LN_IMN_L",
  "Thorax-CT: LN_IMN_R",
  "Thorax-CT: LN_IMN_L_Expand",
  "Thorax-CT: LN_IMN_R_Expand",
  "Thorax-CT: LN_Sclav_L",
  "Thorax-CT: LN_Sclav_R",
  "Thorax-CT: ESTRO_LN_Ax_IP_L",
  "Thorax-CT: ESTRO_LN_Ax_IP_R",
  "Thorax-CT: ESTRO_LN_Ax_L1_L",
  "Thorax-CT: ESTRO_LN_Ax_L1_R",
  "Thorax-CT: ESTRO_LN_Ax_L2_L",
  "Thorax-CT: ESTRO_LN_Ax_L2_R",
  "Thorax-CT: ESTRO_LN_Ax_L2+IP_Fill_L",
  "Thorax-CT: ESTRO_LN_Ax_L2+IP_Fill_R",
  "Thorax-CT: ESTRO_LN_Ax_L3_L",
  "Thorax-CT: ESTRO_LN_Ax_L3_R",
  "Thorax-CT: ESTRO_LN_IMN_L",
  "Thorax-CT: ESTRO_LN_IMN_R",
  "Thorax-CT: ESTRO_LN_IMN_L_Expand",
  "Thorax-CT: ESTRO_LN_IMN_R_Expand",
  "Thorax-CT: ESTRO_LN_Sclav_L",
  "Thorax-CT: ESTRO_LN_Sclav_R"
];

// Pelvis structures
export const LIMBUS_PELVIS_STRUCTURES = [
  "Pelvis-CT: Body",
  "Pelvis-CT: Bladder",
  "Pelvis-CT: Bone_Ilium_L",
  "Pelvis-CT: Bone_Ilium_R",
  "Pelvis-CT: Bone_Ilium",
  "Pelvis-CT: Bone_Ischium_L",
  "Pelvis-CT: Bone_Ischium_R",
  "Pelvis-CT: Bone_Pelvic",
  "Pelvis-CT: BoneMarrow_Pelvic",
  "Pelvis-CT: Bowel",
  "Pelvis-CT: Bowel_Extend",
  "Pelvis-CT: Bowel_Full",
  "Pelvis-CT: Bowel_Upper",
  "Pelvis-CT: Bowel_Bag",
  "Pelvis-CT: Bowel_Bag_Extend",
  "Pelvis-CT: Bowel_Bag_Full",
  "Pelvis-CT: Bowel_Bag_Upper",
  "Pelvis-CT: Canal_Anal",
  "Pelvis-CT: CaudaEquina",
  "Pelvis-CT: Colon_Sigmoid",
  "Pelvis-CT: Femur_Head_L",
  "Pelvis-CT: Femur_Head_R",
  "Pelvis-CT: Femur_Heads",
  "Pelvis-CT: Mesorectum",
  "Pelvis-CT: PenileBulb",
  "Pelvis-CT: PubicSymphys",
  "Pelvis-CT: Rectum",
  "Pelvis-CT: Sacrum",
  "Pelvis-CT: Skin",
  "Pelvis-CT: Uterus+Cervix",
  "Pelvis-CT: Vagina",
  "Pelvis-CT: LN_Inguinal_L",
  "Pelvis-CT: LN_Inguinal_R",
  "Pelvis-CT: LN_Pelvics",
  "Pelvis-CT: PelvisVessels",
  "Pelvis-CT: Prostate",
  "Pelvis-CT: Prostate+SeminalVes",
  "Pelvis-CT: ProstateBed",
  "Pelvis-CT: SeminalVes"
];

// Pelvis CBCT structures
export const LIMBUS_PELVIS_CBCT_STRUCTURES = [
  "Pelvis-CBCT: Bladder",
  "Pelvis-CBCT: Femur_Head_L",
  "Pelvis-CBCT: Femur_Head_R",
  "Pelvis-CBCT: Prostate",
  "Pelvis-CBCT: Rectum",
  "Pelvis-CBCT: SeminalVes",
  "Pelvis-CBCT: LN_Pelvics"
];

// Pelvis MRI T2 structures
export const LIMBUS_PELVIS_MRI_STRUCTURES = [
  "Pelvis-MRI T2: Bladder",
  "Pelvis-MRI T2: Femur_Head_L",
  "Pelvis-MRI T2: Femur_Head_R",
  "Pelvis-MRI T2: PenileBulb",
  "Pelvis-MRI T2: PubicSymphys",
  "Pelvis-MRI T2: Prostate",
  "Pelvis-MRI T2: Rectum",
  "Pelvis-MRI T2: Sacrum",
  "Pelvis-MRI T2: SeminalVes"
];

// CNS MRI T1 structures
export const LIMBUS_CNS_STRUCTURES = [
  "CNS-T1: Brainstem",
  "CNS-T1: Cornea_L",
  "CNS-T1: Cornea_R",
  "CNS-T1: Eye_L",
  "CNS-T1: Eye_R",
  "CNS-T1: Hippocampus_L",
  "CNS-T1: Hippocampus_R",
  "CNS-T1: Optics",
  "CNS-T1: Retina_L",
  "CNS-T1: Retina_R"
];

// Gyne HDR CT structures - UNVERIFIED: Not found on official Limbus website
export const LIMBUS_GYNE_CT_STRUCTURES = [
  "Gyne HDR-CT: Bladder (unverified)",
  "Gyne HDR-CT: Bowel (unverified)",
  "Gyne HDR-CT: Canal_Anal (unverified)",
  "Gyne HDR-CT: Colon_Sigmoid (unverified)",
  "Gyne HDR-CT: Rectum (unverified)",
  "Gyne HDR-CT: Urethra (unverified)",
  "Gyne HDR-CT: Cylinder (unverified)",
  "Gyne HDR-CT: Vagina (unverified)",
  "Gyne HDR-CT: Uterus (unverified)",
  "Gyne HDR-CT: Parametrium_L (unverified)",
  "Gyne HDR-CT: Parametrium_R (unverified)",
  // Ring/Tandem applicator models
  "Gyne HDR-CT: App_Ring (unverified)",
  "Gyne HDR-CT: App_Tandem (unverified)",
  "Gyne HDR-CT: App_Ovoid_L (unverified)",
  "Gyne HDR-CT: App_Ovoid_R (unverified)",
  // Venezia applicator models
  "Gyne HDR-CT: App_Venezia_Ring (unverified)",
  "Gyne HDR-CT: App_Venezia_Tandem (unverified)",
  "Gyne HDR-CT: App_Venezia_Interstitial (unverified)"
];

// Gyne HDR MR structures - UNVERIFIED: Not found on official Limbus website
export const LIMBUS_GYNE_MR_STRUCTURES = [
  "Gyne HDR-MR: Bladder (unverified)",
  "Gyne HDR-MR: Bowel (unverified)",
  "Gyne HDR-MR: Canal_Anal (unverified)",
  "Gyne HDR-MR: Colon_Sigmoid (unverified)",
  "Gyne HDR-MR: Rectum (unverified)",
  "Gyne HDR-MR: Urethra (unverified)",
  "Gyne HDR-MR: Vagina (unverified)",
  "Gyne HDR-MR: Uterus (unverified)",
  "Gyne HDR-MR: Parametrium_L (unverified)",
  "Gyne HDR-MR: Parametrium_R (unverified)",
  // Target volumes for brachytherapy
  "Gyne HDR-MR: HR-CTV_Ring (unverified)",
  "Gyne HDR-MR: HR-CTV_Tandem (unverified)",
  "Gyne HDR-MR: HR-CTV_Ovoid (unverified)",
  "Gyne HDR-MR: IR-CTV (unverified)",
  // Applicator models
  "Gyne HDR-MR: App_Ring (unverified)",
  "Gyne HDR-MR: App_Tandem (unverified)"
];

// ESTRO Breast Lymph Node structures (new 2024)
export const LIMBUS_ESTRO_BREAST_LN_STRUCTURES = [
  "Breast ESTRO-CT: LN_IMC_L",
  "Breast ESTRO-CT: LN_IMC_R",
  "Breast ESTRO-CT: LN_Ax_L1_L",
  "Breast ESTRO-CT: LN_Ax_L1_R",
  "Breast ESTRO-CT: LN_Ax_L2_L",
  "Breast ESTRO-CT: LN_Ax_L2_R",
  "Breast ESTRO-CT: LN_Ax_L3_L",
  "Breast ESTRO-CT: LN_Ax_L3_R",
  "Breast ESTRO-CT: LN_Ax_L4_L",
  "Breast ESTRO-CT: LN_Ax_L4_R",
  "Breast ESTRO-CT: LN_Interpec_L",
  "Breast ESTRO-CT: LN_Interpec_R",
  "Breast ESTRO-CT: LN_Sclav_L",
  "Breast ESTRO-CT: LN_Sclav_R"
];

// Cardiac Substructures - UNVERIFIED: Not found on official Limbus website
export const LIMBUS_CARDIAC_STRUCTURES = [
  "Cardiac-CT: Heart (unverified)",
  "Cardiac-CT: Atrium_L (unverified)",
  "Cardiac-CT: Atrium_R (unverified)",
  "Cardiac-CT: Ventricle_L (unverified)",
  "Cardiac-CT: Ventricle_R (unverified)",
  "Cardiac-CT: A_LAD (unverified)",
  "Cardiac-CT: A_Circumflex (unverified)",
  "Cardiac-CT: A_RCA (unverified)",
  "Cardiac-CT: A_Aorta_Asc (unverified)",
  "Cardiac-CT: A_Aorta_Desc (unverified)",
  "Cardiac-CT: A_Pulmonary (unverified)",
  "Cardiac-CT: V_Pulmonary (unverified)",
  "Cardiac-CT: Pericardium (unverified)",
  "Cardiac-CT: Valve_Mitral (unverified)",
  "Cardiac-CT: Valve_Aortic (unverified)",
  "Cardiac-CT: Valve_Tricuspid (unverified)",
  "Cardiac-CT: Valve_Pulmonary (unverified)"
];

// CBCT Adaptive structures - UNVERIFIED: Not found on official Limbus website
export const LIMBUS_CBCT_ADAPTIVE_STRUCTURES = [
  "CBCT-Adaptive: Bladder (unverified)",
  "CBCT-Adaptive: Rectum (unverified)",
  "CBCT-Adaptive: Prostate (unverified)",
  "CBCT-Adaptive: SeminalVes (unverified)",
  "CBCT-Adaptive: Bowel (unverified)",
  "CBCT-Adaptive: Femur_Head_L (unverified)",
  "CBCT-Adaptive: Femur_Head_R (unverified)"
];

// Optic Pathway Combined (SRS/SRT) - UNVERIFIED: Not found on official Limbus website
export const LIMBUS_OPTIC_PATHWAY_STRUCTURES = [
  "SRS-CT: OpticPathway (unverified)",
  "SRS-CT: Optics (unverified)",
  "SRS-CT: OpticChiasm (unverified)",
  "SRS-CT: OpticNrv_L (unverified)",
  "SRS-CT: OpticNrv_R (unverified)",
  "SRS-CT: OpticTract_L (unverified)",
  "SRS-CT: OpticTract_R (unverified)"
];

// Export all structures combined
export const LIMBUS_ALL_STRUCTURES = [
  ...LIMBUS_HEAD_NECK_STRUCTURES,
  ...LIMBUS_HEAD_NECK_LN_STRUCTURES,
  ...LIMBUS_THORAX_STRUCTURES,
  ...LIMBUS_THORAX_LN_STRUCTURES,
  ...LIMBUS_PELVIS_STRUCTURES,
  ...LIMBUS_PELVIS_CBCT_STRUCTURES,
  ...LIMBUS_PELVIS_MRI_STRUCTURES,
  ...LIMBUS_CNS_STRUCTURES,
  ...LIMBUS_GYNE_CT_STRUCTURES,
  ...LIMBUS_GYNE_MR_STRUCTURES,
  ...LIMBUS_ESTRO_BREAST_LN_STRUCTURES,
  ...LIMBUS_CARDIAC_STRUCTURES,
  ...LIMBUS_CBCT_ADAPTIVE_STRUCTURES,
  ...LIMBUS_OPTIC_PATHWAY_STRUCTURES
];

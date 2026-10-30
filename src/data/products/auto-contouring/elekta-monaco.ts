import { ProductDetails } from "@/types/productDetails";

const TRM = "Elekta, Monaco Segmentation Component Technical Reference Manual, Document ID E076326 / 01 (2025); manufacturer document provided to DLinRT, not publicly available";

export const ELEKTA_MONACO_SEGMENTATION: ProductDetails = {
  id: "elekta-monaco-segmentation-unity",
  name: "Monaco Segmentation Component (Unity)",
  company: "Elekta",
  companyUrl: "https://www.elekta.com/",
  productUrl: "https://www.elekta.com/products/radiation-therapy/unity/",
  website: "https://www.elekta.com/",
  logoUrl: "/logos/Elekta.png",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/elekta-monaco.ts",
  category: "Auto-Contouring",
  description: "Deep-learning MR auto-segmentation of organs at risk within Monaco for the Elekta Unity MR-Linac (Unity Pro). Four T2-weighted MR models: female pelvis (intact uterus), female pelvis (post-hysterectomy), male pelvis, and head & neck. Contours are candidates for review and editing in the Unity reference and adaptive planning workflow.",
  partOf: {
    name: "Monaco treatment planning for Elekta Unity",
    productUrl: "https://www.elekta.com/products/radiation-therapy/unity/",
    relationship: "Segmentation component"
  },
  version: "1.0",
  certification: "CE & FDA",
  modality: ["MRI"],
  anatomicalLocation: ["Pelvis", "Head & Neck"],
  diseaseTargeted: ["Multiple Cancer Types"],
  subspeciality: "Radiation Oncology",
  keyFeatures: [
    "Four MR models (v1.0): Female Pelvis Intact (ekt_mr_femalepelvis), Female Pelvis Hysterectomy (ekt_mr_femalepelvishyst), Male Pelvis (ekt_mr_malepelvis), Head & Neck (ekt_mr_headneck)",
    "3D ResUNet deep convolutional neural network with group normalization; 112x112x112 voxel samples",
    "Semi-supervised training on labelled and unlabelled Unity T2-weighted scans",
    "Organs at risk only; not intended for target volumes",
    "Output reviewed and edited within the Unity planning workflow (reference and adapted plans)"
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["T2-weighted MRI (Elekta Unity)"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  technology: {
    integration: ["Monaco TPS", "Elekta Unity MR-Linac"],
    deployment: ["On-premise"],
    triggerForAnalysis: "User-initiated within the Unity planning workflow"
  },
  structuresProvenance: {
    source: TRM,
    sourceAccess: "vendor-provided",
    sourceRetrievedOn: "2026-10-30",
    notes: "Structure names as output by the models (Tables 4, 5, 11, 17)."
  },
  supportedStructures: [
      { name: "Female Pelvis: Anus", type: "OAR" },
      { name: "Female Pelvis: Bladder", type: "OAR" },
      { name: "Female Pelvis: Bone_Pelvic_L", type: "OAR" },
      { name: "Female Pelvis: Bone_Pelvic_R", type: "OAR" },
      { name: "Female Pelvis: Bag_Bowel", type: "OAR" },
      { name: "Female Pelvis: Colon_Sigmoid", type: "OAR" },
      { name: "Female Pelvis: Skin", type: "OAR" },
      { name: "Female Pelvis: Femur_L", type: "OAR" },
      { name: "Female Pelvis: Femur_R", type: "OAR" },
      { name: "Female Pelvis: Rectum", type: "OAR" },
      { name: "Female Pelvis: Sacrum+Coccyx", type: "OAR" },
      { name: "Female Pelvis: Urethra", type: "OAR" },
      { name: "Female Pelvis: Uterocervix (intact-uterus model only)", type: "OAR" },
      { name: "Female Pelvis: Vagina", type: "OAR" },
      { name: "Female Pelvis: VB_L", type: "OAR" },
      { name: "Male Pelvis: Anus", type: "OAR" },
      { name: "Male Pelvis: Anorectum", type: "OAR" },
      { name: "Male Pelvis: Bladder", type: "OAR" },
      { name: "Male Pelvis: Bone_Pelvic_L", type: "OAR" },
      { name: "Male Pelvis: Bone_Pelvic_R", type: "OAR" },
      { name: "Male Pelvis: Skin", type: "OAR" },
      { name: "Male Pelvis: Femur_L", type: "OAR" },
      { name: "Male Pelvis: Femur_R", type: "OAR" },
      { name: "Male Pelvis: PenileBulb", type: "OAR" },
      { name: "Male Pelvis: Prostate", type: "OAR" },
      { name: "Male Pelvis: Rectum", type: "OAR" },
      { name: "Male Pelvis: Sacrum+Coccyx", type: "OAR" },
      { name: "Male Pelvis: SeminalVes", type: "OAR" },
      { name: "Head & Neck: A_Carotid_L", type: "OAR" },
      { name: "Head & Neck: A_Carotid_R", type: "OAR" },
      { name: "Head & Neck: BrachialPlex_L", type: "OAR" },
      { name: "Head & Neck: BrachialPlex_R", type: "OAR" },
      { name: "Head & Neck: Brainstem", type: "OAR" },
      { name: "Head & Neck: Cavity_Oral", type: "OAR" },
      { name: "Head & Neck: Cochlea_L", type: "OAR" },
      { name: "Head & Neck: Cochlea_R", type: "OAR" },
      { name: "Head & Neck: Esophagus", type: "OAR" },
      { name: "Head & Neck: Skin", type: "OAR" },
      { name: "Head & Neck: Eye_L", type: "OAR" },
      { name: "Head & Neck: Eye_R", type: "OAR" },
      { name: "Head & Neck: Glnd_Lacrimal_L", type: "OAR" },
      { name: "Head & Neck: Glnd_Lacrimal_R", type: "OAR" },
      { name: "Head & Neck: Glnd_Submand_L", type: "OAR" },
      { name: "Head & Neck: Glnd_Submand_R", type: "OAR" },
      { name: "Head & Neck: Glnd_Thyroid", type: "OAR" },
      { name: "Head & Neck: Hippocampus_L", type: "OAR" },
      { name: "Head & Neck: Hippocampus_R", type: "OAR" },
      { name: "Head & Neck: Joint_TM_L", type: "OAR" },
      { name: "Head & Neck: Joint_TM_R", type: "OAR" },
      { name: "Head & Neck: Larynx_Glottic", type: "OAR" },
      { name: "Head & Neck: Larynx_Supraglottic", type: "OAR" },
      { name: "Head & Neck: Lens_L", type: "OAR" },
      { name: "Head & Neck: Lens_R", type: "OAR" },
      { name: "Head & Neck: Lips", type: "OAR" },
      { name: "Head & Neck: Bone_Mandible", type: "OAR" },
      { name: "Head & Neck: Musc_Constrict", type: "OAR" },
      { name: "Head & Neck: OpticChiasm", type: "OAR" },
      { name: "Head & Neck: OpticNrv_L", type: "OAR" },
      { name: "Head & Neck: OpticNrv_R", type: "OAR" },
      { name: "Head & Neck: Parotid_L", type: "OAR" },
      { name: "Head & Neck: Parotid_R", type: "OAR" },
      { name: "Head & Neck: Pituitary", type: "OAR" },
      { name: "Head & Neck: Retina_L", type: "OAR" },
      { name: "Head & Neck: Retina_R", type: "OAR" },
      { name: "Head & Neck: SpinalCord", type: "OAR" },
      { name: "Head & Neck: Trachea", type: "OAR" },
  ],
  trainingData: {
    description: "Developed by Elekta from T2-weighted Unity data in the MOMENTUM registry database. Female pelvis: 64 labelled datasets (64 patients) and 465 unlabelled datasets (75 patients; Unity plus Philips Ingenia 3.0T). Male pelvis: 85 labelled (85 patients) and 1777 unlabelled (219 patients). Head & neck: 60 labelled (60 patients) and 181 unlabelled (69 patients). No overlap between training and test data; labelled contours drawn by trained radiotherapy professionals to model-specific guidelines.",
    disclosureLevel: "full",
    source: TRM,
    sourceAccess: "vendor-provided",
    sourceRetrievedOn: "2026-10-30",
    scannerModels: ["Elekta Unity (1.5T MR-Linac)"]
  },
  evaluationData: {
    studyDesign: "Vendor retrospective quantitative assessment plus expert evaluation (Technical Reference Manual)",
    primaryEndpoint: "Average Hausdorff distance (AVD) upper 90% CI < 3 mm per structure; Dice and AUC reported",
    description: "Test sets independent from training: 46 patients (female pelvis intact), 40 (hysterectomy), 46 (male pelvis), 39 (head & neck). Reproducibility tested. Expert qualitative review on 5 intact + 5 hysterectomy cases and on the other models.",
    results: "All structures met the 3 mm AVD criterion. Dice (lower 90% CI) ranged e.g. 0.79-0.99 female pelvis intact, 0.65-0.99 male pelvis (anus lowest), 0.25-0.98 head & neck (optic nerves/chiasm lowest). Reproducibility: AVD and Dice ≥ 0.999 across repeated runs. Hysterectomy model: Colon_Sigmoid mean AVD above 3 mm in one subgroup.",
    source: TRM,
    sourceAccess: "vendor-provided",
    sourceRetrievedOn: "2026-10-30"
  },
  regulatory: {
    ce: {
      status: "cleared",
      type: "Medical Device",
      regulation: "MDR (EU 2017/745)",
      notes: "Cleared as part of Monaco for Unity per Elekta; certificate details not yet recorded."
    },
    fda: {
      status: "510k_cleared",
      type: "510(k)",
      class: "Class II",
      notes: "Cleared per Elekta; 510(k) number not yet recorded."
    },
    intendedUseStatement: "Intended for radiotherapy professionals (radiation oncologists, physicists, dosimetrists and therapists) to create candidate OAR contours that can be reviewed and edited as necessary within the Unity treatment planning workflow during the development of reference or adapted plans. Not intended for stand-alone use, for contouring primary targets, or to be used without review. (Source: Elekta TRM E076326/01, retrieved 2026-10-30)"
  },
  limitations: [
    "MR only: CT and CBCT are not supported",
    "Trained and tested only on Unity T2-weighted axial scans, head-first supine; other scanners, field strengths and sequences not assessed",
    "Whole-body scans likely to perform poorly",
    "No subgroup analysis by sex, age, race or other demographics",
    "Known weak spots per vendor: Colon_Sigmoid/Rectum continuity and Uterocervix/Vagina junction (female pelvis); small head & neck structures such as optic nerves and chiasm",
    "Evidence is vendor-generated only; no independent peer-reviewed publications identified"
  ],
  evidence: [
    {
      type: "Technical Documentation",
      description: "Elekta Monaco Segmentation Component Technical Reference Manual, E076326 / 01 (2025): model architecture, training data, performance evaluation and limitations for the four Unity MR models. Vendor-provided, not publicly available; retrieved 2026-10-30. Link points to the public Unity product page.",
      link: "https://www.elekta.com/products/radiation-therapy/unity/"
    }
  ],
  evidenceRigor: "E0",
  clinicalImpact: "L1t",
  evidenceRigorNotes: "Vendor V&V only (Technical Reference Manual). No independent peer-reviewed publication naming this component identified as of 2026-10-30.",
  clinicalImpactNotes: "L1t: technical performance (AVD, Dice, AUC) on held-out Unity data. Vendor states it is not expected to increase automation of Unity planning in a clinically significant manner.",
  adoptionReadiness: "R2",
  adoptionReadinessNotes: "E0 with CE and FDA: limited independent evidence; local commissioning on own Unity data recommended.",
  lastUpdated: "2026-10-30",
  lastRevised: "2026-10-30",
  source: TRM
};

export const ELEKTA_MONACO_PRODUCTS: ProductDetails[] = [ELEKTA_MONACO_SEGMENTATION];

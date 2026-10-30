import { ProductDetails } from "@/types/productDetails";
import { ELEKTA_MONACO_STRUCTURES } from "./elekta-monaco-structures";

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
  releaseDate: "2026-02-19",
  certification: "CE & FDA",
  market: {
    onMarketSince: "2026",
    distributionChannels: ["Integrated with Monaco for Elekta Unity"]
  },
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
    notes: "Listed per model (Female Pelvis Intact, Female Pelvis Hysterectomy, Male Pelvis, Head & Neck); names as output by the models (Tables 4, 5, 11, 17)."
  },
  supportedStructures: ELEKTA_MONACO_STRUCTURES,
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
      notes: "CE status per Elekta. Not found in EUDAMED under any Elekta manufacturer (searched 2026-10-30)."
    },
    fda: {
      status: "510k_cleared",
      type: "510(k)",
      class: "Class II",
      clearanceNumber: "K252002",
      productCode: "MUJ",
      regulationNumber: "21 CFR 892.5050",
      decisionDate: "2026-02-19",
      notes: "Cleared within 'Monaco RTP System (6.3)'. The 510(k) summary lists the AI segmentation component for MR images with Female Pelvis Intact & Hysterectomy (529 training images), Male Pelvis (250) and Head & Neck (1862) models; acceptance AVD < 3 mm met for all structures. Verified in the FDA 510(k) database 2026-10-30."
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
      type: "Regulatory Clearance",
      description: "FDA 510(k) K252002 summary, Monaco RTP System 6.3, cleared 2026-02-19: AI-based MR segmentation component and its four models.",
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252002.pdf"
    },
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
  source: TRM + "; FDA 510(k) K252002 summary (public)"
};

export const ELEKTA_MONACO_PRODUCTS: ProductDetails[] = [ELEKTA_MONACO_SEGMENTATION];

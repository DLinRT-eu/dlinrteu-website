import { ProductDetails } from "@/types/productDetails";

export const AviewRTACS: ProductDetails = {
  id: "coreline-aview-rt-acs",
  name: "Aview RT ACS",
  market: {
    onMarketSince: "2019",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  source: "Company official sources, peer-reviewed publications",
  company: "Coreline Soft Co",
  logoUrl: "/logos/coreline.jpg",
  version: "4.0",
  website: "https://www.corelinesoft.com/en/solutions/rt-acs",
  category: "Auto-Contouring",
  evidence: [
    {
      doi: "10.1016/j.ijrobp.2024.02.041 ",
      link: "https://doi.org/10.1016/j.ijrobp.2024.02.041",
      type: "Retrospective Analysis",
      year: "2024",
      level: "3",
      title: "Experience of Implementing Deep Learning-Based Automatic Contouring in Breast Radiation Therapy Planning: Insights From Over 2000 Cases",
      authors: "Lee",
      journal: "International Journal of Radiation Oncology Biology Physics",
      description: "Lee et al. Experience of Implementing Deep Learning-Based Automatic Contouring in Breast Radiation Therapy Planning: Insights From Over 2000 Cases. IJROBP 2024."
    },
    {
      link: "https://pubmed.ncbi.nlm.nih.gov/39549762/",
      type: "Retrospective Analysis",
      level: "1c",
      description: "Lee et al. Significant Influence of Cardiac Radiation Dose on the Risk of Cardiotoxicity in Patients Receiving Adjuvant Trastuzumab and Radiation Therapy for Breast Cancer IJROBP  2024"
    },
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K200714.pdf",
      type: "indirect",
      description: "FDA 510(k) clearance K200714 - AVIEW base pulmonary platform. Indirect: Aview RT ACS runs on this cleared platform but K200714 itself does not validate the RT auto-contouring module."
    },
    {
      link: "https://pubmed.ncbi.nlm.nih.gov/35151923/",
      type: "Retrospective Analysis",
      level: "1c",
      description: "Choi et al. Heart-Sparing Capability and Positional Reproducibility of Continuous Positive Airway Pressure in Left-Sided Breast Radiation Therapy PRO 2022"
    }
  ],
  features: [
    "Deep learning segmentation",
    "Fast processing",
    "Clinical workflow integration",
    "Multi-organ support",
    "Quality assurance tools"
  ],
  modality: ["CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/coreline.ts",
  companyUrl: "https://www.corelinesoft.com/en/",
  productUrl: "https://www.corelinesoft.com/en/solutions/rt-acs",
  regulatory: {
    ce: {
      type: "MDR",
      class: "IIa",
      status: "cleared",
      regulation: "MDR 2017/745"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "Cleared as AVIEW platform. RT ACS is the radiation therapy auto-contouring module. URL: https://www.accessdata.fda.gov/cdrh_docs/pdf20/K200714.pdf",
      status: "510k_cleared",
      productCode: "QKB",
      decisionDate: "2020-09-17",
      clearanceNumber: "K200714",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "AVIEW provides CT values for pulmonary tissue from CT thoracic and cardiac datasets. This software could be used to support the physician quantitatively in the diagnosis, follow up evaluation and documentation of CT lung tissue images by providing image segmentation of sub-structures in lung, lobe, airways and cardiac, registration of inspiration and expiration which could analyze quantitative information such as air trapping volume, air trapped index, and inspiration/expiration ratio; volumetric and structure analysis, density evaluation and reporting tools. AVIEW is also used to store, transfer, inquire and display CT data set on premise and as cloud environment. (Source: FDA 510(k) K200714 Summary, accessed 2026-05-30. Note: K200714 is the base AVIEW platform clearance; the Aview RT ACS application runs on this cleared platform.)"
  },
  technology: {
    deployment: ["On-premises", "cloud"],
    integration: ["TPS integration", "PACS integration"],
    processingTime: "Minutes per patient",
    triggerForAnalysis: "Manual or automated"
  },
  description: "AI-powered automatic contouring server for radiation therapy planning, providing rapid and accurate organ segmentation using deep learning algorithms across brain, head & neck, thorax, breast, abdomen, and pelvis regions.",
  keyFeatures: [
    "Deep learning segmentation",
    "Fast processing",
    "Clinical workflow integration",
    "Multi-organ support",
    "Quality assurance tools",
    "Breast contouring support"
  ],
  evidenceRigorNotes: "Two peer-reviewed studies (Byun 2021, Chung 2020) but both from the same Yonsei research group. E2 tentative pending additional independent-site validation — downgraded to E1.",
  keyPapers: [
    {"doi":"10.3857/roj.2021.00234","title":"aview RT-ACS clinical validation","authors":"Byun HK et al.","journal":"Radiat Oncol J","year":"2021"},
    {"doi":"10.3389/fonc.2020.626277","title":"Deep-learning auto-segmentation evaluation","authors":"Chung SY et al.","journal":"Front Oncol","year":"2020"}
  ],
  lastRevised: "2026-07-15",
  lastUpdated: "2026-06-15",
  releaseDate: "2025-08-20",
  trainingData: {
    source: "FDA 510(k) summary K200714",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K200714.pdf",
    scannerModels: ["CT"],
    disclosureLevel: "minimal"
  },
  certification: "CE & FDA",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
  evaluationData: {
    source: "Lee et al. IJROBP 2024 (DOI: 10.1016/j.ijrobp.2024.01.001)",
    results: "Not publicly disclosed",
    sourceUrl: "https://doi.org/10.1016/j.ijrobp.2024.01.001",
    description: "Independent evaluation of breast RT planning across 2,000 cases and validation of automated segmentation for target volumes in postoperative breast cancer.",
    studyDesign: "Retrospective large-scale clinical implementation study",
    primaryEndpoint: "Not specified"
  },
  diseaseTargeted: ["Multiple Cancer Types"],
  adoptionReadiness: "R2",
  anatomicalLocation: [
    "Brain",
    "Head & Neck",
    "Thorax",
    "Breast",
    "Abdomen",
    "Pelvis"
  ],
  evidenceRigorNotes: `Lee et al. IJROBP 2024 - large-scale (2000+ cases) breast RT implementation study.
Lee et al. IJROBP 2024 - independent clinical investigation in breast RT in which Aview was used as a tool
Choi et al. PRO 2022 - independent clinical investigation in breast RT in which Aview was used as a tool`,
  clinicalImpactNotes: "Large-scale clinical implementation demonstrates workflow improvement for breast RT contouring.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  supportedStructures: [
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
    "Abdomen: Liver",
    "Abdomen: Kidney_L",
    "Abdomen: Kidney_R",
    "Abdomen: Stomach",
    "Abdomen: Spleen",
    "Abdomen: Duodenum",
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
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E2/I2 with large-scale breast RT implementation evidence: conditional deployment readiness: evidence supports breast RT use, but no public studies were identified demonstrating implementation or validation in non-breast anatomical sites despite the broader claimed scope. Local validation, commissioning, monitoring, and workflow confirmation are required before broader routine adoption.",
  technicalSpecifications: {
    input: ["CT"],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

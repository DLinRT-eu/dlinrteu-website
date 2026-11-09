import { ProductDetails } from "@/types/productDetails";

export const AviewRTACS: ProductDetails = {
  id: "coreline-aview-rt-acs",
  name: "Aview RT ACS",
  market: {
    availability: "Commercially marketed by Coreline Soft as a radiotherapy auto-contouring solution; FDA-cleared in the United States under K220408. Supported structures and configurations may vary by country and installation.",
    onMarketSince: "2019",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  source: "FDA 510(k) K220408; vendor website; peer-reviewed literature",
  company: "Coreline Soft Co",
  logoUrl: "/logos/coreline.jpg",
  version: "4.0",
  website: "https://www.corelinesoft.com/en/solutions/rt-acs",
  category: "Auto-Contouring",
  evidence: [
    {
      doi: "10.1016/j.ijrobp.2024.02.041",
      link: "https://doi.org/10.1016/j.ijrobp.2024.02.041",
      type: "Retrospective Analysis",
      year: "2024",
      level: "3",
      title: "Experience of Implementing Deep Learning-Based Automatic Contouring in Breast Radiation Therapy Planning: Insights From Over 2000 Cases",
      authors: "Lee BM et al.",
      journal: "Int J Radiat Oncol Biol Phys",
      description: "Lee et al. Experience of Implementing Deep Learning-Based Automatic Contouring in Breast Radiation Therapy Planning: Insights From Over 2000 Cases. IJROBP 2024."
    },
    {
      link: "https://pubmed.ncbi.nlm.nih.gov/39549762/",
      type: "Retrospective Analysis",
      level: "1c",
      description: "Lee et al. Significant Influence of Cardiac Radiation Dose on the Risk of Cardiotoxicity in Patients Receiving Adjuvant Trastuzumab and Radiation Therapy for Breast Cancer IJROBP  2024"
    },
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220408.pdf",
      type: "Regulatory Summary",
      description: "FDA 510(k) K220408 (AVIEW RT ACS, cleared 2022-11-10). Standalone performance test on 120 CT cases (Korean and US, incl. TCIA) against a three-expert gold standard; DSC and 95% HD reported per organ."
    },
    {
      doi: "10.1016/j.phro.2026.100949",
      link: "https://doi.org/10.1016/j.phro.2026.100949",
      type: "indirect",
      year: "2026",
      title: "Quality assurance incorporating artificial intelligence-generated reference contours in a phase II radiotherapy trial",
      authors: "Lee W et al.",
      journal: "Phys Imaging Radiat Oncol",
      description: "Lee W et al. (2026) used a customised version of the AVIEW engine to generate reference contours for trial radiotherapy QA. Research configuration; listed for transparency, not scored as the cleared product."
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
      notes: "FDA-cleared device name: AVIEW RT ACS. Clearance K220408 is specific to this product (verified in the FDA 510(k) database 2026-11-09).",
      status: "510k_cleared",
      productCode: "QKB",
      decisionDate: "2022-11-10",
      clearanceNumber: "K220408",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "Summary (not verbatim): AVIEW RT ACS provides deep-learning-based automatic organ segmentation from CT images, generating DICOM-RT contours as initial contours for radiotherapy planning, to be reviewed, edited and approved by clinicians. (Source: FDA 510(k) K220408, cleared 2022-11-10; indications text not machine-readable in the public summary, retrieved 2026-11-09.)"
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
  keyPapers: [
    {"doi":"10.1186/s13014-021-01923-1","title":"Evaluation of deep learning-based autosegmentation in breast cancer radiotherapy","authors":"Byun HK et al.","journal":"Radiat Oncol","year":"2021","evidenceRigor":"E1","clinicalImpact":"L3", "legacyClinicalImpact": "I1","rationale":"Single-centre clinical validation with geometric endpoints."},
    {"doi":"10.3389/fonc.2023.1119008","title":"Comprehensive clinical evaluation of deep learning-based auto-segmentation for radiotherapy in patients with cervical cancer","authors":"Chung SY et al.","journal":"Front. Oncol.","year":"2023","evidenceRigor":"E1","clinicalImpact":"L3", "legacyClinicalImpact": "I1","rationale":"Single-centre auto-segmentation accuracy evaluation."}
  ],
  lastRevised: "2026-08-27",
  lastUpdated: "2026-10-15",
  releaseDate: "2025-08-20",
  trainingData: {
    source: "FDA 510(k) summary K220408",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220408.pdf",
    scannerModels: ["CT"],
    disclosureLevel: "minimal"
  },
  certification: "CE & FDA",
  evidenceRigor: "E2",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "L3",
    legacyClinicalImpact: "I2",
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

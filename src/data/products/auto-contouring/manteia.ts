
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-accucontour",
    trainingData: {
        description: "AI-powered segmentation model for CT-based radiotherapy workflows. Training details such as datasets and demographics are not explicitly disclosed in the product's regulatory or marketing summaries.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251351.pdf",
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K251351"
    },
    evaluationData: {
        sourceUrl: "https://doi.org/10.3389/fonc.2024.1375096",
        studyDesign: "Single-institution retrospective comparison",
        description: "Retrospective comparison of AccuContour against MIM ProtegeAI for 22 H&N OARs and evaluation for Nasopharyngeal Carcinoma structures. Evidence indicates strong geometric agreement with clinical contours, though manual review/editing is required.",
        source: "Frontiers in Oncology 2024 (DOI: 10.3389/fonc.2024.1375096)",
        primaryEndpoint: "Not specified",
        results: "Not publicly disclosed"
    },
    name: "AccuContour",
    company: "Manteia",
    companyUrl: "https://www.manteiamedical.com/",
    productUrl: "https://www.manteiamedical.com/accucontour",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/manteia.ts",
    description: "AI-assisted auto-contouring and image-processing software for radiation therapy workflows, supporting CT-based segmentation of OARs and selected target templates, with registration, plan review, and dose-evaluation functions depending on configuration.",
    category: "Auto-Contouring",
    certification: "FDA 510(k); CE not independently verified",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiamedical.com/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration", "Guideline-based contouring support", "Target and OAR contouring"],
    technicalSpecifications: {
      population: "Patients selected for radiation therapy; pediatric performance requires local validation",
      input: ["Non-contrast CT", "Synthetic CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "~1 minute per case (site- and ROI-dependent)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K251351",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2026-01-23",
        notes: "K251351 cleared AccuContour 4.0 (Jan 2026). Prior AccuContour clearances: K221706 (Mar 2023), K191928 (Feb 2020). K250780 is a separate ARTAssistant clearance."
      },
      intendedUseStatement: "AccuContour 4.0 is used by the radiation oncology department to segment CT images and generate information needed for treatment planning, treatment evaluation, and treatment adaption. (Source: FDA 510(k) K251351 Summary, accessed 2026-06-11.)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
    },
    version: "4.0",
    releaseDate: "2026-01-23",
    lastUpdated: "2026-06-15",
    supportedStructures: [
      // H&N Structures and elective nodes
      "Head & Neck: Eye_L",
      "Head & Neck: Eye_R",
      "Head & Neck: Lens_L",
      "Head & Neck: Lens_R",
      "Head & Neck: OpticChiasm",
      "Head & Neck: OpticNrv_L",
      "Head & Neck: OpticNrv_R",
      "Head & Neck: Retina_L",
      "Head & Neck: Retina_R",
      "Head & Neck: Glnd_Lacrimal_L",
      "Head & Neck: Glnd_Lacrimal_R",
      "Head & Neck: Glnd_Submand_L",
      "Head & Neck: Glnd_Submand_R",
      "Head & Neck: Parotid_L",
      "Head & Neck: Parotid_R",
      "Head & Neck: Cavity_Oral",
      "Head & Neck: Cavity_Oral_NRG",
      "Head & Neck: Lips",
      "Head & Neck: Tongue",
      "Head & Neck: Tongue_All",
      "Head & Neck: Tongue_Base_L",
      "Head & Neck: Tongue_Base_R",
      "Head & Neck: Tongue_Oral_L",
      "Head & Neck: Tongue_Oral_R",
      "Head & Neck: Palate_Soft",
      "Head & Neck: Pharynx",
      "Head & Neck: Musc_Constrict_I",
      "Head & Neck: Musc_Constrict_M",
      "Head & Neck: Musc_Constrict_S",
      "Head & Neck: Larynx",
      "Head & Neck: Larynx_SG",
      "Head & Neck: Glottis",
      "Head & Neck: Oropharynx",
      "Head & Neck: Nasopharynx",
      "Head & Neck: Tonsil",
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Cerebellum",
      "Head & Neck: Hippocampus_L",
      "Head & Neck: Hippocampus_R",
      "Head & Neck: Lobe_Temporal_L",
      "Head & Neck: Lobe_Temporal_R",
      "Head & Neck: Pituitary",
      "Head & Neck: Hypothalmus",
      "Head & Neck: Pons",
      "Head & Neck: Pineal",
      "Head & Neck: Ear_External_L",
      "Head & Neck: Ear_External_R",
      "Head & Neck: Ear_Internal_L",
      "Head & Neck: Ear_Internal_R",
      "Head & Neck: Ear_Middle_L",
      "Head & Neck: Ear_Middle_R",
      "Head & Neck: Joint_TM_L",
      "Head & Neck: Joint_TM_R",
      "Head & Neck: Malleus_L",
      "Head & Neck: Malleus_R",
      "Head & Neck: Stapes_L",
      "Head & Neck: Stapes_R",
      "Head & Neck: Bone_Mandible",
      "Head & Neck: Bone_Mastoid_L",
      "Head & Neck: Bone_Mastoid_R",
      "Head & Neck: Bone_Temporal_L",
      "Head & Neck: Bone_Temporal_R",
      "Head & Neck: Bone_Nasal_L",
      "Head & Neck: Bone_Nasal_R",
      "Head & Neck: Bone_Lacrimal_L",
      "Head & Neck: Bone_Lacrimal_R",
      "Head & Neck: CervicalSpine",
      "Head & Neck: LN_Neck_II_L",
      "Head & Neck: LN_Neck_II_R",
      "Head & Neck: LN_Neck_III_L",
      "Head & Neck: LN_Neck_III_R",
      "Head & Neck: LN_Neck_IV_L",
      "Head & Neck: LN_Neck_IV_R",
      "Head & Neck: LN_Neck_IB_L",
      "Head & Neck: LN_Neck_IB_R",
      "Head & Neck: A_Carotid_L",
      "Head & Neck: A_Carotid_R",
      "Head & Neck: BrachialPlex_L",
      "Head & Neck: BrachialPlex_R",

      // Thorax Structures - OARs
      "Thorax: Heart",
      "Thorax: Lung_L",
      "Thorax: Lung_R",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: BrachialPlex_L",
      "Thorax: BrachialPlex_R",
      "Thorax: Aorta",
      "Thorax: Great Vessels",
      "Thorax: Proximal Bronchial Tree",
      "Thorax: Spinal Cord",
      "Thorax: Spinal Canal",
      "Thorax: ThoracicSpine",
      "Thorax: Chest Wall",
      "Thorax: Rib_L",
      "Thorax: Rib_R",

      // Thorax Target Structures
      "Thorax: GTV Lung",
      "Thorax: CTV Lung",
      "Thorax: PTV Lung",

      // Abdomen Structures - OARs
      "Abdomen: Liver",
      "Abdomen: Kidney_L",
      "Abdomen: Kidney_R",
      "Abdomen: Stomach",
      "Abdomen: Pancreas",
      "Abdomen: Spleen",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Abdomen: Gallbladder",
      "Abdomen: Adrenal_L",
      "Abdomen: Adrenal_R",

      // Pelvis Structures - OARs
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Anal Canal",
      "Pelvis: Sigmoid Colon",
      "Pelvis: Femur_L",
      "Pelvis: Femur_R",
      "Pelvis: Bowel Bag",
      "Pelvis: Cauda Equina",
      "Pelvis: Sacrum",
      "Pelvis: Iliac Crest_L",
      "Pelvis: Iliac Crest_R",
      "Pelvis: Pelvic Bone_L",
      "Pelvis: Pelvic Bone_R",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Urethra",
      "Pelvis: Uterus",
      "Pelvis: Ovary_L",
      "Pelvis: Ovary_R",
      "Pelvis: Vagina",

      // Pelvis Target Structures - Prostate
      "Pelvis: GTV Prostate",
      "Pelvis: GTV Seminal Vesicle",
      "Pelvis: CTV Prostate",
      "Pelvis: CTV Prostate + SV",
      "Pelvis: CTV Pelvic Nodes",
      "Pelvis: PTV Prostate",

      // Pelvis Target Structures - Gynecological
      "Pelvis: GTV Cervix",
      "Pelvis: CTV Cervix",
      "Pelvis: CTV Para-aortic Nodes"
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Wang 2022 (Front Oncol) confirmed; additional independent studies support E2 (conditional on product-name verification in full text).",
    clinicalImpactNotes: "Evidence supports contouring efficiency and geometric agreement for selected OARs, with clinically necessary review/editing; impact is workflow/contouring support rather than demonstrated patient outcome improvement.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): peer-reviewed retrospective evidence and U.S. regulatory clearance are present, but public CE evidence was not independently verified and local commissioning, model acceptance testing, governance, and user training remain required.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Multi-vendor Comparative Study",
        description: "Johnson C et al. Single-institution H&N validation comparing AccuContour and MIM ProtegeAI for 22 OARs in 40 CT cases. Front Oncol 2024;14:1375096. AccuContour directly evaluated alongside MIM ProtegeAI (verified in Methods).",
        link: "https://doi.org/10.3389/fonc.2024.1375096"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Wang et al. Evaluation of atlas-based and AccuContour deep-learning auto-contouring for nasopharyngeal carcinoma OARs. Front Oncol 2022;12:833816. Direct evaluation of AccuContour.",
        link: "https://doi.org/10.3389/fonc.2022.833816"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Yan et al. Comparison of four commercial deep-learning contouring models, including AccuContour, for nasopharyngeal carcinoma structures and GTV. Sci Rep 2026. AccuContour is one of four evaluated commercial models (verified in Methods).",
        link: "https://doi.org/10.1038/s41598-025-33567-6"
      }
    ],
    relatedProducts: [
      {
        id: "manteia-mozi",
        relationship: "Sibling product — MOZI TPS includes built-in DL auto-contouring (same company ecosystem). AccuContour is for users who need standalone contouring without the full TPS."
      },
      {
        id: "manteia-acculearning",
        relationship: "AccuLearning is Manteia's custom model training platform; trained models can be deployed into AccuContour for site-specific OAR segmentation."
      }
    ],
    keyPapers: [
    {"doi":"10.3389/fonc.2022.833816","title":"AccuContour clinical evaluation","authors":"Wang J et al.","journal":"Front Oncol","year":"2022"}
  ],
    lastRevised: "2026-07-15",
    source: "FDA 510(k) database (K251351, K250780, K221706, K191928), Manteia official product page, peer-reviewed literature",
    limitations: [
      "Limited performance on contrast-enhanced CT scans",
      "Reduced accuracy for post-surgical anatomy",
      "Pediatric performance was not established in the reviewed direct AccuContour clinical validation studies",
      "Requires manual verification and editing in complex anatomical regions",
      "Vendor advertises >300 OARs, >20 tumor targets, and use in >1200 worldwide centers; the complete model atlas and per-structure validation matrix are not publicly enumerated on the vendor page.",
      "Public EU MDR/CE certificate details were not located during this audit.",
      "K251351 compatible contouring input is non-contrast CT DICOM 3.0, including original CT and synthetic CT; contrast-enhanced or unusual imaging workflows require local validation."
    ]
  }
];

import { ProductDetails } from "@/types/productDetails";

export const Annotate: ProductDetails = {
  id: "therapanacea-annotate",
  trainingData: {
    description: "Models trained on expert-delineated CT datasets following international contouring guidelines across major cancer sites (Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Training data reviewed and validated by clinical experts. Dataset details not fully disclosed publicly.",
    disclosureLevel: "partial",
    source: "Therapanacea product page and FDA 510(k) summary K211539",
    sourceUrl: "https://www.therapanacea.eu/our-products/annotate/",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16"
  },
  evaluationData: {
    studyDesign: "Multi-center retrospective and prospective evaluation; Turing test evaluation vs. MIM ProtégéAI",
    source: "DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25); Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654)",
    sourceUrl: "https://doi.org/10.4103/jmp.jmp_11_25",
    description: "DiTusa et al. (2025) directly compared TheraPanacea Annotate vs. MIM ProtégéAI using a blinded Turing test design. Lê et al. (2024) evaluated Annotate performance on Head & Neck DECT images at Gustave Roussy (74 patients, 13 structures). Both studies confirm clinically acceptable OAR auto-segmentation quality.",
    results: "Turing test: AI-generated contours indistinguishable from expert-drawn for multiple structures (DiTusa 2025). H&N DECT: PEI80-DD achieved highest DSC scores (Lê 2024).",
    primaryEndpoint: "Turing test indistinguishability; DSC / 95HD against clinical reference"
  },
  name: "Annotate",
  company: "Therapanacea",
  companyUrl: "https://www.therapanacea.eu/",
  productUrl: "https://www.therapanacea.eu/our-products/annotate/",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  description: "AI-powered, CE-marked and FDA-cleared auto-contouring software providing zero-click, automatic delineation of more than 200 organs at risk (OARs) and lymph nodes for all major cancer sites (CT models: Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Delineates with the same accuracy as clinical experts in a matter of minutes. Cloud-based, GDPR-compliant, with seamless TPS integration and batch processing. MRI models are part of MR-Box (separate product).",
  category: "Auto-Contouring",
  certification: "CE & FDA",
  logoUrl: "/logos/therapanacea.png",
  website: "https://www.therapanacea.eu/our-products/annotate/",
  anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis", "Lung"],
  modality: ["CT"],
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  keyFeatures: [
    "Zero-click automatic delineation of 200+ OARs and lymph nodes",
    "Coverage of all major cancer sites: Head & Neck, Thorax/Breast, Pelvis (male/female), SBRT Lung",
    "Follows international contouring guidelines (Grégoire 2014, ESTRO Offersen 2015, Gay 2012, UK SABR Consortium 2019)",
    "Batch mode for background processing with direct export to TPS",
    "Plug and play DICOM integration with hospital systems",
    "GDPR-compliant cloud-based web application",
    "Up to 93% reduction in manual contouring tasks for OARs",
    "Full-body delineation in approximately 3 minutes",
    "Exclusive lymph node models for CTVn",
    "Continuously updated models with new structures"
  ],
  features: [
    "Automatic OAR contouring",
    "Lymph node delineation",
    "Batch processing",
    "Guideline-based segmentation",
    "Cloud deployment",
    "DICOM export to TPS"
  ],
  supportedStructures: [
    // === MODEL 1 — HEAD & NECK (Grégoire 2014) ===
    // OARs
    { name: "Head & Neck: Brachial Plexus (L/R)", type: "OAR" },
    { name: "Head & Neck: Brainstem", type: "OAR" },
    { name: "Head & Neck: Cerebellum", type: "OAR" },
    { name: "Head & Neck: Chiasma", type: "OAR" },
    { name: "Head & Neck: Cochlea (L/R)", type: "OAR" },
    { name: "Head & Neck: Encephalon", type: "OAR" },
    { name: "Head & Neck: Esophagus", type: "OAR" },
    { name: "Head & Neck: Eye (L/R)", type: "OAR" },
    { name: "Head & Neck: Eye Lens (L/R)", type: "OAR" },
    { name: "Head & Neck: Glottic Larynx", type: "OAR" },
    { name: "Head & Neck: Hypophyse", type: "OAR" },
    { name: "Head & Neck: Lacrimal Gland (L/R)", type: "OAR" },
    { name: "Head & Neck: Larynx", type: "OAR" },
    { name: "Head & Neck: Lips", type: "OAR" },
    { name: "Head & Neck: Mandible", type: "OAR" },
    { name: "Head & Neck: Medullar Canal", type: "OAR" },
    { name: "Head & Neck: Mouth", type: "OAR" },
    { name: "Head & Neck: Optical Nerve (L/R)", type: "OAR" },
    { name: "Head & Neck: Parotid (L/R)", type: "OAR" },
    { name: "Head & Neck: Pharyngeal Constrictor Muscle", type: "OAR" },
    { name: "Head & Neck: Sub Mandible (L/R)", type: "OAR" },
    { name: "Head & Neck: Supraglottic Larynx", type: "OAR" },
    { name: "Head & Neck: Thyroid", type: "OAR" },
    { name: "Head & Neck: Temporomandibular Joints (L/R)", type: "OAR" },
    { name: "Head & Neck: Trachea", type: "OAR" },
    // Elective lymph nodes (Grégoire 2014)
    { name: "Head & Neck: Cervical LN IA", type: "Elective" },
    { name: "Head & Neck: Cervical LN IB (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN II (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN III (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN IVA (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN IVB (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN V (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN VIA", type: "Elective" },
    { name: "Head & Neck: Cervical LN VIB", type: "Elective" },
    { name: "Head & Neck: Cervical LN VIIA (L/R)", type: "Elective" },
    { name: "Head & Neck: Cervical LN VIIB (L/R)", type: "Elective" },

    // === MODEL 2 — FEMALE THORAX / BREAST (Offersen 2015, De Rose 2017) ===
    { name: "Female Thorax / Breast: Brachial Plexus (L/R)", type: "OAR" },
    { name: "Female Thorax / Breast: Breast (L/R)", type: "OAR" },
    { name: "Female Thorax / Breast: Bronchial Tree", type: "OAR" },
    { name: "Female Thorax / Breast: Chest Wall (L/R)", type: "OAR" },
    { name: "Female Thorax / Breast: Esophagus", type: "OAR" },
    { name: "Female Thorax / Breast: Heart", type: "OAR" },
    { name: "Female Thorax / Breast: Humeral Head (L/R)", type: "OAR" },
    { name: "Female Thorax / Breast: Liver", type: "OAR" },
    { name: "Female Thorax / Breast: Lung (L/R)", type: "OAR" },
    { name: "Female Thorax / Breast: Medullar Canal", type: "OAR" },
    { name: "Female Thorax / Breast: Spinal Cord", type: "OAR" },
    { name: "Female Thorax / Breast: Thyroid", type: "OAR" },
    { name: "Female Thorax / Breast: Trachea", type: "OAR" },
    // Elective LNs (Offersen 2015)
    { name: "Female Thorax / Breast: IMC (Internal Mammary Chain) LN (L/R)", type: "Elective" },
    { name: "Female Thorax / Breast: Interpectoral LN (L/R)", type: "Elective" },
    { name: "Female Thorax / Breast: Lymph Nodes L1 (L/R)", type: "Elective" },
    { name: "Female Thorax / Breast: Lymph Nodes L2 (L/R)", type: "Elective" },
    { name: "Female Thorax / Breast: Lymph Nodes L3 (L/R)", type: "Elective" },
    { name: "Female Thorax / Breast: Supraclavicular LN (L/R)", type: "Elective" },

    // === MODEL 3 — MALE THORAX (De Rose 2017) ===
    { name: "Male Thorax: Brachial Plexus (L/R)", type: "OAR" },
    { name: "Male Thorax: Bronchial Tree", type: "OAR" },
    { name: "Male Thorax: Chest Wall (L/R)", type: "OAR" },
    { name: "Male Thorax: Esophagus", type: "OAR" },
    { name: "Male Thorax: Heart", type: "OAR" },
    { name: "Male Thorax: Humeral Head (L/R)", type: "OAR" },
    { name: "Male Thorax: Liver", type: "OAR" },
    { name: "Male Thorax: Lung (L/R)", type: "OAR" },
    { name: "Male Thorax: Medullar Canal", type: "OAR" },
    { name: "Male Thorax: Spinal Cord", type: "OAR" },
    { name: "Male Thorax: Thyroid", type: "OAR" },
    { name: "Male Thorax: Trachea", type: "OAR" },

    // === MODEL 4 — HEART SUB-STRUCTURES (Duane 2017, Lee 2017) ===
    { name: "Heart Sub-Structures: Ascending Aorta", type: "OAR" },
    { name: "Heart Sub-Structures: Atrium (L/R)", type: "OAR" },
    { name: "Heart Sub-Structures: Bronchus (L/R)", type: "OAR" },
    { name: "Heart Sub-Structures: Carina", type: "OAR" },
    { name: "Heart Sub-Structures: Circumflex Coronary Distal", type: "OAR" },
    { name: "Heart Sub-Structures: Circumflex Coronary Proximal", type: "OAR" },
    { name: "Heart Sub-Structures: Coronary Sinus", type: "OAR" },
    { name: "Heart Sub-Structures: LAD Coronary", type: "OAR" },
    { name: "Heart Sub-Structures: Left Main Coronary Artery", type: "OAR" },
    { name: "Heart Sub-Structures: Left Ventricle Apical", type: "OAR" },
    { name: "Heart Sub-Structures: Left Ventricle Anterior", type: "OAR" },
    { name: "Heart Sub-Structures: Left Ventricle Inferior", type: "OAR" },
    { name: "Heart Sub-Structures: Left Ventricle Lateral", type: "OAR" },
    { name: "Heart Sub-Structures: Left Ventricle Septal", type: "OAR" },
    { name: "Heart Sub-Structures: Pericardium", type: "OAR" },
    { name: "Heart Sub-Structures: Pulmonary Arteries", type: "OAR" },
    { name: "Heart Sub-Structures: Thoracic Aorta", type: "OAR" },
    { name: "Heart Sub-Structures: Vena Cava Superior", type: "OAR" },
    { name: "Heart Sub-Structures: Vena Cava", type: "OAR" },
    { name: "Heart Sub-Structures: Ventricle (L/R)", type: "OAR" },

    // === MODEL 5 — SBRT LUNG (UK SABR Consortium 2019) ===
    { name: "SBRT Lung: Brachial Plexus", type: "OAR" },
    { name: "SBRT Lung: Chest Wall", type: "OAR" },
    { name: "SBRT Lung: Esophagus", type: "OAR" },
    { name: "SBRT Lung: Heart", type: "OAR" },
    { name: "SBRT Lung: LAD Artery (Left Anterior Descending)", type: "OAR" },
    { name: "SBRT Lung: Liver", type: "OAR" },
    { name: "SBRT Lung: Pericardium", type: "OAR" },
    { name: "SBRT Lung: Pulmonary Arteries", type: "OAR" },
    { name: "SBRT Lung: Skin", type: "OAR" },
    { name: "SBRT Lung: Spinal Cord", type: "OAR" },
    { name: "SBRT Lung: Trachea", type: "OAR" },
    { name: "SBRT Lung: Vena Cava", type: "OAR" },

    // === MODEL 6 — PELVIS MALE (Gay 2012) ===
    { name: "Pelvis Male: Anal Canal", type: "OAR" },
    { name: "Pelvis Male: Bladder", type: "OAR" },
    { name: "Pelvis Male: Bowel Bag", type: "OAR" },
    { name: "Pelvis Male: Duodenum", type: "OAR" },
    { name: "Pelvis Male: Femoral Head (L/R)", type: "OAR" },
    { name: "Pelvis Male: Iliac (L/R)", type: "OAR" },
    { name: "Pelvis Male: Kidney (L/R)", type: "OAR" },
    { name: "Pelvis Male: Large Bowel", type: "OAR" },
    { name: "Pelvis Male: Liver", type: "OAR" },
    { name: "Pelvis Male: Medullar Canal", type: "OAR" },
    { name: "Pelvis Male: Penile Bulb", type: "OAR" },
    { name: "Pelvis Male: Prostate", type: "OAR" },
    { name: "Pelvis Male: Rectum", type: "OAR" },
    { name: "Pelvis Male: Seminal Vesicle", type: "OAR" },
    { name: "Pelvis Male: Sigmoid", type: "OAR" },
    { name: "Pelvis Male: Small Bowel", type: "OAR" },
    { name: "Pelvis Male: Spinal Cord", type: "OAR" },
    { name: "Pelvis Male: Stomach", type: "OAR" },
    { name: "Pelvis Male: CTVn Prostate", type: "Targets" },

    // === MODEL 7 — PELVIS FEMALE (Gay 2012) ===
    { name: "Pelvis Female: Anal Canal", type: "OAR" },
    { name: "Pelvis Female: Bladder", type: "OAR" },
    { name: "Pelvis Female: Bowel Bag", type: "OAR" },
    { name: "Pelvis Female: Femoral Head (L/R)", type: "OAR" },
    { name: "Pelvis Female: Iliac (L/R)", type: "OAR" },
    { name: "Pelvis Female: Kidney (L/R)", type: "OAR" },
    { name: "Pelvis Female: Large Bowel", type: "OAR" },
    { name: "Pelvis Female: Liver", type: "OAR" },
    { name: "Pelvis Female: Medullar Canal", type: "OAR" },
    { name: "Pelvis Female: Parametrium", type: "OAR" },
    { name: "Pelvis Female: Rectum", type: "OAR" },
    { name: "Pelvis Female: Sigmoid", type: "OAR" },
    { name: "Pelvis Female: Small Bowel", type: "OAR" },
    { name: "Pelvis Female: Spinal Cord", type: "OAR" },
    { name: "Pelvis Female: Stomach", type: "OAR" },
    { name: "Pelvis Female: Vagina", type: "OAR" },
    { name: "Pelvis Female: Common Iliac Gyneco LNs", type: "Elective" },
    { name: "Pelvis Female: Iliac Gyneco LN (L/R)", type: "Elective" },
    { name: "Pelvis Female: Inguinal Gyneco LN (L/R)", type: "Elective" },
    { name: "Pelvis Female: Lomboartic Gyneco LNs", type: "Elective" },
    { name: "Pelvis Female: Presacral Gyneco LNs", type: "Elective" },
    { name: "Pelvis Female: CTVt Gyneco", type: "Targets" }
  ],
  structuresProvenance: {
    source: "Therapanacea Annotate product page (therapanacea.eu/our-products/annotate/)",
    sourceUrl: "https://www.therapanacea.eu/our-products/annotate/",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16",
    notes: "CT models only — MRI models belong to MR-Box (id: mr-box-synthetic). Seven distinct CT models on the vendor page (anchors): Head & Neck (https://www.therapanacea.eu/our-products/annotate/#1658756812-1-23), Female Thorax / Breast (https://www.therapanacea.eu/our-products/annotate/#1658760957917-5-8), Male Thorax (https://www.therapanacea.eu/our-products/annotate/#1658760957917-5-8), Heart Sub-Structures (https://www.therapanacea.eu/our-products/annotate/#1658759523386-4-10), SBRT Lung (https://www.therapanacea.eu/our-products/annotate/#1658759893513-5-6), Pelvis Male (https://www.therapanacea.eu/our-products/annotate/#1658756871852-2-2), Pelvis Female (https://www.therapanacea.eu/our-products/annotate/#1658758391559-2-3)."
  },
  guidelines: [
    {
      name: "Grégoire et al. – Head & Neck LN delineation",
      version: "2014",
      reference: "https://doi.org/10.1016/j.radonc.2013.10.010",
      url: "https://doi.org/10.1016/j.radonc.2013.10.010",
      compliance: "full"
    },
    {
      name: "ESTRO – Offersen et al. – Breast lymph node delineation",
      version: "2015",
      reference: "https://doi.org/10.1016/j.radonc.2015.07.010",
      url: "https://doi.org/10.1016/j.radonc.2015.07.010",
      compliance: "full"
    },
    {
      name: "UK SABR Consortium – Lung SBRT",
      version: "2019",
      url: "https://www.sabr.org.uk/",
      compliance: "full"
    },
    {
      name: "De Rose et al. – Thoracic OARs",
      version: "2017",
      reference: "https://doi.org/10.1016/j.prro.2017.01.003",
      url: "https://doi.org/10.1016/j.prro.2017.01.003",
      compliance: "full"
    },
    {
      name: "Lee et al. – Heart sub-structure delineation",
      version: "2017",
      reference: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      url: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      compliance: "full"
    },
    {
      name: "Duane et al. – Heart contouring",
      version: "2017",
      reference: "https://doi.org/10.1016/j.clon.2017.10.007",
      url: "https://doi.org/10.1016/j.clon.2017.10.007",
      compliance: "full"
    },
    {
      name: "Gay et al. – Pelvis OAR delineation",
      version: "2012",
      reference: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      url: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      compliance: "full"
    }
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  technology: {
    integration: ["Cloud-based web application", "DICOM export to TPS", "PACS integration"],
    deployment: ["Cloud-based (GDPR-compliant)"],
    triggerForAnalysis: "Zero-click automatic or batch mode",
    processingTime: "Full-body delineation in approximately 3 minutes; time varies with number of structures"
  },
  regulatory: {
    ce: {
      status: "cleared",
      class: "Class IIb",
      type: "MDR",
      regulation: "MDR 2017/745",
      notifiedBody: "GMED (Notified Body 0459)"
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K253091",
      productCode: "MUJ, QKB, LLZ",
      regulationNumber: "21 CFR 892.2050",
      decisionDate: "2025-12-23",
      notes: "FDA K253091 (ART-Plan+ v3.1.0, decision 2025-12-23) explicitly clears the Annotate module for OAR delineation alongside AdaptBox and SmartPlan modules. Prior clearances: K211539 (ART-Plan v2.0, 2021 — initial Annotate clearance).",
      additionalClearances: [
        {
          clearanceNumber: "K211539",
          decisionDate: "2021",
          description: "ART-Plan v2.0 — initial FDA clearance for the Annotate OAR auto-contouring module",
          sourceUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211539"
        }
      ]
    },
    intendedUseStatement: "Annotate is an AI-powered software module within ART-Plan+ providing zero-click automatic delineation of organs at risk (OARs) and lymph nodes for radiation therapy treatment planning. Cleared for CT-based contouring of structures across Head & Neck, Thorax, Breast, Pelvis (male and female), and SBRT Lung anatomical sites. MRI-based models are covered under the MR-Box module (K234068, K242822). (Sources: FDA K253091 Summary 2025-12-23; Therapanacea product page accessed 2026-06-16.)"
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Available in EU, USA, and select international markets. Not all models available in all markets."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.1.0 (FDA cleared) / 3.2.0 (current)",
    productUrl: "https://www.therapanacea.eu/our-products/",
    relationship: "Module"
  },
  usesAI: true,
  evidenceRigor: "E2",
  clinicalImpact: "I2",
  evidenceRigorNotes: "Two directly relevant PubMed-indexed studies explicitly naming Annotate. DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25): direct head-to-head Turing test comparison vs. MIM ProtégéAI. Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654): performance on 74 H&N patients (DECT) at Gustave Roussy — conflict of interest declared (Gustave Roussy received Therapanacea funding). PubMed verified 2026-06-16.",
  clinicalImpactNotes: "DiTusa 2025 Turing test: AI contours indistinguishable from expert-drawn for multiple structures. Lê 2024: clinically acceptable performance on DECT H&N; PEI80-DD achieves highest DSC. Manufacturer claims up to 93% reduction in manual OAR contouring tasks and full-body delineation in ~3 minutes; independent quantification of time savings not yet published across all sites.",
  adoptionReadiness: "R3",
  adoptionReadinessNotes: "CE & FDA cleared with 2 independent peer-reviewed evaluations explicitly naming the product. Cloud deployment reduces integration complexity. Standard commissioning (local QA, guideline alignment) expected.",
  burdenFactors: {
    commissioningRequired: true,
    localValidationRequired: true,
    workflowRedesign: false,
    integrationComplexity: "low",
    humanFactorsTesting: false,
    economicCaseRequired: false,
    subgroupValidationGaps: true,
    postMarketMonitoringPlan: false
  },
  evidenceVendorIndependent: true,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: true,
  evidence: [
    {
      type: "Multi-vendor Comparative Study",
      description: "DiTusa C, Chen J, Husain A, et al. Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy (TheraPanacea Annotate vs. MIM ProtégéAI, Turing test design). J Med Phys 2025;50(2):233–241.",
      link: "https://doi.org/10.4103/jmp.jmp_11_25",
      authors: "DiTusa C, Chen J, Husain A, Schneider C, Spears H, Paragios N, Debevec G, Stathakis S",
      year: 2025,
      title: "Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy",
      journal: "J Med Phys",
      doi: "10.4103/jmp.jmp_11_25"
    },
    {
      type: "Peer-reviewed Publication",
      description: "Lê AT, Sambourg K, Sun R, et al. Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography (Annotate evaluated at Gustave Roussy, 74 H&N patients, 13 structures). Phys Imaging Radiat Oncol 2024;32:100654.",
      link: "https://doi.org/10.1016/j.phro.2024.100654",
      authors: "Lê AT, Sambourg K, Sun R, Deny N, Cifliku V, Rouhi R, Deutsch E, Fournier-Bidoz N, Robert C",
      year: 2024,
      title: "Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography",
      journal: "Phys Imaging Radiat Oncol",
      doi: "10.1016/j.phro.2024.100654"
    }
  ],
  limitations: [
    "CT models only; MRI-based OAR delineation is provided by the separate MR-Box product",
    "Not all models available in all markets",
    "Independent multi-center time-savings studies not yet published for all anatomical sites",
    "Lê 2024 was conducted at an institution with an active Therapanacea research contract (declared conflict of interest)",
    "DECT performance is reconstruction-kernel dependent — PEI80-DD achieves highest DSC; other kernels show lower performance (Lê 2024)"
  ],
  version: "3.2.0",
  releaseDate: "2021",
  lastUpdated: "2026-06-16",
  lastRevised: "2026-06-16",
  source: "Therapanacea product page (therapanacea.eu/our-products/annotate/, accessed 2026-06-16); FDA 510(k) K253091 (decision 2025-12-23); PubMed verified 2026-06-16."
};

export const TumorBox: ProductDetails = {
  id: "therapanacea-tumorbox-pipeline",
  trainingData: {
      disclosureLevel: "minimal",
      source: "FDA 510(k) summary K253091",
      description: "Not publicly disclosed. Product is a deep learning module for tumor segmentation (GTV/CTV/PTV).",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf"
  },
  evaluationData: {
      primaryEndpoint: "Not specified",
      source: "FDA 510(k) summary K253091",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      description: "Software validation and verification for FDA 510(k) clearance as an AI tumor-segmentation module for ART-Plan+.",
      results: "Not publicly disclosed",
      studyDesign: "Software V&V (FDA 510(k))"
  },
  name: "TumorBox",
  partOf: {
    name: "ART-Plan+",
    productUrl: "https://www.therapanacea.eu/our-products/",
    relationship: "Module"
  },
  source: "Company website - listed as 'Coming Soon'",
  usesAI: true,
  company: "Therapanacea",
  logoUrl: "/logos/therapanacea.png",
  version: "Art-Plan+ (v3.1.0)",
  website: "https://www.therapanacea.eu/our-products/",
  category: "Auto-Contouring",
  features: [
    "Automatic tumor segmentation",
    "GTV/CTV/PTV delineation",
    "Multi-modality support",
    "Adaptive contouring"
  ],
  modality: ["CT", "MRI", "PET"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
  companyUrl: "https://www.therapanacea.eu/",
  productUrl: "https://www.therapanacea.eu/our-products/",
  regulatory: {
    fda: {
      class: "II",
      status: "Approved",
      productCode: "MUJ, QKB, LLZ ",
      decisionDate: "2025-12-23",
      clearanceNumber: "K253091"
    },
    intendedUseStatement: "\"Coming Soon.\" Pre-market AI tumor-segmentation module for ART-Plan+; no Indications for Use published and no regulatory clearance disclosed. (Source: Therapanacea product page, https://www.therapanacea.eu/our-products/, retrieved 23 May 2026.)"
  },
  description: "AI-powered tumor segmentation module for the ART-Plan+ platform. Provides automated delineation of tumor volumes (GTV, CTV, PTV) using advanced deep learning algorithms.",
  keyFeatures: [
    "Automatic GTV delineation using deep learning",
    "CTV and PTV expansion algorithms",
    "Multi-modality image fusion support",
    "Adaptive re-contouring for ART workflows"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2025-12-23",
  certification: "510(k) K253091",
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  developmentStage: "pipeline",
  anatomicalLocation: ["Multi-site"]
};

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [Annotate, TumorBox];

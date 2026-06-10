import { ProductDetails } from "@/types/productDetails";

export const MediqRT: ProductDetails = {
  id: "synaptiq-mediq-rt",
  name: "Mediq RT",
  market: {
    onMarketSince: "2021 (testing in 12+ Romanian clinics, EBRD-backed)",
    distributionChannels: ["Direct sales", "Hospital partnerships"]
  },
  source: "Company website, internal clinical study (Jan 2024), PHIRO journal paper (2026), ESTRO 2023/2024/2025 conference abstracts, and vendor communication at the Synaptiq booth at ESTRO 2026 (Stockholm, 15–19 May 2026) reporting CE clearance including the Active Contouring GTV delineation feature. CE clearance details pending verification against EUDAMED listing or vendor press release.",
  company: "Synaptiq",
  logoUrl: "/logos/synaptiq.png",
  version: "1.6",
  website: "https://synaptiq.io/product/",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://doi.org/10.1016/j.phro.2026.100935",
      type: "journal",
      description: "Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy. Physics and Imaging in Radiation Oncology (2026)."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(25)03323-7",
      type: "conference",
      description: "The impact of AI-driven templates in brachytherapy practice. ESTRO 2025 Abstract Book p. 283."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(25)03323-7",
      type: "conference",
      description: "Enhanced Efficiency in GTV Delineation: Evaluating AI 'Active Contouring' Tool. ESTRO 2025 Abstract Book p. 2558."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(25)03273-6",
      type: "conference",
      description: "Future liver remnant meets the future of medicine: AI integration in liver metastases assessment and treatment selection. ESTRO 2025 Abstract Book p. 2569."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(25)00719-4",
      type: "conference",
      description: "Explainable AI for deep learning-based markerless lung tumor tracking. ESTRO 2025 Abstract Book p. 3246."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(24)03098-6",
      type: "conference",
      description: "Clinical Evaluation of a Deep Learning Model for Assessing OAR Delineation in Head and Neck Oncology. ESTRO 2024."
    },
    {
      link: "https://doi.org/10.1016/S0167-8140(23)66556-9",
      type: "conference",
      description: "Clinical evaluation of autosegmentation using AI with manual segmentation of breast tissue. ESTRO 2023."
    }
  ],
  modality: ["CT", "MRI"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/synaptiq.ts",
  companyUrl: "https://synaptiq.io/",
  productUrl: "https://synaptiq.io/product/",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      notes: "CE marked since 2025-06-01 under MDR as a Class IIa medical device software. Scope includes AI-based auto-segmentation of OARs and CTVs on CT and the Active Contouring GTV delineation feature.",
      status: "cleared"
    },
    fda: {
      status: "pending"
    },
    intendedUseStatement: "Mediq RT is a software as a medical device intended to assist radiation oncologists and medical physicists during contouring of 3D CT images of patients with an indication for radiotherapy. The software offers AI-based auto-segmentation of organs-at-risk (OARs) and clinical target volumes (CTVs), designed to streamline the contouring workflow by enabling interactive review, editing, and approval by qualified users prior to export to treatment planning systems. Mediq RT is capable of delineating regions of interest for all important anatomical sites, including head and neck, thorax, abdomen, and pelvis, and can support other target volumes as defined in clinical practice.\n\nIntended Medical Indication: Mediq RT automatically segments organs-at-risk (OARs) and clinical target volumes (CTVs) using CT scans for radiotherapy treatment planning. It assists radiation oncologists and medical physicists in contouring, reviewing, and editing these regions of interest. The software is designed for a broad spectrum of malignancies, where precise radiation delivery is essential to maximize tumor control and minimize damage to surrounding healthy tissues. (Source: vendor-provided intended purpose statement, 2026-06-10.)"
  },
  technology: {
    deployment: [
      "Cloud-based",
      "Desktop (Windows 7+, MacOS 10.14+)"
    ],
    integration: ["Multi-vendor TPS integration", "PACS integration"],
    processingTime: "Seconds to minutes per case",
    triggerForAnalysis: "Manual or automated"
  },
  description: "AI-powered solution for radiation therapy planning with advanced auto-contouring capabilities. Supports auto-segmentation on CT and MRI, and multi-modality image registration for CT, MRI, and PET/CT. CE-certified (reported by vendor at the ESTRO 2026 booth), including the Active Contouring GTV delineation feature; pending verification against the EUDAMED listing. Features unique Active Contouring technology and adaptive learning for personalized contouring.",
  keyFeatures: [
    "92.5% average time saving in contouring workflow",
    "Adaptive learning according to user's individual technique",
    "Active Contouring - GTV delineation from single slice input",
    "AI-based interactive contour revisions",
    "Auto-segmentation on CT and MRI modalities",
    "Image registration for MRI, PET/CT, and CT modalities",
    "Multi-vendor and multi-modality integration",
    "Cloud-based data storage and visualization"
  ],
  lastRevised: "2026-05-30",
  lastUpdated: "2026-06-10",
  limitations: [
    "Exclusion: patients with large metal implants (e.g. hip prosthesis) or motion artefacts in the imaging area — metal can significantly distort the images, potentially leading to inaccurate contouring",
    "Exclusion: paediatric patients — the software is primarily designed for adult anatomy and accuracy has not been validated for paediatric use",
    "Exclusion: patients with poor-quality imaging (motion artefacts, insufficient contrast, etc.) may not be suitable for automated contouring",
    "Exclusion: cases requiring highly individualised contouring based on unique anatomical or clinical considerations may be beyond the software's current capabilities",
    "Requires verification by qualified radiation oncologist",
    "Performance may vary based on image quality"
  ],
  releaseDate: "2023-08-20",
  certification: "CE",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I0",
  diseaseTargeted: [
    "Brain tumours (glioblastoma, astrocytoma, etc.)",
    "Head and neck tumours (oral cavity, laryngeal, nasopharyngeal cancers, etc.)",
    "Thoracic tumours (breast, lung, oesophageal cancers, etc.)",
    "Abdominal tumours (pancreatic, stomach cancers, etc.)",
    "Pelvic tumours (bladder, prostate, cervical, uterine cancers, etc.)",
    "Metastatic tumours (bone metastases, brain metastases, etc.)"
  ],
  adoptionReadiness: "R3",
  anatomicalLocation: [
    "Head & Neck",
    "Thorax",
    "Abdomen",
    "Pelvis",
    "Brachytherapy"
  ],
  evidenceRigorNotes: "Peer-reviewed journal publication in PHIRO (doi:10.1016/j.phro.2026.100935) plus six conference abstracts (ESTRO 2023, 2024, 2025). Single-center/vendor-associated studies; not independently validated across multiple sites.",
  clinicalImpactNotes: "No published clinical impact data. Product in investigation phase only. Published evidence is comparative technical analysis.",
  secondaryCategories: ["Registration"],
  supportedStructures: [
    "Breast: Heart",
    "Breast: Lung_L",
    "Breast: Lung_R",
    "Breast: Liver",
    "Breast: Humerus_L",
    "Breast: Humerus_R",
    "Breast: Breast_L",
    "Breast: Breast_R",
    "Breast: Esophagus",
    "Thorax: SpinalCanal",
    "Head & Neck: Brain",
    "Head & Neck: Brainstem",
    "Head & Neck: Eye_L",
    "Head & Neck: Eye_R",
    "Head & Neck: Lens_L",
    "Head & Neck: Lens_R",
    "Head & Neck: OpticNrv_L",
    "Head & Neck: OpticNrv_R",
    "Head & Neck: OpticChiasm",
    "Head & Neck: Pituitary",
    "Head & Neck: Glnd_Lacrimal_L",
    "Head & Neck: Glnd_Lacrimal_R",
    "Head & Neck: Ear_Internal_L",
    "Head & Neck: Ear_Internal_R",
    "Head & Neck: Bone_Mandible",
    "Head & Neck: Parotid_L",
    "Head & Neck: Parotid_R",
    "Head & Neck: Glnd_Submand_L",
    "Head & Neck: Glnd_Submand_R",
    "Head & Neck: Larynx",
    "Head & Neck: Trachea",
    "Head & Neck: SpinalCord",
    "Thorax: Lung_L",
    "Thorax: Lung_R",
    "Thorax: Heart",
    "Thorax: Liver",
    "Thorax: Esophagus",
    "Thorax: SpinalCanal",
    "Abdomen: Liver (unverified)",
    "Abdomen: Kidney (L) (unverified)",
    "Abdomen: Kidney (R) (unverified)",
    "Abdomen: Spleen (unverified)",
    "Abdomen: Stomach (unverified)",
    "Abdomen: Pancreas (unverified)",
    "Abdomen: Duodenum (unverified)",
    "Abdomen: Small Bowel (unverified)",
    "Abdomen: Large Bowel (unverified)",
    "Abdomen: Spinal Cord (unverified)",
    "Abdomen: Adrenal Gland (L) (unverified)",
    "Abdomen: Adrenal Gland (R) (unverified)",
    "Pelvis: Bag_Bowel",
    "Pelvis: Bowels",
    "Pelvis: Colon_Sigmoid",
    "Pelvis: Femur_Head_L",
    "Pelvis: Femur_Head_R",
    "Pelvis: Bladder",
    "Pelvis: Rectum",
    "Pelvis: Prostate",
    "Pelvis: Penile Bulb",
    "Pelvis: Seminal Vesicles"
  ],
  adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["CT", "MRI"],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  }
};

export const SYNAPTIQ_PRODUCTS: ProductDetails[] = [MediqRT];

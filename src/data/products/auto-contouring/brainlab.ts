import { ProductDetails } from "@/types/productDetails";

export const BrainlabElementsContouring50APMElementsSegmentation: ProductDetails = {
  id: "brainlab-elements-rt-seg",
  name: "Brainlab Elements Contouring 5.0 (APM / Elements Segmentation)",
  market: {
    onMarketSince: "2025"
  },
  partOf: {
    name: "Brainlab Elements Contouring 5.0",
    version: "7.0",
    productUrl: "https://www.brainlab.com/radiosurgery-products/elements/",
    relationship: "Module"
  },
  source: "FDA 510(k) database and summary (K243633); FDA 510(k) summary (K250440) for RT Elements/APM/Art-Plan context; Brainlab product pages; TheraPanacea collaboration announcement; Wittenstein et al. Strahlenther Onkol 2019; Podobnik et al. Sci Rep 2025 checked and excluded as non-Brainlab evidence; public CE certificate not located during audit.",
  usesAI: true,
  company: "Brainlab",
  logoUrl: "/logos/Brainlab.jpg",
  version: "5.0",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243633.pdf",
      type: "FDA 510(k) Validation",
      description: "K243633: Brainlab Elements 7.0, including Contouring 5.0, verified and validated under FDA 510(k) review with AI/ML performance testing for cranial tumor segmentation."
    },
    {
      link: "https://doi.org/10.1007/s00066-019-01463-4",
      type: "Independent Peer-reviewed Publication",
      description: "Wittenstein et al. 2019: Retrospective pilot evaluation of Brainlab Anatomical Mapping Release 1.0 for 9 extracranial OARs in 24 patients; useful as legacy independent evidence but not full validation of current Contouring 5.0/APM."
    },
    {
      link: "https://www.therapanacea.eu/brainlab-therapanacea-collaboration/",
      type: "Manufacturer/Partner Source",
      description: "TheraPanacea and Brainlab announced integration of AI-powered extracranial OAR and lymph-node segmentation into the Brainlab Elements portfolio."
    }
  ],
  modality: ["CT", "MRI"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts",
  companyUrl: "https://www.brainlab.com/",
  productUrl: "https://www.brainlab.com/radiosurgery-products/elements/",
  regulatory: {
    ce: {
      type: "MDR",
      class: "Class IIb",
      notes: "Cleared under MDR 2017/745 (Class IIb) as confirmed by manufacturer declarations and European commercial releases; specific certificate registry search index searchability is limited publicly.",
      status: "cleared",
      regulation: "MDR 2017/745"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "Cleared as part of Brainlab Elements 7.0 suite, including Contouring 5.0",
      status: "510k_cleared",
      productCode: "QIH, JAK, LLZ",
      decisionDate: "2025-06-13",
      clearanceNumber: "K243633",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "Brainlab Elements Contouring 5.0 provides an interface and tools/views to outline, refine, combine, and manipulate structures in patient image data. It is not diagnostic and is indicated for planning cranial and extracranial surgical treatments and preplanning cranial and extracranial radiation therapy treatments. APM 1.1 is an algorithmic backend used by Elements applications for automatic processing of 2D/3D medical image data, including segmentations and landmarks."
  },
  technology: {
    deployment: [
      "On-premise Brainlab Elements",
      "Optional Art-Plan cloud gateway for extracranial workflows"
    ],
    integration: [
      "Anatomical Patient Model 1.1 (APM 1.1)",
      "TheraPanacea Art-Plan (extracranial)",
      "gRPC API",
      "Elements Object Management"
    ]
  },
  description: "Brainlab Elements Contouring 5.0 module and Anatomical Patient Model (APM) backend for outlining, refining, combining, manipulating, and automatically processing structures in 2D/3D medical image data, including atlas-based anatomical segmentation, ML-based cranial tumor segmentation on contrast-enhanced T1-weighted MRI, and optional TheraPanacea Art-Plan integration for extracranial OAR and lymph-node segmentation.",
  keyFeatures: [
    "Contouring 5.0 tools to outline, refine, combine, and manipulate structures in patient image data",
    "APM 1.1 backend with gRPC API for automatic 2D/3D medical image processing",
    "Atlas-based cranial anatomical segmentation and ML-based cranial tumor segmentation",
    "Anomaly detection support for segmentation quality review",
    "Optional TheraPanacea Art-Plan interface for extracranial OAR and lymph-node segmentation"
  ],
  lastRevised: "2026-06-11",
  lastUpdated: "2026-06-11",
  limitations: [
    "APM 1.1 minimum requirements include 12 CPU cores and 24 GB RAM",
    "Cranial tumor segmentation support requires a GPU with at least 8 GB vRAM, compatible driver/CUDA support, and CUDA compute capability >5.2",
    "Supported operating systems in FDA documentation include Windows 8.1/10 and Windows Server 2012 R2/2016/2019/2022, depending on component configuration",
    "ML-based cranial tumor segmentation is limited to contrast-enhanced T1-weighted MRI and requires user review, editing, approval, or rejection",
    "Public sources verify segmentation workflow categories but do not verify every individual organ-at-risk name in the prior organ-by-organ list"
  ],
  releaseDate: "2025-06-13",
  contactEmail: "regulatory.affairs@brainlab.com",
  certification: "CE MDR & FDA 510(k)",
  evidenceRigor: "E1",
  priorVersions: [
    {
      name: "Brainlab Elements 6.0",
      notes: "Previous version of the Brainlab Elements suite",
      fdaClearance: "K223106"
    }
  ],
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
  diseaseTargeted: ["Multiple Cancer Types"],
  developmentStage: "certified",
  adoptionReadiness: "R3",
  anatomicalLocation: [
    "Brain",
    "Basal Ganglia",
    "Head & Neck",
    "Pelvis",
    "Spine",
    "Thorax",
    "Extracranial"
  ],
  evidenceRigorNotes: "E1: FDA validation K243633 supports the current Contouring 5.0 / APM-related software scope. Wittenstein et al. 2019 provides independent peer-reviewed retrospective evidence for Brainlab Anatomical Mapping Release 1.0 in 24 patients and 9 extracranial OARs, but it is small, legacy-version, and not a full validation of current Contouring 5.0/APM or all segmentation categories. Podobnik et al. 2025 was checked and excluded because the study evaluated Limbus, MIM, and MVision, not Brainlab.",
  clinicalImpactNotes: "I2: The baseline Contouring 5.0 software with APM 1.1 and TheraPanacea integration automates substantial OAR/lymph node contouring labor, directly accelerating radiation planning pipelines. However, local clinical QA, physician editing, and manual approvals are mandatory, and direct survival/toxicity benefits remain unmeasured in published prospective clinical papers.",
  evidenceMultiCenter: true,
  evidenceProspective: false,
  supportedStructures: [
    "Brain: Brain",
    "Brain: Brainstem",
    "Brain: Eye L",
    "Brain: Eye R",
    "Brain: Lens L",
    "Brain: Lens R",
    "Brain: Optic Chiasm",
    "Brain: Optic Nerve L",
    "Brain: Optic Nerve R",
    "Brain: Pituitary",
    "Brain: Cochlea L",
    "Brain: Cochlea R",
    "Brain: Hippocampus L",
    "Brain: Hippocampus R",
    "Brain: Temporal Lobe L",
    "Brain: Temporal Lobe R",
    "Brain: Cerebellum",
    "Brain: Caudate L",
    "Brain: Caudate R",
    "Brain: Putamen L",
    "Brain: Putamen R",
    "Brain: Globus Pallidus L",
    "Brain: Globus Pallidus R",
    "Brain: Thalamus L",
    "Brain: Thalamus R",
    "Head & Neck: Brainstem",
    "Head & Neck: Parotid L",
    "Head & Neck: Parotid R",
    "Head & Neck: Submandibular Gland L",
    "Head & Neck: Submandibular Gland R",
    "Head & Neck: Mandible",
    "Head & Neck: Spinal Cord",
    "Head & Neck: Larynx",
    "Head & Neck: Oral Cavity",
    "Head & Neck: Pharyngeal Constrictor",
    "Head & Neck: Thyroid",
    "Head & Neck: Esophagus",
    "Head & Neck: Cochlea L",
    "Head & Neck: Cochlea R",
    "Pelvis: Bladder",
    "Pelvis: Rectum",
    "Pelvis: Femoral Head L",
    "Pelvis: Femoral Head R",
    "Pelvis: Prostate",
    "Pelvis: Seminal Vesicle",
    "Pelvis: Penile Bulb",
    "Pelvis: Bowel Bag",
    "Spine: Spinal Cord",
    "Spine: Spinal Canal",
    "Spine: Vertebral Body",
    "Spine: Kidney L",
    "Spine: Kidney R",
    "Thorax: Heart",
    "Thorax: Lung L",
    "Thorax: Lung R",
    "Thorax: Esophagus",
    "Thorax: Spinal Cord",
    "Thorax: Liver",
    "Thorax: Kidney L",
    "Thorax: Kidney R",
    "Extracranial: Full body OARs (via TheraPanacea integration) (unverified)"
  ],
  evidenceMultiNational: true,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption. CE status is declared by manufacturer but certificate numbering search is limited.",
  technicalSpecifications: {
    input: ["CT", "MRI", "DICOM image data"],
    output: ["3D segmentation objects", "Structure sets"],
    population: "No demographic, regional, or cultural limitations stated for Contouring 5.0; adult-only validation applies to the cranial AI tumor segmentation feature",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

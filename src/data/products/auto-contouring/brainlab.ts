import { ProductDetails } from "@/types/productDetails";

export const BRAINLAB_PRODUCTS: ProductDetails[] = [
  {
    id: "brainlab-elements-ai-tumor-seg",
    name: "Elements AI Tumor Segmentation",
    company: "Brainlab",
    category: "Auto-Contouring",
    structuresUnavailable: true,
    description: "Deep learning module for semi-automatic segmentation of diagnosed cranial tumors including metastases, meningiomas, gliomas, cranial/paraspinal nerve tumors, and glioneuronal and neuronal tumors from 3D contrast-enhanced T1-weighted MR images.",
    certification: "CE MDR & FDA 510(k)",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/elements/multiple-brain-metastases/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases", "Meningioma", "Glioma", "Cranial and Paraspinal Nerve Tumors", "Glioneuronal and Neuronal Tumors"],
    keyFeatures: [
      "AI/ML-based cranial tumor segmentation using a U-Net architecture",
      "Semi-automatic workflow with user review, editing, approval, or rejection",
      "Supports brain metastases, meningiomas, gliomas, nerve tumors, and glioneuronal/neuronal tumors",
      "3D contrast-enhanced T1-weighted MR input",
      "Part of RT Contouring 4.5 within RT Elements 4.5"
    ],
    technicalSpecifications: {
      population: "Adult patients in FDA validation dataset",
      input: ["MRI (CE-T1)"],
      inputFormat: ["DICOM"],
      output: ["Tumor contours"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM Segmentation"]
    },
    technology: {
      integration: ["RT Contouring 4.5", "Anatomical Patient Model (APM)", "Elements SmartBrush / Object Management"],
      deployment: ["On-premise", "GPU-accelerated"]
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes: "Cleared under MDR 2017/745 (Class IIb) as confirmed by manufacturer declarations and European commercial releases; specific certificate registry search index searchability is limited publicly."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250440",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ, QIH",
        decisionDate: "2025-06-17",
        notes: "Cleared as part of RT Elements 4.5"
      },
      intendedUseStatement: "RT Elements 4.5 is intended for radiation treatment planning for stereotactic, conformal, computer-planned Linac-based radiation treatment. Within RT Contouring 4.5, the Cranial Tumor Segmentation feature uses AI/ML to semi-automatically segment supported cranial tumors from 3D contrast-enhanced T1-weighted MR images for user review and use in radiation therapy planning workflows."
    },
    market: {
      onMarketSince: "2025"
    },
    usesAI: true,
    developmentStage: "certified",
    contactEmail: "regulatory.affairs@brainlab.com",
    partOf: {
      name: "RT Elements 4.5",
      productUrl: "https://www.brainlab.com/radiosurgery-products/elements/multiple-brain-metastases/",
      relationship: "Module"
    },
    evidence: [
      "FDA validation: 412 adult patients, 595 scans, 1878 annotations from multiple clinical sites in the US and Europe",
      "Overall mean Dice 0.75 (95% CI 0.74-0.76), mean precision 0.86, mean recall 0.85",
      "FDA acceptance criteria used lower-bound 95% CI thresholds of Dice >= 0.7, recall >= 0.8, and precision >= 0.8"
    ],
    limitations: [
      "Validated for up to 30 cranial metastases (>=3 mm each) and primary cranial tumors >=10 mm",
      "Requires 3D contrast-enhanced T1-weighted MRI for the AI tumor segmentation feature",
      "Validation data were from adult patients only",
      "User review, editing, approval, or rejection of automated tumor objects remains required"
    ],
    priorVersions: [
      {
        name: "RT Elements 4.0",
        fdaClearance: "K223279",
        notes: "Previous version of the RT Elements suite"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I0",
    evidenceRigorNotes: "E1: FDA 510(k) technical validation for K250440 reports 412 adult patients, 595 scans, 1878 annotations, multi-site US/Europe test data, and externally/independently generated annotations. No independent peer-reviewed clinical validation of this specific AI tumor segmentation module was found.",
    clinicalImpactNotes: "I0: Quantitative segmentation performance is demonstrated in FDA validation, but no independent peer-reviewed workflow, time-saving, dosimetric impact, or patient-outcome study was found.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption. CE status is declared by manufacturer but certificate numbering search is limited.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    releaseDate: "2025-06-17",
    lastUpdated: "2026-06-11",
    lastRevised: "2026-06-11",
    source: "FDA 510(k) database and summary (K250440); Brainlab cranial planning and Elements product pages; Novalis Circle clinical-use story used only as non-peer-reviewed implementation context; public CE certificate not located during audit.",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  },
  {
    id: "brainlab-elements-rt-seg",
    name: "Brainlab Elements Contouring 5.0 (APM / Elements Segmentation)",
    company: "Brainlab",
    category: "Auto-Contouring",
    description: "Brainlab Elements Contouring 5.0 module and Anatomical Patient Model (APM) backend for outlining, refining, combining, manipulating, and automatically processing structures in 2D/3D medical image data, including atlas-based anatomical segmentation, ML-based cranial tumor segmentation on contrast-enhanced T1-weighted MRI, and optional TheraPanacea Art-Plan integration for extracranial OAR and lymph-node segmentation.",
    certification: "CE MDR & FDA 510(k)",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/elements/",
    anatomicalLocation: ["Brain", "Basal Ganglia", "Head & Neck", "Pelvis", "Spine", "Thorax", "Extracranial"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Contouring 5.0 tools to outline, refine, combine, and manipulate structures in patient image data",
      "APM 1.1 backend with gRPC API for automatic 2D/3D medical image processing",
      "Atlas-based cranial anatomical segmentation and ML-based cranial tumor segmentation",
      "Anomaly detection support for segmentation quality review",
      "Optional TheraPanacea Art-Plan interface for extracranial OAR and lymph-node segmentation"
    ],
    technicalSpecifications: {
      population: "No demographic, regional, or cultural limitations stated for Contouring 5.0; adult-only validation applies to the cranial AI tumor segmentation feature",
      input: ["CT", "MRI", "DICOM image data"],
      inputFormat: ["DICOM"],
      output: ["3D segmentation objects", "Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Anatomical Patient Model 1.1 (APM 1.1)", "TheraPanacea Art-Plan (extracranial)", "gRPC API", "Elements Object Management"],
      deployment: ["On-premise Brainlab Elements", "Optional Art-Plan cloud gateway for extracranial workflows"]
    },
    supportedStructures: [
      // Cranial
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

      // Basal Ganglia
      "Brain: Caudate L",
      "Brain: Caudate R",
      "Brain: Putamen L",
      "Brain: Putamen R",
      "Brain: Globus Pallidus L",
      "Brain: Globus Pallidus R",
      "Brain: Thalamus L",
      "Brain: Thalamus R",

      // Head and Neck
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

      // Pelvic
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head L",
      "Pelvis: Femoral Head R",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicle",
      "Pelvis: Penile Bulb",
      "Pelvis: Bowel Bag",

      // Spine
      "Spine: Spinal Cord",
      "Spine: Spinal Canal",
      "Spine: Vertebral Body",
      "Spine: Kidney L",
      "Spine: Kidney R",

      // Thoracic and Spine
      "Thorax: Heart",
      "Thorax: Lung L",
      "Thorax: Lung R",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Thorax: Liver",
      "Thorax: Kidney L",
      "Thorax: Kidney R",

      // Extracranial (via TheraPanacea Art-Plan integration)
      "Extracranial: Full body OARs (via TheraPanacea integration) (unverified)"
    ],
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes: "Cleared under MDR 2017/745 (Class IIb) as confirmed by manufacturer declarations and European commercial releases; specific certificate registry search index searchability is limited publicly."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K243633",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH, JAK, LLZ",
        decisionDate: "2025-06-13",
        notes: "Cleared as part of Brainlab Elements 7.0 suite, including Contouring 5.0"
      },
      intendedUseStatement: "Brainlab Elements Contouring 5.0 provides an interface and tools/views to outline, refine, combine, and manipulate structures in patient image data. It is not diagnostic and is indicated for planning cranial and extracranial surgical treatments and preplanning cranial and extracranial radiation therapy treatments. APM 1.1 is an algorithmic backend used by Elements applications for automatic processing of 2D/3D medical image data, including segmentations and landmarks."
    },
    market: {
      onMarketSince: "2025"
    },
    usesAI: true,
    developmentStage: "certified",
    contactEmail: "regulatory.affairs@brainlab.com",
    partOf: {
      name: "Brainlab Elements Contouring 5.0",
      version: "7.0",
      productUrl: "https://www.brainlab.com/radiosurgery-products/elements/",
      relationship: "Module"
    },
    limitations: [
      "APM 1.1 minimum requirements include 12 CPU cores and 24 GB RAM",
      "Cranial tumor segmentation support requires a GPU with at least 8 GB vRAM, compatible driver/CUDA support, and CUDA compute capability >5.2",
      "Supported operating systems in FDA documentation include Windows 8.1/10 and Windows Server 2012 R2/2016/2019/2022, depending on component configuration",
      "ML-based cranial tumor segmentation is limited to contrast-enhanced T1-weighted MRI and requires user review, editing, approval, or rejection",
      "Public sources verify segmentation workflow categories but do not verify every individual organ-at-risk name in the prior organ-by-organ list"
    ],
    priorVersions: [
      {
        name: "Brainlab Elements 6.0",
        fdaClearance: "K223106",
        notes: "Previous version of the Brainlab Elements suite"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "E1: FDA validation K243633 supports the current Contouring 5.0 / APM-related software scope. Wittenstein et al. 2019 provides independent peer-reviewed retrospective evidence for Brainlab Anatomical Mapping Release 1.0 in 24 patients and 9 extracranial OARs, but it is small, legacy-version, and not a full validation of current Contouring 5.0/APM or all segmentation categories. Podobnik et al. 2025 was checked and excluded because the study evaluated Limbus, MIM, and MVision, not Brainlab.",
    clinicalImpactNotes: "I2: The baseline Contouring 5.0 software with APM 1.1 and TheraPanacea integration automates substantial OAR/lymph node contouring labor, directly accelerating radiation planning pipelines. However, local clinical QA, physician editing, and manual approvals are mandatory, and direct survival/toxicity benefits remain unmeasured in published prospective clinical papers.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption. CE status is declared by manufacturer but certificate numbering search is limited.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "FDA 510(k) Validation",
        description: "K243633: Brainlab Elements 7.0, including Contouring 5.0, verified and validated under FDA 510(k) review with AI/ML performance testing for cranial tumor segmentation.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243633.pdf"
      },
      {
        type: "Independent Peer-reviewed Publication",
        description: "Wittenstein et al. 2019: Retrospective pilot evaluation of Brainlab Anatomical Mapping Release 1.0 for 9 extracranial OARs in 24 patients; useful as legacy independent evidence but not full validation of current Contouring 5.0/APM.",
        link: "https://doi.org/10.1007/s00066-019-01463-4"
      },
      {
        type: "Manufacturer/Partner Source",
        description: "TheraPanacea and Brainlab announced integration of AI-powered extracranial OAR and lymph-node segmentation into the Brainlab Elements portfolio.",
        link: "https://www.therapanacea.eu/brainlab-therapanacea-collaboration/"
      }
    ],
    releaseDate: "2025-06-13",
    lastUpdated: "2026-06-11",
    lastRevised: "2026-06-11",
    source: "FDA 510(k) database and summary (K243633); FDA 510(k) summary (K250440) for RT Elements/APM/Art-Plan context; Brainlab product pages; TheraPanacea collaboration announcement; Wittenstein et al. Strahlenther Onkol 2019; Podobnik et al. Sci Rep 2025 checked and excluded as non-Brainlab evidence; public CE certificate not located during audit.",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  }
];

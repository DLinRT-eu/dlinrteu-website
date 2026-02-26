import { ProductDetails } from "@/types/productDetails";

export const BRAINLAB_PRODUCTS: ProductDetails[] = [
  {
    id: "brainlab-elements-ai-tumor-seg",
    name: "Elements AI Tumor Segmentation",
    company: "Brainlab",
    category: "Auto-Contouring",
    description: "Deep learning module for semi-automatic segmentation of cranial tumors including metastases, meningiomas, gliomas, cranial/paraspinal nerve tumors, and glioneuronal tumors from 3D Contrast-Enhanced T1 MR images.",
    certification: "CE & FDA",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/elements/multiple-brain-metastases/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases", "Meningioma", "Glioma", "Cranial and Paraspinal Nerve Tumors", "Glioneuronal Tumors"],
    keyFeatures: [
      "Deep learning-based tumor segmentation",
      "Semi-automatic workflow",
      "Supports brain metastases, meningiomas, gliomas, nerve tumors, glioneuronal tumors",
      "3D Contrast-Enhanced T1 MR input",
      "Part of RT Elements 4.5 suite"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI (CE-T1)"],
      inputFormat: ["DICOM"],
      output: ["Tumor contours"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["RT Contouring 4.5 module"],
      deployment: ["On-premise", "GPU-accelerated"]
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250440",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ, QIH",
        decisionDate: "2025-06-17",
        notes: "Cleared as part of RT Elements 4.5"
      },
      intendedUseStatement: "The AI Tumor Segmentation module is intended for semi-automatic segmentation of cranial tumors (metastases, meningiomas, gliomas, cranial/paraspinal nerve tumors, glioneuronal tumors) from 3D Contrast-Enhanced T1 MR images for use in radiation therapy planning."
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
      "FDA validation: 412 patients, 595 scans, 1878 annotations",
      "Overall Dice coefficient >= 0.75",
      "Validated across metastases, meningiomas, gliomas, nerve tumors, glioneuronal tumors"
    ],
    limitations: [
      "Minimum tumor diameter: 3 mm for metastases, 10 mm for primary tumors",
      "Requires 3D Contrast-Enhanced T1 MRI only",
      "Adult patients only"
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
    evidenceRigorNotes: "FDA validation: 412 patients, 595 scans, 1878 annotations. Dice >= 0.75. No independent peer-reviewed clinical validation yet.",
    clinicalImpactNotes: "Technical performance demonstrated via FDA validation but no published workflow or outcome studies.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K250440)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  },
  {
    id: "brainlab-elements-rt-seg",
    name: "Elements RT Segmentation (APM)",
    company: "Brainlab",
    category: "Auto-Contouring",
    description: "AI/ML-driven Anatomical Patient Model (APM) within Brainlab Elements Contouring 5.0, providing automated segmentation for cranial, basal ganglia, head & neck, pelvic, spine, thoracic, and extracranial regions.",
    certification: "CE & FDA",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/elements/",
    anatomicalLocation: ["Brain", "Basal Ganglia", "Head & Neck", "Pelvis", "Spine", "Thorax", "Extracranial"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Anatomical Patient Model (APM) with atlas-based and ML-based segmentation",
      "Multi-region support (cranial, basal ganglia, H&N, pelvis, spine, thorax, extracranial)",
      "Anomaly detection for segmentation quality assurance",
      "Customizable segmentation templates",
      "Integration with TheraPanacea Art-Plan for extracranial structures"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TheraPanacea Art-Plan (extracranial)", "gRPC API"],
      deployment: ["On-premise"]
    },
    supportedStructures: [
      "Cranial",
      "Basal Ganglia",
      "Head and Neck",
      "Pelvic",
      "Spine",
      "Thoracic and Spine",
      "Extracranial"
    ],
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K243633",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH, JAK, LLZ",
        decisionDate: "2025-06-13",
        notes: "Cleared as part of Brainlab Elements 7.0 suite (includes Contouring 5.0)"
      },
      intendedUseStatement: "For automated anatomical segmentation using atlas-based and machine learning methods in radiation therapy planning, as part of Brainlab Elements Contouring 5.0."
    },
    market: {
      onMarketSince: "2023"
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
      "GPU required for ML features (8 GB vRAM minimum)",
      "Windows 10 / Windows Server only"
    ],
    priorVersions: [
      {
        name: "Brainlab Elements 6.0",
        fdaClearance: "K223106",
        notes: "Previous version of the Brainlab Elements suite"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA validation K243633. Brainlab Anatomical Mapping validated in Strahlentherapie und Onkologie 2019 (doi:10.1007/s00066-019-01463-4) for spinal OARs. Podobnik et al. Sci Rep 2025 (doi:10.1038/s41598-025-18598-3) evaluated commercial AI solutions for H&N OAR segmentation including Brainlab. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "Technical performance demonstrated but no workflow outcome studies published. PubMed searched 2026-02-26.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Independent Peer-reviewed Publication",
        description: "Podobnik et al. 2025: Geometric, dosimetric and psychometric evaluation of three commercial AI auto-segmentation solutions for H&N RT. Includes Brainlab Elements.",
        link: "https://doi.org/10.1038/s41598-025-18598-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Brainlab Anatomical Mapping validation for spinal metastasis OAR delineation (9 extracranial OARs, 24 patients).",
        link: "https://doi.org/10.1007/s00066-019-01463-4"
      }
    ],
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K243633), Podobnik et al. Sci Rep 2025 (doi:10.1038/s41598-025-18598-3)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  }
];

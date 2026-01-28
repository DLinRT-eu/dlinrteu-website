import { ProductDetails } from "@/types/productDetails";

export const BRAINLAB_PRODUCTS: ProductDetails[] = [
  {
    id: "brainlab-elements-ai-tumor-seg",
    name: "Elements AI Tumor Segmentation",
    company: "Brainlab",
    category: "Auto-Contouring",
    description: "Deep learning module for semi-automatic segmentation of cranial tumors including metastases, meningiomas, and gliomas from 3D Contrast-Enhanced T1 MR images.",
    certification: "CE & FDA",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/rt-elements/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases", "Meningioma", "Glioma"],
    keyFeatures: [
      "Deep learning-based tumor segmentation",
      "Semi-automatic workflow",
      "Supports brain metastases, meningiomas, gliomas",
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
        decisionDate: "2025-06-17",
        notes: "Cleared as part of RT Elements 4.5"
      },
      intendedUseStatement: "For semi-automatic segmentation of cranial tumors in radiation therapy planning."
    },
    market: {
      onMarketSince: "2025"
    },
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "FDA 510(k) database (K250440)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  },
  {
    id: "brainlab-elements-rt-seg",
    name: "Elements RT Segmentation (APM)",
    company: "Brainlab",
    category: "Auto-Contouring",
    description: "AI/ML-driven Anatomical Patient Model (APM) providing automated segmentation for cranial, head & neck, pelvic, spine, and thoracic regions.",
    certification: "CE & FDA",
    logoUrl: "/logos/Brainlab.jpg",
    companyUrl: "https://www.brainlab.com/",
    productUrl: "https://www.brainlab.com/radiosurgery-products/rt-elements/",
    anatomicalLocation: ["Brain", "Head & Neck", "Pelvis", "Spine", "Thorax"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Anatomical Patient Model (APM)",
      "Multi-region support (cranial, H&N, pelvis, spine, thorax)",
      "AI/ML-driven segmentation",
      "Integration with Art-Plan for extracranial structures",
      "Part of Brainlab Elements 7.0"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
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
        clearanceNumber: "K243633",
        decisionDate: "2025-06-13",
        notes: "Cleared as part of Brainlab Elements 7.0"
      },
      intendedUseStatement: "For automated anatomical segmentation in radiation therapy planning."
    },
    market: {
      onMarketSince: "2023"
    },
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "FDA 510(k) database (K243633)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/brainlab.ts"
  }
];

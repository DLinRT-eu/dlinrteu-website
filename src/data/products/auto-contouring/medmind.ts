
import { ProductDetails } from "@/types/productDetails";

export const MEDMIND_PRODUCTS: ProductDetails[] = [
  {
    id: "medmind-rt-mind-ai",
    name: "RT-Mind-AI",
    company: "MedMind Technology Co., Ltd.",
    companyUrl: "https://www.medicalmind.cn/en.html",
    productUrl: "https://www.medicalmind.cn/en.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/medmind.ts",
    description: "Deep learning auto-contouring platform supporting 120+ OARs and CTV delineation across multiple cancer types. Deployed in 360+ hospitals with NMPA Class III and FDA 510(k) clearance.",
    category: "Auto-Contouring",
    certification: "FDA/NMPA",
    website: "https://www.medicalmind.cn/en.html",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: [
      "Nasopharyngeal Cancer",
      "Lung Cancer",
      "Breast Cancer",
      "Esophageal Cancer",
      "Cervical Cancer",
      "Rectal Cancer",
      "Liver Cancer",
      "Prostate Cancer",
      "Multiple Cancer Types"
    ],
    keyFeatures: [
      "120+ OAR auto-segmentation",
      "CTV delineation for multiple cancer types",
      "Deep learning-based contouring",
      "Deployed in 360+ hospitals",
      "NMPA Class III certified",
      "FDA 510(k) cleared",
      "Support for multiple anatomical sites"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Standalone", "TPS Integration"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual",
      processingTime: "Minutes per case"
    },
    regulatory: {
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K213155",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2022-03-25"
      },
      intendedUseStatement: "RT-Mind-AI is intended for automatic segmentation of organs at risk and clinical target volumes in CT images for radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],
      availability: "China (primary), international"
    },
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Company reports published clinical studies and deployment in 360+ hospitals. NMPA Class III certification requires clinical validation data. Independent peer-reviewed publications need further verification.",
    clinicalImpactNotes: "Workflow improvement through automated OAR and CTV contouring, reducing manual delineation time across multiple cancer types.",
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K213155), NMPA Class III certification, company website (medicalmind.cn/en.html). Product confirmed active with significant clinical deployment."
  }
];

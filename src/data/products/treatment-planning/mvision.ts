import { ProductDetails } from "@/types/productDetails";

export const MVISION_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-dose-plus",
    name: "Dose+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/dose/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/mvision.ts",
    description:
      "AI dose-prediction software that generates patient-specific 3D dose distributions from planning CT to support and accelerate radiation therapy plan creation. Delivered as part of the Workspace+ vendor-neutral AI platform.",
    features: [
      "Patient-specific 3D dose prediction",
      "Cloud-native deployment",
      "DICOM-RTDOSE export",
      "Workspace+ integration"
    ],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/dose/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Pelvic Lymph Node Irradiation"],
    keyFeatures: [
      "Patient-specific 3D dose prediction from planning CT",
      "Delivered through the Workspace+ AI platform",
      "Initial clinical validation on prostate and pelvic lymph nodes"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Predicted 3D dose distribution"],
      outputFormat: ["DICOM-RTDOSE"]
    },
    technology: {
      integration: ["Workspace+", "TPS via DICOM"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated within Workspace+",
      processingTime: "Minutes per case (vendor-reported)"
    },
    regulatory: {
      ce: {
        status: "pending",
        notes: "CE-MDR submission in progress (vendor communication, 2025). Confirm before publishing."
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250064",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-09-04",
        notes: "First MVision AI submission under therapeutic dose-calculation product code MUJ."
      },
      intendedUseStatement:
        "\"Dose+ is a software-only medical device intended for use by qualified, trained radiation therapy professionals... The device is intended for male patients with localized prostate cancer or prostate cancer with pelvic lymph node involvement who are undergoing external beam radiation therapy treatment. The software uses machine learning-based algorithms to automatically produce 3D dose distributions from patient-specific anatomical geometry and target dose prescription.\" (Source: FDA 510(k) K250064 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
    },
    partOf: {
      name: "Workspace+",
      productUrl: "https://mvision.ai/workspace/",
      relationship: "Module"
    },
    usesAI: true,
    dosePredictionModels: [
      {
        name: "Prostate dose prediction",
        anatomicalSite: "Prostate",
        technique: "VMAT/IMRT",
        intent: "Curative",
        status: "approved"
      },
      {
        name: "Pelvic lymph nodes dose prediction",
        anatomicalSite: "Pelvic lymph nodes",
        technique: "VMAT/IMRT",
        intent: "Curative",
        status: "approved"
      }
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "Vendor announcement only as of 2026-05-23. No peer-reviewed validation publication identified.",
    clinicalImpactNotes: "No independent clinical impact data available at time of listing.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "FDA 510(k) cleared but E0 evidence: structured pilot and local validation recommended before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-05-23",
    lastRevised: "2026-05-23",
    limitations: [
      "Initial validation limited to prostate and pelvic lymph nodes",
      "CE-MDR status to be confirmed with vendor before clinical use in EU",
      "No independent peer-reviewed publications identified at time of listing"
    ],
    source:
      "FDA 510(k) database (K250064); MVision AI press release (2025-03-13); Dose+ product page."
  }
];

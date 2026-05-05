import { ProductDetails } from "@/types/productDetails";

export const MEDCOM_PRODUCTS: ProductDetails[] = [
  {
    id: "medcom-prosoma-dart",
    name: "ProSoma Dart AI Segmentation Engine",
    company: "MedCom",
    companyUrl: "https://www.medcom-online.de/",
    productUrl: "https://www.medcom-online.de/products/radiation-oncology/prosoma/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/medcom.ts",
    description:
      "AI-based fully-automatic anatomical contouring engine bundled with the ProSoma RT toolkit. Provided as configurable per-region modules (Head & Neck, Prostate, Mamma) for OAR and target delineation in external beam planning.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/medcom.png",
    website: "https://www.medcom-online.de/products/radiation-oncology/prosoma/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Breast"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Prostate Cancer", "Breast Cancer"],
    keyFeatures: [
      "Modular per-region deployment (H&N, Prostate, Mamma)",
      "Fully automatic deep-learning segmentation",
      "Integration via DICOM transfer or interactive trigger from ProSoma frontend",
      "GPU-accelerated or CPU-only execution",
    ],
    supportedStructures: [
      { name: "Head & Neck: OARs (unverified)", type: "OAR" },
      { name: "Pelvis: Prostate (unverified)", type: "Target" },
      { name: "Pelvis: OARs (unverified)", type: "OAR" },
      { name: "Breast: Targets and OARs (unverified)", type: "OAR" },
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"],
    },
    technology: {
      integration: ["ProSoma frontend", "DICOM router"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual from ProSoma UI or automatic via DICOM transfer",
      processingTime: "Minutes per case (GPU-accelerated)",
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDD",
        regulation: "Directive 93/42/EEC (legacy device under MDR 2017/745 Article 120(3c))",
      },
      fda: {
        status: "Not specified",
        notes: "No FDA clearance publicly documented for the ProSoma Dart AI Segmentation Engine at the time of listing.",
      },
      intendedUseStatement:
        "Automatic delineation of anatomical risk and target regions for external beam radiotherapy planning, as part of the ProSoma RT toolkit.",
    },
    market: {
      distributionChannels: ["Direct sales"],
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "No peer-reviewed validation studies identified at time of listing. Pending vendor verification and literature confirmation.",
    clinicalImpactNotes: "No published clinical impact data identified at time of listing.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-05-05",
    lastRevised: "2026-05-05",
    source: "Vendor product page (MedCom ProSoma)."
  },
];

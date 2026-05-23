import { ProductDetails } from "@/types/productDetails";

export const NEURALRAD_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "neuralrad-brain-pipeline",
    name: "NeuralRadBrain",
    company: "NeuralRad",
    companyUrl: "https://www.neuralrad.com/",
    productUrl: "https://www.neuralrad.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/neuralrad.ts",
    description:
      "Pre-market AI platform for brain stereotactic radiosurgery: automated brain-metastasis detection, segmentation, 3D visualisation and multi-course lesion tracking. Listed as a pipeline / pre-market entry until FDA 510(k) is issued.",
    features: [
      "Automated brain-metastasis detection",
      "Sub-30s auto-segmentation (vendor-reported)",
      "3D lesion visualisation",
      "Multi-course lesion tracking"
    ],
    category: "Auto-Contouring",
    secondaryCategories: ["Clinical Prediction"],
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/placeholder.svg",
    website: "https://www.neuralrad.com/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases"],
    keyFeatures: [
      "Automated brain-metastasis lesion detection",
      "Sub-30 s auto-segmentation (vendor-reported)",
      "3D visualisation of intracranial lesions",
      "Multi-course tracking across follow-up scans"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Lesion tracking reports"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Web-based platform"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual upload",
      processingTime: "< 30 seconds (vendor-reported)"
    },
    regulatory: {
      ce: { status: "Not applicable" },
      fda: {
        status: "Pending",
        notes: "Vendor website states 'FDA 510(k) Pending' as of 2026-05-23. Update once a clearance number is issued."
      },
      intendedUseStatement:
        "AI-assisted detection, segmentation and longitudinal tracking of intracranial lesions to support stereotactic radiosurgery workflows."
    },
    market: {
      distributionChannels: ["Direct sales (early access)"]
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "Pre-market product. No peer-reviewed validation identified at time of listing (2026-05-23).",
    clinicalImpactNotes: "No clinical impact data available.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes:
      "Pre-market: not yet cleared in EU or US. Pipeline entry only — adoption blocked until regulatory status changes.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-05-23",
    lastRevised: "2026-05-23",
    limitations: [
      "Pre-market — regulatory clearance pending; not available for clinical use",
      "No independent validation publications identified",
      "Brain metastases only; other intracranial pathologies not supported"
    ],
    source:
      "NeuralRad vendor website (https://www.neuralrad.com/, retrieved 2026-05-23)."
  }
];

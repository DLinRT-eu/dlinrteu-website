import { ProductDetails } from "@/types/productDetails";

export const Dose: ProductDetails = {
  id: "mvision-dose-plus",
  name: "Dose+",
  market: {
    onMarketSince: "2025",
    distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
  },
  partOf: {
    name: "Workspace+",
    productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
    relationship: "Module"
  },
  source: "FDA 510(k) database (K250064); MVision AI press release (2025-03-13); Dose+ product page. releaseDate proxied from FDA K250064 decision date (2026-06-01). 2026-09-06 standard-field consistency pass: FDA status value normalised to the site-wide '510k_cleared' convention.",
  usesAI: true,
  company: "MVision AI",
  logoUrl: "/logos/mvision-ai.png",
  version: "1.0.3",
  website: "https://mvision.ai/dose/",
  category: "Treatment Planning",
  features: [
    "Patient-specific 3D dose prediction",
    "Cloud-native deployment",
    "DICOM-RTDOSE export",
    "Workspace+ integration"
  ],
  modality: ["CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/mvision.ts",
  companyUrl: "https://mvision.ai/",
  productUrl: "https://mvision.ai/dose/",
  regulatory: {
    ce: {
      notes: "CE-MDR submission in progress (vendor communication, 2025). Confirm before publishing.",
      status: "under_review",
      eudamed: {
        basicUdi: "642983006423Dose1.0DH",
        riskClass: "class-iia",
        sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=Dose%2B",
        lastVerified: "2026-09-22",
        manufacturerSrn: "FI-MF-000013082",
        registeredTradeName: "Dose+"
      }
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "First MVision AI submission under therapeutic dose-calculation product code MUJ.",
      status: "510k_cleared",
      productCode: "MUJ",
      decisionDate: "2025-09-04",
      clearanceNumber: "K250064",
      regulationNumber: "21 CFR 892.5050"
    },
    intendedUseStatement: "\"Dose+ is a software-only medical device intended for use by qualified, trained radiation therapy professionals... The device is intended for male patients with localized prostate cancer or prostate cancer with pelvic lymph node involvement who are undergoing external beam radiation therapy treatment. The software uses machine learning-based algorithms to automatically produce 3D dose distributions from patient-specific anatomical geometry and target dose prescription.\" (Source: FDA 510(k) K250064 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["Cloud-based"],
    integration: ["Workspace+", "TPS via DICOM"],
    processingTime: "Minutes per case (vendor-reported)",
    triggerForAnalysis: "Manual or automated within Workspace+"
  },
  description: "Dose-prediction module of the MVision AI Workspace+ platform. AI software that generates patient-specific 3D dose distributions from planning CT to support and accelerate radiation therapy plan creation.",
  keyFeatures: [
    "Patient-specific 3D dose prediction from planning CT",
    "Delivered through the Workspace+ AI platform",
    "Initial clinical validation on prostate and pelvic lymph nodes"
  ],
  lastRevised: "2026-09-06",
  lastUpdated: "2026-09-06",
  limitations: [
    "Initial validation limited to prostate and pelvic lymph nodes",
    "CE-MDR status to be confirmed with vendor before clinical use in EU",
    "No independent peer-reviewed publications identified at time of listing"
  ],
  releaseDate: "2025-09-04",
  trainingData: {
    source: "FDA 510(k) summary K250064",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250064.pdf",
    description: "The software uses machine learning-based algorithms to produce 3D dose distributions from patient-specific anatomical geometry and target dose prescriptions for external beam radiation therapy.",
    demographics: "Adult male patients with localized prostate cancer or pelvic lymph node involvement",
    disclosureLevel: "minimal"
  },
  certification: "FDA",
  evidenceRigor: "E0",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I0",
  evaluationData: {
    source: "FDA 510(k) summary K250064",
    results: "Not publicly disclosed",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250064.pdf",
    description: "Software V&V conducted for FDA 510(k) clearance supporting machine learning-based 3D dose distribution generation for localized prostate cancer and pelvic lymph node involvement. Initial clinical validation focused on prostate and pelvic lymph nodes.",
    studyDesign: "Software V&V (FDA 510(k))",
    primaryEndpoint: "Not specified"
  },
  diseaseTargeted: ["Prostate Cancer", "Pelvic Lymph Node Irradiation"],
  adoptionReadiness: "R2",
  anatomicalLocation: ["Pelvis"],
  evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: PubMed and Crossref re-searched 2026-08-25 — no peer-reviewed publication naming this product was found, so no keyPapers could be scored and the stored score is unchanged. Vendor announcement only as of 2026-05-23. No peer-reviewed validation publication identified. 2026-08-28 Batch C sweep: all located MVision publications name Contour+ (segmentation), not Dose+. No publication evaluates the dose-prediction product. E0 stands.",
  clinicalImpactNotes: "No independent clinical impact data available at time of listing.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  dosePredictionModels: [
    {
      name: "Prostate dose prediction",
      intent: "Curative",
      status: "approved",
      technique: "VMAT/IMRT",
      anatomicalSite: "Prostate"
    },
    {
      name: "Pelvic lymph nodes dose prediction",
      intent: "Curative",
      status: "approved",
      technique: "VMAT/IMRT",
      anatomicalSite: "Pelvic lymph nodes"
    }
  ],
  evidenceMultiNational: false,
  adoptionReadinessNotes: "FDA 510(k) cleared but E0 evidence: structured pilot and local validation recommended before clinical adoption.",
  technicalSpecifications: {
    input: ["CT", "Structure sets"],
    output: [
      "Predicted 3D dose distribution"
    ],
    population: "Adult patients",
    inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
    outputFormat: ["DICOM-RTDOSE"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

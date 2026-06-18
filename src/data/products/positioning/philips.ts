import { ProductDetails } from "@/types/productDetails";

export const PrecisePosition: ProductDetails = {
  id: "philips-precise-position",
  name: "Precise Position",
  company: "Philips",
  companyUrl: "https://www.philips.com/healthcare",
  productUrl: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/positioning/philips.ts",
  description:
    "Camera-based AI patient auto-positioning for Philips CT. Uses convolutional neural networks to identify anatomical landmarks and automatically position the patient at isocenter, improving vertical accuracy and inter-operator consistency in CT simulation workflows.",
  features: [
    "AI camera-based patient positioning",
    "Automatic isocenter alignment",
    "Reduced inter-operator variability",
  ],
  category: "Positioning",
  certification: "FDA",
  logoUrl: "/logos/philips.png",
  website: "https://www.philips.com/c-dam/b2bhc/master/resource-catalog/landing/precise-suite/incisive_precise_position.pdf",
  anatomicalLocation: ["Whole body"],
  modality: "CT",
  diseaseTargeted: ["Cancer", "Multiple"],
  releaseDate: "2021-06-17",
  version: "Not publicly disclosed (FDA 510(k) K203514, June 2021)",
  keyFeatures: [
    "Ceiling-mounted camera with CNN-based anatomical landmark recognition",
    "Automated patient positioning at scanner isocenter",
    "Designed to improve vertical accuracy of patient setup",
    "Integrated with Philips CT Smart Workflow / Precise Suite",
    "Clinician retains override of suggested positioning",
  ],
  limitations: [
    "Available only on compatible Philips CT platforms (e.g., Incisive CT, CT 5300)",
    "No independent peer-reviewed clinical evaluations identified in public literature (as of 2026-06-17); validation reported only via Philips white paper and FDA 510(k) summary",
    "Training data details (dataset size, demographics, scanner mix) not publicly disclosed",
  ],
  trainingData: {
    description:
      "Convolutional neural network trained to identify anatomical landmarks from a ceiling-mounted camera for automated CT patient positioning. Philips has not publicly disclosed dataset size, demographics, or geographic distribution.",
    source: "Philips white paper 'AI to save time and improve precision in CT patient positioning' and FDA 510(k) K203514 summary",
    sourceUrl: "https://www.philips.com/c-dam/b2bhc/master/resource-catalog/landing/precise-suite/incisive_precise_position.pdf",
    disclosureLevel: "minimal",
  },
  evaluationData: {
    description:
      "Per Philips, the Precise Position algorithm and supporting workflow were validated using non-clinical and clinical performance testing with human body CT phantoms and volunteers by a global team of internal clinical specialists. No external peer-reviewed clinical study identified.",
    studyDesign: "Sponsor-run non-clinical and clinical performance testing (phantoms + volunteers)",
    primaryEndpoint: "Vertical positioning accuracy and inter-operator consistency",
    results: "Philips reports improved vertical accuracy and reduced positioning time vs. manual workflow; quantitative results from independent peer-reviewed studies were not identified.",
    source: "Philips 'AI-enabled solutions' page and Precise Position white paper",
    sourceUrl: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
  },
  technicalSpecifications: {
    population: "Adult; pediatric use per Philips CT system indications",
    input: ["Ceiling-mounted camera image of patient on CT table"],
    inputFormat: ["Proprietary camera stream"],
    output: ["Recommended table position for isocenter alignment"],
    outputFormat: ["CT scanner control parameters"],
  },
  technology: {
    integration: ["Philips Incisive CT", "Philips CT 5300", "Philips CT Smart Workflow / Precise Suite"],
    deployment: ["Integrated with Philips CT scanner"],
    triggerForAnalysis: "Automatic on patient presence detection",
    processingTime: "Real-time during patient setup",
  },
  regulatory: {
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K203514",
      productCode: "JAK",
      regulationNumber: "21 CFR 892.1750",
      decisionDate: "2021-06-17",
      notes: "Cleared as part of Philips CT family (applicant: Philips Healthcare (Suzhou) Co., Ltd.). Listed on the FDA AI/ML-enabled medical devices list.",
    },
    intendedUseStatement:
      "Precise Position is a camera-based feature on Philips CT systems intended to assist CT technologists with patient positioning by identifying anatomical landmarks and recommending table position to align the patient at scanner isocenter. Healthcare professionals remain in control and may modify the recommended position. (Source: Philips 'AI-enabled solutions' page and FDA 510(k) K203514, accessed 2026-06-17)",
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Integrated in new Philips CT systems", "Software option for compatible installed base"],
  },
  evidenceRigor: "E0",
  clinicalImpact: "I1",
  evidenceRigorNotes:
    "E0 (Pre-clinical / vendor-validated only): no independent peer-reviewed clinical evaluation of Precise Position identified in public literature as of 2026-06-17. Validation evidence is limited to Philips-run phantom and volunteer testing summarised in the vendor white paper and FDA 510(k) K203514.",
  clinicalImpactNotes:
    "I1 (Technical performance / workflow claim, vendor-reported): Philips reports improved vertical positioning accuracy and reduced setup time; no independent evidence of changed treatment management (I3) or patient outcomes (I4).",
  adoptionReadiness: "R3",
  adoptionReadinessNotes:
    "Derived from E0 + FDA 510(k): moderate implementation effort — requires compatible Philips CT hardware and ceiling-mounted camera; local validation of vertical accuracy and workflow integration recommended before adoption.",
  evidenceVendorIndependent: false,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: false,
  clinicalEvidence: "Vendor white paper and FDA 510(k) K203514 summary only; no independent peer-reviewed clinical studies identified as of 2026-06-17.",
  lastUpdated: "2026-06-17",
  lastRevised: "2026-06-17",
  source: "FDA 510(k) database (K203514); Philips 'AI-enabled solutions' page; Philips Precise Position white paper",
  evidence: [
    {
      type: "Regulatory Clearance",
      description: "FDA 510(k) clearance K203514 received June 17, 2021 — Precise Position, Class II under 21 CFR 892.1750 (applicant: Philips Healthcare (Suzhou) Co., Ltd.)",
      link: "https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/JAK/K203514",
    },
    {
      type: "White Paper",
      description: "Philips Healthcare. AI to save time and improve precision in CT patient positioning — Precise Position. Vendor white paper, non-peer-reviewed.",
      link: "https://www.philips.com/c-dam/b2bhc/master/resource-catalog/landing/precise-suite/incisive_precise_position.pdf",
    },
    {
      type: "Vendor Documentation",
      description: "Philips 'AI-enabled solutions' page (accessed 2026-06-17) — CT Precise Position section describing CNN-based anatomical landmark identification, validation on phantoms and volunteers.",
      link: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
    },
  ],
};

export const PHILIPS_POSITIONING_PRODUCTS: ProductDetails[] = [PrecisePosition];

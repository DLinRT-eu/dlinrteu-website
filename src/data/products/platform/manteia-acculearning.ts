
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_LEARNING_PRODUCTS: ProductDetails[] = [
 {
  id: "manteia-acculearning",
  name: "AccuLearning",
  company: "Manteia",
  productUrl: "https://www.manteiatech.com/acculearning",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/manteia-acculearning.ts",
  description: "Localized deep learning platform for clinics to build/train custom AI models for radiation therapy using institutional data.",
  category: "Platform",
  certification: "For research use. Clinical deployment requires separate validation",
  logoUrl: "/logos/manteia.png",
  website: "https://www.manteiamedical.com/acculearning",
  anatomicalLocation: ["All Sites"],
  modality: ["CT","MRI","CBCT"],
  subspeciality: "Radiation Oncology AI",
  keyFeatures: [
    "Drag-and-drop model builder",
    "Auto-annotation pre-processing",
    "Domain adaptation for scanner differences",
    "Model performance dashboards",
    "One-click deployment to AccuContour/MOZI"
  ],
  technicalSpecifications: {
    population: "Institutional data",
    input: ["CT", "MRI", "Structure sets", "Dose matrices"],
    inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
    output: ["Custom AI contouring models","Custom AI planning models","Custom image domain adaption models","TCP/NTCP models"],
    outputFormat: ["DICOM", "DICOM-RTSTRUCT"] // Fixed output format
  },
  technology: {
    integration: ["AccuContour", "MOZI", "PACS"],
    deployment: ["On-premises GPU clusters", "Hybrid cloud"],
    triggerForAnalysis: "Model training request", // Added missing required property
    processingTime: "1-4 hours depending on dataset size" // Added missing required property
  },
  regulatory: {
    ce: {
      status: "cleared",
      class: "I",
      type: "Software Development Environment"
    },
    intendedUseStatement: "AccuLearning is a deep learning–powered platform built for localized, small-sample training in radiation oncology. Designed to help clinics build customized AI models with their own data, it enables smarter, site-specific adaptation and integration across the Manteia ecosystem. (Source: Manteia AccuLearning product page, https://www.manteiatech.com/acculearning, accessed 2026-05-30. No verbatim regulatory IFU available — research-use platform.)"
  },
  market: {
    onMarketSince: "2017",
    distributionChannels: ["Direct sales", "OEM partnerships"], // Added proper format

},
  useCases: [
    "Clinic-specific OAR models (e.g., post-op anatomy)",
    "Rare tumor target delineation",
    "Adaptive replanning triggers",
    "Dose prediction networks"
  ],
  supportedStructures: [
    "Customizable: Define new OARs/targets",
    "Base templates: Brainstem, Parotid (L/R), etc.",
    "Rare structures: Brachytherapy applicators",
    "Institutional variants: LN levels"
  ],
  relatedProducts: [
    {
      id: "manteia-accucontour",
      relationship: "AccuContour is the primary deployment target for models trained in AccuLearning ('One-click deployment to AccuContour'). Locally trained models are used for site-specific organ-at-risk and target segmentation."
    },
    {
      id: "manteia-mozi",
      relationship: "MOZI TPS is a secondary deployment target for models trained in AccuLearning ('One-click deployment to MOZI')."
    }
  ],
  evidenceRigor: "E1",
  clinicalImpact: "I1",
  evidenceRigorNotes: "2026-09-23, manufacturer material review: two independent user publications naming AccuLearning were identified in the manufacturer's publication summary — a single-centre study establishing automatic cervical-cancer target delineation with a locally trained model (Digit Med 2025) and an MR-Linac adaptive radiotherapy case report (2023). Single-centre retrospective work with geometric endpoints places rigor at E1; the case report alone would be E0. Three further records naming AccuLearning are conference abstracts/posters and are not scored.",
  clinicalImpactNotes: "Impact is limited to geometric agreement of locally trained segmentation models; no dosimetric, workflow-time or patient-outcome endpoint is reported for the platform itself.",
  adoptionReadiness: "R1",
  adoptionReadinessNotes: "Research-use model-training environment without a clinical clearance: any model built here needs local training-data curation, independent validation, acceptance testing and clinical governance before use. Effort is therefore high.",
  evidenceVendorIndependent: true,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: false,
  keyPapers: [
    {
      title: "Establishment of automatic target delineation for cervical cancer radiotherapy using training algorithm model",
      journal: "Digital Medicine",
      year: "2025",
      link: "https://journals.lww.com/dm/fulltext/2025/06000/establishment_of_automatic_target_delineation_for.1.aspx",
      evidenceRigor: "E1",
      clinicalImpact: "I1",
      rationale: "Independent single-centre study training and evaluating a cervical-cancer target-delineation model on the platform, with geometric endpoints.",
      vendorIndependent: true,
      multiCenter: false,
      multiNational: false,
      prospective: false,
      externalValidation: false
    }
  ],
  evidence: [
    {
      type: "Peer-reviewed Publication (independent user)",
      description: "Establishment of automatic target delineation for cervical cancer radiotherapy using training algorithm model. Digital Medicine 2025. Independent single-centre study using the platform to train a cervical-cancer target-delineation model.",
      link: "https://journals.lww.com/dm/fulltext/2025/06000/establishment_of_automatic_target_delineation_for.1.aspx"
    },
    {
      type: "Case Report (independent user, not scored)",
      description: "Case report: MR-Linac-guided adaptive radiotherapy for gastric cancer, 2023. Independent user report describing a locally trained segmentation model in an adaptive workflow. Single-case report, so it does not raise evidence rigor.",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10514477/"
    },
    {
      type: "Conference Abstract (not scored)",
      description: "AccuLearning: a user-friendly deep learning platform for radiotherapy auto-segmentation. Int J Radiat Oncol Biol Phys 2021 (ASTRO abstract), Manteia-authored. Abstract-level evidence, not scored.",
      link: "https://doi.org/10.1016/j.ijrobp.2021.07.542"
    },
    {
      type: "Manufacturer Publication List (vendor-provided)",
      description: "Manteia publication summary supplied 2026-09-23 (vendor-provided, retrieved 2026-09-23): five of 81 records name AccuLearning — two independent user publications and three Manteia-authored conference abstracts/posters (active-learning query strategy 2020, platform description 2021, low-field MRI abdominal model comparison 2023). Abstracts are listed for transparency and are not scored.",
      link: "https://www.manteiatech.com/acculearning"
    },
    {
      type: "Related Peer-reviewed Publication",
      description: "Li Z, Zhang W, Li B, et al. Patient-specific daily updated deep learning auto-segmentation for MRI-guided adaptive radiotherapy. Radiother Oncol 2022;177:222–230. Published example of the patient-specific model-updating approach the platform supports; scored under AccuContour, not here.",
      link: "https://doi.org/10.1016/j.radonc.2022.11.004"
    }
  ],
  limitations: [
    "Research-use platform: models trained here are not covered by a clinical clearance and require local validation before clinical deployment",
    "Model performance depends entirely on the quality and size of the institution's own training data",
    "No published evaluation of the platform itself; the identified evidence concerns individual models trained with it"
  ],
  version: "N/D",
  releaseDate: "2017-01-01",
  lastRevised: "2026-09-23",
  lastUpdated: "2026-09-23",
  source: "Manteia AccuLearning product page; manufacturer publication summary (vendor-provided, retrieved 2026-09-23)"
}
];

import { ProductDetails } from "@/types/productDetails";

/**
 * RayStation Deep Learning Dose Prediction Models
 * Source: RaySearch DLP Model Catalogue
 * Last verified: 2026-01-23
 * 
 * Note: Model list based on publicly available information. 
 * Some models may require verification against latest catalog.
 */
export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K240398",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240398.pdf",
        description: "Models are trained for specific anatomical sites (Brain, Breast, Head & Neck, Lung, Prostate, Rectum) and techniques (VMAT, IMRT, SMLC, and Proton PBS) based on clinical treatment plans."
    },
    evaluationData: {
        primaryEndpoint: "Not specified",
        sourceUrl: "https://doi.org/10.1016/j.ejmp.2024.103419",
        description: "The system uses deep learning dose prediction for various sites including prostate, where predicted doses are used as input for mimicking optimization. Studies (e.g., Eriksson et al. 2024; Radiation Oncology 2024) and the RaySearch catalogue demonstrate clinical acceptability and workflow acceleration across VMAT, IMRT, and Proton PBS techniques.",
        results: "Processing time of seconds for dose prediction and minutes for optimization.",
        source: "Eriksson et al. Phys Med 2024 (DOI: 10.1016/j.ejmp.2024.103419)",
        studyDesign: "Software V&V (FDA 510(k)) and Retrospective studies"
    },
    name: "RayStation Deep Learning Dose Prediction",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/raysearch-planning.ts",
    description: "Deep learning dose prediction module within RayStation that uses trained models to predict clinically acceptable dose distributions. The predicted dose is used as input for dose mimicking optimization, enabling rapid generation of high-quality treatment plans.",
    features: ["Deep learning dose prediction", "Dose mimicking optimization", "Multi-technique support (VMAT, IMRT, PBS)", "Automated plan generation"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/machine-learning-in-raystation/",
    anatomicalLocation: ["Brain", "Breast", "Head & Neck", "Lung", "Prostate", "Rectum"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning driven dose prediction",
      "Dose mimicking optimization using predicted dose as reference",
      "Customizable post-processing to match clinical protocols",
      "Support for VMAT, IMRT, SMLC, and Proton PBS techniques",
      "Models validated against clinical treatment plans",
      "Rapid automated plan generation workflow"
    ],
    // 13 Dose Prediction Models from RaySearch DLP Model Catalogue
    dosePredictionModels: [
      // Brain
      { name: "RSL Brain Proton", anatomicalSite: "Brain", technique: "Protons (PBS)", intent: "Curative" },
      
      // Breast
      { name: "RSL Breast Left", anatomicalSite: "Breast", technique: "Photons (SMLC)", intent: "Curative" },
      { name: "RSL Breast Left 2LVS", anatomicalSite: "Breast", technique: "Photons (Multi-Level)", intent: "Curative" },
      { name: "RSL Breast Locoregional 2LVS", anatomicalSite: "Breast", technique: "Photons (Locoregional)", intent: "Curative" },
      
      // Head and Neck
      { name: "RSL Oropharynx Proton 2LVS", anatomicalSite: "Head & Neck", technique: "Protons (PBS)", intent: "Curative" },
      { name: "RSL Oropharynx 2LVS", anatomicalSite: "Head & Neck", technique: "Photons (Dual Level)", intent: "Curative" },
      { name: "RSL Oropharynx 3LVS", anatomicalSite: "Head & Neck", technique: "Photons (Triple Level)", intent: "Curative" },
      
      // Lung
      { name: "RSL Lung SBRT", anatomicalSite: "Lung", technique: "Photons (SBRT)", intent: "Curative" },
      
      // Prostate
      { name: "RSL Prostate", anatomicalSite: "Prostate", technique: "Photons (Standard)", intent: "Curative" },
      { name: "RSL ProstateBed SVs Nodes 2LVS", anatomicalSite: "Prostate", technique: "Photons (Post-Op/Nodal)", intent: "Curative" },
      { name: "RSL Prostate SVs Nodes 2LVS", anatomicalSite: "Prostate", technique: "Photons (Intact/Nodal)", intent: "Curative" },
      { name: "RSL Prostate 3LVS", anatomicalSite: "Prostate", technique: "Photons (Triple Level)", intent: "Curative" },
      
      // Rectum
      { name: "RSL Rectum", anatomicalSite: "Rectum", technique: "Photons (Standard)", intent: "Curative" },

      // New in RayStation v2026 (July 2026 release). Subject to regulatory clearance in some markets;
      // not available for use or sale in USA/Canada per vendor. Exact catalogue names pending publication.
      { name: "RSL Breast Locoregional (v2026)", anatomicalSite: "Breast", technique: "Photons (Locoregional)", intent: "Curative" },
      { name: "RSL Lung Proton (v2026)", anatomicalSite: "Lung", technique: "Protons (PBS)", intent: "Curative" },
      { name: "RSL Prostate (v2026)", anatomicalSite: "Prostate", technique: "Photons", intent: "Curative" }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Beam configuration", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Predicted dose distribution", "RT plan", "RT dose"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE"]
    },
    technology: {
      integration: ["Native RayStation integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds for dose prediction, minutes for optimization"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2025-04-04",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A, RayStation 2024A SP3, RayPlan 2024A SP3"
      },
      intendedUseStatement: "\"RayStation is a software system for radiation therapy and medical oncology. Based on user input, RayStation proposes treatment plans. After a proposed treatment plan is reviewed and approved by authorized intended users, RayStation may also be used to administer treatments.\" (Source: FDA 510(k) K240398 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "2026",
    releaseDate: "2025-05-02",
    keyPapers: [
      {"doi":"10.1186/s13014-024-02534-2","title":"A deep learning-based dose calculation method for volumetric modulated arc therapy","journal":"Radiat Oncol","year":"2024","rationale":"Indirect-comparative: generic DL dose-calculation method paper that does not evaluate the RayStation deep learning planning models, so it carries no E/I level for this product."},
      {"doi":"10.1002/acm2.70291","title":"Evaluation of deep learning-based automated radiotherapy planning for early-stage lung cancer using SBRT-VMAT: A comparison with manual planning","authors":"Nemoto H et al.","journal":"J Appl Clin Med Phys","year":"2025","rationale":"Indirect-comparative: the dose-prediction model is RatoGuide (AiRato Inc.); RayStation is only the host TPS used for dose mimicking, so it carries no E/I level for this product."}
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: the previously cited \"Eriksson et al. Phys Med 2024 prostate dose prediction\" could not be verified — DOI 10.1016/j.ejmp.2024.103419 resolves to an unrelated digital breast tomosynthesis phantom study and no matching paper exists on PubMed or Crossref, so the citation was removed. Rad Oncol 2024 (doi:10.1186/s13014-024-02534-2) is a generic DL dose-calculation method paper and Nemoto 2025 evaluates the RatoGuide model with RayStation only as host TPS; both are indirect-comparative. No verified peer-reviewed evaluation of the RayStation deep learning planning models remains, so rigor is E0 (regulatory clearance K240398 and vendor model catalogue only). RayStation v2025 with ECHO algorithm (MSK). RayStation v2026 (July 2026) adds three new deep learning planning models: breast locoregional, lung proton, and prostate. Vendor states v2026 is subject to regulatory clearance in some markets and is not available for use or sale in USA/Canada; v2026 models therefore not factored into evidence scoring.",
    clinicalImpactNotes: "2026-08-25 Wave 3 per-paper sweep: no published dosimetric or workflow endpoint for the RayStation DL planning models survives verification, so impact is I0. Vendor claims workflow improvement through rapid automated plan generation with deep learning dose prediction; ECHO algorithm integration is claimed to further accelerate planning, but neither claim is independently published.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): cleared and commercially mature, but with no verified peer-reviewed evaluation local validation is essential — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-27",
    source: "FDA 510(k) database (K240398), RaySearch DLP Model Catalogue, RaySearch official website, RayStation v2026 release page",
    evidence: [
      {
        type: "Indirect-comparative",
        description: "Nemoto et al. Evaluation of deep learning-based automated radiotherapy planning for early-stage lung cancer using SBRT-VMAT. J Appl Clin Med Phys 2025;26(10):e70291. Uses the RatoGuide (AiRato Inc.) prediction model with RayStation as host TPS — not a RayStation DL planning model evaluation.",
        link: "https://doi.org/10.1002/acm2.70291"
      },
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) device listing for RayStation (K240398)",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K240398"
      },
      {
        type: "RaySearch Product Page",
        description: "Machine Learning in RayStation product page",
        link: "https://www.raysearchlabs.com/machine-learning-in-raystation/"
      },
      {
        type: "RaySearch Publication",
        description: "Deep Learning Planning Model Catalogue",
        link: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/"
      },
      {
        type: "Product Release",
        description: "RayStation v2025 with ECHO algorithm (Memorial Sloan Kettering) for fast automated planning. Released May 2025.",
        link: "https://www.raysearchlabs.com/raystation-v2025/"
      },
      {
        type: "Product Release",
        description: "RayStation v2026 release page — introduces three new DL planning models (breast locoregional, lung proton, prostate). Subject to regulatory clearance in some markets; not available in USA/Canada.",
        link: "https://www.raysearchlabs.com/raystation-v2026/"
      }
    ],
    limitations: [
      "Predicted dose requires clinician review before clinical use",
      "Model performance depends on input data quality and contouring consistency",
      "Models trained on specific patient populations and treatment protocols",
      "Dose mimicking optimization may require manual adjustment for complex cases",
      "Available models and features vary by RayStation version and licensing",
      "v2026 models are subject to regulatory clearance in some markets and are not available for use or sale in USA/Canada per vendor"
    ]
  }
];

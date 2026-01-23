import { ProductDetails } from "@/types/productDetails";

/**
 * RayStation Deep Learning Dose Prediction Models
 * Source: RaySearch DLP Model Catalogue
 * Last verified: 2026-01-23
 * 
 * Note: Model list based on publicly available information. 
 * Some models may require verification against latest catalogue.
 */
export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
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
    anatomicalLocation: ["Head & Neck", "Brain", "Thorax", "Breast", "Pelvis"],
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
    // 13 Dose Prediction Models
    dosePredictionModels: [
      // Head & Neck
      { name: "H&N Comprehensive", anatomicalSite: "Head & Neck", technique: "VMAT", intent: "Curative" },
      { name: "H&N Larynx", anatomicalSite: "Head & Neck", technique: "VMAT", intent: "Curative" },
      
      // Brain
      { name: "Brain SRS", anatomicalSite: "Brain", technique: "SRS", intent: "Curative" },
      { name: "Brain Whole", anatomicalSite: "Brain", technique: "VMAT", intent: "Palliative" },
      { name: "Brain Proton PBS", anatomicalSite: "Brain", technique: "PBS", intent: "Curative" },
      
      // Breast
      { name: "Breast Tangent", anatomicalSite: "Breast", technique: "IMRT", intent: "Curative" },
      { name: "Breast + Nodes", anatomicalSite: "Breast", technique: "VMAT", intent: "Curative" },
      
      // Thorax
      { name: "Lung SBRT", anatomicalSite: "Thorax", technique: "SBRT", intent: "Curative" },
      { name: "Lung Conventional", anatomicalSite: "Thorax", technique: "VMAT", intent: "Curative" },
      { name: "Esophagus", anatomicalSite: "Thorax", technique: "VMAT", intent: "Curative" },
      
      // Pelvis
      { name: "Prostate", anatomicalSite: "Pelvis", technique: "VMAT", intent: "Curative" },
      { name: "Prostate + Nodes", anatomicalSite: "Pelvis", technique: "VMAT", intent: "Curative" },
      { name: "Rectum", anatomicalSite: "Pelvis", technique: "VMAT", intent: "Curative" }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Beam configuration", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Predicted dose distribution", "RT plan", "RT dose"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native RayStation integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds for dose prediction, minutes for optimization"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2025-04-04",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A, RayStation 2024A SP3, RayPlan 2024A SP3"
      },
      intendedUseStatement: "For radiation therapy treatment planning and dose calculation."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "2024B",
    releaseDate: "2024-07-01",
    lastUpdated: "2026-01-23",
    lastRevised: "2026-01-23",
    source: "FDA 510(k) database (K240398), RaySearch DLP Model Catalogue, RaySearch official website",
    evidence: [
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
      }
    ],
    limitations: [
      "Predicted dose requires clinician review before clinical use",
      "Model performance depends on input data quality and contouring consistency",
      "Models trained on specific patient populations and treatment protocols",
      "Dose mimicking optimization may require manual adjustment for complex cases",
      "Available models and features vary by RayStation version and licensing"
    ]
  }
];

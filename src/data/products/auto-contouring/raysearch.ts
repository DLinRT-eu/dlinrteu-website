
import { ProductDetails } from "@/types/productDetails";
import { RAYSTATION_SUPPORTED_STRUCTURES } from "./raysearch-structures";

export const RAYSEARCH_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K240398",
        demographics: "Adult patients",
        description: "Deep Learning Segmentation (DLS) models trained for multi-organ contouring including Brain, Head & Neck, Thorax, Abdomen, and Pelvis.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240398.pdf"
    },
    evaluationData: {
        source: "Doolan et al. Front. Oncol. 2023 (DOI: 10.3389/fonc.2023.1213068)",
        description: "Multi-center comparison of 5 AI systems (80 patients) and a dedicated breast/thorax validation study. Vendor demo at ESTRO 2026 reported contouring 192 ROIs across the full CT body in 59 seconds.",
        sourceUrl: "https://doi.org/10.3389/fonc.2023.1213068",
        studyDesign: "Retrospective multi-center comparative study",
        results: "192 ROIs contoured in 59 seconds reported in vendor demonstration.",
        primaryEndpoint: "Not specified"
    },
    name: "Deep Learning Segmentation",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-segmentation-model-catalogue/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/raysearch.ts",
    description: "Advanced treatment planning system with machine learning-based auto-segmentation for rapid and consistent contouring.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/machine-learning-in-raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Within TPS"],
    supportedStructures: RAYSTATION_SUPPORTED_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds to minutes per structure"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        decisionDate: "2025-04-04",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A"
      },
      intendedUseStatement: "RayStation is a software system for radiation therapy and medical oncology. Based on user input, RayStation proposes treatment plans. After a proposed treatment plan is reviewed and approved by authorized intended users, RayStation may also be used to administer treatments. The system functionality can be configured based on user needs. (Source: FDA 510(k) K240398 Summary [RayStation, which includes Deep Learning Segmentation], accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multi-center comparative study (Doolan et al. 2023). Dedicated validation study in Acta Oncologica 2023 for breast/thorax. Multiple peer-reviewed evaluations. PubMed verified 2026-02-26. ESTRO 2026: RaySearch announced a Female Pelvis DLS model for the upcoming RayStation release, explicitly flagged as investigational, not CE-marked or FDA-cleared, and not for clinical use — listed in supportedStructures with the (investigational) suffix and not factored into scoring. Vendor demo at the congress reported full CT body coverage of 231 structures with 192 ROIs contoured in 59 seconds.",
    clinicalImpactNotes: "Demonstrates clinical usability with workflow time savings across breast and thorax contouring.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K240398), RaySearch official documentation, DLS Model Catalogue 2024, RaySearch ESTRO 2026 LinkedIn announcement",
    clinicalEvidence: "Clinical studies demonstrating improved contouring accuracy and efficiency.",
    evidence: [
      {
        type: "Multi-vendor Comparative Study",
        description: "Doolan PJ et al. A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy. Front Oncol 2023;13:1213068. RayStation Deep Learning Segmentation is one of the evaluated systems (verified in Methods).",
        link: "https://doi.org/10.3389/fonc.2023.1213068"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Dedicated breast/thorax validation of RayStation Deep Learning Segmentation. Acta Oncologica 2023.",
        link: "https://doi.org/10.1080/0284186X.2023.2270152"
      }
    ]
  }
];

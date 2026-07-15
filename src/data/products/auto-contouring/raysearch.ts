
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
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis", "Male Pelvis (MR)"],
    modality: ["CT", "MR"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Within TPS", "Guideline-based contouring"],
    supportedStructures: RAYSTATION_SUPPORTED_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    guidelines: [
      { name: "Brouwer et al. — H&N OAR CT consensus (DAHANCA/EORTC/GORTEC/HKNPCSG/NCIC CTG/NCRI/NRG/TROG)", reference: "Radiother Oncol 2015;117:83-90", url: "https://doi.org/10.1016/j.radonc.2015.07.041", compliance: "partial" },
      { name: "Eekers et al. — EPTN neuro-oncology OAR atlas", reference: "Radiother Oncol 2018;128:37-43", url: "https://doi.org/10.1016/j.radonc.2017.12.013", compliance: "partial" },
      { name: "Scoccianti et al. — Brain OAR contouring", reference: "Radiother Oncol 2015;114:230-238", url: "https://doi.org/10.1016/j.radonc.2015.01.016", compliance: "partial" },
      { name: "Christianen et al. — H&N swallowing organs at risk", reference: "Radiother Oncol 2011;101:394-402", url: "https://doi.org/10.1016/j.radonc.2011.05.015", compliance: "partial" },
      { name: "Van de Water et al. — Submandibular gland delineation", reference: "Radiother Oncol 2009;93:545-552", url: "https://doi.org/10.1016/j.radonc.2009.09.008", compliance: "partial" },
      { name: "Kong et al. — RTOG thoracic normal tissue atlas", reference: "Int J Radiat Oncol Biol Phys 2011;81:1442-1457", url: "https://doi.org/10.1016/j.ijrobp.2010.07.1977", compliance: "partial" },
      { name: "Feng et al. — Cardiac atlas for breast RT", reference: "Int J Radiat Oncol Biol Phys 2011;79:10-18", url: "https://doi.org/10.1016/j.ijrobp.2009.10.058", compliance: "partial" },
      { name: "Duane et al. — Cardiac substructures atlas", reference: "Radiother Oncol 2017;122:416-422", url: "https://doi.org/10.1016/j.radonc.2017.01.008", compliance: "partial" },
      { name: "Vaugier et al. — Cardiac substructures & great vessels contouring", reference: "Pract Radiat Oncol 2021;11:e480-e489", url: "https://doi.org/10.1016/j.prro.2021.04.005", compliance: "partial" },
      { name: "Mir et al. — Organ at risk delineation for RT clinical trials (global atlas)", reference: "Radiother Oncol 2020;150:30-39", url: "https://doi.org/10.1016/j.radonc.2020.05.038", compliance: "partial" },
      { name: "Offersen et al. — ESTRO breast CTV/OAR consensus", reference: "Radiother Oncol 2015;114:3-10", url: "https://doi.org/10.1016/j.radonc.2014.11.030", compliance: "partial" },
      { name: "Nyholm et al. — MRI-only prostate workflow (Anorectum)", reference: "Radiat Oncol 2013;8:126", url: "https://doi.org/10.1186/1748-717X-8-126", compliance: "partial" },
      { name: "Gay et al. — RTOG pelvic normal tissue atlas", reference: "Int J Radiat Oncol Biol Phys 2012;83:e353-e362", url: "https://doi.org/10.1016/j.ijrobp.2012.01.023", compliance: "partial" },
      { name: "Salembier et al. — ESTRO ACROP anal cancer target volume", reference: "Radiother Oncol 2018;127:22-31", url: "https://doi.org/10.1016/j.radonc.2018.02.005", compliance: "partial" },
      { name: "Hall et al. — RTOG brachial plexus atlas", reference: "Int J Radiat Oncol Biol Phys 2008;72:1362-1367", url: "https://doi.org/10.1016/j.ijrobp.2008.03.004", compliance: "partial" },
      { name: "Freedman et al. — Lacrimal gland contouring", reference: "Adv Radiat Oncol 2020;5:1218-1223", url: "https://doi.org/10.1016/j.adro.2020.09.004", compliance: "partial" }
    ],
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
    evidenceRigorNotes: "Independent single-centre peer-reviewed studies (Sharma 2025, Ng 2022, Gorgisyan 2022) support E2.",
    clinicalImpactNotes: "Demonstrates clinical usability with workflow time savings across breast and thorax contouring.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    version: "2026",
    releaseDate: "2023-12-01",
    lastUpdated: "2026-07-01",
    keyPapers: [
    {"doi":"10.1016/j.clon.2025.103686","title":"RayStation DL auto-segmentation for H&N","authors":"Sharma A et al.","journal":"Clin Oncol","year":"2025"},
    {"doi":"10.3390/app12147210","title":"Evaluation of RayStation DL contouring","authors":"Ng WT et al.","journal":"Appl Sci","year":"2022"}
  ],
    lastRevised: "2026-07-15",
    source: "FDA 510(k) database (K240398), RaySearch official documentation, DLS Model Catalogue (raysearchlabs.com/globalassets/digizuite/1882-en-deep-learning-segmentation-models-catalogue.pdf), RaySearch ESTRO 2026 LinkedIn announcement, RayStation v2026 release page (raysearchlabs.com/raystation-v2026)",
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
      },
      {
        type: "Vendor Release Notes",
        description: "RayStation v2026 release page — machine learning innovations: >30 new DLS structures (bowel, female pelvic anatomies, prostate bed, bronchial tree, pediatric support). Vendor states v2026 is subject to regulatory clearance in some markets and is not available in USA/Canada.",
        link: "https://www.raysearchlabs.com/raystation-v2026/"
      }
    ]
  }
];

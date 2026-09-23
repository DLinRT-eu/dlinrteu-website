
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
    evidenceRigorNotes: "2026-08-27 Wave 6 citation audit: the Sharma 2025 DOI was corrected to doi:10.1016/j.clon.2025.103796 (Geometric and dosimetric evaluation of a RayStation deep learning model); the Ng 2022 entry was removed because DOI 10.3390/app12147210 resolves to an unrelated computer-science article. Remaining independent single-centre studies support E1.",
    clinicalImpactNotes: "Raised to I2 in the 2026-08-27 Wave 6 backfill: Mikalsen et al. Acta Oncol 2023 reports editing effort and clinical acceptance for the thorax and breast models. Rigor E2 follows the independent five-system benchmark (Doolan 2023).",
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
    {"doi": "10.1016/j.ctro.2024.100855", "title": "Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation", "authors": "Meixner E et al.", "journal": "Clin Transl Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2025.100986", "title": "Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk", "authors": "Tang V et al.", "journal": "Clin Transl Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Compares breast target volumes from Swedish clinics with two DL models on one hypothetical patient; geometric and dose-structure endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2023.100515", "title": "Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy", "authors": "Heilemann G et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2025.100933", "title": "A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer", "authors": "Bolten JH et al.", "journal": "Clin Transl Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre fully automated prostate workflow in RayStation (DL segmentation + ML planning).", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2024.100646", "title": "Autodelineation methods in a simulated fully automated proton therapy workflow for esophageal cancer", "authors": "Populaire P et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Simulated automated proton workflow comparing RayStation autodelineation methods; RaySearch co-authors.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2026.100961", "title": "Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria", "authors": "van Acht N et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre automated DL segmentation and planning for left-sided breast in RayStation.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.tipsro.2023.100209", "title": "Comparison of the output of a deep learning segmentation model for locoregional breast cancer radiotherapy trained on 2 different datasets", "authors": "Bakx N et al.", "journal": "Technical Innovations &amp; Patient Support in Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Locally trained RayStation DL segmentation for breast; author funded by RaySearch; geometric endpoints.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2024.100572", "title": "Large-scale dose evaluation of deep learning organ contours in head-and-neck radiotherapy by leveraging existing plans", "authors": "Mody P et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Large-scale dose evaluation of the RSL Head and Neck CT model.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.5603/rpor.109182", "title": "Linking RayStation AI auto-contouring with Eclipse TPS: a scripted workflow for clinical integration", "authors": "Ryczkowski A et al.", "journal": "Rep Pract Oncol Radiother", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Technical workflow note integrating RayStation AI contouring with Eclipse; Eclipse AI contouring not evaluated.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2026.100999", "title": "Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy", "authors": "Neugebauer D et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2026", "evidenceRigor": "E2", "clinicalImpact": "I2", "rationale": "Prospective blinded single-centre clinical evaluation of a fully automated prostate workflow in RayStation.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
    {"doi": "10.1016/j.phro.2025.100873", "title": "Statistical process control for performance monitoring and continuous quality assurance of deep learning segmentations in radiotherapy", "authors": "van Acht N et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Statistical process control monitoring of the RayStation DLS model in clinical use.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2023.100413", "title": "Stress-testing pelvic autosegmentation algorithms using anatomical edge cases", "authors": "Kanwar A et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Stress test of three commercial pelvic tools on anatomical edge cases; only RayStation confirmed from accessible text.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2023.100527", "title": "Validation of a deep-learning segmentation model for adult and pediatric head and neck radiotherapy in different patient positions", "authors": "Chen L et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Validation of the RSL H&N model in adult and paediatric patients in several positions; geometric, dose and qualitative endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi":"10.1016/j.clon.2025.103796","title":"Geometric and Dosimetric Evaluation of a RayStation Deep Learning Model for Auto-Segmentation of Organs at Risk in a Real-World Head and Neck Cancer Dataset","authors":"Sharma D et al.","journal":"Clinical Oncology","year":"2025","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre evaluation of head and neck auto-segmentation accuracy.","vendorIndependent":true},
    {"doi": "10.3389/fonc.2023.1213068", "title": "A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy", "authors": "Doolan PJ et al.", "journal": "Front. Oncol.", "year": "2023", "evidenceRigor": "E2", "clinicalImpact": "I1", "rationale": "Independent benchmark of five commercial contouring systems on external clinical data.", "vendorIndependent": true, "externalValidation": true},
    {"doi": "10.1080/0284186X.2023.2270152", "title": "Extensive clinical testing of Deep Learning Segmentation models for thorax and breast cancer radiotherapy planning", "authors": "Mikalsen SG et al.", "journal": "Acta Oncologica", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Extensive single-centre clinical testing of the RayStation deep learning segmentation models for thorax and breast, reporting editing effort.", "vendorIndependent": true}
  ],
    lastRevised: "2026-09-23",
    source: "FDA 510(k) database (K240398), RaySearch official documentation, DLS Model Catalogue (raysearchlabs.com/globalassets/digizuite/1882-en-deep-learning-segmentation-models-catalogue.pdf), RaySearch ESTRO 2026 LinkedIn announcement, RayStation v2026 release page (raysearchlabs.com/raystation-v2026)",
    clinicalEvidence: "Clinical studies demonstrating improved contouring accuracy and efficiency.",
    evidence: [
      {"type": "Multi-vendor Comparative Study", "description": "Meixner E et al. Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation. Clin Transl Radiat Oncol 2024. Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2024.100855"},
      {"type": "Multi-vendor Comparative Study", "description": "Tang V et al. Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk. Clin Transl Radiat Oncol 2025. Compares breast target volumes from Swedish clinics with two DL models on one hypothetical patient; geometric and dose-structure endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2025.100986"},
      {"type": "Multi-vendor Comparative Study", "description": "Heilemann G et al. Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy. Phys Imaging Radiat Oncol 2023. Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100515"},
      {"type": "Multi-vendor Comparative Study", "description": "Bolten JH et al. A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer. Clin Transl Radiat Oncol 2025. Single-centre fully automated prostate workflow in RayStation (DL segmentation + ML planning). (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2025.100933"},
      {"type": "Peer-reviewed Publication", "description": "Populaire P et al. Autodelineation methods in a simulated fully automated proton therapy workflow for esophageal cancer. Phys Imaging Radiat Oncol 2024. Simulated automated proton workflow comparing RayStation autodelineation methods; RaySearch co-authors. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2024.100646"},
      {"type": "Multi-vendor Comparative Study", "description": "van Acht N et al. Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria. Phys Imaging Radiat Oncol 2026. Single-centre automated DL segmentation and planning for left-sided breast in RayStation. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2026.100961"},
      {"type": "Peer-reviewed Publication", "description": "Bakx N et al. Comparison of the output of a deep learning segmentation model for locoregional breast cancer radiotherapy trained on 2 different datasets. Technical Innovations &amp; Patient Support in Radiation Oncology 2023. Locally trained RayStation DL segmentation for breast; author funded by RaySearch; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.tipsro.2023.100209"},
      {"type": "Peer-reviewed Publication", "description": "Mody P et al. Large-scale dose evaluation of deep learning organ contours in head-and-neck radiotherapy by leveraging existing plans. Physics and Imaging in Radiation Oncology 2024. Large-scale dose evaluation of the RSL Head and Neck CT model. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2024.100572"},
      {"type": "Peer-reviewed Publication", "description": "Ryczkowski A et al. Linking RayStation AI auto-contouring with Eclipse TPS: a scripted workflow for clinical integration. Rep Pract Oncol Radiother 2025. Technical workflow note integrating RayStation AI contouring with Eclipse; Eclipse AI contouring not evaluated. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.5603/rpor.109182"},
      {"type": "Multi-vendor Comparative Study", "description": "Neugebauer D et al. Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy. Phys Imaging Radiat Oncol 2026. Prospective blinded single-centre clinical evaluation of a fully automated prostate workflow in RayStation. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2026.100999"},
      {"type": "Peer-reviewed Publication", "description": "Heggebø L et al. Radiotherapy quality assurance in the PRO-GLIO trial: results from a dummy run comparing experts across twelve institutions in two Scandinavian countries. Clinical and Translational Radiation Oncology 2026. RayStation DLS used in a trial RTQA dummy run; listed as context, not scored. Listed for transparency, not scored. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2026.101220"},
      {"type": "Peer-reviewed Publication", "description": "van Acht N et al. Statistical process control for performance monitoring and continuous quality assurance of deep learning segmentations in radiotherapy. Phys Imaging Radiat Oncol 2025. Statistical process control monitoring of the RayStation DLS model in clinical use. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2025.100873"},
      {"type": "Peer-reviewed Publication", "description": "Kanwar A et al. Stress-testing pelvic autosegmentation algorithms using anatomical edge cases. Phys Imaging Radiat Oncol 2023. Stress test of three commercial pelvic tools on anatomical edge cases; only RayStation confirmed from accessible text. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100413"},
      {"type": "Peer-reviewed Publication", "description": "Chen L et al. Validation of a deep-learning segmentation model for adult and pediatric head and neck radiotherapy in different patient positions. Phys Imaging Radiat Oncol 2024. Validation of the RSL H&N model in adult and paediatric patients in several positions; geometric, dose and qualitative endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100527"},
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

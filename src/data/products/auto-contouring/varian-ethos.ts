
import { ProductDetails } from "@/types/productDetails";

export const VARIAN_ETHOS_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-ethos-ai-segmentation",
    name: "Ethos AI Segmentation",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://www.varian.com/ethos",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-ethos.ts",
    description: "AI-driven auto-segmentation integrated into the Ethos adaptive radiotherapy system. Uses deep learning algorithms for contouring organs at risk and target volumes, enabling online adaptive radiotherapy workflows with AI-generated contours available in minutes at the treatment console.",
    features: [
      "Deep learning-based auto-segmentation",
      "Online adaptive radiotherapy workflow",
      "CBCT-based daily re-contouring",
      "Multiple anatomical site support (head & neck, pelvis, thorax, abdomen, breast)",
      "Integrated into Ethos treatment management and planning"
    ],
    category: "Auto-Contouring",
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/varian.jpg",
    website: "https://www.varian.com/ethos",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Thorax", "Abdomen", "Breast"],
    modality: ["CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI segmentation deep learning algorithms for OAR and target contouring",
      "Online adaptive radiotherapy with daily AI-driven re-contouring",
      "Support for multiple anatomical sites",
      "Integrated treatment planning with AI-generated contours",
      "Direct CBCT dose calculation support",
      "Guided adaptive workflow with AI-assisted decision making"
    ],
    supportedStructures: [
      // Source: Finnegan et al. JACMP 2025 (doi:10.1002/acm2.70067, Figure 1 / Table S1).
      // 45 unique OARs evaluated; the subset reproduced in the article text is listed below
      // with the (unverified) suffix per the structure-status convention. Pending company
      // representative confirmation of the full Ethos 2.0 model card structure set.

      // Pelvis
      "Pelvis: Bladder (unverified)",
      "Pelvis: Rectum (unverified)",
      "Pelvis: Femur_Head_L (unverified)",
      "Pelvis: Femur_Head_R (unverified)",
      "Pelvis: Bowel_Small (unverified)",
      "Pelvis: Colon_Sigmoid (unverified)",
      "Pelvis: Bowel_Bag (unverified)",

      // Abdomen
      "Abdomen: Liver (unverified)",
      "Abdomen: Kidney_L (unverified)",
      "Abdomen: Kidney_R (unverified)",
      "Abdomen: Stomach (unverified)",
      "Abdomen: Duodenum (unverified)",
      "Abdomen: Pancreas (unverified)",
      "Abdomen: Spleen (unverified)",

      // Thorax
      "Thorax: Lung_L (unverified)",
      "Thorax: Lung_R (unverified)",
      "Thorax: Heart (unverified)",
      "Thorax: Esophagus (unverified)",
      "Thorax: Trachea (unverified)",
      "Thorax: SpinalCord (unverified)",
      "Thorax: Bronchial_Tree (unverified)",
      "Thorax: Chestwall (unverified)",
      "Thorax: Breast_L (unverified)",
      "Thorax: Breast_R (unverified)",
      "Thorax: Carina (unverified)",

      // Head & Neck
      "Head & Neck: Brain (unverified)",
      "Head & Neck: Brainstem (unverified)",
      "Head & Neck: Bone_Mandible (unverified)",
      "Head & Neck: Glnd_Thyroid (unverified)",
      "Head & Neck: Parotid_L (unverified)",
      "Head & Neck: Parotid_R (unverified)",
      "Head & Neck: Glnd_Submand_L (unverified)",
      "Head & Neck: Glnd_Submand_R (unverified)",
      "Head & Neck: OpticNrv_L (unverified)",
      "Head & Neck: OpticNrv_R (unverified)",
      "Head & Neck: OpticChiasm (unverified)",
      "Head & Neck: Cochlea_L (unverified)",
      "Head & Neck: Cochlea_R (unverified)",
      "Head & Neck: Larynx (unverified)",
      "Head & Neck: Musc_Constrict (unverified)",

      // External
      "External: Body (unverified)"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CBCT", "CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Adapted treatment plans"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM-RTPLAN"]
    },
    technology: {
      integration: ["Ethos Treatment Management", "Ethos Treatment Planning"],
      deployment: ["Integrated with Ethos linac"],
      triggerForAnalysis: "Automatic (at treatment console during adaptive workflow)",
      processingTime: "Minutes per fraction (within 15-minute adaptive workflow)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K232923",
        productCode: "IYE",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2024-04-30",
        notes: "K232923 (Ethos Treatment Management 3.0 / Ethos Treatment Planning 2.0, Apr 2024). Prior AI Segmentation standalone clearances: K211881 (Sep 2021), K203469 (Dec 2020). HyperSight imaging clearance: K233466 (Feb 2024). Ethos 2.0 Therapy System received additional FDA 510(k) clearance announced Feb 18, 2026 (specific K-number not yet public in FDA database at time of audit)."
      },
      intendedUseStatement: "Ethos Treatment Management is indicated for use in managing and monitoring radiation therapy treatment plans and sessions; Ethos Treatment Planning is indicated for use in generating and modifying radiation therapy treatment plans. Includes AI segmentation deep learning algorithms for contouring with additional anatomical site support."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E3",
    clinicalImpact: "L4",
    legacyClinicalImpact: "I3",
    evidenceRigorNotes: "Multi-site multi-institutional CBCT online-adaptive RT literature (Archambault 2020, Sibolt 2021, McCulloch 2021, Prunaretty 2024, Kawula 2025, Finnegan 2025). Sufficient breadth and independence for E3.",
    clinicalImpactNotes: "AI segmentation enables online adaptive radiotherapy, allowing daily re-contouring and plan adaptation at the treatment console. Demonstrated dosimetric benefits in prostate, head & neck, and other sites.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {"type": "Peer-reviewed Publication", "description": "Byrne M et al. Varian ethos online adaptive radiotherapy for prostate cancer: Early results of contouring accuracy, treatment plan quality, and treatment time. J Appl Clin Med Phys 2022. Single-centre early Ethos prostate results including AI contouring accuracy. HAIR label Eclipse corrected to Ethos. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1002/acm2.13479"},
      {"type": "Peer-reviewed Publication", "description": "Schmidt R et al. Feasibility of automated AI-based contouring and stable radiomic feature assessment by HyperSight-CBCT Imaging for adaptive high-precision radiotherapy of prostate cancer. Sci Rep 2026. Single-centre feasibility of Ethos AI contouring on HyperSight CBCT with radiomic stability. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1038/s41598-026-46359-3"},
      {
        type: "Peer-reviewed Publication",
        description: "Byrne et al. Feasibility of Ethos generated treatment plans for head and neck cancer patients. Tech Innov Patient Support Radiat Oncol 2023",
        link: "https://doi.org/10.1016/j.tipsro.2023.100216"
      },
      {
        type: "Peer-reviewed Publication",
        description: "AI-driven online adaptive radiotherapy in prostate cancer treatment. Radiat Oncol 2025",
        link: "https://doi.org/10.1186/s13014-025-02697-6"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Finnegan RN, Quinn A, Horsley P, et al. Geometric and dosimetric evaluation of a commercial AI auto-contouring tool on multiple anatomical sites in CT scans. J Appl Clin Med Phys 2025;26:e70067 — first published assessment of Ethos 2.0 AI auto-contouring across 223 patients and 45 unique structures (pelvis, abdomen, thorax, head & neck).",
        link: "https://doi.org/10.1002/acm2.70067"
      },
      {
        type: "Clinical Trial",
        description: "NCT06116019 — Online Adaptive Radiotherapy Using Ethos (prospective, ongoing)",
        link: "https://clinicaltrials.gov/study/NCT06116019"
      }
    ],
    trainingData: {
      datasetSize: "Not publicly disclosed",
      datasetSources: ["Proprietary clinical datasets"],
      demographics: "Not publicly disclosed",
      scannerModels: ["Not publicly disclosed"],
      disclosureLevel: "minimal"
    },
    evaluationData: {
      description: "FDA 510(k) validation demonstrated AI segmentation contours required minor or no adjustments in 80% of cases using DICE metrics. Multiple independent publications confirmed clinical feasibility across head & neck, pelvis, and thorax.",
      studyDesign: "Software verification and validation; no clinical trials for FDA submission; multiple independent clinical evaluations published",
      primaryEndpoint: "DICE similarity coefficient, clinical acceptability of AI contours",
      results: "80% of AI-generated contours required minor or no adjustments per FDA validation",
      source: "FDA 510(k) summary (K232923) and published literature",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232923.pdf"
    },
    categoryEvidence: {
      "Auto-Contouring": {
        usesAI: true,
        notes: "Ethos AI Segmentation is the deep-learning OAR contouring module of the Ethos adaptive workflow. Strongest evidence: Finnegan et al. JACMP 2025 (223 patients, 45 structures across 4 sites).",
        evaluationData: {
          studyDesign: "Independent geometric/dosimetric evaluation across multiple anatomical sites",
          primaryEndpoint: "DICE, surface DSC, and dosimetric impact across 45 structures",
          results: "Finnegan 2025: clinically acceptable contours across pelvis/abdomen/thorax/H&N in 223 patients; FDA 510(k): 80% of contours required minor or no edits.",
          description: "Auto-contouring-specific evidence centerd on Finnegan et al. JACMP 2025 (multi-site, 45 structures) and the K232923 FDA validation.",
          source: "Finnegan et al. J Appl Clin Med Phys 2025; FDA 510(k) K232923",
          sourceUrl: "https://doi.org/10.1002/acm2.70067",
        },
        evidenceRigor: "E2",
        clinicalImpact: "I2",
        clinicalImpactNotes: "Geometric + dosimetric efficacy across multiple sites; enables daily online adaptation at the console.",
      },
      "Treatment Planning": {
        usesAI: true,
        notes: "Ethos Treatment Planning consumes the AI-generated contours to produce daily adapted plans within a 15-minute workflow. Planning-specific evidence: Byrne H&N feasibility (TIPSRO 2023), Preziosi prostate adaptive workflow (Radiat Oncol 2025), Icon case study and ongoing NCT06116019.",
        evaluationData: {
          studyDesign: "Feasibility, observational and ongoing prospective evidence",
          primaryEndpoint: "Plan quality and on-line adaptive feasibility",
          results: "Byrne 2023: Ethos-generated H&N plans deemed clinically acceptable; Preziosi 2025: dosimetric advantage of daily adapted prostate plans; NCT06116019 ongoing.",
          description: "Planning-arm evidence is feasibility-level and accumulating toward outcome data via NCT06116019.",
          source: "Byrne et al. TIPSRO 2023; Preziosi et al. Radiat Oncol 2025; NCT06116019",
          sourceUrl: "https://doi.org/10.1016/j.tipsro.2023.100216",
        },
        evidenceRigor: "E2",
        evidenceRigorNotes: "Multiple vendor-independent feasibility publications plus an ongoing prospective trial; no outcome data yet.",
        clinicalImpact: "I2",
        clinicalImpactNotes: "Demonstrated dosimetric benefits of online adaptation in prostate, H&N and other sites; outcome data pending.",
      },
    },
    releaseDate: "2024-04-30",
    lastUpdated: "2026-06-13",
    keyPapers: [
      {"doi": "10.1016/j.canrad.2025.104647", "title": "First experiences with an adaptive pelvic radiotherapy system: Analysis of treatment times and learning curve", "authors": "Benzaquen D et al.", "journal": "Cancer/Radiothérapie", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective analysis of Ethos adaptive workflow times; AI contouring integral but not directly evaluated for accuracy. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.adro.2023.101319", "title": "In Silico Analysis of Adjuvant Head and Neck Online Adaptive Radiation Therapy", "authors": "All S et al.", "journal": "Advances in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC full text PMC10801641), provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective in silico study using Ethos emulator's AI contour propagation, but emphasis on dosimetric plan comparison not contour accuracy. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.3390/cancers17091462", "title": "Clinical Practice-Based Failure Modes and Root Cause Analysis of Cone Beam CT-Guided Online Adaptive Radiotherapy of the Pelvis", "authors": "Zheng D et al.", "journal": "Cancers", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC full text PMC12071076), provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective review of 1000+ Ethos oART sessions, explicitly describing AI-based contouring and workflow failures.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.adro.2024.101510", "title": "Daily Online Adaptive Radiation Therapy of Postoperative Endometrial and Cervical Cancer With PTV Margin Reduction to 5 mm: Dosimetric Outcomes, Acute Toxicity, and First Clinical Experience", "authors": "Wang G et al.", "journal": "Advances in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Prospective single-center Ethos oART use, reporting contour edit rates and dosimetric/toxicity outcomes. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1016/j.adro.2023.101399", "title": "Enhancing Safety in AI-Driven Cone Beam CT-based Online Adaptive Radiation Therapy: Development and Implementation of an Interdisciplinary Workflow", "authors": "Wang YF et al.", "journal": "Advances in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center clinical use of Ethos AI-driven OART; safety workflow study, not accuracy validation. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1186/s13014-024-02526-2", "title": "Minimizing human interference in an online fully automated daily adaptive radiotherapy workflow for bladder cancer", "authors": "Azzarouali S et al.", "journal": "Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective simulation study comparing AI-generated contours vs clinical, dosimetric impact assessed.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.adro.2023.101258", "title": "“Scan-(pre)Plan-Treat” Workflow for Bone Metastases Using the Ethos Therapy System: A Single-Center, In Silico Experience", "authors": "Oldenburger E et al.", "journal": "Advances in Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center in silico evaluation of Ethos adaptive AI contouring/planning accuracy and workflow duration.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1093/jrr/rrad103", "title": "Cone-beam computed tomography-guided online adaptive radiotherapy for pharyngeal cancer with whole neck irradiation: dose-volume histogram analysis between adapted and scheduled plans", "authors": "Uehara T et al.", "journal": "Journal of Radiation Research", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective CBCT-based simulation study evaluating Ethos adaptive plans vs scheduled plans.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.3390/curroncol32020060", "title": "Evaluating CBCT-Guided Adaptive Radiotherapy for Pancreatic Cancer Using Synthetic CBCT Data", "authors": "Olberg S et al.", "journal": "Current Oncology", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective in silico study using Ethos emulator and auto-contouring on synthetic CBCTs. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.ctro.2024.100796", "title": "Clinical evaluation of a deep learning CBCT auto-segmentation software for prostate adaptive radiation therapy", "authors": "Radici L et al.", "journal": "Clinical and Translational Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective Dice/COM validation of CBCT auto-segmentation vs consensus contours; product identity inferred. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2024.100687", "title": "Evaluation of artificial intelligence-based autosegmentation for a high-performance cone-beam computed tomography imaging system in the pelvic region", "authors": "Sluijter JH et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2025", "evidenceRigor": "E3", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center prospective clinical study directly evaluating Ethos AI autosegmentation workflow impact and accuracy.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.3389/fonc.2026.1729810", "title": "Daily artificial intelligence-assisted adaptive small margin radiotherapy during trimodal therapy of muscle-invasive bladder cancer", "authors": "Blumenfeld P et al.", "journal": "Front. Oncol.", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L4", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective series of AI-assisted adaptive RT, likely Ethos, with clinical/dosimetric outcomes but no explicit product name. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2024.100640", "title": "Artificial intelligence-generated targets and inter-observer variation in online adaptive radiotherapy of bladder cancer", "authors": "Åström LM et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study evaluating AI-generated bladder contours vs ground truth, likely Ethos platform. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2025.100896", "title": "Implementing a fully computed tomography-free online adaptive palliative radiotherapy: a one-visit workflow", "authors": "Jaglal AT et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center prospective study using Ethos AI auto-segmentation clinically, demonstrating workflow time efficiency.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1016/j.phro.2024.100546", "title": "The accuracy of artificial intelligence deformed nodal structures in cervical online cone-beam-based adaptive radiotherapy", "authors": "Wang E et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective analysis of AI-deformed nodal contours in cone-beam adaptive RT, consistent with Ethos platform use. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1186/s13014-024-02398-6", "title": "Prospects for daily online adaptive radiotherapy for cervical cancer: Auto-contouring evaluation and dosimetric outcomes", "authors": "Zhang Y et al.", "journal": "Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center prospective trial directly uses Ethos auto-contouring, assessing geometric accuracy and dosimetric outcomes.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1016/j.prro.2021.12.017", "title": "Evaluation of Auto-Contouring and Dose Distributions for Online Adaptive Radiation Therapy of Patients With Locally Advanced Lung Cancers", "authors": "Mao W et al.", "journal": "Practical Radiation Oncology", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study evaluating Ethos auto-contouring accuracy and dose for lung ART.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.7759/cureus.9660", "title": "Initial Evaluation of a Novel Cone-Beam CT-Based Semi-Automated Online Adaptive Radiotherapy System for Head and Neck Cancer Treatment – A Timing and Automation Quality Study", "authors": "Yoon SW et al.", "journal": "Cureus", "year": "2020", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study testing Ethos auto-contouring/planning accuracy, timing, dosimetric impact for H&N.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.7759/cureus.106211", "title": "Cone Beam Computed Tomography (CBCT)-Based Online Adaptive Radiotherapy for Patients With Metal Implants: An Institutional Experience", "authors": "Li F et al.", "journal": "Cureus", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study using Ethos AI segmentation, comparing DSC/MHD and contouring time, includes Radformation-affiliated author.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.ctro.2023.100596", "title": "Implementing cone-beam computed tomography-guided online adaptive radiotherapy in cervical cancer", "authors": "Shelley CE et al.", "journal": "Clinical and Translational Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center clinical feasibility study using Ethos AI segmentation; workflow timing, dosimetric evaluation, no outcome data. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1002/acm2.13702", "title": "Robustness and reproducibility of an artificial intelligence‐assisted online segmentation and adaptive planning process for online adaptive radiation therapy", "authors": "Chapman JW et al.", "journal": "J Applied Clin Med Phys", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-institution phantom study (two centers) quantifying Dice/MSD and dosimetric consistency of Ethos auto-segmentation.", "vendorIndependent": true, "multiCenter": true, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1186/s12885-026-15768-y", "title": "Clinical experience with an online adaptive radiotherapy for prostate cancer: successful treatment time optimization", "authors": "Malygina H et al.", "journal": "BMC Cancer", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective analysis of Ethos auto-contouring impact on adaptive RT session time.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.3389/fonc.2023.1274082", "title": "Feasibility study of adaptive radiotherapy with Ethos for breast cancer", "authors": "Galand A et al.", "journal": "Front. Oncol.", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective emulator study validating Ethos AI contouring accuracy and adaptive plan quality for breast cancer.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2026.101037", "title": "Evaluating artificial intelligence versus human-generated contours in the thorax", "authors": "Icht O et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study comparing AI vs manual contours, geometric/dose metrics plus blinded clinical acceptability review.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1002/acm2.13783", "title": "Dosimetric and feasibility evaluation of a CBCT‐based daily adaptive radiotherapy protocol for locally advanced cervical cancer", "authors": "Branco D et al.", "journal": "J Applied Clin Med Phys", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective emulator study using Ethos AI segmentation with editing time and dosimetric endpoints. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.adro.2025.101959", "title": "A Comparative, Multiobserver Analysis of Nodal Contouring Methods in Pelvic Online Cone Beam-Based Adaptive Radiation Therapy", "authors": "Wang E et al.", "journal": "Advances in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective comparison of Ethos AID autosegmentation accuracy vs benchmark contours using DSC/HD95 metrics.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1186/s13014-023-02348-8", "title": "Online adaptive radiotherapy for bladder cancer using a simultaneous integrated boost and fiducial markers", "authors": "Azzarouali S et al.", "journal": "Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center prospective feasibility study using Ethos AI segmentation for daily oART with manual correction rates reported.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.3390/cancers16061210", "title": "Clinical Workflow of Cone Beam Computer Tomography-Based Daily Online Adaptive Radiotherapy with Offline Magnetic Resonance Guidance: The Modular Adaptive Radiotherapy System (MARS)", "authors": "Kim JY et al.", "journal": "Cancers", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center prospective workflow study of Ethos oART with ML segmentation, timing and plan adaptation outcomes reported. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1002/acm2.14587", "title": "Body contour adaptation for weight‐loss and bolus for head and neck radiotherapy on Ethos version 2.0 and HyperSight: Synthetic CT versus direct calculation", "authors": "Yashayaeva A et al.", "journal": "J Applied Clin Med Phys", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center phantom study testing Ethos auto-contouring accuracy vs manual, technical/dosimetric evaluation. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1002/acm2.13479", "title": "Varian ethos online adaptive radiotherapy for prostate cancer: Early results of contouring accuracy, treatment plan quality, and treatment time", "authors": "Byrne M et al.", "journal": "J Appl Clin Med Phys", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "L4", "legacyClinicalImpact": "I2", "rationale": "Single-centre early Ethos prostate results including AI contouring accuracy. HAIR label Eclipse corrected to Ethos.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1038/s41598-026-46359-3", "title": "Feasibility of automated AI-based contouring and stable radiomic feature assessment by HyperSight-CBCT Imaging for adaptive high-precision radiotherapy of prostate cancer", "authors": "Schmidt R et al.", "journal": "Sci Rep", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "legacyClinicalImpact": "I1", "rationale": "Single-centre feasibility of Ethos AI contouring on HyperSight CBCT with radiomic stability.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi":"10.1002/acm2.13399","title":"Prospects for daily online adaptive radiotherapy via ethos for prostate cancer patients without nodal involvement using unedited CBCT auto‐segmentation","authors":"Moazzezi M et al.","journal":"J Applied Clin Med Phys","year":"2021","evidenceRigor":"E1","clinicalImpact":"L3", "legacyClinicalImpact": "I1","rationale":"Single-centre technical evaluation of the online-adaptive segmentation step.","vendorIndependent":true},
    {"doi":"10.1016/j.phro.2020.12.004","title":"First clinical experience with Ethos","authors":"Sibolt P et al.","journal":"Phys Imag Radiat Oncol","year":"2021","evidenceRigor":"E3","clinicalImpact":"L4", "legacyClinicalImpact": "I3","rationale":"Prospective first clinical experience where AI contours drive online adaptive plan selection.","vendorIndependent":true,"prospective":true},
    {"doi":"10.3389/fonc.2024.1507806","title":"Ethos AI segmentation multi-site evaluation","authors":"Prunaretty A et al.","journal":"Front Oncol","year":"2024","evidenceRigor":"E2","clinicalImpact":"L3", "legacyClinicalImpact": "I1","rationale":"Multi-site evaluation of the segmentation step; geometric endpoints.","vendorIndependent":true,"multiCenter":true,"externalValidation":true},
    {"doi":"10.1002/acm2.70067","title":"Geometric and dosimetric evaluation of a commercial AI auto‐contouring tool on multiple anatomical sites in CT scans","authors":"Finnegan RN et al.","journal":"J Applied Clin Med Phys","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single-centre dosimetric evaluation of adaptive contours.","vendorIndependent":true},
    {"doi": "10.1016/j.tipsro.2023.100216", "title": "Investigating the feasibility of using Ethos generated treatment plans for head and neck cancer patients", "authors": "El-qmache A et al.", "journal": "Technical Innovations &amp; Patient Support in Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Single-centre feasibility study of Ethos-generated head-and-neck plans built on AI segmentation, reporting plan quality.", "vendorIndependent": true}
  ],
    lastRevised: "2026-11-19",
    source: "FDA 510(k) K232923; vendor website; press releases; peer-reviewed literature"
  }
];

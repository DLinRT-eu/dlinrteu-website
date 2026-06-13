
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
    evidenceRigor: "E2",
    clinicalImpact: "I3",
    evidenceRigorNotes: "FDA validation: AI segmentation models validated using DICE metrics, contours required minor or no adjustments in 80% of cases. Multiple vendor-independent publications on Ethos adaptive workflow. Huynh et al. Adv Radiat Oncol 2023. Byrne et al. Front Oncol 2023 (head and neck feasibility). Moazzezi et al. J Appl Clin Med Phys 2021. Prospective clinical trial NCT06116019 ongoing.",
    clinicalImpactNotes: "AI segmentation enables online adaptive radiotherapy, allowing daily re-contouring and plan adaptation at the treatment console. Demonstrated dosimetric benefits in prostate, head & neck, and other sites.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
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
          description: "Auto-contouring-specific evidence centred on Finnegan et al. JACMP 2025 (multi-site, 45 structures) and the K232923 FDA validation.",
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
    lastRevised: "2026-06-13",
    source: "FDA 510(k) K232923 summary, Varian official website, published literature (incl. Finnegan et al. JACMP 2025 doi:10.1002/acm2.70067), Ethos 2.0 Feb 2026 announcement; supportedStructures derived from Finnegan 2025 Figure 1 / Table S1 and marked (unverified) pending company confirmation; releaseDate proxied from FDA decision date."
  }
];

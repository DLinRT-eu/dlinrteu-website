import { ProductDetails } from "@/types/productDetails";
import { ADAPTBOX_ALL_STRUCTURES } from "../auto-contouring/therapanacea-structures";

export const THERAPANACEA_ADAPTBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-adaptbox",
    trainingData: {
        description: "The model supports synthetic CT generation and dose computation for Head & Neck, Breast/Thorax, and Pelvis (male) anatomies.",
        demographics: "Adult cancer patients (18+ years of age).",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
        source: "FDA 510(k) summary K253091",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        description: "Independent validation of cumulative dose reconstruction over 800 fractions and multi-center dosimetric studies support daily dose tracking and OAR deviation monitoring for offline replanning decisions. Processing time for sCT generation is typically 2–3 minutes.",
        studyDesign: "Independent peer-reviewed clinical validation and multi-center retrospective study",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        source: "FDA 510(k) summary K253091"
    },
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: true,
        notes: "AdaptBox sCT generation from CBCT is the FDA-cleared image-synthesis component (K253091). Cross-check 2026-06-15: Prunaretty et al. Cancers 2026 (DOI 10.3390/cancers18111826, 'Implementation of an AI-Driven Workflow for Daily Dose Reconstruction in Prostate Cancer Radiotherapy') is verified to evaluate an ART-Plan/AdaptBox-style CBCT→sCT workflow for prostate; scope is prostate-specific and does not cover the H&N or Breast/Thorax FDA-cleared anatomies. MESCAL 2026 (Cusumano, Maspero et al. Radiother Oncol, DOI 10.1016/j.radonc.2026.111530) is an MRI-only commissioning benchmark, not directly applicable to CBCT→sCT but included as indirect-comparative context for sCT acceptance levels.",
        evaluationData: {
          studyDesign: "Independent peer-reviewed cumulative-dose reconstruction workflow study (prostate) + multi-center dosimetric study",
          primaryEndpoint: "Dosimetric accuracy of sCT-based dose reconstruction vs planning CT",
          results: "Prunaretty et al. Cancers 2026 (prostate, DOI 10.3390/cancers18111826): cumulative dose reconstruction across multiple fractions consistent with planning CT for prostate. Multi-center dosimetric agreement reported (Frontiers in Oncology 2026). Evidence is direct for the prostate anatomy; H&N and Breast/Thorax remain less well characterised by peer-reviewed publications.",
          description: "Synthetic-CT validation of the AdaptBox CBCT→sCT pipeline; strongest peer-reviewed evidence is for the male pelvis/prostate anatomy.",
          source: "Prunaretty et al. Cancers 2026 (DOI 10.3390/cancers18111826, verified 2026-06-15); Frontiers in Oncology 2026; FDA 510(k) K253091; indirect-comparative MESCAL 2026 (DOI 10.1016/j.radonc.2026.111530)",
          sourceUrl: "https://doi.org/10.3390/cancers18111826",
        },
        evidenceRigor: "E2",
        evidenceRigorNotes: "E2 retained based on independent peer-reviewed prostate evaluation (Prunaretty 2026, Cancers, DOI verified 2026-06-15). Vendor-assisted multi-center support from Frontiers in Oncology 2026. H&N and Breast/Thorax anatomies have FDA clearance but limited independent peer-reviewed validation. MESCAL 2026 kept separately as indirect-comparative.",
        clinicalImpact: "I1",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes: "OAR auto-contouring on augmented CBCT/sCT is bundled in AdaptBox; target contours are propagated from planning CT via registration. No standalone peer-reviewed validation of the OAR contouring module on synthetic CBCT located.",
        evaluationData: {
          studyDesign: "Software V&V (FDA 510(k)); no standalone peer-reviewed contouring validation located",
          primaryEndpoint: "Geometric accuracy of OAR contours on augmented CBCT (not publicly disclosed)",
          results: "Not publicly disclosed",
          description: "OAR contouring validation is bundled into the K253091 submission for the offline adaptive workflow; module-specific peer-reviewed evidence is not yet available.",
          source: "FDA 510(k) K253091",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
        },
        evidenceRigor: "E0",
        evidenceRigorNotes: "No peer-reviewed publication located specifically for the OAR contouring module. PubMed searched 2026-06-13.",
        clinicalImpact: "I0",
      },
    },
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea-adaptbox.ts",
    description: "AI-powered offline adaptive radiotherapy module within the ART-Plan+ platform that generates synthetic/augmented CT images from daily CBCTs, supports organs-at-risk (OAR) delineation, daily cumulative dose tracking, and assisted off-line replanning decision support.",
    features: [
      "AI-based synthetic/augmented CT generation from daily CBCT images",
      "Organs-at-risk (OAR) delineation on augmented CBCT / synthetic CT images",
      "Dose computation on reference planning CT and synthetic/augmented CBCT images",
      "Daily dose tracking and comparison of daily cumulative dose/volume metrics",
      "Assisted CBCT-based off-line adaptation and replanning decision support",
      "Vendor-reported workflow integration compatible with all TPS and Linac providers"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
    anatomicalLocation: ["Head & Neck", "Breast", "Thorax", "Pelvis"],
    modality: ["CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Breast Cancer", "Thoracic Cancers", "Prostate Cancer"],
    keyFeatures: [
      "Generation of synthetic/augmented CT (sCT) images from daily CBCT",
      "Dose computation on synthetic/augmented CT images for daily dose tracking",
      "Automatic OAR contouring on generated augmented CBCT/synthetic CT images",
      "Propagation of target contours from planning CT using registration tools within ART-Plan+",
      "Comparison of planning and daily dose/volume metrics to support replanning decisions",
      "Assisted off-line adaptive radiotherapy workflow"
    ],
    technicalSpecifications: {
      population: "Adult cancer patients. FDA-cleared AdaptBox-supported anatomies include Head & Neck, Breast/Thorax, and Pelvis (male).",
      input: [
        "CBCT scans",
        "Planning CT images",
        "RT Structure Sets",
        "RT Plan data"
      ],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN"],
      output: [
        "Synthetic/augmented CT images generated from CBCT",
        "Structure sets (OAR contours)",
        "Dose computation results",
        "Cumulative dose/volume metrics",
        "Replanning decision-support reports"
      ],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTDOSE"]
    },
    technology: {
      integration: [
        "DICOM-based workflow integration",
        "TPS/PACS workflow integration",
        "ART-Plan+ ecosystem integration (Annotations and SmartFuse modules)",
        "Vendor-reported compatibility with all TPS and Linac providers"
      ],
      deployment: ["On-premises", "Cloud-based"
      ],
      triggerForAnalysis: "Manual or automated batch workflow; exact automation and protocol configuration should be confirmed with the vendor",
      processingTime: "Processing time varies by anatomy, hardware, and workflow load. Automatic contouring and sCT generation typically take 2–3 minutes under optimal conditions; manual review and QA by clinical staff are required before clinical action."
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)",
        notes: "Therapanacea states that ART-Plan is CE-marked Class IIb under GMED 0459 (vendor-reported; not restated on the public Technical Information 3.2 page). All modules may not be commercially available in all regional markets."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K253091",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-12-23",
        notes: "FDA clearance K253091 clears ART-Plan+ v3.1.0 including the AdaptBox module. AdaptBox allows synthetic CT generation from CBCT, dose computation, and off-line adaptive decision-making for Head & Neck, Breast/Thorax, and Pelvis (male). Prior relevant FDA clearances include K242822 (v3.0.0, Feb 2025) and K234068 (v2.2.0, Apr 2024)."
      },
      intendedUseStatement: "AdaptBox allows generation of synthetic-CT from CBCT images, dose computation on CT images for external beam irradiation with photon beams and assisted CBCT-based off-line adaptation decision-making for the following anatomies: Head & Neck, Breast / Thorax, Pelvis (male). ART-Plan+ is not intended for patients less than 18 years of age. (Source: FDA 510(k) K253091 Summary)"
    },
    supportedStructures: ADAPTBOX_ALL_STRUCTURES,
    structuresProvenance: {
      source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ref ART-BRO-AN-07EU, March 2026), Syn-CT model pages",
      sourceUrl: "https://therapanacea.com/products",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05",
      notes: "Three synthetic-CT models itemised by the vendor in v3.2.0, each prefixed in the structure list: Pelvis Male (Syn-CT) 7 OARs + 2 ROIs; Thorax/Breast (Syn-CT) 12 OARs; Head & Neck (Syn-CT) 26 OARs. Bilateral structures are split into _L/_R so totals match the vendor counts. No separate CBCT-only structure list is published — do not add one. Re-verified 2026-09-05 against brochure v3.2.0: the syn-CT model set and counts are unchanged; the vendor products page lists only the CT/MR models, so the brochure remains the source for these."
    },

    limitations: [
      "Indicated for adult patients only; ART-Plan+ is not intended for patients less than 18 years of age (FDA K253091 IFU).",
      "CBCT image quality is critical: low-resolution, noisy or lossily compressed CBCTs can produce incorrect synthetic CTs and contours; user must verify primary image quality before processing (Therapanacea Technical Information, 2026-06-16).",
      "FOV augmentation: the AI-augmented portion of the synthetic CT is generated by duplicating slices from the planning CT after rigid registration; contours and dose computed on the augmented region are not reliable and must be reviewed manually (Therapanacea Technical Information, 2026-06-16).",
      "User must ensure that the RTPlan and RTStruct sent for AdaptBox analysis correspond to the ones used for patient treatment (Therapanacea Technical Information, 2026-06-16).",
      "Results are produced on a synthetic CT and on contours that are not validated; clinical review of all synCT, contours and dose is required before any patient-management decision.",
      "Importing data with missing required DICOM tags, corrupted volumes, missing slices, or incorrect Patient Position / Sex attributes will cause import to fail or generate inappropriate contours.",
      "Independent peer-reviewed evidence is strongest for the male pelvis / prostate workflow; H&N and Breast/Thorax CBCT models are FDA-cleared but have limited independent peer-reviewed validation to date."
    ],
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales through vendor", "Distribution partners"],
      availability: "Not available in all markets. Module availability varies by country and regional regulatory status."
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.0",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    version: "3.2.0",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-25",
    keyPapers: [
      {"doi":"10.3390/cancers18111826","pmid":"42279408","title":"Implementation of an AI-driven workflow for daily dose reconstruction in prostate cancer radiotherapy","authors":"Prunaretty J, Baudouin T, Riou O, Azria D, et al.","journal":"Cancers","year":"2026","link":"https://doi.org/10.3390/cancers18111826","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Names AdaptBox v2.3.2 and evaluates daily delivered dose in 20 prostate patients — a workflow-level implementation.","vendorIndependent":false,"multiCenter":false,"prospective":false,"externalValidation":false},
      {"doi":"10.1016/j.radonc.2026.111530","title":"Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative","authors":"Cusumano D, Maspero M et al.","journal":"Radiotherapy and Oncology","year":"2026","rationale":"Indirect-comparative commissioning benchmark; unscored."},
      {"doi":"10.3389/fonc.2026.1756153","pmid":"41800047","title":"Self-learning GAN based synthetic CT generation: unlocking CBCT-based adaptive radiotherapy","authors":"Prunaretty J, Colombo L, Romdhani S, Teboul O, et al.","journal":"Frontiers in Oncology","year":"2026","link":"https://doi.org/10.3389/fonc.2026.1756153","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Multi-centre CBCT-to-sCT models across pelvis, head and neck, lung and breast; clinically evaluated but vendor-developed.","vendorIndependent":false,"multiCenter":true,"prospective":false,"externalValidation":true,"multiNational":true}
    ],
    source: "Therapanacea official AdaptBox and ART-Plan+ technical information portal; FDA 510(k) database entries K253091, K242822, and K234068; independent peer-reviewed literature (Prunaretty et al., Cancers 2026 DOI 10.3390/cancers18111826 verified 2026-06-15; Frontiers in Oncology 2026); indirect-comparative MESCAL 2026 (Cusumano, Maspero et al. Radiother Oncol, DOI 10.1016/j.radonc.2026.111530). Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.0, UDI (01)03770019940020(8012) v3.2.0(11)260525; https://therapanacea.com/technical-information-2, retrieved 2026-07-30).; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)",
    evidenceRigor: "E2",
    evidenceRigorNotes: "E2 retained 2026-06-15 after cross-check: Prunaretty et al. Cancers 2026 (DOI 10.3390/cancers18111826) verified as a prostate-specific AI-driven daily dose-reconstruction workflow study consistent with the AdaptBox pipeline; supported by a vendor-assisted multi-center dosimetric study in Frontiers in Oncology (2026). H&N and Breast/Thorax FDA-cleared anatomies have limited independent peer-reviewed validation. MESCAL 2026 kept separately as indirect-comparative.",
    clinicalImpact: "I2",
    clinicalImpactNotes: "Upgraded from I0 to I1. Evidence supports daily dose reconstruction accuracy and effective offline cumulative tracking of OAR deviation, supporting clinical replanning decisions. High-level evidence regarding long-term clinical outcome benefits, toxicity reduction, or randomized disease control is not yet available. 2026-08-25 Wave 5: impact raised I1 → I2, set by Prunaretty et al., Cancers 2026 (doi 10.3390/cancers18111826), which names AdaptBox v2.3.2 and reports a workflow-level daily dose-reconstruction implementation in 20 prostate patients.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k). The presence of both technical sCT validation and independent clinical workflow tracking supports integration. However, because image synthetic and calculation processes are sensitive to bad CBCT quality, standard local commissioning, intensive initial QA, and independent physical/clinical review of contours remain recommended."
  }
];

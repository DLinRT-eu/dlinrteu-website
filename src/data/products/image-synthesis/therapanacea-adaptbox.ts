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
        notes: "AdaptBox sCT generation from CBCT is the FDA-cleared image-synthesis component. The scored study is Prunaretty et al., Cancers 2026, male pelvis only, per fraction, one centre. Frontiers in Oncology 2026 does not name AdaptBox. MESCAL is MRI-only and is not used as AdaptBox evidence.",
        evaluationData: {
          studyDesign: "Single-centre retrospective per-fraction dose comparison in 20 prostate patients. No TheraPanacea author.",
          primaryEndpoint: "Per-fraction dose on synthetic CT versus the planning CT",
          results: "Cancers 2026 compared dose fraction by fraction. It is not a cumulative multi-centre validation. In two patients, bladder dose deviations were automatic-contour errors. The FDA file reports pass/fail only.",
          description: "Strongest peer-reviewed evidence is the male pelvis. Head and neck, breast and thorax are in the FDA indication and have less published dose evidence.",
          source: "Prunaretty et al., Cancers 2026 (doi:10.3390/cancers18111826); FDA 510(k) K253091 for the labelled function",
          sourceUrl: "https://doi.org/10.3390/cancers18111826",
        },
        evidenceRigor: "E1",
        evidenceRigorNotes: "E1 from Cancers 2026. Frontiers 2026 is not a named AdaptBox evaluation. MESCAL is not CBCT evidence.",
        clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes: "OAR auto-contouring on augmented CBCT/sCT is bundled in AdaptBox. Target contours are propagated from the planning CT. Cancers 2026 found bladder dose deviations from automatic contours in two patients. There is no DSC study of this contour module.",
        evaluationData: {
          studyDesign: "No standalone contour study. One dose paper reports contour failures.",
          primaryEndpoint: "Not a published DSC endpoint",
          results: "Cancers 2026: in two of 20 prostate patients, bladder dose deviations were automatic-contour errors. No Dice study was found.",
          description: "The product L2 does not validate contouring. Registration papers, including SmartFuse, are not used here.",
          source: "Prunaretty et al., Cancers 2026",
          sourceUrl: "https://doi.org/10.3390/cancers18111826",
        },
        evidenceRigor: "E0",
        evidenceRigorNotes: "No Dice study of AdaptBox OAR contouring. The only related finding is the bladder-contour failures in Cancers 2026.",
        clinicalImpact: "L1c",
        efficacyProvisional: true,
        legacyClinicalImpact: "I0",
      },
    },
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea-adaptbox.ts",
    description: "AI-powered offline adaptive radiotherapy module within the ART-Plan+ platform that generates synthetic/augmented CT images from daily CBCTs, supports organs-at-risk (OAR) delineation, dose metrics over the course of treatment as labelled by FDA, and assisted off-line replanning decision support. The published prostate study compared dose fraction by fraction. It did not show accumulated dose.",
    features: [
      "AI-based synthetic/augmented CT generation from daily CBCT images",
      "Organs-at-risk (OAR) delineation on augmented CBCT / synthetic CT images",
      "Dose computation on reference planning CT and synthetic/augmented CBCT images",
      "Daily dose tracking and comparison of daily cumulative dose/volume metrics",
      "Assisted CBCT-based off-line adaptation and replanning decision support",
      "Vendor states that it works with any TPS. A claim that it works with every linac is not made."
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
    anatomicalLocation: ["Head & Neck", "Breast", "Thorax", "Pelvis (male)"],
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
        "Vendor states that it works with any TPS. Every linac is not claimed."
      ],
      deployment: ["On-premises", "Cloud-based"
      ],
      triggerForAnalysis: "Manual or automated batch workflow; exact automation and protocol configuration should be confirmed with the vendor",
      processingTime: "Vendor contouring text: 2–3 minutes under optimal conditions, plus user review. Cancers 2026 reports 2 min 40 s for the AdaptBox v2.3.2 workflow, which is not the current software."
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
        notes: "Current statement is K253091 (ART-Plan+ v3.1.0, decision 2025-12-23): CBCT synthetic CT, dose computation and offline adaptation for head and neck, breast/thorax and male pelvis. First summary that names AdaptBox is K232479 (2023-12-22, male pelvis only). K234068 (2024-04-22) adds thorax, breast and head and neck. K242822 does not describe AdaptBox. K202700, K220813 and K230023 do not name AdaptBox. There is no newer 510(k)."
      },
      intendedUseStatement: "AdaptBox allows generation of synthetic-CT from CBCT images, dose computation on CT images for external beam irradiation with photon beams and assisted CBCT-based off-line adaptation decision-making for the following anatomies: Head & Neck, Breast / Thorax, Pelvis (male). ART-Plan+ is not intended for patients less than 18 years of age. (Source: FDA 510(k) K253091 Summary)"
    },
    supportedStructures: ADAPTBOX_ALL_STRUCTURES,
    structuresProvenance: {
      source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ref ART-BRO-AN-07EU, March 2026), Syn-CT model pages",
      sourceUrl: "https://therapanacea.com/products",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05",
      notes: "Three synthetic-CT models itemised by the vendor in v3.2.0, each prefixed in the structure list: Pelvis Male (Syn-CT) 7 OARs + 2 ROIs; Thorax/Breast (Syn-CT) 12 OARs; Head & Neck (Syn-CT) 26 OARs. Bilateral structures are split into _L/_R so totals match the vendor counts. No separate CBCT-only structure list is published — do not add one. Re-verified 2026-09-05 against brochure v3.2.0: the syn-CT model set and counts are unchanged; the vendor products page lists only the CT/MR models, so the brochure remains the source for these. Re-verified 2026-10-03 against brochure ART-BRO-AN-07EU (v3.2.0, March 2026): model set, assignment and counts unchanged."
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
      version: "3.2.1",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    version: "3.2.1",
    releaseDate: "Unknown. The stored date 2025-01-01 had no source and was removed.",
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    keyPapers: [
      {"doi":"10.3390/cancers18111826","pmid":"42279408","title":"Implementation of an AI-driven workflow for daily dose reconstruction in prostate cancer radiotherapy","authors":"Prunaretty J, Baudouin T, Riou O, Azria D, et al.","journal":"Cancers","year":"2026","link":"https://doi.org/10.3390/cancers18111826","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Names AdaptBox v2.3.2. Twenty prostate patients, one centre (Institut du Cancer de Montpellier). No TheraPanacea author. Dose was compared fraction by fraction, not as a cumulative course. In two patients, bladder dose deviations were automatic-contour errors. The 2 min 40 s figure is this v2.3.2 workflow, not the current software.","vendorIndependent":true,"multiCenter":false,"multiNational":false,"prospective":false,"externalValidation":false}
    ],
    source: "Therapanacea products page and Technical Information 3.2 (ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724, retrieved 2026-11-05). FDA summaries: K232479 (first AdaptBox clearance, 2023-12-22, male pelvis), K234068 (2024-04-22, thorax, breast, head and neck), K253091 (current statement, v3.1.0). K242822 does not describe AdaptBox. Prunaretty et al., Cancers 2026 (doi:10.3390/cancers18111826). Frontiers in Oncology 2026 (doi:10.3389/fonc.2026.1756153) was removed from keyPapers: it does not name AdaptBox, uses Eclipse, and includes the TheraPanacea CEO. MESCAL was removed from keyPapers because it is an MRI-only benchmark. Class IIb / GMED 0459 remains vendor-reported. Q4 2026 review.",
    evidenceRigor: "E1",
    evidenceRigorNotes: "E1 on 2026-11-05 from Prunaretty et al., Cancers 2026: 20 prostate patients, one centre, no TheraPanacea author, per-fraction dose. The Frontiers 2026 paper previously scored E2 does not name AdaptBox. MESCAL does not evaluate AdaptBox. Head and neck, breast and thorax are FDA-cleared and have less peer-reviewed dose evidence than the male pelvis.",
    clinicalImpact: "L2",
    clinicalImpactNotes: "L2 from per-fraction dose comparison in Cancers 2026, not from a cumulative multi-centre validation. The FDA text allows metrics over the course of treatment; that is the labelled function. The prostate paper compared dose fraction by fraction. In two patients, bladder dose deviations were automatic-contour errors. No outcome data.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Cleared for the labelled anatomies, with local commissioning still required because CBCT quality changes the synthetic CT and the contours. R3 is not derived from an E2 score. CE Class IIb / GMED 0459 stays vendor-reported: it is not on the technical page."
  }
];

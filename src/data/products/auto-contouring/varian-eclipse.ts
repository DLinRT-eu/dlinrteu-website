import { ProductDetails } from "@/types/productDetails";

export const VARIAN_ECLIPSE_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-eclipse-ai-contouring",
    name: "AI Contouring for Eclipse",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-eclipse.ts",
    description: "Deep learning-based auto-contouring integrated with the Varian Eclipse treatment planning system. Automates routine OAR contouring in the offline planning workflow to reduce manual effort and inter-observer variability. Shares the underlying AI Segmentation deep-learning algorithm family previously deployed on the Ethos adaptive console, now packaged for the Eclipse TPS installed base.",
    features: [
      "Deep learning-based auto-segmentation of organs at risk",
      "Fully integrated into the Eclipse treatment planning workflow",
      "Scriptable via the Eclipse Scripting API (ESAPI)",
      "Targets routine contouring workload reduction"
    ],
    category: "Auto-Contouring",
    certification: "CE/FDA",
    logoUrl: "/logos/varian.jpg",
    website: "https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Breast"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning autocontouring integrated with Eclipse TPS",
      "Designed to reduce manual effort and contouring variability",
      "Shared algorithm lineage with Varian AI Segmentation (Ethos)",
      "Manual/scripted invocation in the offline planning session"
    ],
    supportedStructures: [
      // Structure set not published in a Siemens/Varian model card for the Eclipse
      // packaging at time of entry. Listed as (unverified) pending vendor confirmation.
      // Adjacent evidence: the Ethos AI Segmentation shares the algorithm family and
      // has a broader published structure set (Finnegan et al. JACMP 2025).
      "Head & Neck: OARs (unverified)",
      "Thorax: OARs (unverified)",
      "Abdomen: OARs (unverified)",
      "Pelvis: OARs (unverified)",
      "Breast: OARs (unverified)"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Eclipse Treatment Planning"],
      deployment: ["Integrated with Eclipse TPS", "On-premises"],
      triggerForAnalysis: "Manual / scripted (ESAPI)",
      processingTime: "Not publicly disclosed"
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
        clearanceNumber: "K261306",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2026-07-10",
        notes: "Cleared as AI Contouring VA10A (Traditional 510(k), decision 2026-07-10) for automatic segmentation of anatomical structures and known (diagnosed) brain metastases on CT and MR images, integrated into compatible Varian platforms (Eclipse, Velocity). The FDA summary describes four independent deep-learning MR segmentation models (brain metastases on T1w post-contrast, brain OARs, pelvis OARs T1-weighted, pelvis OARs T2-weighted) plus multiple DI2IN CT segmentation models, with template configuration and margin/Boolean/cropping expansion of auto-contoured structures. Reference device: syngo.via RT Image Suite VC10 (K252304). The underlying AI Segmentation algorithm family shipped in Ethos under K203469 (2021), K211881 (2021) and K232923 (2024). Source: https://www.accessdata.fda.gov/cdrh_docs/pdf26/K261306.pdf, retrieved 2026-09-22"
      },
      intendedUseStatement: "AI Contouring VA10A is intended for the automatic segmentation (auto-contouring) of anatomical structures and pathologies, including known (diagnosed) brain metastases, on CT and MR images to support radiation therapy treatment planning, providing consistent editable contours of organs at risk and target volumes within compatible Varian platforms such as Eclipse and Velocity. (Source: FDA 510(k) K261306 Summary, accessed 2026-09-22)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E2",
    evidenceRigorNotes: "2026-08-27 Wave 6 citation audit: the Mandal 2022 entry was removed — DOI 10.1002/pro6.1174 resolves to an unrelated article and the publication could not be verified. Remaining support is comparative multi-vendor literature plus the algorithm lineage shared with Ethos AI Segmentation.",
    clinicalImpact: "I2",
    clinicalImpactNotes: "Independent comparative evaluations show workflow and consistency benefits — upgraded to I2.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "CE MDR plus FDA 510(k) (K261306) clearance, vendor-source evidence, no independent Eclipse-specific validation. Local commissioning and validation required before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Regulatory Submission",
        description: "FDA 510(k) summary K261306: AI Contouring VA10A, four MR deep-learning segmentation models plus multiple DI2IN CT models, cleared 2026-07-10.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf26/K261306.pdf"
      },
      {
        type: "Vendor Announcement",
        description: "Siemens Healthineers press release: CE mark for AI Contouring for Eclipse (ESTRO 2026, 15 May 2026)",
        link: "https://www.siemens-healthineers.com/press/releases/estro2026"
      },
      {
        type: "Vendor Product Page",
        description: "Siemens Healthineers — Deep learning-based autocontouring in radiation therapy",
        link: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/autocontouring"
      }
    ],
    trainingData: {
      datasetSize: "Not publicly disclosed",
      datasetSources: ["Not publicly disclosed"],
      demographics: "Not publicly disclosed",
      scannerModels: ["Not publicly disclosed"],
      disclosureLevel: "minimal"
    },
    evaluationData: {
      description: "No Eclipse-specific evaluation published by the vendor at time of entry. Model card pending.",
      studyDesign: "Not publicly disclosed",
      primaryEndpoint: "Not publicly disclosed",
      results: "Not publicly disclosed",
      source: "Siemens Healthineers press release (2026-05-15)",
      sourceUrl: "https://www.siemens-healthineers.com/press/releases/estro2026"
    },
    releaseDate: "2026-05-15",
    lastUpdated: "2026-07-07",
    keyPapers: [
    {"doi":"10.1016/j.adro.2023.101177","title":"Eclipse AI contouring comparative evaluation","authors":"Pera Ò et al.","journal":"Adv Radiat Oncol","year":"2023","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Independent comparative evaluation on external clinical data.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.1002/acm2.14620","title":"Eclipse AI contouring clinical validation","authors":"Wang Y et al.","journal":"J Appl Clin Med Phys","year":"2025","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre clinical validation including editing effort.","vendorIndependent":true}
  ],
    lastRevised: "2026-08-27",
    source: "Siemens Healthineers press release (2026-05-15) https://www.siemens-healthineers.com/press/releases/estro2026 ; Siemens Healthineers autocontouring product page ; FDA 510(k) K232923 cited for algorithm lineage only (Ethos packaging). Sibling product: Ethos AI Segmentation (varian-ethos-ai-segmentation) shares the underlying deep-learning algorithm family but is a distinct product tied to the Ethos adaptive console. Structure set and FDA status for the Eclipse packaging marked (unverified) pending vendor confirmation via the certification program."
  }
];

import { ProductDetails } from "@/types/productDetails";

export const VARIAN_ECLIPSE_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-eclipse-ai-contouring",
    name: "AI Contouring for Eclipse",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-eclipse.ts",
    description: "Deep learning-based auto-contouring integrated with the Varian Eclipse treatment planning system. Automates routine OAR contouring in the offline planning workflow to reduce manual effort and inter-observer variability. The vendor reports CT and MR input, more than 200 structures, lymph nodes and diagnosed brain metastases.",
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
      "Vendor-reported library of 200+ structures, including lymph nodes and brain metastases",
      "Manual/scripted invocation in the offline planning session"
    ],
    supportedStructures: [],
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
    evidenceRigor: "E0",
    evidenceRigorNotes: "2026-11-09 review: no verified peer-reviewed validation explicitly naming AI Contouring for Eclipse. Two previously cited papers were removed: 10.1016/j.adro.2023.101177 evaluates Siemens syngo.via, and 10.1002/acm2.14620 does not establish Eclipse attribution.",
    clinicalImpact: "L1c",
        clinicalImpactNotes: "Provisional: vendor and regulatory materials only; no verified product-specific accuracy or workflow study identified (2026-11-09 review).",
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
    version: "VA10A",
    releaseDate: "2026-05-15",
    lastUpdated: "2026-10-15",
    keyPapers: [],
    lastRevised: "2026-11-09",
    source: "FDA 510(k) K261306; vendor website; press release"
  }
];

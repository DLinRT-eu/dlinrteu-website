import { ProductDetails } from "@/types/productDetails";

export const MVISION_REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-adapt-plus",
    name: "Adapt+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/adapt/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/registration/mvision.ts",
    description:
      "Registration module of the MVision AI Workspace+ platform. AI-powered contour propagation for adaptive radiotherapy that transfers and aligns existing contours between image sets using rigid, conventional deformable, and deep learning deformable registration methods.",
    features: [
      "Automated contour propagation",
      "Rigid registration",
      "Conventional deformable image registration",
      "Deep learning deformable registration",
      "CT-to-CT, CBCT, and synthetic CT alignment",
      "Offline adaptive workflow support"
    ],
    category: "Registration",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/adapt/",
    anatomicalLocation: ["Brain", "Pelvis", "Head & Neck", "Thorax", "Abdomen"],
    modality: ["CT", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Contour propagation between planning and repeat image sets",
      "Rigid, conventional deformable and deep-learning deformable registration",
      "Supports CT-to-CT, CBCT and synthetic CT alignment",
      "Designed for offline adaptive radiotherapy workflows",
      "Delivered through the Workspace+ AI platform"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "CBCT", "Synthetic CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Propagated contours", "Deformation fields"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Workspace+", "PACS", "TPS via DICOM"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated within Workspace+",
      processingTime: "Minutes per case (vendor-reported)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes:
          "Regulatory basis is the Workspace+ platform CE Mark Class IIa certification of 21 October 2025 under EU MDR 2017/745, within which Adapt+ is delivered as a module. No Adapt+-specific CE certificate or certificate number is published by the vendor; none is claimed here."
      },
      fda: {
        status: "not_applicable",
        notes:
          "No FDA clearance for Adapt+ or for the Workspace+ platform. The MVision AI FDA clearance K250064 covers the Dose+ module only and does not apply to Adapt+."
      }
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
    },
    partOf: {
      name: "Workspace+",
      productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
      relationship: "Module"
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "E0 confirmed by a dedicated evidence check on 2026-09-14: no peer-reviewed publication, conference abstract or independent evaluation naming the Adapt+ module was located. Vendor and distributor listings describe 'clinically evaluated image registration' without citing a study, so that claim is not scored. Content and score originally migrated on 2026-09-13 from the Workspace+ categoryEvidence['Registration'] block, which recorded E0 following the 2026-08-25 Wave 5D sweep (Europe PMC 2014-2026, alias-gated).",
    clinicalImpactNotes:
      "No independent clinical impact data identified for the Adapt+ module at time of listing.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "CE-marked at platform level but E0 evidence: local geometric validation of propagated contours and a structured pilot are recommended before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    releaseDate: "2025-10-21",
    lastUpdated: "2026-09-14",
    lastRevised: "2026-09-13",
    evidence: [
      {
        type: "Company Press Release",
        description:
          "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025) — the platform certification within which Adapt+ is delivered",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      },
      {
        type: "Vendor Product Page",
        description:
          "MVision AI Adapt+ product page — source for the module scope: contour propagation across CT, synthetic CT and CBCT using rigid, conventional deformable and deep-learning deformable registration, retrieved 2026-09-14",
        link: "https://mvision.ai/adapt/"
      }
    ],
    limitations: [
      "Propagated contours are assistive and require clinician review and approval before use in planning",
      "Regulatory basis is the Workspace+ platform CE mark; no Adapt+-specific clearance is published",
      "Registration accuracy depends on image quality, anatomical change and field of view",
      "No independent peer-reviewed publication identified at time of listing",
      "No public disclosure of training or evaluation data for this module"
    ],
    source:
      "MVision AI Adapt+ product page (https://mvision.ai/adapt/) and MVision AI CE Mark press release (21 Oct 2025), retrieved 2026-09-13. Entry created 2026-09-13 by splitting the Adapt+ module out of the Workspace+ platform entry; description, key features and evidence score migrated from the Workspace+ integratedModules and categoryEvidence['Registration'] blocks. releaseDate proxied from the Workspace+ CE certification date (2025-10-21); no Adapt+-specific release date is published. trainingData and evaluationData intentionally omitted: no disclosed source describes them."
  }
];

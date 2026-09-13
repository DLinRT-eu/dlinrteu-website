import { ProductDetails } from "@/types/productDetails";

export const MVISION_IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-image-plus",
    name: "Image+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/image/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/mvision.ts",
    description:
      "Image-synthesis module of the MVision AI Workspace+ platform. Generates synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
    features: [
      "Brain MR T1 synthetic CT model",
      "Pelvis MR T2 synthetic CT model",
      "CBCT to synthetic CT conversion",
      "Virtual non-contrast (VNC) imaging from contrast-enhanced CT",
      "MR-only planning support",
      "Offline adaptive workflow integration"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/image/",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: ["MRI", "CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Synthetic CT generation from MR (brain T1, pelvis T2)",
      "CBCT-to-synthetic-CT conversion for offline adaptive workflows",
      "Virtual non-contrast imaging from contrast-enhanced CT",
      "Supports MR-only planning workflows",
      "Delivered through the Workspace+ AI platform"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI", "CBCT", "Contrast-enhanced CT"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
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
          "Regulatory basis is the Workspace+ platform CE Mark Class IIa certification of 21 October 2025 under EU MDR 2017/745, within which Image+ is delivered as a module. No Image+-specific CE certificate or certificate number is published by the vendor; none is claimed here."
      },
      fda: {
        status: "not_applicable",
        notes:
          "No FDA clearance for Image+ or for the Workspace+ platform. The MVision AI FDA clearance K250064 covers the Dose+ module only and does not apply to Image+."
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
      "Validation is internal/vendor-reported; no peer-reviewed publication naming the Image+ module was located. Content and score migrated on 2026-09-13 from the Workspace+ categoryEvidence['Image Synthesis'] block, which recorded E0 following the 2026-08-25 Wave 5D sweep (Europe PMC 2014-2026, alias-gated).",
    clinicalImpactNotes:
      "No independent clinical impact data identified for the Image+ module at time of listing.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "CE-marked at platform level but E0 evidence: local commissioning of synthetic CT dosimetric accuracy and a structured pilot are recommended before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    releaseDate: "2025-10-21",
    lastUpdated: "2026-09-13",
    lastRevised: "2026-09-13",
    evidence: [
      {
        type: "Company Press Release",
        description:
          "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025) — the platform certification within which Image+ is delivered",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      }
    ],
    limitations: [
      "Synthetic CT output is assistive and requires clinician review and approval before use in planning",
      "Regulatory basis is the Workspace+ platform CE mark; no Image+-specific clearance is published",
      "Synthetic CT accuracy depends on acquisition protocol, sequence and field of view",
      "Anatomical coverage of MR-based models limited to brain (T1) and pelvis (T2) as described by the vendor",
      "No independent peer-reviewed publication identified at time of listing",
      "No public disclosure of training or evaluation data for this module"
    ],
    source:
      "MVision AI Image+ product page (https://mvision.ai/image/) and MVision AI CE Mark press release (21 Oct 2025), retrieved 2026-09-13. Entry created 2026-09-13 by splitting the Image+ module out of the Workspace+ platform entry; description, key features and evidence score migrated from the Workspace+ integratedModules and categoryEvidence['Image Synthesis'] blocks. releaseDate proxied from the Workspace+ CE certification date (2025-10-21); no Image+-specific release date is published. trainingData and evaluationData intentionally omitted: no disclosed source describes them."
  }
];

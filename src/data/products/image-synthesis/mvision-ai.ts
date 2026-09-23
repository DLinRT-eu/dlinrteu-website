import { ProductDetails } from "@/types/productDetails";

export const Image: ProductDetails = {
  id: "mvision-image-plus",
  name: "Image+",
  market: {
    onMarketSince: "2025",
    distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
  },
  partOf: {
    name: "Workspace+",
    productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
    relationship: "Module"
  },
  source: "MVision AI Image+ product page (https://mvision.ai/image/) and MVision AI CE Mark press release (21 Oct 2025), retrieved 2026-09-13; evidence completeness check performed 2026-09-14, with the VCU thesis and vendor synthetic CT article retrieved that date. Entry created 2026-09-13 by splitting the Image+ module out of the Workspace+ platform entry; description, key features and evidence score migrated from the Workspace+ integratedModules and categoryEvidence['Image Synthesis'] blocks. releaseDate proxied from the Workspace+ CE certification date (2025-10-21); no Image+-specific release date is published. trainingData and evaluationData intentionally omitted: no disclosed source describes them.",
  usesAI: true,
  company: "MVision AI",
  logoUrl: "/logos/mvision-ai.png",
  version: "1.0.2",
  website: "https://mvision.ai/image/",
  category: "Image Synthesis",
  evidence: [
    {
      link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/",
      type: "Company Press Release",
      description: "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025) — the platform certification within which Image+ is delivered"
    },
    {
      link: "https://scholarscompass.vcu.edu/etd/8304",
      type: "Academic Thesis (grey literature, not peer-reviewed)",
      description: "Magnetic Resonance Only Planning Validation Using Synthetic CT by MVision — MSc thesis, Virginia Commonwealth University, 2026. Vendor-independent single-centre validation of MR-only planning using MVision synthetic CT; not peer-reviewed, so it does not raise evidence rigor above E0."
    },
    {
      link: "https://mvision.ai/image/",
      type: "Vendor Product Page",
      description: "MVision AI Image+ product page — source for the module scope: synthetic CT from MRI, CBCT and contrast-enhanced CT (brain MR T1, pelvis MR T2, CBCT→sCT, virtual non-contrast), retrieved 2026-09-14"
    },
    {
      link: "https://mvision.ai/advancing-radiotherapy-care-through-synthetic-ct-imaging/",
      type: "Vendor Article",
      description: "MVision AI, 'Advancing Radiotherapy Care Through Synthetic CT Imaging' (28 May 2026) — vendor-authored background on the synthetic CT models, retrieved 2026-09-14"
    }
  ],
  features: [
    "Brain MR T1 synthetic CT model",
    "Pelvis MR T2 synthetic CT model",
    "CBCT to synthetic CT conversion",
    "Virtual non-contrast (VNC) imaging from contrast-enhanced CT",
    "MR-only planning support",
    "Offline adaptive workflow integration"
  ],
  modality: ["MRI", "CBCT", "CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/mvision.ts",
  companyUrl: "https://mvision.ai/",
  productUrl: "https://mvision.ai/image/",
  regulatory: {
    ce: {
      type: "MDR",
      class: "IIa",
      notes: "Regulatory basis is the Workspace+ platform CE Mark Class IIa certification of 21 October 2025 under EU MDR 2017/745, within which Image+ is delivered as a module. No Image+-specific CE certificate or certificate number is published by the vendor; none is claimed here.",
      status: "cleared",
      regulation: "MDR 2017/745"
    },
    fda: {
      notes: "No FDA clearance for Image+ or for the Workspace+ platform. The MVision AI FDA clearance K250064 covers the Dose+ module only and does not apply to Image+.",
      status: "not_applicable"
    }
  },
  technology: {
    deployment: ["Cloud-based", "On-premise"],
    integration: ["Workspace+", "PACS", "TPS via DICOM"],
    processingTime: "Minutes per case (vendor-reported)",
    triggerForAnalysis: "Manual or automated within Workspace+"
  },
  description: "Image-synthesis module of the MVision AI Workspace+ platform. Generates synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
  keyFeatures: [
    "Synthetic CT generation from MR (brain T1, pelvis T2)",
    "CBCT-to-synthetic-CT conversion for offline adaptive workflows",
    "Virtual non-contrast imaging from contrast-enhanced CT",
    "Supports MR-only planning workflows",
    "Delivered through the Workspace+ AI platform"
  ],
  lastRevised: "2026-09-13",
  lastUpdated: "2026-09-14",
  limitations: [
    "Synthetic CT output is assistive and requires clinician review and approval before use in planning",
    "Regulatory basis is the Workspace+ platform CE mark; no Image+-specific clearance is published",
    "Synthetic CT accuracy depends on acquisition protocol, sequence and field of view",
    "Anatomical coverage of MR-based models limited to brain (T1) and pelvis (T2) as described by the vendor",
    "No independent peer-reviewed publication identified at time of listing",
    "The only third-party evaluation identified is grey literature (a 2026 university thesis), which has not undergone peer review",
    "No public disclosure of training or evaluation data for this module"
  ],
  releaseDate: "2025-10-21",
  certification: "CE",
  evidenceRigor: "E0",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I0",
  diseaseTargeted: ["Multiple Cancer Types"],
  adoptionReadiness: "R2",
  anatomicalLocation: ["Brain", "Pelvis"],
  evidenceRigorNotes: "E0 retained after a dedicated evidence check on 2026-09-14: no peer-reviewed publication naming the Image+ module or MVision synthetic CT was located. The only third-party evaluation identified is a university thesis (Virginia Commonwealth University, 2026) validating MR-only planning with MVision synthetic CT — grey literature, not peer-reviewed, so it does not raise rigor above E0 and evidenceVendorIndependent is kept false (that flag denotes peer-reviewed independent evidence). The 2025 Leeds brain MRI-only synthetic CT validation study (Tech Innov Patient Support Radiat Oncol 2025;35:100328) was screened and excluded: it evaluates Philips MRCAT Brain, a different vendor's product. Content and score originally migrated on 2026-09-13 from the Workspace+ categoryEvidence['Image Synthesis'] block, which recorded E0 following the 2026-08-25 Wave 5D sweep (Europe PMC 2014-2026, alias-gated).",
  clinicalImpactNotes: "No independent clinical impact data identified for the Image+ module at time of listing.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  evidenceMultiNational: false,
  adoptionReadinessNotes: "CE-marked at platform level but E0 evidence: local commissioning of synthetic CT dosimetric accuracy and a structured pilot are recommended before clinical adoption.",
  technicalSpecifications: {
    input: ["MRI", "CBCT", "Contrast-enhanced CT"],
    output: ["Synthetic CT images"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

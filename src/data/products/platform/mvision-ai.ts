import { ProductDetails } from "@/types/productDetails";

export const Workspace: ProductDetails = {
  id: "mvision-ai-workspace-plus",
  name: "Workspace+",
  market: {
    onMarketSince: "2025",
    distributionChannels: ["Direct sales", "Partnerships"]
  },
  source: "MVision AI company press releases (CE Mark Oct 2025). Dose+ module FDA K250064 tracked separately under the Dose+ product entry.; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)",
  company: "MVision AI",
  logoUrl: "/logos/mvision-ai.png",
  version: "1.0",
  website: "https://mvision.ai/workspace/",
  category: "Platform",
  evidence: [
    {
      link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/",
      type: "Company Press Release",
      description: "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025)"
    }
  ],
  features: [
    "Unified platform for multiple AI modules",
    "Image synthesis from MRI/CBCT (Image+)",
    "Deformable registration and contour propagation (Adapt+)",
    "Automated treatment planning (Dose+)",
    "Automated contouring (Contour+)",
    "PACS and TPS integration",
    "Cloud-native architecture",
    "Scalable deployment options"
  ],
  modality: ["MRI", "CBCT", "CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/mvision.ts",
  companyUrl: "https://mvision.ai/",
  productUrl: "https://mvision.ai/workspace/",
  regulatory: {
    ce: {
      type: "MDR",
      class: "IIa",
      status: "cleared",
      regulation: "MDR 2017/745",
      certificateNumber: "Certified October 21, 2025"
    },
    fda: {
      notes: "No FDA 510(k) clearance for the Workspace+ platform itself as of 2026-06-15. The Dose+ module has its own FDA K250064 clearance (see treatment-planning Dose+ entry); that module-level clearance was previously listed here as platform evidence and was removed on 2026-06-15 to avoid implying platform-level FDA clearance.",
      status: "not_applicable"
    },
    intendedUseStatement: "AI-powered solution that automates radiotherapy workflows from imaging to treatment planning. Unifies AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation in a single vendor-neutral, cloud-native platform to support clinicians in standardizing, reviewing, and adapting the course of treatment while enabling faster and more informed decision-making."
  },
  technology: {
    deployment: ["On-premises", "Cloud-based", "Hybrid"],
    integration: [
      "PACS",
      "TPS (Varian, Elekta, RaySearch)",
      "OIS",
      "Treatment Planning Systems"
    ],
    processingTime: "Minutes per case (varies by module)",
    triggerForAnalysis: "Integrated within clinical workflow"
  },
  description: "Enterprise-grade AI integration platform for radiation oncology that provides unified access to multiple AI-powered clinical modules including image synthesis (Image+), deformable registration (Adapt+), and automated treatment planning (Dose+). Seamlessly integrates with existing clinical workflows through PACS, TPS, and OIS connections.",
  keyFeatures: [
    "Enterprise-grade AI platform for radiation oncology",
    "Unified access to multiple AI clinical modules",
    "Seamless integration with existing clinical workflows",
    "PACS, TPS, and OIS connectivity",
    "Cloud-native, scalable architecture",
    "Role-based access control and audit trails",
    "Regulatory-compliant infrastructure"
  ],
  lastRevised: "2026-08-25",
  lastUpdated: "2026-08-25",
  limitations: [
    "AI outputs are assistive and require clinician review, editing, and approval before clinical use",
    "Module availability may vary by country/market and regulatory status",
    "Performance depends on input image quality, acquisition protocols, and site-specific workflows"
  ],
  releaseDate: "2025-10-21",
  certification: "CE",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I1",
  diseaseTargeted: ["Multiple Cancer Types"],
  categoryEvidence: {
    Platform: {
      notes: "Aggregate platform: integrates Contour+, Image+, Adapt+ and Dose+ modules under a single CE-marked (IIa) workspace. Platform-level evidence is regulatory (CE IIa, Oct 2025) only.",
      usesAI: true
    },
    Registration: {
      notes: "Adapt+ module — rigid, conventional and deep-learning deformable registration for contour propagation. No standalone peer-reviewed validation located.",
      usesAI: true,
      evidenceRigor: "E0",
      clinicalImpact: "I0"
    },
    "Image Synthesis": {
      notes: "Image+ module — brain MR T1 sCT, pelvis MR T2 sCT, CBCT→sCT, and VNC from contrast-enhanced CT. Validation is internal/vendor-reported; no peer-reviewed module-specific publication located.",
      usesAI: true,
      evidenceRigor: "E0",
      clinicalImpact: "I0"
    },
    "Treatment Planning": {
      notes: "Dose+ module — patient-specific 3D dose prediction; tracked under the Dose+ product entry with its own FDA K250064 clearance (Sept 4, 2025). Not aggregated into the platform's regulatory evidence here.",
      usesAI: true,
      evidenceRigor: "E1",
      clinicalImpact: "I1"
    }
  },
  clinicalEvidence: "CE Mark Class IIa certification achieved October 21, 2025. Cloud-native, vendor-neutral platform unifying AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation. Cleared for clinical use across Europe and other MDR-recognized markets. Contour+ module received Singapore approval in May 2025.",
  adoptionReadiness: "R3",
  integratedModules: [
    {
      name: "Image+",
      category: "Image Synthesis",
      productUrl: "https://mvision.ai/image/",
      description: "Generate synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
      keyFeatures: [
        "Brain MR T1 synthetic CT model",
        "Pelvis MR T2 synthetic CT model",
        "CBCT to synthetic CT conversion",
        "Virtual non-contrast (VNC) imaging from contrast-enhanced CT",
        "MR-only planning support",
        "Offline adaptive workflow integration"
      ]
    },
    {
      name: "Adapt+",
      category: "Registration",
      productUrl: "https://mvision.ai/adapt/",
      description: "AI-powered contour propagation for adaptive radiotherapy. Transfers and aligns existing contours between image sets using multiple registration methods including rigid, conventional deformable, and deep learning deformable approaches.",
      keyFeatures: [
        "Automated contour propagation",
        "Rigid registration",
        "Conventional deformable image registration",
        "Deep learning deformable registration",
        "CT-to-CT, CBCT, and synthetic CT alignment",
        "Offline adaptive workflow support"
      ]
    },
    {
      name: "Dose+",
      category: "Dose Prediction",
      productUrl: "https://dlinrt.eu/products/mvision-dose-plus",
      description: "AI-based dose prediction module that generates patient-specific 3D dose distributions to support treatment planning optimization for workflow efficiency and plan consistency.",
      keyFeatures: [
        "Patient-specific 3D dose prediction",
        "Supports VMAT planning optimization workflows",
        "Provides achievable starting point for objective setting",
        "Improves planning efficiency and consistency",
        "Compatible with DICOM-compliant TPS via RTDose export"
      ]
    },
    {
      name: "Contour+",
      category: "Auto-contouring",
      productUrl: "https://dlinrt.eu/products/mvision-ai-contouring",
      description: "AI-powered auto-contouring module that generates guideline-based contours for radiotherapy, supporting consistent delineation of organs-at-risk and lymph node regions across major anatomical sites.",
      keyFeatures: [
        "Guideline-based auto-contouring",
        "Broad anatomical coverage (OARs + lymph node regions)",
        "Supports consistent delineation across users and clinics",
        "Designed for rapid turnaround with clinician review"
      ]
    }
  ],
  anatomicalLocation: [
    "Brain",
    "Pelvis",
    "Male Pelvis",
    "Prostate",
    "Head & Neck",
    "Thorax",
    "Abdomen",
    "Multiple Sites"
  ],
  evidenceRigorNotes: "2026-08-25 Wave 4 sweep: PubMed re-searched, no new product-naming peer-reviewed publication found. Platform-level evidence: CE Mark Class IIa (Oct 21, 2025) for Workspace+. Two previously cited Dose+ references (PR + FDA K250064) were removed on 2026-06-15: they evaluate the Dose+ module, not the Workspace+ platform, and were misleading at the platform level. 2026-08-25 Wave 5D sweep (Europe PMC 2014-2026, alias-gated): no publication names this product. E0 stands.",
  clinicalImpactNotes: "Vendor-claimed workflow improvement through unified AI platform integration; no platform-level independent clinical impact study identified.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  secondaryCategories: [
    "Image Synthesis",
    "Registration",
    "Treatment Planning",
    "Auto-contouring"
  ],
  dosePredictionModels: [
    {
      name: "Prostate Model",
      intent: "Curative",
      status: "approved",
      technique: "VMAT",
      description: "AI model for localized prostate cancer without nodal involvement. Supports all fractionation approaches from conventional to SBRT with SIB capability.",
      anatomicalSite: "Prostate"
    },
    {
      name: "Pelvic LN Model",
      intent: "Curative",
      status: "approved",
      technique: "VMAT",
      description: "AI model for prostate cancer with lymph node involvement. Supports conventional and moderate hypofractionation with SIB capability.",
      anatomicalSite: "Pelvis"
    }
  ],
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E1 + CE: moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: [
      "CT",
      "MRI",
      "CBCT",
      "Structure sets",
      "Clinical goals",
      "Contrast-enhanced CT"
    ],
    output: [
      "Synthetic CT images",
      "Propagated contours",
      "Dose distributions",
      "Structure sets",
      "Treatment plans"
    ],
    population: "Adult patients",
    inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
    outputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTDOSE"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

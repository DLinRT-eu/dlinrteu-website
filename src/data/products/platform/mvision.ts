
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-workspace-plus",
    name: "Workspace+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/workspace/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/mvision.ts",
    description: "Enterprise-grade AI integration platform for radiation oncology that provides unified access to multiple AI-powered clinical modules including image synthesis (Image+), deformable registration (Adapt+), and automated treatment planning (Dose+). Seamlessly integrates with existing clinical workflows through PACS, TPS, and OIS connections.",
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
    category: "Platform",
    secondaryCategories: ["Image Synthesis", "Registration", "Treatment Planning"],
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/workspace/",
    anatomicalLocation: ["Brain", "Pelvis", "Male Pelvis", "Prostate", "Head & Neck", "Thorax", "Abdomen", "Multiple Sites"],
    modality: ["MRI", "CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Enterprise-grade AI platform for radiation oncology",
      "Unified access to multiple AI clinical modules",
      "Seamless integration with existing clinical workflows",
      "PACS, TPS, and OIS connectivity",
      "Cloud-native, scalable architecture",
      "Role-based access control and audit trails",
      "Regulatory-compliant infrastructure"
    ],
    integratedModules: [
      {
        name: "Image+",
        description: "Generate synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
        category: "Image Synthesis",
        productUrl: "https://mvision.ai/image/",
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
        description: "AI-powered contour propagation for adaptive radiotherapy. Transfers and aligns existing contours between image sets using multiple registration methods including rigid, conventional deformable, and deep learning deformable approaches.",
        category: "Registration",
        productUrl: "https://mvision.ai/adapt/",
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
        description: "AI-based dose prediction module that generates patient-specific 3D dose distributions to support treatment planning optimization for workflow efficiency and plan consistency.",
        category: "Dose Prediction",
        productUrl: "https://mvision.ai/dose/",
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
        description:
          "AI-powered auto-contouring module that generates guideline-based contours for radiotherapy, supporting consistent delineation of organs-at-risk and lymph node regions across major anatomical sites.",
        category: "Auto-Contouring",
        productUrl: "https://mvision.ai/contour/",
        keyFeatures: [
          "Guideline-based auto-contouring",
          "Broad anatomical coverage (OARs + lymph node regions)",
          "Supports consistent delineation across users and clinics",
          "Designed for rapid turnaround with clinician review"
        ]
      },
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT", "Structure sets", "Clinical goals", "Contrast-enhanced CT"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Synthetic CT images", "Propagated contours", "Treatment plans", "Dose distributions"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTDOSE"]
    },
    technology: {
      integration: ["PACS", "TPS (Varian, Elekta, RaySearch)", "OIS", "Treatment Planning Systems"],
      deployment: ["On-premises", "Cloud-based", "Hybrid"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Minutes per case (varies by module)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        certificateNumber: "Certified October 21, 2025"
      },
      fda: {
        status: "not_applicable",
        notes: "No FDA 510(k) clearance for the Workspace+ platform itself as of 2026-06-15. The Dose+ module has its own FDA K250064 clearance (see treatment-planning Dose+ entry); that module-level clearance was previously listed here as platform evidence and was removed on 2026-06-15 to avoid implying platform-level FDA clearance."
      },
      intendedUseStatement: "AI-powered solution that automates radiotherapy workflows from imaging to treatment planning. Unifies AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation in a single vendor-neutral, cloud-native platform to support clinicians in standardizing, reviewing, and adapting the course of treatment while enabling faster and more informed decision-making."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    dosePredictionModels: [
      {
        name: "Prostate Model",
        anatomicalSite: "Prostate",
        technique: "VMAT",
        intent: "Curative",
        description: "AI model for localized prostate cancer without nodal involvement. Supports all fractionation approaches from conventional to SBRT with SIB capability.",
        status: "approved"
      },
      {
        name: "Pelvic LN Model",
        anatomicalSite: "Pelvis",
        technique: "VMAT",
        intent: "Curative",
        description: "AI model for prostate cancer with lymph node involvement. Supports conventional and moderate hypofractionation with SIB capability.",
        status: "approved"
      }
    ],
    version: "1.0",
    releaseDate: "2025-10-21",
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Platform-level evidence: CE Mark Class IIa (Oct 21, 2025) for Workspace+. Two previously cited Dose+ references (PR + FDA K250064) were removed on 2026-06-15: they evaluate the Dose+ module, not the Workspace+ platform, and were misleading at the platform level.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement through unified AI platform integration; no platform-level independent clinical impact study identified.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE: moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    categoryEvidence: {
      "Platform": {
        usesAI: true,
        notes: "Aggregate platform: integrates Contour+, Image+, Adapt+ and Dose+ modules under a single CE-marked (IIa) workspace. Platform-level evidence is regulatory (CE IIa, Oct 2025) only.",
      },
      "Image Synthesis": {
        usesAI: true,
        notes: "Image+ module — brain MR T1 sCT, pelvis MR T2 sCT, CBCT→sCT, and VNC from contrast-enhanced CT. Validation is internal/vendor-reported; no peer-reviewed module-specific publication located.",
        evidenceRigor: "E0",
        clinicalImpact: "I0",
      },
      "Registration": {
        usesAI: true,
        notes: "Adapt+ module — rigid, conventional and deep-learning deformable registration for contour propagation. No standalone peer-reviewed validation located.",
        evidenceRigor: "E0",
        clinicalImpact: "I0",
      },
      "Treatment Planning": {
        usesAI: true,
        notes: "Dose+ module — patient-specific 3D dose prediction; tracked under the Dose+ product entry with its own FDA K250064 clearance (Sept 4, 2025). Not aggregated into the platform's regulatory evidence here.",
        evidenceRigor: "E1",
        clinicalImpact: "I1",
      },
    },
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    evidence: [
      {
        type: "Company Press Release",
        description: "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025)",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      }
    ],
    limitations: [
      "AI outputs are assistive and require clinician review, editing, and approval before clinical use",
      "Module availability may vary by country/market and regulatory status",
      "Performance depends on input image quality, acquisition protocols, and site-specific workflows",
    ],
    source: "MVision AI company press releases (CE Mark Oct 2025). Dose+ module FDA K250064 tracked separately under the Dose+ product entry.",
    clinicalEvidence: "CE Mark Class IIa certification achieved October 21, 2025. Cloud-native, vendor-neutral platform unifying AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation. Cleared for clinical use across Europe and other MDR-recognized markets. Contour+ module received Singapore approval in May 2025."
  }
];

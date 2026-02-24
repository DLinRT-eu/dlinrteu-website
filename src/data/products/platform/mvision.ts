
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
    certification: "CE & FDA",
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
        description: "AI-based dose prediction module that generates patient-specific 3D dose distributions to support treatment planning optimisation for workflow efficiency and plan consistency.",
        category: "Dose Prediction",
        productUrl: "https://mvision.ai/dose/",
        keyFeatures: [
          "Patient-specific 3D dose prediction",
          "Supports VMAT planning optimisation workflows",
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
        status: "CE Marked",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        certificateNumber: "Certified October 21, 2025"
      },
      fda: {
        status: "510(k) Cleared (Dose+ module - K250064, Sept 4, 2025)",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250064",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2025-09-04"
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
    clinicalImpact: "I2",
    evidenceRigorNotes: "CE Mark IIa (Oct 2025). FDA K250064 for Dose+ module. Evidence primarily through individual module publications.",
    clinicalImpactNotes: "Workflow improvement through unified AI platform integrating contouring, dose prediction, image synthesis, and registration.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    evidence: [
      {
        type: "Company Press Release",
        description: "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025)",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      },
      {
        type: "Company Press Release",
        description: "Dose+ FDA 510(k) clearance announcement",
        link: "https://mvision.ai/mvision-ais-dose-receives-fda-510k-clearance-for-clinical-use-in-the-united-states/"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for Dose+ (K250064)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250064.pdf"
      }
    ],
    limitations: [
      "AI outputs are assistive and require clinician review, editing, and approval before clinical use",
      "Module availability may vary by country/market and regulatory status",
      "Performance depends on input image quality, acquisition protocols, and site-specific workflows",
    ],
    source: "FDA 510(k) database (K250064), company website",
    clinicalEvidence: "CE Mark Class IIa certification achieved October 21, 2025. One of the first truly cloud-native, vendor-neutral solutions to unify AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation in a single platform. Designed for clinical efficiency and interoperability with seamless integration into hospital PACS, treatment planning systems, and oncology information systems. Cleared for clinical use across Europe and other MDR-recognized markets. Contour+ module received Singapore approval in May 2025. Dose+ received FDA 510(k) clearance (K250064) on September 4, 2025."
  }
];

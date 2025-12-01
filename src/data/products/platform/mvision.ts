
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
          "Synthetic CT from MRI (T1 brain, T2 pelvis)",
          "CBCT to synthetic CT conversion",
          "Virtual non-contrast (VNC) imaging",
          "Photon dose calculation support",
          "Offline adaptive workflow integration"
        ]
      },
      {
        name: "Adapt+",
        description: "AI-powered deformable image registration for adaptive radiotherapy, enabling automated contour propagation across imaging sessions with high accuracy and consistency.",
        category: "Registration",
        productUrl: "https://mvision.ai/adapt/",
        keyFeatures: [
          "Automated contour propagation",
          "Deformable image registration",
          "CT-to-CT and MRI-to-MRI registration",
          "Adaptive radiotherapy support",
          "High accuracy and consistency"
        ]
      },
      {
        name: "Dose+",
        description: "AI-based treatment planning solution that automates VMAT and IMRT radiotherapy plan creation, reducing planning time from hours to minutes while ensuring high quality and consistency.",
        category: "Treatment Planning",
        productUrl: "https://mvision.ai/dose/",
        keyFeatures: [
          "Fully automated VMAT/IMRT planning",
          "Minutes-to-plan generation time",
          "Clinical objectives optimization",
          "Consistent plan quality",
          "Seamless TPS integration"
        ]
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT", "Structure sets", "Clinical goals", "Contrast-enhanced CT"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Synthetic CT images", "Propagated contours", "Treatment plans", "Dose distributions"],
      outputFormat: ["DICOM", "DICOM-RT"]
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
        status: "510(k) Cleared (Dose+ module)",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "AI-powered solution that automates radiotherapy workflows from imaging to treatment planning. Unifies AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation in a single vendor-neutral, cloud-native platform to support clinicians in standardizing, reviewing, and adapting the course of treatment while enabling faster and more informed decision-making."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "1.0",
    releaseDate: "2025-10-21",
    lastUpdated: "2025-12-01",
    lastRevised: "2025-12-01",
    source: "Company provided information",
    clinicalEvidence: "CE Mark Class IIa certification achieved October 21, 2025. One of the first truly cloud-native, vendor-neutral solutions to unify AI-powered contouring, dose prediction, synthetic CT generation, and contour propagation in a single platform. Designed for clinical efficiency and interoperability with seamless integration into hospital PACS, treatment planning systems, and oncology information systems. Cleared for clinical use across Europe and other MDR-recognized markets."
  }
];

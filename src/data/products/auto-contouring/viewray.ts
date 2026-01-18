import { ProductDetails } from "@/types/productDetails";

export const VIEWRAY_PRODUCTS: ProductDetails[] = [
  {
    id: "viewray-mridian-a3i",
    name: "MRIdian A3i",
    company: "ViewRay",
    category: "Auto-Contouring",
    secondaryCategories: ["Tracking"],
    description: "MRI-guided radiotherapy system with AI-powered auto-contouring, on-table adaptive replanning (Auto-Adapt), and real-time tissue tracking with automatic beam gating (Auto-Gating).",
    certification: "CE & FDA",
    logoUrl: "/logos/Viewray.png",
    companyUrl: "https://www.viewray.com/",
    productUrl: "https://www.viewray.com/mridian/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Abdomen", "Thorax"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Pancreatic Cancer", "Prostate Cancer", "Lung Cancer", "Liver Cancer"],
    keyFeatures: [
      "AI-powered auto-contouring (37+ structures)",
      "On-table adaptive replanning (Auto-Adapt)",
      "Real-time tissue tracking up to 8 fps",
      "Automatic beam gating (Auto-Gating)",
      "Diffusion-Weighted Imaging (DWI)",
      "0.35T diagnostic-quality MRI (SmartVISION)"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI (0.35T)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Gating signals"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["MRIdian Linac", "Treatment Planning System"],
      deployment: ["Integrated system"],
      triggerForAnalysis: "Automatic during treatment",
      processingTime: "Real-time (8 fps)"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K212274",
        decisionDate: "2021-12-01",
        notes: "MRIdian A3i features including Intelligent Adaptive capabilities"
      },
      intendedUseStatement: "For MRI-guided radiation therapy with real-time adaptive capabilities."
    },
    market: {
      onMarketSince: "2021"
    },
    evidence: [
      {
        type: "Product Information",
        description: "MRIdian A3i FDA Clearance Announcement",
        link: "https://www.appliedradiationoncology.com/articles/fda-clears-mridian-a3i-radiation-therapy-features-announced-at-astro"
      }
    ],
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "FDA 510(k) database (K212274), ViewRay official website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/viewray.ts"
  }
];

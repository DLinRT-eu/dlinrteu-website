// Archived: 2026-01-29
// Reason: Product uses deformable image registration, NOT AI/Deep Learning technology
// The "auto-contouring" is contour propagation via classical algorithms, not neural networks
// Sources: FDA K162393, K181989, PMC6630153 technical paper

import { ProductDetails } from "@/types/productDetails";

export const VIEWRAY_ARCHIVED_PRODUCTS: ProductDetails[] = [
  {
    id: "viewray-mridian-a3i",
    name: "MRIdian A3i",
    company: "ViewRay",
    category: "Tracking",
    secondaryCategories: [],
    description: "MRI-guided radiotherapy system with deformable registration-based contour propagation, on-table adaptive replanning (Auto-Adapt), and real-time tissue tracking with automatic beam gating (Auto-Gating). Note: Uses classical image processing algorithms, not AI/deep learning.",
    certification: "CE & FDA",
    logoUrl: "/logos/Viewray.png",
    companyUrl: "https://viewraysystems.com/",
    productUrl: "https://viewraysystems.com/mridian-a3i/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Abdomen", "Thorax"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Pancreatic Cancer", "Prostate Cancer", "Lung Cancer", "Liver Cancer"],
    usesAI: false,
    keyFeatures: [
      "Deformable registration-based contour propagation",
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
      outputFormat: ["DICOM-RTSTRUCT"]
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
        clearanceNumber: "K181989",
        decisionDate: "2019-02-01",
        notes: "MRIdian Linac System update. Original clearance K162393 (2017)."
      },
      intendedUseStatement: "The ViewRay (MRIdian) Linac system, with magnetic resonance imaging capabilities, is intended to provide stereotactic radiosurgery and precision radiotherapy for lesions, tumors, and conditions anywhere in the body where radiation treatment is indicated."
    },
    market: {
      onMarketSince: "2017"
    },
    evidence: [
      {
        type: "Product Information",
        description: "ViewRay MRIdian A3i Official Product Page",
        link: "https://viewraysystems.com/mridian-a3i/"
      },
      {
        type: "Technical Paper",
        description: "Technical assessment of MRIdian system capabilities",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6630153/"
      }
    ],
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "FDA 510(k) database (K162393, K181989), ViewRay official website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/archived/viewray.ts"
  }
];

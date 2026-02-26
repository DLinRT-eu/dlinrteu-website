
import { ProductDetails } from "@/types/productDetails";

export const GE_MR_CONTOUR_DL_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-mr-contour-dl",
    name: "MR Contour DL",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-mr-contour-dl.ts",
    description: "AI-powered auto-segmentation solution for MRI-based radiation therapy planning, providing automated organ-at-risk contouring for head & neck and pelvic anatomies.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/",
    anatomicalLocation: ["Head & Neck", "Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "MRI-based auto-segmentation",
      "37+ organ structures supported",
      "Integrated with GE MRI systems",
      "Part of GE iRT platform ecosystem"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["GE MRI systems", "GE iRT Platform"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "IIa",
        type: "MDR",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242925",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-04-01",
        notes: "Previous clearance: K213717. Standalone MRI-based auto-contouring component also integrated into GE iRT platform."
      },
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk from MRI images."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "GE Healthcare enterprise solutions"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "No independent peer-reviewed publications identified. Evidence based on FDA clearance documentation. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "Provides automated MRI-based contouring within GE imaging ecosystem. No published outcome data.",
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K242925). Entry needs further research and verification."
  }
];

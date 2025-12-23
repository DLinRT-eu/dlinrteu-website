
import { ProductDetails } from "@/types/productDetails";
import { MVISION_ALL_STRUCTURES } from "./mvision-structures";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-contouring",
    name: "Contour+",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://www.mvision.ai/ai-contouring/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/mvision.ts",
    description: "AI-powered auto-contouring solution for radiation therapy planning with deep learning algorithms for accurate guideline-based organ-at-risk and lymph node region delineation.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://www.mvision.ai/ai-contouring/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered segmentation",
      "Fast processing",
      "Clinical workflow integration",
      "Cloud or on-premise deployment"
    ],
    supportedStructures: MVISION_ALL_STRUCTURES,
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "AAPM TG-275",
        version: "2022",
        reference: "https://doi.org/10.1002/mp.15419",
        url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
        compliance: "partial"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K193053",
        type: "510(k)"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk and lymph node regions in radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
    },
    contactEmail: "info@mvision.ai",
    version: "1.3.1",
    releaseDate: "2025-10-27",
    lastUpdated: "2025-12-23",
    lastRevised: "2025-12-23",
    source: "Company verified - Norina Predescu (MVision AI)"
  }
];

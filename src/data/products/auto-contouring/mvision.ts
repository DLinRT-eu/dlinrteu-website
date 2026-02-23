
import { ProductDetails } from "@/types/productDetails";
import { MVISION_ALL_STRUCTURES } from "./mvision-structures";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-contouring",
    name: "Contour+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/contour/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/mvision.ts",
    description: "AI-powered auto-contouring solution for radiation therapy planning with deep learning algorithms for accurate guideline-based organ-at-risk and lymph node region delineation. Supports 300+ structures including 90 lymph node areas and follows 25+ international contouring guidelines.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/contour/",
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
      outputFormat: ["DICOM-RTSTRUCT"]
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
        type: "510(k)",
        clearanceNumber: "K241490",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-10-18",
        notes: "Latest version. Previous clearances: K193053 (2020)"
      },
      tga: {
        status: "Approved",
        notes: "MR Models approved February 2025"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk and lymph node regions in radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      availability: "Global - CE, FDA, TGA, Singapore, UAE, Morocco"
    },
    contactEmail: "info@mvision.ai",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multi-center comparative study (Doolan et al. 2023) of 5 AI systems on 80 patients across 4 anatomies (breast, H&N, lung, prostate). Additional studies: Kiljunen (Diagnostics 2020), Langmack (BJR 2024). 11+ peer-reviewed studies across 17 clinics in 12 countries.",
    clinicalImpactNotes: "Demonstrates workflow time savings and geometric accuracy improvements across multiple anatomical sites and institutions.",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Multi-center comparison of 5 AI auto-contouring systems on 80 patients (breast, H&N, lung, prostate)",
        link: "https://doi.org/10.3389/fonc.2023.1213068"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Performance evaluation of MVision AI Contour+ in gastric MALT lymphoma segmentation (DSC 0.92-0.99)",
        link: "https://doi.org/10.5603/rpor.104144"
      }
    ],
    version: "1.3.1",
    releaseDate: "2025-10-27",
    lastUpdated: "2025-12-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K241490), company official sources"
  }
];

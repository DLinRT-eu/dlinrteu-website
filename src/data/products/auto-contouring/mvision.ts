
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
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "10 PubMed-indexed studies. Key: Pang et al. NPJ Digit Med 2025 (multicentre H&N evaluation across 9 clinics, 7 countries), Podobnik et al. Sci Rep 2025 (3-system H&N comparison), Tang et al. Clin Transl Radiat Oncol 2025 (breast target volumes), Meyer et al. Radiat Oncol 2024 (OARs and lymph nodes), Kiljunen et al. Diagnostics 2020 (multicenter 30 patients, 6 clinics). Doolan et al. Front Oncol 2023 (5-system comparison, 80 patients). PubMed verified 2026-02-26.",
    clinicalImpactNotes: "Demonstrates workflow time savings and geometric accuracy improvements across multiple anatomical sites. Multicentre validation shows auto-segmentation harmonizes contouring practices globally.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Pang et al. Multicentre evaluation of deep learning CT autosegmentation of H&N (9 clinics, 7 countries). NPJ Digit Med 2025;8(1):312",
        link: "https://doi.org/10.1038/s41746-025-01624-z"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Podobnik et al. Geometric, dosimetric and psychometric evaluation of 3 AI software for H&N OAR auto-segmentation. Sci Rep 2025;15(1):33396",
        link: "https://doi.org/10.1038/s41598-025-18598-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Meyer et al. AI contouring in RT for OARs and lymph node areas. Radiat Oncol 2024;19(1):168",
        link: "https://doi.org/10.1186/s13014-024-02554-y"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Doolan et al. Clinical evaluation of 5 commercial AI contouring systems on 80 patients. Front Oncol 2023;13:1213068",
        link: "https://doi.org/10.3389/fonc.2023.1213068"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kiljunen et al. Multicenter DL-based automated CT segmentation for prostate cancer (30 patients, 6 clinics). Diagnostics 2020;10(11):959",
        link: "https://doi.org/10.3390/diagnostics10110959"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Performance evaluation in gastric MALT lymphoma segmentation (DSC 0.92-0.99). Rep Pract Oncol Radiother",
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

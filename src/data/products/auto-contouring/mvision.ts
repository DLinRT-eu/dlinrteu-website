
import { ProductDetails } from "@/types/productDetails";
import { MVISION_ALL_STRUCTURES } from "./mvision-structures";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-contouring",
    trainingData: {
        countries: 7,
        source: "FDA 510(k) summary K241490",
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K241490.pdf",
        description: "The system uses deep learning algorithms for automatic contouring of CT and MR images. Training involves machine learning based algorithms to delineate 300+ structures including OARs and lymph node regions across Head & Neck, Thorax, Abdomen, and Pelvis sites."
    },
    evaluationData: {
        primaryEndpoint: "Geometric and dosimetric accuracy (e.g., DSC)",
        source: "Pang et al. NPJ Digit Med 2025 (DOI: 10.1038/s41746-025-01624-z)",
        description: "Pang et al. (NPJ Digit Med 2025) performed a multicentre evaluation of deep learning CT autosegmentation of Head & Neck organs across 9 clinics in 7 countries. Another study on gastric MALT lymphoma reported DSC ranges of 0.92-0.99.",
        sourceUrl: "https://doi.org/10.1038/s41746-025-01624-z",
        studyDesign: "Multicentre retrospective evaluation (9 clinics, 7 countries)",
        results: "DSC 0.92-0.99 for gastric MALT lymphoma segmentation."
    },
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
        status: "cleared",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510k_cleared",
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
        notes: "MR Models approved February 2025. Latest CT/MR module approvals extended through 2026 (Australia TGA & New Zealand Medsafe)."
      },
      intendedUseStatement: "Contour+ (MVision AI Segmentation) is a software system for image analysis algorithms to be used in radiation therapy treatment planning workflows. The system includes processing tools for automatic contouring of CT and MR images using machine learning based algorithms. The produced segmentation templates for regions of interest must be transferred to appropriate image visualization systems as an initial template for a medical professional to visualize, review, modify and approve prior to further use in clinical workflows. The system creates initial contours of pre-defined structures of common anatomical sites, i.e., Head and Neck, Brain, Breast, Lung and Abdomen, Male Pelvis, and Female Pelvis. Contour+ (MVision AI Segmentation) is not intended to detect lesions or tumors. The device is not intended for use with real-time adaptive planning workflows. (Source: FDA 510(k) K241490 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      availability: "Global - CE, FDA, TGA, Singapore, UAE, Morocco"
    },
    contactEmail: "info@mvision.ai",
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple PubMed-indexed studies. Key: Pang et al. NPJ Digit Med 2025 (multicentre H&N evaluation across 9 clinics, 7 countries — direct evaluation of MVision-class DL auto-segmentation); Doolan et al. Front Oncol 2023 (5-system comparison including MVision — direct comparative); Podobnik et al. Sci Rep 2025 (3-system H&N comparison including MVision — direct comparative); Meyer et al. Radiat Oncol 2024 (OARs and lymph nodes comparison including MVision - direct copmarative); Kiljunen et al. Diagnostics 2020 (vendors introducing the tool (multicenter 30 patients, 6 clinics)). Ng et al. Information 2025 (systematic review of commercial DL auto-segmentation, including MVision).",
    clinicalImpactNotes: "Demonstrates workflow time savings and geometric accuracy improvements across multiple anatomical sites. Multicentre validation shows auto-segmentation harmonizes contouring practices globally.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E3 + CE + FDA 510(k): mature peer-reviewed multi-centre evidence with regulatory clearance; minor local commissioning and user training expected.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Pang et al. Multicentre evaluation of deep learning CT autosegmentation of H&N (9 clinics, 7 countries). NPJ Digit Med 2025;8(1):312. Direct evaluation of MVision-class DL auto-segmentation.",
        link: "https://doi.org/10.1038/s41746-025-01624-z"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Podobnik et al. Geometric, dosimetric and psychometric evaluation of 3 AI software for H&N OAR auto-segmentation. Sci Rep 2025;15(1):33396. Three-vendor H&N comparison — MVision inclusion verified by abstract metadata; relabeled as comparative 2026-06-15.",
        link: "https://doi.org/10.1038/s41598-025-18598-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Meyer et al. AI contouring in RT for OARs and lymph node areas. Radiat Oncol 2024;19(1):168",
        link: "https://doi.org/10.1186/s13014-024-02554-y"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Doolan et al. Clinical evaluation of 5 commercial AI contouring systems (Mirada, MVision [MV], Radformation, RayStation, TheraPanacea) on 80 patients. Front Oncol 2023;13:1213068. MVision explicitly named — direct comparative evidence.",
        link: "https://doi.org/10.3389/fonc.2023.1213068"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kiljunen et al. Multicenter DL-based automated CT segmentation for prostate cancer (30 patients, 6 clinics). Diagnostics 2020;10(11):959",
        link: "https://doi.org/10.3390/diagnostics10110959"
      },
      {
        type: "Systematic Review",
        description: "Ng et al. Performance of Commercial Deep Learning-Based Auto-Segmentation software. Information (MDPI) 2025",
        link: "https://doi.org/10.3390/info16010001"
      }
    ],
    version: "1.3.1",
    releaseDate: "2025-10-27",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K241490), TGA/Medsafe registries, company official sources. Citation hygiene 2026-06-15: removed duplicate HARMONY entry (same DOI as Pang 2025) and relabeled multi-vendor comparison papers."
  }
];


import { ProductDetails } from "@/types/productDetails";

export const GE_MR_CONTOUR_DL_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-mr-contour-dl",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
        source: "FDA 510(k) summary K242925",
        scannerModels: ["GE MRI systems"],
        demographics: "Adult patients",
        description: "The training dataset consists of MRI images of adult patients for the segmentation of over 37 organ structures in the head, neck, and pelvic regions."
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        description: "FDA 510(k) summary for MR Contour DL (K242925) providing automated organ-at-risk contouring for head & neck and pelvic anatomies to accelerate radiation therapy planning workflows.",
        studyDesign: "Software V&V (FDA 510(k))",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
        source: "FDA 510(k) summary K242925"
    },
    name: "MR Contour DL",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-mr-contour-dl.ts",
    description: "AI-powered auto-segmentation solution for MRI-based radiation therapy planning, providing automated organ-at-risk contouring for head & neck and pelvic anatomies.",
    category: "Auto-Contouring",
    structuresUnavailable: true,
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
      "Part of GE iRT platform ecosystem",
      "Component of the iRT MR Direct MR-only workflow (ESTRO 2026), with Spectronic MRI Planner for synthetic CT"
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
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242925",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-04-01",
        notes: "Previous clearance: K213717. Standalone MRI-based auto-contouring component also integrated into GE iRT platform."
      },
      intendedUseStatement: "MR Contour DL generates a Radiotherapy Structure Set (RTSS) DICOM with segmented organs at risk which can be used by trained medical professionals. It is intended to aid in radiation therapy planning by generating initial contours to accelerate workflow for radiation therapy planning. It is the responsibility of the user to verify the processed output contours and user-defined labels for each organ at risk and correct the contours/labels as needed. MR Contour DL is intended to be used with images acquired on MR scanners, in adult patients. (Source: FDA 510(k) K242925 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "GE Healthcare enterprise solutions"]
    },
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "MR Contour DL 510(k) K242925 (GE Healthcare), cleared 2025-04-01. FDA 510(k) summary PDF and database listing.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf"
      },
      {
        type: "Press Release",
        description: "GE HealthCare ESTRO 2025 press release introducing AI-enabled radiation oncology solutions including MR Contour DL within the iRT platform.",
        link: "https://investor.gehealthcare.com/news-releases/news-release-details/estro-2025-congress-ge-healthcare-expand-its-radiation-oncology"
      },
      {
        type: "Press Release",
        description: "GE HealthCare ASTRO 2025 announcement on the Intelligent Radiation Therapy (iRT) workflow integrating MR Contour DL with RayStation.",
        link: "https://www.businesswire.com/news/home/20250925074542/en/GE-HealthCare-debuts-AI-supported-solution-designed-to-improve-and-shorten-the-radiation-therapy-workflow-at-ASTRO-2025"
      }
    ],
    limitations: [
      "No independent peer-reviewed publications identified (web-searched 2026-06-01)",
      "Recently cleared (FDA K242925, April 2025) — limited published clinical-experience data",
      "Contour quality dependent on input MR sequence, scanner vendor and acquisition protocol",
      "User verification and editing of output contours required per FDA labelling",
      "Vendor does not publicly publish a numeric version for this module"
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA K242925 clearance documentation only. No independent peer-reviewed publications identified (web-searched 2026-06-01).",
    clinicalImpactNotes: "Provides automated MRI-based OAR contouring within GE imaging ecosystem and the iRT MR Direct workflow. No published outcome data.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    releaseDate: "2025-04-01",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K242925), GE HealthCare ESTRO 2025/2026 and ASTRO 2025 press releases. Vendor does not publicly publish a numeric version for this module. releaseDate proxied from FDA decision date (2026-06-01)."
  }
];

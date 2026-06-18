
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-syngo-ct",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232799.pdf",
        disclosureLevel: "minimal",
        description: "The software uses multiple pre-defined MR acquisitions to generate synthetic CT images for adult patients. Training involves datasets for specific anatomical regions including Brain and Pelvis.",
        source: "FDA 510(k) summary K232799"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k)) and single-center clinical validations",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232799.pdf",
        source: "FDA 510(k) summary K232799",
        description: "Synthetic CT generation for brain and pelvic cancer patients, demonstrating technical efficacy and clinical utility for radiotherapy planning. Peer-reviewed literature (e.g., Aljaafari et al. 2025) and single-center validations support its use.",
        results: "Technical efficacy demonstrated for brain and pelvic synthetic CT generation.",
        primaryEndpoint: "Not specified"
    },
    name: "syngo.via RT Image Suite",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct",
    description: "Advanced imaging solution for radiation therapy planning. Provides synthetic CT generation from MR data, 3D/4D image visualization, multi-modality contouring, deformable image registration, and dual-energy integration within the syngo.via platform.",
    features: ["Synthetic CT generation", "Auto-contouring support", "Deformable image registration", "4D CT analysis", "Dual-energy integration", "Multimodality image registration", "Treatment planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/siemens.ts",
    website: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/syngovia-rt-image-suite",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "MR-based synthetic CT for brain and pelvis",
      "AI-assisted auto-contouring via DI2IN engine (shared with AI-Rad Companion Organs RT)",
      "Deformable image registration",
      "4D CT visualization and analysis",
      "Dual-energy CT integration",
      "Integrated RT planning workflow",
      "Automated processing"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "syngo.via platform integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within syngo.via workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K232799",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-04-26",
        notes: "K232799 (Apr 2024). Prior clearances: K220783 (Sep 2022), K211379 (Jul 2021), K201444 (Aug 2020)"
      },
      intendedUseStatement: "syngo.via RT Image Suite is a 3D and 4D image visualization, multi-modality manipulation and contouring tool that helps the preparation of treatments such as, but not limited to those performed with radiation (for example, Brachytherapy, Particle Therapy, External Beam Radiation Therapy). The software combines tools for generation of a synthetic CT based on multiple pre-defined MR acquisitions. (Source: FDA 510(k) K232799 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"],
    },
    version: "VB80",
    releaseDate: "2024-09-20",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Company website; FDA 510(k) K232799; indirect-comparative MESCAL 2026 (Cusumano, Maspero et al. Radiother Oncol, DOI 10.1016/j.radonc.2026.111530)",
    evidence: [
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative. Radiother Oncol 2026. Community benchmark dataset and acceptance levels for MR-only RT commissioning; not a direct syngo.via evaluation.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      }
    ],
    relatedProducts: [
      {
        id: "siemens-ai-rad-companion",
        relationship: "Shares the DI2IN OAR contouring engine with AI-Rad Companion Organs RT. Literature evaluating 'Siemens syngo.via' contouring (Lin/Fan JACMP 2025) directly applies to this product; Rayn et al. J Cancer Res Ther 2024 evaluates the same underlying algorithm under the AI-Rad Companion name."
      }
    ],
    evidenceRigor: "E1",
    evidenceRigorNotes: "Published clinical studies on syngo.via RT synthetic CT referenced in peer-reviewed literature; single-center validations available. MESCAL 2026 (Cusumano, Maspero et al.) included as indirect-comparative community benchmark, not a direct syngo.via evaluation.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated in clinical studies for brain and pelvic synthetic CT generation.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  }
];

import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-precision-dl",
    name: "Precision DL",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "Deep learning-based PET image enhancement that improves image quality and enables potential dose reduction while maintaining diagnostic confidence.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/molecular-imaging/pet-ct",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/ge-healthcare.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["PET", "PET/CT"],
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiac conditions"],
    releaseDate: "2023-05-22",
    keyFeatures: [
      "Deep learning-based PET image enhancement",
      "Improved signal-to-noise ratio",
      "Potential for reduced tracer dose",
      "Compatible with various PET/CT systems"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["PET images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["GE PET/CT systems", "PACS"],
      deployment: ["On-scanner", "Workstation"]
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K230082",
        regulationNumber: "21 CFR 892.2050",
        productCode: "MYN",
        type: "510(k)",
        decisionDate: "2023-05-22"
      },
      intendedUseStatement: "Precision DL is intended for use in PET image enhancement to improve image quality through noise reduction."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Integrated in PET/CT systems", "Software upgrade"]
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K230082 for Precision DL - Class II device",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA validation K230082. Limited independent peer-reviewed publications.",
    clinicalImpactNotes: "Workflow improvement through enhanced PET image quality and potential dose reduction.",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database"
  },
  {
    id: "ge-air-recon-dl-enhancement",
    name: "AIR Recon DL Enhancement Mode",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "MR image enhancement solution using deep learning to improve signal-to-noise ratio and image sharpness in existing MR images.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncological diseases"],
    releaseDate: "2021-11-10",
    version: "1.5",
    keyFeatures: [
      "Deep learning MR image enhancement",
      "Improved signal-to-noise ratio without blurring",
      "Enhanced spatial resolution",
      "Compatible with all contrast weightings",
      "Can process previously acquired examinations"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Edison Platform", "AW Workstations"],
      deployment: ["On-premise", "Cloud option"],
      triggerForAnalysis: "Manual selection or rule-based",
      processingTime: "<10 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        notes: "Part of GE AIR Recon DL platform clearances (K193282, K213717)"
      },
      intendedUseStatement: "Intended for use in enhancing MR image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Edison Marketplace"],

},
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple peer-reviewed publications including Lee et al. 2022 MR enterography, Karaarslan et al. 2022 prostate MRI. Part of broader AIR Recon DL platform with 30+ publications.",
    clinicalImpactNotes: "Workflow improvement through enhanced MR image quality enabling faster scan protocols.",
    clinicalEvidence: "Reader studies showing improved diagnostic confidence and lesion conspicuity compared to standard MR images",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database and company website",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K193282 received March 12, 2020 - Class II device under 21 CFR 892.1000",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K213717 received May 10, 2022 - Class II device under 21 CFR 892.1000",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213717.pdf",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lee et al. AIR Recon DL for MR enterography evaluation",
        link: "https://doi.org/10.1002/jmri.28239",
      },
    ],
    limitations: [
      "Tight vendor integration, can only be used with specific GE scanners",
    ],
  }
];

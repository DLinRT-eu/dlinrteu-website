
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-syngo-ct",
    name: "syngo.via RT Image Suite",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct",
    description: "Advanced imaging solution for radiation therapy planning including synthetic CT generation from MR data.",
    features: ["Synthetic CT generation", "Multimodality image registration", "Treatment planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/siemens.ts",
    website: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/syngovia-rt-image-suite",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["MR-based synthetic CT", "Integrated workflow", "Automated processing"],
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
        status: "Certified",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K232799",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-04-26",
        notes: "K232799 (Apr 2024). Prior clearances: K220783 (Sep 2022), K211379 (Jul 2021), K201444 (Aug 2020)"
      },
      intendedUseStatement: "For creating synthetic CT datasets from MR images to be used in radiation therapy planning."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"],
    },
    version: "VB80",
    releaseDate: "2024-09-20",
    lastUpdated: "2026-03-24",
    lastRevised: "2026-03-24",
    source: "Company website",
    evidenceRigor: "E1",
    evidenceRigorNotes: "Published clinical studies on syngo.via RT synthetic CT referenced in peer-reviewed literature (e.g., Aljaafari et al. 2025 review). Single-center validations available.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated in clinical studies for brain and pelvic synthetic CT generation."
  }
];

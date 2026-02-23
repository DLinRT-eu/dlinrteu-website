import { ProductDetails } from "@/types/productDetails";

export const VYSIONER_PRODUCTS: ProductDetails[] = [
  {
    id: "vysioner-vbrain",
    name: "Vbrain",
    company: "Vysioneer",
    companyUrl: "https://www.vysioneer.com/",
    productUrl: "https://www.vysioneer.com/solutions/vbrain",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/vysioner.ts",
    description: "AI-powered brain tumor auto-contouring solution for radiation therapy planning, including brain metastases, meningioma, and acoustic neuroma.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/vysioner.png",
    website: "https://www.vysioneer.com/solutions/vbrain",
    anatomicalLocation: ["Brain"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Tumors", "Metastases", "Acoustic Neuroma"],
    keyFeatures: ["AI-powered brain tumor segmentation", "Fast processing", "Multiple tumor support"],
    supportedStructures: [
  "Brain: Brain Metastases",
  "Brain: Meningioma",
  "Brain: Acoustic Neuroma",
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"],
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case",
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K212116",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2021-10-12",
        notes: "VBrain-OAR clearance. First AI tumor auto-contouring FDA clearance for radiation therapy (April 2021)"
      },
      intendedUseStatement: "For automatic segmentation of brain tumors in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
    },
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Wang et al., Radiat Oncol 2023 - stratified SRS assessment. Liang et al., IJROBP 2021. Single-center retrospective studies.",
    clinicalImpactNotes: "Demonstrates improved contouring accuracy and efficiency for brain metastases in single-center settings.",
    version: "2.5",
    releaseDate: "2023-10-05",
    lastUpdated: "2024-03-10",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K212116), company official sources, Vysioneer VBrain product page, Radiat Oncol 2023 validation study (10.1186/s13014-023-02246-z)",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Stratified SRS assessment of VBrain for brain metastases",
        link: "https://doi.org/10.1186/s13014-023-02246-z"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Deep learning brain metastases auto-segmentation evaluation",
        link: "https://doi.org/10.1016/j.ijrobp.2021.03.060"
      }
    ],
    limitations: [
      "Limited to brain tumor segmentation only",
      "Performance varies with MRI sequence quality",
      "Requires T1 post-contrast for optimal performance",
      "Reduced accuracy for tumors smaller than 0.5cm",
    ],
  },
];

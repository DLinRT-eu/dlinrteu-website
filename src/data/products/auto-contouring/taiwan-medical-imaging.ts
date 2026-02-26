import { ProductDetails } from "@/types/productDetails";

const BRAIN_METASTASES_STRUCTURES = [
  {
    name: "Brain_GTV",
    type: "GTV" as const,
    description: "Gross Tumor Volume for brain metastases"
  }
];

export const TAIWAN_MEDICAL_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "taimedimg-deepmets",
    name: "TAIMedImg DeepMets",
    company: "Taiwan Medical Imaging Co.",
    companyUrl: "https://www.taimedimg.tw/",
    productUrl: "https://www.taimedimg.tw/en/samd/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/taiwan-medical-imaging.ts",
    description: "Intelligent assistant specialized in interpreting brain MRI images with advanced segmentation capabilities and longitudinal follow-up of GTV for brain metastases treatment planning.",
    category: "Auto-Contouring",
    certification: "Taiwan's Food and Drug Administration (TFDA) approval for SaMD, FDA 510(k)" ,
    logoUrl: "/logos/Taiwan_MedImag.svg",
    website: "https://www.taimedimg.tw/en/samd/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases"],
    keyFeatures: [
      "Brain-specific AI interpretation",
      "GTV longitudinal analysis",
      "Treatment response assessment",
      "Multi-timepoint comparison"
    ],
    supportedStructures: BRAIN_METASTASES_STRUCTURES,
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients with brain metastases. Intended for lesions with diameter >= 10mm on contrast-enhanced T1-weighted MRI.",
      input: ["MRI T1+Gd (Gadolinium contrast-enhanced)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "RESTful API"],
      deployment: ["On-premise", "Cloud-based"],
      triggerForAnalysis: "Automatic on image import or manual trigger",
      processingTime: "-"
    },
    regulatory: {
      ce: {
        status: "not_applicable",
        class: "",
        type: ""
      },
      fda: {
        status: "510k_cleared",
        class: "II",
        clearanceNumber: "K250427",
        productCode: "QKB, QIH",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-05-28",
        notes: "Cleared for automatic detection and segmentation of brain metastases on contrast-enhanced T1-weighted MRI images. Device provides contour output for radiation therapy planning."
      },
      intendedUseStatement: "DeepMets is a software-only device intended to be used for automatic detection, delineation, and longitudinal tracking of brain metastases on contrast-enhanced T1-weighted MRI images. The software provides contour output compatible with radiation therapy treatment planning systems."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Regional partners"]
    },
    version: "-",
    releaseDate: "2022-09-01",
    evidenceRigor: "E1",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA validation K250427 only. No peer-reviewed publications found. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "FDA validation data available but no independent clinical evidence published. PubMed searched 2026-02-26.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    companyRevisionDate: "",
    source: "FDA 510(k) K250427 (https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250427.pdf), Taiwan Medical Imaging official website"
  }
];

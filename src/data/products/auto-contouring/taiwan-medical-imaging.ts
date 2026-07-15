import { ProductDetails } from "@/types/productDetails";

const BRAIN_METASTASES_STRUCTURES = [
  {
    name: "GTV_BrainMet",
    type: "GTV" as const,
    description: "Gross Tumor Volume contour for brain metastases (TG-263 compliant name)"
  }
];

export const TAIWAN_MEDICAL_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "taimedimg-deepmets",
    trainingData: {
        source: "FDA 510(k) summary K250427",
        scannerModels: ["MRI"],
        disclosureLevel: "minimal",
        description: "The model is trained to provide GTV contours for known brain metastases on axial contrast-enhanced T1-weighted brain MRI (T1WI+C). FDA clearance is specifically for lesions with diameter >= 10 mm.",
        demographics: "Adult patients with known (imaging-diagnosed) brain metastases.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250427.pdf"
    },
    evaluationData: {
        results: "Mean DSC ≈0.60, lesion-wise sensitivity ~52%, and PPV 78%.",
        source: "Akdemir et al., Journal of Neuro-Oncology (DOI 10.1007/s11060-025-05294-5)",
        studyDesign: "Software V&V (FDA 510(k)) and peer-reviewed external validation",
        primaryEndpoint: "DICE similarity coefficient (DSC)",
        sourceUrl: "https://doi.org/10.1007/s11060-025-05294-5",
        description: "External validation shows variable performance with lesion-wise sensitivity ~52%, PPV 78%, and mean DSC ≈0.60, with substantial revision rates reported for many cases. Use is limited to lesions with diameter >= 10 mm."
    },
    name: "TAIMedImg DeepMets",
    company: "Taiwan Medical Imaging Co.",
    companyUrl: "https://www.taimedimg.tw/",
    productUrl: "https://www.taimedimg.tw/en/samd/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/taiwan-medical-imaging.ts",
    description: "AI software that provides initial GTV contours for known brain metastases on axial contrast-enhanced T1-weighted brain MRI. Automatic outputs are intended as initial contours and require review and finalization by a trained medical professional before use in treatment planning.",
    category: "Auto-Contouring",
    certification: "TFDA SaMD (2022), FDA 510(k) K250427; regional registrations reported (e.g., Vietnam)",
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
      population: "Adult patients with known (imaging-diagnosed) brain metastases. FDA-cleared use limited to lesions with diameter >= 10 mm on axial contrast-enhanced T1-weighted MRI; excludes certain cases (e.g., prior craniotomy) per FDA summary.",
      input: ["Axial contrast-enhanced T1-weighted brain MRI (T1WI+C)"],
      inputFormat: ["DICOM"],
      output: ["Initial GTV contours / Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "RESTful API"],
      deployment: ["On-premise", "Cloud-based", "Federated/on-premise data-node deployment"],
      triggerForAnalysis: "Automatic on image import or manual trigger",
      processingTime: "Within minutes per MRI examination"
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
        notes: "Cleared to provide initial object/GTV contours on axial contrast-enhanced T1-weighted brain MR images for adult patients with known imaging-diagnosed brain metastases (lesion diameter >= 10 mm). Outputs are intended as initial contours that require review and finalization by a trained medical professional."
      },
      intendedUseStatement: "TAIMedImg DeepMets is a software-only device intended to assist trained medical professionals by providing initial object/GTV contours on axial T1-weighted contrast-enhanced brain MR images to accelerate radiation therapy treatment planning for adult patients with known imaging-diagnosed brain metastases with lesion diameter >= 10 mm. It is an adjunctive tool; all automatic outputs must be reviewed and finalized by a trained medical professional."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Regional partners"]
    },
    version: "-",
    releaseDate: "2022-09-01",
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA 510(k) K250427 performance summary plus one peer-reviewed external validation (Akdemir et al. 2025) showing variable performance. No further independent literature — E1.",
    clinicalImpactNotes: "Technical feasibility demonstrated; external validation shows variable performance (lower sensitivity for small lesions) and high revision rates, indicating limited clinical impact without prospective outcome data.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-06-13",
    keyPapers: [
    {"doi":"10.1007/s11060-025-05294-5","title":"External validation of DeepMets brain metastases contouring","authors":"Akdemir E et al.","journal":"J Neurooncol","year":"2025"}
  ],
    lastRevised: "2026-07-15",
    companyRevisionDate: "",
    source: "FDA 510(k) K250427 (https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250427.pdf), Akdemir et al., Journal of Neuro-Oncology (DOI 10.1007/s11060-025-05294-5), TAIMedimg official website, industry reports"
  }
];

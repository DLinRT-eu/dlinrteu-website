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
    evidence: [
      {
        type: "Clinical Study",
        description: "Akdemir et al. J Neurooncol 2025: External retrospective evaluation of a DeepMets-associated federated AI algorithm in 50 SRS patients (236 metastases). Lesion-wise sensitivity 52.1%, PPV 78.0%, mean DSC 0.60; 46.3% of contours required major revision, with poorer performance for small lesions. Many metastases were below the FDA-cleared >= 10 mm threshold.",
        link: "https://doi.org/10.1007/s11060-025-05294-5"
      }
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
    evidenceRigor: "E2",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes: "E2: FDA K250427 standalone testing on 158 independent US patients from 16 imaging facilities (lesions >= 10 mm; lesion-wise sensitivity 89.97%, mean Dice 0.70) plus one peer-reviewed external clinical evaluation (Akdemir et al. 2025) across a broader lesion-size range (sensitivity 52.1%, mean Dice 0.60). The external study had Taiwan AI Labs-affiliated co-authors, so independence is limited; no prospective workflow or outcome evidence for E3.",
    clinicalImpactNotes: "L2: FDA testing and external evaluation demonstrate technical accuracy for brain metastasis contouring, dependent on lesion size and imaging characteristics. Reduced sensitivity for small metastases and frequent major revisions support an assistive role under clinician supervision; no evidence yet of workflow, decision or outcome benefit.",
    limitations: [
      "FDA-cleared use is restricted to known brain metastases >= 10 mm on axial contrast-enhanced T1-weighted MRI in adults; smaller metastases, other brain tumours and other sequences are outside the stated indication",
      "Patients with prior craniotomy and scans with excessive motion artefacts are excluded",
      "External validation (Akdemir et al. 2025) showed reduced sensitivity for small lesions, mean Dice 0.60 and major contour revisions in 46.3% of evaluated segmentations; contours may underestimate lesion margins",
      "No built-in manual contour editing; outputs must be reviewed and finalised in compatible external software before treatment planning"
    ],
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-10-15",
    keyPapers: [
    {"doi":"10.1007/s11060-025-05294-5","title":"Evaluating the efficacy of a federated AI algorithm in assisting in the detection and segmentation of brain metastases: limitations and opportunities","authors":"Akdemir EY et al.","journal":"J Neurooncol","year":"2025","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"External retrospective SRS cohort (50 patients, 236 metastases) with detection/segmentation endpoints; developer-affiliated co-authors.","externalValidation":true}
  ],
    lastRevised: "2026-08-25",
    companyRevisionDate: "",
    source: "FDA 510(k) K250427; vendor website; peer-reviewed literature"
  }
];

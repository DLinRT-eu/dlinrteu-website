import { ProductDetails } from "@/types/productDetails";

export const AITEWAN_PRODUCTS: ProductDetails[] = [
  {
    id: "aitewan-deepbt-detector-plus",
    name: "DeepBT Detector-Plus",
    company: "Aitewan Biomedical Technology, Inc.",
    companyUrl: "https://www.aitewan.com",
    productUrl: "https://www.aitewan.com",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/aitewan.ts",
    description: "Deep learning software that contours gross tumour volumes of brain metastases, meningiomas and acoustic neuromas on contrast-enhanced T1-weighted MRI, optionally supported by T2-weighted series. Contours are delivered as DICOM presentation state and RT structure set objects for review and finalisation in a treatment planning system.",
    category: "Auto-Contouring",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.aitewan.com",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases", "Meningioma", "Acoustic Neuroma"],
    features: [
      "GTV contouring of brain metastases, meningiomas and acoustic neuromas",
      "Contrast-enhanced T1-weighted MRI input, optional T2-weighted support",
      "DICOM presentation state and RT structure set output via PACS",
      "Contours require finalisation by a medical professional before clinical use"
    ],
    keyFeatures: [
      "Deep learning tumour segmentation on brain MRI",
      "Results reported on the contrast-enhanced T1-weighted series",
      "Adult patients only",
      "Multi-institutional performance testing against expert consensus"
    ],
    supportedStructures: [
      "Brain: GTV Brain Metastasis",
      "Brain: GTV Meningioma",
      "Brain: GTV Acoustic Neuroma"
    ],
    technicalSpecifications: {
      population: "Adult patients (18 years and older)",
      input: ["MRI T1-weighted post-contrast", "MRI T2-weighted (optional)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Presentation states"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM PR"]
    },
    technology: {
      integration: ["PACS", "Treatment planning systems", "DICOM workstations"],
      deployment: ["Not publicly disclosed"],
      triggerForAnalysis: "Automatic on DICOM series receipt",
      processingTime: "Not publicly disclosed"
    },
    regulatory: {
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K252190",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2026-04-10",
        notes: "Traditional 510(k), predicate VBrain (K203235). Source: FDA 510(k) summary K252190, https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252190.pdf"
      },
      ce: {
        status: "not_available",
        type: "Not applicable",
        regulation: "No CE marking disclosed"
      },
      intendedUseStatement: "DeepBT Detector-Plus is intended to assist in the contouring of gross tumour volumes of brain metastases, meningiomas and acoustic neuromas on axial contrast-enhanced T1-weighted MRI, optionally supported by T2-weighted series, in adult patients. Contours must be reviewed and finalised by medical professionals in a treatment planning system or DICOM workstation before use in radiotherapy. (Source: FDA 510(k) K252190 Summary, accessed 2026-09-22)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales"]
    },
    trainingData: {
      datasetSize: "2,867 patients",
      datasetSources: ["2 clinical sites, cases acquired 1999-2022"],
      demographics: "Adult patients; further demographic breakdown not disclosed",
      disclosureLevel: "partial",
      description: "Training used 2,867 patients from two clinical sites with MRI acquired between 1999 and 2022, as reported in the FDA 510(k) summary.",
      source: "FDA 510(k) summary K252190",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252190.pdf"
    },
    evaluationData: {
      description: "Standalone performance testing on 136 cases containing 360 tumours from 16 institutions, compared against a reference consensus of three US board-certified radiologists.",
      studyDesign: "Retrospective multi-institutional standalone performance study against expert consensus",
      primaryEndpoint: "Segmentation agreement with the reference consensus contours",
      results: "Performance reported as meeting the pre-specified acceptance criteria in the FDA summary; numerical values not reproduced here",
      sites: 16,
      source: "FDA 510(k) summary K252190",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252190.pdf"
    },
    evidence: [
      {
        type: "Regulatory Submission",
        description: "FDA 510(k) summary K252190: training on 2,867 patients from 2 sites; standalone testing on 136 cases / 360 tumours from 16 institutions against a three-radiologist consensus.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252190.pdf"
      }
    ],
    evidenceRigor: "E0",
    evidenceRigorNotes: "No peer-reviewed publication naming DeepBT Detector-Plus was identified at time of entry (2026-09-22). The only disclosed validation is the multi-institutional standalone study reported in the FDA 510(k) summary, which is regulatory grey literature and therefore unscored. keyPapers is intentionally empty.",
    clinicalImpact: "I0",
    clinicalImpactNotes: "No published clinical workflow, acceptability or outcome data.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): cleared in the US, but without peer-reviewed evidence local validation and contour QA are required before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    keyPapers: [],
    releaseDate: "2026-04-10",
    lastUpdated: "2026-09-22",
    source: "FDA 510(k) summary and database record K252190 (https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252190.pdf), retrieved 2026-09-22. Deployment model, processing time, CE status and market details beyond the clearance date are not disclosed by any public source and are left as not disclosed."
  }
];

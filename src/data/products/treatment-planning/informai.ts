import { ProductDetails } from "@/types/productDetails";

export const INFORMAI_PRODUCTS: ProductDetails[] = [
  {
    id: "informai-radoncai",
    name: "RadOncAI",
    company: "InformAI",
    companyUrl: "https://www.informai.com",
    productUrl: "https://www.informai.com",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/informai.ts",
    description: "Deep learning dose-prediction software that generates a three-dimensional dose distribution for head & neck radiotherapy from a CT simulation scan together with clinician-defined target volumes and organs at risk. The predicted dose is exported as a DICOM-RTDOSE object for use as guidance in a compatible treatment planning system.",
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/informai.png",
    website: "https://www.informai.com",
    anatomicalLocation: ["Head & Neck"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer"],
    features: [
      "Deep learning 3D dose prediction",
      "Uses clinician-defined PTVs and organs at risk as input",
      "DICOM-RTDOSE export to a compatible treatment planning system",
      "Locked model (no user modification)"
    ],
    keyFeatures: [
      "Hierarchically dense U-Net with attention, supervised and locked",
      "Head & neck definitive and post-operative/adjuvant intents",
      "Cloud deployment on AWS under a HIPAA business associate agreement",
      "Prescription use, by or on the order of a physician"
    ],
    technicalSpecifications: {
      population: "Adult patients undergoing head & neck radiotherapy",
      input: ["CT", "Clinician-defined PTV structures", "Clinician-supplied OAR structures"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Predicted 3D dose distribution"],
      outputFormat: ["DICOM-RTDOSE"]
    },
    technology: {
      integration: ["Compatible treatment planning systems via DICOM-RTDOSE"],
      deployment: ["Cloud-based (AWS)", "Clinic-provided on-premises infrastructure"],
      triggerForAnalysis: "Manual submission of the CT simulation study with clinician-defined structures",
      processingTime: "Not publicly disclosed"
    },
    dosePredictionModels: [
      {
        name: "Head & neck definitive dose prediction",
        anatomicalSite: "Head & Neck",
        technique: "IMRT/VMAT",
        intent: "Definitive",
        status: "approved",
        description: "Hierarchically dense U-Net with attention, predicting a 3D dose distribution from the CT simulation scan plus clinician-defined PTVs and OARs. (Source: FDA 510(k) K253050 Summary)"
      },
      {
        name: "Head & neck post-operative/adjuvant dose prediction",
        anatomicalSite: "Head & Neck",
        technique: "IMRT/VMAT",
        intent: "Post-operative / adjuvant",
        status: "approved",
        description: "Same locked model family, validated on post-operative/adjuvant cases within the FDA validation cohort. (Source: FDA 510(k) K253050 Summary)"
      }
    ],
    regulatory: {
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K253050",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2026-06-18",
        notes: "Traditional 510(k), predicate Oncospace (K222803). Source: FDA 510(k) summary K253050, https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253050.pdf"
      },
      ce: {
        status: "not_available",
        type: "Not applicable",
        regulation: "No CE marking disclosed"
      },
      intendedUseStatement: "RadOncAI is intended to assist qualified radiation oncology professionals in radiation therapy treatment planning by generating a predicted three-dimensional dose distribution from a CT simulation image set with clinician-defined target volumes and organs at risk. The predicted dose is provided as guidance and must be reviewed by a qualified professional; the device is not intended for primary diagnosis, autonomous clinical decision-making, or control of radiation delivery. Prescription use only, by or on the order of a physician. (Source: FDA 510(k) K253050 Summary, accessed 2026-09-22)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales"]
    },
    trainingData: {
      datasetSize: "Not disclosed in the FDA 510(k) summary",
      datasetSources: ["Not disclosed in the FDA 510(k) summary"],
      demographics: "Not disclosed in the FDA 510(k) summary",
      disclosureLevel: "minimal",
      description: "The FDA summary states the model is a locked, supervised deep learning network (hierarchically dense U-Net with attention) but does not disclose training dataset size, sites or demographics.",
      source: "FDA 510(k) summary K253050",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253050.pdf"
    },
    evaluationData: {
      description: "Retrospective validation on 500 head & neck patients from two US organizations at six locations (UT Southwestern Dallas and five Arizona Oncology locations), comprising 295 definitive and 205 post-operative/adjuvant cases. Target coverage equivalence was met for all 9 PTV endpoints within a ±300 cGy margin and non-inferiority was met for all 21 OAR endpoints with a +300 cGy margin, with Bonferroni correction for multiplicity.",
      studyDesign: "Retrospective six-location validation with pre-specified equivalence and non-inferiority margins",
      primaryEndpoint: "PTV dose equivalence and OAR dose non-inferiority versus clinically delivered plans",
      results: "9/9 PTV endpoints equivalent within ±300 cGy; 21/21 OAR endpoints non-inferior within +300 cGy",
      sites: 6,
      source: "FDA 510(k) summary K253050",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253050.pdf"
    },
    evidence: [
      {
        type: "Regulatory Submission",
        description: "FDA 510(k) summary K253050: 500-patient six-location retrospective validation with PTV equivalence and OAR non-inferiority endpoints.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253050.pdf"
      },
      {
        type: "Vendor Announcement",
        description: "InformAI announcement of FDA 510(k) clearance for RadOncAI radiation therapy dose planning software (19 June 2026).",
        link: "https://www.informai.com"
      }
    ],
    evidenceRigor: "E0",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E0 retained. FDA K253050 reports 500 patients (295 definitive, 205 adjuvant) from two organizations at six locations and a 50-case reader subset assessed by three oncologists. These are regulatory data, not scored peer-reviewed evidence.",
    clinicalImpact: "I0",
    clinicalImpactNotes: "FDA K253050 includes dosimetric equivalence/non-inferiority and a 50-case clinician-reader subset (150 assessments, not 150 additional patients). Regulatory evidence remains unscored; no attributable peer-reviewed workflow or patient-outcome study was identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): cleared for US prescription use, but with no peer-reviewed evidence local commissioning, plan-quality validation and clinical governance are required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    keyPapers: [],
    releaseDate: "2026-06-18",
    lastUpdated: "2026-11-08",
    limitations: ["Predicted dose is guidance, not a deliverable treatment plan or replacement for the primary TPS. Qualified professional review is required.", "FDA indication is adult head-and-neck radiotherapy; validation should not be generalized to other sites."],
    source: "FDA 510(k) K253050; vendor website"
  }
];

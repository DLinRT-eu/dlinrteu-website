
import { ProductDetails } from "@/types/productDetails";
import { GE_HEALTHCARE_ALL_STRUCTURES } from "./ge-healthcare-structures";

export const GE_HEALTHCARE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-auto-segmentation",
    trainingData: {
        countries: 3,
        source: "FDA 510(k) summary K230082",
        description: "Deep learning CT auto-segmentation model for generating OAR contours in adult radiotherapy planning. Information on specific training datasets is not provided in the 510(k) summary.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
        datasetSize: "Not publicly disclosed",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        source: "FDA 510(k) summary K230082",
        countries: 3,
        studyDesign: "Retrospective multi-site validation and clinical reader study",
        datasetSize: "302 scans / 2552 contours",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
        description: "Retrospective multi-site validation using 302 adult CT radiotherapy-planning exams and 2552 generated contours. The study included a clinical reader study by three qualified radiotherapy practitioners.",
        primaryEndpoint: "Not specified",
        results: "2552 generated contours across multiple anatomical regions (Head/Neck, Thorax, Abdomen, Pelvis) reviewed by practitioners."
    },
    name: "Auto Segmentation",
    company: "GE HealthCare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-healthcare.ts",
    description: "Deep learning CT auto-segmentation application on Edison HealthLink that generates DICOM Radiotherapy Structure Sets (RTSS) with organs-at-risk contours for radiation therapy planning review and editing.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Adult radiotherapy planning across multiple cancer types"],
    keyFeatures: ["Deep learning OAR segmentation", "DICOM RTSS output", "Edison HealthLink workflow integration", "Head/neck, thorax, abdomen and pelvis OARs"],
    guidelines: [
      { name: "RTOG", compliance: "partial" },
      { name: "DAHANCA", compliance: "partial" }
    ],
    supportedStructures: GE_HEALTHCARE_ALL_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Edison HealthLink integration", "DICOM RTSS export to compatible review workstations"],
      deployment: ["Server-based deployment on Edison HealthLink"],
      triggerForAnalysis: "Automated within configured clinical workflow",
      processingTime: "Not publicly specified"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "CE Mark",
        regulation: "Not publicly disclosed"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K230082",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        notes: "CT Auto Segmentation. MR Contour DL cleared separately as K242925 (decision date April 1, 2025)."
      },
      intendedUseStatement: "Auto Segmentation is intended to be used as a workflow tool for initial anatomy segmentation of organs at risk on CT images as an aid in radiation therapy planning after user confirmation. It generates a Radiotherapy Structure Set (RTSS) DICOM with segmented organs at risk which can be used by dosimetrists, medical physicists, and radiation oncologists as initial contours to accelerate workflow for radiation therapy planning. It is the responsibility of the user to verify the processed output contours and user-defined labels for each organ at risk and correct the contours/labels as needed. Auto Segmentation may be used with images acquired on CT scanners, in adult patients. (Source: FDA 510(k) K230082 Summary, accessed 2026-06-11)"
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales"]
    },
    version: "1.0+",
    releaseDate: "2023-05-12",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "E2: FDA 510(k) K230082 includes retrospective multi-site validation with 302 adult CT radiotherapy-planning exams and 2552 generated contours from an independent test set; ground truth annotations followed RTOG/DAHANCA and were reviewed by qualified radiotherapy practitioners. No peer-reviewed product-specific independent validation was identified in this audit.",
    clinicalImpactNotes: "Supports workflow acceleration for initial OAR contour generation and standardization, with required user review/editing. Evidence is geometric and qualitative; no prospective clinical outcome or time-and-motion publication specific to GE Auto Segmentation was identified.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE Mark + FDA 510(k): moderate implementation effort — local validation, DICOM interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database (K230082), FDA 510(k) K242925 for separate MR Contour DL, GE HealthCare product documentation and DICOM conformance statement; CE Mark confirmed from GE HealthCare public statements, CE class not publicly disclosed.",
    clinicalEvidence: "FDA 510(k) validation using 2552 generated contours from 302 retrospective adult CT radiotherapy-planning exams across multiple clinical sites in North America, Asia and Europe, plus a clinical reader study by three qualified radiotherapy practitioners.",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K230082 decision date May 4, 2023 - Class II device under 21 CFR 892.2050, product code QKB",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
      },
      {
        type: "indirect",
        description: "FDA 510(k) clearance K242925 (April 1, 2025) for MR Contour DL — separate MR-based GE product that uses Auto Segmentation (K230082) as predicate. Indirect: does not directly evaluate the CT Auto Segmentation module documented here.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
      },
      {
        type: "Manufacturer Product Documentation",
        description: "Official GE HealthCare Auto Segmentation product page describing CT OAR auto-contouring for radiation therapy planning and RTSS review workflow",
        link: "https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation",
      },
      {
        type: "Interoperability Documentation",
        description: "GE HealthCare DICOM conformance statement for Auto Segmentation on Edison HealthLink, documenting CT input and RT Structure Set output",
        link: "https://www.gehealthcare.com/-/jssmedia/documents/us-global/products/interoperability/dicom/computed-tomography/gehc-dicom-conformance_dlautosegmentation_doc2719402_rev3",
      },
      {
        type: "Market Availability",
        description: "GE HealthCare ESTRO 2023 announcement confirming Auto Segmentation as recently FDA 510(k) cleared and CE Marked",
        link: "https://www.itnonline.com/content/ge-healthcare-introduces-innovations-improve-radiation-therapy-efficiency-and-precision",
      },
    ],
    limitations: [
      "Requires user review, correction and confirmation before clinical use",
      "Public documentation emphasizes Edison HealthLink and qualified GE HealthCare CT-scanner workflow integration; local interoperability testing is required",
      "MDR certificate details were not publicly available in the open sources reviewed",
      "No peer-reviewed, product-specific independent clinical impact study was identified in this audit"
    ]
  }
];

import { ProductDetails } from "@/types/productDetails";

export const MVISION_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-dose-plus",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250064.pdf",
        disclosureLevel: "minimal",
        description: "The software uses machine learning-based algorithms to produce 3D dose distributions from patient-specific anatomical geometry and target dose prescriptions for external beam radiation therapy.",
        source: "FDA 510(k) summary K250064",
        demographics: "Adult male patients with localized prostate cancer or pelvic lymph node involvement"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250064.pdf",
        source: "FDA 510(k) summary K250064",
        primaryEndpoint: "Not specified",
        description: "Software V&V conducted for FDA 510(k) clearance supporting machine learning-based 3D dose distribution generation for localized prostate cancer and pelvic lymph node involvement. Initial clinical validation focused on prostate and pelvic lymph nodes.",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "Dose+",
    version: "1.0.3",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/dose/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/mvision.ts",
    description:
      "Dose-prediction module of the MVision AI Workspace+ platform. AI software that generates patient-specific 3D dose distributions from planning CT to support and accelerate radiation therapy plan creation.",
    features: [
      "Patient-specific 3D dose prediction",
      "Cloud-native deployment",
      "DICOM-RTDOSE export",
      "Workspace+ integration"
    ],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/dose/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Pelvic Lymph Node Irradiation"],
    keyFeatures: [
      "Patient-specific 3D dose prediction from planning CT",
      "Delivered through the Workspace+ AI platform",
      "Initial clinical validation on prostate and pelvic lymph nodes"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Predicted 3D dose distribution"],
      outputFormat: ["DICOM-RTDOSE"]
    },
    technology: {
      integration: ["Workspace+", "TPS via DICOM"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated within Workspace+",
      processingTime: "Minutes per case (vendor-reported)"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "642983006423Dose1.0DH",
          riskClass: "class-iia",
          registeredTradeName: "Dose+",
          manufacturerSrn: "FI-MF-000013082",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=Dose%2B",
          lastVerified: "2026-09-22"
      },
        status: "under_review",
        notes: "CE-MDR submission in progress (vendor communication, 2025). Confirm before publishing."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250064",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-09-04",
        notes: "First MVision AI submission under therapeutic dose-calculation product code MUJ."
      },
      intendedUseStatement:
        "\"Dose+ is a software-only medical device intended for use by qualified, trained radiation therapy professionals... The device is intended for male patients with localized prostate cancer or prostate cancer with pelvic lymph node involvement who are undergoing external beam radiation therapy treatment. The software uses machine learning-based algorithms to automatically produce 3D dose distributions from patient-specific anatomical geometry and target dose prescription.\" (Source: FDA 510(k) K250064 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
    },
    partOf: {
      name: "Workspace+",
      productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
      relationship: "Module"
    },
    usesAI: true,
    dosePredictionModels: [
      {
        name: "Prostate dose prediction",
        anatomicalSite: "Prostate",
        technique: "VMAT/IMRT",
        intent: "Curative",
        status: "approved"
      },
      {
        name: "Pelvic lymph nodes dose prediction",
        anatomicalSite: "Pelvic lymph nodes",
        technique: "VMAT/IMRT",
        intent: "Curative",
        status: "approved"
      }
    ],
    keyPapers: [
      {"doi": "10.1016/j.phro.2026.100977", "title": "A comparative assessment of deep learning and knowledge-based dose prediction models for advanced radiotherapy planning of prostate cancer with focal boosting", "authors": "Piliero MA, Angrisani A, Bosetti DG, et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Full text checked 2026-09-25 (Europe PMC). Methods name Dose+ (MVision AI) compared with RapidPlan for prostate focal boost; single-centre retrospective dosimetric comparison. Done in collaboration with MVision (algorithm and technical support provided), so not vendor-independent.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false}
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "A comparative assessment of deep learning and knowledge-based dose prediction models for advanced radiotherapy planning of prostate cancer with focal boosting. Phys Imaging Radiat Oncol. 2026",
        link: "https://doi.org/10.1016/j.phro.2026.100977"
      },
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes:
      "2026-09-25 HAIR follow-up: raised E0 to E1. First peer-reviewed paper naming Dose+ (doi:10.1016/j.phro.2026.100977), a single-centre retrospective comparison with RapidPlan run in collaboration with MVision. Earlier: 2026-08-25 Wave 3 per-paper sweep: PubMed and Crossref re-searched 2026-08-25 — no peer-reviewed publication naming this product was found, so no keyPapers could be scored and the stored score is unchanged. Vendor announcement only as of 2026-05-23. No peer-reviewed validation publication identified. 2026-08-28 Batch C sweep: all located MVision publications name Contour+ (segmentation), not Dose+. No publication evaluates the dose-prediction product. E0 stands.",
    clinicalImpactNotes: "2026-09-25: raised I0 to I1 — dosimetric plan-quality endpoints only (vendor-collaboration study); no workflow or patient-outcome data.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "FDA 510(k) cleared with E1 evidence from a single vendor-collaboration study: structured pilot and local validation recommended before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    releaseDate: "2025-09-04",
    lastUpdated: "2026-09-23",
    lastRevised: "2026-09-23",
    limitations: [
      "Initial validation limited to prostate and pelvic lymph nodes",
      "CE-MDR status to be confirmed with vendor before clinical use in EU",
      "Only one peer-reviewed study (vendor collaboration, single centre) as of 2026-09-25"
    ],
    source:
      "FDA 510(k) database (K250064); MVision AI press release (2025-03-13); Dose+ product page. releaseDate proxied from FDA K250064 decision date (2025-09-04). 2026-09-23: version 1.0.3 vendor-provided (merged from the approved representative edits). 2026-09-06 standard-field consistency pass: FDA status value normalised to the site-wide '510k_cleared' convention."
  }
];

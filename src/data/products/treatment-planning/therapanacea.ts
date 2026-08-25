import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartplan",
    name: "SmartPlan",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/therapanacea.ts",
    description: "AI-powered automatic treatment planning module of the ART-Plan+ platform. SmartPlan generates a complete radiotherapy plan from a planning CT and an RT structure set, which the user imports into their own treatment planning system for dose calculation, review and approval. FDA clearance (K253091) limits the indication to supported prostate prescriptions.",
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
    anatomicalLocation: ["Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    usesAI: true,
    keyFeatures: [
      "AI-powered automatic treatment plan generation from planning CT + RTSTRUCT",
      "Supported prostate prescriptions (per FDA K253091 indications)",
      "Plan generation in minutes, ready for physician review",
      "Automatic export of the generated plan to the user's TPS for dose calculation and approval",
      "Batch mode operation without using the interface",
      "Reduces inter-planner variability"
    ],
    features: [
      "Automatic plan generation",
      "Prostate prescription support",
      "TPS export",
      "Batch processing"
    ],
    technicalSpecifications: {
      population: "Adult cancer patients (18+ years) prescribed radiotherapy",
      input: ["CT", "RT Structure Set"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Treatment plan (for import into the user's TPS)"],
      outputFormat: ["DICOM-RTPLAN"]
    },
    technology: {
      integration: ["Cloud-based web application", "DICOM export to TPS"],
      deployment: ["Cloud-based (GDPR-compliant)"],
      triggerForAnalysis: "Manual or batch mode",
      processingTime: "Minutes per plan (manufacturer claim)"
    },
    trainingData: {
      disclosureLevel: "minimal",
      description: "Training dataset composition is not publicly disclosed. The module is described as a deep-learning automatic planning solution for supported prostate prescriptions.",
      source: "FDA 510(k) summary K253091 and Therapanacea products page",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-07-30"
    },
    evaluationData: {
      studyDesign: "Software verification & validation for FDA 510(k) substantial equivalence; manufacturer-reported clinical comparison vs manual planning",
      primaryEndpoint: "Substantial equivalence to predicate ART-Plan+ v3.0.0 (K242822)",
      results: "Not publicly disclosed in quantitative form. K253091 reports improved prescription coverage of SmartPlan for the existing prostate anatomy relative to the predicate. No independent peer-reviewed evaluation of SmartPlan identified as of 2026-07-30 (vendor conference abstracts only).",
      description: "Evidence available publicly is limited to the 510(k) summary and manufacturer material; the vendor claims clinical validation with comparable or better performance versus manual planning, but no peer-reviewed publication naming SmartPlan was located.",
      source: "FDA 510(k) summary K253091 (decision 2025-12-23)",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-07-30"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes: "ART-Plan+ is declared a class IIb (EU) device; automatic generation of a radiotherapy treatment plan is listed in the CE intended-use summary of the ART-Plan™ v3.2.0 brochure (ART-BRO-AN-07EU, March 2026)."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K253091",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-12-23",
        notes: "K253091 (ART-Plan+ v3.1.0) clears the SmartPlan module; the Indications for Use restrict it to supported prescriptions for prostate only. Predicate: K242822 (v3.0.0, 2025-02-25); reference: K234068 (ART-Plan v2.2.0)."
      },
      intendedUseStatement: "SmartPlan allows automatic generation of a radiotherapy treatment plan that the users import into their own Treatment Planning System (TPS) for the dose calculation, review and approval. This module is available for supported prescriptions for prostate only. ART-Plan+ is not intended to be used for patients less than 18 years of age. (Source: FDA 510(k) K253091 Indications for Use, decision 2025-12-23.)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Cloud SaaS"],
      availability: "Sold under its own licence as an ART-Plan+ module. Not all models are available in all markets."
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.0 (current) / 3.1.0 (FDA cleared)",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: PubMed and Crossref re-searched 2026-08-25 — no peer-reviewed publication naming this product was found, so no keyPapers could be scored and the stored score is unchanged. Regulatory clearance (FDA K253091) and CE class IIb coverage only. No peer-reviewed publication naming SmartPlan identified as of 2026-07-30; vendor material references conference abstracts and testimonials, which do not qualify for E1.",
    clinicalImpactNotes: "Manufacturer and clinical-user testimonials claim one-click plan generation in minutes with reduced planner variability for prostate; no independently published dosimetric or workflow outcome data located.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE/FDA: automatic planning changes a core clinical process, so local commissioning, plan-quality benchmarking against institutional standards and physicist sign-off workflows are required before routine use.",
    burdenFactors: {
      commissioningRequired: true,
      localValidationRequired: true,
      workflowRedesign: true,
      integrationComplexity: "medium",
      humanFactorsTesting: true,
      economicCaseRequired: false,
      subgroupValidationGaps: true,
      postMarketMonitoringPlan: false
    },
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    limitations: [
      "FDA indication is limited to supported prostate prescriptions; other anatomies are not cleared in the US",
      "Plan is not dose-calculated by SmartPlan — dose calculation, review and approval remain in the user's TPS",
      "Adult patients only (18+ years)",
      "No independent peer-reviewed evaluation published as of 2026-07-30",
      "Not all models available in all markets",
      "Vendor warning: only Monaco-Mosaiq, Eclipse-ARIA and RayStation TPS/R&V configurations are validated for plan generation",
      "Vendor warning: only 1 or 2 beams can be used in the ballistic configuration",
      "Vendor warning: the structure-mapping configuration influences plan generation and the task fails on ambiguous matching; the input RTSS must be checked for adequacy",
      "Vendor warning: the treatment couch is detected from structures typed 'support' or 'fixation'; without such a structure the software assumes no couch",
      "Vendor warning: the dose engine must be validated by the user, who must generate the RTDose in their own TPS to validate the RTPlan",
      "Vendor warning: 2D DICOM images (e.g. scout images) cannot be processed in the SmartPlan module"
    ],
    version: "3.2.0",
    releaseDate: "2025-12-23",
    lastUpdated: "2026-07-30",
    lastRevised: "2026-07-30",
    source: "FDA 510(k) K253091 Indications for Use and summary (decision 2025-12-23); ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ART-BRO-AN-07EU, March 2026); Therapanacea products page (therapanacea.com/products, accessed 2026-07-30); Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.0, UDI (01)03770019940020(8012) v3.2.0(11)260525; manufacturer TheraPanacea, 8-10 Avenue Ledru-Rollin, 75012 Paris, France; https://therapanacea.com/technical-information-2, retrieved 2026-07-30)."
  }
];

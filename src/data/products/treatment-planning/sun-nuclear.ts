import { ProductDetails } from "@/types/productDetails";

export const SUN_NUCLEAR_PRODUCTS: ProductDetails[] = [
  {
    id: "plan-ai",
    trainingData: {
        description: "Machine learning models developed using 5,000+ clinically delivered treatment plans from Johns Hopkins University across multiple anatomical sites.",
        datasetSize: "5,000+ plans",
        institutions: 1,
        disclosureLevel: "partial",
        source: "FDA 510(k) summary K242748",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242748.pdf"
    },
    evaluationData: {
        description: "FDA 510(k) software verification & validation only. No product-specific peer-reviewed clinical evaluation of Plan AI / Oncospace has been located; previous citations to Appenzoller 2012 (foundational DVH-prediction methodology) and Chung 2024 / Yu 2025 (other KBP/auto-planning products) do not directly evaluate Plan AI and were removed 2026-06-15.",
        primaryEndpoint: "Not specified",
        results: "Not publicly disclosed",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242748.pdf",
        source: "FDA 510(k) summary K242748",
        studyDesign: "Software V&V (FDA 510(k)) only"
    },
    name: "Plan AI",
    company: "Sun Nuclear (Mirion Medical)",
    companyUrl: "https://www.sunnuclear.com/",
    productUrl: "https://www.sunnuclear.com/products/plan-ai",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/sun-nuclear.ts",
    description:
      "AI-powered treatment planning assistant that provides predictive, patient-specific insights on achievable dosimetric goals before planning begins. Uses machine learning models based on 5,000+ clinically delivered plans from Johns Hopkins University to drive continuous improvement in plan quality.",
    features: [
      "AI-powered DVH predictions for OAR sparing",
      "Peer review with structured checklists",
      "Best Achievable planning objectives import to TPS",
      "50+ prescription and geometry features",
      "Clinical protocol library management",
      "Cloud-native SaaS platform",
    ],
    category: "Treatment Planning",
    certification: "FDA 510(k) Cleared",
    logoUrl: "/logos/SunNuclear.png",
    website: "https://www.sunnuclear.com/products/plan-ai",
    anatomicalLocation: ["Prostate", "Head and Neck", "Thoracic", "Abdomen", "Pelvis"],
    modality: ["Treatment Planning System Data"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: [
      "Prostate Cancer",
      "Head and Neck Cancer",
      "Thoracic Cancer",
      "Abdominal Cancer",
      "Pelvic Cancer",
    ],
    keyFeatures: [
      "DVH predictions before planning begins",
      "Peer review communication tools",
      "Customizable clinical goal templates",
      "Real-time plan comparison",
      "Data-driven dosimetric goals",
      "Streamlined physician-planner collaboration",
    ],
    technicalSpecifications: {
      population:
        "Cancer patients undergoing radiation therapy for prostate, head and neck, thoracic, abdominal, and pelvic tumors",
      input: ["DICOM CT Images", "DICOM RT Structure Sets"],
      inputFormat: ["DICOM CT", "DICOM RT Structure Set"],
      output: ["DVH Predictions", "Best Achievable Objectives", "Plan Quality Metrics", "Peer Review Reports"],
      outputFormat: ["Dosimetric Parameters", "TPS-compatible Objectives"],
    },
    technology: {
      integration: ["Treatment Planning Systems", "Cloud API", "TPS Interface Scripts"],
      deployment: ["Cloud-native SaaS", "Microsoft Azure"],
      triggerForAnalysis: "CT and Structure Set upload from TPS",
      processingTime: "Real-time analysis",
    },
    regulatory: {
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242748",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2025-04-11",
        notes: "K242748 (Apr 2025). Prior clearances: K222803 (Feb 2023), K202284 (Mar 2021, original Oncospace clearance)"
      },
      ce: {
        status: "not_applicable",
        class: "N/A",
        notes: "US market only. CE marking not obtained."
      },
      intendedUseStatement:
        "\"Oncospace is used to configure and review radiotherapy treatment plans for a patient with malignant or benign disease in the head and neck, thoracic, abdominal, and pelvic regions. It allows for set up of radiotherapy treatment protocols, association of a potential treatment plan with the protocol(s), submission of a dose prescription and achievable dosimetric goals to a treatment planning system, and review of the treatment plan.\" (Source: FDA 510(k) K242748 Summary, accessed 2026-05-30)",
    },
    market: {
      onMarketSince: "2021-03-12",
      distributionChannels: ["Direct Sales", "Cloud Platform"],
    },
    version: "1.0",
    releaseDate: "2021-03-12",
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Downgraded 2026-06-15 from E2 to E1 after citation verification: (1) Appenzoller 2012 'Predicting dose-volume histograms for organs-at-risk' (Med Phys) had a hallucinated DOI (10.1118/1.4752212 resolves to an unrelated CBCT paper) and is in any case a foundational DVH-prediction methodology paper predating Plan AI/Oncospace by >10 years — removed. (2) Chung et al. PMID:39486482 (KBP for 10 cancer sites) is an MD Anderson RPA-ecosystem paper and does not evaluate Plan AI — reclassified as indirect-comparative below. (3) Yu et al. PMC12827991 explicitly evaluates United Imaging uTPS, not Plan AI — removed and re-attributed to uRT Auto-Planning. Remaining evidence is FDA regulatory only.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement through AI-powered DVH predictions. No product-specific independent clinical impact data located.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate-to-high implementation effort — limited independent evidence; local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K242748, K222803, K202284), Sun Nuclear official website",
    clinicalEvidence: "FDA 510(k) software V&V; no product-specific independent peer-reviewed clinical evaluation of Plan AI located as of 2026-06-15.",
    evidence: [
      {
        type: "Indirect-comparative",
        description: "Chung et al. Knowledge-based planning for fully automated radiation therapy treatment planning of 10 different cancer sites. PMID:39486482, 2024. NOTE: This MD Anderson RPA-ecosystem KBP paper does not name Plan AI / Oncospace; retained here only as adjacent KBP-methodology context.",
        link: "https://pubmed.ncbi.nlm.nih.gov/39486482/"
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K242748 received April 11, 2025 (Plan AI current clearance)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242748.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K222803 received February 2, 2023",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K222803.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "Original FDA 510(k) clearance K202284 received March 12, 2021",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K202284.pdf",
      },
      {
        type: "Acquisition",
        description: "Sun Nuclear acquired Oncospace April 2025, product rebranded as Plan AI",
        link: "https://www.sunnuclear.com/about/news/sun-nuclear-acquires-oncospace",
      },
    ],
    limitations: [
      "Available in the United States only",
      "Cloud connectivity required",
      "Requires DICOM-compliant TPS integration",
      "CE marking not available (not for sale in EU)",
    ],
  },
];

import { ProductDetails } from "@/types/productDetails";

export const SUN_NUCLEAR_PRODUCTS: ProductDetails[] = [
  {
    id: "plan-ai",
    trainingData: {
        description: "Machine learning models developed using 5,000+ clinically delivered treatment plans, primarily from Johns Hopkins University across multiple anatomical sites, with the abdomen model trained on data from two institutions. Feature and protocol distributions disclosed in Shade et al., Adv Radiat Oncol 2026 (https://www.advancesradonc.org/article/S2452-1094(26)00043-6/fulltext/).",
        datasetSize: "5,000+ plans",
        institutions: 2,
        disclosureLevel: "full",
        source: "FDA 510(k) summary K242748; Shade et al., Adv Radiat Oncol 2026",
        sourceUrl: "https://www.advancesradonc.org/article/S2452-1094(26)00043-6/fulltext/"
    },
    evaluationData: {
        description: "Retrospective external validation at Johns Hopkins: 72 re-planned cases across 4 anatomic regions, evaluating 51 OARs. Peer-reviewed in Shade et al., Adv Radiat Oncol 2026. Additional workflow-level external validations reported at ESTRO 2025, AAPM 2024/2025, and ICCR 2024.",
        primaryEndpoint: "Non-inferiority of mean OAR dose vs. clinical plans; PTV coverage and conformity",
        results: "Non-inferiority demonstrated for mean OAR dose across all 51 OARs evaluated; no significant decrease in PTV coverage or conformity.",
        sourceUrl: "https://www.advancesradonc.org/article/S2452-1094(26)00043-6/fulltext/",
        source: "Shade et al., Adv Radiat Oncol 2026",
        studyDesign: "Retrospective external validation: 72 re-planned cases across 4 anatomic regions at Johns Hopkins"
    },
    name: "Plan AI",
    company: "Sun Nuclear (Mirion Medical)",
    companyUrl: "https://www.sunnuclear.com/",
    productUrl: "https://www.sunnuclear.com/products/plan-ai",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/sun-nuclear.ts",
    description:
      "AI-powered treatment planning assistant that provides predictive, patient-specific insights on achievable dosimetric goals before planning begins. Uses machine learning models based on 5000+ clinically delivered plans from Johns Hopkins University to drive continuous improvement in plan quality.",
    features: [
      "AI-powered DVH predictions for OAR sparing",
      "Peer review with structured checklists",
      "Best Achievable planning objectives import to TPS",
      "50+ prescription and geometry features",
      "Clinical protocol library management",
      "Cloud-native SaaS platform",
    ],
    category: "Treatment Planning",
    certification: "FDA 510(k) Cleared, CE Marked Class IIb",
    logoUrl: "/logos/SunNuclear.png",
    website: "https://www.sunnuclear.com/products/plan-ai",
    anatomicalLocation: ["Prostate", "Head and Neck", "Thoracic", "Abdomen", "Pelvis"],
    modality: ["CT"],
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
      input: ["CT images", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["DVH predictions", "Best Achievable objectives", "Plan quality metrics", "Peer review reports"],
      outputFormat: ["Dosimetric parameters", "TPS-compatible objectives"],
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
        status: "cleared",
        class: "Class IIb",
        type: "Medical Device",
        notifiedBody: "BSI",
        notes: "CE Marked, Class IIb."
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
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Peer-reviewed internal validation at Johns Hopkins (Shade et al., Adv Radiat Oncol 2026, https://doi.org/10.1016/j.adro.2026.102036) plus multiple external workflow-level validations presented at ESTRO 2025, AAPM 2024/2025, and ICCR 2024.",
    clinicalImpactNotes: "Workflow-level external validation demonstrated across head & neck and multi-site cases (AI-guided unattended/automated plan generation, knowledge-based planning). No outcome-level (toxicity/survival) evidence published.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k) + CE mark: moderate implementation effort. Peer-reviewed external validation supports adoption; local commissioning and TPS interface testing still recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-06-22",
    lastRevised: "2026-06-22",
    source: "FDA 510(k) database (K242748, K222803, K202284), Sun Nuclear official website, Sun Nuclear company representative (verified 2026-06-22)",
    clinicalEvidence: "Peer-reviewed internal validation in Shade et al., Adv Radiat Oncol 2026 (72 re-plans, 51 OARs, Johns Hopkins). Workflow-level external validation also reported at ESTRO 2025, AAPM 2024/2025, and ICCR 2024.",
    evidence: [
      {
        type: "Peer-reviewed Validation",
        description: "Shade et al. Development and Clinical Validation of a Protocol-Agnostic Machine Learning Platform for Automated Treatment Planning in External-Beam Radiotherapy. Adv Radiat Oncol 2026.",
        link: "https://www.advancesradonc.org/article/S2452-1094(26)00043-6/fulltext/"
      },
      {
        type: "Validation",
        description: "ESTRO 2025 poster — Personalized radiotherapy planning tool with AI-guided optimization for patients with head and neck cancer (external validation).",
        link: "https://user-swndwmf.cld.bz/ESTRO-2025-Abstract-Book/2724/"
      },
      {
        type: "Validation",
        description: "AAPM 2025 oral presentation — Personalized and automated head & neck radiotherapy planning with AI-guided optimization (external validation).",
        link: "https://aapm.confex.com/aapm/2025am/meetingapp.cgi/Paper/15133"
      },
      {
        type: "Validation",
        description: "AAPM 2024 poster — Performance of a knowledge-based planning software on static IMRT head and neck plans.",
        link: "https://aapm.confex.com/aapm/2024am/meetingapp.cgi/Paper/11902"
      },
      {
        type: "Validation",
        description: "ICCR 2024 conference paper — AI-guided unattended plan generation (external validation).",
        link: "https://www.iccr2024.org/papers/523444.pdf"
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
      "Cloud connectivity required",
      "Requires DICOM-compliant TPS integration",
    ],
  },
];

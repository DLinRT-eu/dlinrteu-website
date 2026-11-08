import { ProductDetails } from "@/types/productDetails";

export const LUMONUS_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "lumonus-ai",
    name: "Lumonus AI (Oncology Intelligence Layer)",
    company: "Lumonus",
    companyUrl: "https://www.lumonus.com",
    productUrl: "https://www.lumonus.com/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/lumonus.ts",
    description:
      "AI-driven \"Oncology Intelligence Layer\" for radiation oncology that automates workflow, documentation and planning management across the patient journey. Uses large language models and traditional machine learning integrated with EMR, OIS and TPS. Modules span Consult, Document, Plan (dosimetry workspace with planning automation and web-based review/approval) and Improve (analytics).",
    features: [
      "LLM- and ML-based clinical workflow automation",
      "Consult module for patient intake and documentation",
      "Document module for note generation and coding support",
      "Plan (Dosimetry) module with centralized planning workspace, automation and web-based plan review",
      "Improve module for analytics and quality-improvement metrics",
      "EMR / OIS / TPS integration",
      "Cloud-based deployment",
    ],
    category: "Platform",
    secondaryCategories: ["Performance Monitor", "Treatment Planning"],
    certification: "Sigma CDSS non-device status (consultant-reported)",
    logoUrl: "/logos/lumonus.jpeg",
    website: "https://www.lumonus.com/",
    anatomicalLocation: ["Multiple Sites"],
    modality: ["N/A"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Oncology Intelligence Layer across the RT workflow",
      "LLMs + ML for consult, documentation, planning and analytics",
      "Dosimetry workspace with planning-automation and web-based review",
      "EMR / OIS / TPS integration; cloud-native deployment",
      "Not a validated deep-learning clinical algorithm — assistive/workflow scope",
    ],
    integratedModules: [
      {
        name: "Consult",
        description:
          "AI-assisted patient consultation workflow — intake summarization, care-coordination prompts and structured note generation.",
        category: "Platform",
        productUrl: "https://www.lumonus.com/",
        keyFeatures: ["LLM-assisted intake", "Care coordination"],
      },
      {
        name: "Document",
        description:
          "AI-generated clinical documentation and coding support for radiation oncology encounters.",
        category: "Platform",
        productUrl: "https://www.lumonus.com/",
        keyFeatures: ["Automated note drafting", "Coding assistance"],
      },
      {
        name: "Plan (Dosimetry)",
        description:
          "Centralized planning workspace with planning automation, web-enabled plan review/approval and embedded analytics.",
        category: "Treatment Planning",
        productUrl: "https://www.lumonus.com/dosimetry",
        keyFeatures: [
          "Centralized planning workspace",
          "Planning automation and orchestration",
          "Web-based plan review / approval",
          "Embedded planning analytics",
        ],
      },
      {
        name: "Improve",
        description:
          "Analytics module surfacing throughput, plan-quality and quality-improvement metrics across the department.",
        category: "Performance Monitor",
        productUrl: "https://www.lumonus.com/",
        keyFeatures: ["Departmental analytics", "Quality-improvement dashboards"],
      },
    ],
    technicalSpecifications: {
      population: "Not publicly disclosed",
      input: ["EMR data", "OIS data", "TPS metadata", "Clinical documentation"],
      inputFormat: ["Not publicly disclosed"],
      output: ["Structured notes", "Workflow tasks", "Plan-review artefacts", "Analytics dashboards"],
      outputFormat: ["Web UI; interchange formats not publicly disclosed"],
    },
    technology: {
      integration: ["EMR", "OIS", "TPS"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Integrated within clinical workflow (event-driven)",
      processingTime: "Not publicly disclosed",
    },
    regulatory: {
      ce: {
        status: "Not available",
        notes: "No CE marking identified as of 2026-07-19.",
      },
      fda: {
        status: "cdss_exempt",
        type: "21st Century Cures §3060 CDSS exemption",
        notes:
          "Rook QS reports non-device CDSS status for Sigma. No public FDA determination letter was retrieved; this consultant account does not establish a platform-wide exemption or 510(k)/De Novo clearance.",
      },
      intendedUseStatement:
        "Software intended to support radiation oncology clinical workflow, documentation, planning management and analytics. A consultant reports non-device CDSS status for Sigma; regulatory status must be assessed per function and is not established for the entire platform by that account.",
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Partnerships"],
    },
    version: "1.0",
    releaseDate: "2024",
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: historical Horizon/Lumonus planning conference abstracts exist but remain unscored. No full attributable peer-reviewed validation of the current platform modules was verified. Conference results are not automatically transferred across renamed modules.",
    clinicalImpactNotes:
      "Vendor-claimed workflow and planning-efficiency benefits; no independent clinical-impact study identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "R2 retained pending a separate implementation-readiness rubric review. The Sigma consultant account is not platform-wide regulatory evidence. Module-specific implementation and validation evidence remain limited.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    categoryEvidence: {
      Platform: {
        usesAI: true,
        notes:
          "Oncology Intelligence Layer spanning Consult / Document / Plan / Improve. AI is LLM- and ML-based workflow/decision-support automation rather than a validated DL clinical algorithm.",
      },
      "Performance Monitor": {
        usesAI: true,
        notes:
          "Improve module — departmental analytics and quality-improvement dashboards over EMR/OIS/TPS data.",
        evidenceRigor: "E0",
        clinicalImpact: "I0",
      },
      "Treatment Planning": {
        usesAI: true,
        notes:
          "Plan / Dosimetry module — centralized planning workspace, planning automation and web-based plan review. Orchestrates and augments planning workflow rather than acting as a validated DL dose engine.",
        evidenceRigor: "E0",
        clinicalImpact: "I0",
      },
    },
    lastUpdated: "2026-11-08",
    lastRevised: "2026-08-25",
    evidence: [
      {"type": "Conference evidence (not scored)", "description": "Historical automated iterative planning evaluation; conference evidence, not validation of every current Lumonus module.", "link": "https://www.lumonus.com/blog/clinical-evaluation-of-an-automated-iterative-optimization-system-for-radiation-oncology"},
      {
        type: "Vendor product page",
        description: "Lumonus AI — Oncology Intelligence Layer (product overview)",
        link: "https://www.lumonus.com/",
      },
      {
        type: "Vendor product page",
        description: "Lumonus AI — Dosimetry module",
        link: "https://www.lumonus.com/dosimetry",
      },
      {
        type: "Regulatory case study",
        description:
          "Rook QS regulatory case study documenting Lumonus's FDA Clinical Decision Support Software exemption for the Sigma module",
        link: "https://rookqs.com/casestudies/lumonus",
      },
      {
        type: "Company Press Release",
        description:
          "Lumonus announces strategic collaboration with Memorial Sloan Kettering Cancer Center to advance RT treatment planning (April 2026)",
        link: "https://www.prnewswire.com/news-releases/lumonus-launches-strategic-collaboration-with-leading-global-cancer-center-to-advance-radiation-therapy-treatment-planning-302736516.html",
      },
      {
        type: "Company Press Release",
        description: "Lumonus / Aviron Series B funding announcement (2026)",
        link: "https://www.lumonus.com/blog/lumonus-aviron-series-b",
      },
    ],
    limitations: [
      "Sigma non-device CDSS status is consultant-reported; no public FDA letter was retrieved and it does not establish platform-wide status.",
      "No CE marking or other recognised authority approval identified as of 2026-07-19.",
      "No peer-reviewed clinical validation of a specific DL-based RT function has been located.",
      "AI is scoped to workflow, documentation, planning management and analytics — not a validated DL dose-planning, auto-contouring or image-synthesis engine.",
      "Outputs are assistive and require clinician review, editing and approval before any clinical use.",
    ],
    source: "Vendor website; consultant case study; press releases; conference abstracts",
    clinicalEvidence:
      "No peer-reviewed clinical validation identified. MSK Cancer Center collaboration announced April 2026 — non-peer-reviewed at time of listing.",
  },
];

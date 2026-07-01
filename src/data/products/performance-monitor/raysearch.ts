import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_PERFORMANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-rayintelligence",
    name: "RayIntelligence",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/rayintelligence/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/raysearch.ts",
    description: "Oncology analytics system that connects directly to primary oncology data sources (RayStation, RayCare, and third-party OIS/RIS) to surface clinical, operational, and AI-performance signals. v2026 introduces Deep Learning Segmentation (DLS) monitoring, enabling clinical teams to track the real-world performance of AI contouring alongside plan benchmarking, device utilization, and team expertise mapping.",
    features: [
      "AI performance monitoring (Deep Learning Segmentation)",
      "Plan benchmarking across patient cohorts",
      "Device and treatment machine utilization analytics",
      "Team expertise and workload mapping",
      "Customizable dashboards"
    ],
    category: "Performance Monitor",
    usesAI: false,
    monitorsAIProducts: [
      "RaySearch Deep Learning Segmentation (RayStation)",
      "Auto-Contouring outputs"
    ],
    certification: "MDR exempt",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/rayintelligence/",
    anatomicalLocation: ["Agnostic"],
    modality: ["Treatment Planning System Data"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep Learning Segmentation performance monitoring",
      "Cohort-level plan quality benchmarking",
      "Traceable, repeatable clinical KPIs",
      "Integration with RayStation and RayCare",
      "Configurable dashboards for clinical, operational and QA signals"
    ],
    technicalSpecifications: {
      population: "Adult radiotherapy patients",
      input: ["Treatment Planning System Data", "OIS/RIS records", "DICOM-RTSTRUCT", "DICOM-RTPLAN"],
      inputFormat: ["DICOM", "OIS/RIS exports"],
      output: ["Analytics dashboards", "Cohort reports", "AI monitoring KPIs"],
      outputFormat: ["Interactive dashboard", "PDF", "CSV"]
    },
    technology: {
      integration: ["RayStation integration", "RayCare integration", "Third-party OIS/RIS connectors"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Continuous/scheduled ingestion from connected oncology data sources",
      processingTime: "Near real-time dashboards"
    },
    regulatory: {
      ce: {
        status: "not_applicable",
        class: "N/A",
        type: "Analytics software",
        notes: "Oncology analytics / decision-support tool. RaySearch marks the product with '®*' in press materials, indicating it is subject to regulatory registration in some markets. Treated as MDR-exempt analytics for catalogue inclusion pending confirmation from RaySearch."
      },
      fda: {
        status: "not_applicable",
        class: "N/A",
        notes: "Non-diagnostic analytics system; does not itself make clinical decisions."
      },
      intendedUseStatement: "RayIntelligence is an oncology analytics system that translates data from connected oncology sources into clinical, operational, and AI-performance insights, including Deep Learning Segmentation monitoring introduced in v2026. It is not a diagnostic device. (Source: https://www.raysearchlabs.com/rayintelligence/, accessed 2026-07-01)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales"]
    },
    trainingData: {
      disclosureLevel: "none",
      description: "Not applicable — RayIntelligence is an analytics platform and does not itself train or run deep-learning models; it consumes and monitors outputs from AI products such as RayStation Deep Learning Segmentation."
    },
    evaluationData: {
      description: "No peer-reviewed clinical evaluation of RayIntelligence located as of 2026-07-01. Vendor materials describe deployments (e.g. CHUV Lausanne first order, 2021) and v2025/v2026 feature releases.",
      sourceUrl: "https://www.raysearchlabs.com/media/press-releases/2025/raysearch-launches-rayintelligence-v2025/"
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Analytics/monitoring platform. No peer-reviewed evaluations located; only vendor press releases and product page (retrieved 2026-07-01).",
    clinicalImpactNotes: "Provides monitoring of AI contouring and plan quality signals; clinical impact not independently quantified.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "Derived from E0 + MDR-exempt analytics: sparse public evidence; adopting sites should validate internally before relying on outputs for QA decisions.",
    version: "v2026",
    releaseDate: "2026",
    lastUpdated: "2026-07-01",
    lastRevised: "2026-07-01",
    source: "RaySearch official product page (https://www.raysearchlabs.com/rayintelligence/) and press releases for RayIntelligence v2025 (2025-09-01) and v2026, retrieved 2026-07-01",
    evidence: [
      {
        type: "Vendor Product Page",
        description: "RayIntelligence product page describing AI performance monitoring (Deep Learning Segmentation), plan benchmarking, device utilization and team expertise mapping in v2026.",
        link: "https://www.raysearchlabs.com/rayintelligence/"
      },
      {
        type: "Press Release",
        description: "RaySearch launches RayIntelligence v2025 — customizable dashboards and deeper integration across RayStation and RayCare.",
        link: "https://www.raysearchlabs.com/media/press-releases/2025/raysearch-launches-rayintelligence-v2025/"
      }
    ]
  }
];

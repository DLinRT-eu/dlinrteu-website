import { ProductDetails } from "@/types/productDetails";

export const SUN_NUCLEAR_PRODUCTS: ProductDetails[] = [
  {
    id: "plan-ai",
    name: "Plan AI",
    company: "Sun Nuclear",
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
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K222803"
      },
      ce: {
        status: "Not Available",
        class: "N/A",
      },
      intendedUseStatement:
        "Plan AI is intended to provide AI-powered dosimetric predictions and planning objectives for radiation therapy treatment planning. For use in the United States only.",
    },
    market: {
      onMarketSince: "2021-03-12",
      distributionChannels: ["Direct Sales", "Cloud Platform"],
    },
    version: "1.0",
    releaseDate: "2021-03-12",
    lastUpdated: "2025-12-01",
    lastRevised: "2025-12-01",
    source: "Manufacturer datasheet and FDA database",
    clinicalEvidence: "FDA 510(k) validation studies using 5,000+ treatment plans from Johns Hopkins University",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K222803 received February 2, 2023 - Class II device under 21 CFR 892.5050",
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

import { ProductDetails } from "@/types/productDetails";

export const MEDLEVER_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "medlever-assistant-pipeline",
    name: "MedLever Assistant",
    company: "MedLever, Inc.",
    companyUrl: "https://medlever.com/",
    productUrl: "https://medlever.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/medlever.ts",
    description: "AI-powered workflow assistant for radiation oncology. Leverages large language models to provide contextual guidance, automate documentation, and assist with clinical decision support throughout the treatment workflow.",
    features: [
      "AI-powered contextual assistance",
      "Automated documentation drafting",
      "Clinical decision support",
      "Natural language interaction"
    ],
    category: "Platform",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/medlever.jpg",
    website: "https://medlever.com/",
    anatomicalLocation: ["Multi-site"],
    modality: ["Multi-modality"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "LLM-powered contextual assistance for clinical workflows",
      "Automated generation of clinical documentation",
      "Real-time clinical decision support suggestions",
      "Natural language query interface for workflow navigation"
    ],
    partOf: {
      name: "MedLever Radiation Oncology Work Management",
      productUrl: "https://medlever.com/",
      relationship: "Feature"
    },
    usesAI: true,
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Company website - listed as 'Coming Soon'"
  },
  {
    id: "medlever-copilot-pipeline",
    name: "MedLever Copilot",
    company: "MedLever, Inc.",
    companyUrl: "https://medlever.com/",
    productUrl: "https://medlever.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/medlever.ts",
    description: "AI copilot for radiation oncology clinical decision-making. Analyzes patient data, treatment parameters, and clinical protocols to provide intelligent recommendations and identify potential issues before they impact patient care.",
    features: [
      "Intelligent clinical recommendations",
      "Treatment parameter validation",
      "Protocol compliance checking",
      "Predictive issue detection"
    ],
    category: "Platform",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/medlever.jpg",
    website: "https://medlever.com/",
    anatomicalLocation: ["Multi-site"],
    modality: ["Multi-modality"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-driven clinical recommendations based on patient data",
      "Automated treatment parameter validation",
      "Real-time protocol compliance verification",
      "Predictive analytics for workflow optimization"
    ],
    partOf: {
      name: "MedLever Radiation Oncology Work Management",
      productUrl: "https://medlever.com/",
      relationship: "Feature"
    },
    usesAI: true,
    lastUpdated: "2026-01-29",
    lastRevised: "2026-01-29",
    source: "Company website - listed as 'Coming Soon'"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const SYNAPTIQ_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "synaptiq-mediq-rt-4dct-pipeline",
    name: "Mediq RT — 4D CT (Research Module)",
    company: "Synaptiq",
    companyUrl: "https://synaptiq.io/",
    productUrl: "https://synaptiq.io/product/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/synaptiq.ts",
    description:
      "4D CT auto-contouring capability offered as an option inside a research module of Synaptiq's Mediq RT platform. Reported by the vendor at the ESTRO 2026 booth as available for research use only; explicitly outside the CE-cleared scope of the main Mediq RT product. No model card, training-data description or independent validation has been published.",
    features: [
      "4D CT phase-resolved auto-contouring",
      "Research-module add-on to Mediq RT",
      "Investigational use only — not part of CE-cleared scope",
    ],
    category: "Auto-Contouring",
    secondaryCategories: ["Tracking"],
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/synaptiq.png",
    website: "https://synaptiq.io/product/",
    anatomicalLocation: ["Thorax", "Abdomen"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "4D CT auto-contouring across respiratory phases",
      "Offered as an option inside the Mediq RT research module",
      "Designed to support motion-management workflows in radiotherapy planning",
      "Investigational; not for clinical use",
    ],
    partOf: {
      name: "Mediq RT",
      productUrl: "https://synaptiq.io/product/",
      relationship: "Component",
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "Pre-market disclosure via vendor booth communication at ESTRO 2026. No peer-reviewed publication, model card, training-data description or regulatory clearance available for the 4D CT module.",
    clinicalImpactNotes:
      "No clinical evidence; research-module disclosure only.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes:
      "Research module only — not for sale or clinical use. Not assessable for adoption readiness until the vendor publishes model documentation, training data and regulatory status for the 4D CT capability.",
    limitations: [
      "Research module — explicitly outside the CE-cleared scope of Mediq RT",
      "No regulatory clearance disclosed for the 4D CT capability",
      "No model card, training-data description or independent validation published",
      "Information sourced from vendor booth communication; pending verification against vendor press release or product documentation",
    ],
    lastUpdated: "2026-05-20",
    lastRevised: "2026-05-20",
    source:
      "Vendor communication at the Synaptiq booth at ESTRO 2026 (Stockholm, 15–19 May 2026): 4D CT capability offered as an option inside a research module of Mediq RT and not part of the CE-cleared scope.",
  },
];

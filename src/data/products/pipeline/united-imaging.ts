import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "united-uct610-sim-dl-recon-pipeline",
    name: "uCT 610 Sim — Deep Learning Full-FOV Reconstruction",
    company: "United Imaging",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://estro-united-imaging-healthcare-europe.framer.ai/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/united-imaging.ts",
    description:
      "Deep Learning Full-Field-of-View (Full-FOV) reconstruction announced for the uCT 610 Sim, an 87 cm ultra-wide-bore CT simulator presented at ESTRO 2026. Designed to provide artifact-suppressed, full-FOV images across the entire bore for radiotherapy simulation, including large patients and immobilisation devices. Labelled by the vendor as 'under development; not for sale or clinical use, not yet available in Europe.'",
    features: [
      "Deep learning Full-FOV reconstruction",
      "87 cm ultra-wide-bore CT simulator",
      "Artifact suppression at the bore periphery",
      "Designed for radiotherapy simulation",
    ],
    category: "Reconstruction",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/unitedimaging.png",
    website: "https://estro-united-imaging-healthcare-europe.framer.ai/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning reconstruction across the full 87 cm scan field",
      "Targeted at radiotherapy simulation workflows on the uCT 610 Sim",
      "Vendor-reported reduction of truncation and peripheral artifacts",
      "Part of the uRT radiotherapy ecosystem announced at ESTRO 2026",
    ],
    partOf: {
      name: "uRT Radiotherapy Ecosystem",
      productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
      relationship: "Component",
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "Pre-market announcement at ESTRO 2026 (microsite). No model card, training-data description, peer-reviewed validation or regulatory clearance available.",
    clinicalImpactNotes:
      "No clinical evidence; pre-market technology disclosure only.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes:
      "Pre-market: not for sale or clinical use. Not assessable for adoption readiness until vendor publishes model documentation, training data and regulatory status.",
    limitations: [
      "Explicitly labelled by the vendor as under development, not for sale and not for clinical use",
      "No regulatory clearance disclosed (CE, FDA, or other)",
      "No model card, training-data description or independent validation published",
    ],
    lastUpdated: "2026-05-19",
    lastRevised: "2026-05-19",
    source:
      "United Imaging ESTRO 2026 microsite (https://estro-united-imaging-healthcare-europe.framer.ai/). Vendor disclosure: 'under development; not for sale or clinical use, not yet available in Europe.'",
  },
];

import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
    name: "RayStation Treatment Planning",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/raysearch-planning.ts",
    description: "Advanced treatment planning system with AI-enhanced optimization algorithms including deep learning dose prediction followed by dose mimicking for radiation therapy planning across different treatment techniques (Proton Pencil Beam Scanning, SMLC, VMAT).",
    features: ["AI-enhanced optimization", "Multi-criteria optimization", "Deep learning dose prediction", "Adaptive planning"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Breast", "Pelvis", "Male Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Auto-planning with deep learning driven dose prediction",
      "Customizable post-processing to match protocols, clinical goals, and machines",
      "Models validated against common radiotherapy protocols",
      "ECHO algorithm for enhanced optimization",
      "Machine learning-based planning",
      "Automatic image import with deep-learning segmentation",
      "Fast automated plan adaptation for adaptive RT"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT", "Structure sets", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["RT plan", "RT dose"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Linac integration", "Imaging systems", "Oncology information systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Treatment planning workflow",
      processingTime: "Minutes to hours depending on complexity"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2024-05-22",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A, RayStation 2024A SP3, RayPlan 2024A SP3"
      },
      intendedUseStatement: "For radiation therapy treatment planning and dose calculation."
    },
    market: {
      onMarketSince: "2009",
      distributionChannels: ["Direct sales"]
    },
    version: "2024B",
    releaseDate: "2024-07-01",
    lastUpdated: "2026-01-02",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database (K240398), RaySearch official press releases"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_MOZI_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-mozi",
    name: "MOZI TPS",
    company: "Manteia Technologies",
    companyUrl: "https://www.manteiamedical.com/",
    productUrl: "https://www.manteiamedical.com/mozi",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/manteia-mozi.ts",
    description: "Next-generation treatment planning system combining precision, speed, and adaptability. Features Monte Carlo dose engine, GPU-powered computation, and AI-driven planning optimization for radiation therapy.",
    features: ["Monte Carlo dose engine", "GPU-powered computation", "AI-driven optimization", "Vendor independence"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiamedical.com/mozi",
    anatomicalLocation: ["All sites"],
    modality: ["RT Plan", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Monte Carlo dose engine for high-precision dosing in complex cases",
      "GPU-powered lightning-fast processing for efficient planning",
      "Deep learning-driven plan optimization",
      "Full workflow automation from dose prediction to final plan",
      "Auto-planning models validated on standard protocols",
      "Customizable to clinical goals",
      "Vendor-independent, fully interoperable system"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Treatment plans"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Treatment plans", "RT Dose", "Plan quality metrics"],
      outputFormat: ["DICOM RT-PLAN", "DICOM RT-DOSE", "PDF"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API", "Linac integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Plan submission",
      processingTime: "Minutes per plan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K223724",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2023-07-10"
      },
      intendedUseStatement: "MOZI TPS is intended for use in radiation therapy treatment planning, including dose calculation and plan optimization."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Cloud platform", "Distributors"]
    },
    version: "3.0",
    releaseDate: "2023-07-10",
    lastUpdated: "2026-01-02",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database (K223724), manufacturer official website"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_ADAPTBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-adaptbox",
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/adaptbox/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea-adaptbox.ts",
    description: "AI-powered software that provides one-click augmented CBCT images with organs-at-risk delineations for improved and more efficient adaptive radiotherapy workflow. Part of the ART-Plan+ platform.",
    features: [
      "AI-based augmented daily CBCT images generation",
      "Dose calculation on augmented CBCT images",
      "Daily dose tracking",
      "Replanning decision support",
      "Compatible with all TPS and Linac providers"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/adaptbox/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "AI-based augmented daily CBCT images generation",
      "Dose calculation on augmented CBCT images for daily dose tracking",
      "Tracking daily delivered dose",
      "Replanning decision support",
      "Compatible with all TPS and Linac providers"
    ],
    technicalSpecifications: {
      population: "Adult male patients",
      input: ["CBCT scans"],
      inputFormat: ["DICOM"],
      output: ["Augmented CBCT images", "Structure sets"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "All Linac providers"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 2 minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)",
        notes: "Not available in all markets yet"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242822",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-02-25",
        notes: "Module within ART-Plan+ platform (v3.0.0 cleared). Not available in all markets yet."
      },
      intendedUseStatement: "For automatic segmentation of male pelvic structures in CBCT images for adaptive radiation therapy planning."
    },
    supportedStructures: [
      "Pelvis (Male): Anal Canal",
      "Pelvis (Male): Bladder",
      "Pelvis (Male): Femoral Head (L)",
      "Pelvis (Male): Femoral Head (R)",
      "Pelvis (Male): Penile Bulb",
      "Pelvis (Male): Prostate",
      "Pelvis (Male): Rectum",
      "Pelvis (Male): Seminal Vesicle",
      "Pelvis (Male): Sigmoid"
    ],
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"],
      availability: "Not available in all markets yet"
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.1.2",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-01-02",
    lastRevised: "2026-01-02",
    source: "Therapanacea official website (therapanacea.eu/technical-information-2/), FDA 510(k) database (K242822)"
  }
];

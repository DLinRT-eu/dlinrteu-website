
import { ProductDetails } from "@/types/productDetails";

export const PYMEDIX_PRODUCTS: ProductDetails[] = [
  {
    id: "pymedix-registration",
    name: "Autofuse",
    company: "PyMedix",
    companyUrl: "https://pymedix.com/",
    productUrl: "https://pymedix.com/autofuse/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/registration/pymedix.ts",
    description: "Advanced medical imaging registration solution with AI-powered alignment algorithms for multi-modal image fusion in radiotherapy planning.",
    features: ["Multi-modal registration", "AI-powered alignment", "Real-time processing", "Clinical workflow integration"],
    category: "Registration",
    certification: "CE & FDA",
    logoUrl: "/logos/pymedix.png",
    website: "https://pymedix.com/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automated multi-modal image registration",
      "AI-enhanced alignment accuracy",
      "Real-time deformation analysis",
      "Seamless TPS integration",
      "Quality assurance metrics"
    ],
    guidelines: [
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Fused images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated workflow",
      processingTime: "Minutes per registration"
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
        clearanceNumber: "K233572",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2024-03-06"
      },
      intendedUseStatement: "For automated registration of medical images in radiation therapy planning workflows."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA K233572 validation. Limited independent peer-reviewed publications.",
    clinicalImpactNotes: "Workflow improvement through AI-powered multi-modal image registration.",
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K233572), company website"
  }
];

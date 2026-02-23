
import { ProductDetails } from "@/types/productDetails";

export const ELEKTA_PRODUCTS: ProductDetails[] = [
  {
    id: "elekta-iris",
    name: "IRIS Evo",
    company: "Elekta",
    category: "Reconstruction",
    description: "AI-powered CBCT reconstruction module within Elekta's Evo CT-Linac system that improves image quality for radiation therapy planning and adaptive radiotherapy using deep learning techniques.",
    features: ["Deep learning reconstruction", "CBCT imaging", "Radiotherapy"],
    certification: "CE & FDA",
    logoUrl: "/logos/Elekta.png",
    companyUrl: "https://www.elekta.com/",
    productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CBCT"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2022-06-01",
    version: "2.0",
    partOf: {
      name: "Elekta Evo CT-Linac",
      productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
      relationship: "Imaging Module"
    },
    keyFeatures: [
      "AI-powered CBCT reconstruction",
      "Improved soft tissue contrast",
      "Enhanced tumor and organ-at-risk visualization",
      "Deep learning noise reduction algorithms",
      "Integrated within Elekta Evo CT-Linac platform",
      "Seamless integration with Elekta linacs",
      "Available as upgrade for existing Elekta linacs"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CBCT projection data"],
      inputFormat: ["Elekta proprietary format"],
      output: ["Enhanced CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Elekta Linacs", "Elekta Evo", "Monaco TPS", "MOSAIQ Oncology Information System"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Automatic after CBCT acquisition",
      processingTime: "<30 seconds per volume"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        decisionDate: "2026-01-16",
        notes: "Cleared as part of Elekta Evo CT-Linac system. K-number not yet published in FDA database as of Feb 2026. Available as upgrade for existing Elekta linacs."
      },
      intendedUseStatement: "Intended for enhancing CBCT medical images to improve quality through AI-based reconstruction to support radiotherapy treatment planning and verification."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated with Elekta systems", "Software upgrade"],
    },
    evidence: [
      {
        type: "Product Information",
        description: "Official Elekta Evo product page",
        link: "https://www.elekta.com/products/radiation-therapy/elekta-evo/"
      },
      {
        type: "Press Release",
        description: "Elekta receives FDA 510(k) clearance for Elekta Evo linear accelerator",
        link: "https://ir.elekta.com/investors/press-releases/2026/elekta-receives-fda-510k-clearance-for-elekta-evo-linear-accelerator/"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA cleared Jan 2026. Too new for independent publications. Press release only.",
    clinicalImpactNotes: "Workflow improvement through enhanced CBCT quality for radiotherapy image guidance.",
    clinicalEvidence: "Clinical studies showing improved target delineation accuracy and reduced inter-observer variability with Iris-enhanced CBCT images. Enhanced image quality with reduced scatter artifacts and improved soft tissue contrast for daily image guidance.",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "Company website; Elekta press release; FDA 510(k) clearance announcement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/elekta.ts"
  }
];

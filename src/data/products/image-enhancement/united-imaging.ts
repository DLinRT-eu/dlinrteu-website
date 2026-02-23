
import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-ucs-ai",
    name: "uCS-AI",
    company: "United Imaging",
    category: "Image Enhancement",
    description: "AI-powered CBCT enhancement solution that improves image quality and reduces artifacts for radiotherapy applications.",
    features: ["Deep learning enhancement", "CBCT specific", "Artifact reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/radiationtherapy",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CBCT"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2021-11-01",
    keyFeatures: [
      "Deep learning-based CBCT enhancement",
      "Advanced scatter correction",
      "Metal artifact reduction",
      "Improved soft tissue contrast",
      "Streamlined integration with radiotherapy systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CBCT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uRT radiotherapy systems", "Third-party TPS"],
      deployment: ["On-system", "Server option"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<20 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "Part of system clearance",
        class: "Class II",
        type: "510(k)",
        notes: "uCS-AI is cleared as an integrated feature of United Imaging uRT radiotherapy systems. No standalone 510(k) clearance exists for uCS-AI as a separate device."
      },
      intendedUseStatement: "uCS-AI is intended for enhancing cone-beam CT images acquired on United Imaging radiotherapy systems to improve image quality and reduce artifacts for radiotherapy planning and verification workflows."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with uRT systems", "Standalone option"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "No independent peer-reviewed publications found. CE marked but limited external validation.",
    clinicalImpactNotes: "No independently demonstrated clinical impact.",
    clinicalEvidence: "Clinical evaluations showing improved target visualization and reduced contouring variability compared to conventional CBCT",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "Company website"

  }
];

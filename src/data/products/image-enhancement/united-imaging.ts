
import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-ucs-ai",
    trainingData: {
        source: "Company website",
        disclosureLevel: "minimal",
        demographics: "Adult and pediatric",
        sourceUrl: "https://www.united-imaging.com/en/products/radiationtherapy",
        description: "The algorithm is integrated into United Imaging's uRT radiotherapy systems for CBCT enhancement."
    },
    evaluationData: {
        primaryEndpoint: "Target visualization and contouring variability",
        sourceUrl: "https://www.united-imaging.com/en/products/radiationtherapy",
        description: "Clinical evaluations reported by the manufacturer indicate improved target visualization and reduced contouring variability compared to conventional CBCT.",
        studyDesign: "Clinical evaluation (Manufacturer internal)",
        results: "Not publicly disclosed",
        source: "Company website"
    },
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
        status: "cleared",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "not_applicable",
        class: "Class II",
        type: "510(k)",
        notes: "uCS-AI is cleared as an integrated feature of United Imaging uRT radiotherapy systems. No standalone 510(k) clearance exists for uCS-AI as a separate device."
      },
      intendedUseStatement: "uCS-AI (United Compressed Sensing-AI) reconstruction algorithm enables the generation of high-quality CBCT images in a very short time with a low dose to support treatment planning and Image-Guided Radiation Therapy (IGRT). The uRT-linac 506c is an integrated CT-linac system designed to provide high-quality diagnostic CT for IGRT and radiotherapy treatment. (Source: United Imaging uRT-linac 506c product page, global.united-imaging.com, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with uRT systems", "Standalone option"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "No independent peer-reviewed publications found. CE marked but limited external validation. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "No independently demonstrated clinical impact. PubMed searched 2026-02-26.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE: high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    clinicalEvidence: "Clinical evaluations showing improved target visualization and reduced contouring variability compared to conventional CBCT",
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "Company website"

  }
];

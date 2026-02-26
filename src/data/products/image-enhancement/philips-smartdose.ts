
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_SMARTDOSE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-smartdose-ct-enhancement",
    name: "SmartDose CT Enhancement",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/solutions/computed-tomography",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/philips-smartdose.ts",
    description: "AI-driven solution for enhancing low-dose CT images to achieve diagnostic quality comparable to standard dose acquisitions.",
    features: ["Low-dose CT enhancement", "Increased user consistency", "Reduced interventional procedure time"],
    category: "Image Enhancement",  
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Pulmonary disease", "Cardiovascular disorders"],
    releaseDate: "2022-01-15",
    version: "1.5",
    keyFeatures: [
      "Deep learning-based CT image enhancement",
      "Specialized for ultra-low-dose CT images",
      "Reduces image noise while preserving details",
      "Improves contrast-to-noise ratio",
      "Compatible with existing PACS systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["IntelliSpace Portal", "Philips CT Viewers"],
      deployment: ["On-premise server", "Cloud option"],
      triggerForAnalysis: "Automatic or on-demand",
      processingTime: "<10 seconds per series"
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
        clearanceNumber: "K203020",
        productCode: "JAK",
        regulationNumber: "21 CFR 892.1750",
        decisionDate: "2021-01-25",
        notes: "Part of Philips CT platform clearances. SmartDose is an integrated low-dose enhancement feature."
      },
      intendedUseStatement: "Intended for use in enhancing low-dose CT images to reduce noise and improve diagnostic confidence without altering the underlying anatomical information."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated solution"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA validation K203020. Feasibility study on AI-based spectral reconstruction dose reduction (CVIR Oncol 2025). PubMed searched 2026-02-26.",
    clinicalImpactNotes: "Workflow improvement through low-dose CT enhancement enabling diagnostic quality at reduced radiation.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "Clinical studies showing diagnostic equivalence between enhanced low-dose images and standard-dose acquisitions",
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "Company website, peer-reviewed publications",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K203020 received January 25, 2021 - Class II device under 21 CFR 892.1750",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203020.pdf",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Feasibility of radiation dose reduction with AI-based spectral reconstruction for CT. CVIR Oncology 2025.",
        link: "https://doi.org/10.1007/s44343-025-00021-3"
      },
    ],
  }
];

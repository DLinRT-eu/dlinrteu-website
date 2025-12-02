
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-deep-resolve",
    name: "Deep Resolve",
    company: "Siemens Healthineers",
    category: "Reconstruction",
    description: "AI-powered MRI image reconstruction technology suite using deep learning to accelerate MR scans by up to 70% while improving image quality. Includes Deep Resolve Gain, Sharp, Boost, and Swift Brain components for comprehensive image enhancement across all anatomies.",
    features: ["Deep learning-based", "Scan acceleration", "MRI modality", "Image enhancement"],
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/technologies-and-innovations/deep-resolve",
    anatomicalLocation: ["Whole body", "Brain", "Spine", "MSK", "Abdomen", "Pelvis"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncology", "Cardiac"],
    keyFeatures: [
      "Up to 70% faster brain imaging with maintained diagnostic quality",
      "Deep Resolve Gain: Smart targeted denoising for increased SNR without resolution loss",
      "Deep Resolve Sharp: Neural network for improved image sharpness and resolution",
      "Deep Resolve Boost: Raw data-to-image reconstruction for radically shortened scan times",
      "Deep Resolve Swift Brain: 2-minute total neuro exam with all standard contrasts",
      "Head-to-toe applicability across all anatomies",
      "Combinable with Simultaneous Multi-Slice (SMS) technique for further acceleration"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MRI k-space data", "Acquired MRI data"],
      inputFormat: ["Siemens proprietary format"],
      output: ["Reconstructed MRI images with enhanced SNR and resolution"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["MAGNETOM MRI systems", "syngo MR software platform"],
      deployment: ["Integrated in MRI scanner"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Real-time reconstruction"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K213693, K232322, K250436",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH, LNI, MOS",
        type: "510(k)"
      },
      intendedUseStatement: "Intended for use in MRI image reconstruction to accelerate scan times and enhance image quality while maintaining diagnostic utility."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in MAGNETOM MRI systems", "Software upgrade for compatible systems"]
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for Deep Resolve (initial)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213693.pdf"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for Deep Resolve (K232322)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232322.pdf"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for Deep Resolve (K250436)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250436.pdf"
      },
      {
        type: "Product Information",
        description: "Official Siemens Healthineers Deep Resolve product page",
        link: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/technologies-and-innovations/deep-resolve"
      }
    ],
    clinicalEvidence: "Clinical studies demonstrate 60% increase in patients scanned in under 20 minutes, equivalent diagnostic quality with significantly reduced scan times across neurological, MSK, and body imaging applications.",
    lastRevised: "2025-12-02",
    source: "FDA 510(k) database and company website"
  }
];


import { ProductDetails } from "@/types/productDetails";

export const CANON_PRODUCTS: ProductDetails[] = [
  {
    id: "canon-aice-ct",
    name: "AiCE CT",
    company: "Canon Medical Systems",
    category: "Reconstruction",
    description: "Advanced intelligent Clear-IQ Engine for CT using deep learning reconstruction to reduce dose and improve image quality.",
    features: ["Deep learning reconstruction", "Low-dose imaging", "CT modality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg", 
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/computed-tomography/aice",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Trauma"],
    releaseDate: "2019-01-15",
    version: "2.0",
    keyFeatures: [
      "Deep Convolutional Neural Network reconstruction",
      "Up to 82% dose reduction potential",
      "Ultra-high resolution capabilities",
      "Enhanced low-contrast detectability",
      "Reduced image noise while preserving natural texture"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT projection data"],
      inputFormat: ["Canon proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Aquilion CT scanners", "Vitrea advanced visualization"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "<40 seconds for standard dataset"
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
        clearanceNumber: "K181862",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        type: "510(k)",
        decisionDate: "2019-01-15"
      },
      intendedUseStatement: "Intended for use in CT image reconstruction to enhance image quality and/or reduce radiation dose while maintaining diagnostic confidence."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Integrated in new CT systems", "Upgrade for compatible systems"],
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AiCE CT",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon AiCE Deep Learning Reconstruction product page with technical specifications and clinical benefits",
        link: "https://global.medical.canon/products/computed-tomography/aice_dlr"
      }
    ],
    clinicalEvidence: "Multiple clinical studies demonstrating excellent image quality at ultra-low-dose settings across various clinical applications",
    lastUpdated: "2025-01-15",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company website"
  },
  {
    id: "canon-aice-mr",
    name: "AiCE MR",
    company: "Canon Medical Systems",
    category: "Reconstruction",
    description: "Deep learning reconstruction for MRI that accelerates scanning while improving image clarity and detail.",
    features: ["Deep learning reconstruction", "Accelerated MRI", "Enhanced SNR"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/magnetic-resonance/aice",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Abdominal pathologies"],
    releaseDate: "2019-12-20",
    version: "1.5",
    keyFeatures: [
      "Deep learning-based MR reconstruction",
      "Up to 50% reduction in scan time",
      "Enhanced signal-to-noise ratio",
      "Improved spatial resolution",
      "Compatible with multiple pulse sequences"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Undersampled MR k-space data"],
      inputFormat: ["Canon proprietary format"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Vantage MRI systems", "Vitrea advanced visualization"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Near real-time"
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
        clearanceNumber: "K192574",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2019-12-20"
      },
      intendedUseStatement: "AiCE is an optional noise reduction algorithm that improves image quality and reduces thermal noise by employing Deep Convolutional Neural Network methods.  AiCE is designed to remove Gaussian distributed noise in MR images for reducing contributions of thermal noise. In order to train a DCNN that can learn a model that represents thermal noise, the training datasets are created by adding Gaussian noise of different amplitudes to high-SNR images acquired with large number of averages.  The device is targeted for Brain and knee regions.  This software and its associated hardware are used on Canon MRI systems that are designed to communicate with the AiCE Reconstruction Processing Unit for MR. "
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in new MR systems", "Upgrade option"],
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AiCE MR",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192574.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon AiCE MR product page",
        link: "https://global.medical.canon/products/magnetic-resonance/aice"
      }
    ],
    clinicalEvidence: "Growing body of clinical evidence showing comparable diagnostic performance with significantly reduced scan times",
    lastUpdated: "2025-01-10",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts"
  },
  {
    id: "canon-piqe",
    name: "PIQE (Precise IQ Engine)",
    company: "Canon Medical Systems",
    category: "Reconstruction", 
    description: "Canon Medical's high resolution Deep Learning Reconstruction for MRI. PIQE increases matrix size, removes noise, and delivers sharp anatomical images to take MR imaging to the next level.",
    features: ["Deep learning reconstruction", "High resolution MRI", "Noise reduction", "Enhanced image quality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/magnetic-resonance/piqe",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Abdominal pathologies"],
    releaseDate: "2025-01-07",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based high resolution reconstruction",
      "Increased matrix size for enhanced detail",
      "Advanced noise reduction algorithms", 
      "Sharp anatomical image delivery",
      "Compatible with Vantage MRI systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["MR k-space data"],
      inputFormat: ["Canon proprietary format"],
      output: ["High resolution MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Vantage MRI systems", "Vitrea advanced visualization"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "Near real-time processing"
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
        clearanceNumber: "K243335",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2025-01-07"
      },
      intendedUseStatement: "Intended for use in MR image reconstruction to enhance spatial resolution and image quality while maintaining diagnostic confidence."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Integrated in new MR systems", "Upgrade option for compatible systems"],
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for PIQE",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243335.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon PIQE product page",
        link: "https://global.medical.canon/products/magnetic-resonance/piqe"
      }
    ],
    clinicalEvidence: "Clinical studies demonstrating significantly improved spatial resolution and image sharpness for enhanced diagnostic capabilities",
    lastUpdated: "2025-01-15", 
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company website"
  }
];

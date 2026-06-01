
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
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K181862",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        type: "510(k)",
        decisionDate: "2019-01-15",
        notes: "K181862 is the 510(k) clearance for the Aquilion ONE / GENESIS Edition CT system. AiCE is the deep learning reconstruction option within this system."
      },
      intendedUseStatement: "The Advanced intelligent Clear-IQ Engine (AiCE) is a deep-learning-based reconstruction method intended to produce cross-sectional images of the head and body by computer reconstruction of x-ray transmission data taken at different angles and planes, including axial, helical, and dynamic scanning. AiCE is designed to generate CT images with lower image noise and improved low-contrast detectability. (Source: FDA 510(k) K181862 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Integrated in new CT systems", "Upgrade for compatible systems"],
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Higaki et al. Eur Radiol 2020 multi-phantom study. Tatsugami et al. Radiology 2019 coronary CTA. Sci Reports 2023 RT dose calc. Fransen et al. Eur Radiol 2025 systematic review of commercial AI for MRI/CT. PubMed verified 2026-02-27.",
    clinicalImpactNotes: "Workflow improvement through dose reduction (up to 82%) with maintained image quality, enabling more efficient CT protocols.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Higaki et al. Multi-phantom evaluation of deep learning CT reconstruction in European Radiology 2020",
        link: "https://doi.org/10.1007/s00330-019-06523-0"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Validation of deep learning-based CT image reconstruction for treatment planning. Scientific Reports 2023",
        link: "https://doi.org/10.1038/s41598-023-42775-x"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AiCE CT",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon AiCE Deep Learning Reconstruction product page",
        link: "https://global.medical.canon/products/computed-tomography/aice_dlr"
      }
    ],
    clinicalEvidence: "Multiple clinical studies demonstrating excellent image quality at ultra-low-dose settings across various clinical applications",
    lastUpdated: "2026-03-08",
    lastRevised: "2026-05-30",
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
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
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
        type: "Peer-reviewed Publication",
        description: "Akai H. et al. Acceleration of knee MRI using a combination of compressed sensing and commercially available deep learning reconstruction (Canon AiCE). BMC Med Imaging 2023;23:5.",
        link: "https://doi.org/10.1186/s12880-023-00962-2"
      },
      {
        type: "Vendor White Paper",
        description: "Do H.P., Berkeley D. AiCE Interpretable Model with Robust and Generalized Performance: Beyond Brain and Knee MRI (Canon Medical Systems USA).",
        link: "https://us.medical.canon/download/mr-wp-aice-dlr-summary-beyond-brain-and-knee-mri"
      },
      {
        type: "Case Study",
        description: "McDonald M.A. (UCSD). High-Resolution Spine MRI with AiCE Deep Learning Reconstruction — Canon Medical case study.",
        link: "https://us.medical.canon/download/mr-cs-ucsd-spine-aice"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) K192574 clearance documentation for AiCE MR.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192574.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon AiCE MR product page.",
        link: "https://global.medical.canon/products/magnetic-resonance/aice"
      }
    ],
    limitations: [
      "Independent peer-reviewed validation limited to single-center, single-anatomy studies (e.g. knee)",
      "No multi-center prospective trial published",
      "Performance varies by pulse sequence and anatomy",
      "Not specifically validated for radiotherapy planning workflow"
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA K192574 validation plus Akai et al. BMC Med Imaging 2023 — independent single-center peer-reviewed study (knee MRI). Vendor white papers and case studies (UCSD spine, Canon MSK/brain) provide additional supporting data. Web-searched 2026-06-01.",
    clinicalImpactNotes: "Workflow improvement through up to ~50% reduction in MRI scan time with maintained or improved image quality (Akai 2023; vendor materials).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "Growing body of clinical evidence showing comparable diagnostic performance with significantly reduced scan times",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "FDA 510(k) database (K192574), peer-reviewed literature, Canon Medical Systems white papers and case studies. Version 1.5 retained from prior revision; vendor does not publicly publish a numeric version.",
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
        status: "cleared",
        class: "IIa", 
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K243335",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2025-01-07"
      },
      intendedUseStatement: "The Vantage Galan 3T, MRT-3020, V10.0 with AiCE Reconstruction Processing Unit for MR is a 3 Tesla MRI system designed to produce detailed cross-sectional images of the head or body. It incorporates AI-based deep learning reconstruction technology (PIQE and AiCE) to enhance image resolution and reduce noise while maintaining scan efficiency. (Source: FDA 510(k) K243335 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Integrated in new MR systems", "Upgrade option for compatible systems"],
    },
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. Phantom-based performance comparison of two commercial deep learning CT reconstruction algorithms with super- and normal-resolution settings. European Radiology Experimental 2026;10:9",
        link: "https://doi.org/10.1186/s41747-025-00670-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Nagayama et al. PIQE with 1024 matrix improves CT image quality for pancreatic ductal adenocarcinoma. European Journal of Radiology 2025",
        link: "https://doi.org/10.1016/j.ejrad.2025.111953"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Funama et al. Advances in spatial resolution using super-resolution deep learning reconstruction for abdominal CT. Academic Radiology 2025",
        link: "https://doi.org/10.1016/j.acra.2024.09.012"
      },
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
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA K243335 (Jan 2025). Greffier et al. Eur Radiol Exp 2026 independent phantom study comparing PIQE vs AiCE. Nagayama et al. Eur J Radiol 2025 clinical evaluation for pancreatic cancer. Funama et al. Acad Radiol 2025 spatial resolution evaluation. PubMed searched 2026-03-08.",
    clinicalImpactNotes: "Technical efficacy demonstrated: improved spatial resolution and low-contrast detectability in phantom and clinical studies. PubMed searched 2026-03-08.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "Independent phantom and clinical studies demonstrating significantly improved spatial resolution, low-contrast detectability, and image sharpness compared to standard DL reconstruction",
    lastUpdated: "2026-03-08", 
    lastRevised: "2026-05-30",
    source: "FDA 510(k) database, company website, and peer-reviewed publications"
  }
];

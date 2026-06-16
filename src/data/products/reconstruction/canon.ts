
import { ProductDetails } from "@/types/productDetails";

export const CANON_PRODUCTS: ProductDetails[] = [
  {
    id: "canon-aice-ct",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K181862",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf",
        demographics: "Adult and pediatric",
        description: "Deep Convolutional Neural Network trained to produce cross-sectional images with lower noise and improved low-contrast detectability from raw CT projection data."
    },
    evaluationData: {
        primaryEndpoint: "Dose reduction potential and image-quality non-inferiority",
        source: "Singh R. et al. AJR 2020;214(3):566-573 (prospective multi-institutional); Yasui et al. Sci Rep 2023 (radiotherapy treatment planning phantom); Tamura et al. QIMS 2022 (low-dose abdominal CT); FDA 510(k) summary K181862",
        results: "Singh AJR 2020 (prospective multi-institutional, 59 patients on Aquilion ONE): AiCE-reconstructed submillisievert chest/abdominopelvic CT showed acceptable image quality and lesion detection comparable to standard-dose IR. Yasui Sci Rep 2023 (Aquilion Exceed LB large-bore radiotherapy CT): AiCE provided stable CT values and reduced image noise at low doses, supporting use for treatment planning. Tamura QIMS 2022: AiCE allowed dose reduction in contrast-enhanced abdominal CT while maintaining image quality vs hybrid IR.",
        sourceUrl: "https://doi.org/10.2214/AJR.19.21809",
        description: "Independent peer-reviewed evidence includes a prospective multi-institutional AJR study (Singh 2020, AiCE on Aquilion ONE), a radiotherapy-specific phantom validation on a large-bore CT (Yasui Sci Rep 2023, full text names AiCE/Aquilion/Canon Medical — re-verified 2026-06-16), and a contrast-enhanced abdominal CT comparison (Tamura QIMS 2022). FDA 510(k) K181862 software V&V supports the clearance.",
        studyDesign: "Prospective multi-institutional reader study (Singh AJR 2020) + phantom/clinical retrospective validations + FDA software V&V"
    },
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
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Downgraded from E2 to E1 on 2026-06-15 after citation verification: Higaki et al. Eur Radiol 2020 (DOI 10.1007/s00330-019-06523-0) does not resolve in the DOI System and was removed; Yasui et al. Sci Rep 2023 (DOI 10.1038/s41598-023-42775-x) abstract does not name AiCE or Canon equipment and was removed pending independent confirmation. Remaining evidence is the FDA 510(k) clearance and the Canon product page.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement through dose reduction (up to 82%) with maintained image quality. Independent peer-reviewed corroboration not currently cited.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate-to-high implementation effort — limited independent evidence currently cited; local phantom and clinical validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AiCE CT (K181862, Aquilion ONE / GENESIS Edition).",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181862.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon AiCE Deep Learning Reconstruction product page",
        link: "https://global.medical.canon/products/computed-tomography/aice_dlr"
      }
    ],
    clinicalEvidence: "FDA 510(k) software V&V supports the AiCE CT clearance; no peer-reviewed independent clinical evaluation is currently cited after 2026-06-15 citation audit.",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database and company website"
  },
  {
    id: "canon-aice-mr",
    trainingData: {
        demographics: "Adult and pediatric (intended population)",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192574.pdf",
        source: "FDA 510(k) summary K192574",
        disclosureLevel: "partial",
        description: "AiCE MR utilizes a Deep Convolutional Neural Network (DCNN) trained to remove Gaussian distributed noise. Training datasets are created by adding Gaussian noise of different amplitudes to high-SNR images acquired with a large number of averages to learn a model representing thermal noise."
    },
    evaluationData: {
        sourceUrl: "https://doi.org/10.1186/s12880-023-00962-2",
        description: "Independent single-center retrospective study (Akai et al. 2023) demonstrated that the combination of compressed sensing and AiCE MR reconstruction allows for accelerated knee MRI while maintaining or improving image quality, supporting up to a 50% reduction in scan time.",
        studyDesign: "Single-center retrospective validation",
        primaryEndpoint: "Scan time reduction and image quality maintenance",
        source: "Akai H. et al. BMC Med Imaging 2023 (DOI: 10.1186/s12880-023-00962-2)",
        results: "Up to 50% reduction in scan time with maintained or improved image quality."
    },
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
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database (K192574), peer-reviewed literature, Canon Medical Systems white papers and case studies. Version 1.5 retained from prior revision; vendor does not publicly publish a numeric version.",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts"
  },
  {
    id: "canon-piqe",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243335.pdf",
        source: "FDA 510(k) summary K243335",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        studyDesign: "Retrospective clinical evaluation and phantom-based performance comparison",
        results: "Improved spatial resolution and low-contrast detectability compared to standard DL reconstruction.",
        description: "Peer-reviewed studies and phantom evaluations demonstrate improved spatial resolution, image sharpness, and low-contrast detectability. Clinical evaluation for pancreatic ductal adenocarcinoma showed improved image quality with a 1024 matrix.",
        sourceUrl: "https://doi.org/10.1016/j.ejrad.2025.111953",
        primaryEndpoint: "Not specified",
        source: "Nagayama et al. European Journal of Radiology 2025"
    },
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
    lastUpdated: "2026-06-13", 
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database, company website, and peer-reviewed publications"
  }
];

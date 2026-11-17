
import { ProductDetails } from "@/types/productDetails";

export const CANON_PRODUCTS: ProductDetails[] = [
  {
    id: "canon-aice-ct",
    keyPapers: [
      {"doi":"10.1093/bjr/tqaf318","title":"Introducing advanced ClearIQ engine (AiCE) deep learning reconstruction algorithm into a clinical radiotherapy workflow","authors":"Allred JD et al.","journal":"Br J Radiol","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-06 from a targeted Europe PMC search; DOI verified; scored from the abstract, pending reviewer check. Single-centre radiotherapy commissioning (Nottingham): electron-density phantom HU stability within IPEM 91 tolerance, clinical plans recalculated on AiCE images (max 0.45 Gy, median 0.02 Gy difference) and a 12% DLP reduction for breast planning CT; dosimetric endpoints, so L2.","vendorIndependent":true},
      {"doi":"10.1007/s12194-025-00967-2","title":"Dose reduction in radiotherapy treatment planning CT via deep learning-based reconstruction: a single-institution study","authors":"Yasui K et al.","journal":"Radiol Phys Technol","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-06 from a targeted Europe PMC search; DOI verified; scored from the abstract, pending reviewer check. Single-centre retrospective comparison of 1,674 planning CT scans on a large-bore CT reconstructed with AiCE versus AIDR; CTDIvol reduced 30.4–75.4% and DLP 23.1–73.5% across four sites. Imaging-dose endpoints only.","vendorIndependent":true},
      {"doi":"10.1016/j.ejmp.2025.104970","title":"Assessment of CT-to-physical density table for multiple image reconstruction functions with a large-bore scanner for radiotherapy","authors":"Okumura T et al.","journal":"Phys Med","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-06 from a targeted Europe PMC search; DOI verified; scored from the abstract, pending reviewer check. Single-centre phantom study on the Aquilion Exceed LB: AiCE and AIDR CT-to-physical-density tables (ΔPD within ±0.02 g/cm3) and depth-dose differences; scored consistently with Yasui 2023.","vendorIndependent":true},
      {"doi":"10.2214/AJR.19.21809","title":"Image quality and lesion detection on deep learning reconstruction and iterative reconstruction of submillisievert chest and abdominal CT","authors":"Singh R et al.","journal":"AJR Am J Roentgenol","year":"2020","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Prospective multi-institutional patient study supporting submillisievert protocols with maintained lesion detection.","vendorIndependent":true,"multiCenter":true,"prospective":true},
      {"doi":"10.1038/s41598-023-42775-x","title":"Validation of deep learning-based CT image reconstruction for treatment planning","authors":"Yasui K et al.","journal":"Sci Rep","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Phantom study on a large-bore RT planning CT; CT-number stability endpoints.","vendorIndependent":true},
      {"doi":"10.21037/qims-21-1216","title":"Deep learning reconstruction allows low-dose imaging while maintaining image quality in contrast-enhanced abdominal CT","authors":"Tamura A et al.","journal":"Quant Imaging Med Surg","year":"2022","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Independent single-centre clinical study supporting dose reduction in routine abdominal CT.","vendorIndependent":true}
    ],
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
    modality: ["CT"],
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
        notes: "K181862 is the 510(k) clearance for the Aquilion ONE / GENESIS Edition CT system. AiCE is the deep learning reconstruction option within this system. Recent Canon CT 510(k) summaries still describe AiCE as an available reconstruction: K260078 (Aquilion ServeSP V2.0, 2026-03-13) and K253596 (Aquilion ONE V2.0, 2026-05-20). Source: FDA 510(k) summaries, retrieved 2026-11-06."
      },
      intendedUseStatement: "The Advanced intelligent Clear-IQ Engine (AiCE) is a deep-learning-based reconstruction method intended to produce cross-sectional images of the head and body by computer reconstruction of x-ray transmission data taken at different angles and planes, including axial, helical, and dynamic scanning. AiCE is designed to generate CT images with lower image noise and improved low-contrast detectability. (Source: FDA 510(k) K181862 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Integrated in new CT systems", "Upgrade for compatible systems"],
    },
    evidenceRigor: "E2",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "Restored to E2 on 2026-06-16 after evidence re-verification. Three independent peer-reviewed studies confirmed as evaluating AiCE on Canon equipment: (1) Singh R. et al. AJR 2020;214(3):566-573 — prospective multi-institutional submillisievert chest/abdominopelvic CT on Aquilion ONE; (2) Yasui et al. Sci Rep 2023 (DOI 10.1038/s41598-023-42775-x) — full text explicitly names AiCE, Aquilion and Canon Medical Systems (re-verified via Nature full-text fetch 2026-06-16; prior 2026-06-15 removal was based on abstract-only screening and is reversed); (3) Tamura et al. QIMS 2022 (DOI 10.21037/qims-21-1216) — AiCE vs hybrid IR for low-dose contrast-enhanced abdominal CT. Plus FDA K181862 clearance.",
    clinicalImpactNotes: "Independent prospective multi-institutional and phantom evidence supports dose reduction (Singh AJR 2020; Tamura QIMS 2022) with maintained image quality, and applicability to radiotherapy treatment planning on large-bore CT (Yasui Sci Rep 2023).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Allred JD et al. Introducing advanced ClearIQ engine (AiCE) deep learning reconstruction algorithm into a clinical radiotherapy workflow. Br J Radiol 2026. Single-centre radiotherapy commissioning (Nottingham): electron-density phantom HU stability within IPEM 91 tolerance, clinical plans recalculated on AiCE images (max 0.45 Gy, median 0.02 Gy difference) and a 12% DLP reduction for breast planning CT; dosimetric endpoints, so L2.",
        link: "https://doi.org/10.1093/bjr/tqaf318"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yasui K et al. Dose reduction in radiotherapy treatment planning CT via deep learning-based reconstruction: a single-institution study. Radiol Phys Technol 2025. Single-centre retrospective comparison of 1,674 planning CT scans on a large-bore CT reconstructed with AiCE versus AIDR; CTDIvol reduced 30.4–75.4% and DLP 23.1–73.5% across four sites. Imaging-dose endpoints only.",
        link: "https://doi.org/10.1007/s12194-025-00967-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Okumura T et al. Assessment of CT-to-physical density table for multiple image reconstruction functions with a large-bore scanner for radiotherapy. Phys Med 2025. Single-centre phantom study on the Aquilion Exceed LB: AiCE and AIDR CT-to-physical-density tables (ΔPD within ±0.02 g/cm3) and depth-dose differences; scored consistently with Yasui 2023.",
        link: "https://doi.org/10.1016/j.ejmp.2025.104970"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Singh R, Digumarthy SR, Muse VV, Kambadakone AR, Blake MA, Tabari A, et al. Image Quality and Lesion Detection on Deep Learning Reconstruction and Iterative Reconstruction of Submillisievert Chest and Abdominal CT. AJR Am J Roentgenol 2020;214(3):566-573. Prospective multi-institutional study, 59 adult patients on Aquilion ONE; AiCE-reconstructed LDCT acceptable for routine chest and abdominopelvic imaging.",
        link: "https://doi.org/10.2214/AJR.19.21809"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yasui K, Saito Y, Ito A, et al. Validation of deep learning-based CT image reconstruction for treatment planning. Sci Rep 2023;13:15413. Phantom study on Canon large-bore CT (Aquilion Exceed LB) with AiCE; stable CT values and reduced noise at low doses, supporting radiotherapy planning use. Full text explicitly names AiCE, Aquilion and Canon Medical Systems (verified 2026-06-16).",
        link: "https://doi.org/10.1038/s41598-023-42775-x"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Tamura A, Mukaida E, Ota Y, et al. Deep learning reconstruction allows low-dose imaging while maintaining image quality: comparison of deep learning reconstruction and hybrid iterative reconstruction in contrast-enhanced abdominal CT. Quant Imaging Med Surg 2022;12(5):2977-2984. AiCE on Canon Aquilion ONE GENESIS Edition; full text confirms AiCE.",
        link: "https://doi.org/10.21037/qims-21-1216"
      },
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
    clinicalEvidence: "Independent peer-reviewed validation across one prospective multi-institutional AJR study (Singh 2020), a radiotherapy-specific phantom study on Canon large-bore CT (Yasui Sci Rep 2023), and a contrast-enhanced abdominal CT comparison (Tamura QIMS 2022), in addition to FDA 510(k) clearance K181862.",
    lastUpdated: "2026-06-16",
    lastRevised: "2026-06-16",
    source: "FDA 510(k) K181862; vendor website; peer-reviewed literature"
  },
  {
    id: "canon-aice-mr",
    keyPapers: [
      {"doi":"10.1186/s12880-023-00962-2","title":"Acceleration of knee MRI using a combination of compressed sensing and commercially available deep learning reconstruction","authors":"Akai H et al.","journal":"BMC Med Imaging","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Independent single-centre study demonstrating clinically usable acceleration.","vendorIndependent":true}
    ],
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
    modality: ["MRI"],
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
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "FDA K192574 validation plus Akai et al. BMC Med Imaging 2023 — independent single-center peer-reviewed study (knee MRI). Vendor white papers and case studies (UCSD spine, Canon MSK/brain) provide additional supporting data. Web-searched 2026-06-01. Lowered to E1 in the 2026-08-25 per-paper sweep: the single direct study (Akai 2023) is independent but single-centre. 2026-11-17 reviewer check: two 2026 papers proposed for this page were not added because they do not evaluate AiCE MR — Salyapongse et al. JACMP 2026 (doi:10.1002/acm2.70633) compares PIQE with AiCE on CT (listed under PIQE CT), and Mori et al. Radiography 2026 (doi:10.1016/j.radi.2026.103618) uses AiCE noise reduction for X-ray radiography. Scores unchanged.",
    clinicalImpactNotes: "Workflow improvement through up to ~50% reduction in MRI scan time with maintained or improved image quality (Akai 2023; vendor materials).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "Growing body of clinical evidence showing comparable diagnostic performance with significantly reduced scan times",
    lastUpdated: "2026-10-15",
    lastRevised: "2026-11-17",
    source: "FDA 510(k) K192574; vendor documentation; peer-reviewed literature",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts"
  },
  {
    id: "canon-piqe",
    keyPapers: [
      {"doi":"10.1016/j.mri.2025.110463","title":"Verification of resolution and imaging time for high-resolution deep learning reconstruction techniques","authors":"Harada S et al.","journal":"Magn Reson Imaging","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Single-centre phantom and clinical brain MRI study of PIQE on a Canon 3T system; two co-authors are Canon Medical Systems employees.","vendorIndependent":false},
      {"doi":"10.1007/s11604-024-01693-2","title":"High-precision MRI of liver and hepatic lesions on gadoxetic acid-enhanced hepatobiliary phase using a deep learning technique","authors":"Kiyoyama H et al.","journal":"Jpn J Radiol","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Single-centre clinical image-quality study of PIQE with Fast 3D mode wheel for liver MRI; vendor independence not confirmed."}
    ],
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243335.pdf",
        source: "FDA 510(k) summary K243335",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        studyDesign: "Single-centre phantom and clinical MRI image-quality studies",
        results: "Up to 70% scan-time reduction with preserved structural image quality (brain); improved hepatobiliary-phase liver image quality versus AiCE.",
        description: "Harada et al. 2025 (phantom and brain MRI, Canon co-authors) and Kiyoyama et al. 2025 (liver MRI) evaluated PIQE on Canon MR systems.",
        sourceUrl: "https://doi.org/10.1016/j.mri.2025.110463",
        primaryEndpoint: "Image sharpness/resolution and reader image-quality scores",
        source: "Harada et al. Magnetic Resonance Imaging 2025; Kiyoyama et al. Japanese Journal of Radiology 2025"
    },

    name: "PIQE MR (Precise IQ Engine)",
    company: "Canon Medical Systems",
    category: "Reconstruction", 
    description: "Canon Medical's high resolution Deep Learning Reconstruction for MRI. PIQE increases matrix size, removes noise, and delivers sharp anatomical images to take MR imaging to the next level.",
    features: ["Deep learning reconstruction", "High resolution MRI", "Noise reduction", "Enhanced image quality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/magnetic-resonance-imaging/piqe/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
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
        description: "Harada S et al. Verification of resolution and imaging time for high-resolution deep learning reconstruction techniques. Magnetic Resonance Imaging 2025;123:110463 (Canon co-authors).",
        link: "https://doi.org/10.1016/j.mri.2025.110463"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kiyoyama H et al. High-precision MRI of liver and hepatic lesions on gadoxetic acid-enhanced hepatobiliary phase using a deep learning technique. Japanese Journal of Radiology 2025;43(4):649-655.",
        link: "https://doi.org/10.1007/s11604-024-01693-2"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for PIQE",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243335.pdf"
      },
      {
        type: "Product Information",
        description: "Official Canon PIQE MR product page",
        link: "https://global.medical.canon/products/magnetic-resonance-imaging/piqe/"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes: "FDA K243335 (Jan 2025). 2026-11-17: this page now covers PIQE for MRI only; the CT studies previously listed here (Greffier 2026, Nagayama 2025, Funama 2025) moved to the separate PIQE CT entry. MR evidence: Harada et al. Magn Reson Imaging 2025 (phantom + brain, Canon co-authors) and Kiyoyama et al. Jpn J Radiol 2025 (liver HBP). Early, technical/image-quality evidence only; E1 retained.",
    clinicalImpactNotes: "Technical efficacy for MRI: up to 70% scan-time reduction with preserved structural image quality (Harada 2025) and improved liver HBP image quality versus AiCE (Kiyoyama 2025). No diagnostic, treatment or outcome endpoints. L2 retained.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "Early single-centre MRI studies (one with vendor co-authors) reporting shorter scan times and improved image quality; evidence is predominantly technical.",
    lastUpdated: "2026-10-15", 
    lastRevised: "2026-11-17",
    source: "FDA database; vendor website; peer-reviewed literature"
    },
  {
    id: "canon-piqe-ct",
    name: "PIQE CT (Precise IQ Engine)",
    company: "Canon Medical Systems",
    category: "Reconstruction",
    description: "Canon Medical's super-resolution deep learning reconstruction for CT, designed to use the full detector resolution to improve spatial resolution. Initially introduced for cardiac CT and later available for body CT.",
    features: ["Deep learning reconstruction", "Super-resolution CT", "Noise reduction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/computed-tomography/piqe/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["Cardiovascular disease", "Cancer"],
    releaseDate: "2024-04-02",
    keyFeatures: [
      "Deep learning reconstruction designed to fully use the maximum detector resolution (FDA K232835)",
      "Original image data remain available when PIQE images are used for diagnosis (FDA K232835)"
    ],
    technicalSpecifications: {
      population: "Not specified beyond CT system indications",
      input: ["CT raw data"],
      inputFormat: ["Canon proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Aquilion ONE CT systems"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Selected reconstruction option",
      processingTime: "Not publicly disclosed"
    },
    regulatory: {
      ce: {
        status: "Unresolved",
        class: "Not confirmed",
        type: "Medical Device",
        notes: "No public CE certificate or EUDAMED record for PIQE on CT identified as of 2026-11-17."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K232835",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        decisionDate: "2024-04-02",
        notes: "Cleared as Aquilion ONE (TSX-308A/3) V1.4 with PIQE Reconstruction System."
      },
      intendedUseStatement: "The Aquilion ONE (TSX-308A/3) V1.4 with PIQE Reconstruction System is indicated to acquire and display cross-sectional volumes of the whole body, including the head. The PIQE Reconstruction System is a deep learning reconstruction technology intended to improve spatial resolution. (Source: FDA 510(k) K232835 summary, accessed 2026-11-17)"
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Integrated in compatible Canon CT systems"]
    },
    keyPapers: [
      {"doi":"10.1186/s41747-025-00670-2","title":"Phantom-based performance comparison of two commercial deep learning CT reconstruction algorithms with super- and normal-resolution settings","authors":"Greffier J et al.","journal":"Eur Radiol Exp","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2", "rationale":"Vendor-independent phantom comparison.","vendorIndependent":true},
      {"doi":"10.1016/j.ejrad.2025.111953","title":"Super-resolution deep-learning reconstruction with 1024 matrix improves CT image quality for pancreatic ductal adenocarcinoma assessment","authors":"Nagayama Y et al.","journal":"Eur J Radiol","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2", "rationale":"Single-centre clinical image-quality study.","vendorIndependent":true},
      {"doi":"10.1016/j.acra.2024.09.012","title":"Advances in spatial resolution using super-resolution deep learning reconstruction for abdominal CT","authors":"Funama Y et al.","journal":"Acad Radiol","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2", "rationale":"Technical spatial-resolution evaluation.","vendorIndependent":true}
      ,{"doi":"10.1002/acm2.70633","title":"Evaluation of a super-resolution deep learning reconstruction algorithm in abdominal CT imaging-A qualitative and quantitative performance analysis","authors":"Salyapongse AM et al.","journal":"J Appl Clin Med Phys","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Single-centre retrospective reader and ROI study (69 patients) comparing PIQE with AiCE in abdominal CT; some authors report Canon research support or consulting.","vendorIndependent":false}
    ],
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) K232835: Aquilion ONE V1.4 with PIQE Reconstruction System (2024-04-02).",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232835.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. Phantom-based performance comparison of two commercial deep learning CT reconstruction algorithms with super- and normal-resolution settings. European Radiology Experimental 2026;10:9",
        link: "https://doi.org/10.1186/s41747-025-00670-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Nagayama et al. Super-resolution deep-learning reconstruction with 1024 matrix improves CT image quality for pancreatic ductal adenocarcinoma assessment. European Journal of Radiology 2025",
        link: "https://doi.org/10.1016/j.ejrad.2025.111953"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Funama et al. Advances in spatial resolution using super-resolution deep learning reconstruction for abdominal CT. Academic Radiology 2025",
        link: "https://doi.org/10.1016/j.acra.2024.09.012"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Salyapongse AM et al. Evaluation of a super-resolution deep learning reconstruction algorithm in abdominal CT imaging. J Appl Clin Med Phys 2026;27(5):e70633.",
        link: "https://doi.org/10.1002/acm2.70633"
      },
      {
        type: "Product Information",
        description: "Official Canon PIQE CT product page",
        link: "https://global.medical.canon/products/computed-tomography/piqe/"
      }
    ],
    limitations: [
      "Evidence is single-centre and technical/image-quality based; no diagnostic, treatment or outcome endpoints",
      "No RT-specific validation; use for CT simulation requires local commissioning",
      "Training data not publicly disclosed"
    ],
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    evidenceRigorNotes: "Split from the PIQE MR entry on 2026-11-17 (GitHub issue #171). FDA K232835. Independent phantom study (Greffier 2026) and single-centre clinical image-quality studies (Nagayama 2025, Funama 2025, Salyapongse 2026, the last with Canon-supported authors).",
    clinicalImpactNotes: "Technical efficacy: improved spatial resolution, lower noise and higher SNR/CNR than AiCE in phantom and abdominal CT studies.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "Independent phantom and single-centre clinical studies showing improved spatial resolution and image quality compared with AiCE.",
    lastUpdated: "2026-11-17",
    lastRevised: "2026-11-17",
    source: "FDA 510(k) K232835; vendor website; peer-reviewed literature"
  }
];

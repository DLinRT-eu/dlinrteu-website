
import { ProductDetails } from "@/types/productDetails";

export const GE_TRUEFIDELITY_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-truefidelity",
    trainingData: {
      disclosureLevel: "minimal",
      source: "FDA 510(k) summary K183202",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183202.pdf",
      demographics: "Adult and pediatric (intended population)",
      description: "Convolutional Neural Network trained on raw CT sinogram data with FBP-reconstructed reference images. Training corpus described as 'thousands of CT datasets'; exact size, demographics, and institutions not publicly disclosed."
    },
    evaluationData: {
      primaryEndpoint: "Image quality non-inferiority to ASIR-V at comparable dose levels",
      source: "Svalkvist A et al. J Appl Clin Med Phys 2023;24(1):e13823",
      sourceUrl: "https://doi.org/10.1002/acm2.13823",
      description: "Svalkvist et al. (J Appl Clin Med Phys 2023): prospective comparative observer study, 25 patients, chest CT at full dose and ultra-low-dose. TrueFidelity-H rated ≥ ASIR-V 40% on subjective image quality. Direct named evaluation of TrueFidelity on GE Revolution CT.",
      studyDesign: "Prospective comparative observer study (n=25, two dose levels, chest CT)",
      results: "TrueFidelity-H non-inferior to ASIR-V 40% at full dose; rated superior at ultra-low dose for subjective noise and overall quality."
    },
    name: "TrueFidelity",
    company: "GE HealthCare",
    category: "Reconstruction",
    description: "Deep learning CT reconstruction that processes raw sinogram data with a convolutional neural network to reduce image noise and improve low-contrast detectability. Available on Revolution and Revolution Apex CT systems at three reconstruction strength levels (Low, Medium, High).",
    features: [
      "Deep learning CT reconstruction",
      "Raw sinogram processing",
      "Three reconstruction strength levels",
      "Dose reduction potential",
      "CT modality"
    ],
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/products/computed-tomography/ct-technologies/truefidelity",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-truefidelity.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2019-04-19",
    keyFeatures: [
      "Convolutional Neural Network reconstruction from raw sinogram data",
      "Three selectable strength levels: Low, Medium, High",
      "Improved low-contrast detectability vs iterative reconstruction (ASIR-V)",
      "Dose reduction potential for standard and low-dose protocols",
      "Available on Revolution and Revolution Apex CT platforms"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT sinogram data"],
      inputFormat: ["GE proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Revolution CT", "Revolution Apex CT"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "Near real-time on-scanner reconstruction"
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
        clearanceNumber: "K183202",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        type: "510(k)",
        decisionDate: "2019-04-19",
        notes: "K183202 cleared April 19 2019 for TrueFidelity deep learning reconstruction on Revolution and Revolution Apex CT systems. Product code JAK, regulation 21 CFR 892.1750 (same classification as Canon AiCE CT K181862)."
      },
      intendedUseStatement: "TrueFidelity is a deep learning-based CT image reconstruction option intended to produce cross-sectional CT images with reduced image noise and improved low-contrast detectability from raw sinogram data, available on GE HealthCare Revolution CT systems. (Source: FDA 510(k) K183202 Summary, 2019)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Integrated in new CT systems", "Upgrade for compatible Revolution systems"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "One confirmed independent peer-reviewed study: Svalkvist et al. J Appl Clin Med Phys 2023 (DOI 10.1002/acm2.13823) — prospective observer study, 25 patients, chest CT, directly names TrueFidelity on GE Revolution CT. FDA K183202 clearance. Two further candidate studies (Insights into Imaging 2024 on liver metastases; MDPI JI 2025 comparative) referenced but DOIs not independently confirmed; excluded pending verification. PubMed searched 2026-06-18.",
    clinicalImpactNotes: "Workflow improvement and dose reduction potential demonstrated for chest CT (Svalkvist 2023). No RT-specific outcome study published; use in CT simulation requires independent local commissioning.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): high residual implementation burden — limited independent evidence, no RT-specific validation; structured local commissioning and validation required before clinical adoption for CT simulation.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    limitations: [
      "No RT-specific validation published; CT simulation use requires independent local commissioning",
      "Training data details (size, demographics, institutions) not publicly disclosed",
      "Reconstruction strength level (Low/Medium/High) affects noise/resolution trade-off; optimal setting for CT simulation not established",
      "Evidence limited to a single prospective observer study (n=25, chest CT); broader anatomical and dosimetric validation pending"
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Svalkvist A, Zange L, Bäcklund M, et al. Evaluation of deep-learning image reconstruction for chest CT examinations at two different dose levels. J Appl Clin Med Phys 2023;24(1):e13823. Prospective comparative observer study, 25 patients, chest CT at full dose and ultra-low-dose on GE Revolution CT; TrueFidelity-H rated ≥ ASIR-V 40% on subjective image quality.",
        link: "https://doi.org/10.1002/acm2.13823"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K183202 for TrueFidelity deep learning reconstruction on GE Revolution and Revolution Apex CT systems (decision date 2019-04-19).",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183202.pdf"
      },
      {
        type: "Product Information",
        description: "Official GE HealthCare TrueFidelity product page.",
        link: "https://www.gehealthcare.com/products/computed-tomography/ct-technologies/truefidelity"
      }
    ],
    clinicalEvidence: "One independent prospective peer-reviewed study (Svalkvist et al. J Appl Clin Med Phys 2023, n=25, chest CT) demonstrating image quality non-inferiority to ASIR-V iterative reconstruction at two dose levels, in addition to FDA 510(k) clearance K183202.",
    lastUpdated: "2026-06-18",
    lastRevised: "2026-06-18",
    source: "FDA 510(k) database (K183202), GE HealthCare product page, Svalkvist et al. J Appl Clin Med Phys 2023 (DOI 10.1002/acm2.13823). PubMed searched 2026-06-18."
  }
];

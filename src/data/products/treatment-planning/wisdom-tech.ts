import { ProductDetails } from "@/types/productDetails";

export const WISDOM_TECH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "wisdom-deep-plan",
    trainingData: {
        sourceUrl: "http://www.wisdom-tech.online/view-15.html",
        description: "The system utilizes deep-learning for auto-delineation and DeepOPT for inverse/multi-objective optimization. Specific training dataset details are not disclosed.",
        disclosureLevel: "minimal",
        source: "Vendor official product page (http://www.wisdom-tech.online/view-15.html)"
    },
    evaluationData: {
        sourceUrl: "http://www.wisdom-tech.online/view-15.html",
        description: "No peer-reviewed publications or clinical validation studies were located for DeepPlan. Evaluation data is limited to technical performance claims such as GPU-accelerated optimization taking less than 10 seconds for 50 iterations.",
        results: "Not publicly disclosed",
        source: "Vendor official product page (http://www.wisdom-tech.online/view-15.html)",
        primaryEndpoint: "Not specified",
        studyDesign: "Not publicly disclosed"
    },
    name: "DeepPlan",
    company: "Wisdom Tech",
    companyUrl: "http://www.wisdom-tech.online/",
    productUrl: "http://www.wisdom-tech.online/view-15.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/wisdom-tech.ts",
    description: "AI-assisted treatment planning system integrating deep-learning auto-delineation, multi-modality image registration, Monte Carlo dose calculation, and DeepOPT inverse/multi-objective optimization with GPU acceleration.",
    features: ["AI auto-delineation", "Monte Carlo dose engine", "DeepOPT optimization", "GPU acceleration"],
    category: "Treatment Planning",
    secondaryCategories: ["Auto-Contouring"],
    certification: "NMPA (China)",
    logoUrl: "/logos/wisdom-tech.png",
    website: "http://www.wisdom-tech.online/view-15.html",
    anatomicalLocation: ["Whole Body"],
    modality: ["CT", "MR", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-based automatic delineation without rigid template constraints",
      "Image registration and fusion across CT, MR, and PET/CT",
      "Monte Carlo gold-standard dose calculation",
      "Multi-particle support: photons, electrons, protons, heavy ions, neutrons",
      "DeepOPT inverse optimization and multi-objective optimization",
      "GPU-accelerated optimization (<10 seconds for 50 iterations)",
      "User-defined templates and scripting",
      "DICOM import of plans from third-party TPS",
      "Multi-plan comparison and evaluation in a single interface",
      "Client and cloud deployment"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR", "PET/CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Treatment plans", "RT Dose", "Structure sets"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "Cloud API"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual",
      processingTime: "Seconds to minutes per plan"
    },
    regulatory: {
      ce: {
        status: "not_applicable"
      },
      fda: {
        status: "not_applicable",
        notes: "No FDA 510(k) clearance located for DeepPlan as of 2026-05-31. Only the vendor's DeepContour product (K232928) appears in the FDA 510(k) database."
      },
      intendedUseStatement: "DeepPlan is an intelligent radiotherapy planning system that integrates AI-based automatic delineation, multi-modality image registration and fusion (CT, MR, PET/CT), Monte Carlo dose calculation for multiple treatment modalities, and inverse and multi-objective optimization algorithms, with GPU-accelerated computation and user-customizable templates and scripting. (Source: vendor product page http://www.wisdom-tech.online/view-15.html, accessed 2026-05-31)"
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales (China)"]
    },
    version: "1.0",
    releaseDate: "2022-12-03",
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "No peer-reviewed publications located. PubMed searched 2026-05-31.",
    clinicalImpactNotes: "No published clinical impact data available. PubMed searched 2026-05-31.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E0 + NMPA only: high implementation burden — vendor-only evidence; structured pilot, external validation, and human-factors testing recommended before clinical adoption.",
    source: "Vendor official product page (http://www.wisdom-tech.online/view-15.html)",
    limitations: [
      "Vendor advertises broad multi-particle support (photons, electrons, protons, heavy ions, neutrons); independent validation per particle modality is not published.",
      "Regulatory clearance outside China (CE, FDA) is not confirmed.",
      "No peer-reviewed clinical or technical validation studies identified."
    ]
  }
];

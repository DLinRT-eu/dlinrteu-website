import { ProductDetails } from "@/types/productDetails";

export const WISDOM_TECH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "wisdom-deep-plan",
    keyPapers: [
      {"doi":"10.1186/s13014-025-02742-4","pmid":"41219976","title":"Spiral volumetric modulated arc therapy for whole-brain radiotherapy with simultaneous integrated boost to multiple brain metastases","journal":"Radiat Oncol","year":"2025","link":"https://doi.org/10.1186/s13014-025-02742-4","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Planning-quality comparison using the commercial planning system.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":false},
      {"doi":"10.1186/s12885-026-16337-z","pmid":"42343259","title":"Spiral volumetric modulated arc therapy enhances peak-to-valley dose contrast for 3D-GRID radiotherapy compared to VMAT and tomotherapy","journal":"BMC Cancer","year":"2026","link":"https://doi.org/10.1186/s12885-026-16337-z","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Planning-quality evaluation for GRID delivery.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":false}
    ],
    trainingData: {
        sourceUrl: "https://wisdom-tech.online/view-15.html",
        description: "The system utilizes deep-learning for auto-delineation and DeepOPT for inverse/multi-objective optimization. Specific training dataset details are not disclosed.",
        disclosureLevel: "minimal",
        source: "Vendor official product page (https://wisdom-tech.online/view-15.html)"
    },
    evaluationData: {
        sourceUrl: "https://doi.org/10.1186/s13014-025-02742-4",
        description: "Retrospective planning comparisons include 10 whole-brain cases (2025) and 20 GRID cases (2026), listed in keyPapers. These evaluate planning quality, not an isolated AI optimization model.",
        results: "Published dosimetric plan comparisons; not evidence of patient-outcome benefit.",
        source: "Radiation Oncology 2025 and BMC Cancer 2026; see keyPapers",
        primaryEndpoint: "Dosimetric planning quality",
        studyDesign: "Retrospective single-center planning comparisons"
    },
    categoryEvidence: {
      "Treatment Planning": {
        usesAI: false,
        notes: "DeepOPT provides inverse and multi-objective optimization; its AI/ML implementation is not established by the public evidence. DeepPlan includes DL auto-delineation. Two retrospective planning-quality studies support E1/L2 without isolating an AI optimization contribution.",
        evidenceRigor: "E1",
        clinicalImpact: "L2",
    legacyClinicalImpact: "I0",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes: "Auto-delineation in DeepPlan is delivered by the vendor's sister product DeepContour. FDA K232928 clears DeepContour as a standalone product and does NOT cover DeepPlan; module-specific evidence (including K232928) is therefore tracked under the DeepContour entry, not here. No DeepPlan-specific contouring validation has been located.",
        evidenceRigor: "E0",
        evidenceRigorNotes: "No DeepPlan-specific contouring evidence located. K232928 (DeepContour) intentionally not cited here after 2026-06-15 audit because it does not name DeepPlan in its clearance scope.",
        clinicalImpact: "I0",
      },
    },
    name: "DeepPlan",
    company: "Wisdom Tech",
    companyUrl: "https://wisdom-tech.online/",
    productUrl: "https://wisdom-tech.online/view-15.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/wisdom-tech.ts",
    description: "AI-assisted treatment planning system integrating deep-learning auto-delineation, multi-modality image registration, Monte Carlo dose calculation, and DeepOPT inverse/multi-objective optimization with GPU acceleration.",
    features: ["AI auto-delineation", "Monte Carlo dose engine", "DeepOPT optimization", "GPU acceleration"],
    category: "Treatment Planning",
    secondaryCategories: ["Auto-Contouring"],
    certification: "NMPA (China)",
    logoUrl: "/logos/wisdom-tech.png",
    website: "https://wisdom-tech.online/view-15.html",
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
      integration: ["DICOM import from third-party treatment planning systems"],
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
      intendedUseStatement: "DeepPlan is an intelligent radiotherapy planning system that integrates AI-based automatic delineation, multi-modality image registration and fusion (CT, MR, PET/CT), Monte Carlo dose calculation for multiple treatment modalities, and inverse and multi-objective optimization algorithms, with GPU-accelerated computation and user-customizable templates and scripting. (Source: vendor product page https://wisdom-tech.online/view-15.html, accessed 2026-05-31)"
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales (China)"]
    },
    structuresUnavailable: true,
    version: "1.0",
    releaseDate: "2022-12-03",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-08-27",
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    evidenceRigorNotes: "E1 supported by two retrospective single-center planning comparisons (10.1186/s13014-025-02742-4 and 10.1186/s12885-026-16337-z). These studies name DeepPlan but do not isolate an AI optimizer or establish external validation.",
    clinicalImpactNotes: "L2: published dosimetric planning comparisons. No patient-outcome benefit or measured clinical workflow improvement is established by these papers.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "R3 retained pending a separate implementation-readiness rubric review. Peer-reviewed planning comparisons are available; local commissioning and modality-specific validation remain distinct from publication rigor.",
    evidence: [
      {"type": "Vendor regulatory announcement", "description": "Manufacturer announcement of Chinese Class III approval in April 2024; certificate identifier not publicly verified in this review.", "link": "https://wisdom-tech.online/view-17.html"},
      {"type": "Supporting evidence (not scored)", "description": "Additional DeepPlan lattice-planning comparison; candidate for formal per-paper scoring after required DOI metadata checks.", "link": "https://doi.org/10.1002/pro6.70078"},
    ],
    source: "Vendor website; peer-reviewed literature",
    limitations: [
      "Vendor advertises broad multi-particle support (photons, electrons, protons, heavy ions, neutrons); independent validation per particle modality is not published.",
      "Regulatory clearance outside China (CE, FDA) is not confirmed.",
      "Published planning studies do not establish the current marketed version, a complete contour library or AI-specific optimization performance."
    ]
  }
];

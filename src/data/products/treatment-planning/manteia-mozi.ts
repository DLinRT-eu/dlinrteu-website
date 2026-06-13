import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_MOZI_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-mozi",
    trainingData: {
        description: "The MOZI TPS uses deep learning-driven plan optimization and auto-planning models validated on standard protocols.",
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K223724",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf"
    },
    evaluationData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
        primaryEndpoint: "Not specified",
        description: "Validation included end-to-end testing (simulation CT, registration, contouring, and dose calculation) for 18 patients and auto-contouring validation for 187 patients across several anatomies.",
        source: "FDA 510(k) summary K223724",
        results: "Not publicly disclosed",
        datasetSize: "205 patients (187 for auto-contouring, 18 for end-to-end testing)",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "MOZI TPS",
    company: "Manteia",
    companyUrl: "https://www.manteiamedical.com/",
    productUrl: "https://www.manteiamedical.com/mozi",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/manteia-mozi.ts",
    description: "Next-generation treatment planning system combining precision, speed, and adaptability. Features Monte Carlo dose engine, GPU-powered computation, and AI-driven planning optimization for radiation therapy.",
    features: ["Monte Carlo dose engine", "GPU-powered computation", "AI-driven optimization", "Vendor independence"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiamedical.com/mozi",
    anatomicalLocation: ["All sites"],
    modality: ["RT Plan", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Monte Carlo dose engine for high-precision dosing in complex cases",
      "GPU-powered lightning-fast processing for efficient planning",
      "Deep learning-driven plan optimization",
      "Full workflow automation from dose prediction to final plan",
      "Auto-planning models validated on standard protocols",
      "Customizable to clinical goals",
      "Vendor-independent, fully interoperable system"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Treatment plans"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Treatment plans", "RT Dose", "Plan quality metrics"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE", "PDF"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API", "Linac integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Plan submission",
      processingTime: "Minutes per plan"
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
        type: "510(k)",
        clearanceNumber: "K223724",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2023-07-10"
      },
      intendedUseStatement: "\"The MOZI Treatment Planning System (MOZI TPS) is used to plan radiotherapy treatments with malignant or benign diseases. MOZI TPS is used to plan external beam irradiation with photon beams.\" (Source: FDA 510(k) K223724 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Cloud platform", "Distributors"]
    },
    version: "3.0",
    releaseDate: "2023-07-10",
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA K223724 validation (18 patients end-to-end, 187 patients auto-contouring). Limited independent publications. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "Workflow improvement through AI-driven planning optimization and Monte Carlo dose calculation. PubMed searched 2026-02-26.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database (K223724), manufacturer official website",
    clinicalEvidence: "FDA 510(k) validation studies with 18 patients for end-to-end testing (simulation CT, registration, contouring, and dose calculation), and 187 patients for auto-contouring across several anatomies.",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K223724 received January 3, 2023 - Class II device under 21 CFR 892.5050",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
      },
    ],
  }
];

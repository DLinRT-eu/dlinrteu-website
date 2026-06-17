
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_SMARTDOSE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-smartdose-ct-enhancement",
    trainingData: {
        description: "The model is a deep learning-based CT image enhancement solution trained to reduce noise and improve contrast-to-noise ratio in ultra-low-dose CT images across whole-body anatomical locations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203020.pdf",
        source: "FDA 510(k) summary K203020",
        demographics: "Adult and pediatric",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        primaryEndpoint: "Diagnostic equivalence",
        results: "Not publicly disclosed",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203020.pdf",
        studyDesign: "Software V&V (FDA 510(k))",
        description: "Validation for FDA 510(k) clearance K203020. No SmartDose-specific peer-reviewed clinical outcome literature was identified.",
        source: "FDA 510(k) summary K203020"
    },
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
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K203020",
        productCode: "JAK",
        regulationNumber: "21 CFR 892.1750",
        decisionDate: "2021-01-25",
        notes: "Part of Philips CT platform clearances. SmartDose is an integrated low-dose enhancement feature."
      },
      intendedUseStatement: "The Spectral CT is a Computed Tomography X-Ray System intended to produce cross-sectional images of the body by computer reconstruction of x-ray transmission data taken at different angles and planes. This information may be used by a trained healthcare professional as a diagnostic tool for the visualization and analysis of anatomical and pathological structures in patients of all ages, and to be used for diagnostic imaging in radiology, interventional radiology, and cardiology as part of treatment preparation and radiation therapy planning. (Source: FDA 510(k) K203020 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated solution"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA validation K203020. No SmartDose-specific peer-reviewed publications identified. A 2025 CVIR Oncol study previously cited evaluates a different Philips product (Spectral Precise Image) and was removed on 2026-06-15 per evidence-verification sweep. PubMed/Google Scholar re-searched 2026-06-17: still no SmartDose-specific peer-reviewed publication confirmed; literature on Philips low-dose/DLR CT enhancement concentrates on the separate 'Precise Image' product family.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement through low-dose CT enhancement; no independent clinical impact studies identified as of 2026-06-17.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "FDA 510(k) clearance K203020. No SmartDose-specific peer-reviewed clinical outcome studies identified as of 2026-06-17.",
    lastUpdated: "2026-06-17",
    lastRevised: "2026-06-17",
    source: "FDA 510(k) database (K203020) and company website",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K203020 received January 25, 2021 - Class II device under 21 CFR 892.1750",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203020.pdf",
      },
    ],
  }
];

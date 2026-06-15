
import { ProductDetails } from "@/types/productDetails";

export const CLARIPI_PRODUCTS: ProductDetails[] = [
  {
    id: "claripi-clarict-ai",
    trainingData: {
        description: "The product uses a patented Clarity Engine with a deep Convolutional Neural Network (CNN) for selective noise removal.",
        source: "FDA 510(k) summary K183460",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k))",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf",
        source: "FDA 510(k) summary K183460",
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        description: "FDA 510(k) software validation for ClariCT.AI. No ClariCT.AI-specific peer-reviewed publication verified at this time."
    },
    name: "ClariCT.AI",
    company: "ClariPi",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/claripi.ts",
    description: "AI-powered CT image denoising solution using deep learning to enhance low-dose CT scans while preserving anatomical details and natural textures.",
    certification: "CE Mark, FDA 510(k)",
    logoUrl: "/logos/claripi.jpg",
    companyUrl: "https://claripi.com/",
    productUrl: "https://claripi.com/clarict-ai/",
    anatomicalLocation: ["Head", "Chest", "Heart", "Abdomen", "Pelvis", "Spine"],
    modality: "CT",
    diseaseTargeted: ["Cancer screening", "Cardiac imaging", "Pulmonary disorders", "Pediatric imaging"],
    keyFeatures: [
      "Patented Clarity Engine with deep CNN",
      "Vendor-agnostic - works with all CT manufacturers",
      "Selective noise removal preserving anatomical structures",
      "Enables radiation dose reduction",
      "Fully automated processing",
      "User-definable clarity settings"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced/denoised CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "RIS/CIS", "AI Marketplaces (Siemens Syngo.Via, Blackford, Nuance, deepcOS)"],
      deployment: ["Standalone desktop", "Local virtualization (Docker)", "Cloud-based"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "10-60 seconds per case"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDD"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K183460",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2019-03-29",
        notes: "Additional clearance K212074 (2021) for AI Marketplace integration"
      },
      intendedUseStatement: "ClariCT.AI is intended to be used for denoise processing and enhancement of DICOM images acquired from any CT scanner to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "AI Marketplaces", "Distribution partners"]
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K183460 for ClariCT.AI - Class II, 21 CFR 892.2050, Product Code LLZ. Additional clearance K212074 (2021) for AI Marketplace integration.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA 510(k) K183460 + K212074. A previously cited Kim et al. Eur Radiol 2020 paper (doi:10.1007/s00330-020-07081-4) was removed on 2026-06-15: the DOI resolves to an unrelated PET/CT lactation study, not CT denoising. A PubMed search-URL entry was also removed (not a citation). No ClariCT.AI-specific peer-reviewed publication confirmed at this time. PubMed re-searched 2026-06-15.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement through CT denoising enabling dose reduction; no independently confirmed clinical impact study identified.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "FDA 510(k) clearances (K183460, K212074). ClariCT.AI-specific peer-reviewed clinical outcome studies require verification before re-citation.",
    releaseDate: "2019-03-29",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K183460, K212074) and company website"
  }
];

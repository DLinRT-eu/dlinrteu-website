
import { ProductDetails } from "@/types/productDetails";

export const AI_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "ai-medical-jazz",
    name: "Jazz",
    company: "AI Medical",
    companyUrl: "https://www.ai-medical.ch/",
    productUrl: "https://www.ai-medical.ch/jazz",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ai-medical.ts",
    description: "Long-terms lesion tracking and reporting.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ai-medical.png",
    website: "https://www.ai-medical.ch/jazz",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered contouring", 
      "Workflow integration", 
      "Multiple anatomical sites", 
      "Lesion tracking - mark once, remember forever"
    ],
    supportedStructures: [
      "Brain: Lesions"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K231572",
        productCode: "LLZ",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2023-10-23",
        notes: "First FDA-cleared product from AI Medical AG (Swiss medtech startup)"
      },
      intendedUseStatement: "AI-driven radiological software for long-term lesion tracking, quantification, and reporting in MR follow-up scan assessments. Intended to augment clinical assessment by radiologists and radio-oncologists."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Vendor references Medical Physics Journal 2023 and ESTRO 2022 abstract, but specific DOIs not found in PubMed search (2026-02-26). Downgraded from E2 to E1 as peer-reviewed publications cannot be verified.",
    clinicalImpactNotes: "Vendor-reported clinical evidence for lesion tracking workflow. No independently verifiable clinical impact data.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    version: "2.0",
    releaseDate: "2023-05-15",
    lastUpdated: "2024-04-29",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract",
    limitations: [
      "Indicated for MRI follow-up scans only; not validated for initial diagnostic imaging",
      "Designed as a diagnostic aid for lesion annotation and tracking; does not replace clinical assessment by radiologists or radio-oncologists",
      "Requires PACS integration for volumetric quantification and lesion evolution tracking",
      "Brain lesion tracking only; other anatomical sites not currently supported",
      "Performance may vary with non-standard MRI sequences or protocols"
    ],
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K231572), company official sources"
  }
];

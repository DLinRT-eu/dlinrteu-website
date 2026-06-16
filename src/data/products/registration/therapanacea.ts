import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_SMARTFUSE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartfuse",
    trainingData: {
        source: "Therapanacea product page (manufacturer)",
        disclosureLevel: "minimal",
        description: "AI-powered rigid and deformable image registration. Training dataset details are not publicly disclosed. Note: FDA 510(k) K253091 (ART-Plan+ v3.1.0) was previously cited here but does not name SmartFuse — corrected on 2026-06-15.",
        sourceUrl: "https://www.therapanacea.eu/our-products/smartfuse/",
        sourceAccess: "public",
        sourceRetrievedOn: "2026-06-15"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Sub-voxel registration accuracy",
        description: "Manufacturer claims sub-voxel registration accuracy for AI-powered rigid and deformable image fusion. No SmartFuse-specific peer-reviewed or regulatory evaluation document confirmed (CE Mark documentation not publicly indexed). FDA K253091 was previously cited here but verified on 2026-06-15 to cover the ART-Plan+ platform (SmartPlan, Annotate/TumorBox, AdaptBox modules) without naming SmartFuse.",
        source: "Therapanacea product page (manufacturer)",
        studyDesign: "Manufacturer specification",
        sourceUrl: "https://www.therapanacea.eu/our-products/smartfuse/",
        sourceAccess: "public",
        sourceRetrievedOn: "2026-06-15"
    },
    name: "SmartFuse",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/smartfuse/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/therapanacea.ts",
    description: "AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. Part of the ART-Plan+ platform.",
    category: "Registration",
    certification: "CE & TGA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/smartfuse/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "CBCT", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered registration algorithm",
      "Rigid and deformable fusion",
      "Real-time contour deformation",
      "Sub-voxel registration accuracy",
      "4D-CT management",
      "Multi-modality support (CT, MRI, CBCT, PET-CT)",
      "Checker-board visualization"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT", "PET-CT", "4D-CT"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Deformed contours", "Deformation field"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)"
      },
      fda: {
        status: "not_applicable",
        notes: "No SmartFuse-specific FDA 510(k) clearance located as of 2026-06-15. FDA K253091 (ART-Plan+ v3.1.0) was previously associated with SmartFuse here, but its indications cover SmartPlan, Annotate/TumorBox, and AdaptBox modules only — SmartFuse is not named in K253091."
      },
      tga: {
        status: "TGA Cleared",
        notes: "Cleared for Australian market (manufacturer-reported)"
      },
      intendedUseStatement: "SmartFuse is an AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. (Source: Therapanacea product page, therapanacea.eu/our-products/smartfuse/, accessed 2026-06-15.)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.1.2",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "CE-marked module under Therapanacea's ART-Plan+ family. No SmartFuse-specific peer-reviewed publication identified. Two previously cited FDA K253091 references (trainingData and evaluationData) were removed on 2026-06-15: the K253091 clearance covers ART-Plan+ modules SmartPlan / Annotate/TumorBox / AdaptBox and does not name SmartFuse.",
    clinicalImpactNotes: "Manufacturer-claimed workflow improvement through AI-powered rigid and deformable image fusion; no independently confirmed clinical impact study identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE: high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Therapanacea official website (therapanacea.eu/our-products/smartfuse/, accessed 2026-06-15)"
  }
];

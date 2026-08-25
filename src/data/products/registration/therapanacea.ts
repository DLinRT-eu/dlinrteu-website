import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_SMARTFUSE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartfuse",
    keyPapers: [
      {"doi":"10.1002/acm2.70479","pmid":"41820031","title":"Automatic target volume segmentation for offline adaptive head-and-neck radiotherapy","journal":"Journal of Applied Clinical Medical Physics","year":"2026","link":"https://doi.org/10.1002/acm2.70479","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Names Smartfuse (Therapanacea) explicitly; assesses clinical utility of automatic target propagation in an offline adaptive workflow across ten patients.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":false}
    ],
    trainingData: {
        source: "Therapanacea product page (manufacturer)",
        disclosureLevel: "minimal",
        description: "AI-powered rigid and deformable image registration. Training dataset details are not publicly disclosed. Note: FDA 510(k) K253091 (ART-Plan+ v3.1.0) was previously cited here but does not name SmartFuse — corrected on 2026-06-15.",
        sourceUrl: "https://therapanacea.com/products",
        sourceAccess: "public",
        sourceRetrievedOn: "2026-07-30"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Sub-voxel registration accuracy",
        description: "Manufacturer claims sub-voxel registration accuracy for AI-powered rigid and deformable image fusion. No SmartFuse-specific peer-reviewed or regulatory evaluation document confirmed (CE Mark documentation not publicly indexed). FDA K253091 was previously cited here but verified on 2026-06-15 to cover the ART-Plan+ platform (SmartPlan, Annotate/TumorBox, AdaptBox modules) without naming SmartFuse.",
        source: "Therapanacea product page (manufacturer)",
        studyDesign: "Manufacturer specification",
        sourceUrl: "https://therapanacea.com/products",
        sourceAccess: "public",
        sourceRetrievedOn: "2026-07-30"
    },
    name: "SmartFuse",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/therapanacea.ts",
    description: "AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. Part of the ART-Plan+ platform.",
    category: "Registration",
    certification: "CE & TGA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
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
        notifiedBody: "GMED (Notified Body 0459)",
        notes: "The notified body attribution (GMED 0459) is not restated on the vendor's public Technical Information 3.2 page; treat it as vendor-reported."
      },
      fda: {
        status: "not_applicable",
        notes: "No SmartFuse-specific FDA 510(k) clearance located as of 2026-06-15. FDA K253091 (ART-Plan+ v3.1.0) was previously associated with SmartFuse here, but its indications cover SmartPlan, Annotate/TumorBox, and AdaptBox modules only — SmartFuse is not named in K253091."
      },
      tga: {
        status: "TGA Cleared",
        notes: "Cleared for Australian market (manufacturer-reported)"
      },
      intendedUseStatement: "SmartFuse is an AI-powered software for high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning. (Source: Therapanacea product page, therapanacea.com/products, accessed 2026-07-30.)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"]
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.1.2",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: PubMed and Crossref re-searched 2026-08-25 — no peer-reviewed publication naming this product was found, so no keyPapers could be scored and the stored score is unchanged. CE-marked module under Therapanacea's ART-Plan+ family. No SmartFuse-specific peer-reviewed publication identified. Two previously cited FDA K253091 references (trainingData and evaluationData) were removed on 2026-06-15: the K253091 clearance covers ART-Plan+ modules SmartPlan / Annotate/TumorBox / AdaptBox and does not name SmartFuse.",
    clinicalImpactNotes: "Manufacturer-claimed workflow improvement through AI-powered rigid and deformable image fusion; no independently confirmed clinical impact study identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE: high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    limitations: [
      "No SmartFuse-specific FDA 510(k) clearance; the module is not named in K253091",
      "No module-specific peer-reviewed publication identified as of 2026-07-30",
      "Vendor warning: fused images and any derived contours must be verified and validated by an authorised person before use",
      "Vendor warning: results depend on input image quality; low-quality or artefact-laden volumes may cause misinterpretation of the anatomy",
      "Vendor warning: importing data with missing, incorrect or non-compatible required DICOM tags will cause import failure or malfunction",
      "Vendor warning: the platform is not for use on tablets or smartphones and is intended for screens of 17 inches and above"
    ],
    version: "3.1.2",
    releaseDate: "2025-01-01",
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-25",
    source: "Therapanacea official website (therapanacea.com/products, accessed 2026-07-30); Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.0, UDI (01)03770019940020(8012) v3.2.0(11)260525; manufacturer TheraPanacea, 8-10 Avenue Ledru-Rollin, 75012 Paris, France; https://therapanacea.com/technical-information-2, retrieved 2026-07-30). Multi-modal rigid and deformable registration of CT, MR, PET-CT, 4D-CT and synthetic-CT is listed in the published ART-Plan+ intended use.; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
  }
];

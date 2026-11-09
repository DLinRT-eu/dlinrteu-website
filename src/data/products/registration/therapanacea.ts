import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_SMARTFUSE_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-smartfuse",
    keyPapers: [
      {"doi":"10.1002/acm2.70479","pmid":"41820031","title":"Automatic target volume segmentation for offline adaptive head–and‐neck radiotherapy","authors":"Moliner et al.","journal":"J Applied Clin Med Phys","year":"2026","link":"https://doi.org/10.1002/acm2.70479","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Names Smartfuse. Ten head-and-neck patients, one centre, no vendor author. Median DSC 0.86 and HD95 4.0 mm. All GTV+CTV met V95% at least 95%. 61% of physician PTVs met that coverage, and 39% did not. The paper says propagated volumes need medical review.","vendorIndependent":true}
    ],
    trainingData: {
        source: "Therapanacea product page (manufacturer)",
        disclosureLevel: "minimal",
        description: "Training dataset details are not publicly disclosed. SmartFuse is named in K202700 and K234068. It is not named in K242822 or K253091.",
        sourceUrl: "https://therapanacea.com/products",
        sourceAccess: "public",
        sourceRetrievedOn: "2026-07-30"
    },
    evaluationData: {
        results: "Moliner 2026: median DSC 0.86, HD95 4.0 mm. All GTV+CTV met V95% at least 95%. 61% of physician PTVs met that coverage.",
        primaryEndpoint: "Target propagation geometry and dose coverage",
        description: "A sub-voxel registration-accuracy claim was not on the products page or the technical page read 2026-11-05, and K202700 does not publish a sub-voxel error. Moliner 2026 evaluates automatic target propagation, not a sub-voxel registration error.",
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
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/registration/therapanacea.ts",
    description: "Registration module of the ART-Plan+ platform (see product 'ART-Plan+'): AI-powered high-precision rigid and deformable image fusion with real-time contour deformation for faster replanning.",
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
        notes: "There is no SmartFuse-only 510(k). SmartFuse is named in K202700 (2021-01-14, 21 CFR 892.2050, QKB) and K234068 (2024-04-22, 21 CFR 892.5050, MUJ). It is not named in K242822 or K253091. Rigid and deformable registration remains in the ART-Plan+ v3.2.1 intended use."
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
      version: "3.2.1 (current) / 3.1.0 (FDA cleared)",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "E1 on 2026-11-05 from Moliner et al., JACMP 2026 (doi 10.1002/acm2.70479), which names Smartfuse and reports target-propagation geometry and dose coverage in ten patients at one centre.",
    clinicalImpactNotes: "L2 from Moliner 2026 geometry and dose-coverage endpoints. The paper does not report a workflow-time result.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E1 and CE marking. Independent evidence is one single-centre target-propagation study. Local commissioning and review of propagated volumes remain necessary.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    limitations: [
      "SmartFuse is named in K202700 and K234068. It is not named in K242822 or K253091. There is no SmartFuse-only 510(k). Rigid and deformable registration remains in the ART-Plan+ v3.2.1 intended use.",
      "Moliner et al., JACMP (doi:10.1002/acm2.70479), evaluates automatic target propagation. 61% of physician PTVs met V95% at least 95%. The paper says propagated volumes need medical review. 39% of physician PTVs missed that coverage.",
      "Vendor warning: fused images and any derived contours must be verified and validated by an authorised person before use",
      "Vendor warning: results depend on input image quality; low-quality or artefact-laden volumes may cause misinterpretation of the anatomy",
      "Vendor warning: importing data with missing, incorrect or non-compatible required DICOM tags will cause import failure or malfunction",
      "Vendor warning: the platform is not for use on tablets or smartphones and is intended for screens of 17 inches and above"
    ],
    version: "3.2.1",
    releaseDate: "Not confirmed. 2020, 2025-01-01 and module build 3.1.2 were not on the technical page read 2026-11-05.",
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-09",
    source: "Therapanacea products page and Technical Information 3.2 (ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724, retrieved 2026-11-05). FDA summaries K202700 and K234068 name SmartFuse. K242822 and K253091 do not. Moliner et al., JACMP 2026 (doi:10.1002/acm2.70479)."
  }
];

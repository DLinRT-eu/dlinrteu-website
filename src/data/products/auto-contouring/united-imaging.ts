import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-urt-auto-contouring",
    trainingData: {
        disclosureLevel: "none",
        description: "Not publicly disclosed. The vendor has not published a model card or training-data description for the integrated auto-contouring module.",
        sourceUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
        source: "Vendor press release (ESTRO 2026) and company website"
    },
    evaluationData: {
        sourceUrl: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html",
        description: "Vendor reports that the integrated AI module provides expert-level segmentation of OARs and tumor sites in seconds, claiming up to a ~90% reduction in contouring time.",
        studyDesign: "Vendor-reported performance claims",
        results: "Up to ~90% reduction in contouring time (vendor claim)",
        primaryEndpoint: "Time savings (contouring time reduction)",
        source: "United Imaging ESTRO 2026 Press Release"
    },
    name: "uRT Auto-Contouring",
    company: "United Imaging",
    category: "Auto-Contouring",
    description:
      "AI-powered auto-contouring module integrated in the uRT radiotherapy ecosystem, providing expert-level segmentation of whole-body organs-at-risk and multiple tumor sites in seconds as part of the native AI workflow of the uRT-linac 506c and the uCT-ART online adaptive workflow.",
    features: [
      "Deep learning segmentation",
      "Whole-body OAR coverage",
      "Multi-site tumor delineation",
      "Native integration in uRT workflow"
    ],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    releaseDate: "2026-05-15",
    keyFeatures: [
      "Expert-level auto-contouring in seconds",
      "Whole-body organs-at-risk coverage",
      "Multiple tumor-site segmentation",
      "Reported up to ~90% reduction in contouring time (vendor claim)",
      "Used in the uCT-ART online adaptive workflow (~15 min adaptive planning)",
      "Tightly integrated with uRT-linac 506c imaging, planning and QA"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["CT", "Diagnostic-quality CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["uRT-linac 506c", "uCT-ART online adaptive workflow"],
      deployment: ["On-system / integrated"],
      triggerForAnalysis: "Automatic post-acquisition / on-demand within uRT workflow",
      processingTime: "Seconds per case (vendor claim)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes:
          "CE marking covers the uRT-linac 506c system (ESTRO 2026). The auto-contouring module is an integrated component of that system rather than a separately marketed device."
      },
      fda: {
        status: "not_approved",
        class: "Unknown",
        type: "Unknown"
      },
      intendedUseStatement:
        "uRT-linac 506c offers a more precise, efficient, and patient friendly radiotherapy. The entire workflow of radiotherapy, including simulation, contouring, plan, treatment and QA, can be developed or modified online to facilitate individualized precision radiotherapy. (Source: United Imaging uRT-linac 506c product page, https://global.united-imaging.com/en/product-service/products/rt/urt-linac-506c, accessed 2026-05-30. No verbatim standalone IFU publicly available for the uRT Auto-Contouring module — described as part of the uRT-linac ecosystem.)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Integrated with uRT-linac 506c"]
    },
    // Supported structures are not enumerated publicly by the vendor at this time.
    // Per editorial decision, the structure list is intentionally omitted until a
    // verified DICOM-conformant list is published. The UI renders an explicit
    // "structure list unavailable" card via structuresUnavailable below.
    supportedStructures: [],
    structuresUnavailable: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "European debut at ESTRO 2026 (Stockholm). No independent peer-reviewed validation identified. Vendor has not published a model card, training-data description or a standalone intended-use document for the integrated auto-contouring module; only system-level press materials are available.",
    clinicalImpactNotes:
      "Vendor reports up to ~90% reduction in contouring time and supports a ~15-minute online adaptive workflow; no independent clinical impact evidence identified yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "Derived from E0 + CE (system-level): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended before clinical adoption.",
    clinicalEvidence:
      "Announced as part of the uRT radiotherapy portfolio at ESTRO 2026; integrated AI contouring is described as a component of the CE-marked uRT-linac 506c system.",
    limitations: [
      "Integrated component of the uRT ecosystem; not marketed as a standalone product",
      "Supported structure list not publicly enumerated by the vendor — labelled as unavailable in the DLinRT.eu catalogue",
      "No model card, training-data description or standalone intended-use document has been published by the vendor",
      "All AI-generated contours require qualified clinician review prior to clinical use",
      "Performance claims are vendor-reported and not yet independently validated"
    ],
    evidence: [
      {
        type: "Vendor Press Release",
        description:
          "United Imaging unveils its full radiotherapy portfolio at ESTRO 2026, highlighting the CE-marked uRT-linac 506c and native AI contouring, planning and QA.",
        link: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html"
      },
      {
        type: "Vendor Product Page",
        description: "United Imaging Radiotherapy System (uRT) product overview.",
        link: "https://eu.united-imaging.com/en/product-service/products/rt"
      }
    ],
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "Vendor press release (ESTRO 2026) and company website"
  }
];

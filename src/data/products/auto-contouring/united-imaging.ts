import { ProductDetails } from "@/types/productDetails";




export const uRTAutoContouring: ProductDetails = {
  id: "united-urt-auto-contouring",
  name: "uRT Auto-Contouring",
  market: {
    onMarketSince: "2026",
    distributionChannels: [
      "Integrated with uRT-linac 506c"
    ]
  },
  source: "Vendor press release (ESTRO 2026) and company website",
  company: "United Imaging",
  logoUrl: "/logos/unitedimaging.png",
  version: "506c",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html",
      type: "Vendor Press Release",
      description: "United Imaging unveils its full radiotherapy portfolio at ESTRO 2026, highlighting the CE-marked uRT-linac 506c and native AI contouring, planning and QA."
    },
    {
      link: "https://eu.united-imaging.com/en/product-service/products/rt",
      type: "Vendor Product Page",
      description: "United Imaging Radiotherapy System (uRT) product overview."
    },
    {
      doi: "10.1038/s41467-022-34257-x",
      link: "https://www.nature.com/articles/s41467-022-34257-x",
      type: "Peer-Reviewed Publication",
      year: "2022",
      level: "1t",
      title: "Deep learning empowered volume delineation of whole-body organs-at-risk for accelerated radiotherapy",
      authors: "Shi et al",
      journal: "Nature Communications",
      description: "This publication extensively evaluates on 67 delineation tasks on a large-scale dataset of 28,581 cases; demonstrates comparable or superior accuracy with an average Dice of 0.95; and achieves near real-time delineation in most tasks with <2 s."
    }
  ],
  features: [
    "Deep learning segmentation",
    "Whole-body OAR coverage",
    "Multi-site tumor delineation",
    "Native integration in uRT workflow"
  ],
  modality: ["CT", "CBCT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/united-imaging.ts",
  companyUrl: "https://www.united-imaging.com/",
  productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIb",
      notes: "CE marking covers the uRT-linac 506c system (ESTRO 2026). The auto-contouring module is an integrated component of that system rather than a separately marketed device.",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "Unknown",
      class: "Unknown",
      status: "not_approved"
    },
    intendedUseStatement: "uRT-linac 506c offers a more precise, efficient, and patient friendly radiotherapy. The entire workflow of radiotherapy, including simulation, contouring, plan, treatment and QA, can be developed or modified online to facilitate individualized precision radiotherapy. (Source: United Imaging uRT-linac 506c product page, https://global.united-imaging.com/en/product-service/products/rt/urt-linac-506c, accessed 2026-05-30. No verbatim standalone IFU publicly available for the uRT Auto-Contouring module — described as part of the uRT-linac ecosystem.)"
  },
  technology: {
    deployment: ["On-system / integrated"],
    integration: [
      "uRT-linac 506c",
      "uCT-ART online adaptive workflow"
    ],
    processingTime: "Seconds per case (vendor claim)",
    triggerForAnalysis: "Automatic post-acquisition / on-demand within uRT workflow"
  },
  description: "AI-powered auto-contouring module integrated in the uRT radiotherapy ecosystem, providing expert-level segmentation of whole-body organs-at-risk and multiple tumor sites in seconds as part of the native AI workflow of the uRT-linac 506c and the uCT-ART online adaptive workflow.",
  keyFeatures: [
    "Expert-level auto-contouring in seconds",
    "Whole-body organs-at-risk coverage",
    "Multiple tumor-site segmentation",
    "Reported up to ~90% reduction in contouring time (vendor claim)",
    "Used in the uCT-ART online adaptive workflow (~15 min adaptive planning)",
    "Tightly integrated with uRT-linac 506c imaging, planning and QA"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  limitations: [
    "Integrated component of the uRT ecosystem; not marketed as a standalone product",
    "No model card, training-data description or standalone intended-use document has been published by the vendor",
    "All AI-generated contours require qualified clinician review prior to clinical use",
    "Performance claims are vendor-reported and not yet independently validated"
  ],
  releaseDate: "2026-05-15",
  trainingData: {
    source: "Vendor press release (ESTRO 2026) and company website",
    sourceUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
    description: "Not publicly disclosed. The vendor has not published a model card or training-data description for the integrated auto-contouring module.",
    disclosureLevel: "none"
  },
  certification: "CE Mark",
  evidenceRigor: "E0",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I0",
  evaluationData: {
    source: "United Imaging ESTRO 2026 Press Release",
    results: "Up to ~90% reduction in contouring time (vendor claim)",
    sourceUrl: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html",
    description: "Vendor reports that the integrated AI module provides expert-level segmentation of OARs and tumor sites in seconds, claiming up to a ~90% reduction in contouring time.",
    studyDesign: "Vendor-reported performance claims",
    primaryEndpoint: "Time savings (contouring time reduction)"
  },
  diseaseTargeted: ["Multiple Cancer Types"],
  clinicalEvidence: "Announced as part of the uRT radiotherapy portfolio at ESTRO 2026; integrated AI contouring is described as a component of the CE-marked uRT-linac 506c system.",
  adoptionReadiness: "R2",
  anatomicalLocation: ["Whole body"],
  evidenceRigorNotes: "European debut at ESTRO 2026 (Stockholm). No independent peer-reviewed validation identified. Vendor has not published a model card, training-data description or a standalone intended-use document for the integrated auto-contouring module; only system-level press materials are available.",
  clinicalImpactNotes: "Vendor reports up to ~90% reduction in contouring time and supports a ~15-minute online adaptive workflow; no independent clinical impact evidence identified yet.",
  supportedStructures: [
    "Brain: Brain",
    "Brain: Brainstem",
    "Brain: Eye",
    "Head & Neck: Parotid Gland",
    "Head & Neck: Mandible",
    "Brain: Lens",
    "Head & Neck: Oral cavity",
    "Head & Neck: Lip",
    "Head & Neck: Teeth",
    "Head & Neck: Glottis",
    "Brain: Pituitary",
    "Brain: Optic Chiasm",
    "Thorax: Lung",
    "Thorax: Esophagus",
    "Abdomen: Liver",
    "Abdomen: Kidney",
    "Abdomen: Stomach",
    "Abdomen: Spleen",
    "Abdomen: Gall bladder",
    "Abdomen: Pancreas",
    "Abdomen: Colon",
    "Male Pelvis: Prostrate",
    "Male Pelvis: Testes",
    "Pelvis: Rectum",
    "Whole body: Spinal Canal",
    "Whole body: Spinal Cord"
  ],
  structuresUnavailable: true,
  adoptionReadinessNotes: "Derived from E0 + CE (system-level): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended before clinical adoption.",
  technicalSpecifications: {
    input: ["CT", "Diagnostic-quality CBCT"],
    output: ["Structure sets"],
    population: "Adult",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  }
};

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [uRTAutoContouring];

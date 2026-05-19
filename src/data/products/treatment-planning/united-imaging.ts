import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-urt-auto-planning",
    name: "uRT Auto-Planning",
    company: "United Imaging",
    category: "Treatment Planning",
    description:
      "AI-powered auto-planning module integrated in the uRT radiotherapy ecosystem, combined with GPU-accelerated Monte Carlo dose calculation. Powers the uCT-ART online adaptive workflow on the CE-marked uRT-linac 506c, completing adaptive plans in approximately 15 minutes.",
    features: [
      "AI-driven auto-planning",
      "GPU-accelerated Monte Carlo dose calculation",
      "Online adaptive workflow (uCT-ART)",
      "Native integration with imaging, contouring and QA"
    ],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["RT Plan", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    releaseDate: "2026-05-15",
    keyFeatures: [
      "AI-powered auto-planning across multiple tumor sites",
      "GPU-accelerated Monte Carlo dose calculation",
      "Online adaptive planning within ~15 minutes (uCT-ART)",
      "Native integration with diagnostic-quality CT image guidance",
      "Closed-loop workflow with integrated AI contouring and automated QA"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Treatment plans", "RT Dose"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE"]
    },
    technology: {
      integration: ["uRT-linac 506c", "uCT-ART online adaptive workflow"],
      deployment: ["On-system / integrated"],
      triggerForAnalysis: "On-demand within uRT workflow (offline or online adaptive)",
      processingTime: "Minutes per plan (vendor claim)"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes:
          "CE marking covers the uRT-linac 506c system. Auto-planning and Monte Carlo dose calculation are integrated components of that system rather than separately marketed devices."
      },
      fda: {
        status: "Not cleared in US (per ESTRO 2026 European debut)",
        class: "Unknown",
        type: "Unknown"
      },
      intendedUseStatement:
        "Intended to assist clinicians with radiotherapy treatment planning, including dose calculation and plan optimization, as an integrated component of the uRT radiotherapy ecosystem. Clinician review and approval of all plans is required."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Integrated with uRT-linac 506c"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "European debut at ESTRO 2026 (Stockholm). No independent peer-reviewed validation of the integrated auto-planning module identified. Vendor press materials only.",
    clinicalImpactNotes:
      "Vendor reports ~15-minute online adaptive workflow on the uCT-ART system; no independent clinical impact evidence identified yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "Derived from E0 + CE (system-level): high implementation burden — limited independent evidence; structured pilot, dosimetric/end-to-end validation and human-factors testing recommended before clinical adoption.",
    clinicalEvidence:
      "Announced as part of the uRT radiotherapy portfolio at ESTRO 2026; auto-planning and Monte Carlo dose calculation described as native AI components of the CE-marked uRT-linac 506c.",
    limitations: [
      "Integrated component of the uRT ecosystem; not marketed as a standalone TPS",
      "Performance and adaptive-workflow timing claims are vendor-reported and not yet independently validated",
      "All AI-generated plans require qualified medical-physics and clinician review prior to clinical use"
    ],
    evidence: [
      {
        type: "Vendor Press Release",
        description:
          "United Imaging unveils its full radiotherapy portfolio at ESTRO 2026, highlighting the CE-marked uRT-linac 506c, AI auto-planning, GPU-accelerated Monte Carlo dose calculation and the uCT-ART online adaptive workflow.",
        link: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html"
      },
      {
        type: "Vendor Product Page",
        description: "United Imaging Radiotherapy System (uRT) product overview.",
        link: "https://eu.united-imaging.com/en/product-service/products/rt"
      }
    ],
    lastUpdated: "2026-05-19",
    lastRevised: "2026-05-19",
    source: "Vendor press release (ESTRO 2026) and company website"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-urt-auto-planning",
    trainingData: {
        description: "Not publicly disclosed. The vendor has not published a model card or training-data description for the integrated auto-planning module.",
        sourceUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
        source: "Vendor press release (ESTRO 2026) and company website",
        disclosureLevel: "none"
    },
    evaluationData: {
        results: "Adaptive plans completed in approximately 15 minutes.",
        source: "United Imaging Press Release (ESTRO 2026) via PR Newswire",
        primaryEndpoint: "Time savings",
        studyDesign: "Vendor-reported performance claims",
        sourceUrl: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html",
        description: "Vendor reports an online adaptive workflow (uCT-ART) that completes adaptive plans in approximately 15 minutes using AI auto-planning and GPU-accelerated Monte Carlo dose calculation."
    },
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
      "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/united-imaging.ts",
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
        status: "cleared",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes:
          "CE marking covers the uRT-linac 506c system. Auto-planning and Monte Carlo dose calculation are integrated components of that system rather than separately marketed devices."
      },
      fda: {
        status: "not_approved",
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
    keyPapers: [
      {"doi":"10.1038/s41467-025-67581-z","pmid":"41398177","title":"Multicenter study on the versatility and adoption of AI-driven automated radiotherapy planning across cancer types","authors":"Yu L et al.","journal":"Nature Communications","year":"2025","evidenceRigor":"E2","clinicalImpact":"I2","rationale":"DL dose prediction implemented in the uTPS ATP module, trained at one institution and tested across three institutions and five disease sites; >80% of 250 auto-plans met clinical criteria and 60% were preferred over manual plans in blinded review, with plans deliverable within five minutes.","vendorIndependent":false,"multiCenter":true,"externalValidation":true}
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes:
      "2026-08-25 Wave 3 per-paper sweep: raised to E2 — Yu et al. Nat Commun 2025 (PMID 41398177, doi:10.1038/s41467-025-67581-z) tests the uTPS ATP models retrospectively across three institutions with external validation, meeting the multi-centre criterion. European debut at ESTRO 2026 (Stockholm). Yu et al. Nat Commun 2025 (PMC12827991) — a multicenter clinical evaluation of DL-based ATP — explicitly states 'Executable plans were generated in uTPS through inverse optimization … The prediction models … have been implemented in the ATP module of the uTPS' (Shanghai United Imaging Healthcare co-authors). Re-attributed from Sun Nuclear Plan AI on 2026-06-15 after citation verification. Other than this publication, vendor has not released a model card or standalone intended-use document for the integrated auto-planning module.",
    clinicalImpactNotes:
      "2026-08-25 Wave 3 per-paper sweep: raised to I2 (workflow) — Yu et al. 2025 reports plans generated within five minutes, >80% meeting clinical criteria and 60% preferred over manual plans in blinded review across three institutions; vendor additionally reports a ~15-minute online adaptive workflow on uCT-ART.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "Derived from E2 + CE (system-level): high implementation burden — one independent multicenter publication; structured pilot, dosimetric/end-to-end validation and human-factors testing recommended before clinical adoption.",
    clinicalEvidence:
      "One independent multicenter DL-ATP study in uTPS (Yu et al. Nat Commun 2025) plus ESTRO 2026 vendor announcement of the integrated uRT auto-planning and Monte Carlo dose calculation on the CE-marked uRT-linac 506c.",
    limitations: [
      "Integrated component of the uRT ecosystem; not marketed as a standalone TPS",
      "No model card, training-data description or standalone intended-use document has been published by the vendor",
      "Performance and adaptive-workflow timing claims are vendor-reported and not yet independently validated",
      "All AI-generated plans require qualified medical-physics and clinician review prior to clinical use"
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description:
          "Yu et al. Multicenter study on the versatility and adoption of AI-driven automated radiotherapy planning across cancer types using uTPS / ATP module. Nat Commun 2025 (PMC12827991). Re-attributed from Plan AI on 2026-06-15 after verification.",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12827991/"
      },
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
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Yu et al. Nat Commun 2025 (PMC12827991); vendor press release (ESTRO 2026) and company website"
  }
];

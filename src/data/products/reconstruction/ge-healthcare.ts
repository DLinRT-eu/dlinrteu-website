
import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-truefidelity-pro",
    name: "TrueFidelity Pro",
    company: "GE Healthcare",
    category: "Reconstruction",
    description: "Deep learning-based CT image reconstruction technology that improves image quality while reducing radiation dose.",
    features: ["AI-powered", "Low-dose CT", "Deep learning reconstruction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/computed-tomography/revolution/truefidelity",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Traumatic injuries"],
    releaseDate: "2019-04-12",
    version: "2.1",
    keyFeatures: [
      "Deep learning-based image reconstruction",
      "Improved low-contrast detectability",
      "Enhanced spatial resolution",
      "Reduced image noise and artifacts"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT projection data"],
      inputFormat: ["GE proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Revolution CT scanners", "Revolution Apex platform"],
      deployment: ["On-scanner", "Edge computing"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<60 seconds for standard dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K183202",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        type: "510(k)",
        decisionDate: "2019-04-12"
      },
      intendedUseStatement: "Intended for use in CT image reconstruction to enhance image quality and/or reduce radiation dose compared to conventional reconstruction techniques."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Integrated in new CT systems"],
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Greffier et al. Diagn Interv Imaging 2020; Shim et al. J Imaging 2025 independent comparative study vs Precise Image. Impact on CT radiomic features (PMC12618174, 2025). PubMed verified 2026-02-27.",
    clinicalImpactNotes: "Workflow improvement through enhanced low-contrast detectability at reduced dose, improving CT protocol efficiency.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. Diagnostic and Interventional Imaging 2020 - phantom and clinical evaluation",
        link: "https://doi.org/10.1016/j.diii.2019.10.007"
      },
      {
        type: "Independent Comparative Study",
        description: "Shim et al. 2025: Quantitative evaluation comparing Philips Precise Image and GE TrueFidelity for low-dose CT. J Imaging 2025;11(9):317",
        link: "https://doi.org/10.3390/jimaging11090317"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Impact of deep learning based reconstruction algorithms on CT radiomic features of carotid plaques. PMC 2025",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12618174/"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for TrueFidelity",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183202.pdf"
      },
      {
        type: "Technical White Paper",
        description: "GE TrueFidelity technical white paper (DLIR method + performance/clinical rationale)",
        link: "https://www.gehealthcare.com/static/truefidelity/images/whitepaper-download/TrueFidelity%20WP_vFinal.pdf"
      }
    ],
    limitations: [
      "Performance depends on scanner hardware, acquisition protocol, and reconstruction settings",
      "Not intended as a diagnostic device; intended to support clinical interpretation by improving image quality",
      "Dose reduction claims vary by use case and should be validated within site-specific clinical workflows",
    ],
    clinicalEvidence: "Vendor white papers and multiple published studies report improved image quality and low-contrast detectability with deep learning image reconstruction, with dose reduction feasibility depending on protocol and clinical indication.",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts"
  },
  {
    id: "ge-air-recon-dl",
    name: "GE AIR Recon DL",
    company: "GE Healthcare",
    category: "Reconstruction",
    description: "Deep learning MR image reconstruction technology that improves signal-to-noise ratio and reduces scan times.",
    features: ["Deep learning-based", "Faster scanning", "MRI modality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Abdominal pathologies"],
    releaseDate: "2020-04-10",
    version: "3.0",
    keyFeatures: [
      "Deep learning-based MR image reconstruction",
      "Up to 50% reduction in scan time",
      "Up to 30% improvement in signal-to-noise ratio",
      "Compatible with 2D and 3D acquisitions",
      "Works with all contrasts and orientations"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MR k-space data"],
      inputFormat: ["GE proprietary format"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["SIGNA MR systems", "Edison Platform"],
      deployment: ["On-scanner reconstruction"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Near real-time"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K193282, K213717",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2020-04-10",
        notes: "K193282 initial clearance (Apr 2020). K213717 expanded indications (Dec 2021)."
      },
      intendedUseStatement: "Intended for use in MR image reconstruction to enhance signal-to-noise ratio and/or reduce scan time while maintaining diagnostic image quality."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in new MR systems", "Upgrade for compatible systems"],
    },
    
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "30+ peer-reviewed publications across 11+ PubMed-indexed studies specifically mentioning AIR Recon DL. Key studies: Gorodezky et al. Diagnostics 2026 (cardiac MRI, 50 adults), Shaikh et al. Eur Spine J 2025 (spine 1.5T), Zucker et al. Pediatr Radiol 2025 (pediatric abdomen), Yoon et al. Insights Imaging 2024 (liver MRI). PubMed verified 2026-02-26.",
    clinicalImpactNotes: "Workflow improvement through up to 50% reduction in scan time with maintained diagnostic quality across neuro, MSK, body, cardiac, and pediatric applications.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Gorodezky et al. Impact of Deep Learning-Based Reconstruction on Cardiac Tissue Characterization (50 adults). Diagnostics 2026;16(2):348",
        link: "https://doi.org/10.3390/diagnostics16020348"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Shaikh et al. Application of deep learning to routine 2D T2 FLEX spine imaging at 1.5T. Eur Spine J 2025",
        link: "https://doi.org/10.1007/s00586-025-09305-x"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Zucker et al. Deep learning reconstruction for improving image quality of pediatric abdomen MRI. Pediatr Radiol 2025;55(10):2037-2046",
        link: "https://doi.org/10.1007/s00247-025-06313-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yoon et al. Comparison of image quality and lesion conspicuity in gadoxetic acid-enhanced liver MRI. Insights Imaging 2024;15(1):257",
        link: "https://doi.org/10.1186/s13244-024-01825-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. Deep learning MRI halves scan time across routine neuroradiologic examinations. Radiology Advances 2025",
        link: "https://doi.org/10.1093/radadv/umaf029"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K193282 (initial) and K213717 (expanded)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf"
      }
    ],
    clinicalEvidence: "Over 30 peer-reviewed publications demonstrating improved image quality and/or reduced scan times across various clinical applications",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts"
  }
];


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
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for TrueFidelity",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183202.pdf"
      },
      {
        type: "Product Information",
        description: "Official GE Healthcare TrueFidelity product page",
        link: "https://www.gehealthcare.com/products/truefidelity"
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
    lastUpdated: "2025-02-10",
    lastRevised: "2026-01-02",
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
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AIR Recon DL (initial)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for AIR Recon DL (expanded)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213717.pdf"
      },
      {
        type: "Product Information",
        description: "Official GE Healthcare AIR Recon DL product page",
        link: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl"
      }
    ],
    clinicalEvidence: "Over 30 peer-reviewed publications demonstrating improved image quality and/or reduced scan times across various clinical applications",
    lastUpdated: "2025-01-15",
    lastRevised: "2026-01-19",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts"
  }
];

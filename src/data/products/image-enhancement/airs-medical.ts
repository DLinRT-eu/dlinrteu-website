import { ProductDetails } from "@/types/productDetails";

export const AIRS_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "airs-swiftmr",
    trainingData: {
        source: "FDA 510(k) summary K230854",
        disclosureLevel: "minimal",
        description: "Deep learning-based MRI enhancement software for noise reduction and sharpening across various anatomical locations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230854.pdf"
    },
    evaluationData: {
        studyDesign: "Multi-reader retrospective study",
        description: "Multi-reader study and clinical white paper evaluating 184 MR exam pairs across 12 anatomical locations with 18 radiologists from 6 subspecialties. 93.7% of cases were preferred or rated equivalent to standard scans.",
        results: "93.7% of cases were preferred or rated as equivalent to standard scans.",
        source: "AIRS Medical clinical white paper",
        primaryEndpoint: "Diagnostic equivalence / preference rate",
        sourceUrl: "https://airsmed.com/en/clinical-white-paper/"
    },
    name: "SwiftMR",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-powered MRI enhancement solution that improves image quality and resolution of accelerated or low-quality MR scans.",
    certification: "CE Mark",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://airsmed.com/",
    productUrl: "https://airsmed.com/swiftmr/",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Spine pathologies", "Musculoskeletal conditions"],
    releaseDate: "2021-05-15",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Super-resolution technology",
      "Noise reduction while preserving detail",
      "Compatible with various pulse sequences and MRI vendors",
      "Improves suboptimal acquisitions",
      "Compatible with OEM deep learning reconstruction pipelines (FDA cleared April 2026)",
      "Supports scan time reduction of up to 50%"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Vendor-neutral"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow or manual selection",
      processingTime: "<10 seconds per series"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K230854",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2023-10-27",
        additionalClearances: [
          {
            description: "Cleared to operate in conjunction with OEM deep learning reconstruction pipelines",
            date: "2026-04-15",
            sourceUrl: "https://www.prnewswire.com/news-releases/airs-medicals-swiftmr-receives-fda-clearance-to-work-in-conjunction-with-oem-deep-learning-reconstruction-solutions-302742387.html"
          }
        ]
      },
      intendedUseStatement: "SwiftMR is a stand-alone software solution intended to be used for acceptance, enhancement and transfer of all body parts MR images in DICOM format. It can be used for noise reduction and increasing image sharpness for MR images. SwiftMR is not intended for use on mobile devices."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      deploymentScale: "20+ countries, 2 million+ scans performed",
      recognitions: ["Vizient Innovative Technology contract (September 2025)"]
    },
    evidence: [
      {
        type: "Systematic Review (indirect-comparative)",
        description: "Fransen SJ, Roest C, Simonis FFJ, Yakar D, Kwee TC. The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 2025;35:4736–4746. SwiftMR is one of 14 products reviewed; covers SwiftMR-specific noise-reduction publications.",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      },
      {
        type: "Clinical White Paper",
        description: "AIRS Medical clinical white paper: 184 MR exam pairs, 12 anatomical locations, 18 radiologists from 6 subspecialties. 93.7% cases SwiftMR images preferred or equivalent.",
        link: "https://airsmed.com/en/clinical-white-paper/"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for SwiftMR (K230854). Class II, 21 CFR 892.2050, Product Code LLZ. Cleared October 27, 2023.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230854.pdf"
      },
      {
        type: "Regulatory Clearance",
        description: "Additional FDA 510(k) clearance to operate in conjunction with OEM deep learning reconstruction pipelines (April 15, 2026).",
        link: "https://www.prnewswire.com/news-releases/airs-medicals-swiftmr-receives-fda-clearance-to-work-in-conjunction-with-oem-deep-learning-reconstruction-solutions-302742387.html"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA 510(k) K230854 + OEM-DL expansion (Apr 2026). Fransen et al. Eur Radiol 2025 systematic review (indirect-comparative; names SwiftMR among 14 products with peer-reviewed noise-reduction articles). Clinical white paper: 184 exams, 18 radiologists. Two previously cited DOIs (Yoo et al. 10.1007/s00330-023-09679-2; Lee et al. 10.1038/s41598-023-44471-8) were removed on 2026-06-15: both return DOI-Not-Found and could not be verified to specific SwiftMR papers without a confirmed alternative DOI. PubMed re-searched 2026-06-15.",
    clinicalImpactNotes: "Workflow improvement supported by vendor white paper and indirect-comparative systematic review; primary prospective SwiftMR scan-time studies pending DOI verification before re-citation.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "FDA clearances + AIRS clinical white paper (184 exams) + Fransen et al. 2025 systematic review naming SwiftMR. Direct primary-evidence DOIs require re-verification before re-citation.",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database, company website, PubMed"
  }
];

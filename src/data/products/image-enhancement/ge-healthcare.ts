import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-precision-dl",
    trainingData: {
        source: "FDA 510(k) database",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        description: "FDA 510(k) validation (K230082) for a deep learning-based PET image enhancement tool designed to improve image quality through noise reduction.",
        source: "FDA 510(k) summary K230082",
        studyDesign: "Software V&V (FDA 510(k))",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf"
    },
    name: "Precision DL",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "Deep learning-based PET image enhancement that improves image quality and enables potential dose reduction while maintaining diagnostic confidence.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/molecular-imaging/pet-ct",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/ge-healthcare.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["PET", "PET/CT"],
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiac conditions"],
    releaseDate: "2023-05-22",
    keyFeatures: [
      "Deep learning-based PET image enhancement",
      "Improved signal-to-noise ratio",
      "Potential for reduced tracer dose",
      "Compatible with various PET/CT systems"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["PET images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["GE PET/CT systems", "PACS"],
      deployment: ["On-scanner", "Workstation"]
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
        clearanceNumber: "K230082",
        regulationNumber: "21 CFR 892.2050",
        productCode: "MYN",
        type: "510(k)",
        decisionDate: "2023-05-22"
      },
      intendedUseStatement: "Precision DL is intended for use in PET image enhancement to improve image quality through noise reduction."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Integrated in PET/CT systems", "Software upgrade"]
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K230082 for Precision DL - Class II device",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA validation K230082. Limited independent peer-reviewed publications.",
    clinicalImpactNotes: "Workflow improvement through enhanced PET image quality and potential dose reduction.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database"
  },
  {
    id: "ge-air-recon-dl-enhancement",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf",
        source: "FDA 510(k) database and company website"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k)) plus independent retrospective clinical evaluations",
        results: "Zerunian et al. La Radiologia Medica 2022 (liver MRI, GE SIGNA): AIR Recon DL improved quantitative and qualitative image quality vs standard reconstruction. Hu et al. Psychoradiology 2025 (brain MRI): assessed impact of AIR Recon DL on quantitative brain structure measurements, supporting use in neuroimaging.",
        sourceUrl: "https://doi.org/10.1007/s11547-022-01539-9",
        description: "Independent peer-reviewed evidence for AIR Recon DL on GE MR systems includes Zerunian et al. (liver MRI, 2022) and Hu et al. (brain volumetrics, 2025), in addition to FDA software V&V across three 510(k) clearances (K193282, K213717, K252379).",
        source: "Zerunian et al. La Radiologia Medica 2022 (DOI 10.1007/s11547-022-01539-9); Hu et al. Psychoradiology 2025 (DOI 10.1093/psyrad/kkaf036); FDA 510(k) summaries K193282, K213717, K252379",
        primaryEndpoint: "Image quality and quantitative measurement stability"
    },
    name: "AIR Recon DL Enhancement Mode",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "MR image enhancement solution using deep learning to improve signal-to-noise ratio and image sharpness in existing MR images.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncological diseases"],
    releaseDate: "2021-11-10",
    version: "1.5",
    keyFeatures: [
      "Deep learning MR image enhancement",
      "Improved signal-to-noise ratio without blurring",
      "Enhanced spatial resolution",
      "Compatible with all contrast weightings",
      "Can process previously acquired examinations"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Edison Platform", "AW Workstations"],
      deployment: ["On-premise", "Cloud option"],
      triggerForAnalysis: "Manual selection or rule-based",
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
        notes: "Part of GE AIR Recon DL platform clearances (K193282, K213717, K252379)"
      },
      intendedUseStatement: "AIR Recon DL is a deep learning based reconstruction technique that is available for use on GE Healthcare 1.5T, 3.0T, and 7.0T MR systems. AIR Recon DL reduces noise and ringing (truncation artifacts) in MR images, which can be used to reduce scan time and improve image quality. AIR Recon DL is intended for use with all anatomies, and for patients of all ages. Depending on the anatomy of interest being imaged, contrast agents may be used. (Source: FDA 510(k) K213717 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Edison Marketplace"],

},
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Three FDA 510(k) clearances (K193282, K213717, K252379) plus two independent peer-reviewed studies added on 2026-06-16: (1) Zerunian M et al. La Radiologia Medica 2022 — quantitative/qualitative image quality enhancement in liver MRI on GE SIGNA with AIR Recon DL (full text confirms AIR Recon DL, GE Healthcare, SIGNA — verified 2026-06-16); (2) Hu N et al. Psychoradiology 2025;6:kkaf036 — impact of AIR Recon DL on quantitative brain-structure measurements. A previously listed Lee et al. JMRI 2022 citation (doi:10.1002/jmri.28239) had been removed 2026-06-15 because that DOI resolves to an unrelated APT-CEST glioma study (Wamelink et al.) — confirmed and remains removed.",
    clinicalImpactNotes: "Independent evidence demonstrates improved image quality (Zerunian 2022) and preserved quantitative measurement validity (Hu 2025), supporting workflow improvement through enhanced MR image quality and scan acceleration potential.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "Three FDA clearances (K193282, K213717, K252379) and independent peer-reviewed studies on liver MRI (Zerunian Radiol Med 2022) and brain volumetrics (Hu Psychoradiology 2025).",
    lastUpdated: "2026-06-16",
    lastRevised: "2026-06-16",
    source: "FDA 510(k) database and company website; peer-reviewed literature (Zerunian Radiol Med 2022, Hu Psychoradiology 2025 — verified via Crossref 2026-06-16)",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Zerunian M, Pucciarelli F, Caruso D, et al. Artificial intelligence based image quality enhancement in liver MRI: a quantitative and qualitative evaluation. La Radiologia Medica 2022;127:1098-1105. Evaluates AIR Recon DL on GE SIGNA — full text confirms AIR Recon DL and GE Healthcare (verified 2026-06-16).",
        link: "https://doi.org/10.1007/s11547-022-01539-9"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Hu N, Cao P, Feng S, et al. Impact of AIR Recon DL on magnetic resonance imaging-based quantitative brain structure measurements. Psychoradiology 2025;6:kkaf036. Independent evaluation of AIR Recon DL effect on brain volumetric measurements.",
        link: "https://doi.org/10.1093/psyrad/kkaf036"
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K193282 received March 12, 2020 - Class II device under 21 CFR 892.1000",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K213717 received May 10, 2022 - Class II device under 21 CFR 892.1000",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213717.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K252379 received December 23, 2025 - expanded clearance for AIR Recon DL platform",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252379.pdf",
      },
    ],
    limitations: [
      "Tight vendor integration, can only be used with specific GE scanners",
    ],
  }
];

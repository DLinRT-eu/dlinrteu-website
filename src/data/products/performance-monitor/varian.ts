import { ProductDetails } from "@/types/productDetails";

export const VARIAN_MONITOR_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-mobius3d",
    name: "Mobius3D",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://www.varian.com/products/software/quality-assurance/mobius3d",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/varian.ts",
    description: "Comprehensive patient quality assurance platform with structure verification, independent dose calculation, and automated plan checking for radiotherapy treatment verification. Note: This QA platform can verify AI-generated plans and structures—it may or may not use AI itself.",
    features: [
      "Structure verification",
      "Independent dose calculation",
      "Automated QA",
      "Multi-linac support",
      "EPID-based verification"
    ],
    category: "Performance Monitor",
    usesAI: false,
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/varian.jpg",
    website: "https://www.varian.com/products/software/quality-assurance/mobius3d",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Plan", "RT Struct", "RT Dose", "EPID"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Structure verification and validation",
      "Independent 3D dose calculation",
      "Automated plan QA workflows",
      "Multi-linac and multi-vendor support",
      "EPID-based delivery verification"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients",
      input: ["RT Plans", "RT Structure Sets", "RT Dose", "EPID Images", "CT Images"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN", "DICOM-RTDOSE"],
      output: ["Dose verification", "QA reports", "Structure analysis"],
      outputFormat: ["PDF", "Dashboard"]
    },
    technology: {
      integration: ["Multi-vendor TPS", "Linac integration"],
      deployment: ["Server-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient QA"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        productCode: "IYE",
        regulationNumber: "21 CFR 892.5050",
        notes: "Originally cleared by Mobius Medical Systems LP (now Varian/Siemens Healthineers). Specific K-number for Mobius3D not publicly identifiable; multiple clearances exist under Mobius Medical Systems."
      },
      intendedUseStatement: "Mobius3D is intended for patient-specific quality assurance including independent dose verification, structure validation, and treatment delivery verification in radiotherapy."
    },
    market: {
      onMarketSince: "2012",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    keyPapers: [
      {"doi":"10.1002/acm2.12572","title":"Commissioning of the Mobius3D independent dose verification system for TomoTherapy","journal":"J Appl Clin Med Phys","year":"2019","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Vendor-independent single-centre commissioning study of Mobius3D independent dose verification; QA-level endpoint.","vendorIndependent":true},
      {"doi":"10.3389/fonc.2024.1478118","title":"Development of a new VMAT QA framework for Mobius3D using control-point specific EPID images","journal":"Frontiers in Oncology","year":"2024","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Vendor-independent single-centre methodological study extending Mobius3D VMAT QA with EPID images; QA-level endpoint.","vendorIndependent":true}
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: the stored 'Czarnecki et al. Med Phys 2018' citation was removed — DOI 10.1002/mp.12736 resolves to an unrelated silicon-strip-detector paper and no matching Mobius3D publication exists. Replaced with the verified JACMP 2019 commissioning study (doi:10.1002/acm2.12572). Both scored papers are vendor-independent but single-centre, so rigor is E1 rather than the previously stored E2. Seok et al. Front Oncol 2024 verified (doi:10.3389/fonc.2024.1478118). Review in PMC12672138 on measurement-based PSQA.",
    clinicalImpactNotes: "QA/monitoring tool for independent dose verification and treatment delivery verification.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Commissioning of the Mobius3D independent dose verification system for TomoTherapy. J Appl Clin Med Phys 2019.",
        link: "https://doi.org/10.1002/acm2.12572"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Seok et al. Development of a new VMAT QA framework for Mobius3D using control-point specific EPID images. Front Oncol 2024",
        link: "https://doi.org/10.3389/fonc.2024.1478118"
      }
    ],
    releaseDate: "2016-04-29",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "Varian official website; releaseDate proxied from FDA K153014 Mobius3D decision date (2026-06-01)"
  }
];

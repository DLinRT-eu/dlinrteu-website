import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-clearcheck",
    name: "ClearCheck",
    company: "RadFormation",
    companyUrl: "https://radformation.com",
    productUrl: "https://radformation.com/clearcheck/clearcheck",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/performance-monitor/radformation.ts",
    description: "Automated plan check and documentation software with structure validation, ensuring high-quality treatment plans through in-depth contour checks, plan comparison, and TG-275 compliance. Note: This QA tool can validate AI-generated contours and plans—it may or may not use AI itself.",
    features: [
      "Structure validation",
      "TG-275 compliance",
      "Plan comparison",
      "Automated checks",
      "Contour QA"
    ],
    category: "Performance Monitor",
    usesAI: false,
    secondaryCategories: ["Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://radformation.com/clearcheck/clearcheck",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Plan", "RT Struct"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Structure validation and naming checks",
      "TG-275 compliance automation",
      "Plan comparison and documentation",
      "Automated quality checks",
      "Contour QA and verification"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients",
      input: ["RT Plans", "RT Structure Sets", "CT Images"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTPLAN"],
      output: ["Quality reports", "Compliance documentation"],
      outputFormat: ["PDF", "Dashboard"]
    },
    technology: {
      integration: ["Eclipse TPS"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Seconds per plan check"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "II"
      },
      intendedUseStatement: "ClearCheck is intended for automated treatment plan checking, structure validation, and documentation to support quality assurance in radiotherapy workflows."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    keyPapers: [
      {"doi":"10.3389/fonc.2025.1694883","pmid":"41333223","title":"Automated contouring, treatment planning, and quality assurance for total marrow lymphoid irradiation","authors":"Simiele E et al.","journal":"Frontiers in Oncology","year":"2025","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre workflow study using ClearCheck for automated plan checking within a total marrow lymphoid irradiation pipeline; QA-level endpoint.","vendorIndependent":true}
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: the stored Simiele DOI (10.3389/fonc.2025.1500941) did not resolve; the correct record is Front Oncol 2025, doi:10.3389/fonc.2025.1694883 (PMID 41333223) — citation corrected 2026-08-25. Single-centre workflow study keeps rigor at E1. Published TG-275 compliance automation studies.",
    clinicalImpactNotes: "QA/monitoring tool for automated plan checking and structure validation.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Simiele et al. Automated contouring, treatment planning, and quality assurance for total marrow lymphoid irradiation (ClearCheck used for automated plan checking). Front Oncol 2025 (PMID 41333223).",
        link: "https://doi.org/10.3389/fonc.2025.1694883"
      }
    ],
    releaseDate: "2016-12-01",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-08-27",
    source: "Radformation official website, PubMed; releaseDate proxied from FDA K162468 decision date (2026-06-01)"
  }
];

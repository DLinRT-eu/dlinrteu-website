
import { ProductDetails } from "@/types/productDetails";
import { GE_HEALTHCARE_ALL_STRUCTURES } from "./ge-healthcare-structures";

export const GE_HEALTHCARE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-auto-segmentation",
    name: "Auto Segmentation",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/products/advanced-visualization/advanced-visualization/auto-segmentation",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-healthcare.ts",
    description: "Integrated auto-segmentation solution within the GE Healthcare ecosystem, providing efficient and accurate organ delineation for radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/products/advanced-visualization/advanced-visualization/auto-segmentation",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Integrated platform", "Workflow efficiency", "Multiple anatomical sites"],
    guidelines: [
      { name: "RTOG", compliance: "partial" },
      { name: "DAHANCA", compliance: "partial" }
    ],
    supportedStructures: GE_HEALTHCARE_ALL_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Native integration with GE systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K230082",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        notes: "CT Auto Segmentation. MR Contour DL cleared separately as K242925 (April 2025)"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "4.0",
    releaseDate: "2023-03-10",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA validation K230082 with 302 retrospective CT exams (2552 contours) from 9 global sites. Dice coefficients reported for 40+ organs.",
    clinicalImpactNotes: "Large multi-site FDA validation dataset demonstrates consistent geometric accuracy across global clinical sites.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2024-01-20",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K230082, K242925), company official sources",
    clinicalEvidence: "FDA 510(k) validation studies using 2552 contours from 302 unique patients across 9 global sites",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K230082 received April 7, 2023 - Class II device under 21 CFR 892.2050",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K242925 received February 27, 2025 - Class II device under 21 CFR 892.2050",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
      },
    ],
    limitations: [
      "Deployment options are limited to on-premises",
      "Tight vendor locking within the GE ecosystem",
      "Requires manual verification and editing in complex anatomical regions"
    ]
  }
];

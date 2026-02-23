
import { ProductDetails } from "@/types/productDetails";
import { LIMBUS_ALL_STRUCTURES } from "./limbus-structures";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/limbus.ts",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Runs locally", "DICOM compatibility"],
    supportedStructures: LIMBUS_ALL_STRUCTURES,
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "AAPM TG-275",
        version: "2022", 
        reference: "https://doi.org/10.1002/mp.15419",
        url: "https://doi.org/10.1002/mp.15419",
        compliance: "full"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://doi.org/10.1016/j.radonc.2021.09.019",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Standalone"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "TÜV SÜD (Notified Body 0123)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K230575",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2023-04-07"
      },
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships via Radformation (acquired April 30, 2024)"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multi-institution study (Canada & UK) by Starke et al. BJR 2024. Evaluated time savings and geometric accuracy for prostate and lymph node contours. Found time savings of 13-26 minutes.",
    clinicalImpactNotes: "Demonstrates meaningful time savings (13-26 minutes) for prostate and lymph node contouring across institutions.",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Clinical evaluation of Limbus AI for prostate and nodes radiotherapy (multi-institution, 13-26 min time savings)",
        link: "https://doi.org/10.1093/bjr/tqae077"
      }
    ],
    lastUpdated: "2024-03-10",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K230575), company official sources"
  }
];

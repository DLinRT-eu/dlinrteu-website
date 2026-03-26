
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
        clearanceNumber: "K241837",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-11-15",
        notes: "Previous clearance: K230575 (2023). Now distributed by Radformation (acquired April 30, 2024)."
      },
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships via Radformation (acquired April 30, 2024)"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "15 PubMed-indexed studies. Key: Grossi et al. Curr Oncol 2025 (multicentric prostate VGRT), Fan et al. JACMP 2025 (4-system comparison, 111 patients, abdominal OARs), Fontaine et al. Phys Med 2025 (robustness evaluation across software versions), McLaughlin et al. 2025 (308 prostate patients, rectum dosimetric/toxicity), Kim et al. Phys Eng Sci Med 2024 (7-system comparison, 42 cases). Multiple independent multi-center multi-national validations. PubMed verified 2026-02-26.",
    clinicalImpactNotes: "Demonstrates meaningful time savings (13-26 minutes) for prostate and lymph node contouring across institutions. Widely validated across breast, prostate, H&N, and lung.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Grossi et al. Deep Learning-Based Auto-Contouring for Pelvic Volume Delineation in Prostate Cancer RT: Multicentric Analysis. Curr Oncol 2025;32(6):321",
        link: "https://doi.org/10.3390/curroncol32060321"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Fan et al. Evaluation and failure analysis of 4 commercial DL autosegmentation software for abdominal OARs (111 patients). JACMP 2025;26(4):e70010",
        link: "https://doi.org/10.1002/acm2.70010"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Fontaine et al. Robustness evaluation of AI auto-contouring software in daily routine practice (Limbus versions). Phys Med 2025;137:105065",
        link: "https://doi.org/10.1016/j.ejmp.2025.105065"
      },
      {
        type: "Peer-reviewed Publication",
        description: "McLaughlin et al. Rectum contours: geometry, dosimetry and predicted toxicity (308 prostate patients). Biomed Phys Eng Express 2025;11(5)",
        link: "https://doi.org/10.1088/2057-1976/adf8f2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Starke et al. Clinical evaluation for prostate and nodes RT (multi-institution, Canada & UK, 13-26 min time savings). BJR 2024",
        link: "https://doi.org/10.1093/bjr/tqae077"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kim et al. Performance of 7 AI-based auto-contouring systems (42 cases). Phys Eng Sci Med 2024;47(3):1123-1140",
        link: "https://doi.org/10.1007/s13246-024-01434-9"
      }
    ],
    lastUpdated: "2024-03-10",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K241837), company official sources"
  }
];

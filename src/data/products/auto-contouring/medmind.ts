
import { ProductDetails } from "@/types/productDetails";

export const MEDMIND_PRODUCTS: ProductDetails[] = [
  {
    id: "medmind-rt-mind-ai",
    name: "RT-Mind-AI",
    company: "MedMind Technology Co., Ltd.",
    companyUrl: "https://www.medicalmind.cn/en.html",
    productUrl: "https://www.medicalmind.cn/en.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/medmind.ts",
    description: "Deep learning auto-contouring platform supporting 120+ OARs and CTV delineation across multiple cancer types. Deployed in 360+ hospitals with NMPA Class III and FDA 510(k) clearance.",
    category: "Auto-Contouring",
    certification: "FDA/NMPA",
    website: "https://www.medicalmind.cn/en.html",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: [
      "Nasopharyngeal Cancer",
      "Lung Cancer",
      "Breast Cancer",
      "Esophageal Cancer",
      "Cervical Cancer",
      "Rectal Cancer",
      "Liver Cancer",
      "Prostate Cancer",
      "Multiple Cancer Types"
    ],
    keyFeatures: [
      "120+ OAR auto-segmentation",
      "CTV delineation for multiple cancer types",
      "Deep learning-based contouring",
      "Deployed in 360+ hospitals",
      "NMPA Class III certified",
      "FDA 510(k) cleared",
      "Support for multiple anatomical sites"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Standalone", "TPS Integration"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual",
      processingTime: "Minutes per case"
    },
    regulatory: {
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K213155",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2022-03-25"
      },
      intendedUseStatement: "RT-Mind-AI is intended for automatic segmentation of organs at risk and clinical target volumes in CT images for radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],
      availability: "China (primary), international"
    },
    evidence: [
      {
        type: "Multicenter Blinded Randomized Controlled Validation",
        description: "Cervical cancer CTV auto-segmentation validated across 6 centers with 9 oncologists. DSC 0.88, Turing test passed. MedMind co-authors.",
        link: "https://doi.org/10.3389/fonc.2021.702270"
      },
      {
        type: "Multicenter Blinded Randomized Validation",
        description: "Rectal cancer CTV (DSC 0.85) and GTV (DSC 0.87) auto-delineation with multicenter blind evaluation. 96-100% clinically viable scores.",
        link: "https://doi.org/10.1186/s13014-023-2350-9"
      },
      {
        type: "Blinded Randomized Clinical Trial",
        description: "Rectal cancer CTV auto-segmentation using CNN with blind randomized validation. MedMind co-authors.",
        link: "https://doi.org/10.1002/cam4.4441"
      },
      {
        type: "Clinical Evaluation with Fine-tuning",
        description: "Localized fine-tuning and clinical evaluation of DL auto-segmentation for rectal cancer CTV and OARs.",
        link: "https://doi.org/10.1186/s13014-024-02463-0"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple peer-reviewed multicenter blinded randomized controlled studies with vendor co-authorship. Cervical cancer CTV study involved 6 medical centers and 9 oncologists (doi:10.3389/fonc.2021.702270). Rectal cancer studies include multicenter validation with Turing tests. Studies are vendor-affiliated (MedMind employees as co-authors), not fully independent.",
    clinicalImpactNotes: "Demonstrated workflow improvement through automated CTV and OAR contouring across cervical and rectal cancer, with clinically viable contours in 96-100% of cases and Turing test pass rates ~50%, indicating contours comparable to expert manual delineation.",
    evidenceMultiCenter: true,
    evidenceProspective: false,
    evidenceVendorIndependent: false,
    evidenceExternalValidation: true,
    evidenceMultiNational: false,
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K213155), NMPA Class III certification, company website (medicalmind.cn/en.html). Evidence from 4 peer-reviewed publications with multicenter validation (PMID: 34490103, 37803462, 34811957, 38956690)."
  }
];

import { ProductDetails } from "@/types/productDetails";
import { ANNOTATE_ALL_STRUCTURES } from "./therapanacea-structures";

export const Annotate: ProductDetails = {
  id: "therapanacea-annotate",
  trainingData: {
    description: "Models trained on expert-delineated CT datasets following international contouring guidelines across major cancer sites (Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Training data reviewed and validated by clinical experts. Dataset details not fully disclosed publicly.",
    disclosureLevel: "partial",
    source: "Therapanacea product page and FDA 510(k) summary K211539",
    sourceUrl: "https://www.therapanacea.eu/our-products/annotate/",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16"
  },
  evaluationData: {
    studyDesign: "Multi-center retrospective and prospective evaluation; Turing test evaluation vs. MIM ProtégéAI",
    source: "DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25); Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654)",
    sourceUrl: "https://doi.org/10.4103/jmp.jmp_11_25",
    description: "DiTusa et al. (2025) directly compared TheraPanacea Annotate vs. MIM ProtégéAI using a blinded Turing test design. Lê et al. (2024) evaluated Annotate performance on Head & Neck DECT images at Gustave Roussy (74 patients, 13 structures). Both studies confirm clinically acceptable OAR auto-segmentation quality.",
    results: "Turing test: AI-generated contours indistinguishable from expert-drawn for multiple structures (DiTusa 2025). H&N DECT: PEI80-DD achieved highest DSC scores (Lê 2024).",
    primaryEndpoint: "Turing test indistinguishability; DSC / 95HD against clinical reference"
  },
  name: "Annotate",
  company: "Therapanacea",
  companyUrl: "https://www.therapanacea.eu/",
  productUrl: "https://www.therapanacea.eu/our-products/annotate/",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  description: "AI-powered, CE-marked and FDA-cleared auto-contouring software providing zero-click, automatic delineation of more than 200 organs at risk (OARs) and lymph nodes for all major cancer sites (CT models: Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Delineates with the same accuracy as clinical experts in a matter of minutes. Cloud-based, GDPR-compliant, with seamless TPS integration and batch processing. MRI models are part of MR-Box (separate product).",
  category: "Auto-Contouring",
  certification: "CE & FDA",
  logoUrl: "/logos/therapanacea.png",
  website: "https://www.therapanacea.eu/our-products/annotate/",
  anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis", "Lung"],
  modality: ["CT"],
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  keyFeatures: [
    "Zero-click automatic delineation of 200+ OARs and lymph nodes",
    "Coverage of all major cancer sites: Head & Neck, Thorax/Breast, Pelvis (male/female), SBRT Lung",
    "Follows international contouring guidelines (Grégoire 2014, ESTRO Offersen 2015, Gay 2012, UK SABR Consortium 2019)",
    "Batch mode for background processing with direct export to TPS",
    "Plug and play DICOM integration with hospital systems",
    "GDPR-compliant cloud-based web application",
    "Up to 93% reduction in manual contouring tasks for OARs",
    "Full-body delineation in approximately 3 minutes",
    "Exclusive lymph node models for CTVn",
    "Continuously updated models with new structures"
  ],
  features: [
    "Automatic OAR contouring",
    "Lymph node delineation",
    "Batch processing",
    "Guideline-based segmentation",
    "Cloud deployment",
    "DICOM export to TPS"
  ],
  supportedStructures: ANNOTATE_ALL_STRUCTURES,
  structuresProvenance: {
    source: "Therapanacea Annotate product page (therapanacea.eu/our-products/annotate/)",
    sourceUrl: "https://www.therapanacea.eu/our-products/annotate/",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16",
    notes: "CT models only. Seven CT models, each prefixed in the structure list: Head & Neck (CT); Female Thorax/Breast (CT); Male Thorax (CT); Heart Sub-Structures (CT); Lung SBRT (CT); Pelvis Male (CT); Pelvis Female (CT). MRI models belong to MR-Box (id: mr-box-synthetic). CBCT models belong to AdaptBox (id: therapanacea-adaptbox)."
  },
  guidelines: [
    {
      name: "Grégoire et al. – Head & Neck LN delineation",
      version: "2014",
      reference: "https://doi.org/10.1016/j.radonc.2013.10.010",
      url: "https://doi.org/10.1016/j.radonc.2013.10.010",
      compliance: "full"
    },
    {
      name: "ESTRO – Offersen et al. – Breast lymph node delineation",
      version: "2015",
      reference: "https://doi.org/10.1016/j.radonc.2015.07.010",
      url: "https://doi.org/10.1016/j.radonc.2015.07.010",
      compliance: "full"
    },
    {
      name: "UK SABR Consortium – Lung SBRT",
      version: "2019",
      url: "https://www.sabr.org.uk/",
      compliance: "full"
    },
    {
      name: "De Rose et al. – Thoracic OARs",
      version: "2017",
      reference: "https://doi.org/10.1016/j.prro.2017.01.003",
      url: "https://doi.org/10.1016/j.prro.2017.01.003",
      compliance: "full"
    },
    {
      name: "Lee et al. – Heart sub-structure delineation",
      version: "2017",
      reference: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      url: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      compliance: "full"
    },
    {
      name: "Duane et al. – Heart contouring",
      version: "2017",
      reference: "https://doi.org/10.1016/j.clon.2017.10.007",
      url: "https://doi.org/10.1016/j.clon.2017.10.007",
      compliance: "full"
    },
    {
      name: "Gay et al. – Pelvis OAR delineation",
      version: "2012",
      reference: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      url: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      compliance: "full"
    }
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  technology: {
    integration: ["Cloud-based web application", "DICOM export to TPS", "PACS integration"],
    deployment: ["Cloud-based (GDPR-compliant)"],
    triggerForAnalysis: "Zero-click automatic or batch mode",
    processingTime: "Full-body delineation in approximately 3 minutes; time varies with number of structures"
  },
  regulatory: {
    ce: {
      status: "cleared",
      class: "Class IIb",
      type: "MDR",
      regulation: "MDR 2017/745",
      notifiedBody: "GMED (Notified Body 0459)"
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K253091",
      productCode: "MUJ, QKB, LLZ",
      regulationNumber: "21 CFR 892.2050",
      decisionDate: "2025-12-23",
      notes: "FDA K253091 (ART-Plan+ v3.1.0, decision 2025-12-23) explicitly clears the Annotate module for OAR delineation alongside AdaptBox and SmartPlan modules. Prior clearances: K211539 (ART-Plan v2.0, 2021 — initial Annotate clearance).",
      additionalClearances: [
        {
          clearanceNumber: "K211539",
          decisionDate: "2021",
          description: "ART-Plan v2.0 — initial FDA clearance for the Annotate OAR auto-contouring module",
          sourceUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211539"
        }
      ]
    },
    intendedUseStatement: "Annotate is an AI-powered software module within ART-Plan+ providing zero-click automatic delineation of organs at risk (OARs) and lymph nodes for radiation therapy treatment planning. Cleared for CT-based contouring of structures across Head & Neck, Thorax, Breast, Pelvis (male and female), and SBRT Lung anatomical sites. MRI-based models are covered under the MR-Box module (K234068, K242822). (Sources: FDA K253091 Summary 2025-12-23; Therapanacea product page accessed 2026-06-16.)"
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Available in EU, USA, and select international markets. Not all models available in all markets."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.1.0 (FDA cleared) / 3.2.0 (current)",
    productUrl: "https://www.therapanacea.eu/our-products/",
    relationship: "Module"
  },
  usesAI: true,
  evidenceRigor: "E2",
  clinicalImpact: "I2",
  evidenceRigorNotes: "Two directly relevant PubMed-indexed studies explicitly naming Annotate. DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25): direct head-to-head Turing test comparison vs. MIM ProtégéAI. Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654): performance on 74 H&N patients (DECT) at Gustave Roussy — conflict of interest declared (Gustave Roussy received Therapanacea funding). PubMed verified 2026-06-16.",
  clinicalImpactNotes: "DiTusa 2025 Turing test: AI contours indistinguishable from expert-drawn for multiple structures. Lê 2024: clinically acceptable performance on DECT H&N; PEI80-DD achieves highest DSC. Manufacturer claims up to 93% reduction in manual OAR contouring tasks and full-body delineation in ~3 minutes; independent quantification of time savings not yet published across all sites.",
  adoptionReadiness: "R3",
  adoptionReadinessNotes: "CE & FDA cleared with 2 independent peer-reviewed evaluations explicitly naming the product. Cloud deployment reduces integration complexity. Standard commissioning (local QA, guideline alignment) expected.",
  burdenFactors: {
    commissioningRequired: true,
    localValidationRequired: true,
    workflowRedesign: false,
    integrationComplexity: "low",
    humanFactorsTesting: false,
    economicCaseRequired: false,
    subgroupValidationGaps: true,
    postMarketMonitoringPlan: false
  },
  evidenceVendorIndependent: true,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: true,
  evidence: [
    {
      type: "Multi-vendor Comparative Study",
      description: "DiTusa C, Chen J, Husain A, et al. Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy (TheraPanacea Annotate vs. MIM ProtégéAI, Turing test design). J Med Phys 2025;50(2):233–241.",
      link: "https://doi.org/10.4103/jmp.jmp_11_25",
      authors: "DiTusa C, Chen J, Husain A, Schneider C, Spears H, Paragios N, Debevec G, Stathakis S",
      year: 2025,
      title: "Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy",
      journal: "J Med Phys",
      doi: "10.4103/jmp.jmp_11_25"
    },
    {
      type: "Peer-reviewed Publication",
      description: "Lê AT, Sambourg K, Sun R, et al. Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography (Annotate evaluated at Gustave Roussy, 74 H&N patients, 13 structures). Phys Imaging Radiat Oncol 2024;32:100654.",
      link: "https://doi.org/10.1016/j.phro.2024.100654",
      authors: "Lê AT, Sambourg K, Sun R, Deny N, Cifliku V, Rouhi R, Deutsch E, Fournier-Bidoz N, Robert C",
      year: 2024,
      title: "Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography",
      journal: "Phys Imaging Radiat Oncol",
      doi: "10.1016/j.phro.2024.100654"
    }
  ],
  limitations: [
    "CT models only; MRI-based OAR delineation is provided by the separate MR-Box product",
    "Not all models available in all markets",
    "Independent multi-center time-savings studies not yet published for all anatomical sites",
    "Lê 2024 was conducted at an institution with an active Therapanacea research contract (declared conflict of interest)",
    "DECT performance is reconstruction-kernel dependent — PEI80-DD achieves highest DSC; other kernels show lower performance (Lê 2024)"
  ],
  version: "3.2.0",
  releaseDate: "2021",
  lastUpdated: "2026-06-16",
  lastRevised: "2026-06-16",
  source: "Therapanacea product page (therapanacea.eu/our-products/annotate/, accessed 2026-06-16); FDA 510(k) K253091 (decision 2025-12-23); PubMed verified 2026-06-16."
};

export const TumorBox: ProductDetails = {
  id: "therapanacea-tumorbox-pipeline",
  trainingData: {
      disclosureLevel: "minimal",
      source: "FDA 510(k) summary K253091",
      description: "Not publicly disclosed. Product is a deep learning module for tumor segmentation (GTV/CTV/PTV).",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf"
  },
  evaluationData: {
      primaryEndpoint: "Not specified",
      source: "FDA 510(k) summary K253091",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      description: "Software validation and verification for FDA 510(k) clearance as an AI tumor-segmentation module for ART-Plan+.",
      results: "Not publicly disclosed",
      studyDesign: "Software V&V (FDA 510(k))"
  },
  name: "TumorBox",
  partOf: {
    name: "ART-Plan+",
    productUrl: "https://www.therapanacea.eu/our-products/",
    relationship: "Module"
  },
  source: "Company website - listed as 'Coming Soon'",
  usesAI: true,
  company: "Therapanacea",
  logoUrl: "/logos/therapanacea.png",
  version: "Art-Plan+ (v3.1.0)",
  website: "https://www.therapanacea.eu/our-products/",
  category: "Auto-Contouring",
  features: [
    "Automatic tumor segmentation",
    "GTV/CTV/PTV delineation",
    "Multi-modality support",
    "Adaptive contouring"
  ],
  modality: ["CT", "MRI", "PET"],
  structuresUnavailable: true,
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/therapanacea.ts",
  companyUrl: "https://www.therapanacea.eu/",
  productUrl: "https://www.therapanacea.eu/our-products/",
  regulatory: {
    fda: {
      class: "II",
      status: "Approved",
      productCode: "MUJ, QKB, LLZ ",
      decisionDate: "2025-12-23",
      clearanceNumber: "K253091"
    },
    intendedUseStatement: "\"Coming Soon.\" Pre-market AI tumor-segmentation module for ART-Plan+; no Indications for Use published and no regulatory clearance disclosed. (Source: Therapanacea product page, https://www.therapanacea.eu/our-products/, retrieved 23 May 2026.)"
  },
  description: "AI-powered tumor segmentation module for the ART-Plan+ platform. Provides automated delineation of tumor volumes (GTV, CTV, PTV) using advanced deep learning algorithms.",
  keyFeatures: [
    "Automatic GTV delineation using deep learning",
    "CTV and PTV expansion algorithms",
    "Multi-modality image fusion support",
    "Adaptive re-contouring for ART workflows"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2025-12-23",
  certification: "510(k) K253091",
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  developmentStage: "pipeline",
  anatomicalLocation: ["Multi-site"]
};

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [Annotate, TumorBox];

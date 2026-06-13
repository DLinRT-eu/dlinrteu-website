import { ProductDetails } from "@/types/productDetails";

export const RTMindAI: ProductDetails = {
  id: "medmind-rt-mind-ai",
  trainingData: {
      countries: 1,
      disclosureLevel: "minimal",
      description: "Deep learning-based auto-contouring platform supporting 120+ OARs and CTV delineation across multiple anatomical sites. The system is deployed in over 360 hospitals.",
      source: "FDA 510(k) summary K213155",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213155.pdf"
  },
  evaluationData: {
      results: "Cervical CTV DSC 0.88; 96-100% clinically viable scores for rectal CTV/GTV delineation.",
      sites: 6,
      sourceUrl: "https://doi.org/10.3389/fonc.2021.702270",
      source: "Frontiers in Oncology 2021 (DOI: 10.3389/fonc.2021.702270)",
      studyDesign: "Multicenter Blinded Randomized Controlled Validation",
      primaryEndpoint: "DICE similarity coefficient (DSC)",
      description: "Cervical cancer CTV auto-segmentation validated across 6 centers with 9 oncologists, and rectal cancer CTV/GTV validation showing 96-100% clinically viable scores. Contours achieved a DSC of 0.88 for cervical CTV and 0.85-0.87 for rectal CTV/GTV."
  },
  name: "RT-Mind-AI",
  market: {
    availability: "China (primary), international",
    onMarketSince: "2020",
    distributionChannels: ["Direct sales"]
  },
  source: "FDA 510(k) database (K213155), NMPA Class III certification, company website (medicalmind.cn/en.html). Evidence from 4 peer-reviewed publications with multicenter validation (PMID: 34490103, 37803462, 34811957, 38956690). releaseDate proxied from FDA decision date (2026-06-01).",
  company: "MedMind Technology Co., Ltd.",
  logoUrl: "/logos/medmind.png",
  version: "V1",
  website: "https://www.medicalmind.cn/en.html",
  category: "Auto-Contouring",
  evidence: [
    {
      link: "https://doi.org/10.3389/fonc.2021.702270",
      type: "Multicenter Blinded Randomized Controlled Validation",
      description: "Cervical cancer CTV auto-segmentation validated across 6 centers with 9 oncologists. DSC 0.88, Turing test passed. MedMind co-authors."
    },
    {
      link: "https://doi.org/10.1186/s13014-023-2350-9",
      type: "Multicenter Blinded Randomized Validation",
      description: "Rectal cancer CTV (DSC 0.85) and GTV (DSC 0.87) auto-delineation with multicenter blind evaluation. 96-100% clinically viable scores."
    },
    {
      link: "https://doi.org/10.1002/cam4.4441",
      type: "Blinded Randomized Clinical Trial",
      description: "Rectal cancer CTV auto-segmentation using CNN with blind randomized validation. MedMind co-authors."
    },
    {
      link: "https://doi.org/10.1186/s13014-024-02463-0",
      type: "Clinical Evaluation with Fine-tuning",
      description: "Localized fine-tuning and clinical evaluation of DL auto-segmentation for rectal cancer CTV and OARs."
    }
  ],
  modality: ["CT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/medmind.ts",
  companyUrl: "https://www.medicalmind.cn/en.html",
  productUrl: "http://www.medicalmind.cn/product.html",
  regulatory: {
    fda: {
      type: "510(k)",
      class: "Class II",
      status: "510k_cleared",
      productCode: "QKB",
      decisionDate: "2022-03-25",
      clearanceNumber: "K213155",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "RT-Mind-AI is intended for automatic segmentation of organs at risk and clinical target volumes in CT images for radiation therapy planning."
  },
  technology: {
    deployment: ["Local"],
    integration: ["Standalone", "TPS Integration"],
    processingTime: "Minutes per case",
    triggerForAnalysis: "Manual"
  },
  description: "Deep learning auto-contouring platform supporting 120+ OARs and CTV delineation across multiple cancer types. Deployed in 360+ hospitals with NMPA Class III and FDA 510(k) clearance.",
  keyFeatures: [
    "120+ OAR auto-segmentation",
    "CTV delineation for multiple cancer types",
    "Deep learning-based contouring",
    "Deployed in 360+ hospitals",
    "NMPA Class III certified",
    "FDA 510(k) cleared",
    "Support for multiple anatomical sites"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2022-03-25",
  certification: "FDA/NMPA",
  evidenceRigor: "E2",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I2",
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
  adoptionReadiness: "R3",
  anatomicalLocation: [
    "Brain",
    "Head & Neck",
    "Thorax",
    "Breast",
    "Abdomen",
    "Pelvis"
  ],
  evidenceRigorNotes: "Multiple peer-reviewed multicenter blinded randomized controlled studies with vendor co-authorship. Cervical cancer CTV study involved 6 medical centers and 9 oncologists (doi:10.3389/fonc.2021.702270). Rectal cancer studies include multicenter validation with Turing tests. Studies are vendor-affiliated (MedMind employees as co-authors), not fully independent. PubMed verified 2026-02-26.",
  clinicalImpactNotes: "Demonstrated workflow improvement through automated CTV and OAR contouring across cervical and rectal cancer, with clinically viable contours in 96-100% of cases and Turing test pass rates ~50%, indicating contours comparable to expert manual delineation.",
  evidenceMultiCenter: true,
  evidenceProspective: false,
  evidenceMultiNational: false,
  structuresUnavailable: true,
  adoptionReadinessNotes: "Derived from E2 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["CT"],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: true
};

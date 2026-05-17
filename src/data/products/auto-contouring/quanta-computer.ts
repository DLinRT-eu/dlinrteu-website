import { ProductDetails } from "@/types/productDetails";

export const QUANTA_COMPUTER_PRODUCTS: ProductDetails[] = [
  {
    id: "quanta-qoca-image-smart-rt",
    name: "QOCA® image Smart RT Contouring System",
    company: "Quanta Computer Inc.",
    companyUrl: "https://www.quantatw.com/quanta/english/default.aspx",
    productUrl: "https://www.qoca.net/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/quanta-computer.ts",
    description: "AI-powered post-processing software that automatically delineates organs at risk on planning CT scans for radiation therapy. Designed to reduce contouring time and inter-observer variability in radiation oncology workflows.",
    features: [
      "Deep learning-based organ-at-risk segmentation",
      "Planning CT input",
      "DICOM-RTSTRUCT output for downstream TPS"
    ],
    category: "Auto-Contouring",
    certification: "FDA",
    logoUrl: "/logos/quanta-computer.png",
    website: "https://www.qoca.net/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automatic OAR contouring on CT for radiotherapy planning",
      "Deep learning segmentation models",
      "DICOM-RTSTRUCT export"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS via DICOM-RTSTRUCT"],
      deployment: ["On-premises", "Cloud"],
      triggerForAnalysis: "Manual or workflow-driven on planning CT",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not specified",
        notes: "CE status not publicly confirmed at time of inclusion"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K231855",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-02-13",
        notes: "Indicated for automatic OAR contouring on CT scans to support radiation therapy planning."
      },
      intendedUseStatement: "Post-processing software for automatic delineation of organs at risk on CT scans, intended to assist radiation oncology clinicians in treatment planning."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA 510(k) software verification and validation. Limited public peer-reviewed clinical evidence at time of inclusion.",
    clinicalImpactNotes: "Time-saving for OAR contouring; awaiting independent multi-center clinical validation.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "FDA 510(k)",
        description: "K231855 — QOCA® image Smart RT Contouring System, cleared 2024-02-13",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K231855"
      }
    ],
    trainingData: {
      datasetSize: "Not publicly disclosed",
      datasetSources: ["Not publicly disclosed"],
      demographics: "Not publicly disclosed",
      scannerModels: ["Not publicly disclosed"],
      disclosureLevel: "minimal"
    },
    evaluationData: {
      description: "FDA 510(k) software verification and validation; specifics not publicly available.",
      studyDesign: "Software V&V",
      primaryEndpoint: "Not publicly disclosed",
      results: "Not publicly disclosed",
      source: "FDA 510(k) K231855",
      sourceUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K231855"
    },
    lastUpdated: "2026-04-17",
    lastRevised: "2026-04-17",
    source: "FDA 510(k) database K231855, Quanta Computer corporate website"
  }
];

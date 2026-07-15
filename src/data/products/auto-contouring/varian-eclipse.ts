import { ProductDetails } from "@/types/productDetails";

export const VARIAN_ECLIPSE_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-eclipse-ai-contouring",
    name: "AI Contouring for Eclipse",
    company: "Varian (Siemens Healthineers)",
    companyUrl: "https://www.varian.com",
    productUrl: "https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/varian-eclipse.ts",
    description: "Deep learning-based auto-contouring integrated with the Varian Eclipse treatment planning system. Automates routine OAR contouring in the offline planning workflow to reduce manual effort and inter-observer variability. Shares the underlying AI Segmentation deep-learning algorithm family previously deployed on the Ethos adaptive console, now packaged for the Eclipse TPS installed base.",
    features: [
      "Deep learning-based auto-segmentation of organs at risk",
      "Fully integrated into the Eclipse treatment planning workflow",
      "Scriptable via the Eclipse Scripting API (ESAPI)",
      "Targets routine contouring workload reduction"
    ],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/varian.jpg",
    website: "https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Breast"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning autocontouring integrated with Eclipse TPS",
      "Designed to reduce manual effort and contouring variability",
      "Shared algorithm lineage with Varian AI Segmentation (Ethos)",
      "Manual/scripted invocation in the offline planning session"
    ],
    supportedStructures: [
      // Structure set not published in a Siemens/Varian model card for the Eclipse
      // packaging at time of entry. Listed as (unverified) pending vendor confirmation.
      // Adjacent evidence: the Ethos AI Segmentation shares the algorithm family and
      // has a broader published structure set (Finnegan et al. JACMP 2025).
      "Head & Neck: OARs (unverified)",
      "Thorax: OARs (unverified)",
      "Abdomen: OARs (unverified)",
      "Pelvis: OARs (unverified)",
      "Breast: OARs (unverified)"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Eclipse Treatment Planning"],
      deployment: ["Integrated with Eclipse TPS", "On-premises"],
      triggerForAnalysis: "Manual / scripted (ESAPI)",
      processingTime: "Not publicly disclosed"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "unknown",
        notes: "Underlying Varian 'AI Segmentation' algorithm family has FDA 510(k) clearances K203469 (2021), K211881 (2021) and K232923 (2024) shipped in Ethos. Whether the Eclipse-integrated packaging is separately 510(k)-cleared in the US is not publicly confirmed; pending vendor confirmation. (unverified)"
      },
      intendedUseStatement: "Deep-learning auto-contouring for organs at risk integrated with the Eclipse treatment planning system, intended to automate routine contouring during radiotherapy planning. (Full IFU pending publication.)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales"]
    },
    evidenceRigor: "E2",
    evidenceRigorNotes: "Growing 2023-2025 comparative multi-vendor literature (Pera 2023, Wang 2025, Mandal 2022, PMC10741804, PMC11997002) supports upgrade to E2. Algorithm lineage shared with Ethos AI Segmentation.",
    clinicalImpact: "I2",
    clinicalImpactNotes: "Independent comparative evaluations show workflow and consistency benefits — upgraded to I2.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "CE-only, vendor-source evidence, no independent Eclipse-specific validation. Local commissioning and validation required before clinical adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Vendor Announcement",
        description: "Siemens Healthineers press release: CE mark for AI Contouring for Eclipse (ESTRO 2026, 15 May 2026)",
        link: "https://www.siemens-healthineers.com/press/releases/estro2026"
      },
      {
        type: "Vendor Product Page",
        description: "Siemens Healthineers — Deep learning-based autocontouring in radiation therapy",
        link: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/autocontouring"
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
      description: "No Eclipse-specific evaluation published by the vendor at time of entry. Model card pending.",
      studyDesign: "Not publicly disclosed",
      primaryEndpoint: "Not publicly disclosed",
      results: "Not publicly disclosed",
      source: "Siemens Healthineers press release (2026-05-15)",
      sourceUrl: "https://www.siemens-healthineers.com/press/releases/estro2026"
    },
    releaseDate: "2026-05-15",
    lastUpdated: "2026-07-07",
    keyPapers: [
    {"doi":"10.1016/j.adro.2023.101177","title":"Eclipse AI contouring comparative evaluation","authors":"Pera Ò et al.","journal":"Adv Radiat Oncol","year":"2023"},
    {"doi":"10.1002/acm2.14620","title":"Eclipse AI contouring clinical validation","authors":"Wang Y et al.","journal":"J Appl Clin Med Phys","year":"2025"},
    {"doi":"10.1002/pro6.1174","title":"Deep-learning contouring in Eclipse workflow","authors":"Mandal A et al.","journal":"Precis Radiat Oncol","year":"2022"}
  ],
    lastRevised: "2026-07-15",
    source: "Siemens Healthineers press release (2026-05-15) https://www.siemens-healthineers.com/press/releases/estro2026 ; Siemens Healthineers autocontouring product page ; FDA 510(k) K232923 cited for algorithm lineage only (Ethos packaging). Sibling product: Ethos AI Segmentation (varian-ethos-ai-segmentation) shares the underlying deep-learning algorithm family but is a distinct product tied to the Ethos adaptive console. Structure set and FDA status for the Eclipse packaging marked (unverified) pending vendor confirmation via the certification program."
  }
];

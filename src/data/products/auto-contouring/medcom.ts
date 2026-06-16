import { ProductDetails } from "@/types/productDetails";

export const MEDCOM_PRODUCTS: ProductDetails[] = [
  {
    id: "medcom-prosoma-dart",
    trainingData: {
        sourceUrl: "https://www.medcom-online.de/products/radiation-oncology/prosoma/",
        description: "Not publicly disclosed. Training information for the ProSoma Dart AI Segmentation engine is not provided in publicly available technical documentation.",
        source: "Vendor product page (MedCom ProSoma)",
        disclosureLevel: "none"
    },
    evaluationData: {
        results: "Not publicly disclosed for the DART deep-learning module.",
        source: "Vendor product page (MedCom ProSoma DART); Karagiannis et al. 2021 (J Oncol Res Ther, DOI 10.29011/2574-710X.100113) evaluated the predecessor ProSoma atlas-based auto-segmentation (ABAS) module — not the DART deep-learning module — on 20 H&N patients across 39 ROIs.",
        studyDesign: "Not publicly disclosed for DART. ABAS predecessor: single-centre retrospective, 100 atlas / 20 test H&N patients (Karagiannis 2021).",
        primaryEndpoint: "Not specified for DART. ABAS predecessor reported DICE, 95% Hausdorff distance, volume ratio, plus Turing test and time evaluation.",
        description: "No peer-reviewed validation of the ProSoma DART deep-learning segmentation module identified. Karagiannis 2021 evaluates the older atlas-based (ABAS) ProSoma module and does not constitute evidence for the DL DART engine. Doolan et al. 2023 (Front Oncol, DOI 10.3389/fonc.2023.1213068) used ProSoma v4.1 only as the manual-contouring reference platform for benchmarking other vendors. Evidence rigor remains E0 for the DART AI engine pending vendor- or independent peer-reviewed validation.",
        sourceUrl: "https://www.medcom-online.de/products/radiation-oncology/prosoma-dart/"
    },
    name: "ProSoma DART AI Segmentation Engine",
    company: "MedCom",
    companyUrl: "https://www.medcom-online.de/",
    productUrl: "https://www.medcom-online.de/products/radiation-oncology/prosoma-dart/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/medcom.ts",
    description:
      "AI-based fully-automatic anatomical contouring engine bundled with the ProSoma RT toolkit. Provided as configurable per-region modules — Head & Neck (41 VOIs), Prostate (11 VOIs), and Mamma (11 VOIs) — for OAR and target delineation in external beam planning. VOI counts reported on the vendor DART product page; per-structure lists are not publicly disclosed.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/medcom.png",
    website: "https://www.medcom-online.de/products/radiation-oncology/prosoma-dart/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Breast"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Prostate Cancer", "Breast Cancer"],
    keyFeatures: [
      "Modular per-region deployment: Head & Neck (41 VOIs), Prostate (11 VOIs), Mamma (11 VOIs)",
      "Fully automatic deep-learning segmentation",
      "Integration via DICOM transfer or interactive trigger from ProSoma frontend",
      "GPU-accelerated (e.g. NVIDIA RTX 5090: H&N ~4 min, Prostate ~25 s, Mamma ~18 s) or CPU-only execution",
      "User-configurable ROI setups",
    ],
    supportedStructures: [
      { name: "Head & Neck: 41 VOIs (per-structure list not publicly disclosed)", type: "OAR" },
      { name: "Prostate: 11 VOIs (per-structure list not publicly disclosed)", type: "OAR" },
      { name: "Mamma: 11 VOIs (per-structure list not publicly disclosed)", type: "OAR" },
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"],
    },
    technology: {
      integration: ["ProSoma frontend", "DICOM router"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual from ProSoma UI or automatic via DICOM transfer",
      processingTime: "GPU (NVIDIA RTX 5090): ~4 min (H&N), ~25 s (Prostate), ~18 s (Mamma). CPU (Intel i9): 12–13 min (H&N), 4–6 min (Prostate), 5–7 min (Mamma). Source: vendor DART product page.",
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIa",
        type: "MDD",
        regulation: "Directive 93/42/EEC (legacy device under MDR 2017/745 Article 120(3c))",
      },
      fda: {
        status: "not_applicable",
        notes: "No FDA clearance publicly documented for the ProSoma DART AI Segmentation Engine at the time of listing.",
      },
      intendedUseStatement:
        "PROSOMA® DART is the new module in the ProSoma® family of toolkits which enables the fully automatic anatomical contouring using a state of the art Segmentation algorithm. (Source: MedCom ProSoma DART product page, https://www.medcom-online.de/products/radiation-oncology/prosoma-dart/, accessed 2026-06-16. No verbatim regulatory IFU publicly available — CE legacy device under MDR Article 120(3c).)",
    },
    market: {
      distributionChannels: ["Direct sales"],
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "No peer-reviewed validation of the ProSoma DART deep-learning engine identified (search 2026-06-16: vendor page, PubMed, Google Scholar, Frontiers, PMC). Karagiannis 2021 (DOI 10.29011/2574-710X.100113) evaluates the predecessor ProSoma atlas-based (ABAS) module and is not evidence for the DL DART engine. Doolan 2023 (DOI 10.3389/fonc.2023.1213068) used ProSoma only as the manual-reference contouring platform.",
    clinicalImpactNotes: "No published clinical impact data identified at time of listing.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE: high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-06-16",
    lastRevised: "2026-06-16",
    source: "Vendor product page (MedCom ProSoma DART, accessed 2026-06-16; OAR counts and runtimes from vendor runtimes graphic)."
  },
];

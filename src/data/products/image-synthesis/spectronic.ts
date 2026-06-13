import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mriplanner",
    trainingData: {
        source: "FDA 510(k) summary K211841",
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211841.pdf"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        source: "Bird et al. Radiother Oncol 2024 (DOI: 10.1016/j.radonc.2023.110052); Persson et al. MR-OPERA, Int J Radiat Oncol Biol Phys 2017",
        description: "Bird et al. (Radiother Oncol 2024) reported multi-site dosimetric validation of deep learning MRI-only synthetic-CT for pelvis, brain and head & neck cancers. Earlier MR-OPERA (Persson et al. 2017) provided multicenter/multivendor validation of MRI-only prostate planning in 170 patients across 4 centers.",
        studyDesign: "Retrospective multi-center validation",
        sourceUrl: "https://doi.org/10.1016/j.radonc.2023.110052"
    },
    name: "MRI Planner",
    company: "Spectronic Medical (a GE HealthCare company)",
    companyUrl: "https://medical.spectronic.se/",
    productUrl: "https://medical.spectronic.se/page-2/page6/index.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/spectronic.ts",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning, with integrated auto-segmentation capabilities.",
    features: [
      "MR-only workflow",
      "Deep learning based",
      "Fast processing",
      "Synthetic CT generation",
      "Healthy-structure contour generation for prostate workflows"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/spectronic-medical.jpg",
    website: "https://medical.spectronic.se/page-2/page6/index.html",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: [
      "Deep learning-based Transfer Function Estimation (TFE)",
      "Clinical workflow integration",
      "MR-only radiotherapy planning",
      "Synthetic CT generation",
      "Healthy-structure contour generation for prostate workflows",
      "Brain, head & neck and pelvis synthetic-CT generation supported in the GE iRT MR Direct / MR Direct workflow (ESTRO 2026)"
    ],
    supportedStructures: [
      "Pelvis/Prostate: Bladder",
      "Pelvis/Prostate: Colon",
      "Pelvis/Prostate: Femoral Heads"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard DICOM MRI image stack"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT", "Healthy-structure contours for prostate workflows"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: [
        "TPS integration",
        "PACS integration",
        "GE iRT MR Direct / MR Direct workflow (with iRT and/or MR Contour DL depending on configuration)"
      ],
      deployment: ["On-premises", "Cloud-based service in published validation workflows"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Approximately 4-6 minutes per patient in MRI Planner v2.3 white paper; site/configuration dependent"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Not publicly verified",
        type: "Medical Device",
        regulation: "CE marked; public MDR class/source not located"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K211841",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ; QKB",
        decisionDate: "2022-08-25"
      },
      intendedUseStatement: "MRI Planner is indicated for radiotherapy planning of adult patients for primary and metastatic cancers in the brain and head-neck regions, as well as soft tissue cancers in the pelvic region. MRI Planner generates synthetic CT images for radiation attenuation estimation purposes for the pelvis, brain and head-neck regions only. MRI Planner generates automatically derived contours of the bladder, colon and femoral heads for prostate cancer patients only, and is not intended to automatically contour tumors or tumor clinical target volumes. (Source: FDA 510(k) K211841 Summary, accessed 2026-06-10)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: [
        "Direct sales",
        "GE HealthCare (as part of iRT MR Direct workflow)"
      ]
    },
    version: "Not publicly verified",
    releaseDate: "Not publicly verified",
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database and FDA K211841 Summary; Spectronic Medical company website; GE HealthCare ESTRO 2026 press release. GE HealthCare describes iRT MR Direct as a dedicated MR-only workflow that can include iRT, MR Contour DL and/or MRI Planner by Spectronic Medical. MRI Planner is described as a deep learning application for generating synthetic CT images from standard MR imaging sequences of the brain, head & neck and pelvis for MRI-only radiotherapy planning. MR Contour DL is the GE HealthCare-developed OAR contouring component and should not be conflated with MRI Planner's FDA-cleared prostate healthy-structure contouring.",
    evidence: [
      {
        type: "Multicenter Study",
        description: "Persson et al. MR-OPERA: A Multicenter/Multivendor Validation of MRI-Only Prostate Treatment Planning Using Synthetic CT Images. Int J Radiat Oncol Biol Phys 2017;99(3):692-700.",
        link: "https://doi.org/10.1016/j.ijrobp.2017.06.006"
      },
      {
        type: "Clinical Validation",
        description: "Lerner et al. Clinical validation of a commercially available deep learning software for synthetic CT generation for brain. Radiat Oncol 2021;16:66.",
        link: "https://doi.org/10.1186/s13014-021-01794-6"
      },
      {
        type: "Clinical Validation",
        description: "Bird et al. Deep learning MRI-only synthetic-CT generation for pelvis, brain and head and neck cancers. Radiother Oncol 2024;191:110052.",
        link: "https://doi.org/10.1016/j.radonc.2023.110052"
      },
      {
        type: "Clinical Implementation",
        description: "Earwong et al. Clinical implementation of deep learning-based synthetic CT for MRI-only volumetric modulated arc therapy in head and neck and pelvic cancer patients. Radiat Oncol 2025;20:166.",
        link: "https://doi.org/10.1186/s13014-025-02744-2"
      }
    ],
    evidenceRigor: "E2",
    evidenceRigorNotes: "Evidence includes FDA 510(k) clearance, CE-marked status reported by the company, MR-OPERA multicenter/multivendor prostate validation (170 prostate patients at 4 centers), independent brain validation (Lerner et al. 2021), multi-site dosimetric validation across pelvis, brain and head & neck (Bird et al. 2024), and clinical implementation evidence in H&N and pelvic VMAT workflows (Earwong et al. 2025). Evidence is strong for technical and dosimetric validation, but not outcome-level clinical benefit.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated: dosimetric accuracy and workflow feasibility have been reported across prostate/pelvis, brain and head & neck synthetic-CT workflows. Published evidence supports MRI-only planning implementation and QA, but does not yet demonstrate improved patient outcomes.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE-marked status + FDA 510(k): moderate implementation effort — local MRI sequence validation, TPS/DICOM integration testing, OAR-contour scope checks and site-specific QA required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceExternalValidation: true
  }
];

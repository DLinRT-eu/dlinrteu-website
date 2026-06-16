import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_MRBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "mr-box-synthetic",
    trainingData: {
        scannerModels: ["0.35T MRI"],
        institutions: 8,
        datasetSources: ["8 global institutions"],
        description: "Pelvic MR images (TrueFisp 0.35T) and brain mappings from multiple global institutions were used for validation and training as part of the software development and platform clearances.",
        disclosureLevel: "partial",
        source: "FDA 510(k) summary K234068",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K234068.pdf"
    },
    evaluationData: {
        studyDesign: "International retrospective multi-centric study",
        source: "DOI 10.3389/fonc.2023.1245054",
        sourceUrl: "https://doi.org/10.3389/fonc.2023.1245054",
        results: "Mean global gamma passing rates exceeded 96% at 1mm/1mm criteria across AAA, AcurosXB, and Monte Carlo algorithms.",
        primaryEndpoint: "Gamma passing rates and dose deviations",
        description: "Retrospective multi-centric study across 8 global institutions for pelvic and brain mappings. Demonstrated excellent dosimetric equivalence with mean global gamma passing rates >96% (1mm/1mm) and target volume dose deviations within 1%."
    },
    name: "MR-Box",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu",
    productUrl: "https://www.therapanacea.eu/our-products/mr-box/",
    description: "AI-powered software module within the ART-Plan+ platform for generating MR-based pseudo-CT (synthetic CT) images with co-registered organs-at-risk (OAR) delineations from standard MR images, supporting MR-only radiotherapy workflows and reducing physical CT demand. Naming caveat: 'MR-Box' is the Therapanacea commercial brand name; FDA 510(k) submissions (K234068, K242822, K253091) describe the same functionality as the Annotate module / pseudo-CT generation feature of ART-Plan and do not use the 'MR-Box' label.",
    features: [
      "AI-based MR-to-pseudo-CT (synthetic CT) generation in one click",
      "Organs-at-risk (OAR) automatic delineation directly on MRI images",
      "Tissue electron density generation for direct dose calculation from pseudo-CTs",
      "Multi-modal registration avoidance to eliminate spatial alignment errors",
      "Seamless DICOM export of synthetic CTs and RT-structures to major TPS and PACS systems"
    ],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea-mrbox.ts",
    website: "https://www.therapanacea.eu/our-products/mr-box/",
    anatomicalLocation: ["Pelvis", "Brain", "Abdomen"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Abdominal Tumors"],
    keyFeatures: [
      "AI-based MR-to-pseudo-CT generation",
      "One-click pseudo-CT workflow minimizing planning delays",
      "Organs-at-risk delineation on standard MR sequences",
      "Reduces reliance on multi-modal MR-CT registration and associated errors",
      "Provides reliable electron density values supporting MR-only radiotherapy planning"
    ],
    technicalSpecifications: {
      population: "Adult patients undergoing radiotherapy",
      input: ["Standard MR Sequences (T1, T2, TrueFisp)"],
      inputFormat: ["DICOM"],
      output: ["Pseudo-CT (synthetic CT) DICOM", "RT-Structure Set (RTSS)"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "ART-Plan+ workflow and Annotate module integration",
        "DICOM export to major Treatment Planning Systems (TPS)",
        "Works alongside SmartFuse and SmartPlan modules"
      ],
      deployment: [
        "Web-based clinical platform",
        "On-premises clinical server or cloud deployment options based on institutional infrastructure"
      ],
      triggerForAnalysis: "User-initiated one-click workflow; batch/workflow integration within ART-Plan+",
      processingTime: "Under 2-3 minutes for pseudo-CT generation and OAR delineation under optimal conditions"
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
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-12-23",
        notes: "K253091 (ART-Plan+ v3.1.0, Dec 2025) is the latest platform clearance. K234068 (v2.2.0, April 2024) directly details MR-Box synthetic CT generation for male pelvis and brain. K242822 (v3.0.0, Feb 2025) is a platform-wide update."
      },
      tga: {
        status: "TGA Cleared",
        notes: "Therapanacea publicly states ART-Plan is TGA cleared as part of the overall platform registration; independent ARTG records were not verified in this review."
      },
      intendedUseStatement: "The Annotate module allows generation of pseudo-CTs from MRI images. Users are able to visualize, evaluate and modify the HU values of the associated structures on the pseudo-CT. ART-Plan offers deep-learning based synthetic CT-generation from MR images for the following localizations: pelvis male, Brain. (Source: FDA 510(k) K234068 Summary)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales"]
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.0",
      productUrl: "https://www.therapanacea.eu/our-products/",
      relationship: "Module"
    },
    supportedStructures: [
      // === MR MODEL 1 — BRAIN T1 (Guideline: EPTN consensus 2018) ===
      // Vendor anchor: https://www.therapanacea.eu/our-products/mr-box/#1658821178-1-67
      { name: "Brain T1: Anterior Cerebellum", type: "OAR" },
      { name: "Brain T1: Chiasma", type: "OAR" },
      { name: "Brain T1: Cochlea (L/R)", type: "OAR" },
      { name: "Brain T1: Cornea (L/R)", type: "OAR" },
      { name: "Brain T1: Encephalon", type: "OAR" },
      { name: "Brain T1: Eye Lens (L/R)", type: "OAR" },
      { name: "Brain T1: Hippocampus (L/R)", type: "OAR" },
      { name: "Brain T1: Hypophyse", type: "OAR" },
      { name: "Brain T1: Hypothalamus (L/R)", type: "OAR" },
      { name: "Brain T1: Lacrimal Gland (L/R)", type: "OAR" },
      { name: "Brain T1: Medulla Oblongata", type: "OAR" },
      { name: "Brain T1: Midbrain", type: "OAR" },
      { name: "Brain T1: Optical Nerve (L/R)", type: "OAR" },
      { name: "Brain T1: Pons", type: "OAR" },
      { name: "Brain T1: Posterior Cerebellum", type: "OAR" },
      { name: "Brain T1: Retina (L/R)", type: "OAR" },
      { name: "Brain T1: Spinal Cord", type: "OAR" },
      { name: "Brain T1: VSCC (L/R)", type: "OAR" },
      // === MR MODEL 2 — PELVIS T2 ELEKTA (MALE) (Guideline: ESTRO ACROP / Salembier 2018) ===
      // Vendor anchor: https://www.therapanacea.eu/our-products/mr-box/#1658821178-2-40
      { name: "Pelvis T2 Elekta (Male): Anal Canal", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Bladder", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Femoral Head (L/R)", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Pelvis (L/R)", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Penile Bulb", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Prostate", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Rectum", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Sacrum", type: "OAR" },
      { name: "Pelvis T2 Elekta (Male): Seminal Vesicle", type: "OAR" },
      // === MR MODEL 3 — PELVIS MALE & ABDO TRUEFISP (Guidelines: RTOG Jabbour 2014, RTOG Kong 2011) ===
      // Vendor anchor: https://www.therapanacea.eu/our-products/mr-box/#1658827979245-2-6
      { name: "Pelvis Male & Abdo TrueFISP: Anal Canal", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Femoral Head (L/R)", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Penile Bulb", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Prostate", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Rectum", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Seminal Vesicle", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Sigmoid Colon", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Abdominal Aorta", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Duodenum", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Kidney (L/R)", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Large Bowel", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Liver", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Pancreas", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Stomach", type: "OAR" },
      { name: "Pelvis Male & Abdo TrueFISP: Vena Cava Inferior", type: "OAR" }
    ],
    structuresProvenance: {
      source: "Therapanacea MR-Box product page (therapanacea.eu/our-products/mr-box/)",
      sourceUrl: "https://www.therapanacea.eu/our-products/mr-box/",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-06-16",
      notes: "Three MR auto-contouring models: Brain T1 (anchor /#1658821178-1-67, EPTN 2018), Pelvis T2 Elekta Male (anchor /#1658821178-2-40, ESTRO ACROP Salembier 2018), Pelvis Male & Abdo TrueFISP (anchor /#1658827979245-2-6, RTOG Jabbour 2014 / Kong 2011)."
    },
    guidelines: [
      {
        name: "EPTN consensus-based guideline for OAR tolerance doses in the brain",
        version: "2018",
        reference: "https://doi.org/10.1016/j.radonc.2017.11.014",
        url: "https://doi.org/10.1016/j.radonc.2017.11.014",
        compliance: "full"
      },
      {
        name: "ESTRO ACROP – Salembier et al. – Male pelvis CTV/OAR delineation",
        version: "2018",
        reference: "https://doi.org/10.1016/j.radonc.2018.08.014",
        url: "https://doi.org/10.1016/j.radonc.2018.08.014",
        compliance: "full"
      },
      {
        name: "RTOG – Jabbour et al. – Anorectal contouring atlas",
        version: "2014",
        reference: "https://doi.org/10.1016/j.prro.2013.11.009",
        url: "https://doi.org/10.1016/j.prro.2013.11.009",
        compliance: "full"
      },
      {
        name: "RTOG – Kong et al. – Thoracic / abdominal OAR atlas",
        version: "2011",
        reference: "https://doi.org/10.1016/j.ijrobp.2010.07.1977",
        url: "https://doi.org/10.1016/j.ijrobp.2010.07.1977",
        compliance: "full"
      }
    ],
    limitations: [
      "MR auto-contouring is only validated for the supported sequences/anatomies: Brain T1, Pelvis T2 (Elekta), Pelvis Male & Abdominal TrueFISP",
      "Contours and synthetic-CT generated by ART-Plan+ must be verified and validated by an authorized user before clinical use",
      "Bad MR image quality (artefacts, motion, uncommon high slice thickness, lossy compression) can lead to incorrect synthetic CT or contours — review the synCT before any clinical action",
      "Adult patients only; not intended for paediatric use",
      "Automatic contouring may produce inappropriate contours when DICOM tags Patient Position (0018,5100) or Patient Sex (0010,0040) are missing/incorrect, when the patient is not supine, or for post-surgical anatomy (e.g. prostatectomy)",
      "Symmetric structures may show right/left inversions and require manual verification",
      "Module availability varies by market — not all MR models are commercially available in every country"
    ],
    version: "3.2.0",
    releaseDate: "2021",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Therapanacea MR-Box page; Therapanacea ART-Plan+ technical information pages; FDA 510(k) database K234068, K242822, K253091; indirect-comparative MESCAL 2026 (Cusumano, Maspero et al. Radiother Oncol, DOI 10.1016/j.radonc.2026.111530)",
    evidence: [
      {
        type: "Multicenter Study",
        description: "International retrospective multi-centric study across 8 institutions of pelvic (TrueFisp 0.35T) and brain MR pseudo-CT generation with ART-Plan/MR-Box. Frontiers in Oncology 2023.",
        link: "https://doi.org/10.3389/fonc.2023.1245054"
      },
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative. Radiother Oncol 2026. Community benchmark relevant to MR-Box commissioning; not a direct MR-Box evaluation.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      }
    ],
    evidenceRigor: "E1",
    evidenceRigorNotes: "Validated via a peer-reviewed, international retrospective multi-centric study across 8 global institutions utilizing pelvic MR images (TrueFisp 0.35T) and brain mappings. The study includes vendor-affiliated co-authors (including Therapanacea CEO Nikos Paragios), classifying the evidence rigor as E1 (vendor-assisted/collaborative peer-reviewed study). (Source: DOI 10.3389/fonc.2023.1245054). MESCAL 2026 (Cusumano, Maspero et al.) kept separately as indirect-comparative community benchmark.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Demonstrated excellent dosimetric equivalence for MR-only workflows. Mean global gamma passing rates exceeded 96% at 1mm/1mm criteria across AAA, AcurosXB, and Monte Carlo algorithms, with target volume dose deviations within 1%. No randomized prospective outcome data was identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "CE-marked Class IIb and FDA 510(k) cleared commercial product. High implementation safeguards are necessary: deployment requires extensive local commissioning, MR sequence compatibility checks, MR scanner QA program, synthetic CT dose validation, and manual expert verification of all synthetic scans and structures before clinical use."
  }
];

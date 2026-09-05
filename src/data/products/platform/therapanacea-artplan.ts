import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-art-plan",
    name: "ART-Plan+",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/therapanacea-artplan.ts",
    description: "Modular AI platform for radiotherapy from TheraPanacea, presented by the vendor as 'the AI companion to your TPS'. ART-Plan+ hosts the individual AI modules catalogued separately on DLinRT — Annotate and TumorBox (segmentation), MR-Box (MR synthetic CT), AdaptBox (CBCT-based synthetic CT and offline adaptation), BrachyBox (MR brachytherapy OARs), SmartFuse (registration) and SmartPlan (automatic planning). The platform is cloud-based and GDPR-compliant, class IIb (EU) / class II (US), current release v3.2.0 (FDA clearance K253091 covers v3.1.0).",
    features: [
      "Modular AI platform hosting segmentation, synthetic-CT, registration, adaptation and planning modules",
      "Multi-modal visualisation and rigid/deformable registration (CT, MR, PET-CT, 4D-CT, synthetic CT from CBCT)",
      "Automatic contouring of organs at risk, lymph nodes and tumours",
      "Synthetic-CT generation from MR and from CBCT for supported anatomies",
      "Dose computation on CT for photon external beam irradiation",
      "Assisted CBCT-based offline adaptation decision-making",
      "Automatic treatment plan generation for supported prescriptions, exported to the user's TPS",
      "Batch mode operation and DICOM integration with any TPS"
    ],
    category: "Platform",
    secondaryCategories: ["Auto-Contouring", "Image Synthesis", "Registration", "Treatment Planning"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis", "Male Pelvis", "Female Pelvis"],
    modality: ["CT", "MRI", "CBCT", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    usesAI: true,
    structuresUnavailable: true,
    keyFeatures: [
      "Single platform covering segmentation, fusion, synthetic CT, adaptation and automatic planning",
      "Cloud-based, GDPR-compliant deployment with DICOM export to any TPS",
      "270+ OARs and lymph nodes published across CT, MR and synthetic-CT models (structure lists held on the individual module records)",
      "Class IIb (EU) / class II (US) medical device; FDA 510(k) K253091 for v3.1.0",
      "Modules licensed separately; not all models are available in all markets"
    ],
    integratedModules: [
      {
        name: "Annotate",
        description: "CT auto-contouring of organs at risk and lymph nodes across head & neck, thorax/breast/abdomen and male/female pelvis, following international contouring guidelines.",
        category: "Auto-Contouring",
        productUrl: "https://dlinrt.eu/products/therapanacea-annotate"
      },
      {
        name: "TumorBox",
        description: "MR tumour segmentation for glioblastoma and multiple brain metastases, cleared as part of 'Annotate including TumorBox'.",
        category: "Auto-Contouring",
        productUrl: "https://dlinrt.eu/products/therapanacea-tumorbox"
      },
      {
        name: "MR-Box",
        description: "MR-based synthetic CT generation with co-registered OAR delineation for MR-only workflows (brain T1, pelvis male T2, pelvis/abdomen TrueFISP).",
        category: "Image Synthesis",
        productUrl: "https://dlinrt.eu/products/mr-box-synthetic"
      },
      {
        name: "AdaptBox",
        description: "Synthetic/augmented CT from daily CBCT with OAR delineation, dose tracking and assisted offline adaptation decision support.",
        category: "Image Synthesis",
        productUrl: "https://dlinrt.eu/products/therapanacea-adaptbox"
      },
      {
        name: "BrachyBox",
        description: "MR-based OAR delineation for gynaecological brachytherapy (bladder, rectum, sigmoid, small bowel) per EMBRACE / Pötter et al. 2018.",
        category: "Auto-Contouring",
        productUrl: "https://dlinrt.eu/products/therapanacea-brachybox"
      },
      {
        name: "SmartFuse",
        description: "Rigid and deformable multi-modality image fusion with contour deformation for replanning.",
        category: "Registration",
        productUrl: "https://dlinrt.eu/products/therapanacea-smartfuse"
      },
      {
        name: "SmartPlan",
        description: "Automatic radiotherapy plan generation for supported prostate prescriptions, imported into the user's own TPS for dose calculation, review and approval.",
        category: "Treatment Planning",
        productUrl: "https://dlinrt.eu/products/therapanacea-smartplan"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients (18+ years) receiving radiotherapy",
      input: ["CT", "MRI", "CBCT", "PET-CT", "4D-CT", "RT Structure Set"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Structure sets", "Synthetic CT images", "Registrations", "Dose distributions", "Treatment plans"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT", "DICOM-RTDOSE", "DICOM-RTPLAN"]
    },
    technology: {
      integration: ["Cloud-based web application", "DICOM export to TPS", "Vendor-neutral TPS/Linac compatibility"],
      deployment: ["Cloud-based (GDPR-compliant)"],
      triggerForAnalysis: "Manual or batch mode",
      processingTime: "Minutes per case (manufacturer claim; varies by module)"
    },
    trainingData: {
      disclosureLevel: "minimal",
      description: "The vendor states that models are created with data from multiple leading academic centres treating diverse populations, but no platform-level dataset composition is publicly disclosed. Module-level disclosure is tracked on the individual module records.",
      source: "Therapanacea products page and ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ART-BRO-AN-07EU, March 2026)",
      sourceUrl: "https://therapanacea.com/products",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05"
    },
    evaluationData: {
      studyDesign: "Software verification & validation for FDA 510(k) substantial equivalence (platform level)",
      primaryEndpoint: "Substantial equivalence to predicate ART-Plan+ v3.0.0 (K242822)",
      results: "Platform-level performance metrics are not publicly disclosed. Peer-reviewed evidence exists for individual modules (e.g. MR-Box pseudo-CT, AdaptBox CBCT→sCT, Annotate segmentation, SmartPlan planning) and is scored on those records rather than aggregated here.",
      description: "Publicly available platform-level evidence is limited to the FDA 510(k) summary and the vendor brochure and products page.",
      source: "FDA 510(k) summary K253091 (decision 2025-12-23)",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes: "The CE (EU) edition of the ART-Plan™ v3.2.0 structures brochure declares ART-Plan+ a class IIb device in the EU."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K253091",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-12-23",
        notes: "K253091 clears ART-Plan+ v3.1.0 including the Annotate (with TumorBox), AdaptBox and SmartPlan modules. Predicate: K242822 (v3.0.0); reference: K234068 (ART-Plan v2.2.0). SmartFuse is not named in this clearance."
      },
      intendedUseStatement: "ART-Plan+ is a class IIb (EU) / class II (US) medical device intended to be used by trained clinicians familiar with radiation therapy, such as medical physicists, medical dosimetrists and radiation oncologists. The software consists of different applications used at different phases of radiation treatment planning: multi-modal visualisation and rigid/deformable registration of anatomical and functional images (CT, MR, PET-CT, 4D-CT and synthetic CT generated from CBCT); display of fused and non-fused images; automatic generation of contours for organs at risk, lymph nodes and tumours on CT and MR images; manual and semi-automatic creation and modification of contours; generation of synthetic CT from MR images and from CBCT images for supported anatomies; dose computation on CT images for photon external beam irradiation; assisted CBCT-based off-line adaptation decision-making for supported anatomies; and automatic generation of a radiotherapy treatment plan for supported prescriptions and anatomies that users import into their own TPS for dose calculation, review and approval. ART-Plan+ is not intended to be used for patients less than 18 years of age. (Source: ART-Plan™ v3.2.0 brochure intended-use summary, ART-BRO-AN-07EU, March 2026; FDA 510(k) K253091.)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Cloud SaaS"],
      availability: "Modules are licensed separately. Not all models are available in all markets."
    },
    version: "3.2.0",
    releaseDate: "2026-03-01",
    evidenceRigor: "E0",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Platform-level evidence is regulatory only: FDA K253091 (v3.1.0, decision 2025-12-23) and CE class IIb under MDR 2017/745. Peer-reviewed publications naming individual modules are scored on the module records (Annotate, MR-Box, AdaptBox, SmartPlan) and are deliberately not aggregated at platform level. Verified against the vendor products page and brochure v3.2.0 on 2026-09-05.",
    clinicalImpactNotes: "Manufacturer-claimed workflow benefit across the imaging-to-planning chain (zero-click segmentation, >93% reduction of manual tasks claimed). No platform-level independent clinical or outcome study identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE/FDA: platform adoption requires per-module commissioning and local validation, TPS/R&V interface testing and workflow redesign before routine clinical use.",
    burdenFactors: {
      commissioningRequired: true,
      localValidationRequired: true,
      workflowRedesign: true,
      integrationComplexity: "medium",
      humanFactorsTesting: true,
      economicCaseRequired: false,
      subgroupValidationGaps: true,
      postMarketMonitoringPlan: false
    },
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    categoryEvidence: {
      "Platform": {
        usesAI: true,
        notes: "Aggregate platform record. Evidence at this level is regulatory (FDA K253091, CE class IIb) only; module evidence is tracked on the module records."
      }
    },
    limitations: [
      "Platform record — module-specific structure lists, evidence scores and regulatory scope live on the individual module entries",
      "Automatic outputs are proposals and must be verified and approved by an authorised user before clinical use",
      "Module availability and cleared indications differ by market (e.g. SmartPlan is FDA-cleared for supported prostate prescriptions only)",
      "Adult patients only (18+ years)",
      "No platform-level independent peer-reviewed evaluation published as of 2026-09-05"
    ],
    lastUpdated: "2026-09-05",
    lastRevised: "2026-09-05",
    source: "Therapanacea products page (therapanacea.com/products, retrieved 2026-09-05); ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ART-BRO-AN-07EU, March 2026), intended-use summary; FDA 510(k) K253091 summary (decision 2025-12-23)."
  }
];

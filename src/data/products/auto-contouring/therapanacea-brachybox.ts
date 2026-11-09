import { ProductDetails } from "@/types/productDetails";
import { BRACHYBOX_PELVIS_MR } from "./therapanacea-structures";

export const THERAPANACEA_BRACHYBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-brachybox",
    name: "BrachyBox",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/therapanacea-brachybox.ts",
    description: "Brachytherapy segmentation module of the ART-Plan+ platform (see product 'ART-Plan+'), providing AI-powered MR-based organ-at-risk delineation for gynaecological brachytherapy. Published by Therapanacea as the MRI Brachy Pelvis model of the ART-Plan+ segmentation library (4 OARs: bladder, rectum, sigmoid, small bowel), contoured according to the EMBRACE / Pötter et al. 2018 (ESTRO) recommendations.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://therapanacea.com/products",
    anatomicalLocation: ["Pelvis", "Female Pelvis"],
    modality: ["MRI"],
    subspeciality: "Brachytherapy",
    diseaseTargeted: ["Cervical Cancer"],
    usesAI: true,
    keyFeatures: [
      "MR-based automatic OAR delineation for brachytherapy planning",
      "Bladder, rectum, sigmoid and small bowel contours",
      "Contouring aligned with the EMBRACE studies and Pötter et al. 2018 (ESTRO) recommendations",
      "Runs inside the ART-Plan+ web platform with DICOM export to the planning system",
      "Batch mode operation"
    ],
    features: [
      "Brachytherapy OAR contouring",
      "MR-based segmentation",
      "Guideline-based delineation",
      "DICOM-RTSTRUCT export"
    ],
    supportedStructures: BRACHYBOX_PELVIS_MR,
    structuresProvenance: {
      source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ref ART-BRO-AN-07EU, March 2026), 'MRI BrachyBox' page",
      sourceUrl: "https://therapanacea.com/products",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05",
      notes: "Single MR model with 4 OARs. No target volumes (HR-CTV/IR-CTV) and no applicator reconstruction are published by the vendor for this model — none are listed here. Re-verified 2026-09-05 against the vendor products page structures library (MRI Brachy Pelvis, 4 OAR): unchanged. Re-verified 2026-10-03 against brochure ART-BRO-AN-07EU (v3.2.0, March 2026): unchanged."
    },
    guidelines: [
      {
        name: "EMBRACE studies – Gynaecological brachytherapy OAR contouring",
        url: "https://www.embracestudy.dk/",
        compliance: "full"
      },
      {
        name: "Pötter et al. (ESTRO/GEC-ESTRO) – Image-guided adaptive brachytherapy recommendations",
        version: "2018",
        url: "https://doi.org/10.1016/j.ctro.2018.01.001",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients (18+ years) receiving gynaecological brachytherapy",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Cloud-based web application", "DICOM export to TPS"],
      deployment: ["Cloud-based (GDPR-compliant)"],
      triggerForAnalysis: "Manual or batch mode",
      processingTime: "Minutes per case (manufacturer claim)"
    },
    trainingData: {
      disclosureLevel: "minimal",
      description: "ESTRO 2026 Limkin abstract 1590 reports 327 T2-weighted MRI training cases for a brachytherapy segmentation model. Equivalence to the exact marketed model/version is not fully documented; this is conference evidence.",
      source: "ESTRO 2026 Limkin et al., abstract 1590",
      sourceUrl: "https://online.flippingbook.com/view/701322381/63/",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-11-08"
    },
    evaluationData: {
      studyDesign: "Software verification & validation for FDA 510(k) substantial equivalence",
      primaryEndpoint: "Substantial equivalence to predicate ART-Plan+ v3.0.0 (K242822)",
      results: "Not publicly disclosed. K253091 records the 'extension of existing anatomy to the use of brachytherapy within radiotherapy' as a change relative to the predicate, without published accuracy metrics. No peer-reviewed evaluation of the brachytherapy model located as of 2026-07-30.",
      description: "Public evidence includes FDA K253091 and ESTRO 2026 Limkin abstract 1590: a two-center 42-case test set with a qualitative 18-case subset. The subset must not be added as independent patients. Conference evidence remains unscored and distinct from regulatory validation.",
      source: "FDA 510(k) summary K253091 (decision 2025-12-23)",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-07-30"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)",
        
        notes: "Published in the CE (EU) edition of the ART-Plan™ v3.2.0 structures brochure, which declares ART-Plan+ a class IIb device in the EU. The notified body attribution (GMED 0459) is not restated on the vendor's public Technical Information 3.2 page; treat it as vendor-reported."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K253091",
        productCode: "MUJ, QKB, LLZ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2025-12-23",
        notes: "K253091 (ART-Plan+ v3.1.0) lists the 'extension of existing anatomy to the use of brachytherapy within radiotherapy' among the segmentation-feature changes cleared relative to the predicate K242822."
      },
      intendedUseStatement: "Automatic generation of contours for organs at risk on medical images such as CT and MR images, within ART-Plan+; the v3.1.0 clearance extends the segmentation anatomy to the use of brachytherapy within radiotherapy. ART-Plan+ is not intended to be used for patients less than 18 years of age. (Source: FDA 510(k) K253091, decision 2025-12-23.)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Cloud SaaS"],
      availability: "Module of ART-Plan+. Not all models are available in all markets."
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.1 (current) / 3.1.0 (FDA cleared)",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    evidence: [
      {"type": "Conference abstract (not scored)", "description": "Limkin et al., ESTRO 2026 abstract 1590: 327 training T2 MRI cases, 42 two-center test cases and an 18-case qualitative subset; unscored conference evidence.", "link": "https://online.flippingbook.com/view/701322381/63/"},
    ],
    evidenceRigor: "E0",
    clinicalImpact: "L1t",
    legacyClinicalImpact: "I0",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E0 retained. FDA and vendor documents are supplemented by ESTRO 2026 abstract 1590, which reports training and two-center testing. No full peer-reviewed product-specific journal validation was verified; the conference study is unscored.",
    clinicalImpactNotes: "L1t retained as provisional. Conference segmentation/qualitative results exist, but do not establish a scored journal-based clinical or dosimetric benefit for the marketed module.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE/FDA: limited public evidence and a small structure set; local validation on the institution's MR sequences and applicator setup is required before clinical use.",
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
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    limitations: [
      "Only 4 OARs are published; no target volumes (HR-CTV / IR-CTV) are delineated",
      "No applicator reconstruction is published for this model",
      "MR only; sequence dependence not publicly characterised",
      "Adult patients only (18+ years)",
      "No independent peer-reviewed evaluation published as of 2026-07-30",
      "Vendor warning: automatic contours are a proposal and must be verified and validated by one or more authorised persons before use",
      "Vendor warning: MR auto-contouring is only supported for the sequences and anatomies Brain T1, Abdo TF, Pelvis T2 and Pelvis TF; other sequences may generate inappropriate contours",
      "Vendor warning: contours may be inappropriate for atypical anatomy, post-surgical organs, poor image quality, or incorrect Patient Position (0018,5100) / Patient's Sex (0010,0040) DICOM tags",
      "Vendor warning: symmetrical structures may be subject to right/left inversion"
    ],
    version: "3.2.1",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-05",
    source: "ART-Plan structures brochure v3.2.0 (ART-BRO-AN-07EU, March 2026); FDA 510(k) K253091 summary (decision 2025-12-23); Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724, retrieved 2026-11-05). Pötter 2018 (doi:10.1016/j.ctro.2018.01.001) is the cited contouring recommendation, not an evaluation of this model."
  }
];

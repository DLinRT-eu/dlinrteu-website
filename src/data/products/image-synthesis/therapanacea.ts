import { ProductDetails } from "@/types/productDetails";
import { MRBOX_ALL_STRUCTURES } from "../auto-contouring/therapanacea-structures";

export const THERAPANACEA_MRBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "mr-box-synthetic",
    trainingData: {
        scannerModels: ["0.35T MRI"],
        institutions: 8,
        datasetSources: ["Prunaretty 2023 image test, 8 institutions"],
        description: "K234068 does not publish this training set. Prunaretty 2023 trained the pelvis model on 350 CT / TrueFisp 0.35 T pairs. The image test was 20 cases from 8 institutions. Brain training counts are not in that paper.",
        disclosureLevel: "partial",
        source: "Prunaretty et al., Frontiers in Oncology 2023",
        sourceUrl: "https://doi.org/10.3389/fonc.2023.1245054"
    },
    evaluationData: {
        studyDesign: "International retrospective multi-centric study",
        source: "DOI 10.3389/fonc.2023.1245054",
        sourceUrl: "https://doi.org/10.3389/fonc.2023.1245054",
        results: "Prunaretty 2023, 29 prostate patients at one centre: gamma greater than 96% at 1%/1 mm, greater than 99% at 2%/2 mm and 3%/3 mm, for AAA, AcurosXB and Monte Carlo. Targets within 1%. OARs within 2%.",
        primaryEndpoint: "Gamma passing rates and dose deviations",
        description: "Prunaretty 2023: gamma greater than 96% at 1%/1 mm, and target dose difference within 1%, in 29 prostate patients at one centre. The eight institutions are the 20-case image test, not the dose cohort. There is no brain cohort in that dose result. Those figures are not in the K234068 summary. K234068 clears male pelvis and brain synthetic CT."
    },
    name: "MR-Box",
    company: "Therapanacea",
    companyUrl: "https://therapanacea.com/",
    productUrl: "https://therapanacea.com/products",
    description: "AI-powered software module within the ART-Plan+ platform for generating MR-based pseudo-CT (synthetic CT) images with co-registered organs-at-risk (OAR) delineations from standard MR images, supporting MR-only radiotherapy workflows and reducing physical CT demand. Naming caveat: 'MR-Box' is the Therapanacea commercial brand name; FDA 510(k) submissions (K234068, K242822, K253091) describe the same functionality as the Annotate module / pseudo-CT generation feature of ART-Plan and do not use the 'MR-Box' label.",
    features: [
      "AI-based MR-to-pseudo-CT (synthetic CT) generation in one click",
      "Organs-at-risk (OAR) automatic delineation directly on MRI images",
      "Tissue electron density generation for direct dose calculation from pseudo-CTs",
      "Multi-modal registration avoidance to eliminate spatial alignment errors",
      "Seamless DICOM export of synthetic CTs and RT-structures to major TPS and PACS systems"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/therapanacea-mrbox.ts",
    website: "https://therapanacea.com/products",
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
      processingTime: "Contouring is stated as 2-3 minutes per anatomy. A time for pseudo-CT generation was not on the technical page read 2026-11-05."
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "GMED (Notified Body 0459)",
        notes: "The notified body attribution (GMED 0459) is not restated on the vendor's public Technical Information 3.2 page; treat it as vendor-reported."
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
    supportedStructures: MRBOX_ALL_STRUCTURES,
    structuresProvenance: {
      source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ref ART-BRO-AN-07EU, March 2026); FDA 510(k) K234068 (MR-Box pseudo-CT, 2024-04)",
      sourceUrl: "https://therapanacea.com/products",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-05",
      notes: "Three MR models per brochure v3.2.0, each prefixed in the structure list: Brain (MR T1) 27 OARs; Pelvis Male (MR T2 Elekta MR-Linac) 11 OARs + 2 ROIs; Pelvis/Abdomen (MR TrueFISP 0.35T, ViewRay) 7 pelvis OARs + 9 abdomen OARs + 2 ROIs. Bilateral structures are split into _L/_R so totals match the vendor counts. The MR brachytherapy model is published separately as BrachyBox (id: therapanacea-brachybox). Re-verified 2026-09-05 against the vendor products page structures library and brochure v3.2.0: published model set and counts unchanged. Re-verified 2026-10-03 against brochure ART-BRO-AN-07EU (v3.2.0, March 2026): model set, assignment and counts unchanged."
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.1 (current) / 3.1.0 (FDA cleared)",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    version: "3.2.1",
    releaseDate: "2021",
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    keyPapers: [
    {"doi": "10.1186/s13014-023-02336-y", "title": "Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy", "authors": "Autret D et al.", "journal": "Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Single-centre comparison of four commercial sCT generators; dosimetric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi":"10.3389/fonc.2023.1245054","pmid":"38023165","title":"A multi-centric evaluation of self-learning GAN based pseudo-CT generation software for low field pelvic magnetic resonance imaging","authors":"Prunaretty J, Gungor G, Gevaert T, et al.","journal":"Frontiers in Oncology","year":"2023","link":"https://doi.org/10.3389/fonc.2023.1245054","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Vendor-associated. Gamma greater than 96% at 1%/1 mm and a within-1% target difference are from 29 prostate patients at one centre. The eight institutions are the 20-case image test. No brain dose cohort. Not external validation.","vendorIndependent":false,"multiCenter":true,"prospective":false,"externalValidation":false,"multiNational":true},
      {"doi":"10.1016/j.radonc.2026.111530","pmid":"41980670","title":"Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative","authors":"Cusumano D, Maspero M, Vellini L, et al.","journal":"Radiotherapy and Oncology","year":"2026","link":"https://doi.org/10.1016/j.radonc.2026.111530","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent benchmark that names this product. The abstract does not name two countries, and the full text was not open, so multi-centre and multi-national stay false. Per-vendor numbers were not read.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":true,"multiNational":false},
      {"doi":"10.1002/acm2.70725","pmid":"42547906","title":"Image-based evaluation of a commercial AI synthetic CT generator for brain and prostate MR-only radiotherapy","authors":"Aire M, Matthews C, Jones J, et al.","journal":"Journal of Applied Clinical Medical Physics","year":"2026","link":"https://doi.org/10.1002/acm2.70725","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent image-quality and geometric-surrogate characterisation of the FDA-cleared AI sCT generator.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":false},
      {"doi":"10.1002/acm2.14583","pmid":"39585187","title":"Brain MR-only workflow in clinical practice: A comparison among generators for quality assurance and patient positioning","authors":"Levardon M, Autret D, Le Dorze T, Guillerminet C, Dufreneix S","journal":"Journal of Applied Clinical Medical Physics","year":"2025","link":"https://doi.org/10.1002/acm2.14583","evidenceRigor":"E1","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"Names ART-Plan for brain synthetic-CT quality assurance and positioning. One centre. No vendor author. TheraPanacea provided the synthetic CTs free of charge under a collaboration contract. The abstract's largest positioning deviations are for the only non-Dixon AI generator, which the methods identify as ART-Plan.","vendorIndependent":true,"multiCenter":false,"multiNational":false,"prospective":false,"externalValidation":false}
    ],
    source: "Therapanacea products page; FDA 510(k) summaries K234068, K242822 and K253091; Prunaretty 2023 (doi:10.3389/fonc.2023.1245054); MESCAL 2026 (doi:10.1016/j.radonc.2026.111530); Levardon 2025 (doi:10.1002/acm2.14583); Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724, retrieved 2026-11-05).",
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: true,
        evidenceRigor: "E2",
        evidenceRigorNotes: "Vendor-assisted peer-reviewed multi-centric study (Frontiers in Oncology 2023, DOI 10.3389/fonc.2023.1245054) across 8 institutions for pelvic TrueFISP and brain pseudo-CT generation.",
        clinicalImpact: "L2", legacyClinicalImpact: "I1",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes: "OAR delineation on the generated pseudo-CT is part of the MR-Box module per FDA K234068. No standalone peer-reviewed validation of the OAR contouring sub-module on synthetic MR-derived CT located on PubMed (2026-06-16).",
        evaluationData: {
          studyDesign: "Software V&V (FDA 510(k)); no standalone peer-reviewed contouring validation located",
          primaryEndpoint: "Geometric accuracy of OAR contours on MR-derived pseudo-CT (not publicly disclosed)",
          results: "Not publicly disclosed",
          description: "OAR contouring on MR pseudo-CT is bundled in the K234068 submission; module-specific peer-reviewed evidence is not yet available.",
          source: "FDA 510(k) K234068",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K234068.pdf",
        },
        evidenceRigor: "E0",
        evidenceRigorNotes: "No peer-reviewed publication located specifically for the MR-Box OAR contouring sub-module. PubMed searched 2026-06-16.",
        clinicalImpact: "I0",
      },
    },
    evidence: [
      {"type": "Multi-vendor Comparative Study", "description": "Autret D et al. Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy. Radiat Oncol 2023. Single-centre comparison of four commercial sCT generators; dosimetric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1186/s13014-023-02336-y"},
      {
        type: "Multicenter Study",
        description: "Prunaretty 2023, vendor-associated. Gamma greater than 96% at 1%/1 mm is from 29 prostate patients at one centre. The eight institutions are the 20-case image test. No brain dose cohort. The paper does not use the name MR-Box.",
        link: "https://doi.org/10.3389/fonc.2023.1245054"
      },
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. MESCAL, Radiother Oncol 2026. The abstract names MR Box (Therapanacea) as one of four synthetic-CT products. Data are from two centres. Per-vendor numbers were not in the open abstract.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      }
    ],
    limitations: [
      "Indicated for adult patients only; ART-Plan+ is not intended for patients less than 18 years of age (FDA K234068 IFU).",
      "Abdomen is an MR organ-at-risk model on the vendor structure list. FDA synthetic CT in K234068 is male pelvis and brain, not abdomen.",
      "Auto-contouring on MR images is only valid for sequences/anatomies supported by the module: Brain T1, Abdomen TrueFISP, Pelvis T2, Pelvis TrueFISP (Therapanacea Technical Information, 2026-06-16). MR sequences outside this scope may generate inappropriate contours.",
      "Pelvis T2 model is validated for Elekta MR-Linac sequences; TrueFISP models are validated for 0.35 T ViewRay MR-Linac. Other scanners / sequences require local commissioning before clinical use.",
      "Pseudo-CT and contours are produced from MR data that are not validated; the user must check the synthetic CT quality and review all contours before any treatment-planning action (Therapanacea Technical Information, 2026-06-16).",
      "Bad MR image quality (artefacts, motion, atypical slice thickness) can lead to incorrect synthetic CT and dose calculation.",
      "Importing data with missing required DICOM tags, incorrect Patient Position / Sex attributes, or corrupted volumes will cause import to fail or generate inappropriate output.",
      "Dose engine must be validated locally by the user before clinical use."
    ],
    evidenceRigor: "E2",
    evidenceRigorNotes: "E2 on 2026-11-05 is the maximum of the scored papers. Prunaretty 2023 is vendor-associated (TheraPanacea CEO) and is not external validation. MESCAL 2026 names MR Box and is independent on the author list; its data are from two centres, so multi-centre stays false. Autret 2023, Aire 2026 and Levardon 2025 are independent single-centre E1 studies. Levardon discloses a collaboration contract and free synthetic CTs. These papers do not raise the MR OAR contouring score.",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    clinicalImpactNotes: "L2 from dose and image endpoints. Prunaretty 2023: gamma greater than 96% at 1%/1 mm in 29 prostate patients at one centre, targets within 1%. That figure is not a brain result and is not an eight-institution dose test. No randomized prospective outcome data was identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "CE-marked Class IIb and FDA 510(k) cleared commercial product. High implementation safeguards are necessary: deployment requires extensive local commissioning, MR sequence compatibility checks, MR scanner QA program, synthetic CT dose validation, and manual expert verification of all synthetic scans and structures before clinical use."
  }
];

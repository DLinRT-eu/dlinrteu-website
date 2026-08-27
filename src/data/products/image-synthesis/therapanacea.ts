import { ProductDetails } from "@/types/productDetails";
import { MRBOX_ALL_STRUCTURES } from "../auto-contouring/therapanacea-structures";

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
      processingTime: "Under 2-3 minutes for pseudo-CT generation and OAR delineation under optimal conditions"
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
      sourceRetrievedOn: "2026-07-30",
      notes: "Three MR models per brochure v3.2.0, each prefixed in the structure list: Brain (MR T1) 27 OARs; Pelvis Male (MR T2 Elekta MR-Linac) 11 OARs + 2 ROIs; Pelvis/Abdomen (MR TrueFISP 0.35T, ViewRay) 7 pelvis OARs + 9 abdomen OARs + 2 ROIs. Bilateral structures are split into _L/_R so totals match the vendor counts. The MR brachytherapy model is published separately as BrachyBox (id: therapanacea-brachybox)."
    },
    partOf: {
      name: "ART-Plan+",
      version: "3.2.0 (current) / 3.1.0 (FDA cleared)",
      productUrl: "https://therapanacea.com/products",
      relationship: "Module"
    },
    version: "3.2.0",
    releaseDate: "2021",
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-27",
    keyPapers: [
      {"doi":"10.3389/fonc.2023.1245054","pmid":"38023165","title":"A multi-centric evaluation of self-learning GAN based pseudo-CT generation software for low field pelvic magnetic resonance imaging","authors":"Prunaretty J, Gungor G, Gevaert T, et al.","journal":"Frontiers in Oncology","year":"2023","link":"https://doi.org/10.3389/fonc.2023.1245054","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Multi-centre clinical evaluation of the TheraPanacea pseudo-CT model for low-field pelvic MRI; developed with the vendor.","vendorIndependent":false,"multiCenter":true,"prospective":false,"externalValidation":true,"multiNational":true},
      {"doi":"10.1016/j.radonc.2026.111530","pmid":"41980670","title":"Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative","authors":"Cusumano D, Maspero M, Vellini L, et al.","journal":"Radiotherapy and Oncology","year":"2026","link":"https://doi.org/10.1016/j.radonc.2026.111530","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Multi-centre, multi-vendor benchmark of commercial sCT algorithms with defined acceptance levels; dosimetric/image endpoints only.","vendorIndependent":true,"multiCenter":true,"prospective":false,"externalValidation":true,"multiNational":true},
      {"doi":"10.1002/acm2.70725","pmid":"42547906","title":"Image-based evaluation of a commercial AI synthetic CT generator for brain and prostate MR-only radiotherapy","authors":"Aire M, Matthews C, Jones J, et al.","journal":"Journal of Applied Clinical Medical Physics","year":"2026","link":"https://doi.org/10.1002/acm2.70725","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Independent image-quality and geometric-surrogate characterisation of the FDA-cleared AI sCT generator.","vendorIndependent":true,"multiCenter":false,"prospective":false,"externalValidation":false}
    ],
    source: "Therapanacea MR-Box page; Therapanacea ART-Plan+ technical information pages; FDA 510(k) database K234068, K242822, K253091; indirect-comparative MESCAL 2026 (Cusumano, Maspero et al. Radiother Oncol, DOI 10.1016/j.radonc.2026.111530); Therapanacea Technical Information 3.2 (ART-Plan+ v3.2.0, UDI (01)03770019940020(8012) v3.2.0(11)260525; manufacturer TheraPanacea, 8-10 Avenue Ledru-Rollin, 75012 Paris, France; https://therapanacea.com/technical-information-2, retrieved 2026-07-30).; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)",
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: true,
        evidenceRigor: "E2",
        evidenceRigorNotes: "Vendor-assisted peer-reviewed multi-centric study (Frontiers in Oncology 2023, DOI 10.3389/fonc.2023.1245054) across 8 institutions for pelvic TrueFISP and brain pseudo-CT generation.",
        clinicalImpact: "I1",
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
    limitations: [
      "Indicated for adult patients only; ART-Plan+ is not intended for patients less than 18 years of age (FDA K234068 IFU).",
      "Auto-contouring on MR images is only valid for sequences/anatomies supported by the module: Brain T1, Abdomen TrueFISP, Pelvis T2, Pelvis TrueFISP (Therapanacea Technical Information, 2026-06-16). MR sequences outside this scope may generate inappropriate contours.",
      "Pelvis T2 model is validated for Elekta MR-Linac sequences; TrueFISP models are validated for 0.35 T ViewRay MR-Linac. Other scanners / sequences require local commissioning before clinical use.",
      "Pseudo-CT and contours are produced from MR data that are not validated; the user must check the synthetic CT quality and review all contours before any treatment-planning action (Therapanacea Technical Information, 2026-06-16).",
      "Bad MR image quality (artefacts, motion, atypical slice thickness) can lead to incorrect synthetic CT and dose calculation.",
      "Importing data with missing required DICOM tags, incorrect Patient Position / Sex attributes, or corrupted volumes will cause import to fail or generate inappropriate output.",
      "Dose engine must be validated locally by the user before clinical use."
    ],
    evidenceRigor: "E2",
    evidenceRigorNotes: "Validated via a peer-reviewed, international retrospective multi-centric study across 8 global institutions utilizing pelvic MR images (TrueFisp 0.35T) and brain mappings. The study includes vendor-affiliated co-authors (including Therapanacea CEO Nikos Paragios), classifying the evidence rigor as E1 (vendor-assisted/collaborative peer-reviewed study). (Source: DOI 10.3389/fonc.2023.1245054). MESCAL 2026 (Cusumano, Maspero et al.) kept separately as indirect-comparative community benchmark. 2026-08-25 Wave 5: E2/I1 retained — E2 set by Prunaretty et al. 2023 and the MESCAL benchmark. Open question: confirm with the vendor whether the low-field pelvic MR model of Prunaretty 2023 is marketed as MR-Box or as part of AdaptBox; move the paper if it belongs to AdaptBox.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Demonstrated excellent dosimetric equivalence for MR-only workflows. Mean global gamma passing rates exceeded 96% at 1mm/1mm criteria across AAA, AcurosXB, and Monte Carlo algorithms, with target volume dose deviations within 1%. No randomized prospective outcome data was identified.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "CE-marked Class IIb and FDA 510(k) cleared commercial product. High implementation safeguards are necessary: deployment requires extensive local commissioning, MR sequence compatibility checks, MR scanner QA program, synthetic CT dose validation, and manual expert verification of all synthetic scans and structures before clinical use."
  }
];

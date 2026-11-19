
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-syngo-ct",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232799.pdf",
        disclosureLevel: "minimal",
        description: "The software uses multiple pre-defined MR acquisitions to generate synthetic CT images for adult patients. Training involves datasets for specific anatomical regions including Brain and Pelvis.",
        source: "FDA 510(k) summary K232799"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k)) and single-center clinical validations",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232799.pdf",
        source: "FDA 510(k) summary K232799",
        description: "Synthetic CT generation for brain and pelvic cancer patients, demonstrating technical efficacy and clinical utility for radiotherapy planning.",
        results: "Technical efficacy demonstrated for brain and pelvic synthetic CT generation.",
        primaryEndpoint: "Not specified"
    },
    name: "syngo.via RT Image Suite",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct",
    description: "Advanced imaging solution for radiation therapy planning. Provides synthetic CT generation from MR data, 3D/4D image visualization, multi-modality contouring, deformable image registration, and dual-energy integration within the syngo.via platform.",
    features: ["Synthetic CT generation", "Auto-contouring support", "Deformable image registration", "4D CT analysis", "Dual-energy integration", "Multimodality image registration", "Treatment planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/siemens.ts",
    website: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/syngovia-rt-image-suite",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "MR-based synthetic CT for brain and pelvis",
      "AI-assisted auto-contouring via DI2IN engine (shared with AI-Rad Companion Organs RT)",
      "Deformable image registration",
      "4D CT visualization and analysis",
      "Dual-energy CT integration",
      "Integrated RT planning workflow",
      "Automated processing"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "syngo.via platform integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within syngo.via workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K252304",
        productCode: "MUJ",
        regulationNumber: "21 CFR 892.5050",
        decisionDate: "2026-03-18",
        notes: "K252304 (Mar 2026; VC10), submitted by Varian Medical Systems (part of Siemens Healthineers). Prior clearances: K232799 (Apr 2024; VB80), K220783 (Sep 2022), K211379 (Jul 2021), K201444 (Aug 2020)"
      },
      intendedUseStatement: "syngo.via RT Image Suite is a 3D and 4D image visualization, multi-modality manipulation and contouring tool that helps the preparation of treatments such as, but not limited to those performed with radiation (for example, Brachytherapy, Particle Therapy, External Beam Radiation Therapy). The software combines tools for generation of a synthetic CT based on multiple pre-defined MR acquisitions. (Source: FDA 510(k) K252304 Summary, accessed 2026-11-02)"
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"],
    },
    version: "VC10",
    releaseDate: "2024-09-20",
    lastUpdated: "2026-11-02",
    lastRevised: "2026-11-19",
    limitations: [
      "VC10 replaces the prior 2D synthetic CT model with a new 3D deep-learning algorithm. Evidence from VB60A/VB80 or from unversioned \"SyngoAI\" may not generalise to VC10. No prospective clinical, workflow or patient-outcome study of VC10 was identified. Local MR-sequence- and TPS-specific commissioning, dose and registration QA, and expert review are required before clinical use."
    ],
    source: "FDA 510(k) K252304, K232799; vendor website; peer-reviewed literature",
    keyPapers: [
      {"doi": "10.3390/diagnostics14010028", "title": "Experimental Examination of Conventional, Semi-Automatic, and Automatic Volumetry Tools for Segmentation of Pulmonary Nodules in a Phantom Study", "authors": "Hlouschek J et al.", "journal": "Diagnostics", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC full text PMC10804383), provisional pending reviewer check (deadline 2026-12-11). Single-center phantom study comparing DL auto-segmentation accuracy vs reference; not clinical patient data. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1007/s00066-023-02090-w", "title": "Synthetic CTs for MRI-only brain RT treatment: integration of immobilization systems", "authors": "Masitho S et al.", "journal": "Strahlenther Onkol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC full text PMC10361877), provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective study using Siemens syngo.via deep-learning sCT; institutional funding ties to vendor noted. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2026.101062", "title": "Phantom benchmarking for quality assurance of synthetic computed tomography in cranial magnetic resonance-only radiotherapy", "authors": "Axer BN et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC full text PMC13544310), provisional pending reviewer check (deadline 2026-12-11). Single-center phantom study explicitly using syngo.via RT Image Suite sCT algorithms; vendor employees co-authored, limiting independence. Product used as one arm of a comparison or with a version caveat.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1002/acm2.14581", "title": "Evaluation and comparison of synthetic computed tomography algorithms with 3T MRI for prostate radiotherapy: AI‐based versus bulk density method", "authors": "Karhula SS et al.", "journal": "J Applied Clin Med Phys", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Retrospective single-center dosimetric/geometric validation of Siemens AI sCT vs reference CT in 44 prostate patients.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.adro.2023.101177", "title": "Clinical Validation of Siemens’ Syngo.via Automatic Contouring System", "authors": "Pera Ó et al.", "journal": "Advances in Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the abstract, provisional pending reviewer check (deadline 2026-12-11). Single-center retrospective validation with vendor co-authors; measures accuracy and workflow time savings.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi":"10.1016/j.radonc.2026.111530","pmid":"41980670","title":"Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative","authors":"Cusumano D, Maspero M, Vellini L, et al.","journal":"Radiotherapy and Oncology","year":"2026","link":"https://doi.org/10.1016/j.radonc.2026.111530","evidenceRigor":"E2","clinicalImpact":"L2","rationale":"Added 2026-10-24; DOI verified on Crossref, abstract read via repository record. Multi-centre, multi-vendor benchmark naming SyngoAI among four commercial sCT solutions (brain and pelvis); image, dose and position-verification endpoints; scored identically to the other evaluated products, pending reviewer check.","vendorIndependent":true,"multiCenter":true,"prospective":false,"externalValidation":true,"multiNational":true},
      {"doi": "10.1002/acm2.70829", "title": "Application of synthetic computed tomography based on a deep learning model in pelvic radiotherapy planning: A feasibility study", "authors": "Lin F, Hu J, Li Z, et al.", "journal": "Journal of Applied Clinical Medical Physics", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-10-24 from the uploaded literature-search hits (raw_hits.csv); DOI metadata verified on Crossref; scored from the abstract only, pending reviewer check. Single-centre retrospective feasibility study of the syngo.via VB60A pelvic deep-learning MR-to-synthetic-CT model; HU and dose recalculation endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    ],
    evidence: [
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative. Radiother Oncol 2026. Community benchmark dataset and acceptance levels for MR-only RT commissioning; not a direct syngo.via evaluation.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      }
    ],
    relatedProducts: [
      {
        id: "siemens-ai-rad-companion",
        relationship: "Shares the DI2IN OAR contouring engine with AI-Rad Companion Organs RT. Literature evaluating 'Siemens syngo.via' contouring (Lin/Fan JACMP 2025) directly applies to this product; Rayn et al. J Cancer Res Ther 2024 evaluates the same underlying algorithm under the AI-Rad Companion name."
      }
    ],
    evidenceRigor: "E0",
    evidenceRigorNotes: "2026-08-25 Wave 4 per-paper sweep: PubMed was re-searched for publications naming syngo.via RT Image Suite synthetic CT and none were found. The previous E1 rested on an uncited claim that \"published clinical studies\" exist; without a verifiable product-naming publication the score is corrected to E0 (vendor-validated only). Re-instate E1 or higher only when a specific citation can be verified. MESCAL 2026 (Cusumano, Maspero et al.) included as indirect-comparative community benchmark, not a direct syngo.via evaluation. 2026-08-25 Wave 5A re-sweep (Europe PMC 2014-2026, 3115 records screened for 'syngo.via' gated on synthetic-CT terms): still no publication names this product as the sCT generator under evaluation. The previously cited Aljaafari 2025 evaluates Philips MRCAT Brain and was removed as a misattribution.",
    clinicalImpact: "L1t",
    clinicalImpactNotes: "L1t (technical efficacy) per 2026-11-02 revision for VC10: published evaluations (MESCAL 2026, Lin 2026) concern earlier versions or unversioned SyngoAI; VC10 evidence is limited to vendor verification and validation in the FDA 510(k) K252304 summary.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "R2 per 2026-11-02 revision: CE + FDA 510(k) for VC10 but no VC10-specific published evaluation; local validation, interface testing and workflow confirmation required before adoption.",
  }
];

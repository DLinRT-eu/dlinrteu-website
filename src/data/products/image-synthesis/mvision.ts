import { ProductDetails } from "@/types/productDetails";

export const MVISION_IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-image-plus",
    name: "Image+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/image/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/mvision.ts",
    description:
      "Image-synthesis module of the MVision AI Workspace+ platform. Generates synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows.",
    features: [
      "Brain MR T1 synthetic CT model",
      "Pelvis MR T2 synthetic CT model",
      "CBCT to synthetic CT conversion",
      "Virtual non-contrast (VNC) imaging from contrast-enhanced CT",
      "MR-only planning support",
      "Offline adaptive workflow integration"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/image/",
    anatomicalLocation: ["Brain", "Pelvis", "Abdomen"],
    modality: ["MRI", "CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Synthetic CT generation from MR (brain T1, pelvis T2)",
      "CBCT-to-synthetic-CT conversion for offline adaptive workflows",
      "Virtual non-contrast imaging from contrast-enhanced CT",
      "Supports MR-only planning workflows",
      "Delivered through the Workspace+ AI platform"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI", "CBCT", "Contrast-enhanced CT"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Workspace+", "PACS", "TPS via DICOM"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated within Workspace+",
      processingTime: "Minutes per case (vendor-reported)"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes:
          "Regulatory basis is the Workspace+ platform CE Mark Class IIa certification of 21 October 2025 under EU MDR 2017/745, within which Image+ is delivered as a module. No Image+-specific CE certificate or certificate number is published by the vendor; none is claimed here."
      },
      fda: {
        status: "not_applicable",
        notes:
          "No FDA clearance for Image+ or for the Workspace+ platform. The MVision AI FDA clearance K250064 covers the Dose+ module only and does not apply to Image+."
      }
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Workspace+ platform bundling"]
    },
    partOf: {
      name: "Workspace+",
      productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
      relationship: "Module"
    },
    usesAI: true,
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes:
      "Raised E0 → E1 on 2026-09-23: two peer-reviewed, vendor-independent retrospective studies in J Appl Clin Med Phys (2026) evaluate Image+ synthetic CT — Gaban et al. (Riviera-Chablais Hospital, 31 patients, pelvic and abdominal T1/T2 MR on a 1.5T MR-Linac; geometric, HU and dosimetric endpoints) and Östensson & Jonsson (Umeå University, 19 patients from the public Gold Atlas dataset; HU and dose recalculation endpoints). Both single-institution, no MVision co-authors per the Crossref author records. Previous history: E0 retained after a dedicated evidence check on 2026-09-14: no peer-reviewed publication naming the Image+ module or MVision synthetic CT was located. The only third-party evaluation identified is a university thesis (Virginia Commonwealth University, 2026) validating MR-only planning with MVision synthetic CT — grey literature, not peer-reviewed, so it does not raise rigor above E0 and evidenceVendorIndependent is kept false (that flag denotes peer-reviewed independent evidence). The 2025 Leeds brain MRI-only synthetic CT validation study (Tech Innov Patient Support Radiat Oncol 2025;35:100328) was screened and excluded: it evaluates Philips MRCAT Brain, a different vendor's product. Content and score originally migrated on 2026-09-13 from the Workspace+ categoryEvidence['Image Synthesis'] block, which recorded E0 following the 2026-08-25 Wave 5D sweep (Europe PMC 2014-2026, alias-gated).",
    clinicalImpactNotes:
      "I1: the two peer-reviewed studies report technical and dosimetric agreement (e.g. dose within 2% in 98.8% of pelvic and 93.3% of abdominal cases; median MAE 34.0 HU) but no patient-outcome or workflow endpoints.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "CE-marked at platform level with E1 evidence (two single-institution retrospective studies): local commissioning of synthetic CT dosimetric accuracy and a structured pilot are recommended before clinical adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    releaseDate: "2025-10-21",
    lastUpdated: "2026-09-23",
    lastRevised: "2026-09-23",
    keyPapers: [
      {"doi": "10.1002/acm2.70571", "title": "Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac", "authors": "Gaban C, Pisaturo O, Moeckli R, Pachoud M, Ghandour S", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-institution retrospective evaluation of two Image+ sCT models (T1/T2) in 31 pelvic and abdominal patients; geometric, HU and gamma/dose endpoints against deformed CT and bulk-density CT.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": true},
      {"doi": "10.1002/acm2.70765", "title": "Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning", "authors": "Östensson A, Jonsson J", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Retrospective evaluation of MVision sCT and segmentation on 19 public Gold Atlas prostate patients; HU similarity and dose recalculation versus reference CT.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": true}
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Gaban C et al. Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac. J Appl Clin Med Phys. 2026;27(5):e70571",
        link: "https://doi.org/10.1002/acm2.70571"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Östensson A, Jonsson J. Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning. J Appl Clin Med Phys. 2026;27(9):e70765",
        link: "https://doi.org/10.1002/acm2.70765"
      },
      {
        type: "Company Press Release",
        description:
          "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025) — the platform certification within which Image+ is delivered",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      },
      {
        type: "Academic Thesis (grey literature, not peer-reviewed)",
        description:
          "Magnetic Resonance Only Planning Validation Using Synthetic CT by MVision — MSc thesis, Virginia Commonwealth University, 2026. Vendor-independent single-centre validation of MR-only planning using MVision synthetic CT; not peer-reviewed, so it does not raise evidence rigor above E0.",
        link: "https://scholarscompass.vcu.edu/etd/8304"
      },
      {
        type: "Vendor Product Page",
        description:
          "MVision AI Image+ product page — source for the module scope: synthetic CT from MRI, CBCT and contrast-enhanced CT (brain MR T1, pelvis MR T2, CBCT→sCT, virtual non-contrast), retrieved 2026-09-14",
        link: "https://mvision.ai/image/"
      },
      {
        type: "Vendor Article",
        description:
          "MVision AI, 'Advancing Radiotherapy Care Through Synthetic CT Imaging' (28 May 2026) — vendor-authored background on the synthetic CT models, retrieved 2026-09-14",
        link: "https://mvision.ai/advancing-radiotherapy-care-through-synthetic-ct-imaging/"
      }
    ],
    limitations: [
      "Synthetic CT output is assistive and requires clinician review and approval before use in planning",
      "Regulatory basis is the Workspace+ platform CE mark; no Image+-specific clearance is published",
      "Synthetic CT accuracy depends on acquisition protocol, sequence and field of view",
      "Vendor-described MR models cover brain (T1) and pelvis (T2); abdominal use is reported in Gaban et al. 2026",
      "Peer-reviewed evidence (2026) is limited to two single-institution retrospective studies with small cohorts (31 and 19 patients) covering pelvis, abdomen and prostate; no brain or CBCT-to-sCT peer-reviewed validation identified",
      "No public disclosure of training or evaluation data for this module"
    ],
    source:
      "MVision AI Image+ product page (https://mvision.ai/image/) and MVision AI CE Mark press release (21 Oct 2025), retrieved 2026-09-13; evidence completeness check performed 2026-09-14, with the VCU thesis and vendor synthetic CT article retrieved that date. Entry created 2026-09-13 by splitting the Image+ module out of the Workspace+ platform entry; description, key features and evidence score migrated from the Workspace+ integratedModules and categoryEvidence['Image Synthesis'] blocks. releaseDate proxied from the Workspace+ CE certification date (2025-10-21); no Image+-specific release date is published. 2026-09-23: added two peer-reviewed JACMP papers (DOIs 10.1002/acm2.70571, 10.1002/acm2.70765; authors/affiliations checked via Crossref) and rescored E1/I1. trainingData and evaluationData intentionally omitted: no disclosed source describes them."
  }
];

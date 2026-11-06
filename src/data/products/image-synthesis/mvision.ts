import { ProductDetails } from "@/types/productDetails";

export const MVISION_IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-image-plus",
    name: "Image+",
    version: "1.0.2",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/image/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/mvision.ts",
    description:
      "Image-synthesis module of the MVision AI Workspace+ platform. Generates synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows. The vendor page lists brain MR T1, pelvis MR T2, CBCT and virtual non-contrast. It does not list an abdomen model.",
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
    anatomicalLocation: ["Brain", "Pelvis"],
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
      population: "Adult patients — not stated on the Image+ page read 2026-11-05",
      input: ["MRI", "CBCT", "Contrast-enhanced CT"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Workspace+", "PACS", "TPS via DICOM"],
      deployment: ["Cloud-based", "On-premise — not stated on the Image+ page read 2026-11-05"],
      triggerForAnalysis: "Manual or automated within Workspace+",
      processingTime: "Minutes per case — not stated on the Image+ page read 2026-11-05"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notes:
          "Vendor pages print CE 2797. That is a notified-body number, not a certificate number. The regulatory basis cited by the vendor is the Workspace+ platform CE Mark Class IIa announcement of 21 October 2025 under EU MDR 2017/745, within which Image+ is delivered as a module. No Image+-specific certificate number is published. EUDAMED was not re-confirmed on 2026-11-05 (the device query timed out). The class remains vendor-reported."
      },
      fda: {
        status: "not_applicable",
        notes:
          "Image+ has no FDA clearance. openFDA applicant search on 2026-11-05 returned three MVision 510(k)s. K250064 is Dose+ (1.0), decision 2025-09-04, and its summary is prostate dose prediction. It does not mention synthetic CT and does not apply to Image+."
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
    trainingData: {
      disclosureLevel: "partial",
      source: "Gaban et al. 2026, manufacturer-reported counts quoted in the paper",
      sourceUrl: "https://doi.org/10.1002/acm2.70571",
      description: "Gaban 2026 reports manufacturer-provided counts: 485 paired MR-CT datasets from multiple centres for the pelvis model, and about 250 for an abdomen prototype. The architecture is described there as a conditional convolution generator, and the pelvis model does not generate air. Brain, CBCT and virtual non-contrast still have no public training description."
    },
    evaluationData: {
      studyDesign: "Two single-centre retrospective studies of the pelvis MR model. Tested versions are 1.0.0 and 1.0.1, not the vendor-supplied 1.0.2.",
      primaryEndpoint: "HU error, tissue overlap and dose or gamma agreement against CT",
      source: "Gaban et al. J Appl Clin Med Phys 2026; Östensson and Jonsson, J Appl Clin Med Phys 2026",
      sourceUrl: "https://doi.org/10.1002/acm2.70571",
      description: "Gaban tested Image+ Pelvis 1.0.0. Östensson tested Image+ 1.0.1 Pelvis with Workspace+ 1.0.1. Östensson's segmentation endpoints are Contour+ 1.3.1 and are not Image+ results. The abdomen arm in Gaban is a prototype and is not a released model.",
      results: "Gaban, Pelvis 1.0.0, 16 patients: dose difference under 2% in 98.8% of cases; sCT versus deformed CT gamma 99.7% (±0.36) at 2%/2 mm and 95.76% (±1.87) at 1%/1 mm (Table 2). The abdomen prototype, not a released model, was 93.3%. Östensson, Pelvis 1.0.1, 19 Gold Atlas patients, T2 only: median MAE 34.0 HU (range 18.25–89.37), median SSIM 0.93, median gamma 99.8% at 2%/2 mm and 99.5% at 1%/1 mm, median dose difference 0.036 Gy. Image+ does not model transient pelvic air."
    },
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes:
      "E1 on 2026-11-05. Gaban 2026 (31 patients, one hospital) and Östensson 2026 (19 patients, one analysis group) are peer-reviewed single-centre studies of the pelvis MR model. They are not multi-centre, large or prospective, so they are not E2. No systematic review or trial of Image+ was found. The abdomen arm is a prototype and does not strengthen the released product. Brain, CBCT-to-sCT and virtual non-contrast have no peer-reviewed evaluation. Training counts for pelvis and the abdomen prototype are now in Gaban 2026; they are manufacturer-reported. The Virginia Commonwealth University thesis remains grey literature and is not the only third-party evaluation.",
    clinicalImpactNotes:
      "L2: HU error, tissue Dice, gamma pass rate and dose difference are accuracy measures. Neither paper reports editing time, a change in the chosen plan, or a patient outcome for the synthetic CT. Do not pool 98.8% (released pelvis model) with 93.3% (abdomen prototype). legacyClinicalImpact I1 is the old code only.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "Only the pelvis MR model has peer-reviewed data, the tested builds are 1.0.0 and 1.0.1, and the CE mark is the platform certificate and is still vendor-reported. A structured local pilot of dosimetric accuracy is still required. That is a pilot (R2), not conditional adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    releaseDate: "2025-10-21",
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    keyPapers: [
      {"doi": "10.1002/acm2.70571", "title": "Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac", "authors": "Gaban C et al.", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I1", "rationale": "Single-centre retrospective study. Image+ Pelvis 1.0.0 is the released model: 16 patients, dose difference under 2% in 98.8% of cases. Image+ Abdomen is a prototype, not listed on the vendor page: 93.3% dose figure, abdominal bone mean error 93.1 ± 25.8 HU and bone Dice 0.67 ± 0.09, and the authors excluded abdominal bone targets. Authors declare no conflict. They thank Gregory Bolard, MVision's Chief Scientific Officer, for access to the prototypes. Training counts in the paper are manufacturer-provided. vendorIndependent stays true with that acknowledgment disclosed.", "vendorIndependent": true, "externalValidation": true},
      {"doi": "10.1002/acm2.70765", "title": "Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning", "authors": "Östensson A et al.", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I1", "rationale": "Retrospective single-centre study of Image+ 1.0.1 Pelvis and Workspace+ 1.0.1 on 19 Gold Atlas patients (T2 only). Synthetic-CT endpoints only are scored here: median MAE 34.0 HU, median SSIM 0.93, median gamma 99.8% at 2%/2 mm and 99.5% at 1%/1 mm, median dose difference 0.036 Gy. Segmentation results are Contour+ 1.3.1 and are not an Image+ score. Declared interest is Hero Imaging AB, not MVision. Funding includes Cancerforskningsfonden i Norrland.", "vendorIndependent": true, "externalValidation": true}
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Gaban C et al. Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac. J Appl Clin Med Phys. 2026;27(5):e70571. Pelvis 1.0.0 is the released model. The abdomen model in this paper is a prototype.",
        link: "https://doi.org/10.1002/acm2.70571"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Östensson A, Jonsson J. Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning. J Appl Clin Med Phys. 2026;27(9):e70765. Image+ 1.0.1 Pelvis. Segmentation endpoints are Contour+.",
        link: "https://doi.org/10.1002/acm2.70765"
      },
      {
        type: "Company Press Release",
        description:
          "Workspace+ CE Mark Class IIa certification under EU MDR 2017/745 (Oct 21, 2025). The press release said the launch was still forthcoming. This date is kept as a proxy. Vendor pages also print CE 2797, which is not a certificate number. EUDAMED was not re-confirmed on 2026-11-05.",
        link: "https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/"
      },
      {
        type: "Academic Thesis (grey literature, not peer-reviewed)",
        description:
          "Magnetic Resonance Only Planning Validation Using Synthetic CT by MVision — MSc thesis, Virginia Commonwealth University, 2026. The repository page was read. The PDF was not opened, and the abstract gives no cohort size. Grey literature. It does not raise evidence rigor.",
        link: "https://scholarscompass.vcu.edu/etd/8304"
      },
      {
        type: "Vendor Product Page",
        description:
          "MVision AI Image+ product page, read 2026-11-05. Marketed conversions: brain MR T1, pelvis MR T2, CBCT and virtual non-contrast. Abdomen is not listed. Version 1.0.2, on-premise deployment, an adult-only limit and a processing time are not stated on this page.",
        link: "https://mvision.ai/image/"
      },
      {
        type: "Vendor Article",
        description:
          "MVision AI, 'Advancing Radiotherapy Care Through Synthetic CT Imaging' (28 May 2026). Performance numbers in that article are not Image+ results. The gamma figure above 98.9% comes from Chick 2025, which used Contour+ and bulk density, not Image+.",
        link: "https://mvision.ai/advancing-radiotherapy-care-through-synthetic-ct-imaging/"
      }
    ],
    limitations: [
      "Synthetic CT output is assistive and requires clinician review and approval before use in planning",
      "Regulatory basis is the Workspace+ platform CE mark; no Image+-specific clearance is published. CE 2797 on the vendor pages is not a certificate number, and EUDAMED was not re-confirmed on 2026-11-05.",
      "Synthetic CT accuracy depends on acquisition protocol, sequence and field of view. Image+ does not model transient pelvic air.",
      "Vendor-described MR models cover brain (T1) and pelvis (T2). Abdomen is not on the vendor page. Gaban 2026 tested an abdomen prototype that underestimated abdominal bone (mean error 93.1 ± 25.8 HU; bone Dice 0.67 ± 0.09), and the authors excluded abdominal bone targets.",
      "Peer-reviewed evidence is two single-centre retrospective studies of the pelvis model, on versions 1.0.0 and 1.0.1, not on the vendor-supplied 1.0.2. Brain, CBCT-to-sCT and virtual non-contrast have no peer-reviewed evaluation.",
      "Manufacturer-reported training counts are in Gaban 2026 for the pelvis model (485 paired MR-CT datasets) and for an abdomen prototype (about 250). Brain, CBCT and virtual non-contrast still have none."
    ],
    source:
      "MVision AI Image+ page (https://mvision.ai/image/), read 2026-11-05; Workspace+ CE press release (21 Oct 2025). Q4 2026 review: Gaban 2026 (doi:10.1002/acm2.70571) and Östensson 2026 (doi:10.1002/acm2.70765) read in full; K250064 summary confirms Dose+ and not Image+; Crossref titles match. version 1.0.2 remains vendor-supplied. The published evaluations are of Pelvis 1.0.0 and 1.0.1. releaseDate stays a proxy for the platform CE date because no Image+-specific release date is published, and the press release said the launch was still forthcoming. Workspace+ platform file was not edited."
  }
];

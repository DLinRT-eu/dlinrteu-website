
import { ProductDetails } from "@/types/productDetails";

export const GE_MR_CONTOUR_DL_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-mr-contour-dl",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
        source: "FDA 510(k) summary K242925",
        scannerModels: ["GE MRI systems"],
        demographics: "Adult patients",
        description: "The training dataset consists of MRI images of adult patients for the segmentation of over 37 organ structures in the head, neck, and pelvic regions."
    },
    evaluationData: {
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        description: "FDA 510(k) summary for MR Contour DL (K242925) providing automated organ-at-risk contouring for head & neck and pelvic anatomies to accelerate radiation therapy planning workflows.",
        studyDesign: "Software V&V (FDA 510(k))",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
        source: "FDA 510(k) summary K242925"
    },
    name: "MR Contour DL",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-mr-contour-dl.ts",
    description: "AI-powered auto-segmentation solution for MRI-based radiation therapy planning, providing automated organ-at-risk contouring for head & neck and pelvic anatomies.",
    category: "Auto-Contouring",
    structuresUnavailable: true,
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/",
    anatomicalLocation: ["Head & Neck", "Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "MRI-based auto-segmentation",
      "37+ organ structures supported",
      "Integrated with GE MRI systems",
      "Part of GE iRT platform ecosystem",
      "Component of the iRT MR Direct MR-only workflow (ESTRO 2026), with Spectronic MRI Planner for synthetic CT"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["GE MRI systems", "GE iRT Platform"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K242925",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-04-01",
        notes: "Previous clearance: K213717. Standalone MRI-based auto-contouring component also integrated into GE iRT platform."
      },
      intendedUseStatement: "MR Contour DL generates a Radiotherapy Structure Set (RTSS) DICOM with segmented organs at risk which can be used by trained medical professionals. It is intended to aid in radiation therapy planning by generating initial contours to accelerate workflow for radiation therapy planning. It is the responsibility of the user to verify the processed output contours and user-defined labels for each organ at risk and correct the contours/labels as needed. MR Contour DL is intended to be used with images acquired on MR scanners, in adult patients. (Source: FDA 510(k) K242925 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "GE Healthcare enterprise solutions"]
    },
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "MR Contour DL 510(k) K242925 (GE Healthcare), cleared 2025-04-01. FDA 510(k) summary PDF and database listing.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf"
      },
      {
        type: "Press Release",
        description: "GE HealthCare ESTRO 2025 press release introducing AI-enabled radiation oncology solutions including MR Contour DL within the iRT platform.",
        link: "https://investor.gehealthcare.com/news-releases/news-release-details/estro-2025-congress-ge-healthcare-expand-its-radiation-oncology"
      },
      {
        type: "Press Release",
        description: "GE HealthCare ASTRO 2025 announcement on the Intelligent Radiation Therapy (iRT) workflow integrating MR Contour DL with RayStation.",
        link: "https://www.businesswire.com/news/home/20250925074542/en/GE-HealthCare-debuts-AI-supported-solution-designed-to-improve-and-shorten-the-radiation-therapy-workflow-at-ASTRO-2025"
      }
    ],
    keyPapers: [
      {"doi": "10.1016/j.phro.2026.100918", "pmid": "41767107", "title": "A combined automatic organ at risk contouring and synthetic Computed Tomography solution for pelvic Magnetic Resonance-only radiotherapy", "authors": "Wyatt JJ et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-11-19 from the screened literature list (Marlie, >10,000 papers); DOI metadata verified on Crossref; scored from the full text (Europe PMC PMC12936674), provisional pending reviewer check (deadline 2026-12-11). Prospective, ethics-approved single-centre study (n=20 pelvic patients, Newcastle UK) comparing a MR-only workflow — automatic OAR contours used without manual editing plus a deep-learning sCT — against the manual MR-CT standard; mean dose differences were similar to manual inter-observer variability for all OARs except bowel bag and lower-dose bladder/rectum volumes. CAUTION for reviewer: the paper never names MR Contour DL; it describes GE Healthcare's separate 3D U-net per-organ models trained on 103 patients and cites Front Phys 2023 (doi:10.3389/fphy.2023.1236792) as the source of those models, i.e. the research basis of this product. GE Healthcare co-authors (Munich, Budapest) took part, so the study is vendor-involved.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false}
    ],
    limitations: [
      "No vendor-independent peer-reviewed publication names this product (web-searched 2026-06-01); the 2026 prospective pelvic MR-only study evaluates GE Healthcare's 3D U-net models without naming MR Contour DL",
      "Recently cleared (FDA K242925, April 2025) — limited published clinical-experience data",
      "Contour quality dependent on input MR sequence, scanner vendor and acquisition protocol",
      "User verification and editing of output contours required per FDA labelling",
      "Vendor does not publicly publish a numeric version for this module"
    ],
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes: "FDA K242925 clearance documentation plus one prospective, ethics-approved single-centre study (Wyatt 2026, Phys Imaging Radiat Oncol, n=20) of GE Healthcare's pelvic 3D U-net OAR models used without manual editing. Vendor-involved (GE Healthcare co-authors) and the paper does not name MR Contour DL, so the level rests on product-identity inference. 2026-08-25 Wave 5C sweep (Europe PMC 2014-2026, alias-gated) found no publication naming this product; no vendor-independent publication identified.",
    clinicalImpactNotes: "Prospective dosimetric comparison showed MR-only automatic contouring + sCT dose differences similar to manual inter-observer variability for most pelvic OARs. No outcome, efficiency or toxicity data; product identity not stated in the paper.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): high implementation burden — evidence is single-centre and vendor-involved; structured pilot, expanded validation and human-factors testing recommended.",
    releaseDate: "2025-04-01",
    lastUpdated: "2026-08-25",
    lastRevised: "2026-11-19",
    source: "FDA 510(k) K242925; press releases; peer-reviewed literature"
  }
];

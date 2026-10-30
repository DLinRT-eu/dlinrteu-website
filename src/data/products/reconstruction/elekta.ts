import { ProductDetails } from "@/types/productDetails";

export const IRISEvo: ProductDetails = {
  id: "elekta-iris",
  trainingData: {
      description: "Per the XVI IFU, the AI component is a deep neural network that maps total projection images to scatter estimates used in the iterative reconstruction. It was trained on Monte Carlo simulated X-ray primary and scatter projections of CT images of the pelvis (method after Maier et al. 2019, deep scatter estimation). Dataset size and demographics not disclosed.",
      disclosureLevel: "partial",
      source: "Elekta Medical Linear Accelerator Instructions for Use Volume 3 - XVI, Document ID 1575840_02 (2025), section 6.15.6; manufacturer document provided to DLinRT, not publicly available",
      sourceAccess: "vendor-provided",
      sourceRetrievedOn: "2026-10-30"
  },
  evaluationData: {
      primaryEndpoint: "Not specified",
      studyDesign: "Software V&V (FDA 510(k))",
      description: "Vendor materials describe Iris as an AI-enhanced CBCT imaging module that provides high-definition images for target visualization and patient positioning, with processing times under 30 seconds.",
      sourceUrl: "https://ir.elekta.com/investors/press-releases/2026/elekta-receives-fda-510k-clearance-for-elekta-evo-linear-accelerator/",
      source: "FDA 510(k) summary (Jan 2026)",
      results: "Not publicly disclosed"
  },
  name: "IRIS Evo",
  market: {
    onMarketSince: "2024",
    distributionChannels: [
      "Integrated with Elekta systems",
      "Software upgrade"
    ]
  },
  partOf: {
    name: "Elekta Evo CT-Linac",
    productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/do-it-all/",
    relationship: "Imaging Module"
  },
  source: "Elekta product pages, brochures and press releases; FDA 510(k) clearance announcement (Jan 2026). Version not publicly published; provisional 1.0.; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)",
  company: "Elekta",
  logoUrl: "/logos/Elekta.png",
  version: "1.0",
  category: "Reconstruction",
  evidence: [
    {
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252188.pdf",
      type: "Regulatory Clearance",
      description: "FDA 510(k) K252188 summary (EMLA: Elekta Evo, Versa HD, Harmony Pro, …), cleared 2026-01-15; High Definition (Iris) reconstruction for pelvic anatomies."
    },
    {
      link: "https://doi.org/10.1016/j.ijrobp.2026.06.1689",
      type: "Conference Abstract",
      description: "Keeler A, Mason J, Joyce T, et al. Quantitative Hounsfield Unit and Dose Calculation Accuracy of Iris CBCT for Head and Neck Radiotherapy. Int J Radiat Oncol Biol Phys 2026;126(1):e471 (ASTRO 2026 abstract)."
    },
    {
      link: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
      type: "Technical Documentation",
      description: "Elekta XVI Instructions for Use Vol. 3, doc 1575840_02 (2025), section 6.15.6: High Definition reconstruction algorithm, deep-learning scatter estimation trained on pelvic CT simulations, pelvis-only availability and limitations. Vendor-provided, not publicly available; retrieved 2026-10-30. Link points to the public product page."
    },
    {
      link: "https://www.elekta.com/products/radiation-therapy/versa-hd/go-further/Go%20further%20with%20Versa%20HD.PDF",
      type: "Vendor White Paper",
      description: "Elekta — Go further with Versa HD: upgrade to Iris high-definition, AI-enhanced CBCT imaging (product brochure)."
    },
    {
      link: "https://www.elekta.com/focus/novel-ai-enhanced-imaging-will-expand-access-to-adaptive-radiation-therapy/",
      type: "Product Information",
      description: "Elekta — Novel AI-enhanced imaging will expand access to adaptive radiation therapy (Focus article)."
    },
    {
      link: "https://www.itnonline.com/content/elekta-launches-ai-powered-adaptive-ct-linac-next-level-cancer-care",
      type: "Press Release",
      description: "Elekta launches AI-powered, adaptive CT-Linac (Elekta Evo with Iris AI-enhanced CBCT) — ITN, May 2024."
    },
    {
      link: "https://ir.elekta.com/investors/press-releases/2026/elekta-receives-fda-510k-clearance-for-elekta-evo-linear-accelerator/",
      type: "Press Release",
      description: "Elekta receives FDA 510(k) clearance for Elekta Evo linear accelerator."
    },
    {
      link: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
      type: "Product Information",
      description: "Official Elekta Evo product page."
    }
  ],
  features: ["Deep learning reconstruction", "CBCT imaging", "Radiotherapy"],
  modality: ["CBCT"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/elekta.ts",
  companyUrl: "https://www.elekta.com/",
  productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/do-it-all",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      status: "cleared",
      regulation: "MDR (EU 2017/745)",
      notes: "CE status per Elekta. Not found in EUDAMED under any Elekta manufacturer (searched 2026-10-30)."
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      clearanceNumber: "K252188",
      productCode: "IYE",
      notes: "Cleared within K252188 'EMLA' (Elekta Evo, Versa HD, Harmony Pro and other Elekta linacs). The 510(k) summary describes the High Definition reconstruction (Polyquant iterative reconstruction with neural-network scatter estimation trained on simulated Monte Carlo data), supported currently for pelvic anatomies only. Verified in the FDA 510(k) database 2026-10-30.",
      status: "510k_cleared",
      decisionDate: "2026-01-15"
    },
    intendedUseStatement: "Iris high-definition, AI-enhanced imaging swiftly enhances image quality, precisely visualizing target areas for every fraction to expedite workflow and evolve the clinical practice. Iris is a component of Elekta medical linear accelerators and is intended to provide high-definition cone-beam CT (CBCT) images for target visualization and patient positioning during radiation therapy. (Source: Elekta Versa HD product brochure, elekta.com, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["On-premise"],
    integration: [
      "Elekta Linacs",
      "Elekta Evo",
      "Monaco TPS",
      "MOSAIQ Oncology Information System"
    ],
    processingTime: "<30 seconds per volume",
    triggerForAnalysis: "Automatic after CBCT acquisition"
  },
  description: "AI-enhanced CBCT reconstruction (XVI 'High Definition') on Elekta linacs: a deep neural network estimates scatter, which feeds an iterative Polyquant reconstruction with total-variation regularization. Per the Elekta XVI IFU, it is currently available only for certain pelvis acquisition presets.",
  keyFeatures: [
    "Deep-learning scatter estimation feeding iterative (Polyquant, pseudo-Huber TV) CBCT reconstruction",
    "Currently available only for certain pelvis acquisition presets (XVI IFU)",
    "Improved soft tissue contrast",
    "Enhanced tumor and organ-at-risk visualization",
    "Integrated within Elekta Evo CT-Linac platform",
    "Seamless integration with Elekta linacs",
    "Available as upgrade for existing Elekta linacs"
  ],
  lastRevised: "2026-10-30",
  lastUpdated: "2026-10-30",
  limitations: [
    "Currently available only for certain pelvis acquisition presets; scatter network trained on pelvic CT-based simulations only (Elekta XVI IFU 1575840_02)",
    "Requires the High Definition licence and the correct collimator and site at acquisition (XVI IFU)",
    "IFU-listed artefacts: streaks and non-uniformity from residual scatter, metal, beam-hardening and truncation; blurring/noise; cone-beam and aliasing artefacts",
    "Only published study is a five-patient head-and-neck conference abstract on a research system (Keeler 2026); no full peer-reviewed paper on the cleared product",
    "Recently launched product (Elekta Evo, May 2024); FDA cleared January 2026",
    "Validation evidence is currently limited to vendor brochures and press releases",
    "Performance tied to Elekta Evo / Versa HD platform; results may vary across linac generations and protocols",
    "Vendor does not publicly publish a numeric version; provisional 1.0 used"
  ],
  releaseDate: "2024-05-14",
  certification: "CE & FDA",
  evidenceRigor: "E1",
  clinicalImpact: "L1t",
  keyPapers: [
    {"doi": "10.1016/j.ijrobp.2026.06.1689", "title": "Quantitative Hounsfield Unit and Dose Calculation Accuracy of Iris CBCT for Head and Neck Radiotherapy", "authors": "Keeler A, Mason J, Joyce T, Paulson ES, Awan MJ, Shukla ME, Omari EA", "journal": "Int J Radiat Oncol Biol Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L1t", "rationale": "Added 2026-10-30 at editor request; DOI metadata verified on Crossref; scored from the abstract, pending reviewer check. Conference abstract (ASTRO 2026 supplement, e471). Five head-and-neck patients reconstructed retrospectively on a research imaging system (not the cleared product); head and neck is outside the cleared pelvis-only use. HU error vs planning CT fell from 110-265 to 20-38 HU (soft tissue) and 285 to 62 HU (bone); gamma 3%/2 mm 58% to 99.4%. Technical image/dose-calculation accuracy (L1t). Likely vendor co-authored (J. Mason, Polyquant author); affiliations not verified.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false}
  ],
  diseaseTargeted: ["Cancer"],
  clinicalEvidence: "Vendor materials describe improved target delineation and image quality with Iris-enhanced CBCT; no independent peer-reviewed validation available yet.",
  adoptionReadiness: "R3",
  anatomicalLocation: ["Pelvis"],
  evidenceRigorNotes: "FDA cleared Jan 2026. Too new for independent publications; supporting evidence limited to vendor brochures and press releases (web-searched 2026-06-01). Wave 5B open question RESOLVED 2026-08-25 — EXCLUDED: the three iterative-CBCT candidates (10.1177/15330338211067312, 10.1016/j.ejmp.2021.11.004, 10.1016/j.ejmp.2021.05.027) all come from one centre (Osaka International Cancer Institute) and recalculate dose with AAA and Acuros XB, i.e. a Varian Eclipse environment; the 'iCBCT' evaluated is Varian's iterative reconstruction, not Elekta IRIS. Neither vendor is named in the abstracts, so they cannot be attributed to IRIS Evo. 2026-10-30: E1 set by Keeler et al. 2026 (IJROBP ASTRO abstract, doi 10.1016/j.ijrobp.2026.06.1689), a small single-centre, likely vendor co-authored technical study on a research system; FDA K252188 verified.",
  clinicalImpactNotes: "L1t: only technical image-quality and dose-calculation accuracy reported (Keeler 2026). Workflow improvement through enhanced CBCT quality for radiotherapy image guidance and adaptive workflows (vendor materials).",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["Raw CBCT projection data"],
    output: ["Enhanced CBCT images"],
    population: "Adult and pediatric",
    inputFormat: ["Elekta proprietary format"],
    outputFormat: ["DICOM"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

export const ELEKTA_PRODUCTS: ProductDetails[] = [IRISEvo];

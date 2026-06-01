import { ProductDetails } from "@/types/productDetails";

export const IRISEvo: ProductDetails = {
  id: "elekta-iris",
  name: "IRIS Evo",
  market: {
    onMarketSince: "2022",
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
  source: "Elekta product pages, brochures and press releases; FDA 510(k) clearance announcement (Jan 2026). Version not publicly published; provisional 1.0.",
  company: "Elekta",
  logoUrl: "/logos/Elekta.png",
  version: "1.0",
  category: "Reconstruction",
  evidence: [
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
  productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "Cleared as part of Elekta Evo CT-Linac system. K-number not yet published in FDA database as of Feb 2026. Available as upgrade for existing Elekta linacs.",
      status: "510k_cleared",
      decisionDate: "2026-01-16"
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
  description: "AI-powered CBCT reconstruction module within Elekta's Evo CT-Linac system that improves image quality for radiation therapy planning and adaptive radiotherapy using deep learning techniques.",
  keyFeatures: [
    "AI-powered CBCT reconstruction",
    "Improved soft tissue contrast",
    "Enhanced tumor and organ-at-risk visualization",
    "Deep learning noise reduction algorithms",
    "Integrated within Elekta Evo CT-Linac platform",
    "Seamless integration with Elekta linacs",
    "Available as upgrade for existing Elekta linacs"
  ],
  lastRevised: "2026-06-01",
  lastUpdated: "2026-06-01",
  limitations: [
    "No independent peer-reviewed publications identified (web-searched 2026-06-01)",
    "Recently launched product (Elekta Evo, May 2024); FDA cleared January 2026",
    "Validation evidence is currently limited to vendor brochures and press releases",
    "Performance tied to Elekta Evo / Versa HD platform; results may vary across linac generations and protocols",
    "Vendor does not publicly publish a numeric version; provisional 1.0 used"
  ],
  releaseDate: "2024-05-14",
  certification: "CE & FDA",
  evidenceRigor: "E1",
  clinicalImpact: "I2",
  diseaseTargeted: ["Cancer"],
  clinicalEvidence: "Vendor materials describe improved target delineation and image quality with Iris-enhanced CBCT; no independent peer-reviewed validation available yet.",
  adoptionReadiness: "R3",
  anatomicalLocation: ["Pelvis"],
  evidenceRigorNotes: "FDA cleared Jan 2026. Too new for independent publications; supporting evidence limited to vendor brochures and press releases (web-searched 2026-06-01).",
  clinicalImpactNotes: "Workflow improvement through enhanced CBCT quality for radiotherapy image guidance and adaptive workflows (vendor materials).",
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

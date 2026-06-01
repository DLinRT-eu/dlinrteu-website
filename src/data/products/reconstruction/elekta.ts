
import { ProductDetails } from "@/types/productDetails";

export const ELEKTA_PRODUCTS: ProductDetails[] = [
  {
    id: "elekta-iris",
    name: "IRIS Evo",
    company: "Elekta",
    category: "Reconstruction",
    description: "AI-powered CBCT reconstruction module within Elekta's Evo CT-Linac system that improves image quality for radiation therapy planning and adaptive radiotherapy using deep learning techniques.",
    features: ["Deep learning reconstruction", "CBCT imaging", "Radiotherapy"],
    certification: "CE & FDA",
    logoUrl: "/logos/Elekta.png",
    companyUrl: "https://www.elekta.com/",
    productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CBCT"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2024-05-14",
    version: "1.0",
    partOf: {
      name: "Elekta Evo CT-Linac",
      productUrl: "https://www.elekta.com/products/radiation-therapy/elekta-evo/",
      relationship: "Imaging Module"
    },
    keyFeatures: [
      "AI-powered CBCT reconstruction",
      "Improved soft tissue contrast",
      "Enhanced tumor and organ-at-risk visualization",
      "Deep learning noise reduction algorithms",
      "Integrated within Elekta Evo CT-Linac platform",
      "Seamless integration with Elekta linacs",
      "Available as upgrade for existing Elekta linacs"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CBCT projection data"],
      inputFormat: ["Elekta proprietary format"],
      output: ["Enhanced CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Elekta Linacs", "Elekta Evo", "Monaco TPS", "MOSAIQ Oncology Information System"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Automatic after CBCT acquisition",
      processingTime: "<30 seconds per volume"
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
        decisionDate: "2026-01-16",
        notes: "Cleared as part of Elekta Evo CT-Linac system. K-number not yet published in FDA database as of Feb 2026. Available as upgrade for existing Elekta linacs."
      },
      intendedUseStatement: "Iris high-definition, AI-enhanced imaging swiftly enhances image quality, precisely visualizing target areas for every fraction to expedite workflow and evolve the clinical practice. Iris is a component of Elekta medical linear accelerators and is intended to provide high-definition cone-beam CT (CBCT) images for target visualization and patient positioning during radiation therapy. (Source: Elekta Versa HD product brochure, elekta.com, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated with Elekta systems", "Software upgrade"],
    },
    evidence: [
      {
        type: "Vendor White Paper",
        description: "Elekta — Go further with Versa HD: upgrade to Iris high-definition, AI-enhanced CBCT imaging (product brochure).",
        link: "https://www.elekta.com/products/radiation-therapy/versa-hd/go-further/Go%20further%20with%20Versa%20HD.PDF"
      },
      {
        type: "Product Information",
        description: "Elekta — Novel AI-enhanced imaging will expand access to adaptive radiation therapy (Focus article).",
        link: "https://www.elekta.com/focus/novel-ai-enhanced-imaging-will-expand-access-to-adaptive-radiation-therapy/"
      },
      {
        type: "Press Release",
        description: "Elekta launches AI-powered, adaptive CT-Linac (Elekta Evo with Iris AI-enhanced CBCT) — ITN, May 2024.",
        link: "https://www.itnonline.com/content/elekta-launches-ai-powered-adaptive-ct-linac-next-level-cancer-care"
      },
      {
        type: "Press Release",
        description: "Elekta receives FDA 510(k) clearance for Elekta Evo linear accelerator.",
        link: "https://ir.elekta.com/investors/press-releases/2026/elekta-receives-fda-510k-clearance-for-elekta-evo-linear-accelerator/"
      },
      {
        type: "Product Information",
        description: "Official Elekta Evo product page.",
        link: "https://www.elekta.com/products/radiation-therapy/elekta-evo/"
      }
    ],
    limitations: [
      "No independent peer-reviewed publications identified (web-searched 2026-06-01)",
      "Recently launched product (Elekta Evo, May 2024); FDA cleared January 2026",
      "Validation evidence is currently limited to vendor brochures and press releases",
      "Performance tied to Elekta Evo / Versa HD platform; results may vary across linac generations and protocols",
      "Vendor does not publicly publish a numeric version; provisional 1.0 used"
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA cleared Jan 2026. Too new for independent publications; supporting evidence limited to vendor brochures and press releases (web-searched 2026-06-01).",
    clinicalImpactNotes: "Workflow improvement through enhanced CBCT quality for radiotherapy image guidance and adaptive workflows (vendor materials).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "Vendor materials describe improved target delineation and image quality with Iris-enhanced CBCT; no independent peer-reviewed validation available yet.",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "Elekta product pages, brochures and press releases; FDA 510(k) clearance announcement (Jan 2026). Version not publicly published; provisional 1.0.",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/elekta.ts"
  }
];

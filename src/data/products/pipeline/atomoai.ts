import { ProductDetails } from "@/types/productDetails";

export const ATOMOAI_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "atomoai-icontour-pipeline",
    name: "iSecare",
    nameHistory: [
      {
        name: "iContour",
        productId: "atomoai-icontour-pipeline",
        function: "Earlier DLinRT listing name for the same GTV/4D-CT ITV segmentation tool",
        sourceUrl: "https://atomoai.ai/services",
        retrievedOn: "2026-10-28",
        notes: "Vendor services page now names the tool iSecare with the same description; the URL ID is kept so old links work.",
      },
    ],
    company: "AtomoAI",
    companyUrl: "https://atomoai.ai/",
    productUrl: "https://atomoai.ai/services",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/atomoai.ts",
    description:
      "Pre-market deep learning tool for automated tumour segmentation in radiotherapy: review and refinement of auto-segmented GTV and 4D-CT-derived ITV contours (vendor-reported). Listed as a pipeline / pre-market entry because no regulatory clearance was found.",
    features: [
      "Auto-segmented GTV contours (vendor-reported)",
      "4D-CT-derived ITV contours (vendor-reported)",
      "Contour review and refinement tool (vendor-reported)"
    ],
    category: "Auto-Contouring",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/atomoai.svg",
    website: "https://atomoai.ai/",
    anatomicalLocation: ["Multiple"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    keyFeatures: [
      "Automated GTV segmentation (vendor-reported)",
      "ITV derived from 4D-CT (vendor-reported)"
    ],
    technicalSpecifications: {
      population: "Not publicly disclosed",
      input: ["CT", "4D-CT"],
      inputFormat: ["DICOM"],
      output: ["Tumour contours"],
      outputFormat: ["Not publicly disclosed"]
    },
    regulatory: {
      ce: { status: "Not applicable" },
      fda: {
        status: "Not applicable",
        notes: "No FDA clearance found (checked 2026-09-26 during the ASTRO 2026 exhibitor review; rechecked 2026-10-28). Update once a clearance is issued."
      },
      intendedUseStatement:
        "Vendor describes iSecare (formerly listed as iContour) as automated tumour segmentation in radiotherapy; no regulatory intended-use statement is published."
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Pre-market product. No peer-reviewed validation naming iContour or iSecare identified (checked 2026-09-26 and 2026-10-28).",
    clinicalImpactNotes: "No clinical impact data available.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "Pre-market: no regulatory clearance found. Pipeline entry only.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-10-28",
    lastRevised: "2026-10-28",
    limitations: [
      "Pre-market — no regulatory clearance found; not available for clinical use",
      "No independent validation publications identified",
      "All capability statements are vendor-reported; anatomical scope beyond 4D-CT (thoracic) targets not stated"
    ],
    source:
      "AtomoAI website (https://atomoai.ai/ and https://atomoai.ai/services, retrieved 2026-09-26; services page rechecked 2026-10-28, now naming the tool 'iSecare'); ASTRO 2026 exhibitor directory (https://amportal.astro.org/exhibitors, retrieved 2026-09-26). Other AtomoAI tools (iTox, iGray, iBot, iCon) are announced as 'coming soon' and are not listed."
  }
];

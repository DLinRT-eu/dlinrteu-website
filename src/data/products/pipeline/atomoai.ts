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
        notes: "No FDA clearance found (checked 2026-09-26 during the ASTRO 2026 exhibitor review; rechecked 2026-10-28 and 2026-11-06 in openFDA). Update once a clearance is issued."
      },
      intendedUseStatement:
        "Vendor describes iSecare (formerly listed as iContour) as automated tumour segmentation in radiotherapy; no regulatory intended-use statement is published."
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Pre-market product. Sarkar S et al. (2025; DOI: 10.1038/s41698-025-00970-1) report multicentre external validation of iSeg. Co-author Mohamed E. Abazeed is AtomoAI's founder and CEO and first author Sagnik Sarkar its technical lead, so this is company-linked research lineage; it does not by itself establish equivalence between iSeg and the advertised iSecare configuration, so the entry stays E0 pending confirmation.",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        doi: "10.1038/s41698-025-00970-1",
        link: "https://doi.org/10.1038/s41698-025-00970-1",
        year: "2025",
        title: "Deep learning for automated, motion-resolved tumor segmentation in radiotherapy",
        authors: "Sarkar S et al.",
        journal: "NPJ Precis Oncol",
        description: "Retrospective multicentre development and external validation of iSeg for lung GTV segmentation and motion-resolved ITV generation (external cohorts of 161 and 102 patients; median DSC 0.70–0.71). Authors include AtomoAI's founder and technical lead. Company-linked research; equivalence to the current iSecare configuration requires confirmation. Not scored for this entry."
      }
    ],
    clinicalImpactNotes: "No clinical impact data available.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "Pre-market: no regulatory clearance found. Pipeline entry only.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-10-28",
    lastRevised: "2026-11-09",
    limitations: [
      "Pre-market — no regulatory clearance found; not available for clinical use",
      "No independent validation publications identified; company-linked iSeg research (Sarkar S et al., 2025) not yet confirmed as the same configuration",
      "All capability statements are vendor-reported; anatomical scope beyond 4D-CT (thoracic) targets not stated"
    ],
    source: "Vendor website"
  }
];

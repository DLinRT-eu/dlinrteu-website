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
        sourceUrl: "https://atomoai.ai/",
        retrievedOn: "2026-10-28",
        notes: "The homepage uses iSecare while indexed services material uses iContour. The historical ID is retained; the naming history does not establish equivalence to the published iSeg research model.",
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
      inputFormat: ["Not publicly disclosed"],
      output: ["Tumour contours"],
      outputFormat: ["Not publicly disclosed"]
    },
    regulatory: {
      ce: { status: "not_available" },
      fda: {
        status: "not_available",
        notes: "No FDA clearance found (checked 2026-09-26 during the ASTRO 2026 exhibitor review; rechecked 2026-10-28 and 2026-11-06 in openFDA). Update once a clearance is issued."
      },
      intendedUseStatement:
        "Vendor describes iSecare (formerly listed as iContour) as automated tumour segmentation in radiotherapy; no regulatory intended-use statement is published."
    },
    structuresUnavailable: true,
    usesAI: true,
    evidence: [
      {"type": "University announcement", "description": "Northwestern identifies AtomoAI commercialization of iSeg; does not establish identical marketed model/version.", "link": "https://inqbationlab.northwestern.edu/news-events/news/2026-08-28_nxt-funding.html"},
      {
        type: "Peer-reviewed Publication",
        doi: "10.1038/s41698-025-00970-1",
        link: "https://doi.org/10.1038/s41698-025-00970-1",
        year: "2025",
        title: "Deep learning for automated, motion-resolved tumor segmentation in radiotherapy",
        authors: "Sarkar S et al.",
        journal: "NPJ Precis Oncol",
        description: "Retrospective multicentre development and external validation of iSeg for lung GTV segmentation and motion-resolved ITV generation (external cohorts of 161 and 102 patients; median DSC 0.70–0.71). Authors include AtomoAI's founder and technical lead. Company-linked research; equivalence to the current iSecare configuration requires confirmation. Not scored for this entry."
      },
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E0 retained. Sarkar et al. 2025 evaluates iSeg, and Northwestern identifies an AtomoAI commercialisation connection; AtomoAI's founder/CEO (Abazeed ME) and technical lead (Sarkar S) are study authors, so this is company-linked research lineage. Exact equivalence to iSecare/iContour is unconfirmed; the research study remains unscored for this product.",
    clinicalImpactNotes: "Research-model validation is not attributed to the marketed tool without model/version equivalence. No product-specific clinical-impact evidence was verified.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "Pre-market: no regulatory clearance found. Pipeline entry only.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-09",
    limitations: [
      "Vendor website (atomoai.ai) was unreachable when checked on 2026-11-10 (HTTP 503 reported by reviewer; certificate error on recheck); product details could not be re-verified against the vendor site",
      "Pipeline entry: no public regulatory clearance verified; this does not establish a regulatory exemption or a legal availability determination",
      "Related company-linked iSeg research exists (Sarkar S et al., 2025); equivalence to iSecare/iContour is not established",
      "All capability statements are vendor-reported; anatomical scope beyond 4D-CT (thoracic) targets not stated"
    ],
    source: "Vendor website"
  }
];

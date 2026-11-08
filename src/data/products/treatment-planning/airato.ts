import { ProductDetails } from "@/types/productDetails";

export const AIRATO_PRODUCTS: ProductDetails[] = [
  {
    id: "airato-ratoai",
    name: "RatoAI",
    company: "AiRato",
    companyUrl: "https://airato.jp/en/",
    productUrl: "https://airato.jp/en/product/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/airato.ts",
    description: "Radiation therapy treatment planning support software from Japanese startup AiRato. According to the vendor, a machine learning model predicts the dose distribution and generates organ contours from CT to assist treatment planning; results are reviewed, corrected and approved by healthcare professionals before use.",
    category: "Treatment Planning",
    secondaryCategories: ["Auto-Contouring"],
    certification: "PMDA",
    logoUrl: "/logos/airato.png",
    website: "https://airato.jp/en/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Cancer"],
    features: [
      "AI dose distribution prediction (vendor-reported)",
      "AI auto-contouring of 100+ organs at risk on CT (vendor-reported)",
      "Clinician review and approval before use"
    ],
    keyFeatures: [
      "50+ dose prediction models covering head & neck, thorax, prostate and cervix (vendor-reported, RatoEra platform page)",
      "Designed around Japanese clinical protocols such as JCOG (vendor-reported)",
      "Japanese Class III (Highly Controlled Medical Device) approval, 24 June 2026"
    ],
    technicalSpecifications: {
      population: "Patients undergoing radiotherapy treatment planning",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Organ contours", "Predicted dose distribution"],
      outputFormat: ["DICOM-RT contour transfer (exact object class not specified)"]
    },
    technology: {
      integration: ["Contour transfer to a treatment planning system"],
      deployment: ["Local Windows 11 workstation"],
      triggerForAnalysis: "Image import from a configured folder",
      processingTime: "Not publicly disclosed"
    },
    regulatory: {
      ce: { status: "not_available", type: "Not applicable", regulation: "No CE marking disclosed" },
      intendedUseStatement: "Radiation therapy treatment planning design software (JMDN 40887003) supporting organ contouring and treatment plan creation; outputs are reviewed, corrected and approved by healthcare professionals. Japanese marketing approval No. 30800BZX00163000, Class III, granted 24 June 2026. (Source: AiRato press release, https://airato.jp/en/ratoai-pressrelease/, accessed 2026-09-26)"
    },
    market: { onMarketSince: "2026", distributionChannels: ["Direct sales (Japan)"] },
    evidence: [
      {"type": "Supporting evidence (not scored)", "description": "RatoGuide research planning study, 12 plans in 11 head-and-neck patients; commercial RatoAI model equivalence unconfirmed.", "link": "https://doi.org/10.1002/acm2.70715"},
      {"type": "Supporting evidence (not scored)", "description": "45-patient prostate RatoGuide/OncoStudio comparison; commercial RatoAI model equivalence unconfirmed.", "link": "https://doi.org/10.1007/s12194-026-01080-8"},
      {"type": "Supporting evidence (not scored)", "description": "RatoGuide research segmentation evaluation, 69 patients; commercial RatoAI model equivalence unconfirmed.", "link": "https://doi.org/10.1002/acm2.70757"},
      {"type": "Regulatory instructions for use", "description": "Official instructions for RatoAI, approval 30800BZX00163000, Class III JMDN 40887003; workstation, folder import and contour transfer specifications.", "link": "https://www.pmda.go.jp/PmdaSearch/kikiDetail/ResultDataSetPDF/113273_30800BZX00163000_1_01_01"},
      {
        type: "Vendor Announcement",
        description: "AiRato press release: RatoAI receives Japanese manufacturing and marketing approval as a Class III device (approval No. 30800BZX00163000, 24 June 2026).",
        link: "https://airato.jp/en/ratoai-pressrelease/"
      },
      {
        type: "Vendor Announcement",
        description: "AiRato product page describing RatoEra auto-contouring, dose prediction (Good Plan) and RatoQA.",
        link: "https://airato.jp/en/product/"
      }
    ],
    evidenceRigor: "E0",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E0 retained. RatoGuide research publications exist, but equivalence of their models/versions to the marketed RatoAI product is not established. PMDA instructions provide product-specific technical information; regulatory documents and related research remain unscored.",
    clinicalImpact: "I0",
    clinicalImpactNotes: "Related RatoGuide studies report segmentation and planning endpoints. These are not assigned to RatoAI until commercial-model equivalence is established.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "R1 retained pending a separate implementation-readiness rubric review. Japanese approval and public instructions are available; related RatoGuide research does not establish validation of the marketed model versions.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    structuresUnavailable: true,
    limitations: ["The full marketed contour library is not publicly enumerated.", "The software predicts dose and does not calculate deliverable treatment dose. Outputs require professional review; performance outside the training and prescription domain is not established."],
    keyPapers: [],
    releaseDate: "2026-06-24",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-09-26",
    source: "PMDA instructions for use; vendor website; related research publications"
  }
];

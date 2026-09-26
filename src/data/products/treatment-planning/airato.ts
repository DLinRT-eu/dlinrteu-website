import { ProductDetails } from "@/types/productDetails";

export const AIRATO_PRODUCTS: ProductDetails[] = [
  {
    id: "airato-ratoai",
    name: "RatoAI",
    company: "AiRato, Inc.",
    companyUrl: "https://airato.jp/en/",
    productUrl: "https://airato.jp/en/product/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/airato.ts",
    description: "Radiation therapy treatment planning support software from Japanese startup AiRato. According to the vendor, a machine learning model predicts the dose distribution and generates organ contours from CT to assist treatment planning; results are reviewed, corrected and approved by healthcare professionals before use.",
    category: "Treatment Planning",
    secondaryCategories: ["Auto-Contouring"],
    certification: "PMDA",
    logoUrl: "/placeholder.svg",
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
      outputFormat: ["Not publicly disclosed"]
    },
    technology: {
      integration: ["Not publicly disclosed"],
      deployment: ["Not publicly disclosed"],
      triggerForAnalysis: "Not publicly disclosed",
      processingTime: "Not publicly disclosed"
    },
    regulatory: {
      ce: { status: "not_available", type: "Not applicable", regulation: "No CE marking disclosed" },
      intendedUseStatement: "Radiation therapy treatment planning design software (JMDN 40887003) supporting organ contouring and treatment plan creation; outputs are reviewed, corrected and approved by healthcare professionals. Japanese marketing approval No. 30800BZX00163000, Class III, granted 24 June 2026. (Source: AiRato press release, https://airato.jp/en/ratoai-pressrelease/, accessed 2026-09-26)"
    },
    market: { onMarketSince: "2026", distributionChannels: ["Direct sales (Japan)"] },
    evidence: [
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
    evidenceRigorNotes: "Added after the ASTRO 2026 exhibitor check (2026-09-26). No peer-reviewed publication naming RatoAI was identified yet; keyPapers is intentionally empty.",
    clinicalImpact: "I0",
    clinicalImpactNotes: "No published clinical, workflow or dosimetric outcome data naming the product.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "Approved in Japan only, with vendor-reported information and no peer-reviewed evidence.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    keyPapers: [],
    releaseDate: "2026-06-24",
    lastUpdated: "2026-09-26",
    lastRevised: "2026-09-26",
    source: "AiRato press release (https://airato.jp/en/ratoai-pressrelease/) and product page (https://airato.jp/en/product/), retrieved 2026-09-26; ASTRO 2026 exhibitor list (https://amportal.astro.org/exhibitors), retrieved 2026-09-26. Training data, evaluation data, integration and deployment are not publicly disclosed."
  }
];

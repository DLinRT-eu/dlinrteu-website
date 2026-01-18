import { ProductDetails } from "@/types/productDetails";

export const LEO_CANCER_CARE_PRODUCTS: ProductDetails[] = [
  {
    id: "leo-marie",
    name: "Marie Upright Patient Positioner",
    company: "Leo Cancer Care",
    category: "Tracking",
    secondaryCategories: ["Reconstruction"],
    description: "Revolutionary upright patient positioner with integrated onboard CT scanner for particle therapy. Enables seated or standing treatment while providing real-time imaging for adaptive radiotherapy.",
    certification: "FDA",
    logoUrl: "/logos/LeoCancerCare.jpg",
    companyUrl: "https://www.leocancercare.com/",
    productUrl: "https://www.leocancercare.com/marie/",
    anatomicalLocation: ["Whole Body"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Upright patient positioning (seated/standing)",
      "Integrated onboard CT scanner",
      "Beam-agnostic (proton, carbon ion, BNCT, FLASH)",
      "Patient rotation instead of gantry rotation",
      "Real-time imaging for adaptive RT",
      "Enhanced patient comfort and accessibility"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Position verification", "Adaptive planning data"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Proton therapy systems", "Carbon ion systems", "BNCT systems"],
      deployment: ["Integrated system"],
      triggerForAnalysis: "Pre-treatment imaging"
    },
    regulatory: {
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        decisionDate: "2025-07-26",
        notes: "Cleared for upright patient positioning in particle therapy"
      },
      intendedUseStatement: "For upright patient positioning during particle therapy with integrated CT imaging."
    },
    market: {
      onMarketSince: "2025"
    },
    evidence: [
      {
        type: "Press Release",
        description: "Leo Cancer Care receives FDA 510(k) clearance for Marie",
        link: "https://leocancercare.com/news-and-events/press-release/leo-cancer-care-receives-fda-510k-clearance-for-marie/"
      }
    ],
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "Leo Cancer Care press release (July 2025)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/tracking/leo-cancer-care.ts"
  }
];

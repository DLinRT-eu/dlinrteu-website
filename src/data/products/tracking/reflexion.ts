import { ProductDetails } from "@/types/productDetails";

export const REFLEXION_PRODUCTS: ProductDetails[] = [
  {
    id: "reflexion-scintix",
    name: "SCINTIX Biology-Guided Radiotherapy",
    company: "RefleXion Medical",
    category: "Tracking",
    secondaryCategories: ["Treatment Planning"],
    description: "First and only biology-guided radiotherapy (BgRT) using real-time PET imaging to autonomously guide radiation delivery. Cancer cells act as biological beacons to direct treatment second-by-second.",
    certification: "FDA",
    logoUrl: "/logos/reflexion.png",
    companyUrl: "https://www.reflexion.com/",
    productUrl: "https://www.reflexion.com/scintix-therapy/",
    anatomicalLocation: ["Thorax", "Bone"],
    modality: ["PET", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Lung Cancer", "Bone Metastases"],
    keyFeatures: [
      "Biology-guided radiotherapy (BgRT)",
      "Real-time PET-guided autonomous delivery",
      "Sub-second latency motion tracking",
      "Tracks periodic and non-periodic motion",
      "FDG radiotracer compatible",
      "Integrated kVCT for anatomic guidance"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["PET (FDG)", "kVCT"],
      inputFormat: ["DICOM"],
      output: ["Beam delivery signals"],
      outputFormat: ["Proprietary"]
    },
    technology: {
      integration: ["RefleXion X1/X2 Platform"],
      deployment: ["Integrated system"],
      triggerForAnalysis: "Continuous during treatment",
      processingTime: "Sub-second latency"
    },
    regulatory: {
      fda: {
        status: "De Novo Cleared",
        class: "Class II",
        type: "De Novo",
        clearanceNumber: "DEN220014",
        productCode: "QVA",
        decisionDate: "2023-02-02",
        notes: "Cleared for FDG-guided treatment of primary and metastatic lung and bone tumors"
      },
      intendedUseStatement: "For biology-guided radiation therapy using FDG-PET to autonomously guide radiation delivery."
    },
    market: {
      onMarketSince: "2023"
    },
    evidence: [
      {
        type: "Regulatory",
        description: "FDA De Novo Authorization",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/DEN220014.pdf"
      }
    ],
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "FDA De Novo database (DEN220014), RefleXion official website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/tracking/reflexion.ts"
  },
  {
    id: "reflexion-x2",
    name: "RefleXion X2 Platform",
    company: "RefleXion Medical",
    category: "Tracking",
    description: "Next-generation theranostic oncology platform with 20-fold increase in PET sensitivity and quadrupled field-of-view (20cm) for enhanced tumor detection and autonomous SCINTIX therapy delivery.",
    certification: "FDA",
    logoUrl: "/logos/reflexion.png",
    companyUrl: "https://www.reflexion.com/",
    productUrl: "https://www.reflexion.com/",
    anatomicalLocation: ["Whole Body"],
    modality: ["PET", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Solid Tumors", "Lung Cancer", "Bone Metastases"],
    keyFeatures: [
      "20-fold increase in PET sensitivity",
      "20cm field-of-view (4x larger than X1)",
      "Sharper images with less noise",
      "Enhanced moving tumor visualization",
      "Dual modality: BgRT + conventional IGRT",
      "Upgradeable from X1 platform"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["PET", "kVCT"],
      inputFormat: ["DICOM"],
      output: ["Beam delivery"],
      outputFormat: ["Proprietary"]
    },
    regulatory: {
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        decisionDate: "2026-01-08",
        notes: "Cleared for SCINTIX therapy (lung/bone tumors) and conventional IGRT for solid tumors anywhere in the body"
      },
      intendedUseStatement: "For radiation therapy delivery with biology-guided and image-guided capabilities."
    },
    market: {
      onMarketSince: "2026"
    },
    evidence: [
      {
        type: "Press Release",
        description: "FDA Clears Next-Generation RefleXion X2 Platform",
        link: "https://www.businesswire.com/news/home/20260108005018/en/FDA-Clears-Next-Generation-RefleXion-Platform"
      }
    ],
    lastUpdated: "2026-01-18",
    lastRevised: "2026-01-18",
    source: "RefleXion press release (Jan 8, 2026)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/tracking/reflexion.ts"
  }
];

import { ProductDetails } from "@/types/productDetails";

export const MD_ANDERSON_PRODUCTS: ProductDetails[] = [
  {
    id: "rpa-radiation-planning-assistant",
    name: "Radiation Planning Assistant (RPA)",
    company: "MD Anderson Cancer Center",
    companyUrl: "https://www.mdanderson.org/",
    productUrl: "https://rpa.mdanderson.org/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/md-anderson.ts",
    description:
      "The Radiation Planning Assistant offers a suite of fully automated contouring and radiotherapy planning tools for various anatomical sites including cervix, breast, head and neck, and brain.",
    features: ["Automated contouring", "Radiotherapy planning", "Multi-anatomical site support", "FDA cleared"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/md_anderson.svg",
    website: "https://rpa.mdanderson.org/",
    supportEmail: "RPA_Info@mdanderson.org",
    anatomicalLocation: ["Cervix", "Post-Mastectomy Breast", "Head and Neck", "Whole Brain"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Cervix Cancer", "Breast Cancer", "Head and Neck Cancer", "Brain Cancer"],
    keyFeatures: [
      "Fully automated contouring tools",
      "Comprehensive radiotherapy planning suite",
      "Multi-anatomical site coverage",
      "Clinical validation and FDA clearance",
      "Integration with treatment planning systems",
      "Free access for global cancer centers"
    ],
    technicalSpecifications: {
      population: "Adult cancer patients",
      input: ["CT images", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Contoured structures", "Treatment plans"],
      outputFormat: ["DICOM-RT"],
    },
    technology: {
      integration: ["Treatment Planning Systems", "Hospital workflows"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Within radiation therapy planning workflow",
      processingTime: "Minutes per case",
    },
    regulatory: {
      ce: {
        status: "Not Available",
        class: "N/A",
        type: "Medical Device",
        notes: "CE marking not obtained. Available primarily for US market and global academic access."
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K222728",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2023-01-20"
      },
      intendedUseStatement:
        "For use in radiation therapy planning to assist in automated contouring and treatment plan creation for cervix, breast, head and neck, and brain cancer cases.",
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Academic partnerships", "Direct licensing", "Free global access"],
    },
    version: "Latest",
    releaseDate: "2020-01-01",
    lastUpdated: "2026-01-02",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database (K222728), MD Anderson Cancer Center official website",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K222728 received January 20, 2023 for Radiation Planning Assistant",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K222728",
      },
      {
        type: "Clinical Study",
        description: "Primary research publication demonstrating clinical efficacy",
        link: "https://doi.org/10.1200/GO.22.00431",
      },
      {
        type: "Publications Database",
        description: "Complete collection of RPA research publications",
        link: "https://rpa.mdanderson.org/publications",
      },
    ],
  },
];

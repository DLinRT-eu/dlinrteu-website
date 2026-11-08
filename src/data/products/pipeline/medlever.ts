import { ProductDetails } from "@/types/productDetails";

export const MEDLEVER_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "medlever-assistant-pipeline",
    evidenceRigorNotes: "Wave 5D indirect context: Med Dosim 2020 (10.1016/j.meddos.2020.07.004, PMID 32807611) evaluates a Medlever workflow-management tool across five sites but predates the catalogued AI products; not scored. 2026-08-28 Batch C sweep: only vendor website/blog content located; no indexed publication names MedLever. E0 stands.",
    name: "MedLever Assistant",
    company: "MedLever, Inc.",
    companyUrl: "https://medlever.com/",
    productUrl: "https://medlever.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/medlever.ts",
    description: "Announced on the MedLever website only as \"MedLever Assistant & Copilot for…\" under \"Coming soon\". MedLever has not published a product description, intended use, feature list or regulatory status (website checked 8 Nov 2026). Listed as pipeline until public details are available.",
    features: [],
    category: "Platform",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/medlever.jpg",
    website: "https://medlever.com/",
    anatomicalLocation: ["Multi-site"],
    modality: ["Multi-modality"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [],
    partOf: {
      name: "MedLever Radiation Oncology Work Management",
      productUrl: "https://medlever.com/",
      relationship: "Feature"
    },
    usesAI: true,
    regulatory: {
      intendedUseStatement:
        "\"Coming Soon.\" Pre-market workflow assistant; no Indications for Use published and no regulatory clearance disclosed. (Source: MedLever company website, https://medlever.com/, retrieved 23 May 2026; re-checked 8 Nov 2026: the site shows \"MedLever Assistant & Copilot for…\" under \"Coming soon\" with no further detail.)",
    },
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-06",
    source: "Company website - listed as 'Coming Soon' (re-checked 8 Nov 2026 after reviewer feedback: earlier description and feature text was not supported by any public source and was removed); Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
  },
  {
    id: "medlever-copilot-pipeline",
    evidenceRigorNotes: "Wave 5D indirect context: Med Dosim 2020 (10.1016/j.meddos.2020.07.004, PMID 32807611) evaluates a Medlever workflow-management tool across five sites but predates the catalogued AI products; not scored. 2026-08-28 Batch C sweep: only vendor website/blog content located; no indexed publication names MedLever. E0 stands.",
    name: "MedLever Copilot",
    company: "MedLever, Inc.",
    companyUrl: "https://medlever.com/",
    productUrl: "https://medlever.com/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/medlever.ts",
    description: "Announced on the MedLever website only as \"MedLever Assistant & Copilot for…\" under \"Coming soon\". MedLever has not published a product description, intended use, feature list or regulatory status (website checked 8 Nov 2026). Listed as pipeline until public details are available.",
    features: [],
    category: "Platform",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/medlever.jpg",
    website: "https://medlever.com/",
    anatomicalLocation: ["Multi-site"],
    modality: ["Multi-modality"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [],
    partOf: {
      name: "MedLever Radiation Oncology Work Management",
      productUrl: "https://medlever.com/",
      relationship: "Feature"
    },
    usesAI: true,
    regulatory: {
      intendedUseStatement:
        "\"Coming Soon.\" Pre-market clinical decision support copilot; no Indications for Use published and no regulatory clearance disclosed. (Source: MedLever company website, https://medlever.com/, retrieved 23 May 2026; re-checked 8 Nov 2026: the site shows \"MedLever Assistant & Copilot for…\" under \"Coming soon\" with no further detail.)",
    },
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-06",
    source: "Company website - listed as 'Coming Soon' (re-checked 8 Nov 2026 after reviewer feedback: earlier description and feature text was not supported by any public source and was removed); Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
  }
];

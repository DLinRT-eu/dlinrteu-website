import { ProductDetails } from "@/types/productDetails";

export const AccuLearning: ProductDetails = {
  id: "manteia-acculearning",
  name: "AccuLearning",
  market: {
    onMarketSince: "2017",
    distributionChannels: ["Direct sales", "OEM partnerships"]
  },
  source: "Automatically retrieved",
  company: "Manteia",
  logoUrl: "/logos/manteia.png",
  version: "N/D",
  website: "https://www.manteiamedical.com/acculearning",
  category: "Platform",
  evidence: [
    {
      link: "https://www.redjournal.org/article/S0360-3016(21)01412-7/pdf",
      type: "Conference Abstract",
      level: "1t",
      description: "Zhang W, Chen Z, Liang Z, Hu Y, Zhou Q. AccuLearning: a user-friendly deep learning auto-segmentation platform for radiotherapy. International Journal of Radiation Oncology, Biology, Physics. 2021 Nov 1;111(3):e122."
    },
    {
      link: "https://www.doi.org/10.3969/j.issn.1006-5725.2024.02.005",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Fei CH, Xiaoqin GO, Yunpeng YU, Tao YO, Xu WA, Chunhua DA, Jing HU. Feasibility of automatic segmentation of CTV and OARs in postoperative radiotherapy for cervical cancer using AccuLearning. Journal of Practical Medicine/Shiyong Yixue Zazhi. 2024 Jan 25;40(2)."
    },
    {
      link: "https://journals.lww.com/dm/fulltext/2025/06000/",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Xu P, Liu Y, Luo J, Han G, Xiao H, He R, Lei L, Chen C, Geng M. Establishment of automatic target delineation for cervical cancer radiotherapy using training algorithm model. Digital Medicine. 2025 Jun 1;11(2):e24-00009."
    },
    {
      link: "https://www.magnetics.or.kr/upload/jom/upfile_260107162424023.pdf",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Shin JT, Shin JB, Lee M, Lee S, Jung NH, Zhou Q, Cho W, Koh M, Han MS. A Study on the Clinical Application of AI-based Auto-Segmentation for Target Volumes in Patients with Breast Cancer after Breast-Conserving Surgery. Journal of Magnetics. 2025 Dec;30(4):764-75."
    },
    {
      link: "https://journals.sagepub.com/doi/abs/10.1177/15330338261426261",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Xie Z, Liu J, Hou L, Feng H, Zhang F, Lu N. A Preliminary Study on the Auto-Segmentation of Targets and Organs at Risk in Pediatric Total Marrow and Lymphoid Irradiation. Technology in Cancer Research & Treatment. 2026 Apr;25:15330338261426261."
    }
  ],
  modality: ["CT", "MRI", "CBCT"],
  useCases: [
    "Clinic-specific OAR models (e.g., post-op anatomy)",
    "Rare tumor target delineation",
    "Adaptive replanning triggers",
    "Dose prediction networks"
  ],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/manteia-acculearning.ts",
  companyUrl: "https://www.manteiamedical.com/",
  productUrl: "https://www.manteiatech.com/acculearning",
  regulatory: {
    ce: {
      type: "Software Development Environment",
      class: "I",
      status: "cleared"
    },
    intendedUseStatement: "AccuLearning is a deep learning–powered platform built for localized, small-sample training in radiation oncology. Designed to help clinics build customized AI models with their own data, it enables smarter, site-specific adaptation and integration across the Manteia ecosystem. (Source: Manteia AccuLearning product page, https://www.manteiatech.com/acculearning, accessed 2026-05-30. No verbatim regulatory IFU available — research-use platform.)"
  },
  technology: {
    deployment: ["On-premises GPU clusters", "Hybrid cloud"],
    integration: ["AccuContour", "MOZI", "PACS"],
    processingTime: "1-4 hours depending on dataset size",
    triggerForAnalysis: "Model training request"
  },
  description: "Localized deep learning platform for clinics to build/train custom AI models for radiation therapy using institutional data.",
  keyFeatures: [
    "Drag-and-drop model builder",
    "Auto-annotation pre-processing",
    "Domain adaptation for scanner differences",
    "Model performance dashboards",
    "One-click deployment to AccuContour/MOZI"
  ],
  lastRevised: "2026-05-30",
  lastUpdated: "2025-08-11",
  releaseDate: "2017-01-01",
  certification: "For research use. Clinical deployment requires separate validation",
  subspeciality: "Radiation Oncology AI",
  anatomicalLocation: ["All Sites"],
  supportedStructures: [
    "Customizable: Define new OARs/targets",
    "Base templates: Brainstem, Parotid (L/R), etc.",
    "Rare structures: Brachytherapy applicators",
    "Institutional variants: LN levels"
  ],
  technicalSpecifications: {
    input: [
      "CT",
      "MRI",
      "Structure sets",
      "Dose matrices"
    ],
    output: [
      "Custom AI contouring models",
      "Custom AI planning models",
      "Custom image domain adaption models",
      "TCP/NTCP models"
    ],
    population: "Institutional data",
    inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
    outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
  }
};

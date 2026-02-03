
import { ProductDetails } from "@/types/productDetails";

export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite (HCAP-Segmentation)",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/everfortune.ts",
    description: "AI-powered head and neck auto-segmentation solution for radiation therapy planning, specialized in comprehensive organ-at-risk delineation for the head and neck region.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ever-fortune.png",
    website: "https://www.everfortuneai.com.tw/en/",
    anatomicalLocation: ["Head & Neck"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer"],
    features: [
      "Head & Neck CT auto-contouring (OARs)",
      "DICOM input and DICOM-RTSTRUCT output",
      "Designed for TPS-based clinician review/edit workflow",
      "Server-based deployment for local hospital networks"
    ],
    keyFeatures: ["Deep learning segmentation", "Head & Neck specialization", "Workflow integration", "Fast processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K220264",
        productCode: "QKB",
        decisionDate: "2022-04-28",
        notes: "HCAP-Segmentation System for head-and-neck CT auto-segmentation"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in the head and neck region for radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "1.0",
    releaseDate: "2022-04-28",
    lastUpdated: "2026-01-15",
    supportedStructures: [
      // Head & Neck Structures - OARs (17 confirmed per FDA clearance)
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Optic Nerve (L/R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Esophagus",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Eye (L/R)",
      "Head & Neck: Lens (L/R)",
      "Head & Neck: Cochlea (L/R)",
      "Head & Neck: Larynx",
      "Head & Neck: Pharyngeal Constrictor"
    ],
    lastRevised: "2026-01-15",
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "Nomenclature standardization for structure names in downstream TPS workflows",
        url: "https://www.aapm.org/pubs/reports/detail.asp?docid=171",
        compliance: "partial"
      }
    ],
    evidence: [
      {
        type: "FDA 510(k) Database Entry",
        description:
          "FDA 510(k) device entry for EFAI RTSuite CT HN-Segmentation System (K220264)",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K220264"
      },
      {
        type: "FDA 510(k) PDF (Decision Letter + Summary)",
        description:
          "FDA 510(k) clearance documentation and summary for K220264",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220264.pdf"
      },
      {
        type: "Company Product Page",
        description:
          "Ever Fortune AI website (company/product context)",
        link: "https://www.everfortuneai.com.tw/en/"
      }
    ],
    limitations: [
      "Assistive software only: outputs must be reviewed, edited, and approved by qualified clinicians before clinical use",
      "Intended for adult patients and non-contrast CT images (per FDA cleared use)",
      "Not intended for lesion detection or clinical decision-making",
      "Performance may vary with CT acquisition protocols and DICOM routing/workflow configuration"
    ],
    source: "FDA 510(k) database (K220264), company official sources"
  },
  {
    id: "everfortune-seg-pro-v3",
    name: "Seg Pro V3 (RT-300)",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/everfortune.ts",
    description: "AI-powered multi-region auto-segmentation solution for radiation therapy planning. First radiotherapy software (QKB) to receive FDA 510(k) clearance with a Predetermined Change Control Plan (PCCP), enabling adaptive AI model updates under predetermined protocols without regulatory re-submission.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ever-fortune.png",
    website: "https://www.everfortuneai.com.tw/en/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Thoracic Cancer", "Abdominal Cancer", "Pelvic Cancer"],
    features: [
      "First radiotherapy software with FDA PCCP authorization",
      "Supports 182 organs across 4 anatomical regions",
      "Full CT and MRI imaging compatibility",
      "Adaptive AI with model re-training under predetermined protocols",
      "Significantly reduces contouring time",
      "DICOM input and DICOM-RTSTRUCT output"
    ],
    keyFeatures: [
      "First radiotherapy software (QKB) with FDA Predetermined Change Control Plan (PCCP)",
      "182 organs across Head & Neck, Chest, Abdomen, and Pelvis",
      "Dual modality support: CT and MRI",
      "Adaptive AI - model updates without re-submission",
      "Fast auto-contouring workflow"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k) with PCCP",
        clearanceNumber: "K251306",
        productCode: "QKB",
        decisionDate: "2026-01-28",
        notes: "First radiotherapy software (QKB) with Predetermined Change Control Plan (PCCP). PCCP allows model updates under predetermined protocols without regulatory re-submission."
      },
      tfda: {
        status: "Approved",
        notes: "Taiwan FDA clearance for global distribution"
      },
      intendedUseStatement: "Seg Pro V3 is intended for automatic segmentation of anatomical structures from radiological images (CT and MRI) for radiation therapy planning."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "3.0",
    releaseDate: "2026-01-28",
    lastUpdated: "2026-02-03",
    supportedStructures: [
      // Head & Neck Structures (representative list - 182 total across all regions)
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Optic Nerve L",
      "Head & Neck: Optic Nerve R",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Esophagus",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      "Head & Neck: Parotid L",
      "Head & Neck: Parotid R",
      "Head & Neck: Submandibular L",
      "Head & Neck: Submandibular R",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Eye L",
      "Head & Neck: Eye R",
      "Head & Neck: Lens L",
      "Head & Neck: Lens R",
      "Head & Neck: Cochlea L",
      "Head & Neck: Cochlea R",
      "Head & Neck: Larynx",
      "Head & Neck: Pharyngeal Constrictor",
      // Thorax Structures
      "Thorax: Lung L",
      "Thorax: Lung R",
      "Thorax: Heart",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Thorax: Aorta",
      "Thorax: Pulmonary Artery",
      "Thorax: Trachea",
      "Thorax: Bronchus L",
      "Thorax: Bronchus R",
      "Thorax: Great Vessels",
      // Abdomen Structures
      "Abdomen: Liver",
      "Abdomen: Kidney L",
      "Abdomen: Kidney R",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Abdomen: Pancreas",
      "Abdomen: Gallbladder",
      "Abdomen: Adrenal L",
      "Abdomen: Adrenal R",
      // Pelvis Structures
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head L",
      "Pelvis: Femoral Head R",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Uterus",
      "Pelvis: Sigmoid Colon",
      "Pelvis: Penile Bulb",
      "Pelvis: Anal Canal"
    ],
    lastRevised: "2026-02-03",
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "Nomenclature standardization for structure names",
        url: "https://www.aapm.org/pubs/reports/detail.asp?docid=171",
        compliance: "partial"
      }
    ],
    evidence: [
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) device entry for Seg Pro V3 (K251306) - First radiotherapy software with PCCP",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K251306"
      },
      {
        type: "Company Product Page",
        description: "Ever Fortune AI official website",
        link: "https://www.everfortuneai.com.tw/en/"
      }
    ],
    limitations: [
      "Assistive software only: outputs must be reviewed, edited, and approved by qualified clinicians before clinical use",
      "Intended for adult patients",
      "Performance may vary with imaging protocols and DICOM configurations",
      "182 organs count is company-stated; specific structure list may vary by version"
    ],
    source: "FDA 510(k) database (K251306), company announcement"
  }
];

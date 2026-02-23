
import { ProductDetails } from "@/types/productDetails";

export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite v1 (HCAP-Segmentation)",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/everfortune.ts",
    description: "Original version of Ever Fortune AI's head and neck auto-segmentation solution for radiation therapy planning. Specialized in comprehensive organ-at-risk delineation for the head and neck region. This product has been succeeded by Seg Pro V3 with expanded multi-region support.",
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
    lastUpdated: "2026-02-03",
    supersededBy: "everfortune-seg-pro-v3",
    supportedStructures: [
      // Head & Neck Structures - OARs (17 confirmed per FDA clearance)
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
      "Head & Neck: Submandibular Gland L",
      "Head & Neck: Submandibular Gland R",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Eye L",
      "Head & Neck: Eye R",
      "Head & Neck: Lens L",
      "Head & Neck: Lens R",
      "Head & Neck: Cochlea L",
      "Head & Neck: Cochlea R",
      "Head & Neck: Larynx",
      "Head & Neck: Pharyngeal Constrictor"
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "Superseded product. FDA cleared (K220264) but no independent peer-reviewed validation.",
    clinicalImpactNotes: "No published clinical impact data. Product superseded by Seg Pro V3.",
    lastRevised: "2026-02-23",
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
      "Performance may vary with CT acquisition protocols and DICOM routing/workflow configuration",
      "This version has been superseded by Seg Pro V3 with expanded multi-region support"
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
    description: "AI-powered multi-region auto-segmentation solution for radiation therapy planning. Version 3 of the RT Suite product line, now with expanded coverage across Head & Neck, Thorax, Abdomen, and Pelvis. First radiotherapy software (QKB) to receive FDA 510(k) clearance with a Predetermined Change Control Plan (PCCP), enabling adaptive AI model updates under predetermined protocols without regulatory re-submission.",
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
    priorVersions: [
      {
        productId: "everfortune-rt-suite",
        name: "RT Suite v1 (HCAP-Segmentation)",
        fdaClearance: "K220264",
        notes: "Original version with Head & Neck CT only. V3 expands to multi-region CT/MRI support with PCCP authorization."
      }
    ],
    supportedStructures: [
      // Head Model (MR) - 11 structures
      "Head-MR: Brainstem",
      "Head-MR: Eye L",
      "Head-MR: Eye R",
      "Head-MR: Hippocampus L",
      "Head-MR: Hippocampus R",
      "Head-MR: Lens L",
      "Head-MR: Lens R",
      "Head-MR: Optic Chiasm",
      "Head-MR: Optic Nerve L",
      "Head-MR: Optic Nerve R",
      "Head-MR: Pituitary",

      // Pelvis-Male Model (MR) - 5 structures
      "Pelvis-MR: Bladder",
      "Pelvis-MR: Penile Bulb",
      "Pelvis-MR: Prostate",
      "Pelvis-MR: Rectum",
      "Pelvis-MR: Seminal Vesicles",

      // Chest Model (CT) - Organs (9)
      "Chest-CT: Chest Wall",
      "Chest-CT: Chest Wall L",
      "Chest-CT: Chest Wall R",
      "Chest-CT: Lungs",
      "Chest-CT: Lung LLL",
      "Chest-CT: Lung LUL",
      "Chest-CT: Lung RLL",
      "Chest-CT: Lung RML",
      "Chest-CT: Lung RUL",

      // Chest Model (CT) - Bones (7)
      "Chest-CT: Clavicle L",
      "Chest-CT: Clavicle R",
      "Chest-CT: Humerus L",
      "Chest-CT: Humerus R",
      "Chest-CT: Scapula L",
      "Chest-CT: Scapula R",
      "Chest-CT: Sternum",

      // Chest Model (CT) - Ribs (27)
      "Chest-CT: Ribs",
      "Chest-CT: Ribs L",
      "Chest-CT: Ribs R",
      "Chest-CT: Rib01 L",
      "Chest-CT: Rib02 L",
      "Chest-CT: Rib03 L",
      "Chest-CT: Rib04 L",
      "Chest-CT: Rib05 L",
      "Chest-CT: Rib06 L",
      "Chest-CT: Rib07 L",
      "Chest-CT: Rib08 L",
      "Chest-CT: Rib09 L",
      "Chest-CT: Rib10 L",
      "Chest-CT: Rib11 L",
      "Chest-CT: Rib12 L",
      "Chest-CT: Rib01 R",
      "Chest-CT: Rib02 R",
      "Chest-CT: Rib03 R",
      "Chest-CT: Rib04 R",
      "Chest-CT: Rib05 R",
      "Chest-CT: Rib06 R",
      "Chest-CT: Rib07 R",
      "Chest-CT: Rib08 R",
      "Chest-CT: Rib09 R",
      "Chest-CT: Rib10 R",
      "Chest-CT: Rib11 R",
      "Chest-CT: Rib12 R",

      // Chest Model (CT) - Vertebrae (13)
      "Chest-CT: VB T",
      "Chest-CT: VB T01",
      "Chest-CT: VB T02",
      "Chest-CT: VB T03",
      "Chest-CT: VB T04",
      "Chest-CT: VB T05",
      "Chest-CT: VB T06",
      "Chest-CT: VB T07",
      "Chest-CT: VB T08",
      "Chest-CT: VB T09",
      "Chest-CT: VB T10",
      "Chest-CT: VB T11",
      "Chest-CT: VB T12",

      // Abdomen Model (CT) - Organs (6)
      "Abdomen-CT: Bowel",
      "Abdomen-CT: Bowel Large",
      "Abdomen-CT: Bowel Small",
      "Abdomen-CT: GI Tract",
      "Abdomen-CT: Adrenal L",
      "Abdomen-CT: Adrenal R",

      // Abdomen Model (CT) - Muscles (9)
      "Abdomen-CT: Gluteus",
      "Abdomen-CT: Gluteus Max L",
      "Abdomen-CT: Gluteus Max R",
      "Abdomen-CT: Gluteus Med L",
      "Abdomen-CT: Gluteus Med R",
      "Abdomen-CT: Gluteus Min L",
      "Abdomen-CT: Gluteus Min R",
      "Abdomen-CT: Iliopsoas L",
      "Abdomen-CT: Iliopsoas R",

      // Abdomen Model (CT) - Bones (6)
      "Abdomen-CT: Bone Pelvic",
      "Abdomen-CT: Bone Pelvic L",
      "Abdomen-CT: Bone Pelvic R",
      "Abdomen-CT: Femur L",
      "Abdomen-CT: Femur R",
      "Abdomen-CT: Sacrum",

      // Abdomen Model (CT) - Vertebrae (9)
      "Abdomen-CT: VB L",
      "Abdomen-CT: VB L1",
      "Abdomen-CT: VB L2",
      "Abdomen-CT: VB L3",
      "Abdomen-CT: VB L4",
      "Abdomen-CT: VB L5",
      "Abdomen-CT: VB LS",
      "Abdomen-CT: VB S",
      "Abdomen-CT: VB S1"
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Liu et al. 2023 hippocampal avoidance WBRT (pubmed/36773828). Cardiac substructures study (pubmed/37585426). Single-center studies on specific applications.",
    clinicalImpactNotes: "Single-center studies demonstrate clinical utility for specific applications (hippocampal avoidance, cardiac substructures).",
    lastRevised: "2026-02-23",
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
        type: "Clinical Implementation",
        description: "CMUH Digital Imaging - EFAI RT Suite implementation details and version updates",
        link: "https://www.cmuh.cmu.edu.tw/CMUHPagesSubDetail/Smart%20Healthcare/DigitalImaging_new/EFAI%20RT%20Suite%20CT%20HCAP-Segmentation%20System_en"
      },
      {
        type: "Peer-reviewed Publication",
        description: "AI-assisted planning pipeline for hippocampal avoidance whole brain radiotherapy",
        link: "https://pubmed.ncbi.nlm.nih.gov/36773828/"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Association of radiation dose to cardiac substructures with major ischaemic events following breast cancer radiotherapy",
        link: "https://pubmed.ncbi.nlm.nih.gov/37585426/"
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
      "102 structures verified from CMUH source; company claims 182 total - additional models may exist"
    ],
    source: "FDA 510(k) database (K251306), CMUH Digital Imaging documentation, company announcement"
  }
];

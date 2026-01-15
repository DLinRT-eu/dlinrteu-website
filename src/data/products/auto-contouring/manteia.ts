
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-accucontour",
    name: "AccuContour",
    company: "Manteia",
    companyUrl: "https://www.manteiatech.com/",
    productUrl: "https://www.manteiatech.com/accucontour",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/manteia.ts",
    description: "AI solution for rapid and accurate auto-contouring in radiation therapy planning, supporting comprehensive OAR and target volume segmentation across all major anatomical regions.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiatech.com/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration", "NRG guideline support", "Target volume contouring"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "2-3 minutes per case"
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
        clearanceNumber: "K191928",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2020-02-28"
      },
      intendedUseStatement: "For assistance in the delineation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
    },
    version: "3.0",
    releaseDate: "2025-09-15",
    lastUpdated: "2026-01-15",
    supportedStructures: [
      // Brain Structures - OARs
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Cerebellum",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L/R)",
      "Brain: Eye (L/R)",
      "Brain: Lens (L/R)",
      "Brain: Lacrimal Gland (L/R)",
      "Brain: Pituitary",
      "Brain: Cochlea (L/R)",
      "Brain: Hippocampus (L/R)",
      "Brain: Temporal Lobe (L/R)",
      "Brain: Hypothalamus",
      
      // Head & Neck Structures - OARs
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Sublingual Gland (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Lips",
      "Head & Neck: Lips_NRG",
      "Head & Neck: Buccal Mucosa",
      "Head & Neck: Larynx",
      "Head & Neck: Glottic Larynx",
      "Head & Neck: Supraglottic Larynx",
      "Head & Neck: Pharyngeal Constrictor Superior",
      "Head & Neck: Pharyngeal Constrictor Middle",
      "Head & Neck: Pharyngeal Constrictor Inferior",
      "Head & Neck: Esophagus",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Thyroid",
      "Head & Neck: Mandible",
      "Head & Neck: Cervical Vertebrae (C1-C7)",
      "Head & Neck: Lymph Node Level IA",
      "Head & Neck: Lymph Node Level IB",
      "Head & Neck: Lymph Node Level II",
      "Head & Neck: Lymph Node Level III",
      "Head & Neck: Lymph Node Level IV",
      "Head & Neck: Lymph Node Level V",
      "Head & Neck: Lymph Node Level VI",
      "Head & Neck: Lymph Node Level VII",
      
      // Head & Neck Target Structures - GTV
      "Head & Neck: GTV Primary",
      "Head & Neck: GTV Nodal",
      
      // Head & Neck Target Structures - Elective
      "Head & Neck: CTV High Risk",
      "Head & Neck: CTV Intermediate Risk",
      "Head & Neck: CTV Low Risk",
      "Head & Neck: PTV High Risk",
      "Head & Neck: PTV Low Risk",
      
      // Thorax Structures - OARs
      "Thorax: Heart",
      "Thorax: Lung (L/R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Brachial Plexus (L/R)",
      "Thorax: Aorta",
      "Thorax: Great Vessels",
      "Thorax: Proximal Bronchial Tree",
      "Thorax: Spinal Cord",
      "Thorax: Spinal Canal",
      "Thorax: Chest Wall",
      "Thorax: Rib (L/R)",
      
      // Thorax Target Structures
      "Thorax: GTV Lung",
      "Thorax: CTV Lung",
      "Thorax: PTV Lung",
      
      // Abdomen Structures - OARs
      "Abdomen: Liver",
      "Abdomen: Kidney (L/R)",
      "Abdomen: Stomach",
      "Abdomen: Pancreas",
      "Abdomen: Spleen",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Abdomen: Gallbladder",
      "Abdomen: Adrenal Gland (L/R)",
      
      // Pelvis Structures - OARs
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Anal Canal",
      "Pelvis: Sigmoid Colon",
      "Pelvis: Femoral Head (L/R)",
      "Pelvis: Bowel Bag",
      "Pelvis: Cauda Equina",
      "Pelvis: Sacrum",
      "Pelvis: Iliac Crest (L/R)",
      "Pelvis: Pelvic Bone (L/R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Urethra",
      "Pelvis: Uterus",
      "Pelvis: Ovary (L/R)",
      "Pelvis: Vagina",
      
      // Pelvis Target Structures - Prostate
      "Pelvis: GTV Prostate",
      "Pelvis: GTV Seminal Vesicle",
      "Pelvis: CTV Prostate",
      "Pelvis: CTV Prostate + SV",
      "Pelvis: CTV Pelvic Nodes",
      "Pelvis: PTV Prostate",
      
      // Pelvis Target Structures - Gynecological
      "Pelvis: GTV Cervix",
      "Pelvis: CTV Cervix",
      "Pelvis: CTV Para-aortic Nodes"
    ],
    lastRevised: "2026-01-15",
    source: "FDA 510(k) database (K191928), company official sources",
    limitations: [
      "Limited performance on contrast-enhanced CT scans",
      "Reduced accuracy for post-surgical anatomy",
      "Lower performance for pediatric patients",
      "Requires manual verification and editing in complex anatomical regions"
    ]
  }
];

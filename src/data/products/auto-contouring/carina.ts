
import { ProductDetails } from "@/types/productDetails";

export const CARINA_PRODUCTS: ProductDetails[] = [
  {
    id: "carina-intcontour",
    name: "INTContour",
    company: "Carina AI",
    companyUrl: "https://www.carinaai.com/",
    productUrl: "https://www.carinaai.com/intcontour.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/carina.ts",
    description: "Fully Customizable AI-Powered OAR & Target Segmentation with Automatic Quality Assurance, supporting comprehensive multi-modality contouring across all anatomical regions.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/carina.jpg",
    website: "https://www.carinaai.com/intcontour.html",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Male Pelvis", "Female Pelvis"],
    modality: ["CT", "MRI", "PET/CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Cloud platform", "Rapid processing", "Multi-modality support", "Target volume contouring"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET/CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic",
      processingTime: "3-5 minutes per case"
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
        clearanceNumber: "K212274",
        decisionDate: "2022-04-01"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "3.0",
    releaseDate: "2025-06-10",
    lastUpdated: "2026-01-21",
    supportedStructures: [
      // ========================================
      // HEAD & NECK MODEL - Approved Structures
      // ========================================
      "Head & Neck: Mandible",
      "Head & Neck: Brachial Plexus (L/R)",
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Oval Cavity",
      "Head & Neck: Cochlea (L/R)",
      "Head & Neck: Eye (L/R)",
      "Head & Neck: Lacrimal Gland (L/R)",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Inner Ear (L/R)",
      "Head & Neck: Temporomandibular Joint (L/R)",
      "Head & Neck: Lens (L/R)",
      "Head & Neck: Temporal Lobe (L/R)",
      "Head & Neck: Larynx",
      "Head & Neck: Middle Ear (L/R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Optic Nerve (L/R)",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Pharynx",
      "Head & Neck: Pituitary",
      "Head & Neck: GTV Lymph Node",
      "Head & Neck: GTV Primary Tumor",
      "Head & Neck: Oral Cavity, NRG Standard",
      "Head & Neck: Cerebellum (L/R)",
      "Head & Neck: Cervical Spine",
      "Head & Neck: Glottis, NRG Standard",
      "Head & Neck: Neck Lymph Node Level III (L/R)",
      "Head & Neck: Neck Lymph Node Level II (L/R)",
      "Head & Neck: Neck Lymph Node Level IVa (L/R)",
      "Head & Neck: Neck Lymph Node Level Ib (L/R)",
      "Head & Neck: Larynx, NRG Standard",
      "Head & Neck: Larynx Supraglottis, NRG Standard",
      "Head & Neck: Lips, NRG Standard",
      "Head & Neck: Cricopharyngeal Muscle",
      "Head & Neck: Inferior Pharyngeal Constrictor",
      "Head & Neck: Middle Pharyngeal Constrictor",
      "Head & Neck: Superior Pharyngeal Constrictor",

      // ========================================
      // THORAX MODEL - Approved Structures
      // ========================================
      "Thorax: Proximal Bronchial Tree",
      "Thorax: Esophagus",
      "Thorax: Heart",
      "Thorax: Lung (L/R)",
      "Thorax: Spinal Canal",
      "Thorax: Spinal Cord",
      "Thorax: Trachea",

      // THORAX MODEL - Investigational Use
      "Thorax: Ascending Aorta (investigational)",
      "Thorax: Breast (L/R) (investigational)",
      "Thorax: Cervical Spine (investigational)",
      "Thorax: Clavicle (L/R) (investigational)",
      "Thorax: Common Carotid Artery (L/R) (investigational)",
      "Thorax: Humerus (L/R) (investigational)",
      "Thorax: Axilla Lymph Node I-III (L/R) (investigational)",
      "Thorax: Internal Mammary Lymph Node (L/R) (investigational)",
      "Thorax: Supraclavicular Lymph Node (L/R) (investigational)",
      "Thorax: Myocardium of Left Ventricle (investigational)",
      "Thorax: Atrium (L/R) (investigational)",
      "Thorax: Cervical Vertebrae C1-C7 (investigational)",
      "Thorax: Lumbar Vertebrae L1-L5 (investigational)",
      "Thorax: Thoracic Vertebrae T1-T12 (investigational)",
      "Thorax: Pulmonary Artery (investigational)",
      "Thorax: Ribs (investigational)",
      "Thorax: Scapula (L/R) (investigational)",
      "Thorax: Sternum (investigational)",
      "Thorax: Thoracic Spine (investigational)",
      "Thorax: Inferior Vena Cava (investigational)",
      "Thorax: Ventricle (L/R) (investigational)",
      "Thorax: Lumbar Spine (investigational)",

      // ========================================
      // ABDOMEN MODEL - Approved Structures
      // ========================================
      "Abdomen: Aorta",
      "Abdomen: Adrenal Gland (L/R)",
      "Abdomen: Esophagus",
      "Abdomen: Gallbladder",
      "Abdomen: Kidney (L/R)",
      "Abdomen: Liver",
      "Abdomen: Pancreas",
      "Abdomen: Portal Vein",
      "Abdomen: Spleen",
      "Abdomen: Splenic Vein",
      "Abdomen: Stomach",
      "Abdomen: Inferior Vena Cava",

      // ABDOMEN MODEL - Investigational Use
      "Abdomen: Lumbar Spine (investigational)",
      "Abdomen: Thoracic Spine (investigational)",

      // ========================================
      // MALE PELVIS MODEL - Approved Structures
      // ========================================
      "Male Pelvis: Bladder",
      "Male Pelvis: Femoral Head (L/R)",
      "Male Pelvis: Penile Bulb",
      "Male Pelvis: Prostate",
      "Male Pelvis: Rectum",
      "Male Pelvis: Seminal Vesicle",

      // MALE PELVIS MODEL - Investigational Use
      "Male Pelvis: Bone Marrow (investigational)",
      "Male Pelvis: Bowel Bag (investigational)",
      "Male Pelvis: Sigmoid Colon (investigational)",
      "Male Pelvis: Duodenum (investigational)",
      "Male Pelvis: Central Gland of Prostate (investigational)",
      "Male Pelvis: Pelvic Lymph Node Group (investigational)",
      "Male Pelvis: Peripheral Zone of Prostate (investigational)",

      // ========================================
      // FEMALE PELVIS MODEL - All Investigational Use
      // ========================================
      "Female Pelvis: Bladder (investigational)",
      "Female Pelvis: Bone Marrow (investigational)",
      "Female Pelvis: Bowel Bag (investigational)",
      "Female Pelvis: Sigmoid Colon (investigational)",
      "Female Pelvis: Small Bowel (investigational)",
      "Female Pelvis: Cauda Equina (investigational)",
      "Female Pelvis: Duodenum (investigational)",
      "Female Pelvis: Femoral Head (L/R) (investigational)",
      "Female Pelvis: Pelvic Lymph Node Group (investigational)",
      "Female Pelvis: Uterus (investigational)",
      "Female Pelvis: Rectum (investigational)"
    ],
    lastRevised: "2026-01-21",
    source: "FDA 510(k) database (K212274), structure list verified against official Carina AI documentation 2026-01-21.",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract"
  }
];

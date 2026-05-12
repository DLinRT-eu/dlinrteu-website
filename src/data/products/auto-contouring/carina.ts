
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
      outputFormat: ["DICOM-RTSTRUCT"]
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
      "Head & Neck: Brachial Plexus L",
      "Head & Neck: Brachial Plexus R",
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Oval Cavity",
      "Head & Neck: Cochlea L",
      "Head & Neck: Cochlea R",
      "Head & Neck: Eye L",
      "Head & Neck: Eye R",
      "Head & Neck: Lacrimal Gland L",
      "Head & Neck: Lacrimal Gland R",
      "Head & Neck: Submandibular Gland L",
      "Head & Neck: Submandibular Gland R",
      "Head & Neck: Inner Ear L",
      "Head & Neck: Inner Ear R",
      "Head & Neck: Temporomandibular Joint L",
      "Head & Neck: Temporomandibular Joint R",
      "Head & Neck: Lens L",
      "Head & Neck: Lens R",
      "Head & Neck: Temporal Lobe L",
      "Head & Neck: Temporal Lobe R",
      "Head & Neck: Larynx",
      "Head & Neck: Middle Ear L",
      "Head & Neck: Middle Ear R",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Optic Nerve L",
      "Head & Neck: Optic Nerve R",
      "Head & Neck: Parotid L",
      "Head & Neck: Parotid R",
      "Head & Neck: Pharynx",
      "Head & Neck: Pituitary",

      // HEAD & NECK MODEL - Investigational Use
      "Head & Neck: GTV Lymph Node (investigational)",
      "Head & Neck: GTV Primary Tumor (investigational)",
      "Head & Neck: Oral Cavity, NRG Standard (investigational)",
      "Head & Neck: Cerebellum L (investigational)",
      "Head & Neck: Cerebellum R (investigational)",
      "Head & Neck: Cervical Spine (investigational)",
      "Head & Neck: Glottis, NRG Standard (investigational)",
      "Head & Neck: Neck Lymph Node Level III L (investigational)",
      "Head & Neck: Neck Lymph Node Level III R (investigational)",
      "Head & Neck: Neck Lymph Node Level II L (investigational)",
      "Head & Neck: Neck Lymph Node Level II R (investigational)",
      "Head & Neck: Neck Lymph Node Level IVa L (investigational)",
      "Head & Neck: Neck Lymph Node Level IVa R (investigational)",
      "Head & Neck: Neck Lymph Node Level Ib L (investigational)",
      "Head & Neck: Neck Lymph Node Level Ib R (investigational)",
      "Head & Neck: Larynx, NRG Standard (investigational)",
      "Head & Neck: Larynx Supraglottis, NRG Standard (investigational)",
      "Head & Neck: Lips, NRG Standard (investigational)",
      "Head & Neck: Cricopharyngeal Muscle (investigational)",
      "Head & Neck: Inferior Pharyngeal Constrictor (investigational)",
      "Head & Neck: Middle Pharyngeal Constrictor (investigational)",
      "Head & Neck: Superior Pharyngeal Constrictor (investigational)",

      // ========================================
      // THORAX MODEL - Approved Structures
      // ========================================
      "Thorax: Proximal Bronchial Tree",
      "Thorax: Esophagus",
      "Thorax: Heart",
      "Thorax: Lung L",
      "Thorax: Lung R",
      "Thorax: Spinal Canal",
      "Thorax: Spinal Cord",
      "Thorax: Trachea",

      // THORAX MODEL - Investigational Use
      "Thorax: Ascending Aorta (investigational)",
      "Thorax: Breast L (investigational)",
      "Thorax: Breast R (investigational)",
      "Thorax: Cervical Spine (investigational)",
      "Thorax: Clavicle L (investigational)",
      "Thorax: Clavicle R (investigational)",
      "Thorax: Common Carotid Artery L (investigational)",
      "Thorax: Common Carotid Artery R (investigational)",
      "Thorax: Humerus L (investigational)",
      "Thorax: Humerus R (investigational)",
      "Thorax: Axilla Lymph Node I-III L (investigational)",
      "Thorax: Axilla Lymph Node I-III R (investigational)",
      "Thorax: Internal Mammary Lymph Node L (investigational)",
      "Thorax: Internal Mammary Lymph Node R (investigational)",
      "Thorax: Supraclavicular Lymph Node L (investigational)",
      "Thorax: Supraclavicular Lymph Node R (investigational)",
      "Thorax: Myocardium of Left Ventricle (investigational)",
      "Thorax: Atrium L (investigational)",
      "Thorax: Atrium R (investigational)",
      "Thorax: Cervical Vertebrae C1-C7 (investigational)",
      "Thorax: Lumbar Vertebrae L1-L5 (investigational)",
      "Thorax: Thoracic Vertebrae T1-T12 (investigational)",
      "Thorax: Pulmonary Artery (investigational)",
      "Thorax: Ribs (investigational)",
      "Thorax: Scapula L (investigational)",
      "Thorax: Scapula R (investigational)",
      "Thorax: Sternum (investigational)",
      "Thorax: Thoracic Spine (investigational)",
      "Thorax: Inferior Vena Cava (investigational)",
      "Thorax: Ventricle L (investigational)",
      "Thorax: Ventricle R (investigational)",
      "Thorax: Lumbar Spine (investigational)",

      // ========================================
      // ABDOMEN MODEL - Approved Structures
      // ========================================
      "Abdomen: Aorta",
      "Abdomen: Adrenal Gland L",
      "Abdomen: Adrenal Gland R",
      "Abdomen: Esophagus",
      "Abdomen: Gallbladder",
      "Abdomen: Kidney L",
      "Abdomen: Kidney R",
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
      "Male Pelvis: Femoral Head L",
      "Male Pelvis: Femoral Head R",
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
      "Female Pelvis: Femoral Head L (investigational)",
      "Female Pelvis: Femoral Head R (investigational)",
      "Female Pelvis: Pelvic Lymph Node Group (investigational)",
      "Female Pelvis: Uterus (investigational)",
      "Female Pelvis: Rectum (investigational)"
    ],
    lastRevised: "2026-05-05",
    source: "FDA 510(k) database (K212274), structure list verified against official Carina AI documentation 2026-01-21.",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract",
    evidenceRigor: "E1",
    evidenceRigorNotes: "Limited peer-reviewed validation (Medical Physics 2023; ESTRO 2022 abstract). Pending broader independent multi-centre evaluation.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Reported geometric accuracy and workflow time savings; no prospective clinical outcome data identified.",
    implementationBurden: "Z2",
    implementationBurdenNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false
  }
];

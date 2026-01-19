
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
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Male Pelvis", "Female Pelvis"],
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
    lastUpdated: "2026-01-19",
    supportedStructures: [
      // ========================================
      // BRAIN - Approved Structures (OARs)
      // ========================================
      "Brain: Brainstem",
      "Brain: Cerebellum",
      "Brain: Cerebrum",
      "Brain: Chiasm",
      "Brain: Cochlea (L/R)",
      "Brain: Eye (L/R)",
      "Brain: Hippocampus (L/R)",
      "Brain: Hypothalamus",
      "Brain: Inner Ear (L/R)",
      "Brain: Lacrimal Gland (L/R)",
      "Brain: Lens (L/R)",
      "Brain: Optic Nerve (L/R)",
      "Brain: Pituitary Gland",
      "Brain: Temporal Lobe (L/R)",
      
      // ========================================
      // HEAD & NECK - Approved Structures (OARs)
      // ========================================
      "Head & Neck: A. Carotid (L/R)",
      "Head & Neck: Arytenoid (L/R)",
      "Head & Neck: Brachial Plexus (L/R)",
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Buccal Mucosa",
      "Head & Neck: Constrictors",
      "Head & Neck: Cricoid",
      "Head & Neck: Cricopharyngeal Muscle",
      "Head & Neck: Esophagus",
      "Head & Neck: Extended Oral Cavity",
      "Head & Neck: Glottic Area",
      "Head & Neck: Larynx",
      "Head & Neck: Lips",
      "Head & Neck: Mandible",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Pharynx",
      "Head & Neck: Spinal Canal",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Supraglottic Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      
      // ========================================
      // THORAX - Approved Structures (OARs)
      // ========================================
      "Thorax: A. Pulmonalis",
      "Thorax: Aorta",
      "Thorax: Atria",
      "Thorax: Brachial Plexus (L/R)",
      "Thorax: Bronchus (L/R)",
      "Thorax: Esophagus",
      "Thorax: Great Vessels",
      "Thorax: Heart",
      "Thorax: LAD",
      "Thorax: Lung (L/R)",
      "Thorax: Mediastinum",
      "Thorax: Pericardium",
      "Thorax: Spinal Canal",
      "Thorax: Spinal Cord",
      "Thorax: Sternum",
      "Thorax: Trachea",
      "Thorax: V. Cava Superior",
      "Thorax: Ventricles",
      
      // ========================================
      // BREAST - Approved Structures (OARs)
      // ========================================
      "Breast: Breast (L/R)",
      "Breast: Chest Wall (L/R)",
      "Breast: Heart",
      "Breast: Lung (L/R)",
      
      // ========================================
      // ABDOMEN - Approved Structures (OARs)
      // ========================================
      "Abdomen: Aorta",
      "Abdomen: Bowel Bag",
      "Abdomen: Duodenum",
      "Abdomen: Gallbladder",
      "Abdomen: Kidney (L/R)",
      "Abdomen: Large Bowel",
      "Abdomen: Liver",
      "Abdomen: Pancreas",
      "Abdomen: Small Bowel",
      "Abdomen: Spinal Canal",
      "Abdomen: Spinal Cord",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: V. Cava Inferior",
      
      // ========================================
      // MALE PELVIS - Approved Structures (OARs)
      // ========================================
      "Male Pelvis: Anal Canal",
      "Male Pelvis: Bladder",
      "Male Pelvis: Bowel Bag",
      "Male Pelvis: Cauda Equina",
      "Male Pelvis: Femoral Head (L/R)",
      "Male Pelvis: Penile Bulb",
      "Male Pelvis: Prostate",
      "Male Pelvis: Rectum",
      "Male Pelvis: Seminal Vesicles",
      "Male Pelvis: Sigmoid",
      "Male Pelvis: Small Bowel",
      "Male Pelvis: Spinal Canal",
      
      // ========================================
      // FEMALE PELVIS - Approved Structures (OARs)
      // ========================================
      "Female Pelvis: Anal Canal",
      "Female Pelvis: Bladder",
      "Female Pelvis: Bowel Bag",
      "Female Pelvis: Cauda Equina",
      "Female Pelvis: Femoral Head (L/R)",
      "Female Pelvis: Kidney (L/R)",
      "Female Pelvis: Ovary (L/R)",
      "Female Pelvis: Rectum",
      "Female Pelvis: Sigmoid",
      "Female Pelvis: Small Bowel",
      "Female Pelvis: Spinal Canal",
      "Female Pelvis: Uterus",
      "Female Pelvis: Vagina",
      
      // ========================================
      // INVESTIGATIONAL USE STRUCTURES
      // These structures are NOT cleared for clinical use
      // ========================================
      
      // Brain - Investigational
      "Brain: CTV (investigational)",
      "Brain: GTV (investigational)",
      "Brain: Meningioma (investigational)",
      "Brain: Metastasis (investigational)",
      
      // Head & Neck - Investigational (Lymph Nodes)
      "Head & Neck: CTV N Elective (investigational)",
      "Head & Neck: CTV N High Risk (investigational)",
      "Head & Neck: CTV P (investigational)",
      "Head & Neck: GTV N (investigational)",
      "Head & Neck: GTV P (investigational)",
      "Head & Neck: LN Level I (investigational)",
      "Head & Neck: LN Level Ia (investigational)",
      "Head & Neck: LN Level Ib (investigational)",
      "Head & Neck: LN Level II (investigational)",
      "Head & Neck: LN Level IIa (investigational)",
      "Head & Neck: LN Level IIb (investigational)",
      "Head & Neck: LN Level III (investigational)",
      "Head & Neck: LN Level IV (investigational)",
      "Head & Neck: LN Level V (investigational)",
      "Head & Neck: LN Level Va (investigational)",
      "Head & Neck: LN Level Vb (investigational)",
      "Head & Neck: LN Level VI (investigational)",
      "Head & Neck: LN Level VII (investigational)",
      "Head & Neck: LN Retropharyngeal (investigational)",
      
      // Thorax - Investigational
      "Thorax: CTV (investigational)",
      "Thorax: GTV (investigational)",
      "Thorax: ITV (investigational)",
      "Thorax: LN Station 1 (investigational)",
      "Thorax: LN Station 2 (investigational)",
      "Thorax: LN Station 3 (investigational)",
      "Thorax: LN Station 4 (investigational)",
      "Thorax: LN Station 5 (investigational)",
      "Thorax: LN Station 6 (investigational)",
      "Thorax: LN Station 7 (investigational)",
      "Thorax: LN Station 8 (investigational)",
      "Thorax: LN Station 10 (investigational)",
      "Thorax: LN Station 11 (investigational)",
      
      // Breast - Investigational
      "Breast: CTV Boost (investigational)",
      "Breast: CTV Breast (investigational)",
      "Breast: LN Axilla Level I (investigational)",
      "Breast: LN Axilla Level II (investigational)",
      "Breast: LN Axilla Level III (investigational)",
      "Breast: LN IMN (investigational)",
      "Breast: LN Interpectoral (investigational)",
      "Breast: LN Supraclavicular (investigational)",
      "Breast: Seroma (investigational)",
      
      // Abdomen - Investigational
      "Abdomen: Adrenal (L/R) (investigational)",
      "Abdomen: Celiac Trunk (investigational)",
      "Abdomen: CTV (investigational)",
      "Abdomen: GTV (investigational)",
      "Abdomen: LN Aortocaval (investigational)",
      "Abdomen: LN Celiac (investigational)",
      "Abdomen: LN Para-aortic (investigational)",
      "Abdomen: LN Portocaval (investigational)",
      "Abdomen: Portal Vein (investigational)",
      "Abdomen: Superior Mesenteric A. (investigational)",
      
      // Male Pelvis - Investigational
      "Male Pelvis: CTV Prostate (investigational)",
      "Male Pelvis: CTV Prostate + SV (investigational)",
      "Male Pelvis: GTV Prostate (investigational)",
      "Male Pelvis: LN Ext. Iliac (investigational)",
      "Male Pelvis: LN Int. Iliac (investigational)",
      "Male Pelvis: LN Obturator (investigational)",
      "Male Pelvis: LN Para-aortic (investigational)",
      "Male Pelvis: LN Presacral (investigational)",
      
      // Female Pelvis - Investigational
      "Female Pelvis: Cervix (investigational)",
      "Female Pelvis: CTV Cervix (investigational)",
      "Female Pelvis: GTV Cervix (investigational)",
      "Female Pelvis: LN Com. Iliac (investigational)",
      "Female Pelvis: LN Ext. Iliac (investigational)",
      "Female Pelvis: LN Int. Iliac (investigational)",
      "Female Pelvis: LN Inguinal (investigational)",
      "Female Pelvis: LN Obturator (investigational)",
      "Female Pelvis: LN Para-aortic (investigational)",
      "Female Pelvis: LN Presacral (investigational)",
      "Female Pelvis: Parametria (investigational)"
    ],
    lastRevised: "2026-01-19",
    source: "FDA 510(k) database (K212274), official product page verified 2026-01-19. Investigational structures listed separately per vendor website.",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract"
  }
];

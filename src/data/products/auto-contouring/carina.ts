
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
      "Brain: Inner Ear (L/R)",
      "Brain: Middle Ear (L/R)",
      "Brain: Temporal Lobe (L/R)",
      "Brain: Hippocampus (L/R)",
      "Brain: Hypothalamus",
      
      // Head & Neck Structures - OARs
      "Head & Neck: Mandible",
      "Head & Neck: Brachial Plexus (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Temporomandibular Joint (L/R)",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Thyroid",
      "Head & Neck: Larynx",
      "Head & Neck: Glottic Larynx",
      "Head & Neck: Supraglottic Larynx",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Pharyngeal Constrictor Superior",
      "Head & Neck: Pharyngeal Constrictor Middle",
      "Head & Neck: Pharyngeal Constrictor Inferior",
      "Head & Neck: Esophagus",
      "Head & Neck: Lymph Node Level IA",
      "Head & Neck: Lymph Node Level IB",
      "Head & Neck: Lymph Node Level II",
      "Head & Neck: Lymph Node Level III",
      "Head & Neck: Lymph Node Level IV",
      "Head & Neck: Lymph Node Level V",
      "Head & Neck: Lymph Node Level VI",
      
      // Head & Neck Target Structures
      "Head & Neck: GTV Primary",
      "Head & Neck: GTV Nodal",
      "Head & Neck: CTV High Risk",
      "Head & Neck: CTV Low Risk",
      "Head & Neck: PTV",
      
      // Thorax Structures - OARs
      "Thorax: Pharynx",
      "Thorax: Pituitary",
      "Thorax: Proximal Bronchial Tree",
      "Thorax: Esophagus",
      "Thorax: Heart",
      "Thorax: Lung (L/R)",
      "Thorax: Spinal Canal",
      "Thorax: Spinal Cord",
      "Thorax: Trachea",
      "Thorax: Aorta",
      "Thorax: Great Vessels",
      "Thorax: Brachial Plexus (L/R)",
      "Thorax: Chest Wall",
      
      // Thorax Target Structures
      "Thorax: GTV Lung",
      "Thorax: CTV Lung",
      
      // Abdomen Structures - OARs
      "Abdomen: Aorta",
      "Abdomen: Lumbar Spine",
      "Abdomen: Adrenal Gland (L/R)",
      "Abdomen: Thoracic Spine",
      "Abdomen: Esophagus",
      "Abdomen: Gallbladder",
      "Abdomen: Kidney (L/R)",
      "Abdomen: Liver",
      "Abdomen: Pancreas",
      "Abdomen: Portal Vein",
      "Abdomen: Spleen",
      "Abdomen: Splenic Vein",
      "Abdomen: Stomach",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Inferior Vena Cava",
      
      // Male Pelvis Structures - OARs
      "Male Pelvis: Bladder",
      "Male Pelvis: Bone Marrow",
      "Male Pelvis: Femoral Head (L/R)",
      "Male Pelvis: Bowel Bag",
      "Male Pelvis: Sigmoid Colon",
      "Male Pelvis: Rectum",
      "Male Pelvis: Penile Bulb",
      "Male Pelvis: Prostate",
      "Male Pelvis: Seminal Vesicles",
      "Male Pelvis: Cauda Equina",
      "Male Pelvis: Small Bowel",
      "Male Pelvis: Duodenum",
      "Male Pelvis: Pelvic Lymph Node Group",
      "Male Pelvis: Urethra",
      
      // Male Pelvis Target Structures
      "Male Pelvis: GTV Prostate",
      "Male Pelvis: CTV Prostate",
      "Male Pelvis: CTV Prostate + SV",
      "Male Pelvis: CTV Pelvic Nodes",
      "Male Pelvis: PTV Prostate",
      
      // Female Pelvis Structures - OARs
      "Female Pelvis: Bladder",
      "Female Pelvis: Bone Marrow",
      "Female Pelvis: Bowel Bag",
      "Female Pelvis: Sigmoid Colon",
      "Female Pelvis: Small Bowel",
      "Female Pelvis: Cauda Equina",
      "Female Pelvis: Duodenum",
      "Female Pelvis: Femoral Head (L/R)",
      "Female Pelvis: Pelvic Lymph Node Group",
      "Female Pelvis: Uterus",
      "Female Pelvis: Cervix",
      "Female Pelvis: Vagina",
      "Female Pelvis: Ovary (L/R)",
      "Female Pelvis: Rectum",
      
      // Female Pelvis Target Structures
      "Female Pelvis: GTV Cervix",
      "Female Pelvis: GTV Uterus",
      "Female Pelvis: CTV Cervix",
      "Female Pelvis: CTV Para-aortic Nodes",
      "Female Pelvis: PTV Cervix"
    ],
    lastRevised: "2026-01-15",
    source: "FDA 510(k) database (K212274), company official sources",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract"
  }
];

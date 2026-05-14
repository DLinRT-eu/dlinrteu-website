
import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mriplanner",
    name: "MRIplanner",
    company: "Spectronic Medical",
    companyUrl: "https://medical.spectronic.se/",
    productUrl: "https://medical.spectronic.se/page-2/page6/index.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/spectronic.ts",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning, with integrated auto-segmentation capabilities.",
    features: ["MR-only workflow", "Deep learning based", "Fast processing", "Synthetic CT generation", "Auto-segmentation"],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/spectronic-medical.jpg",
    website: "https://spectronicmedical.com/mriplanner",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: [
      "Deep learning algorithms",
      "Clinical workflow integration",
      "High anatomical accuracy",
      "Synthetic CT generation",
      "Auto-segmentation capabilities",
      "Brain, head & neck and pelvis sites supported in the GE iRT MR Direct MR-only workflow (ESTRO 2026)"
    ],
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerves",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Submandibular (L)",
      "Head & Neck: Submandibular (R)",
      "Head & Neck: Mandible",
      "Pelvis: Bladder",
      "Pelvis: Rectum", 
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard T1/T2 MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT", "Structure sets"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "GE iRT MR Direct workflow (with MR Contour DL)"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K211841",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2022-08-25"
      },
      intendedUseStatement: "For generating synthetic CT and structure sets from MRI for radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "GE Healthcare partnership (May 2025)"],

},
    version: "3.2",
    releaseDate: "2023-07-10",
    lastUpdated: "2026-05-14",
    lastRevised: "2026-05-14",
    source: "FDA 510(k) database and company website. GE HealthCare ESTRO 2026 press release (12 May 2026) describes MRI Planner (Spectronic Medical, a GE HealthCare company) as the synthetic-CT engine of the iRT MR Direct MR-only workflow across brain, head & neck and pelvis.",
    evidence: [
      {
        type: "Multicenter Study",
        description: "Persson et al. MR-OPERA: A Multicenter/Multivendor Validation of MRI-Only Prostate Treatment Planning Using Synthetic CT Images. Int J Radiat Oncol Biol Phys 2020;108(5):1265-1275.",
        link: "https://doi.org/10.1016/j.ijrobp.2020.07.027"
      },
      {
        type: "Clinical Validation",
        description: "Lerner et al. Clinical validation of a commercially available deep learning software for synthetic CT generation for brain. Radiat Oncol 2021;16:66.",
        link: "https://doi.org/10.1186/s13014-021-01794-6"
      }
    ],
    evidenceRigor: "E2",
    evidenceRigorNotes: "MR-OPERA multicenter/multivendor validation (Persson et al. 2020, 7 centers, 3 countries). Lerner et al. 2021 provides independent brain validation. Strong vendor-independent evidence base.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated: dosimetric accuracy within clinical tolerance across multiple anatomical sites (MR-OPERA, Lerner et al.).",
    implementationBurden: "Z2",
    implementationBurdenNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceExternalValidation: true
  }
];

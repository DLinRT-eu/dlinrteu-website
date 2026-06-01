
import { ProductDetails } from "@/types/productDetails";

export const PYMEDIX_PRODUCTS: ProductDetails[] = [
  {
    id: "pymedix-registration",
    name: "Autofuse",
    company: "PyMedix",
    companyUrl: "https://pymedix.com/",
    productUrl: "https://pymedix.com/autofuse/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/registration/pymedix.ts",
    description: "Advanced medical imaging registration solution with AI-powered alignment algorithms for multi-modal image fusion in radiotherapy planning.",
    features: ["Multi-modal registration", "AI-powered alignment", "Real-time processing", "Clinical workflow integration"],
    category: "Registration",
    certification: "CE & FDA",
    logoUrl: "/logos/pymedix.png",
    website: "https://pymedix.com/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automated multi-modal image registration",
      "AI-enhanced alignment accuracy",
      "Real-time deformation analysis",
      "Seamless TPS integration",
      "Quality assurance metrics"
    ],
    guidelines: [
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Fused images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated workflow",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K233572",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2024-03-06"
      },
      intendedUseStatement: "\"Autofuse is a software package that provides physicians a means for comparison of medical data including imaging data that is DICOM compliant. It allows the display, annotation, volume operation, volume rendering, registration and fusion of medical images as an aid during use by diagnostic radiology, oncology, radiation therapy planning, and other medical specialties.\" (Source: FDA 510(k) K233572 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA K233572 validation. No independent peer-reviewed clinical accuracy publications identified (web-searched 2026-06-01). Note: PyMedix explicitly markets Autofuse as 'machine perception, not deep learning' — flagged for inclusion review against the AI/DL inclusion gate.",
    clinicalImpactNotes: "Workflow improvement through automated multi-modal image registration; no published outcome data.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "Autofuse 510(k) K233572 (Pymedix), cleared 2024-03-06.",
        link: "https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/LLZ/K233572"
      },
      {
        type: "Vendor White Paper",
        description: "Pymedix Autofuse Brochure (2019) — describes the fully automatic 3D deformable image registration approach.",
        link: "https://pymedix.com/wp-content/uploads/2019/04/Pymedix-Autofuse-Brochure-2019.pdf"
      }
    ],
    limitations: [
      "No independent peer-reviewed clinical accuracy or workflow study identified",
      "Vendor describes the algorithm as 'machine perception' rather than deep learning — AI/DL inclusion to be reviewed",
      "No published multi-center or multi-national validation",
      "Limited public information on installed base and clinical adoption"
    ],
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "FDA 510(k) database (K233572), company website. Version 2.1 retained from prior revision — vendor does not publicly publish a numeric version."
  }
];

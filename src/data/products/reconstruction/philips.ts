
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-precise-image",
    name: "Precise Image",
    company: "Philips",
    category: "Reconstruction",
    description: "Advanced CT reconstruction technology that achieves high image quality at lower radiation doses.",
    features: ["Deep learning-based", "Low-dose imaging", "CT modality"],
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiac conditions", "Neurological disorders"],
    releaseDate: "2022-02-01",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based reconstruction for low-dose imaging",
      "Up to 80% radiation dose reduction compared to standard reconstruction",
      "Processes both sparse-view and low-energy acquisitions",
      "Enhanced image clarity and reduced noise"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT data", "Sinogram data"],
      inputFormat: ["Proprietary Philips format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["IntelliSpace Portal", "Philips CT Scanners"],
      deployment: ["On-premise", "Cloud option available"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds for standard scan"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K210760",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        decisionDate: "2022-01-14"
      },
      intendedUseStatement: "Intended for use in CT image reconstruction to provide diagnostic quality images with reduced radiation dose."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated in new CT systems"],
    },
    evidence: [
      {
        type: "Independent Comparative Study",
        description: "Shim et al. 2025: Quantitative evaluation comparing Precise Image and GE TrueFidelity for low-dose CT. J Imaging 2025;11(9):317",
        link: "https://doi.org/10.3390/jimaging11090317"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Impact of Precise Image on image quality and detection of solid lung lesions in chest CT. PMID:40511419, 2025",
        link: "https://pubmed.ncbi.nlm.nih.gov/40511419/"
      },
      {
        type: "Prospective Study",
        description: "Prospective comparison of Precise Image vs iDose4 in normal BMI individuals. PMC12374083, 2025",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12374083/"
      },
      {
        type: "Product Information",
        description: "Official Philips CT Smart Workflow product page",
        link: "https://www.philips.com/healthcare/technology/ct-smart-workflow"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Shim et al. J Imaging 2025 independent comparative vs TrueFidelity. PMID:40511419 lung lesion detection study 2025. Prospective comparison vs iDose4 (PMC12374083). PubMed verified 2026-02-27.",
    clinicalImpactNotes: "Workflow improvement through up to 80% radiation dose reduction.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-02-26",
    lastRevised: "2026-02-26",
    source: "FDA 510(k) database (K210760), Shim et al. J Imaging 2025 (doi:10.3390/jimaging11090317)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts"
  },
  {
    id: "philips-smartspeed",
    name: "SmartSpeed",
    company: "Philips",
    category: "Reconstruction",
    description: "MRI acceleration technology using deep learning reconstruction algorithms to reduce scan times while maintaining image quality. Features AI-based denoising and sharpening for up to 3x faster scanning with up to 80% sharper images.",
    features: ["Deep learning-based", "Fast acquisition", "MRI modality", "AI denoising"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/resources/landing/smartspeed",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Multiple sclerosis", "Cancer", "Musculoskeletal disorders"],
    releaseDate: "2021-06-15",
    version: "3.2",
    keyFeatures: [
      "Up to 3x faster scanning times",
      "Ip to 65% higher resolution",
      "Deep learning reconstruction for undersampled data",
      "Compressed SENSE AI acceleration",
      "Compatible with all anatomical regions",
      "Works with most pulse-sequences. Applicable for 97% of exams",
      "Maintains spatial resolution and image contrast"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MRI k-space data"],
      inputFormat: ["Proprietary Philips format"],
      output: ["Reconstructed MRI images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Philips MRI systems", "IntelliSpace Portal"],
      deployment: ["Integrated in MRI scanner"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Real-time"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K251397",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2025-06-06"
      },
      intendedUseStatement: "SmartSpeed Precise is intended to increase signal-to-noise (SNR), increase sharpness and decrease ringing artefacts in MR images. SmartSpeed Precise is combining denoisers from SmartSpeed AI and Precise Image of the predicate device to increase signal-to-noise ratio (SNR) and to allow higher acceleration factors with equal or better image quality. Similar as Precise Image in the predicate device, contains SmartSpeed Precise anti ringing filtering to increase sharpness and decrease ringing artefacts in MR images. SmartSpeed Precise replaces both SmartSpeed AI and Precise Image in the subject device for 2D Cartesian acquisition. SmartSpeed Precise does not impact the intended use of the device, nor does it raise any new questions of safety and effectiveness.  The user interface provides operators of the system with a new option for selecting SmartSpeed Precise and adjusting the associated level of image noise reduction."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in Philips MRI systems", "Software upgrade"],
    },
    
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Bonn University cardiac MRI case study. PMID:40428199 prospective 3-min knee MRI protocol 2025. PMID:40240275 prospective knee MRI efficiency study. Fransen et al. Eur Radiol 2025 systematic review. PubMed verified 2026-02-27.",
    clinicalImpactNotes: "Workflow improvement through up to 3x faster MRI scanning.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Prospective Study",
        description: "Is a 3-minute knee MRI protocol sufficient for daily clinical practice? SuperResolution with SmartSpeed. PMID:40428199, 2025",
        link: "https://pubmed.ncbi.nlm.nih.gov/40428199/"
      },
      {
        type: "Prospective Study",
        description: "Deep learning in knee MRI: prospective study to enhance efficiency, diagnostic confidence and sustainability. PMID:40240275, 2025",
        link: "https://pubmed.ncbi.nlm.nih.gov/40240275/"
      },
      {
        type: "Systematic Review",
        description: "Fransen et al. The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 2025;35:4736-4746",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      },
      {
        type: "Clinical Case Study",
        description: "Bonn University Hospital - Cardiac MRI time reduced from 60 to 20 minutes using SmartSpeed",
        link: "https://www.philips.com.sg/healthcare/video/philips-mri-enhancement-smartspeed-precise"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for SmartSpeed Precise",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251397.pdf"
      }
    ],
    clinicalEvidence: "Multiple clinical studies showing equivalent diagnostic quality with 30-50% reduced scan times across neurological, musculoskeletal, and body imaging",
    lastUpdated: "2026-02-23", 
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts"
  }
];


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
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K210760",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        decisionDate: "2022-01-14"
      },
      intendedUseStatement: "The Precise Image is a reconstruction software application for a Computed Tomography X-Ray System intended to produce images of the head and body by computer reconstruction of x-ray transmission data taken at different angles and planes. Precise Image uses an Artificial Intelligence powered reconstruction algorithm that is designed for low radiation dose, provides low noise, and improves low contrast detectability. (Source: FDA 510(k) K210760 Summary, accessed 2026-05-30)"
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
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-03-08",
    lastRevised: "2026-05-30",
    source: "FDA 510(k) database (K210760), Shim et al. J Imaging 2025 (doi:10.3390/jimaging11090317)",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts"
  },
  {
    id: "philips-smartspeed",
    name: "MR SmartSpeed",
    company: "Philips",
    category: "Reconstruction",
    description: "MRI acceleration technology that extends Compressed SENSE with a deep-learning reconstruction step applied early in the reconstruction pipeline, enabling up to 3x faster scans and up to 65% greater resolution while remaining compatible with ~97% of clinical protocols.",
    features: ["Deep learning-based", "Fast acquisition", "MRI modality", "Compressed SENSE AI"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/technology/smartspeed-ai",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Multiple sclerosis", "Cancer", "Musculoskeletal disorders"],
    releaseDate: "2022-07-12",
    keyFeatures: [
      "Up to 3x faster scanning",
      "Up to 65% higher resolution",
      "Deep-learning reconstruction extending Compressed SENSE",
      "Applicable to ~97% of clinical protocols",
      "Maintains spatial resolution and image contrast",
      "Compatible across anatomies and pulse sequences"
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
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K213583",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2022-05-16",
        notes: "Cleared as part of Achieva, Ingenia, Ingenia CX, Ingenia Elition and Ingenia Ambition MR Systems. SmartSpeed AI is the deep-learning reconstruction feature on this platform."
      },
      intendedUseStatement: "SmartSpeed is an AI-based MR image reconstruction technology that extends Compressed SENSE by applying a deep-learning algorithm early in the reconstruction process to enable faster acquisitions and higher resolution while preserving image contrast and spatial resolution. (Source: Philips MR SmartSpeed product page and FDA 510(k) K213583, accessed 2026-06-02. No standalone verbatim FDA IFU is published — SmartSpeed is cleared as a feature of the Philips MR systems platform.)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated in Philips MRI systems", "Software upgrade"],
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Bonn University cardiac MRI case study. PMID:40428199 prospective 3-min knee MRI protocol 2025. PMID:40240275 prospective knee MRI efficiency study. Fransen et al. Eur Radiol 2025 systematic review. PubMed verified 2026-06-02.",
    clinicalImpactNotes: "Workflow improvement through up to 3x faster MRI scanning.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
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
        description: "Bonn University Hospital — Cardiac MRI exam time reduced from 60 to 20 minutes using SmartSpeed",
        link: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2022/20220712-philips-spotlights-latest-ai-powered-software-defined-mr-smart-systems-at-ecr-2022.html"
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) K213583 — MR Systems clearance covering SmartSpeed AI (decision 2022-05-16)",
        link: "https://fda.innolitics.com/device/K213583.md"
      }
    ],
    clinicalEvidence: "Multiple clinical studies showing equivalent diagnostic quality with 30-50% reduced scan times across neurological, musculoskeletal, and body imaging",
    lastUpdated: "2026-06-02",
    lastRevised: "2026-06-02",
    source: "Philips MR SmartSpeed product page (usa.philips.com/healthcare/technology/smartspeed-ai); FDA 510(k) K213583; Philips ECR 2022 press release",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts"
  },
  {
    id: "philips-smartspeed-precise",
    name: "SmartSpeed Precise",
    company: "Philips",
    category: "Reconstruction",
    description: "Dual-AI MR reconstruction software combining the SmartSpeed AI denoiser with a Precise Image-style anti-ringing/sharpening engine. For 2D Cartesian acquisitions it replaces both SmartSpeed AI and Precise Image, increasing SNR and enabling higher acceleration factors at equal or better image quality.",
    features: ["Deep learning-based", "Dual AI", "MRI modality", "Anti-ringing", "Higher acceleration"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/technology/smartspeed-precise",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Multiple sclerosis", "Cancer", "Musculoskeletal disorders"],
    releaseDate: "2025-07-02",
    keyFeatures: [
      "Dual-AI reconstruction (SmartSpeed AI denoiser + Precise Image-style anti-ringing)",
      "Increased signal-to-noise ratio (SNR)",
      "Higher acceleration factors at equal or better image quality",
      "Anti-ringing filtering and sharpness enhancement",
      "Replaces SmartSpeed AI and Precise Image for 2D Cartesian acquisition",
      "Operator-adjustable noise-reduction level"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MRI k-space data (2D Cartesian)"],
      inputFormat: ["Proprietary Philips format"],
      output: ["Reconstructed MRI images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Philips MRI systems", "MR Workspace"],
      deployment: ["Integrated in MRI scanner"],
      triggerForAnalysis: "Automatic during acquisition; operator-selectable",
      processingTime: "Real-time"
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
        clearanceNumber: "K251397",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2025-06-04",
        notes: "Cleared as part of Ingenia, Ingenia CX, Ingenia Elition, Ingenia Ambition, BlueSeal, MR 5300 and MR 7700 MR Systems. SmartSpeed Precise is the dual-AI reconstruction feature."
      },
      intendedUseStatement: "SmartSpeed Precise is intended to increase signal-to-noise (SNR), increase sharpness and decrease ringing artefacts in MR images. SmartSpeed Precise is combining denoisers from SmartSpeed AI and Precise Image of the predicate device to increase signal-to-noise ratio (SNR) and to allow higher acceleration factors with equal or better image quality. Similar as Precise Image in the predicate device, contains SmartSpeed Precise anti ringing filtering to increase sharpness and decrease ringing artefacts in MR images. SmartSpeed Precise replaces both SmartSpeed AI and Precise Image in the subject device for 2D Cartesian acquisition. SmartSpeed Precise does not impact the intended use of the device, nor does it raise any new questions of safety and effectiveness. The user interface provides operators of the system with a new option for selecting SmartSpeed Precise and adjusting the associated level of image noise reduction. (Source: FDA 510(k) K251397 Summary, accessed 2026-06-02.)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Integrated in Philips MRI systems", "Software upgrade"],
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Recently FDA-cleared (Jun 2025). Regulatory validation via K251397. Early peer-reviewed evidence emerging — see Eur Radiol 2026 pediatric brain MRI study (doi:10.1007/s00330-026-12482-y) and AJNR 2025 review of DL-based MRI acceleration. No independent multi-center prospective Precise-specific studies identified yet. PubMed searched 2026-06-02.",
    clinicalImpactNotes: "Newly cleared product; clinical-impact data limited to vendor materials and early studies. Workflow benefit anticipated from higher acceleration plus integrated denoising + anti-ringing.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) K251397 — SmartSpeed Precise dual-AI reconstruction (decision 2025-06-04)",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251397.pdf"
      },
      {
        type: "Press Release",
        description: "Philips advances MRI speed and precision with FDA 510(k) clearance of SmartSpeed Precise dual-AI software (Jul 2, 2025)",
        link: "https://www.philips.com/a-w/about/news/archive/standard/news/articles/2025/philips-advances-mri-speed-and-precision-with-fda-510k-clearance-of-smartspeed-precise-dual-ai-software.html"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Deep learning improves image quality in motion-robust and sedation-free pediatric brain MRI. Eur Radiol 2026.",
        link: "https://doi.org/10.1007/s00330-026-12482-y"
      },
      {
        type: "Review",
        description: "Rai et al. Deep Learning–Based Acceleration in MRI: Current Landscape and Clinical Applications in Neuroradiology. AJNR 2025.",
        link: "https://www.ajnr.org/content/early/2025/12/30/ajnr.A8943"
      }
    ],
    lastUpdated: "2026-06-02",
    lastRevised: "2026-06-02",
    source: "FDA 510(k) K251397; Philips SmartSpeed Precise product page (usa.philips.com/healthcare/technology/smartspeed-precise); Philips press releases Feb 26 and Jul 2, 2025",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts"
  }
];



import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-deep-resolve",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213693.pdf",
        source: "FDA 510(k) summary K213693",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        primaryEndpoint: "Image quality and scan time reduction",
        source: "Wilpert et al. Invest Radiol 2025 (DOI: 10.1097/RLI.0000000000001158)",
        studyDesign: "Retrospective multi-center multi-national studies and Software V&V (FDA 510(k))",
        results: "Up to 70% scan acceleration with maintained diagnostic quality.",
        description: "Retrospective studies show 50-70% scan time reduction while maintaining or improving image quality across neuro, MSK, and whole-body applications. Bash et al. demonstrated scan times could be halved across routine neuroradiologic examinations.",
        sourceUrl: "https://doi.org/10.1097/RLI.0000000000001158"
    },
    name: "Deep Resolve",
    company: "Siemens Healthineers",
    category: "Reconstruction",
    description: "AI-powered MRI image reconstruction technology suite using deep learning to accelerate MR scans by up to 70% while improving image quality. Includes Deep Resolve Gain, Sharp, Boost, and Swift Brain components for comprehensive image enhancement across all anatomies.",
    features: ["Deep learning-based", "Scan acceleration", "MRI modality", "Image enhancement"],
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/technologies-and-innovations/deep-resolve",
    anatomicalLocation: ["Whole body", "Brain", "Spine", "MSK", "Abdomen", "Pelvis"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncology", "Cardiac"],
    keyFeatures: [
      "Up to 70% faster brain imaging with maintained diagnostic quality",
      "Deep Resolve Gain: Smart targeted denoising for increased SNR without resolution loss",
      "Deep Resolve Sharp: Neural network for improved image sharpness and resolution",
      "Deep Resolve Boost: Raw data-to-image reconstruction for radically shortened scan times",
      "Deep Resolve Swift Brain: 2-minute total neuro exam with all standard contrasts",
      "Head-to-toe applicability across all anatomies",
      "Combinable with Simultaneous Multi-Slice (SMS) technique for further acceleration"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MRI k-space data", "Acquired MRI data"],
      inputFormat: ["Siemens proprietary format"],
      output: ["Reconstructed MRI images with enhanced SNR and resolution"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["MAGNETOM MRI systems", "syngo MR software platform"],
      deployment: ["Integrated in MRI scanner"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Real-time reconstruction"
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
        clearanceNumber: "K213693, K232322, K250436, K251822",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH, LNI, MOS",
        type: "510(k)",
        decisionDate: "2022-02-25",
        notes: "Initial clearance K213693 (Feb 2022). Product announced September 2020; first FDA clearance February 2022. K250436 for MAGNETOM Flow.Ace/Plus (June 2025). K251822 for MAGNETOM Free.Max/Free.Star (Nov 2025)."
      },
      intendedUseStatement: "The MAGNETOM system is indicated for use as a magnetic resonance diagnostic device (MRDD) that produces transverse, sagittal, coronal and oblique cross sectional images. The system includes Deep Resolve, a deep learning-based image reconstruction technology (Deep Resolve Swift Brain and Deep Resolve Boost) intended to reduce acquisition time and improve image quality by denoising and enhancing sharpness. (Source: FDA 510(k) K213693 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in MAGNETOM MRI systems", "Software upgrade for compatible systems"]
    },
    
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "10+ PubMed-indexed studies. Key: Hakim et al. AJNR 2025 (Deep Resolve Boost neuroradiology evaluation), Wilpert et al. Invest Radiol 2025 (3T brain, DL+acceleration), Ponsiglione et al. Eur Radiol 2024 (whole-body diffusion, 50 patients), Estler et al. Radiol Med 2024 (back pain MRI, 60 patients). PubMed verified 2026-02-26.",
    clinicalImpactNotes: "Workflow improvement through up to 70% faster brain imaging with maintained diagnostic quality across neuro, spine, MSK, and whole-body applications.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E3 + CE + FDA 510(k): mature peer-reviewed multi-center evidence with regulatory clearance; minor local commissioning and user training expected.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Hakim et al. Deep Resolve Boost in 2D MRI for Neuroradiology: Diagnostic Gains and Potential Risks. AJNR Am J Neuroradiol 2025",
        link: "https://doi.org/10.3174/ajnr.A9081"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Wilpert et al. Deep Learning Reconstruction Combined With Conventional Acceleration Improves Image Quality of 3T Brain MRI. Invest Radiol 2025;60(8):526-534",
        link: "https://doi.org/10.1097/RLI.0000000000001158"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Ponsiglione et al. Image quality of whole-body diffusion MR comparing deep-learning accelerated and conventional sequences (50 patients). Eur Radiol 2024;34(12):7985-7993",
        link: "https://doi.org/10.1007/s00330-024-10883-5"
      },
      {
        type: "Indirect — product name not in abstract",
        description: "Estler et al. Deep learning-accelerated image reconstruction in back pain MRI: reduction of acquisition time and improvement of image quality (60 patients). Radiol Med 2024;129(3):478-487. NOTE: abstract describes 'DL-based T2/T1 TSE' but does not name Deep Resolve; relabelled indirect on 2026-06-15 pending full-text confirmation.",
        link: "https://doi.org/10.1007/s11547-024-01787-x"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. Deep learning MRI halves scan time across routine neuroradiologic examinations. Radiology Advances 2025",
        link: "https://doi.org/10.1093/radadv/umaf029"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearances K213693, K232322, K250436",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213693.pdf"
      }
    ],
    clinicalEvidence: "Clinical studies demonstrate 60% increase in patients scanned in under 20 minutes, equivalent diagnostic quality with significantly reduced scan times across neurological, MSK, and body imaging applications.",
    releaseDate: "2022-02-25",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database and company website"
  }
];

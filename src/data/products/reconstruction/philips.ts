import { ProductDetails } from "@/types/productDetails";

export const PreciseImage: ProductDetails = {
  id: "philips-precise-image",
  trainingData: {
      description: "An Artificial Intelligence powered reconstruction algorithm designed for low radiation dose and noise reduction. Developed by Philips and cleared via the FDA 510(k) pathway.",
      disclosureLevel: "minimal",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K210760.pdf",
      source: "FDA 510(k) summary K210760"
  },
  evaluationData: {
      sourceUrl: "https://doi.org/10.3390/jimaging11090317",
      primaryEndpoint: "Image quality, low contrast detectability, and noise level",
      description: "Clinical studies evaluate image quality, noise reduction, and lesion detectability. Greffier et al. (2025) specifically assessed the impact on solid lung lesion detection in chest CT, while other studies compared performance against GE TrueFidelity and Philips iDose4 at reduced dose levels (up to 80% reduction).",
      results: "Claims up to 80% radiation dose reduction compared to standard reconstruction while improving low contrast detectability.",
      source: "Shim et al. J Imaging 2025 (doi:10.3390/jimaging11090317)",
      studyDesign: "Retrospective and prospective comparative evaluations (including Software V&V FDA 510(k))"
  },
  name: "Precise Image",
  market: {
    onMarketSince: "2022",
    distributionChannels: ["Direct sales", "Integrated in new CT systems"]
  },
  source: "FDA 510(k) database (K210760), Shim et al. J Imaging 2025 (doi:10.3390/jimaging11090317)",
  company: "Philips",
  logoUrl: "/logos/philips.png",
  version: "2.0",
  category: "Reconstruction",
  evidence: [
    {
      link: "https://doi.org/10.3390/jimaging11090317",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Shim et al. 2025: Quantitative evaluation comparing Precise Image and GE TrueFidelity for low-dose CT. J Imaging 2025;11(9):317"
    },
    {
      link: "https://www.sciencedirect.com/science/article/pii/S2772652525000031",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Greffier et al. 2025: Impact of Precise Image on image quality and detection of solid lung lesions in chest CT. Res Diagn Interv Imaging. 2025 May 27:14:100062"
    },
    {
      link: "https://doi.org/10.1177/2050312125133604",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Shivakumar et al. 2025 A comparison of the image quality between deep learning reconstruction algorithm and iDose4 using low dose abdominopelvic computed tomography for individuals with normal BMI. Sage Open Medicine"
    },
    {
      link: "https://doi.org/10.1016/j.ejmp.2024.103319",
      type: "Peer-Reviewed Publication",
      level: "1t",
      description: "Tomasi et al. 2024: A CT deep learning reconstruction algorithm: Image quality evaluation for brain protocol at decreasing dose indexes in comparison with FBP and statistical iterative reconstruction algorithms; Physica Medica 2024;119:103319"
    }
  ],
  features: ["Deep learning-based", "Low-dose imaging", "CT modality"],
  modality: "CT",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts",
  companyUrl: "https://www.philips.com/healthcare",
  productUrl: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "510(k)",
      class: "II",
      status: "Cleared",
      productCode: "JAK",
      decisionDate: "2022-01-14",
      clearanceNumber: "K210760",
      regulationNumber: "21 CFR 892.1750"
    },
    intendedUseStatement: "The Precise Image is a reconstruction software application for a Computed Tomography X-Ray System intended to produce images of the head and body by computer reconstruction of x-ray transmission data taken at different angles and planes. Precise Image uses an Artificial Intelligence powered reconstruction algorithm that is designed for low radiation dose, provides low noise, and improves low contrast detectability. (Source: FDA 510(k) K210760 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["On-premise", "Cloud option available"],
    integration: ["IntelliSpace Portal", "Philips CT Scanners"],
    processingTime: "<30 seconds for standard scan",
    triggerForAnalysis: "Automatic post-acquisition"
  },
  description: "Advanced CT reconstruction technology that achieves high image quality at lower radiation doses.",
  keyFeatures: [
    "Deep learning-based reconstruction for low-dose imaging",
    "Up to 80% radiation dose reduction compared to standard reconstruction",
    "Processes both sparse-view and low-energy acquisitions",
    "Enhanced image clarity and reduced noise"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2022-02-01",
  certification: "CE Mark",
  evidenceRigor: "E2",
  clinicalImpact: "I2",
  diseaseTargeted: ["Cancer", "Cardiac conditions", "Neurological disorders"],
  adoptionReadiness: "R3",
  anatomicalLocation: ["Whole body"],
  evidenceRigorNotes: "Shim et al. J Imaging 2025 independent comparative vs TrueFidelity. PMID:40511419 lung lesion detection study 2025. Prospective comparison vs iDose4 (PMC12374083). PubMed verified 2026-02-27.",
  clinicalImpactNotes: "Workflow improvement through up to 80% radiation dose reduction.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["Raw CT data", "Sinogram data"],
    output: ["Reconstructed CT images"],
    population: "Adult and pediatric",
    inputFormat: ["Proprietary Philips format"],
    outputFormat: ["DICOM"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

export const PHILIPS_PRODUCTS: ProductDetails[] = [PreciseImage];


import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-uai-vision-recon",
    name: "uAIFI",
    company: "United Imaging",
    category: "Reconstruction",
    description: "Deep learning-based CT reconstruction technology that reduces radiation dose while enhancing image quality.",
    features: ["AI-powered", "Low-dose CT", "Deep learning reconstruction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/ct",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2022-03-15",
    version: "2.0",
    keyFeatures: [
      "Deep neural network reconstruction",
      "Ultra-low dose imaging capabilities",
      "Reduced image noise",
      "Enhanced structural detail",
      "Improved contrast resolution"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uCT scanners", "uCloud platform"],
      deployment: ["On-scanner", "Cloud option available"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds per dataset"
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
        notes: "Cleared as part of United Imaging CT system clearances (e.g., K241166 for uCT 550). AI reconstruction is integrated feature."
      },
      intendedUseStatement: "Deep Recon is a data driven image reconstruction method based on deep learning technology. It is intended to produce cross-sectional images by computer reconstruction of X-ray transmission data taken at different angles and planes, including Axial, Helical, and Cardiac acquisition. Deep Recon is designed to generate CT images with lower image noise, and improved low contrast detectability, and it can reduce the dose required for diagnostic CT imaging. (Source: FDA 510(k) K193073 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated in CT systems"],
    },
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Liao S. et al. Fast and low-dose medical imaging generation empowered by hybrid deep-learning and iterative reconstruction. Cell Rep Med 2023;4(7):101119. (United Imaging-affiliated authors; covers DL+iterative recon technology underlying uAIFI.)",
        link: "https://doi.org/10.1016/j.xcrm.2023.101119"
      },
      {
        type: "FDA 510(k) Summary",
        description: "Deep Recon 510(k) K193073 (Shanghai United Imaging Healthcare), cleared 2020-07-06.",
        link: "https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/JAK/K193073"
      },
      {
        type: "Product Information",
        description: "uAIFI Technology product page (United Imaging).",
        link: "https://global.united-imaging.com/en/product-service/products/mr/uaifi-technology"
      }
    ],
    limitations: [
      "Available peer-reviewed publication has vendor-affiliated authorship; no fully independent multi-center validation identified",
      "Performance tied to United Imaging uCT hardware and proprietary acquisition pipeline",
      "Dose-reduction claims require local protocol validation",
      "No published radiotherapy-planning-specific validation"
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA K193073 (Deep Recon) clearance plus Liao et al. Cell Rep Med 2023 — peer-reviewed, vendor-affiliated. No independent multi-center publication identified (web-searched 2026-06-01).",
    clinicalImpactNotes: "Technical efficacy demonstrated in vendor-affiliated peer-reviewed work (lower noise, dose-reduction potential). No independent clinical-outcome data.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "Emerging clinical evidence showing significant dose reduction with maintained diagnostic accuracy",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "FDA 510(k) database (K193073), peer-reviewed literature, company website."

  },
  {
    id: "united-uaifi-umr",
    name: "uAIFI on uMR",
    company: "United Imaging",
    category: "Reconstruction",
    description: "Deep learning-based MRI reconstruction that reduces acquisition time while increasing image quality.",
    features: ["AI-powered", "Deep learning reconstruction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://eu.united-imaging.com/en/product-service/products/mr/uaifi-technology",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2020-05-05",
    version: "2.0",
    keyFeatures: [
      "Deep neural network reconstruction",
      "Reduced image noise",
      "Enhanced structural detail",
      "Improved contrast resolution"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["Raw MRI data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed MRI"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uMR scanners", "uCloud platform"],
      deployment: ["On-scanner"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds per dataset"
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
        notes: "Cleared as part of United Imaging MR system clearances. AI reconstruction is integrated feature."
      },
      intendedUseStatement: "The uMR 680 system [with uAIFI] is indicated for use as a magnetic resonance diagnostic device (MRDD) that produces sagittal, transverse, coronal, and oblique cross sectional images, and spectroscopic images, and that display internal anatomical structure and/or function of the head, body and extremities. The system utilizes uAIFI Technology (including DeepRecon) to provide AI-enhanced image reconstruction for improved SNR and resolution. (Source: FDA 510(k) K222755 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Integrated in MRI systems"],

},
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "uMR 680 510(k) K222755 (Shanghai United Imaging Intelligence), cleared 2023-02-16 — clears the uMR 680 with uAIFI Technology (including DeepRecon) for AI-enhanced MR reconstruction.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K222755.pdf"
      },
      {
        type: "FDA 510(k) Summary",
        description: "Deep Recon 510(k) K193073 (Shanghai United Imaging Healthcare), cleared 2020-07-06 — predicate for the MR DeepRecon component of uAIFI.",
        link: "https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/JAK/K193073"
      },
      {
        type: "Product Information",
        description: "uAIFI Technology product page (United Imaging) — describes DeepRecon, EasySense and related uMR components.",
        link: "https://eu.united-imaging.com/en/product-service/products/mr/uaifi-technology"
      },
      {
        type: "Product Information",
        description: "uMR 680: uAIFI DeepRecon + EasySense product page (United Imaging).",
        link: "https://global.united-imaging.com/en/product-service/products/mr/umr-680"
      }
    ],
    limitations: [
      "No independent peer-reviewed validation identified for uAIFI on uMR (web-searched 2026-06-01)",
      "Clinical performance data is largely vendor-sourced (white papers, product pages, regulatory submissions)",
      "Performance tied to specific uMR scanner generation and pulse-sequence configuration",
      "No radiotherapy-planning-specific validation published"
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA K222755 (uMR 680 with uAIFI) and predicate K193073 (DeepRecon). No independent peer-reviewed publication identified (web-searched 2026-06-01).",
    clinicalImpactNotes: "No independently demonstrated clinical impact. Vendor describes SNR/resolution gains and acquisition-time reduction in product materials.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "Emerging clinical evidence showing increase image quality",
    lastUpdated: "2026-06-01",
    lastRevised: "2026-06-01",
    source: "FDA 510(k) database (K222755, K193073), United Imaging product pages.",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/united-imaging.ts"

  },
  {
    id: "united-hd-tof",
    name: "HD TOF 2.0",
    company: "United Imaging",
    category: "Reconstruction",
    description: "AI-powered PET reconstruction technology that enhances time-of-flight imaging for improved resolution and quantitation.",
    features: ["Deep learning reconstruction", "Enhanced TOF", "PET modality"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/molecular-imaging",
    anatomicalLocation: ["Whole body"],
    modality: ["PET"],
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiac diseases"],
    releaseDate: "2021-09-10",
    version: "2.0",
    keyFeatures: [
      "Deep learning-enhanced TOF reconstruction",
      "Ultra-high definition PET images",
      "Improved small lesion detectability",
      "Enhanced quantitative accuracy",
      "Reduced scan times or injected dose"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw PET sinogram data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uMI PET/CT systems", "uPMR PET/MR systems"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "<60 seconds per study"
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
        notes: "Cleared as part of United Imaging PET/CT and PET/MR system clearances. AI reconstruction is integrated feature."
      },
      intendedUseStatement: "The uPMR 790 system combines magnetic resonance diagnostic devices (MRDD) and Positron Emission Tomography (PET) scanners that provide registration and fusion of high resolution physiologic and anatomic information, acquired simultaneously and iso-centrically. The PET provides distribution information of PET radiopharmaceuticals within the human body to assist healthcare providers in assessing the metabolic and physiological functions. HD TOF reconstruction is a deep-learning enhanced PET reconstruction module for this system. (Source: FDA 510(k) K183014 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in new PET systems", "Upgrade option"],

},
    evidence: [
      {
        type: "Company News / Product Context",
        description:
          "United Imaging news item describing 'SiPM-based HD TOF (time of flight)' as part of their PET/MR technology stack (uPMR 790 context).",
        link: "https://ja.united-imaging.com/news-center/uih-news-list/2022-05-18-en"
      },
      {
        type: "Company Product Landing Page",
        description:
          "United Imaging molecular imaging product portfolio (PET/CT & PET/MR).",
        link: "https://eu.united-imaging.com/en/product-service"
      }
    ],
    limitations: [
      "Performance depends on scanner hardware, reconstruction settings, and acquisition protocol; results may vary by system configuration",
      "AI-enhanced reconstruction outputs require qualified clinician review as part of standard image QA processes",
      "Claims about scan-time or injected-dose reduction depend on clinical indication and should be validated within site-specific workflows"
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "No independent peer-reviewed publications. Company product descriptions only. PubMed searched 2026-02-26.",
    clinicalImpactNotes: "No independently demonstrated clinical impact. PubMed searched 2026-02-26.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    clinicalEvidence: "United Imaging describes HD TOF (time-of-flight) capability as part of its PET technology stack; quantitative improvements and scan-time/dose tradeoffs depend on local protocol and system configuration.",
    lastUpdated: "2026-03-08",
    lastRevised: "2026-05-30",
    source: "FDA 510(k) database and company website",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/united-imaging.ts"

  }
];

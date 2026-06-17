
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_SMARTDOSE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-smartdose-ct-enhancement",
    trainingData: {
        description: "The model is a deep learning-based CT image enhancement solution trained to generate images with an appearance similar to traditional filtered back-projection (FBP) while reducing dose and improving image quality",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K210760.pdf",
        source: "FDA 510(k) summary K210760",
        demographics: "Adult",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        primaryEndpoint: "Diagnostic equivalence to FBP at reduced dose",
        results: "No external clinical study was required for the original 510(k) clearance. A sponsor-run comparative image evaluation of 55 image-set pairs (Precise Image vs. predicate Incisive CT and reference Brilliance iCT) was assessed by 6 board-certified radiologists on a 5-point Likert scale (diagnostic confidence, sharpness, noise level, image texture, artifacts). A later 510(k) extension (K232491, CT 5300 platform) included a second sponsor-run comparative read of 126 image-set pairs from 31 patients, finding half-dose Precise Image images of equal or greater diagnostic quality versus full-dose FBP. Neither reader study was independently published.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K210760.pdf",
        studyDesign: "Software V&V (FDA 510(k)); sponsor-run comparative reader studies",
        description: "FDA 510(k) clearance K210760 (decision January 14, 2022) for the original Precise Image algorithm on the Philips Incisive CT system. Extended via K232491 (decision May 3, 2024) to the CT 5300 platform with additional reconstruction models.",
        source: "FDA 510(k) summaries K210760"
    },
    name: "Precise Image",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/philips-smartdose.ts",
    description: "AI-driven solution for enhancing low-dose CT images to achieve diagnostic quality comparable to standard dose acquisitions.",
    features: ["Low-dose CT enhancement", "Increased user consistency", "Reduced interventional procedure time"],
    category: "Image Enhancement",  
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
    anatomicalLocation: ["Head", "Whole body", "Vascular"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Pulmonary disease", "Cardiovascular disorders"],
    releaseDate: "2022-01-14",
    version: "Not publicly disclosed (initial 510(k) K210760, January 2022; extended via K232491 for CT 5300, May 2024)",
    keyFeatures: [
      "Deep learning-based CT image enhancement",
      "Specialized for low-dose CT images",
      "Reduces image noise while preserving details",
      "Improves contrast-to-noise ratio",
      "Compatible with existing PACS systems",
      "Five adjustable reconstruction strength settings"
    ],
    limitations: [
      "Not indicated for pediatric subjects — adult use only per FDA 510(k) K210760",
      "Tight vendor integration — deployable only on Philips Incisive CT and CT 5300 platforms",
      "Independent clinical evidence limited to two small single-center studies (n=30, n=60), each with a Philips-affiliated co-author; no multicenter trials identified",
      "Reported dose-reduction figures are phantom-derived or simulated, not measured in actual reduced-dose patient scans",
    ],
    technicalSpecifications: {
      population: "Adult only (not indicated for pediatric subjects)",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Philips Incisive CT", "Philips CT 5300", "IntelliSpace Portal"],
      deployment: ["On-premise server", "Cloud option"],
      triggerForAnalysis: "Automatic or on-demand",
      processingTime: "<40 seconds per series"
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
        productCode: "JAK",
        regulationNumber: "21 CFR 892.1750",
        decisionDate: "2022-01-14",
        notes: "Original clearance for Precise Image on predicate Philips Incisive CT (K180015), reference device Brilliance iCT (K162838). Extended to the CT 5300 platform via K232491 (decision May 3, 2024)."
      },
      intendedUseStatement: "Precise Image is a reconstruction software application for a Computed Tomography X-Ray System intended to produce images of the head and body by computer reconstruction of x-ray transmission data. Precise Image has been evaluated and is available on preselected reference protocols for adult subjects only; it is not indicated for use in pediatric subjects. The CT system with Precise Image is indicated for head, whole body, and vascular X-ray CT applications for diagnostic imaging. (Source: FDA 510(k) K210760 Summary, accessed 2026-06-17)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated solution"],

},
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "E1 (Preliminary): evidence comprises four independent peer-reviewed phantom studies (Greffier 2022/2023 — France; Barca 2023 — Italy; Shim 2025 — South Korea) and two single-center clinical (patient) studies (Chandran 2024, n=30, brain CT, India; Liu 2026, n=60, abdominal CT, China). Neither clinical study is multi-center or fully vendor-independent (each has one Philips-affiliated co-author), and the Liu 2026 dose-reduction estimate (~80%) is simulated via slice-thickness substitution rather than measured at an actual reduced dose. No multi-center cohort, large prospective dose-reduction trial, or fully independent clinical study meets the E2 bar (multi-center, large prospective cohort, external validation).",
    clinicalImpactNotes: "I2 (Workflow / diagnostic accuracy, F&T Level 2): two independent clinical studies (Chandran 2024; Liu 2026) found radiologist-assessed diagnostic image quality improvements over iDose4 across two anatomical regions and two countries, corroborated by independent phantom evidence on noise reduction and lesion detectability (Greffier 2022/2023; Barca 2023; Shim 2025). No evidence identified of changed treatment management (I3) or patient outcomes (I4).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation of the five adjustable reconstruction strengths, interface testing, and workflow confirmation required before adoption. Independent phantom studies show optimal settings vary by anatomical region (chest vs. abdomen vs. head), reinforcing the need for site- and protocol-specific tuning.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    clinicalEvidence: "Four independent peer-reviewed phantom studies (France x2, Italy, South Korea) and two single-center clinical studies, each with one Philips-affiliated co-author (India, n=30 brain CT; China, n=60 abdominal CT), alongside FDA 510(k) clearances K210760 and K232491.",
    lastUpdated: "2026-06-17",
    lastRevised: "2026-06-17",
    source: "FDA 510(k) database (K210760, K232491); peer-reviewed literature (Greffier 2022/2023, Barca 2023, Chandran 2024, Shim 2025, Liu 2026)",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K210760 received January 14, 2022 — original Precise Image clearance, Class II device under 21 CFR 892.1750",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K210760.pdf",
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K232491 received May 3, 2024 — extension of Precise Image to CT 5300 platform with new reconstruction models",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232491.pdf",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. (2022). Impact of an artificial intelligence deep-learning reconstruction algorithm for CT on image quality and potential dose reduction: a phantom study. Med Phys 49(8):5052–5063. Chest phantom, vendor-independent (France).",
        link: "https://doi.org/10.1002/mp.15807",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. (2023). Improved image quality and dose reduction in abdominal CT with deep-learning reconstruction algorithm: a phantom study. Eur Radiol 33:699–710. Simulated liver lesion detectability, vendor-independent (France).",
        link: "https://doi.org/10.1007/s00330-022-09003-y",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Barca et al. (2023). Image quality evaluation of the Precise image CT deep learning reconstruction algorithm compared to Filtered Back-projection and iDose4: a phantom study at different dose levels. Physica Medica 106:102517. Vendor-independent (Italy).",
        link: "https://doi.org/10.1016/j.ejmp.2022.102517",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Chandran et al. (2024). Comparison of image quality between Deep learning image reconstruction and Iterative reconstruction technique for CT Brain — a pilot study. F1000Research 13:691. Prospective clinical study, 30 patients, non-contrast brain CT; academic-led (India) with one Philips-affiliated co-author.",
        link: "https://doi.org/10.12688/f1000research.150773.1",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Shim, Lee, Kim (2025). Quantitative Evaluation of Low-Dose CT Image Quality Using Deep Learning Reconstruction: A Comparative Study of Philips Precise Image and GE TrueFidelity. J Imaging 11(9):317. Head-to-head phantom comparison, vendor-independent (South Korea).",
        link: "https://doi.org/10.3390/jimaging11090317",
      },
      {
        type: "Peer-reviewed Publication",
        description: "Liu et al. (2026). Deep learning precise image reconstruction algorithm for abdominal CT: impact on image quality and radiation dose reduction—a model validation study. J Med Artif Intell 9:34. Retrospective clinical study, 60 patients, abdominal CT; academic-led (China) with one Philips-affiliated co-author; dose-reduction estimate simulated via slice-thickness proxy.",
        link: "https://doi.org/10.21037/jmai-2025-173",
      },
      {
        type: "White Paper",
        description: "Philips Healthcare (2021). AI for Significantly Lower Dose and Improved Image Quality: Precise Image. Vendor white paper, non-peer-reviewed.",
        link: "https://www.philips.com/c-dam/b2bhc/master/resource-catalog/landing/precise-suite/incisive_precise_image.pdf",
      },
    ],
  }
];

import { ProductDetails } from "@/types/productDetails";

export const PreciseImage: ProductDetails = {
  id: "philips-precise-image",
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
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts",
  description: "AI-driven solution for enhancing low-dose CT images to achieve diagnostic quality comparable to standard dose acquisitions.",
  features: ["Low-dose CT enhancement", "Increased user consistency", "Reduced interventional procedure time"],
  category: "Reconstruction",
  secondaryCategories: ["Image Enhancement"],
  certification: "CE Mark",
  logoUrl: "/logos/philips.png",
  website: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
  anatomicalLocation: ["Head", "Whole body", "Vascular"],
  modality: ["CT"],
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
};

export const SmartSpeed: ProductDetails = {
    id: "philips-smartspeed",
    trainingData: {
      disclosureLevel: "minimal",
      description:
        "SmartSpeed AI uses Philips' Compressed SENSE framework with an AI reconstruction approach applied early in the MR signal/reconstruction pipeline. Philips states that the underlying Compressed SENSE adaptive AI technology was co-developed with academic partners and won the 2019 fastMRI Challenge. Public information does not disclose dataset size, demographics, scanner distribution, or full training/validation methodology.",
      source: "Philips press materials; FDA 510(k) summaries",
      sourceUrl:
        "https://www.usa.philips.com/a-w/about/news/archive/standard/news/press/2022/20220712-philips-spotlights-latest-ai-powered-software-defined-mr-smart-systems-at-ecr-2022.html"
    },
    evaluationData: {
      studyDesign:
        "FDA 510(k) software/system V&V and peer-reviewed evidence summarized in systematic review",
      primaryEndpoint:
        "Scan acceleration, image resolution, image quality, SNR/noise reduction",
      results:
        "Vendor-reported claims: up to 3x faster scanning versus Philips SENSE, up to 65% higher resolution, and compatibility with 97% of current clinical protocols. FDA documentation identifies SmartSpeed AI as a software enhancement in cleared Philips MR systems; clinical study was not required for substantial equivalence in K223442.",
      description:
        "SmartSpeed AI was announced by Philips as FDA 510(k)-cleared in July 2022. FDA documentation for Philips MR systems lists SmartSpeed AI among software enhancements and states that substantial equivalence was supported by verification/validation testing rather than a required clinical study. Independent peer-reviewed evidence exists but remains limited and heterogeneous, as summarized by Fransen et al. in a 2025 systematic review of commercial AI MRI acceleration products.",
      source: "Philips press release 2022; FDA K223442; Fransen et al. Eur Radiol 2025",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223442.pdf"
    },
    name: "SmartSpeed",
    company: "Philips",
    category: "Reconstruction",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts",
    description:
      "AI-powered MRI acceleration and reconstruction software integrated with Philips' Compressed SENSE speed engine. It is designed to reduce scan time and/or improve image resolution across a broad range of Philips MR protocols while keeping reconstruction within the scanner workflow.",
    certification: "FDA Cleared",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/",
    productUrl:
      "https://www.usa.philips.com/healthcare/technology/smartspeed-ai",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: [
      "Not disease-specific",
      "General diagnostic imaging",
      "Musculoskeletal conditions",
      "Neurological disorders",
      "Oncology"
    ],
    releaseDate: "2022-07-12",
    keyFeatures: [
      "AI reconstruction integrated with Philips Compressed SENSE acceleration engine",
      "Vendor-reported up to 3x faster scanning versus Philips SENSE",
      "Vendor-reported up to 65% higher image resolution",
      "Vendor-reported compatibility with 97% of current clinical protocols",
      "Supports advanced contrasts, diffusion-weighted imaging, and quantitative imaging protocols according to Philips",
      "Designed for challenging imaging situations including motion, implants, and low-SNR acquisitions",
      "Compressed SENSE adaptive AI technology linked by Philips to the 2019 fastMRI Challenge winner",
      "On-scanner reconstruction without PACS roundtrip",
      "Available on compatible Philips MR systems and as software upgrade where supported"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric, according to general Philips MR system indications",
      input: ["Raw MR k-space data"],
      inputFormat: ["Philips proprietary raw MR data"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "Compatible Philips 1.5T MR systems",
        "Compatible Philips 3.0T MR systems"
      ],
      deployment: ["On-scanner reconstruction"],
      triggerForAnalysis: "Automatic during MR reconstruction workflow",
      processingTime: "Near real-time on-console reconstruction"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "Not confirmed",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes:
          "Public Philips US materials and FDA summaries confirm US clearance, but a specific EU MDR CE certificate for SmartSpeed AI was not identified in public sources reviewed. Verify locally before European deployment."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber:
          "K213583 for Achieva/Ingenia/Ingenia CX/Ingenia Elition/Ingenia Ambition MR Systems R11; K223442 subsequently lists SmartSpeed AI for MR 5300 and MR 7700 R11 systems",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH, LNI",
        decisionDate:
          "K213583: 2022-05-16; K223442: 2022-12-23",
        notes:
          "Philips announced SmartSpeed AI FDA 510(k) clearance on 2022-07-12. FDA K223442 explicitly lists SmartSpeed AI as a software enhancement and states that no clinical study was required because substantial equivalence was supported by verification/validation testing."
      },
      intendedUseStatement:
        "Philips MR systems are indicated for use as diagnostic devices to obtain cross-sectional images, spectroscopic images and/or spectra of the head, body, or extremities. Images and measurements, when interpreted by trained physicians, may assist diagnosis and therapy planning. SmartSpeed AI does not appear to change the general MR system indications for use."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: [
        "Integrated in compatible new Philips MR systems",
        "Software upgrade for compatible Philips MR installed base"
      ]
    },
    evidence: [
      {
        type: "FDA 510(k)",
        description:
          "FDA K223442 for MR 5300 and MR 7700 R11 systems lists SmartSpeed AI as a software enhancement and states that substantial equivalence was demonstrated with verification/validation testing; clinical study was not required.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223442.pdf"
      },
      {
        type: "FDA 510(k)",
        description:
          "FDA K213583 is the primary predicate clearance for Philips Achieva, Ingenia, Ingenia CX, Ingenia Elition, and Ingenia Ambition MR Systems R11, referenced in later SmartSpeed-related clearances.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213583.pdf"
      },
      {
        type: "Indirect-comparative Systematic Review",
        description:
          "Fransen SJ, Roest C, Simonis FFJ, Yakar D, Kwee TC. The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol. 2025;35:4736-4746. NOTE: surveys all commercial MRI AI acceleration products from RSNA 2023 / ECR 2024 exhibitors; SmartSpeed is one of several products covered and is not the primary subject of the study (relabelled indirect-comparative 2026-06-15).",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      },
      {
        type: "Press Release",
        description:
          "Philips press release announcing FDA 510(k) clearance of SmartSpeed AI and reporting up to 3x faster scans, up to 65% higher resolution, and 97% protocol compatibility.",
        link: "https://www.usa.philips.com/a-w/about/news/archive/standard/news/press/2022/20220712-philips-spotlights-latest-ai-powered-software-defined-mr-smart-systems-at-ecr-2022.html"
      }
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes:
      "Downgraded from E2 to E1 because FDA documentation emphasizes non-clinical V&V/substantial equivalence, and peer-reviewed clinical evidence is summarized as limited/heterogeneous in the 2025 systematic review. Vendor claims are strong but not equivalent to prospective multicenter outcome evidence.",
    clinicalImpactNotes:
      "Potential workflow impact through shorter MRI acquisition/reconstruction workflows and/or higher image resolution. Claimed throughput gains should be validated locally by protocol, anatomy, field strength, and reader confidence.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes:
      "FDA-cleared and commercially deployed in compatible Philips environments. European CE/MDR status should be verified locally. Local protocol validation and radiologist acceptance testing remain advisable.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence:
      "Evidence includes FDA V&V/substantial-equivalence documentation, Philips-reported performance claims, and limited independent peer-reviewed literature summarized in a systematic review.",
    supersededBy: "philips-smartspeed-precise",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source:
      "Philips press materials, FDA 510(k) summaries K213583 and K223442, and peer-reviewed systematic review literature."
  };

export const SmartSpeedPrecise: ProductDetails = {
    id: "philips-smartspeed-precise",
    trainingData: {
      disclosureLevel: "minimal",
      description:
        "SmartSpeed Precise is described in FDA documentation as a machine-learning-based reconstruction technique designed to increase SNR, increase sharpness, and reduce residual ringing artifacts. Philips describes it as combining Compressed SENSE with two AI engines: denoising and sharpening/anti-ringing. Public sources do not disclose training dataset size, demographics, scanner distribution, or full model architecture.",
      source: "FDA K251397; Philips press materials 2025",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251397.pdf"
    },
    evaluationData: {
      studyDesign: "FDA 510(k) software/system V&V",
      primaryEndpoint:
        "SNR, image sharpness, residual ringing artifacts, scan acceleration",
      results:
        "FDA K251397 states SmartSpeed Precise is an optional software feature in R12.3 for Philips Ingenia, Ingenia CX, Ingenia Elition, Ingenia Ambition, BlueSeal, MR 5300, and MR 7700 MR systems. Philips reports up to 3x faster scanning versus Philips SENSE and up to 80% sharper images versus Philips SENSE/C-SENSE. The FDA clearance letter is dated June 4, 2025; Philips announced the clearance publicly on July 2, 2025.",
      description:
        "FDA K251397 identifies SmartSpeed Precise as a machine-learning-based reconstruction technique intended to increase SNR, increase sharpness, and reduce residual ringing artifacts. The general MR system indications for use were unchanged. Philips states the feature is for dStream-based 1.5T and 3.0T systems and is not yet CE marked/not available for sale in Europe as of the July 2025 announcement.",
      source: "FDA K251397; Philips press release 2025-07-02",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251397.pdf"
    },
    name: "SmartSpeed Precise",
    company: "Philips",
    category: "Reconstruction",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts",
    description:
      "Next-generation Philips MRI reconstruction and image-enhancement software combining Compressed SENSE with dual AI engines for denoising and image sharpening/anti-ringing. FDA documentation describes it as a machine-learning-based reconstruction feature intended to increase SNR, increase sharpness, and reduce residual ringing artifacts in MR images.",
    certification: "FDA Cleared",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/",
    productUrl:
      "https://www.philips.com/a-w/about/news/archive/standard/news/articles/2025/philips-advances-mri-speed-and-precision-with-fda-510k-clearance-of-smartspeed-precise-dual-ai-software.html",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: [
      "Not disease-specific",
      "General diagnostic imaging",
      "Oncology",
      "Neurological disorders",
      "Cardiovascular disease"
    ],
    releaseDate: "2025-07-02",
    version: "R12.3 optional software feature",
    keyFeatures: [
      "Dual AI reconstruction approach: denoising plus sharpening/anti-ringing",
      "Built on Philips Compressed SENSE acceleration framework",
      "FDA-described purpose: increase SNR, increase sharpness, and reduce residual ringing artifacts",
      "Vendor-reported up to 3x faster scanning versus Philips SENSE",
      "Vendor-reported up to 80% sharper images versus Philips SENSE/C-SENSE",
      "Vendor-reported less-than-10-second brain scan example",
      "Single-click workflow according to Philips",
      "Compatible with dStream-based Philips 1.5T and 3.0T systems according to Philips",
      "Available for compatible installed base via software R12.3 upgrade where supported"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric, according to general Philips MR system indications",
      input: ["Raw MR k-space data"],
      inputFormat: ["Philips proprietary raw MR data"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "Philips Ingenia",
        "Philips Ingenia CX",
        "Philips Ingenia Elition",
        "Philips Ingenia Ambition",
        "Philips BlueSeal",
        "Philips MR 5300",
        "Philips MR 7700",
        "dStream-based Philips 1.5T and 3.0T MR systems"
      ],
      deployment: ["On-scanner reconstruction"],
      triggerForAnalysis: "Automatic reconstruction workflow with single-click activation",
      processingTime:
        "Near real-time on-console reconstruction; Philips reports a less-than-10-second brain scan example"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "Not applicable",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes:
          "Philips states SmartSpeed Precise is not yet CE marked and not available for sale in Europe as of the July 2, 2025 announcement."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K251397",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH, LNI",
        decisionDate: "2025-06-04",
        notes:
          "FDA K251397 cleared Ingenia, Ingenia CX, Ingenia Elition, Ingenia Ambition, BlueSeal, MR 5300 and MR 7700 MR System with SmartSpeed Precise as an optional R12.3 software feature. Philips announced the clearance publicly on 2025-07-02."
      },
      intendedUseStatement:
        "The general Philips MR system indications for use are unchanged by SmartSpeed Precise. Philips MR systems are diagnostic devices for trained physicians to obtain cross-sectional images, spectroscopic images and/or spectra of the head, body, or extremities. Images and measurements may assist diagnosis and therapy planning when interpreted by trained physicians."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: [
        "Integrated in compatible new Philips MR systems",
        "Software R12.3 upgrade for compatible dStream-based installed base"
      ]
    },
    evidence: [
      {
        type: "FDA 510(k)",
        description:
          "FDA K251397 clearance letter and summary for Philips Ingenia, Ingenia CX, Ingenia Elition, Ingenia Ambition, BlueSeal, MR 5300, and MR 7700 MR System, including SmartSpeed Precise as an optional software feature in R12.3.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251397.pdf"
      },
      {
        type: "Press Release",
        description:
          "Philips public announcement of FDA 510(k) clearance of SmartSpeed Precise, reporting dual AI reconstruction, up to 3x faster scanning, up to 80% sharper images, dStream-based system compatibility, and no CE mark at announcement.",
        link: "https://www.philips.com/a-w/about/news/archive/standard/news/articles/2025/philips-advances-mri-speed-and-precision-with-fda-510k-clearance-of-smartspeed-precise-dual-ai-software.html"
      }
    ],
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes:
      "Maintained as E0 because evidence currently consists of FDA clearance/V&V and manufacturer-reported performance claims. No independent peer-reviewed clinical validation specific to SmartSpeed Precise was identified in the public sources reviewed.",
    clinicalImpactNotes:
      "Manufacturer-reported improvements include up to 3x faster scanning, up to 80% sharper images, and a less-than-10-second brain scan example. Independent evidence for diagnostic accuracy, downstream clinical outcomes, or real-world throughput impact is not yet established.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "FDA-cleared in the US but not CE marked according to Philips. Adoption should require local phantom/protocol testing, radiologist reader acceptance, artifact review, and monitoring by anatomy/protocol before clinical scaling.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence:
      "FDA 510(k) clearance and manufacturer-reported technical/clinical workflow claims. Independent peer-reviewed clinical literature is pending.",
    priorVersions: [
      {
        productId: "philips-smartspeed",
        name: "SmartSpeed",
        fdaClearance: "K213583/K223442 context"
      }
    ],
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source:
      "FDA K251397 and Philips press release 2025-07-02."
  };

export const PETCTAdaptiveReconstruction: ProductDetails = {
  id: "philips-petct-adaptive-reconstruction",
  name: "PET/CT Adaptive Reconstruction",
  company: "Philips",
  companyUrl: "https://www.philips.com/healthcare",
  productUrl: "https://www.philips.com/healthcare/solutions/pet-ct",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/philips.ts",
  description:
    "AI-based smart processing of PET data during reconstruction to reduce image noise and enhance image contrast, designed to improve PET/CT image quality. Implemented as look-up tables for automated selection of PET reconstruction parameters.",
  features: [
    "AI-driven PET reconstruction parameter selection",
    "Noise reduction and contrast enhancement",
    "Integrated PET/CT workflow",
  ],
  category: "Reconstruction",
  certification: "FDA",
  logoUrl: "/logos/philips.png",
  website: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
  anatomicalLocation: ["Whole body"],
  modality: ["PET", "PET/CT"],
  diseaseTargeted: ["Cancer"],
  keyFeatures: [
    "Machine-learning-derived look-up tables for automated PET reconstruction parameter selection",
    "Aims to reduce PET image noise and enhance contrast",
    "Validated by nuclear medicine experts (per Philips)",
    "Clinician retains ability to modify default PET reconstruction parameters",
  ],
  limitations: [
    "Public Philips materials do not disclose a dedicated standalone FDA clearance for 'PET/CT Adaptive Reconstruction'; it is described as a feature within Philips PET/CT systems (e.g., Vereos PET/CT, K211764)",
    "No independent peer-reviewed clinical evaluation specifically of this feature identified in public literature as of 2026-06-17",
    "Training data details (dataset size, demographics, scanner mix) not publicly disclosed",
  ],
  trainingData: {
    description:
      "Per Philips, machine learning and neural network algorithms were used to develop look-up tables for automated selection of PET reconstruction parameters. Dataset size, demographics, and geographic distribution not publicly disclosed.",
    source: "Philips 'AI-enabled solutions' page (accessed 2026-06-17)",
    sourceUrl: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
    disclosureLevel: "minimal",
  },
  evaluationData: {
    description:
      "Per Philips, look-up tables for PET reconstruction parameter selection were validated by nuclear medicine experts evaluating the resulting images. No external peer-reviewed clinical study identified specifically for this feature.",
    studyDesign: "Sponsor-run validation by nuclear medicine experts",
    primaryEndpoint: "PET image quality (noise, contrast) per expert review",
    results: "Philips reports improved image quality (reduced noise, enhanced contrast); independent quantitative results were not identified.",
    source: "Philips 'AI-enabled solutions' page",
    sourceUrl: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
  },
  technicalSpecifications: {
    population: "Per Philips PET/CT system indications",
    input: ["PET raw / list-mode data"],
    inputFormat: ["Proprietary Philips PET data"],
    output: ["Reconstructed PET images"],
    outputFormat: ["DICOM"],
  },
  technology: {
    integration: ["Philips Vereos PET/CT", "Compatible Philips PET/CT systems"],
    deployment: ["Integrated on Philips PET/CT consoles"],
    triggerForAnalysis: "Automatic during PET reconstruction",
    processingTime: "Not publicly disclosed",
  },
  regulatory: {
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K211764",
      productCode: "KPS",
      regulationNumber: "21 CFR 892.1200",
      decisionDate: "2021-08-06",
      notes: "Feature within Philips Vereos PET/CT (K211764), which is listed by the FDA with AI/ML attributes. A dedicated standalone clearance with the trade name 'PET/CT Adaptive Reconstruction' was not identified in the public FDA database.",
    },
    intendedUseStatement:
      "PET/CT Adaptive Reconstruction is an AI-based feature within Philips PET/CT systems intended to assist with PET image reconstruction by automating selection of reconstruction parameters to reduce noise and enhance contrast. Healthcare professionals remain in control and may modify the default reconstruction parameters. (Source: Philips 'AI-enabled solutions' page, accessed 2026-06-17)",
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Integrated in Philips PET/CT systems"],
  },
  evidenceRigor: "E0",
  clinicalImpact: "I1",
  evidenceRigorNotes:
    "E0 (Vendor-validated only): no independent peer-reviewed clinical evaluation of this specific feature identified in public literature as of 2026-06-17. Validation evidence is limited to Philips-internal review by nuclear medicine experts as described on the Philips AI-enabled solutions page.",
  clinicalImpactNotes:
    "I1 (Technical performance / image-quality claim, vendor-reported): Philips reports improved PET image noise and contrast; no independent evidence of changed treatment management (I3) or patient outcomes (I4).",
  adoptionReadiness: "R3",
  adoptionReadinessNotes:
    "Derived from E0 + FDA-listed AI/ML attributes within Vereos PET/CT (K211764): moderate implementation effort — requires a compatible Philips PET/CT system; local validation of image quality and reconstruction settings recommended before adoption.",
  evidenceVendorIndependent: false,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: false,
  clinicalEvidence: "Vendor 'AI-enabled solutions' disclosure and FDA listing of Vereos PET/CT (K211764) with AI/ML attributes; no independent peer-reviewed clinical studies specific to this feature identified as of 2026-06-17.",
  lastUpdated: "2026-06-17",
  lastRevised: "2026-06-17",
  source: "Philips 'AI-enabled solutions' page; FDA 510(k) Vereos PET/CT (K211764)",
  evidence: [
    {
      type: "Regulatory Clearance",
      description: "FDA 510(k) K211764 — Vereos PET/CT (Philips Medical Systems Nederland B.V.), decision August 6, 2021. FDA-listed with AI/ML attributes; encompasses the PET reconstruction feature set in which PET/CT Adaptive Reconstruction is described.",
      link: "https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/KPS/K211764",
    },
    {
      type: "Vendor Documentation",
      description: "Philips 'AI-enabled solutions' page (accessed 2026-06-17) — PET/CT Adaptive Reconstruction section describing machine-learning-derived look-up tables for PET reconstruction parameter selection and validation by nuclear medicine experts.",
      link: "https://www.philips.com/a-w/about/artificial-intelligence/ai-enabled-solutions.html",
    },
  ],
};

export const PHILIPS_PRODUCTS: ProductDetails[] = [PreciseImage, SmartSpeed, SmartSpeedPrecise, PETCTAdaptiveReconstruction];


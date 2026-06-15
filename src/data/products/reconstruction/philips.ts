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
    modality: "MRI",
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
        status: "unknown",
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
    modality: "MRI",
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
        status: "not_cleared",
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

export const PHILIPS_PRODUCTS: ProductDetails[] = [PreciseImage, SmartSpeed, SmartSpeedPrecise];


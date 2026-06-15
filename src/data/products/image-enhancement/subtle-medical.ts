import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-mr",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf",
        source: "FDA 510(k) summary K191688"
    },
    evaluationData: {
        results: "Not publicly disclosed",
        sourceUrl: "https://doi.org/10.1007/s00330-025-11423-5",
        source: "Fransen et al. Eur Radiol 2025 systematic review (indirect-comparative; names SubtleMR)",
        studyDesign: "Software V&V (FDA 510(k)) + indirect-comparative systematic review",
        primaryEndpoint: "Diagnostic equivalence",
        description: "FDA 510(k) software V&V (K191688, K223623). Indirect-comparative evidence from Fransen et al. Eur Radiol 2025 systematic review, which lists SubtleMR among 14 commercial MRI-acceleration products with peer-reviewed noise-reduction articles."
    },
    name: "SubtleMR",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered solution for enhancing MRI images, allowing for faster scan times while maintaining or improving image quality through noise reduction and resolution enhancement.",
    features: ["Deep learning enhancement", "MRI specific", "Scan time reduction", "Noise reduction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-mr/",
    anatomicalLocation: ["Brain", "Body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Cancer"],
    releaseDate: "2019-09-16",
    version: "2.3.x",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Enables up to 80% faster scanning",
      "Improves SNR and image sharpness",
      "Works with multiple contrasts",
      "Vendor-neutral compatibility",
      "Supports all body parts MRI",
      "Integration with Siemens MAGNETOM scanners via Open Recon"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<30 seconds per study"
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
        clearanceNumber: "K191688, K223623",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2023-05-11"
      },
      intendedUseStatement: "SubtleMR is an image processing software that can be used for image enhancement of MRI images. It can be used for noise reduction and increasing image sharpness."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      deploymentScale: "1,000+ scanners deployed worldwide as of 2025",
      recognitions: ["TIME World's Top HealthTech Companies 2025", "CB Insights GenAI 50", "CB Insights Top AI 100"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA 510(k) clearances K191688, K223623. Fransen et al. Eur Radiol 2025 systematic review names SubtleMR (indirect-comparative). A previously cited Andre et al. JACR 2021 paper (doi:10.1016/j.jacr.2021.07.024) was removed on 2026-06-15: the cited DOI could not be verified to name SubtleMR. Candidate SubtleMR-specific papers (Bash et al. AJNR 2021 doi:10.3174/ajnr.A7358; Bash et al. Clin Neuroradiol 2022 doi:10.1007/s00062-021-01121-2) require source verification before inclusion. PubMed re-searched 2026-06-15.",
    clinicalImpactNotes: "Vendor-claimed up to 80% faster scanning. Independent clinical-impact data limited to indirect-comparative systematic review.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearances K191688 (2019) and K223623 (2023) for SubtleMR — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf"
      },
      {
        type: "Systematic Review (indirect-comparative)",
        description: "Fransen et al. The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 2025;35:4736–4746. Names SubtleMR among 14 products reviewed.",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      }
    ],
    clinicalEvidence: "FDA clearance + indirect-comparative systematic review (Fransen 2025) naming SubtleMR. Direct primary-evidence DOIs require re-verification before re-citation.",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K191688, K223623) and company website"
  },
  {
    id: "subtle-pet",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K182336, K211964",
        demographics: "Adult and pediatric",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf",
        description: "Deep learning-based PET image enhancement trained to perform noise reduction and increase image sharpness across multiple radiotracers."
    },
    evaluationData: {
        description: "FDA 510(k) software V&V (K182336, K211964). No SubtlePET-specific peer-reviewed clinical outcome study confirmed at this time.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf",
        primaryEndpoint: "Not specified",
        studyDesign: "Software V&V (FDA 510(k))",
        source: "FDA 510(k) summary K182336",
        results: "Vendor-claimed up to 4x faster scans or 75% dose reduction; not independently confirmed."
    },
    name: "SubtlePET",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered PET image enhancement technology that enables faster scan times or lower dose while maintaining diagnostic image quality across multiple radiotracers.",
    features: ["Deep learning enhancement", "PET specific", "Dose reduction", "Multi-tracer support"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-pet/",
    anatomicalLocation: ["Whole body"],
    modality: "PET",
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiovascular disease", "Prostate cancer"],
    releaseDate: "2018-11-30",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based PET enhancement",
      "Enables 4x faster scans or 75% dose reduction",
      "Improved signal-to-noise ratio",
      "Enhanced lesion detectability",
      "Compatible with all major PET/CT scanners",
      "FDA cleared for FDG and amyloid; CE marked for additional tracers (18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, Ga-68 PSMA, 18F-Choline, 18F-Fluciclovine)"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM PET images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow",
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
        clearanceNumber: "K182336, K211964",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2021-09-28"
      },
      intendedUseStatement: "SubtlePET is an image processing software that can be used for image enhancement in PET images. It can be used for noise reduction and increasing image sharpness for PET images acquired using FDG, amyloid, 18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, and Ga-68 PSMA radiotracers."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I1",
    evidenceRigorNotes: "FDA 510(k) clearances K182336 and K211964. A previously cited Katsari et al. Eur J Nucl Med 2021 paper (doi:10.1007/s00259-021-05478-x) was removed on 2026-06-15: the paper trains custom DLE models on GE scanners and does not name or evaluate SubtlePET. No confirmed SubtlePET-specific peer-reviewed publication identified. PubMed re-searched 2026-06-15.",
    clinicalImpactNotes: "Vendor-claimed workflow improvement (4x faster scans / 75% dose reduction); no independently confirmed clinical impact study identified.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearances K182336 (2018) and K211964 (2021) for SubtlePET — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf"
      }
    ],
    clinicalEvidence: "FDA clearances only; SubtlePET-specific peer-reviewed clinical outcome studies require verification before re-citation.",
    supersededBy: "subtle-hd-pet",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K182336, K211964) and company website. Superseded by next-generation SubtleHD(PET) cleared 2026-05-27."
  },
  {
    id: "subtle-hd-pet",
    trainingData: {
        source: "PRNewswire 2026-05-27; Diagnostic Imaging 2026-05-27",
        disclosureLevel: "minimal",
        description: "The model uses a next-generation deep learning PET enhancement architecture that leverages anatomical CT data to improve reconstruction quality.",
        sourceUrl: "https://subtlemedical.com/"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k))",
        primaryEndpoint: "Not specified",
        results: "Not publicly disclosed",
        description: "FDA 510(k) K254013 validation across a broad range of accelerated low-count PET acquisitions. The software supports up to 75% faster PET imaging and aims to improve SUVmax quantitative accuracy.",
        source: "FDA 510(k) K254013 (cleared 2026-05-14)",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
    },
    name: "SubtleHD(PET)",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "Next-generation AI-powered PET image enhancement and acceleration software. Supports all FDA-approved radiotracers (including theranostic agents beyond 18F-FDG), enables up to 75% faster PET imaging on existing PET/CT and PET/MR scanners, leverages anatomical CT data to improve reconstruction quality, and provides adjustable denoising and improved SUVmax quantitative accuracy.",
    features: ["Deep learning enhancement", "PET acceleration", "All FDA-approved radiotracers", "Adjustable denoising", "CT-guided reconstruction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/",
    anatomicalLocation: ["Whole body"],
    modality: "PET",
    diseaseTargeted: ["Cancer", "Theranostics", "Neurological disorders", "Cardiovascular disease"],
    releaseDate: "2026-05-27",
    version: "1.0",
    keyFeatures: [
      "Next-generation deep learning PET enhancement architecture",
      "Up to 75% faster PET imaging on existing scanners",
      "Compatible with all FDA-approved radiotracers including theranostic agents",
      "Adjustable denoising level to radiologist preference",
      "Leverages anatomical CT data for improved PET reconstruction",
      "Improved SUVmax quantitative accuracy",
      "Supports PET/CT and PET/MR systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM PET images", "Anatomical CT"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "Pending FDA database publication",
        regulationNumber: "21 CFR 892.1200",
        productCode: "KPS",
        decisionDate: "2026-05-27"
      },
      intendedUseStatement: "SubtleHD(PET) is an AI-powered image processing software intended for enhancement of PET images acquired with FDA-approved radiotracers, supporting noise reduction, image acceleration, and improved quantitative accuracy on PET/CT and PET/MR systems."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA 510(k) clearance announced 2026-05-27. No independent peer-reviewed publications yet.",
    clinicalImpactNotes: "Manufacturer-reported workflow improvements (up to 75% scan time reduction). No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    priorVersions: [{ productId: "subtle-pet", name: "SubtlePET", fdaClearance: "K182336, K211964" }],
    clinicalEvidence: "FDA 510(k) clearance based on validation across a broad range of accelerated low-count PET acquisitions; independent literature pending.",
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "PRNewswire 2026-05-27; Diagnostic Imaging 2026-05-27; FDA 510(k) K-number pending public database publication."
  },
  {
    id: "aimify",
    trainingData: {
        description: "Not publicly disclosed. Training involves deep learning models for gadolinium-based contrast agent enhancement in brain MRI.",
        disclosureLevel: "minimal",
        source: "FDA 510(k) database (K240290)",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240290.pdf"
    },
    evaluationData: {
        description: "FDA 510(k) clinical validation studies demonstrated improved contrast-to-noise ratio (CNR) and lesion visibility in brain MRI images. Evidence includes 14 ECR presentations and a distribution launch via Bracco.",
        studyDesign: "Software V&V (FDA 510(k))",
        primaryEndpoint: "Contrast-to-noise ratio (CNR), contrast enhancement (CEP), and lesion-to-brain ratio (LBR)",
        source: "FDA 510(k) summary K240290",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240290.pdf",
        results: "Demonstrated improved CNR and lesion visibility for enhancing tissue in brain MRI."
    },
    name: "AiMIFY",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered solution for enhancing gadolinium-based contrast agent MRI images, improving contrast-to-noise ratio and lesion visibility in brain imaging.",
    features: ["Deep learning enhancement", "Contrast enhancement", "Brain MRI", "GBCA optimization"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/aimify/",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    diseaseTargeted: ["Brain tumors", "Metastases", "Neurological disorders"],
    releaseDate: "2024-08-21",
    version: "1.0",
    keyFeatures: [
      "Deep learning contrast enhancement",
      "Improves contrast-to-noise ratio (CNR)",
      "Enhances contrast enhancement percentage (CEP)",
      "Improves lesion-to-brain ratio (LBR)",
      "Works with gradient echo, 3D BRAVO, 3D MPRAGE sequences",
      "Supports 2D T1 spin echo and T1 FLAIR"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["Pre-contrast T1 MRI", "Post-contrast T1 MRI"],
      inputFormat: ["DICOM"],
      output: ["Enhanced contrast MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<45 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240290",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2024-08-21"
      },
      intendedUseStatement: "AiMIFY is an image processing software that can be used for image enhancement in MRI images. It can be used to increase contrast-to-noise ratio (CNR), contrast enhancement (CEP), and lesion-to-brain ratio (LBR) of enhancing tissue in brain MRI images acquired with a gadolinium-based contrast agent."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Distribution partners", "Bracco (EU distribution, launched ECR 2026)"]
    },
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "FDA validation K240290. Bracco EU launch at ECR 2026. 14 ECR presentations. PubMed searched 2026-03-08.",
    clinicalImpactNotes: "Workflow improvement through enhanced contrast-to-noise ratio in brain MRI, potentially reducing gadolinium dose.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    clinicalEvidence: "FDA 510(k) clearance based on clinical validation studies demonstrating improved CNR and lesion visibility",
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "FDA 510(k) database (K240290), company website, Bracco ECR 2026 press release"
  },
  {
    id: "subtle-hd",
    trainingData: {
        source: "FDA 510(k) database (K243250) and company website",
        disclosureLevel: "minimal",
        demographics: "Adult and pediatric",
        description: "The model is a deep learning-based noise reduction and image sharpness enhancement tool for MRI. Training details are not publicly disclosed in the source file beyond its application to all body parts and adult/pediatric populations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf"
    },
    evaluationData: {
        primaryEndpoint: "Equivalent or improved diagnostic quality",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf",
        description: "FDA validation study for 510(k) clearance (K243250) demonstrating equivalent or improved diagnostic quality for general-purpose MRI enhancement across all body parts.",
        results: "Not publicly disclosed",
        source: "FDA 510(k) summary K243250",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "SubtleHD",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered general-purpose MRI enhancement software for noise reduction and image sharpness improvement across all body parts. Part of the Subtle-ELITE suite alongside SubtleSYNTH and SubtleALIGN.",
    features: ["Deep learning enhancement", "Noise reduction", "All body parts", "Image sharpness"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-hd/",
    anatomicalLocation: ["Brain", "Spine", "Body", "Extremities"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncology", "General diagnostic imaging"],
    releaseDate: "2025-02-12",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based noise reduction",
      "Image sharpness enhancement",
      "Supports all body parts MRI",
      "Vendor-neutral compatibility",
      "General-purpose MRI enhancement",
      "Up to 80% scan time reduction in certain sequences (as part of Subtle-ELITE suite)",
      "Improved diagnostic image quality"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<30 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K243250",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH",
        decisionDate: "2025-02-12"
      },
      intendedUseStatement: "SubtleHD is an image processing software that can be used for image enhancement of all body parts MRI images. It can be used for noise reduction and increasing image sharpness."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA validation K243250 only. Very new product (Feb 2025), no independent publications.",
    clinicalImpactNotes: "No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    clinicalEvidence: "FDA 510(k) clearance based on clinical validation studies demonstrating equivalent or improved diagnostic quality",
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "FDA 510(k) database (K243250) and company website"
  },
  {
    id: "subtle-hd-ct",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K254120",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254120.pdf"
    },
    evaluationData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254120.pdf",
        source: "FDA 510(k) summary K254120",
        description: "FDA 510(k) clearance based on validation studies demonstrating noise reduction and improved low-contrast detectability across a range of CT scanner generations.",
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "SubtleHD(CT)",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered CT image enhancement software that reduces noise and improves low-contrast detectability across CT scanner generations, integrating into existing clinical workflows.",
    features: ["Deep learning enhancement", "CT specific", "Noise reduction", "Low contrast detectability"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["General diagnostic imaging", "Oncology"],
    releaseDate: "2026-06-10",
    version: "1.0",
    keyFeatures: [
      "Deep learning CT image enhancement",
      "Noise reduction across CT scanner generations",
      "Improved low-contrast detectability",
      "Compatible with older and newer CT systems",
      "Seamless integration into existing workflows",
      "Vendor-neutral compatibility"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K254120",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH",
        decisionDate: "2026-05"
      },
      intendedUseStatement: "SubtleHD(CT) is an AI-powered image processing software intended for image enhancement of CT images. It can be used for noise reduction and to improve low-contrast detectability across a range of CT scanner generations."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA 510(k) clearance K254120 announced 2026-06-10. No independent peer-reviewed publications yet.",
    clinicalImpactNotes: "Manufacturer-reported improvements in noise reduction and low-contrast detectability. No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    clinicalEvidence: "FDA 510(k) clearance based on validation studies; independent literature pending.",
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "Subtle Medical press release 2026-06-10; PRNewswire 2026-06-10; AuntMinnie 2026-06-11; FDA 510(k) database K254120."
  }
];

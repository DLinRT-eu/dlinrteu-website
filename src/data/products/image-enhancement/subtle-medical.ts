import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-mr",
    trainingData: {
        disclosureLevel: "minimal",
        description: "Deep learning model for MRI noise reduction and resolution enhancement. Training corpus is not publicly disclosed at the patient/dataset level. FDA 510(k) summaries (K191688, K203182, K223623) confirm software-as-a-medical-device classification with AI/ML attributes.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203182.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223623.pdf",
        source: "FDA 510(k) summaries K191688, K203182, K223623"
    },
    evaluationData: {
        results: "FDA acceptance criteria (K223623): SNR of a selected ROI improved by ≥5% on average after SubtleMR enhancement compared to original images, plus a visibility-of-small-structures rating, assessed using retrospective clinical data. Test methods were consistent across the clearance chain. Bash et al. AJNR 2021 (multicenter, 60% accelerated 3D MPRAGE brain MRI, n=40 patients): SubtleMR-enhanced accelerated scans preserved quantitative volumetric performance (NeuroQuant) and image quality vs standard-of-care scans across 3 sites and 3 readers; SNR and diagnostic equivalence non-inferior at 60% acceleration.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223623.pdf, https://doi.org/10.3174/ajnr.A7358",
        source: "Bash et al. AJNR 2022;43(4):492-498 (DOI 10.3174/ajnr.A7358); FDA 510(k) summaries K191688, K203182, K223623; Fransen et al. Eur Radiol 2025 systematic review (DOI 10.1007/s00330-025-11423-5)",
        studyDesign: "Prospective, multicenter, multireader trial (Bash 2022) + indirect-comparative systematic review (Fransen 2025) + FDA 510(k) software V&V",
        primaryEndpoint: "Acquisition acceleration, SNR improvement; Diagnostics image quality rating",
        description: "FDA 510(k) software verification and validation across three sequential clearances: K191688 (2019, original), K203182 (2021, v2.0.0), K223623 (2023, v2.3.x, current), each citing the prior as predicate. Bash et al. AJNR 2022: prospective multicenter multireader trial of SubtleMR on accelerated volumetric brain MRI; Subtle Medical employees are co-authors (not fully vendor-independent). Fransen et al. Eur Radiol 2025 systematic review names SubtleMR among 14 commercial MRI-acceleration products."
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
        clearanceNumber: "K191688, K203182, K223623",
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
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "E2 (Validated Evidence): two prospective multicenter multireader trials (Bash 2021: 5 institutions/6 scanners, n=40, brain; Bash 2022: 4 institutions, n=61, spine) plus three further prospective single-center trials (Rudie 2022, UCSF, n=32, brain, vendor-led; Tang 2024, Shanghai, n=31, lumbar spine, vendor-led; Lemaire 2024, Caen, n=33, brain, fully vendor-independent). External validation comes from one fully independent, vendor-unaffiliated large-scale retrospective real-world study (Yang 2024, Mount Sinai, 10 scanners, n=7,346 examinations). The combination of multi-center prospective vendor-led trials, two independent single-center prospective studies (Lemaire 2024; partially Yang 2024 for the real-world arm), spanning three countries (US, China, France), meets the E2 bar (multi-center, large cohort, external validation); no single study is simultaneously fully independent and multi-center.",
    clinicalImpactNotes: "I2 (Workflow / diagnostic accuracy, F&T Level 2): consistent finding across six studies (US, China, France) that 40-60% accelerated, DL-enhanced scans preserved or improved SNR, anatomic/lesion conspicuity, and diagnostic confidence relative to standard of care, with no loss of quantitative accuracy (volumetric concordance in Bash 2021; pathology detection in Tang 2024). Notably, Lemaire et al. 2024 — directly evaluating radiotherapy-relevant use (brain metastases/meningiomas, read by radiation oncologists as well as radiologists) — found lower lesion-detection sensitivity for radiotherapy readers (0.77) than radiologists (0.92), with missed lesions concentrated under 4mm diameter; this is a meaningful caveat specifically for RT target-delineation use cases, not just general diagnostic use. Yang 2024 confirms real-world workflow impact (reduced scan/room time) at scale, though effects vary by examination type. No evidence identified of changed treatment management (I3) or patient outcomes (I4).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k) clearance chain (K191688, K203182, K223623) + real-world deployment evidence (1,000+ scanners; Yang 2024 multi-site implementation): multi-site commissioning and clinical acceptability evidence exists, supporting R3 (enhanced implementation readiness). Not elevated to R4, as no documented TG-100/RBAAF-aligned risk management, formal incident-management framework, or national-guidance alignment was identified.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearances K191688 (2019, original), K203182 (2021, v2.0.0), K223623 (2023, v2.3.x, current) for SubtleMR — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. (2021). Deep Learning Enables 60% Accelerated Volumetric Brain MRI. AJNR 42(12):2130-2137. Prospective, multicenter (5 institutions, 6 scanners), n=40; vendor-led (3/7 authors Subtle Medical).",
        link: "https://doi.org/10.3174/ajnr.A7358"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Rudie et al. (2022). Clinical Assessment of Deep Learning-based Super-Resolution for 3D Volumetric Brain MRI. Radiol Artif Intell 4(1):e210059. Prospective, single-center (UCSF), n=32; vendor-led (4/10 authors Subtle Medical).",
        link: "https://doi.org/10.1148/ryai.210059"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. (2022). Deep Learning Image Processing Enables 40% Faster Spinal MR Scans. Clin Neuroradiol 32(1):197-203. Prospective, multicenter (4 institutions), n=61; vendor-led (1/6 authors Subtle Medical).",
        link: "https://doi.org/10.1007/s00062-021-01121-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Tang et al. (2024). Deep learning reconstruction for lumbar spine MRI acceleration. Eur Radiol Exp 8(1):67. Prospective, single-center (Shanghai, China), n=31; vendor-led (1/8 authors Subtle Medical; 1/8 authors Siemens Healthineers, both COI-disclosed).",
        link: "https://doi.org/10.1186/s41747-024-00470-0"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lemaire et al. (2024). Artificial intelligence solution to accelerate the acquisition of MRI images: impact on the therapeutic care in oncology in radiology and radiotherapy departments. Cancer Radiother 28(3):251-257. Prospective, n=33, brain metastases/meningiomas, France; evaluated by both radiologists and radiation oncologists. Specificity 1.0, sensitivity 0.92 (radiology) vs. 0.77 (radiotherapy). Fully vendor-independent (Centre François-Baclesse, Normandie Université).",
        link: "https://doi.org/10.1016/j.canrad.2023.11.004"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yang, Finkelstein, Koo, Doshi (2024). Impact of Deep Learning Image Reconstruction Methods on MRI Throughput. Radiol Artif Intell 6(3):e230181. Retrospective, large multicenter health system (Mount Sinai), 10 scanners, n=7,346 examinations; fully vendor-independent.",
        link: "https://doi.org/10.1148/ryai.230181"
      },
      {
        type: "Systematic Review (indirect-comparative)",
        description: "Fransen et al. (2025). The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 35:4736-4746. Names SubtleMR among 14 products reviewed.",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      }
    ],
    limitations: [
      "Independent (non-vendor-affiliated) clinical evidence exists (Lemaire 2024; Yang 2024) but most prospective multireader trials (Bash 2021/2022, Rudie 2022, Tang 2024) have at least one Subtle Medical co-author",
      "For radiotherapy-relevant evaluation specifically (brain metastases/meningiomas read by radiation oncologists), lesion-detection sensitivity was lower (0.77) than for radiologists (0.92) in the same study (Lemaire 2024), with missed lesions concentrated under 4mm — relevant to target delineation use cases",
      "Image-domain (DICOM-based) processing operates after scanner reconstruction, distinct from k-space-based vendor-native methods (e.g., AIR Recon DL); effects on scan/room time heterogeneous by examination type (Yang et al. 2024)",
      "Cloud-based deployment option processes images off-site on manufacturer servers, which may have data-governance implications for some institutions",
    ],
    clinicalEvidence: "Five prospective multireader trials (Bash 2021/2022, Rudie 2022, Tang 2024, Lemaire 2024; US, China, France) plus one large independent retrospective real-world study (Yang 2024, Mount Sinai) and an indirect-comparative systematic review (Fransen 2025).",
    lastUpdated: "2026-06-18",
    lastRevised: "2026-06-18",
    source: "FDA 510(k) database (K191688, K203182, K223623); peer-reviewed literature (Bash 2021/2022, Rudie 2022, Tang 2024, Lemaire 2024, Yang 2024, Fransen 2025)"
  },
  {
    id: "subtle-pet",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summaries K182336, K211964",
        demographics: "Adult and pediatric",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf",
        description: "Deep learning-based PET image enhancement for noise reduction and image sharpness improvement across multiple radiotracers. Underlying low-count PET training and multicenter validation are described in Chaudhari et al. npj Digital Medicine 2021 (Subtle Medical / Stanford), which evaluated the platform externally across multiple centers and tracers."
    },
    evaluationData: {
        description: "Three independent peer-reviewed evaluations: (1) Chaudhari et al. npj Digital Medicine 2021 - multicenter, externally validated low-count whole-body PET with deep learning (Subtle Medical co-authors); (2) Weyts et al. EJNMM 2022 - vendor-independent prospective study on a digital PET/CT at Centre François Baclesse showing two-fold reduction in [18F]FDG PET acquisition time using SubtlePET; (3) Weyts et al. Diagnostics 2023 - independent assessment of SubtlePET denoising homogenising image quality in digital PET/CT.",
        sourceUrl: "https://doi.org/10.1007/s00259-022-05800-1",
        primaryEndpoint: "Lesion detectability and image quality at reduced PET acquisition time/dose",
        studyDesign: "Multicenter externally validated study (Chaudhari 2021) + vendor-independent prospective clinical study (Weyts 2022) + vendor-independent observational study (Weyts 2023) + FDA 510(k) software V&V",
        source: "Chaudhari et al. npj Digital Med 2021 (DOI 10.1038/s41746-021-00497-2); Weyts et al. EJNMM 2022 (DOI 10.1007/s00259-022-05800-1); Weyts et al. Diagnostics 2023 (DOI 10.3390/diagnostics13091626)",
        results: "Weyts 2022: half-duration (50%) SubtlePET-enhanced [18F]FDG PET acquisitions on digital PET/CT yielded non-inferior lesion detectability and image quality vs full-duration scans. Chaudhari 2021: deep learning enabled low-count whole-body PET with preserved quality across multiple external centers and tracers."
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
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Three peer-reviewed publications re-verified 2026-06-17 that explicitly name and evaluate SubtlePET: Chaudhari et al. npj Digital Medicine 2021 (DOI 10.1038/s41746-021-00497-2, multicenter externally-validated low-count whole-body PET, Subtle Medical co-authors); Weyts et al. EJNMM 2022 (DOI 10.1007/s00259-022-05800-1, vendor-independent prospective digital PET/CT, Centre François Baclesse); Weyts et al. Diagnostics 2023 (DOI 10.3390/diagnostics13091626, vendor-independent extension). FDA 510(k) K182336 + K211964.",
    clinicalImpactNotes: "Independent evidence supports concrete workflow impact: Weyts 2022 demonstrates two-fold reduction in [18F]FDG PET acquisition time on digital PET/CT with preserved lesion detectability; Chaudhari 2021 confirms generalisability across multiple external centers and tracers.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Multicenter Externally Validated Study",
        description: "Chaudhari AS, Mittra E, Davidzon GA, Gulaka P, Gandhi H, Brown A, Zhang T, Srinivas S, Gong E, Zaharchuk G, Jadvar H. Low-count whole-body PET with deep learning in a multicenter and externally validated study. NPJ Digit Med 2021;4:127. Names SubtlePET; Subtle Medical/Stanford co-authors (not fully vendor-independent).",
        link: "https://doi.org/10.1038/s41746-021-00497-2"
      },
      {
        type: "Peer-reviewed Prospective Clinical Study (vendor-independent)",
        description: "Weyts K, Lasnon C, Ciappuccini R, Lequesne J, Corroyer-Dulmont A, Quak E, Clarisse B, Roussel L, Bardet S, Jaudet C. Artificial intelligence-based PET denoising could allow a two-fold reduction in [18F]FDG PET acquisition time in digital PET/CT. Eur J Nucl Med Mol Imaging 2022;49(11):3750-3761. Names SubtlePET; vendor-independent.",
        link: "https://doi.org/10.1007/s00259-022-05800-1"
      },
      {
        type: "Peer-reviewed Observational Study (vendor-independent)",
        description: "Weyts K, Quak E, Licaj I, Ciappuccini R, Lasnon C, Corroyer-Dulmont A, Foucras G, Bardet S, Jaudet C. Deep Learning Denoising Improves and Homogenizes Patient [18F]FDG PET Image Quality in Digital PET/CT. Diagnostics 2023;13(9):1626. Names SubtlePET; vendor-independent.",
        link: "https://doi.org/10.3390/diagnostics13091626"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearances K182336 (2018) and K211964 (2021) for SubtlePET — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf"
      }
    ],
    clinicalEvidence: "FDA clearances plus three independent peer-reviewed publications (Chaudhari 2021 npj Digital Medicine; Weyts 2022 EJNMM; Weyts 2023 Diagnostics) confirmed via DOI resolution to explicitly name and evaluate SubtlePET, demonstrating multicenter generalisability and ~50% PET acquisition-time reduction with preserved detectability.",
    supersededBy: "subtle-hd-pet",
    lastUpdated: "2026-06-17",
    lastRevised: "2026-06-17",
    source: "FDA 510(k) database (K182336, K211964); Chaudhari 2021 (DOI 10.1038/s41746-021-00497-2); Weyts 2022 (DOI 10.1007/s00259-022-05800-1); Weyts 2023 (DOI 10.3390/diagnostics13091626); company website. Superseded by next-generation SubtleHD(PET) cleared 2026-05-27."
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
        clearanceNumber: "K254013",
        regulationNumber: "21 CFR 892.1200",
        productCode: "KPS",
        decisionDate: "2026-05-14"
      },
      intendedUseStatement: "SubtleHD(PET) is an AI-powered image processing software intended for enhancement of PET images acquired with FDA-approved radiotracers, supporting noise reduction, image acceleration, and improved quantitative accuracy on PET/CT and PET/MR systems."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA 510(k) K254013 cleared 2026-05-14 (announced 2026-05-27). No independent peer-reviewed publications yet.",
    clinicalImpactNotes: "Manufacturer-reported workflow improvements (up to 75% scan time reduction). No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    priorVersions: [{ productId: "subtle-pet", name: "SubtlePET", fdaClearance: "K182336, K211964" }],
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K254013 for SubtleHD-PET (1.x), cleared 2026-05-14.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
      },
      {
        type: "Press Release",
        description: "PRNewswire 2026-05-27 announcement naming SubtleHD(PET) FDA clearance.",
        link: "https://subtlemedical.com/"
      }
    ],
    clinicalEvidence: "FDA 510(k) K254013 clearance based on validation across accelerated low-count PET acquisitions; independent literature pending.",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) database (K254013); PRNewswire 2026-05-27."
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

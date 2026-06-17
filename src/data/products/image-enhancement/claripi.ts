
import { ProductDetails } from "@/types/productDetails";

export const CLARIPI_PRODUCTS: ProductDetails[] = [
  {
    id: "claripi-clarict-ai",
    trainingData: {
        description: "Image-based CT denoising using a U-Net CNN (contracting + expansive paths). Per Yeoh et al. Korean J Radiol 2021, training used >1,000,000 CT images covering ~2,100 combinations of scan/reconstruction conditions (varying kV, mAs, AEC, slice thickness, contrast, kernels) across 24 scanner models from 4 major vendors (GE, Siemens, Philips, Canon). Synthetic sinogram-based LDCT simulation generated paired LDCT/standard-dose training data; 80/20 train/validation split, with additional external validation in 4 independent clinical studies.",
        datasetSize: ">1,000,000 CT images (~2,100 scan/recon condition combinations)",
        scannerModels: ["24 scanner models across GE, Siemens, Philips, Canon"],
        source: "Yeoh et al. Korean J Radiol 2021;22(11):1850 (Materials and Methods); FDA 510(k) K183460",
        sourceUrl: "https://doi.org/10.3348/kjr.2021.0140",
        disclosureLevel: "partial"
    },
    evaluationData: {
        studyDesign: "Independent peer-reviewed clinical pilot (Yeoh 2021) + independent peer-reviewed phantom dose-reduction study (Chang 2022) + FDA 510(k) software V&V",
        sourceUrl: "https://doi.org/10.1007/s00330-021-08199-9",
        source: "Chang et al. Eur Radiol 2022;32:691 (DOI 10.1007/s00330-021-08199-9); Yeoh et al. Korean J Radiol 2021;22(11):1850 (DOI 10.3348/kjr.2021.0140)",
        results: "Yeoh 2021 (52 patients, lumbar spine LDCT): denoised 50-mAs images had lower noise (36.4±7.0 HU) than 100-mAs (63.3±16.1 HU) and higher SNR (1.46 vs 0.99), with preserved/improved edge sharpness (p<0.001). Chang 2022 (phantom, multi-dose): dose-reduction potential 86% (81-88%), comparable to high-strength vendor-specific DLR (TrueFidelity, 87%) and superior to medium/low DLR strengths.",
        primaryEndpoint: "Noise, SNR, edge rise distance (Yeoh); task-based detectability index and dose-reduction potential (Chang)",
        description: "Two independent (non-vendor) peer-reviewed evaluations: a 52-patient retrospective clinical pilot on lumbar spine LDCT (Yeoh 2021) and a multi-dose phantom dose-reduction study (Chang 2022) comparing ClariCT.AI head-to-head against GE TrueFidelity DLR. Both name ClariCT.AI explicitly. Underlying FDA 510(k) software V&V (K183460) also applies."
    },
    name: "ClariCT.AI",
    company: "ClariPi",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/claripi.ts",
    description: "AI-powered CT image denoising solution using deep learning to enhance low-dose CT scans while preserving anatomical details and natural textures.",
    certification: "CE Mark, FDA 510(k)",
    logoUrl: "/logos/claripi.jpg",
    companyUrl: "https://claripi.com/",
    productUrl: "https://claripi.com/clarict-ai/",
    anatomicalLocation: ["Head", "Chest", "Heart", "Abdomen", "Pelvis", "Spine"],
    modality: "CT",
    diseaseTargeted: ["Cancer screening", "Cardiac imaging", "Pulmonary disorders", "Pediatric imaging"],
    keyFeatures: [
      "Patented Clarity Engine with deep CNN",
      "Vendor-agnostic - works with all CT manufacturers",
      "Selective noise removal preserving anatomical structures",
      "Enables radiation dose reduction",
      "Fully automated processing",
      "User-definable clarity settings"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced/denoised CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "RIS/CIS", "AI Marketplaces (Siemens Syngo.Via, Blackford, Nuance, deepcOS)"],
      deployment: ["Standalone desktop", "Local virtualization (Docker)", "Cloud-based"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "10-60 seconds per case"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDD"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K183460",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2019-03-29",
        notes: "Additional clearance K212074 (2021) for AI Marketplace integration"
      },
      intendedUseStatement: "ClariCT.AI is intended to be used for denoise processing and enhancement of DICOM images acquired from any CT scanner to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "AI Marketplaces", "Distribution partners"]
    },
    evidence: [
      {
        type: "Peer-reviewed Clinical Pilot (vendor-independent)",
        description: "Yeoh H, Hong SH, Ahn C, Choi JY, Chae HD, Yoo HJ, Kim JH. Deep Learning Algorithm for Simultaneous Noise Reduction and Edge Sharpening in Low-Dose CT Images: A Pilot Study Using Lumbar Spine CT. Korean J Radiol 2021;22(11):1850-1857. 52 patients; names ClariCT.AI (ClariPI) explicitly in Methods.",
        link: "https://doi.org/10.3348/kjr.2021.0140"
      },
      {
        type: "Peer-reviewed Phantom Comparative Study (vendor-independent)",
        description: "Chang W, Kim JH, Ahn C, Lee H, Kim HY, Cho J, Lee YJ, Kim YH. Dose reduction potential of vendor-agnostic deep learning model in comparison with deep learning-based image reconstruction algorithm on CT: a phantom study. Eur Radiol 2022;32:691-701. Compares ClariCT.AI head-to-head against GE TrueFidelity using task-based detectability index.",
        link: "https://doi.org/10.1007/s00330-021-08199-9"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K183460 for ClariCT.AI - Class II, 21 CFR 892.2050, Product Code LLZ. Additional clearance K212074 (2021) for AI Marketplace integration.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I1",
    evidenceRigorNotes: "Two independent vendor-independent peer-reviewed studies confirmed (re-verified 2026-06-17 by full-text DOI resolution) to name ClariCT.AI: Yeoh et al. Korean J Radiol 2021 (52-patient retrospective clinical pilot, lumbar spine LDCT) and Chang et al. Eur Radiol 2022 (phantom dose-reduction study head-to-head vs GE TrueFidelity). Both single-center, non-prospective. FDA 510(k) K183460 + K212074.",
    clinicalImpactNotes: "Independent evidence supports meaningful image-quality improvement and dose-reduction potential (~86% phantom DRP, comparable to vendor-specific DLR). No prospective patient-outcome study identified; clinical impact remains workflow/dose-saving (I1).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    clinicalEvidence: "FDA 510(k) K183460/K212074 plus two vendor-independent peer-reviewed studies (Yeoh 2021 Korean J Radiol; Chang 2022 Eur Radiol) confirmed via DOI resolution to explicitly name and evaluate ClariCT.AI.",
    releaseDate: "2019-03-29",
    lastUpdated: "2026-06-17",
    lastRevised: "2026-06-17",
    source: "FDA 510(k) database (K183460, K212074); Yeoh et al. KJR 2021 (DOI 10.3348/kjr.2021.0140); Chang et al. Eur Radiol 2022 (DOI 10.1007/s00330-021-08199-9); company website"
  }
];

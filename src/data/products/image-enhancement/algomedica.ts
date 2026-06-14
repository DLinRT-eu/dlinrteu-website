import { ProductDetails } from "@/types/productDetails";

export const ALGOMEDICA_PRODUCTS: ProductDetails[] = [
  {
    id: "algomedica-pixelshine",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K161625.pdf",
        description: "Training data details are not publicly disclosed. The original 510(k) K161625 (2016) describes a non-linear filter for noise reduction; later company materials describe the technology as machine learning/deep learning-based.",
        source: "FDA 510(k) summary K161625"
    },
    evaluationData: {
        studyDesign: "Independent Retrospective Evaluation",
        description: "Multiple independent peer-reviewed studies have evaluated PixelShine across CT applications including urolithiasis characterization (Steuwe et al. Diagnostics 2022), pediatric ultra-low-dose thorax CT (Brendlin et al. Tomography 2022), and lung cancer screening ULDCT (Hata et al. AJR 2020). The product is also supported by clinical case studies and FDA 510(k) software verification.",
        source: "Steuwe et al. Diagnostics 2022; Brendlin et al. Tomography 2022; Hata et al. AJR 2020",
        results: "Consistent improvements in objective image quality (noise, SNR, CNR) across studies; shorter time-to-diagnosis in pediatric ULDCT (Brendlin et al.); equivalent Lung-RADS performance at ultra-low dose (Hata et al.).",
        primaryEndpoint: "CT values, image noise, stone characterization, diagnostic accuracy",
        sourceUrl: "https://doi.org/10.3390/diagnostics12071627"
    },
    name: "PixelShine",
    company: "AlgoMedica",
    category: "Image Enhancement",
    certification: "FDA Cleared",
    releaseDate: "2016-09-19",
    description:
      "CT image denoising software that enhances image quality and supports low-radiation protocols; vendor-agnostic across CT scanners.",
    logoUrl: "/logos/algomedica.png",
    companyUrl: "https://algomedica.com/",
    productUrl: "https://algomedica.com/low-radation-ct-scans-algomedica",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/algomedica.ts",
    contactEmail: "info@algomedica.com",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    keyFeatures: [
      "Noise reduction while maintaining diagnostic detail",
      "Improved SNR and low-contrast detectability",
      "Enables lower-dose CT protocols without compromising quality",
      "Vendor-agnostic: compatible with any CT scanner model or age",
      "Seamless integration into existing workflows",
      "Processing speed of approximately 11 slices/second",
      "Supports lung screening, pediatric imaging, and obese patient protocols"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner console", "Imaging gateways"],
      deployment: ["On-premise", "Edge device", "Cloud (optional)"]
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIa",
        type: "MDD",
        notifiedBody: "BSI (Notified Body 0086)",
        regulation: "MDD 93/42/EEC"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K161625",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        type: "510(k)",
        decisionDate: "2016-09-19"
      },
      intendedUseStatement:
        "The AlgoMedica PixelShine System is intended for networking, communication, processing and enhancement of CT images in DICOM format. It is specifically indicated for assisting professional radiologists and specialists in reaching their own diagnosis. The device processing is not effective for lesion, mass or abnormalities of sizes less than 3.0 mm. The AlgoMedica PixelShine is not intended for use with or for diagnostic interpretation of mammography images. (Source: FDA 510(k) K161625 Summary, accessed 2026-06-14)"
    },
    market: {
      onMarketSince: "2019-05"
    },
    evidence: [
      {
        type: "Independent Peer-reviewed Publication",
        description: "Steuwe et al. 2022: Influence of PixelShine deep learning noise reduction on CT values, image noise and kidney/ureter stone characterization. University Düsseldorf, vendor-independent. Diagnostics 2022;12(7):1627.",
        link: "https://doi.org/10.3390/diagnostics12071627"
      },
      {
        type: "Independent Peer-reviewed Publication",
        description: "Brendlin et al. 2022: AI denoising improves image quality and radiological workflows in pediatric ultra-low-dose thorax CT. 100 consecutive patients, 8 blinded readers. PixelShine outperformed ADMIRE2 and wFBP; shortest time to diagnosis. Tomography 2022;8(4):1665-1679.",
        link: "https://doi.org/10.3390/tomography8040140"
      },
      {
        type: "Independent Peer-reviewed Publication",
        description: "Hata et al. 2020: Combination of deep learning-based denoising (PixelShine) and iterative reconstruction for ultra-low-dose chest CT (mean 0.19 mSv); 41 patients, 252 nodules, Lung-RADS evaluation. AJR 2020;215(6):1321-1328.",
        link: "https://doi.org/10.2214/AJR.19.22680"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for PixelShine (K161625). Class II, 21 CFR 892.2050, Product Code LLZ. Cleared September 19, 2016.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K161625.pdf"
      },
      {
        type: "Use cases and scientific publications",
        description: "Clinical case studies and scientific publications demonstrating PixelShine effectiveness across CT applications.",
        link: "https://algomedica.com/medical-imaging-resources#case-studies"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Steuwe et al. Diagnostics 2022;12(7):1627 (University Düsseldorf, independent, urolithiasis). Brendlin et al. Tomography 2022;8(4):1665 (pediatric ULDCT, n=100, 8 readers). Hata et al. AJR 2020;215(6):1321 (lung RADS ULDCT, n=41). Tian et al. pelvic CTA 70kVp (Japanese J Radiol 2018, PMID 30523499). AI for CT image quality meta-analysis (PMID:40053787, 2025). PubMed verified 2026-06-14.",
    clinicalImpactNotes: "Workflow improvement through CT denoising enabling low-radiation protocols across whole body CT, including pediatric and lung screening applications.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE (MDD) + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "FDA 510(k) database and company provided information"
  }
];

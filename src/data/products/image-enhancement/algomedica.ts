import { ProductDetails } from "@/types/productDetails";

export const ALGOMEDICA_PRODUCTS: ProductDetails[] = [
  {
    id: "algomedica-pixelshine",
    name: "PixelShine",
    company: "AlgoMedica",
    companyUrl: "https://algomedica.com/",
    productUrl: "https://algomedica.com/low-radation-ct-scans-algomedica",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/algomedica.ts",
    description:
      "CT image-processing software that denoises reconstructed DICOM CT images to assist professional radiologists and specialists in diagnosis. FDA labeling states processing is ineffective for abnormalities smaller than 3 mm and excludes mammography. Clinical evidence is limited to retrospective evaluations in selected protocols.",
    category: "Image Enhancement",
    certification:
      "FDA 510(k) cleared (K161625); historical CE marking reported, current certificate and scope unverified",
    logoUrl: "/logos/algomedica.png",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    keyFeatures: [
      "Post-processes reconstructed DICOM CT images to reduce image noise",
      "FDA-cleared to assist professional diagnosis within the labeled scope",
      "FDA labeling states processing is ineffective for lesions, masses, or abnormalities smaller than 3 mm",
      "Mammography images are outside the FDA-cleared intended use",
      "Evaluated retrospectively in selected pediatric and adult CT protocols",
      "Compatibility and deployment configuration require confirmation for the specific product version"
    ],
    keyPapers: [
      {
        doi: "10.3390/diagnostics12071627",
        title:
          "Influence of a Deep Learning Noise Reduction on the CT Values, Image Noise and Characterization of Kidney and Ureter Stones",
        authors: "Steuwe A et al.",
        journal: "Diagnostics",
        year: "2022",
        evidenceRigor: "E2",
        clinicalImpact: "I1",
        rationale:
          "Retrospective single-center evaluation of 45 patients assessing stone measurements and image-quality metrics. AlgoMedica supplied the software.",
        vendorIndependent: false,
        externalValidation: true
      },
      {
        doi: "10.3390/tomography8040140",
        title:
          "AI Denoising Improves Image Quality and Radiological Workflows in Pediatric Ultra-Low-Dose Thorax Computed Tomography Scans",
        authors: "Brendlin AS et al.",
        journal: "Tomography",
        year: "2022",
        evidenceRigor: "E2",
        clinicalImpact: "I2",
        rationale:
          "Retrospective study of 100 pediatric scans with blinded readers. Faster pneumonia severity-score completion was reported for the medical student and residents, not consultant radiologists. AlgoMedica supplied the software.",
        vendorIndependent: false,
        externalValidation: true
      },
      {
        doi: "10.2214/AJR.19.22680",
        title:
          "Combination of Deep Learning-Based Denoising and Iterative Reconstruction for Ultra-Low-Dose CT of the Chest: Image Quality and Lung-RADS Evaluation",
        authors: "Hata A et al.",
        journal: "AJR American Journal of Roentgenology",
        year: "2020",
        evidenceRigor: "E2",
        clinicalImpact: "I1",
        rationale:
          "Retrospective study of 41 patients and 252 nodules at a mean ultra-low-dose CT exposure of approximately 0.19 mSv. AlgoMedica provided technical support and performed PixelShine image processing.",
        vendorIndependent: false,
        externalValidation: true
      },
      {
        doi: "10.1038/s41598-024-62394-4",
        title:
          "Assessment of Image Quality and Impact of Deep Learning-Based Software in Non-Contrast Head CT Scans",
        authors: "Bos et al.",
        journal: "Scientific Reports",
        year: "2024",
        evidenceRigor: "E2",
        clinicalImpact: "I1",
        rationale:
          "Retrospective evaluation of 152 exams acquired on three scanners. Objective findings varied by comparator; overall subjective image quality did not show a general improvement.",
        vendorIndependent: false,
        externalValidation: true
      },
      {
        doi: "10.3390/bioengineering11121285",
        title:
          "Impact of Deep Learning-Based Image Reconstruction on Tumor Visibility and Diagnostic Confidence in Computed Tomography",
        authors: "Bertl M et al.",
        journal: "Bioengineering",
        year: "2024",
        evidenceRigor: "E2",
        clinicalImpact: "I1",
        rationale:
          "Comparative reader evaluation across 33 contrast-enhanced staging CT exams. Scanner-based deep-learning reconstruction generally rated above PixelShine.",
        externalValidation: true
      }
    ],
    trainingData: {
      disclosureLevel: "minimal",
      sourceUrl: "https://www.fujifilm.com/at/en/healthcare/x-ray/fct/fct-pixelshine",
      description:
        "The FDA K161625 summary describes Version 1 as a nonlinear filter. Fujifilm describes deep-learning training with paired low-dose and standard-dose CT images for FCT PixelShine, but does not publish cohort size or composition. These descriptions should not be generalized across versions.",
      source:
        "FDA 510(k) summary K161625 and Fujifilm FCT PixelShine product information"
    },
    evaluationData: {
      studyDesign: "Retrospective comparative studies",
      description:
        "External academic studies evaluated PixelShine in selected urinary-stone, pediatric chest, adult ultra-low-dose chest, head CT, and staging CT protocols. Studies mainly assessed image quality, image-noise measures, or reader scoring; several disclose software provision or image processing by AlgoMedica.",
      source:
        "Steuwe et al. Diagnostics 2022; Brendlin et al. Tomography 2022; Hata et al. AJR 2020; Bos et al. Scientific Reports 2024; Bertl et al. Bioengineering 2024",
      results:
        "Image-noise and image-quality effects were protocol- and comparator-dependent. In the pediatric reader study, severity-score completion was faster for junior readers but not consultant radiologists. No reviewed study establishes general dose-reduction effectiveness or broad patient-outcome benefit.",
      primaryEndpoint:
        "Image noise and quality, stone measurements, reader severity-score completion time, and Lung-RADS agreement",
      sourceUrl: "https://doi.org/10.3390/tomography8040140"
    },
    technicalSpecifications: {
      population:
        "Adults and children were included in retrospective studies; applicability depends on protocol and configuration",
      input: ["Reconstructed CT images"],
      inputFormat: ["DICOM"],
      output: ["Processed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["DICOM CT workflow", "PACS (configuration-dependent)"],
      deployment: ["On-premise DICOM server (documented FCT configuration)"]
    },
    regulatory: {
      ce: {
        status: "unknown",
        class: "Unverified",
        type: "Unverified",
        notifiedBody: "Unverified",
        regulation: "Unverified",
        notes:
          "Historical CE marking is reported in trade press and Fujifilm material. The certificate number, scope, notified body, validity, and current EU status were not verified."
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
        "The AlgoMedica PixelShine System is intended for networking, communication, processing, and enhancement of CT images in DICOM format to assist professional radiologists and specialists in reaching their own diagnosis. FDA labeling states that processing is not effective for lesions, masses, or abnormalities smaller than 3.0 mm and that the device is not intended for use with or diagnostic interpretation of mammography images. Source: FDA 510(k) K161625."
    },
    market: {
      onMarketSince:
        "Unverified; a commercial launch was reported as planned for RSNA 2019"
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description:
          "FDA 510(k) K161625 verifies the Class II clearance, decision date, intended-use scope, and labeling limitations.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K161625.pdf"
      },
      {
        type: "Peer-reviewed Clinical Study",
        description:
          "Steuwe et al. (2022): retrospective evaluation of PixelShine for urinary-stone measurements and image quality in 45 patients; AlgoMedica supplied the software.",
        link: "https://doi.org/10.3390/diagnostics12071627"
      },
      {
        type: "Peer-reviewed Clinical Study",
        description:
          "Brendlin et al. (2022): retrospective pediatric ultra-low-dose chest CT study of 100 scans with blinded readers; measured image quality and severity-score completion time.",
        link: "https://doi.org/10.3390/tomography8040140"
      },
      {
        type: "Peer-reviewed Clinical Study",
        description:
          "Hata et al. (2020): retrospective ultra-low-dose chest CT study of 41 patients and 252 nodules; AlgoMedica performed PixelShine image processing.",
        link: "https://doi.org/10.2214/AJR.19.22680"
      },
      {
        type: "Peer-reviewed Clinical Study",
        description:
          "Bos et al. (2024): retrospective assessment of 152 head CT exams acquired on three scanners; results depended on the comparator.",
        link: "https://doi.org/10.1038/s41598-024-62394-4"
      },
      {
        type: "Peer-reviewed Clinical Study",
        description:
          "Bertl et al. (2024): comparative reader evaluation across 33 contrast-enhanced staging CT exams.",
        link: "https://doi.org/10.3390/bioengineering11121285"
      },
      {
        type: "Manufacturer Product Information",
        description:
          "Fujifilm describes the FCT PixelShine configuration, paired-image training approach, and FCT-series compatibility limitation.",
        link: "https://www.fujifilm.com/at/en/healthcare/x-ray/fct/fct-pixelshine"
      },
      {
        type: "Clinical Trial Registry",
        description:
          "ClinicalTrials.gov NCT03033615 has no results posted and an unknown status; it is not evidence of effectiveness.",
        link: "https://clinicaltrials.gov/study/NCT03033615"
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes:
      "E2: Multiple peer-reviewed academic evaluations exist, but they are retrospective and limited in scope. AlgoMedica supplied software or processed images in several studies; no completed prospective results were identified.",
    clinicalImpactNotes:
      "I2: Evidence supports protocol-specific image-quality changes and a narrow reader-task effect. It does not establish prospective patient benefit, routine-workflow effectiveness, or broad dose-reduction outcomes.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes:
      "R0: Public evidence reviewed does not verify current compatibility, local commissioning, QA, monitoring, or routine clinical deployment. Site-specific validation is not documented in these public sources.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    releaseDate: "Unverified (commercial launch reported as planned for RSNA 2019)",
    lastUpdated: "2026-11-09",
    lastRevised: "2026-11-09",
    source:
      "FDA K161625; Fujifilm FCT PixelShine product information; peer-reviewed studies listed above. Current EU certificate, first commercial-sale date, and universal compatibility are unverified."
  }
];

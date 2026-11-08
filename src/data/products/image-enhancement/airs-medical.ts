import { ProductDetails } from "@/types/productDetails";

export const AIRS_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "airs-swiftmr",
    trainingData: {
        source: "FDA 510(k) summary K230854",
        disclosureLevel: "minimal",
        description: "Deep learning-based MRI enhancement software for noise reduction and sharpening across various anatomical locations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230854.pdf"
    },
    evaluationData: {
        studyDesign: "Multi-reader retrospective study",
        description: "Multi-reader study and clinical white paper evaluating 184 MR exam pairs across 12 anatomical locations with 18 radiologists from 6 subspecialties. 93.7% of cases were preferred or rated equivalent to standard scans.",
        results: "93.7% of cases were preferred or rated as equivalent to standard scans.",
        source: "AIRS Medical clinical white paper",
        primaryEndpoint: "Diagnostic equivalence / preference rate",
        sourceUrl: "https://airsmed.com/en/clinical-white-paper/"
    },
    name: "SwiftMR",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-powered MRI enhancement solution that improves image quality and resolution of accelerated or low-quality MR scans.",
    certification: "CE & FDA",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://airsmed.com/",
    productUrl: "https://airsmed.com/swiftmr/",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Spine pathologies", "Musculoskeletal conditions"],
    releaseDate: "2021-05-15",
    version: "v3.x",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Super-resolution technology",
      "Noise reduction while preserving detail",
      "Compatible with various pulse sequences and MRI vendors",
      "Improves suboptimal acquisitions",
      "Compatible with OEM deep learning reconstruction pipelines (FDA cleared April 2026)",
      "Supports scan time reduction of up to 50%",
      "MIP auto-cutting for MR angiography (K261349)"
    ],
    compatibleSystems: [
      "Field strengths 0.25T, 0.31T, 0.4T, 0.55T, 0.6T, 1.5T and 3.0T (K261349)",
      "Validation data from Siemens, GE, Philips, Canon, Esaote, Fonar and Fujifilm scanners (K261349)"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Vendor-neutral"],
      deployment: ["Cloud-based", "On-premise option", "On-site gateway PC with cloud processing (PHI separated and de-identified; images deleted within 24 hours, per vendor)"],
      triggerForAnalysis: "Automated workflow or manual selection",
      processingTime: "<10 seconds per series; <2 min to PACS (vendor-reported)"
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
        clearanceNumber: "K230854",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2023-10-27",
        notes: "Clearance history: K210999 (2021-10-14, first clearance); K220416 (2022-05-25); K230854 (2023-10-27); K253775 (2026-03-26, product code QIH); K261349 (2026-07-24, adds MIP auto-cutting using deep learning segmentation to remove non-target tissue)",
        additionalClearances: [
          {
            description: "Cleared to operate in conjunction with OEM deep learning reconstruction pipelines",
            date: "2026-04-15",
            sourceUrl: "https://www.prnewswire.com/news-releases/airs-medicals-swiftmr-receives-fda-clearance-to-work-in-conjunction-with-oem-deep-learning-reconstruction-solutions-302742387.html"
          }
        ]
      },
      intendedUseStatement: "SwiftMR is a stand-alone medical imaging software solution intended for the acceptance, enhancement, processing, review, analysis, communication, and transfer of MR images in DICOM format. The software may be used for the enhancement of medical images, such as noise reduction and increased image sharpness, as well as for image processing, such as segmentation to remove background anatomy for Maximum Intensity Projection (MIP) visualization. (Source: FDA 510(k) K261349 Indications for Use)"
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      deploymentScale: "20+ countries, 2 million+ scans performed",
      recognitions: ["Vizient Innovative Technology contract (September 2025)"]
    },
    evidence: [
      {
        type: "Systematic Review (indirect-comparative)",
        description: "Fransen SJ, Roest C, Simonis FFJ, Yakar D, Kwee TC. The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 2025;35:4736–4746. SwiftMR is one of 14 products reviewed; covers SwiftMR-specific noise-reduction publications.",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      },
      {
        type: "Clinical White Paper",
        description: "AIRS Medical clinical white paper: 184 MR exam pairs, 12 anatomical locations, 18 radiologists from 6 subspecialties. 93.7% cases SwiftMR images preferred or equivalent.",
        link: "https://airsmed.com/en/clinical-white-paper/"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for SwiftMR (K230854). Class II, 21 CFR 892.2050, Product Code LLZ. Cleared October 27, 2023.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230854.pdf"
      },
      {
        type: "Regulatory Clearance",
        description: "Additional FDA 510(k) clearance to operate in conjunction with OEM deep learning reconstruction pipelines (April 15, 2026).",
        link: "https://www.prnewswire.com/news-releases/airs-medicals-swiftmr-receives-fda-clearance-to-work-in-conjunction-with-oem-deep-learning-reconstruction-solutions-302742387.html"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K261349 for SwiftMR (24 July 2026). Class II, 21 CFR 892.2050, Product Code QIH. Adds MIP auto-cutting; lists field strengths and validation scanner vendors.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf26/K261349.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yoo et al. (2023). Deep learning–based reconstruction for acceleration of lumbar spine MRI: a prospective comparison with standard MRI. Eur Radiol 33(12):8656–8668. Prospective, single-centre (Seoul National University Hospital), n=50, 1.5T; diagnostic performance of four radiologists compared. SwiftMR identified via the vendor's evidence page.",
        link: "https://doi.org/10.1007/s00330-023-09918-0"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lee et al. (2023). Highly accelerated knee magnetic resonance imaging using deep neural network (DNN)–based reconstruction: prospective, multi-reader, multi-vendor study. Sci Rep 13:17264. Prospective, n=45 on three 3T scanners from three vendors; 41% scan-time reduction with comparable lesion detection. SwiftMR identified via the vendor's evidence page.",
        link: "https://doi.org/10.1038/s41598-023-44248-7"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Park et al. (2025). A multinational study of deep learning-based image enhancement for multiparametric glioma MRI. Sci Rep 15:32857. Retrospective, n=294 from three institutions (NYU, Severance, SNUH); image-quality endpoints. Software named only as commercial vendor-neutral DL enhancement; AIRS Medical co-authors (including the SwiftMR developer Jeong G).",
        link: "https://doi.org/10.1038/s41598-025-17993-0"
      }
    ],
    keyPapers: [
      {"doi":"10.1038/s41598-026-60802-5","pmid":"42420358","title":"Leveraging a vendor-neutral deep learning reconstruction algorithm to reduce scan time and enhance image quality in T2-weighted liver MRI","authors":"Jeong B et al.","journal":"Scientific Reports","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Single-centre retrospective reader study naming SwiftMR; shows scan-time reduction with preserved/improved image quality — workflow-level impact. Added and verified in the 2026-08-25 sweep.","vendorIndependent":true},
      {"doi":"10.1016/j.forsciint.2026.112973","pmid":"42019274","title":"Signal-to-noise ratio improvement in postmortem MRI using deep learning reconstruction (SwiftMR)","authors":"Hyodoh H et al.","journal":"Forensic Science International","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single-centre quantitative SNR study explicitly naming SwiftMR; technical image-quality endpoint only, non-clinical (postmortem) setting. Added and verified in the 2026-08-25 sweep.","vendorIndependent":true},
      {"doi":"10.1007/s00330-023-09918-0","title":"Deep learning–based reconstruction for acceleration of lumbar spine MRI: a prospective comparison with standard MRI","authors":"Yoo H et al.","journal":"Eur Radiol","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-08 from Usman Lula's revision; DOI verified; scored from the abstract, pending reviewer check. Prospective single-centre study (n=50) comparing radiologists' sensitivity and specificity for degenerative lumbar disease on standard versus accelerated SwiftMR images; diagnostic-accuracy endpoint, so L2.","prospective":true},
      {"doi":"10.1038/s41598-023-44248-7","title":"Highly accelerated knee magnetic resonance imaging using deep neural network (DNN)–based reconstruction: prospective, multi-reader, multi-vendor study","authors":"Lee J et al.","journal":"Sci Rep","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-08 from Usman Lula's revision; DOI verified; scored from the abstract, pending reviewer check. Prospective single-institution study (n=45) on three vendors' 3T scanners; 41% scan-time reduction with comparable lesion detection, so L2.","prospective":true},
      {"doi":"10.1038/s41598-025-17993-0","title":"A multinational study of deep learning-based image enhancement for multiparametric glioma MRI","authors":"Park YW et al.","journal":"Sci Rep","year":"2025","evidenceRigor":"E2","clinicalImpact":"L1c","rationale":"Added 2026-11-08 from Usman Lula's revision; DOI verified; scored from the abstract, pending reviewer check. Retrospective three-institution study (US and Korea, n=294) with AIRS Medical co-authors; reader image-quality and artefact endpoints only, so L1c.","multiCenter":true,"multiNational":true},
      {"doi":"10.1007/s00330-025-11423-5","title":"The scientific evidence of commercial AI products for MRI acceleration: systematic review","authors":"Fransen SJ et al.","journal":"European Radiology","year":"2025","rationale":"Indirect-comparative systematic review covering 14 commercial products including SwiftMR; carries no per-product E/I level under the rubric.","vendorIndependent":true}
    ],
    evidenceRigor: "E2",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "2026-11-08: raised to E2 by Park 2025 (Sci Rep), a three-institution multinational study with AIRS Medical co-authors; Yoo 2023 (Eur Radiol) and Lee 2023 (Sci Rep) added as prospective single-centre studies with the correct DOIs (replacing the two unverifiable DOIs removed on 2026-06-15). 2026-08-25 Wave 4 per-paper sweep: two verified SwiftMR-naming primary publications were added (Jeong 2026 Sci Rep doi:10.1038/s41598-026-60802-5; Hyodoh 2026 Forensic Sci Int doi:10.1016/j.forsciint.2026.112973), both single-centre. Under per-paper scoring the maximum rigor is E1, so the product-level score moves from E2 to E1: the previous E2 rested on a vendor white paper and an indirect-comparative systematic review, neither of which carries a level. FDA 510(k) K230854 + OEM-DL expansion (Apr 2026). Fransen et al. Eur Radiol 2025 systematic review (indirect-comparative; names SwiftMR among 14 products with peer-reviewed noise-reduction articles). Clinical white paper: 184 exams, 18 radiologists. Two previously cited DOIs (Yoo et al. 10.1007/s00330-023-09679-2; Lee et al. 10.1038/s41598-023-44471-8) were removed on 2026-06-15: both return DOI-Not-Found and could not be verified to specific SwiftMR papers without a confirmed alternative DOI. PubMed re-searched 2026-06-15.",
    clinicalImpactNotes: "I2 retained — Jeong 2026 demonstrates scan-time reduction with preserved image quality (workflow level). Workflow improvement supported by vendor white paper and indirect-comparative systematic review; prospective SwiftMR scan-time studies with diagnostic endpoints (Yoo 2023, Lee 2023) added 2026-11-08 with verified DOIs.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "R3 retained after the E2→E1 rescoring (CE + FDA cleared, widely deployed). Derived from + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: false,
    clinicalEvidence: "FDA clearances + AIRS clinical white paper (184 exams) + Fransen et al. 2025 systematic review naming SwiftMR + primary studies Yoo 2023, Lee 2023, Park 2025, Jeong 2026 and Hyodoh 2026.",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-08",
    source: "FDA 510(k) database, company website, PubMed"
  }
];

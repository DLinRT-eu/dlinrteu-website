import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_ARTASSISTANT_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-artassistant",
    name: "ARTAssistant",
    company: "Manteia",
    companyUrl: "https://www.manteiamedical.com/",
    productUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K250780",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/manteia-artassistant.ts",
    description: "Standalone software for adaptive radiotherapy image processing: deep-learning generation of synthetic CT from daily CBCT or MR, plus rigid and deformable image registration. Contouring tools are manual. An ESTRO 2026 abstract describes an 'ART Assistant module of the Mozi TPS'; whether it is the same software as this cleared device is not confirmed by Manteia.",
    category: "Image Synthesis",
    certification: "FDA 510(k)",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiamedical.com/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CBCT", "MRI", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep-learning synthetic CT from CBCT or MR",
      "Rigid and deformable image registration",
      "Daily adaptive radiotherapy image processing"
    ],
    technicalSpecifications: {
      population: "Patients receiving adaptive radiotherapy; test set adults 21–100 years (FDA summary K250780)",
      input: ["CBCT", "MRI", "CT"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images", "Registrations"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS via DICOM"],
      deployment: ["Not stated in the FDA summary"],
      triggerForAnalysis: "Manual",
      processingTime: "Not stated in the FDA summary"
    },
    regulatory: {
      ce: {
        status: "not_available",
        notes: "No CE certificate found. ARTAssistant is not on the Manteia Intertek MDR product list (issued 2025-06-04, manufacturer-supplied 2026-09-29)."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K250780",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2025-12-05",
        notes: "Traditional 510(k), received 2025-03-14. Predicate K221706 (AccuContour). The summary lists 'Deep learning' as the image-conversion algorithm; registration is intensity-based."
      },
      intendedUseStatement: "The primary function of ARTAssistant is to facilitate image processing with image registration and synthetic CT (sCT) generation in adaptive radiation therapy. This enables users to meticulously design ART plans based on the processed images. (Source: FDA 510(k) K250780 Summary, accessed 2026-11-06.)"
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales"]
    },
    usesAI: true,
    trainingData: {
      disclosureLevel: "partial",
      source: "FDA 510(k) summary K250780",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250780.pdf",
      description: "560 training image sets for the deep-learning image-conversion model, sourced from China. Architecture not stated in the summary; Manteia's published method is RegGAN."
    },
    evaluationData: {
      studyDesign: "Manufacturer bench testing on an independent test set",
      primaryEndpoint: "AAPM TG-119 gamma pass rate of dose on sCT versus CT; Dice of contours on sCT versus CBCT/MR",
      source: "FDA 510(k) summary K250780",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250780.pdf",
      description: "247 test image sets from the United States, independent of training. Six cancer types: intracranial, nasopharyngeal, oesophageal, lung, liver and cervical. Test patients 57% male, 43% female; ages 21–40 13%, 41–60 44.1%, 61–80 36.8%, 81–100 6.1%; 78% White, 12% Black or African American, 10% other. CT from GE 28.3%, Philips 41.7%, Siemens 30%; MR from GE 21.6%, Philips 56.9%, Siemens 21.6%; CBCT from Varian 58.8%, Elekta 41.2%. Slice thickness 1–5 mm.",
      results: "Gamma pass rates within the TG-119 acceptance range; geometric accuracy of sCT from CBCT and MR met the requirements. Per-site numbers are not disclosed."
    },
    evidenceRigor: "E0",
    evidenceRigorNotes: "2026-11-06, pending reviewer check: no peer-reviewed study names ARTAssistant. The ESTRO 2026 abstract is a conference abstract and does not raise rigor. RegGAN method papers do not name the product.",
    clinicalImpact: "L1t",
    clinicalImpactNotes: "L1t (Levels of Efficacy), 2026-11-06, pending reviewer check: regulatory bench testing of image and dose accuracy only.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "2026-11-06, pending reviewer check: FDA-cleared, limited independent clinical evidence.",
    releaseDate: "2025-12-05",
    lastUpdated: "2026-11-06",
    lastRevised: "2026-11-06",
    evidence: [
      {
        type: "Regulatory Document",
        description: "FDA 510(k) summary K250780, ARTAssistant, cleared 2025-12-05. Deep-learning image conversion; 560 training sets (China), 247 test sets (United States).",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250780.pdf"
      },
      {
        type: "Conference abstract (not scored for rigor; level L2)",
        description: "IRCCS Regina Elena National Cancer Institute, ESTRO 2026 Abstract Book Part II, p. 646: RegGAN sCT from CBCT in the 'ART Assistant module of the Mozi TPS', 10 head-and-neck and 10 lung patients, compared with a new planning CT for HU, contours, DVH and gamma 2%/2 mm. L2 (dose/geometry comparison). Added 2026-11-06, pending reviewer check.",
        link: "https://online.flippingbook.com/view/700996046/646/"
      },
      {
        type: "Peer-reviewed method paper (not scored — product not named)",
        description: "Li et al., 'Using RegGAN to generate synthetic CT images from CBCT images acquired with different linear accelerators', BMC Cancer 2023. Manteia co-authored.",
        link: "https://doi.org/10.1186/s12885-023-11274-7"
      },
      {
        type: "Peer-reviewed method paper (not scored — product not named)",
        description: "Wang et al., 'Improving CBCT image quality to the CT level using RegGAN in esophageal cancer adaptive radiotherapy', Strahlenther Onkol 2023. Manteia co-authored.",
        link: "https://doi.org/10.1007/s00066-022-02039-5"
      }
    ],
    limitations: [
      "Not confirmed that the cleared device is the same software as the ART Assistant module of MOZI TPS.",
      "Training data from China only.",
      "The FDA summary does not report per-site numeric results.",
      "Local commissioning and validation are required before clinical use."
    ],
    source: "FDA 510(k) database and summary K250780 (retrieved 2026-11-06); ESTRO 2026 Abstract Book Part II p. 646 (retrieved 2026-11-06); Li et al. BMC Cancer 2023; Wang et al. Strahlenther Onkol 2023; Manteia Intertek MDR product list (manufacturer-supplied, received 2026-09-29)."
  }
];

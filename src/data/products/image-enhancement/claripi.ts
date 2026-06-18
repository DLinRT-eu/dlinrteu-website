
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
        studyDesign: "FDA 510(k) software V&V (K183460, K212074) plus nine peer-reviewed studies — five independent (single- and multi-site, including one prospective multicenter multinational noninferiority trial) and four vendor-affiliated (recurring Seoul National University Bundang Hospital / ClariPi Research collaboration)",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf",
        source: "FDA 510(k) summaries K183460, K212074; peer-reviewed literature (see evidence array for full citations)",
        results: "Independent evidence is consistent across designs: Lee DH et al. 2024 (prospective, multicenter, 3 sites Korea/Germany, n=296) found 33%-dose ClariCT.AI-denoised CT noninferior to standard-dose CT for malignant liver tumor detection (FOM 0.875 vs 0.880, p=.35). Park et al. 2025 (n=47) found improved diagnostic accuracy for lumbar disc herniation/stenosis vs MRI reference. Dehdab et al. 2025 (n=24 cadavers, photon-counting CT) found up to 75% dose reduction with maintained quality. Kazimierczak et al. 2024 (dental CBCT) and Kim C et al. 2022 (phantom, lung nodule volumetry vs TrueFidelity/ASiR-V) corroborate image-quality and quantitative-accuracy gains.",
        primaryEndpoint: "Diagnostic performance / noninferiority for tumor detection (Lee DH 2024); diagnostic accuracy vs MRI reference (Park 2025); dose-reduction potential and image quality (multiple phantom/technical studies)",
        description: "FDA 510(k) software verification and validation (K183460, original; K212074, AI Marketplace integration extension)."
    },
    name: "ClariCT.AI",
    company: "ClariPi",
    category: "Image Enhancement",
    githubUrl: "https://https://github.com/DLinRT-eu/dlinrteu-website/blob/main/src/data/products/image-enhancement/claripi.ts",
    description: "AI-powered CT image denoising solution using deep learning to enhance low-dose CT scans while preserving anatomical details and natural textures.",
    certification: "CE Mark, FDA 510(k)",
    logoUrl: "/logos/claripi.jpg",
    companyUrl: "https://claripi.com/",
    productUrl: "https://claripi.com/clarict-ai/",
    anatomicalLocation: ["Head", "Chest", "Heart", "Abdomen", "Pelvis", "Spine"],
    modality: "CT",
    diseaseTargeted: ["Cancer screening", "Cardiac imaging", "Pulmonary disorders", "Pediatric imaging"],
    version: "Not publicly confirmed as current. Two version identifiers found across sources: 1.1.0 (regulatory device database listing) and 1.2.3 (cited in Ahn & Kim, Diagnostics 2023). No source confirms which, if either, is the present version.",
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
        decisionDate: "2019-06-13",
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
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearances K183460 (2019) and K212074 (2021, AI Marketplace integration) for ClariCT.AI — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183460.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lee et al. (2024). Image Quality and Diagnostic Performance of Low-Dose Liver CT with Deep Learning Reconstruction versus Standard-Dose CT. Radiol Artif Intell 6(2):e230192. Prospective, multicenter (Korea + Germany), n=296. Noninferiority confirmed for malignant tumor detection at 33% dose. Independent.",
        link: "https://doi.org/10.1148/ryai.230192"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Park et al. (2025). Diagnostic performance of lumbar spine CT using deep learning denoising to evaluate disc herniation and spinal stenosis. Eur Radiol 35:7867-7876. Retrospective, n=47/229 discs, Korea. Improved sensitivity vs MRI reference. Independent.",
        link: "https://doi.org/10.1007/s00330-025-11742-7"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Dehdab et al. (2025). Evaluation of a Deep Learning Denoising Algorithm for Dose Reduction in Whole-Body Photon-Counting CT Imaging: A Cadaveric Study. Acad Radiol 32(6):3519-3531. n=24 cadavers, 192 datasets, Tübingen. Up to 75% dose reduction with maintained quality. Independent.",
        link: "https://doi.org/10.1016/j.acra.2024.12.041"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kazimierczak et al. (2024). Noise-Optimized CBCT Imaging of Temporomandibular Joints—The Impact of AI on Image Quality. J Clin Med 13(5):1502. Dental CBCT, Poland. Independent.",
        link: "https://doi.org/10.3390/jcm13051502"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kim et al. (2022). Accuracy of two deep learning-based reconstruction methods compared with an adaptive statistical iterative reconstruction method for solid and ground-glass nodule volumetry on low-dose and ultra-low-dose chest CT: a phantom study. PLoS One 17(6):e0270122. Head-to-head vs TrueFidelity and ASiR-V, Korea. Independent.",
        link: "https://doi.org/10.1371/journal.pone.0270122"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yeoh et al. (2021). Deep Learning Algorithm for Simultaneous Noise Reduction and Edge Sharpening in Low-Dose CT Images: A Pilot Study Using Lumbar Spine CT. Korean J Radiol 22(11):1850-1857. Retrospective, n=52. Vendor-affiliated (co-author Jong Hyo Kim disclosed as a ClariPI stockholder; no control over submitted data).",
        link: "https://doi.org/10.3348/kjr.2021.0140"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Choi et al. (2022). Dose reduction potential of vendor-agnostic deep learning model in comparison with deep learning-based image reconstruction algorithm on CT: a phantom study. Eur Radiol 32(2):1247-1255. Head-to-head vs GE TrueFidelity. Vendor-affiliated.",
        link: "https://doi.org/10.1007/s00330-021-08199-9"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Ahn et al. (2023). AntiHalluciNet: A Potential Auditing Tool of the Behavior of Deep Learning Denoising Models in Low-Dose Computed Tomography. Diagnostics 14(1):96. Methods/auditing-tool paper. Vendor-affiliated (ClariPi Research).",
        link: "https://doi.org/10.3390/diagnostics14010096"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kim et al. (2026). Additional Dose Reduction Potential of Vendor-Agnostic Deep Learning Model: A Phantom Study. J Korean Soc Radiol. Phantom study, Seoul National University Bundang Hospital. Vendor-affiliated (ClariPi Research).",
        link: "https://pubmed.ncbi.nlm.nih.gov/42306167/"
      }
    ],
    limitations: [
      "A recurring research cluster (Seoul National University Bundang Hospital + ClariPi Research, sharing co-author Jong Hyo Kim, ClariPi's Co-CEO/CTO) produced 4 of the 9 identified peer-reviewed studies",
      "Reported dose-reduction magnitudes vary substantially by study and anatomy (86% phantom dose-reduction potential vs. 33% dose reduction with confirmed noninferiority in the largest clinical trial), indicating site- and protocol-specific validation is needed rather than a single universal dose-reduction figure",
      "No dedicated pediatric peer-reviewed study identified despite pediatric imaging being a listed target use",
      "Version identifier inconsistent across sources (1.1.0 vs 1.2.3); current production version not publicly confirmed",
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "E2 (Validated Evidence): Lee DH et al. 2024 alone meets the full E2 bar within a single study — prospective, multicenter (3 sites, Korea and Germany), large cohort (n=296), externally validated, registered (NCT05804799), independent of ClariPi. This is corroborated by four further independent single-/multi-site studies (Park 2025, Dehdab 2025, Kazimierczak 2024, Kim C 2022) spanning three additional countries and both clinical and phantom/cadaveric designs. Four further studies (Yeoh 2021, Choi/Chang 2022, Ahn/Kim 2023, Kim J 2026) are vendor-affiliated via a recurring Seoul National University Bundang Hospital / ClariPi Research collaboration and are retained as supplementary technical evidence, not as independent validation.",
    clinicalImpactNotes: "I2 (Workflow / diagnostic accuracy, F&T Level 2): Lee DH et al. 2024 demonstrates noninferior diagnostic performance for malignant liver tumor detection at 33% dose (prospective, n=296, multicenter); Park et al. 2025 demonstrates improved diagnostic accuracy for lumbar disc herniation/stenosis against an MRI reference standard. Both are genuine diagnostic-accuracy endpoints, not just image-quality metrics, supporting I2. No evidence identified of changed treatment management (I3) or patient outcomes (I4).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption. Not elevated to R4, as no documented TG-100/RBAAF-aligned risk management, formal incident-management framework, or national-guidance alignment was identified, despite the strengthened evidence base.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    clinicalEvidence: "FDA 510(k) K183460/K212074 plus nine peer-reviewed studies: five independent (Lee DH 2024 — prospective multicenter multinational, n=296; Park 2025; Dehdab 2025; Kazimierczak 2024; Kim C 2022) and four vendor-affiliated via a recurring SNU Bundang Hospital/ClariPi Research collaboration (Yeoh 2021, Choi/Chang 2022, Ahn/Kim 2023, Kim J 2026).",
    releaseDate: "2019-06-13",
    lastUpdated: "2026-06-18",
    lastRevised: "2026-06-18",
    source: "FDA 510(k) database (K183460, K212074); peer-reviewed literature (Lee DH 2024, Park 2025, Dehdab 2025, Kazimierczak 2024, Kim C 2022, Yeoh 2021, Choi/Chang 2022, Ahn/Kim 2023, Kim J 2026)"
  }
];

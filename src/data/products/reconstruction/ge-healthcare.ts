import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-air-recon-dl",
    trainingData: {
        description: "The model is trained on a large dataset of raw MR k-space data to learn how to reduce noise and ringing/truncation artifacts during reconstruction.",
        demographics: "Adult and pediatric patients",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf",
        scannerModels: ["GE HealthCare 1.5T MR systems", "GE HealthCare 3.0T MR systems", "GE HealthCare 7.0T MR systems"],
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K193282"
    },
    evaluationData: {
        primaryEndpoint: "SNR, image sharpness, and scan-time reduction",
        studyDesign: "Retrospective multi-center and Software V&V (FDA 510(k))",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252379.pdf",
        description: "Multiple studies and FDA summaries demonstrate improved SNR, image sharpness, and scan-time reductions of up to 50%. Research across neuro, spine, liver, and cardiac applications confirms maintenance of diagnostic quality with reduced noise and artifacts.",
        results: "Vendor-reported scan-time reduction of up to 50% depending on protocol and clinical use case.",
        source: "FDA 510(k) summary K252379"
    },
    name: "AIR Recon DL",
    company: "GE HealthCare",
    category: "Reconstruction",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts",
    description: "Deep learning-based MR image reconstruction technology that processes raw MR data to reduce noise and ringing/truncation artifacts, improve image sharpness, and support shorter MRI scan times on compatible GE MR systems.",
    features: [
      "Deep learning reconstruction",
      "MRI scan-time reduction support",
      "Noise and ringing artifact reduction"
    ],
    certification: "FDA 510(k) Cleared; CE marked for selected configurations",
    logoUrl: "/logos/ge_healthcare.png",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI"],
    diseaseTargeted: [
      "Not disease-specific",
      "General diagnostic imaging"
    ],
    releaseDate: "2020-04-10",
    version: "Not publicly disclosed",
    keyFeatures: [
      "Deep learning-based MR image reconstruction from raw MR k-space data",
      "Noise and ringing/truncation artifact reduction",
      "Improved signal-to-noise ratio and image sharpness",
      "Vendor-reported scan-time reduction of up to 50% depending on protocol and clinical use case",
      "FDA-cleared use across all anatomies and patients of all ages on compatible GE 1.5T, 3.0T, and 7.0T MR systems",
      "FDA-cleared AIR Recon DL with Phase Correction enhancement for selected applications that create and combine multiple intermediate images, such as diffusion-weighted imaging",
      "Compatible with PROPELLER motion-insensitive sequences and 3D Cartesian acquisitions"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MR k-space data"],
      inputFormat: ["GE proprietary raw MR data"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "GE HealthCare 1.5T MR systems",
        "GE HealthCare 3.0T MR systems",
        "GE HealthCare 7.0T MR systems",
        "SIGNA MR platforms"
      ],
      deployment: ["On-scanner reconstruction"],
      triggerForAnalysis: "Automatic during MR reconstruction workflow",
      processingTime: "Near real-time/on-console reconstruction; exact processing time depends on sequence, scanner, and reconstruction configuration"
    },
    regulatory: {
      ce: {
        status: "ce_marked",
        class: "Not publicly verified",
        type: "Medical Device",
        regulation: "Public GE HealthCare material states AIR Recon DL was CE marked for 3T systems as of 2021. CE Mark for 7T was pending at time of FDA clearance for that platform. A public CE/MDR certificate, device class, and complete configuration scope were not identified during this review.",
        notes: "Regional disclaimers indicate that expanded features such as 3D, PROPELLER, Phase Correction, and other newer sequence-specific options may not be CE marked or available for sale in all regions."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K193282, K213717, K252379",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2020-04-10; 2022-06-08; 2025-12-23",
        notes: "K193282 (product codes LNH, LNI, MOS) is the initial FDA clearance for SIGNA Premier including the AIR Recon DL feature. K213717 expanded AIR Recon DL compatibility to PROPELLER and selected 3D Cartesian acquisitions. K252379 (product code LNH) added AIR Recon DL with Phase Correction, including a deep-learning phase-correction enhancement for applications that create and combine multiple intermediate images, such as diffusion-weighted imaging."
      },
      intendedUseStatement: "AIR Recon DL is a deep learning based reconstruction technique that is available for use on GE HealthCare 1.5T, 3.0T, and 7.0T MR systems. AIR Recon DL reduces noise and ringing (truncation artifacts) in MR images, which can be used to reduce scan time and improve image quality. AIR Recon DL is intended for use with all anatomies and for patients of all ages. Depending on the anatomy of interest being imaged, contrast agents may be used. (Source: FDA 510(k) K252379 Summary, accessed 2026-06-14)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: [
        "Integrated in compatible GE MR systems",
        "Upgrade/software option for compatible systems"
      ],
      deploymentScale: "At least 3.5 million patients scanned globally as of September 2022; available on the vast majority of GE HealthCare 1.5T, 3.0T, and 7.0T SIGNA MRI systems via MR 30 software platform"
    },
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple independent peer-reviewed studies and FDA summaries support improved SNR, image sharpness, and/or scan-time reduction feasibility across neuro, spine, liver, cardiac, and pediatric/body MRI applications. Evidence includes regulatory performance testing, clinical reader evaluations, external clinical studies, and real-world workflow/throughput evaluation. The previously listed Radiology Advances paper by Lyo et al. was removed from the product-specific evidence list because it primarily evaluated Siemens Deep Resolve rather than AIR Recon DL.",
    clinicalImpactNotes: "Workflow impact is mainly shorter MRI acquisition times and improved image quality while maintaining diagnostic quality. Clinical benefit depends on protocol design, anatomy, scanner platform, sequence type, reconstruction strength, and local validation.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from FDA 510(k) clearance, broad product availability, public CE-marking statements for selected configurations, and mature peer-reviewed evidence. Local commissioning, sequence-specific optimization, radiologist review, and quantitative workflow validation remain necessary.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) clearance K193282 for SIGNA Premier including AIR Recon DL feature; decision date 2020-04-10; product codes LNH, LNI, MOS.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K193282"
      },
      {
        type: "FDA 510(k) Summary",
        description: "K193282 FDA summary describing AIR Recon DL as a deep learning-based MR reconstruction feature and summarizing nonclinical and clinical testing.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193282.pdf"
      },
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) clearance K213717 for AIR Recon DL; decision date 2022-06-08; expansion to PROPELLER and selected 3D Cartesian acquisitions.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K213717"
      },
      {
        type: "FDA 510(k) Summary",
        description: "K213717 FDA summary for AIR Recon DL expanded compatibility with PROPELLER and selected 3D Cartesian acquisitions.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213717.pdf"
      },
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) clearance K252379 for AIR Recon DL; decision date 2025-12-23.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252379"
      },
      {
        type: "FDA 510(k) Summary",
        description: "K252379 FDA summary for AIR Recon DL with Phase Correction; decision date 2025-12-23.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252379.pdf"
      },
      {
        type: "Official Product Page",
        description: "GE HealthCare AIR Recon DL product page describing deep learning MR reconstruction and vendor-reported scan-time reduction of up to 50%.",
        link: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl"
      },
      {
        type: "Official CE/Market Availability Statement",
        description: "GE HealthCare European launch page stating AIR Recon DL is CE marked for 3T systems; public certificate/class details were not identified.",
        link: "https://landing1.gehealthcare.com/EUR-NE-UK-AIR-RECON_Bakcup-Registration-Page-AIR-Recon-DL-Launch.html"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Gorodezky et al. Impact of Deep Learning-Based Reconstruction on the Accuracy and Precision of Cardiac Tissue Characterization. Diagnostics 2026;16(2):348.",
        link: "https://doi.org/10.3390/diagnostics16020348"
      },
      {
        type: "Indirect — product name not in abstract",
        description: "Shaikh et al. Application and assessment of deep learning to routine 2D T2 FLEX spine imaging at 1.5T. European Spine Journal 2025. NOTE: 'FLEX' implies GE hardware but the abstract does not name AIR Recon DL; relabelled indirect on 2026-06-15.",
        link: "https://doi.org/10.1007/s00586-025-09305-x"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Zucker et al. Deep learning reconstruction for improving image quality of pediatric abdomen MRI using a 3D T1 fast spoiled gradient echo acquisition. Pediatric Radiology 2025;55:2037-2046.",
        link: "https://doi.org/10.1007/s00247-025-06313-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yoon et al. Comparison of image quality and lesion conspicuity between conventional and deep learning reconstruction in gadoxetic acid-enhanced liver MRI. Insights into Imaging 2024;15:257.",
        link: "https://doi.org/10.1186/s13244-024-01825-2"
      },
      {
        type: "Peer-reviewed Implementation Study",
        description: "Impact of Deep Learning Image Reconstruction Methods on MRI Throughput. Radiology: Artificial Intelligence 2024; includes k-space AIR Recon DL in outpatient MRI workflow evaluation.",
        link: "https://doi.org/10.1148/ryai.230181"
      },
      {
        type: "Technical/Algorithm Paper",
        description: "Lebel. Performance characterization of a novel deep learning-based MR image reconstruction pipeline. arXiv 2020.",
        link: "https://arxiv.org/abs/2008.06559"
      },
      {
        type: "Peer-reviewed Review",
        description: "Kiryu et al. Clinical Impact of Deep Learning Reconstruction in MRI. RadioGraphics 2023.",
        link: "https://doi.org/10.1148/rg.220133"
      },
      {
        type: "Indirect-comparative Systematic Review",
        description: "Fransen et al. The scientific evidence of commercial AI products for MRI acceleration: a systematic review. European Radiology 2025. NOTE: multi-product survey from RSNA 2023 / ECR 2024 exhibitors; not a primary AIR Recon DL study (relabelled indirect-comparative 2026-06-15).",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      }
    ],
    limitations: [
      "Performance depends on MR scanner platform, coil configuration, acquisition sequence, anatomy, and reconstruction strength",
      "Vendor-reported scan-time reduction should be locally validated for each clinical protocol before routine use",
      "Quantitative MRI applications may require sequence-specific validation after reconstruction changes, especially for diffusion/ADC and radiomics workflows",
      "CE Mark confirmed for 3T configurations; CE Mark for 7T was pending at time of initial 7T FDA clearance; public MDR certificate and device-class details were not verified as of this review",
      "Radiotherapy-specific use cases such as MR simulation, synthetic CT workflows, target/OAR delineation support, or quantitative adaptive workflows require local validation"
    ],
    clinicalEvidence: "FDA summaries and independent peer-reviewed studies support improved MR image quality and scan-time reduction feasibility across multiple anatomies and clinical applications. Clinical implementation should include local optimization and validation for each protocol and scanner configuration.",
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
    source: "FDA 510(k) database, GE HealthCare product documentation, CE-marking statements, and peer-reviewed literature"
  }
];

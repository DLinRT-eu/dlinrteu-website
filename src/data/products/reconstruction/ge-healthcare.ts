
import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-truefidelity-pro",
    name: "TrueFidelity CT",
    company: "GE HealthCare",
    category: "Reconstruction",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/en-us/products/computed-tomography/applications/true-fidelity",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts",
    description: "Deep learning-based CT image reconstruction technology that produces TrueFidelity CT images from CT projection data, improving image quality and supporting lower-dose CT protocols when locally validated.",
    features: [
      "Deep learning reconstruction",
      "CT image quality improvement",
      "Dose-optimization support"
    ],
    certification: "FDA 510(k) Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: [
      "Not disease-specific",
      "General diagnostic imaging"
    ],
    releaseDate: "2019-04-12",
    version: "Not publicly disclosed",
    keyFeatures: [
      "Deep neural network-based CT image reconstruction",
      "Improved image noise texture compared with conventional reconstruction approaches",
      "Supports head, whole body, cardiac, and vascular CT applications",
      "Designed for routine clinical reconstruction workflows on compatible GE CT systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["CT X-ray transmission/projection data"],
      inputFormat: ["GE proprietary raw CT data"],
      output: ["TrueFidelity CT reconstructed images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "Revolution CT",
        "Revolution Apex",
        "Compatible GE CT platforms"
      ],
      deployment: ["On-scanner reconstruction"],
      triggerForAnalysis: "Automatic during CT reconstruction workflow",
      processingTime: "Designed for routine clinical reconstruction speed; exact processing time is not publicly specified"
    },
    regulatory: {
      ce: {
        status: "not_publicly_verified",
        class: "Not publicly verified",
        type: "Medical Device",
        regulation: "EU CE/MDR status could not be confirmed from a public certificate or declaration of conformity during this review"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K183202",
        regulationNumber: "21 CFR 892.1750",
        productCode: "JAK",
        type: "510(k)",
        decisionDate: "2019-04-12"
      },
      intendedUseStatement: "The Deep Learning Image Reconstruction option is a deep learning-based reconstruction method intended to produce cross-sectional images of the head and whole body by computer reconstruction of X-ray transmission data taken at different angles and planes, including axial, helical/volumetric, and cardiac acquisitions, for all ages. It can be used for head, whole body, cardiac, and vascular CT applications. (Source: FDA 510(k) K183202 Summary, accessed 2026-06-10)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: [
        "Direct sales",
        "Integrated in compatible GE CT systems",
        "Upgrade for compatible systems"
      ]
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Independent phantom, clinical, radiomics, and review literature supports image-quality and dose-optimization claims. The previously listed Greffier DOI was incorrect; the relevant TrueFidelity phantom study is Greffier et al., European Radiology 2020, DOI 10.1007/s00330-020-06724-w. Evidence remains strongest for diagnostic CT image quality rather than radiotherapy-specific endpoints.",
    clinicalImpactNotes: "Potential clinical impact is workflow and protocol optimization through improved image quality and dose-reduction feasibility. Site-specific validation is required before changing clinical CT protocols or using reconstructed images in quantitative/radiomics workflows.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from FDA 510(k) clearance and independent published evaluations: moderate implementation effort with local commissioning, protocol optimization, image-quality review, and quantitative workflow validation required.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) clearance K183202 for Deep Learning Image Reconstruction; decision date 2019-04-12; regulation 21 CFR 892.1750; product code JAK.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K183202"
      },
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) Summary K183202 for Deep Learning Image Reconstruction / TrueFidelity CT Images.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183202.pdf"
      },
      {
        type: "Official Product Page",
        description: "GE HealthCare TrueFidelity CT product page describing TrueFidelity CT Images and Deep Learning Image Reconstruction.",
        link: "https://www.gehealthcare.com/en-us/products/computed-tomography/applications/true-fidelity"
      },
      {
        type: "Technical White Paper",
        description: "GE HealthCare TrueFidelity technical white paper describing DLIR design, training, deployment, and early performance evidence.",
        link: "https://www.gehealthcare.com/static/truefidelity/images/whitepaper-download/TrueFidelity%20WP_vFinal.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Greffier et al. Image quality and dose reduction opportunity of deep learning image reconstruction algorithm for CT: a phantom study. European Radiology 2020.",
        link: "https://doi.org/10.1007/s00330-020-06724-w"
      },
      {
        type: "Independent Comparative Study",
        description: "Shim et al. Quantitative evaluation of low-dose CT image quality using deep learning reconstruction: Philips Precise Image vs GE TrueFidelity. Journal of Imaging 2025;11(9):317.",
        link: "https://doi.org/10.3390/jimaging11090317"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Wang et al. Impact of deep learning based reconstruction algorithms on CT radiomic features of carotid plaques. Journal of Applied Clinical Medical Physics 2025.",
        link: "https://doi.org/10.1002/acm2.70346"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Svalkvist et al. Evaluation of deep-learning image reconstruction for chest CT images. Journal of Applied Clinical Medical Physics 2023.",
        link: "https://doi.org/10.1002/acm2.13871"
      },
      {
        type: "Peer-reviewed Review",
        description: "Koetzier et al. Deep Learning Image Reconstruction for CT. Radiology 2023.",
        link: "https://doi.org/10.1148/radiol.221257"
      }
    ],
    limitations: [
      "Performance depends on scanner hardware, acquisition protocol, reconstruction strength, anatomy, and clinical task",
      "Dose reduction should not be assumed from the algorithm alone and should be validated within site-specific clinical workflows",
      "Quantitative imaging and radiomics features may change with reconstruction algorithm and strength; local validation is required before quantitative use",
      "Public CE/MDR certificate details were not identified during this review"
    ],
    clinicalEvidence: "FDA documentation and peer-reviewed studies support improved CT image quality and dose-optimization feasibility for compatible GE CT systems. Evidence is strongest for diagnostic CT image reconstruction; radiotherapy-specific use cases require local validation.",
    lastUpdated: "2026-03-08",
    lastRevised: "2026-06-10",
    source: "FDA 510(k) database, GE HealthCare product documentation, and peer-reviewed literature"
  },
  {
    id: "ge-air-recon-dl",
    name: "AIR Recon DL",
    company: "GE HealthCare",
    category: "Reconstruction",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/en/products/magnetic-resonance-imaging/applications/air-recon-dl",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/reconstruction/ge-healthcare.ts",
    description: "Deep learning-based MR image reconstruction technology that processes raw MR data to reduce noise and ringing artifacts, improve image sharpness, and support shorter MRI scan times on compatible GE MR systems.",
    features: [
      "Deep learning reconstruction",
      "MRI scan-time reduction support",
      "Noise and ringing artifact reduction"
    ],
    certification: "FDA 510(k) Cleared",
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
      "Deep learning-based MR image reconstruction from raw MR data",
      "Noise and ringing/truncation artifact reduction",
      "Improved signal-to-noise ratio and image sharpness",
      "Vendor-reported scan-time reduction of up to 50% depending on protocol and clinical use case",
      "FDA-cleared use across all anatomies and patients of all ages on compatible GE 1.5T, 3.0T, and 7.0T MR systems"
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
        status: "cleared",
        class: "Class IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)",
        notes: "CE marked for 3T systems (as of 2021 launch page). Regional disclaimers indicate that expanded features (like 3D and PROPELLER) are FDA-cleared in the USA, but may not be CE marked or available for sale in all regions as of the review date."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        clearanceNumber: "K193282, K213717, K252379",
        regulationNumber: "21 CFR 892.1000",
        productCode: "LNH",
        type: "510(k)",
        decisionDate: "2020-04-10; 2022-06-08; 2025-12-23",
        notes: "K193282 is the initial FDA clearance for SIGNA Premier including the AIR Recon DL feature. K213717 expanded AIR Recon DL compatibility to PROPELLER and selected 3D Cartesian acquisitions. K252379 added a deep-learning phase-correction enhancement for applications that create and combine multiple intermediate images, such as diffusion-weighted imaging."
      },
      intendedUseStatement: "AIR Recon DL is a deep learning-based reconstruction technique available for use on GE HealthCare 1.5T, 3.0T, and 7.0T MR systems. AIR Recon DL reduces noise and ringing/truncation artifacts in MR images, which can be used to reduce scan time and improve image quality. AIR Recon DL is intended for use with all anatomies and for patients of all ages. Depending on the anatomy of interest being imaged, contrast agents may be used. (Source: FDA 510(k) K252379 Summary, accessed 2026-06-10)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: [
        "Integrated in compatible GE MR systems",
        "Upgrade/software option for compatible systems"
      ]
    },
    evidenceRigor: "E3",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple independent peer-reviewed studies and FDA summaries support improved SNR, image sharpness, and/or scan-time reduction feasibility across neuro, spine, liver, cardiac, and pediatric/body MRI applications. Evidence includes regulatory performance testing, clinical reader evaluations, and external clinical studies. Note: Several reviews cite a 2025 Radiology Advances paper as 'Bash et al.', but the primary first author is Lyo S.K. et al.",
    clinicalImpactNotes: "Workflow impact is mainly shorter MRI acquisition times and improved image quality while maintaining diagnostic quality. Clinical benefit depends on protocol design, anatomy, scanner platform, sequence type, and local validation.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from FDA 510(k) clearance, broad product availability, and mature peer-reviewed evidence. Local commissioning, sequence-specific optimization, radiologist review, and quantitative workflow validation remain necessary.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) clearance K193282 for SIGNA Premier including AIR Recon DL feature; decision date 2020-04-10.",
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
        type: "FDA 510(k) Summary",
        description: "K252379 FDA summary for AIR Recon DL modification adding deep-learning phase correction; decision date 2025-12-23.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252379.pdf"
      },
      {
        type: "Official Product Page",
        description: "GE HealthCare AIR Recon DL product page describing deep learning MR reconstruction and vendor-reported scan-time reduction of up to 50%.",
        link: "https://www.gehealthcare.com/en/products/magnetic-resonance-imaging/applications/air-recon-dl"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Gorodezky et al. Impact of Deep Learning-Based Reconstruction on the Accuracy and Precision of Cardiac Tissue Characterization. Diagnostics 2026;16(2):348.",
        link: "https://doi.org/10.3390/diagnostics16020348"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Shaikh et al. Application and assessment of deep learning to routine 2D T2 FLEX spine imaging at 1.5T. European Spine Journal 2025.",
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
        type: "Peer-reviewed Publication",
        description: "Lyo S.K. et al. Deep learning MRI halves scan time and preserves image quality across routine neuroradiologic examinations. Radiology Advances 2025.",
        link: "https://doi.org/10.1093/radadv/umaf029"
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
      }
    ],
    limitations: [
      "Performance depends on MR scanner platform, coil configuration, acquisition sequence, anatomy, and reconstruction strength",
      "Vendor-reported scan-time reduction should be locally validated for each clinical protocol before routine use",
      "Quantitative MRI applications may require sequence-specific validation after reconstruction changes",
      "Public CE/MDR cert for expanded configurations (PROPELLER/3D) was not verified as of this review; European availability may be restricted by region"
    ],
    clinicalEvidence: "FDA summaries and independent peer-reviewed studies support improved MR image quality and scan-time reduction feasibility across multiple anatomies and clinical applications. Clinical implementation should include local optimization and validation for each protocol and scanner configuration.",
    lastUpdated: "2026-04-13",
    lastRevised: "2026-06-10",
    source: "FDA 510(k) database, GE HealthCare product documentation, and peer-reviewed literature"
  }
];

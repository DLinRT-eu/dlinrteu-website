import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-synchrony",
    trainingData: {
        source: "FDA 510(k) summary K182687",
        disclosureLevel: "minimal",
        description: "Synchrony uses a patient-specific, treatment-session-specific AI motion model. This represents individualized motion modeling and prediction trained specifically for the individual patient during the treatment session rather than a population-trained deep-learning model.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182687.pdf"
    },
    evaluationData: {
        source: "Ferris et al. Evaluation of Radixact Motion Synchrony for 3D respiratory motion: modeling accuracy and dosimetric fidelity. JACMP 2020 (DOI: 10.1002/acm2.12978)",
        results: "Overall residual respiratory latency on the order of ±10 ms",
        sourceUrl: "https://doi.org/10.1002/acm2.12978",
        description: "Evaluations on Radixact and CyberKnife systems demonstrate technical feasibility and modeling accuracy for 3D respiratory motion, reporting residual respiratory latency on the order of ±10 ms. Clinical studies indicate successful tracking for liver and prostate SBRT with excellent toxicity outcomes.",
        primaryEndpoint: "Modeling accuracy and dosimetric fidelity",
        studyDesign: "Retrospective case-series and technical validation studies"
    },
    name: "Synchrony®",
    company: "Accuray®",
    category: "Tracking",
    description: "Accuray® Synchrony® is a real-time motion synchronization technology for target tracking and motion-compensated radiation delivery on the CyberKnife® and Radixact® Systems. It measures target location and motion using kV X-ray imaging and predicts target location from respiratory motion signals, enabling the treatment systems to compensate for motion in real time. Accuray describes Synchrony® as using a patient-specific, treatment-session-specific AI motion model; this represents individualized motion modeling and prediction rather than a population-trained deep-learning model.",
    usesAI: true,
    features: [
      "Real-time motion synchronization",
      "Patient-specific AI motion prediction modeling",
      "Automatic model updating and relearning during treatment",
      "Motion uncertainty and model validity monitoring",
      "Available on CyberKnife® and Radixact® systems"
    ],
    certification: "CE-marked system availability; FDA 510(k) cleared for Radixact® Motion Tracking and Compensation Feature",
    logoUrl: "/logos/accuray.png",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/software/synchrony/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/tracking/accuray.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["kV X-ray", "Optical respiratory surrogate", "Real-time imaging"],
    diseaseTargeted: ["Tumors or other targeted tissues requiring radiation therapy"],
    keyFeatures: [
      "Patient-specific AI motion model trained specifically for the individual patient and treatment session",
      "Real-time target tracking and motion-compensated radiation delivery",
      "CyberKnife® support for respiratory motion synchronization and robotic beam tracking",
      "Radixact® integration using kV imaging, respiratory surrogate monitoring, dynamic jaws, and binary MLC compensation",
      "Automatic model validity monitoring and real-time model updating during treatment",
      "Supports continuous treatment delivery without conventional beam gating in suitable cases",
      "Enables reduced motion-management margins and minimized dose to normal tissues when clinically appropriate",
      "Clinical implementation requires specialized commissioning, patient-specific QA, and local workflow validation"
    ],
    technicalSpecifications: {
      population: "Not age-specific in the public FDA indications; use is under the direction of a licensed medical practitioner and according to local system labeling",
      input: [
        "kV imaging data",
        "Respiratory surrogate / optical marker data",
        "Target or fiducial tracking information",
        "Treatment delivery system data"
      ],
      inputFormat: ["System-specific", "DICOM workflow components"],
      output: [
        "Motion-compensated treatment delivery",
        "Real-time tracking and model data",
        "Treatment delivery compensation commands"
      ],
      outputFormat: ["System-specific", "Treatment delivery commands"]
    },
    technology: {
      integration: ["CyberKnife® System", "Radixact® Treatment Delivery System"],
      deployment: ["System-integrated"],
      triggerForAnalysis: "Real-time during treatment delivery",
      processingTime: "Real-time motion synchronization; Accuray technical data reports overall residual respiratory latency on the order of ±10 ms, with mode-dependent imaging and model update intervals"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Class IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K182687",
        regulationNumber: "21 CFR 892.5050",
        productCode: "IYE",
        decisionDate: "2018-11-23",
        notes: "FDA-cleared device name: Motion Tracking and Compensation Feature for the Radixact Treatment Delivery System. The FDA decision was Substantially Equivalent (SESE)."
      },
      intendedUseStatement: "FDA K182687: The Motion Tracking and Compensation Feature is an option within the indications for use of the Radixact Treatment Delivery System. The Radixact Treatment Delivery System is indicated for delivery of radiation therapy, stereotactic radiotherapy, or stereotactic radiosurgery to tumors or other targeted tissues anywhere in the body under the direction of a licensed medical practitioner. The 510(k) summary describes the feature as measuring tumor location and motion using kV images and predicting tumor location based on a respiration-amplitude measurement device, after which Radixact compensates for tumor motion by making real-time adjustments. Synchrony® is also available on CyberKnife® systems under separate CyberKnife® system clearances and clinical history."
    },
    market: {
      onMarketSince: "2002 on CyberKnife®; 2019 launch on Radixact® after FDA K182687 clearance",
      distributionChannels: ["Integrated with Accuray® systems"]
    },
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Evidence includes phantom/QA validation, commissioning/implementation studies, long-term CyberKnife® Synchrony® clinical accuracy literature, and recent Radixact® clinical cohort reports. Key Radixact® JACMP reference is Ferris et al. 2020 (DOI 10.1002/acm2.12978), which corrects the erroneous citation link introduced in other evaluations. Current Radixact® clinical evidence is growing but still primarily comprised of single-center, retrospective case-series, or case-report level studies rather than large prospective multi-center trial outcomes.",
    clinicalImpactNotes: "Synchrony® enables active real-time compensation for intrafraction targets, supporting margin reduction and improved healthy tissue sparing (clinical toxicity data evaluated in Lo Conte et al. 2025). Frame benefits conservatively due to limited prospective randomized trials.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Based on cleared systems (FDA 510(k) K182687 / CE MDR availability) plus extensive peer-reviewed QA and technical validation. Clinical integration requires local commissioning, motion-management QA protocols, physical marker selection, and staff training.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Regulatory Source",
        description: "FDA 510(k) K182687: Motion Tracking and Compensation Feature for the Radixact Treatment Delivery System",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K182687"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Ferris et al. Evaluation of Radixact Motion Synchrony for 3D respiratory motion: modeling accuracy and dosimetric fidelity. JACMP 2020",
        link: "https://doi.org/10.1002/acm2.12978"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Chen et al. Comprehensive performance tests of the first clinical real-time motion tracking and compensation system using MLC and jaws. Medical Physics 2020",
        link: "https://doi.org/10.1002/mp.14171"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Goddard et al. Commissioning and routine quality assurance of the Radixact Synchrony system. JACMP 2022",
        link: "https://pubmed.ncbi.nlm.nih.gov/34914846/"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Shintani et al. Stereotactic body radiation therapy for prostate cancer using tomotherapy with Synchrony fiducial tracking. Cureus 2023",
        link: "https://pubmed.ncbi.nlm.nih.gov/37485140/"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Acharya et al. Prostate SBRT with Synchrony®-based fiducial tracking on Radixact® X9. PMID:40486323, Cureus 2025",
        link: "https://pubmed.ncbi.nlm.nih.gov/40486323/"
      },
      {
        type: "Case Report",
        description: "Chen et al. Real-time motion management for a small lung target with large tumor motion using Radixact® Synchrony®. PMID:40600108, Cureus 2025",
        link: "https://pubmed.ncbi.nlm.nih.gov/40600108/"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Okada et al. Liver tumor motion-tracking assessment with Synchrony® on Radixact®. PMID:40330330, Cureus 2025",
        link: "https://doi.org/10.7759/cureus.81598"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lo Conte et al. Prostate SBRT toxicity outcomes with Synchrony® motion tracking. PMID:40585690, Cureus 2025",
        link: "https://doi.org/10.7759/cureus.85083"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Pepin et al. Correlation and prediction uncertainties in the CyberKnife® Synchrony® respiratory tracking system. Medical Physics 2011",
        link: "https://doi.org/10.1118/1.3596527"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Seppenwoolde et al. Accuracy of tumor motion compensation algorithm from a robotic respiratory tracking system (CyberKnife® Synchrony®). IJROBP 2007",
        link: "https://doi.org/10.1016/j.ijrobp.2007.01.024"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Hoogeman et al. Clinical accuracy of the respiratory tumor tracking system of the CyberKnife®: assessment by analysis of log files. IJROBP 2009",
        link: "https://doi.org/10.1016/j.ijrobp.2008.09.011"
      }
    ],
    clinicalEvidence: "The clinical and technical utility of Synchrony® has a highly established evidence base on the CyberKnife® System (extending nearly 25 years since 2002) and a growing clinical peer-reviewed record on the Radixact® Treatment Delivery System (since its launch in 2019). Clinical studies demonstrate accurate real-time tracking, low residual latencies (±10 ms), and reduced treatment-margins. Recent clinical studies (Acharya et al. 2025, Okada et al. 2025, Lo Conte et al. 2025) demonstrate feasibility and excellent toxicity outcomes in liver tumor tracking and prostate SBRT.",
    releaseDate: "2018-11-23",
    lastUpdated: "2026-06-13",
    lastRevised: "2026-06-13",
    source: "FDA 510(k) database entries K182687; Accuray® official product documentation and AI-guided radiotherapy chronicles; technical whitepapers; integrated peer-reviewed research (JACMP 2020, Medical Physics 2020, Cureus 2025). Reviewed 2026-06-10."
  }
];

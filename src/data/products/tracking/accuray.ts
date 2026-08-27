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
    keyPapers: [
      {"doi":"10.1118/1.2739811","title":"Accuracy of tumor motion compensation algorithm from a robotic respiratory tracking system: A simulation study","authors":"Seppenwoolde Y et al.","journal":"Medical Physics","year":"2007","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre simulation/log-file study of the CyberKnife Synchrony correlation model; geometric accuracy (QA-level) endpoint.","vendorIndependent":true},
      {"doi":"10.1016/j.ijrobp.2008.12.041","pmid":"19362249","title":"Clinical accuracy of the respiratory tumor tracking system of the CyberKnife: assessment by analysis of log files","authors":"Hoogeman M et al.","journal":"IJROBP","year":"2009","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Log files of 44 lung cancer patients treated at a single centre (Erasmus MC); quantifies correlation-model and prediction error — accuracy/QA endpoint, no multi-centre cohort.","vendorIndependent":true},
      {"doi":"10.1118/1.3596527","title":"Correlation and prediction uncertainties in the CyberKnife Synchrony respiratory tracking system","authors":"Pepin EW et al.","journal":"Medical Physics","year":"2011","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre analysis of tracking-model uncertainty; QA-level endpoint.","vendorIndependent":true},
      {"doi":"10.1002/acm2.12978","title":"Evaluation of Radixact motion synchrony for 3D respiratory motion: modeling accuracy and dosimetric fidelity","authors":"Ferris WS et al.","journal":"J Appl Clin Med Phys","year":"2020","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre phantom evaluation of modelling accuracy and dosimetric fidelity; QA-level endpoint.","vendorIndependent":true},
      {"doi":"10.1002/mp.14171","title":"Comprehensive performance tests of the first clinical real-time motion tracking and compensation system using MLC and jaws","authors":"Chen GP et al.","journal":"Medical Physics","year":"2020","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre technical performance characterisation of the Radixact Synchrony delivery system; QA-level endpoint.","vendorIndependent":true},
      {"doi":"10.1002/acm2.14545","pmid":"39377559","title":"Clinical implementation and patient‐specific quality assurance solutions for real‐time target tracking and dynamic delivery in Radixact synchrony","authors":"Trujillo‐Bastidas CD et al.","journal":"J Applied Clin Med Phys","year":"2024","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre clinical implementation and patient-specific QA methodology for Synchrony deliveries; QA-level endpoint. Added in the 2026-08-25 sweep.","vendorIndependent":true},
      {"doi":"10.1002/acm2.70362","pmid":"41272391","title":"Markerless tumor tracking for lung SBRT with the Radixact Synchrony system: initial experience and short-term outcomes","authors":"Goksel EO et al.","journal":"J Appl Clin Med Phys","year":"2025","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre initial clinical experience with markerless lung tracking; workflow/delivery endpoints with short-term follow-up. Added in the 2026-08-25 sweep.","vendorIndependent":true},
      {"doi":"10.1093/jrr/rrag002","pmid":"41729611","title":"Effect of tumor size on motion tracking and dosimetric accuracy using Radixact Synchrony","authors":"Kaido R et al.","journal":"Journal of Radiation Research","year":"2026","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre study of tracking and dosimetric accuracy as a function of target size; QA-level endpoint. Added in the 2026-08-25 sweep.","vendorIndependent":true},
      {"pmid":"37485140","title":"Stereotactic body radiation therapy for prostate cancer using tomotherapy with Synchrony fiducial tracking","authors":"Shintani T et al.","journal":"Cureus","year":"2023","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre clinical series; delivery feasibility and dosimetric/workflow endpoints.","vendorIndependent":true},
      {"pmid":"40486323","title":"Prostate stereotactic body radiotherapy with Synchrony-based fiducial tracking on Radixact X9","authors":"Acharya S et al.","journal":"Cureus","year":"2025","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre clinical experience; feasibility and workflow endpoints.","vendorIndependent":true},
      {"doi":"10.7759/cureus.81598","pmid":"40330330","title":"Liver tumor motion-tracking assessment with Synchrony on Radixact","authors":"Okada H et al.","journal":"Cureus","year":"2025","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre motion-tracking accuracy assessment; QA-level endpoint.","vendorIndependent":true},
      {"doi":"10.7759/cureus.85083","pmid":"40585690","title":"Tomotherapy with Synchrony fiducial tracking for stereotactic body radiotherapy in prostate cancer: a single-centre toxicity report","authors":"Lo Conte V et al.","journal":"Cureus","year":"2025","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-arm single-centre toxicity report. Scored I2 rather than I4 because there is no comparator arm: the study documents acceptable toxicity under Synchrony tracking but does not demonstrate a toxicity reduction attributable to it.","vendorIndependent":true},
      {"pmid":"40600108","title":"Real-time motion management for a small lung target with large tumor motion using Radixact Synchrony","authors":"Chen L et al.","journal":"Cureus","year":"2025","rationale":"Single-patient case report; carries no E/I level under the rubric."}
    ],
    evidenceRigor: "E1",
    clinicalImpact: "I2",
    evidenceRigorNotes: "2026-08-25 Wave 4 per-paper sweep: every Synchrony citation was re-verified and scored individually. The published record — CyberKnife log-file/correlation-model studies and the Radixact QA, commissioning and clinical-experience literature — is uniformly single-centre and retrospective, so the maximum per-paper rigor is E1 and the product-level score moves from E2 to E1. Two verified papers were added (Trujillo-Bastidas 2024 JACMP doi:10.1002/acm2.14545; Goksel 2025 JACMP doi:10.1002/acm2.70362) plus Kaido 2026 J Radiat Res (doi:10.1093/jrr/rrag002). No multi-centre or prospective randomized Synchrony study was found (PubMed re-searched 2026-08-25); the REMIND trial (NCT05844761, 2 sites, completion 2027) is ongoing. Evidence includes phantom/QA validation, commissioning/implementation studies, long-term CyberKnife® Synchrony® clinical accuracy literature, and recent Radixact® clinical cohort reports. Key Radixact® JACMP reference is Ferris et al. 2020 (DOI 10.1002/acm2.12978), which corrects the erroneous citation link introduced in other evaluations. Current Radixact® clinical evidence is growing but still primarily comprised of single-center, retrospective case-series, or case-report level studies rather than large prospective multi-center trial outcomes.",
    clinicalImpactNotes: "2026-08-25 Wave 4 per-paper sweep: impact stays I2 (workflow/delivery). Lo Conte 2025 reports toxicity outcomes but as a single-arm series without a comparator, so it does not support I4. Synchrony® enables active real-time compensation for intrafraction targets, supporting margin reduction and improved healthy tissue sparing (clinical toxicity data evaluated in Lo Conte et al. 2025). Frame benefits conservatively due to limited prospective randomized trials.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "R3 retained despite the E2→E1 change: the product is cleared, long-established and supported by a large volume of consistent single-centre QA and clinical-experience literature. Based on cleared systems (FDA 510(k) K182687 / CE MDR availability) plus extensive peer-reviewed QA and technical validation. Clinical integration requires local commissioning, motion-management QA protocols, physical marker selection, and staff training.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
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
        description: "Hoogeman et al. Clinical accuracy of the respiratory tumor tracking system of the CyberKnife®: assessment by analysis of log files. IJROBP 2009 (PMID 19362249)",
        link: "https://doi.org/10.1016/j.ijrobp.2008.12.041"
      }
    ],
    clinicalEvidence: "The clinical and technical utility of Synchrony® has a highly established evidence base on the CyberKnife® System (extending nearly 25 years since 2002) and a growing clinical peer-reviewed record on the Radixact® Treatment Delivery System (since its launch in 2019). Clinical studies demonstrate accurate real-time tracking, low residual latencies (±10 ms), and reduced treatment-margins. Recent clinical studies (Acharya et al. 2025, Okada et al. 2025, Lo Conte et al. 2025) demonstrate feasibility and excellent toxicity outcomes in liver tumor tracking and prostate SBRT.",
    releaseDate: "2018-11-23",
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-25",
    source: "FDA 510(k) database entries K182687; Accuray® official product documentation and AI-guided radiotherapy chronicles; technical whitepapers; integrated peer-reviewed research (JACMP 2020, Medical Physics 2020, Cureus 2025). Hoogeman 2009 DOI corrected on 2026-06-15 (10.1016/j.ijrobp.2008.09.011 → 10.1016/j.ijrobp.2008.12.041). Reviewed 2026-06-15."
  }
];

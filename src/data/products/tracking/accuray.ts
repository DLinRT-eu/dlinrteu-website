import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-synchrony",
    name: "Synchrony",
    company: "Accuray",
    category: "Tracking",
    description: "Accuray has provided a solution called Synchrony, that allows tumor motion to be corrected during radiation therapy delivery. This real-time motion synchronization enables precise treatment delivery that helps clinicians to reduce treatment margins, minimize dose to normal tissue and improve patients' quality of life. Uses patient-specific AI model building for motion prediction.",
    usesAI: true,
    features: [
      "Real-time motion synchronization",
      "Patient-specific AI model building",
      "Automatic model relearning",
      "Motion uncertainty monitoring"
    ],
    certification: "CE & FDA",
    logoUrl: "/logos/accuray.png",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/software/synchrony/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/tracking/accuray.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["X-ray", "Real-time imaging"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Patient-specific AI model that builds and optimizes for individual patients",
      "Real-time motion synchronization during radiation therapy delivery",
      "Automatic validity monitoring of AI model throughout treatment",
      "Autonomous relearning and improvement during treatment without user interaction",
      "Enables reduced treatment margins and minimized dose to normal tissue",
      "Improves patients' quality of life through precise treatment delivery"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Real-time imaging data", "Motion tracking data", "Patient anatomy data", "X-ray images"],
      inputFormat: ["Proprietary", "DICOM"],
      output: ["Motion-corrected treatment delivery", "Real-time tracking data"],
      outputFormat: ["System-specific", "Treatment delivery commands"]
    },
    technology: {
      integration: ["CyberKnife System", "Radixact Treatment Delivery System"],
      deployment: ["System-integrated"],
      triggerForAnalysis: "Real-time during treatment delivery",
      processingTime: "Real-time processing with <100ms latency"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K182687",
        regulationNumber: "21 CFR 892.5050",
        productCode: "IYE",
        decisionDate: "2018-11-23",
        notes: "Synchrony Motion Tracking and Compensation Feature for Radixact Treatment Delivery System"
      },
      intendedUseStatement: "Intended for real-time motion tracking and synchronization during radiation therapy delivery to correct tumor motion and enable precise treatment delivery."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Integrated with Accuray systems"],

},
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Pepin et al. JACMP 2020 motion tracking accuracy. Multiple studies on CyberKnife and Radixact integration.",
    clinicalImpactNotes: "Workflow improvement through real-time motion compensation enabling reduced treatment margins and minimized normal tissue dose.",
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Pepin et al. Motion tracking accuracy evaluation in Journal of Applied Clinical Medical Physics 2020",
        link: "https://doi.org/10.1002/acm2.12847"
      }
    ],
    clinicalEvidence: "Synchrony is unique and takes data from an individual patient, builds a patient's specific model, which is optimized for that patient. Clinical studies demonstrate significant reduction in treatment margins and improved dose distribution to normal tissue.",
    lastUpdated: "2026-02-23",
    lastRevised: "2026-02-23",
    source: "FDA 510(k) database (K182687), Accuray official website"
  }
];

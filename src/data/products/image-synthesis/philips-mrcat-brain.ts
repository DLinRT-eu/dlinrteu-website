
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_BRAIN_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-brain",
    trainingData: {
        source: "FDA 510(k) summary K193109",
        demographics: "Adult and pediatric patients",
        disclosureLevel: "minimal",
        description: "AI-powered application generating synthetic CT images from MR scans using deep learning algorithms. Training details are not explicitly disclosed in the provided technical documentation beyond the use of deep learning for image conversion.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193109.pdf"
    },
    evaluationData: {
        results: "PTV dose differences <0.4%, positioning within ±1mm/±1°",
        source: "Aljaafari et al. Tech Innov Patient Support Radiat Oncol 2025;35:100328",
        datasetSize: "93 patients, 572 CBCT registrations",
        studyDesign: "Single-center retrospective clinical validation",
        primaryEndpoint: "PTV dose differences and CBCT registration positioning accuracy",
        sourceUrl: "https://doi.org/10.1016/j.tipsro.2025.100328",
        description: "Clinical validation of a commercial synthetic-CT solution for brain MRI-only radiotherapy. The study found PTV dose differences <0.4% and positioning accuracy within ±1mm/±1°.",
        sites: 1
    },
    name: "MRCAT Brain",
    company: "Philips",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF320/mrcat-brain-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/philips-mrcat-brain.ts",
    description: "AI-powered MR-only simulation solution that generates synthetic CT images from MR scans for radiation therapy planning of brain tumors, avoiding the need for a separate CT scan and improving workflow efficiency.",
    features: [
      "MR-only planning",
      "Synthetic CT generation",
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    category: "Image Synthesis",
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.ie/healthcare/product/HCNMRF320/mrcat-brain-mr-rt-clinical-application",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Cancer", "Brain Tumors"],
    keyFeatures: [
      "AI-powered MR-only simulation",
      "Synthetic CT generation from MR scans",
      "Deep learning algorithms for image conversion",
      "Eliminates need for separate CT scan",
      "Seamless workflow integration"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["MRI scans"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Pinnacle TPS", "PACS systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Minutes per volume"
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
        clearanceNumber: "K193109",
        productCode: "MUJ",
        decisionDate: "2020",
        notes: "AI-powered application for primary and metastatic brain tumors."
      },
      intendedUseStatement: "MRCAT Brain is indicated for radiotherapy treatment planning for primary and metastatic brain tumor patients. (Source: Philips Ingenia MR-RT Instructions for Use, Release RTgo 5.12, 3000 113 93922/781, 2024-06, p.10; FDA 510(k) K193109 Summary. IFU URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed, retrieved 2026-06-15, publicly accessible.)"
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    limitations: [
      "Patient selection (IFU): not suitable for patients with large metal objects within the imaging volume, cancers other than brain tumors, or bone anomalies/diseases in the head area.",
      "General Ingenia MR-RT exclusions: MRI contraindications, MR contrast-agent contraindications, claustrophobia, inability to tolerate position/scan time, treatment position unsuitable for MRI, patient weight > 250 kg.",
      "Operational: continuous HU values are assigned; foreign material or objects used during MR simulation (e.g. tracheal tube, central venous catheter) may not be visualized and can compromise dose calculation accuracy.",
      "Operational: MRCAT must not be used with restricted dB/dt or with a gradient slew rate restricted below the MR system limit; MRCAT images must not be post-processed.",
      "Source: Philips Ingenia MR-RT IFU, RTgo 5.12 (2024-06), pp. 10–11 and 63–68. URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed. Retrieved 2026-06-15."
    ],
    version: "1.0",
    releaseDate: "2020-01-20",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Company website; Philips Ingenia MR-RT Instructions for Use, RTgo 5.12, 3000 113 93922/781 (2024-06), pp. 10–11, 63–68 (limitations and patient selection), retrieved 2026-06-15 from https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed",
    clinicalEvidence: "Validated in clinical studies showing equivalent treatment planning accuracy compared to traditional CT-based planning",
    evidence: [
      {
        type: "Clinical Validation",
        description: "Aljaafari et al. Clinical validation of using a commercial synthetic-computed tomography solution for brain MRI-only radiotherapy treatment planning. Tech Innov Patient Support Radiat Oncol 2025;35:100328. 93 patients, 572 CBCT registrations. PTV dose differences <0.4%, positioning within ±1mm/±1°.",
        link: "https://doi.org/10.1016/j.tipsro.2025.100328"
      }
    ],
    evidenceRigor: "E1",
    evidenceRigorNotes: "Single-center vendor-independent clinical validation with 93 patients (Aljaafari et al. 2025, Leeds Teaching Hospitals NHS Trust, UK). Largest MRCAT Brain validation study to date.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated: PTV dose differences <0.4%, CBCT positioning within ±1mm/±1° (Aljaafari et al. 2025).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceExternalValidation: true
  }
];

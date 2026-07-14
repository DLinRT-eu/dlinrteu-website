
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_HEAD_NECK_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-head-and-neck",
    trainingData: {
        source: "FDA 510(k) summary K214081",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K214081.pdf",
        disclosureLevel: "minimal"
    },
    evaluationData: {
        results: "Independent: median dosimetric deviations 0.4 ± 0.7% (target volumes) and 0.4 ± 0.9% (OARs) vs planning CT in 10 H&N patients (Buschmann et al. 2026). Vendor V&V (Philips Ingenia MR-RT IFU RTgo 5.12 appendix, Tables 15–17, pp. 136–138, RTgo 5.0): 6 hospitals × 85 patients; mean (D_MRCAT−D_CT)/D_CT to PTV = 0.02 ± 0.27% (min/max +0.82/+0.97%); primary 2%/2 mm gamma pass 99.7 ± 0.50% (median 0.09 ± 0.02, body-outline matched); stricter 1%/1 mm gamma pass 97.9 ± 2.3%. Positioning study: 6 hospitals × 85 patients via DRR and CBCT correlation-function evaluation.",
        description: "Independent retrospective clinical workflow study in 10 H&N patients (Buschmann et al. 2026, Z Med Phys, PMID 39956751) combined with vendor V&V disclosed in the Philips IFU appendix (RTgo 5.0): 6 hospitals × 85 patients, mean PTV dose difference 0.02 ± 0.27%, 99.7% voxels passing 2%/2 mm gamma.",
        primaryEndpoint: "Dosimetric deviations and gamma analysis (2%/2 mm and 1%/1 mm)",
        studyDesign: "Single-center retrospective clinical workflow study (Buschmann 2026) complemented by multi-center vendor V&V (Philips IFU appendix, 6 hospitals)",
        source: "Buschmann et al. 2026, Z Med Phys (PubMed PMID 39956751); Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), Performance overview of MRCAT, Tables 15–17, pp. 136–138 (publicly accessible, retrieved 2026-06-15)",
        sites: 6
    },
    name: "MRCAT Head and Neck",
    company: "Philips",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF439/mrcat-head-and-neck-hcnmrf439-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/philips-mrcat-head-neck.ts",
    description: "AI-powered MR-only simulation solution with deep learning technology that generates synthetic CT images from MR scans for radiation therapy planning of head and neck cancers, enabling simplified workflows and improved soft tissue visualization.",
    features: [
      "MR-only planning",
      "Synthetic CT generation", 
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    category: "Image Synthesis",
    certification: "FDA 510(k) Cleared (confirmed 2022-04-05); CE Mark (not publicly verified)",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare/product/HCNMRF439/mrcat-head-and-neck-hcnmrf439-mr-rt-clinical-application",
    anatomicalLocation: ["Head", "Neck"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Nasopharyngeal Cancer", "Laryngeal Cancer"],
    keyFeatures: [
      "AI-powered MR-only simulation for head and neck",
      "Deep learning technology for image synthesis",
      "Simplified radiation therapy workflows",
      "Improved soft tissue visualization",
      "Reduced patient burden with single imaging session"
    ],
    technicalSpecifications: {
      population: "Patients with soft tissue tumors in the head and neck region",
      input: ["3D T1W mDIXON MRI scans"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Ingenia MR-RT platform", "Pinnacle TPS", "Compatible TPS via DICOM export", "PACS systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "After dedicated MRCAT mDIXON MR acquisition on the MR console",
      processingTime: "mDIXON acquisition < 3 minutes"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "EU MDR (2017/745)",
        notes: "Not publicly disclosed"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        productCode: "MUJ",
        decisionDate: "2022-04-05",
        notes: "FDA K214081; AI-enabled MR-only radiotherapy application for soft tissue tumors in head and neck. Traditional 510(k) substantial equivalence decision."
      },
      intendedUseStatement: "MRCAT Head and Neck is indicated for radiotherapy treatment planning for patients with soft tissue tumors in the Head and Neck region. (Source: Philips Ingenia MR-RT Instructions for Use, Release RTgo 5.12, 3000 113 93922/781, 2024-06, p.10; FDA 510(k) K214081 Summary. IFU URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed, retrieved 2026-06-15, publicly accessible.)"
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Partnerships"],
},
    limitations: [
      "Patient selection (IFU): not suitable for patients with large metal objects (e.g. metal prosthesis) in the imaging volume, cancers other than head-and-neck soft-tissue cancer, bone anomalies/diseases in the H&N area, or body diameter at shoulder/chest exceeding 60 cm (L-R) or 34 cm (A-P) within the planning FOV.",
      "General Ingenia MR-RT exclusions: MRI contraindications, MR contrast-agent contraindications, claustrophobia, inability to tolerate position/scan time, treatment position unsuitable for MRI, patient weight > 250 kg.",
      "Operational: continuous HU values are assigned; foreign material used during MR simulation (e.g. bolus, mouthpiece, tracheal tube, CVC) may not be visualized and can compromise dose calculation accuracy.",
      "Operational: MRCAT must not be used with restricted dB/dt or with a gradient slew rate restricted below the MR system limit; MRCAT images must not be post-processed.",
      "Source: Philips Ingenia MR-RT IFU, RTgo 5.12 (2024-06), pp. 10–11 and 63–68. URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed. Retrieved 2026-06-15."
    ],
    version: "2.0",
    releaseDate: "2022-10-20",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "FDA 510(k) K214081; Philips product documentation; peer-reviewed clinical validation study; Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), pp. 10–11, 63–68 (limitations and patient selection), retrieved 2026-06-15",
    clinicalEvidence: "Peer-reviewed retrospective clinical workflow study (Buschmann et al. 2026, Z Med Phys, PubMed PMID 39956751) in 10 head-and-neck patients reported median dosimetric deviations of 0.4 ± 0.7% for target volumes and 0.4 ± 0.9% for organs at risk versus planning CT, supporting MR-only RT planning feasibility with acceptable clinical accuracy.",
    evidenceRigor: "E1",
    evidenceRigorNotes: "Independent peer-reviewed retrospective clinical workflow and dosimetric validation study (Buschmann et al. 2026, Z Med Phys, PMID 39956751, single-center, n=10). Complemented by multi-center vendor V&V disclosed in the Philips IFU appendix (RTgo 5.0, 6 hospitals × 85 patients): mean PTV dose difference 0.02 ± 0.27%, 99.7% voxels passing 2%/2 mm gamma and 97.9% passing the stricter 1%/1 mm criterion (body-outline matched). Vendor V&V does not by itself promote E (not vendor-independent), but materially extends multi-center technical evidence. Indirect-comparative context: Cusumano, Maspero et al. Radiother Oncol 2026;... MESCAL initiative benchmark dataset and acceptance levels for MRI-only RT commissioning (DOI 10.1016/j.radonc.2026.111530) — provides community acceptance levels relevant to any MR-only sCT workflow including MRCAT H&N, but does not directly evaluate MRCAT.",
    clinicalImpact: "I2",
    clinicalImpactNotes: "Workflow-level clinical utility demonstrated — enables MR-only radiotherapy planning and reduces CT-MR registration burden for eligible head-and-neck soft tissue tumor workflows. Peer-reviewed retrospective evidence supports dosimetric accuracy feasibility but not improved tumor control, toxicity, or survival outcomes.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Raised from R2 to R3 (2026-06-15): vendor V&V across 6 hospitals × 85 patients disclosed in the Philips IFU appendix, combined with peer-reviewed validation (Buschmann 2026), supports moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceExternalValidation: true,
  }
];

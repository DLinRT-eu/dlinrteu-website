
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_PELVIS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-pelvis",
    trainingData: {
        disclosureLevel: "minimal",
        description: "AI-based MR-only simulation platform using proprietary algorithms to generate synthetic CT images from MR scans. Training details are not explicitly disclosed in the regulatory documentation.",
        source: "FDA 510(k) summary K182888",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182888.pdf"
    },
    evaluationData: {
        source: "Persson et al. Int J Radiat Oncol Biol Phys 2020 (DOI: 10.1016/j.ijrobp.2020.07.027); Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), Performance overview of MRCAT, Tables 15–17, pp. 136–138 (publicly accessible, retrieved 2026-06-15)",
        sourceUrl: "https://doi.org/10.1016/j.ijrobp.2020.07.027",
        studyDesign: "Independent multicenter/multivendor validation (MR-OPERA) plus multi-center vendor V&V (Philips IFU appendix, 4 hospitals)",
        primaryEndpoint: "Dosimetric equivalence to CT-based planning; gamma analysis (3%/3 mm)",
        description: "Independent multicenter/multivendor MR-OPERA validation (Persson et al. 2020) demonstrating dosimetric equivalence to CT-based planning, complemented by vendor V&V disclosed in the Philips IFU appendix (RTgo 4.1): 4 hospitals × 103 patients, mean PTV dose difference −0.31 ± 0.51%, 99.9% voxels passing 3%/3 mm gamma.",
        results: "Independent: dosimetric equivalence to CT in multicenter/multivendor MR-OPERA setting (Persson et al. 2020). Vendor V&V (Philips IFU appendix, RTgo 4.1): 4 hospitals × 103 patients; mean (D_MRCAT−D_CT)/D_CT to PTV = −0.31 ± 0.51% (min/max −1.71/+0.46%); 3%/3 mm gamma pass 99.9 ± 0.64% (median gamma 0.15 ± 0.09). Positioning study: 1 hospital × 11 patients.",
        sites: 4
    },
    name: "MRCAT Pelvis",
    company: "Philips",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/philips-mrcat-pelvis.ts",
    description: "AI-based MR-only simulation platform that generates synthetic CT images from MR scans for radiation therapy planning of pelvic cancers, streamlining the radiation therapy planning process with proprietary algorithms.",
    features: [
      "MR-only planning",
      "Synthetic CT generation",
      "AI-based algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    category: "Image Synthesis",
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.ie/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application",
    anatomicalLocation: ["Pelvis"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Gynecological Cancers", "Rectal Cancer"],
    keyFeatures: [
      "AI-based MR-only simulation platform",
      "Synthetic CT generation for pelvic region",
      "Proprietary AI technology",
      "Streamlined radiation therapy planning",
      "Superior soft tissue contrast"
    ],
    technicalSpecifications: {
      population: "Adult patients",
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
        clearanceNumber: "K182888",
        productCode: "LLZ",
        decisionDate: "2019-05",
        notes: "Part of Philips MR-RT platform. Extended MR-only workflow to broader pelvic applications."
      },
      intendedUseStatement: "MRCAT Pelvis is indicated for radiotherapy treatment planning of soft tissue cancers in the pelvic region. (Source: Philips Ingenia MR-RT Instructions for Use, Release RTgo 5.12, 3000 113 93922/781, 2024-06, p.10; FDA 510(k) K182888 Summary. IFU URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed, retrieved 2026-06-15, publicly accessible.)"
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    limitations: [
      "Patient selection (IFU): not suitable for patients with large metal objects (e.g. hip prosthesis) in the imaging volume, cancers other than pelvic soft-tissue cancer, bone anomalies/diseases in the pelvic area, or body diameter in the pelvic area exceeding 50 cm (L-R) or 30 cm (A-P) within the planning FOV.",
      "General Ingenia MR-RT exclusions: MRI contraindications, MR contrast-agent contraindications, claustrophobia, inability to tolerate position/scan time, treatment position unsuitable for MRI, patient weight > 250 kg.",
      "Operational: continuous HU values are assigned; signal-void volumes inside the body outline other than compact bone are interpreted as water-rich or fatty tissue, which can mis-categorize rectal gas, foreign material, or implants and locally affect dose calculation accuracy.",
      "Operational: generate MRCAT Pelvis images before any contrast agent is administered to the patient — otherwise the MRCAT post-processing step may fail.",
      "Operational: MRCAT must not be used with restricted dB/dt or with a gradient slew rate restricted below the MR system limit; MRCAT images must not be post-processed.",
      "Source: Philips Ingenia MR-RT IFU, RTgo 5.12 (2024-06), pp. 10–11 and 63–68. URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed. Retrieved 2026-06-15."
    ],
    version: "Current",
    releaseDate: "2018",
    lastUpdated: "2026-06-15",
    lastRevised: "2026-06-15",
    source: "Company website; Philips Ingenia MR-RT Instructions for Use, RTgo 5.12, 3000 113 93922/781 (2024-06), pp. 10–11, 63–68 (limitations and patient selection), retrieved 2026-06-15 from https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed",
    clinicalEvidence: "Clinical validation studies demonstrate dosimetric equivalence to CT-based planning for pelvic radiation therapy",
    evidence: [
      {
        type: "Multicenter Study",
        description: "Persson et al. MR-OPERA: A Multicenter/Multivendor Validation of Magnetic Resonance Imaging-Only Prostate Treatment Planning Using Synthetic Computed Tomography Images. Int J Radiat Oncol Biol Phys 2020;108(5):1265-1275.",
        link: "https://doi.org/10.1016/j.ijrobp.2020.07.027"
      }
    ],
    evidenceRigor: "E1",
    evidenceRigorNotes: "MR-OPERA multicenter/multivendor validation (Persson et al. 2020) with multiple clinical sites. Additional clinical implementation studies support dosimetric equivalence.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Technical efficacy demonstrated: dosimetric equivalence to CT-based planning for pelvic RT (MR-OPERA study).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceExternalValidation: true
  }
];


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
        source: "Maspero et al. Phys Imaging Radiat Oncol 2018;7:58–64 (DOI 10.1016/j.phro.2018.09.002); Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781 (2024-06), Performance overview of MRCAT, Tables 15–17, pp. 136–138 (publicly accessible, retrieved 2026-06-15); indirect-comparative: Cusumano, Maspero et al. Radiother Oncol 2026 MESCAL (DOI 10.1016/j.radonc.2026.111530)",
        sourceUrl: "https://doi.org/10.1016/j.phro.2018.09.002",
        studyDesign: "Independent peer-reviewed feasibility study (Maspero 2018, rectum) + vendor V&V disclosed in Philips IFU appendix (4 hospitals)",
        primaryEndpoint: "Dosimetric equivalence to CT-based planning; gamma analysis (3%/3 mm)",
        description: "Independent: Maspero et al. (Phys Imaging Radiat Oncol 2018, DOI 10.1016/j.phro.2018.09.002) demonstrated feasibility of MR-only rectum radiotherapy using the commercial Philips MRCAT pelvis synthetic CT generator (direct evaluation of MRCAT). Vendor V&V (Philips IFU appendix, RTgo 4.1): 4 hospitals × 103 patients, mean PTV dose difference −0.31 ± 0.51%, 99.9% voxels passing 3%/3 mm gamma. Indirect-comparative context: Cusumano, Maspero et al. Radiother Oncol 2026 MESCAL initiative (DOI 10.1016/j.radonc.2026.111530) provides community benchmark dataset and acceptance levels for MR-only RT commissioning. NOTE: previous citation to Persson et al. MR-OPERA removed on 2026-06-15 — MR-OPERA validates the Spectronic MRiPlanner atlas-based synthetic CT (not Philips MRCAT) and therefore is not direct evidence for MRCAT Pelvis.",
        results: "Independent (Maspero 2018, rectum, n=12): MR-only dosimetric agreement with CT-based planning within clinically acceptable tolerances for rectal cancer VMAT. Vendor V&V (Philips IFU appendix, RTgo 4.1): 4 hospitals × 103 patients; mean (D_MRCAT−D_CT)/D_CT to PTV = −0.31 ± 0.51% (min/max −1.71/+0.46%); 3%/3 mm gamma pass 99.9 ± 0.64% (median gamma 0.15 ± 0.09). Positioning study: 1 hospital × 11 patients.",
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
    modality: ["MRI"],
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
    clinicalEvidence: "Independent feasibility study by Maspero et al. (Phys Imaging Radiat Oncol 2018, DOI 10.1016/j.phro.2018.09.002) directly evaluating the commercial Philips MRCAT pelvis synthetic CT generator for MR-only rectum radiotherapy, complemented by vendor V&V across 4 hospitals (Philips IFU appendix).",
    evidence: [
      {
        type: "Clinical Validation",
        description: "Maspero M et al. Feasibility of magnetic resonance imaging-only rectum radiotherapy with a commercial synthetic computed tomography generation solution. Phys Imaging Radiat Oncol 2018;7:58–64. Direct evaluation of Philips MRCAT pelvis for rectal cancer MR-only RT.",
        link: "https://doi.org/10.1016/j.phro.2018.09.002"
      },
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative. Radiother Oncol 2026. Community benchmark relevant to MRCAT Pelvis commissioning; not a direct MRCAT evaluation.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      }
    ],
    evidenceRigor: "E1",
    evidenceRigorNotes: "Restored to E1 on 2026-06-15 after adding Maspero et al. 2018 (Phys Imaging Radiat Oncol, DOI 10.1016/j.phro.2018.09.002), an independent peer-reviewed feasibility study that directly evaluates Philips MRCAT pelvis for MR-only rectal cancer RT. Cusumano/Maspero MESCAL 2026 (Radiother Oncol, DOI 10.1016/j.radonc.2026.111530) kept as indirect-comparative community benchmark. Vendor V&V across 4 hospitals × 103 patients in the Philips IFU appendix complements but does not by itself promote E.",
    clinicalImpact: "I1",
    clinicalImpactNotes: "Independent feasibility evidence (Maspero 2018, rectum) plus vendor V&V across 4 hospitals demonstrate dosimetric equivalence to CT-based planning for pelvic RT; no outcome-level data.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Raised from R2 to R3 (2026-06-15) after addition of Maspero 2018 direct MRCAT pelvis evaluation. Moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceExternalValidation: true
  }
];

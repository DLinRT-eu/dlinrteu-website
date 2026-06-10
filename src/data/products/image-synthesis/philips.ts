import { ProductDetails } from "@/types/productDetails";

export const MRCATPelvis: ProductDetails = {
  id: "philips-mrcat-pelvis",
  name: "MRCAT Pelvis",
  market: {
    onMarketSince: "2018",
    distributionChannels: ["Direct sales"]
  },
  source: "Company website",
  company: "Philips",
  logoUrl: "/logos/philips.png",
  version: "Current",
  website: "https://www.philips.ie/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application",
  category: "Image Synthesis",
  evidence: [
    {
      link: "https://doi.org/10.1016/j.ijrobp.2020.07.027",
      type: "Multicenter Study",
      description: "Persson et al. MR-OPERA: A Multicenter/Multivendor Validation of Magnetic Resonance Imaging-Only Prostate Treatment Planning Using Synthetic Computed Tomography Images. Int J Radiat Oncol Biol Phys 2020;108(5):1265-1275."
    },
    {
      link: "https://www.documents.philips.com/assets/20170523/b6b1b7f14d774bcd9b24a77c015dc969.pdf",
      type: "White Paper",
      level: "1t",
      description: "Philips white paper "
    }
  ],
  features: [
    "MR-only planning",
    "Synthetic CT generation",
    "AI-based algorithms",
    "Automatic CT conversion",
    "Integrated workflow"
  ],
  modality: "MRI",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/philips-mrcat-pelvis.ts",
  companyUrl: "https://www.philips.com/",
  productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIa",
      status: "cleared",
      regulation: "MDR (EU 2017/745)"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "Part of Philips MR-RT platform. Extended MR-only workflow to broader pelvic applications.",
      status: "510k_cleared",
      productCode: "LLZ",
      decisionDate: "2019-05",
      clearanceNumber: "K182888"
    },
    intendedUseStatement: "MRCAT Pelvis is indicated for radiotherapy treatment planning of soft tissue cancers in the pelvic region. (Source: FDA 510(k) K182888 Summary, accessed 2026-05-30)"
  },
  technology: {
    deployment: ["On-premises"],
    integration: ["Pinnacle TPS", "PACS systems"],
    processingTime: "Minutes per volume",
    triggerForAnalysis: "Within treatment planning workflow"
  },
  description: "AI-based MR-only simulation platform that generates synthetic CT images from MR scans for radiation therapy planning of pelvic cancers, streamlining the radiation therapy planning process with proprietary algorithms.",
  keyFeatures: [
    "AI-based MR-only simulation platform",
    "Synthetic CT generation for pelvic region",
    "Proprietary AI technology",
    "Streamlined radiation therapy planning",
    "Superior soft tissue contrast"
  ],
  lastRevised: "2026-05-30",
  lastUpdated: "2026-03-08",
  releaseDate: "2018",
  certification: "CE Mark, FDA Cleared",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I1",
  diseaseTargeted: ["Prostate Cancer", "Gynecological Cancers", "Rectal Cancer"],
  clinicalEvidence: "Clinical validation studies demonstrate dosimetric equivalence to CT-based planning for pelvic radiation therapy",
  adoptionReadiness: "R3",
  anatomicalLocation: ["Pelvis"],
  evidenceRigorNotes: "MR-OPERA multicenter/multivendor validation (Persson et al. 2020) with multiple clinical sites. Additional clinical implementation studies support dosimetric equivalence.",
  clinicalImpactNotes: "Technical efficacy demonstrated: dosimetric equivalence to CT-based planning for pelvic RT (MR-OPERA study).",
  evidenceMultiCenter: true,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["MRI scans"],
    output: ["Synthetic CT images"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM"]
  },
  evidenceVendorIndependent: true,
  evidenceExternalValidation: true
};

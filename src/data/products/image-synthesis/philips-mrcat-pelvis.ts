
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_PELVIS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-pelvis",
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
        status: "Approved",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K182888",
        productCode: "LLZ",
        decisionDate: "2019-05",
        notes: "Part of Philips MR-RT platform. Extended MR-only workflow to broader pelvic applications."
      },
      intendedUseStatement: "For generating synthetic CT images from MR scans for radiation therapy planning of pelvic cancers."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "Current",
    releaseDate: "2018",
    lastUpdated: "2025-12-12",
    lastRevised: "2026-01-02",
    source: "Company website",
    clinicalEvidence: "Clinical validation studies demonstrate dosimetric equivalence to CT-based planning for pelvic radiation therapy"
  }
];

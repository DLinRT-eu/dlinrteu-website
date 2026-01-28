
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-prostate-auto-contouring",
    name: "MRCAT Prostate + Auto-Contouring",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/philips.ts",
    description: "MR-only radiotherapy solution for prostate that combines synthetic CT generation (MRCAT) with model-based adaptive auto-contouring, enabling complete treatment planning workflow without CT imaging.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    anatomicalLocation: ["Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "Model-based adaptive auto-contouring",
      "MR-only workflow (eliminates CT)",
      "Synthetic CT (MRCAT) generation",
      "One-click automated workflow",
      "Bulk motion correction via bone registration",
      "< 5 minute processing time"
    ],
    technicalSpecifications: {
      population: "Adult patients (accuracy: average distance < 1.5mm)",
      input: ["MRI (T1W mDIXON XD, T2W TSE)"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Synthetic CT (MRCAT)"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM CT"]
    },
    technology: {
      integration: ["Ingenia MR-RT console", "DICOM export to any TPS"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automated during MR acquisition",
      processingTime: "< 5 minutes (parallel with scanning)"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)",
        decisionDate: "2015",
        notes: "First MR-only radiotherapy solution. Combines MRCAT synthetic CT generation with model-based auto-contouring for prostate treatment planning."
      },
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"]
    },
    supportedStructures: [
      "Pelvis: Prostate (anatomical)",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Bladder (inner wall)",
      "Pelvis: Bladder (outer wall)",
      "Pelvis: Rectum",
      "Pelvis: Penile Bulb",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Body Outline"
    ],
    lastRevised: "2026-01-08",
    source: "Philips product documentation (2019)"
  }
];


import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_HEAD_NECK_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-head-and-neck",
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
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.ie/healthcare/solutions/magnetic-resonance/therapy-systems/mr-rt",
    anatomicalLocation: ["Head", "Neck"],
    modality: "MRI",
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
        productCode: "LLZ",
        decisionDate: "2022-10",
        notes: "AI-enabled MR-only head and neck radiotherapy application. Enables MR as sole imaging modality for RT planning of soft tissue tumors in head and neck."
      },
      intendedUseStatement: "For generating synthetic CT images from MR scans for radiation therapy planning of head and neck cancers."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Partnerships"],

},
    version: "1.5",
    releaseDate: "2022-10-20",
    lastUpdated: "2024-08-08",
    lastRevised: "2026-01-02",
    source: "Company website",
    clinicalEvidence: "Clinical studies demonstrate comparable treatment planning accuracy to CT-based workflows for head and neck radiation therapy"
  }
];

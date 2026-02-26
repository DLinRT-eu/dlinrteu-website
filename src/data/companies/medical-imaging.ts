
import { CompanyDetails } from "@/types/company";

export const MEDICAL_IMAGING_COMPANIES: CompanyDetails[] = [
  {
    "id": "ge-healthcare",
    "name": "GE Healthcare",
    "description": "Leading provider of medical imaging and information technologies.",
    "website": "https://www.gehealthcare.com",
    "productIds": [
      "ge-auto-segmentation", 
      "ge-truefidelity-pro", 
      "ge-air-recon-dl",
      "ge-dlip-ct",
      "ge-air-recon-dl-enhancement",
      "ge-healthcare-irt",
      "ge-mr-contour-dl"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/ge_healthcare.png",
    "primaryTask": "Reconstruction",
    "secondaryTasks": ["Auto-Contouring", "Image Enhancement", "Platform"]
  },
  {
    "id": "philips-healthcare",
    "name": "Philips",
    "description": "Global leader in health technology, offering comprehensive radiation oncology solutions.",
    "website": "https://www.philips.com/healthcare",
    "productIds": [
      "philips-auto-contouring",
      "philips-mrcat-head-and-neck",
      "philips-mrcat-brain",
      "philips-mrcat-pelvis",
      "philips-precise-image",
      "philips-smartspeed",
      "philips-smartdose-ct-enhancement"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/philips.png",
    "primaryTask": "Image Synthesis",
    "secondaryTasks": ["Reconstruction", "Auto-Contouring", "Image Enhancement"]
  },
  {
    "id": "siemens-healthineers",
    "name": "Siemens Healthineers",
    "description": "Pioneer in medical technology and digital health solutions.",
    "website": "https://www.siemens-healthineers.com",
    "productIds": [
      "siemens-syngo-ct", 
      "siemens-ai-rad-companion", 
      "directorgans",
      "siemens-dual-energy-optimizer",
      "siemens-deep-resolve"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/siemens.png",
    "primaryTask": "Auto-Contouring",
    "secondaryTasks": ["Image Synthesis", "Image Enhancement", "Reconstruction"]
  },
  {
    "id": "canon-medical",
    "name": "Canon Medical Systems",
    "description": "Global medical equipment manufacturer with focus on AI-powered imaging systems.",
    "website": "https://global.medical.canon/",
    "productIds": [
      "canon-aice-ct", 
      "canon-aice-mr",
      "canon-piqe"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/canon.jpg",
    "primaryTask": "Reconstruction",
    "secondaryTasks": ["Image Enhancement"]
  },
  {
    "id": "united-imaging",
    "name": "United Imaging",
    "description": "Global manufacturer of advanced medical imaging equipment with AI solutions.",
    "website": "https://www.united-imaging.com/",
    "productIds": [
      "united-uai-vision-recon", 
      "united-uaifi-umr",
      "united-hd-tof",
      "united-ucs-ai"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/unitedimaging.png",
    "primaryTask": "Reconstruction",
    "secondaryTasks": ["Image Enhancement"]
  },
  {
    "id": "taiwan-medical-imaging",
    "name": "Taiwan Medical Imaging Co.",
    "description": "Specialized medical imaging company focused on AI-powered brain image interpretation and longitudinal analysis.",
    "website": "https://www.taimedimg.com",
    "productIds": [
      "taimedimg-deepmets"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/Taiwan_MedImag.svg",
    "primaryTask": "Auto-Contouring"
  },
  {
    "id": "algomedica",
    "name": "AlgoMedica",
    "description": "Medical imaging AI company specializing in CT scan enhancement and radiation dose reduction; creator of PixelShine.",
    "website": "https://www.algomedica.com/",
    "productIds": [
      "algomedica-pixelshine"
    ],
    "category": "Medical Imaging",
    "logoUrl": "/logos/algomedica.png",
    "primaryTask": "Image Enhancement"
  },
  {
    "id": "quanta-computer",
    "name": "Quanta Computer, Inc.",
    "description": "Taiwanese technology company manufacturing AI-powered medical imaging solutions for radiation therapy.",
    "website": "https://www.quantatw.com/",
    "productIds": ["qoca-smart-rt"],
    "category": "Medical Imaging",
    "primaryTask": "Auto-Contouring"
  }
];

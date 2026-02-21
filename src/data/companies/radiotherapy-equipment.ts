
import { CompanyDetails } from "@/types/company";

export const RADIOTHERAPY_EQUIPMENT_COMPANIES: CompanyDetails[] = [
  {
    "id": "elekta",
    "name": "Elekta",
    "description": "Provider of precision radiation medicine solutions with AI-enhanced imaging.",
    "website": "https://www.elekta.com/",
    "productIds": [
      "elekta-iris"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/Elekta.png",
    "primaryTask": "Reconstruction"
  },
  {
    "id": "accuray",
    "name": "Accuray",
    "description": "Developer of radiotherapy systems with AI-enhanced imaging capabilities.",
    "website": "https://www.accuray.com/",
    "productIds": [
      "accuray-synchrony",
      
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/accuray.png",
    "primaryTask": "Tracking"
  },
  {
    "id": "sun-nuclear",
    "name": "Sun Nuclear (Mirion Medical)",
    "description": "Leading provider of radiation therapy quality assurance systems, patient QA solutions, and AI-powered treatment planning tools. Part of Mirion Medical since 2021.",
    "website": "https://www.sunnuclear.com/",
    "productIds": [
      "oncospace-predictive-planning",
      "sun-nuclear-suncheck-patient"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/SunNuclear.png",
    "primaryTask": "Treatment Planning",
    "secondaryTasks": ["Performance Monitor"]
  },
  {
    "id": "varian",
    "name": "Varian (Siemens Healthineers)",
    "description": "Global leader in radiotherapy solutions including treatment delivery systems, oncology software, and patient quality assurance tools. Part of Siemens Healthineers since 2021.",
    "website": "https://www.varian.com/",
    "productIds": [
      "varian-mobius3d"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/varian.jpg",
    "primaryTask": "Performance Monitor"
  },
  {
    "id": "md-anderson",
    "name": "MD Anderson Cancer Center",
    "description": "Leading cancer center providing AI-powered radiation planning tools and automated contouring solutions.",
    "website": "https://www.mdanderson.org/",
    "productIds": [
      "rpa-radiation-planning-assistant"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/md_anderson.svg",
    "primaryTask": "Treatment Planning"
  },
  {
    "id": "brainlab",
    "name": "Brainlab",
    "description": "Global leader in software-driven medical technology providing AI-powered solutions for neurosurgery and radiation oncology, including automated segmentation and treatment planning.",
    "website": "https://www.brainlab.com/",
    "productIds": [
      "brainlab-elements-ai-tumor-seg",
      "brainlab-elements-rt-seg"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/Brainlab.jpg",
    "primaryTask": "Auto-Contouring"
  },
];

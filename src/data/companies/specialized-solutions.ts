
import { CompanyDetails } from "@/types/company";

export const SPECIALIZED_SOLUTIONS_COMPANIES: CompanyDetails[] = [
  {
    "id": "spectronic-medical",
    "eudamed": {
      "srn": "SE-MF-000024476",
      "registeredName": "Spectronic Medical AB",
      "role": "Manufacturer",
      "country": "SE",
      "status": "active",
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=Spectronic+Medical",
      "lastVerified": "2026-09-22"
    },
    "name": "Spectronic Medical",
    "description": "Specialists in MRI-only radiotherapy planning solutions.",
    "website": "https://spectronicmedical.com/",
    "productIds": ["spectronic-mriplanner"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/spectronic-medical.jpg",
    "primaryTask": "Image Synthesis",
    "secondaryTasks": ["Auto-Contouring"]
  },
  {
    "id": "informai",
    "name": "InformAI",
    "description": "US developer of AI software for healthcare, including deep learning dose prediction for radiotherapy planning.",
    "website": "https://www.informai.com",
    "productIds": ["informai-radoncai"],
    "category": "Specialized Solutions",
    "primaryTask": "Treatment Planning"
  },
  {
    "id": "raysearch",
    "eudamed": {
      "srn": "SE-MF-000001908",
      "registeredName": "RAYSEARCH LABORATORIES AB (PUBL)",
      "role": "Manufacturer",
      "country": "SE",
      "status": "active",
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=RaySearch+Laboratories",
      "lastVerified": "2026-09-22"
    },
    "name": "RaySearch Laboratories",
    "description": "Developer of innovative software solutions for radiation therapy treatment planning.",
    "website": "https://www.raysearchlabs.com",
    "productIds": ["raysearch-raystation", "raysearch-raystation-planning", "raysearch-rayintelligence"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/raystation.jpg",
    "primaryTask": "Treatment Planning",
    "secondaryTasks": ["Auto-Contouring", "Performance Monitor"]
  },
  {
    "id": "airs-medical",
    "eudamed": {
      "srn": "KR-MF-000009149",
      "registeredName": "AIRS Medical Inc.",
      "role": "Manufacturer",
      "country": "KR",
      "status": "active",
      "certificates": [
        {"certificateNumber": "SCAR-23.2.1.0", "notifiedBody": "3022", "type": "quality-management-system", "validFrom": "2026-07-24", "validUntil": "2029-01-05", "status": "issued"},
        {"certificateNumber": "C596987", "notifiedBody": "2460", "type": "quality-management-system", "validFrom": "2024-01-05", "validUntil": "2029-01-05", "status": "issued"}
      ],
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=AIRS+Medical",
      "lastVerified": "2026-09-22"
    },
    "name": "AIRS Medical",
    "description": "AI company focused on enhancing medical imaging efficiency and quality.",
    "website": "https://airsmed.com/",
    "productIds": [
      "airs-swiftmr"
    ],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/airs.jpg",
    "primaryTask": "Image Enhancement"
  },
  {
    "id": "claripi",
    "eudamed": {
      "srn": "KR-MF-000031518",
      "registeredName": "ClariPi Inc.",
      "role": "Manufacturer",
      "country": "KR",
      "status": "active",
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=ClariPi",
      "lastVerified": "2026-09-22"
    },
    "name": "ClariPi",
    "description": "Korean AI medical imaging company specializing in CT image denoising and dose reduction solutions, founded in 2015 with roots at Seoul National University.",
    "website": "https://claripi.com/",
    "productIds": ["claripi-clarict-ai", "claripi-clariace"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/claripi.jpg",
    "primaryTask": "Image Enhancement"
  },
  {
    "id": "subtle-medical",
    "eudamed": {
      "srn": "US-MF-000032747",
      "registeredName": "Subtle Medical, Inc.",
      "role": "Manufacturer",
      "country": "US",
      "status": "active",
      "certificates": [
        {"certificateNumber": "28620157147", "notifiedBody": "2862", "type": "quality-management-system", "validFrom": "2023-10-10", "validUntil": "2028-07-14", "status": "issued"}
      ],
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=Subtle+Medical",
      "lastVerified": "2026-09-22"
    },
    "name": "Subtle Medical",
    "description": "AI company focused on enhancing medical imaging efficiency and quality.",
    "website": "https://subtlemedical.com/",
    "productIds": [
      "subtle-mr", 
      "subtle-pet",
      "subtle-hd-pet",
      "subtle-aimify",
      "subtle-hd",
      "subtle-hd-ct"
    ],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/SubtleMedical.jpg",
    "primaryTask": "Image Enhancement"
  },
  {
    "id": "ptw-dosimetry",
    "eudamed": {
      "srn": "DE-MF-000005794",
      "registeredName": "PTW-Freiburg Physikalisch-Technische Werkst\u00e4tten Dr. Pychlau GmbH",
      "role": "Manufacturer",
      "country": "DE",
      "status": "active",
      "sourceUrl": "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=PTW",
      "lastVerified": "2026-09-22"
    },
    "name": "PTW",
    "description": "Leading provider of dosimetry solutions and quality assurance systems for radiation therapy.",
    "website": "https://www.ptwdosimetry.com",
    "productIds": ["ptw-aqualis"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/ptw.jpg",
    "primaryTask": "Performance Monitor"
  },
  {
    "id": "pymedix",
    "name": "PyMedix",
    "description": "Specialists in medical imaging registration and analysis solutions.",
    "website": "https://pymedix.com/",
    "productIds": ["pymedix-registration"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/pymedix.png",
    "primaryTask": "Registration"
  },
  {
    "id": "medlever",
    "name": "MedLever, Inc.",
    "description": "AI-powered workflow orchestration and work management platform for radiation oncology. Built with data integrity at the core to unify clinical and financial pathways.",
    "website": "https://medlever.com/",
    "productIds": ["medlever-assistant-pipeline", "medlever-copilot-pipeline"],
    "category": "Specialized Solutions",
    "logoUrl": "/logos/medlever.jpg",
    "primaryTask": "Platform"
  },
  {
    id: "medmind-technology",
    name: "MedMind Technology Co., Ltd.",
    description: "Chinese medical AI company developing deep learning auto-contouring solutions for radiation therapy, with 120+ OAR models and deployment in 360+ hospitals.",
    website: "https://www.medicalmind.cn/en.html",
    productIds: ["medmind-rt-mind-ai"],
    category: "Specialized Solutions",
    logoUrl: "/logos/medmind.png",
    primaryTask: "Auto-Contouring"
  },
  {
    id: "quanta-computer",
    eudamed: {
      srn: "TW-MF-000022042",
      registeredName: "Quanta Computer Inc.",
      role: "Manufacturer",
      country: "TW",
      status: "active",
      sourceUrl: "https://ec.europa.eu/tools/eudamed/api/eos?page=0&pageSize=20&size=20&languageIso2Code=en&name=Quanta+Computer+Inc.",
      lastVerified: "2026-09-22"
    },
    name: "Quanta Computer Inc.",
    description: "Taiwanese technology company developing AI-powered medical imaging solutions, including the QOCA® image Smart RT Contouring System for organ-at-risk delineation in radiotherapy planning.",
    website: "https://www.quantatw.com/quanta/english/default.aspx",
    productIds: ["quanta-qoca-image-smart-rt"],
    category: "Specialized Solutions",
    logoUrl: "/logos/quanta-computer.png",
    primaryTask: "Auto-Contouring"
  },
  {
    id: "lumonus",
    name: "Lumonus",
    description: "Radiation-oncology AI company (Sydney, AU and New York, US) building an \"Oncology Intelligence Layer\" that automates consult, documentation, planning management and analytics using LLMs and machine learning. Marketed under an FDA Clinical Decision Support Software (CDSS) exemption pathway.",
    website: "https://www.lumonus.com",
    productIds: ["lumonus-ai"],
    category: "Specialized Solutions",
    logoUrl: "/logos/lumonus.jpeg",
    primaryTask: "Platform",
    secondaryTasks: ["Performance Monitor", "Treatment Planning"]
  },
];

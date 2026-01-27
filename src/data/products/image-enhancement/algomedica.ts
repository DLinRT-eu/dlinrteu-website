
import { ProductDetails } from "@/types/productDetails";

export const ALGOMEDICA_PRODUCTS: ProductDetails[] = [
  {
    id: "algomedica-pixelshine",
    name: "PixelShine",
    company: "AlgoMedica",
    category: "Image Enhancement",
    certification: "FDA Cleared",
    releaseDate: "2016-09-19",
    description:
      "Deep-learning CT denoising that enhances image quality and supports low-radiation protocols; vendor-agnostic across CT scanners.",
    logoUrl: "/logos/algomedica.png",
    companyUrl: "https://algomedica.com/",
    productUrl: "https://algomedica.com/low-radation-ct-scans-algomedica",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/algomedica.ts",
    contactEmail: "info@algomedica.com",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    keyFeatures: [
      "Noise reduction while maintaining diagnostic detail",
      "Improved SNR and low-contrast detectability",
      "Enables lower-dose CT protocols without compromising quality",
      "Seamless integration into existing workflows"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner console", "Imaging gateways"],
      deployment: ["On-premise", "Edge device", "Cloud (optional)"]
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDD",
        notifiedBody: "BSI (Notified Body 0086)",
        regulation: "MDD 93/42/EEC"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K161625",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        type: "510(k)",
        decisionDate: "2016-09-19"
      },
      intendedUseStatement:
        "The AlgoMedica PixelShine System is intended for networking, communication, processing and enhancement of CT images in DICOM format. It is specifically indicated for assisting professional radiologists and specialists in reaching their own diagnosis. The device processing is not effective for lesion, mass or abnormalities of sizes less than 3.0 mm. The AlgoMedica PixelShine is not intended for use with or for diagnostic interpretation of mammography images."
    },
    market: {
      onMarketSince: "2019-05"
    },
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance documentation for PixelShine",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K161625.pdf"
      },
      {
        type: "Use cases and scientific publications",
        description: "Clinical case studies and scientific publications demonstrating PixelShine effectiveness",
        link: "https://algomedica.com/medical-imaging-resources#case-studies"      
      }
    ],
    lastUpdated: "2025-09-01",
    lastRevised: "2026-01-02",
    source: "FDA 510(k) database and company provided information"
  }
];

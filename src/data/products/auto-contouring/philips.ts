import { ProductDetails } from "@/types/productDetails";

export const MRCATProstateAutoContouring: ProductDetails = {
  id: "philips-mrcat-prostate-auto-contouring",
  name: "MRCAT Prostate + Auto-Contouring",
  market: {
    onMarketSince: "2016",
    distributionChannels: ["Direct sales"]
  },
  source: "Philips product documentation (2019); releaseDate from Philips press release (31 Mar 2016) announcing first commercial MR-only solution for prostate treatment planning with FDA clearance (2026-06-01)",
  company: "Philips",
  logoUrl: "/logos/philips.png",
  version: "1",
  website: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
  category: "Auto-Contouring",
  modality: ["MRI"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/philips.ts",
  companyUrl: "https://www.philips.com/healthcare",
  productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
  regulatory: {
    ce: {
      type: "Medical Device",
      class: "IIb",
      status: "cleared"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "Cleared as part of Philips Ingenia MR-RT system. MRCAT Prostate + Auto-Contouring is a clinical application running on the cleared MR-RT platform. First MR-only radiotherapy solution.",
      status: "510k_cleared",
      productCode: "LNH",
      decisionDate: "2015",
      regulationNumber: "21 CFR 892.1000"
    },
    intendedUseStatement: "As a plug-in clinical application to Ingenia MR-RT, MRCAT Prostate + Auto-Contouring provides attenuation maps and automated, MR-based contours of prostate and organs at risk in as little as 20 minutes – all in a repeatable 'one-click' workflow. (Source: Philips MRCAT Prostate + Auto-Contouring product page, https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application, accessed 2026-05-30. No verbatim FDA IFU publicly available — cleared as part of the Philips Ingenia MR-RT system platform.)"
  },
  technology: {
    deployment: ["On-premises"],
    integration: ["Ingenia MR-RT console", "DICOM export to any TPS"],
    processingTime: "< 5 minutes (parallel with scanning)",
    triggerForAnalysis: "Automated during MR acquisition"
  },
  description: "MR-only radiotherapy solution for prostate that combines synthetic CT generation (MRCAT) with model-based adaptive auto-contouring, enabling complete treatment planning workflow without CT imaging.",
  keyFeatures: [
    "Model-based adaptive auto-contouring",
    "MR-only workflow (eliminates CT)",
    "Synthetic CT (MRCAT) generation",
    "One-click automated workflow",
    "Bulk motion correction via bone registration",
    "< 5 minute processing time"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  releaseDate: "2016-03-31",
  trainingData: {
    source: "FDA 510(k) summary K150965",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
    description: "Model-based adaptive auto-contouring trained for adult prostate cancer patients. Training details for this legacy clinical application are not publicly disclosed.",
    demographics: "Adult patients",
    disclosureLevel: "minimal"
  },
  certification: "CE & FDA",
  evidenceRigor: "E0",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I0",
  evaluationData: {
    source: "FDA 510(k) summary (Philips Ingenia MR-RT system)",
    results: "Average distance < 1.5mm",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K150965.pdf",
    description: "Software validation associated with the MRCAT Prostate + Auto-Contouring application. The technology provides automated MR-based contours of the prostate and organs at risk with a geometric accuracy of average distance < 1.5mm.",
    studyDesign: "Software V&V (FDA 510(k))",
    primaryEndpoint: "Average distance (geometric accuracy)"
  },
  diseaseTargeted: ["Prostate Cancer"],
  adoptionReadiness: "R2",
  anatomicalLocation: ["Pelvis"],
  evidenceRigorNotes: "Legacy product. No auto-contouring-specific peer-reviewed publications found. MRCAT synthetic CT studies exist but not for auto-contouring component. PubMed searched 2026-06-15.",
  clinicalImpactNotes: "No published clinical impact data for auto-contouring functionality specifically. PubMed searched 2026-06-15.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
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
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
  technicalSpecifications: {
    input: ["MRI (T1W mDIXON XD, T2W TSE)"],
    output: ["Structure sets", "Synthetic CT (MRCAT)"],
    population: "Adult patients (accuracy: average distance < 1.5mm)",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT", "DICOM CT"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

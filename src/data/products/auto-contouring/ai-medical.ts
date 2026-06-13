import { ProductDetails } from "@/types/productDetails";

export const Jazz: ProductDetails = {
  id: "ai-medical-jazz",
  trainingData: {
      source: "FDA 510(k) summary K231572",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K231572.pdf",
      disclosureLevel: "minimal"
  },
  evaluationData: {
      description: "Blinded three-center study evaluating MS lesion detection and reading time. Jazz identified significantly more new lesions (63 vs 24) and slowly expanding lesions (95 vs 0) compared to standard clinical reports, with an average reading time of 2min33s.",
      sites: 3,
      datasetSize: "117 MRI scans",
      studyDesign: "Retrospective multi-center blinded study",
      source: "Fedrau et al. Neuroradiology 2024 (DOI: 10.1007/s00234-024-03293-3)",
      sourceUrl: "https://doi.org/10.1007/s00234-024-03293-3",
      countries: 3,
      primaryEndpoint: "Number of lesions described and reading time",
      results: "Jazz detected 63 new lesions vs 24 in standard reports; average reading time 2min33s per case."
  },
  name: "Jazz",
  market: {
    onMarketSince: "2020",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  source: "FDA 510(k) database (K231572), company official sources",
  company: "AI Medical",
  logoUrl: "/logos/ai-medical.png",
  version: "2.0",
  website: "https://www.ai-medical.ch/jazz",
  category: "Auto-Contouring",
  evidence: [
    {
      doi: "10.1007/s00234-024-03293-3",
      link: "10.1007/s00234-024-03293-3",
      type: "Clinical Study",
      year: "2024",
      title: "Evaluation of the quality and the productivity of neuroradiological reading of multiple sclerosis follow-up MRI scans using an intelligent automation software",
      authors: "Fedrau",
      journal: "Neuroradiology",
      description: "Purpose The assessment of multiple sclerosis (MS) lesions on follow-up magnetic resonance imaging (MRI) is tedious, time-consuming, and error-prone. Automation of low-level tasks could enhance the radiologist in this work. We evaluate the intelligent automation software Jazz in a blinded three centers study, for the assessment of new, slowly expanding, and contrast-enhancing MS lesions. Methods In three separate centers, 117 MS follow-up MRIs were blindly analyzed on fluid attenuated inversion recovery (FLAIR), pre- and post-gadolinium T1-weighted images using Jazz by 2 neuroradiologists in each center. The reading time was recorded. The ground truth was defined in a second reading by side-by-side comparison of both reports from Jazz and the standard clinical report. The number of described new, slowly expanding, and contrast-enhancing lesions described with Jazz was compared to the lesions described in the standard clinical report. Results A total of 96 new lesions from 41 patients and 162 slowly expanding lesions (SELs) from 61 patients were described in the ground truth reading. A significantly larger number of new lesions were described using Jazz compared to the standard clinical report (63 versus 24). No SELs were reported in the standard clinical report, while 95 SELs were reported on average using Jazz. A total of 4 new contrast-enhancing lesions were found in all reports. The reading with Jazz was very time efficient, taking on average 2min33s ± 1min0s per case. Overall inter-reader agreement for new lesions between the readers using Jazz was moderate for new lesions (Cohen kappa = 0.5) and slight for SELs (0.08). Conclusion The quality and the productivity of neuroradiological reading of MS follow-up MRI scans can be significantly improved using the dedicated software Jazz."
    }
  ],
  modality: ["MRI"],
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ai-medical.ts",
  companyUrl: "https://www.ai-medical.ch/",
  productUrl: "https://www.ai-medical.ch/jazz",
  regulatory: {
    ce: {
      type: "MDR",
      class: "Class IIa",
      status: "cleared",
      regulation: "MDR 2017/745"
    },
    fda: {
      type: "510(k)",
      class: "Class II",
      notes: "First FDA-cleared product from AI Medical AG (Swiss medtech startup)",
      status: "510k_cleared",
      productCode: "LLZ",
      decisionDate: "2023-10-23",
      clearanceNumber: "K231572",
      regulationNumber: "21 CFR 892.2050"
    },
    intendedUseStatement: "AI-driven radiological software for long-term lesion tracking, quantification, and reporting in MR follow-up scan assessments. Intended to augment clinical assessment by radiologists and radio-oncologists."
  },
  technology: {
    deployment: ["Cloud-based", "On-premises"],
    integration: ["PACS integration"],
    processingTime: "Minutes per case",
    triggerForAnalysis: "Manual or automated"
  },
  description: "Long-terms lesion tracking and reporting.",
  keyFeatures: [
    "AI-powered contouring",
    "Workflow integration",
    "Multiple anatomical sites",
    "Lesion tracking - mark once, remember forever"
  ],
  lastRevised: "2026-06-13",
  lastUpdated: "2026-06-13",
  limitations: [
    "Indicated for MRI follow-up scans only; not validated for initial diagnostic imaging",
    "Designed as a diagnostic aid for lesion annotation and tracking; does not replace clinical assessment by radiologists or radio-oncologists",
    "Requires PACS integration for volumetric quantification and lesion evolution tracking",
    "Brain lesion tracking only; other anatomical sites not currently supported",
    "Performance may vary with non-standard MRI sequences or protocols"
  ],
  releaseDate: "2023-05-15",
  certification: "CE & FDA",
  evidenceRigor: "E1",
  subspeciality: "Radiation Oncology",
  clinicalImpact: "I1",
  diseaseTargeted: ["Multiple Cancer Types"],
  clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract",
  adoptionReadiness: "R3",
  anatomicalLocation: ["Brain"],
  evidenceRigorNotes: "Vendor references Medical Physics Journal 2023 and ESTRO 2022 abstract, but specific DOIs not found in PubMed search (2026-02-26). Downgraded from E2 to E1 as peer-reviewed publications cannot be verified.",
  clinicalImpactNotes: "Vendor-reported clinical evidence for lesion tracking workflow. No independently verifiable clinical impact data.",
  evidenceMultiCenter: false,
  evidenceProspective: false,
  supportedStructures: ["Brain: Lesions"],
  evidenceMultiNational: false,
  adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
  technicalSpecifications: {
    input: ["MRI"],
    output: ["Structure sets"],
    population: "Adult patients",
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  evidenceVendorIndependent: false,
  evidenceExternalValidation: false
};

export const AI_MEDICAL_PRODUCTS: ProductDetails[] = [Jazz];


import { ProductDetails } from "@/types/productDetails";

export const NEOSOMA_PLATFORM: ProductDetails = {
  id: "neosoma-platform",
  name: "Neosoma Platform (Brain Mets, Glioma)",
  company: "Neosoma",
  category: "Auto-Contouring",
  description: "Cloud platform with deep learning models that contour known brain metastases and high-grade gliomas on MRI, measure them and track lesions over time. Contours (GTVs) can be imported into treatment planning systems.",
  features: ["Deep learning lesion segmentation", "Longitudinal lesion tracking", "Volumetric quantification", "Export of GTV contours to treatment planning systems"],
  certification: "FDA",
  logoUrl: "/logos/neosoma.png",
  companyUrl: "https://www.neosomainc.com",
  productUrl: "https://www.neosomainc.com/neosoma-platform",
  website: "https://www.neosomainc.com/neosoma-platform",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/neosoma.ts",
  anatomicalLocation: ["Brain"],
  modality: ["MRI"],
  diseaseTargeted: ["Brain Metastases", "High-grade Glioma"],
  releaseDate: "2025-12-17",
  keyFeatures: [
    "Deep learning contouring of known or previously diagnosed brain tumours on MRI, generating GTV contours for radiation oncology planning (FDA K252922)",
    "Longitudinal lesion tracking and per-timepoint reports (vendor website)",
    "PACS integration and import of GTV contours into planning systems such as Eclipse, MIM and Gamma Plan (vendor website)",
    "Separate glioma module (NS-HGlio, FDA K221738) for semi-automatic labelling and volumetric quantification of high-grade glioma"
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["MRI (axial T1 post-contrast for brain metastases)"],
    inputFormat: ["DICOM"],
    output: ["Tumour contours (GTV)", "Volumetric reports"],
    outputFormat: ["DICOM"]
  },
  technology: {
    integration: ["PACS", "Treatment planning systems"],
    deployment: ["Cloud-based"],
    triggerForAnalysis: "Automated sending of DICOM studies from PACS",
    processingTime: "Not publicly disclosed"
  },
  regulatory: {
    ce: {
      status: "not_ce",
      notes: "No CE marking or EUDAMED record identified as of 2026-11-17. The submitted issue listed CE as 'Under review'; no source confirms this."
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K252922",
      productCode: "QIH",
      decisionDate: "2025-12-17",
      notes: "K252922 (Neosoma Brain Mets, reviewed by FDA's Radiation Therapy Team). Glioma module: K221738 (NS-HGlio, 2022-09-27), cleared for labelling and volumetric quantification, not specifically for radiotherapy contouring."
    },
    intendedUseStatement: "The Neosoma software uses an artificial intelligence algorithm (i.e., deep learning neural networks) to contour (segment) known or previously diagnosed brain tumors on MRI images. It is not intended to detect tumors for diagnosis and is for adult patients only. In a radiation oncology planning workflow it is intended for generating Gross Tumor Volume (GTV) contours, which medical professionals must confirm or modify. (Source: FDA 510(k) K252922, accessed 2026-11-17)"
  },
  market: {
    onMarketSince: "2022",
    distributionChannels: ["Direct sales"]
  },
  supportedStructures: [
    "Brain: Brain Metastases GTV",
    "Brain: High-grade Glioma GTV"
  ],
  structuresProvenance: {
    source: "FDA 510(k) K252922 and Poel et al. Radiother Oncol 2026",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-11-17",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252922.pdf"
  },
  trainingData: {
    description: "Training data not described in the FDA summary beyond being from sites separate from the test sites.",
    source: "FDA 510(k) summary K252922",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252922.pdf",
    disclosureLevel: "minimal"
  },
  evaluationData: {
    studyDesign: "Retrospective, blinded, multicentre standalone performance study (US and non-US sites not used for training)",
    results: "70 subjects/MRIs; sensitivity 0.90 (95% CI 0.87–0.94), 0.57 false-positive lesions per MRI, Dice 0.86, HD95 1.78 mm, mean surface distance 0.36 mm. Consistent across scanner vendor, field strength and demographic subgroups.",
    description: "Reference standard from three US board-certified neuroradiologists; Canon, GE, Siemens and Toshiba scanners at 1.5T and 3T.",
    primaryEndpoint: "Lesion sensitivity, false-positive rate, Dice, HD95, MSD",
    source: "FDA 510(k) summary K252922",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252922.pdf"
  },
  keyPapers: [
    {"doi":"10.1093/neuonc/noag152","title":"Comprehensive performance testing and external validation of an AI algorithm to detect and segment brain metastases","authors":"Kotecha R et al.","journal":"Neuro-Oncology","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"External validation of brain metastasis detection and segmentation against experts on multiple datasets; listed by Neosoma; vendor involvement not confirmed (full text not read)."},
    {"doi":"10.1016/j.radonc.2025.111308","title":"Evaluation of compartmentalized automatic segmentation for definition of the GTV in glioblastoma radiotherapy","authors":"Poel R et al.","journal":"Radiother Oncol","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Single-centre (Inselspital Bern) comparison of Neosoma Glioma postoperative GTV contours with expert contours, including dosimetric equivalence and contouring time; full text not read."}
  ],
  evidence: [
    {
      type: "FDA 510(k) Summary",
      description: "FDA 510(k) K252922, Neosoma Brain Mets (2025-12-17).",
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K252922.pdf"
    },
    {
      type: "FDA 510(k) Summary",
      description: "FDA 510(k) K221738, NS-HGlio (2022-09-27).",
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K221738.pdf"
    },
    {
      type: "Peer-reviewed Publication",
      description: "Kotecha R et al. Comprehensive performance testing and external validation of an AI algorithm to detect and segment brain metastases. Neuro-Oncology 2026;28:2449-2460.",
      link: "https://doi.org/10.1093/neuonc/noag152"
    },
    {
      type: "Peer-reviewed Publication",
      description: "Poel R et al. Evaluation of compartmentalized automatic segmentation for definition of the GTV in glioblastoma radiotherapy. Radiotherapy and Oncology 2026;214:111308.",
      link: "https://doi.org/10.1016/j.radonc.2025.111308"
    },
    {
      type: "Company Publications List",
      description: "Neosoma publications page (vendor-curated).",
      link: "https://www.neosomainc.com/publications"
    }
  ],
  limitations: [
    "Intended only for known or previously diagnosed brain tumours; not for detection or diagnosis (FDA K252922)",
    "Contours must be confirmed or modified by medical professionals before use in planning",
    "Adult patients only",
    "No CE marking identified; availability outside the US not confirmed",
    "Glioma module clearance (K221738) covers labelling and volumetry, not radiotherapy contouring specifically"
  ],
  evidenceRigor: "E1",
  clinicalImpact: "L2",
  evidenceRigorNotes: "Added 2026-11-17 from GitHub issue #172. FDA K252922 multicentre standalone test (n=70). Two peer-reviewed studies (Kotecha 2026 Neuro-Oncology, Poel 2026 Radiother Oncol) verified via Crossref; full texts not read, vendor co-authorship not confirmed. E1 provisional.",
  clinicalImpactNotes: "Technical/geometric accuracy (Dice, HD95) and contouring time; Poel 2026 reports dosimetric equivalence to consensus contours and >50% contouring-time reduction (per vendor summary of the paper). No outcome endpoints. L2.",
  adoptionReadiness: "R3",
  adoptionReadinessNotes: "Derived from E1 + FDA 510(k): moderate implementation effort — local validation of GTV contours and planning-system import required before adoption.",
  evidenceVendorIndependent: false,
  evidenceMultiCenter: true,
  evidenceMultiNational: true,
  evidenceProspective: false,
  evidenceExternalValidation: true,
  clinicalEvidence: "FDA multicentre standalone performance study and two 2026 peer-reviewed evaluations (brain metastases external validation; glioblastoma postoperative GTV).",
  lastUpdated: "2026-11-17",
  lastRevised: "2026-11-17",
  source: "FDA 510(k) K252922, K221738; vendor website; peer-reviewed literature"
};

export const NEOSOMA_PRODUCTS: ProductDetails[] = [NEOSOMA_PLATFORM];

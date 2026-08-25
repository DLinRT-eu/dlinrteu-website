import { ProductDetails } from "@/types/productDetails";
import { ANNOTATE_ALL_STRUCTURES } from "./therapanacea-structures";

export const Annotate: ProductDetails = {
  id: "therapanacea-annotate",
  trainingData: {
    description: "Models trained on expert-delineated CT datasets following international contouring guidelines across major cancer sites (Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Training data reviewed and validated by clinical experts. Dataset details not fully disclosed publicly.",
    disclosureLevel: "partial",
    source: "Therapanacea product page and FDA 510(k) summary K211539",
    sourceUrl: "https://therapanacea.com/products",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16"
  },
  evaluationData: {
    studyDesign: "Multi-center retrospective and prospective evaluation; Turing test evaluation vs. MIM ProtégéAI",
    source: "DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25); Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654)",
    sourceUrl: "https://doi.org/10.4103/jmp.jmp_11_25",
    description: "DiTusa et al. (2025) directly compared TheraPanacea Annotate vs. MIM ProtégéAI using a blinded Turing test design. Lê et al. (2024) evaluated Annotate performance on Head & Neck DECT images at Gustave Roussy (74 patients, 13 structures). Both studies confirm clinically acceptable OAR auto-segmentation quality.",
    results: "Turing test: AI-generated contours indistinguishable from expert-drawn for multiple structures (DiTusa 2025). H&N DECT: PEI80-DD achieved highest DSC scores (Lê 2024).",
    primaryEndpoint: "Turing test indistinguishability; DSC / 95HD against clinical reference"
  },
  name: "Annotate",
  company: "Therapanacea",
  companyUrl: "https://therapanacea.com/",
  productUrl: "https://therapanacea.com/products",
  githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  description: "AI-powered, CE-marked and FDA-cleared auto-contouring software providing zero-click, automatic delineation of organs at risk (OARs) and lymph nodes for all major cancer sites. The ART-Plan structure library v3.2.0 publishes four CT models: Head & Neck (46 OARs, 19 LNs), Thorax/Breast/Abdo including SBRT lung and heart sub-structures (73 OARs, 12 LNs), Pelvis Male (19 OARs, 15 LNs, 3 ROIs) and Pelvis Female (18 OARs, 20 LNs, 2 ROIs). Cloud-based, GDPR-compliant, with seamless TPS integration and batch processing. MRI models are part of MR-Box and BrachyBox (separate products).",
  category: "Auto-Contouring",
  certification: "CE & FDA",
  logoUrl: "/logos/therapanacea.png",
  website: "https://therapanacea.com/products",
  anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis", "Lung"],
  modality: ["CT"],
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  keyFeatures: [
    "Zero-click automatic delineation of OARs and lymph nodes across four CT models",
    "Coverage of Head & Neck, Thorax/Breast/Abdo (incl. SBRT lung and heart sub-structures), Pelvis male and female",
    "Follows international contouring guidelines (Grégoire 2014, DAHANCA 2020, EPTN Eekers 2021, Mir 2020, ESTRO Offersen 2015, Gay 2012, Valentini 2016, UK SABR Consortium 2019)",
    "Rib-by-rib (1–12, bilateral) and cardiac sub-structure delineation in the thoracic model",
    "Validated pelvic nodal and mesorectum models (Valentini 2016) added in v3.2.0",
    "Batch mode for background processing with direct export to TPS",
    "Plug and play DICOM integration with hospital systems",
    "GDPR-compliant cloud-based web application",
    "Up to 93% reduction in manual contouring tasks for OARs",
    "Full-body delineation in approximately 3 minutes",
    "Exclusive lymph node models for CTVn"
  ],

  features: [
    "Automatic OAR contouring",
    "Lymph node delineation",
    "Batch processing",
    "Guideline-based segmentation",
    "Cloud deployment",
    "DICOM export to TPS"
  ],
  supportedStructures: ANNOTATE_ALL_STRUCTURES,
  structuresProvenance: {
    source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ref ART-BRO-AN-07EU, March 2026) and Therapanacea products page",
    sourceUrl: "https://therapanacea.com/products",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-07-30",
    notes: "CT models only, per vendor brochure v3.2.0. Four CT models, each prefixed in the structure list: Head & Neck (CT) 46 OARs + 19 LNs; Thorax/Breast/Abdo (CT) 73 OARs + 12 LNs (includes SBRT lung and heart sub-structures, previously published as separate lists); Pelvis Male (CT) 19 OARs + 15 LNs + 3 ROIs; Pelvis Female (CT) 18 OARs + 20 LNs + 2 ROIs per the vendor header (19 OAR entries are actually itemised in the brochure; the itemised names are used). Bilateral structures are split into _L/_R so totals match the vendor counts. Synthetic-CT models belong to AdaptBox (id: therapanacea-adaptbox), MR models to MR-Box (id: mr-box-synthetic) and the MR brachytherapy model to BrachyBox (id: therapanacea-brachybox)."
  },

  guidelines: [
    {
      name: "Grégoire et al. – Head & Neck LN delineation",
      version: "2014",
      reference: "https://doi.org/10.1016/j.radonc.2013.10.010",
      url: "https://doi.org/10.1016/j.radonc.2013.10.010",
      compliance: "full"
    },
    {
      name: "ESTRO – Offersen et al. – Breast lymph node delineation",
      version: "2015",
      reference: "https://doi.org/10.1016/j.radonc.2015.07.010",
      url: "https://doi.org/10.1016/j.radonc.2015.07.010",
      compliance: "full"
    },
    {
      name: "UK SABR Consortium – Lung SBRT",
      version: "2019",
      url: "https://www.sabr.org.uk/",
      compliance: "full"
    },
    {
      name: "De Rose et al. – Thoracic OARs",
      version: "2017",
      reference: "https://doi.org/10.1016/j.prro.2017.01.003",
      url: "https://doi.org/10.1016/j.prro.2017.01.003",
      compliance: "full"
    },
    {
      name: "Lee et al. – Heart sub-structure delineation",
      version: "2017",
      reference: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      url: "https://doi.org/10.1016/j.ijrobp.2016.09.044",
      compliance: "full"
    },
    {
      name: "Duane et al. – Heart contouring",
      version: "2017",
      reference: "https://doi.org/10.1016/j.clon.2017.10.007",
      url: "https://doi.org/10.1016/j.clon.2017.10.007",
      compliance: "full"
    },
    {
      name: "Gay et al. – Pelvis OAR delineation",
      version: "2012",
      reference: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      url: "https://doi.org/10.1016/j.ijrobp.2011.03.021",
      compliance: "full"
    },
    {
      name: "DAHANCA – Head & Neck OAR delineation",
      version: "2020",
      url: "https://www.dahanca.dk/",
      compliance: "full"
    },
    {
      name: "EPTN (Eekers et al.) – Neurological OAR atlas",
      version: "2021",
      compliance: "full"
    },
    {
      name: "Mir et al. – Global Harmonisation Group OAR consensus",
      version: "2020",
      compliance: "full"
    },
    {
      name: "Kong et al. (RTOG) – Thoracic OAR atlas",
      version: "2011",
      compliance: "full"
    },
    {
      name: "Jabbour et al. (RTOG) – Thoracic OAR delineation",
      version: "2014",
      compliance: "full"
    },
    {
      name: "Milo et al. – Cardiac sub-structure delineation",
      version: "2020",
      compliance: "full"
    },
    {
      name: "Valentini et al. – Pelvic lymph node delineation",
      version: "2016",
      compliance: "full"
    },
    {
      name: "Hall et al. – Prostate CTVn delineation",
      version: "2021",
      compliance: "full"
    }
  ],

  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  technology: {
    integration: ["Cloud-based web application", "DICOM export to TPS", "PACS integration"],
    deployment: ["Cloud-based (GDPR-compliant)"],
    triggerForAnalysis: "Zero-click automatic or batch mode",
    processingTime: "Full-body delineation in approximately 3 minutes; time varies with number of structures"
  },
  regulatory: {
    ce: {
      status: "cleared",
      class: "Class IIb",
      type: "MDR",
      regulation: "MDR 2017/745",
      notifiedBody: "GMED (Notified Body 0459)",
        notes: "The notified body attribution (GMED 0459) is not restated on the vendor's public Technical Information 3.2 page; treat it as vendor-reported."
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K253091",
      productCode: "MUJ, QKB, LLZ",
      regulationNumber: "21 CFR 892.2050",
      decisionDate: "2025-12-23",
      notes: "FDA K253091 (ART-Plan+ v3.1.0, decision 2025-12-23) explicitly clears the Annotate module for OAR delineation alongside AdaptBox and SmartPlan modules. Prior clearances: K211539 (ART-Plan v2.0, 2021 — initial Annotate clearance).",
      additionalClearances: [
        {
          clearanceNumber: "K211539",
          decisionDate: "2021",
          description: "ART-Plan v2.0 — initial FDA clearance for the Annotate OAR auto-contouring module",
          sourceUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211539"
        }
      ]
    },
    intendedUseStatement: "Annotate is an AI-powered software module within ART-Plan+ providing zero-click automatic delineation of organs at risk (OARs) and lymph nodes for radiation therapy treatment planning. Cleared for CT-based contouring of structures across Head & Neck, Thorax, Breast, Pelvis (male and female), and SBRT Lung anatomical sites. MRI-based models are covered under the MR-Box module (K234068, K242822). (Sources: FDA K253091 Summary 2025-12-23; Therapanacea product page accessed 2026-06-16.)"
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Available in EU, USA, and select international markets. Not all models available in all markets."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.2.0 (current) / 3.1.0 (FDA cleared)",
    productUrl: "https://therapanacea.com/products",
    relationship: "Module"
  },
  usesAI: true,
  evidenceRigor: "E2",
  clinicalImpact: "I2",
  evidenceRigorNotes: "Independent peer-reviewed studies (Meyer 2024, Kim 2024) plus systematic review (Ng 2024) support E2.",
  clinicalImpactNotes: "DiTusa 2025 Turing test: AI contours indistinguishable from expert-drawn for multiple structures. Lê 2024: clinically acceptable performance on DECT H&N; PEI80-DD achieves highest DSC. Manufacturer claims up to 93% reduction in manual OAR contouring tasks and full-body delineation in ~3 minutes; independent quantification of time savings not yet published across all sites.",
  adoptionReadiness: "R3",
  adoptionReadinessNotes: "CE & FDA cleared with 2 independent peer-reviewed evaluations explicitly naming the product. Cloud deployment reduces integration complexity. Standard commissioning (local QA, guideline alignment) expected.",
  burdenFactors: {
    commissioningRequired: true,
    localValidationRequired: true,
    workflowRedesign: false,
    integrationComplexity: "low",
    humanFactorsTesting: false,
    economicCaseRequired: false,
    subgroupValidationGaps: true,
    postMarketMonitoringPlan: false
  },
  evidenceVendorIndependent: true,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: true,
  evidence: [
    {
      type: "Multi-vendor Comparative Study",
      description: "DiTusa C, Chen J, Husain A, et al. Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy (TheraPanacea Annotate vs. MIM ProtégéAI, Turing test design). J Med Phys 2025;50(2):233–241.",
      link: "https://doi.org/10.4103/jmp.jmp_11_25",
      authors: "DiTusa C, Chen J, Husain A, Schneider C, Spears H, Paragios N, Debevec G, Stathakis S",
      year: 2025,
      title: "Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy",
      journal: "J Med Phys",
      doi: "10.4103/jmp.jmp_11_25"
    },
    {
      type: "Peer-reviewed Publication",
      description: "Lê AT, Sambourg K, Sun R, et al. Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography (Annotate evaluated at Gustave Roussy, 74 H&N patients, 13 structures). Phys Imaging Radiat Oncol 2024;32:100654.",
      link: "https://doi.org/10.1016/j.phro.2024.100654",
      authors: "Lê AT, Sambourg K, Sun R, Deny N, Cifliku V, Rouhi R, Deutsch E, Fournier-Bidoz N, Robert C",
      year: 2024,
      title: "Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography",
      journal: "Phys Imaging Radiat Oncol",
      doi: "10.1016/j.phro.2024.100654"
    }
  ],
  limitations: [
    "CT models only; MR-based OAR delineation is provided by the separate MR-Box and BrachyBox products",
    "Not all models available in all markets",
    "Independent multi-center time-savings studies not yet published for all anatomical sites",
    "Pelvic nodal structures added in v3.2.0 carry the vendor's '_Val' (Valentini 2016) suffix; no independent published evaluation of these new models yet",
    "Lê 2024 was conducted at an institution with an active Therapanacea research contract (declared conflict of interest)",
    "DECT performance is reconstruction-kernel dependent — PEI80-DD achieves highest DSC; other kernels show lower performance (Lê 2024)",
    "Vendor warning: automatic contours are a proposal and must be verified and validated by one or more authorised persons before use",
    "Vendor warning: contouring may be inappropriate for atypical anatomy, patients not positioned supine, incorrect Patient Position (0018,5100) or Patient's Sex (0010,0040) DICOM tags, organs modified or removed by surgery (e.g. prostatectomy), and symmetrical structures may be left/right inverted",
    "Vendor warning: H&N lymph nodes, lacrimal glands and pharyngeal constrictor muscles perform better on contrast-enhanced CT and may be inappropriate on scanners other than Siemens Sensation Open or for patients below 50 or above 79 years",
    "Vendor warning: pelvic and abdominal contours (including external contour) may be inappropriate for patients below 60 years",
    "Vendor warning: volumes with missing slices between the second and second-to-last slice cannot be loaded into Annotate; 2D DICOM (e.g. scout) images cannot be processed"
  ],
  version: "3.2.0",
  releaseDate: "2021",
  lastUpdated: "2026-07-30",
  keyPapers: [
    {"doi":"10.1186/s13014-024-02554-y","title":"Artificial intelligence contouring in radiotherapy for organs-at-risk and lymph node areas","authors":"Meyer P et al.","journal":"Radiation Oncology","year":"2024","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre clinical evaluation of OAR and nodal contouring including correction effort.","vendorIndependent":true},
    {"doi":"10.1007/s13246-024-01434-9","title":"Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation","authors":"Kim H et al.","journal":"Physical and Engineering Sciences in Medicine","year":"2024","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Independent comparison of multiple commercial systems on external data; geometric endpoints.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.4103/jmp.jmp_11_25","title":"Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy","authors":"DiTusa C et al.","journal":"Journal of Medical Physics","year":"2025","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Independent two-system comparative evaluation on external clinical data.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.1016/j.phro.2024.100654","title":"Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography","authors":"Lê AT et al.","journal":"Physics and Imaging in Radiation Oncology","year":"2024","evidenceRigor":"E1","clinicalImpact":"I1","rationale":"Single-centre technical validation on dual-energy CT.","vendorIndependent":true}
  ],
  lastRevised: "2026-07-30",
  source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ART-BRO-AN-07EU, March 2026); Therapanacea products page and Technical Information 3.2 (ART-Plan+ v3.2.0, UDI (01)03770019940020(8012) v3.2.0(11)260525; therapanacea.com, accessed 2026-07-30); FDA 510(k) K253091 (decision 2025-12-23); DOIs verified against Crossref 2026-07-30."

};

export const TumorBox: ProductDetails = {
  id: "therapanacea-tumorbox",
  name: "TumorBox",
  company: "Therapanacea",
  companyUrl: "https://therapanacea.com/",
  productUrl: "https://therapanacea.com/products",
  website: "https://therapanacea.com/products",
  githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  logoUrl: "/logos/therapanacea.png",
  category: "Auto-Contouring",
  subspeciality: "Radiation Oncology",
  description: "AI tumor-segmentation module of the ART-Plan+ platform. In v3.2.0 the vendor publishes tumor segmentation for MR glioblastoma and multiple brain metastases; the module is cleared as part of 'Annotate including TumorBox' under FDA K253091. No itemised tumour-structure list is published by the vendor.",
  anatomicalLocation: ["Brain"],
  modality: ["MRI"],
  diseaseTargeted: ["Glioblastoma", "Brain Metastases"],
  usesAI: true,
  structuresUnavailable: true,
  keyFeatures: [
    "Automatic tumour segmentation on MR images (glioblastoma, multiple brain metastases)",
    "Runs inside the Annotate contouring workspace of ART-Plan+",
    "Protocol-based model selection (vendor recommends a dedicated glioblastoma protocol without brain-metastasis structures)",
    "DICOM-RTSTRUCT export to the treatment planning system"
  ],
  features: [
    "Automatic tumor segmentation",
    "MR-based delineation",
    "Guideline/protocol configuration",
    "DICOM export to TPS"
  ],
  technicalSpecifications: {
    population: "Adult patients undergoing radiotherapy",
    input: ["MRI"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RTSTRUCT"]
  },
  technology: {
    integration: ["Cloud-based web application", "DICOM export to TPS"],
    deployment: ["Cloud-based (GDPR-compliant)", "On-premise server"],
    triggerForAnalysis: "Protocol-based automatic contouring within Annotate",
    processingTime: "2–3 minutes per anatomy under optimal conditions (vendor Technical Information 3.2)"
  },
  trainingData: {
    disclosureLevel: "minimal",
    description: "Not publicly disclosed. Deep-learning tumour-segmentation models for MR glioblastoma and multiple brain metastases.",
    source: "FDA 510(k) summary K253091; Therapanacea products page (v3.2.0 feature list)",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-07-30"
  },
  evaluationData: {
    studyDesign: "Software verification and validation submitted for FDA 510(k) clearance",
    description: "No module-specific peer-reviewed evaluation of TumorBox identified. The vendor resource library lists conference abstracts on GBM and multi-metastasis GTV contouring; these are vendor-affiliated and not peer-reviewed full papers.",
    results: "Not publicly disclosed",
    primaryEndpoint: "Not publicly disclosed",
    source: "FDA 510(k) summary K253091; Therapanacea resource library",
    sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-07-30"
  },
  regulatory: {
    ce: {
      status: "cleared",
      class: "Class IIb",
      type: "MDR",
      regulation: "MDR 2017/745",
      notes: "Covered by the ART-Plan+ v3.2.0 CE marking (UDI (01)03770019940020(8012) v3.2.0(11)260525). The notified body is not stated on the vendor's public Technical Information 3.2 page; the GMED 0459 attribution used elsewhere in this catalogue is not repeated here."
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K253091",
      productCode: "MUJ, QKB, LLZ",
      regulationNumber: "21 CFR 892.2050",
      decisionDate: "2025-12-23",
      notes: "K253091 (ART-Plan+ v3.1.0, decision 2025-12-23) names the cleared module as 'Annotate including TumorBox'. TumorBox has no separate 510(k) number."
    },
    intendedUseStatement: "Automatic generation of contours for tumours on medical images (CT and MR) within ART-Plan+, for use by trained radiotherapy professionals; all contours must be verified and validated by an authorised person. (Sources: Therapanacea Technical Information 3.2, https://therapanacea.com/technical-information-2; FDA 510(k) K253091, decision 2025-12-23; both retrieved 2026-07-30.)"
  },
  market: {
    onMarketSince: "2025",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Not all modules are available in all markets (vendor statement, Technical Information 3.2)."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.2.0 (current) / 3.1.0 (FDA cleared)",
    productUrl: "https://therapanacea.com/products",
    relationship: "Module"
  },
  evidenceRigor: "E0",
  evidenceRigorNotes: "Regulatory documentation only (FDA K253091, ART-Plan+ CE marking). No peer-reviewed publication evaluating TumorBox identified as of 2026-07-30; the vendor resource library contains only vendor-affiliated conference abstracts, which do not qualify for E1.",
  clinicalImpact: "I0",
  clinicalImpactNotes: "No independently published dosimetric, workflow or outcome data for AI tumour segmentation with this module.",
  adoptionReadiness: "R2",
  adoptionReadinessNotes: "Derived from E0 + CE/FDA: tumour delineation is a high-consequence task, so local validation on the institution's MR sequences, protocol configuration and expert review of every contour are required before clinical use.",
  evidenceVendorIndependent: false,
  evidenceMultiCenter: false,
  evidenceMultiNational: false,
  evidenceProspective: false,
  evidenceExternalValidation: false,
  burdenFactors: {
    commissioningRequired: true,
    localValidationRequired: true,
    workflowRedesign: false,
    integrationComplexity: "low",
    humanFactorsTesting: true,
    economicCaseRequired: false,
    subgroupValidationGaps: true,
    postMarketMonitoringPlan: false
  },
  limitations: [
    "No itemised tumour-structure list published by the vendor",
    "No peer-reviewed publication evaluating the module identified as of 2026-07-30",
    "Automatic contours are a proposal only and must be verified and validated by an authorised person (vendor warning)",
    "MR auto-contouring is limited to the sequences and anatomies supported by ART-Plan+ (Brain T1, Abdo TF, Pelvis T2, Pelvis TF)",
    "The vendor recommends dedicated protocols (e.g. a glioblastoma protocol without brain-metastasis structures) to avoid unwanted structures",
    "Contours may be generated in incorrect locations for atypical anatomy, post-surgical organs, poor image quality or incorrect DICOM tags",
    "Not all modules are available in all markets"
  ],
  certification: "CE & FDA",
  version: "3.2.0",
  releaseDate: "2025-12-23",
  lastUpdated: "2026-07-30",
  lastRevised: "2026-07-30",
  source: "Therapanacea products page and Technical Information 3.2 (therapanacea.com, retrieved 2026-07-30); FDA 510(k) K253091 summary (decision 2025-12-23)."
};

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [Annotate, TumorBox];

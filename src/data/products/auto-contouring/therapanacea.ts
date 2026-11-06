import { ProductDetails } from "@/types/productDetails";
import { ANNOTATE_ALL_STRUCTURES } from "./therapanacea-structures";

export const Annotate: ProductDetails = {
  id: "therapanacea-annotate",
  trainingData: {
    description: "Models trained on expert-delineated CT datasets following international contouring guidelines across major cancer sites (Head & Neck, Thorax, Breast, Pelvis, SBRT Lung). Training data reviewed and validated by clinical experts. Dataset details not fully disclosed publicly.",
    disclosureLevel: "partial",
    source: "Therapanacea product page and FDA 510(k) summaries K202700 and K253091 (neither discloses dataset size)",
    sourceUrl: "https://therapanacea.com/products",
    sourceAccess: "public",
    sourceRetrievedOn: "2026-06-16"
  },
  evaluationData: {
    studyDesign: "Independent single-institution retrospective multi-vendor benchmark (Doolan 2023) supported by single-institution retrospective evaluations; no prospective study identified",
    source: "Doolan et al. Front Oncol 2023 (DOI: 10.3389/fonc.2023.1213068); DiTusa et al. J Med Phys 2025 (DOI: 10.4103/jmp.jmp_11_25); Lê et al. Phys Imaging Radiat Oncol 2024 (DOI: 10.1016/j.phro.2024.100654)",
    sourceUrl: "https://doi.org/10.3389/fonc.2023.1213068",
    description: "Doolan et al. (2023, German Oncology Center, no conflicts declared) benchmarked Annotate v1.10.0 against four other commercial systems on 80 patients (20 breast, 20 head & neck, 20 lung, 20 prostate) using expert manual contours and recorded manual and correction times. DiTusa et al. (2025, single institution, 33 H&N patients, TheraPanacea co-author) compared Annotate with MIM Protégé AI using DSC, a Turing test and expert ratings. Lê et al. (2024, Gustave Roussy, 74 H&N patients, evaluation funded by TheraPanacea) assessed Annotate on dual-energy CT reconstructions.",
    results: "Doolan 2023: median vDSC 0.88 averaged across structures; mean time saved 45.2 min per patient (breast saving 93.7%). DiTusa 2025: Annotate had higher DSC than MIM for 60% of structures, but experienced experts could reliably distinguish AI from manual contours and expert ratings favoured MIM. Lê 2024: performance depended on DECT reconstruction; PEI80-DD gave the highest DSC.",
    primaryEndpoint: "DSC / surface DSC / HD / added path length against expert reference; manual versus correction time"
  },
  name: "Annotate",
  company: "Therapanacea",
  companyUrl: "https://therapanacea.com/",
  productUrl: "https://therapanacea.com/products",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  description: "CT auto-contouring module of the ART-Plan+ platform (see product 'ART-Plan+'), CE-marked and FDA-cleared, providing zero-click, automatic delineation of organs at risk (OARs) and lymph nodes for all major cancer sites. The ART-Plan structure library v3.2.0 publishes four CT models: Head & Neck (46 OARs, 19 LNs), Thorax/Breast/Abdo including SBRT lung and heart sub-structures (73 OARs, 12 LNs), Pelvis Male (19 OARs, 15 LNs, 3 ROIs) and Pelvis Female (18 OARs, 20 LNs, 2 ROIs). Cloud-based, GDPR-compliant, with seamless TPS integration and batch processing. MRI models are part of MR-Box and BrachyBox (separate module records).",
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
    "Pelvic nodal and mesorectum models following Valentini 2016 ('_Val' suffix), added in v3.2.0",
    "Batch mode for background processing with direct export to TPS",
    "Plug and play DICOM integration with hospital systems",
    "GDPR-compliant cloud-based web application",
    "Up to 93% reduction in manual contouring time (breast site, Doolan 2023; mean 45 min saved per patient across four sites)",
    "Automatic contouring of one anatomy in 2–3 minutes under optimal conditions (vendor), plus user review time",
    "Lymph-node models for elective CTVn delineation"
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
    sourceRetrievedOn: "2026-09-05",
    notes: "CT models only, per vendor brochure v3.2.0. Four CT models, each prefixed in the structure list: Head & Neck (CT) 46 OARs + 19 LNs; Thorax/Breast/Abdo (CT) 73 OARs + 12 LNs (includes SBRT lung and heart sub-structures, previously published as separate lists); Pelvis Male (CT) 19 OARs + 15 LNs + 3 ROIs; Pelvis Female (CT) 18 OARs + 20 LNs + 2 ROIs per the vendor header (19 OAR entries are actually itemised in the brochure; the itemised names are used). Bilateral structures are split into _L/_R so totals match the vendor counts. Synthetic-CT models belong to AdaptBox (id: therapanacea-adaptbox), MR models to MR-Box (id: mr-box-synthetic) and the MR brachytherapy model to BrachyBox (id: therapanacea-brachybox). Re-verified 2026-09-05 against the vendor products page structures library and brochure v3.2.0: published model set and counts unchanged. Re-verified 2026-10-03 against brochure ART-BRO-AN-07EU (v3.2.0, March 2026): model set, assignment and counts unchanged."
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
      reference: "https://doi.org/10.1016/j.radonc.2014.11.030",
      url: "https://doi.org/10.1016/j.radonc.2014.11.030",
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
      reference: "https://doi.org/10.1016/j.ejmp.2017.04.010",
      url: "https://doi.org/10.1016/j.ejmp.2017.04.010",
      compliance: "full"
    },
    {
      name: "Lee et al. – Heart sub-structure delineation (UNVERIFIED: no valid DOI found and not cited in vendor brochure v3.2.0; retained pending vendor confirmation)",
      version: "2017"
    },
    {
      name: "Duane et al. – Heart contouring",
      version: "2017",
      reference: "https://doi.org/10.1016/j.radonc.2017.01.008",
      url: "https://doi.org/10.1016/j.radonc.2017.01.008",
      compliance: "full"
    },
    {
      name: "Gay et al. – Pelvis OAR delineation",
      version: "2012",
      reference: "https://doi.org/10.1016/j.ijrobp.2012.01.023",
      url: "https://doi.org/10.1016/j.ijrobp.2012.01.023",
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
      reference: "https://doi.org/10.1016/j.radonc.2020.05.038",
      url: "https://doi.org/10.1016/j.radonc.2020.05.038",
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
    processingTime: "Vendor: automatic contouring of one anatomy takes 2–3 minutes under optimal conditions, depending on the number of structures, concurrent tasks and site hardware; additional user review and editing time is required"
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
      regulationNumber: "21 CFR 892.5050",
      decisionDate: "2025-12-23",
      notes: "FDA K253091 (ART-Plan+ v3.1.0, decision 2025-12-23; product codes MUJ, QKB, LLZ per the 510(k) summary) clears the Annotate module (including TumorBox) alongside the separately licensed AdaptBox and SmartPlan modules. The 510(k) summary states that clinical tests were not applicable; Annotate performance was shown by non-regression DSC testing against the previous version and manual expert contours. Initial Annotate clearance: K202700 (ART-Plan, 2021-01-14, QKB, 21 CFR 892.2050). Further TheraPanacea clearances: K220813 (2022), K230023 (2023), K232479 (2023), K234068 (v2.2.0, 2024), K242822 (v3.0.0, 2025). A previously listed K211539 was removed on 2026-11-05: it is a Thermo Fisher Scientific microbiology device, not ART-Plan.",
      additionalClearances: [
        {
          clearanceNumber: "K202700",
          decisionDate: "2021-01-14",
          description: "ART-Plan — initial FDA clearance; Annotate module for automatic OAR and healthy lymph-node contouring on CT images, plus SmartFuse registration (product code QKB, 21 CFR 892.2050; primary predicate AccuContour)",
          sourceUrl: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K202700"
        }
      ]
    },
    intendedUseStatement: "FDA K253091 (ART-Plan+ v3.1.0): 'Annotate which allows automatic generation of contours for organs at risk, lymph nodes and tumors, based on medical practices, on medical images such as CT and MR images.' ART-Plan+ is indicated for cancer patients for whom radiotherapy has been prescribed and is not intended for patients less than 18 years of age; users are trained radiotherapy professionals. This DLinRT record covers the CT models (Head & Neck, Thorax/Breast/Abdo incl. SBRT lung, Pelvis male and female); MR models are catalogued under MR-Box, BrachyBox and TumorBox. (Sources: FDA K253091 510(k) summary; Therapanacea Technical Information 3.2, accessed 2026-11-05.)"
  },
  market: {
    onMarketSince: "2021",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Available in EU, USA, and select international markets. Not all models available in all markets."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.2.1 (current) / 3.1.0 (FDA cleared)",
    productUrl: "https://therapanacea.com/products",
    relationship: "Module"
  },
  usesAI: true,
  evidenceRigor: "E3",
  clinicalImpact: "L3",
    legacyClinicalImpact: "I2",
  evidenceRigorNotes: "E3 is reached through the independent systematic review by Ng 2024 (Multimodal Technol Interact, doi:10.3390/mti8120114), scored per the per-publication rule. Its Annotate data are limited to breast contouring from two single-centre studies (Doolan 2023, Heilemann 2023), so the E3 does not reflect prospective, multi-centre or randomised validation of Annotate. The strongest primary studies are the independent multi-vendor benchmarks Doolan 2023 (doi:10.3389/fonc.2023.1213068; 80 patients, four sites) and Kim 2024 (doi:10.1007/s13246-024-01434-9; 42 cases), both E2. DiTusa 2025 is E1 because a TheraPanacea co-author is listed. Literature re-checked 2026-11-05 (Crossref, Europe PMC full text); Yuan 2025 (Pract Radiat Oncol, 8 commercial platforms) unresolved: full text not accessible to confirm whether TheraPanacea is included.",
  clinicalImpactNotes: "L3 (decision/workflow efficacy): Doolan 2023 measured correction versus manual contouring time (mean 45.2 min saved per patient across breast, head & neck, lung and prostate; breast 93.7%). Søbstad 2025, Young 2025 and Westermayer 2026 report time savings in head & neck workflows. DiTusa 2025 found that experienced experts could distinguish Annotate from manual contours and rated MIM higher despite Annotate's higher DSC in 60% of structures. No prospective study of changes in treatment management (L4) or patient outcomes (L5) was identified.",
  adoptionReadiness: "R3",
  adoptionReadinessNotes: "CE (vendor-reported) and FDA cleared (K202700 initial; K253091 current) with several independent single-institution and multi-vendor evaluations. Kept at R3 although evidence rigor is E3: the E3 rests on a breast-only review of two single-centre studies, and vendor-stated limits (scanner, age range, contrast, anatomy) require local validation and commissioning. Cloud deployment reduces integration complexity.",
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
      {"type": "Multi-vendor Comparative Study", "description": "Doolan PJ et al. A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy. Front Oncol 2023. Independent single-institution benchmark (German Oncology Center, Cyprus; no conflicts declared) of Annotate v1.10.0 and four other systems on 80 patients across breast, head & neck, lung and prostate; geometric metrics and correction time. Source of the vendor's '>93%' time-saving claim (breast site).", "link": "https://doi.org/10.3389/fonc.2023.1213068", "authors": "Doolan PJ, Charalambous S, Roussakis Y, et al.", "year": 2023, "title": "A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy", "journal": "Front Oncol", "doi": "10.3389/fonc.2023.1213068"},
      {"type": "Multi-vendor Comparative Study", "description": "Moignier A et al. Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy. Phys Imaging Radiat Oncol 2026. ART-Plan/Annotate v2.2 compared with ten other solutions for cardiac substructures on 20 lung-cancer patients (contrast and non-contrast CT).", "link": "https://doi.org/10.1016/j.phro.2026.100935", "authors": "Moignier A, Perennec T, et al.", "year": 2026, "title": "Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy", "journal": "Phys Imaging Radiat Oncol", "doi": "10.1016/j.phro.2026.100935"},
      {"type": "Systematic Review", "description": "Ng CKC. Performance of Commercial Deep Learning-Based Auto-Segmentation Software for Breast Cancer Radiation Therapy Planning: A Systematic Review. Multimodal Technol Interact 2024. 15 studies, eight packages; Annotate data derive from Doolan 2023 and Heilemann 2023.", "link": "https://doi.org/10.3390/mti8120114", "authors": "Ng CKC", "year": 2024, "title": "Performance of Commercial Deep Learning-Based Auto-Segmentation Software for Breast Cancer Radiation Therapy Planning: A Systematic Review", "journal": "Multimodal Technol Interact", "doi": "10.3390/mti8120114"},
      {"type": "Multi-vendor Comparative Study", "description": "Rusanov B et al. Guidance on selecting and evaluating AI auto-segmentation systems in clinical radiotherapy: insights from a six-vendor analysis. Phys Eng Sci Med 2025. Includes ART-Plan v1.11.4-rc1, but vendor identities were removed from the results, so findings cannot be attributed to Annotate; listed, not scored.", "link": "https://doi.org/10.1007/s13246-024-01513-x"},
      {"type": "Multi-vendor Comparative Study", "description": "Heilemann G et al. Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy. Phys Imaging Radiat Oncol 2023. Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100515"},
      {"type": "Peer-reviewed Publication", "description": "Nachbar M et al. Automatic AI-based contouring of prostate MRI for online adaptive radiotherapy. Z Med Phys 2024. Development of a prostate MRI model with TheraPanacea co-authors; not an evaluation of the released product; listed, not scored. Listed for transparency, not scored. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.zemedi.2023.05.001"},
      {"type": "Peer-reviewed Publication", "description": "Westermayer M et al. Evaluation of a quasi-automatic treatment planning workflow for head-and-neck cancer in radiotherapy. Physics and Imaging in Radiation Oncology 2026. Single-centre quasi-automatic H&N workflow with ART-Plan Annotate; about 95% time reduction; TheraPanacea co-authors. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2026.100983"},
      {"type": "Peer-reviewed Publication", "description": "Young T et al. Real-world performance evaluation of commercial autocontouring software for head and neck cancer radiotherapy. Br J Radiol 2025. Real-world single-centre evaluation of ART-Plan for H&N with time savings. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1093/bjr/tqaf098"},
    {
      type: "Multi-vendor Comparative Study",
      description: "DiTusa C, Chen J, Husain A, et al. Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy (TheraPanacea Annotate vs. MIM ProtégéAI, 33 H&N patients, single institution, Turing test and expert ratings; co-author N. Paragios is affiliated with TheraPanacea). J Med Phys 2025;50(2):233–241.",
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
    "Independent multi-centre time-savings studies not yet published for all anatomical sites",
    "Pelvic nodal structures added in v3.2.0 carry the vendor's '_Val' (Valentini 2016) suffix; no independent published evaluation of these new models yet",
    "Lê 2024 was conducted at an institution that received TheraPanacea funding for the Annotate evaluation and holds research contracts with TheraPanacea (declared conflict of interest); Young 2025 was funded by TheraPanacea (authors' time and software access); DiTusa 2025 and Westermayer 2026 include TheraPanacea-affiliated or TheraPanacea-funded authors",
    "DiTusa 2025: experienced experts could reliably distinguish Annotate contours from manual contours, and expert acceptability ratings favoured MIM Protégé AI despite Annotate's higher DSC for 60% of structures",
    "Moignier 2026: for cardiac substructures, Annotate was an outlier for the aorta and showed a shorter cranio-caudal extent of the superior vena cava than most other solutions; coronary-artery agreement across all solutions was low",
    "The FDA 510(k) clearances rely on bench (non-regression DSC) testing; no clinical tests were required for K253091",
    "DECT performance is reconstruction-kernel dependent — PEI80-DD achieves highest DSC; other kernels show lower performance (Lê 2024)",
    "Vendor warning: automatic contours are a proposal and must be verified and validated by one or more authorised persons before use",
    "Vendor warning: contouring may be inappropriate for atypical anatomy, patients not positioned supine, incorrect Patient Position (0018,5100) or Patient's Sex (0010,0040) DICOM tags, organs modified or removed by surgery (e.g. prostatectomy), and symmetrical structures may be left/right inverted",
    "Vendor warning: H&N lymph nodes, lacrimal glands and pharyngeal constrictor muscles perform better on contrast-enhanced CT and may be inappropriate on scanners other than Siemens Sensation Open or for patients below 50 or above 79 years",
    "Vendor warning: pelvic and abdominal contours (including external contour) may be inappropriate for patients below 60 years",
    "Vendor warning: volumes with missing slices between the second and second-to-last slice cannot be loaded into Annotate; 2D DICOM (e.g. scout) images cannot be processed"
  ],
  version: "3.2.1",
  releaseDate: "2021",
  lastUpdated: "2026-11-05",
  keyPapers: [
      {"doi": "10.1017/s1460396925100204", "title": "A geometric and dosimetric comparison of three AI-based autocontouring packages in the head and neck region", "authors": "Sillanpaa J et al.", "journal": "Journal of Radiotherapy in Practice", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Single-centre H&N comparison of AutoContour 2.5.6, Annotate 2.3.1 (now ART-Plan Segmentation) and RT-Mind-AI on 13 CT sets and 14 OARs; geometric (DSC/HD), physician ranking and dosimetric endpoints. No editing-time or workflow endpoint, so L2 rather than L3 (re-scored 2026-11-05 from the Crossref abstract).", "vendorIndependent": true},
      {"doi": "10.1556/650.2024.33180", "title": "Mesterséges intelligencián alapuló szervkontúrozó szoftverek alkalmazása és eredményeinek összehasonlítása sugárterápiás besugárzástervezés során", "authors": "Bungyi G, Pócza T, et al.", "journal": "Orvosi Hetilap", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Added 2026-10-24 from the uploaded literature-search hits (raw_hits.csv); DOI metadata verified on Crossref; scored from the abstract only, pending reviewer check. Single-centre comparison of OAR contours from MVision, ART-Plan and Limbus on 93 CT scans in four regions (Hungarian); geometric/volumetric endpoints, MVision used as reference.", "vendorIndependent": true},
      {"doi": "10.2340/1651-226x.2025.44015", "title": "Time efficiency, geometric accuracy, and clinical impact of AI-assisted contouring of organs at risk in head and neck cancer radiotherapy", "authors": "Søbstad JM, Sulen TH, et al.", "journal": "Acta Oncologica", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L3", "rationale": "Added 2026-10-24 from the uploaded literature-search hits (raw_hits.csv); DOI metadata verified on Crossref; scored from the abstract only, pending reviewer check. Single-centre study of 20 H&N patients comparing 11 dosimetrists with ART-Plan contours; time, geometric, variability and dosimetric endpoints.", "vendorIndependent": true},

    {"doi": "10.1016/j.phro.2023.100515", "title": "Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy", "authors": "Heilemann G et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I1", "rationale": "Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints.", "vendorIndependent": true},
    {"doi": "10.1016/j.phro.2026.100983", "title": "Evaluation of a quasi-automatic treatment planning workflow for head-and-neck cancer in radiotherapy", "authors": "Westermayer M et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "legacyClinicalImpact": "I2", "rationale": "Single-centre quasi-automatic H&N workflow (10 patients) with ART-Plan Annotate v2.2; primary endpoint is workflow time (about 95% reduction), so L3. First author's PhD funded by TheraPanacea (CIFRE) and a TheraPanacea-affiliated co-author, so not vendor-independent."},
    {"doi": "10.1093/bjr/tqaf098", "title": "Real-world performance evaluation of commercial autocontouring software for head and neck cancer radiotherapy", "authors": "Young T et al.", "journal": "Br J Radiol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L3", "legacyClinicalImpact": "I2", "rationale": "Real-world single-centre evaluation of ART-Plan for H&N with time savings. Funding disclosure: TheraPanacea funded the authors' time for the evaluation and provided software access; no TheraPanacea employee was involved, so it is kept as vendor-independent by author affiliation.", "vendorIndependent": true},
    {"doi":"10.1186/s13014-024-02554-y","title":"Artificial intelligence contouring in radiotherapy for organs-at-risk and lymph node areas","authors":"Meyer P et al.","journal":"Radiation Oncology","year":"2024","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Single-centre clinical evaluation of OAR and nodal contouring including correction effort.","vendorIndependent":true},
    {"doi":"10.1007/s13246-024-01434-9","title":"Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation","authors":"Kim YW et al.","journal":"Physical and Engineering Sciences in Medicine","year":"2024","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent comparison (Chris O'Brien Lifehouse, Sydney) of seven commercial systems including ART-Plan Annotate v1.10.1 on 42 cases; geometric endpoints. No TheraPanacea relationship declared.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.4103/jmp.jmp_11_25","title":"Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy","authors":"DiTusa C et al.","journal":"Journal of Medical Physics","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single-institution retrospective comparison of Annotate and MIM Protégé AI on 33 H&N patients (DSC, Turing test, expert ratings). Co-author N. Paragios is affiliated with TheraPanacea, so not vendor-independent (E2 to E1, 2026-11-05). Experienced experts could distinguish AI from manual contours, and ratings favoured MIM despite Annotate's higher DSC for 60% of structures."},
    {"doi":"10.1016/j.phro.2024.100654","title":"Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography","authors":"Lê AT et al.","journal":"Physics and Imaging in Radiation Oncology","year":"2024","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single-centre technical validation on dual-energy CT (74 patients). Funding disclosure: Gustave Roussy received TheraPanacea funding for the Annotate evaluation and holds research contracts with TheraPanacea; no TheraPanacea-affiliated author.","vendorIndependent":true},
    {"doi":"10.3389/fonc.2023.1213068","title":"A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy","authors":"Doolan PJ et al.","journal":"Frontiers in Oncology","year":"2023","evidenceRigor":"E2","clinicalImpact":"L3","rationale":"Independent multi-vendor benchmark (German Oncology Center, Cyprus; no conflicts declared) of Annotate v1.10.0 and four other systems on 80 patients across four sites, with manual versus correction time (mean 45.2 min saved; breast 93.7%). Scored E2/L3 consistently with the other vendor records citing this study.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.1016/j.phro.2026.100935","title":"Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy","authors":"Moignier A et al.","journal":"Physics and Imaging in Radiation Oncology","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Single-cohort comparison of ART-Plan/Annotate v2.2 with ten other solutions for cardiac substructures on 20 lung-cancer CTs; inter-solution geometric agreement only. No TheraPanacea-affiliated author; one co-author declares a TheraPanacea partnership for heart-model development.","vendorIndependent":true},
    {"doi":"10.3390/mti8120114","title":"Performance of Commercial Deep Learning-Based Auto-Segmentation Software for Breast Cancer Radiation Therapy Planning: A Systematic Review","authors":"Ng CKC","journal":"Multimodal Technologies and Interaction","year":"2024","evidenceRigor":"E3","clinicalImpact":"L3","rationale":"Independent systematic review of 15 studies on eight commercial packages for breast radiotherapy, including time-saving outcomes. Scored E3 per the per-publication rule (reviewer decision 2026-11-05). Annotate data come only from two single-centre breast studies (Doolan 2023, Heilemann 2023), so the E3 does not imply prospective or multi-centre validation of Annotate.","vendorIndependent":true}
  ],
  lastRevised: "2026-11-05",
  source: "ART-Plan™ 'Structures Delineated' brochure v3.2.0 (ART-BRO-AN-07EU, March 2026); Therapanacea products page and Technical Information 3.2 (ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724; therapanacea.com, accessed 2026-11-05); FDA 510(k) K253091 (decision 2025-12-23) and K202700 (decision 2021-01-14) summaries; openFDA applicant search; DOIs verified against Crossref and Europe PMC 2026-11-05 (Q4 2026 review round)."

};

export const TumorBox: ProductDetails = {
  id: "therapanacea-tumorbox",
  name: "TumorBox",
  company: "Therapanacea",
  companyUrl: "https://therapanacea.com/",
  productUrl: "https://therapanacea.com/products",
  website: "https://therapanacea.com/products",
  githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/therapanacea.ts",
  logoUrl: "/logos/therapanacea.png",
  category: "Auto-Contouring",
  subspeciality: "Radiation Oncology",
  description: "AI tumor-segmentation module of the ART-Plan+ platform. The vendor publishes tumor segmentation for MR glioblastoma and multiple brain metastases. K242822 (decision 2025-02-25) already names TumorBox, and K253091 is a later platform clearance. Cleared tumour segmentation is brain MR. No itemised tumour-structure list is published by the vendor.",
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
      notes: "Covered by the ART-Plan+ v3.2.1 technical information (UDI (01)03770019940020(8012) v3.2.1(11)260724, retrieved 2026-11-05). The notified body is not stated on that page. The GMED 0459 attribution used elsewhere in this catalogue is not repeated here."
    },
    fda: {
      status: "510k_cleared",
      class: "Class II",
      type: "510(k)",
      clearanceNumber: "K253091",
      productCode: "MUJ, QKB, LLZ",
      regulationNumber: "21 CFR 892.5050",
      decisionDate: "2025-12-23",
      notes: "K253091 is 21 CFR 892.5050, not 892.2050. It is a later platform clearance, not the first document that names TumorBox. K242822 (decision 2025-02-25) already names Annotate and TumorBox. Its glioblastoma and brain-metastasis tests passed unpublished acceptance criteria. Cleared tumour segmentation is brain MR, not tumours on CT in general. TumorBox has no separate 510(k) number."
    },
    intendedUseStatement: "Automatic tumour contours on brain MR (glioblastoma and multiple metastases on the vendor page; brain MR in K242822 and K253091), for use by trained radiotherapy professionals. All contours must be verified by an authorised person. This is not a clearance for tumours on CT in general."
  },
  market: {
    onMarketSince: "2025",
    distributionChannels: ["Direct sales", "Cloud SaaS"],
    availability: "Not all modules are available in all markets (vendor statement, Technical Information 3.2)."
  },
  partOf: {
    name: "ART-Plan+",
    version: "3.2.1 (current) / 3.1.0 (FDA cleared)",
    productUrl: "https://therapanacea.com/products",
    relationship: "Module"
  },
  evidenceRigor: "E0",
  evidenceRigorNotes: "Regulatory documentation only (FDA K253091, ART-Plan+ CE marking). No peer-reviewed publication evaluating TumorBox identified as of 2026-07-30; the vendor resource library contains only vendor-affiliated conference abstracts, which do not qualify for E1. 2026-08-25 Wave 5C sweep (Europe PMC 2014-2026, alias-gated): no publication names this product. E0 stands.",
  clinicalImpact: "L1t",
    legacyClinicalImpact: "I0",
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
  version: "3.2.1",
  releaseDate: "First named in K242822 (decision 2025-02-25). 2025-12-23 is the later K253091 platform decision, not the first clearance date.",
  lastUpdated: "2026-11-05",
  lastRevised: "2026-11-05",
  source: "Therapanacea products page and Technical Information 3.2 (therapanacea.com, retrieved 2026-07-30); FDA 510(k) K253091 summary (decision 2025-12-23).; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
};

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [Annotate, TumorBox];

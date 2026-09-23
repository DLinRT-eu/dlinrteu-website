
import { ProductDetails } from "@/types/productDetails";
import { MVISION_ALL_STRUCTURES, MVISION_STRUCTURES_PREVIOUS } from "./mvision-structures";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-contouring",
    trainingData: {
        countries: 7,
        source: "FDA 510(k) summary K241490",
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K241490.pdf",
        description: "The system uses deep learning algorithms for automatic contouring of CT and MR images. Training involves machine learning based algorithms to delineate 300+ structures including OARs and lymph node regions across Head & Neck, Thorax, Abdomen, and Pelvis sites."
    },
    evaluationData: {
        primaryEndpoint: "Geometric and dosimetric accuracy (e.g., DSC)",
        source: "Pang et al. NPJ Digit Med 2025 (DOI: 10.1038/s41746-025-01624-z)",
        description: "Pang et al. (NPJ Digit Med 2025) performed a multicenter evaluation of deep learning CT autosegmentation of Head & Neck organs across 9 clinics in 7 countries. Another study on gastric MALT lymphoma reported DSC ranges of 0.92-0.99.",
        sourceUrl: "https://doi.org/10.1038/s41746-025-01624-z",
        studyDesign: "Multicenter retrospective evaluation (9 clinics, 7 countries)",
        results: "DSC 0.92-0.99 for gastric MALT lymphoma segmentation."
    },
    name: "Contour+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/contour/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/mvision.ts",
    description: "Auto-contouring module of the MVision AI Workspace+ platform. AI-powered auto-contouring solution for radiation therapy planning with deep learning algorithms for accurate guideline-based organ-at-risk and lymph node region delineation. The vendor advertises 300+ structures including 90 lymph node areas and follows 25+ international contouring guidelines.",
    partOf: {
      name: "Workspace+",
      productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus",
      relationship: "Module"
    },
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/contour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered segmentation",
      "Fast processing",
      "Clinical workflow integration",
      "Cloud or on-premise deployment"
    ],
    features: [
      "Guideline-based auto-contouring of organs at risk and lymph node regions",
      "CT and MR models across head & neck, thorax, abdomen and pelvis",
      "Cloud or on-premise deployment",
      "TPS and PACS integration",
      "Structure naming aligned with AAPM TG-263"
    ],
    limitations: [
      "Contours are an initial template and must be reviewed, edited and approved by a clinician",
      "Not intended to detect lesions or tumours, and not intended for real-time adaptive planning",
      "Available structures differ per model; not every structure is produced for every anatomy",
      "No prospective or randomised evidence identified"
    ],
    structuresProvenance: {
      source: "MVision AI Contour+ Structure Library (https://mvision.ai/contour/)",
      sourceUrl: "https://mvision.ai/contour/",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-09-08",
      notes: "Derived from the vendor's published Structure Library, with vendor-confirmed corrections (2026-09-08): 326 distinct structure names (left and right counted separately, expanding the vendor's bilateral 'X_L/R' notation into _L and _R) across 18 models, giving 685 model-specific entries because many structures are published for more than one model. This is consistent with the vendor's '300+ structures'. By type: 224 organs-at-risk, 13 target volumes and 89 elective volumes. Breast CT RTOG volumes (Br_1234_RTOG, Br_234_RTOG, BrTW_1234_RTOG, BrTW_234_RTOG, BrTW_RTOG) are counted as CTV-type targets. The whole-breast ROIs Breast_L/R and Breast_RTOG_L/R are dual-use: in a breast treatment they may act as the CTV, but they are also used as contralateral or other-treatment organs at risk, so they are counted here as organs at risk. Models published: Abdomen & Lung CT, Abdomen MR, Bones CT, Brachy Cervix CT, Brain CT, Brain MR, Breast CT, Female Pelvis CT, Female Pelvis MR T2, Head & Neck CT, Head & Neck MR, Jaws CT, Male Pelvis CT, Male Pelvis MR T1 Dixon, Male Pelvis MR T2, Mediastinum CT, Rectum CT, Whole Body CT."
    },
    supportedStructures: MVISION_ALL_STRUCTURES,
    structureHistory: [
      {
        version: "Pre-2026-09 catalogued list",
        retrievedOn: "2026-06-13",
        source: "MVision AI structure list previously catalogued in DLinRT.eu",
        notes: "Superseded by the 2026-09-05 refresh of the vendor Structure Library. Model naming differed (e.g. 'Male Pelvis MR Dixon', 'Head & Neck-CT (Elective)', 'Rectum CT with Lymph Nodes') and the Jaws CT, Head & Neck MR, Abdomen MR and Female Pelvis MR T2 models were not represented.",
        structures: MVISION_STRUCTURES_PREVIOUS
      }
    ],
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "AAPM TG-275",
        version: "2022",
        reference: "https://doi.org/10.1002/mp.15419",
        url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
        compliance: "partial"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "64298300642AISEG1.2SZ",
          riskClass: "class-iia",
          registeredTradeName: "Contour+ (MVision AI Segmentation)",
          manufacturerSrn: "FI-MF-000013082",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=Contour%2B",
          lastVerified: "2026-09-22"
      },
        status: "cleared",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K241490",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-10-18",
        notes: "Latest version. Previous clearances: K193053 (2020)"
      },
      tga: {
        status: "Approved",
        notes: "MR Models approved February 2025. Latest CT/MR module approvals extended through 2026 (Australia TGA & New Zealand Medsafe)."
      },
      intendedUseStatement: "Contour+ (MVision AI Segmentation) is a software system for image analysis algorithms to be used in radiation therapy treatment planning workflows. The system includes processing tools for automatic contouring of CT and MR images using machine learning based algorithms. The produced segmentation templates for regions of interest must be transferred to appropriate image visualization systems as an initial template for a medical professional to visualize, review, modify and approve prior to further use in clinical workflows. The system creates initial contours of pre-defined structures of common anatomical sites, i.e., Head and Neck, Brain, Breast, Lung and Abdomen, Male Pelvis, and Female Pelvis. Contour+ (MVision AI Segmentation) is not intended to detect lesions or tumors. The device is not intended for use with real-time adaptive planning workflows. (Source: FDA 510(k) K241490 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      availability: "Global - CE, FDA, TGA, Singapore, UAE, Morocco"
    },
    contactEmail: "info@mvision.ai",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Independent peer-reviewed studies (Doolan 2023, Miura 2025 x2) demonstrate multi-site validation. Multi-national HARMONY study pending peer review. No prospective/RCT so E3 not met.",
    clinicalImpactNotes: "Independent literature documents geometric accuracy plus workflow and consistency benefits, including reduced editing effort; consistent with I2. No prospective outcome study identified.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E2 + CE + FDA 510(k): mature peer-reviewed multi-center evidence with regulatory clearance; minor local commissioning and user training expected.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {"type": "Peer-reviewed Publication", "description": "Strolin S et al. How smart is artificial intelligence in organs delineation? Testing a CE and FDA-approved Deep-Learning tool using multiple expert contours delineated on planning CT images. Front Oncol 2023. Single-centre evaluation of MVision auto-segmentation with agreement and editing analysis. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3389/fonc.2023.1089807"},
      {"type": "Multi-vendor Comparative Study", "description": "Cavus H et al. Safety and efficiency of a fully automatic workflow for auto-segmentation in radiotherapy using three commercially available deep learning-based applications. Physics and Imaging in Radiation Oncology 2024. Single-centre fully automatic workflow evaluation of three commercial systems, reporting safety and efficiency. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2024.100627"},
      {"type": "Multi-vendor Comparative Study", "description": "Meixner E et al. Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation. Clin Transl Radiat Oncol 2024. Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2024.100855"},
      {"type": "Multi-vendor Comparative Study", "description": "Tang V et al. Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk. Clin Transl Radiat Oncol 2025. Compares breast target volumes from Swedish clinics with two DL models on one hypothetical patient; geometric and dose-structure endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2025.100986"},
      {"type": "Peer-reviewed Publication", "description": "Elisabeth Olsson C et al. Autosegmentation based on different-sized training datasets of consistently-curated volumes and impact on rectal contours in prostate cancer radiation therapy. Phys Imaging Radiat Oncol 2022. Single-centre study of training-set size with MVision co-authors; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2022.04.007"},
      {"type": "Peer-reviewed Publication", "description": "Turcas A et al. Deep-learning magnetic resonance imaging-based automatic segmentation for organs-at-risk in the brain: Accuracy and impact on dose distribution. Phys Imaging Radiat Oncol 2023. Single-centre evaluation of MVision MR-based OAR segmentation with geometric and dosimetric endpoints. HAIR labels Dose+/Eclipse corrected to Contour+. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100454"},
      {"type": "Peer-reviewed Publication", "description": "Miura H et al. Evaluation of the accuracy of automated segmentation based on deep learning for prostate cancer patients. Med Dosim 2025. Single-centre evaluation of Contour+ for prostate; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.meddos.2024.09.002"},
      {"type": "Peer-reviewed Publication", "description": "Rasmussen ME et al. Potential of E-Learning Interventions and Artificial Intelligence-Assisted Contouring Skills in Radiotherapy: The ELAISA Study. JCO Glob Oncol 2024. Education study in LMIC trainees using Contour+ AI contours as reference/aid; contouring-skill endpoints. Vendor supplied contours (acknowledged). (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1200/GO.24.00173"},
      {"type": "Multi-vendor Comparative Study", "description": "Bordigoni B et al. Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models. Phys Med 2024. Single-centre pelvic comparison of atlas, random forest, MVision and LimbusAI; geometric endpoints. HAIR label Image+ corrected to Contour+. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ejmp.2024.104486"},
      {
        type: "Peer-reviewed Publication",
        description: "Pang et al. Multicenter evaluation of deep learning CT autosegmentation of H&N (9 clinics, 7 countries). NPJ Digit Med 2025;8(1):312. Direct evaluation of MVision-class DL auto-segmentation.",
        link: "https://doi.org/10.1038/s41746-025-01624-z"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Podobnik et al. Geometric, dosimetric and psychometric evaluation of 3 AI software for H&N OAR auto-segmentation. Sci Rep 2025;15(1):33396. Three-vendor H&N comparison — MVision inclusion verified by abstract metadata; relabeled as comparative 2026-06-15.",
        link: "https://doi.org/10.1038/s41598-025-18598-3"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Meyer et al. AI contouring in RT for OARs and lymph node areas. Radiat Oncol 2024;19(1):168",
        link: "https://doi.org/10.1186/s13014-024-02554-y"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Doolan et al. Clinical evaluation of 5 commercial AI contouring systems (Mirada, MVision [MV], Radformation, RayStation, TheraPanacea) on 80 patients. Front Oncol 2023;13:1213068. MVision explicitly named — direct comparative evidence.",
        link: "https://doi.org/10.3389/fonc.2023.1213068"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Kiljunen et al. Multicenter DL-based automated CT segmentation for prostate cancer (30 patients, 6 clinics). Diagnostics 2020;10(11):959",
        link: "https://doi.org/10.3390/diagnostics10110959"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Miura et al. Performance evaluation of MVision AI Contour+ in gastric MALT lymphoma segmentation. Rep Pract Oncol Radiother 2025. Single-centre clinical evaluation including contour review effort.",
        link: "https://doi.org/10.5603/rpor.104144"
      }
    ],
    version: "1.3.1",
    releaseDate: "2025-10-27",
    lastUpdated: "2026-09-08",
    keyPapers: [
    {"doi": "10.3389/fonc.2023.1089807", "title": "How smart is artificial intelligence in organs delineation? Testing a CE and FDA-approved Deep-Learning tool using multiple expert contours delineated on planning CT images", "authors": "Strolin S et al.", "journal": "Front Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre evaluation of MVision auto-segmentation with agreement and editing analysis.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2024.100627", "title": "Safety and efficiency of a fully automatic workflow for auto-segmentation in radiotherapy using three commercially available deep learning-based applications", "authors": "Cavus H et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre fully automatic workflow evaluation of three commercial systems, reporting safety and efficiency.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2024.100855", "title": "Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation", "authors": "Meixner E et al.", "journal": "Clin Transl Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2025.100986", "title": "Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk", "authors": "Tang V et al.", "journal": "Clin Transl Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Compares breast target volumes from Swedish clinics with two DL models on one hypothetical patient; geometric and dose-structure endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2022.04.007", "title": "Autosegmentation based on different-sized training datasets of consistently-curated volumes and impact on rectal contours in prostate cancer radiation therapy", "authors": "Elisabeth Olsson C et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre study of training-set size with MVision co-authors; geometric endpoints.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2023.100454", "title": "Deep-learning magnetic resonance imaging-based automatic segmentation for organs-at-risk in the brain: Accuracy and impact on dose distribution", "authors": "Turcas A et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre evaluation of MVision MR-based OAR segmentation with geometric and dosimetric endpoints. HAIR labels Dose+/Eclipse corrected to Contour+.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.meddos.2024.09.002", "title": "Evaluation of the accuracy of automated segmentation based on deep learning for prostate cancer patients", "authors": "Miura H et al.", "journal": "Med Dosim", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre evaluation of Contour+ for prostate; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1200/GO.24.00173", "title": "Potential of E-Learning Interventions and Artificial Intelligence-Assisted Contouring Skills in Radiotherapy: The ELAISA Study", "authors": "Rasmussen ME et al.", "journal": "JCO Glob Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Education study in LMIC trainees using Contour+ AI contours as reference/aid; contouring-skill endpoints. Vendor supplied contours (acknowledged).", "vendorIndependent": true, "multiCenter": false, "multiNational": true, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ejmp.2024.104486", "title": "Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models", "authors": "Bordigoni B et al.", "journal": "Phys Med", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre pelvic comparison of atlas, random forest, MVision and LimbusAI; geometric endpoints. HAIR label Image+ corrected to Contour+.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi":"10.3389/fonc.2023.1213068","title":"A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy","authors":"Doolan PJ et al.","journal":"Front. Oncol.","year":"2023","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Independent benchmark of several commercial systems on external clinical data; geometric endpoints.","vendorIndependent":true,"externalValidation":true},
    {"doi":"10.5603/rpor.104144","title":"Performance evaluation of MVision AI Contour+ in gastric MALT lymphoma segmentation","authors":"Miura H et al.","journal":"Rep Pract Oncol Radiother.","year":"2025","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre clinical evaluation including contour review effort.","vendorIndependent":true},
    {"doi": "10.1038/s41746-025-01624-z", "title": "Multicentre evaluation of deep learning CT autosegmentation of the head and neck region for radiotherapy", "authors": "Pang EPP et al.", "journal": "npj Digit. Med.", "year": "2025", "evidenceRigor": "E2", "clinicalImpact": "I2", "rationale": "Multicentre evaluation across nine clinics in seven countries with clinical acceptability endpoints.", "vendorIndependent": true, "multiCenter": true, "multiNational": true, "externalValidation": true},
    {"doi": "10.1038/s41598-025-18598-3", "title": "Geometric, dosimetric and psychometric evaluation of three commercial AI software solutions for OAR auto-segmentation in head and neck radiotherapy", "authors": "Podobnik G et al.", "journal": "Sci Rep", "year": "2025", "evidenceRigor": "E2", "clinicalImpact": "I2", "rationale": "Independent three-vendor head-and-neck comparison with geometric, dosimetric and psychometric endpoints.", "vendorIndependent": true, "externalValidation": true},
    {"doi": "10.1186/s13014-024-02554-y", "title": "Artificial intelligence contouring in radiotherapy for organs-at-risk and lymph node areas", "authors": "Meyer C et al.", "journal": "Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre evaluation of AI contouring for OARs and lymph node areas.", "vendorIndependent": true},
    {"doi": "10.3390/diagnostics10110959", "title": "A Deep Learning-Based Automated CT Segmentation of Prostate Cancer Anatomy for Radiation Therapy Planning-A Retrospective Multicenter Study", "authors": "Kiljunen T et al.", "journal": "Diagnostics", "year": "2020", "evidenceRigor": "E2", "clinicalImpact": "I1", "rationale": "Multicentre prostate segmentation study across six clinics; geometric endpoints.", "multiCenter": true},
    {"doi": "10.1002/acm2.70765", "title": "Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning", "authors": "Östensson A, Jonsson J", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Retrospective evaluation (Umeå University, no vendor authors) of MVision MR T2 pelvic segmentation on 19 public Gold Atlas patients against multi-observer contours; geometric and dosimetric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": true}
  ],
    lastRevised: "2026-09-23",
    source: "FDA 510(k) database (K241490), TGA/Medsafe registries, company official sources. Structure library re-derived 2026-09-05 from the public vendor Structure Library at https://mvision.ai/contour/ (326 distinct names across 18 models, 685 model-specific entries); the previously catalogued list is archived under structureHistory. Citation hygiene 2026-06-15: removed duplicate HARMONY entry (same DOI as Pang 2025) and relabeled multi-vendor comparison papers. 2026-09-06 standard-field consistency pass: removed the unverifiable Ng et al. citation (DOI resolved to an unrelated article), added the Miura 2025 paper already scored in keyPapers, added features and limitations, and reconciled the impact/readiness notes with the stored E2/I2/R4 scores. 2026-09-06 count correction following vendor feedback: left/right structures are counted individually, giving 324 distinct structure names rather than the previously stated 223 bundled names. 2026-09-08 vendor correction: added BrTW_RTOG_L/R to the Breast CT model and classified the Br/BrTW RTOG breast volumes as CTV-type targets (326 distinct names, 685 entries); the dual-use whole-breast ROIs Breast_L/R and Breast_RTOG_L/R remain counted as organs at risk."
  }
];

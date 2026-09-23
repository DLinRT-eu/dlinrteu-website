
import { ProductDetails } from "@/types/productDetails";
import { LIMBUS_ALL_STRUCTURES } from "./limbus-structures";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    trainingData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K241837.pdf",
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K241837"
    },
    evaluationData: {
        sourceUrl: "https://doi.org/10.1093/bjr/tqae077",
        studyDesign: "Multi-center retrospective and clinical evaluation",
        description: "Multi-center, multi-national study (Canada & UK) evaluating prostate and lymph node contouring; the software demonstrated meaningful time savings of 13-26 minutes per case.",
        primaryEndpoint: "Time savings",
        source: "Starke et al. BJR 2024 (DOI: 10.1093/bjr/tqae077)",
        results: "13-26 minutes time savings for prostate and lymph node contouring."
    },
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/limbus.ts",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Runs locally", "DICOM compatibility"],
    supportedStructures: LIMBUS_ALL_STRUCTURES,
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
        url: "https://doi.org/10.1002/mp.15419",
        compliance: "full"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://doi.org/10.1016/j.radonc.2021.09.019",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Standalone"],
      deployment: ["Local"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "B-00628011382177",
          riskClass: "class-iia",
          registeredTradeName: "Limbus Contour",
          manufacturerSrn: "CA-MF-000025514",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=Limbus+Contour",
          lastVerified: "2026-09-22"
      },
        status: "cleared",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "TÜV SÜD (Notified Body 0123)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K241837",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        decisionDate: "2024-11-15",
        notes: "Previous clearance: K230575 (2023). Now distributed by Radformation (acquired April 30, 2024)."
      },
      intendedUseStatement: "Limbus Contour is a software-only medical device intended for use by trained radiation oncologists, dosimetrists and physicists to derive optimal contours for input to radiation treatment planning. Supported image modalities are Computed Tomography and Magnetic Resonance. The Limbus Contour Software assists in the following scenarios: Operates in conjunction with radiation treatment planning systems or DICOM viewing systems to load, save, and display medical images and contours for treatment evaluation and treatment planning; Creation, transformation, and modification of contours for applications including, but not limited to: transferring contours to radiotherapy treatment planning systems, aiding adaptive therapy and archiving contours for patient follow-up; Localization and definition of healthy anatomical structures. Limbus Contour is not intended for use with digital mammography. (Source: FDA 510(k) K241837 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships via Radformation (acquired April 30, 2024)"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    evidenceRigor: "E2",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Multiple independent multi-institutional peer-reviewed studies (Starke 2024, Radici 2022, Grossi 2025, Doolan 2023, Tabita 2025) support E2. No prospective/RCT evidence — insufficient for E3.",
    clinicalImpactNotes: "Independent workflow-adoption and time-saving evidence (Radici 2022) plus consistency benefits supports I3.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E3 + CE + FDA 510(k): mature peer-reviewed multi-center evidence with regulatory clearance; minor local commissioning and user training expected.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {"type": "Peer-reviewed Publication", "description": "Thibodeau‐Antonacci et al. Trade‐off of different deep learning‐based auto‐segmentation approaches for treatment planning of pediatric craniospinal irradiation autocontouring of OARs for pediatric CSI. Medical Physics 2025. Single-centre paediatric CSI comparison of LimbusAI vs in-house U-Nets; geometric and planning endpoints. HAIR label AutoContour corrected to Limbus Contour. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1002/mp.17782"},
      {"type": "Multi-vendor Comparative Study", "description": "Meixner E et al. Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation. Clin Transl Radiat Oncol 2024. Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2024.100855"},
      {"type": "Multi-vendor Comparative Study", "description": "Bordigoni B et al. Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models. Phys Med 2024. Single-centre pelvic comparison of atlas, random forest, MVision and LimbusAI; geometric endpoints. HAIR label Image+ corrected to Contour+. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ejmp.2024.104486"},
      {"type": "Peer-reviewed Publication", "description": "Bürkle et al. A student trained convolutional neural network competing with a commercial AI software and experts in organ at risk segmentation. Scientific Reports 2024. Single-centre comparison of Limbus Contour vs a student-trained CNN. HAIR label corrected to Limbus Contour. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1038/s41598-024-76288-y"},
      {"type": "Peer-reviewed Publication", "description": "Sarria G et al. Artificial Intelligence–Based Autosegmentation: Advantages in Delineation, Absorbed Dose-Distribution, and Logistics. Advances in Radiation Oncology 2024. Single-centre study of Limbus Contour on delineation, dose distribution and logistics. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.adro.2023.101394"},
      {"type": "Multi-vendor Comparative Study", "description": "Heilemann G et al. Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy. Phys Imaging Radiat Oncol 2023. Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2023.100515"},
      {"type": "Peer-reviewed Publication", "description": "Hoque S et al. Clinical Use of a Commercial Artificial Intelligence-Based Software for Autocontouring in Radiation Therapy: Geometric Performance and Dosimetric Impact. Cancers 2023. Single-centre geometric and dosimetric evaluation (research build of Limbus Contour). (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3390/cancers15245735"},
      {"type": "Peer-reviewed Publication", "description": "D’Aviero A et al. Clinical Validation of a Deep-Learning Segmentation Software in Head and Neck: An Early Analysis in a Developing Radiation Oncology Center. International Journal of Environmental Research and Public Health 2022. Single-centre H&N clinical validation of Limbus Contour; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3390/ijerph19159057"},
      {"type": "Peer-reviewed Publication", "description": "Arjmandi N et al. Clinical validation of AI-assisted contouring in prostate radiation therapy treatment planning: Highlighting automation bias and the need for standardized quality assurance. J Appl Clin Med Phys 2026. Single-centre prostate validation of Limbus Contour with dosimetric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1002/acm2.70425"},
      {"type": "Peer-reviewed Publication", "description": "Ashburner M et al. Comparative analysis of AI-generated and deformed image registration contours on daily CBCT in prostate cancer radiation therapy: accuracy and dosimetric implications using commercial tools. Phys Eng Sci Med 2026. Single-centre comparison of Limbus contours vs DIR on HyperSight CBCT; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1007/s13246-025-01686-z"},
      {"type": "Peer-reviewed Publication", "description": "Wong J et al. Implementation of deep learning-based auto-segmentation for radiotherapy planning structures: a workflow study at two cancer centers. Radiat Oncol 2021. Single-centre implementation report with Limbus directors as co-authors; workflow endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1186/s13014-021-01831-4"},
      {"type": "Peer-reviewed Publication", "description": "Shanbhag NM et al. Integrating Artificial Intelligence Into Radiation Oncology: Can Humans Spot AI?. Cureus 2023. Single-centre blinded Turing-style test of Limbus contours. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.7759/cureus.50486"},
      {"type": "Peer-reviewed Publication", "description": "Wong J et al. Training and Validation of Deep Learning-Based Auto-Segmentation Models for Lung Stereotactic Ablative Radiotherapy Using Retrospective Radiotherapy Planning Contours. Frontiers in Oncology 2021. Training and validation of Limbus lung SBRT models with Limbus co-authors; geometric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3389/fonc.2021.626499"},
      {"type": "Peer-reviewed Publication", "description": "Walter YA et al. Workflow Efficiency in Vaginal Cuff High Dose Rate Brachytherapy Using Artificial Intelligence-Based Organ Segmentation and Multi-Channel Cylinder Modeling. Cancers (Basel) 2025. Single-centre HDR brachytherapy workflow study with Limbus Contour; declared research agreement. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3390/cancers17172751"},
      {
        type: "Peer-reviewed Publication",
        description: "Grossi et al. Deep Learning-Based Auto-Contouring for Pelvic Volume Delineation in Prostate Cancer RT: Multicentric Analysis. Curr Oncol 2025;32(6):321",
        link: "https://doi.org/10.3390/curroncol32060321"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Lin/Fan et al. Evaluation and failure analysis of 4 commercial DL autosegmentation software (Limbus AI, MIM, Radformation, Siemens syngo.via) for abdominal OARs (111 patients). JACMP 2025;26(4):e70010. Limbus explicitly included — direct comparative (verified 2026-06-15).",
        link: "https://doi.org/10.1002/acm2.70010"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Fontaine et al. Robustness evaluation of AI auto-contouring software in daily routine practice (Limbus versions). Phys Med 2025;137:105065",
        link: "https://doi.org/10.1016/j.ejmp.2025.105065"
      },
      {
        type: "Peer-reviewed Publication",
        description: "McLaughlin et al. Rectum contours: geometry, dosimetry and predicted toxicity (308 prostate patients). Biomed Phys Eng Express 2025;11(5)",
        link: "https://doi.org/10.1088/2057-1976/adf8f2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Starke et al. Clinical evaluation of the efficacy of limbus AI software to augment contouring for prostate and nodes RT. BJR 2024 (DOI 10.1093/bjr/tqae077). Direct single-product evaluation of Limbus (verified 2026-06-15).",
        link: "https://doi.org/10.1093/bjr/tqae077"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Kim et al. Performance of 7 AI-based auto-contouring systems including Limbus AI v1.5 and v1.6 (42 cases). Phys Eng Sci Med 2024;47(3):1123-1140. Limbus explicitly included — direct comparative.",
        link: "https://doi.org/10.1007/s13246-024-01434-9"
      },
      {
        type: "Multi-vendor Comparative Study",
        description: "Bayley et al. Comparison of MIM Contour ProtégéAI v4.0.0 and Radformation/Limbus AI v1.7.0 for H&N OARs vs institutional reference. Appl Sci 2026;16(11):5681. Limbus explicitly included — direct comparative.",
        link: "https://doi.org/10.3390/app16115681"
      }
    ],
    lastUpdated: "2026-06-15",
    keyPapers: [
    {"doi": "10.1002/mp.17782", "title": "Trade‐off of different deep learning‐based auto‐segmentation approaches for treatment planning of pediatric craniospinal irradiation autocontouring of OARs for pediatric CSI", "authors": "Thibodeau‐Antonacci et al.", "journal": "Medical Physics", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre paediatric CSI comparison of LimbusAI vs in-house U-Nets; geometric and planning endpoints. HAIR label AutoContour corrected to Limbus Contour.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2024.100855", "title": "Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation", "authors": "Meixner E et al.", "journal": "Clin Transl Radiat Oncol", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison of three commercial models for post-operative breast CTVs; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.ejmp.2024.104486", "title": "Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models", "authors": "Bordigoni B et al.", "journal": "Phys Med", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre pelvic comparison of atlas, random forest, MVision and LimbusAI; geometric endpoints. HAIR label Image+ corrected to Contour+.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1038/s41598-024-76288-y", "title": "A student trained convolutional neural network competing with a commercial AI software and experts in organ at risk segmentation", "authors": "Bürkle et al.", "journal": "Scientific Reports", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison of Limbus Contour vs a student-trained CNN. HAIR label corrected to Limbus Contour.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.adro.2023.101394", "title": "Artificial Intelligence–Based Autosegmentation: Advantages in Delineation, Absorbed Dose-Distribution, and Logistics", "authors": "Sarria G et al.", "journal": "Advances in Radiation Oncology", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre study of Limbus Contour on delineation, dose distribution and logistics.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1016/j.phro.2023.100515", "title": "Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy", "authors": "Heilemann G et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre multi-site comparison of test-licensed Limbus, RaySearch and TheraPanacea tools; geometric and qualitative endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.3390/cancers15245735", "title": "Clinical Use of a Commercial Artificial Intelligence-Based Software for Autocontouring in Radiation Therapy: Geometric Performance and Dosimetric Impact", "authors": "Hoque S et al.", "journal": "Cancers", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre geometric and dosimetric evaluation (research build of Limbus Contour).", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.3390/ijerph19159057", "title": "Clinical Validation of a Deep-Learning Segmentation Software in Head and Neck: An Early Analysis in a Developing Radiation Oncology Center", "authors": "D’Aviero A et al.", "journal": "International Journal of Environmental Research and Public Health", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre H&N clinical validation of Limbus Contour; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1002/acm2.70425", "title": "Clinical validation of AI-assisted contouring in prostate radiation therapy treatment planning: Highlighting automation bias and the need for standardized quality assurance", "authors": "Arjmandi N et al.", "journal": "J Appl Clin Med Phys", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre prostate validation of Limbus Contour with dosimetric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1007/s13246-025-01686-z", "title": "Comparative analysis of AI-generated and deformed image registration contours on daily CBCT in prostate cancer radiation therapy: accuracy and dosimetric implications using commercial tools", "authors": "Ashburner M et al.", "journal": "Phys Eng Sci Med", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison of Limbus contours vs DIR on HyperSight CBCT; geometric endpoints.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1186/s13014-021-01831-4", "title": "Implementation of deep learning-based auto-segmentation for radiotherapy planning structures: a workflow study at two cancer centers", "authors": "Wong J et al.", "journal": "Radiat Oncol", "year": "2021", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre implementation report with Limbus directors as co-authors; workflow endpoints.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.7759/cureus.50486", "title": "Integrating Artificial Intelligence Into Radiation Oncology: Can Humans Spot AI?", "authors": "Shanbhag NM et al.", "journal": "Cureus", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre blinded Turing-style test of Limbus contours.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.3389/fonc.2021.626499", "title": "Training and Validation of Deep Learning-Based Auto-Segmentation Models for Lung Stereotactic Ablative Radiotherapy Using Retrospective Radiotherapy Planning Contours", "authors": "Wong J et al.", "journal": "Frontiers in Oncology", "year": "2021", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Training and validation of Limbus lung SBRT models with Limbus co-authors; geometric endpoints.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.3390/cancers17172751", "title": "Workflow Efficiency in Vaginal Cuff High Dose Rate Brachytherapy Using Artificial Intelligence-Based Organ Segmentation and Multi-Channel Cylinder Modeling", "authors": "Walter YA et al.", "journal": "Cancers (Basel)", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre HDR brachytherapy workflow study with Limbus Contour; declared research agreement.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi":"10.1093/bjr/tqae077","title":"Clinical evaluation of the efficacy of limbus artificial intelligence software to augment contouring for prostate and nodes radiotherapy","authors":"Starke A et al.","journal":"British Journal of Radiology","year":"2024","evidenceRigor":"E2","clinicalImpact":"I2","rationale":"Multi-institutional clinical evaluation of contour augmentation; reports editing effort, not only geometry.","vendorIndependent":true,"multiCenter":true,"externalValidation":true},
    {"doi":"10.3390/life12122088","title":"Workflow impact of Limbus AI auto-contouring","authors":"Radici L et al.","journal":"Life","year":"2022","evidenceRigor":"E1","clinicalImpact":"I2","rationale":"Single-centre workflow study reporting contouring time saved.","vendorIndependent":true},
    {"doi":"10.3390/curroncol32060321","title":"Can Deep Learning-Based Auto-Contouring Software Achieve Accurate Pelvic Volume Delineation in Volumetric Image-Guided Radiotherapy for Prostate Cancer? A Preliminary Multicentric Analysis","authors":"Grossi C et al.","journal":"Current Oncology","year":"2025","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Multicentric geometric evaluation of pelvic volumes against clinical reference contours.","vendorIndependent":true,"multiCenter":true,"externalValidation":true},
    {"doi":"10.3389/fonc.2023.1213068","title":"A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy","authors":"Doolan PJ et al.","journal":"Front. Oncol.","year":"2023","evidenceRigor":"E2","clinicalImpact":"I1","rationale":"Independent benchmark of several commercial systems on external clinical data; geometric endpoints.","vendorIndependent":true,"externalValidation":true},
    {"doi": "10.1002/acm2.70010", "title": "Evaluation and failure analysis of four commercial deep learning‐based autosegmentation software for abdominal organs at risk", "authors": "Fan M et al.", "journal": "J Applied Clin Med Phys", "year": "2025", "evidenceRigor": "E2", "clinicalImpact": "I1", "rationale": "Vendor-independent evaluation and failure analysis of four commercial systems on abdominal OARs; Limbus explicitly included.", "vendorIndependent": true, "externalValidation": true},
    {"doi": "10.1016/j.ejmp.2025.105065", "title": "Robustness evaluation of an artificial intelligence-based automatic contouring software in daily routine practice", "authors": "Fontaine J et al.", "journal": "Physica Medica", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre robustness evaluation of Limbus versions in daily routine practice; geometric endpoints.", "vendorIndependent": true},
    {"doi": "10.1088/2057-1976/adf8f2", "title": "An evaluation of rectum contours generated by artificial intelligence automatic contouring software using geometry, dosimetry and predicted toxicity", "authors": "McLaughlin O et al.", "journal": "Biomed. Phys. Eng. Express", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "I2", "rationale": "Single-centre study of 308 prostate patients reporting geometry, dosimetry and predicted toxicity of AI rectum contours.", "vendorIndependent": true},
    {"doi": "10.1007/s13246-024-01434-9", "title": "Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation", "authors": "Kim YW et al.", "journal": "Phys Eng Sci Med", "year": "2024", "evidenceRigor": "E2", "clinicalImpact": "I1", "rationale": "Independent comparative benchmark of seven commercial systems including two Limbus versions; geometric endpoints.", "vendorIndependent": true, "externalValidation": true},
    {"doi": "10.3390/app16115681", "title": "Comparison of Two Auto-Contouring Systems for Head and Neck Organs at Risk to Institutional Reference Standard in Radiotherapy Planning", "authors": "Bayley C et al.", "journal": "Applied Sciences", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "I1", "rationale": "Single-centre comparison against institutional reference contours for head-and-neck OARs.", "vendorIndependent": true}
  ],
    lastRevised: "2026-09-23",
    source: "FDA 510(k) database (K241837), company official sources. Multi-vendor comparison citations re-verified 2026-06-15 — all explicitly include Limbus per Methods."
  }
];

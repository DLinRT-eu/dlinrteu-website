import { ProductDetails } from "@/types/productDetails";

/**
 * RayStation Deep Learning Dose Prediction Models
 * Source: RaySearch DLP Model Catalogue
 * Last verified: 2026-01-23
 * 
 * Note: Model list based on publicly available information. 
 * Some models may require verification against latest catalog.
 */
export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K240398",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240398.pdf",
        description: "Models are trained for specific anatomical sites (Brain, Breast, Head & Neck, Lung, Prostate, Rectum) and techniques (VMAT, IMRT, SMLC, and Proton PBS) based on clinical treatment plans."
    },
    evaluationData: {
        primaryEndpoint: "Not specified",
        sourceUrl: "https://doi.org/10.1016/j.phro.2026.100999",
        description: "Prospective blinded clinical evaluation of 22 consecutive prostate patients using RayStation 11B and RSL-Prostate6000; preferred plans were selected for treatment. Other model-specific studies are listed separately in keyPapers.",
        results: "Processing time of seconds for dose prediction and minutes for optimization.",
        source: "Neugebauer et al. Phys Imaging Radiat Oncol 2026 (DOI: 10.1016/j.phro.2026.100999)",
        studyDesign: "Prospective blinded single-center clinical evaluation"
    },
    name: "RayStation Deep Learning Dose Prediction",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/raysearch-planning.ts",
    description: "Deep learning dose prediction module within RayStation that uses trained models to predict clinically acceptable dose distributions. The predicted dose is used as input for dose mimicking optimization, enabling rapid generation of high-quality treatment plans.",
    features: ["Deep learning dose prediction", "Dose mimicking optimization", "Multi-technique support (VMAT, IMRT, PBS)", "Automated plan generation"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/machine-learning-in-raystation/",
    anatomicalLocation: ["Brain", "Breast", "Head & Neck", "Lung", "Prostate", "Rectum"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning driven dose prediction",
      "Dose mimicking optimization using predicted dose as reference",
      "Customizable post-processing to match clinical protocols",
      "Support for VMAT, IMRT, SMLC, and Proton PBS techniques",
      "Models validated against clinical treatment plans",
      "Rapid automated plan generation workflow"
    ],
    // 13 Dose Prediction Models from RaySearch DLP Model Catalogue
    dosePredictionModels: [
      // Brain
      { name: "RSL Brain Proton", anatomicalSite: "Brain", technique: "Protons (PBS)", intent: "Curative" },
      
      // Breast
      { name: "RSL Breast Left", anatomicalSite: "Breast", technique: "Photons (SMLC)", intent: "Curative" },
      { name: "RSL Breast Left 2LVS", anatomicalSite: "Breast", technique: "Photons (Multi-Level)", intent: "Curative" },
      { name: "RSL Breast Locoregional 2LVS", anatomicalSite: "Breast", technique: "Photons (Locoregional)", intent: "Curative" },
      
      // Head and Neck
      { name: "RSL Oropharynx Proton 2LVS", anatomicalSite: "Head & Neck", technique: "Protons (PBS)", intent: "Curative" },
      { name: "RSL Oropharynx 2LVS", anatomicalSite: "Head & Neck", technique: "Photons (Dual Level)", intent: "Curative" },
      { name: "RSL Oropharynx 3LVS", anatomicalSite: "Head & Neck", technique: "Photons (Triple Level)", intent: "Curative" },
      
      // Lung
      { name: "RSL Lung SBRT", anatomicalSite: "Lung", technique: "Photons (SBRT)", intent: "Curative" },
      
      // Prostate
      { name: "RSL Prostate", anatomicalSite: "Prostate", technique: "Photons (Standard)", intent: "Curative" },
      { name: "RSL ProstateBed SVs Nodes 2LVS", anatomicalSite: "Prostate", technique: "Photons (Post-Op/Nodal)", intent: "Curative" },
      { name: "RSL Prostate SVs Nodes 2LVS", anatomicalSite: "Prostate", technique: "Photons (Intact/Nodal)", intent: "Curative" },
      { name: "RSL Prostate 3LVS", anatomicalSite: "Prostate", technique: "Photons (Triple Level)", intent: "Curative" },
      
      // Rectum
      { name: "RSL Rectum", anatomicalSite: "Rectum", technique: "Photons (Standard)", intent: "Curative" },

      // New in RayStation v2026 (July 2026 release). Subject to regulatory clearance in some markets;
      // not available for use or sale in USA/Canada per vendor. Exact catalogue names pending publication.
      { name: "RSL Breast Locoregional (v2026)", anatomicalSite: "Breast", technique: "Photons (Locoregional)", intent: "Curative" },
      { name: "RSL Lung Proton (v2026)", anatomicalSite: "Lung", technique: "Protons (PBS)", intent: "Curative" },
      { name: "RSL Prostate (v2026)", anatomicalSite: "Prostate", technique: "Photons", intent: "Curative" }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Beam configuration", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Predicted dose distribution", "RT plan", "RT dose"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE"]
    },
    technology: {
      integration: ["Native RayStation integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds for dose prediction, minutes for optimization"
    },
    safetyCorrectiveActions: [
      {"type": "software-update", "identifier": "Medsafe 37679", "date": "2026-10-06", "description": "Dose deformation can lose dose outside the original grid when a deformable registration expands near its boundary, potentially underestimating dose in subsequent evaluation or planning. This is a RayStation platform correction; the notice does not identify the DL dose-prediction model as defective. Closure and local mitigation have not been verified.", "affectedVersions": ["RayStation 4.7 through v2026, including some service packs"], "action": "Software upgrade; verify the manufacturer notice and mitigation for the installed version and affected dose-deformation workflow.", "authority": "Medsafe (New Zealand)", "sourceUrl": "https://www.medsafe.govt.nz/hot/Recalls/RecallDetail.asp?ID=37679"}
    ],
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240398",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2025-04-04",
        notes: "Covers RayStation 2023B, RayPlan 2023B, RayStation 2024A, RayPlan 2024A, RayStation 2024A SP3, RayPlan 2024A SP3"
      },
      intendedUseStatement: "\"RayStation is a software system for radiation therapy and medical oncology. Based on user input, RayStation proposes treatment plans. After a proposed treatment plan is reviewed and approved by authorized intended users, RayStation may also be used to administer treatments.\" (Source: FDA 510(k) K240398 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "2026",
    releaseDate: "2026-07-01",
    keyPapers: [
      {"doi": "10.1016/j.radonc.2024.110522", "title": "Clinical implementation of deep learning robust IMPT planning in oropharyngeal cancer patients: A blinded clinical study", "authors": "van Bruggen et al.", "journal": "Radiotherapy and Oncology", "year": "2024", "evidenceRigor": "E3", "clinicalImpact": "L4", "rationale": "Crossref metadata and publisher full text verified 2026-11-08. RaySearch-trained model in RayStation 11B; 60 training, 10 configuration, 10 retrospective test and 15 prospective patients. The selected plan was delivered in the prospective phase. Results apply to this configured model and do not validate all marketed models.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1016/j.phro.2023.100492", "title": "Clinical implementation of deep learning-based automated left breast simultaneous integrated boost radiotherapy treatment planning", "authors": "Zeverino et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Crossref metadata and PubMed/Europe PMC abstract verified 2026-11-08. Left-breast DL planning: 80 training plans, 10 validation patients and 17 subsequent clinical auto-plans. Conservative E1/L2 reflects the verified validation and dosimetric endpoints. Full methods and treatment-selection details require review before assigning E3/L4; clinical use alone is not assumed to establish that endpoint.", "multiCenter": false, "externalValidation": false},
      {"doi": "10.1016/j.radonc.2026.111782", "title": "Applying a pretrained DL-based IMPT planning workflow in an external center: A feasibility study in oropharyngeal cancer", "authors": "van Bruggen IG, Wolf AL, et al.", "journal": "Radiotherapy and Oncology", "year": "2026", "evidenceRigor": "E2", "clinicalImpact": "L2", "rationale": "External-center feasibility evaluation of a pretrained RayStation DL IMPT workflow; abstract-assessed. External validation supports E2, while dosimetry and modeled NTCP support L2. Measured editing time or clinical workflow improvement is not established by the abstract. Full-methods and independence checks remain pending.", "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": true},

      {"doi": "10.1016/j.phro.2023.100494", "title": "A geometry and dose-volume based performance monitoring of artificial intelligence models in radiotherapy treatment planning for prostate cancer", "authors": "De Kerf G, Claessens M, Raouassi F, et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I1", "rationale": "Full text checked 2026-09-25 (Europe PMC). Methods name RSL-Prostate-3625-SBRT v3.0.0 deep learning planning model in RayStation 11B; retrospective single-network monitoring; no competing interests declared.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1002/mp.17682", "title": "Enhancing automated right-sided early-stage breast cancer treatments via deep learning model adaptation without additional training", "authors": "Zeverino M, Fabiano S, Jeanneret‐Sozzi W, et al.", "journal": "Med Phys", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Full text checked 2026-09-25 (Europe PMC). RayStation 12A deep learning auto-planning adapted for right-sided breast; adapted model then used for clinical plans in 10 further patients. Developed in collaboration with RaySearch, so not vendor-independent.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
      {"doi": "10.1016/j.phro.2025.100834", "title": "Evaluation and tuning of a commercial automated planning system for prostate radiotherapy", "authors": "Carver A, Green S", "journal": "Phys Imaging Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I1", "rationale": "Single-center evaluation and tuning of a commercial RayStation model. The abstract reports 335 previously planned cases across study stages; do not conflate this with a single 318-case cohort. Retrospective dosimetric assessment supports E1/L2.", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2023.100496", "title": "Evaluation of a clinically introduced deep learning model for radiotherapy treatment planning of breast cancer", "authors": "Bakx N, van der Sangen M, Theuws J, Bluemink J, Hurkmans C, et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L3", "legacyClinicalImpact": "I2", "rationale": "Full text checked 2026-09-25 (Europe PMC). RaySearch 3D U-Net dose prediction model commissioned in RayStation (May 2022), evaluated in clinical use for left-sided breast. First author funded by RaySearch, so not vendor-independent.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
    {"doi": "10.1016/j.ctro.2025.100933", "title": "A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer", "authors": "Bolten JH et al.", "journal": "Clin Transl Radiat Oncol", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Single-centre fully automated prostate workflow in RayStation (DL segmentation + ML planning).", "vendorIndependent": true, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2025.100839", "title": "A multi-centre evaluation of deep learning based radiotherapy planning for left-sided node-negative breast cancer", "authors": "Besouw M et al.", "journal": "Physics and Imaging in Radiation Oncology", "year": "2025", "evidenceRigor": "E2", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Four-institution evaluation of left-sided node-negative breast planning, including 45 external cases. RaySearch funding disclosed; supports E2/L2.", "vendorIndependent": false, "multiCenter": true, "multiNational": false, "prospective": false, "externalValidation": true},
      {"doi": "10.1016/j.phro.2026.100961", "title": "Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria", "authors": "van Acht N et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2026", "evidenceRigor": "E1", "clinicalImpact": "L3", "legacyClinicalImpact": "I2", "rationale": "Retrospective single-center evaluation of 101 breast cases; workflow time estimated through a simulated workflow. RaySearch grant support disclosed.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
    {"doi": "10.1002/acm2.14065", "title": "Automated treatment planning for proton pencil beam scanning using deep learning dose prediction and dose-mimicking optimization", "authors": "Maes D et al.", "journal": "J Appl Clin Med Phys", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Clinical validation of RayStation ML planning for proton PBS; RaySearch co-authors.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.phro.2026.100999", "title": "Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy", "authors": "Neugebauer D et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2026", "evidenceRigor": "E3", "clinicalImpact": "L4", "legacyClinicalImpact": "I2", "rationale": "Prospective blinded single-center comparison in 22 consecutive prostate patients using RayStation 11B and RSL-Prostate6000. Preferred plans were selected for treatment, supporting E3 and decision-level L4. RaySearch financial relationships preclude an unqualified vendor-independent flag.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": true, "externalValidation": false},
    ],
    evidenceRigor: "E3",
    clinicalImpact: "L4",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E3 from Neugebauer et al. 2026 and van Bruggen et al. 2024, prospective clinical evaluations with plan selection for treatment. Besouw et al. provides external multi-center validation (E2); other scored papers cover specific models and sites. Evidence for older models is not automatically transferable to every v2026 model or market authorization.",
    clinicalImpactNotes: "L4 is supported by actual treatment-plan selection in Neugebauer et al. 2026 and van Bruggen et al. 2024. Other studies report dosimetric and workflow endpoints; no demonstrated toxicity or survival benefit is attributed to these planning models.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "R3 retained pending a separate implementation-readiness rubric review. Model-specific commissioning, local validation and workflow confirmation remain distinct from publication rigor and regulatory clearance. Medsafe 37679 covers platform dose deformation through v2026; verify applicability, installed-version mitigation and readiness before treating R3 as current implementation assurance.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: false,
    lastUpdated: "2026-11-08",
    lastRevised: "2026-09-23",
    source: "FDA 510(k) K240398; vendor website",
    evidence: [
      {"type": "Context reference (not scored)", "description": "A deep learning-based dose calculation method for volumetric modulated arc therapy. Indirect-comparative: generic DL dose-calculation method paper that does not evaluate the RayStation deep learning planning models, so it carries no E/I level for this product.", "link": "https://doi.org/10.1186/s13014-024-02534-2"},
      {
        type: "Peer-reviewed Publication",
        description: "A geometry and dose-volume based performance monitoring of AI models in radiotherapy treatment planning for prostate cancer. Phys Imaging Radiat Oncol. 2023 (RSL-Prostate-3625-SBRT)",
        link: "https://doi.org/10.1016/j.phro.2023.100494"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Enhancing automated right-sided early-stage breast cancer treatments via deep learning model adaptation without additional training. Med Phys. 2025",
        link: "https://doi.org/10.1002/mp.17682"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Evaluation and tuning of a commercial automated planning system for prostate radiotherapy. Phys Imaging Radiat Oncol. 2025",
        link: "https://doi.org/10.1016/j.phro.2025.100834"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bakx N et al. Evaluation of a clinically introduced deep learning model for radiotherapy treatment planning of breast cancer. Phys Imaging Radiat Oncol. 2023",
        link: "https://doi.org/10.1016/j.phro.2023.100496"
      },
      {"type": "Peer-reviewed Publication", "description": "Bolten JH et al. A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer. Clin Transl Radiat Oncol 2025. Single-centre fully automated prostate workflow in RayStation (DL segmentation + ML planning). (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.ctro.2025.100933"},
      {"type": "Peer-reviewed Publication", "description": "Besouw M et al. A multi-centre evaluation of deep learning based radiotherapy planning for left-sided node-negative breast cancer. Physics and Imaging in Radiation Oncology 2025. Multi-centre evaluation of RayStation DL planning for left-sided nodal breast; one author funded by RaySearch. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2025.100839"},
      {"type": "Peer-reviewed Publication", "description": "van Acht N et al. Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria. Phys Imaging Radiat Oncol 2026. Single-centre automated DL segmentation and planning for left-sided breast in RayStation. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2026.100961"},
      {"type": "Peer-reviewed Publication", "description": "Maes D et al. Automated treatment planning for proton pencil beam scanning using deep learning dose prediction and dose-mimicking optimization. J Appl Clin Med Phys 2023. Clinical validation of RayStation ML planning for proton PBS; RaySearch co-authors. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1002/acm2.14065"},
      {"type": "Peer-reviewed Publication", "description": "Neugebauer D et al. Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy. Phys Imaging Radiat Oncol 2026. Prospective blinded single-centre clinical evaluation of a fully automated prostate workflow in RayStation. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2026.100999"},
      {
        type: "Indirect-comparative",
        description: "Nemoto et al. Evaluation of deep learning-based automated radiotherapy planning for early-stage lung cancer using SBRT-VMAT. J Appl Clin Med Phys 2025;26(10):e70291. Uses the RatoGuide (AiRato Inc.) prediction model with RayStation as host TPS — not a RayStation DL planning model evaluation.",
        link: "https://doi.org/10.1002/acm2.70291"
      },
      {
        type: "FDA 510(k) Database Entry",
        description: "FDA 510(k) device listing for RayStation (K240398)",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K240398"
      },
      {
        type: "RaySearch Product Page",
        description: "Machine Learning in RayStation product page",
        link: "https://www.raysearchlabs.com/machine-learning-in-raystation/"
      },
      {
        type: "Vendor Publication",
        description: "RaySearch Deep Learning Planning Model Catalogue (vendor document, not peer-reviewed)",
        link: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/"
      },
      {
        type: "Product Release",
        description: "RayStation v2025 with ECHO algorithm (Memorial Sloan Kettering) for fast automated planning. Released May 2025.",
        link: "https://www.raysearchlabs.com/raystation-v2025/"
      },
      {
        type: "Product Release",
        description: "RayStation v2026 release page — introduces three new DL planning models (breast locoregional, lung proton, prostate). Subject to regulatory clearance in some markets; not available in USA/Canada.",
        link: "https://www.raysearchlabs.com/raystation-v2026/"
      }
    ],
    limitations: [
      "Predicted dose requires clinician review before clinical use",
      "Model performance depends on input data quality and contouring consistency",
      "Models trained on specific patient populations and treatment protocols",
      "Dose mimicking optimization may require manual adjustment for complex cases",
      "Available models and features vary by RayStation version and licensing",
      "v2026 models are subject to regulatory clearance in some markets and are not available for use or sale in USA/Canada per vendor"
    ]
  }
];

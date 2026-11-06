import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mriplanner",
    keyPapers: [
    {"doi": "10.1002/acm2.70335", "title": "Dosimetric evaluation of magnetic resonance imaging based synthetic computed tomography for head and neck photon and proton therapy", "authors": "Høiskar MK et al.", "journal": "J Appl Clin Med Phys", "year": "2025", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Single-centre dosimetric evaluation of MRI Planner sCT for photon and proton H&N plans.", "vendorIndependent": true},
    {"doi": "10.1186/s13014-023-02336-y", "title": "Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy", "authors": "Autret D et al.", "journal": "Radiat Oncol", "year": "2023", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Single-centre comparison of four commercial sCT generators; dosimetric endpoints.", "vendorIndependent": true},
    {"doi": "10.3389/fonc.2021.812643", "title": "Prospective Clinical Feasibility Study for MRI-Only Brain Radiotherapy", "authors": "Lerner M et al.", "journal": "Front Oncol", "year": "2022", "evidenceRigor": "E1", "clinicalImpact": "L4", "legacyClinicalImpact": "I2", "rationale": "Crossref issued 2022-01-10. Prospective single-centre feasibility study. Twenty of 21 glioma patients were treated on MRI Planner version 2.2. Single-centre, so E1. L4 is kept because patients were treated on the workflow.", "vendorIndependent": true, "prospective": true},
    {"doi": "10.1016/j.phro.2020.12.007", "title": "Synthetic computed tomography data allows for accurate absorbed dose calculations in a magnetic resonance imaging only workflow for head and neck radiotherapy", "authors": "Palmér E et al.", "journal": "Phys Imaging Radiat Oncol", "year": "2021", "evidenceRigor": "E1", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Dose-calculation accuracy of MRI Planner sCT; Spectronic co-author."},
      {"doi":"10.1016/j.ijrobp.2017.06.006","title":"MR-OPERA: A Multicenter/Multivendor Validation of MRI-Only Prostate Treatment Planning Using Synthetic CT Images","authors":"Persson E et al.","journal":"Int J Radiat Oncol Biol Phys","year":"2017","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Multicentre validation in 170 patients. This study used the older atlas software, not the current transfer-function model. Carl Siversson, a Spectronic employee, is a co-author.","multiCenter":true,"externalValidation":true},
      {"doi":"10.1186/s13014-021-01794-6","title":"Clinical validation of a commercially available deep learning software for synthetic CT generation for brain","authors":"Lerner M et al.","journal":"Radiat Oncol","year":"2021","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single-centre brain validation. Carl Siversson, a Spectronic employee, is a co-author, so this is not vendor-independent and is not external validation. The study is prospective.","prospective":true},
      {"doi":"10.1186/s13014-025-02744-2","title":"Clinical implementation of deep learning-based synthetic CT for MRI-only VMAT in head and neck and pelvic cancer patients","authors":"Earwong P et al.","journal":"Radiat Oncol","year":"2025","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Retrospective dose recalculation at one centre, 33 patients. Single-centre, so E1.","vendorIndependent":true},
      {"doi":"10.1016/j.radonc.2026.111530","pmid":"41980670","title":"Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative","authors":"Cusumano D et al.","journal":"Radiotherapy and Oncology","year":"2026","link":"https://doi.org/10.1016/j.radonc.2026.111530","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent benchmark of commercial sCT algorithms, including this product. Dosimetric and image endpoints only. The two centre countries are not named in the abstract, and the full text was not open, so multi-centre and multi-national stay false until they are.","vendorIndependent":true,"externalValidation":true},
      {"doi":"10.1186/s13014-020-01513-7","pmid":"32272943","title":"MR-PROTECT: Clinical feasibility of a prostate MRI-only radiotherapy treatment workflow and investigation of acceptance criteria","authors":"Persson E et al.","journal":"Radiation Oncology","year":"2020","link":"https://doi.org/10.1186/s13014-020-01513-7","evidenceRigor":"E1","clinicalImpact":"L4", "legacyClinicalImpact": "I2","rationale":"Single-centre prospective feasibility study, not a randomised trial. 40 patients, 39 treated, MRI Planner atlas version 1.1.2. L4 is kept because patients were treated on the workflow. It does not set E3.","vendorIndependent":true,"prospective":true},
      {"doi":"10.1002/acm2.12429","pmid":"30182461","title":"Cone beam <scp>CT</scp> for <scp>QA</scp> of synthetic <scp>CT</scp> in <scp>MRI</scp> only for prostate patients","authors":"Palmér E et al.","journal":"J Applied Clin Med Phys","year":"2018","link":"https://doi.org/10.1002/acm2.12429","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Develops a routine per-patient sCT QA procedure using kV-CBCT — a process safeguard rather than an accuracy metric.","vendorIndependent":true},
      {"doi":"10.1002/acm2.13525","pmid":"35044070","title":"Head and neck cancer patient positioning using synthetic CT data in MRI‐only radiation therapy","authors":"Palmér E et al.","journal":"J Applied Clin Med Phys","year":"2022","link":"https://doi.org/10.1002/acm2.13525","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Positioning accuracy from sCT-derived reference images in head and neck. F. Nordström, a former Spectronic employee, is disclosed, so vendor-independent is false. The endpoint is accuracy, so L2 rather than L3."},
      {"doi":"10.1002/acm2.14239","pmid":"38128040","title":"Evaluating the Hounsfield unit assignment and dose differences between CT‐based standard and deep learning‐based synthetic CT images for MRI‐only radiation therapy of the head and neck","authors":"Singhrao K et al.","journal":"J Applied Clin Med Phys","year":"2023","link":"https://doi.org/10.1002/acm2.14239","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent HU-assignment and dose analysis at the hardest site for bone/air discrimination.","vendorIndependent":true},
      {"doi":"10.1016/j.phro.2024.100625","pmid":"39253731","title":"Evaluation of magnetic resonance imaging derived synthetic computed tomography for proton therapy planning in prostate cancer","authors":"Fridström KM et al.","journal":"Physics and Imaging in Radiation Oncology","year":"2024","link":"https://doi.org/10.1016/j.phro.2024.100625","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Proton dose evaluation on commercial MR-derived sCT for prostate.","vendorIndependent":true},
      {"doi":"10.4103/jmp.jmp_259_25","pmid":"42039733","title":"Feasibility of magnetic resonance-based synthetic computed tomography for proton dose calculation in prostate cancer","authors":"Thumyongkit N et al.","journal":"Journal of Medical Physics","year":"2026","link":"https://doi.org/10.4103/jmp.jmp_259_25","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Ten-patient retrospective proton dose-calculation feasibility study naming MRI Planner. Proton use is outside the FDA photon indication.","vendorIndependent":true},
      {"doi":"10.1016/j.phro.2024.100557","title":"Evaluation of a deep learning magnetic resonance imaging reconstruction method for synthetic computed tomography generation in prostate radiotherapy","authors":"Olsson LE et al.","journal":"Phys Imaging Radiat Oncol","year":"2024","evidenceRigor":"E1","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"MRI Planner v2.4.14 with GE AIR Recon DL. Single centre. Cohort 1: 24 patients. Cohort 2: 15 patients. Mean target and OAR dose differences in cohort 1 were under 0.06 Gy. No Spectronic employee among the authors. A speaker fee from GE HealthCare is disclosed for C. Jamtheim Gustafsson.","vendorIndependent":true},
      {"doi":"10.1002/acm2.14583","title":"Brain MR-only workflow in clinical practice: A comparison among generators for quality assurance and patient positioning","authors":"Levardon M et al.","journal":"J Appl Clin Med Phys","year":"2024","evidenceRigor":"E1","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"Single-centre comparison of four commercial brain generators, including MRPlanner (Spectronic, T1 Dixon). Authors declare no conflicts. Crossref issued 2024-11-25.","vendorIndependent":true},
      {"doi":"10.1016/j.phro.2026.101045","title":"Impact of dose calculation algorithm on magnetic resonance imaging-only radiotherapy for prostate and glioma","authors":"af Wetterstedt S et al.","journal":"Phys Imaging Radiat Oncol","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"Same patients recalculated on atlas v1.1.2 and deep-learning v2.4.14. 39 prostate patients from MR-PROTECT and 17 glioma patients. Single centre. No Spectronic employee among the authors.","vendorIndependent":true},
      {"doi":"10.1186/s13014-026-02922-w","title":"Metal artifact reduction for 3 T MRI-only prostate radiotherapy in patients with hip prostheses","authors":"Coskun M et al.","journal":"Radiat Oncol","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"Five prostate patients with hip prostheses, MRI Planner v2.7.4, retrospective. The paper states this use was experimental and not within the approved intended use. C. Siversson is an employee of GE HealthCare/Spectronic Medical."}
    ],
    trainingData: {
        source: "FDA 510(k) summary K211841",
        disclosureLevel: "partial",
        description: "sCT model: MR and CT from 244 patients in treatment position at four hospitals. Contour model: MR from 175 patients at four hospitals, with in-house expert contours. The summary states that the contour truthers were employed by the manufacturer. Training-set demographics are not given. The summary also prints bench dose and Dice results.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211841.pdf"
    },
    evaluationData: {
        results: "Printed in K211841 for the bench dose and Dice tests. MR-OPERA (atlas software, 170 prostate patients, four centres) is the multi-centre clinical study. It is not a deep-learning TFE study.",
        primaryEndpoint: "Dose difference and Dice / Hausdorff distance in the 510(k) bench tests",
        source: "FDA 510(k) summary K211841; Persson et al. MR-OPERA, Int J Radiat Oncol Biol Phys 2017",
        description: "Bird et al. 2024 was removed. That paper describes the authors' own cycle-GAN and does not name MRI Planner. MR-OPERA evaluated the older atlas software in 170 prostate patients at four centres. Carl Siversson, a Spectronic employee, is a co-author.",
        studyDesign: "Regulatory bench test plus a multi-centre atlas validation. Later deep-learning studies on this page are single-centre unless a paper says otherwise.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211841.pdf"
    },
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: true,
        notes: "Synthetic-CT (deep-learning Transfer Function Estimation) is the primary, well-validated component of MRI Planner.",
        evaluationData: {
          studyDesign: "Regulatory bench test, one multi-centre atlas study, and single-centre deep-learning studies",
          primaryEndpoint: "Dosimetric equivalence of sCT vs planning CT",
          results: "Persson MR-OPERA 2017: atlas software, 170 prostate patients, four centres, Spectronic co-author. Lerner 2022 Front Oncol: 20 of 21 glioma patients treated on deep-learning v2.2 at one centre. Earwong 2025: retrospective recalculation, one centre, 33 patients. Bird 2024 does not evaluate MRI Planner and was removed.",
          description: "The multi-centre figure is the 2017 atlas study, not the current TFE model. Deep-learning clinical studies on this page are single-centre. Proton papers are outside the FDA photon indication.",
          source: "Persson et al. IJROBP 2017; Lerner et al. Front Oncol 2022; K211841 summary",
          sourceUrl: "https://doi.org/10.1016/j.ijrobp.2017.06.006",
        },
        evidenceRigor: "E2",
        evidenceRigorNotes: "E2 is the strongest scored design that still applies: MR-OPERA is multi-centre but atlas-based and has a Spectronic co-author. No systematic review or randomised trial of this product was found. Bird 2024 was removed.",
        clinicalImpact: "L4",
    legacyClinicalImpact: "I2",
        clinicalImpactNotes: "Technical/dosimetric efficacy demonstrated for MRI-only planning; no outcome-level benefit yet.",
      },
      "Auto-Contouring": {
        usesAI: true,
        notes: "Auto-contouring scope is narrow: FDA-cleared only for bladder, colon and femoral heads in prostate workflows. No tumor/CTV contouring.",
        trainingData: {
          disclosureLevel: "partial",
          description: "Healthy-structure (bladder, colon, femoral heads) auto-contouring for adult male prostate workflows. K211841: MR from 175 patients at four hospitals. The contour truthers were employed by the manufacturer.",
          source: "FDA 510(k) K211841 Summary",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211841.pdf",
        },
        evaluationData: {
          studyDesign: "Software V&V (FDA 510(k))",
          primaryEndpoint: "Dice and 95% Hausdorff distance, as printed in K211841",
          results: "Printed in the K211841 summary. No separate peer-reviewed Dice study of this contour module was found.",
          description: "Validation of the prostate-workflow healthy-structure contouring is in the K211841 summary. The truthers were the manufacturer's employees. LUND-PROBE was not added: an author is named Kadhim M, and the assigned reviewer needs to confirm that before the dataset is listed.",
          source: "FDA 510(k) K211841 Summary",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211841.pdf",
        },
        evidenceRigor: "E0",
        evidenceRigorNotes: "No peer-reviewed publication located for the auto-contouring module specifically. PubMed searched 2026-06-13.",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I0",
        clinicalImpactNotes: "L2 from the Dice and Hausdorff figures in K211841. There is no peer-reviewed accuracy paper for this module, so evidence rigor stays E0. I0 is the old code only.",
      },
    },
    name: "MRI Planner",
    company: "Spectronic Medical (a GE HealthCare company; MRI Planner is manufactured by Spectronic Medical)",
    companyUrl: "https://medical.spectronic.se/",
    productUrl: "https://medical.spectronic.se/page-2/page6/index.html",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-synthesis/spectronic.ts",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning, with integrated auto-segmentation capabilities.",
    features: [
      "MR-only workflow",
      "Deep learning based",
      "Fast processing",
      "Synthetic CT generation",
      "Healthy-structure contour generation for prostate workflows"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/spectronic-medical.jpg",
    website: "https://medical.spectronic.se/page-2/page6/index.html",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: [
      "Deep learning-based Transfer Function Estimation (TFE)",
      "Clinical workflow integration",
      "MR-only radiotherapy planning",
      "Synthetic CT generation",
      "Healthy-structure contour generation for prostate workflows",
      "Brain, head & neck and pelvis synthetic-CT generation supported in the GE iRT MR Direct / MR Direct workflow (ESTRO 2026)"
    ],
    supportedStructures: [
      "Pelvis/Prostate: Bladder",
      "Pelvis/Prostate: Colon",
      "Pelvis/Prostate: Femoral Heads"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard DICOM MRI image stack"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT", "Healthy-structure contours for prostate workflows"],
      outputFormat: ["DICOM", "DICOM-RTSTRUCT"]
    },
    technology: {
      integration: [
        "TPS integration",
        "PACS integration",
        "GE iRT MR Direct / MR Direct workflow (with iRT and/or MR Contour DL depending on configuration)"
      ],
      deployment: ["On-premises", "Cloud-based service in published validation workflows"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Approximately 4-6 minutes was stated for v2.3. The white-paper URL returned HTTP 404 on 2026-11-05, so this figure was not re-verified."
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "B-07350097430017",
          riskClass: "class-iib",
          registeredTradeName: "MRI Planner",
          manufacturerSrn: "SE-MF-000024476",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&basicUdi=B-07350097430017",
          lastVerified: "2026-11-05"
      },
        status: "cleared",
        class: "Class IIb",
        type: "Medical Device",
        regulation: "CE marked; Class IIb per EUDAMED"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K211841",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ; QKB",
        decisionDate: "2022-08-25"
      },
      intendedUseStatement: "MRI Planner is indicated for photon external-beam radiotherapy planning by trained radiation oncologists, dosimetrists and physicists, in adult patients, for primary and metastatic cancers in the brain and head-neck regions, as well as soft tissue cancers in the pelvic region. It generates synthetic CT images for radiation attenuation estimation for the pelvis, brain and head-neck regions only. It generates automatically derived contours of the bladder, colon and femoral heads for prostate cancer patients only, and is not intended to automatically contour tumors or tumor clinical target volumes. Proton papers are research outside this US indication. (Source: FDA 510(k) K211841 Summary.) The vendor page also describes fiducial markers in the synthetic CT, as used in MR-PROTECT."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: [
        "Direct sales",
        "GE HealthCare (as part of iRT MR Direct workflow)"
      ]
    },
    version: "Not publicly verified",
    releaseDate: "Not publicly verified",
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    source: "FDA 510(k) K211841 summary (decision 2022-08-25); EUDAMED Basic UDI-DI B-07350097430017, Class IIb, on the market, checked 2026-11-05; Spectronic vendor page; GE HealthCare 12 May 2026 release calling Spectronic a GE HealthCare company, with no close date added. Q4 2026 review: Bird 2024 removed; MR-PROTECT rescored E1; new papers Olsson 2024, Levardon 2024, af Wetterstedt 2026 and Coskun 2026. MR Contour DL is a GE product and is not this contour module.",
    evidence: [
      {"type": "Peer-reviewed Publication", "description": "Høiskar MK et al. Dosimetric evaluation of magnetic resonance imaging based synthetic computed tomography for head and neck photon and proton therapy. J Appl Clin Med Phys 2025. Single-centre dosimetric evaluation of MRI Planner sCT for photon and proton H&N plans. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1002/acm2.70335"},
      {"type": "Multi-vendor Comparative Study", "description": "Autret D et al. Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy. Radiat Oncol 2023. Single-centre comparison of four commercial sCT generators; dosimetric endpoints. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1186/s13014-023-02336-y"},
      {"type": "Peer-reviewed Publication", "description": "Lerner M et al. Prospective Clinical Feasibility Study for MRI-Only Brain Radiotherapy. Front Oncol 2021. Prospective clinical feasibility study of MRI-only brain RT with MRI Planner. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.3389/fonc.2021.812643"},
      {"type": "Peer-reviewed Publication", "description": "Palmér E et al. Synthetic computed tomography data allows for accurate absorbed dose calculations in a magnetic resonance imaging only workflow for head and neck radiotherapy. Phys Imaging Radiat Oncol 2021. Dose-calculation accuracy of MRI Planner sCT; Spectronic co-author. (Added 2026-09-23 from HAIR cross-check.)", "link": "https://doi.org/10.1016/j.phro.2020.12.007"},
      {
        type: "Multicenter Study",
        description: "Persson et al. MR-OPERA: A Multicenter/Multivendor Validation of MRI-Only Prostate Treatment Planning Using Synthetic CT Images. Int J Radiat Oncol Biol Phys 2017;99(3):692-700. Direct evaluation of the Spectronic MRiPlanner (formerly Statistical Decomposition Algorithm) synthetic CT for prostate MR-only RT in 170 patients across 4 centers. Verified 2026-06-15: this DOI/PMID resolves to the MR-OPERA paper which evaluates the Spectronic sCT product (not Philips MRCAT).",
        link: "https://doi.org/10.1016/j.ijrobp.2017.06.006"
      },
      {
        type: "Clinical Validation",
        description: "Lerner et al. Clinical validation of a commercially available deep learning software for synthetic CT generation for brain. Radiat Oncol 2021;16:66.",
        link: "https://doi.org/10.1186/s13014-021-01794-6"
      },
      {
        type: "Clinical Implementation",
        description: "Earwong et al. Clinical implementation of deep learning-based synthetic CT for MRI-only volumetric modulated arc therapy in head and neck and pelvic cancer patients. Radiat Oncol 2025;20:166.",
        link: "https://doi.org/10.1186/s13014-025-02744-2"
      },
      {
        type: "Indirect-Comparative",
        description: "Cusumano D, Maspero M et al. MESCAL. Radiother Oncol 2026. Independent benchmark that includes this product. Per-vendor numbers and the conflict statement were not read because the full text was not open. The two centre countries are not named in the abstract.",
        link: "https://doi.org/10.1016/j.radonc.2026.111530"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Olsson et al. 2024, MRI Planner v2.4.14, single centre (doi:10.1016/j.phro.2024.100557). Levardon et al. 2024, four brain generators including MRPlanner (doi:10.1002/acm2.14583). af Wetterstedt et al. 2026, atlas v1.1.2 and deep-learning v2.4.14 (doi:10.1016/j.phro.2026.101045). Coskun et al. 2026, v2.7.4, outside the approved use, Spectronic co-author (doi:10.1186/s13014-026-02922-w).",
        link: "https://doi.org/10.1016/j.phro.2024.100557"
      },
      {
        type: "Unscored",
        description: "Persson et al. 2023 cost model (doi:10.1016/j.ctro.2022.11.012). Left unscored. The 209 EUR figure excludes the cost of sCT generation and names MriPlanner as one of three vendors. Singhrao 2020 phantom paper (doi:10.1002/mp.14027) was removed from keyPapers because the abstract does not name MRI Planner. LUND-PROBE (doi:10.1038/s41597-025-04954-5) was not added: the author list includes Kadhim M.",
        link: "https://doi.org/10.1016/j.ctro.2022.11.012"
      }
    ],
    evidenceRigor: "E2",
    evidenceRigorNotes: "E2 on 2026-11-05. MR-PROTECT is a 40-patient single-centre feasibility study (39 treated on atlas v1.1.2), not a randomised trial, so it does not set E3. No systematic review of this product was found. Bird 2024 was removed because it describes the authors' own cycle-GAN and does not name MRI Planner. MR-OPERA remains the multi-centre study, and it used the older atlas software with a Spectronic co-author. EUDAMED Basic UDI-DI B-07350097430017 is Class IIb and on the market (checked 2026-11-05).",
    clinicalImpact: "L4",
    clinicalImpactNotes: "L4 stays because patients were treated on MRI Planner: Lerner 2022 (20 of 21 glioma patients, deep-learning v2.2, one centre) and MR-PROTECT (39 of 40 patients, atlas v1.1.2, one centre). That is not an outcome benefit. Proton papers are outside the FDA photon indication.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Cleared device (FDA K211841, EUDAMED Class IIb, on the market). Local MRI sequence, distortion and dose checks are still required. The score is E2, not E3. Published software versions run from 1.1.2 to experimental 2.7.4, and the current release is not stated on the vendor page.",
    limitations: [
      "Atlas evidence, including MR-OPERA and MR-PROTECT v1.1.2, is not evidence for the current deep-learning transfer-function model.",
      "Proton dose papers are outside the FDA photon external-beam indication.",
      "Coskun 2026 used v2.7.4 and states that this use was outside the approved intended use. A Spectronic employee is a co-author.",
      "The 4–6 minute processing claim was not re-verified because the white-paper link returned HTTP 404 on 2026-11-05.",
      "Singhrao 2020 was not scored: the abstract does not name MRI Planner. LUND-PROBE was not added pending reviewer confirmation of an author named Kadhim M."
    ],
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: false,
    evidenceProspective: true,
    evidenceExternalValidation: true
  }
];

import { ProductDetails } from "@/types/productDetails";

export const MD_ANDERSON_PRODUCTS: ProductDetails[] = [
  {
    id: "rpa-radiation-planning-assistant",
    trainingData: {
        disclosureLevel: "minimal",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K222728.pdf",
        source: "FDA 510(k) summary K222728",
        description: "The training dataset includes CT scans of hundreds to thousands of patients with head and neck, cervical, breast, and whole brain cancers from MD Anderson Cancer Center, used to develop automated contouring and planning models.",
        demographics: "Adult cancer patients"
    },
    evaluationData: {
        studyDesign: "Retrospective clinical acceptability review",
        sourceUrl: "https://doi.org/10.1200/GO.23.00376",
        source: "Court et al. JCO Global Oncology 2024 (DOI: 10.1200/GO.23.00376)",
        results: "More than 90% of 75 plans acceptable with at most minor edits; 31 clinicians from 16 institutions in six countries reviewed the cases. Reviewer geography does not establish patient-cohort geography.",
        primaryEndpoint: "Clinical plan acceptability",
        description: "Court et al. 2024 reports retrospective clinical acceptability. Separate studies assess dosimetry and editing time; patient-outcome or societal benefit is not established. The RPA uses RapidPlan (Varian Medical Systems) internally for knowledge-based plan optimization; literature on RapidPlan alone is not attributed to the RPA."
    },
    name: "Radiation Planning Assistant (RPA)",
    company: "MD Anderson Cancer Center",
    companyUrl: "https://www.mdanderson.org/",
    productUrl: "https://rpa.mdanderson.org/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/md-anderson.ts",
    description:
      "The Radiation Planning Assistant offers a suite of fully automated contouring and radiotherapy planning tools for cervix, breast, head and neck, and whole brain cancers. Developed at MD Anderson Cancer Center and made available through selected collaborations with a goal of minimal or zero cost in low- and middle-income countries (LMICs). Not marketed in the USA despite FDA clearance.",
    features: ["Automated contouring", "Radiotherapy planning", "Multi-anatomical site support", "FDA cleared"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/md_anderson.svg",
    website: "https://rpa.mdanderson.org/",
    supportEmail: "RPA_Info@mdanderson.org",
    anatomicalLocation: ["Cervix", "Post-Mastectomy Breast", "Head and Neck", "Whole Brain"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Cervix Cancer", "Breast Cancer", "Head and Neck Cancer", "Brain Cancer"],
    keyFeatures: [
      "Fully automated contouring tools",
      "Comprehensive radiotherapy planning suite using RapidPlan knowledge-based planning via Eclipse API",
      "Multi-anatomical site coverage: head and neck, cervix, breast, whole brain",
      "Clinical validation and FDA clearance",
      "Cloud plan generation; local TPS import, review, editing and final dose calculation required",
      "Access through selected collaborations; not commercially marketed in the USA",
      "Integrated automated internal quality assurance"
    ],
    technicalSpecifications: {
      population: "Adult cancer patients",
      input: ["CT images", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Contoured structures", "Treatment plans"],
      outputFormat: ["DICOM-RTSTRUCT", "DICOM-RTPLAN"],
    },
    technology: {
      integration: ["Treatment Planning Systems", "Hospital workflows"],
      deployment: ["Cloud-based (web service at rpa.mdanderson.org)"],
      triggerForAnalysis: "Within radiation therapy planning workflow",
      processingTime: "Minutes per case",
    },
    regulatory: {
      ce: {
        status: "not_applicable",
        class: "N/A",
        type: "Medical Device",
        notes: "CE marking not obtained. Deployed clinically in LMICs (South Africa, Philippines, Tanzania) and not marketed in the USA."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K222728",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2023-05-17"
      },
      intendedUseStatement:
        "The Radiation Planning Assistant (RPA) is used to plan radiotherapy treatments for patients with cancers of the head and neck, cervix, breast, and metastases to the brain. The RPA is used to plan external beam irradiation with photon beams using CT images. The RPA is used to create contours and treatment plans that the user imports into their own Treatment Planning System (TPS) for review, editing, and re-calculation of the dose. Some functions of the RPA use Eclipse 15.6. The RPA is not intended to be used as a primary treatment planning system. All automatically generated contours and plans must be imported into the user's own treatment planning system for review, edit, and final dose calculation. (Source: FDA 510(k) K222728 Summary, accessed 2026-06-14)",
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Selected LMIC collaborations", "Academic partnerships", "Web-based service (rpa.mdanderson.org)"],
    },
    structuresUnavailable: true,
    version: "Latest",
    releaseDate: "2024-01-01",
    keyPapers: [
      {"doi": "10.1200/go-25-00702", "title": "Artificial Intelligence–Powered Radiotherapy for Resource-Limited Settings: Advancing Cervical and Prostate Cancer Treatment Planning With the Radiation Planning Assistant", "authors": "Netherton TJ, Aggarwal AK, et al.", "journal": "JCO Global Oncology", "year": "2026", "evidenceRigor": "E2", "clinicalImpact": "L2", "rationale": "Abstract-assessed retrospective extension in 50 cases (40 prostate, 10 cervix). E2 is retained pending full-methods verification of patient-data provenance; international authorship does not establish multicenter or multinational validation. L2 reflects clinical acceptability, not observed patient outcomes. Developer co-authors.", "vendorIndependent": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1016/j.prro.2020.12.003", "title": "Clinical Acceptability of Automated Radiation Treatment Planning for Head and Neck Cancer Using the Radiation Planning Assistant", "authors": "Olanrewaju A, Court LE, Zhang L, et al.", "journal": "Practical Radiation Oncology", "year": "2021", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Retrospective evaluation of 50 head-and-neck cases; reviewers from multiple institutions do not make the patient cohort multinational. Clinical acceptability supports L2; developer co-authors.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1200/go.23.00050", "title": "Feasibility and Clinical Acceptability of Automation-Assisted 3D Conformal Radiotherapy Planning for Patients With Cervical Cancer in a Resource-Constrained Setting", "authors": "Muya S, Ndumbalo J, et al.", "journal": "JCO Global Oncology", "year": "2023", "evidenceRigor": "E2", "clinicalImpact": "L3", "rationale": "External retrospective evaluation at Ocean Road Cancer Institute, Tanzania: 30 cervical cases, 29 processed. Directly measured contour/plan editing time supports L3; external patient data support E2. Developer co-authors; not a multi-national patient cohort.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": true},
      {"doi": "10.1002/acm2.14338", "title": "Evaluating automatically generated normal tissue contours for safe use in head and neck and cervical cancer treatment planning", "authors": "Douglas R, Olanrewaju A, et al.", "journal": "Journal of Applied Clinical Medical Physics", "year": "2024", "evidenceRigor": "E1", "clinicalImpact": "L2", "rationale": "Retrospective evaluation of dosimetric consequences of automatically generated contours in 54 head-and-neck and 39 cervical cases; developer co-authors.", "vendorIndependent": false, "multiCenter": false, "multiNational": false, "prospective": false, "externalValidation": false},
      {"doi": "10.1002/mp.15868", "title": "Clinical acceptability of fully automated external beam radiotherapy for cervical cancer with three different beam delivery techniques", "authors": "Rhee DJ, Jhingran A, Huang K, et al.", "journal": "Medical Physics", "year": "2022", "evidenceRigor": "E2", "clinicalImpact": "L2", "rationale": "35 cervical CT cases from three South African centers; external evaluation of four-field box, 3D-conformal and VMAT planning, with clinical acceptability and dosimetric endpoints. Developer co-authors.", "vendorIndependent": false, "multiCenter": true, "multiNational": false, "prospective": false, "externalValidation": true},

      {"doi": "10.1200/GO.23.00376", "title": "Artificial Intelligence-Based Radiotherapy Contouring and Planning to Improve Global Access to Cancer Care", "authors": "Court LE et al.", "journal": "JCO Global Oncology", "year": "2024", "evidenceRigor": "E2", "clinicalImpact": "L2", "legacyClinicalImpact": "I5", "rationale": "75 cases reviewed by 31 clinicians from 16 institutions in six countries; more than 90% acceptable with at most minor edits. Reviewer geography must not be interpreted as the geography of the patient cohort.", "vendorIndependent": false, "multiCenter": true, "multiNational": false, "externalValidation": true},
      {"doi": "10.1002/mp.17588", "title": "An automated treatment planning portfolio for whole breast radiotherapy", "authors": "Baroudi H et al.", "journal": "Medical Physics", "year": "2025", "evidenceRigor": "E2", "clinicalImpact": "L2", "legacyClinicalImpact": "I2", "rationale": "Breast planning evaluation with 40 external cases from Switzerland, Argentina, Iran and the USA plus 15 internal cases. E2/L2; developer co-authors. Published online in 2024, journal issue 2025.", "vendorIndependent": false, "multiCenter": true, "multiNational": true, "externalValidation": true},
    ],
    evidenceRigor: "E2",
    clinicalImpact: "L3",
    legacyClinicalImpact: "I5",
    evidenceRigorNotes: "Public-evidence review 2026-11-08: E2 supported by external patient cohorts in Muya 2023, Rhee 2022 and Baroudi 2025. Reviewer institutions and countries are distinguished from patient-data provenance. Historical non-DL methods, reviews, FMEA and RapidPlan-only studies are unscored context. Netherton 2026 remains abstract-assessed pending full-text verification.",
    clinicalImpactNotes: "L3 is supported by measured editing time in Muya et al. 2023. Dosimetric and acceptability studies support L2. Access-to-care aims and deployment announcements do not establish measured societal benefit, toxicity reduction or survival improvement.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "R4 retained pending a separate implementation-readiness rubric review. Public deployment and implementation reports exist, but clearance and publication rigor alone do not establish low local implementation effort. FDA instructions require local TPS review, editing and final dose calculation.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: false,
    evidenceExternalValidation: true,
    evidence: [
      {"type": "Context reference (not scored)", "description": "Fully Automatic Treatment Planning for External-Beam Radiation Therapy of Locally Advanced Cervical Cancer: A Tool for Low-Resource Clinics. Historical multi-atlas/rule-based planning pipeline; not evidence of the current deep-learning modules. Retained unscored.", "link": "https://doi.org/10.1200/jgo.18.00107"},
      {"type": "Context reference (not scored)", "description": "Using Failure Mode and Effects Analysis to Evaluate Risk in the Clinical Adoption of Automated Contouring and Treatment Planning Tools. Implementation context: failure-mode and effects analysis, without patient-level efficacy endpoints. Retained unscored.", "link": "https://doi.org/10.1016/j.prro.2022.01.003"},
      {"type": "Official service information", "description": "Current RPA access information: selected collaborations; cloud output requires local clinical review.", "link": "https://rpa.mdanderson.org/"},
      {
        type: "Peer-reviewed Publication",
        description: "Court et al. Review of the RPA service and access-to-care aims. JCO Global Oncology 2023; not a primary efficacy study.",
        link: "https://doi.org/10.1200/GO.22.00431"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Court et al. AI-based radiotherapy contouring and planning to improve global access to cancer care; multi-institutional review (16 institutions, 6 countries). JCO Global Oncology 2024.",
        link: "https://doi.org/10.1200/GO.23.00376"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Baroudi et al. An automated treatment planning portfolio for whole breast radiotherapy (RPA breast planning, MD Anderson with collaborating centres in Argentina and Switzerland). Med Phys 2025;52(3):1779-1788.",
        link: "https://doi.org/10.1002/mp.17588"
      },
      {
        type: "Indirect-comparative",
        description: "Kavuma et al. Feasibility and impact of knowledge-based automated RT planning in LMICs (uses Varian RapidPlan in Eclipse — not RPA). ecancermedicalscience 2025;19:1988. Retained as adjacent KBP-in-LMIC context only.",
        link: "https://doi.org/10.3332/ecancer.2025.1988"
      },
      {
        type: "Indirect-comparative",
        description: "Lloyd et al. Externally validated KBP model for ML-assisted RT of high-grade glioma. Med Dosim 2026;51(2):213-217. Full text verified 2026-08-25: evaluates a Varian RapidPlan model at BC Cancer and does not name the RPA — retained as adjacent KBP context only.",
        link: "https://doi.org/10.1016/j.meddos.2025.12.001"
      },
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K222728 received May 17, 2023",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K222728"
      },
      {
        type: "Publications Database",
        description: "Complete collection of RPA research publications",
        link: "https://rpa.mdanderson.org/publications"
      }
    ],
    lastUpdated: "2026-11-08",
    lastRevised: "2026-08-27",
  },
];

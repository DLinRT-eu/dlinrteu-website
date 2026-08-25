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
        studyDesign: "Retrospective multi-center and prospective validation",
        sourceUrl: "https://doi.org/10.1200/GO.22.00431",
        source: "Netherton et al. JCO Global Oncology 2023 (DOI: 10.1200/GO.22.00431)",
        results: "More than 90% of plans clinically acceptable with minor edits, reviewed by specialists from 16 institutions in 6 countries. 88% of H&N plans and 94% of cervical cancer plans acceptable without modification.",
        primaryEndpoint: "Clinical plan acceptability",
        description: "Multiple studies demonstrate improved radiotherapy quality and clinical efficacy, particularly aimed at increasing access in resource-limited settings. Evidence includes multi-institutional validation across head and neck, cervical, breast, and brain cancers. The RPA uses RapidPlan (Varian Medical Systems) internally for knowledge-based plan optimization; literature on RapidPlan alone is not attributed to the RPA."
    },
    name: "Radiation Planning Assistant (RPA)",
    company: "MD Anderson Cancer Center",
    companyUrl: "https://www.mdanderson.org/",
    productUrl: "https://rpa.mdanderson.org/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/md-anderson.ts",
    description:
      "The Radiation Planning Assistant offers a suite of fully automated contouring and radiotherapy planning tools for cervix, breast, head and neck, and whole brain cancers. Developed at MD Anderson Cancer Center and offered free to clinics in low- and middle-income countries (LMICs) to improve global access to high-quality radiotherapy. Not marketed in the USA despite FDA clearance.",
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
      "Web-based interface requiring no local treatment planning software for plan generation",
      "Free access for LMIC cancer centers; not commercially marketed in the USA",
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
      distributionChannels: ["Free access for LMIC clinics", "Academic partnerships", "Web-based service (rpa.mdanderson.org)"],
    },
    version: "Latest",
    releaseDate: "2024-01-01",
    keyPapers: [
      {"doi":"10.1200/GO.22.00431","title":"Addressing the Global Expertise Gap in Radiation Oncology: The Radiation Planning Assistant","authors":"Netherton TJ et al.","journal":"JCO Global Oncology","year":"2023","evidenceRigor":"E1","clinicalImpact":"I5","rationale":"Developer-authored report of the RPA service and its deployment model for low- and middle-income countries; access-to-care framing, single-developer origin.","vendorIndependent":false},
      {"doi":"10.1200/GO.23.00376","title":"Artificial Intelligence-Based Radiotherapy Contouring and Planning to Improve Global Access to Cancer Care","authors":"Court LE et al.","journal":"JCO Global Oncology","year":"2024","evidenceRigor":"E2","clinicalImpact":"I5","rationale":"Multi-institutional evaluation across 16 institutions in 6 countries with >90% plan acceptability, framed around access to radiotherapy in resource-limited settings.","vendorIndependent":false,"multiCenter":true,"multiNational":true,"externalValidation":true},
      {"doi":"10.1002/mp.17588","title":"An automated treatment planning portfolio for whole breast radiotherapy","authors":"Baroudi H et al.","journal":"Medical Physics","year":"2025","evidenceRigor":"E2","clinicalImpact":"I2","rationale":"End-to-end automated breast planning portfolio evaluated with collaborating centres in Argentina and Switzerland; dosimetric and workflow endpoints.","vendorIndependent":false,"multiCenter":true,"multiNational":true,"externalValidation":true},
      {"doi":"10.3332/ecancer.2025.1988","title":"Feasibility and impact of knowledge-based automated radiotherapy treatment planning in low- and middle-income countries","authors":"Kavuma A et al.","journal":"ecancermedicalscience","year":"2025","rationale":"Indirect-comparative: evaluates Varian RapidPlan KBP in LMICs without RPA attribution, so it carries no E/I level for this product."},
      {"doi":"10.1016/j.meddos.2025.12.001","title":"Externally validated knowledge-based planning model for machine learning-assisted radiation therapy treatment of high-grade glioma","authors":"Lloyd SA et al.","journal":"Medical Dosimetry","year":"2026","rationale":"Indirect-comparative: full text (verified 2026-08-25) evaluates a RapidPlan model at BC Cancer and never names the RPA, so it carries no E/I level for this product."}
    ],
    evidenceRigor: "E2",
    clinicalImpact: "I5",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: rigor recomputed as the maximum across scored papers. Court 2024 (16 institutions / 6 countries) and Baroudi 2025 (Med Phys, multi-national breast planning portfolio) are multi-centre external evaluations = E2; no RCT, meta-analysis or systematic review of the RPA exists, so the previous E3 was an over-estimation. Lloyd 2026 full-text verified 2026-08-25: it evaluates a RapidPlan model at BC Cancer and does not name the RPA — reclassified as indirect-comparative. Netherton et al. JCO GO 2023 (direct) and Court et al. JCO GO 2024 (direct, 16 institutions / 6 countries, >90% plan acceptability) confirmed via abstract verification. Kavuma 2025 and Sackett 2025 RapidPlan papers re-evaluated 2026-06-15: Sackett 2025 evaluates Varian RapidPlan v15.6 in Eclipse and does not mention RPA — removed. Kavuma 2025 evaluates RapidPlan KBP in LMICs without RPA attribution — retained as indirect-comparative only. Lloyd 2026 remains pending full-text verification. First patient treated clinically in South Africa in 2024.",
    clinicalImpactNotes: "2026-08-25 Wave 3 per-paper sweep: impact set to I5 (societal / access to care) — Netherton 2023 and Court 2024 both frame the RPA around extending access to quality radiotherapy in resource-limited settings. No toxicity or survival study supports the previously stored I4 (outcome). Clinical outcome improvement through automated RT planning enabling access to quality care in resource-limited settings. Actively deployed in South Africa since 2024. Validated across head and neck, cervical, breast, and brain cancers with >90% plan acceptability across 16 institutions in 6 countries (Court 2024).",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E3 + FDA 510(k): mature peer-reviewed multi-center evidence with regulatory clearance; minor local commissioning and user training expected. Clinical deployment ongoing in LMICs.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description: "Netherton et al. Primary research publication demonstrating clinical efficacy for LMIC access. JCO Global Oncology 2023",
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
    lastUpdated: "2026-08-25",
    lastRevised: "2026-08-25",
  },
];

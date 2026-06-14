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
    evidenceRigor: "E3",
    clinicalImpact: "I4",
    evidenceRigorNotes: "Netherton et al. JCO GO 2023 demonstrates improved RT quality in LMICs. Court et al. JCO GO 2024 (DOI: 10.1200/GO.23.00376) multi-institutional review (16 institutions, 6 countries, >90% plan acceptability). Kavuma et al. ecancermedicalscience 2025 (KBP feasibility in LMICs). Lloyd et al. Med Dosim 2026 (externally validated KBP model for high-grade glioma with RTQA). Multiple independent multi-center studies. First patient treated clinically in South Africa in 2024. PubMed verified 2026-06-14.",
    clinicalImpactNotes: "Clinical outcome improvement through automated RT planning enabling access to quality care in resource-limited settings. Actively deployed in South Africa since 2024. Validated across head and neck, cervical, breast, and brain cancers with >90% plan acceptability across 16 institutions in 6 countries.",
    adoptionReadiness: "R4",
    adoptionReadinessNotes: "Derived from E3 + FDA 510(k): mature peer-reviewed multi-centre evidence with regulatory clearance; minor local commissioning and user training expected. Clinical deployment ongoing in LMICs.",
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
        description: "Kavuma et al. Feasibility and impact of knowledge-based automated RT planning in LMICs. ecancermedicalscience 2025;19:1988",
        link: "https://doi.org/10.3332/ecancer.2025.1988"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lloyd et al. Externally validated KBP model for ML-assisted RT of high-grade glioma (RTQA context). Med Dosim 2026",
        link: "https://doi.org/10.1016/j.meddos.2025.12.001"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Sackett et al. Sharing a flexible urethral sparing SBRT prostate RapidPlan model with clinical implementation. Radiat Oncol 2025;21(1):12",
        link: "https://doi.org/10.1186/s13014-025-02761-1"
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
    lastUpdated: "2026-06-14",
    lastRevised: "2026-06-14",
  },
];

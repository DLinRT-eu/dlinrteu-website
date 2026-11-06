import { ProductDetails } from "@/types/productDetails";
import { GE_HEALTHCARE_ALL_STRUCTURES } from "./ge-healthcare-structures";

export const GE_HEALTHCARE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-auto-segmentation",
    developmentStage: "discontinued",
    trainingData: {
        source: "FDA 510(k) summary K230082",
        description: "Deep learning CT auto-segmentation model for organs at risk in adult radiotherapy planning. The 510(k) summary states that the model was trained on 911 CT radiotherapy-planning exams from several sites in more than one country. Demographics of the training set are not further itemised.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
        datasetSize: "911 CT exams",
        disclosureLevel: "partial"
    },
    evaluationData: {
        source: "FDA 510(k) summary K230082",
        studyDesign: "Retrospective multi-site Dice bench test, plus a separate clinical reader study",
        datasetSize: "302 exams / 2552 contours (Dice bench test). Reader-study sample size is not stated.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
        description: "The Dice bench test used 302 held-out adult CT radiotherapy-planning exams and 2552 generated contours. It is separate from the Likert reader study by three qualified radiotherapy practitioners. The summary does not say that the practitioners reviewed all 2552 contours, and it does not publish reader scores or the reader-study sample size. Predicate device K191928. The summary lists 40 structures. The test set age range is 18–89 years, and it includes contrast and non-contrast DICOM CT from GE and non-GE scanners.",
        primaryEndpoint: "Per-organ mean Dice on the bench test",
        results: "The summary concludes that performance is in line with the predicate. Mean Dice is below the summary's own acceptance value for brainstem, mandible, oral cavity, middle pharyngeal constrictor and pituitary. Some small structures (including chiasm, superior pharyngeal constrictor and lacrimal glands) have low absolute Dice that still met the low criterion printed in the summary."
    },
    name: "Auto Segmentation",
    company: "GE HealthCare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/auto-contouring/ge-healthcare.ts",
    description: "Deep learning CT auto-segmentation application on Edison HealthLink that generates DICOM Radiotherapy Structure Sets (RTSS) with organs-at-risk contours for radiation therapy planning review and editing. The 510(k) applicant and the EUDAMED manufacturer are GE Medical Systems, LLC. FDA clearance K230082 remains on the FDA record. AccessGUDID and EUDAMED both list the device as no longer in commercial distribution.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Adult radiotherapy planning across multiple cancer types"],
    keyFeatures: ["Deep learning OAR segmentation", "DICOM RTSS output", "Edison HealthLink workflow integration", "Head/neck, thorax, abdomen and pelvis OARs"],
    guidelines: [
      { name: "RTOG", compliance: "partial" },
      { name: "DAHANCA", compliance: "partial" }
    ],
    supportedStructures: GE_HEALTHCARE_ALL_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RTSTRUCT"]
    },
    technology: {
      integration: ["Edison HealthLink integration", "DICOM RTSS export to compatible review workstations"],
      deployment: ["Server-based deployment on Edison HealthLink"],
      triggerForAnalysis: "Automated within configured clinical workflow",
      processingTime: "Not publicly specified"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "8406821BUG00320GZ",
          riskClass: "class-iib",
          registeredTradeName: "Auto Segmentation",
          manufacturerSrn: "US-MF-000018315",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&basicUdi=8406821BUG00320GZ",
          lastVerified: "2026-11-05"
      },
        status: "cleared",
        class: "Class IIb",
        type: "CE Mark",
        regulation: "Class IIb is confirmed on the EUDAMED record. Notified body and the legislation string are not in the API payload. Device status on 2026-11-05: no-longer-on-the-market. A trade-name search returned no rows; the record was retrieved by basic UDI-DI. EUDAMED reference 591805. GUDID catalog number 5919805. The two reference numbers differ."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K230082",
        productCode: "QKB",
        regulationNumber: "21 CFR 892.2050",
        notes: "CT Auto Segmentation, decision 2023-05-04, predicate K191928, 40 structures, server-based deployment. Primary device identifier 00195278560384, GUDID version 1.0, catalog 5919805. MR Contour DL is a separate product cleared as K242925 (decision date April 1, 2025) and is not this module."
      },
      intendedUseStatement: "Auto Segmentation is intended to be used as a workflow tool for initial anatomy segmentation of organs at risk on CT images as an aid in radiation therapy planning after user confirmation. It generates a Radiotherapy Structure Set (RTSS) DICOM with segmented organs at risk which can be used by dosimetrists, medical physicists, and radiation oncologists as initial contours to accelerate workflow for radiation therapy planning. It is the responsibility of the user to verify the processed output contours and user-defined labels for each organ at risk and correct the contours/labels as needed. Auto Segmentation may be used with images acquired on CT scanners, in adult patients. (Source: FDA 510(k) K230082 Summary.) FDA: DICOM CT from GE or non-GE scanners, with or without contrast. Deployed workflow described in the DICOM statement: CT sent through Edison HealthLink (DOC2719402)."
    },
    market: {
      status: {
        verification: 'confirmed', event: 'end-of-sales',
        reason: 'AccessGUDID record version dated 2026-11-04 lists primary DI 00195278560384 as Not in Commercial Distribution, commercial-distribution end date 2026-03-09. EUDAMED basic UDI-DI 8406821BUG00320GZ is class IIb and status no-longer-on-the-market (checked 2026-11-05). The three public product-page URLs returned HTTP 404 on 2026-11-05. No vendor withdrawal notice was found. FDA clearance K230082 itself remains on the FDA record. The date EUDAMED changed status is not in the API payload. MR Contour DL is a separate product.',
        source: 'AccessGUDID lookup for DI 00195278560384; EUDAMED basic UDI query; GE product URLs checked 2026-11-05',
        sourceUrl: 'https://accessgudid.nlm.nih.gov/api/v2/devices/lookup.json?di=00195278560384',
        sourceAccess: 'public', sourceRetrievedOn: '2026-11-05',
      },
      onMarketSince: "2023",
      distributionChannels: ["Previously direct sales; GUDID and EUDAMED now list the device as no longer distributed"]
    },
    version: "1.0",
    releaseDate: "2023-05-12",
    evidenceRigor: "E0",
    clinicalImpact: "L1c",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "No peer-reviewed paper that evaluates this CT product was found (Europe PMC and Crossref, checked 2026-11-05). The citation previously stored as PMC10741804 is Hoque et al., Cancers 2023 (doi:10.3390/cancers15245735), a study of Limbus Contour 1.0.18. It does not mention GE. The 510(k) bench test is sponsor evidence and does not raise the score above E0. A GE-authored preprint (arXiv:2308.10636, DLAS v1.0) does not name Auto Segmentation or K230082 and is not scored.",
    clinicalImpactNotes: "The 510(k) reports geometric agreement (Dice) and a reader study whose scores are not published. No prospective clinical outcome or time-and-motion publication specific to this product was identified. Displayed level is provisional L1c because there is no peer-reviewed efficacy endpoint. The previous I2 code is kept only as legacyClinicalImpact.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes: "GUDID and EUDAMED both list the device as no longer distributed, and nothing published describes commissioning, QA or monitoring. Historical FDA clearance and the class IIb record are not treated as current adoption readiness. Local use of any remaining installed copy would still need DICOM and workflow checks. This is not derived from an evidence score.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    lastUpdated: "2026-11-05",
    keyPapers: [],
    lastRevised: "2026-11-05",
    source: "openFDA and FDA 510(k) summaries K230082 (decision 2023-05-04) and K242925 (MR Contour DL, separate product); AccessGUDID DI 00195278560384 (record version 2026-11-04); EUDAMED basic UDI-DI 8406821BUG00320GZ (class IIb, no-longer-on-the-market, checked 2026-11-05); GE DICOM conformance statement DOC2719402; ESTRO 2023 announcement. Q4 2026 review: Crossref and Europe PMC, 2026-11-05. Product-page URLs returned HTTP 404. FDA decision date 2023-05-04; the stored release date 2023-05-12 is the ESTRO announcement date.",
    clinicalEvidence: "FDA 510(k) K230082 only. Dice bench test: 302 retrospective adult CT radiotherapy-planning exams and 2552 contours. Separate Likert reader study by three qualified radiotherapy practitioners; the summary does not publish scores or say that all 2552 contours were read. No peer-reviewed evaluation of this product was identified.",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K230082, decision date May 4, 2023. Class II, 21 CFR 892.2050, product code QKB. Predicate K191928. Training: 911 CT exams. Bench test: 302 exams, 2552 contours, 40 structures.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf",
      },
      {
        type: "indirect",
        description: "FDA 510(k) clearance K242925 (April 1, 2025) for MR Contour DL, a separate MR-based GE product that uses Auto Segmentation (K230082) as predicate. Indirect: it does not evaluate the CT module documented here.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf",
      },
      {
        type: "Device identification",
        description: "AccessGUDID primary DI 00195278560384. Brand Auto Segmentation, GE Medical Systems, version 1.0, catalog 5919805. Status: Not in Commercial Distribution, end date 2026-03-09. Record version dated 2026-11-04.",
        link: "https://accessgudid.nlm.nih.gov/api/v2/devices/lookup.json?di=00195278560384",
      },
      {
        type: "EUDAMED",
        description: "Basic UDI-DI 8406821BUG00320GZ. Class IIb, manufacturer SRN US-MF-000018315, reference 591805. Status no-longer-on-the-market on 2026-11-05. The stored trade-name URL returned no rows.",
        link: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&basicUdi=8406821BUG00320GZ",
      },
      {
        type: "Interoperability Documentation",
        description: "GE HealthCare DICOM conformance statement for Auto Segmentation on Edison HealthLink (DOC2719402), documenting CT input and RT Structure Set output. The hash-less URL returned HTTP 502 on 2026-11-05; this link includes the hash.",
        link: "https://www.gehealthcare.com/-/jssmedia/documents/us-global/products/interoperability/dicom/computed-tomography/gehc-dicom-conformance_dlautosegmentation_doc2719402_rev3?hash=E5B6E40A95C0484FA3921F2244EA6BCD&rev=-1",
      },
      {
        type: "Market Availability",
        description: "GE HealthCare ESTRO 2023 announcement (12 May 2023) stating Auto Segmentation was FDA 510(k) cleared and CE marked. This is a historical announcement. It does not show current distribution.",
        link: "https://www.itnonline.com/content/ge-healthcare-introduces-innovations-improve-radiation-therapy-efficiency-and-precision",
      },
    ],
    limitations: [
      "Requires user review, correction and confirmation before clinical use",
      "Five organs in the 510(k) Table 1 have mean Dice below the sponsor's acceptance value: brainstem, mandible, oral cavity, middle pharyngeal constrictor and pituitary. The reader study publishes no scores and no sample size. Small structures can have low absolute Dice even when they meet the criterion used in the summary.",
      "Public documentation describes CT sent through Edison HealthLink (DOC2719402). The 510(k) also allows DICOM CT from GE or non-GE scanners, with or without contrast. Local interoperability testing is required.",
      "Notified body and MDR certificate number are not in the EUDAMED payload that was read. The device status is no-longer-on-the-market, and the public product URLs returned 404 on 2026-11-05.",
      "No peer-reviewed, product-specific clinical study was identified. The paper previously cited on this page evaluates Limbus Contour, not GE Auto Segmentation.",
      "Bench-test reference contours followed RTOG and DAHANCA. The 510(k) summary does not grade compliance, so the guideline labels stay partial."
    ]
  }
];

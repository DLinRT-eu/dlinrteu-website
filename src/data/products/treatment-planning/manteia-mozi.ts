import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_MOZI_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-mozi",
    trainingData: {
        description: "The MOZI TPS uses deep learning-driven plan optimization and auto-planning models validated on standard protocols.",
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K223724",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf"
    },
    evaluationData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
        primaryEndpoint: "Not specified",
        description: "Validation included end-to-end testing (simulation CT, registration, contouring, and dose calculation) for 18 patients and auto-contouring validation for 187 patients across several anatomies.",
        source: "FDA 510(k) summary K223724",
        results: "Not publicly disclosed",
        datasetSize: "205 patients (187 for auto-contouring, 18 for end-to-end testing)",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "MOZI TPS",
    company: "Manteia",
    companyUrl: "https://www.manteiamedical.com/",
    productUrl: "https://www.manteiamedical.com/mozi",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/manteia-mozi.ts",
    description: "Next-generation treatment planning system combining precision, speed, and adaptability. Features Monte Carlo dose engine, GPU-powered computation, AI-driven planning optimization, and built-in deep learning auto-contouring for radiation therapy (auto-contouring validated on 187 patients per FDA K223724).",
    features: ["Monte Carlo dose engine", "GPU-powered computation", "AI-driven optimization", "Built-in auto-contouring", "Vendor independence"],
    category: "Treatment Planning",
    secondaryCategories: ["Image Synthesis"],
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiamedical.com/mozi",
    anatomicalLocation: ["All sites"],
    modality: ["RT Plan", "CT", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Monte Carlo dose engine for high-precision dosing in complex cases",
      "GPU-powered lightning-fast processing for efficient planning",
      "Deep learning-driven plan optimization",
      "Built-in DL auto-contouring (validated on 187 patients, FDA K223724)",
      "Full workflow automation from dose prediction to final plan",
      "Auto-planning models validated on standard protocols",
      "Customizable to clinical goals",
      "Vendor-independent, fully interoperable system",
      "Deep-learning (RegGAN) conversion of daily CBCT to synthetic CT for offline adaptive re-planning (vendor-reported; see Image Synthesis evidence and limitations)"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Treatment plans"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT"],
      output: ["Treatment plans", "RT Dose", "Structure sets", "Plan quality metrics"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE", "DICOM-RTSTRUCT", "PDF"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API", "Linac integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Plan submission",
      processingTime: "Minutes per plan"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "697312740MOZITPS77",
          riskClass: "class-iib",
          registeredTradeName: "MOZI TPS",
          manufacturerSrn: "CN-MF-000023911",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=MOZI+TPS",
          lastVerified: "2026-09-22"
      },
        status: "cleared",
        class: "Class IIb",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K223724",
        regulationNumber: "21 CFR 892.5050",
        productCode: "MUJ",
        decisionDate: "2023-07-10"
      },
      intendedUseStatement: "\"The MOZI Treatment Planning System (MOZI TPS) is used to plan radiotherapy treatments with malignant or benign diseases. MOZI TPS is used to plan external beam irradiation with photon beams.\" (Source: FDA 510(k) K223724 Summary, accessed 2026-05-30)"
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Cloud platform", "Distributors"]
    },
    dosePredictionModels: [
      {
        name: "Cervical cancer dose prediction model",
        anatomicalSite: "Cervix / pelvis",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 4500 cGy. Prediction inputs: PCTV, bladder, rectum, small intestine and body, with bone marrow, femoral heads and spinal cord as additional organs at risk. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Esophageal cancer dose prediction model",
        anatomicalSite: "Esophagus / thorax",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 5600 cGy. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Rectal cancer dose prediction model",
        anatomicalSite: "Rectum / pelvis",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 5200 cGy. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Nasopharyngeal carcinoma dose prediction model — stage I",
        anatomicalSite: "Nasopharynx / head & neck",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 7100 cGy. Targets PTV-GTV, PTV-1 and PTV-2 with approximately 25 head-and-neck organs at risk. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Nasopharyngeal carcinoma dose prediction model — stage II",
        anatomicalSite: "Nasopharynx / head & neck",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 7000 cGy. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Nasopharyngeal carcinoma dose prediction model — stage III",
        anatomicalSite: "Nasopharynx / head & neck",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 7100 cGy. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      },
      {
        name: "Nasopharyngeal carcinoma dose prediction model — stage IV",
        anatomicalSite: "Nasopharynx / head & neck",
        technique: "IMRT/VMAT",
        intent: "Curative",
        description: "Prescription 7000 cGy. Source: Manteia 'Details of Dose Prediction Models' (vendor-provided, retrieved 2026-09-23).",
        status: "approved"
      }
    ],
    version: "3.0",
    releaseDate: "2023-07-10",
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "2026-08-25 Wave 3 per-paper sweep: no peer-reviewed publication naming MOZI TPS was found (PubMed and Crossref re-searched 2026-08-25), so no keyPapers could be scored. Under the rubric, regulatory-submission data alone is E0 — the previous E1 relied solely on the 510(k) validation summary. FDA K223724 validation (18 patients end-to-end, 187 patients auto-contouring). Limited independent publications. PubMed searched 2026-02-26. 2026-08-28 Batch C sweep (Crossref/PubMed/Europe PMC, alias-gated): no publication names the MOZI TPS. Johnson et al., Front Oncol 2024 (doi:10.3390/fonc.2024.1375096) evaluates Manteia AccuContour, a different module, and is scored there only. E0 stands.",
    clinicalImpactNotes: "2026-08-25 Wave 3 per-paper sweep: impact lowered to I0 — no published dosimetric, workflow or outcome endpoint exists for MOZI TPS; the previous I2 rested on vendor workflow claims. Vendor claims workflow improvement through AI-driven planning optimization and Monte Carlo dose calculation. PubMed searched 2026-02-26.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E1 + CE + FDA 510(k): moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    relatedProducts: [
      {
        id: "manteia-accucontour",
        relationship: "Sibling product — AccuContour is Manteia's standalone contouring workstation. MOZI TPS includes built-in contouring; AccuContour is for users who need a standalone contouring solution without the full TPS."
      },
      {
        id: "manteia-acculearning",
        relationship: "AccuLearning is Manteia's custom model training platform. Models trained in AccuLearning can be deployed into MOZI TPS for site-specific contouring and planning workflows."
      }
    ],
    lastUpdated: "2026-09-23",
    lastRevised: "2026-09-24",
    source: "FDA 510(k) database (K223724), manufacturer official website. 2026-09-23: manufacturer documentation added (vendor-provided, retrieved 2026-09-23) — 'Details of Dose Prediction Models' (7 models), 'Smart Optimization Engine (SOE) Technical White Paper' v1 for MOZI TPS 4.0.7, and a publication summary of 81 records.",
    clinicalEvidence: "FDA 510(k) validation studies with 18 patients for end-to-end testing (simulation CT, registration, contouring, and dose calculation), and 187 patients for auto-contouring across several anatomies.",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K223724 received January 3, 2023 - Class II device under 21 CFR 892.5050",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf",
      },
      {
        type: "Manufacturer Documentation (vendor-provided)",
        description: "Manteia 'Details of Dose Prediction Models' — source for the seven deep-learning dose-prediction models listed above (cervix 4500 cGy, esophagus 5600 cGy, rectum 5200 cGy, nasopharynx stages I–IV 7100/7000/7100/7000 cGy) with their target and organ-at-risk sets. Vendor-provided, retrieved 2026-09-23; not publicly published and not independently verified.",
        link: "https://www.manteiamedical.com/mozi"
      },
      {
        type: "Manufacturer Publication List (vendor-provided)",
        description: "Manteia publication summary supplied 2026-09-23 (vendor-provided, retrieved 2026-09-23): of 81 records naming Manteia systems, 22 name MOZI alone and 43 name MOZI together with AccuContour. Most are algorithm-development studies (dose calculation, registration, radiomics) rather than evaluations of the marketed MOZI TPS, and the list marks 40 records as 'in development'; none was found to evaluate the cleared MOZI TPS product, so the evidence scores are unchanged. Abstracts and posters are listed for transparency and are not scored.",
        link: "https://www.manteiamedical.com/mozi"
      }
    ],
    limitations: [
      "The Smart Optimization Engine (SOE) described in the manufacturer's white paper (v1, MOZI TPS 4.0.7, vendor-provided, retrieved 2026-09-23) is a deterministic rule-based constraint-adjustment layer — the document states it is not implemented as a machine-learning model. It is therefore not recorded as an AI feature of this entry under the catalogue's AI/deep-learning inclusion threshold; MOZI TPS is listed for its deep-learning auto-contouring and dose prediction.",
      "The SOE white paper's technical evaluation covers conventionally fractionated IMRT and VMAT plans only; the manufacturer advises stricter clinical review and case-specific manual adjustment for hypofractionated and stereotactic plans.",
      "Dose-prediction model details are vendor-provided and not publicly published; per-model performance is not disclosed and requires local validation before clinical use.",
      "No peer-reviewed publication evaluating the marketed MOZI TPS was identified (evidence rigor E0).",
      "Synthetic CT generation (CBCT to sCT) has not been confirmed as part of the CE or FDA cleared scope; the FDA K223724 intended use covers photon treatment planning only.",
      "Online adaptive re-planning within MOZI TPS is not documented in the reviewed material; only offline CBCT-based adaptive re-planning is described."
    ],
    categoryEvidence: {
      "Image Synthesis": {
        usesAI: true,
        notes: "MOZI TPS converts daily CBCT into synthetic CT for offline adaptive re-planning. The conversion is deep learning: the underlying RegGAN model is described in two Manteia co-authored papers that the manufacturer lists as 'Released' for AccuContour and MOZI (vendor publication summary, vendor-provided, retrieved 2026-09-23). MR-to-synthetic-CT is reported only in one ASTRO 2023 abstract and is not listed as a product feature.",
        evidenceRigor: "E0",
        evidenceRigorNotes: "2026-09-24: Neither RegGAN paper (Li et al., BMC Cancer 2023; Wang et al., Strahlenther Onkol 2023) names MOZI TPS in its full text (Europe PMC full text checked 2026-09-24); both are Manteia co-authored algorithm studies. They are recorded as supporting evidence and not scored. The ESTRO 2026 clinical presentation is a 4-patient single-centre abstract, also unscored. E0 stands.",
        clinicalImpact: "I0",
        clinicalImpactNotes: "2026-09-24: No peer-reviewed dosimetric or workflow endpoint for the synthetic CT function of the marketed MOZI TPS. I0.",
        evidence: [
          {
            type: "Peer-reviewed method paper (not scored — product not named)",
            description: "Li et al., 'Using RegGAN to generate synthetic CT images from CBCT images acquired with different linear accelerators', BMC Cancer 2023. Training on 100 head-and-neck CBCT/CT pairs, testing on 40 patients from four linacs. Manteia co-authored; does not name MOZI TPS.",
            link: "https://doi.org/10.1186/s12885-023-11274-7"
          },
          {
            type: "Peer-reviewed method paper (not scored — product not named)",
            description: "Wang et al., 'Improving CBCT image quality to the CT level using RegGAN in esophageal cancer adaptive radiotherapy', Strahlentherapie und Onkologie 2023. 150 esophageal patients (120 training, 30 testing); higher gamma passing rates on sCT than on CBCT. Manteia co-authored; does not name MOZI TPS.",
            link: "https://doi.org/10.1007/s00066-022-02039-5"
          },
          {
            type: "Conference presentation (vendor-provided, not scored)",
            description: "D'Andrea (IRCCS Regina Elena), ESTRO 2026: offline adaptive workflow — daily CBCT, CBCT-to-sCT transformation, MOZI adaptive plan, AI contouring. Dose on sCT vs re-planning CT (Acuros), gamma 3%/3mm: 94.4–97.4% in 2 head-and-neck and 2 lung cases. Slides vendor-provided, retrieved 2026-09-23.",
            link: "https://www.manteiamedical.com/mozi"
          },
          {
            type: "Conference abstract (not scored)",
            description: "'A generalized deep learning model for synthetic CT generation based on multi-modal images', ASTRO 2023 (Manteia-led; listed as 'Released' in the vendor publication summary, retrieved 2026-09-23).",
            link: "https://www.redjournal.org/article/S0360-3016(23)06115-1/fulltext"
          }
        ],
        limitations: [
          "Synthetic CT function not confirmed within the CE/FDA cleared scope.",
          "Clinical data limited to a 4-patient single-centre conference presentation.",
          "MR-to-synthetic-CT supported only by a conference abstract."
        ]
      }
    },
  }
];

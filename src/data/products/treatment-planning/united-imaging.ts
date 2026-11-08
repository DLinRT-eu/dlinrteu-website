import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-urt-auto-planning",
    trainingData: {
        description: "Not publicly disclosed for the uCT-ART auto-planning module. Yu et al., Nature Communications 2025, describes training for the ATP module of uTPS, which is a different United Imaging module and is not scored on this page.",
        sourceUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
        source: "Vendor RT pages and the ESTRO 2026 press release. Yu 2025 is cited only to say that its training disclosure belongs to uTPS ATP, not to this module.",
        disclosureLevel: "none"
    },
    evaluationData: {
        results: "Not a confirmed 15-minute result. The ESTRO 2026 press release says online adaptive planning takes an average of 15 minutes. Ma and Zhou, Cureus 2024, report two single-patient session totals of 19.72 and 15.40 minutes (plan optimization 3.80 and 2.57 minutes); those module times do not add up to the totals. An ESTRO 2024 abstract with United Imaging co-authors reports 18 minutes 58 seconds for the adapted session and 15 minutes 52 seconds for the adjustment (11 patients).",
        source: "ESTRO 2026 press release; Ma and Zhou, Cureus 2024; ESTRO 2024 abstract book, page 990",
        primaryEndpoint: "Workflow time in a two-patient case report, plus vendor-reported timing",
        studyDesign: "Vendor press release, plus one single-centre two-patient case report. The ESTRO 2024 abstract is unscored.",
        sourceUrl: "https://doi.org/10.7759/cureus.69703",
        description: "Ma and Zhou describe uCT-ART on the uRT-linac 506c at one centre, two patients, using a convolution dose calculation. United Imaging staff are thanked for technical support. The press release also describes GPU-accelerated Monte Carlo dose calculation. That sentence is not in a peer-reviewed test of this workflow. The linac page's separate 'about 15 minutes' line is a rectal one-stop workflow, not uCT-ART."
    },
    name: "uRT Auto-Planning",
    company: "United Imaging",
    category: "Treatment Planning",
    description:
      "AI-powered auto-planning module described as part of the uRT radiotherapy ecosystem, together with a GPU-accelerated Monte Carlo dose calculation that the vendor states separately. The ESTRO 2026 press release says the uCT-ART online adaptive workflow on the uRT-linac 506c completes adaptive plans in an average of 15 minutes. That figure is vendor-reported. Peer-reviewed session times are longer and come from two patients.",
    features: [
      "AI-driven auto-planning",
      "GPU-accelerated Monte Carlo dose calculation (vendor-stated; not in a peer-reviewed test of the uCT-ART workflow)",
      "Online adaptive workflow (uCT-ART)",
      "Native integration with imaging, contouring and QA"
    ],
    certification: "CE (uRT-linac 506c system)",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/treatment-planning/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["RT Plan", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    releaseDate: "2026-05-15",
    keyFeatures: [
      "AI-powered auto-planning across multiple tumor sites (vendor description)",
      "GPU-accelerated Monte Carlo dose calculation, stated on the OmniplanTx page and in the ESTRO 2026 press release, and not reported in a peer-reviewed test of uCT-ART",
      "Online adaptive planning: press release says an average of 15 minutes (uCT-ART). This is not the linac page's rectal one-stop sentence.",
      "Native integration with diagnostic-quality CT image guidance",
      "Closed-loop workflow with integrated AI contouring and automated QA"
    ],
    technicalSpecifications: {
      population: "Adult — not confirmed on the vendor pages read 2026-11-05",
      input: ["CT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RTSTRUCT — not confirmed on the vendor pages read 2026-11-05"],
      output: ["Treatment plans", "RT Dose"],
      outputFormat: ["DICOM-RTPLAN", "DICOM-RTDOSE — not confirmed on the vendor pages read 2026-11-05"]
    },
    technology: {
      integration: ["uRT-linac 506c", "uCT-ART online adaptive workflow"],
      deployment: ["On-system / integrated"],
      triggerForAnalysis: "On-demand within uRT workflow (offline or online adaptive)",
      processingTime: "Press release: average 15 minutes for uCT-ART. Not confirmed by the peer-reviewed case report."
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Unresolved",
        type: "Medical Device",
        regulation: "The vendor page and company announcement 2026-027 (21 July 2026) say the uRT-linac 506c system obtained CE certification. Class, notified body and certificate number were not found. The documents do not state that a linac certificate covers this auto-planning software or Monte Carlo.",
        notes:
          "CE claim checked 2026-11-05 is for the uRT-linac 506c system only. Do not read it as a separate clearance of auto-planning or Monte Carlo. uTPS OmniplanTx is described on its own page with MDR wording and is not stated to be CE marked."
      },
      fda: {
        status: "not_approved",
        class: "Unknown",
        type: "Unknown"
      },
      intendedUseStatement:
        "Described by the vendor as assisting radiotherapy treatment planning inside the uRT ecosystem, including the uCT-ART online adaptive workflow on the uRT-linac 506c. Clinician and physics review of plans is still required. No standalone intended-use document for this software module was found."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Integrated with uRT-linac 506c. 15 May 2026 is the European announcement date, not the first clinical use: Ma and Zhou already describe uCT-ART on a 506c in 2024. European availability is incomplete."]
    },
    keyPapers: [
      {"doi":"10.7759/cureus.69703","pmid":"39429366","title":"First Application of Demand-Triggered Online Adaptive Radiotherapy in the Treatment of Cervical Cancer: A Clinical Report","authors":"Ma C et al.","journal":"Cureus","year":"2024","evidenceRigor":"E1","clinicalImpact":"L3","legacyClinicalImpact":"I2","rationale":"Two patients, one centre, uCT-ART on the uRT-linac 506c. Workflow time is the endpoint that supports L3, but the module times in the paper do not add up to the reported session totals (19.72 and 15.40 minutes). Dose calculation in the paper is convolution, not GPU Monte Carlo. United Imaging staff are thanked for technical support. Not prospective, not multi-centre, and not external validation.","vendorIndependent":true}
    ],
    evidenceRigor: "E1",
    clinicalImpact: "L3",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes:
      "E1 is set by Ma and Zhou, Cureus 2024 (doi:10.7759/cureus.69703), a two-patient single-centre report of uCT-ART on the uRT-linac 506c. Yu et al., Nature Communications 2025 (doi:10.1038/s41467-025-67581-z), evaluates the ATP module of uTPS. It does not name uCT-ART, GPU Monte Carlo or this catalogue entry, so it is not scored here. A press release cannot support E2. Checked 2026-11-05.",
    clinicalImpactNotes:
      "L3 because Ma 2024 measured workflow time. The endpoint is session time in a two-patient report, not a confirmed 15-minute adaptive plan. The press-release average of 15 minutes is vendor-reported and is not the result of that paper.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "The function is integrated on the uRT-linac 506c. A separate software certificate was not found, European availability is incomplete, and local commissioning is still required, so this stays at pilot only. R2 is not justified by an E2 score or by an independent multi-centre study. It is not R0: the current 506c pages do not say the system is under development or not for clinical use.",
    clinicalEvidence:
      "Ma and Zhou, Cureus 2024: two patients, one centre, uCT-ART on the uRT-linac 506c. ESTRO 2026 press release for the vendor timing and Monte Carlo claims. Yu et al. 2025 is a uTPS ATP paper and is not evidence for this workflow.",
    limitations: [
      "Integrated component of the uRT ecosystem; not marketed as a standalone TPS",
      "No published training-data description for the uCT-ART planner. Yu 2025 discloses training only for a different module (uTPS ATP).",
      "The peer-reviewed report is two patients at one centre and one disease site. The time figures in that paper do not add up, and this inconsistency is left unresolved.",
      "No public CE certificate, class, notified body or certificate number was found for the auto-planning software. The documented CE mark belongs to the uRT-linac 506c system.",
      "All AI-generated plans require qualified medical-physics and clinician review prior to clinical use"
    ],
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description:
          "Ma and Zhou, Cureus, 19 September 2024 (doi:10.7759/cureus.69703). Two-patient report of uCT-ART on the uRT-linac 506c. Session totals 19.72 and 15.40 minutes. Convolution dose calculation. United Imaging technical support is acknowledged.",
        link: "https://doi.org/10.7759/cureus.69703"
      },
      {
        type: "Related citation, not scored",
        description:
          "Yu et al., Nature Communications 2025 (doi:10.1038/s41467-025-67581-z, PMID 41398177). Multicentre evaluation of the ATP module in uTPS. It does not study uCT-ART, GPU Monte Carlo or this catalogue entry. Not scored here. Liang 2025 (doi:10.1186/s13014-025-02684-x) is the same uTPS family and is also not scored.",
        link: "https://doi.org/10.1038/s41467-025-67581-z"
      },
      {
        type: "Conference abstract, not scored",
        description:
          "ESTRO 2024 abstract book, page 990. United Imaging co-authors. Reports 18 minutes 58 seconds for the whole adapted session and 15 minutes 52 seconds for the adjustment, 11 patients. Not a journal paper.",
        link: "https://user-swndwmf.cld.bz/ESTRO-2024-Abstract-Book/990/"
      },
      {
        type: "Vendor Press Release",
        description:
          "United Imaging, 15 May 2026, ESTRO 2026 portfolio release. States an average of 15 minutes for uCT-ART and describes GPU-accelerated Monte Carlo. Vendor-reported. This date is the European announcement, not the first clinical use.",
        link: "https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html"
      },
      {
        type: "Vendor Product Page",
        description: "United Imaging uRT-linac 506c and radiotherapy portfolio pages. CE certification is stated for the linac system. The pages do not name a separate auto-planning certificate.",
        link: "https://eu.united-imaging.com/en/product-service/products/rt"
      },
      {
        type: "Company announcement",
        description: "United Imaging announcement 2026-027, 21 July 2026. States that the uRT-linac 506c obtained CE certification. Does not name this software, a notified body, a certificate number, or class.",
        link: "http://infonotice.sylapp.cn/LC_STIBNotTextAnnounce/2026/07/21/837904742994.PDF"
      }
    ],
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    source: "FDA database; press releases; peer-reviewed literature"
  }
];

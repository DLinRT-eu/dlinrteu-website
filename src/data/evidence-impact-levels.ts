
// Dual-Axis Evidence Classification System
// Separates Evidence Rigor (study quality) from Clinical Impact (what is measured)

// ==================== EVIDENCE RIGOR AXIS ====================
// Focuses purely on study quality and methodology

export type EvidenceRigorCode = "E0" | "E1" | "E2" | "E3";

export interface EvidenceRigorLevel {
  level: EvidenceRigorCode;
  name: string;
  description: string;
  criteria: string[];
  color: string;
}

export const EVIDENCE_RIGOR_LEVELS: EvidenceRigorLevel[] = [
  {
    level: "E0",
    name: "No Peer-Reviewed Evidence",
    description: "No peer-reviewed publications available. Only vendor materials, marketing claims, or regulatory submission data.",
    criteria: [
      "Vendor white papers only",
      "Marketing materials",
      "FDA 510(k) summary without publications",
      "CE marking documentation only"
    ],
    color: "gray"
  },
  {
    level: "E1",
    name: "Preliminary Evidence",
    description: "Single-center studies, small sample sizes, or pilot investigations. Early-stage validation.",
    criteria: [
      "Single institution studies",
      "Sample size < 100 patients",
      "Retrospective design only",
      "Pilot or feasibility studies",
      "Conference abstracts without full paper"
    ],
    color: "blue"
  },
  {
    level: "E2",
    name: "Validated Evidence",
    description: "Multi-center studies, large prospective cohorts, or robust retrospective studies with external validation.",
    criteria: [
      "Multi-center studies (3+ sites)",
      "Sample size > 200 patients",
      "Prospective study design",
      "External validation cohort",
      "Independent replication"
    ],
    color: "green"
  },
  {
    level: "E3",
    name: "Systematic Evidence",
    description: "Systematic reviews, meta-analyses, or randomized controlled trials. Highest methodological rigor.",
    criteria: [
      "Systematic reviews",
      "Meta-analyses",
      "Randomized controlled trials",
      "Phase III clinical trials",
      "Cochrane-style reviews"
    ],
    color: "purple"
  }
];

// ==================== CLINICAL IMPACT AXIS ====================
// Focuses on what outcomes are measured, independent of rigor
// Cross-referenced with the Fryback & Thornbury hierarchy of diagnostic efficacy

export type ClinicalImpactCode = "I0" | "I1" | "I2" | "I3" | "I4" | "I5";

export interface ClinicalImpactLevel {
  level: ClinicalImpactCode;
  name: string;
  description: string;
  rtExamples: string[];
  color: string;
  frybackThornburyLevel?: string; // Cross-reference to Fryback & Thornbury hierarchy
}

export const CLINICAL_IMPACT_LEVELS: ClinicalImpactLevel[] = [
  {
    level: "I0",
    name: "None Demonstrated",
    description: "No clinical, workflow, or quality benefit demonstrated beyond feasibility. Product works, but no patient-facing value shown. No equivalent in the Fryback & Thornbury hierarchy.",
    rtExamples: [
      "Technical feasibility studies only",
      "Proof-of-concept without clinical validation",
      "Computational benchmarks without patient context",
      "Product works but no impact studies conducted"
    ],
    color: "slate"
  },
  {
    level: "I1",
    name: "Quality Assurance",
    description: "Enables monitoring, measurement, or quality assurance that indirectly supports patient care. Does not directly affect treatment but ensures safe operation. Corresponds to Fryback & Thornbury Level 1 (Technical Efficacy).",
    rtExamples: [
      "QA tools validating AI contour accuracy",
      "Performance monitoring dashboards",
      "Automated consistency checks",
      "Measurement devices ensuring correct operation"
    ],
    color: "blue",
    frybackThornburyLevel: "Level 1: Technical Efficacy"
  },
  {
    level: "I2",
    name: "Workflow",
    description: "Time savings, efficiency gains, or reduction in variability within clinical workflow. Corresponds to Fryback & Thornbury Level 2 (Diagnostic Accuracy Efficacy), adapted for therapeutic AI tasks.",
    rtExamples: [
      "Contouring time reduction",
      "Inter-observer variability reduction",
      "Treatment planning efficiency",
      "Review/approval time savings"
    ],
    color: "teal",
    frybackThornburyLevel: "Level 2: Diagnostic Accuracy Efficacy"
  },
  {
    level: "I3",
    name: "Decision",
    description: "Changes in treatment management or clinical decision-making based on the AI output. Corresponds to Fryback & Thornbury Level 3 (Diagnostic Thinking Efficacy).",
    rtExamples: [
      "Dose modification rates",
      "Treatment intent changes",
      "Plan selection influence",
      "Adaptive treatment decisions"
    ],
    color: "orange",
    frybackThornburyLevel: "Level 3: Diagnostic Thinking Efficacy"
  },
  {
    level: "I4",
    name: "Outcome",
    description: "Patient health outcomes including survival, toxicity reduction, or quality of life improvements. Corresponds to Fryback & Thornbury Levels 4–5 (Therapeutic + Patient Outcome Efficacy).",
    rtExamples: [
      "Reduced radiation toxicity",
      "Improved tumor control probability",
      "Survival analysis",
      "Patient-reported outcomes"
    ],
    color: "purple",
    frybackThornburyLevel: "Levels 4–5: Therapeutic + Patient Outcome Efficacy"
  },
  {
    level: "I5",
    name: "Societal",
    description: "Health economics, cost-effectiveness, access to care, or population-level impact. Corresponds to Fryback & Thornbury Level 6 (Societal Efficacy).",
    rtExamples: [
      "Cost per QALY analysis",
      "Reduced treatment delays",
      "Access improvement in LMICs",
      "Health economic modeling"
    ],
    color: "rose",
    frybackThornburyLevel: "Level 6: Societal Efficacy"
  }
];

// ==================== IMPLEMENTATION BURDEN AXIS (Z) ====================
// Third axis (internally proposed DLinRT extension): residual implementation
// & assurance burden. Lower Z = lower residual effort = higher adoption
// readiness.

export type ImplementationBurdenCode = "Z0" | "Z1" | "Z2" | "Z3" | "Z4" | "Z5";

export interface ImplementationBurdenLevel {
  level: ImplementationBurdenCode;
  name: string;
  description: string;
  readinessConsequence: string;
  color: string;
}

export const IMPLEMENTATION_BURDEN_LEVELS: ImplementationBurdenLevel[] = [
  {
    level: "Z0",
    name: "Minimal residual effort",
    description: "Core documentation, validation, integration, QA and governance are complete for the intended use.",
    readinessConsequence: "May support adoption-grade badge if E and I are strong.",
    color: "green",
  },
  {
    level: "Z1",
    name: "Limited local assurance",
    description: "Minor local commissioning, user training, documentation checks or workflow confirmation remain.",
    readinessConsequence: "Deploy with local sign-off and monitoring.",
    color: "teal",
  },
  {
    level: "Z2",
    name: "Moderate implementation effort",
    description: "Local validation, interface testing, workflow redesign, economic/resource case or subgroup checks are needed.",
    readinessConsequence: "Conditional deployment or evidence-generation pilot.",
    color: "yellow",
  },
  {
    level: "Z3",
    name: "High implementation burden",
    description: "Significant TPS/OIS/PACS/data-pipeline work, human-factors testing, safety case or staffing evidence is required.",
    readinessConsequence: "Restrict to structured pilot or sandbox.",
    color: "orange",
  },
  {
    level: "Z4",
    name: "Major assurance burden",
    description: "Material uncertainty around safety, fairness, monitoring, change control, cost, generalisability or post-market surveillance.",
    readinessConsequence: "Do not present as adoption-ready.",
    color: "red",
  },
  {
    level: "Z5",
    name: "Critical unresolved burden",
    description: "Unclear integration, high residual risk, missing governance, cybersecurity, regulatory or clinical-safety assurance.",
    readinessConsequence: "Block adoption-grade export; horizon scanning only.",
    color: "rose",
  },
];

// ==================== READINESS SIGNAL (composite E/I/Z) ====================

export type ReadinessSignal =
  | "adoption-grade"
  | "deploy-with-monitoring"
  | "conditional"
  | "pilot-only"
  | "not-adoption-ready"
  | "blocked"
  | "not-assessed";

export interface ReadinessSignalDescriptor {
  signal: ReadinessSignal;
  label: string;
  description: string;
  color: string; // tailwind palette key
}

const READINESS_DESCRIPTORS: Record<ReadinessSignal, ReadinessSignalDescriptor> = {
  "adoption-grade": {
    signal: "adoption-grade",
    label: "Adoption-grade",
    description: "Strong evidence and impact with controlled residual burden.",
    color: "green",
  },
  "deploy-with-monitoring": {
    signal: "deploy-with-monitoring",
    label: "Deploy with monitoring",
    description: "Acceptable for deployment alongside local sign-off and post-market monitoring.",
    color: "teal",
  },
  conditional: {
    signal: "conditional",
    label: "Conditional",
    description: "Deploy conditionally or as evidence-generation pilot.",
    color: "yellow",
  },
  "pilot-only": {
    signal: "pilot-only",
    label: "Pilot only",
    description: "Restrict to structured pilot or sandbox.",
    color: "orange",
  },
  "not-adoption-ready": {
    signal: "not-adoption-ready",
    label: "Not adoption-ready",
    description: "Material uncertainty remains; do not present as adoption-ready.",
    color: "red",
  },
  blocked: {
    signal: "blocked",
    label: "Blocked",
    description: "Critical unresolved burden; horizon scanning only.",
    color: "rose",
  },
  "not-assessed": {
    signal: "not-assessed",
    label: "Not assessed",
    description: "Three-axis appraisal not yet completed for this product.",
    color: "gray",
  },
};

const E_RANK: Record<EvidenceRigorCode, number> = { E0: 0, E1: 1, E2: 2, E3: 3 };
const I_RANK: Record<ClinicalImpactCode, number> = { I0: 0, I1: 1, I2: 2, I3: 3, I4: 4, I5: 5 };

export const computeReadinessSignal = (
  evidenceRigor?: EvidenceRigorCode,
  clinicalImpact?: ClinicalImpactCode,
  implementationBurden?: ImplementationBurdenCode,
): ReadinessSignalDescriptor => {
  if (!evidenceRigor || !clinicalImpact || !implementationBurden) {
    return READINESS_DESCRIPTORS["not-assessed"];
  }
  if (implementationBurden === "Z5") return READINESS_DESCRIPTORS.blocked;
  if (implementationBurden === "Z4") return READINESS_DESCRIPTORS["not-adoption-ready"];
  if (implementationBurden === "Z3") return READINESS_DESCRIPTORS["pilot-only"];

  const e = E_RANK[evidenceRigor];
  const i = I_RANK[clinicalImpact];

  if (implementationBurden === "Z0" && e >= 2 && i >= 2) {
    return READINESS_DESCRIPTORS["adoption-grade"];
  }
  if (implementationBurden === "Z1" || (implementationBurden === "Z0" && (e < 2 || i < 2))) {
    return READINESS_DESCRIPTORS["deploy-with-monitoring"];
  }
  // Z2
  if (e >= 2 && i >= 2) return READINESS_DESCRIPTORS["deploy-with-monitoring"];
  return READINESS_DESCRIPTORS.conditional;
};

// ==================== HELPER FUNCTIONS ====================

export const getEvidenceRigorLevel = (level: string): EvidenceRigorLevel | undefined => {
  return EVIDENCE_RIGOR_LEVELS.find(l => l.level === level);
};

export const getClinicalImpactLevel = (level: string): ClinicalImpactLevel | undefined => {
  return CLINICAL_IMPACT_LEVELS.find(l => l.level === level);
};

export const getEvidenceRigorColor = (level: string): string => {
  const rigorLevel = getEvidenceRigorLevel(level);
  if (!rigorLevel) return "bg-gray-100 text-gray-700 border-gray-300";
  
  const colorMap: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
    blue: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
    green: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    purple: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
  };
  
  return colorMap[rigorLevel.color] || colorMap.gray;
};

export const getClinicalImpactColor = (level: string): string => {
  const impactLevel = getClinicalImpactLevel(level);
  if (!impactLevel) return "bg-gray-100 text-gray-700 border-gray-300";
  
  const colorMap: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600",
    blue: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
    teal: "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
    orange: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
    purple: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
    rose: "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700"
  };
  
  return colorMap[impactLevel.color] || colorMap.slate;
};

export const getImplementationBurdenLevel = (level: string): ImplementationBurdenLevel | undefined => {
  return IMPLEMENTATION_BURDEN_LEVELS.find(l => l.level === level);
};

export const getImplementationBurdenColor = (level: string): string => {
  const z = getImplementationBurdenLevel(level);
  if (!z) return "bg-gray-100 text-gray-700 border-gray-300";
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    teal: "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    orange: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
    red: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    rose: "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700",
  };
  return colorMap[z.color] || colorMap.green;
};

export const getReadinessSignalColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700",
    teal: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/30 dark:text-teal-200 dark:border-teal-700",
    yellow: "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700",
    orange: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-700",
    red: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700",
    rose: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-700",
    gray: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  };
  return colorMap[color] || colorMap.gray;
};

// ==================== REFERENCE ====================

export const EVIDENCE_IMPACT_REFERENCE = {
  description: "This dual-axis classification separates evidence rigor (study quality) from clinical impact (what is measured). This addresses a key limitation of single-scale hierarchies that conflate rigorous technical validation with clinical outcomes. The clinical impact axis is cross-referenced with the Fryback & Thornbury hierarchy of diagnostic efficacy.",
  rationale: "A product can have excellent evidence rigor (E3: systematic reviews) for technical performance (I0) but no outcome data (I4). Conversely, a product may claim patient outcomes (I4) with only preliminary evidence (E1). Both dimensions matter for informed decision-making.",
  originalReference: {
    citation: "Adapted from van Leeuwen KG, et al. Artificial intelligence in radiology: 100 commercially available products and their scientific evidence. Eur Radiol. 2021;31(6):3797-3804.",
    doi: "10.1007/s00330-021-07892-z",
    pmid: "33856519",
    url: "https://doi.org/10.1007/s00330-021-07892-z"
  },
  additionalReferences: [
    {
      citation: "Antonissen N, et al. Artificial intelligence in radiology: 173 commercially available products and their scientific evidence. Eur Radiol. 2026;36:526-536.",
      doi: "10.1007/s00330-025-11830-8",
      url: "https://doi.org/10.1007/s00330-025-11830-8",
      notes: "Updated survey introducing study quality sub-attributes (vendor independence, multi-center, prospective design)."
    },
    {
      citation: "Pham N, et al. Critical Appraisal of AI-Enabled Imaging Tools Using the Levels of Evidence System. AJNR. 2023;44(5):E21-E28.",
      doi: "10.3174/ajnr.A7850",
      url: "https://doi.org/10.3174/ajnr.A7850",
      notes: "Applies Fryback & Thornbury efficacy hierarchy to AI product evaluation, emphasizing external validation."
    },
    {
      citation: "Lekadir K, et al. FUTURE-AI: international consensus guideline for trustworthy and deployable AI in healthcare. BMJ. 2025;388:e081554.",
      doi: "10.1136/bmj-2024-081554",
      url: "https://doi.org/10.1136/bmj-2024-081554",
      notes: "Consensus guideline covering fairness, universality, traceability, usability, robustness, and explainability."
    }
  ],
  frybackThornburyReference: {
    citation: "Fryback DG, Thornbury JR. The efficacy of diagnostic imaging. Med Decis Making. 1991;11(2):88-94.",
    doi: "10.1177/0272989X9101100203",
    url: "https://doi.org/10.1177/0272989X9101100203",
    notes: "Original 6-level hierarchical model of diagnostic efficacy, used as foundation for the clinical impact axis."
  }
};

// ==================== EXTENDED METHODOLOGY BIBLIOGRAPHY ====================
// Grouped references underpinning the dual-axis (E / I) and implementation-burden
// (Z) framework. Kept separate from EVIDENCE_IMPACT_REFERENCE so the core
// citations remain stable while this catalogue can grow.

export interface MethodologyReference {
  citation: string;
  doi?: string;
  url?: string;
  notes?: string;
}

export interface MethodologyReferenceGroup {
  id: string;
  title: string;
  description: string;
  references: MethodologyReference[];
}

const _doi = (id: string) => `https://doi.org/${id}`;

export const METHODOLOGY_REFERENCES: MethodologyReferenceGroup[] = [
  {
    id: "evidence-hierarchies",
    title: "Evidence hierarchies & rigor (E-axis)",
    description:
      "Foundational and updated hierarchies of evidence informing the E0–E3 rigor axis, including AI-aware revisions of the classical pyramid.",
    references: [
      {
        citation:
          "Murad MH, Asi N, Alsawas M, Alahdab F. New evidence pyramid. Evid Based Med. 2016;21(4):125-127.",
        doi: "10.1136/ebmed-2016-110401",
        url: _doi("10.1136/ebmed-2016-110401"),
        notes: "Modernised evidence pyramid with systematic reviews as a lens.",
      },
      {
        citation:
          "Bellini V, Ori E, Coccolini F, Bignami E. Evidence pyramid and artificial intelligence: a metamorphosis of clinical research. Discov Health Syst. 2023;2:40.",
        doi: "10.1007/s44250-023-00050-w",
        url: _doi("10.1007/s44250-023-00050-w"),
        notes: "Motivates separating assurance burden (Z-axis) from evidence rigor.",
      },
      {
        citation:
          "El Oakley RM, et al. Redefining the Hierarchy of Evidence in Medicine in the Era of Next Generation Clinical Trials and Real World Evidence. J Best Available Evid Med. 2025;1(2):25-29.",
        doi: "10.63720/v1i2005",
        url: _doi("10.63720/v1i2005"),
        notes: "Next-generation hierarchy integrating RWE and adaptive trials.",
      },
      {
        citation:
          "Silberman J, et al. Rigorous and rapid evidence assessment in digital health with the evidence DEFINED framework. npj Digit Med. 2023;6:101.",
        doi: "10.1038/s41746-023-00836-5",
        url: _doi("10.1038/s41746-023-00836-5"),
        notes: "Rapid appraisal framework feeding the E-axis sub-attributes.",
      },
      {
        citation:
          "Rosenthal JT, Beecy A, Sabuncu MR. Rethinking clinical trials for medical AI with dynamic deployments of adaptive systems. npj Digit Med. 2025;8:252.",
        doi: "10.1038/s41746-025-01674-3",
        url: _doi("10.1038/s41746-025-01674-3"),
      },
      {
        citation:
          "You JG, et al. Clinical trials informed framework for real world clinical implementation and deployment of AI applications. npj Digit Med. 2025;8:107.",
        doi: "10.1038/s41746-025-01506-4",
        url: _doi("10.1038/s41746-025-01506-4"),
      },
    ],
  },
  {
    id: "clinical-impact",
    title: "Clinical impact & outcomes (I-axis)",
    description:
      "Frameworks shaping the I-axis levels (technical → diagnostic → patient outcome → societal impact).",
    references: [
      {
        citation:
          "Jacob C, et al. AI for IMPACTS Framework for Evaluating the Long-Term Real-World Impacts of AI-Powered Clinician Tools. J Med Internet Res. 2025;27:e67485.",
        doi: "10.2196/67485",
        url: _doi("10.2196/67485"),
        notes: "Long-horizon real-world impact dimensions for the I4–I5 tiers.",
      },
      {
        citation:
          "Antonissen N, et al. Artificial intelligence in radiology: 173 commercially available products and their scientific evidence. Eur Radiol. 2026;36:526-536.",
        doi: "10.1007/s00330-025-11830-8",
        url: _doi("10.1007/s00330-025-11830-8"),
      },
      {
        citation:
          "van Leeuwen KG, et al. Artificial intelligence in radiology: 100 commercially available products and their scientific evidence. Eur Radiol. 2021;31:3797-3804.",
        doi: "10.1007/s00330-021-07892-z",
        url: _doi("10.1007/s00330-021-07892-z"),
      },
      {
        citation:
          "Pham N, et al. Critical appraisal of AI-enabled imaging tools using the levels of evidence system. AJNR Am J Neuroradiol. 2023;44(5):E21-E28.",
        doi: "10.3174/ajnr.A7850",
        url: _doi("10.3174/ajnr.A7850"),
      },
    ],
  },
  {
    id: "ai-reporting-guidelines",
    title: "AI reporting & quality guidelines",
    description:
      "Reporting and risk-of-bias instruments used to score the E-axis study-quality sub-attributes.",
    references: [
      {
        citation:
          "Tejani AS, et al. Checklist for Artificial Intelligence in Medical Imaging (CLAIM): 2024 Update. Radiol Artif Intell. 2024;6(4):e240300.",
        doi: "10.1148/ryai.240300",
        url: _doi("10.1148/ryai.240300"),
      },
      {
        citation:
          "Collins GS, et al. TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods. BMJ. 2024;385:e078378.",
        doi: "10.1136/bmj-2023-078378",
        url: _doi("10.1136/bmj-2023-078378"),
      },
      {
        citation:
          "Moons KGM, et al. PROBAST+AI: an updated quality, risk of bias, and applicability assessment tool for prediction models using regression or AI methods. BMJ. 2025;388:e082505.",
        doi: "10.1136/bmj-2024-082505",
        url: _doi("10.1136/bmj-2024-082505"),
      },
      {
        citation:
          "Sounderajah V, et al. The STARD-AI reporting guideline for diagnostic accuracy studies using artificial intelligence. Nat Med. 2025;31:3283-3289.",
        doi: "10.1038/s41591-025-03953-8",
        url: _doi("10.1038/s41591-025-03953-8"),
      },
      {
        citation:
          "Cruz Rivera S, et al. Guidelines for clinical trial protocols for interventions involving AI: the SPIRIT-AI extension. Nat Med. 2020;26:1351-1363.",
        doi: "10.1038/s41591-020-1037-7",
        url: _doi("10.1038/s41591-020-1037-7"),
      },
      {
        citation:
          "Liu X, et al. Reporting guidelines for clinical trial reports for interventions involving AI: the CONSORT-AI extension. Nat Med. 2020;26:1364-1374.",
        doi: "10.1038/s41591-020-1034-x",
        url: _doi("10.1038/s41591-020-1034-x"),
      },
      {
        citation:
          "Vasey B, et al. Reporting guideline for the early-stage clinical evaluation of decision support systems driven by AI: DECIDE-AI. Nat Med. 2022;28:924-933.",
        doi: "10.1038/s41591-022-01772-9",
        url: _doi("10.1038/s41591-022-01772-9"),
      },
      {
        citation:
          "Lekadir K, et al. FUTURE-AI: international consensus guideline for trustworthy and deployable AI in healthcare. BMJ. 2025;388:e081554.",
        doi: "10.1136/bmj-2024-081554",
        url: _doi("10.1136/bmj-2024-081554"),
      },
    ],
  },
  {
    id: "trl-assurance",
    title: "Technology readiness & assurance burden (Z-axis)",
    description:
      "TRL, ESL and assurance-burden literature underpinning the Z0–Z5 implementation-effort axis.",
    references: [
      {
        citation:
          "Lavin A, et al. Technology readiness levels for machine learning systems. Nat Commun. 2022;13:6039.",
        doi: "10.1038/s41467-022-33128-9",
        url: _doi("10.1038/s41467-022-33128-9"),
      },
      {
        citation:
          "Jones S. Enhancing Technology Readiness Assessment: the Engineering Severity Level Methodology and the TRL+ Classification. IEEE Open J Syst Eng. 2024;2:50-61.",
        doi: "10.1109/OJSE.2024.3354777",
        url: _doi("10.1109/OJSE.2024.3354777"),
      },
      {
        citation:
          "Koo J-I, Jeong S-J. Improved Technology Readiness Assessment Framework for System-of-Systems from a System Integration Perspective. IEEE Access. 2024;12:23827-23853.",
        doi: "10.1109/ACCESS.2024.3362229",
        url: _doi("10.1109/ACCESS.2024.3362229"),
      },
      {
        citation:
          "Hart SN, Day PL, Garcia CA. Streamlining medical software development with CARE lifecycle and CARE agent: an AI-driven TRL assessment tool. BMC Med Inform Decis Mak. 2025;25:254.",
        doi: "10.1186/s12911-025-03099-0",
        url: _doi("10.1186/s12911-025-03099-0"),
      },
      {
        citation:
          "Muhammad AE, Yow K-C. Risk-Based AI Assurance Framework. Information. 2026;17(3):263.",
        doi: "10.3390/info17030263",
        url: _doi("10.3390/info17030263"),
      },
      {
        citation:
          "Boshuijzen-van Burken C, Spruit S, Geijsen T, Fillerup L. A values-based approach to designing military autonomous systems. Ethics Inf Technol. 2024;26:56.",
        doi: "10.1007/s10676-024-09789-z",
        url: _doi("10.1007/s10676-024-09789-z"),
        notes: "Cross-domain framing for assurance burden in safety-critical AI.",
      },
    ],
  },
  {
    id: "regulatory",
    title: "Regulatory & governance frameworks",
    description:
      "Regulator and HTA documents that anchor the Z-axis to real-world deployment requirements.",
    references: [
      {
        citation:
          "World Health Organization. Regulatory considerations on artificial intelligence for health. Geneva: WHO; 2023.",
        url: "https://www.who.int/publications/i/item/9789240078871",
      },
      {
        citation:
          "International Medical Device Regulators Forum. Good Machine Learning Practice for Medical Device Development: Guiding Principles. IMDRF/AIML WG/N88 FINAL:2025.",
        url: "https://www.imdrf.org/documents",
      },
      {
        citation:
          "FDA, Health Canada, MHRA. Transparency for Machine Learning-Enabled Medical Devices: Guiding Principles. 2024.",
        url: "https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles",
      },
      {
        citation:
          "FDA. Marketing Submission Recommendations for a Predetermined Change Control Plan for AI-Enabled Device Software Functions. 2025.",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents",
      },
      {
        citation:
          "Artificial Intelligence Board & MDCG. Interplay between the MDR/IVDR and the AI Act. AIB 2025-1/MDCG 2025-6. Brussels: European Commission; 2025.",
        url: "https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Evidence standards framework for digital health technologies. ECD7. London: NICE; 2022.",
        url: "https://www.nice.org.uk/corporate/ecd7",
      },
    ],
  },
  {
    id: "radiotherapy-specific",
    title: "Radiotherapy-specific guidance",
    description:
      "Discipline-specific guidelines that inform how the framework is applied to radiotherapy AI products.",
    references: [
      {
        citation:
          "Hurkmans C, et al. A joint ESTRO and AAPM guideline for development, clinical validation and reporting of AI models in radiation therapy. Radiother Oncol. 2024;197:110345.",
        doi: "10.1016/j.radonc.2024.110345",
        url: _doi("10.1016/j.radonc.2024.110345"),
      },
      {
        citation:
          "Barragán-Montero AM, et al. AID-RT: Standardising Artificial Intelligence Documentation in RadioTherapy with a domain-specific model card. Phys Imaging Radiat Oncol. 2026;38:100940.",
        doi: "10.1016/j.phro.2026.100940",
        url: _doi("10.1016/j.phro.2026.100940"),
      },
      {
        citation:
          "Mackay K, et al. Royal College of Radiologists guidance statements on the use of auto-contouring in radiotherapy. Clin Oncol. 2026;50:104004.",
        doi: "10.1016/j.clon.2025.104004",
        url: _doi("10.1016/j.clon.2025.104004"),
      },
      {
        citation:
          "Royal College of Radiologists. Auto-contouring in radiotherapy. London: RCR; 2024.",
        url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/",
      },
      {
        citation:
          "Poel R, Rüfenacht E, Scheib S, et al. A comprehensive multifaceted technical evaluation framework for implementation of auto-segmentation models in radiotherapy. Commun Med. 2025.",
        doi: "10.1038/s43856-025-01048-6",
        url: _doi("10.1038/s43856-025-01048-6"),
      },
      {
        citation:
          "NICE. Artificial intelligence (AI) technologies to aid contouring for radiotherapy treatment planning: early value assessment. HTG695. London: NICE; 2023 (updated 2025).",
        url: "https://www.nice.org.uk/guidance/htg695",
      },
      {
        citation:
          "Huq MS, et al. The report of Task Group 100 of the AAPM: application of risk analysis methods to radiation therapy quality management. Med Phys. 2016;43(7):4209-4262.",
        doi: "10.1118/1.4947547",
        url: _doi("10.1118/1.4947547"),
      },
    ],
  },
  {
    id: "platform",
    title: "DLinRT.eu framework documentation",
    description: "Internal concept and reference documents for the DLinRT.eu HTA support platform.",
    references: [
      {
        citation:
          "Lula U. DLinRT.eu HTA Support Platform Concept Paper v0.1: Transforming DLinRT.eu into an International HTA Support Platform for Radiotherapy AI. Unpublished internal concept paper; 2026.",
      },
      {
        citation:
          "DLinRT.eu. Resources & compliance: evidence level classification. 2026.",
        url: "https://dlinrt.eu/resources-compliance",
      },
    ],
  },
];

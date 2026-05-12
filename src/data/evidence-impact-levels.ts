
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
// Third axis (Lula & Kamath, 2026): residual implementation & assurance burden.
// Lower Z = lower residual effort = higher adoption readiness.
// Inspired by Bellini et al. (2023) third translational-effort axis, adapted for RT AI.

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

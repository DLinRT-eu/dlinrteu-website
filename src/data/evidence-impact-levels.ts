
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

export type ClinicalImpactCode = "I0" | "I1" | "I2" | "I3" | "I4" | "I5";

export interface ClinicalImpactLevel {
  level: ClinicalImpactCode;
  name: string;
  description: string;
  rtExamples: string[];
  color: string;
}

export const CLINICAL_IMPACT_LEVELS: ClinicalImpactLevel[] = [
  {
    level: "I0",
    name: "None Demonstrated",
    description: "No clinical, workflow, or quality benefit demonstrated beyond feasibility. Product works, but no patient-facing value shown.",
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
    description: "Enables monitoring, measurement, or quality assurance that indirectly supports patient care. Does not directly affect treatment but ensures safe operation.",
    rtExamples: [
      "QA tools validating AI contour accuracy",
      "Performance monitoring dashboards",
      "Automated consistency checks",
      "Measurement devices ensuring correct operation"
    ],
    color: "blue"
  },
  {
    level: "I2",
    name: "Workflow",
    description: "Time savings, efficiency gains, or reduction in variability within clinical workflow.",
    rtExamples: [
      "Contouring time reduction",
      "Inter-observer variability reduction",
      "Treatment planning efficiency",
      "Review/approval time savings"
    ],
    color: "teal"
  },
  {
    level: "I3",
    name: "Decision",
    description: "Changes in treatment management or clinical decision-making based on the AI output.",
    rtExamples: [
      "Dose modification rates",
      "Treatment intent changes",
      "Plan selection influence",
      "Adaptive treatment decisions"
    ],
    color: "orange"
  },
  {
    level: "I4",
    name: "Outcome",
    description: "Patient health outcomes including survival, toxicity reduction, or quality of life improvements.",
    rtExamples: [
      "Reduced radiation toxicity",
      "Improved tumor control probability",
      "Survival analysis",
      "Patient-reported outcomes"
    ],
    color: "purple"
  },
  {
    level: "I5",
    name: "Societal",
    description: "Health economics, cost-effectiveness, access to care, or population-level impact.",
    rtExamples: [
      "Cost per QALY analysis",
      "Reduced treatment delays",
      "Access improvement in LMICs",
      "Health economic modeling"
    ],
    color: "rose"
  }
];

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
  description: "This dual-axis classification separates evidence rigor (study quality) from clinical impact (what is measured). This addresses a key limitation of single-scale hierarchies that conflate rigorous technical validation with clinical outcomes.",
  rationale: "A product can have excellent evidence rigor (E3: systematic reviews) for technical performance (I0) but no outcome data (I4). Conversely, a product may claim patient outcomes (I4) with only preliminary evidence (E1). Both dimensions matter for informed decision-making.",
  originalReference: {
    citation: "Adapted from van Leeuwen KG, et al. Artificial intelligence in radiology: 100 commercially available products and their scientific evidence. Eur Radiol. 2021;31(6):3797-3804.",
    doi: "10.1007/s00330-021-07892-z",
    pmid: "33856519",
    url: "https://doi.org/10.1007/s00330-021-07892-z"
  }
};

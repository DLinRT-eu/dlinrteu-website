/**
 * Mapping of DLinRT product fields to EUnetHTA Core Model domains
 * (used by HTA view + HTA dossier export).
 *
 * Domains (HTA Core Model 3.0):
 *   CUR — Health problem & current use
 *   TEC — Description & technical characteristics
 *   EFF — Clinical effectiveness
 *   SAF — Safety
 *   ECO — Costs & economic evaluation (out of scope for DLinRT)
 *   ETH — Ethical analysis (data, fairness)
 *   ORG — Organisational aspects
 *   SOC — Patient & social aspects
 *   LEG — Legal aspects (regulatory)
 */

export type HTADomainCode =
  | "CUR" | "TEC" | "EFF" | "SAF" | "ECO" | "ETH" | "ORG" | "SOC" | "LEG";

export interface HTADomainMeta {
  code: HTADomainCode;
  label: string;
  description: string;
}

export const HTA_DOMAINS: Record<HTADomainCode, HTADomainMeta> = {
  CUR: { code: "CUR", label: "Health problem & current use", description: "Target condition, current standard of care, intended use." },
  TEC: { code: "TEC", label: "Technical characteristics", description: "How the technology works: inputs, outputs, integration, deployment." },
  EFF: { code: "EFF", label: "Clinical effectiveness", description: "Evidence rigor, clinical impact, study design, validation." },
  SAF: { code: "SAF", label: "Safety", description: "Known limitations, supported structures, safety/corrective actions." },
  ECO: { code: "ECO", label: "Costs & economic evaluation", description: "Pricing/cost data — not collected by DLinRT." },
  ETH: { code: "ETH", label: "Ethical aspects", description: "Training data provenance, demographics, fairness, transparency." },
  ORG: { code: "ORG", label: "Organisational aspects", description: "Workflow integration, deployment model, infrastructure." },
  SOC: { code: "SOC", label: "Patient & social aspects", description: "Patient population, accessibility, equity considerations." },
  LEG: { code: "LEG", label: "Legal aspects", description: "Regulatory status (CE/FDA/TGA), MDR class, AI Act risk class." },
};

/**
 * Map of ProductDetails field names → HTA domain.
 * Keys are dot-paths into ProductDetails for clarity.
 */
export const HTA_FIELD_MAP: Record<string, { domain: HTADomainCode; label: string }> = {
  "intendedUse":              { domain: "CUR", label: "Intended use" },
  "diseaseTargeted":          { domain: "CUR", label: "Target indication" },
  "anatomy":                  { domain: "CUR", label: "Target anatomy" },
  "modality":                 { domain: "CUR", label: "Imaging modality" },

  "features":                 { domain: "TEC", label: "Key features" },
  "technicalSpecifications":  { domain: "TEC", label: "Technical specifications" },
  "technology":               { domain: "TEC", label: "AI / model details" },
  "dosePredictionModels":     { domain: "TEC", label: "Dose prediction models" },

  "evidence":                 { domain: "EFF", label: "Clinical evidence" },
  "evidenceRigor":            { domain: "EFF", label: "Evidence rigor (E0–E3)" },
  "clinicalImpact":           { domain: "EFF", label: "Clinical impact (I0–I5)" },
  "evaluationData":           { domain: "EFF", label: "Evaluation dataset" },
  "studyQuality":             { domain: "EFF", label: "Study quality attributes" },

  "supportedStructures":      { domain: "SAF", label: "Supported structures" },
  "limitations":              { domain: "SAF", label: "Known limitations" },
  "safetyCorrectiveActions":  { domain: "SAF", label: "Safety & corrective actions" },

  "trainingData":             { domain: "ETH", label: "Training data provenance" },

  "deployment":               { domain: "ORG", label: "Deployment model" },
  "integration":              { domain: "ORG", label: "Workflow integration" },
  "marketPresence":           { domain: "ORG", label: "Market presence" },

  "population":               { domain: "SOC", label: "Target population" },

  "regulatory":               { domain: "LEG", label: "Regulatory status" },
  "certification":            { domain: "LEG", label: "Certification" },
  "guidelines":               { domain: "LEG", label: "Guideline compliance" },
};

/** Plain-English explanation of evidence rigor levels for HTA assessors. */
export const EVIDENCE_RIGOR_EXPLAIN: Record<string, string> = {
  E0: "No peer-reviewed evidence available.",
  E1: "Single-center retrospective evidence (limited generalisability).",
  E2: "Multi-center or prospective evidence with external validation.",
  E3: "Strong evidence: multi-center prospective with independent external validation.",
};

export const CLINICAL_IMPACT_EXPLAIN: Record<string, string> = {
  I0: "Technical performance only (no clinical outcome demonstrated).",
  I1: "Technical performance only (no clinical outcome demonstrated).",
  I2: "Diagnostic thinking impact (changes clinician decisions).",
  I3: "Therapeutic impact (changes treatment plan).",
  I4: "Patient outcome impact (clinical benefit demonstrated).",
  I5: "Societal / population-level impact.",
};

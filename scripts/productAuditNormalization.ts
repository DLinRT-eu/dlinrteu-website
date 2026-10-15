export type AuditRole = "Identity" | "Inclusion" | "Regulatory" | "Technical" | "Structures" | "Evidence" | "Transparency" | "Cross-check";
export type AuditSeverity = "error" | "warn" | "info";

export function normalizeAuditRole(role: string, field: string): AuditRole {
  const value = role.toLowerCase();
  if (/regulatory|regulator|pipeline-status/.test(value)) return "Regulatory";
  if (/cross-check|candidate-distinction/.test(value)) return "Cross-check";
  if (/inclusion|candidate-screening|^category$/.test(value)) return "Inclusion";
  if (/identity/.test(value)) return "Identity";
  if (/structures/.test(value)) return "Structures";
  if (/technical/.test(value)) return "Technical";
  if (/transparency/.test(value)) return "Transparency";
  if (/regulatory|certification/.test(field)) return "Regulatory";
  if (/evaluationData|trainingData|source/.test(field) && !/doi|keyPapers|evidence/.test(field)) return "Transparency";
  return "Evidence";
}

export function normalizeAuditSeverity(severity: string): AuditSeverity {
  if (severity === "error" || severity === "critical") return "error";
  if (["warn", "high", "medium", "low"].includes(severity)) return "warn";
  return "info";
}

export function isExternalSearch(query: { query: string; url?: string }): boolean {
  return !!query.url?.startsWith("https://") && !/inventory cross-check|no new external|not (re-)?searched/i.test(query.query);
}
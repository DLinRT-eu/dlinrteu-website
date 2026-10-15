import { describe, expect, test } from "bun:test";
import { isExternalSearch, normalizeAuditRole, normalizeAuditSeverity } from "./productAuditNormalization";

describe("Product audit report normalization", () => {
  test("severity is restricted to error, warn and info", () => {
    expect(normalizeAuditSeverity("critical")).toBe("error");
    expect(normalizeAuditSeverity("high")).toBe("warn");
    expect(normalizeAuditSeverity("low")).toBe("warn");
    expect(normalizeAuditSeverity("info")).toBe("info");
  });
  test("specialist rows remain visible under the canonical eight roles", () => {
    expect(normalizeAuditRole("Literature Reviewer", "keyPapers")).toBe("Evidence");
    expect(normalizeAuditRole("auditor", "regulatory.fda.productCode")).toBe("Regulatory");
    expect(normalizeAuditRole("cross-check", "id")).toBe("Cross-check");
    expect(normalizeAuditRole("pipeline-status", "developmentStage")).toBe("Regulatory");
  });
  test("internal cross-checks do not count as external source searches", () => {
    expect(isExternalSearch({ query: "Inventory cross-check: no new external source", url: "https://example.com" })).toBe(false);
    expect(isExternalSearch({ query: "MRCAT brain synthetic CT", url: "https://europepmc.org" })).toBe(true);
    expect(isExternalSearch({ query: "MRCAT brain synthetic CT" })).toBe(false);
  });
});
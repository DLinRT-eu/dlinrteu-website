import { describe, expect, test } from "bun:test";
import {
  EFFICACY_LEVEL_ORDER,
  efficacyRank,
  resolveEfficacyLevel,
  computeReadinessSignal,
} from "../src/data/evidence-impact-levels";
import { computeProductEvidenceScore } from "../src/utils/evidenceScoring";

describe("Levels of Efficacy", () => {
  test("order is L1t < L1c < L2 < L3 < L4 < L5 < L6", () => {
    expect(EFFICACY_LEVEL_ORDER).toEqual(["L1t", "L1c", "L2", "L3", "L4", "L5", "L6"]);
    expect(efficacyRank("L1t")).toBeLessThan(efficacyRank("L1c"));
    expect(efficacyRank("L5")).toBeLessThan(efficacyRank("L6"));
  });

  test("legacy I-codes resolve provisionally", () => {
    expect(resolveEfficacyLevel("I1")).toEqual({ level: "L2", provisional: true, legacy: "I1" });
    expect(resolveEfficacyLevel("L4")).toEqual({ level: "L4", provisional: false });
  });

  test("product level is the max across papers", () => {
    const s = computeProductEvidenceScore({
      keyPapers: [{ clinicalImpact: "L2" }, { clinicalImpact: "L4" }, { clinicalImpact: "L1c" }],
    });
    expect(s.impact).toBe("L4");
    expect(s.impactProvisional).toBe(false);
  });

  test("override wins over computed level", () => {
    const s = computeProductEvidenceScore({
      keyPapers: [{ clinicalImpact: "L4" }],
      evidenceScoreOverride: { impact: "L3", reason: "top paper off-label" },
    });
    expect(s.impact).toBe("L3");
    expect(s.impactOrigin).toBe("override");
  });

  test("stored legacy value falls back as provisional", () => {
    const s = computeProductEvidenceScore({ clinicalImpact: "I2" });
    expect(s.impact).toBe("L3");
    expect(s.impactProvisional).toBe(true);
  });

  test("adoption-grade requires E2+ and L3+", () => {
    expect(computeReadinessSignal("E2", "L3", "R4").signal).toBe("adoption-grade");
    expect(computeReadinessSignal("E2", "L2", "R4").signal).toBe("deploy-with-monitoring");
  });
});

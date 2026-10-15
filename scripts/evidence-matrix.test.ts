import { describe, expect, test } from "bun:test";
import type { ProductDetails } from "../src/types/productDetails";
import { getEvidenceMatrixProducts } from "../src/utils/evidenceMatrix";

const product = (fields: Partial<ProductDetails>): ProductDetails => ({
  id: "test-product", name: "Test product", company: "Test", category: "Auto-Contouring",
  ...fields,
});

describe("dashboard evidence placement", () => {
  test("all seven efficacy levels are plotted", () => {
    const levels = ["L1t", "L1c", "L2", "L3", "L4", "L5", "L6"] as const;
    expect(getEvidenceMatrixProducts(levels.map(clinicalImpact => product({ evidenceRigor: "E2", clinicalImpact })))
      .map(p => p.clinicalImpact)).toEqual([...levels]);
  });
  test("paper maxima replace stale stored scores", () => {
    const [p] = getEvidenceMatrixProducts([product({ evidenceRigor: "E0", clinicalImpact: "L1c",
      keyPapers: [{ evidenceRigor: "E2", clinicalImpact: "L2" }, { evidenceRigor: "E3", clinicalImpact: "L4" }] })]);
    expect(p.evidenceRigor).toBe("E3");
    expect(p.clinicalImpact).toBe("L4");
  });
  test("documented overrides win over paper maxima", () => {
    const [p] = getEvidenceMatrixProducts([product({ evidenceRigor: "E2",
      keyPapers: [{ clinicalImpact: "L6" }], evidenceScoreOverride: { impact: "L3", reason: "Off-label endpoint" } })]);
    expect(p.clinicalImpact).toBe("L3");
    expect(p.clinicalImpactNotes).toBe("Off-label endpoint");
  });
  test("legacy fallback remains visibly provisional", () => {
    const [p] = getEvidenceMatrixProducts([product({ evidenceRigor: "E1", clinicalImpact: "I2" })]);
    expect(p.clinicalImpact).toBe("L3");
    expect(p.efficacyProvisional).toBe(true);
  });
  test("unassessed E or L excluded; missing readiness excluded only in 3D", () => {
    const plotted = getEvidenceMatrixProducts([
      product({ evidenceRigor: "E2" }), product({ clinicalImpact: "L3" }),
      product({ evidenceRigor: "E2", clinicalImpact: "L3" }),
      product({ evidenceRigor: "E2", clinicalImpact: "L3", adoptionReadiness: "R5" }),
    ]);
    expect(plotted.length).toBe(2);
    expect(plotted.filter(p => p.adoptionReadiness).length).toBe(1);
    expect(plotted[1].adoptionReadiness).toBe("R5");
  });
});
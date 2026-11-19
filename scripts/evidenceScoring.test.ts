import { describe, expect, test } from "bun:test";
import { paperLabel } from "../src/utils/evidenceScoring";

type Paper = NonNullable<import("../src/types/productDetails").ProductDetails["keyPapers"]>[number];

const paper = (fields: Partial<Paper>): Paper => ({ ...fields });

describe("paperLabel", () => {
  test("does not duplicate an already abbreviated author string", () => {
    expect(paperLabel(paper({ authors: "Wyatt JJ et al.", year: "2026" }))).toBe("Wyatt JJ et al. (2026)");
  });
  test("uses the first author of a comma-separated list", () => {
    expect(paperLabel(paper({ authors: "van Bruggen IG, Wolf AL, et al.", year: "2025" }))).toBe(
      "van Bruggen IG et al. (2025)"
    );
  });
  test("appends et al. to a bare author name", () => {
    expect(paperLabel(paper({ authors: "Wong J", year: "2020" }))).toBe("Wong J et al. (2020)");
  });
  test("omits the year when absent", () => {
    expect(paperLabel(paper({ authors: "Wong J" }))).toBe("Wong J et al.");
  });
  test("falls back to the title when no authors are stored", () => {
    expect(paperLabel(paper({ title: "An unlabelled study", year: "2024" }))).toBe("An unlabelled study (2024)");
  });
  test("returns an empty string for no paper", () => {
    expect(paperLabel(undefined)).toBe("");
  });
});

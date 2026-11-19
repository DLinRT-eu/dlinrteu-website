import { describe, expect, test } from "bun:test";
import { countScoredSources } from "../src/utils/evidenceScoring";

describe("countScoredSources", () => {
  test("same DOI on two products counts once", () => {
    const p = { doi: "10.1/x", title: "A", evidenceRigor: "E1", clinicalImpact: "L2" } as never;
    const p2 = { doi: "https://doi.org/10.1/X", title: "A" } as never;
    expect(countScoredSources([{ keyPapers: [p] }, { keyPapers: [p2] }])).toEqual({ scored: 1, total: 1 });
  });
  test("paper without both scores is listed but not scored", () => {
    const p = { title: "B", evidenceRigor: "E1" } as never;
    expect(countScoredSources([{ keyPapers: [p] }])).toEqual({ scored: 0, total: 1 });
  });
});

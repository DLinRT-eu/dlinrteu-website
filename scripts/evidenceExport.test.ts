import { describe, expect, test } from "bun:test";
import { normalizeDoi, summarizeOpenAlexWork } from "../src/utils/openalex";
import {
  collectProductPapers,
  groupPapersByLevels,
  papersToBibtex,
  papersToCsvRows,
  papersToRis,
} from "../src/utils/evidenceExport";
import { ALL_PRODUCTS } from "../src/data";

describe("normalizeDoi", () => {
  test("strips resolver prefixes and lower-cases", () => {
    expect(normalizeDoi("https://doi.org/10.1016/J.RADONC.2015.07.041")).toBe("10.1016/j.radonc.2015.07.041");
    expect(normalizeDoi("doi: 10.3389/fonc.2023.1213068")).toBe("10.3389/fonc.2023.1213068");
  });
  test("rejects non-DOIs", () => {
    expect(normalizeDoi("not a doi")).toBeNull();
    expect(normalizeDoi("")).toBeNull();
  });
});

describe("summarizeOpenAlexWork", () => {
  test("maps the fields we store", () => {
    const s = summarizeOpenAlexWork(
      {
        id: "https://openalex.org/W1",
        title: "A study",
        publication_year: 2024,
        type: "article",
        primary_location: { source: { display_name: "Radiother Oncol" } },
        open_access: { oa_url: "https://example.org/pdf" },
        authorships: [
          { author: { display_name: "Jane A. Doe" } },
          { author: { display_name: "John Smith" } },
          { author: { display_name: "Ann Lee" } },
          { author: { display_name: "Bo Kim" } },
        ],
      },
      "10.1/x",
    );
    expect(s).toMatchObject({
      doi: "10.1/x",
      title: "A study",
      year: "2024",
      journal: "Radiother Oncol",
      oaUrl: "https://example.org/pdf",
      authors: "Doe JA, Smith J, Lee A, et al.",
    });
  });
});

describe("evidence export", () => {
  const raystation = ALL_PRODUCTS.find((p) => p.id === "raysearch-raystation")!;

  test("collects key papers first, without duplicate DOIs", () => {
    const papers = collectProductPapers(raystation);
    expect(papers.length).toBeGreaterThanOrEqual(raystation.keyPapers!.length);
    const dois = papers.map((p) => p.doi).filter(Boolean);
    expect(new Set(dois).size).toBe(dois.length);
    expect(papers.slice(0, raystation.keyPapers!.length).every((p) => p.scored)).toBe(true);
  });

  test("RIS and BibTeX contain one record per paper", () => {
    const papers = collectProductPapers(raystation);
    expect(papersToRis("RS", papers).match(/^TY {2}- JOUR/gm)!.length).toBe(papers.length);
    expect(papersToBibtex("RS", papers).match(/^@article\{/gm)!.length).toBe(papers.length);
    const keys = [...papersToBibtex("RS", papers).matchAll(/^@article\{([^,]+),/gm)].map((m) => m[1]);
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("CSV rows carry product and scores", () => {
    const rows = papersToCsvRows("RS", collectProductPapers(raystation));
    expect(rows[0].Product).toBe("RS");
    expect(rows.some((r) => r["Evidence rigor"] !== "")).toBe(true);
  });

  test("grouping sorts highest rigor first and keeps every paper", () => {
    const groups = groupPapersByLevels(raystation.keyPapers!);
    expect(groups.reduce((n, g) => n + g.papers.length, 0)).toBe(raystation.keyPapers!.length);
    const order = ["E3", "E2", "E1", "E0", "—"];
    const ranks = groups.map((g) => order.indexOf(g.rigor));
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  test("every catalogued product exports without throwing", () => {
    for (const p of ALL_PRODUCTS) {
      const papers = collectProductPapers(p);
      papersToRis(p.name, papers);
      papersToBibtex(p.name, papers);
    }
  });
});

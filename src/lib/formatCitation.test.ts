import { describe, it, expect } from "vitest";
import { formatCitation, parseDescription, extractDoi } from "./formatCitation";

describe("extractDoi", () => {
  it("strips the https://doi.org/ prefix", () => {
    expect(extractDoi("https://doi.org/10.3390/app16115681")).toEqual({
      doi: "10.3390/app16115681",
      doiUrl: "https://doi.org/10.3390/app16115681",
    });
  });
  it("accepts a bare DOI", () => {
    expect(extractDoi("10.1002/acm2.70010").doi).toBe("10.1002/acm2.70010");
  });
  it("returns empty for non-DOI urls", () => {
    expect(extractDoi("https://example.com/paper")).toEqual({});
  });
});

describe("parseDescription", () => {
  it("parses Authors. Title. Journal Year;Vol(Iss):Pages", () => {
    const r = parseDescription(
      "Bayley et al. Comparison of two auto-contouring systems for H&N OARs to institutional reference standard. Appl Sci 2026;16(11):5681"
    );
    expect(r.authors).toBe("Bayley et al");
    expect(r.year).toBe("2026");
    expect(r.journal).toBe("Appl Sci");
    expect(r.locator).toBe("16(11):5681");
    expect(r.title).toMatch(/Comparison of two auto-contouring systems/);
  });

  it("parses entries without volume/issue", () => {
    const r = parseDescription(
      "Starke et al. Clinical evaluation for prostate and nodes RT. BJR 2024"
    );
    expect(r.authors).toBe("Starke et al");
    expect(r.year).toBe("2024");
    expect(r.journal).toBe("BJR");
  });

  it("falls back to year-only extraction", () => {
    const r = parseDescription("Some free-form summary mentioning 2022 results");
    expect(r.year).toBe("2022");
  });
});

describe("formatCitation", () => {
  it("handles legacy plain DOI strings", () => {
    const c = formatCitation("https://doi.org/10.1234/abc.def");
    expect(c.doi).toBe("10.1234/abc.def");
    expect(c.parsed).toBe(false);
  });

  it("derives DOI from the link field", () => {
    const c = formatCitation({
      type: "Peer-reviewed Publication",
      description:
        "Fan et al. Evaluation and failure analysis of 4 commercial DL autosegmentation software for abdominal OARs. JACMP 2025;26(4):e70010",
      link: "https://doi.org/10.1002/acm2.70010",
    });
    expect(c.doi).toBe("10.1002/acm2.70010");
    expect(c.authors).toBe("Fan et al");
    expect(c.year).toBe("2025");
    expect(c.journal).toBe("JACMP");
    expect(c.locator).toBe("26(4):e70010");
  });

  it("prefers explicit structured fields over parsing", () => {
    const c = formatCitation({
      type: "Peer-reviewed Publication",
      description: "ignored free-form text",
      link: "https://doi.org/10.1/x",
      authors: "Doe J, Roe K",
      year: 2025,
      title: "A study",
      journal: "J Foo",
    });
    expect(c.authors).toBe("Doe J, Roe K");
    expect(c.year).toBe("2025");
    expect(c.title).toBe("A study");
    expect(c.journal).toBe("J Foo");
  });
});

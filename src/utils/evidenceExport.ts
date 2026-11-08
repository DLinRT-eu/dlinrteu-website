/**
 * Export and grouping helpers for a product's publication list.
 *
 * Sources: `keyPapers` (individually scored) first, then any `evidence`
 * entry that carries a DOI not already in keyPapers (cited, not yet scored).
 * Only metadata and DOIs are exported — never full texts.
 */
import type { ProductDetails } from "@/types/productDetails";
import { normalizeDoi } from "@/utils/openalex";

export interface ExportablePaper {
  doi?: string;
  pmid?: string;
  title?: string;
  authors?: string;
  journal?: string;
  year?: string;
  evidenceRigor?: string;
  clinicalImpact?: string;
  scored: boolean;
  vendorIndependent?: boolean;
  multiCenter?: boolean;
  prospective?: boolean;
  rationale?: string;
  url?: string;
}

const doiFromText = (s: string | undefined): string | undefined => {
  if (!s) return undefined;
  const m = s.match(/10\.\d{4,9}\/[^\s"'<>),;]+/);
  return m ? normalizeDoi(m[0].replace(/[.]+$/, "")) ?? undefined : undefined;
};

export const collectProductPapers = (product: ProductDetails): ExportablePaper[] => {
  const out: ExportablePaper[] = [];
  const seen = new Set<string>();

  for (const k of product.keyPapers ?? []) {
    const doi = normalizeDoi(k.doi) ?? undefined;
    if (doi) seen.add(doi);
    out.push({
      doi,
      pmid: k.pmid,
      title: k.title,
      authors: k.authors,
      journal: k.journal,
      year: k.year,
      evidenceRigor: k.evidenceRigor,
      clinicalImpact: k.clinicalImpact,
      scored: Boolean(k.evidenceRigor || k.clinicalImpact),
      vendorIndependent: k.vendorIndependent,
      multiCenter: k.multiCenter,
      prospective: k.prospective,
      rationale: k.rationale,
      url: k.link ?? (doi ? `https://doi.org/${doi}` : undefined),
    });
  }

  for (const e of (product.evidence ?? []) as unknown[]) {
    if (!e || typeof e !== "object") continue;
    const item = e as Record<string, any>;
    const doi =
      normalizeDoi(item.doi) ??
      doiFromText(item.link) ??
      doiFromText(item.url) ??
      doiFromText(item.description);
    if (!doi || seen.has(doi)) continue;
    seen.add(doi);
    out.push({
      doi,
      title: item.title ?? item.description,
      authors: item.authors,
      journal: item.journal,
      year: item.year ? String(item.year) : undefined,
      scored: false,
      url: item.link ?? item.url ?? `https://doi.org/${doi}`,
    });
  }
  return out;
};

export const papersToCsvRows = (productName: string, papers: ExportablePaper[]) =>
  papers.map((p) => ({
    Product: productName,
    DOI: p.doi ?? "",
    PMID: p.pmid ?? "",
    Title: p.title ?? "",
    Authors: p.authors ?? "",
    Journal: p.journal ?? "",
    Year: p.year ?? "",
    "Evidence rigor": p.evidenceRigor ?? "",
    "Level of efficacy": p.clinicalImpact ?? "",
    "Individually scored": p.scored ? "Yes" : "No",
    "Vendor independent": p.vendorIndependent === undefined ? "" : p.vendorIndependent ? "Yes" : "No",
    "Multi-centre": p.multiCenter === undefined ? "" : p.multiCenter ? "Yes" : "No",
    Prospective: p.prospective === undefined ? "" : p.prospective ? "Yes" : "No",
    Rationale: p.rationale ?? "",
    URL: p.url ?? "",
  }));

const splitAuthors = (authors?: string): string[] =>
  (authors ?? "")
    .replace(/,?\s*et al\.?$/i, "")
    .split(/\s*[,;]\s*/)
    .map((a) => a.trim())
    .filter(Boolean);

/** RIS (Zotero / EndNote / Mendeley). */
export const papersToRis = (productName: string, papers: ExportablePaper[]): string =>
  papers
    .map((p) => {
      const lines = ["TY  - JOUR"];
      if (p.title) lines.push(`TI  - ${p.title}`);
      for (const a of splitAuthors(p.authors)) lines.push(`AU  - ${a}`);
      if (p.journal) lines.push(`JO  - ${p.journal}`);
      if (p.year) lines.push(`PY  - ${p.year}`);
      if (p.doi) lines.push(`DO  - ${p.doi}`);
      if (p.url) lines.push(`UR  - ${p.url}`);
      lines.push(`KW  - DLinRT: ${productName}`);
      if (p.evidenceRigor || p.clinicalImpact)
        lines.push(`N1  - DLinRT score ${p.evidenceRigor ?? "-"} / ${p.clinicalImpact ?? "-"}`);
      lines.push("ER  - ");
      return lines.join("\r\n");
    })
    .join("\r\n\r\n");

const bibEscape = (s: string) => s.replace(/[{}\\]/g, "").replace(/[&%$#_]/g, (c) => `\\${c}`);

/** BibTeX; keys are first-author surname + year (+ suffix when needed). */
export const papersToBibtex = (productName: string, papers: ExportablePaper[]): string => {
  const used = new Map<string, number>();
  return papers
    .map((p, i) => {
      const surname = (splitAuthors(p.authors)[0] ?? "paper").split(/\s+/)[0].replace(/[^A-Za-z]/g, "") || "paper";
      const base = `${surname.toLowerCase()}${p.year ?? ""}` || `paper${i + 1}`;
      const n = used.get(base) ?? 0;
      used.set(base, n + 1);
      const key = n === 0 ? base : `${base}${String.fromCharCode(97 + n)}`;
      const fields: string[] = [];
      if (p.title) fields.push(`  title = {${bibEscape(p.title)}}`);
      const authors = splitAuthors(p.authors);
      if (authors.length) fields.push(`  author = {${authors.map(bibEscape).join(" and ")}${/et al/i.test(p.authors ?? "") ? " and others" : ""}}`);
      if (p.journal) fields.push(`  journal = {${bibEscape(p.journal)}}`);
      if (p.year) fields.push(`  year = {${p.year}}`);
      if (p.doi) fields.push(`  doi = {${p.doi}}`);
      const note = [`DLinRT: ${productName}`, p.evidenceRigor || p.clinicalImpact ? `${p.evidenceRigor ?? "-"}/${p.clinicalImpact ?? "-"}` : ""]
        .filter(Boolean)
        .join("; ");
      fields.push(`  note = {${bibEscape(note)}}`);
      return `@article{${key},\n${fields.join(",\n")}\n}`;
    })
    .join("\n\n");
};

/** Group scored papers by "E × L" cell, highest levels first. */
export const groupPapersByLevels = <T extends { evidenceRigor?: string; clinicalImpact?: string }>(
  papers: T[],
): Array<{ key: string; rigor: string; impact: string; papers: T[] }> => {
  const RIGOR = ["E3", "E2", "E1", "E0"];
  const IMPACT = ["L6", "L5", "L4", "L3", "L2", "L1c", "L1t", "I5", "I4", "I3", "I2", "I1", "I0"];
  const groups = new Map<string, { key: string; rigor: string; impact: string; papers: T[] }>();
  for (const p of papers) {
    const rigor = p.evidenceRigor ?? "—";
    const impact = p.clinicalImpact ?? "—";
    const key = `${rigor} × ${impact}`;
    if (!groups.has(key)) groups.set(key, { key, rigor, impact, papers: [] });
    groups.get(key)!.papers.push(p);
  }
  const rank = (v: string, order: string[]) => {
    const i = order.indexOf(v);
    return i === -1 ? order.length : i;
  };
  return [...groups.values()].sort(
    (a, b) => rank(a.rigor, RIGOR) - rank(b.rigor, RIGOR) || rank(a.impact, IMPACT) - rank(b.impact, IMPACT),
  );
};

export const downloadText = (text: string, filename: string, mime: string): void => {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

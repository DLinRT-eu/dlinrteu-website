/**
 * Per-source evidence export.
 *
 * Emits one row per scored publication/source per product so that DLinRT
 * scores can be checked and compared source by source against other
 * catalogues. Nothing is inferred: empty fields stay empty.
 *
 * Note: Adoption Readiness (R) is a product-level judgement about residual
 * implementation effort, not a property of an individual paper, so it is
 * repeated on each row for context rather than scored per source.
 */
import type { ProductDetails } from "@/types/productDetails";
import { computeProductEvidenceScore, type ScoredPaper } from "@/utils/evidenceScoring";
import { computeReadinessSignal } from "@/data/evidence-impact-levels";
import { escapeCsvValue } from "@/utils/csv";

export interface EvidenceSourceRow {
  "Product ID": string;
  "Product Name": string;
  Company: string;
  Category: string;
  "Applies To Category": string;
  Title: string;
  Authors: string;
  Journal: string;
  Year: string;
  DOI: string;
  PMID: string;
  Link: string;
  "Evidence Rigor": string;
  "Clinical Impact": string;
  Rationale: string;
  "Vendor Independent": string;
  "Multi-Center": string;
  "Multi-National": string;
  Prospective: string;
  "External Validation": string;
  "Sets Product Rigor": string;
  "Sets Product Impact": string;
  "Product Rigor": string;
  "Product Impact": string;
  "Product Adoption Readiness": string;
  "Product Score Origin": string;
  Note: string;
}

const flag = (value?: boolean): string =>
  value === true ? "Yes" : value === false ? "No" : "";

const resolveLink = (paper: ScoredPaper): string => {
  if (paper.link) return paper.link;
  if (paper.doi) {
    return paper.doi.startsWith("http")
      ? paper.doi
      : `https://doi.org/${paper.doi.replace(/^doi:\s*/i, "")}`;
  }
  if (paper.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`;
  return "";
};

const scoreOrigin = (
  rigorOrigin: string,
  impactOrigin: string
): string => (rigorOrigin === impactOrigin ? rigorOrigin : `${rigorOrigin}/${impactOrigin}`);

/** Build one row per source (or a single placeholder row when none exists). */
export const buildEvidenceBySourceRows = (
  products: ProductDetails[]
): EvidenceSourceRow[] => {
  const rows: EvidenceSourceRow[] = [];

  for (const product of products) {
    const score = computeProductEvidenceScore(product);
    const origin = scoreOrigin(score.rigorOrigin, score.impactOrigin);
    const base = {
      "Product ID": product.id ?? "",
      "Product Name": product.name ?? "",
      Company: product.company ?? "",
      Category: product.category ?? "",
      "Product Rigor": score.rigor ?? "",
      "Product Impact": score.impact ?? "",
      "Product Adoption Readiness": product.adoptionReadiness ?? "",
      "Product Score Origin": origin,
    };

    const papers = product.keyPapers ?? [];

    if (papers.length === 0) {
      rows.push({
        ...base,
        "Applies To Category": "",
        Title: "",
        Authors: "",
        Journal: "",
        Year: "",
        DOI: "",
        PMID: "",
        Link: "",
        "Evidence Rigor": "",
        "Clinical Impact": "",
        Rationale: "",
        "Vendor Independent": "",
        "Multi-Center": "",
        "Multi-National": "",
        Prospective: "",
        "External Validation": "",
        "Sets Product Rigor": "",
        "Sets Product Impact": "",
        Note: "No scored publication",
      });
      continue;
    }

    for (const paper of papers) {
      const unscored = !paper.evidenceRigor && !paper.clinicalImpact;
      rows.push({
        ...base,
        "Applies To Category": paper.appliesToCategory ?? "",
        Title: paper.title ?? "",
        Authors: paper.authors ?? "",
        Journal: paper.journal ?? "",
        Year: paper.year ?? "",
        DOI: paper.doi ?? "",
        PMID: paper.pmid ?? "",
        Link: resolveLink(paper),
        "Evidence Rigor": paper.evidenceRigor ?? "",
        "Clinical Impact": paper.clinicalImpact ?? "",
        Rationale: paper.rationale ?? "",
        "Vendor Independent": flag(paper.vendorIndependent),
        "Multi-Center": flag(paper.multiCenter),
        "Multi-National": flag(paper.multiNational),
        Prospective: flag(paper.prospective),
        "External Validation": flag(paper.externalValidation),
        "Sets Product Rigor": score.rigorSource === paper ? "Yes" : "No",
        "Sets Product Impact": score.impactSource === paper ? "Yes" : "No",
        Note: unscored ? "Listed source, not scored" : "",
      });
    }
  }

  return rows;
};

const EVIDENCE_SOURCE_HEADERS: (keyof EvidenceSourceRow)[] = [
  "Product ID",
  "Product Name",
  "Company",
  "Category",
  "Applies To Category",
  "Title",
  "Authors",
  "Journal",
  "Year",
  "DOI",
  "PMID",
  "Link",
  "Evidence Rigor",
  "Clinical Impact",
  "Rationale",
  "Vendor Independent",
  "Multi-Center",
  "Multi-National",
  "Prospective",
  "External Validation",
  "Sets Product Rigor",
  "Sets Product Impact",
  "Product Rigor",
  "Product Impact",
  "Product Adoption Readiness",
  "Product Score Origin",
  "Note",
];

/** RFC 4180 CSV of the per-source evidence rows. */
export const buildEvidenceBySourceCsv = (products: ProductDetails[]): string => {
  const rows = buildEvidenceBySourceRows(products);
  return [
    EVIDENCE_SOURCE_HEADERS.join(","),
    ...rows.map((row) =>
      EVIDENCE_SOURCE_HEADERS.map((h) => escapeCsvValue(row[h])).join(",")
    ),
  ].join("\n");
};

/** Product-level evidence summary fields shared by the Excel/JSON exports. */
export const buildProductEvidenceSummary = (product: ProductDetails) => {
  const score = computeProductEvidenceScore(product);
  const signal = computeReadinessSignal(
    score.rigor,
    score.impact,
    product.adoptionReadiness
  );
  return {
    "Evidence Rigor": score.rigor ?? "",
    "Evidence Rigor Notes": product.evidenceRigorNotes ?? "",
    "Clinical Impact": score.impact ?? "",
    "Clinical Impact Notes": product.clinicalImpactNotes ?? "",
    "Adoption Readiness": product.adoptionReadiness ?? "",
    "Adoption Readiness Notes": product.adoptionReadinessNotes ?? "",
    "Readiness Signal": signal.label,
    "Score Origin": scoreOrigin(score.rigorOrigin, score.impactOrigin),
    "Score Override Reason": score.overrideReason ?? "",
    "Scored Publications Count": score.scoredPaperCount,
    "Listed Publications Count": score.paperCount,
    "Evidence Vendor Independent": flag(score.qualityFlags.vendorIndependent),
    "Evidence Multi-Center": flag(score.qualityFlags.multiCenter),
    "Evidence Multi-National": flag(score.qualityFlags.multiNational),
    "Evidence Prospective": flag(score.qualityFlags.prospective),
    "Evidence External Validation": flag(score.qualityFlags.externalValidation),
  };
};

export const downloadEvidenceBySourceCsv = (products: ProductDetails[]): void => {
  const csv = buildEvidenceBySourceCsv(products);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.href = url;
  a.download = `dlinrt-evidence-by-source-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

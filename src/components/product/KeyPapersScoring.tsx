import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Info, LayoutList, Rows3 } from "lucide-react";
import { objectsToCsv, downloadCsv } from "@/utils/csv";
import {
  collectProductPapers,
  downloadText,
  groupPapersByLevels,
  papersToBibtex,
  papersToCsvRows,
  papersToRis,
} from "@/utils/evidenceExport";
import type { ProductDetails } from "@/types/productDetails";
import {
  computeProductEvidenceScore,
  paperLabel,
} from "@/utils/evidenceScoring";
import {
  getEvidenceRigorColor,
  getClinicalImpactColor,
} from "@/data/evidence-impact-levels";

interface KeyPapersScoringProps {
  product: ProductDetails;
  category?: string;
}

const QUALITY_LABELS: Record<string, string> = {
  vendorIndependent: "Vendor-independent",
  multiCenter: "Multi-centre",
  multiNational: "Multi-national",
  prospective: "Prospective",
  externalValidation: "External validation",
};

// Regulatory clearances, vendor pages, press items, indirect citations and
// non-peer-reviewed material cannot carry a per-paper score, so they are
// excluded from the coverage count. Checked before the positive match so that
// e.g. "Vendor Publication" is not counted as a scoreable publication.
const NON_PUBLICATION_TYPE =
  /510|fda|ce mark|\bmdr\b|\bmdd\b|regulatory|clearance|press release|white paper|brochure|landing|product page|product information|product release|vendor|documentation|release notes|software tool|software development|publications database|use cases|case study|indirect|announcement|systematic review|preprint|arxiv|algorithm paper|conference|unknown/i;

// Positive match for citation types that represent a scoreable publication.
const PUBLICATION_TYPE =
  /peer-review|publication|study|studies|journal|analysis|validation|multicenter|multi-cent|comparative|implementation|paper/i;

const isScoreablePublication = (type: string | undefined): boolean => {
  if (!type) return false;
  // "Multi-vendor Comparative Study" is an independent study, not vendor material.
  const normalized = type.replace(/multi-?vendor/gi, "comparative");
  if (NON_PUBLICATION_TYPE.test(normalized)) return false;
  return PUBLICATION_TYPE.test(normalized);
};

const KeyPapersScoring = ({ product, category }: KeyPapersScoringProps) => {
  const papers = product.keyPapers ?? [];
  const evidence = product.evidence ?? [];
  const publicationCount = evidence.filter((e) =>
    isScoreablePublication(typeof e === "string" ? undefined : e.type)
  ).length;



  const score = computeProductEvidenceScore(product, { category });
  const scored = score.scoredPaperCount;
  const [view, setView] = useState<"list" | "grouped">("list");
  const groups = useMemo(() => groupPapersByLevels(papers), [papers]);
  const exportPapers = useMemo(() => collectProductPapers(product), [product]);
  const fileBase = `dlinrt-evidence-${(product.name ?? "product").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  const productName = product.name ?? "";

  const exportBar = exportPapers.length > 0 && (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-muted-foreground mr-1">
        Export {exportPapers.length} publication{exportPapers.length === 1 ? "" : "s"}:
      </span>
      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => downloadCsv(objectsToCsv(papersToCsvRows(productName, exportPapers)), `${fileBase}.csv`)}
      >
        <Download className="h-3 w-3 mr-1" /> CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => downloadText(papersToRis(productName, exportPapers), `${fileBase}.ris`, "application/x-research-info-systems")}
      >
        <Download className="h-3 w-3 mr-1" /> RIS
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => downloadText(papersToBibtex(productName, exportPapers), `${fileBase}.bib`, "application/x-bibtex")}
      >
        <Download className="h-3 w-3 mr-1" /> BibTeX
      </Button>
    </div>
  );

  if (papers.length === 0 && evidence.length === 0) return null;

  const coverageNote =
    scored === 0
      ? publicationCount === 0
        ? "No peer-reviewed publication naming this product has been identified yet — the listed sources are regulatory or vendor documents."
        : `None of the ${publicationCount} cited publication${publicationCount === 1 ? " has" : "s have"} been individually scored yet — all citations are listed under Clinical Evidence.`
      : scored < publicationCount
        ? `${scored} of ${publicationCount} cited publications have been individually scored — the remaining citations are listed under Clinical Evidence.`
        : null;

  if (scored === 0) {
    return (
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Per-publication scoring</h3>
        <p className="text-sm text-muted-foreground">{coverageNote}</p>
        {exportBar}
      </div>
    );
  }

  const renderPaper = (paper: (typeof papers)[number], index: number) => {
          const flags = Object.keys(QUALITY_LABELS).filter(
            (key) => (paper as Record<string, unknown>)[key] === true
          );
          return (
            <li key={paper.doi ?? paper.pmid ?? index} className="rounded-md border p-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {paper.title ?? paperLabel(paper)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {[paper.authors, paper.journal, paper.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {paper.evidenceRigor && (
                    <Badge
                      variant="outline"
                      className={`${getEvidenceRigorColor(paper.evidenceRigor)} text-xs border`}
                    >
                      {paper.evidenceRigor}
                    </Badge>
                  )}
                  {paper.clinicalImpact && (
                    <Badge
                      variant="outline"
                      className={`${getClinicalImpactColor(paper.clinicalImpact)} text-xs border`}
                    >
                      {paper.clinicalImpact}
                      {paper.efficacyProvisional && (
                        <span
                          className="ml-1 opacity-70"
                          title={`Provisional: converted from legacy ${paper.legacyClinicalImpact ?? "score"}, pending re-scoring against Levels of Efficacy`}
                        >
                          *
                        </span>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
              {paper.rationale && (
                <p className="text-xs text-muted-foreground mt-2">{paper.rationale}</p>
              )}
              {flags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {flags.map((key) => (
                    <Badge key={key} variant="secondary" className="text-[11px]">
                      {QUALITY_LABELS[key]}
                    </Badge>
                  ))}
                </div>
              )}
              {(paper.link || paper.doi) && (
                <a
                  href={paper.link ?? `https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  {paper.doi ? `doi:${paper.doi}` : "View publication"}
                </a>
              )}
            </li>
          );
  };



  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h3 className="font-medium text-lg">Per-publication scoring</h3>
        <span className="text-xs text-muted-foreground">
          Product score = highest level reached on each axis
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex rounded-md border p-0.5" role="group" aria-label="Publication view">
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <LayoutList className="h-3 w-3 mr-1" /> List
          </Button>
          <Button
            variant={view === "grouped" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs"
            aria-pressed={view === "grouped"}
            onClick={() => setView("grouped")}
          >
            <Rows3 className="h-3 w-3 mr-1" /> Group by level
          </Button>
        </div>
        {exportBar}
      </div>

      {coverageNote && (
        <p className="text-xs text-muted-foreground">{coverageNote}</p>
      )}


      <div className="rounded-lg border bg-muted/40 p-3 text-sm space-y-1">
        <div>
          <span className="font-medium">Computed:</span>{" "}
          {score.computedRigor ?? "—"} / {score.computedImpact ?? "—"}
          {score.rigorSource && (
            <span className="text-muted-foreground">
              {" "}
              · E set by {paperLabel(score.rigorSource)}
            </span>
          )}
          {score.impactSource && (
            <span className="text-muted-foreground">
              {" "}
              · I set by {paperLabel(score.impactSource)}
            </span>
          )}
        </div>
        {score.hasOverride && (
          <div className="flex items-start gap-2 text-amber-700 dark:text-amber-500">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              <span className="font-medium">Manual override</span> to{" "}
              {product.evidenceScoreOverride?.rigor ?? score.computedRigor ?? "—"} /{" "}
              {product.evidenceScoreOverride?.impact ?? score.computedImpact ?? "—"}
              {score.overrideReason ? ` — ${score.overrideReason}` : ""}
            </span>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {view === "list" && papers.map(renderPaper)}
        {view === "grouped" &&
          groups.map((g) => (
            <li key={g.key} className="space-y-2">
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="outline" className={`${getEvidenceRigorColor(g.rigor)} text-xs border`}>{g.rigor}</Badge>
                <span className="text-xs text-muted-foreground">×</span>
                <Badge variant="outline" className={`${getClinicalImpactColor(g.impact)} text-xs border`}>{g.impact}</Badge>
                <span className="text-xs text-muted-foreground">
                  {g.papers.length} publication{g.papers.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="space-y-2">{g.papers.map(renderPaper)}</ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default KeyPapersScoring;

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info } from "lucide-react";
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

// Regulatory clearances, vendor pages and press items cannot carry a per-paper
// score, so they are excluded from the coverage count.
const NON_PUBLICATION_TYPE =
  /regulatory|clearance|510|fda|ce mark|product|vendor|white paper|press|news|case study|brochure|landing|documentation/i;

const KeyPapersScoring = ({ product, category }: KeyPapersScoringProps) => {
  const papers = product.keyPapers ?? [];
  const evidence = product.evidence ?? [];
  const publicationCount = evidence.filter((e) => {
    const type = typeof e === "string" ? "" : e.type;
    return !!type && !NON_PUBLICATION_TYPE.test(type);
  }).length;


  const score = computeProductEvidenceScore(product, { category });
  const scored = score.scoredPaperCount;

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
      </div>
    );
  }


  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h3 className="font-medium text-lg">Per-publication scoring</h3>
        <span className="text-xs text-muted-foreground">
          Product score = highest level reached on each axis
        </span>
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
        {papers.map((paper, index) => {
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
        })}
      </ul>
    </div>
  );
};

export default KeyPapersScoring;

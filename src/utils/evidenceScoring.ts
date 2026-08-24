import type { ProductDetails } from "@/types/productDetails";
import type {
  EvidenceRigorCode,
  ClinicalImpactCode,
} from "@/data/evidence-impact-levels";

export type ScoredPaper = NonNullable<ProductDetails["keyPapers"]>[number];

export type ScoreOrigin = "papers" | "override" | "stored" | "none";

export interface ComputedEvidenceScore {
  /** Effective rigor after override precedence. */
  rigor?: EvidenceRigorCode;
  /** Effective impact after override precedence. */
  impact?: ClinicalImpactCode;
  /** Max across scored papers (before override). */
  computedRigor?: EvidenceRigorCode;
  computedImpact?: ClinicalImpactCode;
  rigorOrigin: ScoreOrigin;
  impactOrigin: ScoreOrigin;
  /** Paper that sets the computed maximum on each axis. */
  rigorSource?: ScoredPaper;
  impactSource?: ScoredPaper;
  /** Number of papers carrying at least one axis score. */
  scoredPaperCount: number;
  paperCount: number;
  hasOverride: boolean;
  overrideReason?: string;
  /** OR across scored papers, falling back to product-level flags. */
  qualityFlags: {
    vendorIndependent: boolean;
    multiCenter: boolean;
    multiNational: boolean;
    prospective: boolean;
    externalValidation: boolean;
  };
}

const RIGOR_ORDER: EvidenceRigorCode[] = ["E0", "E1", "E2", "E3"];
const IMPACT_ORDER: ClinicalImpactCode[] = ["I0", "I1", "I2", "I3", "I4", "I5"];

const rank = <T extends string>(order: T[], code?: T): number =>
  code ? order.indexOf(code) : -1;

/**
 * Compute the product-level E/I score from per-paper scores.
 * Each axis is maximised independently; a documented override wins when set;
 * stored product-level values are used when no paper carries a score.
 */
export function computeProductEvidenceScore(
  product: Pick<
    ProductDetails,
    | "keyPapers"
    | "evidenceRigor"
    | "clinicalImpact"
    | "evidenceScoreOverride"
    | "evidenceVendorIndependent"
    | "evidenceMultiCenter"
    | "evidenceMultiNational"
    | "evidenceProspective"
    | "evidenceExternalValidation"
  >,
  options?: { category?: string }
): ComputedEvidenceScore {
  const allPapers = product.keyPapers ?? [];
  const papers = options?.category
    ? allPapers.filter(
        (p) => !p.appliesToCategory || p.appliesToCategory === options.category
      )
    : allPapers;

  let rigorSource: ScoredPaper | undefined;
  let impactSource: ScoredPaper | undefined;
  let scoredPaperCount = 0;

  for (const paper of papers) {
    if (!paper.evidenceRigor && !paper.clinicalImpact) continue;
    scoredPaperCount += 1;
    if (
      rank(RIGOR_ORDER, paper.evidenceRigor) >
      rank(RIGOR_ORDER, rigorSource?.evidenceRigor)
    ) {
      rigorSource = paper;
    }
    if (
      rank(IMPACT_ORDER, paper.clinicalImpact) >
      rank(IMPACT_ORDER, impactSource?.clinicalImpact)
    ) {
      impactSource = paper;
    }
  }

  const computedRigor = rigorSource?.evidenceRigor;
  const computedImpact = impactSource?.clinicalImpact;
  const override = product.evidenceScoreOverride;

  const resolve = <T extends string>(
    computed: T | undefined,
    overridden: T | undefined,
    stored: T | undefined
  ): { value?: T; origin: ScoreOrigin } => {
    if (overridden) return { value: overridden, origin: "override" };
    if (computed) return { value: computed, origin: "papers" };
    if (stored) return { value: stored, origin: "stored" };
    return { value: undefined, origin: "none" };
  };

  const rigor = resolve(
    computedRigor,
    override?.rigor,
    product.evidenceRigor as EvidenceRigorCode | undefined
  );
  const impact = resolve(
    computedImpact,
    override?.impact,
    product.clinicalImpact as ClinicalImpactCode | undefined
  );

  const orFlag = (
    key: keyof Pick<
      ScoredPaper,
      | "vendorIndependent"
      | "multiCenter"
      | "multiNational"
      | "prospective"
      | "externalValidation"
    >,
    fallback?: boolean
  ) => papers.some((p) => p[key] === true) || fallback === true;

  return {
    rigor: rigor.value,
    impact: impact.value,
    computedRigor,
    computedImpact,
    rigorOrigin: rigor.origin,
    impactOrigin: impact.origin,
    rigorSource,
    impactSource,
    scoredPaperCount,
    paperCount: papers.length,
    hasOverride: !!(override?.rigor || override?.impact),
    overrideReason: override?.reason,
    qualityFlags: {
      vendorIndependent: orFlag(
        "vendorIndependent",
        product.evidenceVendorIndependent
      ),
      multiCenter: orFlag("multiCenter", product.evidenceMultiCenter),
      multiNational: orFlag("multiNational", product.evidenceMultiNational),
      prospective: orFlag("prospective", product.evidenceProspective),
      externalValidation: orFlag(
        "externalValidation",
        product.evidenceExternalValidation
      ),
    },
  };
}

/** Short label for a paper, used in "set by" captions. */
export function paperLabel(paper?: ScoredPaper): string {
  if (!paper) return "";
  const first = paper.authors?.split(/[,;]/)[0]?.trim();
  const stem = first ? `${first} et al.` : paper.title ?? "Unlabelled paper";
  return paper.year ? `${stem} (${paper.year})` : stem;
}

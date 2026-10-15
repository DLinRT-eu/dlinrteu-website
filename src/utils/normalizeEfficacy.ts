import type { ProductDetails } from "@/types/productDetails";
import { resolveEfficacyLevel } from "@/data/evidence-impact-levels";

interface ImpactCarrier {
  clinicalImpact?: string;
  legacyClinicalImpact?: string;
  efficacyProvisional?: boolean;
}

function normalizeCarrier<T extends ImpactCarrier>(item: T): T {
  const resolved = resolveEfficacyLevel(item.clinicalImpact);
  if (!resolved.provisional || !resolved.level) return item;
  return {
    ...item,
    clinicalImpact: resolved.level,
    legacyClinicalImpact: resolved.legacy,
    efficacyProvisional: true,
  };
}

/** Convert legacy L1t–L6 values on a product (and its papers) to provisional L-codes. */
export function normalizeProductEfficacy(product: ProductDetails): ProductDetails {
  const next = normalizeCarrier(product as ProductDetails & ImpactCarrier) as ProductDetails;
  if (product.keyPapers) {
    next.keyPapers = product.keyPapers.map((p) => normalizeCarrier(p)) as ProductDetails["keyPapers"];
  }
  if (product.evidenceScoreOverride?.impact) {
    const r = resolveEfficacyLevel(product.evidenceScoreOverride.impact);
    if (r.level) next.evidenceScoreOverride = { ...product.evidenceScoreOverride, impact: r.level };
  }
  if (product.categoryEvidence) {
    const ce: NonNullable<ProductDetails["categoryEvidence"]> = {};
    for (const [k, v] of Object.entries(product.categoryEvidence)) {
      ce[k] = v ? normalizeCarrier(v) : v;
    }
    next.categoryEvidence = ce;
  }
  return next;
}

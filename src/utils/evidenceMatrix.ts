import type { ProductDetails } from "../types/productDetails";
import { ADOPTION_READINESS_LEVELS, EVIDENCE_RIGOR_LEVELS, EFFICACY_LEVELS } from "../data/evidence-impact-levels";
import { computeProductEvidenceScore, paperLabel } from "./evidenceScoring";
import { isDiscontinuedProduct } from './productLifecycle';

/** Shared assessed product set for the dashboard's two- and three-axis views. */
export function getEvidenceMatrixProducts(products: ProductDetails[]): ProductDetails[] {
  return products.flatMap((product) => {
    if (isDiscontinuedProduct(product)) return [];
    const score = computeProductEvidenceScore(product);
    if (!EVIDENCE_RIGOR_LEVELS.some((level) => level.level === score.rigor) ||
        !EFFICACY_LEVELS.some((level) => level.level === score.impact)) return [];
    const readiness = ADOPTION_READINESS_LEVELS.some((level) => level.level === product.adoptionReadiness)
      ? product.adoptionReadiness : undefined;
    return [{
      ...product,
      evidenceRigor: score.rigor,
      clinicalImpact: score.impact,
      efficacyProvisional: score.impactProvisional,
      adoptionReadiness: readiness,
      evidenceRigorNotes: score.rigorOrigin === "papers"
        ? `Set by ${paperLabel(score.rigorSource).replace(/et al\. et al\./g, "et al.")}` : score.rigorOrigin === "override"
          ? score.overrideReason : product.evidenceRigorNotes,
      clinicalImpactNotes: score.impactOrigin === "papers"
        ? `Set by ${paperLabel(score.impactSource).replace(/et al\. et al\./g, "et al.")}` : score.impactOrigin === "override"
          ? score.overrideReason : product.clinicalImpactNotes,
    }];
  });
}
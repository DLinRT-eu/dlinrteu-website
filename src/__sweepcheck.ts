import { AUTO_CONTOURING_PRODUCTS } from "@/data/products/auto-contouring";
import { computeProductEvidenceScore } from "@/utils/evidenceScoring";
for (const p of AUTO_CONTOURING_PRODUCTS) {
  const s = computeProductEvidenceScore(p);
  const drift = (s.computedRigor && s.computedRigor < (p.evidenceRigor as string)) || (s.computedImpact && s.computedImpact < (p.clinicalImpact as string));
  console.log([p.id, `stored ${p.evidenceRigor}/${p.clinicalImpact}`, `computed ${s.computedRigor ?? "-"}/${s.computedImpact ?? "-"}`, `papers ${s.scoredPaperCount}/${s.paperCount}`, drift ? "DOWNGRADE" : ""].join(" | "));
}

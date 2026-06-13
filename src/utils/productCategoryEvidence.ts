import type { ProductDetails } from "@/types/productDetails";

export type CategoryEvidenceBlock = NonNullable<
  ProductDetails["categoryEvidence"]
>[string];

/**
 * Ordered, deduped list of categories this product spans:
 * primary category first, then any `secondaryCategories`.
 */
export function getCategoriesForProduct(p: ProductDetails): string[] {
  const all = [p.category, ...(p.secondaryCategories ?? [])].filter(
    Boolean,
  ) as string[];
  return Array.from(new Set(all));
}

export function hasCategoryEvidence(p: ProductDetails): boolean {
  return !!p.categoryEvidence && Object.keys(p.categoryEvidence).length > 0;
}

/**
 * Return the product with the per-category evidence block (if any) merged
 * onto the top-level fields. Per-category values win; missing values fall
 * back to the top-level defaults. The original product is not mutated.
 */
export function resolveProductForCategory(
  p: ProductDetails,
  category: string,
): ProductDetails {
  const block = p.categoryEvidence?.[category];
  if (!block) return p;

  const merged: ProductDetails = { ...p };
  if (block.usesAI !== undefined) merged.usesAI = block.usesAI;
  if (block.trainingData !== undefined) merged.trainingData = block.trainingData;
  if (block.evaluationData !== undefined)
    merged.evaluationData = block.evaluationData;
  if (block.evidence !== undefined) merged.evidence = block.evidence;
  if (block.limitations !== undefined) merged.limitations = block.limitations;
  if (block.evidenceRigor !== undefined)
    merged.evidenceRigor = block.evidenceRigor;
  if (block.evidenceRigorNotes !== undefined)
    merged.evidenceRigorNotes = block.evidenceRigorNotes;
  if (block.clinicalImpact !== undefined)
    merged.clinicalImpact = block.clinicalImpact;
  if (block.clinicalImpactNotes !== undefined)
    merged.clinicalImpactNotes = block.clinicalImpactNotes;
  if (block.adoptionReadiness !== undefined)
    merged.adoptionReadiness = block.adoptionReadiness;
  if (block.adoptionReadinessNotes !== undefined)
    merged.adoptionReadinessNotes = block.adoptionReadinessNotes;
  return merged;
}

/** AI usage in the context of a specific category. */
export function productUsesAIInCategory(
  p: ProductDetails,
  category: string,
): boolean {
  const override = p.categoryEvidence?.[category]?.usesAI;
  if (override !== undefined) return override;
  if (p.usesAI !== undefined) return p.usesAI;
  return true;
}

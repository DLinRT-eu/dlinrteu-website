import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import type { ProductDetails } from "@/types/productDetails";
import {
  getCategoriesForProduct,
  hasCategoryEvidence,
  resolveProductForCategory,
  productUsesAIInCategory,
} from "@/utils/productCategoryEvidence";
import TrainingDataDetails from "./TrainingDataDetails";
import EvaluationDataDetails from "./EvaluationDataDetails";
import EvidenceLimitationsDetails from "./EvidenceLimitationsDetails";

interface Props {
  product: ProductDetails;
}

/**
 * For products that carry per-category evidence overrides, render the
 * Training / Evaluation / Evidence cards inside a tabbed view (one tab
 * per category). For single-category products or products without
 * `categoryEvidence`, fall back to the original stacked layout so the
 * UI is unchanged.
 */
const CategoryEvidenceSection = ({ product }: Props) => {
  const categories = useMemo(() => getCategoriesForProduct(product), [product]);
  const [active, setActive] = useState(categories[0] ?? "");

  if (!hasCategoryEvidence(product) || categories.length < 2) {
    return (
      <>
        <TrainingDataDetails product={product} />
        <EvaluationDataDetails product={product} />
        <EvidenceLimitationsDetails product={product} />
      </>
    );
  }

  const resolved = resolveProductForCategory(product, active);
  const usesAI = productUsesAIInCategory(product, active);
  const note = product.categoryEvidence?.[active]?.notes;

  return (
    <div className="space-y-4">
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="flex flex-wrap h-auto">
          {categories.map((c) => (
            <TabsTrigger key={c} value={c} className="text-sm">
              {c}
              {product.categoryEvidence?.[c]?.usesAI === false && (
                <Badge variant="outline" className="ml-2 text-[10px]">
                  non-AI
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((c) => (
          <TabsContent key={c} value={c} className="mt-4 space-y-6">
            {/* contextual banner */}
            {(note || product.categoryEvidence?.[c]?.usesAI === false) && (
              <div className="flex items-start gap-2 rounded-md border border-muted bg-muted/40 p-3 text-sm">
                <Info className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="font-medium">
                    {c} component
                    {product.categoryEvidence?.[c]?.usesAI === false
                      ? " — non-AI"
                      : ""}
                  </p>
                  {note && (
                    <p className="text-muted-foreground">{note}</p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Render the resolved cards for the active tab. They sit outside
          TabsContent so we don't re-mount them on every tab switch in a
          way that would lose Collapsible state. */}
      <TrainingDataDetails product={resolved} />
      <EvaluationDataDetails product={resolved} />
      <EvidenceLimitationsDetails product={resolved} />

      {!usesAI && (
        <p className="text-xs text-muted-foreground italic">
          This product component is not based on deep learning. Evidence above
          relates to the classical-algorithm implementation.
        </p>
      )}
    </div>
  );
};

export default CategoryEvidenceSection;

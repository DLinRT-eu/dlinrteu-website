/**
 * Bulk AID-RT export.
 *
 * Produces a single JSON file containing one AID-RT model card per product,
 * keyed by product id. For per-product AID-RT downloads see aidrtExporter.ts.
 */
import type { ProductDetails } from "@/types/productDetails";
import { convertToAidrt } from "@/utils/modelCard/aidrtExporter";

export function exportBulkProductsToAidrt(
  products: ProductDetails[],
  filename = "dlinrt-aidrt-cards"
): void {
  const cards = products.map((p) => ({
    product_id: p.id,
    product_name: p.name,
    aidrt_model_card: convertToAidrt(p),
  }));

  const payload = {
    generator: "DLinRT.eu",
    generated_at: new Date().toISOString(),
    schema:
      "https://github.com/MIRO-UCLouvain/RT-AI-Model-Card/blob/main/app/core/schemas/model_card_schema.json",
    note: "Fields set to 'NA' have no DLinRT equivalent — fill them using the AID-RT Streamlit tool at https://rt-modelcard.streamlit.app/",
    count: cards.length,
    cards,
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const safe = filename.endsWith(".json") ? filename : `${filename}.json`;
  a.href = url;
  a.download = safe;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

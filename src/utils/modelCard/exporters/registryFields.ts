import type { ProductDetails } from "@/types/productDetails";
import { getProductEudamed, formatEudamedRiskClass } from "@/utils/eudamed";
import { isDiscontinuedProduct } from "@/utils/productLifecycle";

export interface ExportField {
  label: string;
  value: string;
}

/** EUDAMED fields shown on the product page (curated or registry-verified); empty when none recorded. */
export const getEudamedExportFields = (product: ProductDetails): ExportField[] => {
  const e = getProductEudamed(product);
  if (!e) return [];
  const rows: ExportField[] = [
    { label: "EUDAMED Basic UDI-DI", value: e.basicUdi },
    { label: "EUDAMED UDI-DI", value: e.primaryDi ?? "" },
    { label: "EUDAMED EMDN Code", value: e.emdnCode ?? "" },
    { label: "EUDAMED Risk Class", value: formatEudamedRiskClass(e.riskClass) },
    { label: "EUDAMED Registered Trade Name", value: e.registeredTradeName ?? "" },
    { label: "EUDAMED Manufacturer", value: [e.manufacturerName, e.manufacturerSrn].filter(Boolean).join(" — ") },
    { label: "EUDAMED Registration Note", value: e.registrationNote ?? "" },
    { label: "EUDAMED Source", value: [e.sourceUrl, e.lastVerified && `verified ${e.lastVerified}`].filter(Boolean).join(" — ") },
  ];
  return rows.filter((r) => r.value);
};

/** Market lifecycle, module relationship and former names. */
export const getLifecycleExportFields = (product: ProductDetails): ExportField[] => {
  const rows: ExportField[] = [];
  const stage = isDiscontinuedProduct(product) ? "Discontinued" : product.developmentStage === "pipeline" ? "Pipeline (pre-market)" : "Active";
  rows.push({ label: "Market Status", value: stage });
  if (product.partOf) {
    const rel = product.partOf.relationship ? ` (${product.partOf.relationship})` : "";
    rows.push({ label: "Part Of", value: `${product.partOf.name}${product.partOf.version ? ` ${product.partOf.version}` : ""}${rel}` });
  }
  if (product.nameHistory?.length) {
    rows.push({ label: "Name History", value: product.nameHistory.map((n) => `${n.name}${n.version ? ` ${n.version}` : ""} (${n.function})`).join("; ") });
  }
  return rows;
};

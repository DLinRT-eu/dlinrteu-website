import type { ProductDetails } from "@/types/productDetails";
import type { EudamedDeviceRegistration } from "@/types/eudamed";
import udiVerified from "@/data/eudamed/udiVerified.json";
import { resolveExportEudamed, type EudamedExportResult } from "@/utils/eudamedExport";

/** "class-iia" → "Class IIa"; unknown shapes are returned unchanged. */
export const formatEudamedRiskClass = (raw?: string): string => {
  if (!raw) return "";
  const match = /^class-(i{1,3}|iia|iib)$/i.exec(raw.trim());
  if (!match) return raw;
  return `Class ${match[1].toUpperCase().replace(/A$/, "a").replace(/B$/, "b")}`;
};

const VERIFIED = (udiVerified as { products: Record<string, EudamedDeviceRegistration[]> }).products;

/** Exact-name EUDAMED Data Lake matches written by `scripts/verify-eudamed.ts`. */
export const getVerifiedUdiRecords = (productId?: string): EudamedDeviceRegistration[] =>
  (productId && VERIFIED[productId]) || [];

/**
 * Reads the curated EUDAMED block (tolerating the legacy string form of `regulatory.ce`),
 * enriched with — or falling back to — the verified Data Lake match for the product.
 */
export const getProductEudamed = (
  product?: Partial<ProductDetails> | null
): EudamedDeviceRegistration | undefined => {
  const verified = getVerifiedUdiRecords(product?.id);
  const ce = product?.regulatory?.ce;
  const curated = ce && typeof ce !== "string" ? ce.eudamed : undefined;
  if (!curated) return verified[0];
  const same = verified.find((v) => v.basicUdi === curated.basicUdi);
  return same ? { ...same, ...curated, emdnCode: curated.emdnCode ?? same.emdnCode, primaryDi: curated.primaryDi ?? same.primaryDi } : curated;
};

/** Date the verified registry file was last regenerated. */
export const EUDAMED_REGISTRY_SNAPSHOT_DATE: string = (udiVerified as { generatedOn?: string }).generatedOn ?? "";

/** Registry-first EUDAMED details for downloads (CSV, Excel, model cards). */
export const getExportEudamed = (product?: Partial<ProductDetails> | null): EudamedExportResult =>
  resolveExportEudamed(product, VERIFIED);

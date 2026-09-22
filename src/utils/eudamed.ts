import type { ProductDetails } from "@/types/productDetails";
import type { EudamedDeviceRegistration } from "@/types/eudamed";

/** "class-iia" → "Class IIa"; unknown shapes are returned unchanged. */
export const formatEudamedRiskClass = (raw?: string): string => {
  if (!raw) return "";
  const match = /^class-(i{1,3}|iia|iib)$/i.exec(raw.trim());
  if (!match) return raw;
  return `Class ${match[1].toUpperCase().replace(/A$/, "a").replace(/B$/, "b")}`;
};

/** Reads the EUDAMED device block, tolerating the legacy string form of `regulatory.ce`. */
export const getProductEudamed = (
  product?: Partial<ProductDetails> | null
): EudamedDeviceRegistration | undefined => {
  const ce = product?.regulatory?.ce;
  if (!ce || typeof ce === "string") return undefined;
  return ce.eudamed;
};

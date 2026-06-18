
import { ProductDetails } from "@/types/productDetails";

import { GE_PRODUCTS } from "./ge-healthcare";
import { AIRS_MEDICAL_PRODUCTS } from "./airs-medical";
import { SUBTLE_MEDICAL_PRODUCTS } from "./subtle-medical";
import { ALGOMEDICA_PRODUCTS } from "./algomedica";
import { CLARIPI_PRODUCTS } from "./claripi";

// NOTE: United Imaging previously had an entry here ("uCS-AI", id: united-ucs-ai)
// describing an AI CBCT-enhancement product for the uRT-linac radiotherapy system.
// Removed 2026-06-18: no such product name could be verified on any United Imaging /
// United Imaging Intelligence (UII) source (product pages, FDA 510(k) filings, ESTRO
// 2026 press materials, or the UII "AI Solutions for Healthcare" brochure). The
// uRT-linac 506c page explicitly describes its imaging chain as diagnostic FBCT (fan-beam
// CT), not CBCT, and lists no "uCS-AI" feature. "uCS" (United Compressed Sensing) is an
// MR-only brand (e.g. uMR 570/770 cardiac workflow) and is unrelated to CT/CBCT. The
// AI-assisted-compressed-sensing product the original entry may have intended
// ("uAIFI ACS") already has a correctly-scoped entry for MR under
// src/data/products/reconstruction/united-imaging.ts (id: united-uaifi-umr,
// name: "uAIFI on uMR"). See GitHub issue for full investigation notes.
export const IMAGE_ENHANCEMENT_PRODUCTS: ProductDetails[] = [
  ...GE_PRODUCTS,
  ...AIRS_MEDICAL_PRODUCTS,
  ...SUBTLE_MEDICAL_PRODUCTS,
  ...ALGOMEDICA_PRODUCTS,
  ...CLARIPI_PRODUCTS,
];

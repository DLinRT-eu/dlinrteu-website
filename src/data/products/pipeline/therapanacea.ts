import { ProductDetails } from "@/types/productDetails";

/**
 * Therapanacea currently has no pre-market (pipeline) products listed.
 * SmartPlan and BrachyBox were promoted to released products on 2026-07-30:
 *   - SmartPlan  -> src/data/products/treatment-planning/therapanacea.ts (FDA K253091, prostate)
 *   - BrachyBox  -> src/data/products/auto-contouring/therapanacea-brachybox.ts (ART-Plan v3.2.0 MRI Brachy model)
 */
export const THERAPANACEA_PIPELINE_PRODUCTS: ProductDetails[] = [];

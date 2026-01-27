// Archived products - not displayed on website
// These products are preserved for potential future use

import { ProductDetails } from "@/types/productDetails";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";
import { REFLEXION_PRODUCTS } from "./reflexion";

// NOT exported to main products - kept for reference only
export const ARCHIVED_PRODUCTS: ProductDetails[] = [
  ...LEO_CANCER_CARE_PRODUCTS,
  ...REFLEXION_PRODUCTS
];

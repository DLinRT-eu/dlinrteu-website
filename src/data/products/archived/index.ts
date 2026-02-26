// Archived products - not displayed on website
// These products are preserved for potential future use

import { ProductDetails } from "@/types/productDetails";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";
import { REFLEXION_PRODUCTS } from "./reflexion";
import { GE_ARCHIVED_PRODUCTS } from "./ge-healthcare";
import { VIEWRAY_ARCHIVED_PRODUCTS } from "./viewray";
import { AATMA_PRODUCTS } from "./aatma";
import { QOCA_PRODUCTS } from "./qoca";
import { MEDMIND_PRODUCTS } from "./medmind";

// NOT exported to main products - kept for reference only
export const ARCHIVED_PRODUCTS: ProductDetails[] = [
  ...LEO_CANCER_CARE_PRODUCTS,
  ...REFLEXION_PRODUCTS,
  ...GE_ARCHIVED_PRODUCTS,
  ...VIEWRAY_ARCHIVED_PRODUCTS,
  ...AATMA_PRODUCTS,
  ...QOCA_PRODUCTS,
  ...MEDMIND_PRODUCTS
];

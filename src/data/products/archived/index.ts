// Archived products - not displayed on website
// These products are preserved for potential future use

import { ProductDetails } from "@/types/productDetails";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";
import { REFLEXION_PRODUCTS } from "./reflexion";
import { GE_ARCHIVED_PRODUCTS } from "./ge-healthcare";
import { VIEWRAY_ARCHIVED_PRODUCTS } from "./viewray";
import { VARIAN_MOBIUS3D_ARCHIVED } from "./varian-mobius3d";
import { RADFORMATION_CLEARCHECK_ARCHIVED } from "./radformation-clearcheck";
import { SUN_NUCLEAR_SUNCHECK_ARCHIVED } from "./sun-nuclear-suncheck";
import { MEDLEVER_PLATFORM_ARCHIVED } from "./medlever-platform";
import { AATMA_PRODUCTS } from "./aatma";
import { QOCA_PRODUCTS } from "./qoca";

// NOT exported to main products - kept for reference only
export const ARCHIVED_PRODUCTS: ProductDetails[] = [
  ...LEO_CANCER_CARE_PRODUCTS,
  ...REFLEXION_PRODUCTS,
  ...GE_ARCHIVED_PRODUCTS,
  ...VIEWRAY_ARCHIVED_PRODUCTS,
  ...VARIAN_MOBIUS3D_ARCHIVED,
  ...RADFORMATION_CLEARCHECK_ARCHIVED,
  ...SUN_NUCLEAR_SUNCHECK_ARCHIVED,
  ...MEDLEVER_PLATFORM_ARCHIVED,
  ...AATMA_PRODUCTS,
  ...QOCA_PRODUCTS
];

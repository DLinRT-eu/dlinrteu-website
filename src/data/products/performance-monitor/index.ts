import { ProductDetails } from "@/types/productDetails";
import { PTW_PRODUCTS } from "./ptw";
import { MVISION_PERFORMANCE_PRODUCTS } from "./mvision";
import { SUN_NUCLEAR_PRODUCTS } from "./sun-nuclear";
import { RADFORMATION_PRODUCTS } from "./radformation";
import { VARIAN_MONITOR_PRODUCTS } from "./varian";

export const PERFORMANCE_MONITOR_PRODUCTS: ProductDetails[] = [
  ...PTW_PRODUCTS,
  ...MVISION_PERFORMANCE_PRODUCTS,
  ...SUN_NUCLEAR_PRODUCTS,
  ...RADFORMATION_PRODUCTS,
  ...VARIAN_MONITOR_PRODUCTS
];

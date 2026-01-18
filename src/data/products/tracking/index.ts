import { ProductDetails } from "@/types/productDetails";
import { ACCURAY_PRODUCTS } from "./accuray";
import { REFLEXION_PRODUCTS } from "./reflexion";
import { LEO_CANCER_CARE_PRODUCTS } from "./leo-cancer-care";

export const TRACKING_PRODUCTS: ProductDetails[] = [
  ...ACCURAY_PRODUCTS,
  ...REFLEXION_PRODUCTS,
  ...LEO_CANCER_CARE_PRODUCTS
];
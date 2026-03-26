
import { ProductDetails } from "@/types/productDetails";
import { MVISION_PLATFORM_PRODUCTS } from "./mvision";
import { GE_HEALTHCARE_PLATFORM_PRODUCTS } from "./ge-healthcare";

export const PLATFORM_PRODUCTS: ProductDetails[] = [
  ...MVISION_PLATFORM_PRODUCTS,
  ...GE_HEALTHCARE_PLATFORM_PRODUCTS
];


import { ProductDetails } from "@/types/productDetails";
import { MVISION_PLATFORM_PRODUCTS } from "./mvision";
import { GE_HEALTHCARE_PLATFORM_PRODUCTS } from "./ge-healthcare";
import { MANTEIA_LEARNING_PRODUCTS } from "./manteia-acculearning";

export const PLATFORM_PRODUCTS: ProductDetails[] = [
  ...MVISION_PLATFORM_PRODUCTS,
  ...GE_HEALTHCARE_PLATFORM_PRODUCTS,
  ...MANTEIA_LEARNING_PRODUCTS
];

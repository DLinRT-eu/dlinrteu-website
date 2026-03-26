import { ProductDetails } from "@/types/productDetails";
import { THERAPANACEA_PIPELINE_PRODUCTS } from "./therapanacea";
import { MEDLEVER_PIPELINE_PRODUCTS } from "./medlever";

// Combine all pipeline products
export const PIPELINE_PRODUCTS: ProductDetails[] = [
  ...THERAPANACEA_PIPELINE_PRODUCTS,
  ...MEDLEVER_PIPELINE_PRODUCTS
];

export {
  THERAPANACEA_PIPELINE_PRODUCTS,
  MEDLEVER_PIPELINE_PRODUCTS
};

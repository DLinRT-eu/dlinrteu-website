import { ProductDetails } from "@/types/productDetails";
import { PYMEDIX_PRODUCTS } from "./pymedix";
import { THERAPANACEA_SMARTFUSE_PRODUCTS } from "./therapanacea";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  ...PYMEDIX_PRODUCTS,
  ...THERAPANACEA_SMARTFUSE_PRODUCTS
];

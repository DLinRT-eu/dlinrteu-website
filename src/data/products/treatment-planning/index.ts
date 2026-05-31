import { ProductDetails } from "@/types/productDetails";
import { RAYSEARCH_PLANNING_PRODUCTS } from "./raysearch-planning";
import { MANTEIA_MOZI_PRODUCTS } from "./manteia-mozi";
import { SUN_NUCLEAR_PRODUCTS } from "./sun-nuclear";
import { MD_ANDERSON_PRODUCTS } from "./md-anderson";
import { UNITED_IMAGING_PRODUCTS } from "./united-imaging";
import { MVISION_PLANNING_PRODUCTS } from "./mvision";
import { WISDOM_TECH_PLANNING_PRODUCTS } from "./wisdom-tech";

export const TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
  ...RAYSEARCH_PLANNING_PRODUCTS,
  ...MANTEIA_MOZI_PRODUCTS,
  ...SUN_NUCLEAR_PRODUCTS,
  ...MD_ANDERSON_PRODUCTS,
  ...UNITED_IMAGING_PRODUCTS,
  ...MVISION_PLANNING_PRODUCTS,
  ...WISDOM_TECH_PLANNING_PRODUCTS
];

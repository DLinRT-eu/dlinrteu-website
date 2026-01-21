import { ProductDetails } from "@/types/productDetails";

/**
 * Determines if a product uses AI/Deep Learning technology.
 * Returns true if usesAI is not explicitly set to false.
 * Most products are assumed to use AI unless explicitly marked otherwise.
 */
export const productUsesAI = (product: ProductDetails): boolean => {
  return product.usesAI !== false;
};

/**
 * Counts products by their AI status.
 * @returns Object with aiCount (AI-powered), nonAICount (QA tools), and total
 */
export const countProductsByAI = (products: ProductDetails[]) => {
  const aiProducts = products.filter(p => productUsesAI(p));
  const nonAIProducts = products.filter(p => !productUsesAI(p));
  
  return {
    aiCount: aiProducts.length,
    nonAICount: nonAIProducts.length,
    total: products.length
  };
};

/**
 * Filters products to only those using AI
 */
export const getAIProducts = (products: ProductDetails[]): ProductDetails[] => {
  return products.filter(p => productUsesAI(p));
};

/**
 * Filters products to only QA/monitoring tools (non-AI)
 */
export const getNonAIProducts = (products: ProductDetails[]): ProductDetails[] => {
  return products.filter(p => !productUsesAI(p));
};

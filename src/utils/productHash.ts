import { ProductDetails } from "@/types/productDetails";

/**
 * Calculate a content hash for a product, excluding temporal fields like lastRevised.
 * This hash is used to determine if product content has actually changed,
 * allowing certifications to remain valid when only lastRevised is updated.
 * 
 * @param product - The product to hash
 * @returns SHA-256 hash of the product content
 */
export async function calculateProductContentHash(product: ProductDetails): Promise<string> {
  // Create a copy of the product with excluded fields removed
  const {
    lastRevised,
    lastUpdated,
    companyRevisionDate,
    lastVerified,
    ...contentToHash
  } = product;

  // Sort keys to ensure consistent hashing
  const sortedContent = sortObjectKeys(contentToHash);
  
  // Convert to JSON string
  const contentString = JSON.stringify(sortedContent);
  
  // Calculate SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(contentString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Recursively sort object keys to ensure consistent hashing
 */
function sortObjectKeys(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  
  if (typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = sortObjectKeys(obj[key]);
        return sorted;
      }, {});
  }
  
  return obj;
}

/**
 * Check if two products have the same content hash
 * (excluding temporal fields like lastRevised)
 */
export async function hasProductContentChanged(
  product: ProductDetails,
  storedHash: string
): Promise<boolean> {
  const currentHash = await calculateProductContentHash(product);
  return currentHash !== storedHash;
}

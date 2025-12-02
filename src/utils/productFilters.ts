import { ProductDetails } from "@/types/productDetails";
import { CERTIFICATION_TAGS, CERTIFICATION_MAPPING } from "@/config/tags";
import { getStandardizedCertificationTags as getRegulatoryCertificationTags } from "@/utils/regulatoryUtils";

/**
 * Checks if a product is in pending/investigational status
 */
export const isInvestigationalProduct = (product: ProductDetails): boolean => {
  const cert = product.certification?.toLowerCase() || '';
  
  // Check certification field
  if (cert.includes('pending') || cert.includes('investigation')) {
    return true;
  }
  
  // Check regulatory status for pending/investigation
  const ceStatus = product.regulatory?.ce?.status?.toLowerCase() || '';
  const fdaStatus = typeof product.regulatory?.fda === 'string' 
    ? product.regulatory.fda.toLowerCase()
    : product.regulatory?.fda?.status?.toLowerCase() || '';
  
  const pendingKeywords = ['pending', 'investigation', 'not yet', 'under review', 'clinical testing'];
  
  if (pendingKeywords.some(kw => ceStatus.includes(kw) || fdaStatus.includes(kw))) {
    // Only mark as investigational if BOTH are pending/not certified
    const hasCE = hasActualCEApproval(product);
    const hasFDA = hasActualFDAApproval(product);
    return !hasCE && !hasFDA;
  }
  
  return false;
};

/**
 * Checks if a product has actual FDA clearance/approval
 */
const hasActualFDAApproval = (product: ProductDetails): boolean => {
  const fdaInfo = product.regulatory?.fda;
  if (!fdaInfo) return false;
  
  const status = typeof fdaInfo === 'string' ? fdaInfo : fdaInfo.status || '';
  const lowerStatus = status.toLowerCase();
  
  const positiveStatuses = ['cleared', 'approved', '510(k) cleared'];
  const negativeStatuses = ['pending', 'not yet', 'investigation', 'under review'];
  
  if (negativeStatuses.some(neg => lowerStatus.includes(neg))) {
    return false;
  }
  
  return positiveStatuses.some(pos => lowerStatus.includes(pos)) || 
         product.certification?.toLowerCase().includes('fda');
};

/**
 * Checks if a product has actual CE mark approval
 */
const hasActualCEApproval = (product: ProductDetails): boolean => {
  const ceInfo = product.regulatory?.ce;
  if (!ceInfo) return product.certification?.toLowerCase().includes('ce') || false;
  
  const status = ceInfo.status?.toLowerCase() || '';
  const positiveStatuses = ['certified', 'approved', 'ce marked', 'cleared'];
  const negativeStatuses = ['pending', 'not yet', 'investigation', 'under review'];
  
  if (negativeStatuses.some(neg => status.includes(neg))) {
    return false;
  }
  
  return positiveStatuses.some(pos => status.includes(pos)) ||
         product.certification?.toLowerCase().includes('ce');
};

/**
 * Checks if a product has CE or FDA regulatory approval
 * @param includeInvestigational - If true, also returns true for pending/investigational products
 */
export const hasRegulatoryApproval = (product: ProductDetails, includeInvestigational: boolean = true): boolean => {
  // Check for FDA clearance/approval
  const hasFDA = hasActualFDAApproval(product);
  
  // Check for CE mark approval
  const hasCE = hasActualCEApproval(product);
                
  // Check for MDR exempt status
  const hasMDRExempt = product.certification === 'MDR exempt';
  
  // Check for investigational status if enabled
  const isInvestigational = includeInvestigational && isInvestigationalProduct(product);
  
  return hasFDA || hasCE || hasMDRExempt || isInvestigational;
};

/**
 * Checks if a product contains deep learning keywords in its description or features
 */
export const containsDeepLearningKeywords = (product: ProductDetails): boolean => {
  const descriptionLower = product.description.toLowerCase();
  const featuresLower = product.features.map(f => f.toLowerCase());
  
  const dlKeywords = [
    'artificial intelligence', 'deep learning', ' ai ', 'ai-', '-ai ', 'ai.', 'neural', 
    'machine learning', 'ai-powered', 'ai powered', 'dl ', 'dl-', '-dl ', 'dl.'
  ];
  
  // Check in description
  if (dlKeywords.some(keyword => descriptionLower.includes(keyword))) {
    return true;
  }
  
  // Check in features
  if (featuresLower.some(feature => 
    dlKeywords.some(keyword => feature.includes(keyword))
  )) {
    return true;
  }
  
  // Check in key features
  if (product.keyFeatures && product.keyFeatures.some(kf => 
    dlKeywords.some(keyword => kf.toLowerCase().includes(keyword))
  )) {
    return true;
  }
  
  // Special case for Image Synthesis category - these are all DL-based
  if (product.category === "Image Synthesis") {
    return true;
  }
  
  return false;
};

/**
 * Normalizes anatomical locations (standardizes Head/Neck references, removes problematic locations)
 */
export const normalizeAnatomicalLocations = (locations: string[]): string[] => {
  return locations.map(location => {
    // Merge "Head" or "Neck" into "Head & Neck"
    if (location === "Head" || location === "Neck") {
      return "Head & Neck";
    }
    // Filter out "Musculoskeletal" and "Spine"
    if (location === "Musculoskeletal") {
      return ""; // Remove Musculoskeletal
    }
    return location;
  }).filter(Boolean); // Remove empty strings
};

/**
 * Standardizes certification names to prevent duplicates
 */
export const standardizeCertification = (certification: string): string => {
  // Normalize certifications to merge variations
  const cert = certification.toLowerCase().trim();
  
  // Handle pending/investigation status first
  if (cert.includes('pending') || cert.includes('investigation')) {
    return 'pending';
  }
  
  // Handle combined certifications first
  if (cert.includes('ce') && cert.includes('fda')) {
    return 'ce & fda';
  }
  
  // Handle individual certifications
  if (cert.includes('ce')) {
    return 'ce';
  }
  if (cert.includes('fda')) {
    return 'fda';
  }
  if (cert === 'mdr exempt') {
    return 'mdr exempt';
  }
  if (cert === 'nmpa') {
    return 'nmpa';
  }
  
  return cert;
};

/**
 * Gets standardized certification tags from a product
 * Delegates to regulatoryUtils for consistency
 */
export const getStandardizedCertificationTags = (product: ProductDetails): string[] => {
  return getRegulatoryCertificationTags(product);
};

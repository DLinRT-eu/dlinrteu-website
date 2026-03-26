import { ProductDetails } from '@/types/productDetails';

export interface StructureInfo {
  originalName: string;
  normalizedName: string;
  region: string;
  modality: string;
}

export interface StructureRow {
  structureName: string;
  normalizedName: string;
  region: string;
  modality: string;
  availability: Record<string, boolean>;
  isUnique: boolean;
  uniqueToProductId?: string;
  supportedByCount: number;
}

export interface StructureComparisonResult {
  allStructures: StructureRow[];
  commonStructures: string[];
  uniqueStructures: Record<string, string[]>;
  productStats: Record<string, {
    total: number;
    unique: number;
    common: number;
  }>;
  regions: string[];
  modalities: string[];
}

/**
 * Known anatomical regions for categorization
 */
const KNOWN_REGIONS = [
  'Brain',
  'Head and Neck',
  'Head & Neck',
  'H&N',
  'Thorax',
  'Breast',
  'Abdomen',
  'Pelvis',
  'Male Pelvis',
  'Female Pelvis',
  'Gynecological',
  'Prostate',
  'Extremities',
  'Spine',
  'Whole Body',
] as const;

/**
 * Region prefix patterns to extract from structure names
 */
const REGION_PREFIXES = [
  /^Brain[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Head\s*(?:and|&)\s*Neck[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^H&N[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Thorax[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Breast[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Abdomen[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Pelvis[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Male\s*Pelvis[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^Female\s*Pelvis[-\s]*(?:CT|MR|MRI)?:\s*/i,
  /^(?:CT|MR|MRI)[-\s]*(?:Brain|Head|Thorax|Abdomen|Pelvis)?:\s*/i,
];

/**
 * Modality patterns
 */
const MODALITY_PATTERNS = {
  CT: /[-\s]CT(?:[-:\s]|$)|^CT[-:\s]/i,
  MR: /[-\s]MR(?:I)?(?:[-:\s]|$)|^MR(?:I)?[-:\s]/i,
};

/**
 * Extract region from structure name
 */
function extractRegion(structureName: string): string {
  const upperName = structureName.toUpperCase();
  
  // Check for explicit region prefixes
  if (upperName.includes('BRAIN') || upperName.startsWith('BRAIN')) return 'Brain';
  if (upperName.includes('HEAD') || upperName.includes('H&N') || upperName.includes('NECK')) return 'Head and Neck';
  if (upperName.includes('THORAX') || upperName.includes('LUNG') || upperName.includes('HEART')) return 'Thorax';
  if (upperName.includes('BREAST')) return 'Breast';
  if (upperName.includes('ABDOMEN') || upperName.includes('LIVER') || upperName.includes('KIDNEY') || upperName.includes('SPLEEN')) return 'Abdomen';
  if (upperName.includes('PELVIS') || upperName.includes('PROSTATE') || upperName.includes('BLADDER') || upperName.includes('RECTUM')) return 'Pelvis';
  if (upperName.includes('GYN') || upperName.includes('UTERUS') || upperName.includes('OVARY')) return 'Gynecological';
  
  return 'Other';
}

/**
 * Extract modality from structure name
 */
function extractModality(structureName: string): string {
  if (MODALITY_PATTERNS.CT.test(structureName)) return 'CT';
  if (MODALITY_PATTERNS.MR.test(structureName)) return 'MR';
  return 'Unknown';
}

/**
 * Normalize structure name for comparison
 * Removes region/modality prefixes and standardizes naming
 */
export function normalizeStructureName(structureName: string): string {
  let normalized = structureName.trim();
  
  // Remove known region/modality prefixes
  for (const pattern of REGION_PREFIXES) {
    normalized = normalized.replace(pattern, '');
  }
  
  // Standardize common variations
  normalized = normalized
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[-\s]*(L|R|Left|Right)$/i, (match) => ` ${match.trim().toUpperCase()}`)
    .replace(/\s*(Left|Right)\s*/gi, (match) => match.trim().charAt(0).toUpperCase())
    .trim();
  
  return normalized;
}

/**
 * Parse structure info from a structure name string
 */
export function parseStructureInfo(structureName: string): StructureInfo {
  return {
    originalName: structureName,
    normalizedName: normalizeStructureName(structureName),
    region: extractRegion(structureName),
    modality: extractModality(structureName),
  };
}

/**
 * Get all structures from a product as strings
 */
function getProductStructures(product: ProductDetails): string[] {
  if (!product.supportedStructures) return [];
  
  if (Array.isArray(product.supportedStructures)) {
    return product.supportedStructures.map(s => {
      if (typeof s === 'string') return s;
      return (s as { name: string }).name || '';
    }).filter(Boolean);
  }
  
  return [];
}

/**
 * Compare structures across multiple products
 */
export function compareStructures(products: ProductDetails[]): StructureComparisonResult {
  // Build a map of normalized name -> original names per product
  const structureMap = new Map<string, {
    info: StructureInfo;
    productAvailability: Record<string, string>; // productId -> original name
  }>();
  
  const productStructureSets: Record<string, Set<string>> = {};
  
  // Process each product
  products.forEach(product => {
    const structures = getProductStructures(product);
    productStructureSets[product.id] = new Set();
    
    structures.forEach(structureName => {
      const info = parseStructureInfo(structureName);
      const key = info.normalizedName.toLowerCase();
      
      productStructureSets[product.id].add(key);
      
      if (!structureMap.has(key)) {
        structureMap.set(key, {
          info,
          productAvailability: {},
        });
      }
      
      structureMap.get(key)!.productAvailability[product.id] = structureName;
    });
  });
  
  // Build the result
  const allStructures: StructureRow[] = [];
  const commonStructures: string[] = [];
  const uniqueStructures: Record<string, string[]> = {};
  const regions = new Set<string>();
  const modalities = new Set<string>();
  
  // Initialize unique structures map
  products.forEach(p => {
    uniqueStructures[p.id] = [];
  });
  
  // Process each structure
  structureMap.forEach((data, key) => {
    const supportingProducts = Object.keys(data.productAvailability);
    const supportedByCount = supportingProducts.length;
    const isUnique = supportedByCount === 1;
    const uniqueToProductId = isUnique ? supportingProducts[0] : undefined;
    
    // Track unique structures
    if (isUnique && uniqueToProductId) {
      uniqueStructures[uniqueToProductId].push(data.info.normalizedName);
    }
    
    // Track common structures (available in all products)
    if (supportedByCount === products.length) {
      commonStructures.push(data.info.normalizedName);
    }
    
    // Build availability map
    const availability: Record<string, boolean> = {};
    products.forEach(p => {
      availability[p.id] = p.id in data.productAvailability;
    });
    
    regions.add(data.info.region);
    modalities.add(data.info.modality);
    
    allStructures.push({
      structureName: data.info.normalizedName,
      normalizedName: key,
      region: data.info.region,
      modality: data.info.modality,
      availability,
      isUnique,
      uniqueToProductId,
      supportedByCount,
    });
  });
  
  // Sort structures by name
  allStructures.sort((a, b) => a.structureName.localeCompare(b.structureName));
  
  // Calculate stats per product
  const productStats: Record<string, { total: number; unique: number; common: number }> = {};
  products.forEach(product => {
    const productStructureCount = productStructureSets[product.id].size;
    productStats[product.id] = {
      total: productStructureCount,
      unique: uniqueStructures[product.id].length,
      common: commonStructures.filter(s => 
        productStructureSets[product.id].has(s.toLowerCase())
      ).length,
    };
  });
  
  return {
    allStructures,
    commonStructures,
    uniqueStructures,
    productStats,
    regions: Array.from(regions).sort(),
    modalities: Array.from(modalities).filter(m => m !== 'Unknown').sort(),
  };
}

/**
 * Filter structures by criteria
 */
export function filterStructures(
  structures: StructureRow[],
  filters: {
    region?: string;
    modality?: string;
    showOnly?: 'all' | 'unique' | 'common';
    searchTerm?: string;
    productCount?: number;
  },
  productCount: number
): StructureRow[] {
  return structures.filter(structure => {
    // Filter by region
    if (filters.region && filters.region !== 'all' && structure.region !== filters.region) {
      return false;
    }
    
    // Filter by modality
    if (filters.modality && filters.modality !== 'all' && structure.modality !== filters.modality) {
      return false;
    }
    
    // Filter by uniqueness
    if (filters.showOnly === 'unique' && !structure.isUnique) {
      return false;
    }
    if (filters.showOnly === 'common' && structure.supportedByCount !== productCount) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      if (!structure.structureName.toLowerCase().includes(term)) {
        return false;
      }
    }
    
    return true;
  });
}

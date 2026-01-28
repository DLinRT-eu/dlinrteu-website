import { useMemo } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { VALIDATION_RULES, FieldValidationRule } from '@/utils/fieldValidationHelper';

export type ValidationSeverity = 'low' | 'medium' | 'high';
export type ValidationStatus = 'valid' | 'warning' | 'error';

export interface FieldValidationResult {
  fieldName: string;
  fieldPath: string;
  status: ValidationStatus;
  severity: ValidationSeverity;
  message: string;
}

export interface ProductValidationResult {
  isValid: boolean;
  errorCount: number;
  warningCount: number;
  validCount: number;
  totalChecks: number;
  results: FieldValidationResult[];
  getFieldStatus: (fieldPath: string) => FieldValidationResult | undefined;
}

// Map field names to their dot-notation paths for matching
const FIELD_PATH_MAP: Record<string, string[]> = {
  'Name': ['name'],
  'Company': ['company'],
  'Category': ['category'],
  'Description': ['description'],
  'Version': ['version'],
  'Release Date': ['releaseDate'],
  'Website': ['website', 'productUrl'],
  'Modality': ['modality'],
  'Anatomy': ['anatomicalLocation', 'anatomy'],
  'Features': ['features', 'keyFeatures'],
  'Technical Specifications': ['technicalSpecifications', 'technicalSpecs'],
  'Regulatory Information': ['regulatory', 'regulatoryInfo'],
  'Intended Use Statement': ['regulatory.intendedUseStatement'],
  'Certification Consistency': ['certification', 'regulatory'],
  'Market Information': ['market', 'marketInfo'],
  'Evidence': ['evidence'],
  'Supported Structures': ['supportedStructures'],
  'Guidelines Reference': ['guidelines'],
  'Limitations': ['limitations'],
  'Last Updated': ['lastUpdated'],
  'Last Revised': ['lastRevised'],
  'Company URL': ['companyUrl']
};

export function useProductValidation(product: ProductDetails | null): ProductValidationResult {
  return useMemo(() => {
    if (!product) {
      return {
        isValid: true,
        errorCount: 0,
        warningCount: 0,
        validCount: 0,
        totalChecks: 0,
        results: [],
        getFieldStatus: () => undefined
      };
    }

    const results: FieldValidationResult[] = [];
    let errorCount = 0;
    let warningCount = 0;
    let validCount = 0;

    VALIDATION_RULES.forEach((rule: FieldValidationRule) => {
      const isValid = rule.checkFunction(product);
      const paths = FIELD_PATH_MAP[rule.fieldName] || [rule.fieldName.toLowerCase()];
      
      let status: ValidationStatus;
      if (isValid) {
        status = 'valid';
        validCount++;
      } else if (rule.severity === 'high') {
        status = 'error';
        errorCount++;
      } else {
        status = 'warning';
        warningCount++;
      }

      // Create a result for each possible path
      paths.forEach(path => {
        results.push({
          fieldName: rule.fieldName,
          fieldPath: path,
          status,
          severity: rule.severity,
          message: isValid ? rule.successMessage : rule.failureMessage
        });
      });
    });

    const getFieldStatus = (fieldPath: string): FieldValidationResult | undefined => {
      // Direct match
      const direct = results.find(r => r.fieldPath === fieldPath);
      if (direct) return direct;
      
      // Check if this is a nested field
      const parentPath = fieldPath.split('.')[0];
      return results.find(r => r.fieldPath === parentPath);
    };

    return {
      isValid: errorCount === 0,
      errorCount,
      warningCount,
      validCount,
      totalChecks: VALIDATION_RULES.length,
      results,
      getFieldStatus
    };
  }, [product]);
}

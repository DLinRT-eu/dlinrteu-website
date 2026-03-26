/**
 * FHIR Export Utility
 * 
 * Main export functions for generating and downloading FHIR bundles.
 */

import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import type { FHIRBundle, FHIRExportOptions, FHIRExportResult } from "./types";
import { createFHIRBundle, createExportSummary } from "./transformers/bundle";

/**
 * Export products and companies to a FHIR Bundle
 * 
 * @param products - Array of products to export
 * @param companies - Array of companies to export
 * @param options - Export options
 * @returns FHIR Bundle with warnings and statistics
 */
export function exportToFHIR(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options?: FHIRExportOptions
): FHIRExportResult {
  return createFHIRBundle(products, companies, options || {});
}

/**
 * Download a FHIR Bundle as a JSON file
 * 
 * @param products - Array of products to export
 * @param companies - Array of companies to export
 * @param options - Export options
 */
export function downloadFHIRBundle(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options?: FHIRExportOptions
): void {
  const { prettyPrint = true, ...restOptions } = options || {};
  
  const result = exportToFHIR(products, companies, restOptions);
  
  // Log summary to console
  console.log(createExportSummary(result));
  
  // Convert to JSON
  const jsonContent = prettyPrint 
    ? JSON.stringify(result.bundle, null, 2)
    : JSON.stringify(result.bundle);
  
  // Create and download file
  const blob = new Blob([jsonContent], { type: 'application/fhir+json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const timestamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `dlinrt-fhir-export-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download a FHIR Bundle with detailed warnings report
 * 
 * @param products - Array of products to export
 * @param companies - Array of companies to export
 * @param options - Export options
 * @returns Export result with warnings
 */
export function downloadFHIRBundleWithReport(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options?: FHIRExportOptions
): FHIRExportResult {
  const result = exportToFHIR(products, companies, options);
  
  // Download the bundle
  const { prettyPrint = true } = options || {};
  const jsonContent = prettyPrint 
    ? JSON.stringify(result.bundle, null, 2)
    : JSON.stringify(result.bundle);
  
  const blob = new Blob([jsonContent], { type: 'application/fhir+json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const timestamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `dlinrt-fhir-export-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Also download warnings report if there are warnings
  if (result.warnings.length > 0) {
    downloadWarningsReport(result, timestamp);
  }
  
  return result;
}

/**
 * Download warnings as a separate report file
 */
function downloadWarningsReport(result: FHIRExportResult, timestamp: string): void {
  const report = {
    exportDate: timestamp,
    summary: result.statistics,
    warnings: result.warnings.map(w => ({
      product: w.resourceId,
      field: w.field,
      message: w.message,
      value: w.originalValue
    }))
  };
  
  const jsonContent = JSON.stringify(report, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `dlinrt-fhir-warnings-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validate a FHIR Bundle structure
 * 
 * Basic validation - for full validation, use https://validator.fhir.org/
 * 
 * @param bundle - FHIR Bundle to validate
 * @returns Validation result
 */
export function validateFHIRBundle(bundle: FHIRBundle): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required Bundle properties
  if (bundle.resourceType !== 'Bundle') {
    errors.push('Invalid resourceType: must be "Bundle"');
  }
  
  if (!bundle.id) {
    errors.push('Missing required property: id');
  }
  
  if (!bundle.type) {
    errors.push('Missing required property: type');
  }
  
  // Check entries
  if (bundle.entry) {
    for (let i = 0; i < bundle.entry.length; i++) {
      const entry = bundle.entry[i];
      
      if (!entry.resource) {
        errors.push(`Entry ${i}: missing resource`);
        continue;
      }
      
      const resource = entry.resource;
      
      if (!resource.resourceType) {
        errors.push(`Entry ${i}: resource missing resourceType`);
      }
      
      if (!resource.id) {
        errors.push(`Entry ${i}: resource missing id`);
      }
      
      // Validate DeviceDefinition
      if (resource.resourceType === 'DeviceDefinition') {
        if (!('deviceName' in resource) || !resource.deviceName?.length) {
          errors.push(`Entry ${i} (${resource.id}): DeviceDefinition should have at least one deviceName`);
        }
      }
      
      // Validate Organization
      if (resource.resourceType === 'Organization') {
        if (!('name' in resource) || !resource.name) {
          errors.push(`Entry ${i} (${resource.id}): Organization missing required name`);
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get FHIR export statistics without downloading
 * 
 * @param products - Array of products
 * @param companies - Array of companies
 * @returns Export statistics and warnings
 */
export function getFHIRExportPreview(
  products: ProductDetails[],
  companies: CompanyDetails[]
): { statistics: FHIRExportResult['statistics']; warningCount: number } {
  const result = exportToFHIR(products, companies, { includeOrganizations: true });
  
  return {
    statistics: result.statistics,
    warningCount: result.warnings.length
  };
}

/**
 * Download a FHIR Bundle for a single product
 * 
 * @param product - Product to export
 * @param company - Optional company to include
 * @param options - Export options
 */
export function downloadProductFHIRBundle(
  product: ProductDetails,
  company?: CompanyDetails,
  options?: FHIRExportOptions & { includeWarningsReport?: boolean }
): void {
  const { includeWarningsReport = false, ...restOptions } = options || {};
  
  const companies = company ? [company] : [];
  
  if (includeWarningsReport) {
    downloadFHIRBundleWithReport([product], companies, {
      includeOrganizations: true,
      ...restOptions
    });
  } else {
    downloadFHIRBundle([product], companies, {
      includeOrganizations: true,
      ...restOptions
    });
  }
}

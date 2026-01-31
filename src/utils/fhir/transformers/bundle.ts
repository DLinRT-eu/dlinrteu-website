/**
 * FHIR Bundle Generator
 * 
 * Creates FHIR Bundle resources containing DeviceDefinition and Organization resources.
 */

import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import type {
  FHIRBundle,
  FHIRBundleEntry,
  FHIRDeviceDefinition,
  FHIROrganization,
  FHIRExportOptions,
  FHIRExportResult,
  FHIRValidationWarning
} from "../types";
import { transformProductsToDeviceDefinitions } from "./deviceDefinition";
import { transformCompaniesToOrganizations, createCompanyMap } from "./organization";

const DLINRT_SYSTEM = "https://dlinrt.eu";

/**
 * Create a FHIR Bundle containing all products and companies
 */
export function createFHIRBundle(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options: FHIRExportOptions = {}
): FHIRExportResult {
  const {
    includeOrganizations = true,
    baseUrl = DLINRT_SYSTEM
  } = options;

  const allWarnings: FHIRValidationWarning[] = [];
  const entries: FHIRBundleEntry[] = [];

  // Transform companies to Organizations
  let organizations: FHIROrganization[] = [];
  let companyMap: Map<string, { id: string; name: string }> | undefined;

  if (includeOrganizations && companies.length > 0) {
    organizations = transformCompaniesToOrganizations(companies);
    companyMap = createCompanyMap(companies);

    // Add Organization entries first (they are referenced by DeviceDefinitions)
    for (const org of organizations) {
      entries.push({
        fullUrl: `${baseUrl}/Organization/${org.id}`,
        resource: org
      });
    }
  }

  // Transform products to DeviceDefinitions
  const { definitions, warnings } = transformProductsToDeviceDefinitions(products, companyMap);
  allWarnings.push(...warnings);

  // Add DeviceDefinition entries
  for (const device of definitions) {
    entries.push({
      fullUrl: `${baseUrl}/DeviceDefinition/${device.id}`,
      resource: device
    });
  }

  // Create the Bundle
  const bundle: FHIRBundle = {
    resourceType: "Bundle",
    id: `dlinrt-export-${formatDate(new Date())}`,
    meta: {
      lastUpdated: new Date().toISOString(),
      source: DLINRT_SYSTEM
    },
    type: "collection",
    timestamp: new Date().toISOString(),
    total: entries.length,
    entry: entries
  };

  // Calculate statistics
  const statistics = calculateStatistics(products, definitions, organizations, allWarnings);

  return {
    bundle,
    warnings: allWarnings,
    statistics
  };
}

/**
 * Calculate export statistics
 */
function calculateStatistics(
  products: ProductDetails[],
  definitions: FHIRDeviceDefinition[],
  organizations: FHIROrganization[],
  warnings: FHIRValidationWarning[]
): FHIRExportResult['statistics'] {
  const modalityWarnings = warnings.filter(w => w.field === 'modality').length;
  const anatomyWarnings = warnings.filter(w => w.field === 'anatomy').length;

  // Count products with FDA/CE
  let productsWithFDA = 0;
  let productsWithCE = 0;

  for (const product of products) {
    if (product.regulatory?.fda) {
      const fda = typeof product.regulatory.fda === 'object' ? product.regulatory.fda : null;
      if (fda && (fda.status === 'Cleared' || fda.status === '510(k) Cleared')) {
        productsWithFDA++;
      }
    }
    if (product.regulatory?.ce?.status === 'Approved' || product.regulatory?.ce?.status === 'Certified') {
      productsWithCE++;
    }
  }

  // Count mapped modalities and anatomies
  let mappedModalities = 0;
  let unmappedModalities = 0;
  let mappedAnatomies = 0;
  let unmappedAnatomies = 0;

  for (const def of definitions) {
    if (def.property) {
      for (const prop of def.property) {
        const propCode = prop.type?.coding?.[0]?.code;
        if (propCode === 'modality' && prop.valueCodeableConcept) {
          mappedModalities += prop.valueCodeableConcept.length;
        }
        if (propCode === 'anatomical-location' && prop.valueCodeableConcept) {
          mappedAnatomies += prop.valueCodeableConcept.length;
        }
      }
    }
  }

  // Count unmapped from warnings
  unmappedModalities = warnings.filter(w => w.field === 'modality').length;
  unmappedAnatomies = warnings.filter(w => w.field === 'anatomy').length;

  return {
    totalProducts: products.length,
    totalOrganizations: organizations.length,
    mappedModalities,
    unmappedModalities,
    mappedAnatomies,
    unmappedAnatomies,
    productsWithFDA,
    productsWithCE
  };
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Create a summary of the export for logging/display
 */
export function createExportSummary(result: FHIRExportResult): string {
  const { statistics, warnings } = result;
  
  const lines = [
    `FHIR Export Summary`,
    `==================`,
    ``,
    `Resources:`,
    `  - Products (DeviceDefinition): ${statistics.totalProducts}`,
    `  - Companies (Organization): ${statistics.totalOrganizations}`,
    ``,
    `Regulatory Status:`,
    `  - FDA Cleared: ${statistics.productsWithFDA}`,
    `  - CE Marked: ${statistics.productsWithCE}`,
    ``,
    `Terminology Mapping:`,
    `  - Modalities: ${statistics.mappedModalities} mapped, ${statistics.unmappedModalities} unmapped`,
    `  - Anatomies: ${statistics.mappedAnatomies} mapped, ${statistics.unmappedAnatomies} unmapped`,
  ];

  if (warnings.length > 0) {
    lines.push(``);
    lines.push(`Warnings (${warnings.length}):`);
    
    // Group warnings by type
    const warningsByField = new Map<string, FHIRValidationWarning[]>();
    for (const w of warnings) {
      const existing = warningsByField.get(w.field) || [];
      existing.push(w);
      warningsByField.set(w.field, existing);
    }

    for (const [field, fieldWarnings] of warningsByField) {
      lines.push(`  ${field}: ${fieldWarnings.length} unmapped values`);
      // Show first 3 examples
      const examples = fieldWarnings.slice(0, 3).map(w => w.originalValue).join(', ');
      if (examples) {
        lines.push(`    Examples: ${examples}${fieldWarnings.length > 3 ? '...' : ''}`);
      }
    }
  }

  return lines.join('\n');
}

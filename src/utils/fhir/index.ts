/**
 * FHIR Export Module
 * 
 * Exports DLinRT product data as FHIR R4-compliant resources.
 * 
 * Features:
 * - Products → DeviceDefinition resources
 * - Companies → Organization resources
 * - SNOMED CT coded anatomical locations
 * - DICOM coded imaging modalities
 * - ICD-10/SNOMED coded disease targets
 * - Regulatory identifiers (FDA 510(k), CE marking)
 * 
 * @example
 * ```typescript
 * import { downloadFHIRBundle, exportToFHIR } from '@/utils/fhir';
 * 
 * // Download as file
 * downloadFHIRBundle(products, companies);
 * 
 * // Get bundle programmatically
 * const result = exportToFHIR(products, companies);
 * console.log(result.bundle);
 * console.log(result.warnings);
 * ```
 */

// Main export functions
export { 
  exportToFHIR, 
  downloadFHIRBundle,
  downloadFHIRBundleWithReport,
  downloadProductFHIRBundle,
  validateFHIRBundle,
  getFHIRExportPreview
} from './fhirExporter';

// Types
export type { 
  FHIRBundle,
  FHIRDeviceDefinition,
  FHIROrganization,
  FHIRExportOptions,
  FHIRExportResult,
  FHIRValidationWarning,
  FHIRCoding,
  FHIRCodeableConcept,
  FHIRIdentifier,
  FHIRReference,
  FHIRContactPoint
} from './types';

// Terminology mappings (for external use/extension)
export { 
  SNOMED_ANATOMY_MAP,
  getAnatomyCoding,
  getAnatomyCodeableConcepts,
  hasAnatomyMapping
} from './terminology/anatomyCodes';

export { 
  DICOM_MODALITY_MAP,
  getModalityCoding,
  getModalityCodeableConcepts,
  hasModalityMapping,
  normalizeModalities
} from './terminology/modalityCodes';

export { 
  DISEASE_MAP,
  getDiseaseCoding,
  getDiseaseCodeableConcepts,
  hasDiseaseMapping
} from './terminology/diseaseCodes';

// Transformers (for custom bundle creation)
export { 
  transformProductToDeviceDefinition,
  transformProductsToDeviceDefinitions
} from './transformers/deviceDefinition';

export { 
  transformCompanyToOrganization,
  transformCompaniesToOrganizations,
  createCompanyMap
} from './transformers/organization';

export { 
  createFHIRBundle,
  createExportSummary
} from './transformers/bundle';

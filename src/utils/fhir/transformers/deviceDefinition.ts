/**
 * Product to FHIR DeviceDefinition Transformer
 * 
 * Transforms DLinRT ProductDetails into FHIR R4 DeviceDefinition resources.
 */

import type { ProductDetails } from "@/types/productDetails";
import type {
  FHIRDeviceDefinition,
  FHIRDeviceDefinitionName,
  FHIRDeviceDefinitionClassification,
  FHIRDeviceDefinitionProperty,
  FHIRRegulatoryIdentifier,
  FHIRContactPoint,
  FHIRIdentifier,
  FHIRMeta,
  FHIRReference,
  FHIRCodeableConcept,
  FHIRValidationWarning,
  FHIRDeviceDefinitionVersion
} from "../types";
import { getAnatomyCodeableConcepts, getUnmappedAnatomies } from "../terminology/anatomyCodes";
import { getModalityCodeableConcepts, getUnmappedModalities, normalizeModalities } from "../terminology/modalityCodes";
import { getDiseaseCodeableConcepts, getUnmappedDiseases } from "../terminology/diseaseCodes";
import { CATEGORY_LABELS } from "@/constants/productCategories";

const DLINRT_SYSTEM = "https://dlinrt.eu";
const DLINRT_PROPERTIES_SYSTEM = `${DLINRT_SYSTEM}/properties`;
const DLINRT_CATEGORIES_SYSTEM = `${DLINRT_SYSTEM}/categories`;

interface TransformResult {
  deviceDefinition: FHIRDeviceDefinition;
  warnings: FHIRValidationWarning[];
}

/**
 * Transform a DLinRT product to a FHIR DeviceDefinition
 */
export function transformProductToDeviceDefinition(
  product: ProductDetails,
  companyId?: string,
  companyName?: string
): TransformResult {
  const warnings: FHIRValidationWarning[] = [];
  const resourceId = `dlinrt-${sanitizeId(product.id)}`;

  const deviceDefinition: FHIRDeviceDefinition = {
    resourceType: "DeviceDefinition",
    id: resourceId,
    meta: createMeta(product),
    identifier: createIdentifiers(product),
    description: product.description,
    deviceName: createDeviceNames(product),
    manufacturer: createManufacturerReference(companyId, companyName || product.company),
    modelNumber: product.version,
    version: createVersions(product),
    classification: createClassifications(product),
    property: createProperties(product, warnings),
    regulatoryIdentifier: createRegulatoryIdentifiers(product),
    contact: createContacts(product),
    note: product.regulatory?.intendedUseStatement ? [{
      text: `Intended Use: ${product.regulatory.intendedUseStatement}`
    }] : undefined
  };

  // Clean up undefined properties
  Object.keys(deviceDefinition).forEach(key => {
    const k = key as keyof FHIRDeviceDefinition;
    if (deviceDefinition[k] === undefined || 
        (Array.isArray(deviceDefinition[k]) && (deviceDefinition[k] as unknown[]).length === 0)) {
      delete deviceDefinition[k];
    }
  });

  return { deviceDefinition, warnings };
}

/**
 * Create FHIR Meta element
 */
function createMeta(product: ProductDetails): FHIRMeta {
  return {
    lastUpdated: product.lastRevised || new Date().toISOString(),
    source: DLINRT_SYSTEM,
    profile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"]
  };
}

/**
 * Create identifiers from regulatory numbers
 */
function createIdentifiers(product: ProductDetails): FHIRIdentifier[] {
  const identifiers: FHIRIdentifier[] = [];

  // FDA clearance number
  if (product.regulatory?.fda && typeof product.regulatory.fda === 'object') {
    if (product.regulatory.fda.clearanceNumber) {
      identifiers.push({
        use: "official",
        type: {
          coding: [{
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "PRN",
            display: "Provider number"
          }],
          text: "FDA Clearance Number"
        },
        system: "http://fda.gov/510k",
        value: product.regulatory.fda.clearanceNumber
      });
    }
  }

  // CE certificate number
  if (product.regulatory?.ce?.certificateNumber) {
    identifiers.push({
      use: "official",
      type: {
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "PRN",
          display: "Provider number"
        }],
        text: "CE Certificate Number"
      },
      system: "http://ec.europa.eu/medical-devices",
      value: product.regulatory.ce.certificateNumber
    });
  }

  // Product ID as identifier
  identifiers.push({
    use: "usual",
    system: DLINRT_SYSTEM,
    value: product.id
  });

  return identifiers;
}

/**
 * Create device names
 */
function createDeviceNames(product: ProductDetails): FHIRDeviceDefinitionName[] {
  const names: FHIRDeviceDefinitionName[] = [{
    name: product.name,
    type: {
      coding: [{
        system: "http://hl7.org/fhir/devicedefinition-nametype",
        code: "registered-name",
        display: "Registered name"
      }]
    }
  }];

  return names;
}

/**
 * Create manufacturer reference
 */
function createManufacturerReference(companyId?: string, companyName?: string): FHIRReference | undefined {
  if (!companyId && !companyName) return undefined;

  return {
    reference: companyId ? `Organization/org-${sanitizeId(companyId)}` : undefined,
    display: companyName
  };
}

/**
 * Create version elements
 */
function createVersions(product: ProductDetails): FHIRDeviceDefinitionVersion[] | undefined {
  if (!product.version) return undefined;

  return [{
    type: {
      coding: [{
        system: DLINRT_SYSTEM,
        code: "software-version",
        display: "Software Version"
      }]
    },
    value: product.version
  }];
}

/**
 * Create classification from product category
 */
function createClassifications(product: ProductDetails): FHIRDeviceDefinitionClassification[] {
  const classifications: FHIRDeviceDefinitionClassification[] = [];

  // Primary category
  if (product.category) {
    classifications.push({
      type: {
        coding: [{
          system: DLINRT_CATEGORIES_SYSTEM,
          code: product.category,
          display: CATEGORY_LABELS[product.category] || product.category
        }]
      }
    });
  }

  // Secondary categories
  if (product.secondaryCategories) {
    for (const cat of product.secondaryCategories) {
      classifications.push({
        type: {
          coding: [{
            system: DLINRT_CATEGORIES_SYSTEM,
            code: cat,
            display: CATEGORY_LABELS[cat] || cat
          }]
        }
      });
    }
  }

  // Development stage as classification
  if (product.developmentStage) {
    classifications.push({
      type: {
        coding: [{
          system: `${DLINRT_SYSTEM}/development-stage`,
          code: product.developmentStage,
          display: product.developmentStage.charAt(0).toUpperCase() + product.developmentStage.slice(1)
        }]
      }
    });
  }

  return classifications;
}

/**
 * Create properties for modality, anatomy, and disease targets
 */
function createProperties(product: ProductDetails, warnings: FHIRValidationWarning[]): FHIRDeviceDefinitionProperty[] {
  const properties: FHIRDeviceDefinitionProperty[] = [];

  // Modality property
  const modalities = normalizeModalities(product.modality);
  if (modalities.length > 0) {
    const modalityConcepts = getModalityCodeableConcepts(modalities);
    const unmappedModalities = getUnmappedModalities(modalities);

    if (modalityConcepts.length > 0) {
      properties.push({
        type: {
          coding: [{
            system: DLINRT_PROPERTIES_SYSTEM,
            code: "modality",
            display: "Imaging Modality"
          }]
        },
        valueCodeableConcept: modalityConcepts
      });
    }

    // Add warnings for unmapped modalities
    for (const mod of unmappedModalities) {
      warnings.push({
        resourceType: "DeviceDefinition",
        resourceId: product.id,
        field: "modality",
        message: `Modality "${mod}" could not be mapped to DICOM code`,
        originalValue: mod
      });
    }
  }

  // Anatomy property
  const anatomies = product.anatomy || [];
  if (anatomies.length > 0) {
    const anatomyConcepts = getAnatomyCodeableConcepts(anatomies);
    const unmappedAnatomies = getUnmappedAnatomies(anatomies);

    if (anatomyConcepts.length > 0) {
      properties.push({
        type: {
          coding: [{
            system: DLINRT_PROPERTIES_SYSTEM,
            code: "anatomical-location",
            display: "Anatomical Location"
          }]
        },
        valueCodeableConcept: anatomyConcepts
      });
    }

    // Add warnings for unmapped anatomies
    for (const anat of unmappedAnatomies) {
      warnings.push({
        resourceType: "DeviceDefinition",
        resourceId: product.id,
        field: "anatomy",
        message: `Anatomy "${anat}" could not be mapped to SNOMED CT code`,
        originalValue: anat
      });
    }
  }

  // Disease targets property
  const diseases = product.diseaseTargeted || [];
  if (diseases.length > 0) {
    const diseaseConcepts = getDiseaseCodeableConcepts(diseases);
    const unmappedDiseases = getUnmappedDiseases(diseases);

    if (diseaseConcepts.length > 0) {
      properties.push({
        type: {
          coding: [{
            system: DLINRT_PROPERTIES_SYSTEM,
            code: "disease-targeted",
            display: "Disease Targeted"
          }]
        },
        valueCodeableConcept: diseaseConcepts
      });
    }

    // Add warnings for unmapped diseases
    for (const disease of unmappedDiseases) {
      warnings.push({
        resourceType: "DeviceDefinition",
        resourceId: product.id,
        field: "diseaseTargeted",
        message: `Disease "${disease}" could not be mapped to ICD-10/SNOMED code`,
        originalValue: disease
      });
    }
  }

  // Key features as string properties
  if (product.keyFeatures && product.keyFeatures.length > 0) {
    properties.push({
      type: {
        coding: [{
          system: DLINRT_PROPERTIES_SYSTEM,
          code: "key-features",
          display: "Key Features"
        }]
      },
      valueString: product.keyFeatures
    });
  }

  // Uses AI indicator
  if (product.usesAI !== undefined) {
    properties.push({
      type: {
        coding: [{
          system: DLINRT_PROPERTIES_SYSTEM,
          code: "uses-ai",
          display: "Uses AI/Deep Learning"
        }]
      },
      valueBoolean: [product.usesAI]
    });
  }

  return properties;
}

/**
 * Create regulatory identifiers
 */
function createRegulatoryIdentifiers(product: ProductDetails): FHIRRegulatoryIdentifier[] {
  const regulatoryIds: FHIRRegulatoryIdentifier[] = [];

  // FDA
  if (product.regulatory?.fda && typeof product.regulatory.fda === 'object') {
    const fda = product.regulatory.fda;
    if (fda.status === "Cleared" || fda.status === "510(k) Cleared") {
      regulatoryIds.push({
        type: fda.type === "De Novo" ? "de novo" : "510(k)",
        deviceIdentifier: fda.clearanceNumber,
        issuer: "http://fda.gov",
        jurisdiction: "http://unstats.un.org/unsd/methods/m49/m49.htm#840" // USA
      });
    }
  }

  // CE (EU)
  if (product.regulatory?.ce) {
    const ce = product.regulatory.ce;
    if (ce.status === "Approved" || ce.status === "Certified") {
      regulatoryIds.push({
        type: "license",
        deviceIdentifier: ce.certificateNumber,
        issuer: ce.notifiedBody || "http://ec.europa.eu/medical-devices",
        jurisdiction: "http://unstats.un.org/unsd/methods/m49/m49.htm#150" // Europe
      });
    }
  }

  return regulatoryIds;
}

/**
 * Create contact points
 */
function createContacts(product: ProductDetails): FHIRContactPoint[] {
  const contacts: FHIRContactPoint[] = [];

  if (product.productUrl || product.url) {
    contacts.push({
      system: "url",
      value: product.productUrl || product.url,
      use: "work"
    });
  }

  if (product.companyUrl) {
    contacts.push({
      system: "url",
      value: product.companyUrl,
      use: "work"
    });
  }

  if (product.contactEmail) {
    contacts.push({
      system: "email",
      value: product.contactEmail,
      use: "work"
    });
  }

  return contacts;
}

/**
 * Sanitize ID for FHIR resource ID (alphanumeric and hyphens only)
 */
function sanitizeId(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Transform multiple products to DeviceDefinitions
 */
export function transformProductsToDeviceDefinitions(
  products: ProductDetails[],
  companyMap?: Map<string, { id: string; name: string }>
): { definitions: FHIRDeviceDefinition[]; warnings: FHIRValidationWarning[] } {
  const allDefinitions: FHIRDeviceDefinition[] = [];
  const allWarnings: FHIRValidationWarning[] = [];

  for (const product of products) {
    const company = companyMap?.get(product.company);
    const { deviceDefinition, warnings } = transformProductToDeviceDefinition(
      product,
      company?.id,
      company?.name || product.company
    );
    allDefinitions.push(deviceDefinition);
    allWarnings.push(...warnings);
  }

  return { definitions: allDefinitions, warnings: allWarnings };
}

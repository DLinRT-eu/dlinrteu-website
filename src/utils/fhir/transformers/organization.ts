/**
 * Company to FHIR Organization Transformer
 * 
 * Transforms DLinRT CompanyDetails into FHIR R4 Organization resources.
 */

import type { CompanyDetails } from "@/types/company";
import type {
  FHIROrganization,
  FHIRIdentifier,
  FHIRCodeableConcept,
  FHIRContactPoint,
  FHIRMeta
} from "../types";

const DLINRT_SYSTEM = "https://dlinrt.eu";

/**
 * Transform a DLinRT company to a FHIR Organization
 */
export function transformCompanyToOrganization(company: CompanyDetails): FHIROrganization {
  const resourceId = `org-${sanitizeId(company.id)}`;

  const organization: FHIROrganization = {
    resourceType: "Organization",
    id: resourceId,
    meta: createMeta(),
    identifier: createIdentifiers(company),
    active: true,
    type: createOrganizationType(),
    name: company.name,
    description: company.description,
    telecom: createTelecom(company)
  };

  // Clean up undefined/empty properties
  Object.keys(organization).forEach(key => {
    const k = key as keyof FHIROrganization;
    if (organization[k] === undefined || 
        (Array.isArray(organization[k]) && (organization[k] as unknown[]).length === 0)) {
      delete organization[k];
    }
  });

  return organization;
}

/**
 * Create FHIR Meta element
 */
function createMeta(): FHIRMeta {
  return {
    lastUpdated: new Date().toISOString(),
    source: DLINRT_SYSTEM,
    profile: ["http://hl7.org/fhir/StructureDefinition/Organization"]
  };
}

/**
 * Create organization identifiers
 */
function createIdentifiers(company: CompanyDetails): FHIRIdentifier[] {
  const identifiers: FHIRIdentifier[] = [];

  // DLinRT identifier
  identifiers.push({
    use: "usual",
    system: DLINRT_SYSTEM,
    value: company.id
  });

  // Website domain as informal identifier
  if (company.website) {
    try {
      const url = new URL(company.website);
      identifiers.push({
        use: "secondary",
        type: {
          coding: [{
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "URI",
            display: "URI"
          }],
          text: "Website Domain"
        },
        system: "http://www.w3.org/ns/prov#",
        value: url.hostname
      });
    } catch {
      // Invalid URL, skip domain identifier
    }
  }

  return identifiers;
}

/**
 * Create organization type (Medical Device Manufacturer)
 */
function createOrganizationType(): FHIRCodeableConcept[] {
  return [{
    coding: [{
      system: "http://terminology.hl7.org/CodeSystem/organization-type",
      code: "prvd",
      display: "Healthcare Provider"
    }],
    text: "Medical Device Manufacturer"
  }, {
    coding: [{
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
      code: "VN",
      display: "Vendor"
    }],
    text: "AI/ML Medical Device Vendor"
  }];
}

/**
 * Create telecom (contact points)
 */
function createTelecom(company: CompanyDetails): FHIRContactPoint[] {
  const telecom: FHIRContactPoint[] = [];

  if (company.website) {
    telecom.push({
      system: "url",
      value: company.website,
      use: "work"
    });
  }

  return telecom;
}

/**
 * Sanitize ID for FHIR resource ID
 */
function sanitizeId(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Transform multiple companies to Organizations
 */
export function transformCompaniesToOrganizations(companies: CompanyDetails[]): FHIROrganization[] {
  return companies.map(company => transformCompanyToOrganization(company));
}

/**
 * Create a company map for product references
 */
export function createCompanyMap(companies: CompanyDetails[]): Map<string, { id: string; name: string }> {
  const map = new Map<string, { id: string; name: string }>();
  
  for (const company of companies) {
    // Map by company name (as used in ProductDetails.company)
    map.set(company.name, { id: company.id, name: company.name });
    // Also map by ID for flexibility
    map.set(company.id, { id: company.id, name: company.name });
  }
  
  return map;
}

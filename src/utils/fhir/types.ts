/**
 * FHIR R4 Type Definitions for DLinRT Export
 * 
 * These types define the structure of FHIR resources used for
 * exporting DLinRT product data as DeviceDefinition and Organization resources.
 * 
 * @see https://hl7.org/fhir/R4/devicedefinition.html
 * @see https://hl7.org/fhir/R4/organization.html
 */

// ============================================================================
// Core FHIR Types
// ============================================================================

export interface FHIRMeta {
  lastUpdated: string;
  source?: string;
  profile?: string[];
  versionId?: string;
}

export interface FHIRCoding {
  system: string;
  code: string;
  display: string;
  version?: string;
}

export interface FHIRCodeableConcept {
  coding: FHIRCoding[];
  text?: string;
}

export interface FHIRIdentifier {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: FHIRCodeableConcept;
  system?: string;
  value: string;
  period?: FHIRPeriod;
  assigner?: FHIRReference;
}

export interface FHIRReference {
  reference?: string;
  type?: string;
  identifier?: FHIRIdentifier;
  display?: string;
}

export interface FHIRPeriod {
  start?: string;
  end?: string;
}

export interface FHIRContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: FHIRPeriod;
}

export interface FHIRAnnotation {
  authorReference?: FHIRReference;
  authorString?: string;
  time?: string;
  text: string;
}

// ============================================================================
// DeviceDefinition Resource Types
// ============================================================================

export interface FHIRDeviceDefinitionName {
  name: string;
  type: FHIRCodeableConcept;
}

export interface FHIRDeviceDefinitionClassification {
  type: FHIRCodeableConcept;
  justification?: FHIRReference[];
}

export interface FHIRDeviceDefinitionProperty {
  type: FHIRCodeableConcept;
  valueQuantity?: FHIRQuantity[];
  valueCodeableConcept?: FHIRCodeableConcept[];
  valueString?: string[];
  valueBoolean?: boolean[];
  valueInteger?: number[];
  valueRange?: FHIRRange[];
  valueAttachment?: FHIRAttachment[];
}

export interface FHIRQuantity {
  value?: number;
  comparator?: "<" | "<=" | ">=" | ">";
  unit?: string;
  system?: string;
  code?: string;
}

export interface FHIRRange {
  low?: FHIRQuantity;
  high?: FHIRQuantity;
}

export interface FHIRAttachment {
  contentType?: string;
  language?: string;
  data?: string;
  url?: string;
  size?: number;
  hash?: string;
  title?: string;
  creation?: string;
}

export interface FHIRRegulatoryIdentifier {
  type: "510(k)" | "510(k) exempt" | "de novo" | "pma" | "humanitarian" | "license";
  deviceIdentifier?: string;
  issuer: string;
  jurisdiction: string;
}

export interface FHIRDeviceDefinitionLink {
  relation: FHIRCoding;
  relatedDevice: FHIRCodeableReference;
}

export interface FHIRCodeableReference {
  concept?: FHIRCodeableConcept;
  reference?: FHIRReference;
}

export interface FHIRDeviceDefinition {
  resourceType: "DeviceDefinition";
  id: string;
  meta?: FHIRMeta;
  identifier?: FHIRIdentifier[];
  udiDeviceIdentifier?: FHIRUdiDeviceIdentifier[];
  description?: string;
  manufacturer?: FHIRReference;
  deviceName?: FHIRDeviceDefinitionName[];
  modelNumber?: string;
  classification?: FHIRDeviceDefinitionClassification[];
  hasPart?: FHIRDeviceDefinitionHasPart[];
  version?: FHIRDeviceDefinitionVersion[];
  safety?: FHIRCodeableConcept[];
  property?: FHIRDeviceDefinitionProperty[];
  owner?: FHIRReference;
  contact?: FHIRContactPoint[];
  link?: FHIRDeviceDefinitionLink[];
  note?: FHIRAnnotation[];
  regulatoryIdentifier?: FHIRRegulatoryIdentifier[];
  languageCode?: FHIRCodeableConcept[];
}

export interface FHIRUdiDeviceIdentifier {
  deviceIdentifier: string;
  issuer: string;
  jurisdiction: string;
  marketDistribution?: FHIRMarketDistribution[];
}

export interface FHIRMarketDistribution {
  marketPeriod?: FHIRPeriod;
  subJurisdiction?: string;
}

export interface FHIRDeviceDefinitionHasPart {
  reference: FHIRReference;
  count?: number;
}

export interface FHIRDeviceDefinitionVersion {
  type?: FHIRCodeableConcept;
  component?: FHIRIdentifier;
  value: string;
}

// ============================================================================
// Organization Resource Types
// ============================================================================

export interface FHIROrganizationContact {
  purpose?: FHIRCodeableConcept;
  name?: FHIRHumanName;
  telecom?: FHIRContactPoint[];
  address?: FHIRAddress;
}

export interface FHIRHumanName {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden";
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: FHIRPeriod;
}

export interface FHIRAddress {
  use?: "home" | "work" | "temp" | "old" | "billing";
  type?: "postal" | "physical" | "both";
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: FHIRPeriod;
}

export interface FHIROrganization {
  resourceType: "Organization";
  id: string;
  meta?: FHIRMeta;
  identifier?: FHIRIdentifier[];
  active?: boolean;
  type?: FHIRCodeableConcept[];
  name: string;
  alias?: string[];
  description?: string;
  telecom?: FHIRContactPoint[];
  address?: FHIRAddress[];
  partOf?: FHIRReference;
  contact?: FHIROrganizationContact[];
  endpoint?: FHIRReference[];
}

// ============================================================================
// Bundle Resource Types
// ============================================================================

export interface FHIRBundleEntry {
  fullUrl?: string;
  resource: FHIRDeviceDefinition | FHIROrganization;
  search?: FHIRBundleEntrySearch;
  request?: FHIRBundleEntryRequest;
  response?: FHIRBundleEntryResponse;
}

export interface FHIRBundleEntrySearch {
  mode?: "match" | "include" | "outcome";
  score?: number;
}

export interface FHIRBundleEntryRequest {
  method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  ifNoneMatch?: string;
  ifModifiedSince?: string;
  ifMatch?: string;
  ifNoneExist?: string;
}

export interface FHIRBundleEntryResponse {
  status: string;
  location?: string;
  etag?: string;
  lastModified?: string;
  outcome?: FHIRDeviceDefinition | FHIROrganization;
}

export interface FHIRBundle {
  resourceType: "Bundle";
  id: string;
  meta?: FHIRMeta;
  type: "document" | "message" | "transaction" | "transaction-response" | "batch" | "batch-response" | "history" | "searchset" | "collection";
  timestamp?: string;
  total?: number;
  link?: FHIRBundleLink[];
  entry?: FHIRBundleEntry[];
}

export interface FHIRBundleLink {
  relation: string;
  url: string;
}

// ============================================================================
// Export Options
// ============================================================================

export interface FHIRExportOptions {
  /** Include Organization resources for companies */
  includeOrganizations?: boolean;
  /** Format JSON output with indentation */
  prettyPrint?: boolean;
  /** Custom FHIR profile URL to include in meta */
  profileUrl?: string;
  /** Base URL for resource references */
  baseUrl?: string;
  /** Include only products that have complete terminology mappings */
  strictMode?: boolean;
}

// ============================================================================
// Validation Types
// ============================================================================

export interface FHIRValidationWarning {
  resourceType: string;
  resourceId: string;
  field: string;
  message: string;
  originalValue?: string;
}

export interface FHIRExportResult {
  bundle: FHIRBundle;
  warnings: FHIRValidationWarning[];
  statistics: {
    totalProducts: number;
    totalOrganizations: number;
    mappedModalities: number;
    unmappedModalities: number;
    mappedAnatomies: number;
    unmappedAnatomies: number;
    productsWithFDA: number;
    productsWithCE: number;
  };
}

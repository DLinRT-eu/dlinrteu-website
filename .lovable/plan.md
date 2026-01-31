
# FHIR Exporter Implementation Plan

## Overview

This plan implements a FHIR R4-compliant export system that transforms DLinRT product data into `DeviceDefinition` and `Organization` resources. The exporter will include SNOMED CT coded values for anatomy and DICOM codes for modalities, following healthcare interoperability standards.

---

## Architecture

```text
src/utils/fhir/
├── index.ts                    # Public exports
├── types.ts                    # FHIR resource type definitions
├── terminology/
│   ├── anatomyCodes.ts         # SNOMED CT body structure mappings
│   ├── modalityCodes.ts        # DICOM acquisition modality mappings
│   └── diseaseCodes.ts         # ICD-10/SNOMED disease mappings
├── transformers/
│   ├── deviceDefinition.ts     # Product → DeviceDefinition transformer
│   ├── organization.ts         # Company → Organization transformer
│   └── bundle.ts               # Bundle generator for complete export
└── fhirExporter.ts             # Main export utility with download
```

---

## Terminology Mappings

### SNOMED CT Anatomy Codes (anatomyCodes.ts)

| DLinRT Value | SNOMED CT Code | Display |
|--------------|----------------|---------|
| Head & Neck | 774007 | Head and/or neck structure |
| Thorax | 51185008 | Thoracic structure |
| Abdomen | 818983003 | Abdomen |
| Pelvis | 12921003 | Pelvic structure |
| Brain | 12738006 | Brain structure |
| Breast | 76752008 | Breast structure |
| Spine | 421060004 | Spinal column structure |
| Extremities | 66019005 | Limb structure |

### DICOM Modality Codes (modalityCodes.ts)

| DLinRT Value | DICOM Code | System |
|--------------|------------|--------|
| CT | CT | DCM |
| MRI | MR | DCM |
| PET | PT | DCM |
| CBCT | CT | DCM (with qualifier) |
| LINAC | RTIMAGE | SRT |
| Ultrasound | US | DCM |
| X-Ray | DX | DCM |

### Disease Codes (diseaseCodes.ts)

| DLinRT Value | ICD-10/SNOMED | Display |
|--------------|---------------|---------|
| Multiple Cancer Types | 363346000 | Malignant neoplastic disease |
| Head & Neck Cancer | C00-C14 | Malignant neoplasms of lip, oral cavity and pharynx |
| Lung Cancer | C34 | Malignant neoplasm of bronchus and lung |
| Breast Cancer | C50 | Malignant neoplasm of breast |
| Prostate Cancer | C61 | Malignant neoplasm of prostate |

---

## FHIR Resource Mappings

### DeviceDefinition Resource

| FHIR Element | DLinRT Source | Notes |
|--------------|---------------|-------|
| `id` | `product.id` | Prefixed with "dlinrt-" |
| `identifier[0]` | FDA clearance number | If available |
| `identifier[1]` | CE certificate number | If available |
| `version` | `product.version` | Product version string |
| `name` | `product.name` | Primary product name |
| `description` | `product.description` | Product description |
| `manufacturer` | Reference to Organization | Links to company resource |
| `modelNumber` | `product.version` | Model/version identifier |
| `classification[].type` | `product.category` | DLinRT category as classification |
| `property[]` | Various fields | Modality, anatomy as coded properties |
| `regulatoryIdentifier[]` | FDA/CE info | Regulatory clearance details |
| `contact[]` | Support email, website | Contact information |
| `link[]` | Product URLs | Related documentation links |

### Organization Resource

| FHIR Element | DLinRT Source | Notes |
|--------------|---------------|-------|
| `id` | `company.id` | Prefixed with "org-" |
| `identifier[]` | Company website domain | Informal identifier |
| `name` | `company.name` | Company name |
| `type` | Fixed: "Medical Device Manufacturer" | Organization type |
| `telecom[]` | `company.website` | Contact URL |
| `contact[].purpose` | "Product Information" | Contact purpose |

### Bundle Resource

The complete export generates a FHIR Bundle of type "collection" containing:
- All Organization resources (companies)
- All DeviceDefinition resources (products)
- Cross-references between products and manufacturers

---

## Implementation Details

### 1. Type Definitions (types.ts)

```typescript
// Core FHIR types needed for DeviceDefinition and Organization
export interface FHIRResource {
  resourceType: string;
  id: string;
  meta?: FHIRMeta;
}

export interface FHIRMeta {
  lastUpdated: string;
  source: string;
  profile?: string[];
}

export interface FHIRCodeableConcept {
  coding: FHIRCoding[];
  text?: string;
}

export interface FHIRCoding {
  system: string;
  code: string;
  display: string;
}

export interface FHIRReference {
  reference: string;
  display?: string;
}

export interface FHIRDeviceDefinition extends FHIRResource {
  resourceType: "DeviceDefinition";
  identifier?: FHIRIdentifier[];
  version?: string;
  name?: FHIRDeviceDefinitionName[];
  description?: string;
  manufacturer?: FHIRReference;
  modelNumber?: string;
  classification?: FHIRDeviceDefinitionClassification[];
  property?: FHIRDeviceDefinitionProperty[];
  regulatoryIdentifier?: FHIRRegulatoryIdentifier[];
  contact?: FHIRContactPoint[];
  link?: FHIRDeviceDefinitionLink[];
}

export interface FHIROrganization extends FHIRResource {
  resourceType: "Organization";
  identifier?: FHIRIdentifier[];
  name: string;
  type?: FHIRCodeableConcept[];
  telecom?: FHIRContactPoint[];
  contact?: FHIROrganizationContact[];
}

export interface FHIRBundle extends FHIRResource {
  resourceType: "Bundle";
  type: "collection";
  timestamp: string;
  total: number;
  entry: FHIRBundleEntry[];
}
```

### 2. Terminology Helper Functions

```typescript
// Example from anatomyCodes.ts
export const SNOMED_ANATOMY_MAP: Record<string, FHIRCoding> = {
  "Head & Neck": {
    system: "http://snomed.info/sct",
    code: "774007",
    display: "Head and/or neck structure"
  },
  "Thorax": {
    system: "http://snomed.info/sct",
    code: "51185008",
    display: "Thoracic structure"
  },
  // ... more mappings
};

export function getAnatomyCoding(location: string): FHIRCoding | null {
  return SNOMED_ANATOMY_MAP[location] || null;
}

export function getAnatomyCodings(locations: string[]): FHIRCodeableConcept[] {
  return locations
    .map(loc => SNOMED_ANATOMY_MAP[loc])
    .filter(Boolean)
    .map(coding => ({ coding: [coding], text: coding.display }));
}
```

### 3. DeviceDefinition Transformer

The transformer will:
1. Map basic product info (id, name, version, description)
2. Create manufacturer reference to Organization
3. Add FDA/CE regulatory identifiers
4. Convert modality to DICOM-coded properties
5. Convert anatomy to SNOMED-coded properties
6. Include disease targets as use context
7. Add product/company URLs as links
8. Include intended use statement

### 4. Organization Transformer

The transformer will:
1. Map company id and name
2. Set type as "Medical Device Manufacturer"
3. Add website as telecom
4. Include product references in extension

### 5. Bundle Generator

Creates a FHIR Bundle containing:
1. Export metadata in meta element
2. All unique organizations
3. All products as DeviceDefinitions
4. Proper cross-references

### 6. Export Utility (fhirExporter.ts)

```typescript
export interface FHIRExportOptions {
  includeOrganizations: boolean;  // Include company resources
  prettyPrint: boolean;           // Format JSON output
  profileUrl?: string;            // Custom FHIR profile URL
}

export function exportToFHIR(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options?: FHIRExportOptions
): FHIRBundle;

export function downloadFHIRBundle(
  products: ProductDetails[],
  companies: CompanyDetails[],
  options?: FHIRExportOptions
): void;
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/utils/fhir/types.ts` | FHIR R4 type definitions for DeviceDefinition, Organization, Bundle |
| `src/utils/fhir/terminology/anatomyCodes.ts` | SNOMED CT body structure code mappings |
| `src/utils/fhir/terminology/modalityCodes.ts` | DICOM modality code mappings (CID 29) |
| `src/utils/fhir/terminology/diseaseCodes.ts` | ICD-10/SNOMED disease code mappings |
| `src/utils/fhir/transformers/deviceDefinition.ts` | Product to DeviceDefinition transformer |
| `src/utils/fhir/transformers/organization.ts` | Company to Organization transformer |
| `src/utils/fhir/transformers/bundle.ts` | Bundle generator |
| `src/utils/fhir/fhirExporter.ts` | Main export utility with download function |
| `src/utils/fhir/index.ts` | Public exports |

## Files to Modify

| File | Changes |
|------|---------|
| `src/utils/companyExport/index.ts` | Add FHIR export to company export options |
| `src/services/ExportService.ts` | Add FHIR format to export service |

---

## Export Output Example

```json
{
  "resourceType": "Bundle",
  "id": "dlinrt-export-2026-01-31",
  "type": "collection",
  "timestamp": "2026-01-31T00:00:00Z",
  "meta": {
    "source": "https://dlinrt.eu",
    "lastUpdated": "2026-01-31T00:00:00Z"
  },
  "total": 95,
  "entry": [
    {
      "resource": {
        "resourceType": "Organization",
        "id": "org-mvision-ai",
        "name": "MVision AI",
        "type": [{
          "coding": [{
            "system": "http://terminology.hl7.org/CodeSystem/organization-type",
            "code": "prvd",
            "display": "Medical Device Manufacturer"
          }]
        }],
        "telecom": [{
          "system": "url",
          "value": "https://mvision.ai"
        }]
      }
    },
    {
      "resource": {
        "resourceType": "DeviceDefinition",
        "id": "dlinrt-mvision-ai-contouring",
        "name": [{
          "name": "Contour+",
          "type": {
            "coding": [{
              "system": "http://hl7.org/fhir/devicedefinition-nametype",
              "code": "registered-name"
            }]
          }
        }],
        "description": "AI-powered auto-contouring solution...",
        "manufacturer": {
          "reference": "Organization/org-mvision-ai",
          "display": "MVision AI"
        },
        "version": "1.3.1",
        "classification": [{
          "type": {
            "coding": [{
              "system": "https://dlinrt.eu/categories",
              "code": "auto-contouring",
              "display": "Auto-Contouring"
            }]
          }
        }],
        "property": [
          {
            "type": {
              "coding": [{
                "system": "https://dlinrt.eu/properties",
                "code": "modality",
                "display": "Imaging Modality"
              }]
            },
            "valueCodeableConcept": [{
              "coding": [{
                "system": "http://dicom.nema.org/resources/ontology/DCM",
                "code": "CT",
                "display": "Computed Tomography"
              }]
            }]
          },
          {
            "type": {
              "coding": [{
                "system": "https://dlinrt.eu/properties",
                "code": "anatomical-location",
                "display": "Anatomical Location"
              }]
            },
            "valueCodeableConcept": [{
              "coding": [{
                "system": "http://snomed.info/sct",
                "code": "774007",
                "display": "Head and/or neck structure"
              }]
            }]
          }
        ],
        "regulatoryIdentifier": [{
          "type": "license",
          "identifier": "K241490",
          "issuer": "http://fda.gov",
          "jurisdiction": "http://unstats.un.org/unsd/methods/m49/m49.htm#840"
        }]
      }
    }
  ]
}
```

---

## Validation Approach

The implementation will include:
1. Required field validation before transformation
2. Terminology code validation (warn on unmapped values)
3. Reference integrity checks
4. FHIR R4 structure compliance

---

## Integration Points

### Export Service Integration

Add to `ExportService.ts`:
```typescript
case "fhir":
  downloadFHIRBundle(products, companies);
  break;
```

### Company Export Integration

Add to company export options alongside Excel, PDF, JSON.

---

## Testing Recommendations

After implementation:
1. Validate output against FHIR R4 DeviceDefinition schema
2. Test with FHIR validator (https://validator.fhir.org/)
3. Verify SNOMED CT codes are valid
4. Verify DICOM modality codes are valid
5. Test bundle parsing with HAPI FHIR client

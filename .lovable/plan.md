

# FHIR Export Integration Design Options

## Overview

This analysis compares different approaches for integrating FHIR export functionality with the existing model card export system, considering that FHIR is not currently used but should be available for healthcare interoperability needs. Go for option B

---

## Current Architecture Summary

| Component | Purpose | Formats |
|-----------|---------|---------|
| **Model Card Export** | Human-readable product documentation | PDF, Excel, CSV, JSON |
| **FHIR Export** | Healthcare system interoperability | FHIR R4 Bundle (DeviceDefinition) |

The model card exports are designed for **research and documentation**, while FHIR is designed for **system-to-system data exchange** in healthcare environments.

---

## Design Options Analysis

### Option A: Simple Toggle on Export Section

```text
┌──────────────────────────────────────────┐
│ Export Model Card                        │
├──────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐  │
│ │ ☐ Include FHIR-compatible format    │  │
│ │   (Healthcare interoperability)     │  │
│ └─────────────────────────────────────┘  │
│                                          │
│ [📄 Export to PDF]                       │
│ [📊 Export to Excel]                     │
│ [📥 Export to CSV]                       │
│ [📝 Export to JSON]                      │
└──────────────────────────────────────────┘
```

**Behavior:** When toggle is ON, JSON export includes both model card data AND FHIR-structured data.

| Pros | Cons |
|------|------|
| Simple, unobtrusive | Confuses model card purpose with FHIR |
| Easy to discover | Doesn't work well for PDF/Excel |
| No additional buttons | Users may not understand what FHIR means |

---

### Option B: Separate Healthcare Interoperability Section (Recommended)

```text
┌──────────────────────────────────────────┐
│ Export Model Card                        │
├──────────────────────────────────────────┤
│ [📄 Export to PDF]                       │
│ [📊 Export to Excel]                     │
│ [📥 Export to CSV]                       │
│ [📝 Export to JSON]                      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Healthcare Interoperability              │
├──────────────────────────────────────────┤
│ Export product data in standardized      │
│ healthcare formats for integration with  │
│ hospital information systems.            │
│                                          │
│ [🏥 Export FHIR Bundle]                  │
│                                          │
│ ☐ Include terminology warnings report    │
│                                          │
│ ℹ️ FHIR R4 DeviceDefinition format       │
│    Uses SNOMED CT & DICOM codes          │
└──────────────────────────────────────────┘
```

| Pros | Cons |
|------|------|
| Clear separation of concerns | More UI space required |
| Educational - explains FHIR purpose | Two sections instead of one |
| Can add more interoperability formats later | Slightly more complex |
| Shows FHIR readiness (unmapped terms) |  |

---

### Option C: Enhanced JSON Export with Format Selector

```text
┌──────────────────────────────────────────┐
│ Export Model Card                        │
├──────────────────────────────────────────┤
│ [📄 Export to PDF]                       │
│ [📊 Export to Excel]                     │
│ [📥 Export to CSV]                       │
│                                          │
│ JSON Format:                             │
│ ┌────────────────────────────────────┐   │
│ │ [▼ Model Card (Default)]           │   │
│ │     Model Card (Default)           │   │
│ │     FHIR DeviceDefinition          │   │
│ │     Combined (Both formats)        │   │
│ └────────────────────────────────────┘   │
│ [📝 Export to JSON]                      │
└──────────────────────────────────────────┘
```

| Pros | Cons |
|------|------|
| Single section, clean UI | Hides FHIR visibility |
| Logical grouping (all JSON formats) | Less educational |
| Progressive disclosure | May confuse users about differences |

---

### Option D: Collapsible Advanced Export Section

```text
┌──────────────────────────────────────────┐
│ Export Model Card                        │
├──────────────────────────────────────────┤
│ [📄 Export to PDF]                       │
│ [📊 Export to Excel]                     │
│ [📥 Export to CSV]                       │
│ [📝 Export to JSON]                      │
│                                          │
│ ▶ Advanced Export Options                │
└──────────────────────────────────────────┘

(When expanded:)
┌──────────────────────────────────────────┐
│ ▼ Advanced Export Options                │
├──────────────────────────────────────────┤
│ Healthcare Interoperability:             │
│ [🏥 FHIR R4 Bundle]                      │
│                                          │
│ ℹ️ SNOMED CT anatomy codes               │
│ ℹ️ DICOM modality codes                  │
└──────────────────────────────────────────┘
```

| Pros | Cons |
|------|------|
| Clean default view | FHIR is "hidden" by default |
| Power users can find it | Less discoverable |
| Room for future advanced options | Extra click required |

---

## Recommendation: Option B with Enhancement

**Recommended approach:** Create a **separate "Healthcare Interoperability" section** below the Model Card export, with:

1. **Clear explanation** of what FHIR is and why it matters
2. **FHIR readiness indicator** showing if product has unmapped terminology
3. **Optional warnings report** download for data quality review
4. **Future extensibility** for other standards (HL7v2, CDA, etc.)

### Additional Feature: FHIR Readiness Badge

Add a small indicator showing FHIR export quality:

```text
┌──────────────────────────────────────────┐
│ Healthcare Interoperability              │
├──────────────────────────────────────────┤
│                                          │
│ FHIR Readiness: ●●●○ Good               │
│ (3/4 fields have standardized codes)     │
│                                          │
│ [🏥 Export FHIR Bundle]                  │
│                                          │
│ ☐ Include terminology warnings report    │
└──────────────────────────────────────────┘
```

This helps users understand that:
- Not all products have complete SNOMED/DICOM mappings
- The export will still work, but with warnings for unmapped values
- They can improve data quality over time

---

## Implementation Summary

### New Files

| File | Purpose |
|------|---------|
| `src/components/product/FHIRExportSection.tsx` | New UI component for FHIR export |

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/ProductDetails.tsx` | Add FHIRExportSection below Model Card export |
| `src/utils/fhir/fhirExporter.ts` | Add single-product export function |

### New Features

1. **Single-product FHIR export** - Currently only bulk export exists
2. **FHIR readiness check** - Preview function already exists (`getFHIRExportPreview`)
3. **Inline warnings display** - Show unmapped fields before export

---

## Technical Implementation Details

### Single Product FHIR Export Function

```typescript
// New function in fhirExporter.ts
export function downloadProductFHIRBundle(
  product: ProductDetails,
  company?: CompanyDetails
): FHIRExportResult {
  return downloadFHIRBundle(
    [product], 
    company ? [company] : [],
    { includeOrganizations: true }
  );
}
```

### FHIR Readiness Calculation

```typescript
// Calculate readiness score based on mapped terminology
function calculateFHIRReadiness(product: ProductDetails): {
  score: number;  // 0-4
  label: string;  // "Excellent", "Good", "Fair", "Limited"
  details: string[];  // Unmapped fields
} {
  let score = 0;
  const details: string[] = [];
  
  // Check modality mapping
  if (hasModalityMapping(product.modality)) score++;
  else details.push("Modality needs DICOM code");
  
  // Check anatomy mapping
  if (hasAnatomyMapping(product.anatomy)) score++;
  else details.push("Anatomy needs SNOMED CT code");
  
  // Check disease mapping
  if (hasDiseaseMapping(product.diseaseTargeted)) score++;
  else details.push("Disease needs ICD-10/SNOMED code");
  
  // Check regulatory identifiers
  if (hasRegulatoryIds(product)) score++;
  else details.push("No FDA/CE identifiers");
  
  const labels = ["Limited", "Fair", "Good", "Excellent"];
  return { score, label: labels[score] || "Limited", details };
}
```

### FHIRExportSection Component Structure

```typescript
interface FHIRExportSectionProps {
  product: ProductDetails;
  company?: CompanyDetails;
}

const FHIRExportSection = ({ product, company }: FHIRExportSectionProps) => {
  const [includeWarnings, setIncludeWarnings] = useState(false);
  const readiness = useMemo(() => calculateFHIRReadiness(product), [product]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthcare Interoperability</CardTitle>
        <CardDescription>
          Export in FHIR R4 format for integration with hospital systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Readiness indicator */}
        <FHIRReadinessIndicator readiness={readiness} />
        
        {/* Export button */}
        <Button onClick={handleFHIRExport}>
          <Hospital className="h-4 w-4 mr-2" />
          Export FHIR Bundle
        </Button>
        
        {/* Warnings toggle */}
        <Checkbox 
          checked={includeWarnings}
          onCheckedChange={setIncludeWarnings}
        />
        <Label>Include terminology warnings report</Label>
      </CardContent>
    </Card>
  );
};
```

---

## Summary

| Aspect | Decision |
|--------|----------|
| **Location** | Separate section below Model Card export |
| **Visibility** | Always visible (not hidden in dropdown) |
| **Education** | Include explanation of FHIR purpose |
| **Quality indicator** | Show FHIR readiness score |
| **Warnings** | Optional downloadable report |
| **Future-proof** | Room for additional interoperability standards |

This approach keeps FHIR visible and accessible while clearly separating it from research-focused model card exports, acknowledging that different audiences have different needs.


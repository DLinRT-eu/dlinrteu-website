

# Export & Standards Audit

## Current Export Inventory

| Format | Scope | Implementation |
|--------|-------|---------------|
| CSV | All products | `exportProducts.ts` |
| Excel | Single + bulk products, companies | `modelCard/exporters/`, `companyExport/` |
| PDF | Single + bulk products, companies | Same directories |
| JSON | Single + bulk products, companies | Same directories |
| FHIR R4 | Products + companies → DeviceDefinition + Organization | `utils/fhir/` |
| PPTX | Dashboard + analytics | `pptxExport.ts` |

---

## Issue 1: CSV Export Missing 15+ Fields

`exportProducts.ts` was written before several major data model additions. Missing fields:

- **Evidence classification**: `evidenceRigor`, `clinicalImpact`, `evidenceRigorNotes`, `clinicalImpactNotes`
- **Study quality booleans**: `evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation`
- **Guidelines**: name, version, compliance status
- **Relationships**: `developedBy` (company, relationship), `partOf` (parent system)
- **Product metadata**: `usesAI`, `developmentStage`
- **Regulatory**: TGA (Australia), TFDA (Taiwan) — only CE and FDA are exported
- **Structures**: `dosePredictionModels` (treatment planning products)

## Issue 2: Model Card Data Generator Missing Fields

`modelCard/dataGenerator.ts` captures evidence rigor and guidelines but omits:

- All 5 study quality booleans
- TGA/TFDA regulatory status
- `developmentStage`, `usesAI`
- `partOf` relationship
- `dosePredictionModels`

This means Excel/PDF/JSON single-product exports are also incomplete.

## Issue 3: FHIR DeviceDefinition Missing Key Properties

The FHIR transformer (`deviceDefinition.ts`) maps modality (DICOM), anatomy (SNOMED CT), and disease (ICD-10) but is missing:

- **Evidence classification** — not exported as DeviceDefinition properties
- **Guidelines compliance** — not mapped (could use `safety` element or custom properties)
- **TGA/TFDA** regulatory identifiers — only FDA and CE are transformed
- **Supported structures** — not included in any FHIR property (significant gap for auto-contouring products)
- **Technical specs** (input/output formats, processing time) — not mapped to properties
- **Pricing/market** — not exported

## Issue 4: No Alternative Standard Exports

Currently only FHIR R4 is supported. Potential additions relevant to RT and healthcare interoperability:

- **IHE AIR (AI Results)** profile — emerging standard for AI result reporting
- **DICOM Structured Report (TID 4019)** — could encode AI device characteristics
- **Schema.org MedicalDevice** — for SEO/linked data (simple JSON-LD on product pages)

---

## Planned Changes

### Phase 1: Complete CSV Export (1 file)
**`src/utils/exportProducts.ts`** — Add ~15 missing columns: evidence classification (E0-E3/I0-I5), 5 study quality booleans, guidelines (joined), developedBy, partOf, usesAI, developmentStage, TGA status, TFDA status.

### Phase 2: Complete Model Card Data (1 file)
**`src/utils/modelCard/dataGenerator.ts`** — Add study quality booleans section, TGA/TFDA to regulatory, developmentStage, partOf, dosePredictionModels to the `ModelCardData` type.

**`src/utils/modelCard/types.ts`** — Extend `ModelCardData` interface with new sections.

### Phase 3: Complete FHIR Export (1 file)
**`src/utils/fhir/transformers/deviceDefinition.ts`** — Add:
- Evidence classification as custom properties (`dlinrt:evidence-rigor`, `dlinrt:clinical-impact`)
- Study quality booleans as properties
- Supported structures as properties (with SNOMED CT mapping where possible)
- TGA and TFDA as regulatory identifiers
- Technical specs (input/output formats) as properties
- Guidelines as `safety` CodeableConcepts

### Phase 4: Schema.org MedicalDevice (new file)
**`src/utils/schemaOrg/medicalDeviceSchema.ts`** — Generate JSON-LD `MedicalDevice` markup for product pages. Lightweight, improves SEO, uses existing data. Embed via `react-helmet` on product detail pages.

### Summary
- 4-5 files modified
- ~15 missing CSV columns added
- FHIR export gains evidence, structures, TGA/TFDA, tech specs
- Model card exports gain study quality + regulatory completeness
- New Schema.org JSON-LD for discoverability


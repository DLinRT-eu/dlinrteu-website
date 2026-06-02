# Export Features Audit — DLinRT (Build Log)

All proposed enrichments now shipped. The original audit is preserved below for reference.

## Implemented

### P0 — Correctness
- ✅ Centralized RFC 4180 CSV escaping in `src/utils/csv.ts`; `ExportService`, `exportProducts`, `exportUtils` all use it.
- ✅ Fixed HTA mapping to read `regulatory.intendedUseStatement` and `anatomicalLocation`.
- ✅ FHIR / HTA / initiatives exports now honor `options.filename`.
- ✅ Refactored `exportProducts.ts` to expose `buildProductsCsv()` for reuse.

### P1 — Coverage
- ✅ `ProductGridControls` now offers PDF, FHIR R4, HTA, AID-RT and ZIP bundle for both filtered and full sets.
- ✅ `Companies` page exports to FHIR R4.
- ✅ Bulk AID-RT export (`exportBulkProductsToAidrt`).
- ✅ ZIP bundle (`downloadProductsBundle`): CSV + JSON + FHIR + warnings + manifest + README.
- ✅ Manifest generator (`exportManifest.ts`) with schema version, license, disclaimer, citation.
- ✅ Initiatives export extended to Excel and schema.org JSON-LD (`exportInitiativesToExcel`, `exportInitiativesToJsonLd`).
- ✅ `ExportButton` exposes JSON-LD when `type === 'initiatives'`.

### P2 — UX
- ✅ Standardized button labels (no redundant `.xlsx` suffixes).
- ✅ Row-count warning (`window.confirm`) before bulk PDF or HTA exports above 50 products.

### P3 — Documentation
- ✅ CSV column dictionary published at `public/schemas/dlinrt-csv-fields.md`.
- ✅ "Data Exports" section added to `public/llms.txt` and `docs/README.md`.

## Files added

- `src/utils/csv.ts`
- `src/utils/exportManifest.ts`
- `src/utils/exportBundle.ts`
- `src/utils/initiativesExport.ts`
- `src/utils/modelCard/exporters/bulkAidrtExporter.ts`
- `public/schemas/dlinrt-csv-fields.md`

## Files modified

- `src/services/ExportService.ts` — new formats: `bundle`, `aidrt`, `jsonld`.
- `src/utils/exportProducts.ts` — split CSV builder.
- `src/utils/exportUtils.ts`, `src/utils/fhir/fhirExporter.ts`, `src/utils/fhir/types.ts`, `src/utils/htaExport/htaExporter.ts` — correctness fixes.
- `src/components/grid/ProductGridControls.tsx` — full export menu, row-count guard.
- `src/components/common/ExportButton.tsx` — JSON-LD for initiatives.
- `src/pages/Companies.tsx` — FHIR R4 export wired in.
- `public/llms.txt`, `docs/README.md` — docs.

## Out of scope (deferred)

- Server-side / async export jobs.
- DICOM SR / HL7 v2 export.
- Per-user saved export presets.
- Per-product PDF/FHIR consolidation in `ExportButton` (single-product page already uses dedicated buttons).

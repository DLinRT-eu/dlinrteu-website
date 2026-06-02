
# Export Features Audit — DLinRT

## 1. Inventory of export surfaces

**Product exports** (`ExportService.exportProducts`)
- Entry points: `ProductGridControls` (filtered + all, CSV/Excel/JSON/HTA), `ExportButton` (CSV/Excel/JSON), single-product buttons in `ProductDetails.tsx` (Excel/CSV/JSON/PDF + AID-RT JSON + FHIR).
- Implementations: `utils/exportProducts.ts` (CSV, ~110 fields), `utils/modelCard/exporters/*` (Excel/PDF/JSON, single + bulk), `utils/htaExport` (EUnetHTA workbook), `utils/fhir` (R4 Bundle), `utils/modelCard/aidrtExporter` (AID-RT JSON).

**Company exports** (`utils/companyExport`)
- Entry: `pages/Companies.tsx` (Excel/PDF/JSON). FHIR re-exported but not wired to UI.

**Initiatives exports** (`ExportService.exportInitiatives`)
- CSV + JSON only. No Excel/PDF/FHIR.

**Review rounds**: `RoundExportButton` (separate path, PDF/CSV via `reviewRoundsPdfExporter` + `exportReviewRounds`).

**Charts**: per-chart `ChartExportButton` → PNG only.

**Generic helpers**: `utils/exportUtils.ts` and inline CSV/JSON writers inside `ExportService`.

## 2. Issues found

### Correctness / robustness
- `ExportService.exportToCSV` and `utils/exportUtils.ts` quote only when value contains comma — they DO NOT escape embedded quotes or newlines (RFC 4180 violation). The richer `escapeValueForCsv` in `exportProducts.ts` is correct but not reused.
- `ExportService.exportInitiatives` builds a `filename` variable that is then ignored (passes nothing to helpers).
- `Companies.tsx` export does not use `ExportService`; FHIR for companies exists in code but is unreachable from UI.
- HTA export path in `ExportService` ignores the `filename` option (HTA exporter hardcodes its name).
- FHIR download always names file `dlinrt-fhir-export-<date>.json` regardless of `options.filename`.
- `prettyPrint` is destructured but `restOptions` is recomputed inside `exportToFHIR` — minor, no bug, just inconsistent.
- HTA "Intended use" reads `(p as any).intendedUse`, but products store this under `regulatory.intendedUseStatement` (so column is empty for almost all products).
- HTA "Target anatomy" reads `p.anatomy`, but the canonical field is `anatomicalLocation` (column likely empty).

### Coverage gaps
- No PDF for the products list (single-product PDF exists; bulk PDF exists in code but not exposed in `ProductGridControls`).
- No FHIR export from `ProductGridControls` (filtered/all). Only available per-product.
- No AID-RT bulk export (only single product on detail page).
- Initiatives: no Excel, PDF, or schema-aligned JSON-LD.
- No structure-comparison export from `CompareStructures` page (separate `comparisonExporter` exists — verify wiring).
- No "Export selection" — users can't pick a subset; only "filtered" vs "all".
- No README/manifest file inside exports describing schema version, export date, license, citation. Especially relevant for academic reuse of CSV/JSON.
- No ZIP bundle option (e.g., CSV + JSON + FHIR + warnings + README in one download).
- No newsletter/changelog export, no user/role audit export (admin use).

### UX
- Inconsistent terminology: "Export" vs "Export All" vs "Export to X" vs "Export as X".
- No file-size hint or row-count toast before downloading large bulk exports.
- No progress indicator for bulk PDF (which can take seconds).
- HTA dropdown labels duplicate "(.xlsx)" suffix while other formats don't.
- The single-product `ExportButton` doesn't expose PDF/FHIR/AID-RT, even though they exist for that view.

### Discoverability / docs
- No public schema/columns reference for the CSV. `public/schemas/` contains JSON model card schemas, but not a CSV column dictionary.
- `llms.txt` and README don't link to FHIR/HTA capability.

## 3. Proposed enrichments (prioritized)

### P0 — correctness fixes
1. Replace ad-hoc CSV writers in `ExportService` and `utils/exportUtils.ts` with the RFC-4180 escaper from `exportProducts.ts` (centralize in `utils/csv.ts`).
2. Fix HTA mapping: read `regulatory.intendedUseStatement` and `anatomicalLocation`.
3. Honor `options.filename` in FHIR + HTA paths.
4. Use the chosen filename in `ExportService.exportInitiatives`.

### P1 — coverage
5. Add **FHIR** and **bulk PDF** options to `ProductGridControls` dropdown (filtered + all).
6. Add a **manifest/README.md** to multi-file or rich exports (schema version, generated-at, source URL, license note, "informational only" disclaimer for HTA).
7. Add a **ZIP bundle** option ("Export full dataset"): CSV + JSON + FHIR + manifest. Use `jszip`.
8. Wire **company FHIR** export to `Companies.tsx` dropdown.
9. Add **bulk AID-RT JSON** export.
10. Extend **initiatives** export to Excel + JSON-LD (schema.org `ResearchProject` / `Dataset`).

### P2 — UX polish
11. Group the product export dropdown by intent: *Catalogue data* (CSV/Excel/JSON), *Interoperability* (FHIR R4), *Regulatory* (HTA dossier), *Reports* (PDF). Same pattern in `ExportButton`.
12. Show row-count and warn above N rows before generating PDF/HTA.
13. Add toast with file size after generation for bulk exports.
14. Standardize button copy and remove redundant ".xlsx" suffix.
15. In single-product view, expose FHIR + AID-RT through one unified dropdown (today scattered across multiple buttons).

### P3 — documentation & schema
16. Publish a CSV column dictionary at `public/schemas/dlinrt-csv-fields.md` (or JSON), referenced from README and from the export's manifest.
17. Add a small "Data Exports" section to `llms.txt` and `docs/README.md`.

## 4. Suggested implementation order

```text
Step 1  Centralize CSV escaping (utils/csv.ts)
Step 2  Fix HTA field mappings + filename plumbing
Step 3  Add FHIR + bulk PDF to ProductGridControls
Step 4  Wire company FHIR; add bulk AID-RT
Step 5  Add manifest + ZIP bundle export
Step 6  Initiatives: Excel + JSON-LD
Step 7  UX grouping + copy + size/row warnings
Step 8  CSV field dictionary + docs
```

Each step is independent and shippable. Steps 1–4 are purely additive and low-risk; step 5 introduces `jszip` (~30KB gz).

## 5. Out of scope (intentionally)

- Server-side export jobs / async downloads.
- DICOM SR / HL7 v2 export (FHIR R4 covers interoperability for now).
- Per-user saved export presets.

Tell me which steps you want me to implement (e.g. "P0 + step 3 + step 5") and I'll switch to build mode.

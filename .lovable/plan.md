# Product export audit — findings and fixes

The catalogue supports eight export formats (CSV, Excel, PDF, JSON, FHIR, HTA, AID-RT, ZIP bundle). The audit found silently wrong data in the HTA dossier, a formatting bug in the main CSV, inconsistent JSON shapes, missing newer evidence fields everywhere, and three different UI surfaces offering different format sets.

## Confirmed defects (data correctness first)

1. HTA dossier `EFF` sheet reads `product.studyQuality`, which does not exist. Real flags are top-level `evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation`. Every product currently exports "No" for all five. (`src/utils/htaExport/htaExporter.ts:101`)
2. HTA `SAF` sheet treats `safetyCorrectiveActions` as an object with `.count`/`.summary`/`.actions`; it is an array. All recall/FSCA data is dropped. (`htaExporter.ts:132`)
3. HTA `LEG`/`ORG` sheets read `marketPresence`, `certification`, `intendedUse` — none exist. Correct paths: `market.onMarketSince`, `regulatory.intendedUseStatement`. (`htaExporter.ts:181,195,196`)
4. Main CSV writes `product.evidence` raw; when it is an array of objects the cell becomes `[object Object]; [object Object]`. (`src/utils/exportProducts.ts:144`)

## Consistency defects

5. Single-product JSON and bulk JSON produce different shapes from the same `format: "json"` entry point — bulk adds a full `rawProductData` dump, single does not.
6. The third evidence axis is labelled three ways: `adoptionReadiness` (type), "Implementation Burden" (CSV header), "Implementation burden (Z0–Z5)" (HTA).
7. `ExportButton.tsx` offers only CSV/Excel/JSON for products; the grid offers all eight; the product detail page hand-rolls its own five and bypasses `ExportService`, so FHIR/HTA/bundle are unreachable for a single product.
8. Four different filename strategies (hardcoded `dlinrt-products.csv`, `Date.now()` default, `createSafeFileName`, HTA's own `safeFile`).
9. `modelCard/exporters/csvExporter.ts` reimplements CSV escaping instead of using `src/utils/csv.ts`.
10. `aidrtMapping.ts`'s `dlinrtOnlyFields` documentation list is imported nowhere (dead code).

## Coverage gaps (newer schema fields absent from all curated exports)

`keyPapers` (per-publication scoring), `categoryEvidence`, `structureHistory`/`structuresProvenance`, `priorVersions`/`supersededBy`, `evidenceScoreOverride`, `monitorsAIProducts`, `trainingData.sourceAccess`/`sourceRetrievedOn`, `evaluationData.sourceAccess`/`sourceRetrievedOn`. Excel and PDF additionally drop `trainingData`, `evaluationData`, `safetyCorrectiveActions` and the study-quality flags even though `dataGenerator.ts` already computes them.

## Proposed work

Phase 1 — correctness (no schema change)
- Fix the three HTA field-path bugs so study quality, FSCAs, market date and intended use populate.
- Format `product.evidence` in the CSV with a helper matching the existing `formatGuidelines`/`formatFSCAs` style.
- Add the missing `trainingData` / `evaluationData` / `safetyCorrectiveActions` / study-quality sheets and sections to the Excel and PDF exporters using data `dataGenerator` already produces.

Phase 2 — coverage and consistency
- Add CSV columns for per-publication scoring summary (`keyPapers` count plus formatted list), `categoryEvidence`, versioned-structure info, `priorVersions`/`supersededBy`, `monitorsAIProducts`, and the source-disclosure fields.
- Make single-product JSON match bulk JSON (include `rawProductData`).
- Unify the third-axis label to "Adoption Readiness (R0–R5)" across CSV, HTA and docs.
- Route the product detail page through `ExportService` and expose FHIR/HTA/bundle there; broaden `ExportButton` to the full product format set.
- Route `modelCard/exporters/csvExporter.ts` through `src/utils/csv.ts`; introduce one shared filename helper.

Phase 3 — documentation
- Update `public/schemas/dlinrt-csv-fields.md` for the new columns and the renamed axis.
- Update `public/schemas/dlinrt-model-card-schema.json` to match the actual export shape (`guidelines` as `{compliance, details}`, combined `evidenceLevel`, `rawProductData`), and document the FHIR scope decision.
- Either wire `dlinrtOnlyFields` into the AID-RT export as an `unmappedFields` note or delete it.

## Technical notes

Files touched: `src/utils/htaExport/htaExporter.ts`, `src/utils/exportProducts.ts`, `src/utils/modelCard/exporters/{excelExporter,pdfExporter,jsonExporter,bulkJsonExporter,csvExporter}.ts`, `src/services/ExportService.ts`, `src/components/common/ExportButton.tsx`, `src/pages/ProductDetails.tsx`, plus the two schema docs. No product data files change and no evidence scores change.

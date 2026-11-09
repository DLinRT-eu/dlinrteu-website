# EUDAMED details in all exports and docs

## Problem
The product pages show EUDAMED registry details (Basic UDI-DI, UDI-DI, EMDN code, manufacturer, platform/related-entity note) for 28 products. The exports only read the hand-entered EUDAMED block, so most of these registry matches are missing from downloads, and UDI-DI, EMDN, manufacturer name and the scope note are never exported.

## What changes
1. **All exports use the same EUDAMED data as the product page** (hand-entered plus registry-verified, merged the same way):
   - Catalogue CSV / Excel: add columns UDI-DI, EMDN code, Manufacturer name, Registration note; existing EUDAMED columns filled from the merged data.
   - Model card (JSON, CSV, Excel, PDF, bulk versions): EUDAMED block with all fields; PDF shows a small "EUDAMED registration" box in the regulatory section, including the platform/Siemens-attribution note.
   - FHIR: keep Basic UDI-DI identifier; add UDI-DI as a second identifier and EMDN as a classification code.
   - Company export (Excel): add UDI-DI and EMDN.
   - AID-RT export: map Basic UDI-DI/EMDN only if the schema has a matching field; otherwise leave empty (strict mapping rule).
2. **Other items worth adding to the exports** (currently on the page but missing or partial in downloads):
   - Market status (active / pipeline / discontinued) and discontinuation date/reason.
   - "Part of" / module relationship (e.g. ARTAssistant in MOZI TPS).
   - Name history in the model card and PDF (CSV already has it).
   - Absence note: "Not found in EUDAMED (searched date)" where recorded, never inferred.
3. **Documentation**: README (export section + EUDAMED verification script), FIELD_REFERENCE (all EUDAMED fields and how registry matches are produced), REVIEWER_GUIDE / review GUIDE (how to read platform registrations), llms.txt and the CSV field list on the site.
4. **Tests**: one test that a registry-only product (e.g. a TheraPanacea application) gets UDI-DI and EMDN in the CSV and model card; one that the platform note is carried through.

## Technical details
- Use `getProductEudamed(product)` in `exportProducts.ts`, `modelCard/dataGenerator.ts`, `fhir/transformers/deviceDefinition.ts`, `companyExport/excelExporter.ts`; extend `modelCard/types.ts` eudamed block with `primaryDi`, `emdnCode`, `manufacturerName`, `registrationNote`.
- Lifecycle via `productLifecycle` helpers; no data changes to product files.
- Educational disclaimer kept in PDF.

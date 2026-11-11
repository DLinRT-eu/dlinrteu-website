# EUDAMED details in catalogue downloads: registry first

## Goal
Every catalogue download (CSV, Excel, company and model-card spreadsheets) shows the UDI details from the latest verified EUDAMED registry match. A manual edit is used only when the registry has no match.

## Current behaviour
- The downloads already have EUDAMED columns. They read them through one shared lookup.
- That lookup puts manually edited values (in the product's CE block) **ahead of** the registry match. A manual edit therefore wins, even if it is out of date.
- Only the first registry match is exported. Products with more than one registered device (e.g. a platform with several Basic UDI-DIs) lose the rest.

## Changes
1. **Registry-first lookup for downloads.** Add a resolver for downloads. When a verified registry record exists, it supplies Basic UDI-DI, UDI-DI, EMDN, risk class, trade name, SRN, manufacturer, source link and last-verified date. A manual edit fills only fields the registry leaves empty, and is used fully only when no registry match exists.
2. **Provenance columns.** Add "EUDAMED Data Source" (Registry / Manual / Registry + manual) and "EUDAMED Registry Snapshot Date" (the date the registry file was last regenerated). Add "EUDAMED Manual Mismatch" when a manual Basic UDI-DI differs from the registry match, so reviewers can spot stale edits.
3. **All registered devices.** Export every registry match per product: the main columns show the first match, and an "All Basic UDI-DIs" column joins the rest with semicolons.
4. **Apply everywhere.** Catalogue CSV, catalogue Excel, company export and model-card exports all use the same resolver. Product pages keep their current display unchanged.
5. **Tests.** Registry overrides a conflicting manual value; manual is used when no registry match exists; mismatch flag set; multiple matches all listed; source column correct.
6. **Docs.** Update the export section of the field reference, and the existing EUDAMED rule in AGENTS.md (registry wins in exports).

## Not included
- The registry file is still refreshed by running the existing verify script. The download reflects the latest refresh that has been published. Automatic scheduled refreshes can be a follow-up.
- No changes to which matches count as verified.

## Technical details
- New `getExportEudamed(product)` in `src/utils/eudamed.ts` returning `{ record, all, source, mismatch }`; snapshot date from `udiVerified.json` metadata (`generatedAt` or the max `lastVerified`).
- Update `src/utils/exportProducts.ts`, `src/utils/companyExport/excelExporter.ts`, model-card exporters and the main catalogue Excel builder to use it.
- Tests in `scripts/` alongside existing EUDAMED tests; run `bun test scripts`.

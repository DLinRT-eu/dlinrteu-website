# Evidence in the exports, down to the single paper

## Goal

Anyone comparing DLinRT with another catalogue must be able to check our scores source by source. Two changes:

1. Every product export carries the product-level evidence score.
2. A new per-source export lists each paper or source used to set that score, with its own scores and a DOI or link.

## What exists today

- The CSV export already carries the evidence columns, including a compact "Scored Publications" text field.
- The **Excel exports do not**: neither the multi-product workbook (Summary / Detailed / Regulatory sheets) nor the single-product workbook shows the score or the papers.
- The PDF, JSON and bundle exports show a combined score string but no per-paper breakdown.

## Change 1 — evidence on every product export

Add to the multi-product Excel workbook and the single-product workbook, and to the JSON model card:

- Evidence Rigor (E0–E3) and its notes
- Clinical Impact (I0–I5) and its notes
- Adoption Readiness (R0–R5) and its notes
- Readiness signal label
- Whether the score comes from the scored papers, a documented override, or a stored value — plus the override reason when set
- Study-quality flags: vendor independent, multi-centre, multi-national, prospective, external validation
- Number of scored papers

Scores are read through the existing scoring helper so exports and website always agree.

## Change 2 — new per-source evidence export

One row per paper or source per product, so rows can be lined up against another catalogue:

| Column group | Columns |
| --- | --- |
| Product | Product ID, Product Name, Company, Category, Applies To Category |
| Source | Title, Authors, Journal, Year, DOI, PMID, Link (DOI resolved to a `https://doi.org/...` URL when only the DOI is present) |
| Scores | Evidence Rigor, Clinical Impact, Rationale |
| Study quality | Vendor Independent, Multi-Center, Multi-National, Prospective, External Validation |
| Context | Sets Product Rigor (yes/no), Sets Product Impact (yes/no), Product Rigor, Product Impact, Product Adoption Readiness |

Products with no scored paper get a single row marked "No scored publication", so nothing disappears silently.

Available as:
- an extra **Evidence by Source** sheet in the multi-product Excel workbook and in the single-product workbook,
- a standalone **CSV** download (`dlinrt-evidence-by-source-<date>.csv`) offered next to the existing exports,
- `evidence-by-source.csv` inside the ZIP bundle, listed in the bundle manifest and README.

## One point to be aware of

The third axis, Adoption Readiness (R), is a product-level judgement about residual implementation effort — it is not a property of an individual paper, and no per-paper R value exists in the data. So per-source rows carry E and I plus the study-quality flags, and the product's R is repeated on each row for context. If you want R scored per source too, that is a data-model change plus re-scoring every entry; say so and I will plan it separately.

No score, rationale or flag is invented: every column is read from data already recorded, and empty stays empty.

## Technical notes

- New `src/utils/evidenceSourceExport.ts`: `buildEvidenceBySourceRows(products)` and `buildEvidenceBySourceCsv(products)`, using `computeProductEvidenceScore` from `src/utils/evidenceScoring.ts` for origin, `rigorSource`/`impactSource` and flag resolution.
- Extend `src/utils/modelCard/exporters/bulkExcelExporter.ts` (Summary sheet gains E/I/R columns; new "Evidence by Source" sheet) and `excelExporter.ts` (Performance sheet gains the score fields; new "Evidence by Source" sheet).
- Extend `src/utils/modelCard/dataGenerator.ts` to expose `evidenceRigor`, `clinicalImpact`, `adoptionReadiness`, origin and scored-paper count separately rather than only the combined string, so JSON/PDF pick them up.
- Add `evidence-by-source.csv` to `src/utils/exportBundle.ts` and its manifest entry; register a `"evidence"` format in `src/services/ExportService.ts` and surface it in the export UI.
- Document the new columns in `public/schemas/dlinrt-csv-fields.md`.
- Verify with `npx tsgo --noEmit -p tsconfig.app.json`, `npm run test`, and a browser run downloading the workbook and CSV.

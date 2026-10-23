# More readable PDF model card, with evidence levels

## Goal
Make the exported PDF look more like the product page: coloured boxes and badges instead of plain label/value text. Add the evidence classification and the per-source scoring, which are computed but not printed today.

## What changes in the PDF

1. **Evidence summary box** near the top, under General Information:
   - Three coloured badges: Evidence Rigor (E0–E3), Levels of Efficacy (L1t–L6) and Adoption Readiness (R0–R5), each with its short meaning (e.g. "L3 — Clinical decision").
   - A "provisional" tag when a level is still provisional.
   - Study-quality chips (vendor-independent, multi-centre, multi-national, prospective, external validation) shown as filled or empty.
   - Rigor and efficacy notes in small text.
2. **Evidence by source**: one bordered card per publication or source, showing:
   - The title, year and DOI or link, which can be clicked.
   - Its own E and L badges.
   - A marker when that paper sets the product's level.
   This replaces today's single run-on "Performance Evidence" text block.
3. **Models / supported structures as boxes**:
   - Structures are grouped by region, like on the website, in light boxes with a header and a count (e.g. "Head & Neck — 42").
   - Each structure is listed in compact columns.
   - Investigational or unverified structures keep their marker.
4. **Regulatory as status chips**: green for cleared/certified, amber for pending, grey for not available, followed by the details.
5. **General polish**:
   - Section headers get a thin coloured accent bar instead of the heavy full-width block.
   - Label/value rows alternate with a light background.
   - Spacing is consistent, and the educational disclaimer appears in the footer.
   - All new elements use the existing page-break logic, so nothing runs off the page.
6. **Multi-product catalogue PDF**: it gets the same evidence summary box and regulatory chips per product. It also lists a product's sources in a short form (title, year and E/L badges), so long catalogues stay readable.

Colours follow the DLinRT steel-blue accent and the same level colours used on the website's evidence badges.

## Technical details
- Add badge, chip, boxed-group and source-card helpers to `src/utils/modelCard/exporters/pdfLayout.ts`, each aware of page breaks.
- Level colours and labels come from the existing canonical axis definitions (the same source the evidence badges and matrix use), not a new copy.
- Data comes from what `generateModelCardData` already returns: `evidenceScore`, `evidenceSources` and the study-quality flags. Structures are grouped with the same region parsing the website uses ("Region: Structure Name").
- Files: `pdfLayout.ts`, `pdfExporter.ts`, `bulkPdfExporter.ts`. Product data, scores, other export formats and the website itself are unchanged.
- Extend `scripts/pdfLayout.test.ts`:
  - L3 maps to the website's L3 colour and label.
  - A product with three key papers produces three source cards.
  - Nothing is drawn below the page limit.
- Verify by generating PDFs for AutoContour, MRCAT Prostate and a product without papers, then viewing the rendered pages.

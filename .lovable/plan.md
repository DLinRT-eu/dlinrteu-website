# Fix PDF model card overflow with long fields

## Problem (confirmed in code)
In both the single-product PDF (`pdfExporter.ts`) and the multi-product PDF (`bulkPdfExporter.ts`), each field checks for a page break only *before* it is drawn. Then the whole wrapped value goes onto the page in one go. A long early field (for example Description/intended use, Supported Structures, Evidence or CE details) runs past the bottom of the page. Text is cut off, overlaps the footer, and the next section starts in the wrong place. Other gaps:
- Key-feature bullets are never wrapped, so long bullets run off the right edge.
- The product name in the title bar and the company name in the top-right corner are not wrapped. The company text starts 40 mm from the right edge, so long names get cut off.
- A long label (for example "Intended Use Statement") can run into the value column.

## Fix
1. In both exporters, draw long values line by line. Start a new page whenever the next line would reach the footer area (stop about 20 mm above the bottom edge). On a continuation page, repeat the label with "(cont.)".
2. Wrap key-feature bullets to the content width, use a hanging indent, and break pages line by line.
3. Wrap labels inside the label column. Each row is as tall as its taller column.
4. Title bar: wrap the product name to at most 2 lines and cut off anything longer with "…". Move "Company" and "Generated" below the title bar and wrap them, instead of placing them at a fixed position on the right. Make the bar taller when needed.
5. Section headers: start a new page when the header plus at least one line of content would not fit.
6. Use one shared footer limit so content never overlaps the "Page X of Y" footer.

## Technical details
- Add a small shared helper in `src/utils/modelCard/exporters/pdfLayout.ts`. It provides `writeWrappedField`, `writeWrappedBullets`, `ensureSpace` and `PAGE_BOTTOM_LIMIT`, and works with any jsPDF instance and a y-position cursor. Both exporters will use it, so their behaviour matches.
- No changes to exported data or field order, and no product data changes.
- Add a test (`pdfLayout.test.ts`) that feeds a very long description through the helper using a stub doc. It checks that no line is drawn below the page limit and that pages are added.
- Verify by exporting the longest products (AutoContour structures, ART-Plan Segmentation) from the preview and checking the pages.

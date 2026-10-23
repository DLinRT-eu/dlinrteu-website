# Fix source-card text overflow in PDF exports

## Likely cause (to confirm first)
Limbus AI sources contain characters the built-in PDF font cannot draw, e.g. the Unicode hyphen in "Trade‐off" and "Thibodeau‐Antonacci", curly quotes in "D’Aviero", en/em dashes. The PDF library mis-measures and mis-spaces such text, so lines look stretched and run past the card edge. Very long unbroken strings (DOIs, URLs) can also overflow because they have no spaces to wrap at.

## Steps
1. Reproduce: generate single-product PDFs for Limbus AI, plus AutoContour, ART-Plan Segmentation, MRCAT Prostate, AccuContour, and a multi-product catalogue. Render pages to images and look at every source card.
2. Add one text-cleaning step used by all PDF drawing helpers. It converts unsupported characters to plain equivalents (special hyphens and dashes to "-", curly quotes to straight, non-breaking/thin spaces to normal spaces, ellipsis to "...") and keeps accented Latin letters that the font supports.
3. Make wrapping force-break any single word or link longer than the line width, so DOIs and URLs stay inside the card.
4. Apply both to source cards (title, authors/journal/DOI line, rationale, link), label/value rows, bullet lists and notes, in both single and multi-product PDFs.
5. Re-generate the same PDFs and check all pages visually; also scan every product's sources for remaining unsupported characters.

## Tests
Extend `scripts/pdfLayout.test.ts`: cleaned text contains no unsupported characters; a long DOI/URL wraps into lines that each fit the width.

## Technical details
- Files: `src/utils/modelCard/exporters/pdfLayout.ts` (new `toPdfSafeText`, update `clampLines`/wrap helpers and `drawSourceCard`), `pdfSections.ts`, `pdfExporter.ts`, `bulkPdfExporter.ts`.
- No product data changes; the website keeps the original characters.

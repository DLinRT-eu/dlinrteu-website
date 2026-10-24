# Check uploaded search hits for sources missing from product pages

## What the file contains
- 36,403 search hits (OpenAlex, PMC, PubMed) for 40 catalogue products, about 24,500 distinct DOIs.
- Only a small share is already cited: the catalogue lists 331 DOIs in total.
- Most hits are noise from generic search terms ("Planning", "Adaptive", "Segmentation", "Contour" AND "MVision", "Eclipse" AND "deep learning"). A first pass that only keeps hits naming the product in the title or abstract still leaves about 1,100 candidates, mostly from the ART-Plan "Planning"/"Adaptive" and Synchrony queries.

## Steps
1. **Narrow candidates per product** with distinctive terms only (product name plus vendor, e.g. "ART-Plan", "TheraPanacea", "AutoContour" + "Radformation", "MRCAT", "Limbus", "Synchrony" + "Accuray"), in title, abstract or affiliations. Drop DOIs already cited on that product (or on its consolidated/historical IDs, e.g. ART-Plan modules).
2. **Read each remaining abstract** and keep only papers that actually use or evaluate the named product's AI function (not a different product with the same word, not a non-AI feature like Synchrony fiducial tracking unless the AI component is evaluated, not reviews merely mentioning it).
3. **Verify each kept paper** against its DOI/PubMed record (title, authors, journal, year) so nothing is invented.
4. **Add confirmed papers** to the matching product's evidence list, with a per-paper Evidence Rigor and Levels of Efficacy score from the abstract (same rules as the October re-scoring), flagged for reviewer checking. Category-scoped where the product spans several tasks.
5. **Report** in Files: a spreadsheet of every candidate with decision (added / already cited / not about the product / not AI / unverifiable) and reason, plus a short summary of products whose levels changed.
6. Run the evidence tests and the score validator; check the build.

## Out of scope
- No new products are added from this file.
- Product-level scores change only where a newly added paper sets a higher level.

## Technical details
- Matching uses DOI lowercased against all DOIs in `src/data/products/**`, including `keyPapers` and `evidence[]`.
- Edits go into the existing product files; legacy aliases resolved through the central alias map.
- Tests: `scripts/evidence-matrix.test.ts`, `scripts/efficacy-levels.test.ts`, `scripts/validate-evidence-scores.ts`.

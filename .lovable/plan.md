# Compare our evidence with Marlie's screened papers and assign reviewers

## Inputs
- Marlie's list: 361 included papers covering 121 products (`Included_DOI_Titles_screened.xlsx`).
- Our product pages: 419 cited papers (DOI match).
- First comparison: 185 papers in both, 234 only on our pages, 176 only in Marlie's list.

## Steps
1. **Exact comparison.** Match by DOI first, then by PMID and normalised title. This catches papers we list without a DOI, and DOI formatting differences. Map Marlie's product IDs to our current product IDs, including legacy aliases.
2. **Our papers missing from Marlie's list (step 1 of the request).** For each one, give the product, title, DOI and a likely reason: vendor document or white paper, conference abstract, outside her search window, non-English, or a probable screening miss. Probable misses are flagged for Marlie.
3. **Automatic first score for the ~176 new papers.** From the title and abstract in her file, propose Evidence Rigor (E0–E3), Level of Efficacy (L1t–L6) and the study-quality flags, marked "provisional, automatic". Nothing is written to product pages.
4. **Assign reviewers from the Q4 2026 round.** Each paper goes to the reviewer who had that product in Q4 2026. A paper covering several products goes to the first product's reviewer, and the others are listed. Products with no Q4 reviewer are spread evenly, preferring each reviewer's stated category expertise. The workload is balanced and the counts per reviewer are reported.
5. **Deliverables:**
   - `evidence-screening-assignments-2026-11-19.xlsx` with these sheets: Assignments (paper, product(s), DOI, provisional E/L, reviewer, deadline left blank), Our papers not in Marlie's list, Matched papers, Reviewer workload.
   - A short summary `.md` with counts and open points.
6. No changes to the site, the database or review statuses in this step. Creating actual review tasks in the app can come later, once you confirm.

## Technical notes
- Reviewer names come from `product_reviews` joined to `profiles` for the Q4 2026 round. Only names go in the document, no emails.
- Provisional scores follow `docs/review/GUIDE.md` and `src/data/evidence-impact-levels.ts`.

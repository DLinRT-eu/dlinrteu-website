# Resolve the critical audit findings per product

## Scope
The full-catalogue audit (15 Oct 2026) lists 868 findings. Of these, 148 are critical (1 error, 147 warnings) across 67 products. The 720 informational notes are out of scope. Many products were revised after the audit, so some findings may already be resolved.

Main groups of critical findings:
- Evidence (about 45): E1 claimed without a scored paper, provisional scores that need the source retrieved, rescoring proposals, vendor-independence / multi-centre flags, wrong journal titles or attribution, and the MESCAL paper cross-check (7 products).
- Regulatory (about 17): FDA clearance numbers missing or not matching FDA, FDA/CE missing from the certification summary.
- Identity (about 10): broken or redirected product links, secondary-category mismatches.
- Transparency (about 9): training and evaluation data without a source.
- Structures (4), Technical (2), Cross-check (5: duplicate product source files, company name mismatches).

## Steps
1. Re-check every critical finding against the current product data and mark it "already resolved", "to fix" or "needs reviewer".
2. Fix the remaining ones, one source at a time:
   - Evidence: retrieve the paper (Crossref / Europe PMC / OpenAlex), correct metadata, confirm or adjust the E/L score, and lower an E level when no attributable paper supports it.
   - Regulatory: verify each number in the FDA database, then sync the certification summary.
   - Links: check each product page, replace with the current vendor page or record the redirect.
   - Transparency/structures: keep only what a disclosed source supports; otherwise mark it as not disclosed.
   - Duplicate source files: confirm which file is used and remove or archive the unused one, keeping old links working.
3. Never invent data: if a source can't be found, leave the field unchanged and list it for a reviewer.
4. Stamp `lastRevised` on edited products, run the evidence checker and tests.

## Deliverables
- Corrected product entries.
- A resolution report `docs/audits/products/2026-11-25/critical-findings-resolution.md` (+ CSV) with each finding's outcome and source, plus a short list of items left for reviewers.

## Technical details
- Input: `docs/audits/products/2026-10-15/product-audit-2026-10-15.csv` filtered to severity `warn`/`error`.
- Work split by finding group across parallel subagents; edits applied centrally to avoid conflicts.
- EUDAMED stays unchanged (registry still down); efficacy conversions stay in `normalizeProductEfficacy`.

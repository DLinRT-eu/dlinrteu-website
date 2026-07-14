
# Deep-Review Re-Scoring — Auto-Contouring Wave

The audit flagged 59 products at E≥E1 without `keyPapers`. Per the audit-swarm skill's Minimal Intervention policy, this is a separate confirmed edit pass, done one category at a time. This plan covers the **auto-contouring** wave.

## Scope

Only products in `src/data/products/auto-contouring/` whose `evidenceRigor` is `E1` or higher AND `keyPapers` is missing/empty. Products at E0 (regulatory-only) are not in scope — no keyPapers expected there.

## Steps

1. **Filter worklist** — programmatically load each auto-contouring product, keep only those with `evidenceRigor ∈ {E1, E2, E3}` and empty/missing `keyPapers`. Print the list with current E/I/R.
2. **Per product, deep-review**:
   - PubMed search via `websearch--web_search` (queries: `"<product name>" auto-segmentation radiotherapy`, `"<company> <product>" deep learning contour`, plus vendor-specific variants).
   - Rank hits by relevance (product-specific, ≥2020, peer-reviewed). Prefer external/multi-centre/prospective.
   - Extract 3–5 citations with authors, year, journal, DOI/PMID, one-line finding.
   - Re-score `evidenceRigor` and `clinicalImpact` against `docs/review/GUIDE.md` rubric using found study attributes (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`).
   - Update `adoptionReadiness` from the new (E,I) + regulatory status.
3. **Emit findings** to `/mnt/documents/deep-review-auto-contouring-<DATE>.md` + `.csv` (id, old E/I/R, new E/I/R, rationale, keyPapers count).
4. **Present the worklist and proposed rescoring FIRST** in chat for your review before touching any `.ts` file.
5. **After your go-ahead**, apply edits per product: add `keyPapers` array, update `evidenceRigor`/`clinicalImpact`/`adoptionReadiness` + notes, bump `lastRevised`.
6. Re-run audit swarm to confirm 0 remaining keyPapers warnings in auto-contouring.

## Out of scope

- Other categories (image-enhancement, reconstruction, etc.) — separate waves.
- E0 products — no keyPapers requirement.
- Any product data field other than evidence/scoring/lastRevised.

## Deliverables

- Deep-review report (`.md` + `.csv`) in `/mnt/documents/`.
- One PR-equivalent edit pass covering the auto-contouring wave.
- Audit re-run confirming resolution.

## Notes on cost/time

Each product needs ~2–4 web searches. With ~20–30 in-scope products expected, this is a substantial multi-turn pass. I'll batch searches in parallel where possible and pause after step 4 for your approval before writing to any product file.

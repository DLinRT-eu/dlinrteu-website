# Reviewer pass and completion for the 12 open reviews (Q4 2026 round)

## Scope
The 12 reviews still open in "Q4 2026 - anticipated":
- M. Gooding: AITeWan DeepBT Detector Plus, Carina INTContour, MedCom ProSoma DART, RaySearch RayIntelligence, Siemens AI-Rad Companion, Synaptiq Mediq RT, United uAIFI uMR
- S. David: Ai Medical Jazz, GE MR Contour DL (in progress), Oncosoft OncoStudio, Quanta QOCA Image Smart RT
- Doolan: RaySearch RayStation (in progress)

## Per product
1. Reviewer checklist: description, task/category, regulatory (FDA via openFDA, CE wording, EUDAMED where reachable), version, links, structures, training/evaluation data, source disclosure.
2. Search new evidence (PubMed/Crossref, vendor pages, FDA summaries) since the last entry; verify DOI/title/authors via Crossref; add only product-specific studies; score E/L only when the abstract supports it, otherwise "not scored".
3. Apply verified fixes in the product file, set `lastRevised: 2026-11-19`.

## Review status
Mark all 12 reviews completed (completed_at 2026-11-19), with a review note "Reviewer pre-check by admin, 2026-11-19" so it's clear the assigned reviewer did not do it.

## Checks and output
- `bun test`, evidence checker, build.
- Report `/mnt/documents/review-round-completion-2026-11-19.md` + CSV: changes, new papers, sources, items left unverified.

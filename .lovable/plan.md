# Consistency pass on Mustafa's edits + finish Matteo's last round products

## Part 1 — Consistency pass on Mustafa Kadhim's reviews (5 Nov 2026)
Products he reviewed: AdaptBox, MVision Image+, SmartFuse, MR-Box, BrachyBox, ART-Plan (and the TheraPanacea application grouping), uRT-Auto-Planning, AiMIFY, Spectronic, GE Auto-Segmentation, uCT 610 (pipeline).

For each, compare against the catalogue's house style (same rules used in the last pass) and fix only form, never facts:
- Authors as "First A et al."; journal abbreviations (e.g. Radiat Oncol vs Radiother Oncol) checked against DOI/Crossref.
- Evidence levels written as E0–E3 and L1t–L6 (convert any leftover I0–I5); notes say "L2 (Levels of Efficacy)".
- Study-quality flags: list only the ones that apply.
- British spelling (single-centre, multi-centre), dates as YYYY-MM-DD.
- Every new factual field has a disclosed source; non-public sources have `sourceAccess` + `sourceRetrievedOn`.
- Structures in "Region: Structure Name" format; TheraPanacea legacy IDs/aliases still resolve.
- Every DOI he added is checked against Crossref (real, right title/journal); a mismatch gets flagged to you, not silently changed.
- Overall E/L levels match the papers (evidence checker).

## Part 2 — Matteo's last products in "Q4 2026 - anticipated" (deadline 10 Nov)
Five still in progress: Canon AiCE CT, Philips SmartDose CT Enhancement, Philips SmartSpeed Precise, Siemens Deep Resolve, United Imaging uAI Vision Recon.

For each: check the vendor page, FDA 510(k) and EUDAMED for regulatory details; check versions, intended use and whether it's still on the market; search Crossref/Europe PMC for missing RT-relevant papers and score new ones (marked pending reviewer check); check AI/RT scope still applies. Apply corrections in the product files with sources, in the same house style.

I won't mark the reviews as completed in the review dashboard — you sign those off. If a product looks out of scope or discontinued, I'll flag it rather than remove it.

## Checks
Run the evidence checker and `bun test scripts`; open 2–3 edited product pages in the browser. Report: what changed per product, flagged items, papers added.

# Wave 4 — final evidence sweep + literature gap hunt

Closes the per-paper evidence scoring programme: sweeps the last unswept categories, then goes back across the whole catalogue looking for publications we are currently missing.

## Part A — Wave 4 sweep (last categories)

Categories not yet covered by Waves 1-3:

- **Platform** (6 products): Workspace+, Intelligent Radiation Therapy (iRT), Lumonus AI, AccuLearning (+2 sibling entries), MedLever
- **Positioning** (1): Precise Position
- **Tracking** (1): Synchrony
- **Pipeline** (6 pre-market entries): GE, MedLever (x2), Neuralrad, Synaptiq, United Imaging

For each product: verify every existing citation resolves and actually names the product, add per-paper `evidenceRigor` / `clinicalImpact` / `rationale` / quality flags, then let `computeProductEvidenceScore()` set the product-level score (max per axis). Overrides only where the rubric demands it, always with a written reason.

Note: Synchrony currently stores E2/I2 with zero scored papers — a large tracking literature exists, so this is the main upgrade/justification candidate in Part A. Pipeline products are pre-market; most will legitimately stay E0 with an explicit "no publication found" note rather than a silent blank.

## Part B — Literature gap hunt (whole catalogue)

Two passes over all 85 catalogue products:

1. **Zero-paper products (27)** — targeted PubMed/Crossref/vendor searches per product name plus vendor synonyms and the underlying algorithm name (e.g. SwiftMR, AiMIFY, uRT Auto-Contouring, MRCAT Head and Neck, syngo.via RT Image Suite, DV.TARGET, Jazz, DeepContour, ProSoma DART, QOCA image, RayIntelligence, AIQUALIS, Verify). Any verified hit gets scored and the product score recomputed; a genuine miss gets a dated "searched, nothing found" note so the next sweep does not redo the work.
2. **Products already carrying papers** — a recency pass for 2025-2026 publications published since the record was last touched, focused on the products where one extra paper would move an axis (E1 sitting on a single-centre study, I1 that a workflow/outcome paper would lift).

Every candidate paper is verified against the DOI/PMID record before it is written — title, journal, year and product attribution must all match. This is the check that caught the Eriksson, Czarnecki and Simiele citation errors in Wave 3, and it stays mandatory.

## Part C — Validation and reporting

- `npm run validate:evidence -- --all` must report 0 mismatches.
- Typecheck clean; spot-check a few product pages render the new papers.
- Summary of score movements (up, down, unchanged) with reasons, plus the count of newly added papers and of confirmed-empty products.

## Technical notes

- Scoring rubric: `docs/review/GUIDE.md`; computation in `src/utils/evidenceScoring.ts`; UI in `src/components/product/KeyPapersScoring.tsx`.
- Product records under `src/data/products/<category>/`; `keyPapers` schema in `src/types/productDetails.d.ts`.
- Sweep notes prefixed `2026-08-25 Wave 4 per-paper sweep:` in `evidenceRigorNotes` / `clinicalImpactNotes`, matching the Wave 2/3 convention.
- `lastUpdated` / `lastRevised` bumped only on records that actually change.
- Searches run through the web-search gateway plus PubMed/Crossref lookups; no product field changes other than evidence, notes, dates and adoption-readiness where the derived tier shifts.

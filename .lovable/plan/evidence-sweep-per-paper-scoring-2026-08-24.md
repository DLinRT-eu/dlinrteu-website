# Evidence Sweep + Per-Paper Scoring

Two connected pieces of work: (1) a category-by-category sweep to check every product's evidence, news and regulatory status is current, and (2) a scoring change where each paper is scored on its own and the product score is the maximum across papers, with a documented manual override allowed.

## Does per-paper scoring make sense?

Yes, with one caveat. Today `evidenceRigor` (E0-E3) and `clinicalImpact` (I0-I5) are single product-level judgements written in prose notes, so the reasoning behind a score is not traceable to a specific publication. Scoring each paper separately makes the rubric auditable, makes re-scoring incremental (add a paper, recompute), and removes reviewer drift.

Max-across-papers is the right aggregation for both axes, because E and I describe "the best evidence that exists", not an average. Two caveats to handle explicitly:

- E and I should be maxed **independently**. A large registry paper may set I high while a small single-centre study sets E; that is intended, matching how the axes are already defined as separate.
- A single weak-but-flashy paper should not lift a product. Papers must carry the study-quality sub-attributes (vendor-independent, multi-centre, multi-national, prospective, external validation) so the max is defensible, and the override exists for cases where the top paper is off-label, retracted, or not about the marketed version.

Adoption readiness (R) stays a product-level judgement — it is about local implementation burden, not about any one paper.

## Part 1 — Scoring model

Extend `keyPapers` entries in `src/types/productDetails.d.ts` with optional per-paper scoring fields:

- `evidenceRigor` (E0-E3), `clinicalImpact` (I0-I5)
- `rationale` (one line, why this level)
- study-quality flags: `vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`
- `appliesToCategory` (optional, for multi-category products using `categoryEvidence`)

New util `src/utils/evidenceScoring.ts`:

- `computeProductEvidenceScore(product)` returns `{ rigor, impact, rigorSource, impactSource, paperCount }` using the max per axis, and derives the five product-level study-quality booleans as an OR across papers.
- Precedence: if `evidenceScoreOverride` is set on the product (`{ rigor?, impact?, reason, setBy?, setOn? }`), the override wins and the computed value is retained as "computed" for display.
- Falls back to the existing stored `evidenceRigor` / `clinicalImpact` when a product has no scored papers, so nothing regresses.

UI: on the product page evidence section, show the computed level with the paper that sets it, list per-paper E/I chips, and render an explicit "manual override" note with its reason when present. Evidence matrix dashboard and filters read through the same util so scores stay consistent everywhere.

## Part 2 — Category-by-category sweep

Run one category per wave, review the report, then continue. Order: auto-contouring, image-synthesis, treatment-planning, image-enhancement, reconstruction, registration, performance-monitor, platform, positioning, tracking, clinical-prediction.

Per product in the wave:

1. Literature check — search PubMed/DOI for publications newer than `lastRevised`, verify every existing citation resolves (no hallucinated DOIs), add missing papers with full metadata.
2. Score each paper on E and I with a one-line rationale, then record the computed max; flag where it differs from the currently stored score.
3. News/regulatory check — vendor newsroom and FDA/CE records for new clearances, version releases, renamed or withdrawn products.
4. Note new products and new companies discovered along the way.

Output per wave, written to `/mnt/documents/`:

- `evidence-sweep-<category>-<date>.md` — per-product findings and proposed score changes
- `evidence-sweep-<category>-<date>.csv` — one row per citation with proposed E/I
- `evidence-sweep-<category>-<date>-candidates.csv` — new product and company candidates with sources

New products and companies are reported as a worklist only, never added in the sweep turn.

## Technical notes

- Reuses `scripts/evidence-verification-enumerate.ts` for the citation worklist, scoped by category argument.
- New script `scripts/evidence-sweep.ts` drives one category wave and emits the three artefacts.
- Backfill is incremental: products keep their current stored scores until a wave scores their papers, so no product loses a score mid-migration.
- Product `.ts` files are edited only in a separate confirmed pass after you review each wave's report, per the Minimal Intervention rule.

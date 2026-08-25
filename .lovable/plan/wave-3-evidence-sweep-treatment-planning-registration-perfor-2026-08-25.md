# Wave 3 evidence sweep — treatment planning, registration, performance monitor

Apply the same per-paper evidence scoring already done for Waves 1 and 2 to the remaining 13 products in these three categories. Today none of them carry `keyPapers`, so every product score is still a hand-set stored value with no per-publication backing.

## Scope

Treatment planning (8): RayStation DL Dose Prediction, MOZI TPS, Plan AI, Radiation Planning Assistant, uRT Auto-Planning, Dose+, DeepPlan, SmartPlan.
Registration (2): Autofuse, SmartFuse.
Performance monitor (3): AIQUALIS, Verify, RayIntelligence.

Note: several performance-monitor products (ClearCheck, Mobius, ArcCheck-family) sit in other files of the same folder; the validator lists only the 13 above as in-category, and the sweep will cover exactly those, plus any sibling in the same file that already has a peer-reviewed evidence list.

## What happens per product

1. Read the existing `evidence`, `evidenceRigorNotes` and `clinicalImpactNotes` entries and pull out every citation that names the product directly.
2. Verify each citation exists and says what the note claims (no invented DOIs, no title drift). Anything unverifiable is dropped rather than scored.
3. Add a `keyPapers` entry per verified publication with `evidenceRigor`, `clinicalImpact`, a short `rationale`, and study-quality flags (vendorIndependent, multiCenter, multiNational, prospective, externalValidation).
4. Citations that are indirect (benchmark reviews, multi-product comparisons, conference abstracts) are recorded as `keyPapers` **without** scores, with a rationale saying why they do not carry an E/I level.
5. Recompute the product score as the maximum per axis and sync the stored `evidenceRigor` / `clinicalImpact` to it.
6. Where the maximum understates well-documented evidence that is not tied to a single citable paper, persist an `evidenceScoreOverride` with an explicit reason instead of silently keeping the old number.

Products with no qualifying peer-reviewed publication (expected: Dose+, DeepPlan, SmartPlan, SmartFuse, RayIntelligence, and likely AIQUALIS) keep their stored score and gain a note explaining the absence — no score inflation.

## Expected corrections

- Radiation Planning Assistant is currently E3/I4, the highest in the catalogue. Its published record (multi-site LMIC deployment studies) will be scored paper by paper; if no outcome-level study supports I4, the impact drops and the reason is recorded.
- Plan AI at E2/I2 rests on one internal-validation paper plus conference abstracts; abstracts do not qualify for a scored paper under the rubric, so the rigor may settle lower.
- RayStation DL Dose Prediction keeps v2026 models out of scoring, consistent with the existing note.

## Technical notes

- Files touched: `src/data/products/treatment-planning/*.ts`, `src/data/products/registration/*.ts`, `src/data/products/performance-monitor/*.ts`.
- Scoring semantics come from `src/utils/evidenceScoring.ts`; no change to the scoring model, UI, or types.
- Verification: `bun scripts/validate-evidence-scores.ts treatment-planning registration performance-monitor` must report 0 mismatches, then `--all` across the catalogue, plus a typecheck.
- A report `evidence-sweep-wave3-2026-08-25-applied.md` lists every score shift with its basis, matching the Wave 2 format.

## Out of scope

Wave 4 (platform, tracking, positioning) stays untouched.

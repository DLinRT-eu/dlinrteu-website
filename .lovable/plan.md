# Evidence score validator + next sweep waves

## 1. Validation script

New `scripts/validate-evidence-scores.ts` (run with `bun`):

- Loads every product `.ts` in a category folder (default: `auto-contouring`, optional args for other folders or `--all`).
- For each product, runs `computeProductEvidenceScore()` and compares the effective rigor/impact against the stored `evidenceRigor` / `clinicalImpact` fields.
- Reports per product: stored vs computed, origin (`papers` / `override` / `stored` / `none`), and the paper that sets each maximum.
- Flags as mismatches:
  - stored value differs from effective computed value
  - override present without a reason
  - papers carrying scores but product-level fields missing
- Prints a summary table, exits with code 1 when mismatches exist so it can be used as a check; `--json` writes a machine-readable report to `/mnt/documents/`.
- Adds an npm script `validate:evidence` for convenience. Not wired into `prebuild` (data curation is intentionally manual).

## 2. Next sweep waves

Remaining products, grouped so each wave is comparable in size (archived / examples excluded):

| Wave | Categories | Products |
|---|---|---|
| 2 | image-synthesis, reconstruction, image-enhancement | ~22 |
| 3 | treatment-planning, registration, performance-monitor | ~18 |
| 4 | platform, tracking, positioning, pipeline | ~14 |

Per wave, the same two-step flow already used for Wave 1:

1. Run `scripts/evidence-sweep.ts` for each category in the wave (extended to accept multiple category arguments and emit one combined report per wave).
2. Literature-backed scoring pass: add per-paper `evidenceRigor`, `clinicalImpact`, `rationale` and study-quality flags to each `keyPapers` entry; recompute product-level scores as the per-axis maximum; persist documented `evidenceScoreOverride` only where a general-evidence item justifies a higher level.
3. Run the new validator over the wave, then typecheck.
4. Write a wave report to `/mnt/documents/` listing score shifts and citations checked.

This response covers building the validator and executing Wave 2; Waves 3 and 4 follow in the same pattern once Wave 2 is reviewed.

## Notes

- No UI changes; scoring model and components from Wave 1 stay as-is.
- Score changes stay conservative — a level is only raised when a cited paper's own scoring supports it.

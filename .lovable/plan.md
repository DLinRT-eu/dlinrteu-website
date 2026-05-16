# Frozen plan — Evidence Classification revisions (awaiting colleague approval)

Status: **FROZEN — do not implement until user gives the go-ahead.**
Trigger phrase to recall: "resume evidence classification plan" or "apply the frozen evidence plan".

Based on reviewer feedback on the current tri-axial classification (E × I × Z).

## 1. Invert the Z (Implementation Burden) axis → "Adoption Readiness"

**Problem:** X (E0→E3) and Y (I0→I5) read "higher = better"; Z (Z0 minimal burden → Z5 critical) reads "higher = worse". Breaks visual intuition in the 3D matrix.

**Change:** Replace `ImplementationBurden` (Z0–Z5, lower-is-better) with `AdoptionReadiness` (R0–R5, higher-is-better). Same six rungs, definitions preserved, semantics flipped.

- Rename type `ImplementationBurdenCode` → `AdoptionReadinessCode` (`R0`…`R5`).
- Reverse the level array: R5 = old Z0 (green, minimal effort), R0 = old Z5 (rose, critical).
- Update `computeReadinessSignal()` thresholds (`R0` → blocked, `R1` → not-adoption-ready, `R2` → pilot-only, etc.).
- Rename product field `implementationBurden` → `adoptionReadiness` and `implementationBurdenNotes` → `adoptionReadinessNotes` on `ProductDetails`.
- Mechanical codemod across `src/data/products/**/*.ts`: Z0→R5, Z1→R4, Z2→R3, Z3→R2, Z4→R1, Z5→R0.
- Update HTA mapping, AID-RT exporters, FHIR exporter, model-card exporter, CSV/JSON product exports, changelog entry.

**UI consequences:** All Z badges, matrix Z-axis label, 3D scatter axis, readiness explainer, `EvidencePyramid` / `EvidenceImpactGuide` need rewording. Physical color ramp stays; labels move.

## 2. Fix the 3D matrix coloring

**Problem:** Several low-I cells render green in the 3D view, making low-impact products look "good".

**Change in `EvidenceImpactMatrix3D.tsx`:** Replace per-axis color choice with a **composite score color**:
`score = (E_rank/3 + I_rank/5 + R_rank/5) / 3`, mapped through a single sequential ramp (rose → orange → yellow → teal → green). Empty cells neutral. "Further from origin on every axis = greener" becomes true everywhere.

## 3. Rename I1 "Quality Assurance"

**Problem:** Conflated with the QA product category; misleading at the impact-axis level.

**Change:** Rename I1 to **"Technical Performance"** (matches Fryback & Thornbury Level 1). Update `name` in `CLINICAL_IMPACT_LEVELS`, the explainer page, matrix legend, HTA explain map, tooltips. Keep code `I1` and color stable. Examples list stays (QA tools remain valid I1 examples — level just isn't named after them).

## 4. Strength-of-evidence caveat (no schema change)

Reviewer accepts current Z definition rather than encoding peer-review weight / conflict-of-interest on a separate axis. Document explicitly:

- Add "What E-rigor does NOT capture" callout to `EvidenceImpactGuide.tsx` and `docs/review/GUIDE.md`: peer-review status, funding independence, and commercial conflicts are surfaced via existing study-quality sub-attributes (`evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceProspective`, `evidenceExternalValidation`) rather than collapsed into E. Reviewers should consult both.
- No data-model change.

## 5. Stakeholder views (new dashboard slices)

Add a `StakeholderView` selector above `EvidenceImpactScatterChart` with four presets re-skinning the same data:

| View | Highlights | Annotation |
|------|------------|------------|
| Reviewer (default) | All products, current rendering | — |
| New vendor / Gap analysis | Per-task density heatmap; "entry threshold" = median (E,I,R) of products in that task | Shows bar a new entrant must clear |
| Existing vendor | User-selected product highlighted; peers in the same task greyed; arrows to nearest higher-(E,I,R) competitor | Self-positioning + gap to leaders |
| Clinic / decision maker | Default filter ≥E2 ∧ ≥I2 ∧ ≥R3; tooltip lists prior versions of the product (trajectory) | Conservative default for procurement |

Re-uses existing `cellMap`. Per-task medians in a memo. Version trajectory uses existing `priorVersions` field.

## 6. Docs, changelog, memory

- Update `docs/review/GUIDE.md`, `docs/FIELD_REFERENCE.md`, `docs/ADMIN_GUIDE.md` for Z→R and I1 renames.
- Changelog entry: "Evidence classification v3: adoption-readiness axis flipped, I1 renamed to Technical Performance, 3D coloring unified, stakeholder views added."
- Update `mem://features/evidence-impact-matrix-dashboard`, `mem://data-quality/evidence-classification-logic`, `mem://index.md`.

## Files touched (high-confidence)

- `src/data/evidence-impact-levels.ts`
- `src/types/productDetails.ts` / `.d.ts`
- `src/data/products/**/*.ts` (codemod)
- `src/data/hta-mapping.ts`
- `src/utils/modelCard/aidrtMapping.ts`, `aidrtExporter.ts`, `dataGenerator.ts`
- `src/utils/fhir/transformers/deviceDefinition.ts`
- `src/utils/exportProducts.ts`, `excelExport.ts`
- `src/components/dashboard/EvidenceImpactScatterChart.tsx`
- `src/components/resources/EvidenceImpactMatrix.tsx`, `EvidenceImpactMatrix3D.tsx`, `EvidencePyramid.tsx`
- `src/pages/EvidenceImpactGuide.tsx`
- Sweep with ripgrep before editing for any remaining `implementationBurden` / `Z[0-5]` / "Quality Assurance" strings.

Codemod is mechanical; one-shot Node script under `scripts/` is fine. No DB migration needed — these fields live in TypeScript product data, not Supabase.

## Open questions to resolve before implementing

1. Confirm new axis name: **"Adoption Readiness" (R0–R5)** vs alternatives ("Deployment Maturity", "Implementation Maturity").
2. Confirm I1 rename to **"Technical Performance"** — Usman's proposal name takes precedence if different.
3. Build all four stakeholder views now, or ship Reviewer + New-vendor first and iterate post-ESTRO?

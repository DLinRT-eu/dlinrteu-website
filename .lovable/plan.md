## Evidence Classification — Revised Plan (resumed)

Colleague approvals received; resolving the three open questions and adding one new scope item (stakeholders).

### Decisions locked in

1. **Axis rename confirmed**: `Z (Implementation Burden)` → `R (Adoption Readiness)`, levels `R0–R5` where higher = more ready. Rationale to surface in tooltip + guide: missing national/international guidelines delay (not block) adoption — R flags that gap.
2. **I1 rename confirmed**: `I1 = "Technical Performance"` (Fryback & Thornbury L1). Code `I1` and color unchanged.
3. **Stakeholder views — phased**: ship Reviewer (default) + New-vendor/Gap-analysis now; defer Existing-vendor and Clinic/Decision-maker views to a post-ESTRO iteration.
4. **NEW — Stakeholders explainer**: add a "Who DLinRT.eu helps & how" section tying each stakeholder to concrete site uses (HTA framing for clinics/payers). Lives on `/about` and is linked from `/evidence-impact-guide`.

### Scope (6 changes, unchanged from frozen plan + 1 new)

1. **Invert Z → Adoption Readiness (R0–R5)**
   - Rename `ImplementationBurdenCode` → `AdoptionReadinessCode` in `src/data/evidence-impact-levels.ts` and `src/types/productDetails.d.ts`.
   - Reverse level array; rewrite descriptions in "ready for adoption" voice; preserve color ramp (rose→green now monotonic with R).
   - Update `computeReadinessSignal()` so higher R contributes positively.
   - Rename product fields: `implementationBurden` → `adoptionReadiness`, `implementationBurdenNotes` → `adoptionReadinessNotes`.
   - Mechanical codemod across `src/data/products/**/*.ts`: `Z0→R5, Z1→R4, Z2→R3, Z3→R2, Z4→R1, Z5→R0`.
   - Update consumers: `hta-mapping.ts`, `aidrtMapping.ts`, `deviceDefinition.ts` (FHIR), `exportProducts.ts`.

2. **Fix 3D matrix coloring** — `EvidenceImpactMatrix3D.tsx`: composite score `(E_rank/3 + I_rank/5 + R_rank/5)/3` through a single sequential ramp. Eliminates the I0 green artifact.

3. **Rename I1 → "Technical Performance"** in `evidence-impact-levels.ts` (code/color stable; example list reviewed).

4. **Strength-of-evidence caveat** — document in `EvidenceImpactGuide.tsx` and `docs/review/GUIDE.md` that peer-review, funding independence, and COI are captured via existing study-quality sub-attributes (`vendorIndependent`, `multiCenter`, `prospective`, `externalValidation`), not collapsed into E.

5. **Stakeholder views — phase 1**
   - `StakeholderView` enum in `EvidenceImpactScatterChart.tsx` with two presets:
     - **Reviewer** (default): current cell grid.
     - **New vendor / Gap analysis**: per-task density heatmap; entry threshold = median (E,I,R) of products in the same task; tooltip "to be competitive in <task>, target ≥E2 ∧ ≥I2 ∧ ≥R3".
   - Re-uses existing `cellMap`; medians computed in a `useMemo` keyed on `filteredProducts`.
   - Existing-vendor and Clinic views stubbed behind a "Coming after ESTRO" toggle (no logic yet).

6. **"Who DLinRT.eu helps & how" section (NEW)**
   - New component `src/components/about/StakeholderUseCases.tsx`, rendered on `/about` and cross-linked from `/evidence-impact-guide`.
   - Four cards (Clinician / HTA-Payer / Vendor / Researcher) each with: typical question → which DLinRT.eu view answers it → suggested E/I/R thresholds.
   - HTA card explicitly frames R as the "guideline gap" signal raised by the reviewer.

7. **Docs, changelog, memory**
   - Update `docs/review/GUIDE.md`, `docs/FIELD_REFERENCE.md`, `docs/ADMIN_GUIDE.md`.
   - Add changelog entry "Evidence Classification v2: Adoption Readiness, stakeholder views".
   - Update memory files: `mem://features/evidence-impact-matrix-dashboard`, `mem://data-quality/evidence-classification-logic`.

### Files touched

`src/data/evidence-impact-levels.ts`, `src/types/productDetails.d.ts`, `src/data/products/**/*.ts` (codemod), `src/data/hta-mapping.ts`, `src/utils/modelCard/aidrtMapping.ts`, `src/utils/fhir/transformers/deviceDefinition.ts`, `src/utils/exportProducts.ts`, `src/components/dashboard/EvidenceImpactScatterChart.tsx`, `src/components/resources/EvidenceImpactMatrix3D.tsx`, `src/components/resources/EvidencePyramid.tsx`, `src/components/product/EvidenceImpactBadges.tsx`, `src/pages/EvidenceImpactGuide.tsx`, `src/pages/About.tsx`, `src/components/about/StakeholderUseCases.tsx` (new), plus stragglers via grep on `implementationBurden|Z[0-5]|"QA"`.

### Risks / regressions

- Mechanical Z→R codemod must be exhaustive; CI grep-guard for `implementationBurden` and `\bZ[0-5]\b` in product data after migration.
- Existing exports (FHIR, AID-RT, CSV) shift field name — bump exporter version string.
- Color ramp inversion in 3D view may surprise returning users; flag in changelog.

### Out of scope (phase 2, post-ESTRO)

- Existing-vendor view (highlight + arrows to nearest higher-(E,I,R) peer via `priorVersions`).
- Clinic/Decision-maker view (default filter ≥E2 ∧ ≥I2 ∧ ≥R3 + version trajectory tooltip).

## Audit result

The site already uses a three-axis model (E0–E3, I0–I5, R0–R5) that **matches the proposal in spirit**. The proposal calls its third axis **Z** ("Implementation Readiness, higher = better") — semantically the same direction as our `R` axis (higher = more adoption-ready). However several **definitions and labels drift** from what the document proposes, and two guardrail tiers (E(-1), I(-1)) are missing. Author names from the document are **not present anywhere on the site** — nothing to remove.

### Concrete mismatches found

| Axis | Site today | Proposal v1.1 | Action |
|---|---|---|---|
| E3 | "Systematic Evidence" – SR / meta-analysis / RCT only | "Prospective or comparative implementation evidence / decision-grade synthesis" – also includes prospective, pragmatic, comparative real-world studies | Broaden description + criteria |
| E2 | "Validated Evidence" – multi-center, prospective, external validation | "External, independent or multicenter validation" – emphasises independence + TRIPOD+AI/PROBAST+AI | Add independence + reporting standards |
| E1 | "Preliminary Evidence" – sample < 100, retrospective | "Exploratory or single-center technical validation" – retrospective, phantom, in-silico, pre-clinical, single-center | Reword to include phantom / in-silico / pre-clinical |
| E0 | "No Peer-Reviewed Evidence" | "Descriptive only / no peer-reviewed evidence" | Minor tightening |
| I1 | "Technical Performance" – examples skewed to QA dashboards | "Technical, analytical or geometric validation" – DSC, Hausdorff, sensitivity/specificity, reader-study accuracy | Re-anchor on geometric / analytical metrics; keep QA dashboards as a secondary example |
| I4 | "Outcome" – patient outcomes only | "Patient, service or resource outcomes" – also service throughput, waiting times, cost | Add service / resource outcome examples |
| I5 | "Societal" – cost-effectiveness focus | "System-level or societal value" – equity, workforce sustainability, regional/national scale | Broaden |
| R (Z) axis labels | Friendly labels ("Pilot-ready", "Conditionally ready"…) | "Minimal / Basic / Enhanced / High / Mature implementation readiness" | Adopt readiness-oriented labels + descriptions; keep direction (higher = better) |
| Guardrails | none | E(-1) and I(-1) "Unassigned / insufficient documentation" | Add as optional tiers, used by reviewers to block scoring when documentation is too thin |

### Decision needed (default if no input)

1. **Rename R → Z**? The proposal uses **Z**. Default: **keep `R`** to avoid a churn-wide rename across products, exports, FHIR, HTA, schemaOrg, model cards, dashboards. Re-label in copy as "Implementation Readiness (R, higher = better)" so wording matches the proposal's intent.
2. **Add E(-1) / I(-1)** as optional reviewer-only "unassigned" sentinels? Default: **yes**, but kept out of the public matrix plots (only shown as an info banner: "Documentation insufficient for scoring").
3. **Attribution**: Reference the v1.1 proposal generically as "DLinRT.eu internal methodology proposal v1.1 (2026)" — **no personal names**.

## Plan

### 1. Update level definitions (`src/data/evidence-impact-levels.ts`)
- Rewrite `name`, `description`, `criteria` / `rtExamples` / `readinessConsequence` for each level to match v1.1 wording.
- Add `unassigned: true` sentinels `E(-1)` and `I(-1)` (new optional codes `"E-1"`, `"I-1"`) with a guardrail flag; excluded from scatter/matrix plots.
- Update `READINESS_DESCRIPTORS` thresholds so the composite signal matches the v1.1 narrative (Z0 → blocked, Z1 → pilot-only, Z2 → conditional, Z3 → deploy-with-monitoring iff E≥2 & I≥2, Z4 → deploy-with-monitoring or adoption-grade, Z5 → adoption-grade iff E≥2 & I≥2).
- Add reference entry for the proposal **without author names**.

### 2. Sync UI copy / plots
- `src/pages/EvidenceImpactGuide.tsx`: hero text, "Why three axes" panel, per-axis cards, worked-example sidebar.
- `src/components/resources/EvidenceLevelTable.tsx`: pulls from the data file – auto-updates; verify column labels.
- `src/components/resources/EvidenceImpactMatrix3D.tsx` and `EvidenceImpactMatrix.tsx`: axis legends, tooltip strings.
- `src/components/dashboard/EvidenceImpactScatterChart.tsx`: tooltip + legend wording.
- `src/components/product/EvidenceImpactBadges.tsx`: tooltip blurbs (driven by data file – verify).
- `src/components/product/EvidenceLimitationsDetails.tsx`: any hard-coded label.
- `src/pages/ResourcesCompliance.tsx`: intro paragraph for the evidence section.

### 3. Keep downstream exports consistent
- `src/utils/htaExport/htaExporter.ts`, `src/utils/exportProducts.ts`, `src/utils/comparison/comparisonExporter.ts`, `src/utils/fhir/transformers/deviceDefinition.ts`, `src/utils/schemaOrg/medicalDeviceSchema.ts`, `src/utils/modelCard/aidrtMapping.ts`: pick up new labels via the data module; only string template tweaks where labels are hard-coded.

### 4. Memory + docs
- Update `mem://features/evidence-impact-matrix-dashboard` and `mem://data-quality/evidence-classification-logic` to record the v1.1 alignment.
- Add a short note in `docs/review/GUIDE.md` pointing reviewers to the new wording and the E(-1)/I(-1) guardrails.

### 5. No data changes to products
Existing product `evidenceRigor` / `clinicalImpact` / `adoptionReadiness` codes remain valid (the level codes are unchanged). Only labels, descriptions, and the composite-signal mapping change.

### Out of scope
- Renaming the `adoptionReadiness` field to `implementationReadiness` across the schema and all product files (large, low value — handled by copy alone).
- Re-scoring any individual product.

Please confirm the three decisions above (or accept defaults) and I will implement.

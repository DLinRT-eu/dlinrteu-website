## Goal

Extend the current dual-axis Evidence Rigor (E0–E3) × Clinical Impact (I0–I5) classification into a three-axis **E/I/Z** model, where **Z0–Z5 = residual implementation & assurance burden** (lower is better), as proposed by Lula & Kamath (2026). Mapping for E and I is preserved 1:1 — nothing existing breaks. Z is additive.

The plan is phased so the data model + display can ship first, then richer claim-level appraisal and exports follow.

---

## Phase 1 — Data model & taxonomy (foundation)

### 1.1 Extend `src/data/evidence-impact-levels.ts`

Add a new section mirroring the existing rigor/impact pattern:

- `ImplementationBurdenCode = "Z0" | "Z1" | "Z2" | "Z3" | "Z4" | "Z5"`
- `IMPLEMENTATION_BURDEN_LEVELS[]` — name, description, RT-specific meaning, readiness consequence (verbatim from Table 2C of the proposal), color (green → red gradient since Z is inverse to readiness).
- Helper `getImplementationBurdenLevel()` and `getImplementationBurdenColor()`.
- Add a derived helper `getReadinessSignal(E, I, Z)` returning `"adoption-grade" | "deploy-with-monitoring" | "conditional" | "pilot-only" | "not-adoption-ready" | "blocked"` per the proposal's interpretation rules (e.g. Z≥4 ⇒ never adoption-ready regardless of E/I).
- Update `EVIDENCE_IMPACT_REFERENCE` with the Bellini 2023, Lula 2026, Jacob 2025 (AI for IMPACTS), Silberman 2023 (Evidence DEFINED), NICE HTG695 citations.

### 1.2 Extend `ProductDetails` (`src/types/productDetails.d.ts`)

Add (all optional — backward compatible):

```ts
implementationBurden?: "Z0" | "Z1" | "Z2" | "Z3" | "Z4" | "Z5";
implementationBurdenNotes?: string;

// Sub-domains driving Z (all optional booleans / short strings)
burdenFactors?: {
  commissioningRequired?: boolean;
  localValidationRequired?: boolean;
  workflowRedesign?: boolean;
  integrationComplexity?: "low" | "medium" | "high";
  humanFactorsTesting?: boolean;
  economicCaseRequired?: boolean;
  subgroupValidationGaps?: boolean;
  postMarketMonitoringPlan?: boolean;
  unresolvedSafetySignal?: boolean;
};
```

No existing field changes. Products without `implementationBurden` fall back to "Not assessed".

### 1.3 (Optional, Phase 3) Claim-level table

Add `evidenceClaims?: ProductEvidenceClaim[]` where each claim carries its own `{ claimType: "diagnostic" | "prognostic" | "decision-support" | "trial" | …, evidenceRigor, clinicalImpact, implementationBurden, reportingStandard: "STARD-AI" | "TRIPOD+AI" | "PROBAST+AI" | "DECIDE-AI" | "SPIRIT-AI" | "CONSORT-AI", citations[] }`. Defer until Phase 3 to avoid bloating the schema before reviewers are trained.

---

## Phase 2 — UI surfaces

### 2.1 Product detail page (`ProductDetails.tsx` evidence section)

- Render a third badge next to the existing E/I badges: `Z2 — Moderate implementation effort`, color from `getImplementationBurdenColor`.
- Tooltip shows readiness consequence + which `burdenFactors` are flagged.
- Add a **composite Readiness Signal** chip computed by `getReadinessSignal(E,I,Z)` with explanatory tooltip — this is the user-facing "badge" in the proposal.
- "Not assessed" muted state when Z is missing.

### 2.2 Evidence/Impact Guide (`src/pages/EvidenceImpactGuide.tsx`)

Add a "Z-axis: Implementation & Assurance Burden" section with the full Table 2C, the rationale (Bellini 2023 third translational-effort axis, adapted for RT AI), and a worked example showing how high Z constrains the public signal even when E/I are favourable.

### 2.3 Dashboard chart (`EvidenceImpactScatterChart.tsx`)

Keep the 2D matrix (rigor × impact), but:

- Add a small Z indicator ring around the dot. Behind a toggle so the existing task-color view remains the default.

### 2.4 New "Readiness Matrix" widget (optional, Phase 2.5)

Stacked bar chart showing distribution of Z levels per category — quick portfolio-readiness view for the dashboard.

---

## Phase 3 — Exports & interoperability

Update existing exporters to include the Z axis where relevant; all guarded by `if (product.implementationBurden)`:

- `src/utils/exportProducts.ts` — add `implementation_burden`, `implementation_burden_notes` columns.
- `src/utils/modelCard/dataGenerator.ts` + `aidrtMapping.ts` — extend `ModelCardData.performance` with `implementationBurden`, `implementationBurdenNotes`, and the `burdenFactors` block. Map to AID-RT "Implementation & Risk" section.
- `src/utils/htaExport/htaExporter.ts` — Z is directly an HTA input (NICE HTG695 alignment). Add a "Residual implementation effort" section.
- `src/utils/fhir/transformers/deviceDefinition.ts` — add an extension `http://dlinrt.eu/fhir/StructureDefinition/implementation-burden`.
- `src/utils/schemaOrg/medicalDeviceSchema.ts` — include in `additionalProperty`.

---

## Phase 4 — Reviewer workflow

- Add Z input to the product edit form (visual editor) with a guided picker: each `burdenFactor` checkbox auto-suggests a Z floor (e.g. `unresolvedSafetySignal=true` ⇒ Z≥5).
- Update `docs/review/GUIDE.md` and `docs/FIELD_REFERENCE.md` with Table 2C + the 3-axis interpretation note.
- Update reviewer prompts so Z is required before a product can be marked "Adoption-grade".

---

## Phase 5 — Backfill (no migration needed for code data)

Products are TypeScript files. Provide:

- A reviewer-facing checklist + a small script `scripts/seed-z-axis.mjs` that pre-fills `implementationBurden: "Z2"` (default conservative) for all existing products with an explanatory note, leaving curated overrides for the MVP categories called out in the proposal: auto-contouring, synthetic CT, dose prediction, treatment planning support.

---

## What changes vs. the current model


| Today                           | After                                                                      |
| ------------------------------- | -------------------------------------------------------------------------- |
| 2 axes: E0–E3, I0–I5            | 3 axes: + Z0–Z5 (residual burden)                                          |
| Single readiness implied by E/I | Explicit composite Readiness Signal derived from E/I/Z                     |
| Product-level appraisal         | Foundation for claim-level appraisal (Phase 3)                             |
| Evidence guide page             | Adds Z-axis section + worked examples                                      |
| Exports carry E/I               | Exports also carry Z + burden factors (CSV, FHIR, AID-RT, HTA, Schema.org) |


Backward-compatible: no existing field is removed or renamed; products without Z render exactly as today.

---

## Technical details (for implementer)

- New module `src/data/implementation-burden-levels.ts` is **not** needed; co-locate in `evidence-impact-levels.ts` to keep the dual/tri-axis taxonomy in one file (rename internal section comments accordingly).
- Color tokens: extend the existing semantic palette in `index.css` if a Z-specific gradient is wanted (`--burden-low`, `--burden-mid`, `--burden-high`); otherwise reuse green/amber/red HSL tokens already present.
- Composite readiness rules (initial):
  - Z5 → "blocked"
  - Z4 → "not-adoption-ready"
  - Z3 → "pilot-only"
  - Z2 → "conditional" (or "deploy-with-monitoring" if E≥E2 and I≥I2)
  - Z1 → "deploy-with-monitoring"
  - Z0 + E≥E2 + I≥I2 → "adoption-grade"
  - else → "conditional"
- Keep `EvidenceImpactScatterChart` cell layout unchanged; only the per-dot styling adds Z encoding.
- `AID-RT` mapping: Z + `burdenFactors` map cleanly into AID-RT's deployment, monitoring, and risk-management sections — no schema change to AID-RT export, just additional populated fields.

---

## Suggested rollout order

1. Phase 1 (taxonomy + type) — small, mergeable on its own.
2. Phase 2.1 + 2.2 (badge on product page + Guide section) — visible value.
3. Phase 5 (backfill) so the badge actually shows up.
4. Phase 3 (exports) — extends HTA / model-card / FHIR.
5. Phase 2.3 (chart encoding) + Phase 4 (reviewer workflow).
6. Phase 3 claim-level table once reviewers are trained.
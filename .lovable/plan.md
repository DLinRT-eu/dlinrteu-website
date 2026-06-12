## Goal

Bring the two recently revised Synaptiq entries in line with peer products and `docs/FIELD_REFERENCE.md`. Data-only edits — no UI or schema changes.

## Files

- `src/data/products/auto-contouring/synaptiq.ts` (Mediq RT)
- `src/data/products/pipeline/synaptiq.ts` (Mediq RT — 4D CT Research Module)

## Drift found vs. peers

### Mediq RT (auto-contouring)

| # | Field | Current | Peer convention / FIELD_REFERENCE | Fix |
|---|---|---|---|---|
| 1 | `technology.deployment` | `["cloud", "on_prem"]` | `["Cloud-based", "On-premises"]` (Manteia, Quanta, AI-Medical, Vysioneer…) | Rename values |
| 2 | `regulatory.ce.type` | `"Medical Device"` | `"MDR"` (Limbus, peers) | Change to `"MDR"` |
| 3 | `regulatory.ce.regulation` | missing | `"MDR 2017/745"` (Limbus) | Add |
| 4 | `regulatory.ce.notifiedBody` | missing | Listed where known | Add `"Not publicly disclosed"` placeholder (kept short) or omit — match Limbus pattern (omit if unknown) |
| 5 | `regulatory.fda.status` | `"pending"` | Enum: `510k_cleared`, `de_novo`, `not_approved`, `under_review` | Change to `"not_approved"` with `notes: "Not submitted; CE-only product"` |
| 6 | `certification` summary | `"CE"` | `"CE Class IIa"` style (Limbus: `"CE & FDA"`) | Change to `"CE Class IIa (MDR)"` to mirror peers |
| 7 | `market.onMarketSince` | `"2021 (testing in 12+ Romanian clinics, EBRD-backed)"` | `YYYY` or `YYYY-MM` per FIELD_REFERENCE | Set to `"2021"`; move pilot context into `clinicalEvidence` |
| 8 | `keyFeatures` | Contains marketing claim `"92.5% average time saving in contouring workflow"` | Peers avoid uncited marketing numbers in keyFeatures | Replace with neutral phrasing: `"Reported time savings in contouring workflow (vendor-cited)"` |
| 9 | Study quality booleans | absent | Peers at E1+ set them explicitly | Add `evidenceVendorIndependent: false`, `evidenceMultiCenter: false`, `evidenceMultiNational: false`, `evidenceProspective: false`, `evidenceExternalValidation: false` (justified by vendor-associated single-center evidence per existing `evidenceRigorNotes`) |
| 10 | `developmentStage` | absent | Live products typically set `"certified"` | Add `developmentStage: "certified"` |
| 11 | `adoptionReadinessNotes` | References "FDA 510(k)" although product is CE-only | Inconsistent with regulatory block | Update to: "Derived from E1 + CE Class IIa: moderate implementation effort — local validation, interface testing and workflow confirmation required before adoption." |

### Mediq RT 4D CT (pipeline)

Already well-aligned with other pipeline entries. One small drift:

| # | Field | Current | Convention | Fix |
|---|---|---|---|---|
| 1 | `certification` | `"Pipeline"` ✓ | matches peers | keep |
| 2 | `modality` | `["CT"]` ✓ | matches peers | keep |
| 3 | `regulatory.ce` / `fda` | absent | Most pipeline entries omit; some include `status: "not_applicable"` | Leave as-is (consistent with most pipeline peers) |
| 4 | `usesAI: true` | present | Optional; harmless | keep |

No code changes needed for the pipeline file beyond confirmation.

## Out of scope

- No edits to other products.
- No UI/component changes.
- No new fields, no schema changes.
- Will not add `guidelines`, `trainingData`, or `evaluationData` until the vendor publishes verifiable info — adding them empty would mislead.

## Verification

After edits: run `npm run lint` / typecheck via the automatic build; load `/products/synaptiq-mediq-rt` and `/products/synaptiq-mediq-rt-4dct-pipeline` in the preview to confirm sections render and CE block shows the new MDR fields.

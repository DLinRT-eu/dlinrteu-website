# Replace the second evidence axis with "Levels of Efficacy" (L1t–L6)

Evidence Rigor (E0–E3) and Adoption Readiness (R0–R?) stay the same. The second axis, Clinical Impact (I0–I5), becomes **Levels of Efficacy**, based on your Table 3. It is adapted from van Leeuwen et al. [1], updated against Antonissen et al. [2], and cross-referenced to Fryback & Thornbury [3].

## New levels

| Code | Name | Typical measures (short) |
|---|---|---|
| L1t | Technical efficacy | Processing time, reproducibility, failure rate, integration with PACS/TPS/OIS, version-to-version agreement, robustness |
| L1c | Potential clinical efficacy | Proof of concept: expert visual check, comparison with a non-AI baseline, Turing-style test |
| L2 | Accuracy efficacy | DSC/HD95/MSD; sensitivity/specificity/AUC; SNR/SSIM/PSNR; DVH/gamma/plan quality; blinded acceptance, Likert scores |
| L3 | Decision/workflow efficacy | Editing time, amount of manual correction, drift monitoring, inter-observer variability, simulated decision impact |
| L4 | Therapeutic/patient management efficacy | Prospective use that changes the plan, dose, fractionation, technique, replanning or time to treatment |
| L5 | Patient outcome efficacy | Toxicity, recurrence, survival, PROMs |
| L6 | Societal efficacy | Costs, QALYs, cost per QALY |

Order for "highest level": L1t < L1c < L2 < L3 < L4 < L5 < L6. Full explanations, typical measures and the abbreviation list are copied word for word from your table.

## How old scores relate (for guidance only, not applied automatically)

```text
I0 feasibility           -> usually L1c (sometimes L1t)
I1 technical/geometric   -> usually L2 (QA/consistency checks -> L1t)
I2 workflow              -> L3
I3 decision change       -> L3 if simulated/retrospective, L4 if prospective
I4 patient outcome       -> L5
I5 societal              -> L6
```

Each paper is re-read and scored against the new table. These rows only help reviewers.

## Part 1 — Framework and explanation pages (one pass)

- Replace the level definitions with L1t–L6, renamed "Levels of Efficacy", and add the three references.
- Update every page and visual that explains or shows the axis so they all read the same: the methodology guide, the evidence level table, the E×L matrix (2D and 3D), the dashboard scatter chart, product badges, per-paper chips, the evidence editor, filters, the review guide, the field reference, the HTA mapping text and the model-card schema.
- Exports (CSV/JSON/FHIR/HTA/model card/PPTX) show the new codes and the axis name.
- Keep the educational/not-clinically-validated wording.

## Part 2 — Re-scoring every paper, category by category

Same wave order as previous sweeps. For each wave:
1. Re-read every scored paper and record the new level, a one-line reason naming the measure used, and the old I-code.
2. Recompute each product's level (highest across its papers; manual overrides stay, with a note to recheck them).
3. Write a report to Files: per-paper CSV (old I, new L, reason) and a short summary of products whose level changes.
4. Apply the wave after you review it, then continue.

Until a product's wave is applied, its old score is shown converted with the guidance table above and marked "provisional". This way no product loses its score in the meantime.

## Technical details

- `src/data/evidence-impact-levels.ts`: new `EfficacyLevelCode = "L1t"|"L1c"|"L2"|…|"L6"` with name, explanation, typicalMeasures, frybackThornburyLevel. Keep `ClinicalImpactCode` as a deprecated legacy type for reading old values.
- Data field: add `efficacyLevel` on products and on `keyPapers` entries (and `categoryEvidence`), plus `legacyClinicalImpact` kept for audit. `clinicalImpact` is read only as a fallback through one `resolveEfficacyLevel()` helper (with the provisional flag).
- `src/utils/evidenceScoring.ts`: rank by the new order; override gets `efficacy`.
- Update `scripts/validate-evidence-scores.ts`, `evidence-sweep.ts`, `audit-swarm.ts` and `evidence-coverage.ts` to the new codes. Validator: an error for unknown codes; a warning for papers still on a legacy I-code.
- Tests: ordering (L1t < L1c < L2 … L6), max-across-papers, override precedence, legacy fallback flagged provisional.
- Update memory (evidence logic) and AGENTS.md rule; project knowledge text mentions I0–I5 and should be edited by you afterwards.

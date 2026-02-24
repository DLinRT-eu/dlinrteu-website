

# Fix Evidence-Impact Matrix Labels and Audit Product Levels

## Problem

The dashboard's Evidence-Impact Matrix uses short labels that don't match the official category names defined in the source of truth (`src/data/evidence-impact-levels.ts`) and shown on the Resources & Compliance page. Additionally, 3 products were assigned I3 ("Decision") when the intent was "Dosimetric improvement" -- which actually maps to I2 ("Workflow").

## Part 1: Fix Dashboard Labels

In `src/components/dashboard/EvidenceImpactScatterChart.tsx`, replace the hardcoded `RIGOR_LEVELS` and `IMPACT_LEVELS` arrays to match the canonical names from `evidence-impact-levels.ts`:

| Level | Current (wrong) | Corrected |
|-------|-----------------|-----------|
| E0 | None | No Evidence |
| E1 | Single-center | Preliminary |
| E2 | Multi-center | Validated |
| E3 | Independent/RCT | Systematic |
| I0 | None | None Demo. |
| I1 | QA/Monitor | QA |
| I2 | Workflow | Workflow |
| I3 | Dosimetric | Decision |
| I4 | Clinical | Outcome |
| I5 | Survival | Societal |

These are shortened versions of the full names from `evidence-impact-levels.ts` (e.g. "No Peer-Reviewed Evidence" becomes "No Evidence") to fit the grid headers, but now semantically correct.

Alternatively, import the labels directly from `evidence-impact-levels.ts` instead of duplicating them, to prevent future drift.

## Part 2: Reassign 3 Incorrectly Classified Products

These products were assigned I3 thinking it meant "Dosimetric improvement", but I3 actually means "Decision" (changes in treatment management/clinical decision-making). Image quality improvements and dose reduction are Workflow (I2) benefits:

### 1. Canon AiCE CT (`src/data/products/reconstruction/canon.ts`)
- **Change**: `clinicalImpact: "I3"` to `clinicalImpact: "I2"`
- **Update notes**: "Workflow improvement through dose reduction (up to 82%) with maintained image quality, enabling more efficient CT protocols."
- **Rationale**: Dose reduction in imaging is a workflow/efficiency gain, not a clinical decision change.

### 2. GE TrueFidelity Pro (`src/data/products/reconstruction/ge-healthcare.ts`)
- **Change**: `clinicalImpact: "I3"` to `clinicalImpact: "I2"`
- **Update notes**: "Workflow improvement through enhanced low-contrast detectability at reduced dose, improving CT protocol efficiency."
- **Rationale**: Same as above -- image quality improvement is workflow, not decision-level impact.

### 3. Accuray Synchrony (`src/data/products/tracking/accuray.ts`)
- **Change**: `clinicalImpact: "I3"` to `clinicalImpact: "I2"`
- **Update notes**: "Workflow improvement through real-time motion compensation enabling reduced treatment margins and minimized normal tissue dose."
- **Rationale**: Motion tracking accuracy is a workflow/technical improvement. While it enables margin reduction, the published evidence (Pepin et al. 2020) demonstrates tracking accuracy, not changes in clinical decision-making.

## Files to Modify

1. `src/components/dashboard/EvidenceImpactScatterChart.tsx` -- fix label arrays, import from source of truth
2. `src/data/products/reconstruction/canon.ts` -- Canon AiCE CT: I3 to I2
3. `src/data/products/reconstruction/ge-healthcare.ts` -- GE TrueFidelity Pro: I3 to I2
4. `src/data/products/tracking/accuray.ts` -- Accuray Synchrony: I3 to I2


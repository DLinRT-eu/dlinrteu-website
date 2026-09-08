# MVision Contour+ — Breast CT target classification

Apply the vendor's correction so breast CTV-type ROIs are counted as targets, add the two missing BrTW ROIs, and flag the whole-breast ROIs as dual-use.

## Changes

1. **Add missing ROIs** to the current Breast CT model list: `BrTW_RTOG_L`, `BrTW_RTOG_R` (currently only present in the archived list).

2. **Classify as Targets (CTV)** these Breast CT ROIs:
   `Br_1234_RTOG_L/R`, `Br_234_RTOG_L/R`, `BrTW_1234_RTOG_L/R`, `BrTW_234_RTOG_L/R`, `BrTW_RTOG_L/R` — 10 entries.
   They currently fall through to organs-at-risk because the names contain no CTV/GTV/PTV token.

3. **Whole-breast ROIs stay organs-at-risk**: `Breast_L`, `Breast_R`, `Breast_RTOG_L`, `Breast_RTOG_R` keep their current counting, with a visible note on the product page that in a breast treatment context they may act as the CTV, while they are also used as contralateral/other-treatment OARs.

4. **Update the provenance note** on Contour+ with the new distinct-structure and per-type counts, and refresh the revision dates.

5. Lymph-node volumes (`LN_Breast_*`) remain elective — unchanged.

## Technical notes

- `src/utils/structureClassification.ts`: extend `classifyStructure` with an explicit breast-target pattern matching `Br_`/`BrTW_` RTOG partial-breast volumes (e.g. `/^(Br|BrTW)(_\d+)?_RTOG(_[LR])?$/i` applied to the name after the model prefix). Keep the change narrow so no other vendor's names are affected.
- `src/data/products/auto-contouring/mvision-structures.ts`: insert the two `BrTW_RTOG_L/R` entries into `MVISION_ALL_STRUCTURES` under `Breast CT:` and update the header comment counts.
- `src/data/products/auto-contouring/mvision.ts`: update `structuresProvenance.notes` counts, add the dual-use sentence, set `lastUpdated`/`lastRevised` to the current date.
- Verify: `npx tsgo --noEmit -p tsconfig.app.json`, `npm run validate:evidence`, and confirm the product page, dashboard chart and compare page all report the same distinct-structure totals and the new target count.

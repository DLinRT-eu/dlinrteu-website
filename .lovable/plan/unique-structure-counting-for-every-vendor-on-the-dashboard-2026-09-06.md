# Unique structure counting for every vendor on the dashboard

The dashboard already switched to unique counting in the last change: both structure charts drop the model/region prefix and count each structure name once per product. Applying it across the catalogue changes 20 vendors' figures, for example Limbus 338 -> 276, MVision 683 -> 324, RadFormation 565 -> 390, MIM 174 -> 109, GE 119 -> 71, Therapanacea Annotate 228 -> 184.

Two entries show that the rule needs one guard before it is correct for everyone.

## The one problem to fix

Some products do not publish a real structure list; they publish a placeholder per region:

- Varian AI Contouring for Eclipse lists "Head & Neck: OARs (unverified)", "Thorax: OARs (unverified)", and three more. Stripping the region leaves five identical "OARs" rows, so the product collapses from 5 to 1.
- MedCom ProSoma DART lists "Head & Neck: 41 VOIs (per-structure list not publicly disclosed)" and two others; two of the three share the "11 VOIs" wording and merge into one, giving 3 -> 2.

These are placeholders, not duplicate structures, so they must not be merged.

## What to change

In the shared unique-name helper, keep the region/model prefix as part of the identity when the name after the prefix is a placeholder rather than a named structure — that is, when it is only "OAR"/"OARs", or reads like a count of undisclosed volumes ("41 VOIs", "per-structure list not publicly disclosed", "N structures"). Every other entry keeps deduplicating on the structure name alone, as it does now.

After the guard: Varian Eclipse stays at 5, MedCom stays at 3, and all other vendors keep the unique figures listed above.

## Verification

Re-run the per-vendor before/after report over all 20 affected products and confirm only the two placeholder products change back, then check the dashboard's two auto-contouring charts and the structure-type bars render the unique totals. Typecheck.

No product data is edited, no structures added or removed, no evidence scores touched.

## Technical notes

- `src/utils/structureClassification.ts` — add the placeholder guard inside `getDistinctStructureNames`; keep `stripStructurePrefix` unchanged.
- Consumers already updated and unchanged here: `transformStructureData` and `transformStructureTypeData` in `src/utils/chartDataTransformation.ts`, feeding `StructuresChart` and `StructureTypeDistributionChart` via `useChartData` / `DataService`.
- Product pages and the comparison table keep showing the full model-specific list; only dashboard aggregates use unique counting.

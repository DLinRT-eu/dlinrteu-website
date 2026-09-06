# MVision re-check + site-wide structure counting (L/R = 2) + target/elective review

## 1. Clean up the conflicting MVision copy

`src/data/products/auto-contouring/mvision-ai.ts` is a second, full copy of the Contour+ record (same id `mvision-ai-contouring`, 1458 lines, structure list pasted inline). Nothing imports it — the auto-contouring index imports `./mvision` only — so it is dead code that already drifted: it still says "223 unique names", keeps the old `partOf` link `dlinrt.eu/products/...` (wrong path, we use `/product/`), and lacks the new `features`/`limitations` and the corrected counting wording.

Action: field-by-field diff of the orphan against the live `mvision.ts` first, carry over anything genuinely newer from the vendor round (nothing expected beyond the 1.3.1 version string, which will be confirmed), then delete the orphan file. Same check for the other MVision files (image-synthesis, registration, platform, treatment-planning, performance-monitor) to confirm the earlier consistency pass survived the later commits.

## 2. Make the structure count consistent site-wide with L/R = 2

Today the counting helper `hasLateralityPattern` treats a name as two structures whenever it sees `L/R`, but also when it sees a *single* side written as `(L)`, `(R)`, ` L ` or ` R `. That over-counts 34 real entries:

- Carina InContour: 32 single-side names such as "Cerebellum L", "Breast R" each counted twice.
- Philips MRCAT Prostate: "Femoral Head (L)" and "Femoral Head (R)" each counted twice.

Correct rule, applied everywhere: a name counts as 2 only when it bundles both sides (`L/R`, `R/L`, `(L/R)`); a name that names one side counts as 1. MVision is unaffected because its list already spells out `_L` and `_R` separately (683 entries, 324 distinct names).

Second inconsistency: some views count with the laterality rule (`countStructureTypes`), while others use the raw array length — the compare page card (`CompareStructures.tsx`) and the product-page panel header. Those will be switched to the shared counter so one product never shows two different totals on two pages.

## 3. Target / elective classification check

For MVision the classifier currently yields 582 OARs, 101 elective, 0 targets out of 683. The 101 elective are all `LN_*` nodal volumes, which is right. But four published `CTV_*` volumes (Female Pelvis CT: CTV_Central, CTV_Param, CTV_Pelvis, and Female Pelvis-CT: CTV_Pelvis in the archived list) are falling into OAR instead of Target. Reason to confirm during the fix: the classifier requires a word boundary that `CTV_Central` style names defeat. The rule will be corrected so non-nodal `CTV_*`/`GTV_*`/`PTV_*` count as Target while `CTVn`/`CTV_n`/`CTV_LN` stay Elective, then the whole catalogue is re-scanned for names that flip category, and each flip is reviewed before it is accepted.

## Technical notes

- `src/utils/structureClassification.ts`: narrow `hasLateralityPattern` to bundled-side patterns only; fix the Target regex for underscore-suffixed CTV/GTV/PTV while keeping nodal CTVs elective.
- `src/pages/CompareStructures.tsx` and `src/components/product/SupportedStructures.tsx`: use `countStructureTypes(...).total` instead of `array.length`.
- Delete `src/data/products/auto-contouring/mvision-ai.ts` after the diff.
- Verify: a script that prints per-product OAR/Target/Elective/total before and after so every changed count is inspected; then `npx tsgo --noEmit -p tsconfig.app.json`, `npm run validate:evidence`, and open the Contour+, compare-structures and dashboard pages.

No structures added or removed, no evidence scores changed.

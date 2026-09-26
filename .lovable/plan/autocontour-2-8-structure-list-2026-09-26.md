# AutoContour 2.8 structure list

## Goal

Replace the AutoContour structure list with the v2.8 list from Radformation's product page. Keep the current 2.7 list in the version menu, the same way MIM Contour ProtégéAI+ keeps its 1.4.0 list.

## Steps

1. **Extract the per-model lists.** The product page groups models by site, and each site opens only when you click it. The page shows 17 groups with counts: 84, 55, 58, 48, 14, 57, 25, 60, 50, 10, 42, 19, 2, 7, 11, 7, 58. I'll use a headless browser to click each group, read every model name with its modality (CT/MR/CBCT), and save the raw extract to a worksheet.
2. **Check the count against the vendor.** Those group counts add up to 607, but Radformation says "520+". The gap probably comes from models listed in more than one group, and how the laterality is accounted for or from planning structures and alternative models that the vendor doesn't count. The dashboard should have the unique account. For it. I'll:
  - check that each group's extracted names match the count shown on the page;
  - remove duplicates across groups and compare the result with 520+;
  - report exactly how the numbers reconcile. I won't adjust any number to force a match. If they don't reconcile, the entry will say so.
3. **Update the entry**:
  - `supportedStructures` gets the v2.8 list, formatted as "Region: Structure Name" with the vendor's own names (TG-263). New and updated models are recorded only if the page marks them.
  - The current list moves to `structureHistory`, marked version "2.7" with its original source and retrieval date. It then shows up in the version menu.
  - The model-count wording and `source` get the retrieval date (2026-09-26) and the note that "per-structure list not yet re-synced" is resolved. The note that the announcement doesn't say which clearance covers 2.8 stays.
4. **Checks:** typecheck and validate:evidence. Then open the AutoContour page in the browser to confirm that the version menu switches between 2.8 and 2.7 and that the totals update.

## Risks

- If a group's names only load after interaction and the extraction fails, I'll leave the list at 2.7 and report it instead of filling it in partly.
- Organ and target totals shown elsewhere (for example in the news item and the structure comparison) will change. I'll report the new totals.
# Structure counts: fix remaining inconsistencies and add a "how we count" rule

## Goal
Make the structure totals on every product page internally consistent (badges = grouped list = CSV) and show visitors a short, visible rule explaining how the numbers are counted.

## Changes

### 1. Add a "How structures are counted" hint (src/components/product/SupportedStructures.tsx)
- Add an info icon (Info from lucide) next to the summary badges that opens a small popover/hover card with the counting rule:
  - Each listed entry counts as one structure.
  - Left/right paired names (e.g. "Kidney_L/R") count as two models.
  - Entries marked "(investigational)" are counted separately in the Investigational badge and excluded from the OAR/Target/Elective badges.
  - For AutoContour only: a model listed under several site groups is counted once (same name + modality), matching the vendor's stated distinct-model count; the full grouped list still shows every entry.
- Keep the existing "N entries across site groups; M distinct models" note for AutoContour, now referencing the same rule.

### 2. Fix remaining count inconsistencies
- Verify badge totals equal the number of rendered list rows (with the left/right ×2 rule) for all auto-contouring products; the grouped lists and CSV already count every entry, so badges must match unless `dedupeModels` is on.
- Check the laterality rule against the data: confirm no product double-counts (e.g. entries already listed separately as "_L" and "_R" plus a "_L/R" entry). Fix any found in the data files, not the counter.
- Re-check AutoContour: badges must read 523 (384 organs + 139 lymph-node) and the note must show 607 entries.

### 3. Document the rule
- Add the counting rule to docs/FIELD_REFERENCE.md (supportedStructures section) so reviewers apply it when adding structure lists.

## Technical details
- Files touched: `src/components/product/SupportedStructures.tsx` (info popover + any counter fix), possibly product data files if double-counted laterality entries are found, `docs/FIELD_REFERENCE.md`.
- No change to `dedupeModels` gating (stays AutoContour-only) or to the dashboard's distinct-name count.
- Verify with typecheck, `validate:evidence`, build, and a browser check of the AutoContour and MVision pages.

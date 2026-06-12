## Plan: Classify CTVn (CTV nodal) as Lymph Node / Elective, not OAR

### Root cause
In `src/utils/structureClassification.ts`, the target regex uses `\b(CTV|GTV|PTV|...)\b`. Because `\b` is a word boundary, `CTVn` (CTV with a lowercase "n" for nodal) does NOT match `\bCTV\b`, and there is no elective pattern for `CTVn` either. Result: any structure named `CTVn_*` or `CTVn L*` falls through to the OAR bucket.

### Affected products
- `src/data/products/auto-contouring/radformation.ts` — six entries (`Breast Nodes: CTVn L1/L2/L3 ESTRO L/R`).
- Mediq RT (`synaptiq.ts`): the vendor-verbatim list already uses `LN_*` names, so no per-product change needed there. The classifier fix is enough to keep peer vendors consistent.

`CTVp` (CTV primary), where present, should remain a Target — `CTVp` is the primary tumor CTV, not nodal.

### Change
Edit `src/utils/structureClassification.ts` → `classifyStructure()`:

1. Add an elective pattern for nodal CTV variants:
   ```ts
   /\bCTVn\b|\bCTV[_\s\-]?[Nn]\b|\bCTV_LN\b/i.test(structure)
   ```
   This covers `CTVn`, `CTV_n`, `CTV-n`, `CTV n`, `CTV_LN`.

2. To prevent the same string from also matching the Target regex, exclude `CTVn` from the target match — change the target regex from:
   ```ts
   /\b(CTV|GTV|PTV|...)\b/i
   ```
   to a negative-lookahead form that skips `CTV` immediately followed by `n`/`N`/`_n`/`_N`/`_LN`:
   ```ts
   /\b(CTV(?![nN]|_[nN]|_LN)|GTV|PTV|Clinical\s+Target|Planning\s+Target|Gross\s+Tumor|Gross\s+Target)\b/i
   ```
   `CTVp`, `CTV_Breast_L`, `CTV56`, etc. still match Target as before.

3. Mirror the same logic so a single structure cannot end up as both Target and Elective (priority: nodal CTV → Elective).

### Scope guardrails
- No changes to Mediq RT data file.
- No changes to UI components or counts logic — `countStructureTypes` already reads from `classifyStructure`, so badges, comparison matrix, and product page counts update automatically.
- No changes to other products' data files.

### Verification
- Add no new tests (the project does not have unit tests around this util), but spot-check the Radformation product page Structures section to confirm the six `CTVn L* ESTRO` entries now appear under "Lymph Nodes / Elective" instead of "OARs".

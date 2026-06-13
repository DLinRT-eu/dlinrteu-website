
## Audit — QOCA® image Smart RT Contouring System (`quanta-qoca-image-smart-rt`)

The latest PR added/updated `src/data/products/auto-contouring/quanta-computer.ts`. Compared against `docs/FIELD_REFERENCE.md`, the project schema, and sibling auto-contouring entries, the following issues need correction.

### Findings

**Errors (must fix)**

1. **Orphan duplicate file** — `src/data/products/auto-contouring/quanta-computer-inc.ts` defines the same `id` (`quanta-qoca-image-smart-rt`) as a single `export const QOCAimageSmartRTContouringSystem`. It is **not** imported by `auto-contouring/index.ts` and violates the project pattern (one `*_PRODUCTS: ProductDetails[]` array per file). It also drifts from the active record (different `evidence.type`, `deployment`, `version`, `source`). → **Delete the file.**

2. **`source` field has the wrong proxy date** — currently reads `"...releaseDate proxied from FDA decision date (2026-06-01)"`. `2026-06-01` is the `lastUpdated` value, not the FDA decision. Should read `(2024-02-13)` to match `releaseDate` and `regulatory.fda.decisionDate`.

3. **`version` missing** — `version` is marked required in `FIELD_REFERENCE.md`. The FDA 510(k) lists the model designation `ZSWR901`; use `version: "1.0 (ZSWR901)"` (or `"1.0"`) to satisfy the schema.

**Warnings (recommended)**

4. **`technology.deployment: ["On-premises", "Cloud"]`** — vendor sources and FDA summary only substantiate on-prem deployment; `Cloud` is unsupported. Drop `"Cloud"` unless a vendor citation is added. (The orphan file correctly listed on-prem only.)

5. **`supportedStructures` dropped in favour of `structuresUnavailable: true`** — the orphan file enumerated 24 H&N + Pelvis structures in the canonical `"Region: Structure Name"` form (per project nomenclature rule). Restore that list and remove `structuresUnavailable: true` so the product matches the auto-contouring standard and powers the structure-comparison matrix.

6. **`regulatory.ce.status: "not_applicable"` paired with notes "CE status not publicly confirmed"** is contradictory. Either:
   - keep `not_applicable` and rephrase the note to "CE marking not pursued / not publicly listed", or
   - change status to `under_review` if pursuit is known.

7. **`evidence[0].type: "FDA 510(k)"`** is non-standard. Sibling entries use one of the rubric-aligned types (e.g. `"Regulatory"` or `"Internal Validation"` with `level: "1t"`). Align with the evidence taxonomy used elsewhere.

**Info**

8. **Archived stub** `src/data/products/archived/qoca.ts` (id `qoca-smart-rt`) describes the same product under a different id and is still exported by `archived/index.ts`. Since the product is now live with richer data, the archived entry should be removed (or its README note updated) to avoid duplicate catalogue records. Flagging for confirmation rather than auto-removing per Minimal Intervention.

9. **Dates** — bump `lastUpdated` / `lastRevised` to today (2026-06-13) once the above fixes land.

### Planned edits (build mode)

- `src/data/products/auto-contouring/quanta-computer.ts`
  - Add `version: "1.0 (ZSWR901)"`
  - Fix `source` decision-date string → `(2024-02-13)`
  - `technology.deployment` → `["On-premises"]`
  - Replace `structuresUnavailable: true` with the full `supportedStructures` array from the orphan file (24 items, `Region: Structure Name` form)
  - Rewrite `regulatory.ce.notes` for consistency with `not_applicable`
  - Change `evidence[0].type` to `"Regulatory"` and add `level: "1t"`
  - Bump `lastUpdated` / `lastRevised` to `2026-06-13`
- Delete `src/data/products/auto-contouring/quanta-computer-inc.ts` (orphan).
- **Open question for the user:** also retire the archived `qoca-smart-rt` stub (Finding #8)?

### Out of scope

No changes to the `ProductDetails` type, the auto-contouring index, the company record, or unrelated products.

## Goal

Refresh `lastRevised` to `2026-05-23` for products in low-risk categories whose date is older than 50 days, after a quick sanity check that nothing material has changed.

## Categories in scope (low-risk — bump)

These categories rarely change between releases (regulatory cleared, no structure-list churn, no recent vendor news):

**image-enhancement** (3) — `src/data/products/image-enhancement/subtle-medical.ts`
- `subtle-pet` (2026-03-08)
- `aimify` (2026-03-08)
- `subtle-hd` (2026-03-08)

**reconstruction** (3)
- `canon-aice-mr` (2026-03-08) — `canon.ts`
- `united-uaifi-umr` (2026-03-08) — `united-imaging.ts`
- `united-hd-tof` (2026-03-08) — `united-imaging.ts`

**pipeline** (5) — pre-market, no public changes since March
- `medlever-assistant-pipeline`, `medlever-copilot-pipeline` — `medlever.ts`
- `therapanacea-smartplan-pipeline`, `therapanacea-tumorbox-pipeline`, `therapanacea-brachybox-pipeline` — `therapanacea.ts`

Total: **11 products** across 5 files.

## Categories out of scope (skip)

- **auto-contouring** (`taimedimg-deepmets`) — high-risk per recent structure-list audits; skip.
- **archived** (11) — products no longer active; bumping `lastRevised` would be misleading.
- **examples** (5) — docs/template files; should not be touched.

## Per-product sanity check (before bumping)

For each of the 11 products I'll quickly confirm in the file:
1. `regulatory.ce` / `regulatory.fda` status looks current (no `pending` that should be cleared, no obviously stale clearance date).
2. `productUrl` / `companyUrl` look intact.
3. No `limitations[]` entry says "needs vendor confirmation".

If any product fails the check, it's left unchanged and reported back instead of bumped.

## Edits

For each passing product, change only the single line:
```ts
lastRevised: "2026-03-08",   // → "2026-05-23"
```
No other field, no formatting changes, no companyRevisionDate touch (that's vendor-driven).

## Out of scope

- No DB writes to `product_revision_dates` (user picked file-only as the date source).
- No content rewrites, no structure-list edits, no evidence re-scoring.
- No changelog entry (this is maintenance hygiene, not a substantive update).

## Deliverable

Updated `lastRevised` in up to 5 files: `subtle-medical.ts`, `canon.ts`, `united-imaging.ts`, `medlever.ts`, `therapanacea.ts` (pipeline). Final reply summarises which products were bumped vs. flagged.

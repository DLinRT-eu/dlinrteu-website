# AGENTS.md

- Vendor application consolidations use canonical product IDs with central legacy aliases, sourced naming history and function-scoped historical evidence; do not export the source module records as active products — why: regrouping must preserve attribution and old links without inflating catalogue counts.
- Historical review/draft lookups use `getProductForStoredRecord` and retain original IDs and module scope; public lookups resolve aliases to the current application — why: many-to-one remapping would collide with review-round uniqueness and overwrite independent histories.

- Second evidence axis values (`clinicalImpact`) are Levels of Efficacy codes; legacy I0–I5 values are converted only in `normalizeProductEfficacy` (applied in `ALL_PRODUCTS`) and `resolveEfficacyLevel`, never ad hoc in components — why: one conversion point keeps badges, matrix, exports and validator consistent while papers are re-scored.
- Dashboard 2D and shared 3D evidence views use `getEvidenceMatrixProducts` and canonical axis definitions — why: paper maxima, overrides, provisional flags and assessed-product counts must agree across views.
- Full-catalogue audit tooling writes read-only findings and source-retrieval results separately from product correction passes; normalize specialist roles/severities before compilation, and never count internal checks as external searches — why: findings must reconcile across report/CSV without turning retrieved metadata or name-query hits into verified medical claims.

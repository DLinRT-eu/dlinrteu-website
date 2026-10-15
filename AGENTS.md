# AGENTS.md

- Second evidence axis values (`clinicalImpact`) are Levels of Efficacy codes; legacy I0–I5 values are converted only in `normalizeProductEfficacy` (applied in `ALL_PRODUCTS`) and `resolveEfficacyLevel`, never ad hoc in components — why: one conversion point keeps badges, matrix, exports and validator consistent while papers are re-scored.
- Dashboard 2D and shared 3D evidence views use `getEvidenceMatrixProducts` and canonical axis definitions — why: paper maxima, overrides, provisional flags and assessed-product counts must agree across views.
- Full-catalogue audit tooling writes read-only findings and source-retrieval results separately from product correction passes — why: static checks and fetched metadata must not silently become verified medical claims.

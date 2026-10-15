# AGENTS.md

- Second evidence axis values (`clinicalImpact`) are Levels of Efficacy codes; legacy I0–I5 values are converted only in `normalizeProductEfficacy` (applied in `ALL_PRODUCTS`) and `resolveEfficacyLevel`, never ad hoc in components — why: one conversion point keeps badges, matrix, exports and validator consistent while papers are re-scored.

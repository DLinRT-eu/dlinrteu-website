# Align the dashboard with Evidence Rigor vs Levels of Efficacy

## Confirmed issues
- The dashboard defines seven efficacy levels, but both grid layouts still allocate only six efficacy columns. The live dashboard confirms that L6 wraps and the rigor rows become misaligned.
- Dashboard labels still include “Impact”, “Burden”, and “E3 Systematic”, rather than the current framework’s terminology and full scope.
- The 2D and 3D views currently bucket stored product scores directly rather than using the shared paper-score calculation.

## Changes
1. Fix the matrix to display four rigor rows (E3 down to E0) and seven efficacy columns (L1t, L1c, L2–L6), with headers and cells precisely aligned.
2. Use the canonical definitions for level names and tooltip descriptions. Label the axes **Evidence Rigor** and **Levels of Efficacy**; use **Adoption Readiness** for the unchanged third axis. Wrap longer labels without truncating their meaning.
3. Use the existing evidence-score calculation for dashboard placement, respecting paper-derived maxima, documented overrides, and provisional legacy fallback. Keep 2D and 3D scores consistent and identify provisional efficacy in product tooltips.
4. Preserve current filters, task colors, categorical dots, counting behavior, and PNG export. The evidence matrix continues counting products, not individual models; do not change product or publication classifications.
5. Ensure the 3D count reflects products with all three assessed axes, rather than implying it always equals the 2D count.

## Technical details
- Primary changes: `src/components/dashboard/EvidenceImpactScatterChart.tsx`, its input preparation in `src/pages/Dashboard.tsx` if needed, and the shared 3D view only where necessary for consistency.
- Reuse `EVIDENCE_RIGOR_LEVELS`, `EFFICACY_LEVELS`, and `computeProductEvidenceScore`; do not introduce another legacy conversion rule.
- Update the dashboard framework memory and relevant documentation to replace its outdated I0–I5 terminology. Preserve educational safety wording and make no clinical-validation claims.

## Validation
- Add small logic tests for all seven efficacy buckets, paper maximum/override precedence, provisional fallback, and exclusion of unassessed axes.
- Run the relevant tests and lint; inspect the automatically generated build diagnostics.
- Verify the dashboard in the browser: all 28 cells align, filters update counts, tooltips show the correct terminology, PNG export retains the full matrix, and 3D displays the same assessed scores with readiness unchanged.
- Check the current desktop size and a narrow viewport for readable labels and contained horizontal scrolling.
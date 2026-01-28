
# Remove Legacy Evidence System: Keep Only Dual-Axis Classification

## Overview

Since no products currently have evidence levels filled in, we can cleanly remove the legacy single-axis evidence system and keep only the new dual-axis classification (Evidence Rigor + Clinical Impact). This simplifies the codebase and avoids confusion between two overlapping systems.

## Files to Delete

| File | Reason |
|------|--------|
| `src/pages/EvidenceLevels.tsx` | Legacy single-axis page no longer needed |
| `src/data/evidence-levels.ts` | Legacy level definitions replaced by dual-axis |
| `src/components/product/EvidenceLevelBadge.tsx` | Legacy badge component, replaced by `EvidenceImpactBadges` |

## Files to Modify

### 1. `src/App.tsx`
- Remove the `/evidence-levels` route
- Remove the lazy import for `EvidenceLevels`

### 2. `src/types/productDetails.d.ts`
- Remove legacy fields:
  - `evidenceLevel`
  - `evidenceLevelNotes`
  - `level` from EvidenceItem (lines 77, 83, 84)
- Keep dual-axis fields (already present)

### 3. `src/components/product/EvidenceLimitationsDetails.tsx`
- Remove import of `EvidenceLevelBadge`
- Remove `LEGACY_EVIDENCE_LEVELS` constant (lines 23-32)
- Remove legacy classification section (lines 240-280)
- Remove fallback to legacy badge in header (lines 141-143)
- Update `hasLegacyLevel` check to no longer influence visibility

### 4. `src/components/resources/EvidencePyramid.tsx`
- Remove pyramid view toggle and legacy pyramid rendering
- Show only the dual-axis matrix
- Remove imports from `@/data/evidence-levels`

### 5. `src/components/resources/EvidenceLevelTable.tsx`
- Replace legacy table with dual-axis table
- Remove imports from `@/data/evidence-levels`
- Show rigor and impact levels side-by-side

### 6. `src/pages/EvidenceImpactGuide.tsx`
- Remove link to legacy classification (line 292-294)
- Update to be the primary evidence documentation page

### 7. `src/data/evidence-impact-levels.ts`
- Remove `LEGACY_LEVEL_MAPPING` constant (no longer needed)

### 8. `src/utils/modelCard/dataGenerator.ts`
- Update to use dual-axis fields instead of legacy `evidenceLevel`

### 9. `src/utils/modelCard/types.ts`
- Update `performance` section to use dual-axis fields

### 10. `src/components/resources/PageIndex.tsx`
- Update the evidence-levels link text if needed

## Data Model After Changes

```typescript
// src/types/productDetails.d.ts - Evidence section
interface EvidenceItem {
  type: string;
  description: string;
  link: string;
  // Note: 'level' field removed - was legacy
}

// Product fields (legacy removed)
evidenceRigor?: "E0" | "E1" | "E2" | "E3";
evidenceRigorNotes?: string;
clinicalImpact?: "I0" | "I1" | "I2" | "I3" | "I4" | "I5";
clinicalImpactNotes?: string;
```

## Component Changes Summary

### EvidenceLimitationsDetails.tsx (After)
- Only shows dual-axis classification section
- No legacy dropdown or badge
- Simplified visibility logic

### EvidencePyramid.tsx (After)
- Renamed to `EvidenceMatrix.tsx` (optional)
- Shows only the interactive 4x6 matrix
- No toggle or pyramid view

### EvidenceLevelTable.tsx (After)
- Renamed content to show both axes
- Two side-by-side tables or combined view
- Links only to `/evidence-impact-guide`

## Route Changes

| Before | After |
|--------|-------|
| `/evidence-levels` (Legacy page) | Removed |
| `/evidence-impact-guide` (Dual-axis page) | Primary page |

Links from `/resources` will point to `/evidence-impact-guide` only.

## Benefits

1. **Cleaner codebase**: No duplicate systems to maintain
2. **Clearer UX**: Users see only one evidence classification approach
3. **Simpler editing**: Product editors only have dual-axis dropdowns
4. **No migration needed**: Since no products have data, clean removal is safe

## Implementation Order

1. Update type definitions first (remove legacy fields)
2. Delete legacy files (page, data, badge component)
3. Update components that imported deleted modules
4. Update App.tsx routes
5. Test evidence display on product pages and resources page

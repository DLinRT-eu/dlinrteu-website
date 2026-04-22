

## Plan: Fix empty Auto-Contouring structure slides in the .pptx export

### Root cause

In `src/services/DataService.ts` (lines 373–374) the structure transforms are called with the wrong second argument:

```ts
const structureData = transformStructureData(products, "models");
const structureTypeData = transformStructureTypeData(products, "models");
```

Both `transformStructureData` and `transformStructureTypeData` (in `src/utils/chartDataTransformation.ts`) early-return `[]` unless the second argument equals `"Auto-Contouring"` — they expect `selectedTask`, not the counting mode. So `data.structureData` and `data.structureTypeData` are always empty, and both slides render as a title with no chart (the native-chart fallback receives empty arrays; the chart-image fallback also has nothing to plot meaningfully).

`transformStructureTypeData` additionally maps over **all** products (not just Auto-Contouring), so even when called correctly it would include rows with zero structures from unrelated categories.

### Fix

1. **`src/services/DataService.ts`** (lines 373–374) — pass the correct task:
   ```ts
   const structureData = transformStructureData(products, "Auto-Contouring");
   const structureTypeData = transformStructureTypeData(products, "Auto-Contouring");
   ```

2. **`src/utils/chartDataTransformation.ts`** — in `transformStructureTypeData`, restrict to Auto-Contouring products and drop rows with zero structures so the stacked bar isn't padded with empty entries:
   ```ts
   const acProducts = filteredProducts.filter(p => matchesTask(p, "Auto-Contouring"));
   return acProducts.map(...).filter(r => r.total > 0).sort((a,b) => b.total - a.total);
   ```

3. **`src/utils/pptxExport.ts`** — add empty-data guards to both structure slides (mirror the certification-slide pattern, lines 1064–1072) so future data gaps render a visible "no structure data available" placeholder instead of a blank slide:
   - `addStructureAnalysisSlide`: if `data.structureData.length === 0` → placeholder text + return.
   - `addStructureTypeAnalysisSlide`: if `totalOARs + totalTargets + totalElective === 0` → placeholder text + return.

### Light fine-tuning (only the structure slides, no broader rework)

- Cap `addStructureAnalysisSlide` to top 12 structures (currently 15) so labels stay readable on a 16:9 slide.
- In `addStructureTypeAnalysisSlide`, switch the pie chart to a **stacked bar per product** (matches the on-screen `StructureTypeDistributionChart` and is more informative than a 3-slice pie). Use the same color mapping (`#3b82f6` OARs, `#ef4444` Targets, `#8b5cf6` Elective) for consistency with the dashboard.
- Add a one-line subtitle under each title with the totals (e.g. `"X OARs · Y Targets · Z Elective across N products"`) so the slide stands on its own without needing the chart image.

### QA

- Trigger the .pptx export from `/presentation`, open the file, and verify:
  - "Auto-Contouring: Supported Structures" shows top 12 bars with real names + counts.
  - "Auto-Contouring: Structure Type Distribution" shows a stacked bar per product with non-zero totals and the subtitle line.
  - Slide order and total slide count remain in sync with `getPptxSlidePlan` (no slides added or removed).

### Files touched

- `src/services/DataService.ts` — fix two transform call arguments.
- `src/utils/chartDataTransformation.ts` — filter `transformStructureTypeData` to Auto-Contouring + drop zero-total rows.
- `src/utils/pptxExport.ts` — empty-data guards, top-12 cap, stacked-bar swap, subtitle line on both structure slides.

### Out of scope

- Other charts/slides (user confirmed the rest look OK).
- Changes to `getPptxSlidePlan`, slide ordering, or the on-screen `StructuresChart` / `StructureTypeDistributionChart` components.
- Offscreen chart capture pipeline (the native-chart fallback will now render correctly even if image capture fails).


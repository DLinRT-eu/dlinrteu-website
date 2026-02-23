

# Add Evidence-Impact Scatter Matrix to Dashboard

## Overview

Create a new interactive scatter-plot chart for the Dashboard that plots every product on the Evidence Rigor (Y-axis, E0-E3) vs Clinical Impact (X-axis, I0-I5) grid. Each product is a colored dot based on its task category, with hover tooltips showing product name, company, task, and evidence notes.

## Design Decisions

**Color by task category**: Using the existing `TASK_COLORS` map (Auto-Contouring = blue, Treatment Planning = pink, Image Enhancement = amber, etc.) gives immediate visual grouping and is consistent with the other dashboard charts. With ~10 task categories, this is readable and meaningful -- users can instantly see which clinical areas have the most evidence.

**Jitter for overlapping dots**: Since the grid is discrete (4 rigor x 6 impact = 24 cells), many products will overlap. A small random offset (jitter) within each cell will spread dots out while keeping them visually within the correct cell.

**Recharts ScatterChart**: Consistent with the existing Recharts-based dashboard charts. Uses the same `ChartContainer` wrapper and `ResponsiveContainer` pattern.

## New Component

### `src/components/dashboard/EvidenceImpactScatterChart.tsx`

A new dashboard chart component that:

1. Transforms filtered products into scatter data points:
   - X = numeric value of clinicalImpact (I0=0, I1=1, ..., I5=5)
   - Y = numeric value of evidenceRigor (E0=0, E1=1, E2=2, E3=3)
   - Adds small random jitter to prevent dot overlap
   - Color derived from `TASK_COLORS[product.category]`

2. Renders a Recharts `ScatterChart` with:
   - X-axis: Clinical Impact levels (I0-I5) with tick labels
   - Y-axis: Evidence Rigor levels (E0-E3) with tick labels
   - Grid lines to form the matrix cells
   - Scatter dots sized ~8-10px, colored by task category
   - Custom tooltip on hover showing: product name, company, task, evidence rigor level name, clinical impact level name, and evidence notes (truncated)

3. Legend showing task categories with their colors (only categories present in current filtered data)

4. Respects dashboard filters (task, location, modality) -- uses the same `filteredProducts` array

5. Responsive sizing using the existing mobile detection hook

## Dashboard Integration

### `src/pages/Dashboard.tsx`

- Import and add the new `EvidenceImpactScatterChart` component to the grid
- Pass `filteredProducts` (already available from `useChartData` hook)
- Place it after the Certification chart (before the auto-contouring-specific charts)
- It spans the full width (`col-span-full` on large screens) since the matrix needs horizontal space

## Data Flow

```
filteredProducts (from useChartData)
  -> filter out products without evidenceRigor/clinicalImpact
  -> map to scatter points { x, y, name, company, category, color, rigorNotes, impactNotes }
  -> add jitter offsets
  -> render as Recharts ScatterChart
```

## Files to Create
1. `src/components/dashboard/EvidenceImpactScatterChart.tsx` -- new scatter chart component

## Files to Modify
1. `src/pages/Dashboard.tsx` -- import and add the new chart to the dashboard grid


# Redesign Evidence-Impact Matrix: From Scatter Plot to Categorical Grid

## Overview

Replace the current Recharts-based scatter chart with a pure HTML/CSS categorical grid matrix, similar to the existing `EvidenceImpactMatrix` component on the Resources & Compliance page. Instead of abstract colored dots and zone indicators, each grid cell will contain the actual product dots, colored by task category, with hover tooltips for details.

## Current Problem

The scatter plot with Gaussian jitter makes it hard to tell which discrete Evidence/Impact level a product belongs to. Products float between grid lines rather than being clearly placed within a cell.

## New Design

A 4-row (E0-E3, bottom to top) by 6-column (I0-I5, left to right) grid of cells. Each cell contains colored dots (one per product) arranged in a wrapping layout inside the cell box. Hovering a dot shows product details.

### Layout

```text
         I0       I1       I2       I3       I4       I5
       +--------+--------+--------+--------+--------+--------+
  E3   |        |        | o o o  |   o    |        |        |
       +--------+--------+--------+--------+--------+--------+
  E2   |        |   o    | oooooo |  o o   |        |        |
       |        |        | oooo   |        |        |        |
       +--------+--------+--------+--------+--------+--------+
  E1   |  o o   |   o    | ooooo  |        |        |        |
       +--------+--------+--------+--------+--------+--------+
  E0   |  ooo   |   o    |   o    |        |        |        |
       +--------+--------+--------+--------+--------+--------+
```

Each `o` is a colored dot (color = task category). Dots wrap naturally inside the cell.

### Features

- **Categorical clarity**: Each product is unambiguously inside its E/I cell
- **Task-colored dots**: Same `TASK_COLORS` map as before (blue = Auto-Contouring, pink = Treatment Planning, etc.)
- **Hover tooltips**: Using Radix UI `Tooltip` (matching the Resources page pattern), showing product name, company, task, rigor/impact labels, and evidence notes
- **Cell count badge**: Small count number in corner of each non-empty cell
- **Row/column headers**: E0-E3 labels on the left, I0-I5 labels on top, with short descriptive names
- **Responsive**: Horizontal scroll on mobile, larger cells on desktop
- **Task legend**: Below the grid, showing task categories with colored dots (only those present)
- **Product count**: Title includes total count like before

## File to Modify

### `src/components/dashboard/EvidenceImpactScatterChart.tsx`

Complete rewrite of the component internals:

1. **Remove** all Recharts imports (`ScatterChart`, `Scatter`, `XAxis`, `YAxis`, etc.)
2. **Remove** jitter functions (`seededRandom`, `gaussianJitter`)
3. **Keep** the `RIGOR_MAP`, `IMPACT_MAP`, label maps, and tooltip data structure
4. **Add** Radix Tooltip imports (already available in the project)
5. **Build** a grid using CSS Grid (`grid-cols-7` -- 1 label column + 6 impact columns)
6. **Group** products by `(evidenceRigor, clinicalImpact)` into cell buckets
7. **Render** each cell as a bordered box containing wrapped colored dots
8. **Add** Tooltip on each dot for hover interaction
9. **Keep** the task-color legend at the bottom

No other files need to change -- the component API (`filteredProducts` prop) stays the same, so `Dashboard.tsx` needs no updates.

## Technical Notes

- The grid renders E3 at the top row and E0 at the bottom (reversed order), matching the Resources page convention
- Dot size: `w-3.5 h-3.5` on desktop, `w-3 h-3` on mobile -- small enough to fit many per cell but large enough to hover
- Cells have a minimum height to keep the grid uniform even when empty
- Non-empty cells get a subtle background tint to highlight populated zones
- The `ResponsiveChartWrapper` and `ChartContainer` wrappers are removed (not needed for a pure HTML grid)
- Mobile: `overflow-x-auto` with `min-w-[640px]` on the grid container

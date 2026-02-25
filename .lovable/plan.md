

# Fix: Use Dashboard Chart PNGs in PPTX Export

## Problem

The PPTX export calls `captureAllDashboardCharts()` which looks for chart DOM elements by ID (e.g., `chart-task`, `chart-location`). However, the export is triggered from `/presentation`, where these chart components are not rendered. The function finds no DOM elements and returns an empty map, so the PPTX falls back to native pptxgenjs charts instead of using the dashboard visuals.

## Solution

Create a hidden offscreen chart renderer component that temporarily mounts all dashboard charts during PPTX export, captures them as PNGs, then unmounts them.

### Approach

1. **New component `src/components/presentation/OffscreenChartRenderer.tsx`**
   - A React component that renders all 8 dashboard charts inside a hidden container (positioned offscreen with `position: fixed; left: -9999px`)
   - Uses the same data hooks (`useChartData`, `useCompanyData`) with default "all" filters so charts show unfiltered data
   - Accepts an `onReady` callback -- after mounting and a short delay (to let Recharts render SVGs), it calls `captureAllDashboardCharts()` and passes the results back
   - Renders all charts including the conditionally-shown Structure and StructureType charts

2. **Update `src/utils/pptxExport.ts` -- `exportToPptx` function**
   - Remove the direct call to `captureAllDashboardCharts()` (which fails when not on `/dashboard`)
   - Instead, accept an optional `chartImages` parameter so the caller can pass pre-captured images

3. **Update `src/pages/Presentation.tsx` -- export flow**
   - When user clicks "Export PPTX":
     - Set a state flag to mount the `OffscreenChartRenderer`
     - Wait for its `onReady` callback with captured chart images
     - Pass the chart images to `exportToPptx(chartImages)`
     - Unmount the renderer after export completes

### File Changes

| File | Change |
|------|--------|
| `src/components/presentation/OffscreenChartRenderer.tsx` | **New**: Renders all dashboard charts offscreen and captures them as PNGs |
| `src/utils/pptxExport.ts` | Update `exportToPptx` to accept optional `chartImages` parameter instead of trying to capture from DOM |
| `src/pages/Presentation.tsx` | Mount offscreen renderer during export, pass captured images to export function |

### Technical Details

The offscreen renderer will:
- Use `position: fixed; left: -9999px; width: 1200px` to ensure charts render at a consistent desktop size
- Include a `setTimeout` delay (~1500ms) after mount to allow Recharts to complete SVG rendering
- Call `captureAllDashboardCharts()` which uses the existing SVG-to-canvas serialization from `useChartExport.ts`
- Return all 8 chart images: task, location, modality, company, certification, evidenceImpact, structureType, structure

The export function signature changes from:
```
exportToPptx(): Promise<void>
```
to:
```
exportToPptx(chartImages?: Record<string, string>): Promise<void>
```

This preserves backward compatibility (if called without images, it still attempts DOM capture as a fallback).


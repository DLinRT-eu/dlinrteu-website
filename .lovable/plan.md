# Fix Task Product Tables (AI filtering) and Use Dashboard Chart Images in PPTX

## Four Changes

### 1. Filter non-AI products from task-based product tables (except Performance Monitor)

**Problem**: Currently all products (including non-AI QA tools) appear in every task's product table slides. Non-AI products should only appear under "Performance Monitor".

**Fix in `src/services/DataService.ts**`: In the `getPresentationData` method where `taskProducts` is built (around line 404), add a filter:

- If the current task is NOT "Performance Monitor", exclude products where `usesAI === false`
- If the task IS "Performance Monitor", include all products (both AI and non-AI)

### 2. Add "Export to PNG" button to each dashboard chart

**New utility `src/utils/chartExport.ts**`: Create a utility function `exportChartAsPng(elementId: string): Promise<string>` that:

- Uses `html2canvas` approach (or simpler: create a canvas from the chart's DOM element)
- Since we already have access to the DOM, use the native `html-to-image` pattern with a canvas element
- Actually, the simplest robust approach: use the `**toDataURL**` pattern -- wrap each chart in a div with a unique `id`, then use `document.querySelector` + the canvas API

**Better approach -- use `html2canvas**`: We don't have it installed, but we can use the browser's native approach:

- Each chart component gets a `ref` and an export button
- The export function uses a `<canvas>` element and the SVG serialization approach (Recharts renders SVGs)
- Serialize the SVG to a string, draw it on a canvas, export as PNG

**Implementation -- New hook `src/hooks/useChartExport.ts**`:

- `useChartExport()` returns `{ chartRef, exportToPng, getChartDataUrl }`
- `exportToPng(filename)` -- downloads the chart as PNG
- `getChartDataUrl()` -- returns base64 data URL (for PPTX use)
- Uses SVG serialization: gets the `<svg>` element inside the ref, serializes with `XMLSerializer`, draws on canvas via `Image` + `canvas.toDataURL()`

**New component `src/components/dashboard/ChartExportButton.tsx**`:

- Small download icon button positioned in the top-right of each chart card
- Calls `exportToPng` on click

**Update each dashboard chart component** (6 files):

- `TaskDistributionChart.tsx`
- `LocationDistributionChart.tsx`
- `ModalityDistributionChart.tsx`
- `CompanyDistributionChart.tsx`
- `CertificationDistributionChart.tsx`
- `EvidenceImpactScatterChart.tsx`

Each gets:

- A `ref` on the chart container div
- A `ChartExportButton` in the card header
- A unique `id` attribute for the chart container

### 3. Use dashboard chart PNG images in PPTX instead of native pptxgenjs charts

**Problem**: The current PPTX creates native pptxgenjs charts (bar, pie) that don't match the dashboard visuals. Some charts (Certification, EvidenceImpact) are missing entirely.

**Approach**: Before generating the PPTX, capture all dashboard charts as PNG base64 data URLs, then embed them as images in the slides.

**New export flow in `src/utils/chartImageCapture.ts**`:

- `captureAllDashboardCharts(): Promise<Record<string, string>>` 
- Captures each chart by its DOM element ID
- Returns a map of chart name to base64 data URL
- Uses the same SVG-to-canvas serialization approach

**Update `PresentationData` interface** in `src/utils/pptxExport.ts`:

- Add `chartImages?: Record<string, string>` field

**Update chart slide methods** in `src/utils/pptxExport.ts`:

- `addTaskDistributionSlide` -- if `data.chartImages?.task` exists, use `addImage` with the data URL instead of `addChart`
- `addCompanyDistributionSlide` -- use `chartImages.company`
- `addLocationAnalysisSlide` -- use `chartImages.location`
- `addModalityAnalysisSlide` -- use `chartImages.modality`
- `addStructureAnalysisSlide` -- use `chartImages.structure`
- `addStructureTypeAnalysisSlide` -- use `chartImages.structureType`
- **New** `addCertificationSlide` -- use `chartImages.certification`
- **New** `addEvidenceImpactSlide` -- use `chartImages.evidenceImpact`

Each updated method:

- Checks if the chart image exists in `data.chartImages`
- If yes: adds it as a full-width image on the slide (with title text above)
- If no: falls back to the existing native pptxgenjs chart (backward compatibility)

**Update `generatePresentation**`: Add the two new slides (Certification and EvidenceImpact) to Section 2.

**Update `src/services/DataService.ts` `getPresentationData**`: Accept optional `chartImages` parameter and pass through to the returned data.

**Update PPTX export trigger** (wherever `exportToPptx` is called):

- Before calling export, capture charts from the DOM
- Pass chart images into the presentation data

4. Revise licensing, add disclaimer slice and mention the source in each slide  
  

  add to each slide of the pptx the licensing BB-CY license with the source: DLinRT.eu and the logo on the bottom. Also, a disclaimer slide should be added that the use of the content of the website is allowed upon referenifg the source + add the date of retrieval on the slice as well.  
    
  Make sure the licensing is in-line with the one used for the website.

## File Summary


| File                                                          | Change                                                                                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `src/services/DataService.ts`                                 | Filter non-AI products from non-Performance-Monitor tasks; accept chartImages parameter                                               |
| `src/hooks/useChartExport.ts`                                 | New hook: SVG-to-canvas chart export with download and data URL functions                                                             |
| `src/utils/chartImageCapture.ts`                              | New utility: capture all dashboard charts as base64 PNGs by DOM element ID                                                            |
| `src/components/dashboard/ChartExportButton.tsx`              | New component: download button for each chart                                                                                         |
| `src/components/dashboard/TaskDistributionChart.tsx`          | Add chart ref, ID, and export button                                                                                                  |
| `src/components/dashboard/LocationDistributionChart.tsx`      | Add chart ref, ID, and export button                                                                                                  |
| `src/components/dashboard/ModalityDistributionChart.tsx`      | Add chart ref, ID, and export button                                                                                                  |
| `src/components/dashboard/CompanyDistributionChart.tsx`       | Add chart ref, ID, and export button                                                                                                  |
| `src/components/dashboard/CertificationDistributionChart.tsx` | Add chart ref, ID, and export button                                                                                                  |
| `src/components/dashboard/EvidenceImpactScatterChart.tsx`     | Add chart ref, ID, and export button                                                                                                  |
| `src/utils/pptxExport.ts`                                     | Update interface; use chart images instead of native charts; add Certification and EvidenceImpact slides; update generatePresentation |


## Chart ID Mapping


| Dashboard Chart            | DOM ID                  | chartImages key  |
| -------------------------- | ----------------------- | ---------------- |
| Task Distribution          | `chart-task`            | `task`           |
| Location Distribution      | `chart-location`        | `location`       |
| Modality Distribution      | `chart-modality`        | `modality`       |
| Company Distribution       | `chart-company`         | `company`        |
| Certification Distribution | `chart-certification`   | `certification`  |
| Evidence Impact            | `chart-evidence-impact` | `evidenceImpact` |
| Structure Types            | `chart-structure-type`  | `structureType`  |
| Structures                 | `chart-structure`       | `structure`      |

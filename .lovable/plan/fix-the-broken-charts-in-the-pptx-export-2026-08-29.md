# Fix the broken charts in the PPTX export

## What I found

I audited `src/utils/pptxExport.ts`, the chart capture path (`src/utils/chartImageCapture.ts`, `src/hooks/useChartExport.ts`) and the offscreen renderer used before export. The two badly rendered plots near the beginning of the deck are the first two analytics visuals, and they fail for two different reasons.

### 1. "AI Solution Categories" pie chart is built with the wrong data shape

In `addCategoryBreakdownSlide` (around line 628) each category is turned into its own series object:

```text
[{name: "Auto-Contouring", labels: ["Auto-Contouring"], values: [42]},
 {name: "Image Synthesis",  labels: ["Image Synthesis"],  values: [11]}, ...]
```

pptxgenjs pie charts take exactly **one** series with all labels and all values. With one-value-per-series it renders a degenerate pie (a single full circle / mislabelled legend). Fix: emit a single `{name, labels[], values[]}` series, like the certification pie already does on the "Platform Analytics" slide.

### 2. Captured dashboard chart images are stretched

`addChartImageSlide` drops every captured PNG into a fixed 12.3 x 5.2 inch box. The captured dashboard charts are roughly 1200 x 350-450 px (about 3:1), so they get vertically stretched — fonts and bars look distorted. The other image path in the file (`safeAddImage`) already does aspect-ratio fitting; the chart path does not.

Fix: measure the PNG's natural size, fit it inside the content box preserving aspect ratio, and centre it.

### 3. Chart capture only serialises the first SVG

`containerToDataUrl` grabs `container.querySelector('svg')` only, and any HTML-rendered legend/labels outside the SVG are lost. For charts whose legend is HTML (Recharts default legend can be HTML), the exported image loses the legend, which reads as "not well rendered". Fix: keep the SVG capture but paint the container background and also include any additional SVGs in the same container; if no SVG is found, fall back to the native pptxgenjs chart (already supported).

### 4. Smaller audit findings (same file)

- The category pie and its table use `validCategoryData` sum for shares, while the closing "Platform Analytics" table divides by `data.totalProducts` — the same category list can show two different percentages in one deck. Align both on the same denominator.
- The certification pie filters `count > 0` but the category pie also silently drops categories with `count === 0`; the table then shows a total that differs from the headline product count. Add a short "n = X products" caption so numbers on the slide are self-consistent.
- The offscreen renderer waits a fixed 2 s before capture; if Recharts is still animating, the PNG is half-drawn. Disable animation for the offscreen instances (or wait for the SVG to contain rendered paths) instead of a blind timeout.

## Changes

| File | Change |
|---|---|
| `src/utils/pptxExport.ts` | Single-series pie data for the category slide; aspect-ratio-preserving, centred image placement in `addChartImageSlide`; consistent share denominators + `n =` caption |
| `src/hooks/useChartExport.ts` | Capture all SVGs in the container with background fill; return `null` cleanly when nothing renderable is found |
| `src/components/presentation/OffscreenChartRenderer.tsx` | Wait for rendered chart paths rather than a fixed 2 s, so captures are never mid-animation |

No product data, no scoring logic, and no dashboard UI behaviour change — this is export/presentation only.

## Verification

- Typecheck (`tsgo`) and the existing test suite.
- Drive the presentation page with Playwright, trigger the export, and re-render the produced `.pptx` to images to visually confirm the category pie and the first captured chart slides.



## Plan: Fix slide 27 + sync the PowerPoint preview with the real export

### Root cause

`src/utils/pptxExport.ts` generates a much larger deck than the 18-item preview in `src/pages/Presentation.tsx` shows, because `addCompanyLogosByTaskSlides()` emits **two-or-more slides per task** (one logo grid + one or more product tables). With ~11 tasks and Auto-Contouring spanning multiple table pages, the actual export is ~40–45 slides — not 18. As a result:

- Slide numbers shown in the UI preview don't match the exported file (slide 27 in the export is roughly the "AI Solution Categories" pie chart, but the preview labels slide 5 as that — so users opening the file see wrong content where they expected something else).
- The preview is missing entries for: every per-task logo slide, every per-task product table slide (and their multi-page splits), and the category/breakdown ordering after them.

The slide content itself (`addCategoryBreakdownSlide`) renders correctly — the bug is preview/order mismatch, not chart data.

### Fix

#### 1. Build the preview from the real export plan, not a hand-written list

Refactor so a single source of truth describes the deck. In `src/utils/pptxExport.ts`, add an exported helper:

```ts
export function getPptxSlidePlan(data: PresentationData): Array<{
  title: string; description: string; section: string;
}>
```

It returns the exact, ordered list of slides that `generatePresentation` will emit, including:
- Per-task logo slide (`"<Task> Companies"`)
- Per-task product table slide(s) with `(p/N)` page suffix when products > 12

`Presentation.tsx` then calls `getPptxSlidePlan(presentationData)` instead of the hard-coded `pptxSlidePreviewData` array. Every slide chip shows the real title and number, so slide 27 in the UI is slide 27 in the file.

#### 2. Verify all referenced slide builders actually run and are complete

Audit each builder called from `generatePresentation` (lines 1289–1326) against its preview entry. Confirmed gaps to address:

- **Mission & Vision**: text only mentions Mission + Vision; preview says "strategic direction" — keep as is, fine.
- **AI Solution Categories** (the slide the user flagged): runs `addCategoryBreakdownSlide`. Confirm `data.categoryBreakdown` is populated (it is — derived from `getAllProducts().map(p => p.category)`). Add a guard so any category with `count === 0` is filtered out *before* the percentage calculation (`Math.round(item.count / totalProducts * 100)` currently uses `data.totalProducts` rather than the sum of valid categories — use the validated total to avoid percentages that don't add to 100%).
- **Structure Analysis / Structure Type slides**: builders exist but only render when `chartImages` is provided. Add a fallback message or native chart so the slide isn't blank when chart capture fails. Same for `Certification` and `Evidence & Impact` slides (currently `if (!data.chartImages?.x) return;` silently skips them — making the deck shorter than the preview promises). Replace early returns with a fallback "chart unavailable" placeholder *or* drop the slide from the plan when the image is missing (and reflect that in `getPptxSlidePlan`).
- **Per-task table slides**: confirm `anatomy`, `ceStatus`, `fdaStatus` columns render real values (already wired in `DataService.getPresentationData` lines 421–431) — no change needed.
- **Footer**: `addSlideFooter` runs over `(this.pptx as any)._slides`. Keep as is but assert `allSlides.length > 0` and log a warning if zero (defensive).

#### 3. Reorder for narrative flow

Current order puts all per-task logo+table slides (~30 slides) *before* the Category Breakdown / Task Distribution charts, which is why the user only reaches "AI Solution Categories" at slide 27. Reorder to:

```text
1.  Title
2.  Mission & Vision
3.  Platform Overview
4.  AI Solution Categories          ← chart up front
5.  Task Distribution
6.  Company Distribution
7.  Location Coverage
8.  Imaging Modalities
9.  Certification
10. Evidence & Impact
11. Structure Analysis
12. Structure Types
13. Partner Companies (logo wall)
14… Per-task deep-dive: <Task> Companies + <Task> Products (1/N) …
N-2. Platform Content Summary
N-1. Get Involved
N.   Governance & Values
N+1. Disclaimer
```

This makes slide 27 sit inside the per-task deep-dive section (predictable) and means the high-level analytics show up in the first 12 slides where conference audiences look.

#### 4. Update `Presentation.tsx`

- Replace `pptxSlidePreviewData` with `getPptxSlidePlan(presentationData)`.
- Update the card title from `"PowerPoint Slides (18 slides)"` to `"PowerPoint Slides ({plan.length} slides)"` so the count is dynamic.
- Group the chips by `section` (Intro / Analytics / Per-task deep dive / Closing) with small headings, so a 40-slide list is still scannable.
- Live-demo preview list (`liveDemoSlidePreviewData`) is already accurate against `LiveDemoMode.tsx` (12 slides) — leave untouched.

#### 5. QA

- Run the export in preview, open the .pptx, and verify:
  - Total slide count matches the UI preview count.
  - Slide 27 shows what the UI chip #27 says.
  - Category percentages sum to 100%.
  - No silently-skipped slides (Certification, Evidence & Impact, Structure charts always present, with a placeholder if no chart image was captured).
  - Footer appears on every slide.

### Files touched

- `src/utils/pptxExport.ts` — add `getPptxSlidePlan`, reorder `generatePresentation`, fix percentage divisor in `addCategoryBreakdownSlide`, add fallbacks in `addCertificationChartSlide` / `addEvidenceImpactSlide` / `addStructureAnalysisSlide` / `addStructureTypeAnalysisSlide`.
- `src/pages/Presentation.tsx` — consume `getPptxSlidePlan`, render grouped chips, dynamic count.

### Out of scope

- Live demo mode (already correct).
- Chart styling/colors, branding, or layout rework beyond the percentage-divisor and fallback fixes.
- Changes to `DataService.getPresentationData` data shape.


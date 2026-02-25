

# Revise Presentation Center and Live Demo

## Issues Found

1. **Welcome slide duplicate stat**: The first demo slide shows "Categories" twice (lines 42-43 in LiveDemoMode.tsx) -- one should be "Certifications"
2. **Missing demo slides**: Several key platform pages have no corresponding live demo slide: Pipeline, Evidence & Impact Guide, News, Initiatives
3. **Demo slides are text-only**: Every slide shows the same layout (icon, title, bullet points, Go Live button). No embedded figures, stats, or visual variety
4. **Presentation Center preview is stale**: The `pptxSlidePreviewData` and `liveDemoSlidePreviewData` arrays on `/presentation` don't match the actual slide content

## Plan

### 1. Fix duplicate stat on Welcome slide

**File: `src/components/presentation/LiveDemoMode.tsx`**

Change the fourth stat from `{ label: "Categories", value: data.analyticsData.totalCategories.toString() }` to `{ label: "Certifications", value: (data.certificationBreakdown?.length || 0).toString() }`.

### 2. Add new Live Demo slides

Add 3 new slides to the `createSlides()` array in `LiveDemoMode.tsx`:

- **Pipeline** (after Product Directory): upcoming/pre-certification AI products, links to `/products/pipeline`
- **Evidence & Impact** (after Resources): the E/I scoring framework, links to `/evidence-impact-guide`
- **News & Updates** (before Get Involved): latest platform news, links to `/news`

### 3. Enhance SlideContent with optional figures and richer layouts

**File: `src/components/presentation/SlideContent.tsx`**

Extend the slide data interface and rendering to support optional visual elements:

- Add optional `figureComponent` field to the slide interface -- a React node rendered below the subtitle (e.g., an inline chart, a mini dashboard summary, or an image)
- Add optional `highlights` field for a horizontal row of highlight cards (alternative to stats)
- Keep backward compatibility: slides without these fields render as before

### 4. Add embedded figures to key demo slides

**File: `src/components/presentation/LiveDemoMode.tsx`**

For select slides, add inline visual content using real data from `dataService`:

- **Welcome**: Already has stats -- keep as is (with the fix)
- **Platform Analytics (dashboard)**: Add a small summary showing top 3 tasks with their product counts as colored bars
- **Product Directory**: Add a mini stat row: total products, total with CE, total with FDA
- **Companies**: Add a mini stat row: total companies, top company by product count
- **Evidence & Impact**: Add a brief inline description of the E0-E3 / I0-I5 axes

### 5. Update Presentation Center page previews

**File: `src/pages/Presentation.tsx`**

Update both `pptxSlidePreviewData` and `liveDemoSlidePreviewData` arrays to accurately reflect the current PPTX export sections and the updated live demo slides (including the 3 new ones).

## File Summary

| File | Change |
|------|--------|
| `src/components/presentation/LiveDemoMode.tsx` | Fix duplicate stat; add 3 new slides; add figure data to select slides |
| `src/components/presentation/SlideContent.tsx` | Support optional `figureComponent` and `highlights` in slide interface and rendering |
| `src/pages/Presentation.tsx` | Update preview data arrays to match actual slide content |

## Technical Details

The `figureComponent` approach uses React nodes directly in the slide data, which is already the pattern used for the `icon` field. This keeps the implementation simple with no new dependencies.

The new slides follow the existing pattern: each has `id`, `title`, `subtitle`, `description`, `keyPoints`, `liveLink`, and `icon`. The optional enrichments (`stats`, `figureComponent`, `highlights`) add visual variety without breaking existing slides.




# Fix PPTX Export: Positioning, Data Accuracy, and Chart Fidelity

## Problems Identified

1. **Content outside page boundaries**: 6 chart slides use hardcoded `x: 0.3, w: 12.6` instead of the layout constants (`margin.left: 1.0`, `contentWidth: 11.33`), pushing content outside the visible slide area.
2. **Analytics data is fabricated**: Views, visitors, session duration are computed from product/company counts with arbitrary multipliers -- not real data.
3. **Charts don't match the website**: pptxgenjs's built-in chart renderer produces visually different charts than the Recharts-based ones on the dashboard.

## Approach

### Fix 1: Consistent Positioning (all chart slides)

Replace all hardcoded `x: 0.3, y: 0.5, w: 12.6` values in the 6 chart slide methods and the contact/engagement slide with the existing `this.layout.margin.*` and `this.getContentWidth()` constants. This is the primary cause of content appearing outside page boundaries.

**Affected methods** (lines in `src/utils/pptxExport.ts`):
- `addTaskDistributionSlide` (lines 757-788)
- `addCompanyDistributionSlide` (lines 790-821)
- `addLocationAnalysisSlide` (lines 823-855)
- `addModalityAnalysisSlide` (lines 857-887)
- `addStructureAnalysisSlide` (lines 889-920)
- `addStructureTypeAnalysisSlide` (lines 922-958)
- `addContactEngagementSlide` (lines 960-1063)

All will switch from:
```text
x: 0.3, y: 0.5, w: 12.6
```
to:
```text
x: this.layout.margin.left, y: this.layout.margin.top, w: contentWidth
```

And chart areas from `x: 0.3, y: 1.8, w: 12.6, h: 5` to `x: margin.left, y: 1.6, w: contentWidth, h: contentHeight` with proper bounds.

### Fix 2: Remove Fabricated Analytics

The `addAnalyticsOverviewSlide` shows fake view counts and traffic trends. Replace the fabricated analytics with a factual content-based summary: total products, companies, categories, certifications tracked. Remove the "Total Views" / "Unique Visitors" / "Avg. Session" cards and the fake traffic line chart. Replace with a content summary that reflects real platform data (product counts by category, certification breakdown, etc.).

In `DataService.ts`, remove the fabricated `analyticsData` fields (totalViews, uniqueVisitors, averageSessionDuration, trafficTrends) and replace with real content metrics derived from actual data.

### Fix 3: Improve Chart Fidelity

Since capturing actual Recharts screenshots requires html2canvas with offscreen rendering (very fragile), the practical fix is to improve the pptxgenjs charts to better match the website:

- Use matching colors from the Recharts chart configs (per-bar colors for task distribution)
- Add data labels to bar charts (matching the website's tooltip info)
- Use consistent font (Arial, not Inter -- Inter isn't embeddable in PPTX)
- Fix chart margins so bars/pies don't get clipped

### Fix 4: Font Consistency

Several slides mix `fontFace: "Inter"` with `fontFace: "Arial"`. Inter is a web font not available in PowerPoint. Standardize all text to `fontFace: "Arial"` to prevent fallback rendering issues.

## Files Modified

### 1. `src/utils/pptxExport.ts`

**Positioning fix** -- all 7 chart/engagement methods updated to use `this.layout.margin.*` and `this.getContentWidth()`.

**Font fix** -- replace all `fontFace: "Inter"` with `fontFace: "Arial"` (~20 occurrences).

**Analytics slide** -- rewrite `addAnalyticsOverviewSlide` to show real content metrics instead of fabricated traffic data:
- Card 1: Total Products (from data.totalProducts)
- Card 2: Total Companies (from data.totalCompanies)
- Card 3: Clinical Categories (from data.totalCategories)
- Replace fake traffic line chart with a certification breakdown bar chart
- Replace "Most Viewed Pages" table with "Products by Category" table (real data)

**Chart improvements** -- add `showValue: true` or `dataLabelPosition` to bar charts; ensure `catAxisOrientation` matches the website's rotated labels.

### 2. `src/services/DataService.ts`

Remove the fabricated analytics block (lines 407-437) that generates fake totalViews/uniqueVisitors/averageSessionDuration/trafficTrends. Replace `analyticsData` with a real content summary:

```text
analyticsData: {
  totalProducts: products.length,
  totalCompanies: companies.length,
  totalCategories: categories.length,
  certificationBreakdown: [...],
  categoryBreakdown: [...]
}
```

### 3. `src/utils/pptxExport.ts` (PresentationData interface)

Update the `analyticsData` type in the interface to match the new real-data structure (remove totalViews, uniqueVisitors, etc.; add content-based fields).

## Summary of Changes

| Issue | Fix | Impact |
|-------|-----|--------|
| Content outside page | Use layout constants consistently | All chart slides render within bounds |
| Fake analytics | Replace with real content metrics | Accurate, trustworthy data |
| Font fallback | Standardize to Arial | Consistent rendering in PowerPoint |
| Chart mismatch | Better colors, labels, margins | Closer match to website charts |


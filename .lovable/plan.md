
# Fix Live Demo Double Content

## Problems Identified

1. **Main site navbar bleeds through**: The site's `Header` component renders on every route including `/presentation/demo`, creating a double-navbar effect behind the demo navigation bar
2. **Three slides all link to `/about`**: "Mission & Vision" (slide 2), "Governance & Values" (slide 14), and "Get Involved" (slide 15) all point to the same page with overlapping themes
3. **Redundant slides**: "Governance & Values" repeats transparency themes already covered in "Mission & Vision"; "Get Involved" is a thin slide that could be merged into a closing slide
4. **Too many slides (15)**: Some slides cover very narrow topics and could be consolidated

## Changes

### 1. Hide the main site navbar during Live Demo

**File: `src/App.tsx`**

Wrap the `Header` component so it does not render when the current route is `/presentation/demo`. Use a small wrapper component that checks `useLocation().pathname` and conditionally renders `<Header />`.

### 2. Consolidate duplicate slides from 15 down to 12

**File: `src/components/presentation/LiveDemoMode.tsx`**

Remove or merge the following:

- **Remove "Governance & Values" (slide 14)** -- its key points (transparency, independence, peer review, community-driven) are already covered by "Mission & Vision". Merge unique points into Mission & Vision's key points.
- **Merge "Get Involved" (slide 15) into a closing "Thank You & Get Involved" slide** -- combine community engagement with a closing call-to-action, keeping only this as the final slide.
- **Remove "Data Security" (slide 12)** as a standalone slide -- merge its key points (GDPR, no patient data, open-source) into "Resources & Compliance" (slide 10), since security/privacy is part of regulatory compliance context.

Resulting slide order (12 slides):

```text
 1. DLinRT.eu (Welcome)
 2. Mission, Governance & Vision (merged)
 3. Platform Analytics
 4. Product Directory
 5. Product Pipeline
 6. Auto-Contouring
 7. Company Directory
 8. Product Comparison
 9. Product Timeline
10. Resources, Compliance & Security (merged)
11. Evidence & Impact
12. News & Get Involved (merged closing slide)
```

### 3. Update Presentation Center preview data

**File: `src/pages/Presentation.tsx`**

Update the `liveDemoSlidePreviewData` array to match the new 12-slide structure.

## File Summary

| File | Change |
|------|--------|
| `src/App.tsx` | Conditionally hide `Header` on `/presentation/demo` route |
| `src/components/presentation/LiveDemoMode.tsx` | Consolidate from 15 to 12 slides by merging duplicates |
| `src/pages/Presentation.tsx` | Update `liveDemoSlidePreviewData` to reflect new 12-slide structure |

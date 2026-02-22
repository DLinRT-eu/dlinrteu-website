
# Fix Spectronic Task + Logos-Only View with Export

## 1. Data Fix: Spectronic Missing Secondary Task

Spectronic Medical's product (MRIplanner) has `secondaryCategories: ["Auto-Contouring"]`, but the company entry lacks a corresponding `secondaryTasks` field. This means filtering by "Auto-Contouring" on the Companies page won't show Spectronic.

**Fix:** Add `secondaryTasks: ["Auto-Contouring"]` to the Spectronic company entry in `src/data/companies/specialized-solutions.ts`.

## 2. Logos-Only Toggle View

Add a toggle on the Companies page to switch between the current detailed card view and a compact "Logos Only" grid view. This is useful for presentations -- showing all vendor logos at a glance and exporting them as a single image.

**How it works:**
- A Switch toggle labeled "Logos only" in the toolbar area
- When enabled, the company list is replaced by a responsive grid of company logos (with company names below each logo)
- An "Export as Image" button appears that captures the logo grid as a PNG using `html2canvas` (already available in the project)
- The existing search/filter/sort controls still apply to the logos view

## Files to Modify

| File | Change |
|------|--------|
| `src/data/companies/specialized-solutions.ts` | Add `secondaryTasks: ["Auto-Contouring"]` to Spectronic |
| `src/pages/Companies.tsx` | Add logos-only toggle state, conditional rendering of logo grid vs card list, and "Export as Image" button |

## Technical Details

- The logos-only grid will use a responsive CSS grid (6 columns on desktop, 4 on tablet, 2 on mobile)
- Each logo cell shows the company logo image (from `logoUrl`) and the company name
- The "Export as Image" button uses `html2canvas` to render the logo grid div to a canvas, then triggers a PNG download
- The `Switch` component from `@/components/ui/switch` is used for the toggle
- All existing filters (task, search, sort) continue to work in logos-only mode, so you can export logos for a specific task category



## Plan: Fix horizontal scroll + improve PDF report in Comparison popup

The PDF export already exists in the comparison dialog (Excel/CSV/PDF dropdown next to the Export button), but two things need fixing per your request.

### 1. Horizontal scroll inside the popup

**Problem:** `DialogContent` is capped at `max-w-6xl` with `overflow-hidden`. The inner table wrappers use `overflow-auto`, but the `<table>` itself stretches to 100% of the container and squeezes columns instead of overflowing — so with 4–5 products columns become unreadable and there's no horizontal scrollbar.

**Fix in `src/components/comparison/ProductComparison.tsx`:**
- Wrap the `DataTable` (both the Tabs and the no-tabs branches) in a div that forces a minimum table width based on product count, so the inner `overflow-auto` actually scrolls horizontally.
  - Use a min-width of roughly `200px (field col) + N × 240px (per-product col)` applied via inline style on a wrapper div.
- Add `overflow-x-auto overflow-y-auto` (instead of just `overflow-auto`) on the scroll container, and set `max-w-full`.
- Apply the same wrapper to `StructureComparisonTable` so the structures tab also scrolls horizontally when many products are compared.
- Bump `DialogContent` from `max-w-6xl` to `max-w-[95vw]` so the popup uses the available screen real estate before falling back to scroll. Keep `max-h-[90vh]`.

Result: with 2–3 products everything fits; with 4–5 products the user gets a real horizontal scrollbar inside the popup and can pan across all columns.

### 2. PDF comparison report — make it discoverable and improve quality

**Discoverability:** Replace the small native `<select>` + Export button with a clearer split: keep the format dropdown but rename the button to **"Export Report"** and add a hint underneath the table footer: *"Export as Excel, CSV, or PDF report"*. The PDF option already triggers `exportComparisonToPDF` in `src/utils/comparison/comparisonExporter.ts`.

**Quality improvements to `exportComparisonToPDF`** (single file, `src/utils/comparison/comparisonExporter.ts`):
- Switch the body table from manually-positioned text to `jspdf-autotable` (already a transitive option, otherwise add `jspdf-autotable`). This gives:
  - Proper column widths that adapt to product count (1 field column + N product columns split across landscape A4 width).
  - Automatic page breaks per row instead of the current hand-rolled `checkPageBreak` (which can clip the last line of long cells).
  - Striped rows + header repeated on every page.
- Keep the existing title, subtitle ("Comparing N products"), generation date, and footer page numbers.
- Keep the "Supported Structures" grouped formatting via `parseAndGroupStructures` / `formatGroupedStructuresForPDF`.
- Keep clickable URL handling for the Website / Product URL rows (use autotable's `didDrawCell` hook to add `doc.link` over URL cells).
- If there are >3 products, automatically split into multiple report sections (one table per ≤3 products) so each row stays readable on landscape A4. The first page lists all products being compared; subsequent pages contain the side-by-side tables.
- Add a one-line product summary block under the title (name, company, version, certification) before the comparison table for at-a-glance context.

### Files touched

- `src/components/comparison/ProductComparison.tsx` — dialog width, scroll wrappers, button label.
- `src/utils/comparison/comparisonExporter.ts` — rewrite `exportComparisonToPDF` body using `jspdf-autotable`; keep Excel/CSV exporters unchanged.
- `package.json` — add `jspdf-autotable` if not already present.

### Out of scope

- Changing the comparison data model or which fields are compared.
- Changing Excel/CSV export.
- Mobile-specific dialog redesign (existing responsive behavior preserved; horizontal scroll already covers narrow screens).


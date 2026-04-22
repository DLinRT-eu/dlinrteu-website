

## Plan: Make Export button visible in compare dialog with many products

**Problem:** In `ProductComparison.tsx`, the export controls (format dropdown + "Export Report" button) live inside `DialogTitle` on the right side. The Radix `DialogContent` always renders an absolutely-positioned close (X) button at `right-4 top-4`, which overlaps the Export button. With 5 products this is especially noticeable because the user is focused on the wide table and the partially-hidden Export button gets clipped behind the X. Also, the controls share a row with the title, so on narrower headers they can wrap awkwardly.

### Fix (single file: `src/components/comparison/ProductComparison.tsx`)

1. **Move export controls out of `DialogTitle`** into their own toolbar row directly under the header. This removes the conflict with the absolute-positioned X close button.
2. **Reserve right padding for the X button** by adding `pr-10` to the toolbar row so nothing sits underneath the close icon.
3. **Make the toolbar sticky** at the top of the dialog body (`sticky top-0 z-10 bg-background`) so the Export button stays visible even while the user scrolls horizontally/vertically through a wide 5-product table.
4. **Improve the toolbar layout**: left side shows a short label ("Export comparison as:"), right side shows the format `<select>` + "Export Report" button. Use `flex flex-wrap items-center justify-between gap-2` so it wraps cleanly on narrow widths instead of getting clipped.
5. Keep the controls hidden on the Structures tab (existing behavior — Structures tab has no export); show a small inline note instead so the toolbar height doesn't jump.
6. Keep all other behavior unchanged: dialog width (`max-w-[95vw]`), table min-width formula, scroll wrappers, footer, PDF/Excel/CSV logic.

### Out of scope

- PDF generation logic (already rewritten with `jspdf-autotable`).
- Adding export for the Structures tab.
- Restyling the table itself.


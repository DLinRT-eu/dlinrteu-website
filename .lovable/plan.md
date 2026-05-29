## Issues

1. **Duplicate title**: `TaskTaxonomy` already renders its own `<h2>Tasks Across the Patient Workflow</h2>` (via `getTaxonomyTitle()`), but `Index.tsx` also wraps it with another `<h2>` of the same text plus a subtitle — the heading appears twice on the homepage.
2. **Dark-mode gaps**:
   - `Index.tsx` root uses `bg-white` and the mailing-list block uses a hardcoded `from-white to-slate-50` gradient plus `bg-white` card — the global `.dark` overrides handle some of this, but not the gradient, leaving a bright band in dark mode.
   - `TaskTaxonomy.tsx` outer card (`bg-white border-gray-100`) and inner title (`text-gray-800`) need semantic tokens.
   - Category cards keep their pastel `bg-blue-100`/`bg-yellow-100`/… backgrounds (intentional, that's the color coding), but the Button's text and the `<p>` description currently inherit foreground color, which becomes near-white in dark mode and disappears on the pastel surface. Need to pin text to a dark slate within the card so it stays readable on any pastel.

## Fix

### `src/pages/Index.tsx`
- Remove the wrapping `<div className="text-center mb-8">` heading + subtitle around `TaskTaxonomy` (component owns the title). Keep the `{taskCounts.length > 0 && …}` guard.
- Swap the root `bg-white` for `bg-background`.
- Mailing-list block: replace `bg-gradient-to-b from-white to-slate-50` with `bg-muted/30`, the inner card `bg-white border-slate-200/80` with `bg-card border-border`, headings `text-slate-900` with `text-foreground`, body `text-slate-600` with `text-muted-foreground`. Keep layout, shadow, and copy unchanged.
- "Built for clinicians…" line: replace `text-slate-600` with `text-muted-foreground` and the inline link's `text-sky-600 hover:text-sky-700` with `text-primary hover:text-primary/80` (already brand blue via theme tokens in dark mode).

### `src/components/TaskTaxonomy.tsx`
- Outer container: `bg-white` → `bg-card`, `border-gray-100` → `border-border`, title `text-gray-800` → `text-foreground`.
- `renderCategoryCard`:
  - Add `text-slate-900` to the Button className so the label stays dark on its pastel background in both modes.
  - Badge: keep `bg-white` but add `text-slate-900` so the count number stays readable in dark mode.
  - Description `<p>`: change `text-gray-600` to `text-slate-700` (legible on light pastels regardless of theme).
- Footer paragraph: `text-muted-foreground` is already fine — no change.

### Out of scope
- No change to icons, colors, ordering, click behavior, or any other page/section.
- No change to the header, hero, stats row, or feature cards.

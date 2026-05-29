## Problem

On the homepage (`OrbitHero`), the "Try:" suggestion chips and the category tag rail link to `/products?task=<label>`. The Products page applies that param as a `tasks` filter, but it only matches when the value exactly equals a real product category (as returned by `getAllOptions('category')`). The current labels use casing/wording that no product actually has, so several chips return empty results:

- `Auto-contouring` → real value is `Auto-Contouring`
- `Treatment planning` → `Treatment Planning`
- `Image synthesis` → `Image Synthesis`
- `MRI synthesis` → not a category at all (should be `Image Synthesis`)
- `Dose prediction` → not a category (closest real one is `Clinical Prediction`)
- `QA monitoring` → real value is `Performance Monitor`
- `Reconstruction` ✓ already correct

## Fix

Edit only `src/components/homepage/OrbitHero.tsx`:

1. Update `CATEGORY_TAGS` to use the exact category strings already produced by `getAllOptions('category')`:
   ```ts
   const CATEGORY_TAGS = [
     "Auto-Contouring",
     "Treatment Planning",
     "Image Synthesis",
     "Reconstruction",
     "Performance Monitor",
   ];
   ```

2. Update `QUICK_SUGGESTIONS` similarly, keeping the same intent but mapping to real categories:
   ```ts
   const QUICK_SUGGESTIONS = [
     "Auto-Contouring",
     "Image Synthesis",
     "Clinical Prediction",
     "Performance Monitor",
   ];
   ```

3. Keep visible chip labels identical to the category names (no separate display/value mapping needed) so behavior stays transparent and the Products page's existing URL-param handler activates the matching filter.

No other files change. The Products page's existing `task` URL-param handling and `FilterBar`/`useFilters` logic are already correct and reused as-is.

## Out of scope

- No changes to filter logic, routing, or styling.
- No changes to the orbit visualization, dark mode, or any other section.

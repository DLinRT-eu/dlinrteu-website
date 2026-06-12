## Goal

Promote the existing "Verified by Company" certification badge in `ProductHeaderInfo.tsx` from a small inline pill (currently sitting next to the Revised date) into a clearly visible, hard-to-miss badge on certified products. No new data, no new tables — the certification source (`company_product_verifications`) and outdated-detection logic stay exactly as today.

## Scope

One file: `src/components/product/ProductHeaderInfo.tsx`.

## Changes

1. **Lift the "valid" certification badge out of the inline badge row** and render it as a dedicated, larger element directly under the product description (above the Revised/badge row). Style:
   - Pill with `bg-success/10` background, `border border-success`, `text-success-foreground`, padding `px-3 py-1.5`, rounded-full.
   - `BadgeCheck` icon at `h-4 w-4` (larger than current `h-3 w-3`).
   - Label: **"Verified by Company"** in `text-sm font-semibold`, plus a smaller secondary line "Certified YYYY-MM-DD" in `text-xs`.
   - Keep the existing tooltip with notes.
2. **Keep the "outdated" badge** inline in its current row (it's a warning, not something to elevate). Unchanged behavior.
3. **No changes** to:
   - Verification fetch logic / hash comparison
   - Outdated detection
   - Edit mode behavior
   - Other badges (Revised, etc.)

## Out of scope

- Product cards/grid (`Products.tsx`, grid components) — request says "in the product information", interpreted as the product details page header.
- New DB columns, edge functions, or RLS changes.
- Restyling unrelated badges.

If you want the badge to also appear on product cards in the catalogue grid, say so and I'll add it as a follow-up.

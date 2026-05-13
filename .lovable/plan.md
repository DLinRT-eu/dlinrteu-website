## Problem

On the Dashboard, the Anatomy "Head & Neck" entry shows two bugs:

1. **Label shows `Head &amp; Neck`** in the pie chart segment label, legend, tooltip, and the "filtered by location" header. The `&` is double-escaped.
2. **Selecting "Head & Neck" empties every other chart** (Tasks, Modality, Company, Certification, Evidence/Impact). All counts drop to zero.

## Root cause

### Bug 1 — `&` rendered as `&amp;`
`src/utils/chartDataValidation.ts` runs every chart label through `sanitize-html` with `allowedTags: []`. That library HTML-encodes special characters in text nodes, so `"Head & Neck"` becomes the literal string `"Head &amp; Neck"`. Recharts then renders that string as plain text in SVG, so the user sees `Head &amp; Neck`. The same encoding leaks into `validateFilterValue`, so the selected-location string used downstream also becomes `"Head &amp; Neck"`.

### Bug 2 — empty downstream charts when filtering by "Head & Neck"
The pie aggregates products by merging `Head` and `Neck` anatomy entries into a synthetic bucket called `Head & Neck` (see `src/utils/filterOptions.ts` and `src/utils/productFilters.ts`). However, `src/utils/productFiltering.ts#filterProducts` does a literal `anatomyList.includes(selectedLocation)`. No product has `Head & Neck` in its anatomy array — they have `Head` and/or `Neck` — so the filter returns an empty product set and every other chart receives no data.

## Fix

Scope: presentation/data-transformation only. No product data, no schema, no API changes.

### 1. Stop HTML-encoding plain text labels
File: `src/utils/chartDataValidation.ts`

- Replace the `sanitize-html` call inside `sanitizeString` with a lightweight sanitizer that strips angle brackets and control characters but does not entity-encode `&`, `'`, `"`. Something like:

  ```ts
  const sanitized = input
    .replace(/[<>]/g, '')         // drop tag delimiters
    .replace(/[\u0000-\u001F\u007F]/g, '') // drop control chars
    .trim();
  ```

  This still blocks tag injection (Recharts renders chart labels as SVG text nodes, so removing `<`/`>` is sufficient — there is no HTML parsing path here). Length cap and `+ '...'` truncation behavior stay unchanged.
- Remove the now-unused `sanitize-html` import in this file. Leave the dependency in place (other files may use it).

### 2. Make "Head & Neck" filter match `Head` or `Neck` products
File: `src/utils/productFiltering.ts`

- In `filterProducts`, special-case the merged bucket: when `selectedLocation === 'Head & Neck'`, match products whose `anatomicalLocation`/`anatomy` contains `Head` **or** `Neck` **or** `Head & Neck`. Keep the existing `includes` path for every other location.

  ```ts
  if (selectedLocation !== "all") {
    const anatomyList = product.anatomicalLocation || product.anatomy || [];
    const matches =
      selectedLocation === 'Head & Neck'
        ? anatomyList.some(a => a === 'Head' || a === 'Neck' || a === 'Head & Neck')
        : anatomyList.includes(selectedLocation);
    if (!matches) return false;
  }
  ```

- Apply the same adjustment in `filterProductsByLocation` for consistency with other call sites.

## Verification

- Reload `/dashboard`.
- Confirm the pie label, legend, and tooltip read `Head & Neck` (no `&amp;`).
- Click the `Head & Neck` slice; confirm the Tasks, Modality, Company, Certification, and Evidence/Impact charts populate with the head-and-neck subset instead of going to zero.
- Click another anatomy (e.g. `Brain`) to confirm no regression.
- Spot-check the Auto-Contouring structures charts when the Auto-Contouring task is also selected.

## Out of scope

- Renaming `Head & Neck` to a hyphenated form, or changing how products tag anatomy.
- Changes to the 3D Evidence/Impact matrix or the methodology bibliography.
- Any backend / RLS / migration work.

# Accuray Trademark + Synchrony® on CyberKnife® Update

## 1. Expand Synchrony® product entry

File: `src/data/products/tracking/accuray.ts`

- Rename `name` to `Synchrony®`.
- Update `description` to explicitly cover both delivery platforms: clarify that Synchrony® has been available on the CyberKnife® System for nearly 25 years and is also available on the Radixact® Treatment Delivery System.
- Add CyberKnife®-era context to `keyFeatures` (e.g. ~25-year clinical history on CyberKnife®; real-time respiratory/fiducial/lung tracking modes; spine tracking).
- Add CyberKnife®-relevant integration entries to `technology.integration` (already present) and extend `market.onMarketSince` note to mention CyberKnife® availability since ~2001.
- Extend `regulatory.intendedUseStatement` with a second sentence covering Synchrony® on CyberKnife® System (FDA cleared under prior CyberKnife® clearances).
- Add 1–2 CyberKnife®-specific publications to `evidence[]` (well-known motion tracking literature) and update `evidenceRigorNotes` / `clinicalEvidence` accordingly.
- Bump `lastRevised` to today.

## 2. Apply ® to Accuray marks across the site

Targets: `Accuray`, `Synchrony`, `Radixact`, `CyberKnife` → `Accuray®`, `Synchrony®`, `Radixact®`, `CyberKnife®`.

Scope (text/data only, no logic changes):
- `src/data/products/**` — any file mentioning these names (descriptions, features, evidence notes, integration arrays, regulatory notes).
- `src/data/companies/**` — Accuray company entry description.
- `src/data/news/**` and `src/data/changelog.ts` — references in news/changelog bodies.
- `src/pages/**` and `src/components/**` — only hard-coded copy strings mentioning these names (none expected in business logic; identifiers like `accuray-synchrony` and CSS classes are left untouched).

Exclusions (do NOT modify):
- Product/company `id` fields, file paths, URLs, image alt text used for asset lookups, GitHub URLs, regulatory `clearanceNumber`, FDA product codes.
- `logoUrl`, `website`, `productUrl`, `companyUrl` strings.
- Variable names, exported constants (e.g. `ACCURAY_PRODUCTS`), imports.
- Source citation strings inside `regulatory.intendedUseStatement` where the exact FDA wording is quoted — keep the verbatim FDA quote unchanged, only adjust surrounding DLinRT prose.

## 3. Discovery method

Run a ripgrep for each of the four brand names across `src/` and methodically update only user-visible string literals. Skip occurrences already followed by `®`.

## 4. Verification

- `bunx tsc --noEmit` passes.
- Spot-check Synchrony® product page and Accuray company page in preview to confirm ® renders correctly.
- Confirm catalogue total still shows 80 products and Synchrony® card displays the expanded description.

## Technical notes

- ® character (U+00AE) used directly (no HTML entity) — consistent with existing UTF-8 source files.
- No schema, route, filter, or counting logic changes. Pure content/data edit per the Minimal Intervention rule.

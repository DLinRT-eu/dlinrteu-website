# MVision AI: consistency check against our standard fields

I compared all four live MVision entries (Contour+, Dose+, Workspace+, Verify) plus the emptied Image+/Adapt+ files against the standard field set, the allowed tag lists and our field conventions. Findings below, grouped by severity.

## Errors (break validation or contradict our own data)

1. **Verify uses values that are not on the allowed lists**
   - `certification: "MDR Exempt"` — the accepted spelling is `MDR exempt`, so the product currently fails certification validation and may filter incorrectly.
   - `modality: ["RT Struct"]` — not an allowed modality; the tool consumes CT/MR-derived structure sets.
   - `anatomicalLocation: ["Multiple"]` — not an allowed anatomy tag.
2. **Workspace+ uses anatomy tags that are not on the list**: `Prostate` and `Multiple Sites` are not allowed values (`Pelvis` / `Male Pelvis` are).
3. **Dose+ FDA status is written in a non-standard form**: `"510(k) Cleared"` instead of the `510k_cleared` value used by 75 other entries (Contour+ included). Nine entries site-wide use the old form; I will fix the MVision one here and flag the rest.
4. **Duplicate, orphaned Workspace+ file**: `src/data/products/platform/mvision-ai.ts` holds a second, diverging copy of the same product id (`mvision-ai-workspace-plus`). Nothing imports it, so it silently drifts from the live `platform/mvision.ts`. Remove it.

## Warnings (internal contradictions)

5. **Contour+ score notes contradict the stored scores**: the record is E2 / I2, but `clinicalImpactNotes` says the literature "support I3" and `adoptionReadinessNotes` says "Derived from E3". Rewrite both notes to match E2 / I2 / R4.
6. **Workspace+ score note contradicts its score**: stored E1, but `evidenceRigorNotes` ends "E0 stands". Reword to state the E1 basis (CE Class IIa, no product-naming publication).
7. **Contour+ evidence list and keyPapers disagree**: Miura 2025 (`10.5603/rpor.104144`) is scored in `keyPapers` but absent from `evidence`. Add it.
8. **Contour+ carries a citation we already flagged as unverifiable**: the Ng et al. systematic review whose DOI resolves to an unrelated article. Under our no-hallucinated-source rule it should be removed from `evidence` (it is not in `keyPapers`, so no score changes).
9. **Verify has a workflow trigger that does not match the product**: `triggerForAnalysis: "Automatic after treatment delivery"` for a contour comparison tool; should be triggered on structure-set availability / manual review.

## Info (completeness against the standard field set)

10. **Contour+ is missing `features` and `limitations`** (it has `keyFeatures` only). Add a `features` list and honest limitations (review required before clinical use, structure availability varies by model, no prospective evidence).
11. **Verify is missing `limitations`** and its `version` 2.1 / `releaseDate` 2023-08-15 carry no source; I will mark them as vendor-page-derived or drop them if unverifiable.
12. **`companyUrl` is inconsistent** across entries (`https://mvision.ai/` vs `https://www.mvision.ai/`) and the company record uses `https://www.mvision.ai`. Standardise on one.
13. **Stale revision dates**: Dose+ and Workspace+ still read 2026-06-13 / 2026-08-25 while Contour+ was refreshed 2026-09-05. Since this pass touches all four, set `lastUpdated`/`lastRevised` to the date of the change and record what was checked in `source`.
14. **Image+ and Adapt+ have no standalone entries** (their files are empty; they exist only as `integratedModules` on Workspace+), yet the company record lists Image Synthesis and Registration as secondary tasks. That is defensible, but the two module links in `integratedModules` point at vendor pages while Contour+ and Dose+ point at our own pages — I will note this in the entry rather than invent product pages.

## What I will not change

No evidence scores (E/I/R) move, no new clinical claims, no new structures. Item 8 removes an unverifiable citation only.

## Technical notes

Files touched: `src/data/products/auto-contouring/mvision.ts`, `treatment-planning/mvision.ts`, `platform/mvision.ts`, `performance-monitor/mvision.ts`, delete `platform/mvision-ai.ts`, and `src/data/companies/auto-contouring.ts` for the URL alignment. Verification: `npm run validate:evidence`, `npx tsgo --noEmit -p tsconfig.app.json`, regenerate the sitemap, and open the four product pages in the preview.

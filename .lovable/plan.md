
## Goal

Now that ESTRO 2026 is over, sweep vendor announcements against our inclusion criteria (AI/DL component for radiotherapy, with disclosed model / training data / intended use) and update the catalogue. Fix the United Imaging structure-list rendering so missing data is labelled, not blank.

## Inclusion-criteria sweep — what qualifies vs. doesn't

Cross-checked against the ESTRO 2026 news roundup (`src/data/news/estro-2026-announcements.ts`) and vendor public material.

**Qualifies — add now:**

1. **United Imaging — uCT 610 Sim Deep Learning Full-FOV reconstruction** (Reconstruction, **pipeline**). Vendor explicitly discloses a DL reconstruction component on the 87 cm wide-bore CT simulator; labelled "under development; not for sale or clinical use." Goes into `src/data/products/pipeline/` (Tier-2 pre-market), not the main reconstruction list. E0 / I0 / R0 (pre-market).

2. **RaySearch — RayStation DLS Female Pelvis model** as an **investigational structure addition** to the existing `raysearch-raystation` entry (no new product file). Vendor announced it for the next RayStation release, explicitly "investigational, not CE-marked or FDA-cleared." Add the disclosed Female Pelvis ROIs to `supportedStructures` with the `(investigational)` suffix per our nomenclature standard, plus a short note in `evidenceRigorNotes` / `clinicalEvidence` referencing the ESTRO 2026 announcement. Do **not** bump E/I/R scores.

**Does not qualify — log only, no catalogue entry:**

- GE HealthCare *iRT MR Direct* — bundled workflow over already-tracked components (iRT, MR Contour DL, Spectronic MRI Planner). Refresh ESTRO 2026 reference on those entries only (already done in prior pass — verify, no new product).
- GE *iRT for Theranostics* — already in pipeline hub (verify present).
- TheraPanacea — 16 ESTRO abstracts, no new products; evidence refresh deferred until DOIs land.
- Accuray *Stellar / PreciseART / Adapt LTE / Cenos / ClearRT / Helix / Radixact* — no isolated AI/DL component disclosed; remain watchlisted in the news entry, not catalogued. **Synchrony** already refreshed.
- United Imaging *uRT-linac 506c, uLinac HalosTx, uMR Omega, uMI Panorama* — hardware platforms, no isolated AI/DL component for radiotherapy. Excluded per inclusion criteria.

**Re-examine the two United Imaging entries added earlier this session** (`uRT Auto-Contouring`, `uRT Auto-Planning`): the ESTRO news entry concluded United Imaging had **not** yet published model/training-data/intended-use documentation for these, which is borderline against our inclusion criteria. Plan: keep them (the vendor press release does describe them as AI components of the CE-marked uRT-linac 506c, which clears the minimum bar) but tighten the `limitations` and `evidenceRigorNotes` to explicitly state that no model card, training-data description or independent intended-use document has been published, and link them as integrated components of the system rather than standalone products.

## United Imaging structure-list handling

`SupportedStructures.tsx` currently renders `null` when `supportedStructures` is empty/undefined, so the uRT Auto-Contouring page shows nothing where the structures card would be. Change:

- Update `src/components/product/SupportedStructures.tsx` so that for `Auto-Contouring` products with no published structure list, instead of returning `null`, render a small fallback card titled **"Supported Structures"** with body text: *"The vendor has not published a verified list of supported structures for this product. The structure list is therefore unavailable in the catalogue."* (plus a short note that contours still require clinician review).
- To pass the signal without a breaking schema change, add an optional `structuresUnavailable?: boolean` field to `ProductDetails` (in `src/types/productDetails.d.ts`) and pass it down from `ProductDetails.tsx` into `SupportedStructures`. Set `structuresUnavailable: true` on `united-urt-auto-contouring`. Leave other products unchanged (default behaviour remains `null`).
- Do **not** invent or guess structure names for United Imaging.

## Files to touch

Create:
- `src/data/products/pipeline/united-imaging-uct610-sim.ts` (or extend existing pipeline file if one exists for UI) and register in `src/data/products/pipeline/index.ts`.

Edit:
- `src/data/products/auto-contouring/raysearch.ts` — append Female Pelvis ROIs with `(investigational)` suffix under a clearly labelled model/region group, refresh `evidenceRigorNotes` and `lastRevised`.
- `src/data/products/auto-contouring/united-imaging.ts` — add `structuresUnavailable: true`, tighten `limitations` / `evidenceRigorNotes`.
- `src/data/products/treatment-planning/united-imaging.ts` — tighten `limitations` / `evidenceRigorNotes` (no structure list applies here).
- `src/types/productDetails.d.ts` (or `.ts`) — add optional `structuresUnavailable?: boolean`.
- `src/components/product/SupportedStructures.tsx` — render the "unavailable" fallback card when category is Auto-Contouring and the flag is set or array is empty for that product.
- `src/components/ProductDetails.tsx` — forward the `structuresUnavailable` prop / pass full product context.

Docs:
- Append a short bullet to `src/data/news/estro-2026-announcements.ts` noting the catalogue updates (uCT 610 Sim pipeline entry, RaySearch Female Pelvis investigational ROIs) so the news article stays the source of truth for what changed.

## Out of scope

- No design-system changes, no new pages, no backend / RLS changes.
- No score recalibration for existing products beyond the United Imaging note tightening.
- No new vendors beyond those already covered in the ESTRO news roundup.
- No structure-name invention for any United Imaging product.

# Evidence completeness check — Image+ and Adapt+

Both newly split MVision entries currently carry a single evidence item (the Workspace+ CE press release), no `keyPapers`, and E0 / I0 / R2. The question is whether that is still correct after a targeted literature check, and what is missing to call the entries complete.

## What the literature check found

**Image+ (synthetic CT)**
- A vendor-independent academic validation exists: *"Magnetic Resonance Only Planning Validation Using Synthetic CT by MVision"*, Virginia Commonwealth University, 2026 (VCU Scholars Compass, etd/8304). It names MVision synthetic CT explicitly. It is a university thesis, i.e. grey literature, not peer-reviewed.
- The vendor page states the module "supports multiple evaluated models" and there is a vendor blog post on synthetic CT imaging (May 2026). Both are vendor material.
- One paper that looks relevant is not: the 2025 Leeds brain MRI-only sCT validation study evaluates Philips MRCAT Brain, not MVision. It must not be attached to Image+.
- No peer-reviewed publication naming the Image+ module was found.

**Adapt+ (registration / contour propagation)**
- No peer-reviewed publication, no conference abstract, and no independent evaluation naming Adapt+ was found. Only vendor and distributor listings, which claim "clinically evaluated image registration" without a citation.

## Consequence for the scores

Per the rubric, E1 requires peer-reviewed evidence; a thesis does not qualify, and conference abstracts stay unscored unless a full publication exists.

- **Image+**: stays **E0**, but E0 is currently justified as "no publication located", which is no longer the full picture — the thesis should be recorded as disclosed, vendor-independent evidence and named in the rigor note. Clinical impact stays **I0** (no outcome data). Readiness stays **R2**.
- **Adapt+**: **E0 / I0 / R2** confirmed unchanged; the note is accurate as written.

## Changes to make

`src/data/products/image-synthesis/mvision.ts`
1. Add the VCU thesis to `evidence[]` with type `Academic Thesis`, the exact title, year, institution and the Scholars Compass URL.
2. Add the vendor Image+ product page and the synthetic CT blog post as vendor-material evidence entries, so the descriptive claims (brain T1, pelvis T2, CBCT→sCT, VNC) trace to a disclosed source.
3. Extend `evidenceRigorNotes`: E0 retained because the only independent validation is a non-peer-reviewed thesis; state explicitly that the Leeds MRCAT Brain paper was screened and excluded as a different vendor's product.
4. Set `evidenceVendorIndependent` handling: leave the boolean `false` (it flags peer-reviewed independent evidence) and say so in the note, to avoid implying a published independent study.
5. Add a `limitations` line that the only third-party evaluation identified is grey literature.
6. Refresh `lastUpdated` and append a retrieval date to `source`. Leave `lastRevised` and any company revision date untouched.

`src/data/products/registration/mvision.ts`
7. Add the vendor Adapt+ product page as a disclosed source for the feature/description claims.
8. Extend `evidenceRigorNotes` with the search performed and its date, so the E0 is documented as a checked negative rather than an unchecked gap.
9. Refresh `lastUpdated` and `source` retrieval date only.

`src/data/products/platform/mvision.ts`
10. Align the `categoryEvidence["Image Synthesis"]` note with the thesis finding so the platform entry and the standalone entry do not disagree.

## keyPapers

`keyPapers` stays empty for both, because no peer-reviewed publication exists to score per paper. The evidence validator will keep emitting its "no key papers" warning for these two entries; that is the correct state, not a defect. If you prefer, the thesis can instead be recorded as an unscored `keyPapers` entry — say which you want.

## Verification

- `npx tsgo --noEmit -p tsconfig.app.json`
- `npm run validate:evidence` (expect only the existing no-key-paper warnings)
- Load `/product/mvision-image-plus` and `/product/mvision-adapt-plus` and confirm the evidence blocks render.

## Open GitHub issues (5 total, all on `DLinRT-eu/dlinrteu-website`)

All five are reviewer-submitted notes from the product-review workflow. Three are quick data/UX fixes; two are larger and best handled by deferring to the company representative or to a follow-up architectural change.

### Issue #55 — Pipeline products trigger Version/Release Date warnings
**Problem:** Therapanacea pipeline products (BrachyBox, TumorBox, SmartPlan) have `developmentStage: "pipeline"` and `certification: "Pipeline"` but the field validator (`src/utils/fieldValidationHelper.ts` lines 54-67) still flags missing `version` and `releaseDate` as high-severity failures. Reviewer asks for a "Release Pending" suppression.

**Fix:** In `fieldValidationHelper.ts`, make the `Version` and `Release Date` checks pass when the product is a pipeline entry — detected via `developmentStage === 'pipeline'` or `certification === 'Pipeline'`. Update the failure copy slightly so non-pipeline products still see the same "required field" message. No schema change needed.

### Issue #57 — Add Ethos AI Segmentation structures from Robar et al. 2025
**Problem:** `varian-ethos.ts` currently has `structuresUnavailable: true` and no `supportedStructures`. Reviewer points to Figure 1 of https://doi.org/10.1002/acm2.70067 which enumerates the structures Ethos AI Segmentation produces.

**Fix:** Pull the structure list from that paper (open-access JACMP article — I will fetch and parse the figure/table), then populate `supportedStructures` on `varian-ethos.ts` using the standard `"Region: Structure_Name"` convention (per the DICOM nomenclature memory). Remove `structuresUnavailable: true`. Add the publication to the `evidence` array and update `lastRevised`.

### Issue #53 — Mediq RT additional Elective Lymph Node levels
**Problem:** Reviewer notes Synaptiq Mediq RT supports many extra Elective Lymph Node (ELN) structures across Breast and Head & Neck regions, but transcribing them is tedious.

**Fix:** Add the standard CTVn ELN level structures used in radiation oncology (e.g. `Breast: CTVn_L1`, `CTVn_L2`, `CTVn_L3`, `CTVn_L4`, `CTVn_IMN`; `Head & Neck: CTVn_Ia/Ib/II/III/IV/V/VI/VIIa/VIIb` per the standard nodal level taxonomy) marked with the `(unverified)` suffix per the structure-status convention. This signals UI alerts so they can be promoted to verified once the company representative confirms.

### Issue #54 — TumorBox needs Therapanacea self-review
**Problem:** Public information is limited and overlaps with Annotate / MR-Box modules. Reviewer recommends asking the company to clarify.

**Action (no code change in this round):** Use the existing company-rep invitation workflow to onboard a Therapanacea representative and assign TumorBox to them. I will document this in the issue by closing it with a comment pointing to the company-rep invite path. Listed here so it isn't lost — happy to defer if you'd rather keep it open until the rep accepts.

### Issue #56 — Separating evidence per component for integrated systems (Ethos)
**Problem:** Architectural — Ethos bundles segmentation + treatment planning + delivery. The current `evidence[]` is a flat list on one product entry; reviewer wants evidence attributable to specific components.

**Action (no code change in this round):** This needs a data-model discussion (per-evidence `appliesTo` tag, or splitting integrated systems into linked sub-products). Out of scope for this batch — I'll flag it on the issue for a dedicated planning round. Confirm if you want me to spec it now instead.

## Summary of changes this round

- `src/utils/fieldValidationHelper.ts` — exempt pipeline products from Version/Release Date hard requirement (issue #55).
- `src/data/products/auto-contouring/varian-ethos.ts` — populate `supportedStructures`, remove `structuresUnavailable`, add evidence entry, bump `lastRevised` (issue #57).
- `src/data/products/auto-contouring/synaptiq.ts` — append ELN structures with `(unverified)` suffix (issue #53).
- Comments on issues #54 and #56 explaining the path forward; no code change.

## Out of scope

- Architectural refactor for per-component evidence on integrated systems (#56).
- Actually inviting the Therapanacea rep (#54) — that's an admin action via the new invite dialog.

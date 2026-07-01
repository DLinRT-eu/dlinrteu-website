## Source verification

Fetched https://www.raysearchlabs.com/raystation-v2026/ (2026-07-01). Confirmed:
- **Machine learning innovations**: >30 new DLS structures (bowel, female pelvic anatomies, prostate bed, bronchial tree, pediatric support, etc.); 3 new DL planning models (breast locoregional, lung proton, prostate).
- Vendor note: *"Subject to regulatory clearance in some markets. RayStation v2026 is not available for use or sale in the USA or Canada."* — so CE/FDA status of these new models is not confirmed by this page and no new K-number is announced.
- No new peer-reviewed evidence linked from the release page.

## Planned changes (data only, minimal intervention)

### 1. `src/data/products/auto-contouring/raysearch.ts` (DLS)
- Bump `version` → `2026`, `releaseDate` → `2025-11` placeholder replaced by "RayStation v2026" note (keep 2023-12 for regulatory-cleared baseline; add v2026 to notes).
- Update `lastUpdated` / `lastRevised` → `2026-07-01`.
- Extend `evidenceRigorNotes` with a v2026 line: ">30 new DLS structures added in RayStation v2026 (bowel, female pelvic anatomies incl. previously-investigational uterus/ovaries/vagina, prostate bed, bronchial tree, pediatric support). Vendor states v2026 is subject to local regulatory clearance and not available in USA/Canada; new structures therefore listed as (unverified) pending confirmation of CE/FDA scope."
- Append new structure entries to `RAYSTATION_SUPPORTED_STRUCTURES` in `raysearch-structures.ts` with the `(unverified)` suffix (per structure-status memory), covering the vendor-named additions only:
  - Pelvis Female: Uterus, Ovary_L, Ovary_R, Vagina — **remove the `(investigational)` suffix** since v2026 has now released them (still `(unverified)` regulatory-wise).
  - Pelvis Male: Prostate_Bed
  - Abdomen: Bowel_Small, Bowel_Large (bowel structures)
  - Thorax: Bronchial_Tree
  - Pediatric: general "Pediatric support" flag added only in evidenceRigorNotes (no specific structure names disclosed by vendor — do not fabricate).
- Add a new `evidence` entry citing the RaySearch v2026 release page.
- Add `source` reference to the v2026 page.

### 2. `src/data/products/treatment-planning/raysearch-planning.ts` (DL Dose Prediction)
- Bump `version` → `2026`, `lastUpdated`/`lastRevised` → `2026-07-01`.
- Append 3 new models to `dosePredictionModels` (names inferred generically; keep neutral since exact catalogue names for v2026 aren't public yet — mark with `(v2026)` suffix to signal preliminary):
  - `RSL Breast Locoregional (v2026)` — Breast, Photons (Locoregional), Curative
  - `RSL Lung Proton (v2026)` — Lung, Protons (PBS), Curative
  - `RSL Prostate (v2026)` — Prostate, Photons, Curative
- Update `evidenceRigorNotes` to mention v2026 additions and vendor's regulatory caveat.
- Add v2026 release page to `evidence` list and `source`.
- Add to `limitations`: "v2026 models subject to regulatory clearance in some markets; not available in USA/Canada per vendor."

### 3. No changes to evidence axes (E2/I2) or company records
- Release page provides marketing info only — no new peer-reviewed studies. E/I/R levels unchanged.

## What I will NOT do
- Not fabricate specific pediatric structure names or exact catalogue model IDs beyond what the release page states.
- Not upgrade evidence rigor without a peer-reviewed source.
- Not change regulatory certification fields (still CE & FDA per K240398 for prior versions).

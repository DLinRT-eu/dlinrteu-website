Update `src/data/products/auto-contouring/raysearch.ts` (RayStation Deep Learning Segmentation) using the vendor DLS Model Catalogue (raysearchlabs.com/globalassets/digizuite/1882-en-deep-learning-segmentation-models-catalogue.pdf) as the source.

## Changes

### 1. Add MRI input support
The catalogue documents a dedicated **Male Pelvic MR** model (Anorectum, Bladder, Canal_Anal, PenileBulb, Prostate, Rectum, SeminalVes) intended for **T2 SE** sequences.

- `technicalSpecifications.input`: `["CT", "MRI"]`
- `technicalSpecifications.inputFormat`: keep `["DICOM"]` (already covers MR DICOM)
- `modality`: `["CT", "MR"]`
- `anatomicalLocation`: add `"Male Pelvis (MR)"` (leave existing entries)
- Append a note in `evidenceRigorNotes` clarifying the MR model is limited to male pelvis on T2 SE sequences.

### 2. Add `guidelines[]` field
The catalogue includes an explicit "Contouring Guidelines" section mapping each ROI to peer-reviewed consensus references. Add the recurring published guidelines as `guidelines` entries with `compliance: 'partial'` (per catalogue footnote: "Internal contouring protocols were derived from published consensus guidelines, the model data sheet describes some modifications and specifications to certain ROIs"):

- Brouwer et al. 2015 — H&N OAR CT consensus (DAHANCA/EORTC/GORTEC/…)
- Eekers et al. 2018 — Neuro-oncology OAR (EPTN)
- Scoccianti et al. 2015 — Brain OAR consensus
- Christianen et al. 2011 — H&N swallowing structures
- Van de Water et al. 2009 — Submandibular gland
- Kong et al. 2011 — Thoracic OAR (RTOG)
- Feng et al. 2011 — Heart atlas
- Duane et al. 2017 — Cardiac substructures
- Vaugier et al. 2021 — Cardiac substructures/great vessels
- Mir et al. 2020 — Global atlas / RTOG
- Offersen et al. 2015 — ESTRO breast CTV/OAR
- Nyholm et al. 2013 — MRI-only prostate (Anorectum)
- Gay et al. 2012 — Pelvic normal tissue (RTOG)
- Salembier et al. 2018 — ACROP anal cancer (MR pelvis)
- Hall et al. 2008 — Brachial plexus (RTOG)
- Freedman et al. 2020 — Lacrimal gland

Each entry: `{ name, reference, url (DOI when known), compliance: 'partial' }`.

### 3. Bump revision metadata
- `lastRevised`: `2026-07-02`
- Add DLS Model Catalogue URL to `source` (if not already listed).
- Append short line to `evidenceRigorNotes`: "Vendor DLS Model Catalogue maps ROIs to published consensus guidelines (Brouwer, Eekers, Scoccianti, Kong, Feng, Duane, Vaugier, Mir, Offersen, Nyholm, Gay, Salembier, Hall, Christianen, Van de Water, Freedman)."

## Not changed
- DL Dose Prediction (`raysearch-planning.ts`): the catalogue covers DLS only; no comparable public guideline mapping is published for the dose models, so no `guidelines[]` change there. Called out here to confirm the deliberate scope.
- No score changes (E/I/R) — this is source enrichment, not new evidence.
- No structure list changes.

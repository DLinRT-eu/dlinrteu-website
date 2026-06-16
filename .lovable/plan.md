## Scope

Three Therapanacea products: `therapanacea-annotate`, `therapanacea-adaptbox`, `mr-box-synthetic`. Also touch `therapanacea-structures.ts` (new structure arrays) and the related registration/pipeline/AdaptBox SmartFuse/SmartPlan files only if the evidence audit surfaces stale citations.

## 1. Evidence audit (verify + flag, no silent edits)

Run targeted PubMed/DOI lookups (`websearch--web_search` + `fetch_website`) for each product:

- **Annotate** — re-verify DiTusa 2025 (DOI 10.4103/jmp.jmp_11_25) and Lê 2024 (DOI 10.1016/j.phro.2024.100654). Search for any 2025–2026 independent Annotate validations (H&N, breast LN, pelvis, SBRT lung, heart sub-structures). Check that all `guidelines[]` DOIs resolve.
- **MR-Box** — re-verify Frontiers in Oncology 2023 (10.3389/fonc.2023.1245054) and MESCAL 2026 (10.1016/j.radonc.2026.111530). Search for newer brain/pelvis pseudo-CT evaluations.
- **AdaptBox** — re-verify Prunaretty 2026 (10.3390/cancers18111826) and the Frontiers 2026 multi-centre paper. Look for OAR-contouring-on-CBCT studies.
- **TumorBox** (pipeline) — confirm no published evidence yet.
- **SmartFuse, SmartPlan, BrachyBox** (touched in previous turn) — spot-check that no peer-reviewed Therapanacea-named evidence is missing.

Output: a per-product evidence-audit table embedded at the top of the final reply (status, missing/outdated citations, recommended additions, **lastRevised** bump only where new evidence is added). Apply additions only to fields that already exist on each product (`evidence[]`, `evidenceRigorNotes`, `clinicalImpactNotes`, `source`, `lastRevised`).

## 2. AdaptBox — structures + limitations

Per FDA K253091, AdaptBox is cleared for Head & Neck, Breast/Thorax, and Pelvis (male). Currently only Pelvis Male CBCT is itemised.

- In `src/data/products/auto-contouring/therapanacea-structures.ts`, add two new exported arrays:
  - `ADAPTBOX_HEAD_NECK_CBCT` — mirror the H&N OAR core set from `ANNOTATE_HEAD_NECK_CT` (OARs only, no LN levels), prefixed `Head & Neck (CBCT): …`.
  - `ADAPTBOX_BREAST_THORAX_CBCT` — mirror the OAR core set from `ANNOTATE_FEMALE_THORAX_BREAST_CT` (OARs only, no elective LNs), prefixed `Breast/Thorax (CBCT): …`.
  - Add a combined `ADAPTBOX_ALL_STRUCTURES = [...HN, ...BreastThorax, ...PelvisMale]`.
  - Provenance note: items derived from the corresponding Annotate CT model lists per K253091 scope; itemised list not published per CBCT model on the AdaptBox page (mark `disclosureLevel: "partial"` in `structuresProvenance.notes`).
- In `therapanacea-adaptbox.ts`: switch `supportedStructures` to `ADAPTBOX_ALL_STRUCTURES`; update `structuresProvenance.notes` accordingly; bump `lastRevised`.
- Append the Annotate technical-page limitations (adult-only ≥ 18 y; image-quality / DICOM-tag dependencies; ≤ 240 slice / FOV 50 cm constraints; CBCT-specific FOV augmentation caveat; required vendor commissioning) to `limitations[]`. Source the strings verbatim from `https://www.therapanacea.eu/technical-information-2/` (fetched via `code--fetch_website`).

## 3. MR-Box — secondary category + limitations

- In `image-synthesis/therapanacea.ts`:
  - Set `secondaryCategories: ["Auto-Contouring"]`.
  - Ensure `categoryEvidence["Auto-Contouring"]` exists (FDA K234068 lists OAR delineation on pseudo-CT as part of MR-Box; no standalone peer-reviewed module validation → `E0`, `I0`).
  - Append the same Annotate technical-page limitations adapted to MR (T1 brain / T2 pelvis Elekta / TrueFISP 0.35T ViewRay scanner constraints; sequence-specific commissioning; manual sCT review required) to `limitations[]`.
  - Structures are already included via `MRBOX_ALL_STRUCTURES` per model — no change needed there, just confirm the page renders the model grouping (no data edit).
  - Bump `lastRevised`.

## 4. Verification

- `code--exec npm run lint` (build runs automatically).
- Playwright headless visit (one script, three screenshots) of `/product/therapanacea-annotate`, `/product/therapanacea-adaptbox`, `/product/mr-box-synthetic` to confirm structure lists, limitations, and (for MR-Box) the new secondary-category badge render. Screenshots under `/tmp/browser/therapanacea/`.

## Out of scope

- No schema/type changes.
- No UI component changes.
- No edits to other Therapanacea modules unless the evidence audit surfaces a concrete missing citation; in that case, edit is limited to `evidence[]` + `lastRevised` only.
- No GitHub PR automation triggered from this turn.

## Technical notes

- All new structure entries follow the existing `"Region (Modality): TG-263_Name"` convention with `_L` / `_R` splits; no grouped "(L/R)".
- Limitations strings will be quoted with attribution `(Source: Therapanacea technical information, accessed 2026-06-16)` in a single trailing bullet rather than inline per item, to keep the existing limitations style.
- Evidence-audit table is delivered in chat only; product files only carry the resulting `evidence[]` additions.

## Goal

Bring the three Therapanacea auto-contouring entries (Annotate, AdaptBox, MR-Box) in line with the rest of the catalogue's `supportedStructures` syntax, keep the 7 Annotate CT models cleanly labelled, and re-audit the clinical evidence + displayed metadata.

## Problem today

- `Annotate`, `AdaptBox`, `MR-Box` use object form `{ name, type }` with `"Region: Structure Name"` labels. Every other auto-contouring vendor (MVision, Limbus, Manteia, GE, RaySearch, …) uses **plain strings** in the `"<Model>-<Modality>: TG263_Name"` form, kept in a dedicated `<vendor>-structures.ts` file. The Structure Comparison Tool and the Region/Modality chips therefore don't render Therapanacea consistently.
- Annotate's 7 CT models are only delineated by inline `// === …` comments; they aren't structurally identifiable.
- Some bilateral entries still use grouped `"(L/R)"` form, contrary to the v3 naming convention (one row per side).

## Plan

### 1. New file `src/data/products/auto-contouring/therapanacea-structures.ts`

Seven string arrays — one per Annotate CT model — plus combined exports:

- `ANNOTATE_HEAD_NECK_CT` — prefix `"Head & Neck-CT: …"` (OARs + Cervical LN levels)
- `ANNOTATE_FEMALE_THORAX_BREAST_CT` — prefix `"Female Thorax/Breast-CT: …"`
- `ANNOTATE_MALE_THORAX_CT` — prefix `"Male Thorax-CT: …"`
- `ANNOTATE_HEART_SUBSTRUCTURES_CT` — prefix `"Heart Sub-Structures-CT: …"` (Duane 2017 / Lee 2017)
- `ANNOTATE_SBRT_LUNG_CT` — prefix `"Lung SBRT-CT: …"`
- `ANNOTATE_PELVIS_MALE_CT` — prefix `"Pelvis Male-CT: …"`
- `ANNOTATE_PELVIS_FEMALE_CT` — prefix `"Pelvis Female-CT: …"`
- `ANNOTATE_ALL_STRUCTURES` — concat of the seven
- `ADAPTBOX_PELVIS_MALE_CBCT` — prefix `"Pelvis Male-CBCT: …"` (AdaptBox)
- `MRBOX_BRAIN_T1`, `MRBOX_PELVIS_T2_ELEKTA`, `MRBOX_PELVIS_ABDO_TRUEFISP` — prefix `"<Model>-MR: …"` (MR-Box)

Within each array:
- Split bilateral structures into separate `_L` / `_R` entries (drop `(L/R)`).
- Use TG-263-style names where unambiguous (`Eye_L`, `Glnd_Lacrimal_R`, `OpticNrv_L`, `Bone_Mandible`, `SpinalCord`, `LN_Neck_II_L`, …); keep vendor-specific names where TG-263 has no equivalent (e.g. `LN_IMC_L`).
- Tag lymph nodes with the `LN_` TG-263 prefix.

### 2. Refactor `src/data/products/auto-contouring/therapanacea.ts`

- Replace inline `supportedStructures` object array with `supportedStructures: ANNOTATE_ALL_STRUCTURES` import.
- Keep `structuresProvenance`, `guidelines`, everything else.
- Add a short `notes` line to `structuresProvenance` listing the 7 model prefixes so the UI badge documents them.

### 3. Refactor `src/data/products/image-synthesis/therapanacea-adaptbox.ts`

- Convert `supportedStructures` to `ADAPTBOX_PELVIS_MALE_CBCT` strings.
- Keep AdaptBox CBCT-specific limitations and guideline refs.

### 4. Refactor `src/data/products/image-synthesis/therapanacea.ts` (MR-Box)

- Convert the 3 MR model arrays to `MRBOX_BRAIN_T1`, `MRBOX_PELVIS_T2_ELEKTA`, `MRBOX_PELVIS_ABDO_TRUEFISP` strings concatenated.
- Keep `structuresProvenance`, `guidelines`, and `partOf`.

### 5. Clinical evidence audit

Run targeted PubMed / DOI searches (date-boxed, recorded in `lastRevised`) for:
- "Therapanacea Annotate", "ART-Plan", "MR-Box synthetic CT", "AdaptBox CBCT"
- Already-cited: DiTusa 2025 (JMP), Lê 2024 (Phys Imaging Radiat Oncol). Confirm DOIs resolve.
- Search for additional 2024–2026 independent evaluations (e.g. synCT dose accuracy, breast/H&N geometric studies).

For each new qualifying study: add to `evidence[]`, update `evidenceRigorNotes`/`clinicalImpactNotes`, bump `lastRevised`. If none found, record "PubMed re-verified YYYY-MM-DD; no new qualifying studies" in the notes.

### 6. Displayed-information audit

For Annotate / MR-Box / AdaptBox check and correct:
- `regulatory.fda` — clearance numbers (K211539, K234068, K242822, K253091) and dates against the FDA 510(k) DB; align `intendedUseStatement` and `notes`.
- `partOf` — all three point to `ART-Plan+` with consistent `version`/`relationship: "Module"`.
- `companyUrl` / `productUrl` — confirm 200 OK, shorten in UI via existing `shortenUrl` helper (no data change required).
- `lastUpdated` / `lastRevised` / `source` — synchronise to audit date.
- `evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceExternalValidation` flags — re-derive from the studies actually cited.
- Confirm no leftover `(L/R)` grouped entries and no duplicate strings across model groups (duplicates *between* groups are allowed — same OAR can belong to several models — but never within one group).

### 7. Verification

- `npm run lint && npm run build` (auto-run by harness).
- Drive Playwright against `/product/therapanacea-annotate`, `/product/mr-box-synthetic`, `/product/therapanacea-adaptbox` and the Structure Comparison page to screenshot the new layout and confirm the 7 model prefixes appear.

## Out of scope

- Type / schema changes to `ProductDetails.supportedStructures` (the union already accepts `string[]`).
- UI component changes — only data.
- Other Therapanacea modules (SmartFuse, SmartPlan, BrachyBox, TumorBox).

## Files touched

- `src/data/products/auto-contouring/therapanacea-structures.ts` (new)
- `src/data/products/auto-contouring/therapanacea.ts`
- `src/data/products/image-synthesis/therapanacea.ts`
- `src/data/products/image-synthesis/therapanacea-adaptbox.ts`

## Objective
Update the Mediq RT product entry (`src/data/products/auto-contouring/synaptiq.ts`) with the detailed regulatory and clinical information provided by the vendor.

## Changes

### 1. Version
- Change `version` from `"2.0"` to `"1.6"`.

### 2. Intended Use Statement
- Replace the existing short `regulatory.intendedUseStatement` with the full vendor-provided text, verbatim.

### 3. CE Marking
- Update `regulatory.ce.notes` to reflect verified CE clearance effective **2025-06-01** (removing the "pending verification" language).
- Keep `status: "cleared"` and `class: "IIa"`.

### 4. Conditions Targeted
- Update `diseaseTargeted` array with the full list of applicable malignancies: brain tumours, head and neck tumours, thoracic tumours (lung, oesophageal, breast), abdominal tumours (pancreatic, stomach), pelvic tumours (bladder, prostate, cervical, uterine), and metastatic tumours.

### 5. Exclusion Criteria
- Update `limitations` array to include the vendor-declared exclusion criteria: large metal implants / motion artefacts, paediatric patients, poor-quality imaging, and highly individualised contouring cases.
- Retain any factually relevant existing limitations (e.g. "Requires verification by qualified radiation oncologist") after de-duplication.

### 6. Metadata
- Update `lastUpdated` to `"2026-06-10"` to reflect this revision.

## Out of Scope
- The pipeline product (`synaptiq-mediq-rt-4dct-pipeline`) will not be touched.
- No new fields will be added; all data maps to existing `ProductDetails` properties (`diseaseTargeted`, `limitations`, `regulatory.intendedUseStatement`, `regulatory.ce`).
- No UI or backend code changes.
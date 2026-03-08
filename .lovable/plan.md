

# Documentation Consistency Audit

## Issues Found

### 1. FIELD_REFERENCE.md — Major gaps (most critical)

**Evidence system is WRONG**: Lines 100-121 still document the **old 0-6 linear scale** (`evidenceLevel`, `evidenceLevelNotes`). The codebase now uses the **dual-axis system** (`evidenceRigor` E0-E3, `clinicalImpact` I0-I5) with 5 study quality booleans. The review GUIDE.md was updated but FIELD_REFERENCE was not.

**6 new field groups missing entirely**:
- `trainingData` (dataset size, sources, demographics, disclosure level, scanner models)
- `evaluationData` (study design, endpoints, results, sites)
- `safetyCorrectiveActions` (recalls, FSCAs, advisories with authority/identifier)
- `developmentStage` ("certified" | "pipeline" | "research" | "discontinued")
- `priorVersions` / `supersededBy` (version evolution tracking)
- `dosePredictionModels` (treatment planning specific)

**FHIR section outdated**: Doesn't mention TGA/TFDA regulatory identifiers, evidence classification properties, supported structures mapping, or Schema.org JSON-LD.

**TFDA regulatory field missing**: `regulatory.tfda` exists in types but is not documented.

### 2. REVIEWER_GUIDE.md — Wrong evidence table

Lines 367-379 still show the old 0-6 evidence levels (Technical Efficacy, Stand-Alone Performance, etc.). Must be replaced with the dual-axis E0-E3 / I0-I5 tables.

### 3. docs/review/GUIDE.md — Incomplete field requirements

The dual-axis evidence section (lines 238-280) is correct, but the "Field Requirements" section (lines 198-217) is missing the new fields: `trainingData`, `evaluationData`, `safetyCorrectiveActions`, `developmentStage`, `dosePredictionModels`.

### 4. README.md — Missing new features

The "Key Features" list (lines 80-91) doesn't mention:
- Training data transparency reporting
- FSCA/recall tracking
- Schema.org SEO markup
- Expanded FHIR export (TGA/TFDA, evidence, structures)

### 5. DOCUMENTATION_LINKS.md — Incomplete interoperability section

Lines 37-44 only mention FHIR. Should also reference Schema.org JSON-LD and the expanded FHIR coverage.

### 6. MANUFACTURER_TEMPLATES.md — Missing transparency requests

The verification request template doesn't ask manufacturers about training dataset information or known FSCAs/recalls, which are now tracked in the data model.

---

## Planned Changes

### File 1: `docs/FIELD_REFERENCE.md`
- Replace the old Evidence Level Classification section (lines 100-121) with dual-axis E0-E3/I0-I5 tables + study quality booleans
- Add new section: "Training & Evaluation Data Transparency" documenting `trainingData` and `evaluationData`
- Add new section: "Safety Corrective Actions" documenting `safetyCorrectiveActions`
- Add `developmentStage`, `priorVersions`, `supersededBy`, `dosePredictionModels` to appropriate sections
- Add `regulatory.tfda` to Regulatory table
- Update FHIR section to mention TGA/TFDA identifiers, evidence properties, supported structures, and Schema.org
- Update "Last Updated" date

### File 2: `docs/REVIEWER_GUIDE.md`
- Replace evidence level table (lines 367-379) with dual-axis E0-E3/I0-I5 tables
- Add note about training data and FSCA fields to "What to Review" section
- Update "Last Updated" date

### File 3: `docs/review/GUIDE.md`
- Add `trainingData`, `evaluationData`, `safetyCorrectiveActions`, `developmentStage`, `dosePredictionModels` to Field Requirements section
- Update "Last Updated" date

### File 4: `README.md`
- Add to Key Features: training data transparency, FSCA tracking, Schema.org, expanded FHIR/CSV exports

### File 5: `DOCUMENTATION_LINKS.md`
- Add Schema.org JSON-LD and expanded export coverage to Healthcare Interoperability section
- Add "Data Transparency" bullet mentioning training/evaluation datasets and FSCA tracking
- Update "Last Updated" date

### File 6: `MANUFACTURER_TEMPLATES.md`
- Add section 5 to the Initial Verification Request template asking about training dataset details and any known FSCAs/recalls

### Scope
- 6 files updated
- Evidence classification corrected in 2 files (FIELD_REFERENCE, REVIEWER_GUIDE)
- ~8 new field definitions added to FIELD_REFERENCE
- All "Last Updated" timestamps refreshed to March 2026


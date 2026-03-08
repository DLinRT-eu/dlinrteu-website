

# Auto-Contouring Products Audit: Evidence & Structure Lists

## Audit Summary

Reviewed all 27 auto-contouring product entries (across 26 files). Found issues in three categories: evidence classification inconsistencies, structure naming convention violations, and missing/incomplete data.

---

## 1. Evidence Classification Issues

### AI Medical Jazz — Downgrade E2 → E1
Currently rated E2 but notes state "Specific DOIs not found in PubMed search." E2 requires peer-reviewed publications with verifiable DOIs. Evidence references are vague ("Medical Physics Journal 2023", "ESTRO 2022 abstract") with no actual DOI links. Should be E1 (vendor/conference evidence only).

### Carina AI INTContour — Missing evidence classification entirely
No `evidenceRigor`, `clinicalImpact`, or study quality attributes. Based on FDA clearance K212274 but no publications found. Should be **E0/I0** with all study attributes false.

### Coreline Soft Aview RT ACS — Missing evidence classification entirely
No `evidenceRigor`, `clinicalImpact`, or study quality attributes. FDA cleared (K200714) but no independent peer-reviewed publications found. Should be **E0/I0**.

### GE Healthcare Auto Segmentation — Evidence attribute correction
Rated E2 with `evidenceVendorIndependent: false` — this is inconsistent. The FDA validation from 9 sites is vendor-conducted. However, it was included in the Kim et al. 2024 7-system comparison (doi:10.1007/s13246-024-01434-9), which IS independent. Should set `evidenceVendorIndependent: true` and add this reference.

### Manteia AccuContour — Upgrade E2 → E3
Has 5 independent peer-reviewed publications including multinational studies (npj Digital Medicine 2025 across 7 countries). This meets E3 criteria (multi-center, multi-national, vendor-independent). Should also set `evidenceMultiNational: true`.

### Therapanacea Annotate — Already E2 but qualifies for E3
Has prospective blinded evaluation (Gregoire et al. 2020), multinational evidence (Kim et al. 2024 across sites), and vendor-independent multi-center studies. Already has `evidenceProspective: true` and `evidenceMultiNational: true`. Upgrade to **E3**.

---

## 2. Structure Naming Convention Violations

Per the established v2 convention, bilateral structures must be expanded into individual L/R entries. The following files use `(L/R)` grouping which breaks analytics counting and the Structure Comparison Tool:

### Files requiring L/R expansion:
- **carina.ts** — ~30 structures use (L/R) grouping (e.g., "Eye (L/R)" → "Eye L", "Eye R")
- **manteia.ts** — ~12 structures use (L/R) grouping in thorax/abdomen/pelvis sections; also has duplicate entries (Trachea, Esophagus appear twice)
- **hura-imaging.ts** — ~8 structures use (L/R) grouping
- **therapanacea.ts** — ~25 structures use (L/R) grouping

### Files with vague/generic structure lists:
- **directorgans.ts** — Uses comma-separated grouped descriptions ("Head & Neck: Brainstem, Parotid (L/R), Spinal Cord, Mandible, Eyes, Optic structures") instead of individual entries. This renders the product invisible in structure comparisons. Needs expansion to individual structures.
- **brainlab.ts** (Elements RT Seg) — Uses region names only ("Cranial", "Basal Ganglia", "Head and Neck", etc.). Needs expansion to individual structures from FDA K243633 documentation.

---

## 3. Missing Products

No new FDA QKB-cleared auto-contouring products were found that are not already in the database or archived. The QOCA Smart RT (K231855) is correctly archived.

---

## Planned Changes

### Files to modify (evidence fixes):
1. **ai-medical.ts** — Downgrade E2→E1, update notes
2. **carina.ts** — Add E0/I0 evidence fields + expand L/R structures
3. **coreline.ts** — Add E0/I0 evidence fields
4. **ge-healthcare.ts** — Set vendorIndependent=true, add Kim et al. 2024 reference
5. **manteia.ts** — Upgrade E2→E3, set multiNational=true, expand L/R, remove duplicates
6. **therapanacea.ts** — Upgrade E2→E3, expand L/R structures
7. **hura-imaging.ts** — Expand L/R structures
8. **directorgans.ts** — Expand structure list to individual entries
9. **brainlab.ts** (Elements RT Seg) — Expand structure list to individual entries

### Scope
- 9 files modified
- ~6 evidence classification corrections
- ~75+ structure naming convention fixes (L/R expansions)
- 2 products gain proper structure lists (DirectORGANS, Brainlab RT Seg)


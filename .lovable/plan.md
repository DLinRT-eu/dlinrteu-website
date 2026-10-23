# Documentation consistency pass

Bring all written documentation and on-site explanation pages in line with recent changes:
- the Levels of Efficacy axis
- Adoption Readiness as the third axis
- discontinued products
- the TheraPanacea ART-Plan grouping
- structure counting
- public role guides
- RS4RT and the new resources
- the improved PDF export

Product data, scores and site behaviour stay unchanged; only wording and docs change.

## Inconsistencies already found

1. **Old axis names still visible**
   - The Evidence & Impact guide page still calls the third axis "implementation burden (Z)" in its subtitle, description and example text. It should be "Adoption Readiness (R0–R5)", and "E and I" should become "E and L".
   - The CSV field list (`public/schemas/dlinrt-csv-fields.md`) still describes "Clinical Impact — I0–I5" and "Implementation Burden".
   - The reviewer guide writes "Clinical Impact (L1t–L6)".
   - The field reference mentions "implementation burden (Z)".
   - `public/llms.txt` says "clinical impact classification".
   - The Resources & Compliance page says "clinical impact axis".
   - The product page's evidence editor says "Select clinical impact" and "Notes about clinical impact".
2. **Model card schema** (`public/schemas/dlinrt-model-card-schema.json`): notes still say "clinical impact". It is also missing the fields the exports now include: evidence score summary, per-source evidence, study quality, lifecycle and name history.
3. **Export docs**: `docs/README.md` and the main README don't describe the redesigned PDF (evidence badges, source cards, structures grouped by region, disclaimer). The README still advertises "23+ columns".
4. **Broken link**: the README points to `src/data/products/examples`; the templates actually live in `docs/examples/products/`.

## Checks across the rest of the docs
Read through the README, `docs/README.md`, ADMIN/REVIEWER/REVIEWER_ASSIGNMENT guides, `docs/review/GUIDE.md`, FIELD_REFERENCE, CONTRIBUTING, SECURITY, `llms.txt` and the About/Resources/guide pages. Make them consistent on:
- **Evidence axes:** E0–E3, L1t/L1c/L2–L6 and R0–R5, with provisional legacy conversion described in one place only and the others linking to it.
- **Discontinued products:** the public historical pages and the separate counts.
- **TheraPanacea:** the three ART-Plan applications, with former names as history.
- **Structure counting:** distinct-model counts in badges, while full lists and exports keep every entry.
- **Role guides:** reachable without an account, linked from About.
- **Initiatives:** RS4RT / Research Software, community-curated only.
- **Spelling:** "AIinRT2027" with no space.
- **Disclaimer:** the information-only, not-clinically-validated disclaimer is kept.
- **Documentation index:** README and `docs/README.md` link every current doc, including the audits and the TheraPanacea consolidation note.

Anything ambiguous I find (e.g. a claim I can't confirm from the code or data) is listed in the final message rather than guessed.

## Technical details
- Files expected:
  - `src/pages/EvidenceImpactGuide.tsx`
  - `src/pages/ResourcesCompliance.tsx`
  - `src/components/product/EvidenceLimitationsDetails.tsx` (placeholder text only)
  - `public/llms.txt`
  - `public/schemas/dlinrt-csv-fields.md`
  - `public/schemas/dlinrt-model-card-schema.json`
  - `README.md`, `docs/README.md`, `docs/REVIEWER_GUIDE.md`, `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`
- Column names actually written by the CSV exporter are checked against the CSV doc. Doc headers are renamed to match the export; the export itself is not renamed, so downstream users aren't broken.
- Audit reports under `docs/audits/` are dated records and stay as written.
- Verify by searching afterwards for "Clinical Impact", "Implementation Burden", "(Z)", "I0–I5" and "AIinRT 2027". Only intentional legacy-conversion mentions should remain. The build must stay clean.

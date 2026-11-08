# Audit and apply Usman Lula's six pending revisions (8 Nov 2026)

## Scope
Six pending revisions:
1. Subtle SubtleMR: key papers (including a 2026 paper), certification, key features, intended use, evidence, website, anatomy
2. Subtle SubtleHD (CT): version, integration, deployment, intended use, adoption readiness, website, compatible systems, limitations
3. ClariPi ClariCT.AI: intended use, evidence, limitations, compatible systems
4. GE Precision DL: disease targeted, release date, key features, population, intended use, evidence (new papers), limitations
5. AIRS SwiftMR: certification, key features, deployment, processing time, FDA notes, intended use, evidence (v2/v3 literature), version, compatible systems
6. ClariPi ClariACE: key features, population, evidence, limitations, version, anatomy

## Audit per revision
- Compare each draft field by field with the current product file.
- Accuracy: check every new DOI against Crossref (title, authors, journal, year) and confirm the paper names the product. Check FDA K-numbers, dates and intended-use quotes against the FDA 510(k) database. Check versions, websites and compatible systems against vendor pages.
- Scoring: give every new paper Evidence Rigor (E0–E3) and Levels of Efficacy (L1t–L6) from its abstract or full text, marked "pending reviewer check". Change a product's overall levels only when a paper justifies it.
- Scope: keep only AI/deep-learning claims that apply to radiotherapy use. Leave out reviews, preprints and diagnostic-only studies, or mark them indirect.
- House style: "First A et al." authors, standard journal abbreviations, only the study-quality flags that apply, British spelling in our own text, source disclosure (sourceAccess and retrieval date for non-public sources), no legacy I-codes, schema-valid enums (for example "510k_cleared", "Class II").
- Anything wrong or unsupported gets corrected or dropped, never silently kept. Usman's wording is kept where it is accurate.

## Apply
- Write the audited changes into each product file. Then mark each draft "applied" with a short review note listing any corrections.
- Usman's tooling requests (clinical-trial entries as evidence, editing some fields on the page, DOI import like Zotero) are recorded as follow-ups, not built now.

## Verify
- Catalogue tests (`bun test scripts`), the evidence score checker and a clean build.
- Open all six product pages in the browser and confirm the new fields and papers display correctly.
- Report: what was accepted, corrected and dropped for each product, plus the level changes.

## Technical notes
- Drafts are in `product_edit_drafts` (ids db0fe88f, 43429ae2, 2c523763, bc522957, 94a6bbc1, 8a84384c). Apply them following the syngo.via precedent: edit the TypeScript files, then update the draft status.

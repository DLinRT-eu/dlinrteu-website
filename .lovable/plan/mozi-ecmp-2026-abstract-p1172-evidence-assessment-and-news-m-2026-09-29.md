# MOZI ECMP 2026 abstract (P1172): evidence assessment and news mention

## Assessment
Cilla et al., "MOZI: bringing daily online adaptive radiotherapy for prostate cancer SBRT treatments to a standard C-arm linac", Physica Medica 149S1 (2026) 106484, doi:10.1016/j.ejmp.2026.106484 (Responsible Research Hospital, Tema Sinergie, University of Bologna).

- What it tests: the "Assistant Adaptive Radiotherapy" module in MOZI TPS — end-to-end phantom QA (Ruby phantom, doses within 4%) plus 5 patients simulated retrospectively (daily CBCT-based adapted plans vs. non-adapted plans; adaptation median 18 min).
- What it does not say: it never mentions AI, deep learning, auto-contouring or synthetic CT. It does not evaluate the AI part that DLinRT catalogues (CBCT/MRI to synthetic CT).
- Rigor: conference abstract, single centre, phantom + 5 retrospective patients, no external validation. Tema Sinergie is a co-author; it is not stated whether they are linked to the vendor.

Conclusion: **it does not raise the evidence level.** MOZI stays at E0/I0. It is the first independent-centre report of MOZI's online-adaptive workflow on a standard linac, so it goes in as unscored supporting evidence, labelled "workflow-level; AI component not evaluated".

## Changes
1. MOZI product page: add the abstract to evidence, unscored, with the note above. Update the online-adaptation caveat: an ECMP 2026 abstract reports a CBCT-based online-adaptive feasibility study (phantom + 5 retrospective patients), with no AI component described. Keep E0/I0/R3 and lastUpdated 2026-09-29.
2. Latest news item (ASTRO, ECMP and MICCAI 2026), ECMP section: add one short neutral bullet — an ECMP 2026 abstract (P1172) from an Italian centre reports a feasibility study of MOZI TPS's online-adaptive module on a standard C-arm linac (phantom + 5 retrospective prostate SBRT patients). It does not describe an AI component, so MOZI's evidence level stays the same. Link the DOI and the product page.
3. Checks: evidence validator, typecheck, then look at both pages in the browser.

## Technical details
- Files: src/data/products/treatment-planning/manteia-mozi.ts, src/data/news/astro-ecmp-2026-announcements.ts.
- Before adding the DOI, confirm it resolves; if it doesn't, cite it as Physica Medica 149S1 (2026) S207, P1172.

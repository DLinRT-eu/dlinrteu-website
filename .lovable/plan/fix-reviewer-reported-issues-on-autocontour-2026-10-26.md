# Fix reviewer-reported issues on AutoContour

## Already in place (no change)
- Release date is 25 Sep 2026 and the limitation "Evidence relates to preceding software versions and may not generalise directly to v2.8." is already saved on AutoContour. Wording kept as written.

## Fix
1. Goddard et al. 2024 (DOI 10.1186/s13014-024-02451-4): journal label "Radiother Oncol" -> "Radiat Oncol" in both places it appears:
   - AutoContour (Radformation) scored paper
   - MIM Contour ProtégéAI scored paper
2. Same-category sweep: any other paper with a `10.1186/s13014-` DOI (journal Radiation Oncology) labelled "Radiother Oncol" gets corrected to "Radiat Oncol". Only the label changes; titles, scores and rationale untouched.
3. Leave the reviewer's free-text as is apart from typos; do not add the reviewer's suggestions as new content anywhere.

## Checks
- Run the evidence score checker and evidence tests.
- Open the AutoContour page and confirm the citation shows "Radiat Oncol".

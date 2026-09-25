# Revisit the 13 "product not named" references

## Scope
The 13 references rejected earlier because the abstract didn't name a product (#24, 36, 40, 48, 52, 59, 65, 68, 69, 70, 71, 74, 101). Each gets a full-text check. A reference is only credited to a product when the full text (methods, acknowledgements or supplement) names that commercial product. Nothing is guessed from co-author affiliations.

## Steps
1. Get the full text of each reference through Europe PMC or the open-access publisher page, and search it for product and vendor names (for example Limbus, Radformation, Mirada DLC, RayStation, Contour+, Ethos, CyberKnife, Accuray).
2. For each reference, record one of these outcomes:
   - **Named:** match it to the product in the catalogue and score it (E0–E3, I0–I5, plus the five study-quality flags: vendor-independent, multi-centre, multi-national, prospective, external validation).
   - **Named, but the product isn't in the catalogue or doesn't use AI:** reject, with the reason.
   - **Still not named, or no full text available:** keep rejected and write down which sections were checked.
3. Add the accepted papers to the product files, following the format of the papers added in the previous round.
4. Recompute each affected product's overall evidence level, rigor and impact using the review guide. Priority: #52, the prospective head-and-neck planning study, which could raise the Limbus rigor score if the full text names Limbus. Change a score only when the new papers justify it, and list every change.
5. Save an updated worksheet as `hair-doi-review_v2.xlsx`, filling in the decision, product, scores and the source section for each row.
6. Run the typecheck and the evidence validation check, and confirm both are clean.

## Deliverable
A short list: which references were accepted and for which product, which were rejected and why, and every score change (old score to new score, with the reason).

## Technical details
- Product files are in `src/data/products/<category>/*.ts`. Keep the existing evidence entry shape (DOI, E/I, study-quality flags, source).
- Checks: `validate:evidence` and `tsgo`.
- Unrelated fields and files stay untouched.

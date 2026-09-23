# Bundle and review company edits per product

## What we found
MVision's edits sit in the Edit Approvals queue as separate drafts: about 20 waiting across Adapt+ (8), Contour+ (7 plus 1 unsent draft), Image+ (4) and Dose+ (1). Several drafts change the same fields again (version, anatomy, deployment, release date, structures). If each one is approved separately, a newer edit can be overwritten by an older one.

## What you get
1. **"Group by product" view** in Edit Approvals. It shows one card per product with a count, e.g. "MVision Adapt+ — 8 pending edits".
2. **Combined changes.** For each field, the newest submitted value wins. Every field shows three things side by side: the current value in the catalogue, the proposed value, and which drafts touched it (with time and author). Older values that were replaced are shown struck through, so nothing disappears silently.
3. **Consistency checks for every changed field**, marked as error, warning or ok:
   - allowed values only (category, modality, deployment, regulatory class, output format)
   - structures written as "Region: Structure Name", with duplicate and left/right pair checks, and the distinct-structure count before and after
   - version and release date are valid, and the date is not after the regulatory clearance dates it should precede
   - the version is the same everywhere it appears in the product (version, regulatory block, version history)
   - a source is recorded; a vendor-supplied value needs "vendor-provided" plus a retrieval date
   - nothing claims clinical validation, and the evidence scores (E/I/R) are not changed by the vendor
4. **Per-field decision:** accept, reject, or edit the value before accepting. **Accept all passing** accepts every field with no errors in one click. Fields with errors cannot be accepted until you fix or reject them.
5. **Approve bundle:** creates one combined approved edit, which opens a single GitHub PR as it does today. All drafts in the bundle are then marked approved and linked to it, and rejected fields are recorded with a reason. The representative gets one notification per product, not one per draft.
6. **Review report:** a downloadable summary for each bundle listing the fields, the checks and your decisions, which you can check the PR against.

Nothing changes for single drafts. The current per-draft view stays available as a toggle.

## Technical details
- New `src/utils/draftBundling.ts`: groups `product_edit_drafts` (status `pending_review`, optionally `draft`) by `product_id`, flattens `draft_data` to dotted paths, keeps the last write by `updated_at`, and keeps the history.
- New `src/utils/draftValidation.ts`: reuses `validateProduct` (`productReviewHelper`), `structureClassification` helpers, the category and regulatory enums from types, and the source-disclosure rule. Returns results per path.
- New `src/components/admin/edit-bundles/ProductEditBundle.tsx` (diff table, check badges, per-field controls) and `BundleSummaryExport`. `EditApprovals.tsx` gets a view toggle.
- Approving: insert one `product_edit_drafts` row (approved, merged data, combined `changed_fields`, summary listing the source draft ids), call the existing `apply-product-edit` function, then set the source drafts to `approved` with `review_feedback` "Merged into bundle <id>" plus the per-field rejections. No database schema change; the existing admin RLS on `product_edit_drafts` covers this.
- Tests: `draftBundling.test.ts` (last write wins, nested paths) and `draftValidation.test.ts` (structure format, enum, version consistency).
- After it is built, open the MVision bundles in the browser to check them, and report what the checks flag. Nothing is approved without your decision.

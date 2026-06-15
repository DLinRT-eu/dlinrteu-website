## 1. Harden `AutoLinkText` URL sanitization

File: `src/components/ui/AutoLinkText.tsx`

- Keep the regex anchored to `https?://` so non-URL text (including raw `www.` or bare domains) is rendered verbatim.
- Validate every captured match with `new URL(part)` and require `protocol === "http:" || "https:"` before rendering an `<a>`. Any match that fails validation falls back to a plain text fragment — no link, no shortening.
- Strip trailing punctuation (`.,;:!?)]}`) from the matched URL before validation so sentences like "see https://x.org/y." don't link the period.
- Existing shortening + `title` tooltip behavior stays the same. No styling changes.

## 2. Extend AutoLinkText to more free-text fields

Wrap rendered (read-mode) text in `<AutoLinkText text={...} />` so long URLs collapse with hover tooltips. Edit-mode `<textarea>`/`<input>` stays untouched.

- `src/components/product/ProductHeaderInfo.tsx` line 146 — `displayProduct.description` paragraph.
- `src/components/product/TrainingDataDetails.tsx` — read-mode renderings of `description`, `source`, `notes` text.
- `src/components/product/SafetyCorrectiveActionsDetails.tsx` — read-mode `description` / notes fields.

Out of scope: card grids, listings, and any input/editor controls.

## 3. Investigate & restore `syntheticmr-spine`

Findings:
- `src/data/companies/specialized-solutions.ts` still references `"syntheticmr-spine"` in SyntheticMR's `productIds`, but no product file defines that ID — a 404 on `/review/syntheticmr-spine`.
- Git history shows SyMRI Spine existed in the initial commit (`3173cb7`) inside `syntheticmr.ts` and was dropped during a later refactor that converted the file from a `SYNTHETICMR_PRODUCTS` array to a single `SyMRINeuro` export.
- Scope check against project rules:
  - **AI/DL threshold (Core rule):** SyMRI is MR fingerprinting / quantitative relaxometry — model-based reconstruction, not deep learning. No public evidence of a DL component in the Spine product.
  - **Radiotherapy relevance:** the archived Spine entry targeted diagnostic indications (degenerative disc disease, stenosis, spinal tumors). No synthetic-CT-for-RT pathway, unlike the Neuro entry's borderline RT linkage.
  - **Regulatory approval gate:** archived entry noted CE IIa but FDA "pending" since 2020; current public SyntheticMR materials still describe SyMRI as a quantitative MR post-processing package, not an AI/DL product.

Recommendation: **do not restore** as a catalogued product. Instead:
- Remove the dangling `"syntheticmr-spine"` ID from `src/data/companies/specialized-solutions.ts` so the company page no longer links to a 404.
- Leave SyMRI Neuro as-is (it already carries the RT-relevant MESCAL benchmark citation).

If the user wants it restored anyway, the alternative is to recreate the product file from the git snapshot under `src/data/products/archived/syntheticmr-spine.ts` with an archival reason ("Out of scope: diagnostic MR post-processing without disclosed DL component or RT pathway") and keep it off the catalogue — confirm before doing this.

## Out of scope
- No changes to the evidence/citation data added in the previous PRs.
- No changes to the URL regex semantics beyond protocol allow-listing and trailing-punctuation trimming.
- No backend/edge-function changes.

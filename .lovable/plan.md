## Plan

### 1. Data Source field (General Information) — split + linkify
File: `src/components/product/GeneralInformationDetails.tsx`

- Replace the single `<p>{sourceInfo}</p>` rendering of `displayProduct.source` with a parsed list:
  - Split the `source` string on `;` (the existing convention, e.g. MRCAT entry) into individual source items, trimmed.
  - Render each item as its own line. Wrap each line in `<AutoLinkText text={item} />` so any embedded `http(s)://…` URL becomes a shortened, hoverable, clickable anchor (existing hardened behavior: scheme-validated, trailing punctuation stripped, `title` tooltip with full URL).
- Edit mode untouched: `EditableField` continues to render its textarea with the raw string, so reviewers/admins still edit the full source text including full URLs.

### 2. Company Website — shorten long URLs
File: `src/components/product/ContactInformation.tsx`

- Keep `href={websiteUrl}` as the full URL (no behavior change to navigation).
- Replace the visible label `{websiteUrl}` with a shortened label computed via the same `shorten()` helper logic used in `AutoLinkText` (host + truncated path with `…`, default max 48 chars).
- Add `title={websiteUrl}` on the anchor so hover shows the full URL.
- Keep `ExternalLink` icon. Add `break-all` to avoid layout breaks on edge cases.
- Edit mode: `EditableField` already renders an input with the raw URL — unchanged.

To avoid duplicating logic, extract the existing `shorten()` + `isSafeHttpUrl()` from `AutoLinkText.tsx` into a small helper `src/lib/url.ts` and re-import from both `AutoLinkText.tsx` and `ContactInformation.tsx`. No behavior change for `AutoLinkText`.

### 3. Review/edit mode smoothness
- Only the read-mode JSX inside `EditableField`'s children is changed. `EditableField` swaps to its own editor when `isEditMode` is on, so the new shortened/linkified rendering never interferes with editing.
- For Data Source specifically: confirm the textarea editor receives the raw `displayProduct.source` (it already does via the `value` prop), and the split-on-`;` is purely presentational.
- No changes to `ProductEditContext`, drafts, or save flow.

### 4. Documentation refresh
Bring docs in line with current schema and UI without rewriting tone:

- `docs/FIELD_REFERENCE.md`:
  - Update `source` description to document the `; `-separated convention and that embedded `http(s)` URLs are auto-linked in the UI.
  - Add/confirm entries for fields that have landed since last update: `evidenceRigor` (E0–E3), `clinicalImpact` (I0–I5), `adoptionReadiness` (R0–R3), their `*Notes` siblings, `evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation`, `categoryEvidence`, `dosePredictionModels`, `monitorsAIProducts`, `usesAI`, `safetyCorrectiveActions`, `priorVersions`, `supersededBy`, `developedBy`, `companyRevisionDate`, `sourceAccess`, `sourceRetrievedOn`, `hasRegulatoryApproval`.
  - Note URL-shortening / hover-tooltip behavior on free-text fields (description, trainingData/evaluationData descriptions, evidence notes, intendedUseStatement, safetyCorrectiveActions, website).
- `docs/review/GUIDE.md`:
  - Sync evidence rubric wording with the dual-axis E/I + R model and the study-quality sub-attributes already used in product files.
  - Add the source-disclosure rule (`sourceAccess` + `sourceRetrievedOn` for non-public sources) per the project Core memory.
  - Add the catalogue inclusion gate (`hasRegulatoryApproval` recognized authorities) and the AI/DL threshold (classical processing excluded).
- `README.md`:
  - Refresh the "Adding a product" section to point at the current category folder list and the up-to-date required fields.
  - Link to `docs/FIELD_REFERENCE.md` and `docs/review/GUIDE.md` for full schema/rubric.
- `docs/ADMIN_GUIDE.md`:
  - Brief addition documenting the company-representative invitation flow including the new `forceRegister` option (auto-provisioned account + password setup email).
- `docs/REVIEWER_GUIDE.md` / `docs/REVIEWER_ASSIGNMENT_GUIDE.md`:
  - Light pass to align field names with current schema; no workflow changes.

### Out of scope
- No product-data edits.
- No changes to `AutoLinkText` regex/validation semantics.
- No backend, RLS, or edge-function changes.
- No styling overhaul beyond the minimum needed for the shortened anchors.

### Technical notes
- New helper `src/lib/url.ts` exporting `shortenUrl(url, max=48)` and `isSafeHttpUrl(url)`; `AutoLinkText` re-imports them so its public behavior is identical.
- Source splitter: `source.split(/;\s*/).map(s => s.trim()).filter(Boolean)`. If only one segment results, render as a single line (current behavior visually preserved).

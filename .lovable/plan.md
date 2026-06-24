## What's going wrong

When Shaden tries to certify **Plan AI** (Sun Nuclear), the `certify_product` RPC is called with the wrong `p_company_id`:

- Product field: `company: "Sun Nuclear (Mirion Medical)"`
- `getCompanyIdByName()` in `src/utils/companyUtils.ts` has no entry for that string, so it falls back to `name.toLowerCase().replace(/\s+/g, '-')` → **`sun-nuclear-(mirion-medical)`**
- The real company id in `src/data/companies/radiotherapy-equipment.ts` is **`sun-nuclear`**

The RPC then can't find a matching company / assignment for the rep, throws, and the toast shows "Failed to certify product". The same bug breaks every flow that calls `getCompanyIdByName` for any company whose display name contains parentheses, punctuation, or symbols. Currently affected:

- `Sun Nuclear (Mirion Medical)` → should be `sun-nuclear`
- `Varian (Siemens Healthineers)` → should be `varian` (or `varian-siemens-healthineers` depending on catalog)
- `Accuray®`, `MedLever, Inc.`, `Taiwan Medical Imaging Co.`, `Coreline Soft Co`, etc. — all produce mangled IDs via fallback (some happen to be in the hardcoded map, most are not).

This impacts:
1. `CompanyDashboardOverview.tsx` → certify + suggest-revision
2. `company/Dashboard.tsx` → certify
3. `companyUtils.createCompanyRevision` → revisions
4. `UnifiedSubmissionDialog` (structured + free-text) → reviewer queue
5. `extractCompaniesFromProducts` → counts shown on Companies page

## Fix

Make `getCompanyIdByName()` resolve against the actual `COMPANIES` catalog instead of a hand-maintained map.

### Changes (frontend only, no DB / RLS changes)

1. **`src/utils/companyUtils.ts`**
   - Import `COMPANIES` from `src/data/companies`.
   - Build a name→id lookup once (memoized) keyed by the exact `name` field.
   - `getCompanyIdByName(name)`:
     1. Exact match in catalog → return its `id`.
     2. Case-insensitive / trimmed match → return its `id`.
     3. Keep the existing hardcoded `nameToIdMap` as a final fallback for legacy aliases (e.g. `"Philips"` → `philips-healthcare`, `"RaySearch"` → `raysearch`).
     4. Last-resort slug fallback: `name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')` (strips parens/punctuation cleanly).
   - Add a `dev`-only `console.warn` when the slug fallback is used, so future mismatches surface in logs instead of silently breaking certification.

2. **Sanity-check** that no caller depends on the previous mangled output. Search confirms callers only feed the result back to RPCs that expect a real catalog id, so the corrected resolution is strictly better.

3. **Verification pass for company-rep + reviewer workflows** (read-only, no edits unless an issue is found):
   - Certify product (CompanyDashboardOverview, company/Dashboard)
   - Suggest revision (free-text)
   - Structured certification submission (`UnifiedSubmissionDialog`)
   - Reviewer queue picks them up via `product_revisions` / `product_edit_drafts`
   - Confirm `notify-certification-complete` still receives the correct `companyName` (uses `product.company` string, unaffected)

No backend migration is needed — the bug is purely in the client-side ID resolver.

## Out of scope

- Renaming companies, splitting Varian/Sun Nuclear into parent-company entries, or changing the catalog schema.
- Reviewer-side UI changes (the workflow itself is sound; the failure was upstream at submission time).

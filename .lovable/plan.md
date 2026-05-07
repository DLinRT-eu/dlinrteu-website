## Problem

Product data lives in **static TypeScript files** (`src/data/products/<category>/*.ts`) bundled at build time. There is no runtime DB read for product content. The only way an "approved" change can become visible on the site is a **merged GitHub PR** that updates those files and triggers a redeploy.

Today there are two parallel approval workflows, and **neither closes the loop automatically**:

### 1. `product_edit_drafts` (Visual Editor – reviewers/company reps)
- Admin clicks Approve in `src/pages/admin/EditApprovals.tsx` → only flips `status` to `approved` in the DB.
- A separate "Sync to GitHub" button must then be clicked to call the `apply-product-edit` edge function, which generates the `.ts` file and opens a PR.
- Even after that, the PR must still be **merged** for the change to appear.
- Result: most admins approve and stop, so nothing ever reaches the codebase.

### 2. `company_revisions` (Company structured submissions)
- `RevisionApprovalManager.handleSubmitDecision` only updates `verification_status = 'approved'`.
- **No code path exists** that converts `field_updates` (or `changes_summary`) into a product file change or a PR.
- Result: approval is a status flag with zero effect on product data.

## Fix

Make "approve" the single action that drives the change all the way to a GitHub PR, and make the post-merge state observable.

### Step 1 – Auto-trigger PR on approve for `product_edit_drafts`
In `src/pages/admin/EditApprovals.tsx`, after the DB update that sets `status = 'approved'`, immediately invoke the existing `apply-product-edit` edge function with the same `draft_id`. On success the function already sets the draft to `applied` and stores `github_pr_url`. Keep the manual "Sync" button as a fallback for retry on failure.

### Step 2 – Bridge `company_revisions` → `product_edit_drafts`
Create a new edge function `apply-company-revision` (admin-only, same auth/CORS pattern as `apply-product-edit`) that:
1. Loads the approved `company_revisions` row.
2. Loads the current product object from the static dataset shipped to the function (or, simpler, requires the caller to pass the merged `draft_data`).
3. For `submission_type = 'structured'`: merges `field_updates` into the current product JSON. For `free_text`: skips auto-apply and returns a flag so the UI prompts the admin to open a manual draft.
4. Inserts a row into `product_edit_drafts` with `status = 'approved'`, `created_by = original revised_by`, `edit_summary = changes_summary`, `changed_fields` derived from `field_updates` keys.
5. Calls the same PR-creation logic used in `apply-product-edit` (extract that logic into a shared helper inside the function file, since edge functions can't share folders).
6. Stores the resulting PR URL back on the `company_revisions` row (add column `github_pr_url text`) and on the new draft.

Wire `RevisionApprovalManager.handleSubmitDecision` and `handleStatusChange` to call this function whenever the new status is `approved` and `submission_type = 'structured'`.

### Step 3 – Surface PR/merge state in the UI
- In both `EditApprovals` and `RevisionApprovalManager`, show a status chip: `Approved → PR open → Merged → Live`. PR state can be polled via the existing `github-pull-requests` edge function (already used by `useGitHubPRCount`).
- Add an explanatory banner on the approval pages: "Approved edits become live only after the generated PR is merged and the site redeploys."

### Step 4 – Free-text revisions
Free-text `company_revisions` cannot be auto-applied. Add an explicit admin action **"Open structured draft from this revision"** that pre-fills the Visual Editor with the current product so the admin can translate the request, then go through Step 1.

## Database

One small migration:
```sql
ALTER TABLE company_revisions
  ADD COLUMN github_pr_url text,
  ADD COLUMN github_synced_at timestamptz;
```

## Files to change

- `src/pages/admin/EditApprovals.tsx` – auto-call `apply-product-edit` on approve; add PR-state chip and banner.
- `src/components/company/RevisionApprovalManager.tsx` – call new `apply-company-revision` on approve for structured submissions; show PR-state chip; add "Open structured draft" action for free-text.
- `supabase/functions/apply-company-revision/index.ts` – new function (admin auth, dynamic CORS allowlist incl. `*.lovableproject.com`, Resend not needed).
- `supabase/functions/apply-product-edit/index.ts` – extend allowed origins to `*.lovable.app`/`*.lovableproject.com` (currently only literal hosts) so the preview Approve flow works.
- New migration for the two columns above.

## Out of scope

- Auto-merging PRs. Merges remain a human gate so reviewer/company changes still get a final code review, matching the Minimal Intervention rule.
- Switching product data from static files to DB-backed runtime content (large architectural change; can be a future Phase 2).

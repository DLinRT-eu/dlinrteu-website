## Audit findings

I traced the full path: editor → `product_edit_drafts` row → admin approval → `apply-product-edit` edge function → GitHub PR. Three real defects block drafts from reaching production.

### 1. GitHub token is missing permissions (root cause)

`apply-product-edit` edge-function logs (just now) show:

```
Failed to create branch: {"message":"Resource not accessible by personal access token","status":"403"}
```

The branch-create call (`POST /repos/.../git/refs`) is rejected. The current `GITHUB_TOKEN` PAT does not have `contents: write` on `DLinRT-eu/dlinrteu-website`. So every approved draft fails at the very first GitHub call, draft stays at `approved`, no PR is ever opened, and nothing reaches main → no deploy.

This is a credential issue, not a code bug. It must be fixed in Supabase secrets — the code is doing the right call.

### 2. `submitForReview` race in `ProductEditContext.tsx` (line 247-277)

When a reviewer clicks "Submit for review" before a draft has been auto-saved:

```ts
if (!user || !currentDraft) {
  await saveDraft(summary);     // setState only — does not return the new id
}
const draftId = currentDraft?.id;   // still undefined here
if (draftId) { ... }                // skipped silently
```

Result: row never moves from `draft` → `pending_review`, no toast error, user thinks nothing happened. This is exactly the "stuck in draft" symptom. `saveDraft` needs to return the persisted draft so the follow-up update has an id.

### 3. No admin recovery path for rows stuck at `draft`

`EditApprovals.tsx` only renders Approve/Reject for `pending_review`. The "All Drafts" tab lists `draft` rows but exposes no action, so an admin can't unblock them. We need a "Promote to Pending Review" action on `draft` rows.

`approved`-but-no-PR rows already have a "Retry sync" button (line 335) — that part is fine and will start working again once defect 1 is fixed.

## Fix

### A. GitHub token (config — requires user)

Rotate `GITHUB_TOKEN` in Supabase Edge Function secrets to a token that has, on the `DLinRT-eu/dlinrteu-website` repo:

- `contents: write` (create branch + commit file)
- `pull_requests: write` (open PR)
- `metadata: read` (default)

Recommended: a fine-grained PAT scoped to that single repo, or a GitHub App installation token. Classic PAT with `repo` scope also works but is broader.

I'll add a short doc note in `docs/ADMIN_GUIDE.md` listing the required scopes so future rotations don't repeat this.

### B. Code: fix `submitForReview` race

In `src/components/product-editor/ProductEditContext.tsx`:

- Change `saveDraft` to return the persisted `EditDraft` (or its id) instead of relying on React state.
- In `submitForReview`, when there's no `currentDraft`, use the id returned from `saveDraft(summary)` directly to perform the status update — no dependence on `currentDraft` state in the same tick.
- Show an explicit error toast if both paths fail to produce an id (so future regressions are visible).

### C. Code: admin promotion action for stuck drafts

In `src/pages/admin/EditApprovals.tsx`:

- Add a `promoteToPending(draftId)` handler that updates `status` to `pending_review` and bumps `updated_at`.
- In `DraftCard`, when `draft.status === 'draft'`, show a "Move to pending review" button (admin-only context — this page is already admin-gated).
- Refresh the list after promotion so it appears in the Pending tab.

### D. Code: harden `apply-product-edit` error surface

Minor: when the GitHub call fails, include the GitHub status code and message in the JSON error returned to the admin UI (currently swallowed to a generic "Failed to access GitHub repository"). This makes the next misconfiguration self-diagnosing without log diving.

## Out of scope

- No DB schema change. RLS, GRANTs, and the `product_edit_drafts` shape are correct.
- No change to `generateProductCode` / `resolveFilePath` — those produced files are fine and already round-tripped through GitHub when the token worked.
- Not touching the rejected/applied flows.

## Verification

1. After token rotation: re-run "Retry sync" on an existing `approved` draft — expect a PR URL.
2. New end-to-end: editor → Save → Submit for review → admin Approve → PR opened → merge → site updates.
3. Manually flip a row to `draft` in DB; confirm the new "Move to pending review" button works in the All Drafts tab.
4. `bunx tsc --noEmit -p tsconfig.app.json` clean.

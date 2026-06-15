# Plan: Visual Editor submission feedback + history

Reviewer reported that submitting edits via the in-browser Visual Editor gives no confirmation or audit trail. Two gaps to close:

1. Editors don't get a clear "this was sent" signal or a place to see what they previously submitted.
2. Reviewers/admins have no consolidated view of Visual Editor submissions per product.

## 1. Confirm + log on submit (editor side)

In `ProductEditContext.submitForReview` (`src/components/product-editor/ProductEditContext.tsx`):
- After flipping the draft to `pending_review`, show a richer success toast: product name, number of changed fields, summary, "View your submissions" action linking to the new history page.
- Fire a new edge function `notify-edit-submitted` that:
  - Emails the submitting user a confirmation (Resend, `noreply@dlinrt.eu`) listing product, changed fields, summary, draft id, submitted-at — respects `profiles.notification_preferences`.
  - Notifies admins/reviewers per existing notification-preference logic (reuse `notifications` table insert + optional digest path, same pattern as `notify-reviewer-assignment`).
- No new DB tables needed — `product_edit_drafts` already stores summary, changed_fields, status, timestamps. Use it as the source of truth.

## 2. "My submissions" page for editors

New route `/my-submissions` (linked from profile menu and from the success toast):
- Lists the current user's `product_edit_drafts` ordered by `updated_at desc`.
- Columns: product, status badge (draft / pending review / approved / rejected / applied), changed-fields count, summary, submitted-at, reviewer feedback (if any).
- Row expands to show diff via the existing `DiffViewer` component.
- RLS: existing "users can read their own drafts" policy already covers this.

## 3. Visual edit history on the reviewer side

Two surfaces:

a. **Per-product tab in `ProductReview.tsx`** — add a "Visual Edits" tab next to "Company Revisions". New component `VisualEditHistory.tsx` queries `product_edit_drafts` for that product (all statuses, all submitters) via a new security-definer RPC `get_product_edit_drafts_for_reviewer(p_product_id)` (mirrors existing `get_product_revisions_for_reviewer`). Shows submitter name, status, changed fields, summary, timestamps, expandable diff, and quick links to approve/reject in the existing `EditApprovals` admin page.

b. **Pending-items integration** — already done in a prior pass on `AdminOverview`; cross-link from the new history component to `/admin/edit-approvals?draft=<id>` so a reviewer can jump straight to the approval action.

## 4. Minor

- Add submitter `display_name`/email to the RPC return shape (join `profiles`), same pattern as `get_product_revisions_for_reviewer`.
- Add a "Submissions" link in the user dropdown (`UserMenu` / profile area) for any user with at least one draft.

## Technical notes

- New edge function: `supabase/functions/notify-edit-submitted/index.ts` — Resend, dynamic CORS allowlist, checks `notification_preferences.product_edits` before sending; inserts a row in `notifications` for in-app bell.
- New RPC migration: `get_product_edit_drafts_for_reviewer(uuid)` returning drafts + submitter profile fields; `SECURITY DEFINER`, restricted to `has_role(auth.uid(),'reviewer') OR has_role(auth.uid(),'admin')`.
- No schema changes to `product_edit_drafts`.
- Files touched (new): `notify-edit-submitted/index.ts`, `src/pages/MySubmissions.tsx`, `src/components/reviewer/VisualEditHistory.tsx`. Edited: `ProductEditContext.tsx`, `ProductReview.tsx`, `App.tsx` (route), user menu component, one migration for the RPC.

## Open questions

1. For the admin/reviewer notification on submit: in-app bell only, or also email? Default proposal: in-app + respect each reviewer's `notification_preferences.product_edits` for email.
2. Should "My submissions" also surface drafts that are still in `draft` status (auto-saved but never submitted), or only items the user explicitly sent? Default proposal: show both, with the status badge making it clear.

## Goal
Two related improvements:
1. A structured **Company Certification Submission** workflow so MedCom (and any company rep) can submit precise field updates (version, FDA status, notified body, evidence links) for a product — going beyond the current free-text "Submit Revision" flow.
2. Allow admins to **add products to an already-active review round** (currently only Complete / Archive / Clone / Delete exist on the round actions menu).

## Part 1 — Structured Certification Submission

### Database
Extend `company_revisions` rather than introducing a new table (keeps the existing reviewer/admin approval pipeline, RLS, notifications, dashboards intact):

- Add nullable JSONB column `field_updates` to `company_revisions` to hold a structured payload like:
  ```json
  {
    "version": "...",
    "releaseDate": "...",
    "regulatory": {
      "ce": { "status": "...", "class": "...", "notifiedBody": "..." },
      "fda": { "status": "...", "clearanceNumber": "...", "decisionDate": "..." }
    },
    "evidence": [ { "type": "...", "description": "...", "link": "..." } ]
  }
  ```
- Add nullable `submission_type` text (default `'free_text'`, allowed: `'free_text' | 'structured'`).
- Update RPC `create_company_revision` to accept optional `p_field_updates jsonb` and `p_submission_type text` parameters; signature stays backward-compatible.

No schema changes required for products themselves — applied updates still flow through the reviewer/admin approval (and ultimately the GitHub PR pipeline) the same way as today.

### UI
- New component `CertificationSubmissionDialog.tsx` (under `src/components/company/`) used from the Company Dashboard alongside the existing "Submit Revision" button. Sections:
  - Product selector (limited to the rep's company products).
  - **Versioning**: version, release date.
  - **Regulatory**: CE status / class / notified body, FDA status / clearance number / decision date.
  - **Evidence links** (repeatable rows: type, description, URL — Zod-validated URL).
  - Optional free-text "additional notes".
- Submitting calls the updated `create_company_revision` RPC with `submission_type='structured'` and the full JSON payload, plus a generated `changes_summary` line summarising the touched fields.
- Reviewer/admin approval surfaces (`RevisionApprovalManager`, admin Dashboard) get a small extension to render the structured diff (key/value table of submitted fields) when `submission_type='structured'`, instead of only the free-text summary.

### Notifications
Reuses the existing reviewer-notification pipeline triggered by `company_revisions` inserts — no new edge function needed.

## Part 2 — Add Products to an Active Review Round

### Backend
Reuse the existing `bulkAssignProducts(roundId, productIds, deadline, proposedAssignments?)` in `src/utils/reviewRoundUtils.ts`. It already inserts into `product_reviews` with `review_round_id = roundId`. No new RPC needed; admin RLS on `product_reviews` already permits the insert.

### UI
- Extend `src/components/admin/review-rounds/RoundActionsMenu.tsx`:
  - Add a new menu item **"Add Products…"** (visible when `round.status` is `'active'` or `'draft'`).
  - Opens a new dialog `AddProductsToRoundDialog.tsx` (new file in same folder).
- The dialog provides:
  - A searchable, filterable (by category/company) product list, sourced from `ALL_PRODUCTS`, **excluding** products already assigned to this round (query `product_reviews` by `review_round_id`).
  - Multi-select checkboxes; running count of selected products.
  - A reviewer assignment block reusing `calculateProposedAssignments` + `ReviewerSelectionDialog` patterns already in the codebase (Balanced / Random / Expertise-first), with optional deadline override defaulting to the round's `default_deadline`.
  - Submit button calls `bulkAssignProducts(round.id, selectedIds, deadline, proposedAssignments)`.
- After success, refresh the parent round details (`onUpdate()` already exists), update `review_rounds.total_products` / `total_assignments` via the existing trigger or a follow-up `update` (check existing trigger before writing manual update — likely already maintained by the assignment trigger).

### Edge cases
- Prevent double-assigning a product within the same round (filter the candidate list against existing `review_round_id` rows).
- Show a friendly empty state if every product is already in the round.
- Disable the action for `completed`/`archived` rounds.

## Out of scope
- No design / branding changes.
- No public product page changes; certified updates still propagate through the existing reviewer → admin → GitHub PR pipeline.
- No new email templates; reuses the established notify-reviewer / certification flows.

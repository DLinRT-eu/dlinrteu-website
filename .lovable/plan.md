## Goals

Three related improvements to the admin review workflow:

1. **Shuffle assignments in draft rounds** — re-run the assignment algorithm on an existing round.
2. **True "Select all" + bulk add to round** — make `AddProductsToRoundDialog` select across all filters, not just visible.
3. **In-round reviewer reminder** — move the mail reminder into a round, with a preview of recipients and selectable list.
4. **Edit approvals in admin pending items** — surface pending product edit drafts on `/admin` overview with quick actions.

---

## 1. Shuffle / re-balance assignments (draft rounds)

**File:** `src/components/admin/review-rounds/RoundActionsMenu.tsx`

- Add new menu item `Shuffle Assignments…` shown only when `round.status === 'draft'`.
- Open a new `ShuffleAssignmentsDialog` component.

**New file:** `src/components/admin/review-rounds/ShuffleAssignmentsDialog.tsx`

- Loads current assignments for the round (`product_reviews` where `review_round_id = round.id`).
- Algorithm picker: `balanced | expertise-first | random | manual` (same as `AddProductsToRoundDialog`).
- Reuses `calculateProposedAssignments(productIds, undefined, algorithm)` from `reviewRoundUtils`.
- Shows a preview table: product → proposed reviewer (with delta vs current assignee).
- On confirm, calls existing `reassign_product_review_admin` RPC per row (already in `reviewRoundUtils.reassignProductReviewAdmin`) inside a Promise.all batch with reason `"Bulk shuffle (<algorithm>)"`.
- Refreshes round details.

No DB schema change needed — uses existing RPCs.

---

## 2. True "Select all" in AddProductsToRoundDialog

**File:** `src/components/admin/review-rounds/AddProductsToRoundDialog.tsx`

- Current button reads "Select visible / Clear visible" and the candidate list is capped at 500 with filters applied.
- Replace with two buttons:
  - **Select all matching** — selects all candidates matching current search + category filter (drop the 500 cap for selection; keep the cap only for rendered rows with a "showing first 500 of N" hint).
  - **Clear selection** — clears `selected`.
- Keep per-row checkboxes. Show selection count and total candidate count.

---

## 3. In-round reviewer reminder with recipient preview

**File:** `src/pages/admin/ReviewRoundDetails.tsx`

- Add a `Send Reminders…` button in the round header next to `RoundExportButton`, visible when `round.status === 'active'` and there are non-completed assignments.

**New file:** `src/components/admin/review-rounds/SendRoundReminderDialog.tsx`

- Derives the recipient set from the current `assignments` prop: group by `assigned_to`, keep only reviewers with at least one `pending` / `in_progress` assignment. Include reviewer name, email, count of pending items, earliest deadline, overdue flag.
- Renders a checkbox list with search, "Select all", "Clear", and an indeterminate header checkbox — same pattern as `CertificationReminderDialog`.
- Footer button: `Send to N reviewer(s)`; disabled when 0 selected.
- On submit, invoke `send-deadline-reminders` with `{ force: true, review_ids: [...] }` listing only the assignment IDs belonging to selected reviewers in this round.

**Edge function:** `supabase/functions/send-deadline-reminders/index.ts`

- Extend body schema to accept optional `review_ids: string[]`. When provided, after `get_reviews_needing_reminders` (called with `force_run` semantics — `min_interval_hours: 0`), filter the returned list to those whose `review_id` is in the supplied set. This keeps backwards compatibility with the global scheduler and the existing admin "Force Send All" button.
- Still respects per-user `notification_preferences.review_deadlines.email = false` (current behavior).
- No DB / RPC changes.

The existing global `DeadlineReminderControls` on `/admin` stays as-is (cron / global manual trigger). The new dialog is the per-round, recipient-curated path.

---

## 4. Pending edit approvals on admin overview

**File:** `src/pages/admin/AdminOverview.tsx`

- Add state `pendingEditDrafts` and fetch on mount:
  ```ts
  supabase
    .from('product_edit_drafts')
    .select('id, product_id, status, submitted_at, created_at, user_id')
    .eq('status', 'pending_review')
    .order('submitted_at', { ascending: false })
    .limit(10);
  ```
- Add to `totalPending` calculation.
- Add a new Quick Stats card: "Pending Edit Approvals" with count.
- Add a new section card "Pending Edit Approvals (N)" below "Pending Company Revisions":
  - Table: Product, Submitted by (resolve from `profiles`), Submitted at, Action → `Review →` button navigating to `/admin/edit-approvals`.
  - Header "View All" button → `/admin/edit-approvals`.

No backend change — `/admin/edit-approvals` route and page already exist.

---

## Technical notes

- All changes are admin-only UI; auth is already handled by `ApprovalGate` + `useRoles`.
- Reusing existing RPCs (`reassign_product_review_admin`, `get_reviews_needing_reminders`, `mark_reminder_sent`) means no migrations.
- Single edge-function change (`send-deadline-reminders`) is additive and backwards compatible.

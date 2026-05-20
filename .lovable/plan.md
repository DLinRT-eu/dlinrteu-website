
## Goals

1. Let admins change the **deadline of a whole review round** and have that change cascade to every assigned product in that round.
2. Let admins **add new products to a round and assign them to a chosen reviewer** (not only via balanced / expertise / random auto-assignment).

Both actions live in the existing `ReviewRoundDetails` page / `RoundActionsMenu`. No changes to data model, only one new DB function.

---

## 1. Change deadline for the whole round

### UX
- In `RoundActionsMenu` (top-right of `/admin/review-rounds/:id`), add a new item **"Set / Change Deadline…"** (calendar icon), above "Add Products…".
- Opens a dialog: shadcn `Popover` + `Calendar` date picker, pre-filled with `round.default_deadline`.
- Checkbox: **"Apply this deadline to all assigned products in this round"** (checked by default).
- "Save" → update round + (optionally) propagate to all `product_reviews` rows of that round.
- Toast: e.g. `Deadline updated. 12 product assignments updated.`
- Page refreshes via existing `onUpdate` so the assignments table shows new deadlines.

### Backend
Create one SECURITY DEFINER RPC `update_round_deadline_admin(p_round_id uuid, p_deadline date, p_propagate boolean)`:
- Verifies caller has `admin` role via `has_role()`.
- `UPDATE review_rounds SET default_deadline = p_deadline, updated_at = now() WHERE id = p_round_id`.
- If `p_propagate`: `UPDATE product_reviews SET deadline = p_deadline WHERE review_round_id = p_round_id`.
- Returns `{ success, updated_assignments }`.

(We add a dedicated RPC instead of reusing `update_review_round_admin` because that one only updates the round row; the cascade to `product_reviews` is the whole point.)

### Frontend wiring
- New helper in `src/utils/reviewRoundUtils.ts`: `updateRoundDeadlineAdmin(roundId, deadline, propagate)` calling the RPC above.
- New component `src/components/admin/review-rounds/EditRoundDeadlineDialog.tsx` (Popover + Calendar pattern from `shadcn-datepicker`, `pointer-events-auto`).
- `RoundActionsMenu` opens that dialog; on success calls `onUpdate()`.

---

## 2. Add products to a round and assign them to a specific reviewer

### UX (in existing `AddProductsToRoundDialog`)
- Add a fourth value to the "Assignment algorithm" select: **"Assign all to a specific reviewer"**.
- When selected, reveal a second select underneath listing all reviewers (label = `First Last (email)`). This list is fetched once when the dialog opens (re-use the same `user_roles` + `profiles` join already used in `ReviewRoundDetails.fetchReviewers`, factored into a small helper or inlined).
- "Add N products" button stays disabled until a reviewer is picked in this mode.

### Behaviour
- When `algorithm === 'manual'` (new value), skip `calculateProposedAssignments` and build:
  ```ts
  const proposed = ids.map(id => ({ product_id: id, assigned_to: chosenReviewerId, match_score: 0 }));
  ```
  then call existing `bulkAssignProducts(round.id, ids, deadline || undefined, proposed)` — no DB or RPC changes needed.
- The deadline field in the dialog continues to default to `round.default_deadline`.

### Types
- Extend `AssignmentAlgorithm` in `reviewRoundUtils.ts` to `'balanced' | 'random' | 'expertise-first' | 'manual'`. Routing in `calculateProposedAssignments` is bypassed for `'manual'` at the dialog level, so the dispatcher doesn't need a new branch (but add a defensive throw if it ever reaches it).

---

## Files touched

- `supabase/migrations/<new>.sql` — new `update_round_deadline_admin` function.
- `src/utils/reviewRoundUtils.ts` — add `updateRoundDeadlineAdmin`, extend `AssignmentAlgorithm` type.
- `src/components/admin/review-rounds/EditRoundDeadlineDialog.tsx` — new.
- `src/components/admin/review-rounds/RoundActionsMenu.tsx` — new menu item + dialog wiring.
- `src/components/admin/review-rounds/AddProductsToRoundDialog.tsx` — add "manual" algorithm option, reviewer selector, manual-mode branch in `handleSubmit`.

No changes to `ReviewRoundDetails.tsx` apart from the automatic refresh it already triggers via `onUpdate`.

---

## Out of scope

- No change to per-row inline deadline picker (already shipped).
- No notification emails on deadline change (can be added later if desired).
- No editing of round name/description in this pass.

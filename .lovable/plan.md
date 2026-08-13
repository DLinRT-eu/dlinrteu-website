# Repair review data (no invitation changes)

Data-only repair of the review tables. Company invitations are left untouched — the 14 pending, past-expiry invitations stay open.

## What is wrong today

- 47 reviews have status `completed` but no completion date.
- Round counters and progress stats do not match the actual assignments:
  - "2026-01 Review - task priority": 67 assignments, no stats row at all.
  - "Q2 post ESTRO": counter says 1, actually 89 assignments; stats row all zeros.
  - "Q4 2026": counter says 9, actually 96 assignments; stats row all zeros.

## What will be done

1. Set the missing completion dates for reviews already marked completed, using their last activity (or last update) date.
2. Recalculate each round's product and assignment totals from the actual assignments.
3. Rebuild the progress stats per round (total, completed, in progress, pending), creating the missing row for the 2026-01 round.

## Explicitly not done

- No changes to `company_invitations`. Expired-but-pending invitations remain pending, and no expiry job is scheduled.

## Technical notes

Single data operation via the insert tool (no schema migration):

- `UPDATE product_reviews SET completed_at = COALESCE(last_activity_at, updated_at, now()) WHERE status='completed' AND completed_at IS NULL`
- `UPDATE review_rounds` totals from a `COUNT(*)` per `review_round_id`
- Upsert into `review_round_stats` per round with counts filtered by status; if `round_id` has no unique constraint, delete-then-insert the stats rows instead.

# Supabase Data Completeness Audit

Audited all 44 public tables. Core data (profiles, roles, reviews, company reps, verifications) is structurally sound — no orphan rows, no duplicate assignments, no unassigned or deadline-less reviews. The gaps are counters that drifted out of sync, lifecycle timestamps never written, and a few features whose columns are simply never filled.

## Confirmed problems

1. **Review round counters are wrong.** Stored vs. actual assignments:
   - "2026-01 Review": 67 / 67 (correct)
   - "Q2 post ESTRO": stored 1, actually 89
   - "Q4 2026": stored 9, actually 96
2. **`review_round_stats` is dead.** Only 2 of 3 rounds have a row, and both existing rows are all zeros (last touched Apr and Jun) while the rounds hold 89 and 96 assignments. Any dashboard reading this table shows zero progress.
3. **47 reviews are `completed` with no `completed_at`.** Completion dates, throughput and round timelines are unreportable for those.
4. **14 company invitations are still `pending` past their `expires_at`.** The `expire_old_invitations` function exists but nothing runs it.
5. **5 profiles have no row in `user_roles`.** Those users are approved but land with no role-based access.
6. **3 core-team profiles miss `bio` and/or `profile_image_url`**, so their public About entries render incomplete.

## Not broken, but worth deciding on

- `review_score`, `time_spent_minutes`, `github_file_url` are null on all 252 reviews; `review_checklist_items` and `review_comments` are empty. These features exist in the UI but were never used — either wire them up or stop surfacing empty widgets.
- 53 of 58 profiles have `data_processing_consent_given = false` (accounts created before the consent field existed). No consent record is being back-filled; a re-consent prompt is the GDPR-clean fix.
- All 20 changelog entries have zero `changelog_links` rows (links live inside `github_data`).
- 142 unread notifications, oldest going back months — digest/cleanup is not trimming them.
- 50 profiles lack `institution`, 52 lack `specialization` — optional fields, only matters if the reviewer directory depends on them.

## Proposed fixes

**Migration (data + automation):**
- Recompute `review_rounds.total_products` / `total_assignments` from `product_reviews` for all rounds.
- Insert missing `review_round_stats` rows and recompute all counts from actual review statuses.
- Ensure the `update_review_round_stats` trigger is attached to `product_reviews` for insert/update/delete so counters stay correct; recompute round counters in the same trigger.
- Back-fill `completed_at` for the 47 completed reviews using `last_activity_at`, falling back to `updated_at`.
- Add a trigger that sets `completed_at` whenever status transitions to `completed` (and clears it on revert).
- Run `expire_old_invitations()` once to close the 14 stale invitations, and schedule it daily via pg_cron alongside the existing cleanup jobs.

**App-side (small, after the migration):**
- Admin "Data health" panel on the admin dashboard listing: rounds whose counters differ from actuals, completed reviews missing timestamps, expired-but-pending invitations, and profiles with no role — read-only, so drift is visible next time.

**Decisions needed from you (no code until you say):**
- Assign roles to the 5 role-less profiles, or leave them pending.
- Re-consent prompt for the 53 legacy profiles.
- Keep or hide the unused review scoring / checklist / comments UI.

## Technical notes

- All counter recomputation is idempotent SQL; no destructive deletes.
- Triggers are `SECURITY DEFINER` with `SET search_path = public`, matching existing functions.
- No RLS or grant changes required — all affected tables already have policies.

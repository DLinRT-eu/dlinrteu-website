# Fix: reviewer dashboard shows no products

## What I confirmed
- Your reviewer account (matteo.maspero@dlinrt.eu) has 28 assigned products: some "in progress", the rest "completed", none "pending".
- The dashboard opens on the **Pending** tab by default, so it starts out empty for you.
- Database permissions and the "my reviews" lookup are fine; the data is there.
- Your other account (m.maspero@umcutrecht.nl) only has the company role and no assignments; if you were signed in with it, the list would be empty.
- Not yet confirmed: why the page says "No reviews assigned yet" (shown only when the whole list loads empty) and why the In Progress tab can't be clicked. I can't sign in to your site myself, so step 1 checks this from your preview.

## Steps
1. **Diagnose:** you open My Reviews once in the preview while signed in; I read the page's log lines (it records how many reviews it loaded and any error), then fix the actual cause.
2. **Open on a tab that has items:** start on In Progress (or All) when Pending is empty, instead of always on Pending.
3. **Make tabs clickable:** check that nothing on the page (such as the floating bulk-actions bar or the round cards) covers or blocks the tabs, and fix it.
4. **Honest empty message:** if loading fails, show "Couldn't load your reviews — retry" instead of "No reviews assigned yet". Same on the Due Reviews page, which loads the same way.
5. Add a small test: with only in-progress and completed reviews, the dashboard opens on a tab that shows them.

## Technical details
- `src/pages/reviewer/Dashboard.tsx`: `activeTab` initial 'pending' -> choose first non-empty after fetch; track `loadError` state when both RPC and direct query fail; check `BulkReviewerActions` fixed overlay / z-index vs Tabs.
- `src/pages/reviewer/DueReviews.tsx`: same error-vs-empty distinction.
- No database changes expected.

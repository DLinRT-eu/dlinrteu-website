# Homepage: count of evidence sources scored

## What you will see
A fourth number in the homepage stats row (next to Products, Companies, Compliance resources):

- **Big number:** papers with an evidence score, e.g. "412"
- **Label:** "Evidence sources scored"
- **Small line:** "of 430 listed papers · E0–E3 / L1t–L6"
- Clicking it opens the Evidence dashboard (the E/L matrix).

The number updates by itself whenever a paper is added or scored on a product page, so there's nothing to keep up to date by hand.

## How it is counted
- Every paper listed across current products and pipeline products.
- Each paper is counted once, even if it appears on several products (matched by DOI, or by title when there's no DOI).
- A paper counts as "scored" when it has both an Evidence Rigor (E) and a Levels of Efficacy (L) score. Temporary scores still waiting for a reviewer are included. The small line could say how many of those are still waiting, if you'd like.
- Discontinued products are left out, the same as the product count.

## Layout
- The row becomes 4 equal cards on desktop and stays stacked on phones, with the same style as the existing cards.

## Technical details
- New pure helper `countScoredSources(products)` in `src/utils/evidenceScoring.ts`. It returns `{ scored, total }` and removes duplicates by normalised DOI, falling back to the title.
- `src/pages/Index.tsx` computes it inside the existing stats effect and passes `scoredSources` and `totalSources` to `StatsRow`.
- `StatsRow.tsx` gets a fourth entry (icon `FileCheck2`) linking to the dashboard, and the grid changes to `md:grid-cols-2 lg:grid-cols-4`.
- A unit test for the helper: duplicate DOI counted once, unscored paper excluded from `scored` but kept in `total`.
- Check the homepage in the browser at desktop and phone width.

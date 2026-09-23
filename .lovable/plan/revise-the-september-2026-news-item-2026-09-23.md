# Revise the September 2026 news item

Two changes to `src/data/news/september-2026-catalogue-and-eudamed-update.ts` (the latest news item, currently shown first on /news). No other files change; `src/data/news.ts` stays as is.

## 1. Remove the LinkedIn post

- Delete the entire "📣 LinkedIn post (draft)" section, including the surrounding `---` dividers and the note that publication awaits approval.
- Remove the empty `linkedinPostUrl: ""` field (optional in the `NewsItem` type). The item simply has no LinkedIn post anymore.

## 2. Rephrase the review-round bullet (consistently)

Replace the current single bullet in "## 🙋 Still open: review round and certification":

> The next **review round runs 1 November – 15 December 2026**. Many hands make the workload lighter — if you can spare a few hours, [get in touch](/support).

with two bullets that keep the reviewer call and add the round's focus:

> - The next **review round runs 1 November – 15 December 2026**. Next to verifying entries as usual, a focus of this round is to **double-check evidence levels where the evidence rests on a single source** — entries scored from one publication or one source only. Many hands make the workload lighter; if you can spare a few hours, [get in touch](/support).
> - Pending the publication of a paper, **one product review may be anticipated** — this is still under discussion and will be confirmed in due course.

Wording stays factual: no product is named (nothing is decided), no claim about the outcome, and it does not touch any product data or dates elsewhere in the item.

## Validation

- TypeScript typecheck passes.
- The news page renders the revised item with the LinkedIn section gone.

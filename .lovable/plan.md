## Goals

1. Add two new team members to the About page.
2. Draft (but do not publish) a news item summarising the 2nd-round review completion, evidence axis system, Synaptiq certification, new reviewer, more-reviewers call, and the MAIRT/MICCAI satellite event.
3. Create a Mailchimp-ready newsletter draft (copy-paste friendly) in a new dedicated location.
4. Generate a small shareable deck (PDF + slide images) covering: cumulative product timeline, pie chart of primary categories, and a single page of all company logos.

## 1. About page — two new team placeholders

Edit `src/pages/About.tsx`, appending to `TEAM_MEMBERS`:

- **Szabolcs David** — Reviewer — image `/people/placeholder.jpg` (placeholder, no portrait yet) — bio `https://www.amsterdamumc.org/en/research/researchers/szabolcs-david` — email `szabolcs.david@dlinrt.eu`.
- **Usman Lula** — Reviewer — image `/people/placeholder.jpg` — bio `https://www.linkedin.com/in/usman-lula-a67636b/` — email `usman.lula@dlinrt.eu`.

`TeamSection` already falls back to initials when the image fails to load, so no further UI change is needed.

## 2. News item — DRAFT only (not published)

Create `src/data/news/second-round-review-and-evidence-axes.ts` exporting `secondRoundReviewAndEvidenceAxes` (id: `second-round-review-and-evidence-axes`, date: today 2026-06-16).

**Do NOT** import it into `src/data/news.ts`, so it does not appear on the live site. A short header comment will mark it as a draft awaiting approval.

Content sections (markdown):
- 2nd-round review complete; accuracy improvements across the catalogue.
- Headline feature: 3-axis evidence system (rigor E0–E3, impact I0–I5, study-quality attributes) now visible on every product.
- Certification round officially opening for companies; **Synaptiq is the first certified company**, with two CE-marked products certified — congratulations.
- Backbone updates: streamlined review rounds, company-representative registration & revision flow, admin tooling. 28/42 companies have assigned representatives; follow-ups in progress.
- New reviewer welcome: **Szabolcs David**; thanks to the full 12-strong reviewer team (link to /about).
- Call for more reviewers — next round **Nov 1 → Dec 15, 2026**.
- Upcoming event: **MAIRT @ MICCAI**, Oct 1 2026, Strasbourg — https://miart-workshop.github.io/
- Attachments: links to the generated deck PDF and slide images stored under `public/newsletters/2026-06/`.

## 3. Mailchimp newsletter — copy-paste friendly

New folder `src/data/newsletters/` (new content area for storing newsletter drafts going forward).

Files:
- `src/data/newsletters/README.md` — explains the folder's purpose, naming convention (`YYYY-MM-slug.md`), and how to paste into Mailchimp (use the "Paste from rich text" or code block per section).
- `src/data/newsletters/2026-06-second-round-and-evidence.md` — the newsletter itself, structured as discrete copy-paste blocks following the project's color-coded update convention (Green = product updates, Violet = community/reviewers, Blue = platform/backbone, Amber = events/calls). Each block has a clear `## SUBJECT LINE`, `## PREHEADER`, `## BLOCK 1 — …` etc., with plain-text body and inline links, so an editor can drop each block straight into a Mailchimp content section. Includes references to the deck PDF and slide images.

No runtime UI surfaces this folder; it is documentation/content storage.

## 4. Shareable deck — PDF + per-slide images

Generate once via a Node script, output committed to `public/newsletters/2026-06/` so the news item and newsletter can link to stable URLs.

Slides (5):
1. **Cover** — "DLinRT.eu — 2nd round complete · Evidence axes live" + date.
2. **Cumulative product timeline** — line/area chart of cumulative product count over time, derived from product `releaseYear`/`launchDate` fields in `ALL_PRODUCTS`.
3. **Primary category pie chart** — slice per primary `category` across `ALL_PRODUCTS`.
4. **Company logos wall** — single page with every active company logo (from `getActiveCompanies()` / `COMPANIES`).
5. **What's next** — certification round opening, MAIRT event, Nov–Dec reviewer round, call for reviewers.

Generation approach (script under `scripts/generate-newsletter-deck-2026-06.mjs`):
- Use `pptxgenjs` to build a 1920×1080 PPTX with the DLinRT palette (#5090D0 accent, #1a1a2e text).
- Convert to PDF via LibreOffice headless, then to per-slide JPEGs via `pdftoppm`.
- Outputs written to `public/newsletters/2026-06/`:
  - `dlinrt-2026-06-update.pdf`
  - `slide-01.jpg` … `slide-05.jpg`
- QA pass: convert each slide to an image, visually verify no overflow / contrast issues, fix and re-run before final.

The script is a one-off generator (not wired into the build); rerunning regenerates the outputs.

## Technical notes

- News item file is created but intentionally NOT exported from `src/data/news.ts`, keeping it out of the live feed until you approve publication.
- Team images: both new members use a generic placeholder filename; `TeamSection` already shows initials on image error, so no missing-asset warning will be visible until real portraits are added.
- Newsletter content respects the existing `newsletter-mailchimp-template` memory (table-based HTML works in Mailchimp; here we store plain markdown blocks that map 1-to-1 onto Mailchimp content sections, which is faster for copy-paste authoring).
- No DB schema changes, no edge-function changes, no auth/routing changes.

## Files to add/edit

Edit:
- `src/pages/About.tsx` — append two team members.

Add:
- `src/data/news/second-round-review-and-evidence-axes.ts` (draft, not exported).
- `src/data/newsletters/README.md`.
- `src/data/newsletters/2026-06-second-round-and-evidence.md`.
- `scripts/generate-newsletter-deck-2026-06.mjs`.
- `public/newsletters/2026-06/dlinrt-2026-06-update.pdf` + `slide-01.jpg`…`slide-05.jpg` (generated).

## Open question

Should the news item appear publicly once you've reviewed the draft, or stay file-only until a future "publish" pass? My plan keeps it unexported (draft-only) until you say otherwise.

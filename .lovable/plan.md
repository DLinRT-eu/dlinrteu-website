
## Problem

`/admin/newsletter-broadcast` only lists markdown files under `src/data/newsletters/*.md` in its "Draft" dropdown. News items in `src/data/news/*.ts` (e.g. the AAPM 2026 round-up) are ignored, so every time a news post is published the admin has to re-type its content as a newsletter draft.

## Goal

The latest news items should appear as selectable sources in the composer, and picking one should auto-fill Subject, Preheader, and Body — ready to push to Resend without re-typing.

## Changes

Only `src/pages/admin/NewsletterBroadcast.tsx` is edited. No data-layer, edge-function, or schema changes.

1. Import `NEWS_ITEMS` from `@/data/news` and `NewsItem` from `@/types/news`.
2. Build a second "News → newsletter" source list from `NEWS_ITEMS` (sorted newest-first, capped at ~10). Each entry converts a `NewsItem` into the markdown shape `parseNewsletterMarkdown` expects:
   - `## SUBJECT LINE` → `[DLinRT.eu] ${item.title}`
   - `## PREHEADER` → `item.summary`
   - `## BLOCK 1 — 📰 ${item.title}` → `item.content` (markdown as-is), with a closing "Read the full post: https://dlinrt.eu/news/${item.id}" line and standard footer block.
3. Change the "Draft" `<Select>` into a grouped list with two `SelectGroup`s:
   - **From news posts** (newest first) — value prefixed `news:<id>`
   - **From markdown drafts** (`src/data/newsletters/*.md`) — value prefixed `md:<slug>` (existing behavior)
4. `handleSelectDraft` resolves the prefix, loads the corresponding markdown into `body`, and re-derives `subject` / `preheader` via the existing `parseNewsletterMarkdown` call (already wired).
5. Default the initial selection to the newest news item when `NEWS_ITEMS` is non-empty; otherwise fall back to the newest markdown draft (preserves current behavior when no news exists).
6. Small UI note under the Select: "News posts are converted to the newsletter template on the fly — edit before pushing." No other UI, styling, or send-path changes.

## Technical notes

- `parseNewsletterMarkdown` / `renderNewsletterHtml` are unchanged; the generated news-derived markdown just has to conform to the existing `## SUBJECT LINE` / `## PREHEADER` / `## BLOCK n — title` conventions already used by `src/data/newsletters/2026-06-second-round-and-evidence.md`.
- The news → markdown conversion is a pure helper inside `NewsletterBroadcast.tsx` (no new files, no exports).
- Subject/preheader remain editable in the form; body is a `Textarea`, so the admin can still tweak before pushing to Resend.
- No changes to `send-newsletter-broadcast` edge function, DB, or Resend audience logic.

## Out of scope

- Auto-publishing broadcasts when news is added (still requires an admin push).
- Rich-text editing of news content.
- Persisting the generated markdown back into `src/data/newsletters/`.

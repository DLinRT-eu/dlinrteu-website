## Goal
Make the RSS feed automatically include every news item published under `src/data/news/`, with no manual sync of the edge function.

## Approach
Generate `public/news.json` from the source news data at build time, and have the `rss-feed` edge function fetch that JSON instead of carrying a hand-maintained copy of the items.

## Changes

### 1. Build-time news manifest
- Add `scripts/generate-news-json.mjs`:
  - Uses `tsx`/`esbuild`-style dynamic import (or a small inline TS loader) to load `src/data/news.ts` and re-export `NEWS_ITEMS`.
  - Simplest path: import each `src/data/news/*.ts` file is not feasible from plain node, so the script reads `src/data/news.ts` and uses `tsx` (already a workspace-friendly approach) — or, to keep zero new deps, the script can `import()` the file via a tiny `bun`/`node --import tsx` invocation. We'll use `tsx` since it's already available in the dev toolchain (verify; otherwise add as a devDependency).
  - Writes `public/news.json` containing the full `NEWS_ITEMS` array (id, date, title, summary, content).
- Wire it into `package.json`:
  - `"prebuild": "node scripts/generate-news-json.mjs"` so every `vite build` regenerates the manifest.
  - Add a `"sync:news"` script for manual runs.

### 2. RSS edge function becomes dynamic
- Rewrite `supabase/functions/rss-feed/index.ts` to:
  - `fetch("https://dlinrt.eu/news.json")` (with the preview/published URL as fallback) at request time.
  - Sort by date desc, then render the same RSS 2.0 XML it produces today.
  - Keep the existing CORS headers, `Cache-Control: public, max-age=3600`, and channel metadata.
  - Drop the hard-coded `NEWS_ITEMS` array entirely.
  - On fetch failure, return a minimal valid feed (channel only) with status 200 so subscribers don't see hard errors — log the failure.

### 3. Date normalization
- Existing items mix `"2025-05-27"` and `"April 26, 2025"`. The RSS function already passes them through `new Date(...).toUTCString()`. We'll keep that, but add a guard: if `Date` parsing yields `Invalid Date`, fall back to the current build date so the item still appears.

### 4. Docs touch-up
- Note in `README.md` (news section, if present) that adding a file under `src/data/news/` and importing it in `src/data/news.ts` is sufficient — the RSS feed updates automatically on the next deploy.

## Files
- new: `scripts/generate-news-json.mjs`
- new (generated, gitignored or committed — commit it so previews work pre-build): `public/news.json`
- edit: `package.json` (add `prebuild`, `sync:news` scripts; add `tsx` devDependency if missing)
- edit: `supabase/functions/rss-feed/index.ts` (fetch-based, no hardcoded array)
- edit: `README.md` (one-line note)

## Verification
- Run `node scripts/generate-news-json.mjs`, confirm `public/news.json` contains all 10 items.
- After deploy, `curl https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/rss-feed` should list all 10 `<item>` entries sorted by date desc.
- Add a dummy news file locally → re-run the script → confirm it appears in `public/news.json`.

## Out of scope
- Moving news into Supabase (rejected in favor of build-time JSON).
- Changing the news authoring workflow or `NewsItem` schema.
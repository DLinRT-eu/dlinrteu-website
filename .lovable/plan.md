Create a new news article announcing DLinRT.eu's support for the AIinRT 2027 symposium, add it to the news registry, and regenerate the public JSON feed.

## What to build

1. **New news item file** — `src/data/news/aiinrt-2027-support.ts`
   - `id`: `aiinrt-2027-support`
   - `date`: `2026-07-21` (today's date)
   - `title`: "DLinRT.eu supports AIinRT 2027"
   - `summary`: one-sentence version of the announcement
   - `content`: Markdown version of the provided text, with the emoji bullets converted to structured Markdown and the external link `https://www.aiinrt.org` added to "AIinRT.org"

2. **Register the item** — `src/data/news.ts`
   - Import `aiinrt2027Support` from `./news/aiinrt-2027-support`
   - Insert it at the top of `NEWS_ITEMS` so it appears as the latest news article

3. **Regenerate public feed** — run `node scripts/generate-news-json.mjs` so `public/news.json` stays in sync with `src/data/news.ts` (used by the RSS edge function)

## Technical details

- The new file follows the existing `NewsItem` interface and the same export pattern as other news files.
- No new dependencies or UI changes are required.
- The existing `NewsSection` and `News` pages will automatically pick up the new item via `dataService.getAllNews()` / `dataService.getLatestNews(3)`.

## Verification

- TypeScript build passes (`npm run build` or `npx tsc --noEmit`).
- `public/news.json` contains the new item at index 0.
- The news page (`/news`) and home-page Latest News section render the new card.
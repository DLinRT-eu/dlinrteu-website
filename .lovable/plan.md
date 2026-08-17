# Soft 404 audit and fix

## What a soft 404 is here
The site is a single-page app: any URL returns HTTP 200 with the app shell, even when the page shows "not found". Search engines then flag those URLs as soft 404s. Two things create them: (a) URLs advertised in `sitemap.xml` that no longer resolve to real content, and (b) "not found" screens that render as normal indexable pages.

## Audit findings (verified against the data files)

1. Stale product URLs in `public/sitemap.xml` — 10 URLs point to product IDs that no longer exist:
   `brainlab-elements-ai-tumor-seg`, `ge-truefidelity-pro`, `medlever-workflow-management`, `radformation-clearcheck`, `siemens-dual-energy-optimizer`, `sun-nuclear-suncheck-patient`, `syntheticmr-neuro`, `syntheticmr-spine`, `united-ucs-ai`, `varian-mobius3d`.
2. Stale company URLs in the sitemap — `/products/company/vysioner` and `/products/company/syntheticmr` have no matching company record.
3. Redirect-only URLs in the sitemap — `/donate` and `/maintenance-team` are pure redirects and should not be listed.
4. Gated/thin URLs in the sitemap — `/dashboard` and `/timeline` are workspace pages with no public value; keeping them invites low-quality/soft-404 signals.
5. "Not found" screens are indexable — `ProductDetails`, `NewsDetail`, `CompanyProducts` and `ProductReview` render a not-found state without `noindex`, and two of them even canonicalise to another page.
6. Coverage gap (not a soft 404, but related) — 16 existing products and all `/news/:id` articles are missing from the sitemap, and the sitemap is hand-maintained, which is why it drifts.

## Proposed fix

- Regenerate `public/sitemap.xml` from the actual data: all live product IDs, all company IDs with products, all news article IDs, and the stable public pages only. Drop the stale, redirect and gated entries above.
- Add a small build-time generator script (`scripts/generate-sitemap.mjs`) wired into the build so the sitemap can never drift from the product/company/news data again.
- Add redirects for the 10 removed product IDs where a clear successor exists (mirroring the existing `Navigate` redirect pattern in `App.tsx`), so old inbound links land on the right product instead of a not-found page; the rest fall through to the 404 page.
- Make every not-found state explicitly non-indexable: pass `noindex` and a self-referencing canonical in `ProductDetails`, `NewsDetail`, `CompanyProducts`, `ProductReview`, and give them a consistent, useful body (short explanation plus links back to the catalogue) instead of a bare line of text.
- Keep `NotFound` as is but align its styling with the design tokens so it no longer looks like a stub page.

## Technical notes

- Sitemap generator reads `ALL_PRODUCTS` from `src/data/index.ts`, `COMPANIES` from `src/data/companies/index.ts`, and the news items, then writes `public/sitemap.xml` with `lastmod` from product revision dates where available.
- Redirect mapping for removed IDs is resolved case by case against current products (for example `ge-truefidelity-pro` -> `ge-truefidelity`, `united-ucs-ai` -> the current United Imaging entry); no redirect is added where no successor exists.
- No change to product data content, evidence, or business logic.

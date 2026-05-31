## Goal

When a user searches a company name in `/products`, surface a dedicated landing page that gathers every product from that company in one place — instead of (or in addition to) the filtered grid.

## What to build

### 1. New public route: `/products/company/:companyId`
New page `src/pages/CompanyProducts.tsx` (lazy-loaded in `src/App.tsx`).

Content:
- Header: company logo, name, website link, short description, certification badge (reuse existing `CompanyCard` building blocks).
- Stats strip: total products, categories covered, CE / FDA counts (reuse logic from `Companies.tsx` `prepareExportData`).
- Product list: reuse `ProductGrid` (or a simpler reuse of the product card used on `/products`) fed with `dataService.getProductsByCompany(companyId)`. Group by category with section headings.
- Secondary actions: "Back to all products", link to `/companies` and to the company's profile/certification page if available.
- SEO via `<SEO>` with canonical `https://dlinrt.eu/products/company/<id>` and an `Organization` + `ItemList` JSON-LD.
- `<Footer />` and `<ProductFeedbackBanner />` at bottom, matching the rest of the site.

### 2. Surface the page from product search
In `src/pages/Products.tsx`:
- When the user types a query that matches one or more company names (case-insensitive, on `company.name`), render a small "Matching companies" suggestion strip above the product grid. Each chip links to `/products/company/<id>` with the logo + name + product count.
- Keep existing search/filter behavior unchanged — the strip is additive, not a redirect, so users who want the cross-company filtered grid still get it.

### 3. Cross-links
- In `CompanyCard` (used on `/companies`), make the company name/logo also link to `/products/company/<id>` so the new page is discoverable from the Companies directory too.

## Technical notes

- No DB or schema changes. Pure frontend, uses existing `dataService` helpers (`getCompanyById`, `getProductsByCompany`, `getActiveCompanies`).
- Route is public (not behind `ProtectedRoute`).
- Reuse, don't duplicate: pull the product card rendering from whatever `ProductGrid` already uses; pull stats math from `Companies.tsx`.
- Handle unknown `companyId` → render a NotFound-style block with a link back to `/products`.
- Respect `Minimal Intervention`: no changes to filters, sorting, or other pages beyond the additions above.

## Out of scope

- No changes to the authenticated `/company/*` dashboard.
- No new data fields on products or companies.
- No design system / token changes.

## Open question

Should the search box on `/products` *also* auto-redirect to the company page when there is exactly one company match and zero product-name matches? Default in this plan: **no**, only show the suggestion chip. Let me know if you'd prefer auto-redirect.

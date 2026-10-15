# Discontinued products with public historical pages

## Goal
Introduce a **Discontinued products** section while preserving product pages, vendor history, publications and stored records. Treat discontinuation as a market/lifecycle status, not a clinical task: an Auto-Contouring product remains Auto-Contouring.

## Verified starting point
- `developmentStage` already accepts `discontinued`; `market` already contains availability and distribution fields, and `supersededBy` supports successor links.
- Current-market selectors primarily check regulatory approval and do not explicitly exclude discontinued products.
- GE CT Auto Segmentation (`ge-auto-segmentation`, K230082) is distinct from MR Contour DL (`ge-mr-contour-dl`, K242925).
- GE's US and global Auto Segmentation pages remain published. No end-of-sale notice has been confirmed. A published page or historical clearance alone does not establish current sales availability.
- Mirada's existing record explicitly describes discontinued distribution. Archived records also include duplicate/unverifiable entries, so they must not all be reintroduced as discontinued products.

## Product representation
1. Reuse `developmentStage: "discontinued"` for confirmed withdrawal from new sales. Add a small sourced market-status block alongside existing market fields: reason, date if known, geographic scope, verification state, source URL/access and retrieval date. Distinguish end of sales from end of support and regulatory withdrawal.
2. On a discontinued product page, show a clear neutral **Discontinued — historical record** notice with source and applicable date/region. Keep specifications, structures, publications and E/L/R assessments accessible; historical evidence is not erased or re-scored because sales stop.
3. Preserve regulatory clearances as historical facts, rather than overwriting them with commercial status. Show a successor link only when sourced; do not invent replacement relationships.
4. For GE, record the reported availability concern as **unconfirmed** until a vendor notice, direct vendor confirmation or another reliable source establishes the change. Do not label GE discontinued or remove it from current-market counts on the present evidence; keep MR Contour DL unaffected. Non-public confirmation must carry source access and retrieval date.
5. Normalize explicitly documented existing discontinued records, beginning with Mirada, into the same status. Leave unrelated archived duplicates and rejected entries excluded.

## Catalogue and vendor pages
- Add `/products/discontinued`, reachable from Products, using the established listing/filter patterns: search, task, modality, anatomy and historical certification. Reuse existing product fields and cards rather than defining a new medical category.
- Exclude confirmed discontinued products from default current-product listings, current-market totals and default evidence-dashboard product sets. Preserve the agreed current treatment of pipeline products.
- Vendor pages show **Current products**, **Pipeline** when applicable, and **Discontinued products** separately. Current-product and certification summary counts use current products only; display the historical count separately.
- Preserve public vendor pages even when a vendor has only historical products; exclude historical-only vendors from active-company totals and make their historical status clear in browsing/search.
- Historical search results and cards carry the same status notice. Old product URLs continue opening their full historical pages.
- Default current-list exports omit discontinued products. Historical-section exports retain full records, market status and provenance; keep naming/function history where present.

## Technical details
- Centralize lifecycle predicates and current/historical selectors in the existing product-filter/service layer; audit direct `ALL_PRODUCTS` consumers so counts, filters and dashboard views agree.
- Keep public ID lookup and sitemap entries for historical products separate from current-market filtering. Do not rename IDs, merge reviews, delete drafts or change database rows.
- Extend the product types additively and retain backwards compatibility for records without lifecycle metadata. Register genuinely discontinued records without reactivating excluded/duplicate archives.
- Update `docs/FIELD_REFERENCE.md`, relevant review guidance and architecture rules; save the approved historical-page preference when implementation begins.

## Validation
- Add concrete tests: discontinued records are excluded from current listings/counts but returned by ID; vendor historical groups retain them; pipeline/current records remain unchanged; GE stays unconfirmed until sourced; successor links and provenance survive exports.
- Browser-check Products → Discontinued → product, vendor historical cards, search, old URLs and filters on desktop and narrow screens.
- Run focused tests, evidence validation and lint; inspect the automatically generated build result. Report unrelated existing failures and any unavailable authenticated checks without changing their scope.

## Sources to verify during implementation
- https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation
- https://www.gehealthcare.com/en/products/imaging-applications/advanced-visualization-applications/auto-segmentation
- https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230082.pdf
- https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242925.pdf

**Outcome:** a public, searchable discontinued-products section and clear vendor/product history, without confusing commercial withdrawal with clinical task, evidence quality or regulatory status.
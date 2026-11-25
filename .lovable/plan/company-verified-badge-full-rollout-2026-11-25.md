# Company-verified badge: full rollout

Make the "Verified by Company" status visible wherever people browse products, using one neutral, standardised look (green = current, amber = content changed since certification). It describes data accuracy confirmed by the manufacturer, never clinical endorsement.

## What users will see

1. **Product cards (/products, search results, pipeline)** – a small green "Verified by Company" badge next to the CE/FDA tags; amber "Verification outdated" when the product page changed after certification. No badge when not certified.
2. **Product page** – the badge moves from the bottom tag list to a slim status line right under the product name, with the certification date and a short tooltip explaining what it means (and that it is not a clinical endorsement).
3. **Catalogue filter** – a "Verified by Company" toggle in the filter bar; the result counter shows "X verified" alongside the total. Choice kept in the page address like other filters.
4. **Company pages** – a line per company "3 of 4 products verified", and the same small badge on each product in the per-category overview.
5. **Compare tool** – one extra row "Verified by Company" (date or "Not verified").

## Technical details

- New hook `useProductVerifications()` loading all rows from `company_product_verifications` once (cached with React Query), returning a map productId -> { verifiedAt, status: valid|outdated } using the same content-hash logic now in `ProductHeaderInfo` (extracted to `src/utils/certificationStatus.ts`, with a fallback to the date comparison for older records).
- Shared `VerifiedBadge` component (compact + full variants) using existing `success`/`warning` tokens; `ProductHeaderInfo` refactored to use it.
- Filter: add `verified` query param to the existing filter state and `matchesFilters` logic.
- Confirm the table's read access works for anonymous visitors before showing it publicly; if not, add a public read-only view exposing only product id, date and hash (no notes or user ids).
- Tests: status logic (valid / outdated / legacy date fallback) and the filter.
- Docs: update `docs/FIELD_REFERENCE.md` / certification memory note.

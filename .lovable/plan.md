
## Problem

The Company Mapping Validator flags Accuray's representative as "orphaned" even though the company has a product in the catalog (`accuray-synchrony`). Cause: the product's `company` field is `"Accuray®"` (with ® symbol) while the representative's `company_name` is `"Accuray"` (no symbol). Check 3 in `validateCompanyMappings` compares raw display strings, so the names don't match — even though both resolve to the same `company_id` (`"accuray"`) via `getCompanyIdByName`.

Checks 1 and 2 already use `getCompanyIdByName`, so they handle the ® variant correctly. Only Check 3 (orphan detection) does a name-string comparison.

## Fix

In `src/utils/companyMappingValidator.ts`, change Check 3 to compare by canonical company ID instead of raw company name:

- Build `productCompanyIds = new Set(products.map(p => getCompanyIdByName(p.company)))`
- Flag a representative as orphaned only when `rep.company_id` (or, as fallback, `getCompanyIdByName(rep.company_name)`) is not in that set.

This keeps the existing admin-oversight skip and severity logic untouched.

## Out of scope

- No data edits to product files or the database.
- No change to Checks 1 / 2 — they already use `getCompanyIdByName` correctly.
- Not touching the `"Accuray®"` display name itself; the ® is intentional branding and other UI uses it.

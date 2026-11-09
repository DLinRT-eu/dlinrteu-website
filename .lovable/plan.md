# Regulatory overview on company pages

## What you will see

**Company page (e.g. /company/elekta)**
- Stats row gains a fourth regulatory tile: "EUDAMED matches" (products with a verified registry record), next to the existing CE and FDA counts.
- Under each category heading (Auto-Contouring, Image Synthesis, ...), a compact "Regulatory status" table above the product cards:

```text
Product            | CE                    | FDA                    | EUDAMED
Monaco Segm. Comp. | CE (per vendor)       | K252002 · 2026-02-19   | Platform reg. · EMDN Z11010401
AutoContour        | CE · Class IIb        | K... · date            | Exact match · UDI-DI ...
X                  | —                     | Not cleared            | Not found (searched 2026-10-30)
```
  - CE: status + risk class, with the existing "per vendor, not found in EUDAMED" note when present.
  - FDA: clearance number (linked to FDA record when a URL exists) and date; "CDSS exempt" shown as such.
  - EUDAMED: match type (exact / editor-confirmed / platform registration), registered trade name, Basic UDI-DI and EMDN code; nothing invented when no record exists.
- On mobile the table collapses into stacked rows per product.

**Companies list (/companies, including search results)**
- Each company card shows small neutral chips: "CE n · FDA n · EUDAMED n" and the SRN when the company has a verified actor record. Same style for every vendor (design neutrality).

Pipeline and discontinued sections are unchanged (they are excluded from current-market counts).

## Technical details
- New `src/utils/companyRegulatory.ts`: `getProductRegulatorySummary(product)` built from `product.regulatory`, `getStandardizedCertificationTags` and `getProductEudamed`; `getCompanyRegulatoryCounts(products)`. Unit tests in `scripts/` for counts and EUDAMED match labelling (exact vs editor-confirmed vs platform).
- New `src/components/company/CategoryRegulatoryTable.tsx` (shadcn Table, semantic tokens) used in `CompanyProducts.tsx` per category group.
- `Companies.tsx` card: add counts chips using the same helper, current-market products only.
- No data or registry JSON changes; docs (`docs/FIELD_REFERENCE.md` company section) get one line describing the overview.

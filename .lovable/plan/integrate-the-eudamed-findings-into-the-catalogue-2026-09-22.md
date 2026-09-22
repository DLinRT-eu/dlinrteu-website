# Integrate the EUDAMED findings into the catalogue

The audit produced verified, officially sourced facts for a subset of the catalogue.
This plan records only those facts, on confirmed matches, each with the EUDAMED query
link and the date it was checked. Nothing ambiguous or absent is entered.

## What is worth keeping from the sweep

Company level (15 confirmed registrations):
- SRN (EUDAMED single registration number, e.g. `FI-MF-000013082`)
- Registered legal name, role (manufacturer / importer), country, actor status
- Certificate numbers with notified body numbers and validity dates, where present (10 companies)

Product level (12 confirmed device registrations):
- Basic UDI-DI, EUDAMED risk class, registered trade name, manufacturer SRN
- The EUDAMED query URL as the disclosed source, plus the date checked

Deliberately not recorded: the 11 ambiguous companies, 8 ambiguous products, 4 failed
lookups and all `not-registered` rows. Registration only became mandatory on
2026-05-28, so absence is not a finding.

## New fields

1. `CompanyDetails` gains an optional `eudamed` block: `srn`, `registeredName`,
   `role`, `country`, `status`, `sourceUrl`, `lastVerified`, and an optional
   `certificates[]` of `{ certificateNumber, notifiedBody, type, validFrom, validUntil, status }`.
2. `ProductDetails.regulatory.ce` gains an optional `eudamed` block: `basicUdi`,
   `riskClass`, `registeredTradeName`, `manufacturerSrn`, `sourceUrl`, `lastVerified`.

Both are optional, so every existing record stays valid and untouched.

## Where it shows and exports

- Product page: inside the existing CE block, a compact "EUDAMED" line showing Basic
  UDI-DI and risk class, linking to the EUDAMED entry. No new badge or visual emphasis.
- Company page / company products header: registered name, SRN and country, with the
  certificate list when present.
- Exports: the new fields flow into the Excel/CSV product export (columns
  `eudamed_basic_udi`, `eudamed_risk_class`, `eudamed_manufacturer_srn`,
  `eudamed_source_url`, `eudamed_last_verified`) and into the JSON model card under
  `regulatory.ce.eudamed`. FHIR DeviceDefinition gains the Basic UDI-DI as an
  additional device identifier.

## Consistency check, reported not auto-fixed

EUDAMED risk class is compared with the CE class we already hold (for example a
product recorded as IIa that EUDAMED lists as IIb). Any mismatch is listed in the
audit report as a discrepancy for a human to resolve; no recorded class is overwritten.

## Technical notes

- Types: `src/types/company.d.ts`, `src/types/product.d.ts`, `src/types/productDetails.d.ts`.
- Data entry: the 12 product files and the 4 company files, values copied from
  `docs/audits/eudamed/2026-09-22-eudamed-audit.csv` only.
- `scripts/eudamed-audit.ts` gains a `--diff` mode that compares the sweep against the
  recorded `eudamed` blocks and CE classes, so re-runs report drift instead of needing
  a manual read-through.
- Display: `RegulatoryInfo`-side component in the product details view, company header
  component; editor support in `FieldEditors/RegulatoryEditor.tsx`.
- Exports: `src/utils/exportProducts.ts`, `src/utils/modelCard/dataGenerator.ts` and the
  Excel/CSV exporters, `src/utils/fhir/transformers/deviceDefinition.ts`.
- `lastRevised` and `companyRevisionDate` are left alone; the EUDAMED block carries its
  own `lastVerified`.
- Validation: `npx tsgo --noEmit -p tsconfig.app.json`, `npm run validate:evidence`,
  and a page load check on an affected product and company page.

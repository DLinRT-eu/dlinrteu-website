Update MIM Contour ProtégéAI product record and company context

Goal
- Correct the MIM Contour ProtégéAI entry for version/regulatory split, modality, deployment, market date and the GE Healthcare ownership.

Changes

1. Product data — `src/data/products/auto-contouring/mim-software.ts`
   - Version / regulatory split
     - Set top-level `version` to `"2.0.0"` (FDA-cleared version).
     - Add `priorVersions`:
       - `name`: "Contour ProtégéAI CE", `version`: "1.3.2", notes: CE MDD Class IIa version.
       - `name`: "Contour ProtégéAI MDR", `version`: "2.0.1", notes: Under MDR preparation.
     - Update `regulatory.ce.notes` to state the CE-marked version is 1.3.2, currently MDD Class IIa, and that 2.0.1 is in MDR preparation.
     - Update `regulatory.fda.notes` to state the cleared version is 2.0.0 (K253270).
   - Modality
     - Add `"CBCT"` to `modality`, `trainingData.scannerModels`, and `technicalSpecifications.input`.
     - Update `keyFeatures` to mention CBCT support if not already covered.
   - Deployment
     - Change `technology.deployment` from `["On-premises"]` to `["On-premises", "Cloud (CPU)", "Cloud (GPU)"]`.
   - Market date
     - Set `market.onMarketSince` to `"2020-08"`.
   - GE Healthcare ownership
     - Update `description` to note that MIM Software is now part of GE Healthcare.
     - Update `source` to include the GE Healthcare / MIM ownership statement.
   - Metadata
     - Bump `lastUpdated` and `lastRevised` to `"2026-08-27"`.

2. Company data — `src/data/companies/auto-contouring.ts`
   - Update the `mim-software` company `description` to state it is a GE Healthcare company.

3. Validation
   - Run `npm run validate:evidence -- --all` (or the project's evidence validation script) and a TypeScript typecheck to confirm the edited file still passes.
   - Visually verify the product page renders the new modality, deployment, version notes and company ownership correctly.

Out of scope
- No database migration is required; this is a static product-data edit.
- No new UI component; the existing `GeneralInformationDetails`, `RegulatoryInformationDetails`, `MarketPricingDetails` and `ProductHeaderInfo` components already surface these fields.

## Goal

Correct the Philips SmartSpeed entry and split it into two distinct products that match Philips' actual product portfolio.

## Findings

- Philips' product page is titled **"MR SmartSpeed"** (the original Compressed SENSE AI accelerator), FDA-cleared in 2022 (K213583 / press release Jul 2022).
- **"SmartSpeed Precise"** is a **separate, newer product** ("Dual AI" — combines SmartSpeed AI denoiser with Precise Image-style anti-ringing for MR), FDA-cleared **June 2025 via K251397** and announced Jul 2, 2025.
- The current entry `philips-smartspeed` in `src/data/products/reconstruction/philips.ts` mixes the two: it uses the SmartSpeed name + 2021 release date, but cites K251397 (which actually covers SmartSpeed Precise) and quotes the SmartSpeed Precise IFU.

## Changes (single file: `src/data/products/reconstruction/philips.ts`)

### 1. Rename existing entry → MR SmartSpeed (original)

- `id`: keep `philips-smartspeed` (preserve URLs/links)
- `name`: `"MR SmartSpeed"`
- `description`: scope to original Compressed SENSE AI (no "Dual AI" / no Precise Image denoiser)
- `regulatory.fda`: replace K251397 with **K213583** (decisionDate 2022-05-16) — original SmartSpeed AI clearance
- `intendedUseStatement`: replace SmartSpeed Precise IFU with the SmartSpeed AI text (sourced from K213583 / Philips 2022 press release)
- `releaseDate`: keep 2022 (commercial launch year)
- `version`: drop "3.2" (was Precise-era); use original SmartSpeed version or remove
- `evidence`: keep publications that genuinely refer to original SmartSpeed AI (Bonn cardiac case study, Fransen et al. systematic review, knee MRI prospective studies PMID:40428199, PMID:40240275 — verify each refers to SmartSpeed AI not Precise)
- `lastRevised`: 2026-06-02
- `source`: update accordingly

### 2. Add new entry → SmartSpeed Precise

New product object appended to `PHILIPS_PRODUCTS`:

- `id`: `"philips-smartspeed-precise"`
- `name`: `"SmartSpeed Precise"`
- `company`: `"Philips"`
- `category`: `"Reconstruction"`
- `productUrl`: `https://www.usa.philips.com/healthcare/technology/smartspeed-precise`
- `description`: Dual AI MR reconstruction combining SmartSpeed AI denoiser + Precise Image anti-ringing/sharpening for 2D Cartesian acquisitions
- `modality`: `"MRI"`
- `anatomicalLocation`: `["Whole body"]`
- `regulatory.fda`: K251397, decisionDate 2025-06-04, productCode LNH
- `regulatory.ce`: cleared, IIa, MDR
- `intendedUseStatement`: the full SmartSpeed Precise IFU currently mis-attached to the existing entry
- `keyFeatures`: dual-AI, increased SNR, anti-ringing, higher acceleration factors, replaces SmartSpeed AI + Precise Image for 2D Cartesian
- `releaseDate`: `"2025-07-02"` (FDA announcement)
- `evidence`:
  - FDA 510(k) K251397 summary
  - Philips press release Feb 26, 2025 + Jul 2, 2025
  - Pediatric brain MRI deep-learning study (Eur Radiol 2026, doi 10.1007/s00330-026-12482-y) — verify it specifically tests Precise; otherwise mark as related/contextual
  - AJNR 2025 review on DL MRI acceleration as contextual
- `evidenceRigor`: **E1** (regulatory + early publication; insufficient independent multi-center yet) — `evidenceRigorNotes` to flag publication search date 2026-06-02
- `clinicalImpact`: **I1** (newly cleared; limited published outcomes)
- `adoptionReadiness`: **R2** with note that local validation strongly recommended given recency
- Standard study-quality flags all `false` until publications confirm
- `lastUpdated` / `lastRevised`: `2026-06-02`
- `githubUrl`: same path as MR SmartSpeed entry

### 3. No changes needed elsewhere

- `reconstruction/index.ts` automatically picks up new entry via `...PHILIPS_PRODUCTS`.
- `philips-smartspeed` id is preserved → no broken links, no company-product mapping update required.
- `scripts/company-product-mapping.ps1` already lists `philips-smartspeed`; **add** `philips-smartspeed-precise` to the Philips array (one-line edit) for completeness.

## Verification

After build: confirm both products render on /products, that the FHIR/CSV exports include both, and that the existing slug `/products/philips-smartspeed` still resolves.

## Within the scope

- Re-verifying every cited publication abstract; flagged as a follow-up if any of the four PubMed IDs turn out to describe SmartSpeed Precise rather than the original SmartSpeed AI — in that case I'll move them to the Precise entry.
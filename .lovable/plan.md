# EUDAMED: confirm near-matches and find the 25 missing companies

## 1. Confirm the three near-matches
- **AccuContour-Lite** (Manteia): show it on AccuContour as a registered variant, labelled "AccuContour-Lite", not as AccuContour itself.
- **Contour+ (MVision AI Segmentation)**: link to MVision Contour+.
- **Mediq** (Mediq RT): link to Mediq RT.
- These are recorded as confirmed by you (dated 2026-11-09), so the page shows the registered trade name exactly as EUDAMED lists it.

## 2. Find the 25 companies under other legal names
For each one, search EUDAMED for the legal entity that actually registers the devices, e.g.:
- TheraPanacea: "TheraPanacea SAS"
- Philips: "Philips Medical Systems Nederland B.V.", "Philips Healthcare (Suzhou)", other Philips manufacturers
- GE: "GE Healthcare" and "GE Medical Systems" entities (incl. China/Japan sites)
- Siemens: "Siemens Healthcare GmbH", "Siemens Healthineers AG"
- The rest (Ever Fortune AI, Hura Imaging, NeuralRad, Carina AI, Vysioner, Canon, United Imaging, etc.): Ltd/Inc/GmbH/Co. variants and EU authorised representatives' listings where applicable.
- A company may have several SRNs; all are kept.

Then pull every device registered under those SRNs and match them to our products.

## 3. How matches are judged
- Exact name match (or a known earlier name): shown on the product page.
- Close match (e.g. extra suffix, version, "AI Segmentation"): listed in the report for your yes/no; nothing shown until you confirm.
- Not found: stated in the report only; never written on the page as "no CE mark".
- Large vendors (Philips, GE, Siemens) register hundreds of devices; only devices whose names match our catalogue products are considered.

## 4. Deliverables
- Updated product pages showing UDI-DI, Basic UDI-DI and EMDN code for new matches.
- Updated report listing, per company: SRN(s) found, matches, close calls for you, and still-missing companies.

## Technical details
- Add a curated `legalNameVariants` / known-SRN map in `scripts/verify-eudamed.ts`; also try NAME prefix searches per variant.
- Add a `confirmedCandidates` list (product ID + Basic UDI-DI + confirmation date) merged as verified, so confirmed near-matches survive reruns.
- Keep the AGENTS.md rule (exact or explicitly confirmed matches only); update it to mention confirmed candidates.
- Re-run the script, update `src/data/eudamed/udiVerified.json`, tests for the variant/confirmed logic, run catalogue tests, browser-check TheraPanacea, a Philips and a Siemens page.

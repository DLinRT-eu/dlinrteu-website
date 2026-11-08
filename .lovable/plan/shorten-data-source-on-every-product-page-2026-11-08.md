# Shorten "Data Source" on every product page

The "Data Source" line in General Information is currently a long sentence on most products (median ~185 characters, longest ~1,560). It repeats URLs, retrieval dates, addresses and internal notes such as "Wave 5 literature-expansion sweep… alias-gated".

## What changes
Rewrite the `source` text on all ~123 catalogue products (active, pipeline, discontinued) as a short list of source types, separated by semicolons. Aim for under ~80 characters.

Example (RayIntelligence):
- Before: "RaySearch official product page (https://…) and press releases for RayIntelligence v2025 (2025-09-01) and v2026, retrieved 2026-07-01; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC…)"
- After: "Vendor website; press releases; peer-reviewed literature"

Rules for each rewrite:
- Keep only the kinds of source: vendor website, vendor brochure/IFU, FDA 510(k) or other regulator database, EUDAMED, press release, peer-reviewed literature, conference abstract.
- Keep a regulator number only where it fits in a few words (e.g. "FDA 510(k) K240398").
- Drop URLs, retrieval dates, addresses, UDI strings, internal process notes and "not disclosed" explanations. These details already appear in the specific fields' own sources, regulatory section and evidence list.
- For non-public sources, keep a short marker such as "Vendor IFU (non-public)". The source-disclosure rule requires these to stay visible. Their access details and retrieval dates remain in the fields where they are already recorded.
- Change nothing else: no facts, scores, field-level sources or evidence.

## Checks
- Catalogue tests and evidence checker.
- Spot-check three product pages in the browser.

## Technical details
- Change only the top-level `source:` string in `src/data/products/**` (excluding examples). Use a script to list the strings, then rewrite each one by hand-reviewed mapping, not blind regex.
- Field-level `source` and `sourceUrl` inside trainingData, evaluationData, regulatory and evidence stay untouched.

# Apply the syngo.via RT Image Suite revision (VC10)

The reviewer's revision (submitted today, pending review) updates the FDA clearance, intended use, evidence levels and limitations. The new clearance is real: FDA lists K252304 "syngo.via RT Image Suite VC10", cleared 18 Mar 2026. Several values are in the wrong format and would break badges or show empty items, so they get cleaned before applying.

## What goes in (reviewer content kept)
- FDA: K252304, decided 2026-03-18, product code MUJ, Class II, 510(k).
- Notes: "K252304 (Mar 2026; VC10). Prior clearances: K232799 (Apr 2024; VB80), K220783 (Sep 2022), K211379 (Jul 2021), K201444 (Aug 2020)" — the duplicated K232799 is removed.
- Intended use: the reviewer's text, with the source now "FDA 510(k) K252304 Summary, accessed 2026-11-02" and the double spaces removed.
- Levels of Efficacy: L1t (replaces the old I0 code). Adoption Readiness: R2.
- New limitation, wording kept, with straight quotes and single spaces.
- Version VC10, lastRevised 2026-11-02, K252304 added to the source line.

## Format fixes so nothing breaks
- FDA status "Cleared" becomes the site's standard "510k_cleared"; class "II" becomes "Class II", like every other product.
- The empty guideline entry (no name) is dropped instead of showing a blank row.
- The old explanation notes for efficacy and readiness ("I0 ...", "Derived from E1 ...") are updated to explain L1t and R2, since they would contradict the new levels.

## Two things the FDA record shows differently (flagged, your call)
- The VC10 clearance was filed by Varian Medical Systems, not Siemens directly (Varian is now part of Siemens Healthineers). I'd mention this in the notes; company stays Siemens Healthineers.
- FDA lists regulation 21 CFR 892.5050, while the entry says 892.2050. I'd correct it to 892.5050.

## After applying
- Mark the reviewer's revision as approved/applied so it isn't applied twice.
- Run the catalogue tests and evidence checker, and open the product page to check the badges and regulatory box.

## Technical details
- Edit `src/data/products/image-synthesis/siemens.ts` (siemens-syngo-ct only).
- Update `product_edit_drafts` row 526e0a5b… to approved status via the existing review flow / status update.

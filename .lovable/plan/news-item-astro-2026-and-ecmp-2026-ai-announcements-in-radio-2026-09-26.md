# News item: ASTRO 2026 (and ECMP 2026) AI announcements in radiotherapy

A news entry covering AI-in-radiotherapy launches and announcements around ASTRO 2026 and, if relevant ones exist, ECMP 2026. Catalogue entries are updated only where public sources confirm the new information.

## Step 1: Research (public sources only)
- **Radformation AutoContour 2.8**: confirm the release from Radformation's own press release or website. Record the date and what changed (new structures, modalities, clearance). The catalogue currently lists version 2.7.
- **Radformation OptiPlan**: check whether it uses AI/deep learning (for example AI-based planning or dose prediction) or is rule-based automation. It is not in the catalogue yet. It gets added only if AI is confirmed and it has a recognised regulatory clearance; otherwise it is mentioned in the news as "not AI-based / not yet cleared".
- **Other vendors**: search ASTRO 2026 and ECMP 2026 press releases for AI radiotherapy launches, including Varian/Siemens, Elekta, RaySearch, MVision, Therapanacea, Limbus, Manteia, MIM, Mirada, Philips, GE, United Imaging, Accuray, Brainlab, and new entrants. Also cross-check recent FDA 510(k) AI clearances.
- **ECMP 2026**: confirm the dates and venue, and list any AI product news. If nothing relevant turns up, it gets a short mention or is left out.

## Step 2: Catalogue updates
- For existing products, update the version, features, structures, regulatory status and `lastRevised`, citing the source and retrieval date.
- New AI products that pass the inclusion gate get new entries. Pre-market products go to Pipeline.
- Evidence scores stay unchanged unless peer-reviewed papers are added.

## Step 3: News item
- New file `src/data/news/astro-ecmp-2026-announcements.ts`, placed first in `NEWS_ITEMS`.
- Sections: Radformation (AutoContour 2.8, OptiPlan finding), other vendor announcements, ECMP, catalogue changes made, and a reminder of the review round and certification.
- Every claim links to its public source. Vendor statements are labelled as vendor-reported, and nothing is presented as clinically validated.

## Deliverable to you
- A list of each announcement found, with its source and whether the catalogue was updated, added to, or skipped (with the reason).

## Technical notes
- Run the typecheck and `validate:evidence` after the edits. `public/news.json` regenerates on build.

# HAIR reference list: verify, match, score, integrate

The uploaded list has 102 DOIs that are in HAIR but not in DLinRT, across about 15 vendors. The biggest groups are RaySearch (about 30), Radformation AutoContour (about 20), MVision (about 12), Mirada DLCExpert (7), MIM (7), Varian Hypersight/Eclipse (about 8), Manteia, Carina, Siemens, TheraPanacea, Spectronic, Coreline and Synaptiq. Many vendor and product labels are messy (empty entries, duplicates, "Planning", "MIM Protege", "Velocity").

## Step 1: Verify each DOI (automatic, no edits)
- Look up every DOI in Crossref and Europe PMC to get the title, authors, journal, year, publication type, abstract and affiliations.
- Flag DOIs that don't resolve, preprints, conference abstracts and errata.
- Confirm that the abstract, title or methods name the product. Label each match as named, inferred (vendor only) or not found.

## Step 2: Match to a catalogue product
- Map the HAIR labels to catalogue IDs, for example: "Planning" / "Deep Learning Planning" to RayStation ML planning, "Deep Learning Contour" to RayStation DLC, "MIM Protege" to Contour ProtégéAI+, "Annotate" to ART-Plan+ Annotate, "AI-Rad Companion" to Organs RT.
- Split multi-vendor papers so each one is tagged "Multi-vendor Comparative Study" on every product it evaluates.
- Out of scope, listed but not added:
  - Hypersight and Velocity, if the paper evaluates non-AI imaging or registration rather than an AI function. Hypersight is only included if it has an AI reconstruction entry in the catalogue.
  - Coreline AVIEW, if the paper is on diagnostic lung CT rather than radiotherapy.
  - Synaptiq Mediq and MedCom ProSoma, if they are not in the catalogue.

## Step 3: Score (per paper, three axes)
- Assign Evidence Rigor E0–E3 and Clinical Impact I0–I5 following docs/review/GUIDE.md.
- Record the study-quality flags: vendor-independent (from author affiliations), multi-centre, multi-national, prospective, external validation.
- Write a one-line rationale for each score.
- Abstracts and preprints are listed as evidence but not scored, following the existing policy.

## Step 4: Decide the form, per paper
- **Scored key paper plus evidence entry:** a peer-reviewed study that names the product.
- **Evidence entry only (unscored):** conference abstracts, and reviews that mention the product.
- **Reject with reason:** the DOI doesn't resolve, the product isn't named, the product is out of scope, or the paper duplicates one already held.

## Step 5: Update the product records
- Add the accepted papers to `keyPapers` and `evidence` in each product file.
- Recompute the product-level E, I and R only where the new papers justify it. Update the rigor and impact notes, the study-quality flags, `lastRevised` and the source note.
- No invented values. Anything not found stays empty.

## Deliverables
- A review worksheet at /mnt/documents/hair-doi-review.xlsx with one row per DOI: verified metadata, the matched product, the decision and form, the E/I scores and flags, the rationale and the rejection reason.
- Updated product files, with `validate:evidence`, the typecheck and the build passing.
- A short summary of score changes for each product.

## Technical notes
- A temporary script (in /tmp) queries Crossref and Europe PMC, with caching and rate limiting.
- Scoring judgements are made paper by paper from the abstracts, not assigned in bulk.
- Funding and conflict-of-interest statements are not checked unless the abstract states them. The worksheet notes this.

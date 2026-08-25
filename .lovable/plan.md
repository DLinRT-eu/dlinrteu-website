# Wave 5 — Literature expansion sweep

The first four waves scored the papers already cited in the catalogue. This wave goes the other way: it actively searches for literature we never cited, so products are not under-scored simply because a paper was missing from the file.

Current state: 85 catalogued products, 35 of them with no key papers at all (11 in auto-contouring, 6 in reconstruction, 4 in treatment-planning, 4 in platform, 3 in performance-monitor, 2 each in image-enhancement/image-synthesis/registration, 1 in positioning).

## Approach

Manual per-product searching does not scale to 85 products and risks the exact failure mode we have been correcting (papers attributed to the wrong product). So the wave is split into a reproducible harvest step and a human scoring step.

### 1. Alias registry
A small file mapping each product to the strings that actually appear in papers — trade name, former names, module names, vendor name — plus exclusion terms for ambiguous names (for example "Jazz", "Verify", "Synchrony"). This is the difference between a useful harvest and noise.

### 2. Harvest script
A new script queries Europe PMC and PubMed per product, then:
- drops anything whose DOI/PMID already appears in the product's `keyPapers`;
- keeps only records where a product alias appears in the title, abstract, or open-access full text — no alias match, no candidate;
- pulls the abstract for every survivor so scoring never happens from a title alone;
- writes a per-category candidate worklist (Markdown + CSV) with proposed E/I levels, study design cues (single/multi centre, prospective, vendor affiliation) and the alias hit that justified inclusion.

The script never edits product files.

### 3. Scoring waves
Review the candidate lists and persist scored papers, in this order:

- **5A — Image synthesis.** Richest literature and the category the sweep most likely under-represents: MRCAT (prostate/brain/H&N/pelvis), Spectronic MRIPlanner, Siemens syngo.via, Therapanacea AdaptBox, MVision. Expect the largest number of additions here.
- **5B — Reconstruction and image enhancement.** Six zero-paper reconstruction products (SmartSpeed, SmartSpeed Precise, PET/CT Adaptive Reconstruction, uAIFI, HD TOF 2.0, IRIS Evo) plus SubtleHD(PET)/(CT).
- **5C — Auto-contouring.** The 11 zero-paper products, and a recency top-up (2025-2026) for the 20 already scored.
- **5D — Remaining categories.** Treatment planning, registration, performance monitor, platform, positioning.

Each wave ends with the same persistence rules used in waves 1-4: per-paper `evidenceRigor`/`clinicalImpact` with a written rationale and quality flags, indirect/comparative reviews recorded but left unscored, product score recomputed as the per-axis maximum, any override documented with a reason, and `lastUpdated`/`lastRevised` bumped.

### 4. Validation
After every wave: `npm run validate:evidence -- --all` (expect 0 mismatches), typecheck, and a rendering spot-check of two changed product pages. A short summary per wave lists score changes up and down.

## Accuracy guardrails

- A paper is added only when its DOI or PMID resolves and the abstract was actually retrieved in this pass.
- The rationale must state why the product is the subject of the paper (alias in title/abstract, or vendor-confirmed attribution flagged as such).
- Vendor white papers, conference abstracts and press releases stay out of `keyPapers`; they may remain in the descriptive `evidence` array.
- Downgrades are applied as readily as upgrades — the score follows the rubric, not the product's reputation.

## Technical notes

- New files: `scripts/evidence-harvest.ts`, `scripts/evidence-aliases.ts`; output artefacts under `/mnt/documents/`.
- Data sources: Europe PMC REST search (includes full-text matching) and PubMed E-utilities esearch/efetch, both keyless.
- Edited files per wave: only `src/data/products/<category>/*.ts`.
- No schema change needed — `keyPapers` and `computeProductEvidenceScore()` already support everything this wave persists.

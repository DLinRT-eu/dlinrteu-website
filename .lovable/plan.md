# Per-publication scoring: status and completion plan

## What I found

The "Per-publication scoring" block is not a UI bug — it is a data-coverage gap.

- The block is rendered inside the Evidence & Limitations card (`EvidenceLimitationsDetails`), and only when the product has at least one `keyPapers` entry carrying an E or I score (`KeyPapersScoring` returns `null` otherwise), and only in read-only mode (hidden while the visual editor is open).
- On the MIM Contour ProtégéAI page the block **is** rendered (verified in the live preview), but it lists only **1 scored paper** while the product carries ~6 clinical-evidence citations. So it looks empty/incomplete rather than absent.
- Across the catalogue product files: **~30 files have no `keyPapers` at all** (block hidden entirely), **~35 have partial coverage** (fewer scored papers than listed evidence citations), and only ~14 are fully covered.

Cause: Waves 1–5 scored the papers that the sweep surfaced per category, but the legacy `evidence[]` citation lists were never fully migrated into `keyPapers`. The two lists live side by side, so a product can show many citations under "Clinical Evidence" and few or none under "Per-publication scoring".

## Proposed work (Wave 6 — coverage closure)

### 1. Coverage report script
Add `scripts/evidence-coverage.ts` (npm script `evidence:coverage`) that, per product, reports: number of `evidence[]` citations, number of `keyPapers`, number of scored `keyPapers`, and a coverage status (none / partial / full). Output sorted worst-first so the backfill can be worked in batches.

### 2. Backfill `keyPapers` from existing `evidence[]`
For every product with partial or no coverage, migrate each existing evidence citation that names the product into a `keyPapers` entry with title, authors, journal, year, DOI/PMID, `evidenceRigor`, `clinicalImpact`, rationale and quality flags (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`), following the same rubric used in Waves 1–5. Citations that do not explicitly name the product stay in `evidence[]` only and get a short note.

Batching (mirrors earlier waves):
- Batch A: auto-contouring partials (MIM, Limbus, MVision, Therapanacea, Radformation, Siemens, Brainlab, Coreline, Manteia, MedMind, Oncosoft, RaySearch, Synaptiq, Vysioner, GE).
- Batch B: image-enhancement / reconstruction / image-synthesis partials (Subtle Medical, ClariPi, Canon, Philips, GE, United Imaging, AIRS, AlgoMedica, MRCAT files).
- Batch C: treatment-planning, registration, performance-monitor, platform, tracking, positioning, pipeline — mostly the zero-`keyPapers` files.

After each batch, re-run `validate:evidence` so stored product-level E/I stays equal to the computed max-across-papers (documented overrides only where justified).

### 3. Make the gap visible instead of silent
In `KeyPapersScoring`, when a product has `evidence[]` citations but fewer (or zero) scored papers, render a short muted line: "N of M cited publications have been individually scored — remaining citations are listed under Clinical Evidence." When zero papers are scored, show that line in the Evidence card rather than hiding the section completely, so reviewers can see the work is pending rather than assuming it does not apply.

### 4. Documentation
Update `docs/review/GUIDE.md` to state that every product-naming citation must be entered in `keyPapers` with a per-paper score, and that `evidence[]` alone is not sufficient.

## Technical notes
- Files: `src/components/product/KeyPapersScoring.tsx` (UI note), `src/data/products/**` (data backfill), `scripts/evidence-coverage.ts` (new), `package.json` (script entry), `docs/review/GUIDE.md`.
- No change to `computeProductEvidenceScore` semantics: product score stays the max per axis across scored papers, override wins when set.
- Bump `lastRevised` on every touched product file.
- No new claims are invented: only citations already stored on the product (or verified by DOI/PMID lookup) become scored papers.

## Scope check
Given the volume (~65 products), I suggest starting with Batch A plus items 1 and 3, then continuing batch by batch on your confirmation.

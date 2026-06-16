# Evidence Refresh + Hallucination Audit — 7 Products

Scope (one file each, all under `src/data/products/`):

| Product | Likely file |
|---|---|
| Elekta IRIS EVO | `reconstruction/elekta.ts` |
| Canon AiCE (CT) | `reconstruction/canon.ts` |
| Canon AiCE (MR) | `reconstruction/canon.ts` (or sibling) |
| Philips SmartDose CT Enhancement | `image-enhancement/philips-smartdose.ts` |
| GE AIR Recon DL — Enhancement Mode | `image-enhancement/ge-healthcare.ts` |
| Manteia AccuContour | `auto-contouring/manteia-acculearning.ts` / `manteia.ts` |
| MIM Contour ProtégéAI+ | `auto-contouring/mim-software.ts` |

## Workflow per product

1. **Read current state** — full file, capture existing `evidence[]`, `evidenceRigor(+Notes)`, `clinicalImpact(+Notes)`, `adoptionReadiness(+Notes)`, `evaluationData`, `evidenceVendorIndependent/MultiCenter/ExternalValidation`, `clinicalEvidence`, `source`, `lastRevised`.
2. **Verify every existing citation** via Crossref (`api.crossref.org/works/{DOI}`) and PubMed/Europe PMC. For each entry check: DOI resolves, title matches, authors match, journal + year + volume/pages match, study is actually about *this* product (not a same-vendor sibling).
   - Verified → keep, normalise to the standard citation shape (`type`, structured `authors/year/title/journal/locator/doi`, `link`).
   - Unverifiable / mismatched → **remove** from the file and log to the audit report with reason (no DOI hit, wrong product, wrong year, fabricated authors, etc.).
3. **Search for new evidence** (PubMed, Crossref, Europe PMC, Google Scholar via `websearch`) using product name + vendor + common synonyms. Capture peer-reviewed studies from ~2019 onward; include vendor-independent clinical validations, multi-centre studies, and meta-analyses.
4. **Re-score E / I / R** per `docs/review/GUIDE.md` and `src/data/evidence-impact-levels.ts`, using the strongest verified evidence. Update study-quality flags (`evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceExternalValidation`) and write a one-paragraph rationale into each `*Notes` field naming the studies that justify the score.
5. **Refresh `evaluationData`** only if a verified study changes datasetSize / sites / endpoint; otherwise leave intact (Minimal Intervention).
6. **Bump** `lastRevised` and `lastUpdated` to today (`2026-06-16`) and append new sources to `source`.

## Hallucination handling

- Removed entries logged to `/mnt/documents/evidence-audit-2026-06-16.md` with: product id, removed entry verbatim, reason (DOI not found / title mismatch / wrong product / etc.), and the verification attempt (which DOI/Crossref/PubMed query failed).
- A short summary block per product (kept → N, removed → N, added → N, score change Y/N) precedes the detail.

## Inclusion guard

The 4 reconstruction/enhancement products (IRIS EVO, AiCE CT, AiCE MR, SmartDose, AIR Recon DL) must remain AI/DL-based — if a citation describes a classical iterative-reconstruction or filter-based variant of the same brand, it is removed (per the AI/DL inclusion gate in core memory).

## Out of scope (Minimal Intervention)

- No edits to UI components, schema, types, or non-evidence product fields.
- No changes to other products in the same files.
- No rewriting of `trainingData` or regulatory blocks unless a verified source proves a current value is wrong (then logged as a separate finding, not silently changed).

## Deliverables

1. Edited `.ts` files for the 7 products (evidence array, scores, notes, flags, dates, source line).
2. `/mnt/documents/evidence-audit-2026-06-16.md` — per-product kept/removed/added table, score deltas, list of search queries run, list of DOIs verified.
3. Final chat summary listing per product: # citations before → after, score change (if any), and whether any hallucinations were removed.

## Technical notes

- Citation shape follows `src/lib/formatCitation.ts` (`RawEvidenceObject`): prefer structured `authors/year/title/journal/doi` plus `description` + `link`. DOI link form: `https://doi.org/<DOI>`.
- Verification commands: `curl -s https://api.crossref.org/works/<DOI>` and Europe PMC `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=...&format=json`.
- Use `websearch--web_search` with `site:pubmed.ncbi.nlm.nih.gov` and `site:doi.org` for discovery; never invent a DOI.
- All edits via `code--line_replace` on the existing `evidence: [...]` blocks; no whole-file rewrites.
